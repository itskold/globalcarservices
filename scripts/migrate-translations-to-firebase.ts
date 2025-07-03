import { initializeApp, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import fs from 'fs/promises'
import path from 'path'

// Debug des variables d'environnement
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
console.log('Database URL:', process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL)

// Configuration Firebase Admin
const app = initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
})

const database = getDatabase(app)

async function migrateTranslations() {
  const locales = ['fr', 'en', 'nl']
  const messagesDir = path.join(process.cwd(), 'messages')

  for (const locale of locales) {
    try {
      console.log(`Migrating translations for ${locale}...`)
      
      const filePath = path.join(messagesDir, `${locale}.json`)
      const content = await fs.readFile(filePath, 'utf-8')
      const translations = JSON.parse(content)
      
      // Fonction récursive pour parcourir les traductions
      async function migrateObject(obj: any, prefix: string = '') {
        for (const [key, value] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key
          
          if (typeof value === 'string') {
            // Sauvegarder la traduction dans Firebase
            const translationRef = database.ref(`translations/${locale}/${fullKey}`)
            await translationRef.set({
              value,
              migratedAt: new Date().toISOString()
            })
            console.log(`Migrated: ${locale}/${fullKey} = "${value}"`)
          } else if (typeof value === 'object' && value !== null) {
            // Récursion pour les objets imbriqués
            await migrateObject(value, fullKey)
          }
        }
      }
      
      await migrateObject(translations)
      console.log(`✅ Migration completed for ${locale}`)
      
    } catch (error) {
      console.error(`❌ Error migrating ${locale}:`, error)
    }
  }
}

// Exécuter la migration
migrateTranslations()
  .then(() => {
    console.log('🎉 Migration completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error)
    process.exit(1)
  }) 