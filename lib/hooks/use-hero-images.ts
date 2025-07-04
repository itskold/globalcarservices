import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export interface HeroSlide {
  id: string
  src: string
  buttonLink: string
  order: number
}

export function useHeroImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroImages, setHeroImages] = useState<HeroSlide[]>([
    {
      id: '1',
      src: '/images/hero-vans.jpg',
      buttonLink: '/rental',
      order: 1
    },
    {
      id: '2',
      src: '/Globalcar2024-37.jpg',
      buttonLink: '/services',
      order: 2
    },
    {
      id: '3',
      src: '/Globalcar2024-34.jpg',
      buttonLink: '/appointment',
      order: 3
    }
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const slidesQuery = query(
          collection(db, 'hero-slides'),
          orderBy('order', 'asc')
        )
        const slidesSnapshot = await getDocs(slidesQuery)
        
        if (!slidesSnapshot.empty) {
          const slides = slidesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as HeroSlide[]
          
          setHeroImages(slides)
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des slides:', err)
        setError('Erreur lors du chargement des slides')
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSlides()
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return {
    currentImage: heroImages[currentImageIndex],
    currentImageIndex,
    totalImages: heroImages.length,
    nextImage,
    previousImage,
    goToImage,
    loading,
    error
  }
} 