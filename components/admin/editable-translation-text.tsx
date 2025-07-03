'use client'

import { useTranslations } from 'next-intl'
import { EditableTranslation } from './editable-translation'
import { useTranslationEditor } from '@/lib/contexts/translation-editor-context'

interface EditableTranslationTextProps {
  namespace: string
  id: string
}

export function EditableTranslationText({ namespace, id }: EditableTranslationTextProps) {
  const t = useTranslations(namespace)
  const { isEditMode } = useTranslationEditor()
  const translationKey = `${namespace}.${id}`
  const translatedText = t(id)

  if (!isEditMode) {
    return translatedText
  }

  return (
    <EditableTranslation translationKey={translationKey}>
      {translatedText}
    </EditableTranslation>
  )
} 