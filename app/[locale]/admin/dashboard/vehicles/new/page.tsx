"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VehicleForm from "@/components/admin/vehicle-form"
import DashboardLayout from "@/components/admin/dashboard-layout"

export default function NewVehiclePage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ajouter un véhicule de location</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouveau véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 