import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, RefreshCw, Zap } from 'lucide-react'

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
  const [isReloading, setIsReloading] = useState(false)
  const [isPurging, setIsPurging] = useState(false)

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

  const handleReload = async () => {
    setIsReloading(true)
    try {
      // Forcer le rechargement de la page pour récupérer les nouvelles traductions
      window.location.reload()
    } catch (error) {
      console.error('Failed to reload translations:', error)
    } finally {
      setIsReloading(false)
    }
  }

  const handlePurgeCache = async () => {
    setIsPurging(true)
    try {
      const response = await fetch('/api/admin/purge-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert('Cache purgé avec succès !')
      } else {
        alert(`Erreur lors de la purge: ${result.error}`)
      }
    } catch (error) {
      console.error('Failed to purge cache:', error)
      alert('Erreur lors de la purge du cache')
    } finally {
      setIsPurging(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Modifier les traductions</h3>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePurgeCache}
              disabled={isPurging}
              title="Purger le cache Vercel"
            >
              <Zap className={`h-4 w-4 ${isPurging ? 'animate-pulse' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleReload}
              disabled={isReloading}
              title="Recharger les traductions"
            >
              <RefreshCw className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
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