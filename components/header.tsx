"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Menu, Car, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: "nl", label: "NL"},
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [language, setLanguage] = useState("nl")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Diensten", href: "/services", hasMegaMenu: true },
    { name: "Verhuur", href: "/rental" },
    { name: "Over ons", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const megaMenuItems = {
    "Onderhoud & herstelling": [
      { name: "Auto onderhoud", href: "/services/maintenance" },
      { name: "Auto diagnose", href: "/services/diagnostic" },
      { name: "Auto herstelling", href: "/services/repair" },
      { name: "Volledige onderhoud", href: "/services/revision" },
    ],
    Verhuur: [
      { name: "Alle voertuigen", href: "/rental" },
      { name: "Bestelwagens", href: "/rental/van" },
      { name: "Bakwagens", href: "/rental/box" },
      { name: "Minibussen", href: "/rental/minibus" },
      { name: "Koelwagens", href: "/rental/refrigerated" },
      { name: "Huurvoorwaarden", href: "/rental/conditions" },
    ],
    "Extra diensten": [
      { name: "Tweedehands wagens", href: "/cars" },
      { name: "24/7 Pechhulp", href: "/breakdown" },
      { name: "Gratis offerte", href: "/contact" },
      { name: "Advies op maat", href: "/contact" },
    ],
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsMegaMenuOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
    }, 150)
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={200} height={200} className="p-2" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={item.hasMegaMenu ? handleMouseEnter : undefined}
                onMouseLeave={item.hasMegaMenu ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-[#050b20] px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                  {item.hasMegaMenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Mega Menu */}
                {item.hasMegaMenu && isMegaMenuOpen && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-4xl bg-white shadow-xl border border-gray-200 rounded-lg mt-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {Object.entries(megaMenuItems).map(([category, items]) => (
                          <div key={category}>
                            <h3 className="text-lg font-semibold text-[#050b20] mb-4 border-b border-[#95c8e2] pb-2">
                              {category}
                            </h3>
                            <ul className="space-y-3">
                              {items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-gray-600 hover:text-[#050b20] hover:bg-gray-50 block px-3 py-2 rounded-md transition-colors"
                                    onClick={() => setIsMegaMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[80px] h-9 px-2 border-none bg-transparent hover:bg-gray-100 rounded-full transition-colors">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">
                    {languages.find(lang => lang.code === language)?.label}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="w-[120px]">
                {languages.map((lang) => (
                  <SelectItem 
                    key={lang.code} 
                    value={lang.code}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-medium">
              <Link href="/appointment">Afspraak maken</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu openen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-[#050b20] px-3 py-2 text-lg font-medium transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasMegaMenu && (
                      <div className="ml-6 mt-2 space-y-2">
                        {Object.entries(megaMenuItems).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="text-sm font-semibold text-[#050b20] mb-2">{category}</h4>
                            <ul className="space-y-1 ml-4">
                              {items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-gray-600 hover:text-[#050b20] text-sm block py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-3 py-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full border-[#95c8e2] bg-transparent hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#95c8e2]" />
                        <span className="text-sm font-medium">
                          Changer de langue
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem 
                          key={lang.code} 
                          value={lang.code}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button asChild className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-medium mt-4">
                  <Link href="/appointment">Afspraak maken</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
