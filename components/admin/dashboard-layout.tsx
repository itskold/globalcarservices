"use client"

import { useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { TranslationEditor } from './translation-editor'
import { TranslationEditorProvider, useTranslationEditor } from '@/lib/contexts/translation-editor-context'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

function TranslationControls() {
  const { isEditMode, toggleEditMode, selectedKey, translations, clearSelection, saveTranslation } = useTranslationEditor()

  return (
    <>
      <Button
        variant={isEditMode ? "secondary" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className="ml-4"
      >
        <Languages className="h-4 w-4 mr-2" />
        {isEditMode ? 'Désactiver l\'édition' : 'Éditer les traductions'}
      </Button>

      {isEditMode && (
        <TranslationEditor
          isOpen={!!selectedKey}
          onClose={clearSelection}
          translationKey={selectedKey}
          translations={translations}
          onSave={saveTranslation}
        />
      )}
    </>
  )
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
        if (!isLoggedIn) {
          router.push("/admin")
        }
      }
    }
    checkAuth()
  }, [router])

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-100" : ""
  }

  return (
    <TranslationEditorProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Administration</h1>
              <TranslationControls />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </TranslationEditorProvider>
  )
} 