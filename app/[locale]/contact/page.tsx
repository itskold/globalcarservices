"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function ContactPage() {
    const t = useTranslations("contact")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
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
              <EditableTranslationText namespace="contact" id="hero.title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="contact" id="hero.subtitle" />
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">
                <EditableTranslationText namespace="contact" id="form.title" />
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="contact" id="form.firstName.label" />
                    </label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t("form.firstName.placeholder")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      <EditableTranslationText namespace="contact" id="form.lastName.label" />
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t("form.lastName.placeholder")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <EditableTranslationText namespace="contact" id="form.email.label" />
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("form.email.placeholder")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <EditableTranslationText namespace="contact" id="form.phone.label" />
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("form.phone.placeholder")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <EditableTranslationText namespace="contact" id="form.message.label" />
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("form.message.placeholder")}
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold"
                  size="lg"
                >
                  <EditableTranslationText namespace="contact" id="form.submit" />
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">
                <EditableTranslationText namespace="contact" id="info.title" />
              </h2>
              <p className="text-gray-600 mb-8">
                <EditableTranslationText namespace="contact" id="info.subtitle" />
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#050b20]">
                      <Phone className="h-5 w-5 text-[#95c8e2] mr-2" />
                      <EditableTranslationText namespace="contact" id="info.phone.title" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      <EditableTranslationText namespace="contact" id="info.phone.value" />
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#050b20]">
                      <Mail className="h-5 w-5 text-[#95c8e2] mr-2" />
                      <EditableTranslationText namespace="contact" id="info.email.title" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      <EditableTranslationText namespace="contact" id="info.email.value" />
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#050b20]">
                      <MapPin className="h-5 w-5 text-[#95c8e2] mr-2" />
                      <EditableTranslationText namespace="contact" id="info.address.title" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      <EditableTranslationText namespace="contact" id="info.address.value" />
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#050b20]">
                      <Clock className="h-5 w-5 text-[#95c8e2] mr-2" />
                      <EditableTranslationText namespace="contact" id="info.hours.title" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-gray-700">
                      <p><EditableTranslationText namespace="contact" id="info.hours.weekdays" /></p>
                      <p><EditableTranslationText namespace="contact" id="info.hours.saturday" /></p>
                      <p><EditableTranslationText namespace="contact" id="info.hours.sunday" /></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
