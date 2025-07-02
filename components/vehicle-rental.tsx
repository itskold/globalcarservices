"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Package, Fuel, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { vehicles } from "@/data/vehicles"

export default function VehicleRental() {
  // Sélectionner 3 véhicules aléatoires
  const randomVehicles = [...vehicles]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(vehicle => ({
      ...vehicle,
      price: `€${vehicle.pricing.find(p => p.duration === "day")?.price}/dag`
    }))

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Voertuigverhuur</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek onze moderne vloot van bestelwagens en minibussen. Perfect voor verhuizingen, transport en
            groepsreizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {randomVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image src={vehicle.image} alt={vehicle.title} fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-[#95c8e2] text-[#050b20]">{vehicle.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{vehicle.title}</CardTitle>
                <CardDescription className="text-2xl font-bold text-[#050b20]">{vehicle.price}</CardDescription>
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
                    <span>{vehicle.fuel}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Inbegrepen:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#95c8e2] rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full bg-[#95C8E2] hover:bg-[#95C8E2]">
                  <Link href={`/rental/vehicle/${vehicle.id}`}>Reserveren</Link>
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
            className="border-[#050b20] text-[#050b20] hover:bg-[#95C8E2] hover:border-[#95C8E2] hover:text-white bg-transparent"
          >
            <Link href="/rental">
              <Calendar className="mr-2 h-5 w-5" />
              Bekijk alle voertuigen
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
