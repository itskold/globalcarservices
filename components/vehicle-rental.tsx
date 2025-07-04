"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Package, Fuel, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getVehicles, type VehicleData } from "@/data/vehicles"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { EditableTranslation } from "./admin/editable-translation"

export default function VehicleRental() {
  const t = useTranslations("vehicleRental")
  const [featuredVehicles, setFeaturedVehicles] = useState<VehicleData[]>([])

  useEffect(() => {
    const loadVehicles = async () => {
      const allVehicles = await getVehicles()
      // Sélectionner les 3 premiers véhicules
      const featured = allVehicles
        .slice(0, 3)
        .map(vehicle => ({
          ...vehicle,
          price: t("pricePerDay", { price: vehicle.pricing.find(p => p.duration === "day")?.price })
        }))
      setFeaturedVehicles(featured)
    }
    loadVehicles()
  }, [t])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <EditableTranslation translationKey="vehicleRental.title">
              {t("title")}
            </EditableTranslation>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <EditableTranslation translationKey="vehicleRental.subtitle">
              {t("subtitle")}
            </EditableTranslation>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image src={vehicle.image} alt={vehicle.title} fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-[#56aad1] text-[#050b20]">
                  <EditableTranslation translationKey={`vehicleRental.categories.${vehicle.category}`}>
                    {vehicle.category}
                  </EditableTranslation>
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{vehicle.title}</CardTitle>
                <CardDescription className="text-2xl font-bold text-[#050b20]">€{vehicle.pricing[0].price},-</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{vehicle.seats}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>{vehicle.specifications.luggage}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span>
                      <EditableTranslation translationKey={`vehicleRental.fuel.${vehicle.fuel}`}>
                        {vehicle.fuel}
                      </EditableTranslation>
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    <EditableTranslation translationKey="vehicleRental.included">
                      {t("included")}
                    </EditableTranslation>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#56aad1] rounded-full"></div>
                        <EditableTranslation translationKey={`vehicleRental.features.${feature}`}>
                          {feature}
                        </EditableTranslation>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full bg-[#56aad1] hover:bg-[#56aad1]">
                  <Link href={`/rental/vehicle/${vehicle.id}`}>
                    <EditableTranslation translationKey="vehicleRental.reserve">
                      {t("reserve")}
                    </EditableTranslation>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#050b20] text-[#050b20] hover:bg-[#56aad1] hover:border-[#56aad1] hover:text-white bg-transparent"
          >
            <Link href="/rental">
              <Calendar className="mr-2 h-5 w-5" />
              <EditableTranslation translationKey="vehicleRental.viewAll">
                {t("viewAll")}
              </EditableTranslation>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
