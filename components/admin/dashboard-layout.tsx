"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
        if (!isLoggedIn) {
          router.push("/admin")
        }
      }
    }
    checkAuth()
  }, [router])

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-100" : ""
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Administration</h2>
          <nav className="space-y-2">
            <div className="font-medium px-3 py-2 text-gray-500 underline">Véhicules de location</div>
            <Link 
              href="/admin/dashboard/vehicles" 
              className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${isActive("/admin/dashboard/vehicles")}`}
            >
              Liste des véhicules
            </Link>
            <Link 
              href="/admin/dashboard/vehicles/new" 
              className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${isActive("/admin/dashboard/vehicles/new")}`}
            >
              Ajouter un véhicule
            </Link>
            
            <div className="font-medium px-3 py-2 mt-4 text-gray-500 underline">Voitures d'occasion</div>
            <Link 
              href="/admin/dashboard/cars" 
              className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${isActive("/admin/dashboard/cars")}`}
            >
              Liste des voitures
            </Link>
            <Link 
              href="/admin/dashboard/cars/new" 
              className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${isActive("/admin/dashboard/cars/new")}`}
            >
              Ajouter une voiture
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
} 