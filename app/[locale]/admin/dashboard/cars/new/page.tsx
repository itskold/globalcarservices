"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CarForm from "@/components/admin/car-form"
import DashboardLayout from "@/components/admin/dashboard-layout"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { CarData } from "@/types/vehicles"

export default function NewCarPage() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const [car, setCar] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(!!editId)

  useEffect(() => {
    if (editId) {
      const fetchCar = async () => {
        try {
          const docRef = doc(db, "cars", editId)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setCar({ id: docSnap.id, ...docSnap.data() } as CarData)
          }
        } catch (error) {
          console.error("Error fetching car:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchCar()
    }
  }, [editId])

  if (loading) {
    return (
      <DashboardLayout>
        <div>Chargement...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {editId ? "Modifier la voiture" : "Ajouter une voiture d'occasion"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Modifier la voiture" : "Nouvelle voiture"}</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm initialData={car} />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 