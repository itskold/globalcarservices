"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wrench, Settings, Battery, Wind, Gauge, Car, Shield, Cog } from "lucide-react"
import { LiaOilCanSolid } from "react-icons/lia"
import { TbCarCrash,TbBatteryAutomotive } from "react-icons/tb";
import { GiCarWheel } from "react-icons/gi";


export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    vehicleType: "",
    message: "",
  })

  const services = [
    {
      icon: Settings,
      title: "Volledig onderhoud",
      description: "Volledige diagnose en preventief onderhoud van uw voertuig",
    },
    {
      icon: LiaOilCanSolid,
      title: "Olie en Filters",
      description: "Olieverversing en vervanging van essentiële filters",
    },
    {
      icon: TbCarCrash,
      title: "Remsysteem",
      description: "Controle en onderhoud van het remsysteem",
    },
    {
      icon: Wrench,
      title: "Auto herstelling",
      description: "Volledige analyse van elektronische systemen",
    },
    {
      icon: TbBatteryAutomotive,
      title: "Batterij & elektriciteit",
      description: "Controle en vervanging van elektrische systemen",
    },
    {
      icon: Wind,
      title: "Airco",
      description: "Onderhoud en bijvullen van uw airconditioningsysteem",
    },
    {
      icon: GiCarWheel,
      title: "Banden",
      description: "Balanceren, roteren en vervangen van banden",
    },
    {
      icon: Cog,
      title: "Algemene mechanica",
      description: "Diverse mechanische reparaties en interventies",
    },
  ]

  const faqs = [
    {
      question: "Wat is de prijs van onderhoud?",
      answer:
        "De prijs van onderhoud is afhankelijk van het merk en type voertuig. We bieden u een gratis offerte tijdens uw afspraak.",
    },
    {
      question: "Wat is de uitvoeringstijd van onderhoud?",
      answer:
        "De uitvoeringstijd van onderhoud hangt af van de complexiteit van de revisie. We bieden u een gratis offerte tijdens uw afspraak.",
    },
    {
      question: "Welke apparatuur wordt gebruikt voor onderhoud?",
      answer:
        "We gebruiken professionele diagnosetools en kwaliteitsreserveonderdelen om volledig en duurzaam onderhoud te garanderen.",
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
    console.log("Maintenance appointment:", formData)
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Auto Onderhoud</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Regelmatig onderhoud voor optimale prestaties</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img src="/Globalcar2024-2.jpg" alt="Auto onderhoud" className="rounded-lg shadow-lg aspect-square object-cover" />
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
                  Bij Global Car Services begrijpen we het belang van regelmatig onderhoud om uw voertuig in perfecte
                  staat te houden. Onze techniekers kennen hun vak. Met het juiste materiaal en veel ervaring zorgen zij
                  dat uw wagen helemaal in orde is.
                </p>
                <p className="text-gray-700 text-lg">
                  We bieden een complete onderhoudsdienst voor alle soorten voertuigen, ongeacht het merk.
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Onze Onderhoudsdiensten</h2>
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Afspraak maken</h2>
            <p className="text-xl text-gray-600">Boek uw onderhoud eenvoudig online. We nemen snel contact met u op.</p>
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Bericht (optioneel)
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Waarmee kunnen we u van dienst zijn?"
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
