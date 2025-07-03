import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, DollarSign, Shield } from "lucide-react"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function AboutPage() {
  const t = useTranslations("about")

  const values = [
    {
      icon: Users,
      titleId: "values.personal.title",
      descriptionId: "values.personal.description",
    },
    {
      icon: Shield,
      titleId: "values.technicians.title",
      descriptionId: "values.technicians.description",
    },
    {
      icon: Clock,
      titleId: "values.speed.title",
      descriptionId: "values.speed.description",
    },
    {
      icon: DollarSign,
      titleId: "values.prices.title",
      descriptionId: "values.prices.description",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="about" id="hero.title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="about" id="hero.subtitle" />
            </p>
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
              <h2 className="text-3xl font-bold text-[#050b20] mb-6">
                <EditableTranslationText namespace="about" id="story.title" />
              </h2>
              <div className="space-y-4 text-gray-700">
                <p><EditableTranslationText namespace="about" id="story.paragraph1" /></p>
                <p><EditableTranslationText namespace="about" id="story.paragraph2" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="about" id="mission.title" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <EditableTranslationText namespace="about" id="mission.description" />
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="about" id="values.title" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#050b20]">
                    <EditableTranslationText namespace="about" id={value.titleId} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <EditableTranslationText namespace="about" id={value.descriptionId} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
