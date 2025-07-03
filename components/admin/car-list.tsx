"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import type { CarData } from "@/types/vehicles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function CarList() {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)

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
      } catch (error) {
        console.error("Error deleting car:", error)
      }
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
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(car.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 