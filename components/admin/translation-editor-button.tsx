'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Languages, MoreVertical } from "lucide-react"
import { useTranslationEditor } from '@/lib/contexts/translation-editor-context'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface TranslationEditorButtonProps {
  className?: string
}

const positionClasses: Record<Position, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
}

const positionLabels: Record<Position, string> = {
  'top-right': 'Haut droite',
  'top-left': 'Haut gauche',
  'bottom-right': 'Bas droite',
  'bottom-left': 'Bas gauche',
}

export function TranslationEditorButton({ className }: TranslationEditorButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const { isEditMode, toggleEditMode } = useTranslationEditor()
  const [position, setPosition] = useState<Position>('top-right')

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdminLoggedIn') === 'true')
    // Récupérer la position sauvegardée si elle existe
    const savedPosition = localStorage.getItem('translationButtonPosition') as Position
    if (savedPosition && Object.keys(positionClasses).includes(savedPosition)) {
      setPosition(savedPosition)
    }
  }, [])

  const handlePositionChange = (newPosition: Position) => {
    setPosition(newPosition)
    localStorage.setItem('translationButtonPosition', newPosition)
  }

  if (!isAdmin) return null

  return (
    <div className={cn("fixed z-[9998] flex gap-2 items-center", positionClasses[position], className)}>
      <Button
        variant={isEditMode ? "secondary" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className="flex items-center shadow-lg bg-white hover:bg-gray-100"
      >
        <Languages className="h-4 w-4 mr-2" />
        {isEditMode ? 'Désactiver l\'édition' : 'Éditer les traductions'}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg bg-white hover:bg-gray-100 px-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(positionLabels).map(([pos, label]) => (
            <DropdownMenuItem
              key={pos}
              onClick={() => handlePositionChange(pos as Position)}
              className={cn(
                "cursor-pointer",
                position === pos && "bg-gray-100"
              )}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 