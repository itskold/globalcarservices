"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin } from "lucide-react"

export default function Services() {
  const services = [
    {
      image: "/rental.jpg",
      title: "Voertuigverhuur",
      description: "Bestelwagens, minibussen en personenwagens voor al uw vervoersbehoeften.",
      button: "Bekijk aanbod",
      href: "/rental",
    },
    {
      image: "/repair.jpg",
      title: "Onderhoud & Reparatie",
      description: "Professionele onderhoudsdiensten en reparaties door gecertificeerde monteurs.",
      button: "Afspraak maken",
      href: "/services",
    },
    {
      image: "/dealer1-3.jpg",
      title: "Pechverhelping",
      description: "24/7 pechverhelping en sleepservice voor wanneer u ons het meest nodig heeft.",
      button: "Bekijk tweedehands aanbod ",
      href: "/breakdown",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Onze Diensten</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Van voertuigverhuur tot complete onderhoudsdiensten - wij zijn uw betrouwbare partner voor alle automotive
            behoeften.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover filter grayscale" />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={service.href}>{service.button}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#050b20] rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Nood aan hulp?</h3>
          <p className="text-gray-300 mb-6">
            Ons ervaren team staat klaar om u te helpen met al uw automotive behoeften.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+32 489 87 66 13</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Van Heetveldelei 157, 2100 Antwerpen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
