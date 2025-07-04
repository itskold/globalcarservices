"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { EditableTranslation } from "./admin/editable-translation"
import { EditableImage } from "./admin/editable-image"
import { useServiceImages } from "@/lib/hooks/use-service-images"

export default function Services() {
  const t = useTranslations("services")
  const { serviceImages, loading, error } = useServiceImages()

  const services = [
    {
      image: serviceImages.service1,
      titleKey: "rental.title",
      descriptionKey: "rental.description",
      buttonKey: "rental.button",
      href: "/rental",
      documentName: "service1",
    },
    {
      image: serviceImages.service2,
      titleKey: "maintenance.title",
      descriptionKey: "maintenance.description",
      buttonKey: "maintenance.button",
      href: "/services",
      documentName: "service2",
    },
    {
      image: serviceImages.service4,
      titleKey: "verkoop.title",
      descriptionKey: "verkoop.description",
      buttonKey: "verkoop.button",
      href: "/cars",
      documentName: "service4",
    },
    {
      image: serviceImages.service3,
      titleKey: "breakdown.title",
      descriptionKey: "breakdown.description",
      buttonKey: "breakdown.button",
      href: "/breakdown",
      documentName: "service3",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <EditableTranslation translationKey="services.title">
              {t("title")}
            </EditableTranslation>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <EditableTranslation translationKey="services.subtitle">
              {t("subtitle")}
            </EditableTranslation>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <EditableImage 
                  src={service.image || "/placeholder.svg"} 
                  alt={t(service.titleKey)} 
                  fill 
                  className="object-cover filter grayscale"
                  documentName={service.documentName}
                  collectionName="images"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  <EditableTranslation translationKey={`services.${service.titleKey}`}>
                    {t(service.titleKey)}
                  </EditableTranslation>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  <EditableTranslation translationKey={`services.${service.descriptionKey}`}>
                    {t(service.descriptionKey)}
                  </EditableTranslation>
                </CardDescription>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={service.href}>
                    <EditableTranslation translationKey={`services.${service.buttonKey}`}>
                      {t(service.buttonKey)}
                    </EditableTranslation>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#050b20] rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{t("help.title")}</h3>
          <p className="text-gray-300 mb-6">
            {t("help.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+32 489 87 66 13</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Van Heetveldelei 157, 2100 Antwerpen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
