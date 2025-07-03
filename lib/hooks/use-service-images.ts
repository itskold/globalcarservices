"use client"

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface ServiceImages {
  "service1": string;
  "service2": string;
  "service3": string;
  "diagnostic": string;
  "maintenance": string;
  "repair": string;
  "revision": string;
  "about": string;
}

export function useServiceImages() {
  const [serviceImages, setServiceImages] = useState<ServiceImages>({
    "service1": '/rental.jpg',
    "service2": '/repair.jpg',
    "service3": '/dealer1-3.jpg',
    "diagnostic": '/Globalcar2024-13.jpg',
    "maintenance": '/Globalcar2024-2.jpg',
    "repair": '/Globalcar2024-25.jpg',
    "revision": '/Globalcar2024-34.jpg',
    "about":"/about-inner1-2.jpg"
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const serviceNames = ['service1', 'service2', 'service3', 'diagnostic', 'maintenance', 'repair', 'revision', 'about']
        const images: ServiceImages = { ...serviceImages }
        
        // Récupérer les images pour chaque service
        for (const serviceName of serviceNames) {
          try {
            const serviceDocRef = doc(db, 'images', serviceName)
            const serviceDoc = await getDoc(serviceDocRef)
            
            if (serviceDoc.exists()) {
              const data = serviceDoc.data()
              if (data?.src) {
                images[serviceName as keyof ServiceImages] = data.src
              }
            }
          } catch (err) {
            console.error(`Erreur lors de la récupération de l'image pour ${serviceName}:`, err)
            // Garder l'image par défaut pour ce service
          }
        }
        
        setServiceImages(images)
      } catch (err) {
        console.error('Erreur lors de la récupération des images des services:', err)
        setError('Erreur lors du chargement des images')
        // Garder les images par défaut en cas d'erreur
      } finally {
        setLoading(false)
      }
    }

    fetchServiceImages()
  }, [])

  return { serviceImages, loading, error }
} 