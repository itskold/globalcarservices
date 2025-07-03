import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

// Fonction pour charger les traductions depuis Firebase
async function getFirebaseTranslations(locale: string): Promise<Record<string, any>> {
  try {
    const database = getDatabase(app)
    const translationsRef = ref(database, `translations/${locale}`)
    const snapshot = await get(translationsRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, any>
      const flat: Record<string, string> = {}
      for (const encodedKey in data) {
        if (data[encodedKey]?.value) {
          flat[encodedKey] = data[encodedKey].value
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

// Décoder la clé encodée (underscore -> point)
function decodeKey(encodedKey: string): string {
  return encodedKey.replace(/_/g, '.')
}

// Fusionne les traductions Firebase (plates) dans l'objet imbriqué
function mergeDecodedFirebaseTranslations(defaultTranslations: Record<string, any>, firebaseTranslations: Record<string, string>) {
  const merged = { ...defaultTranslations }

  for (const encodedKey in firebaseTranslations) {
    const decodedKey = decodeKey(encodedKey)
    const value = firebaseTranslations[encodedKey]
    const keys = decodedKey.split('.')
    let current = merged
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}
      if (typeof current[keys[i]] === 'string') {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
  }
  return merged
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') || 'fr'
  
  try {
    // Charger les traductions par défaut depuis les fichiers JSON
    const defaultMessages = (await import(`../../../messages/${locale}.json`)).default
    // Charger les traductions modifiées depuis Firebase
    const firebaseMessages = await getFirebaseTranslations(locale)
    // Fusionner : les traductions Firebase remplacent celles du JSON
    const messages = mergeDecodedFirebaseTranslations(defaultMessages, firebaseMessages)
    
    return NextResponse.json({ 
      success: true, 
      messages,
      firebaseCount: Object.keys(firebaseMessages).length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error reloading translations:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 