'use client'

import Image from 'next/image'
import { useImageEditor } from '@/lib/contexts/image-editor-context'
import { useToast } from '@/components/ui/use-toast'
import type { ImageProps } from 'next/image'

type EditableImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  onImageUpdate?: (file: File) => void;
}

export function EditableImage({ 
  src,
  className,
  onImageUpdate,
  ...props
}: EditableImageProps) {
  const { isEditMode } = useImageEditor()
  const { toast } = useToast()

  const handleImageClick = async (e: React.MouseEvent) => {
    if (!isEditMode) return

    e.preventDefault()
    e.stopPropagation()

    // Créer un input file invisible
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Vérifier la taille du fichier (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille du fichier doit être inférieure à 50MB",
          variant: "destructive"
        })
        return
      }

      try {
        // Appeler le callback onImageUpdate avec le fichier
        if (onImageUpdate) {
          onImageUpdate(file)
        }
      } catch (error) {
        console.error('Upload error:', error)
        toast({
          title: "Erreur",
          description: "Échec de l'upload de l'image",
          variant: "destructive"
        })
      }
    }

    input.click()
  }

  const imageProps = {
    src,
    className: `${className || ''} ${isEditMode ? 'cursor-pointer hover:opacity-80' : ''}`.trim(),
    onClick: handleImageClick,
    ...props
  }

  return <Image {...imageProps} />
} 