"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

export default function Hero() {
  const t = useTranslations("home.hero")
  const params = useParams()
  const locale = params.locale as string

  return (
    <section className="relative h-screen flex items-center justify-center rounded-t-[4rem]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-vans.jpg"
          alt="Global Car Services"
          fill
          className="object-cover rounded-t-[4rem]"
          priority
        />
        {/*<div className="absolute inset-0 bg-[#050b20]/70"></div>*/}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {t("title")}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold text-lg px-8 py-4"
          >
            <Link href={`/${locale}/rental`}>{t("rentButton")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#050b20] bg-transparent text-lg px-8 py-4"
          >
            <Link href={`/${locale}/appointment`}>{t("appointmentButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
