'use client'

import Image from 'next/image'
import { useImageEditor } from '@/lib/contexts/image-editor-context'
import { useToast } from '@/components/ui/use-toast'
import { db, storage } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import type { ImageProps } from 'next/image'

type EditableImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  documentName?: string; // Nom du document dans la collection images
  collectionName?: string; // Nom de la collection (par défaut: 'images')
  onImageUpdate?: (file: File) => void;
}

export function EditableImage({ 
  src,
  className,
  documentName,
  collectionName = 'images',
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
        // Si on a un documentName, mettre à jour dans Firestore
        if (documentName) {
          await updateImageInFirestore(file, documentName, collectionName)
        }
        
        // Appeler le callback onImageUpdate avec le fichier (pour compatibilité)
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

  const updateImageInFirestore = async (file: File, docName: string, collName: string) => {
    try {
      // Upload l'image vers Firebase Storage
      const storageRef = ref(storage, `${collName}/${docName}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      
      // Obtenir l'URL de l'image
      const imageUrl = await getDownloadURL(storageRef)
      
      // Mettre à jour le document dans Firestore
      const docRef = doc(db, collName, docName)
      await updateDoc(docRef, {
        src: imageUrl,
        updatedAt: new Date()
      })
      
      toast({
        title: "Succès",
        description: "L'image a été mise à jour",
      })
      
      // Recharger la page pour afficher la nouvelle image
      window.location.reload()
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'image:', error)
      throw error
    }
  }

  const imageProps = {
    src,
    className: `${className || ''} ${isEditMode ? 'cursor-pointer hover:opacity-80' : ''}`.trim(),
    onClick: handleImageClick,
    ...props
  }

  return <Image {...imageProps} />
} 