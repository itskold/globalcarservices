"use client"

import type React from "react"
import Icon from '@mdi/react';
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TbEngine, TbManualGearbox, TbCarCrash, TbBatteryAutomotive } from "react-icons/tb"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"
import { EditableImage } from "@/components/admin/editable-image"
import { useServiceImages } from "@/lib/hooks/use-service-images"
import { mdiCarBrakeAbs } from "@mdi/js"

export default function RepairPage() {
  const t = useTranslations("repair")
  const locale = useLocale()

  const { serviceImages, loading, error } = useServiceImages()
  
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
      title: <EditableTranslationText namespace="repair" id="services.items.engine.title" />,
      description: <EditableTranslationText namespace="repair" id="services.items.engine.description" />,
    },
    {
      icon: TbManualGearbox,
      title: <EditableTranslationText namespace="repair" id="services.items.gearbox.title" />,
      description: <EditableTranslationText namespace="repair" id="services.items.gearbox.description" />,
    },
    {
      icon: mdiCarBrakeAbs,
      title: <EditableTranslationText namespace="repair" id="services.items.brakes.title" />,
      description: <EditableTranslationText namespace="repair" id="services.items.brakes.description" />,
    },
    {
      icon: TbBatteryAutomotive,
      title: <EditableTranslationText namespace="repair" id="services.items.electronics.title" />,
      description: <EditableTranslationText namespace="repair" id="services.items.electronics.description" />,
    },
  ]

  const faqs = [
    {
      question: <EditableTranslationText namespace="repair" id="faq.items.cost.question" />,
      answer: <EditableTranslationText namespace="repair" id="faq.items.cost.answer" />,
    },
    {
      question: <EditableTranslationText namespace="repair" id="faq.items.duration.question" />,
      answer: <EditableTranslationText namespace="repair" id="faq.items.duration.answer" />,
    },
    {
      question: <EditableTranslationText namespace="repair" id="faq.items.warranty.question" />,
      answer: <EditableTranslationText namespace="repair" id="faq.items.warranty.answer" />,
    },
    {
      question: <EditableTranslationText namespace="repair" id="faq.items.brands.question" />,
      answer: <EditableTranslationText namespace="repair" id="faq.items.brands.answer" />,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="repair" id="title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="repair" id="subtitle" />
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
                <EditableImage src={serviceImages.repair} alt="Repair" className="rounded-lg shadow-lg aspect-square object-cover" width={600} height={600} documentName="repair" collectionName="images"/>
                <div className="absolute -bottom-4 -right-4">
                  <div className="bg-[#56aad1] text-[#050b20] px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
                    <div className="text-center">
                      <div className="text-xs font-medium uppercase tracking-wide">
                        <EditableTranslationText namespace="repair" id="intro.experience.more_than" />
                      </div>
                      <div className="text-5xl font-bold">10+</div>
                      <div className="text-xs font-medium">
                        <EditableTranslationText namespace="repair" id="intro.experience.years" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  <EditableTranslationText namespace="repair" id="intro.description1" />
                </p>
                <p className="text-gray-700 text-lg">
                  <EditableTranslationText namespace="repair" id="intro.description2" />
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
              <EditableTranslationText namespace="repair" id="services.title" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#56aad1] rounded-full flex items-center justify-center mb-4">
                    {service.icon == mdiCarBrakeAbs ? ( <Icon path={mdiCarBrakeAbs} size={2} className="h-8 w-8 text-[#050b20]" />) : ( <service.icon className="h-8 w-8 text-[#050b20]" />)}
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
              <EditableTranslationText namespace="repair" id="faq.title" />
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#050b20] hover:text-[#56aad1]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

       {/* Appointment Form */}
       <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="maintenance" id="appointment.title" />
            </h2>
            <p className="text-xl text-gray-600">
              <EditableTranslationText namespace="maintenance" id="appointment.subtitle" />
            </p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden relative">
            <iframe
              src={`https://bbt-cloud.be/afspraak/?id=305&code=d7dd866900108196b56fcd0cc57c9aa0&lang=${locale}`}
              width="100%"
              height="800"
              frameBorder="0"
              className="w-full min-h-[800px]"
              loading="lazy"
            />
            {/* Overlay pour masquer #app-placeholder */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-white z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>
    </main>
  )
}
