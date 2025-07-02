import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050b20] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Global Car Services</h3>
            <p className="text-gray-300 mb-4">
              Uw betrouwbare partner voor voertuigverhuur, onderhoud en reparatie. Meer dan 10 jaar ervaring in de
              automotive sector.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Diensten</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rental" className="text-gray-300 hover:text-white transition-colors">
                  Voertuigverhuur
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-gray-300 hover:text-white transition-colors">
                  Onderhoud
                </Link>
              </li>
              <li>
                <Link href="/services/repair" className="text-gray-300 hover:text-white transition-colors">
                  Reparatie
                </Link>
              </li>
              <li>
                <Link href="/breakdown" className="text-gray-300 hover:text-white transition-colors">
                  Pechverhelping
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-gray-300 hover:text-white transition-colors">
                  Afspraak Maken
                </Link>
              </li>
              <li>
                <Link href="/rental/conditions" className="text-gray-300 hover:text-white transition-colors">
                  Voorwaarden
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
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
                Van Heetveldelei 157
                  <br />
                  2100 Antwerpen
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Global Car Services. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
