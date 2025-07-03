import { ReactNode } from 'react'
import { useTranslationEditor } from '@/lib/contexts/translation-editor-context'
import { useTranslations } from 'next-intl'

interface EditableTranslationProps {
  translationKey: string
  children: ReactNode
}

export function EditableTranslation({ translationKey, children }: EditableTranslationProps) {
  const { isEditMode, selectTranslation } = useTranslationEditor()

  if (!isEditMode) {
    return <>{children}</>
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const response = await fetch('/api/admin/translations?key=' + encodeURIComponent(translationKey))
      if (!response.ok) {
        throw new Error('Failed to fetch translations')
      }
      const translations = await response.json()
      selectTranslation(translationKey, translations)
    } catch (error) {
      console.error('Error fetching translations:', error)
    }
  }

  return (
    <span
      onClick={handleClick}
      className="relative group cursor-pointer"
      title="Cliquez pour éditer la traduction"
    >
      <span className="relative">
        {children}
        <span className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    </span>
  )
} 