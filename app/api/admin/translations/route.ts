import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get, set } from 'firebase/database'
import { app } from '@/lib/firebase'

const database = getDatabase(app)
const SUPPORTED_LANGUAGES = ['fr', 'en', 'nl']

interface TranslationValue {
  lang: string
  value: string
}

// Fonction pour encoder les clés pour Firebase Realtime Database
function encodeKey(key: string): string {
  return key.replace(/[.#$\[\]]/g, '_')
}

async function getTranslationFromRealtimeDB(key: string, lang: string): Promise<string | undefined> {
  try {
    const encodedKey = encodeKey(key)
    const translationRef = ref(database, `translations/${lang}/${encodedKey}`)
    const snapshot = await get(translationRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      return data.value || data // Retourner la valeur ou l'objet complet
    }
    return undefined
  } catch (error) {
    console.error(`Error reading translation from Realtime DB for ${lang}/${key}:`, error)
    return undefined
  }
}

async function updateTranslationInRealtimeDB(key: string, lang: string, value: string): Promise<void> {
  try {
    const encodedKey = encodeKey(key)
    const translationRef = ref(database, `translations/${lang}/${encodedKey}`)
    await set(translationRef, {
      value,
      originalKey: key, // Garder la clé originale
      updatedAt: new Date().toISOString()
    })
    console.log(`Translation updated: ${lang}/${encodedKey} = "${value}"`)
  } catch (error) {
    console.error(`Error updating translation in Realtime DB for ${lang}/${key}:`, error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  
  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 })
  }

  try {
    const translations: TranslationValue[] = []
    
    // Get translations for each supported language
    for (const lang of SUPPORTED_LANGUAGES) {
      const value = await getTranslationFromRealtimeDB(key, lang)
      if (value !== undefined) {
        translations.push({ lang, value })
      }
    }
    
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, translations } = await request.json()
    
    if (!key || !Array.isArray(translations)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    
    // Update each language in Realtime Database
    for (const { lang, value } of translations) {
      if (!SUPPORTED_LANGUAGES.includes(lang)) continue
      
      await updateTranslationInRealtimeDB(key, lang, value)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating translations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 