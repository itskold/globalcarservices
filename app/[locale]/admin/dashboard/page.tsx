"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardLayout from "@/components/admin/dashboard-layout"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Véhicules de location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gérez votre flotte de véhicules de location</p>
            <div className="mt-4 space-x-4">
              <Link href="/admin/dashboard/vehicles">
                <Button variant="outline">Voir la liste</Button>
              </Link>
              <Link href="/admin/dashboard/vehicles/new">
                <Button>Ajouter</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voitures d'occasion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gérez votre inventaire de voitures d'occasion</p>
            <div className="mt-4 space-x-4">
              <Link href="/admin/dashboard/cars">
                <Button variant="outline">Voir la liste</Button>
              </Link>
              <Link href="/admin/dashboard/cars/new">
                <Button>Ajouter</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 