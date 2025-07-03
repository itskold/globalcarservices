import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export function useHeroImage() {
  const [heroImage, setHeroImage] = useState<string>('/images/hero-vans.jpg') // Image par défaut
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Récupérer le document hero depuis la collection images
        const heroDocRef = doc(db, 'images', 'hero')
        const heroDoc = await getDoc(heroDocRef)
        
        if (heroDoc.exists()) {
          const data = heroDoc.data()
          if (data?.src) {
            setHeroImage(data.src)
          }
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'image hero:', err)
        setError('Erreur lors du chargement de l\'image')
        // Garder l'image par défaut en cas d'erreur
      } finally {
        setLoading(false)
      }
    }

    fetchHeroImage()
  }, [])

  return { heroImage, loading, error }
} 