"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import type { VehicleData } from "@/types/vehicles"
import { Package, Upload, X, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface VehicleFormProps {
  initialData?: VehicleData | null
}

const defaultFormData: Partial<VehicleData> = {
  icon: Package,
  title: "",
  description: "",
  pricing: [
    { duration: "4 uur", price: 0, included_km: 0 },
    { duration: "day", price: 0, included_km: 0 },
    { duration: "weekend", price: 0, included_km: 0 },
    { duration: "5_days", price: 0, included_km: 0 },
    { duration: "week", price: 0, included_km: 0 },
  ],
  km_price: 0,
  features: [],
  type: "",
  brand: "",
  year: new Date().getFullYear(),
  category: "",
  seats: 0,
  fuel: "",
  transmission: "",
  rating: 5,
  reviewCount: 0,
  images: [],
  image: "",
  specifications: {
    engine: "",
    power: "",
    consumption: "",
    doors: 0,
    luggage: "",
    aircon: true,
    gps: true,
  },
  included: [],
  extras: [{ id: "1", name: "", price: 0 }],
}

export default function VehicleForm({ initialData }: VehicleFormProps) {
  const [loading, setLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [formData, setFormData] = useState<Partial<VehicleData>>(() => {
    if (initialData) {
      return {
        ...defaultFormData,
        ...initialData,
        specifications: {
          ...defaultFormData.specifications,
          ...(initialData.specifications || {}),
        },
        pricing: initialData.pricing?.map(price => ({
          duration: price.duration,
          price: Number(price.price) || 0,
          included_km: Number(price.included_km) || 0
        })) || defaultFormData.pricing,
        features: Array.isArray(initialData.features) ? initialData.features : [],
        included: Array.isArray(initialData.included) ? initialData.included : [],
        extras: initialData.extras?.map(extra => ({
          id: extra.id || Date.now().toString(),
          name: extra.name || "",
          price: Number(extra.price) || 0
        })) || defaultFormData.extras,
        images: initialData.images || [],
        image: initialData.image || "",
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "",
        brand: initialData.brand || "",
        year: Number(initialData.year) || new Date().getFullYear(),
        category: initialData.category || "",
        seats: Number(initialData.seats) || 0,
        fuel: initialData.fuel || "",
        transmission: initialData.transmission || "",
        km_price: Number(initialData.km_price) || 0,
      }
    }
    return defaultFormData
  })
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setUploadedImages(initialData.images || [])
      console.log("Données initiales chargées:", initialData)
    }
  }, [initialData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPreviewImages = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewImages(prev => [...prev, ...newPreviewImages])
      handleImageUpload(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const newPreviewImages = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewImages(prev => [...prev, ...newPreviewImages])
      handleImageUpload(files)
    }
  }

  const handleImageUpload = async (files: FileList): Promise<string[]> => {
    setLoading(true)
    try {
      const uploadedUrls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const storageRef = ref(storage, `vehicles/${Date.now()}_${file.name}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        uploadedUrls.push(url)
      }
      setUploadedImages(prev => [...prev, ...uploadedUrls])
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls],
        image: prev.image || uploadedUrls[0] || "",
      }))
      return uploadedUrls
    } catch (error) {
      console.error("Erreur lors du téléchargement des images:", error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = async (index: number, imageUrl: string) => {
    try {
      // Supprimer l'image de Firebase Storage
      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)

      // Mettre à jour les états locaux
      setUploadedImages(prev => prev.filter((_, i) => i !== index))
      setPreviewImages(prev => prev.filter((_, i) => i !== index))
      setFormData(prev => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index) || [],
        image: index === 0 && prev.images && prev.images.length > 1 ? prev.images[1] : prev.image,
      }))
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const vehicleData = {
        ...formData,
        images: uploadedImages,
        image: uploadedImages[0] || "",
      }

      if (initialData?.id) {
        // Mode édition
        await updateDoc(doc(db, "vehicles", initialData.id), vehicleData)
      } else {
        // Mode création
        await addDoc(collection(db, "vehicles"), vehicleData)
      }
      
      // Redirection vers la liste
      router.push('/admin/dashboard/vehicles')
      router.refresh()

    } catch (error) {
      console.error("Error saving vehicle:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), ""],
    })
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const handleAddIncluded = () => {
    setFormData({
      ...formData,
      included: [...(formData.included || []), ""],
    })
  }

  const handleIncludedChange = (index: number, value: string) => {
    const newIncluded = [...(formData.included || [])]
    newIncluded[index] = value
    setFormData({ ...formData, included: newIncluded })
  }

  const handleAddExtra = () => {
    setFormData({
      ...formData,
      extras: [
        ...(formData.extras || []),
        { id: Date.now().toString(), name: "", price: 0 },
      ],
    })
  }

  const handleExtraChange = (index: number, field: "name" | "price", value: string | number) => {
    const newExtras = [...(formData.extras || [])]
    newExtras[index] = { ...newExtras[index], [field]: value }
    setFormData({ ...formData, extras: newExtras })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations de base */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations de base</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bestelwagen">Bestelwagen</SelectItem>
                <SelectItem value="Bakwagen">Bakwagen</SelectItem>
                <SelectItem value="Minibus">Minibus</SelectItem>
                <SelectItem value="Koelwagen">Koelwagen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Caractéristiques</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Année</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Places</Label>
            <Input
              id="seats"
              type="number"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel">Carburant</Label>
            <Select
              value={formData.fuel}
              onValueChange={(value) => setFormData({ ...formData, fuel: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de carburant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Essence">Essence</SelectItem>
                <SelectItem value="Électrique">Électrique</SelectItem>
                <SelectItem value="Hybride">Hybride</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <Select
              value={formData.transmission}
              onValueChange={(value) => setFormData({ ...formData, transmission: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manuelle">Manuelle</SelectItem>
                <SelectItem value="Automatique">Automatique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="km_price">Prix par km</Label>
            <Input
              id="km_price"
              type="number"
              step="0.01"
              value={formData.km_price}
              onChange={(e) => setFormData({ ...formData, km_price: parseFloat(e.target.value) })}
              required
            />
          </div>
        </div>
      </div>

      {/* Spécifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Spécifications techniques</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="engine">Moteur</Label>
            <Input
              id="engine"
              value={formData.specifications?.engine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, engine: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="power">Puissance</Label>
            <Input
              id="power"
              value={formData.specifications?.power}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, power: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="consumption">Consommation</Label>
            <Input
              id="consumption"
              value={formData.specifications?.consumption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, consumption: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doors">Nombre de portes</Label>
            <Input
              id="doors"
              type="number"
              value={formData.specifications?.doors}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, doors: parseInt(e.target.value) },
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="luggage">Capacité de chargement</Label>
            <Input
              id="luggage"
              value={formData.specifications?.luggage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, luggage: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="aircon"
                checked={formData.specifications?.aircon}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, aircon: checked },
                  })
                }
              />
              <Label htmlFor="aircon">Climatisation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="gps"
                checked={formData.specifications?.gps}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, gps: checked },
                  })
                }
              />
              <Label htmlFor="gps">GPS</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Tarification */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tarification</h3>
        <div className="space-y-4">
          {formData.pricing?.map((price, index) => (
            <div key={price.duration} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prix ({price.duration})</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={price.price}
                  onChange={(e) => {
                    const newPricing = [...(formData.pricing || [])]
                    newPricing[index] = {
                      ...newPricing[index],
                      price: parseFloat(e.target.value),
                    }
                    setFormData({ ...formData, pricing: newPricing })
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Kilomètres inclus</Label>
                <Input
                  type="number"
                  value={price.included_km}
                  onChange={(e) => {
                    const newPricing = [...(formData.pricing || [])]
                    newPricing[index] = {
                      ...newPricing[index],
                      included_km: parseInt(e.target.value),
                    }
                    setFormData({ ...formData, pricing: newPricing })
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caractéristiques supplémentaires */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Caractéristiques supplémentaires</h3>
        <div className="space-y-4">
          {formData.features?.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Caractéristique"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddFeature}>
            Ajouter une caractéristique
          </Button>
        </div>
      </div>

      {/* Services inclus */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Services inclus</h3>
        <div className="space-y-4">
          {formData.included?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => handleIncludedChange(index, e.target.value)}
                placeholder="Service inclus"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddIncluded}>
            Ajouter un service inclus
          </Button>
        </div>
      </div>

      {/* Extras */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Services additionnels</h3>
        <div className="space-y-4">
          {formData.extras?.map((extra, index) => (
            <div key={extra.id} className="grid grid-cols-2 gap-4">
              <Input
                value={extra.name}
                onChange={(e) => handleExtraChange(index, "name", e.target.value)}
                placeholder="Nom du service"
              />
              <Input
                type="number"
                step="0.01"
                value={extra.price}
                onChange={(e) => handleExtraChange(index, "price", parseFloat(e.target.value))}
                placeholder="Prix"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddExtra}>
            Ajouter un service additionnel
          </Button>
        </div>
      </div>

      {/* Section des images */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Images du véhicule</h3>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-gray-400" />
            <p className="text-lg font-medium">
              Glissez et déposez vos images ici
            </p>
            <p className="text-sm text-gray-500">
              ou cliquez pour sélectionner des fichiers
            </p>
          </div>
        </div>

        {/* Prévisualisation des images */}
        {(uploadedImages.length > 0 || previewImages.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {uploadedImages.map((imageUrl, index) => (
              <div key={imageUrl} className="relative group aspect-square">
                <Image
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, imageUrl)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary rounded-md text-white text-xs">
                    Image principale
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Enregistrement en cours..." : "Enregistrer le véhicule"}
      </Button>
    </form>
  )
} 