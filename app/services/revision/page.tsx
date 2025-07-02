"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Gauge, Shield, Leaf } from "lucide-react"

export default function RevisionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    vehicleType: "",
    symptoms: "",
  })

  const services = [
    {
      icon: Search,
      title: "Volledige Inspectie",
      description: "Grondige controle van alle mechanische en elektronische systemen",
    },
    {
      icon: Gauge,
      title: "Prestatiecontrole",
      description: "Evaluatie van motor-, transmissie- en remprestaties",
    },
    {
      icon: Shield,
      title: "Veiligheidscontrole",
      description: "Inspectie van veiligheidselementen zoals remmen, banden, ophanging en verlichting",
    },
    {
      icon: Leaf,
      title: "Emissiecontrole",
      description: "Controle van het uitlaatsysteem en emissieniveaus om naleving van milieunormen te garanderen",
    },
  ]

  const faqs = [
    {
      question: "Hoe vaak moet ik een revisie laten uitvoeren?",
      answer:
        "We raden aan om elke 20.000 tot 30.000 km of om de twee jaar een volledige revisie uit te voeren, afhankelijk van wat het eerst komt. De frequentie kan echter variëren afhankelijk van het model, de leeftijd van het voertuig en uw rijgewoonten.",
    },
    {
      question: "Wat is het verschil tussen onderhoud en revisie?",
      answer:
        "Onderhoud betreft regelmatige operaties zoals olieverversingen of filtervervanging. Revisie is uitgebreider en omvat een grondige inspectie van alle voertuigsystemen, met vervanging van versleten onderdelen indien nodig.",
    },
    {
      question: "Hoe bereid ik mijn voertuig voor op een revisie?",
      answer:
        "Er is geen speciale voorbereiding nodig. Het is echter nuttig om eventuele problemen of ongewoon gedrag dat u hebt opgemerkt te noteren, zodat onze technici hier bijzondere aandacht aan kunnen besteden.",
    },
    {
      question: "Ontvang ik een gedetailleerd rapport na de revisie?",
      answer:
        "Ja, na elke revisie ontvangt u een gedetailleerd rapport met de staat van elk gecontroleerd onderdeel, de uitgevoerde werkzaamheden en onze aanbevelingen voor toekomstige interventies indien nodig.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Revision appointment:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Auto Revisie</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Volledige controle voor optimale prestaties</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
              <div className="relative">
                <img src="/Globalcar2024-34.jpg" alt="Auto revisie" className="rounded-lg shadow-lg aspect-square object-cover" />
                <div className="absolute -bottom-4 -right-4">
                  <div className="bg-[#95c8e2] text-[#050b20] px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
                    <div className="text-center">
                      <div className="text-xs font-medium uppercase tracking-wide">Meer dan</div>
                      <div className="text-5xl font-bold">10+</div>
                      <div className="text-xs font-medium">Jaren ervaring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Bij Global Car Services bieden we een complete revisieservice om de optimale werking van uw voertuig
                  te garanderen. Onze gekwalificeerde technici voeren een grondige inspectie uit van alle essentiële
                  componenten.
                </p>
                <p className="text-gray-700 text-lg">
                  Regelmatige revisies zijn essentieel om de levensduur van uw voertuig te verlengen en dure reparaties
                  te voorkomen. Vertrouw op onze expertise voor een volledige en professionele revisie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Onze Revisiediensten</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#050b20]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Veelgestelde vragen</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#050b20] hover:text-[#95c8e2]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Revisieverzoek</h2>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Uw naam
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Naam"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Uw telefoon
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Telefoonnummer"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Gewenste datum
                    </label>
                    <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type voertuig</label>
                    <Select onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city_car">Stadsauto</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV / 4x4</SelectItem>
                        <SelectItem value="station_wagon">Stationwagen</SelectItem>
                        <SelectItem value="utility">Bedrijfswagen</SelectItem>
                        <SelectItem value="other">Andere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                    Waargenomen symptomen
                  </label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="Waarmee kunnen we u van dienstzijn?"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold"
                  size="lg"
                >
                  Afspraak maken
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
