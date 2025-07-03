"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CarList from "@/components/admin/car-list"
import Link from "next/link"
import DashboardLayout from "@/components/admin/dashboard-layout"

export default function CarsListPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Liste des voitures d'occasion</h1>
        <Link href="/admin/dashboard/cars/new">
          <Button>Ajouter une voiture</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voitures disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <CarList />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 