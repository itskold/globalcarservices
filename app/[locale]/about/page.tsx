import { unstable_setRequestLocale } from 'next-intl/server'
import { AboutContent } from '@/components/about-content'

// Force dynamic rendering to avoid build-time issues with Firebase
export const dynamic = 'force-dynamic'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <AboutContent />
}
