import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface TranslationValue {
  lang: string
  value: string
}

interface TranslationEditorProps {
  isOpen: boolean
  onClose: () => void
  translationKey: string | null
  translations: TranslationValue[]
  onSave: (key: string, translations: TranslationValue[]) => Promise<void>
}

export function TranslationEditor({
  isOpen,
  onClose,
  translationKey,
  translations,
  onSave,
}: TranslationEditorProps) {
  const [values, setValues] = useState<TranslationValue[]>(translations)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setValues(translations)
  }, [translations])

  const handleValueChange = (lang: string, newValue: string) => {
    setValues(prev => 
      prev.map(t => t.lang === lang ? { ...t, value: newValue } : t)
    )
  }

  const handleSave = async () => {
    if (!translationKey) return
    setIsSaving(true)
    try {
      await onSave(translationKey, values)
      onClose()
    } catch (error) {
      console.error('Failed to save translations:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Modifier les traductions</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Clé de traduction</label>
            <div className="mt-1 text-sm font-mono break-all">{translationKey}</div>
          </div>
          
          <div className="space-y-3">
            {values.map((translation) => (
              <div key={translation.lang}>
                <label className="text-sm text-gray-500 block">
                  {translation.lang.toUpperCase()}
                </label>
                <Input
                  value={translation.value}
                  onChange={(e) => handleValueChange(translation.lang, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 