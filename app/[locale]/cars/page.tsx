"use client"

import { useTranslations } from "next-intl"
import { getCars } from "@/data/cars"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Fuel, Calendar, Users, Gauge, Car } from "lucide-react"
import { useEffect, useState } from "react"
import type { CarData } from "@/data/cars"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function CarsPage() {
  const t = useTranslations("cars")
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carsData = await getCars()
        setCars(carsData)
      } catch (error) {
        console.error("Erreur lors du chargement des voitures:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#050b20]"></div>
      </div>
    )
  }

  const categories = Array.from(new Set(cars.map(car => car.category)))

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="cars" id="hero.title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="cars" id="hero.subtitle" />
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#050b20] mb-8 text-center">
            <EditableTranslationText namespace="cars" id="categories.title" />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const count = cars.filter((car) => car.category === category).length
              return (
                <Card key={category} className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Car className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                      <h3 className="text-xl font-semibold mb-2">
                        <EditableTranslationText namespace="cars" id={`categories.types.${category.toLowerCase()}`} />
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("categories.available", { count })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vehicle List */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-md hover:scale-[1.02]"
              >
                <div className="aspect-video bg-gray-100 rounded-t-2xl">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <CardTitle className="text-xl font-semibold text-[#050b20]">{car.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{car.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-[#050b20]">
                      €{car.price.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">
                          <EditableTranslationText namespace="cars" id={`specs.fuel.${car.fuel.toLowerCase()}`} />
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">{t("specs.seats", { count: car.seats })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">{t("specs.mileage", { count: car.mileage.toLocaleString() })}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {car.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                          <EditableTranslationText namespace="cars" id={`features.${feature.toLowerCase().replace(/\s+/g, "_")}`} />
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-medium rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                      <Link href={`/cars/vehicle/${car.id}`}>
                        <EditableTranslationText namespace="cars" id="vehicle.view_details" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#050b20] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <EditableTranslationText namespace="cars" id="cta.title" />
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            <EditableTranslationText namespace="cars" id="cta.description" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold">
              <Link href="/contact">
                <EditableTranslationText namespace="cars" id="cta.contact" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#050b20] bg-transparent"
            >
              <Link href="/appointment">
                <EditableTranslationText namespace="cars" id="cta.appointment" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 