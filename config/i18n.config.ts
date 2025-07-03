import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['en', 'fr', 'nl']

// Définir le type des messages
type MessageStructure = {
  navigation: any
  services: any
  footer: any
  hero: any
  vehicleRental: any
  searchSection: any
  whyChooseUs: any
  // Ajouter d'autres namespaces ici si nécessaire
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: {
      ...(await import(`../messages/${locale}/navigation.json`)).default,
      ...(await import(`../messages/${locale}/services.json`)).default,
      ...(await import(`../messages/${locale}/footer.json`)).default,
      ...(await import(`../messages/${locale}/hero.json`)).default,
      ...(await import(`../messages/${locale}/vehicleRental.json`)).default,
      ...(await import(`../messages/${locale}/searchSection.json`)).default,
      ...(await import(`../messages/${locale}/whyChooseUs.json`)).default,
    },
    timeZone: 'Europe/Brussels',
    now: new Date(),
  }
})

// Types pour les traductions
export type MessagesNamespace = keyof MessageStructure
export type Messages = MessageStructure

// Helper pour vérifier si une traduction existe
export function hasTranslation(namespace: string, key: string, locale: string): boolean {
  try {
    const messages = require(`../messages/${locale}/${namespace}.json`)
    return key.split('.').reduce((obj, k) => obj?.[k], messages) !== undefined
  } catch {
    return false
  }
}

// Helper pour charger dynamiquement les traductions d'un composant
export async function loadComponentTranslations(component: string, locale: string) {
  try {
    return (await import(`../messages/${locale}/${component}.json`)).default
  } catch (error) {
    console.error(`Failed to load translations for component ${component} in locale ${locale}:`, error)
    return {}
  }
} 