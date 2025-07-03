import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

export const locales = ['nl', 'fr', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale = 'nl' as const

// Fonction pour charger les traductions depuis Firebase
async function getFirebaseTranslations(locale: string): Promise<Record<string, any>> {
  try {
    const database = getDatabase(app)
    const translationsRef = ref(database, `translations/${locale}`)
    const snapshot = await get(translationsRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, any>
      // On retourne l'objet plat { encodedKey: { value: ... } }
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
  // On part d'une copie du JSON
  const merged = { ...defaultTranslations }

  for (const encodedKey in firebaseTranslations) {
    const decodedKey = decodeKey(encodedKey)
    const value = firebaseTranslations[encodedKey]
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
  return merged
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  try {
    // Charger les traductions par défaut depuis les fichiers JSON
    const defaultMessages = (await import(`./messages/${locale}.json`)).default
    // Charger les traductions modifiées depuis Firebase
    const firebaseMessages = await getFirebaseTranslations(locale)
    // Fusionner : les traductions Firebase remplacent celles du JSON
    const messages = mergeDecodedFirebaseTranslations(defaultMessages, firebaseMessages)
    return { messages }
  } catch (error) {
    console.error('Error loading translations:', error)
    // En cas d'erreur, retourner seulement les traductions par défaut
    const defaultMessages = (await import(`./messages/${locale}.json`)).default
    return { messages: defaultMessages }
  }
}) 