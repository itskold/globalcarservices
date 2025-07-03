import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, DollarSign, Shield } from "lucide-react"

export default function AboutPage() {
  const t = useTranslations("about")

  const values = [
    {
      icon: Users,
      title: t("values.personal.title"),
      description: t("values.personal.description"),
    },
    {
      icon: Shield,
      title: t("values.technicians.title"),
      description: t("values.technicians.description"),
    },
    {
      icon: Clock,
      title: t("values.speed.title"),
      description: t("values.speed.description"),
    },
    {
      icon: DollarSign,
      title: t("values.prices.title"),
      description: t("values.prices.description"),
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/about-inner1-2.jpg" alt={t("story.image")} className="rounded-lg shadow-lg aspect-square object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">{t("story.title")}</h2>
              <div className="space-y-4 text-gray-700">
                <p>{t("story.paragraph1")}</p>
                <p>{t("story.paragraph2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("mission.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("mission.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">{t("values.title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#050b20]">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
