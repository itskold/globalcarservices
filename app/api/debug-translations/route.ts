import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { app } from '@/lib/firebase'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') || 'fr'
  
  try {
    // 1. Vérifier la configuration Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌',
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? '✅' : '❌',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'
    }
    
    // 2. Charger les traductions JSON
    const defaultMessages = (await import(`../../../messages/${locale}.json`)).default
    
    // 3. Charger les traductions Firebase
    const database = getDatabase(app)
    const translationsRef = ref(database, `translations/${locale}`)
    const snapshot = await get(translationsRef)
    
    let firebaseData = null
    let firebaseCount = 0
    
    if (snapshot.exists()) {
      firebaseData = snapshot.val()
      firebaseCount = Object.keys(firebaseData).length
    }
    
    // 4. Simuler la fusion
    const merged = { ...defaultMessages }
    
    if (firebaseData) {
      for (const encodedKey in firebaseData) {
        if (firebaseData[encodedKey]?.value) {
          const decodedKey = encodedKey.replace(/_/g, '.')
          const value = firebaseData[encodedKey].value
          
          // Recréer l'objet imbriqué
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
      }
    }
    
    return NextResponse.json({
      success: true,
      debug: {
        firebaseConfig,
        locale,
        jsonKeys: Object.keys(defaultMessages).length,
        firebaseKeys: firebaseCount,
        firebaseData,
        mergedKeys: Object.keys(merged).length,
        sampleJson: Object.keys(defaultMessages).slice(0, 3),
        sampleFirebase: firebaseData ? Object.keys(firebaseData).slice(0, 3) : [],
        sampleMerged: Object.keys(merged).slice(0, 3)
      }
    })
    
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 