"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardLayout from "@/components/admin/dashboard-layout"
import { EditableTranslation } from "@/components/admin/editable-translation"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          <EditableTranslation translationKey="admin.dashboard.title">
            Tableau de bord
          </EditableTranslation>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <EditableTranslation translationKey="admin.dashboard.rental.title">
                Véhicules de location
              </EditableTranslation>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              <EditableTranslation translationKey="admin.dashboard.rental.description">
                Gérez votre flotte de véhicules de location
              </EditableTranslation>
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/admin/dashboard/vehicles">
                <Button variant="outline">
                  <EditableTranslation translationKey="admin.dashboard.rental.view">
                    Voir la liste
                  </EditableTranslation>
                </Button>
              </Link>
              <Link href="/admin/dashboard/vehicles/new">
                <Button>
                  <EditableTranslation translationKey="admin.dashboard.rental.add">
                    Ajouter
                  </EditableTranslation>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <EditableTranslation translationKey="admin.dashboard.cars.title">
                Voitures d'occasion
              </EditableTranslation>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              <EditableTranslation translationKey="admin.dashboard.cars.description">
                Gérez votre inventaire de voitures d'occasion
              </EditableTranslation>
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/admin/dashboard/cars">
                <Button variant="outline">
                  <EditableTranslation translationKey="admin.dashboard.cars.view">
                    Voir la liste
                  </EditableTranslation>
                </Button>
              </Link>
              <Link href="/admin/dashboard/cars/new">
                <Button>
                  <EditableTranslation translationKey="admin.dashboard.cars.add">
                    Ajouter
                  </EditableTranslation>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 