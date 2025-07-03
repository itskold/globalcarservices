"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CarForm from "@/components/admin/car-form"
import DashboardLayout from "@/components/admin/dashboard-layout"

export default function NewCarPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ajouter une voiture d'occasion</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouvelle voiture</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 