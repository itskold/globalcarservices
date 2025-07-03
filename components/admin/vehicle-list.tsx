"use client"

import { useState, useEffect } from "react"
import { db, storage } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { VehicleData } from "@/types/vehicles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Pencil, ImagePlus, X } from "lucide-react"
import { EditableImage } from "./editable-image"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "vehicles"))
      const vehicleData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VehicleData[]
      setVehicles(vehicleData)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      try {
        await deleteDoc(doc(db, "vehicles", id))
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id))
      } catch (error) {
        console.error("Error deleting vehicle:", error)
      }
    }
  }

  const handleImageUpdate = async (vehicle: VehicleData, file: File, index: number) => {
    try {
      // Créer une référence unique pour l'image
      const storageRef = ref(storage, `vehicles/${vehicle.id}/${Date.now()}_${file.name}`)
      
      // Upload le fichier
      await uploadBytes(storageRef, file)
      
      // Obtenir l'URL de l'image
      const imageUrl = await getDownloadURL(storageRef)

      const updatedImages = [...(vehicle.images || [])]
      if (index >= updatedImages.length) {
        updatedImages.push(imageUrl)
      } else {
        updatedImages[index] = imageUrl
      }

      const updatedVehicle = {
        ...vehicle,
        images: updatedImages,
        image: updatedImages[0] || vehicle.image // Met à jour l'image principale si c'est la première image
      }

      await updateDoc(doc(db, "vehicles", vehicle.id), updatedVehicle)
      setVehicles(vehicles.map(v => v.id === vehicle.id ? updatedVehicle : v))
      
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

  const handleDeleteImage = async (vehicle: VehicleData, index: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return

    const updatedImages = [...(vehicle.images || [])]
    updatedImages.splice(index, 1)

    const updatedVehicle = {
      ...vehicle,
      images: updatedImages,
      image: updatedImages[0] || "" // Met à jour l'image principale si on supprime la première image
    }

    try {
      await updateDoc(doc(db, "vehicles", vehicle.id), updatedVehicle)
      setVehicles(vehicles.map(v => v.id === vehicle.id ? updatedVehicle : v))
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
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{vehicle.title}</CardTitle>
            <div className="flex gap-2">
              <Link href={`/admin/dashboard/vehicles/new?edit=${vehicle.id}`}>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(vehicle.id)}
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
                    {vehicle.images?.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteImage(vehicle, index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <EditableImage
                          src={imageUrl}
                          alt={`${vehicle.title} - Image ${index + 1}`}
                          width={150}
                          height={100}
                          className="rounded-lg object-cover w-full h-[100px]"
                          onImageUpdate={(file) => handleImageUpdate(vehicle, file, index)}
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
                            await handleImageUpdate(vehicle, file, (vehicle.images?.length || 0))
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
                  <p>{vehicle.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Catégorie</p>
                  <p>{vehicle.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p>{vehicle.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prix (4h)</p>
                  <p>€{vehicle.pricing[0].price}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 