'use client'

import Image from 'next/image'
import { useImageEditor } from '@/lib/contexts/image-editor-context'
import { useToast } from '@/components/ui/use-toast'
import type { ImageProps } from 'next/image'

type EditableImageProps = Omit<ImageProps, 'src'> & {
  src: string
}

export function EditableImage({ 
  src,
  className,
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
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', src) // Envoyer le chemin original

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed')
        }

        // Forcer le rechargement de l'image en ajoutant un timestamp
        const timestamp = Date.now()
        const imgElement = document.querySelector(`img[src^="${src}"]`) as HTMLImageElement
        if (imgElement) {
          const newSrc = src.includes('?') 
            ? `${src}&t=${timestamp}`
            : `${src}?t=${timestamp}`
          imgElement.src = newSrc
        }

        toast({
          title: "Succès",
          description: "L'image a été mise à jour"
        })

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