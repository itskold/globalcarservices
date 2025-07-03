"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Search, Settings, RotateCcw, Truck, FileText, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ServicesPage() {
  const t = useTranslations("services.page")

  const mainServices = [
    {
      icon: Wrench,
      title: t("mainServices.services.maintenance.title"),
      description: t("mainServices.services.maintenance.description"),
      href: "/services/maintenance",
      color: "bg-blue-500",
    },
    {
      icon: Search,
      title: t("mainServices.services.diagnostic.title"),
      description: t("mainServices.services.diagnostic.description"),
      href: "/services/diagnostic",
      color: "bg-green-500",
    },
    {
      icon: Settings,
      title: t("mainServices.services.repair.title"),
      description: t("mainServices.services.repair.description"),
      href: "/services/repair",
      color: "bg-red-500",
    },
    {
      icon: RotateCcw,
      title: t("mainServices.services.revision.title"),
      description: t("mainServices.services.revision.description"),
      href: "/services/revision",
      color: "bg-purple-500",
    },
  ]

  const additionalServices = [
    {
      icon: Truck,
      title: t("additionalServices.services.breakdown.title"),
      description: t("additionalServices.services.breakdown.description"),
      href: "/breakdown",
      color: "bg-orange-500",
    },
    {
      icon: FileText,
      title: t("additionalServices.services.quote.title"),
      description: t("additionalServices.services.quote.description"),
      href: "/quote",
      color: "bg-teal-500",
    },
    {
      icon: MessageCircle,
      title: t("additionalServices.services.advice.title"),
      description: t("additionalServices.services.advice.description"),
      href: "/advice",
      color: "bg-indigo-500",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("mainServices.title")}</h2>
            <p className="text-xl text-gray-600">{t("mainServices.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#050b20]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button asChild className="bg-[#050b20] hover:bg-[#0a1530] text-white w-full">
                    <Link href={service.href}>{t("mainServices.services.moreInfo")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("additionalServices.title")}</h2>
            <p className="text-xl text-gray-600">{t("additionalServices.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#050b20]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button asChild className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] w-full">
                    <Link href={service.href}>{t("additionalServices.services.viewService")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#050b20] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("cta.description")}
          </p>
          <Button asChild size="lg" className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold">
            <Link href="/appointment">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
