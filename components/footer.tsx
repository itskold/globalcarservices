"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

export default function Footer() {
  const t = useTranslations("footer")
  const params = useParams()
  const locale = params.locale as string

  return (
    <footer className="bg-[#050b20] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("company.title")}</h3>
            <p className="text-gray-300 mb-4">
              {t("company.description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("services.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/rental`} className="text-gray-300 hover:text-white transition-colors">
                  {t("services.rental")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/maintenance`} className="text-gray-300 hover:text-white transition-colors">
                  {t("services.maintenance")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/repair`} className="text-gray-300 hover:text-white transition-colors">
                  {t("services.repair")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/breakdown`} className="text-gray-300 hover:text-white transition-colors">
                  {t("services.breakdown")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">
                  {t("quickLinks.contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment`} className="text-gray-300 hover:text-white transition-colors">
                  {t("quickLinks.appointment")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rental/conditions`} className="text-gray-300 hover:text-white transition-colors">
                  {t("quickLinks.conditions")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#95c8e2]" />
                <span className="text-gray-300">+32 489 87 66 13</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#95c8e2]" />
                <span className="text-gray-300">info@globalcarservices.be</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#95c8e2] mt-1" />
                <span className="text-gray-300">
                  {t("contact.address")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
