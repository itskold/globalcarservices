'use client'

import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '@/lib/firebase'

interface TranslationData {
  value: string
  updatedAt: string
}

export function useFirebaseTranslations(locale: string) {
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const translationsRef = ref(database, `translations/${locale}`)
    
    // Écouter les changements en temps réel
    const unsubscribe = onValue(translationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const translationMap: Record<string, string> = {}
        
        // Parcourir toutes les clés de traduction
        Object.keys(data).forEach((key) => {
          const translation = data[key] as TranslationData
          translationMap[key] = translation.value
        })
        
        setTranslations(translationMap)
      } else {
        setTranslations({})
      }
      setLoading(false)
    }, (error) => {
      console.error('Error loading Firebase translations:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [locale])

  return { translations, loading }
} 