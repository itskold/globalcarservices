import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SmoothScrollToTop from "@/components/smooth-scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Global Car Service - Verhuur & Reparatie",
  description:
    "Ontdek ons uitgebreide assortiment nieuwe en gebruikte voertuigen, evenals onze reparatie- en onderhoudsdiensten.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Header />
        <SmoothScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  )
}
