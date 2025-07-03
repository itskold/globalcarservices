'use client'

import { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

export default function TestFirebasePage() {
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Chargement...')
  const [translations, setTranslations] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testFirebase() {
      try {
        setFirebaseStatus('Test de la connexion Firebase...')
        
        // Vérifier la configuration
        const config = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌',
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? '✅' : '❌',
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'
        }
        
        console.log('Configuration Firebase:', config)
        
        // Tester la connexion
        const database = getDatabase(app)
        setFirebaseStatus('Connexion Firebase établie')
        
        // Charger les traductions
        const translationsRef = ref(database, 'translations/fr')
        const snapshot = await get(translationsRef)
        
        if (snapshot.exists()) {
          const data = snapshot.val()
          setTranslations(data)
          setFirebaseStatus(`✅ Firebase connecté - ${Object.keys(data).length} traductions trouvées`)
        } else {
          setFirebaseStatus('✅ Firebase connecté - Aucune traduction trouvée')
        }
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
        setError(errorMessage)
        setFirebaseStatus('❌ Erreur Firebase')
        console.error('Erreur Firebase:', err)
      }
    }
    
    testFirebase()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Test Firebase</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Statut Firebase</h2>
          <p className="text-lg">{firebaseStatus}</p>
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
              <strong>Erreur:</strong> {error}
            </div>
          )}
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Configuration Firebase</h2>
          <div className="space-y-1 text-sm">
            <div>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌'}</div>
            <div>Database URL: {process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? '✅' : '❌'}</div>
            <div>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'}</div>
          </div>
        </div>
        
        {translations && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Traductions Firebase (fr)</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(translations, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 