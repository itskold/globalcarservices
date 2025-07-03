"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VehicleForm from "@/components/admin/vehicle-form"
import DashboardLayout from "@/components/admin/dashboard-layout"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { VehicleData } from "@/types/vehicles"

export default function NewVehiclePage() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const [vehicle, setVehicle] = useState<VehicleData | null>(null)
  const [loading, setLoading] = useState(!!editId)

  useEffect(() => {
    if (editId) {
      const fetchVehicle = async () => {
        try {
          const docRef = doc(db, "vehicles", editId)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setVehicle({ id: docSnap.id, ...docSnap.data() } as VehicleData)
          }
        } catch (error) {
          console.error("Error fetching vehicle:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchVehicle()
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
          {editId ? "Modifier le véhicule" : "Ajouter un véhicule de location"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Modifier le véhicule" : "Nouveau véhicule"}</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleForm initialData={vehicle} />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 