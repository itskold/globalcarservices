import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

export const locales = ['nl', 'fr', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale = 'nl' as const

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  try {
    // Charger directement depuis Firebase - exactement comme l'API
    const database = getDatabase(app)
    const translationsRef = ref(database, `translations/${locale}`)
    const snapshot = await get(translationsRef)
    
    if (!snapshot.exists()) {
      return { messages: {} }
    }
    
    const data = snapshot.val() as Record<string, any>
    const result: Record<string, any> = {}
    
    // Transformer les données Firebase en objet imbriqué
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
      
      // Construire l'objet imbriqué
      const keys = originalKey.split('.')
      let current = result
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {}
        }
        current = current[key]
      }
      
      current[keys[keys.length - 1]] = value
    }
    
    return { messages: result }
    
  } catch (error) {
    console.error('Erreur Firebase:', error)
    return { messages: {} }
  }
}) 