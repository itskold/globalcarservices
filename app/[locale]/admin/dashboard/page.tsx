"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Car, 
  Package, 
  Image as ImageIcon,
  Languages,
  Settings,
  FolderTree
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Gestion des voitures */}
        <Link href="/admin/dashboard/cars">
          <Card className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Car className="w-8 h-8 text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold">Vente</h2>
                <p className="text-gray-500">Gérer les voitures d'occasion</p>
              </div>
            </div>
          </Card>
        </Link>

        {/* Gestion des véhicules */}
        <Link href="/admin/dashboard/vehicles">
          <Card className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-green-500" />
              <div>
                <h2 className="text-xl font-semibold">Location</h2>
                <p className="text-gray-500">Gérer les véhicules de location</p>
              </div>
            </div>
          </Card>
        </Link>

        {/* Gestion du héros */}
        <Link href="/admin/dashboard/hero">
          <Card className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <ImageIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-xl font-semibold">Héro</h2>
                <p className="text-gray-500">Gérer les slides du héros</p>
              </div>
            </div>
          </Card>
        </Link>

        {/* Gestion des catégories */}
        <Link href="/admin/dashboard/categories">
          <Card className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <FolderTree className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-xl font-semibold">Catégories</h2>
                <p className="text-gray-500">Gérer les catégories de véhicules</p>
              </div>
            </div>
          </Card>
        </Link>

      </div>
    </div>
  )
} 