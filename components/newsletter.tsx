"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Send, CheckCircle } from 'lucide-react'
import { EditableTranslation } from './admin/editable-translation'
import { useTranslations } from 'next-intl'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Afficher l'alerte de confirmation
        setShowSuccessAlert(true)
        setEmail('')
        
        // Masquer l'alerte après 5 secondes
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 5000)
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        {/* Left side - Title and Description */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">
            <EditableTranslation translationKey="newsletter.title">
              {t('title')}
            </EditableTranslation>
          </h3>
          <p className="text-gray-300">
            <EditableTranslation translationKey="newsletter.description">
              {t('description')}
            </EditableTranslation>
          </p>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#56aad1]"
                required
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#56aad1] hover:bg-[#4a95b8] text-white px-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Alerte de confirmation */}
            {showSuccessAlert && (
              <Alert className="mt-4 border-green-600 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>
                    <EditableTranslation translationKey="newsletter.success">
                      {t('success')}
                    </EditableTranslation>
                  </strong>
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 