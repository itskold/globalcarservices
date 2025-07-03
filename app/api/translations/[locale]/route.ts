import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en']

// Fonction pour charger les traductions depuis Firebase
async function getFirebaseTranslations(locale: string): Promise<Record<string, string>> {
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
  const merged = JSON.parse(JSON.stringify(defaultTranslations)) // Deep clone

  for (const encodedKey in firebaseTranslations) {
    const decodedKey = decodeKey(encodedKey)
    const value = firebaseTranslations[encodedKey]
    
    // Recrée l'objet imbriqué à partir de la clé décodée
    const keys = decodedKey.split('.')
    let current = merged
    
    // Naviguer jusqu'à l'avant-dernière clé
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!current[key] || typeof current[key] === 'string') {
        current[key] = {}
      }
      current = current[key]
    }
    
    // Assigner la valeur à la dernière clé
    const lastKey = keys[keys.length - 1]
    current[lastKey] = value
  }
  
  return merged
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
    // Charger les traductions par défaut depuis les fichiers JSON
    const defaultMessages = (await import(`../../../../messages/${locale}.json`)).default
    
    // Charger les traductions modifiées depuis Firebase
    const firebaseMessages = await getFirebaseTranslations(locale)
    
    // Fusionner : les traductions Firebase remplacent celles du JSON
    const messages = mergeDecodedFirebaseTranslations(defaultMessages, firebaseMessages)

    // TEST : fusionner uniquement les traductions Firebase sur un objet vide
    const firebaseOnlyMerged = mergeDecodedFirebaseTranslations({}, firebaseMessages)
    
    return NextResponse.json({
      success: true,
      locale,
      messages,
      firebaseCount: Object.keys(firebaseMessages).length,
      jsonCount: Object.keys(defaultMessages).length,
      mergedCount: Object.keys(messages).length,
      firebaseOnlyMerged,
      firebaseOnlyMergedCount: Object.keys(firebaseOnlyMerged).length,
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