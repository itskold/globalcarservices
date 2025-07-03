"use client"

import type React from "react"
import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function AppointmentPage() {
  const t = useTranslations("appointment.page")
  const locale = useLocale()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleModel: "",
    serviceType: "",
    preferredDate: "",
    problemDescription: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appointment submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="appointment.page" id="title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="appointment.page" id="subtitle" />
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Booking System */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src={`https://bbt-cloud.be/afspraak/?id=305&code=d7dd866900108196b56fcd0cc57c9aa0&lang=${locale}`}
              width="100%"
              height="800"
              frameBorder="0"
              title={t("iframe_title")}
              className="w-full min-h-[800px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#050b20] mb-4">
            <EditableTranslationText namespace="appointment.page" id="questions.title" />
          </h2>
          <p className="text-gray-600 mb-6">
            <EditableTranslationText namespace="appointment.page" id="questions.description" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+32489876613"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold rounded-2xl transition-all hover:scale-105"
            >
              📞 +32 489 87 66 13
            </a>
            <a
              href="mailto:info@globalcarservices.be"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#050b20] text-[#050b20] hover:bg-[#050b20] hover:text-white font-semibold rounded-2xl transition-all"
            >
              ✉️ info@globalcarservices.be
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
