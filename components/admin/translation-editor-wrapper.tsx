'use client'

import { useTranslationEditor } from '@/lib/contexts/translation-editor-context'
import { TranslationEditor } from './translation-editor'

export function TranslationEditorWrapper() {
  const {
    selectedKey,
    translations,
    clearSelection,
    saveTranslation
  } = useTranslationEditor()

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div className="absolute top-4 right-4 pointer-events-auto">
        <TranslationEditor
          isOpen={!!selectedKey}
          onClose={clearSelection}
          translationKey={selectedKey}
          translations={translations}
          onSave={saveTranslation}
        />
      </div>
    </div>
  )
} 