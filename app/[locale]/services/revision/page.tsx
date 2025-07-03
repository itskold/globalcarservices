"use client"

import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Gauge, Shield, Leaf } from "lucide-react"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"
import { EditableImage } from "@/components/admin/editable-image"

export default function RevisionPage() {
    const t = useTranslations("revision")
  
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
      title: <EditableTranslationText namespace="revision" id="services.items.inspection.title" />,
      description: <EditableTranslationText namespace="revision" id="services.items.inspection.description" />,
    },
    {
      icon: Gauge,
      title: <EditableTranslationText namespace="revision" id="services.items.performance.title" />,
      description: <EditableTranslationText namespace="revision" id="services.items.performance.description" />,
    },
    {
      icon: Shield,
      title: <EditableTranslationText namespace="revision" id="services.items.safety.title" />,
      description: <EditableTranslationText namespace="revision" id="services.items.safety.description" />,
    },
    {
      icon: Leaf,
      title: <EditableTranslationText namespace="revision" id="services.items.emissions.title" />,
      description: <EditableTranslationText namespace="revision" id="services.items.emissions.description" />,
    },
  ]

  const faqs = [
    {
      question: <EditableTranslationText namespace="revision" id="faq.items.frequency.question" />,
      answer: <EditableTranslationText namespace="revision" id="faq.items.frequency.answer" />,
    },
    {
      question: <EditableTranslationText namespace="revision" id="faq.items.difference.question" />,
      answer: <EditableTranslationText namespace="revision" id="faq.items.difference.answer" />,
    },
    {
      question: <EditableTranslationText namespace="revision" id="faq.items.preparation.question" />,
      answer: <EditableTranslationText namespace="revision" id="faq.items.preparation.answer" />,
    },
    {
      question: <EditableTranslationText namespace="revision" id="faq.items.report.question" />,
      answer: <EditableTranslationText namespace="revision" id="faq.items.report.answer" />,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="revision" id="title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="revision" id="subtitle" />
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <EditableImage src="/Globalcar2024-34.jpg"  alt="Revision" className="rounded-lg shadow-lg aspect-square object-cover" width={600} height={600}/>
                <div className="absolute -bottom-4 -right-4">
                  <div className="bg-[#95c8e2] text-[#050b20] px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
                    <div className="text-center">
                      <div className="text-xs font-medium uppercase tracking-wide">
                        <EditableTranslationText namespace="revision" id="intro.experience.more_than" />
                      </div>
                      <div className="text-5xl font-bold">10+</div>
                      <div className="text-xs font-medium">
                        <EditableTranslationText namespace="revision" id="intro.experience.years" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  <EditableTranslationText namespace="revision" id="intro.description1" />
                </p>
                <p className="text-gray-700 text-lg">
                  <EditableTranslationText namespace="revision" id="intro.description2" />
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="revision" id="services.title" />
            </h2>
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="revision" id="faq.title" />
            </h2>
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="revision" id="appointment.title" />
            </h2>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="revision" id="appointment.form.name.label" />
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("appointment.form.name.placeholder")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="revision" id="appointment.form.phone.label" />
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("appointment.form.phone.placeholder")}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="revision" id="appointment.form.date.label" />
                    </label>
                    <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.label" />
                    </label>
                    <Select onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("appointment.form.vehicle_type.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city_car">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.city_car" />
                        </SelectItem>
                        <SelectItem value="sedan">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.sedan" />
                        </SelectItem>
                        <SelectItem value="suv">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.suv" />
                        </SelectItem>
                        <SelectItem value="station_wagon">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.station_wagon" />
                        </SelectItem>
                        <SelectItem value="utility">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.utility" />
                        </SelectItem>
                        <SelectItem value="other">
                          <EditableTranslationText namespace="revision" id="appointment.form.vehicle_type.options.other" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                    <EditableTranslationText namespace="revision" id="appointment.form.symptoms.label" />
                  </label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder={t("appointment.form.symptoms.placeholder")}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold"
                >
                  <EditableTranslationText namespace="revision" id="appointment.form.submit" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
