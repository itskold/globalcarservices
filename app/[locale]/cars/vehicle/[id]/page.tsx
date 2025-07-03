"use client"

import { useState, use } from "react"
import { cars } from "@/data/cars"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Fuel, Gauge, Users, Phone, Mail, Car } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface CarPageProps {
  params: Promise<{
    id: string
  }>
}

export default function CarPage({ params }: CarPageProps) {
  const { id } = use(params)
  const car = cars.find((c) => c.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const t = useTranslations("cars.vehicle.page")

  if (!car) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{car.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{car.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={car.images[selectedImage]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImage === idx ? "ring-2 ring-[#95c8e2]" : ""
                    }`}
                  >
                    <img src={image} alt={`${car.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="text-2xl font-semibold px-6 py-3 bg-[#95c8e2] text-[#050b20]">
                    €{car.price.toLocaleString()}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < car.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({car.reviewCount} {t("reviews")})</span>
                  </div>
                </div>

                <Card className="mb-8">
                  <CardContent className="grid grid-cols-2 gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">{t("specs.year")}</p>
                        <p className="font-medium">{car.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">{t("specs.fuel")}</p>
                        <p className="font-medium">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">{t("specs.seats")}</p>
                        <p className="font-medium">{car.seats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">{t("specs.mileage")}</p>
                        <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">{t("specs.title")}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.engine")}</h3>
                        <p className="text-gray-600">{car.specifications.engine}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.power")}</h3>
                        <p className="text-gray-600">{car.specifications.power}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.consumption")}</h3>
                        <p className="text-gray-600">{car.specifications.consumption}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.color")}</h3>
                        <p className="text-gray-600">{car.specifications.color}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.interior")}</h3>
                        <p className="text-gray-600">{car.specifications.interior}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">{t("specs.doors")}</h3>
                        <p className="text-gray-600">{car.specifications.doors}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">{t("options.title")}</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {car.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full"></div>
                          <span className="text-gray-600">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">{t("included.title")}</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {car.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full"></div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Link href="tel:+32489876613" className="flex-1">
                      <Button className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20]" size="lg">
                        <Phone className="mr-2 h-5 w-5" />
                        {t("actions.call")}
                      </Button>
                    </Link>
                    <Link href="mailto:info@globalcarservices.be" className="flex-1">
                      <Button className="w-full" variant="outline" size="lg">
                        <Mail className="mr-2 h-5 w-5" />
                        {t("actions.email")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Cars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#050b20] mb-8 text-center">Vergelijkbare auto's</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cars
              .filter((c) => c.id !== car.id && c.category === car.category)
              .slice(0, 3)
              .map((similarCar) => (
                <Card
                  key={similarCar.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-md hover:scale-[1.02]"
                >
                  <div className="aspect-video bg-gray-100 rounded-t-2xl">
                    <img
                      src={similarCar.image}
                      alt={similarCar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#050b20] mb-2">{similarCar.title}</h3>
                    <p className="text-gray-600 mb-4">{similarCar.description}</p>
                    <div className="text-2xl font-bold text-[#050b20] mb-4">
                      €{similarCar.price.toLocaleString()}
                    </div>
                    <Button
                      asChild
                      className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-medium rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                      <Link href={`/cars/vehicle/${similarCar.id}`}>Details bekijken</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
} 