"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LanguageSwitcher from '@/components/language-switcher'
import { useLocale } from 'next-intl'
import { EditableTranslationText } from './admin/editable-translation-text'

export default function Header() {
  const t = useTranslations('navigation')
  const tServices = useTranslations('services')
  const pathname = usePathname()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navigation = [
    { name: 'home', href: `/${locale}` },
    { name: 'services', href: `/${locale}/services`, hasMegaMenu: true },
    { name: 'rental', href: `/${locale}/rental` },
    { name: 'about', href: `/${locale}/about` },
    { name: 'contact', href: `/${locale}/contact` },
  ]

  const megaMenuItems = {
    maintenance: [
      { name: 'diagnostic', href: `/${locale}/services/diagnostic` },
      { name: 'repair', href: `/${locale}/services/repair` },
      { name: 'revision', href: `/${locale}/services/revision` },
      { name: 'maintenance', href: `/${locale}/services/maintenance` },
    ],
    rental: [
      { name: 'all', href: `/${locale}/rental` },
      { name: 'van', href: `/${locale}/rental/van` },
      { name: 'box', href: `/${locale}/rental/box` },
      { name: 'minibus', href: `/${locale}/rental/minibus` },
      { name: 'refrigerated', href: `/${locale}/rental/refrigerated` },
      // { name: 'conditions', href: `/${locale}/rental/conditions` },
    ],
    extra: [
      { name: 'usedCars', href: `/${locale}/cars` },
      { name: 'breakdown', href: `/${locale}/breakdown` },
      { name: 'quote', href: `/${locale}/contact` },
      { name: 'advice', href: `/${locale}/contact` },
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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
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
                  <EditableTranslationText namespace="navigation" id={item.name} />
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
                            <h3 className="text-lg font-semibold text-[#050b20] mb-4 border-b border-[#56aad1] pb-2">
                              <EditableTranslationText namespace="services" id={`${category}.title`} />
                            </h3>
                            <ul className="space-y-3">
                              {items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-gray-600 hover:text-[#050b20] hover:bg-gray-50 block px-3 py-2 rounded-md transition-colors"
                                    onClick={() => setIsMegaMenuOpen(false)}
                                  >
                                    <EditableTranslationText 
                                      namespace="services" 
                                      id={`${category}.${subItem.name}`} 
                                    />
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
            <LanguageSwitcher />
            <Button asChild className="bg-[#56aad1] hover:bg-[#7bb8d9] text-[#050b20] font-medium">
              <Link href={`/${locale}/appointment`}>
                <EditableTranslationText namespace="navigation" id="appointment" />
              </Link>
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
                      <EditableTranslationText namespace="navigation" id={item.name} />
                    </Link>
                    {item.hasMegaMenu && (
                      <div className="ml-6 mt-2 space-y-2">
                        {Object.entries(megaMenuItems).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="text-sm font-semibold text-[#050b20] mb-2">
                              <EditableTranslationText namespace="services" id={`${category}.title`} />
                            </h4>
                            <ul className="space-y-1 ml-4">
                              {items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-gray-600 hover:text-[#050b20] text-sm block py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <EditableTranslationText 
                                      namespace="services" 
                                      id={`${category}.${subItem.name}`} 
                                    />
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
                  <LanguageSwitcher />
                </div>
                <Button asChild className="bg-[#56aad1] hover:bg-[#7bb8d9] text-[#050b20] font-medium mt-4">
                  <Link href={`/${locale}/appointment`}>
                    <EditableTranslationText namespace="navigation" id="appointment" />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
