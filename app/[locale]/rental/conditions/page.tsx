import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { User, FileText, CreditCard, Shield, MapPin, Clock, AlertTriangle, Car } from "lucide-react"
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

export default function RentalConditionsPage() {
  const t = useTranslations("rental.conditions")

  const conditions = [
    {
      icon: User,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.driver.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.driver.content" />,
    },
    {
      icon: FileText,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.documents.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.documents.content" />,
    },
    {
      icon: CreditCard,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.payment.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.payment.content" />,
    },
    {
      icon: Shield,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.insurance.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.insurance.content" />,
    },
    {
      icon: Car,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.usage.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.usage.content" />,
    },
    {
      icon: MapPin,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.mileage.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.mileage.content" />,
    },
    {
      icon: AlertTriangle,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.accident.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.accident.content" />,
    },
    {
      icon: Clock,
      title: <EditableTranslationText namespace="rental.conditions" id="conditions.cancellation.title" />,
      content: <EditableTranslationText namespace="rental.conditions" id="conditions.cancellation.content" />,
    },
  ]

  const faqs = [
    {
      question: <EditableTranslationText namespace="rental.conditions" id="faq.pickup.question" />,
      answer: <EditableTranslationText namespace="rental.conditions" id="faq.pickup.answer" />,
    },
    {
      question: <EditableTranslationText namespace="rental.conditions" id="faq.damage.question" />,
      answer: <EditableTranslationText namespace="rental.conditions" id="faq.damage.answer" />,
    },
    {
      question: <EditableTranslationText namespace="rental.conditions" id="faq.extension.question" />,
      answer: <EditableTranslationText namespace="rental.conditions" id="faq.extension.answer" />,
    },
    {
      question: <EditableTranslationText namespace="rental.conditions" id="faq.included.question" />,
      answer: <EditableTranslationText namespace="rental.conditions" id="faq.included.answer" />,
    },
    {
      question: <EditableTranslationText namespace="rental.conditions" id="faq.insurance.question" />,
      answer: <EditableTranslationText namespace="rental.conditions" id="faq.insurance.answer" />,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <EditableTranslationText namespace="rental.conditions" id="hero.title" />
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <EditableTranslationText namespace="rental.conditions" id="hero.subtitle" />
            </p>
          </div>
        </div>
      </section>

      {/* General Conditions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="rental.conditions" id="general.title" />
            </h2>
            <p className="text-xl text-gray-600">
              <EditableTranslationText namespace="rental.conditions" id="general.subtitle" />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((condition, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#95c8e2] rounded-full flex items-center justify-center mb-4">
                    <condition.icon className="h-8 w-8 text-[#050b20]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#050b20]">{condition.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 whitespace-pre-line">{condition.content}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Shield className="h-6 w-6 mr-2 text-[#95c8e2]" />
                  <EditableTranslationText namespace="rental.conditions" id="insurance.title" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">
                    <EditableTranslationText namespace="rental.conditions" id="insurance.basic.title" />
                  </h4>
                  <p className="text-gray-600">
                    <EditableTranslationText namespace="rental.conditions" id="insurance.basic.description" />
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">
                    <EditableTranslationText namespace="rental.conditions" id="insurance.options.title" />
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="insurance.options.deductible" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="insurance.options.driver" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="insurance.options.tire" />
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Restrictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <AlertTriangle className="h-6 w-6 mr-2 text-[#95c8e2]" />
                  <EditableTranslationText namespace="rental.conditions" id="restrictions.title" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">
                    <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.title" />
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.halfDay" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.day" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.weekend" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.fiveDays" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.mileage.week" />
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">
                    <EditableTranslationText namespace="rental.conditions" id="restrictions.extraKm.title" />
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.extraKm.van" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.extraKm.minibus" />
                    </li>
                    <li>
                      <EditableTranslationText namespace="rental.conditions" id="restrictions.extraKm.refrigerated" />
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <EditableTranslationText namespace="rental.conditions" id="penalties.title" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  <EditableTranslationText namespace="rental.conditions" id="penalties.late.title" />
                </h4>
                <p className="text-red-700">
                  <EditableTranslationText namespace="rental.conditions" id="penalties.late.description" />
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  <EditableTranslationText namespace="rental.conditions" id="penalties.traffic.title" />
                </h4>
                <p className="text-red-700">
                  <EditableTranslationText namespace="rental.conditions" id="penalties.traffic.description" />
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">
              <EditableTranslationText namespace="rental.conditions" id="faq.title" />
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#050b20] hover:text-[#95c8e2]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
