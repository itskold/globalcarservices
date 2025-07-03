"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { CarData } from "@/types/vehicles"
import { Car } from "lucide-react"

const CATEGORIES = ["Berline", "SUV", "Break", "Citadine", "Monospace", "Coupé", "Cabriolet"] as const
const FUEL_TYPES = ["Benzine", "Diesel", "Hybride", "Électrique"] as const
const TRANSMISSION_TYPES = ["Automatisch", "Manueel"] as const

export default function CarForm() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<FileList | null>(null)
  const [formData, setFormData] = useState<Partial<CarData>>({
    icon: Car,
    title: "",
    description: "",
    price: 0,
    features: [],
    type: "",
    brand: "",
    year: new Date().getFullYear(),
    category: "",
    seats: 5,
    fuel: "",
    transmission: "",
    mileage: 0,
    rating: 5,
    reviewCount: 0,
    specifications: {
      engine: "",
      power: "",
      consumption: "",
      doors: 4,
      color: "",
      interior: "",
    },
    included: [],
    options: [],
  })

  const handleImageUpload = async (files: FileList): Promise<string[]> => {
    const uploadedUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const storageRef = ref(storage, `cars/${Date.now()}_${file.name}`)
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

      const carData = {
        ...formData,
        images: imageUrls,
        image: imageUrls[0] || "",
      }

      await addDoc(collection(db, "cars"), carData)
      
      // Reset form
      setFormData({
        icon: Car,
        title: "",
        description: "",
        price: 0,
        features: [],
        type: "",
        brand: "",
        year: new Date().getFullYear(),
        category: "",
        seats: 5,
        fuel: "",
        transmission: "",
        mileage: 0,
        rating: 5,
        reviewCount: 0,
        specifications: {
          engine: "",
          power: "",
          consumption: "",
          doors: 4,
          color: "",
          interior: "",
        },
        included: [],
        options: [],
      })
      setImages(null)
    } catch (error) {
      console.error("Error adding car:", error)
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

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...(formData.options || []), ""],
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
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
              placeholder="ex: BMW, Mercedes, Audi"
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
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value.toLowerCase() })}
              required
              placeholder="ex: berline, suv"
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
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
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
                {TRANSMISSION_TYPES.map((transmission) => (
                  <SelectItem key={transmission} value={transmission}>
                    {transmission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">Kilométrage</Label>
            <Input
              id="mileage"
              type="number"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              step="100"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
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
              placeholder="ex: 2.0L Turbo"
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
              placeholder="ex: 258 pk"
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
              placeholder="ex: 6.5L/100km"
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
            <Label htmlFor="color">Couleur</Label>
            <Input
              id="color"
              value={formData.specifications?.color}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, color: e.target.value },
                })
              }
              required
              placeholder="ex: Portimao Blauw"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interior">Intérieur</Label>
            <Input
              id="interior"
              value={formData.specifications?.interior}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications!, interior: e.target.value },
                })
              }
              required
              placeholder="ex: Zwart Dakota leder"
            />
          </div>
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
                placeholder="ex: M Sport afwerking"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddFeature}>
            Ajouter une caractéristique
          </Button>
        </div>
      </div>

      {/* Équipements inclus */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Équipements inclus</h3>
        <div className="space-y-4">
          {formData.included?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => handleIncludedChange(index, e.target.value)}
                placeholder="ex: 12 maanden BMW garantie"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddIncluded}>
            Ajouter un équipement
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Options</h3>
        <div className="space-y-4">
          {formData.options?.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder="ex: Elektrische sportstoelen"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddOption}>
            Ajouter une option
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
        {loading ? "Ajout en cours..." : "Ajouter la voiture"}
      </Button>
    </form>
  )
} 