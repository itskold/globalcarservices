"use client"

import HeroSlidesManager from "@/components/admin/hero-slides-manager"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function HeroAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Gestion du héros</h1>
      </div>

      <HeroSlidesManager />
    </div>
  )
} 