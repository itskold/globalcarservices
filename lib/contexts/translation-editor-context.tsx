'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface TranslationValue {
  lang: string
  value: string
}

interface TranslationEditorContextType {
  isEditMode: boolean
  selectedKey: string | null
  translations: TranslationValue[]
  toggleEditMode: () => void
  selectTranslation: (key: string, translations: TranslationValue[]) => void
  clearSelection: () => void
  saveTranslation: (key: string, translations: TranslationValue[]) => Promise<void>
}

const TranslationEditorContext = createContext<TranslationEditorContextType | undefined>(undefined)

export function TranslationEditorProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [translations, setTranslations] = useState<TranslationValue[]>([])

  // Vérifier si l'utilisateur est connecté en tant qu'admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true'
    if (!isAdmin && isEditMode) {
      setIsEditMode(false)
      clearSelection()
    }
  }, [isEditMode])

  const toggleEditMode = () => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true'
    if (!isAdmin) {
      console.warn('Accès non autorisé : vous devez être connecté en tant qu\'administrateur')
      return
    }
    setIsEditMode((prev) => !prev)
    if (isEditMode) {
      clearSelection()
    }
  }

  const selectTranslation = async (key: string, currentTranslations: TranslationValue[]) => {
    setSelectedKey(key)
    setTranslations(currentTranslations)
  }

  const clearSelection = () => {
    setSelectedKey(null)
    setTranslations([])
  }

  const saveTranslation = async (key: string, newTranslations: TranslationValue[]) => {
    try {
      const response = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          translations: newTranslations
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save translations')
      }

      // Rafraîchir la route pour mettre à jour les traductions sans recharger toute la page
      router.refresh()
    } catch (error) {
      console.error('Error saving translations:', error)
      throw error
    }
  }

  return (
    <TranslationEditorContext.Provider
      value={{
        isEditMode,
        selectedKey,
        translations,
        toggleEditMode,
        selectTranslation,
        clearSelection,
        saveTranslation,
      }}
    >
      {children}
    </TranslationEditorContext.Provider>
  )
}

export function useTranslationEditor() {
  const context = useContext(TranslationEditorContext)
  if (context === undefined) {
    throw new Error('useTranslationEditor must be used within a TranslationEditorProvider')
  }
  return context
} 