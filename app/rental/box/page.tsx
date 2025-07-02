"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RentalFilters from "@/components/rental-filters"
import { vehicles } from "@/data/vehicles"

interface FilterState {
  location: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  priceRange: [number, number]
  vehicleTypes: string[]
  brands: string[]
  features: string[]
  transmission: string[]
  fuel: string[]
  seats: [number, number]
}

export default function BoxVanPage() {
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

  // Filtrer uniquement les bakwagens
  const boxVans = vehicles.filter(vehicle => vehicle.category === "Bakwagen")

  // Filtrer les véhicules basés sur les filtres
  const filteredVehicles = boxVans.filter((vehicle) => {
    if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(vehicle.type)) {
      return false
    }
    if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) {
      return false
    }
    return true
  })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bakwagens</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professionele bakwagens voor het transport van grote volumes
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <RentalFilters onFiltersChange={setFilters} vehicleType="van" />

      {/* Results Count */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            {filteredVehicles.length} van {boxVans.length} bakwagens gevonden
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
                      Vanaf €{vehicle.pricing[0].price}
                      <span className="text-sm font-normal text-gray-600"> / 4 uur</span>
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
                      <Link href={`/rental/vehicle/${vehicle.id}`}>Bekijk details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 