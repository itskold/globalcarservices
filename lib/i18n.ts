import { headers } from 'next/headers'

const defaultLocale = 'nl'
const supportedLocales = ['nl'] // Ajoutez d'autres langues ici quand nécessaire

export async function getTranslations(namespace: string) {
  try {
    const translations = await import(`@/locales/${defaultLocale}/${namespace}.json`)
    return translations.default
  } catch (error) {
    console.error(`Failed to load translations for namespace ${namespace}:`, error)
    return {}
  }
}

export function getLocale() {
  return defaultLocale
} 