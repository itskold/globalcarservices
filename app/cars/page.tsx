import { cars } from "@/data/cars"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Fuel, Calendar, Users, Gauge, Car } from "lucide-react"

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Auto's te Koop</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ontdek onze selectie premium tweedehands voertuigen
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#050b20] mb-8 text-center">Onze Categorieën</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Berline", "SUV"].map((category) => {
              const count = cars.filter((car) => car.category === category).length
              return (
                <Card key={category} className="hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Car className="w-12 h-12 mx-auto mb-4 text-[#95c8e2]" />
                      <h3 className="text-xl font-semibold mb-2">{category}</h3>
                      <p className="text-gray-600 text-sm">
                        {count} beschikbare modellen
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
                    src={car.image}
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
                        <span className="text-sm text-gray-600">{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">{car.seats} zitplaatsen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm text-gray-600">{car.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {car.features.slice(0, 3).map((feature, idx) => (
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
                      <Link href={`/cars/vehicle/${car.id}`}>Details bekijken</Link>
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
          <h2 className="text-3xl font-bold mb-4">Interesse in een van onze auto's?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Neem contact met ons op voor meer informatie of om een afspraak te maken voor een proefrit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold">
              <Link href="/contact">Contact opnemen</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#050b20] bg-transparent"
            >
              <Link href="/appointment">Afspraak maken</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 