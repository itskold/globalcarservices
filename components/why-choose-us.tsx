"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Award, HeartHandshake } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Betrouwbaar & Veilig",
      description: "Al onze voertuigen worden regelmatig onderhouden en gecontroleerd voor uw veiligheid.",
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "24/7 Service",
      description: "Pechverhelping en klantenservice beschikbaar rond de klok, 7 dagen per week.",
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Ervaren Team",
      description: "Meer dan 15 jaar ervaring in de automotive sector met gecertificeerde monteurs.",
    },
    {
      icon: <HeartHandshake className="h-12 w-12" />,
      title: "Persoonlijke Service",
      description: "Wij kennen onze klanten en bieden op maat gemaakte oplossingen voor elke situatie.",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Waarom kiezen voor Global Car Services?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ontdek waarom duizenden klanten ons vertrouwen voor hun automotive behoeften.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 p-3 bg-[#95c8e2] rounded-full text-[#050b20] w-fit">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[rgba(149,200,226,1)]">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
