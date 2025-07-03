"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Truck, Battery, Fuel, Wrench, Phone } from "lucide-react"
import { TbBatteryAutomotive } from "react-icons/tb";
import { BsTruckFlatbed } from "react-icons/bs";

export default function BreakdownPage() {
  const t = useTranslations("breakdown")
  const [formData, setFormData] = useState({
    location: "",
    breakdownType: "",
  })

  const services = [
    {
      icon: BsTruckFlatbed,
      title: t("services.towing.title"),
      description: t("services.towing.description"),
    },
    {
      icon: TbBatteryAutomotive,
      title: t("services.battery.title"),
      description: t("services.battery.description"),
    },
    {
      icon: Fuel,
      title: t("services.fuel.title"),
      description: t("services.fuel.description"),
    },
    {
      icon: Wrench,
      title: t("services.repair.title"),
      description: t("services.repair.description"),
    },
  ]

  const faqs = [
    {
      question: t("faq.response.question"),
      answer: t("faq.response.answer"),
    },
    {
      question: t("faq.area.question"),
      answer: t("faq.area.answer"),
    },
    {
      question: t("faq.billing.question"),
      answer: t("faq.billing.answer"),
    },
    {
      question: t("faq.highway.question"),
      answer: t("faq.highway.answer"),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Breakdown request:", formData)
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-600 text-white p-8 rounded-lg">
            <Phone className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">{t("emergency.title")}</h2>
            <a href="tel:+32489876613" className="text-4xl font-bold hover:underline">
              {t("emergency.phone")}
            </a>
            <p className="mt-4 text-lg">{t("emergency.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img src="/Globalcar2024-37.jpg" alt={t("intro.image")} className="rounded-lg shadow-lg aspect-square object-cover" />
                <div className="absolute -bottom-4 -right-4">
                  <div className="bg-[#95c8e2] text-[#050b20] px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
                    <div className="text-center">
                      <div className="text-xs font-medium uppercase tracking-wide">{t("intro.stats.prefix")}</div>
                      <div className="text-5xl font-bold">10+</div>
                      <div className="text-xs font-medium">{t("intro.stats.suffix")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  {t("intro.paragraph1")}
                </p>
                <p className="text-gray-700 text-lg">
                  {t("intro.paragraph2")}
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("services.title")}</h2>
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("faq.title")}</h2>
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

      {/* Request Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("form.title")}</h2>
            <p className="text-xl text-gray-600">
              {t("form.subtitle", { phone: "+32 489 87 66 13" })}
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.location.label")}
                  </label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t("form.location.placeholder")}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("form.type.label")}</label>
                  <Select onValueChange={(value) => setFormData({ ...formData, breakdownType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("form.type.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="battery_failure">{t("form.type.options.battery")}</SelectItem>
                      <SelectItem value="fuel_shortage">{t("form.type.options.fuel")}</SelectItem>
                      <SelectItem value="mechanical_failure">{t("form.type.options.mechanical")}</SelectItem>
                      <SelectItem value="accident">{t("form.type.options.accident")}</SelectItem>
                      <SelectItem value="other">{t("form.type.options.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold flex-1"
                    size="lg"
                    onClick={() => window.open("tel:+32489876613")}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {t("form.call", { phone: "+32 489 87 66 13" })}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold flex-1"
                    size="lg"
                  >
                    {t("form.submit")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
