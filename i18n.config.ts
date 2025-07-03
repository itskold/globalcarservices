import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

export const locales = ['nl', 'fr', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale = 'nl' as const

// Fonction pour charger les traductions depuis Firebase
async function getFirebaseTranslations(locale: string): Promise<Record<string, any>> {
  console.log(`[i18n] Tentative de chargement Firebase pour locale: ${locale}`)
  
  try {
    // Vérifier la configuration Firebase
    console.log('[i18n] Configuration Firebase:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌',
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? '✅' : '❌',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'
    })
    
    const database = getDatabase(app)
    console.log('[i18n] Database Firebase initialisée')
    
    const translationsRef = ref(database, `translations/${locale}`)
    console.log(`[i18n] Référence Firebase: translations/${locale}`)
    
    const snapshot = await get(translationsRef)
    console.log(`[i18n] Snapshot Firebase existe: ${snapshot.exists()}`)
    
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, any>
      console.log(`[i18n] Données Firebase brutes:`, data)
      
      // On retourne l'objet plat { encodedKey: { value: ... } }
      const flat: Record<string, string> = {}
      for (const encodedKey in data) {
        if (data[encodedKey]?.value) {
          flat[encodedKey] = data[encodedKey].value
        }
      }
      
      console.log(`[i18n] Traductions Firebase traitées:`, flat)
      console.log(`[i18n] Nombre de traductions Firebase: ${Object.keys(flat).length}`)
      
      return flat
    } else {
      console.log(`[i18n] Aucune traduction Firebase trouvée pour ${locale}`)
    }
    return {}
  } catch (error) {
    console.error('[i18n] Erreur lors du chargement Firebase:', error)
    return {}
  }
}

// Décoder la clé encodée (underscore -> point)
function decodeKey(encodedKey: string): string {
  return encodedKey.replace(/_/g, '.')
}

// Fusionne les traductions Firebase (plates) dans l'objet imbriqué
function mergeDecodedFirebaseTranslations(defaultTranslations: Record<string, any>, firebaseTranslations: Record<string, string>) {
  console.log('[i18n] Fusion des traductions...')
  console.log('[i18n] Traductions par défaut (JSON):', Object.keys(defaultTranslations).length, 'clés')
  console.log('[i18n] Traductions Firebase:', Object.keys(firebaseTranslations).length, 'clés')
  
  // On part d'une copie du JSON
  const merged = { ...defaultTranslations }

  for (const encodedKey in firebaseTranslations) {
    const decodedKey = decodeKey(encodedKey)
    const value = firebaseTranslations[encodedKey]
    console.log(`[i18n] Fusion: ${encodedKey} -> ${decodedKey} = "${value}"`)
    
    // Recrée l'objet imbriqué à partir de la clé décodée
    const keys = decodedKey.split('.')
    let current = merged
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}
      // Si la valeur existante est une chaîne, on la transforme en objet vide
      if (typeof current[keys[i]] === 'string') {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
  }
  
  console.log('[i18n] Fusion terminée')
  return merged
}

export default getRequestConfig(async ({ locale }) => {
  console.log(`[i18n] Chargement des traductions pour locale: ${locale}`)
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  try {
    // Charger les traductions par défaut depuis les fichiers JSON
    const defaultMessages = (await import(`./messages/${locale}.json`)).default
    console.log(`[i18n] Traductions JSON chargées: ${Object.keys(defaultMessages).length} clés`)
    
    // Charger les traductions modifiées depuis Firebase
    const firebaseMessages = await getFirebaseTranslations(locale)
    
    // Fusionner : les traductions Firebase remplacent celles du JSON
    const messages = mergeDecodedFirebaseTranslations(defaultMessages, firebaseMessages)
    
    console.log(`[i18n] Traductions finales: ${Object.keys(messages).length} clés`)
    
    return { 
      messages,
      // Forcer le rechargement dynamique - désactiver TOUS les caches
      unstable_noStore: true,
      // Désactiver le cache de Next.js
      revalidate: 0,
      // Headers pour éviter le cache
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  } catch (error) {
    console.error('[i18n] Erreur lors du chargement des traductions:', error)
    // En cas d'erreur, retourner seulement les traductions par défaut
    const defaultMessages = (await import(`./messages/${locale}.json`)).default
    return { 
      messages: defaultMessages,
      unstable_noStore: true,
      revalidate: 0,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  }
}) 