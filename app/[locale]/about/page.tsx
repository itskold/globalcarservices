import { unstable_setRequestLocale } from 'next-intl/server'
import { AboutContent } from '@/components/about-content'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <AboutContent />
}
