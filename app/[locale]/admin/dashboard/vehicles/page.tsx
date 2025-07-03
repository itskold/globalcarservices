"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VehicleList from "@/components/admin/vehicle-list"
import Link from "next/link"
import DashboardLayout from "@/components/admin/dashboard-layout"

export default function VehiclesListPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Liste des véhicules de location</h1>
        <Link href="/admin/dashboard/vehicles/new">
          <Button>Ajouter un véhicule</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Véhicules disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleList />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 