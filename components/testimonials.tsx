"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      rating: 5,
      text: "Uitstekende service! De bestelwagen was perfect voor onze verhuizing en het team was zeer behulpzaam.",
    },
    {
      name: "Jan Peeters",
      rating: 5,
      text: "Al jaren klant voor onderhoud van onze bedrijfswagens. Altijd professioneel en eerlijke prijzen.",
    },
    {
      name: "Sophie Laurent",
      rating: 5,
      text: "De minibus verhuur verliep vlekkeloos. Schone voertuigen en flexibele service. Zeker een aanrader!",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wat onze klanten zeggen</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lees de ervaringen van onze tevreden klanten en ontdek waarom zij voor ons kiezen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Google"
                    width={24}
                    height={24}
                    className="opacity-60"
                  />
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
