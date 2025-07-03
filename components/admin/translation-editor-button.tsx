'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useTranslationEditor } from '@/lib/contexts/translation-editor-context'
import { cn } from '@/lib/utils'

interface TranslationEditorButtonProps {
  className?: string
}

export function TranslationEditorButton({ className }: TranslationEditorButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const { isEditMode, toggleEditMode } = useTranslationEditor()

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdminLoggedIn') === 'true')
  }, [])

  if (!isAdmin) return null

  return (
    <div className={cn("fixed top-4 right-4 z-[9998]", className)}>
      <Button
        variant={isEditMode ? "secondary" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className="flex items-center shadow-lg bg-white hover:bg-gray-100"
      >
        <Languages className="h-4 w-4 mr-2" />
        {isEditMode ? 'Désactiver l\'édition' : 'Éditer les traductions'}
      </Button>
    </div>
  )
} 