import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SmoothScrollToTop from "@/components/smooth-scroll-to-top"
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { TranslationEditorProvider } from '@/lib/contexts/translation-editor-context'
import { TranslationEditorWrapper } from '@/components/admin/translation-editor-wrapper'
import { TranslationEditorButton } from '@/components/admin/translation-editor-button'
import { ImageEditorProvider } from '@/lib/contexts/image-editor-context'
import { ImageEditorButton } from '@/components/admin/image-editor-button'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Global Car Service - Verhuur & Reparatie",
  description:
    "Ontdek ons uitgebreide assortiment nieuwe en gebruikte voertuigen, evenals onze reparatie- en onderhoudsdiensten.",
  generator: 'v0.dev'
}

// Générer les routes statiques pour chaque locale
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'nl' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TranslationEditorProvider>
            <ImageEditorProvider>
              <Header />
              <SmoothScrollToTop />
              {children}
              <Footer />
              <TranslationEditorWrapper />
              <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                <ImageEditorButton />
                <TranslationEditorButton />
              </div>
            </ImageEditorProvider>
          </TranslationEditorProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 