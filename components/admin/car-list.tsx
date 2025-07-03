"use client"

import { useState, useEffect } from "react"
import { db, storage } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { CarData } from "@/types/vehicles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Pencil, ImagePlus, X } from "lucide-react"
import { EditableImage } from "./editable-image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CarList() {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"))
      const carData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CarData[]
      setCars(carData)
    } catch (error) {
      console.error("Error fetching cars:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
      try {
        await deleteDoc(doc(db, "cars", id))
        setCars(cars.filter(car => car.id !== id))
        toast({
          title: "Succès",
          description: "La voiture a été supprimée",
        })
      } catch (error) {
        console.error("Error deleting car:", error)
        toast({
          title: "Erreur",
          description: "Échec de la suppression de la voiture",
          variant: "destructive"
        })
      }
    }
  }

  const handleImageUpdate = async (car: CarData, file: File, index: number) => {
    try {
      // Créer une référence unique pour l'image
      const storageRef = ref(storage, `cars/${car.id}/${Date.now()}_${file.name}`)
      
      // Upload le fichier
      await uploadBytes(storageRef, file)
      
      // Obtenir l'URL de l'image
      const imageUrl = await getDownloadURL(storageRef)

      const updatedImages = [...(car.images || [])]
      if (index >= updatedImages.length) {
        updatedImages.push(imageUrl)
      } else {
        updatedImages[index] = imageUrl
      }

      const updatedCar = {
        ...car,
        images: updatedImages,
        image: updatedImages[0] || car.image // Met à jour l'image principale si c'est la première image
      }

      await updateDoc(doc(db, "cars", car.id), updatedCar)
      setCars(cars.map(v => v.id === car.id ? updatedCar : v))
      
      toast({
        title: "Succès",
        description: "L'image a été mise à jour",
      })
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour de l'image",
        variant: "destructive"
      })
    }
  }

  const handleDeleteImage = async (car: CarData, index: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return

    const updatedImages = [...(car.images || [])]
    updatedImages.splice(index, 1)

    const updatedCar = {
      ...car,
      images: updatedImages,
      image: updatedImages[0] || "" // Met à jour l'image principale si on supprime la première image
    }

    try {
      await updateDoc(doc(db, "cars", car.id), updatedCar)
      setCars(cars.map(v => v.id === car.id ? updatedCar : v))
      toast({
        title: "Succès",
        description: "L'image a été supprimée",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Erreur",
        description: "Échec de la suppression de l'image",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {cars.map((car) => (
        <Card key={car.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{car.title}</CardTitle>
            <div className="flex gap-2">
              <Link href={`/admin/dashboard/cars/new?edit=${car.id}`}>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(car.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Afficher les images existantes */}
                    {car.images?.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteImage(car, index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <EditableImage
                          src={imageUrl}
                          alt={`${car.title} - Image ${index + 1}`}
                          width={150}
                          height={100}
                          className="rounded-lg object-cover w-full h-[100px]"
                          onImageUpdate={(file) => handleImageUpdate(car, file, index)}
                        />
                      </div>
                    ))}
                    {/* Bouton pour ajouter une nouvelle image */}
                    <div 
                      className="border-2 border-dashed rounded-lg flex items-center justify-center h-[100px] cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = async (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) {
                            if (file.size > 50 * 1024 * 1024) {
                              toast({
                                title: "Erreur",
                                description: "La taille du fichier doit être inférieure à 50MB",
                                variant: "destructive"
                              })
                              return
                            }
                            await handleImageUpdate(car, file, (car.images?.length || 0))
                          }
                        }
                        input.click()
                      }}
                    >
                      <ImagePlus className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Marque</p>
                  <p>{car.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Catégorie</p>
                  <p>{car.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p>€{car.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kilométrage</p>
                  <p>{car.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Année</p>
                  <p>{car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carburant</p>
                  <p>{car.fuel}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 