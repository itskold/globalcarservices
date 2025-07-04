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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#050b20] mb-8 text-center">
            <EditableTranslationText namespace="rental.page" id="categories.title" />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(vehiclesByCategory).map(([category, vehicles]) => (
              <Link 
                key={category}
                href={`/rental/${category.toLowerCase()}`} 
                className="group"
              >
                <Card className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] border-2 border-transparent hover:border-[#56aad1]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Package className="w-12 h-12 mx-auto mb-4 text-[#56aad1]" />
                      <h3 className="text-xl font-semibold mb-2 text-[#050b20] group-hover:text-[#56aad1] transition-colors">
                        {category}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {vehicles.length} <EditableTranslationText namespace="rental.page" id="categories.van.available" />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Filters */}
      {/* <RentalFilters onFiltersChange={setFilters} vehicleType="all" /> */}

      {/* Results Count */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="text-[#56aad1] font-semibold">{filteredVehicles.length}</span> <EditableTranslationText namespace="rental.page" id="results.found" /> <span className="text-[#56aad1] font-semibold">{vehicles.length}</span> <EditableTranslationText namespace="rental.page" id="results.types" />
            </p>
          </div>
        </div>
      </section>

      {/* Vehicle List */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="koelwagen" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-gray-100 p-1 gap-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#56aad1] data-[state=active]:text-white"
              >
                <EditableTranslationText namespace="rental.page" id="categories.all.title" />
                <Badge variant="outline" className="ml-2 bg-transparent border-current">
                  {vehicles.length}
                </Badge>
              </TabsTrigger>
              {Object.keys(vehiclesByCategory).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-[#56aad1] data-[state=active]:text-white"
                >
                  {category}
                  <Badge variant="outline" className="ml-2 bg-transparent border-current">
                    {vehiclesByCategory[category].length}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-6">
                {vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="md:w-1/3 relative">
                        <div className="aspect-[4/3] relative">
                          <img
                            src={vehicle.image}
                            alt={vehicle.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-4 left-4 bg-[#56aad1] text-white">
                            {vehicle.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-[#050b20] mb-2">
                              {vehicle.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{vehicle.description}</p>
                          </div>
                        </div>

                        {/* Pricing Table */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <h4 className="text-lg font-semibold text-[#050b20] mb-3">
                            <EditableTranslationText namespace="rental.page" id="vehicle.pricing.title" />
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vehicle.pricing.map((price, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-[#56aad1] font-semibold mb-1">
                                  <EditableTranslationText 
                                    namespace="rental.page" 
                                    id={`vehicle.pricing.${price.duration}`} 
                                  />
                                </div>
                                <div className="text-2xl font-bold text-[#050b20]">
                                  €{price.price}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {price.included_km} km inclus
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                            <span className="font-semibold">
                              <EditableTranslationText namespace="rental.page" id="vehicle.pricing.extraKm" />:
                            </span>
                            €{vehicle.km_price}/km
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#56aad1]" />
                            <span>{vehicle.seats} places</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Fuel className="h-5 w-5 text-[#56aad1]" />
                            <span>{vehicle.fuel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-[#56aad1]" />
                            <span>{vehicle.specifications.luggage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[#56aad1]" />
                            <span>{vehicle.year}</span>
                          </div>
                        </div>

                        {/* Features and CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50 text-[#56aad1] border-[#56aad1]">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            asChild
                            className="bg-[#56aad1] hover:bg-[#7bb8d9] text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all px-6"
                          >
                            <Link href={`/rental/vehicle/${vehicle.id}`}>
                              <EditableTranslationText namespace="rental.page" id="vehicle.viewDetails" />
                            </Link>
                          </Button>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {Object.entries(vehiclesByCategory).map(([category, vehicles]) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  {vehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="md:w-1/3 relative">
                          <div className="aspect-[4/3] relative">
                            <img
                              src={vehicle.image}
                              alt={vehicle.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-4 left-4 bg-[#56aad1] text-white">
                              {category}
                            </Badge>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-[#050b20] mb-2">
                                {vehicle.title}
                              </h3>
                              <p className="text-gray-600 mb-4">{vehicle.description}</p>
                            </div>
                          </div>

                          {/* Pricing Table */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h4 className="text-lg font-semibold text-[#050b20] mb-3">
                              <EditableTranslationText namespace="rental.page" id="vehicle.pricing.title" />
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {vehicle.pricing.map((price, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                                  <div className="text-[#56aad1] font-semibold mb-1">
                                    <EditableTranslationText 
                                      namespace="rental.page" 
                                      id={`vehicle.pricing.${price.duration}`} 
                                    />
                                  </div>
                                  <div className="text-2xl font-bold text-[#050b20]">
                                    €{price.price}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {price.included_km} km inclus
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-semibold">
                                <EditableTranslationText namespace="rental.page" id="vehicle.pricing.extraKm" />:
                              </span>
                              €{vehicle.km_price}/km
                            </div>
                          </div>

                          {/* Specifications */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-[#56aad1]" />
                              <span>{vehicle.seats} places</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel className="h-5 w-5 text-[#56aad1]" />
                              <span>{vehicle.fuel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-5 w-5 text-[#56aad1]" />
                              <span>{vehicle.specifications.luggage}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-[#56aad1]" />
                              <span>{vehicle.year}</span>
                            </div>
                          </div>

                          {/* Features and CTA */}
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                              {vehicle.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="bg-gray-50 text-[#56aad1] border-[#56aad1]">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              asChild
                              className="bg-[#56aad1] hover:bg-[#7bb8d9] text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all px-6"
                            >
                              <Link href={`/rental/vehicle/${vehicle.id}`}>
                                <EditableTranslationText namespace="rental.page" id="vehicle.viewDetails" />
                              </Link>
                            </Button>
                          </div>

                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
                  <div className="w-2 h-2 bg-[#56aad1] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.kilometers.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.kilometers.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#56aad1] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.periods.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.periods.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#56aad1] rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong><EditableTranslationText namespace="rental.page" id="conditions.options.title" />:</strong>{" "}
                    <EditableTranslationText namespace="rental.page" id="conditions.options.description" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#56aad1] rounded-full mr-3 mt-2"></div>
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
      <section className="py-16 bg-[#56aad1] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <EditableTranslationText namespace="rental.page" id="cta.title" />
          </h2>
          <p className="text-xl text-white/90 mb-8">
            <EditableTranslationText namespace="rental.page" id="cta.description" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-[#56aad1] font-semibold">
              <Link href="/#search">
                <EditableTranslationText namespace="rental.page" id="cta.checkAvailability" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#56aad1] bg-transparent"
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
