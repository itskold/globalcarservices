"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FuelIcon as Engine, Settings, Shield, Zap } from "lucide-react"
import { TbEngine,TbManualGearbox,TbCarCrash,TbBatteryAutomotive } from "react-icons/tb";

export default function RepairPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    vehicleType: "",
    problemDescription: "",
  })

  const services = [
    {
      icon: TbEngine,
      title: "Motorreparatie",
      description: "Interventie bij alle soorten motorstoringen, van eenvoudig onderhoud tot complexe reparaties",
    },
    {
      icon: TbManualGearbox,
      title: "Versnellingsbak",
      description: "Diagnose en reparatie van handmatige en automatische versnellingsbakken",
    },
    {
      icon: TbCarCrash,
      title: "Remsysteem",
      description: "Reparatie en vervanging van remsysteemcomponenten",
    },
    {
      icon: TbBatteryAutomotive,
      title: "Elektronica",
      description: "Oplossen van elektrische en elektronische problemen",
    },
  ]

  const faqs = [
    {
      question: "Hoeveel kost een reparatie?",
      answer:
        "De kosten hangen af van de aard van de storing. We voeren een nauwkeurige diagnose uit en geven u een gedetailleerde offerte voordat we ingrijpen.",
    },
    {
      question: "Wat is de reparatietijd?",
      answer:
        "De reparatietijd hangt af van de complexiteit van het probleem. We streven ernaar om uw voertuig zo snel mogelijk te repareren, zonder afbreuk te doen aan de kwaliteit van onze service.",
    },
    {
      question: "Biedt u garantie op reparaties?",
      answer: "Ja, al onze reparaties worden gedekt door een garantie van minimaal 6 maanden.",
    },
    {
      question: "Accepteert u voertuigen van alle merken?",
      answer: "We werken aan de meeste automerken, of ze nu op benzine, diesel of elektrisch rijden.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Repair appointment:", formData)
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Auto herstelling</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Grondige autoherstellingen van schade en defecten</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
              <div className="relative">
                <img src="/Globalcar2024-25.jpg" alt="Auto reparatie" className="rounded-lg shadow-lg aspect-square object-cover" />
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
                  Bij Global Car Services kennen we auto's door en door. Onze ervaren experts pakken elke storing aan,
                  van mechanisch tot elektronisch.
                </p>
                <p className="text-gray-700 text-lg">
                  Met het beste gereedschap vinden we snel wat er scheelt en lossen we het op. Zo zorgen we ervoor dat
                  uw wagen zo snel mogelijk weer veilig de baan op kan.
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Onze reparatiediensten</h2>
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Reparatieverzoek</h2>
            <p className="text-xl text-gray-600">
              Maak een afspraak voor een reparatie van uw voertuig. Onze gekwalificeerde technici zullen de nieuwste
              reparatiehulpmiddelen gebruiken om de oorzaak van problemen nauwkeurig te identificeren.
            </p>
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
                  <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Probleembeschrijving
                  </label>
                  <Textarea
                    id="problemDescription"
                    name="problemDescription"
                    value={formData.problemDescription}
                    onChange={handleChange}
                    placeholder="Waarmee kunnen we u van dienst zijn?"
                    rows={4}
                    required
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
