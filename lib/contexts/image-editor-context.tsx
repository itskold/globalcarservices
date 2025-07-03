'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ImageEditorContextType {
  isEditMode: boolean
  toggleEditMode: () => void
}

const ImageEditorContext = createContext<ImageEditorContextType | undefined>(undefined)

export function ImageEditorProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev)
  }

  return (
    <ImageEditorContext.Provider value={{
      isEditMode,
      toggleEditMode,
    }}>
      {children}
    </ImageEditorContext.Provider>
  )
}

export function useImageEditor() {
  const context = useContext(ImageEditorContext)
  if (context === undefined) {
    throw new Error('useImageEditor must be used within an ImageEditorProvider')
  }
  return context
} 