"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { VehicleData } from "@/types/vehicles"
import { Package } from "lucide-react"

export default function VehicleForm() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<FileList | null>(null)
  const [formData, setFormData] = useState<Partial<VehicleData>>({
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
  })

  const handleImageUpload = async (files: FileList) => {
    const uploadedUrls = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const storageRef = ref(storage, `vehicles/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      uploadedUrls.push(url)
    }
    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrls: string[] = []
      if (images) {
        imageUrls = await handleImageUpload(images)
      }

      const vehicleData = {
        ...formData,
        images: imageUrls,
        image: imageUrls[0] || "",
      }

      await addDoc(collection(db, "vehicles"), vehicleData)
      
      // Reset form
      setFormData({
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
      })
      setImages(null)
    } catch (error) {
      console.error("Error adding vehicle:", error)
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

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Images</h3>
        <div className="space-y-2">
          <Label htmlFor="images">Sélectionner des images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Ajout en cours..." : "Ajouter le véhicule"}
      </Button>
    </form>
  )
} 