import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, DollarSign, Shield } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: "Persoonlijk contact",
      description: "We geloven in persoonlijke service en directe communicatie met onze klanten.",
    },
    {
      icon: Shield,
      title: "Ervaren technici",
      description: "Ons team bestaat uit gekwalificeerde professionals met jarenlange ervaring.",
    },
    {
      icon: Clock,
      title: "Snelle opvolging",
      description: "We werken efficiënt en communiceren helder over de voortgang van uw opdracht.",
    },
    {
      icon: DollarSign,
      title: "Betaalbare prijzen",
      description: "Kwaliteitsservice tegen eerlijke en transparante tarieven.",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Over ons</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Van passie naar professioneel maatwerk</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/placeholder.svg?height=400&width=600" alt="Onze garage" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">Ons verhaal</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In 2013 begon Samir met één hefbrug en een duidelijke overtuiging: als je eerlijk werkt en je vak
                  verstaat dan volgt succes. Onder de naam RS Cars bouwde hij stap voor stap aan iets groters.
                </p>
                <p>
                  Wat begon als een eenmanszaak is vandaag uitgegroeid tot een professionele garage en verhuurdienst. We
                  combineren jaren ervaring met persoonlijke service, en blijven investeren in kwaliteit, zowel in ons
                  team als in onze infrastructuur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Wat ons drijft</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wij geloven dat kwaliteit geen toeval is. Elk voertuig dat bij ons binnenkomt krijgt onze volle aandacht.
              We werken efficiënt, communiceren helder, en denken in oplossingen. Snel schakelen is standaard.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Waarom kiezen voor Global Car Services?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#050b20]">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
