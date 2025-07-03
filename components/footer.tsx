"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { EditableTranslation } from "./admin/editable-translation"

export default function Footer() {
  const t = useTranslations("footer")
  const params = useParams()
  const locale = params.locale as string

  return (
    <footer className="bg-[#050b20] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <EditableTranslation translationKey="footer.company.title">
                {t("company.title")}
              </EditableTranslation>
            </h3>
            <p className="text-gray-300 mb-4">
              <EditableTranslation translationKey="footer.company.description">
                {t("company.description")}
              </EditableTranslation>
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <EditableTranslation translationKey="footer.services.title">
                {t("services.title")}
              </EditableTranslation>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services/maintenance`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.services.maintenance">
                    {t("services.maintenance")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/repair`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.services.repair">
                    {t("services.repair")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rental`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.services.rental">
                    {t("services.rental")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/breakdown`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.services.breakdown">
                    {t("services.breakdown")}
                  </EditableTranslation>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <EditableTranslation translationKey="footer.quickLinks.title">
                {t("quickLinks.title")}
              </EditableTranslation>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.quickLinks.about">
                    {t("quickLinks.about")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.quickLinks.contact">
                    {t("quickLinks.contact")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.quickLinks.appointment">
                    {t("quickLinks.appointment")}
                  </EditableTranslation>
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rental/conditions`} className="text-gray-300 hover:text-white transition-colors">
                  <EditableTranslation translationKey="footer.quickLinks.conditions">
                    {t("quickLinks.conditions")}
                  </EditableTranslation>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <EditableTranslation translationKey="footer.contact.title">
                {t("contact.title")}
              </EditableTranslation>
            </h3>
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
                  <EditableTranslation translationKey="footer.contact.address">
                    {t("contact.address")}
                  </EditableTranslation>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <EditableTranslation translationKey="footer.copyright">
            {t("copyright")}
          </EditableTranslation>
        </div>
      </div>
    </footer>
  )
}
