import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import fs from 'fs/promises'
import path from 'path'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}
const database = getDatabase()

export async function POST(request: NextRequest) {
  console.log('🚀 Début de la migration...')
  
  const locales = ['fr', 'en', 'nl']
  const messagesDir = path.join(process.cwd(), 'messages')
  let migrated = 0

  console.log('📁 Dossier messages:', messagesDir)

  for (const locale of locales) {
    console.log(`📖 Migration de ${locale}...`)
    const filePath = path.join(messagesDir, `${locale}.json`)
    
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      const translations = JSON.parse(content)
      console.log(`📄 ${locale}.json chargé, ${Object.keys(translations).length} clés trouvées`)

      async function migrateObject(obj: any, prefix: string = '') {
        for (const [key, value] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key
          if (typeof value === 'string') {
            // Encoder la clé pour Firebase Realtime Database (remplacer les caractères interdits)
            const encodedKey = fullKey.replace(/[.#$\[\]]/g, '_')
            console.log(`💾 Migration: ${locale}/${encodedKey} = "${value.substring(0, 50)}..."`)
            await database.ref(`translations/${locale}/${encodedKey}`).set({
              value,
              originalKey: fullKey, // Garder la clé originale
              migratedAt: new Date().toISOString(),
            })
            migrated++
          } else if (typeof value === 'object' && value !== null) {
            await migrateObject(value, fullKey)
          }
        }
      }
      
      await migrateObject(translations)
      console.log(`✅ ${locale} migré avec succès`)
      
    } catch (error) {
      console.error(`❌ Erreur lors de la migration de ${locale}:`, error)
      return NextResponse.json({ error: `Erreur migration ${locale}: ${error}` }, { status: 500 })
    }
  }

  console.log(`🎉 Migration terminée! ${migrated} traductions migrées`)
  return NextResponse.json({ success: true, migrated })
} 