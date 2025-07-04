"use client"

import { useState, useEffect } from "react"
import { db, storage } from "@/lib/firebase"
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { HeroSlide } from "@/lib/hooks/use-hero-images"
import { Label } from "@/components/ui/label"

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les slides
  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const slidesQuery = query(
        collection(db, "hero-slides"),
        orderBy("order", "asc")
      )
      const snapshot = await getDocs(slidesQuery)
      const slidesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as HeroSlide[]
      setSlides(slidesData)
    } catch (err) {
      console.error("Erreur lors du chargement des slides:", err)
      setError("Erreur lors du chargement des slides")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (
    file: File,
    slide?: HeroSlide
  ): Promise<string> => {
    const storageRef = ref(storage, `hero-slides/${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }


  const handleUpdateSlide = async (
    slideId: string,
    file: File | null,
    buttonLink: string
  ) => {
    try {
      const slideRef = doc(db, "hero-slides", slideId)
      const updateData: Partial<HeroSlide> = { buttonLink }

      if (file) {
        const imageUrl = await handleImageUpload(file)
        updateData.src = imageUrl
      }

      await updateDoc(slideRef, updateData)
      await fetchSlides()
    } catch (err) {
      console.error("Erreur lors de la mise à jour du slide:", err)
      setError("Erreur lors de la mise à jour du slide")
    }
  }

  const handleDeleteSlide = async (slideId: string, imagePath: string) => {
    try {
      // Supprimer l'image de Storage
      const imageRef = ref(storage, imagePath)
      await deleteObject(imageRef)

      // Supprimer le document de Firestore
      await deleteDoc(doc(db, "hero-slides", slideId))

      // Mettre à jour l'ordre des slides restants
      const remainingSlides = slides.filter((s) => s.id !== slideId)
      for (let i = 0; i < remainingSlides.length; i++) {
        const slide = remainingSlides[i]
        await updateDoc(doc(db, "hero-slides", slide.id), {
          order: i + 1,
        })
      }

      await fetchSlides()
    } catch (err) {
      console.error("Erreur lors de la suppression du slide:", err)
      setError("Erreur lors de la suppression du slide")
    }
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Gestion des slides du héros</h2>


      {/* Liste des slides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide) => (
          <Card key={slide.id} className="p-4 space-y-4">
            <div className="relative aspect-video">
              <Image
                src={slide.src}
                alt={`Slide ${slide.order}`}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonLink">Lien du bouton</Label>
              <Input
                type="text"
                value={slide.buttonLink}
                onChange={(e) => handleUpdateSlide(slide.id, null, e.target.value)}
                className="mb-2"
              />
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleUpdateSlide(slide.id, file, slide.buttonLink)
                    }
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSlide(slide.id, slide.src)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 