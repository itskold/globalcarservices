'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useImageEditor } from '@/lib/contexts/image-editor-context'
import { Image as ImageIcon, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface ImageEditorButtonProps {
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

export function ImageEditorButton({ className }: ImageEditorButtonProps) {
  const { isEditMode, toggleEditMode } = useImageEditor()
  const [position, setPosition] = useState<Position>('top-right')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdminLoggedIn') === 'true')
    // Récupérer la position sauvegardée si elle existe
    const savedPosition = localStorage.getItem('imageButtonPosition') as Position
    if (savedPosition && Object.keys(positionClasses).includes(savedPosition)) {
      setPosition(savedPosition)
    }
  }, [])

  const handlePositionChange = (newPosition: Position) => {
    setPosition(newPosition)
    localStorage.setItem('imageButtonPosition', newPosition)
  }

  if (!isAdmin) return null

  return (
    <div className={cn("fixed z-[9998] flex gap-2 items-center", positionClasses[position], className)}>
      <Button
        variant={isEditMode ? "secondary" : "outline"}
        onClick={toggleEditMode}
        className="flex items-center gap-2 shadow-lg bg-white hover:bg-gray-100"
        size="sm"
      >
        <ImageIcon className="h-4 w-4" />
        {isEditMode ? "Terminer l'édition" : "Éditer les images"}
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