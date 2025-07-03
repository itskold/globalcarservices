"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { getVehicles, type VehicleData } from "@/data/vehicles"
import RentalFilters from "@/components/rental-filters"
import type { FilterState } from "@/types/filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Package, Fuel, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function RentalPage() {
    const t = useTranslations("rental.page")
  const [vehicles, setVehicles] = useState<VehicleData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    dateRange: { from: undefined, to: undefined },
    priceRange: [30, 100],
    vehicleTypes: [],
    brands: [],
    features: [],
    transmission: [],
    fuel: [],
    seats: [2, 9],
  })

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const allVehicles = await getVehicles()
        setVehicles(allVehicles)
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules:", error)
      } finally {
        setLoading(false)
      }
    }
    loadVehicles()
  }, [])

  // Filtrer les véhicules basés sur les filtres
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(vehicle.type)) {
      return false
    }
    if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) {
      return false
    }
    return true
  })

  // Grouper les véhicules par catégorie
  const vehiclesByCategory = vehicles.reduce((acc, vehicle) => {
    if (!acc[vehicle.category]) {
      acc[vehicle.category] = []
    }
    acc[vehicle.category].push(vehicle)
    return acc
  }, {} as { [key: string]: VehicleData[] })

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="rental.page" id="hero.title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="rental.page" id="hero.description" />
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#050b20] mb-8 text-center">
            <EditableTranslationText namespace="rental.page" id="categories.title" />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/rental/van" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Package className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                    <h3 className="text-xl font-semibold mb-2">
                      <EditableTranslationText namespace="rental.page" id="categories.van.title" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {vehiclesByCategory["Bestelwagen"]?.length || 0} <EditableTranslationText namespace="rental.page" id="categories.van.available" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rental/box" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Package className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                    <h3 className="text-xl font-semibold mb-2">
                      <EditableTranslationText namespace="rental.page" id="categories.box.title" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {vehiclesByCategory["Bakwagen"]?.length || 0} <EditableTranslationText namespace="rental.page" id="categories.box.available" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rental/minibus" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                    <h3 className="text-xl font-semibold mb-2">
                      <EditableTranslationText namespace="rental.page" id="categories.minibus.title" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {vehiclesByCategory["Minibus"]?.length || 0} <EditableTranslationText namespace="rental.page" id="categories.minibus.available" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rental/refrigerated" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Package className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                    <h3 className="text-xl font-semibold mb-2">
                      <EditableTranslationText namespace="rental.page" id="categories.refrigerated.title" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {vehiclesByCategory["Koelwagen"]?.length || 0} <EditableTranslationText namespace="rental.page" id="categories.refrigerated.available" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <RentalFilters onFiltersChange={setFilters} vehicleType="all" />

      {/* Results Count */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            {filteredVehicles.length} <EditableTranslationText namespace="rental.page" id="results.found" /> {vehicles.length} <EditableTranslationText namespace="rental.page" id="results.types" />
          </p>
        </div>
      </section>

      {/* Vehicle List */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-md hover:scale-[1.02]"
              >
                <div className="aspect-video bg-gray-100 rounded-t-2xl">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <CardTitle className="text-xl font-semibold text-[#050b20]">{vehicle.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{vehicle.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-[#050b20]">
                      <EditableTranslationText namespace="rental.page" id="vehicle.from" /> €{vehicle.pricing[0].price}
                      <span className="text-sm font-normal text-gray-600">
                        <EditableTranslationText namespace="rental.page" id="vehicle.perHours" />
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-medium rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                      <Link href={`/rental/vehicle/${vehicle.id}`}>
                        <EditableTranslationText namespace="rental.page" id="vehicle.viewDetails" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">
                <EditableTranslationText namespace="rental.page" id="conditions.title" />
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.kilometers.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.kilometers.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.periods.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.periods.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.options.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.options.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.documents.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.documents.description" />
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 bg-[#050b20] hover:bg-[#0a1530] text-white">
                <Link href="/rental/conditions">
                  <EditableTranslationText namespace="rental.page" id="conditions.fullConditions" />
                </Link>
              </Button>
            </div>
            <div>
              <img
                src="/rental.jpg"
                alt="Location de véhicules"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#050b20] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <EditableTranslationText namespace="rental.page" id="cta.title" />
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            <EditableTranslationText namespace="rental.page" id="cta.description" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold">
              <Link href="/#search">
                <EditableTranslationText namespace="rental.page" id="cta.checkAvailability" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#050b20] bg-transparent"
            >
              <Link href="/contact">
                <EditableTranslationText namespace="rental.page" id="cta.contact" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
