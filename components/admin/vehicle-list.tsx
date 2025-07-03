"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import type { VehicleData } from "@/types/vehicles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{vehicle.title}</CardTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(vehicle.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 