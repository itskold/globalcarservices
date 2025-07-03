import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en']

// Fonction pour charger les traductions depuis Firebase
async function getFirebaseTranslations(locale: string): Promise<Record<string, { originalKey: string, value: string }>> {
  try {
    const database = getDatabase(app)
    const translationsRef = ref(database, `translations/${locale}`)
    const snapshot = await get(translationsRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, any>
      const flat: Record<string, { originalKey: string, value: string }> = {}
      for (const encodedKey in data) {
        const item = data[encodedKey]
        let originalKey: string
        let value: string
        if (item?.originalKey && item?.value) {
          originalKey = item.originalKey
          value = item.value
        } else if (typeof item === 'string') {
          originalKey = encodedKey.replace(/_/g, '.')
          value = item
        } else if (item?.value && typeof item.value === 'string') {
          originalKey = encodedKey.replace(/_/g, '.')
          value = item.value
        } else {
          continue
        }
        flat[encodedKey] = {
          originalKey,
          value
        }
      }
      return flat
    }
    return {}
  } catch (error) {
    console.error('Error loading Firebase translations:', error)
    return {}
  }
}

// Transforme les clés plates Firebase en objet imbriqué compatible next-intl
function buildNestedObject(firebaseTranslations: Record<string, { originalKey: string, value: string }>) {
  const result: Record<string, any> = {};
  for (const encodedKey in firebaseTranslations) {
    const { originalKey, value } = firebaseTranslations[encodedKey];
    if (!originalKey) continue;
    const keys = originalKey.split('.');
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
  }
  return result;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  if (!SUPPORTED_LANGUAGES.includes(locale)) {
    return NextResponse.json({ error: 'Locale non supportée' }, { status: 400 })
  }
  try {
    const firebaseMessages = await getFirebaseTranslations(locale)
    const messages = buildNestedObject(firebaseMessages)
    return NextResponse.json({
      success: true,
      locale,
      messages,
      firebaseCount: Object.keys(firebaseMessages).length,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error loading translations:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 