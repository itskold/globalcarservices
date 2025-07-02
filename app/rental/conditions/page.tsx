import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { User, FileText, CreditCard, Shield, MapPin, Clock, AlertTriangle, Car } from "lucide-react"

export default function RentalConditionsPage() {
  const conditions = [
    {
      icon: User,
      title: "Bestuurdersvereisten",
      content:
        "• Geldig Europees rijbewijs B (geen voorlopig rijbewijs)\n• Minimum 2 jaar rijbewijs of 25 jaar oud\n• Kopie identiteitskaart en rijbewijs vereist\n• Extra bestuurders mogelijk mits toeslag",
    },
    {
      icon: FileText,
      title: "Vereiste documenten",
      content: "• Geldig identiteitsbewijs\n• Geldig Europees rijbewijs\n• Creditcard op naam van de hoofdbestuurder\n• Ondertekende huurovereenkomst",
    },
    {
      icon: CreditCard,
      title: "Betaling en borg",
      content:
        "• Waarborgsom via creditcard blokkering\n• Terugstorting na controle voertuig\n• Facturen betaalbaar op vervaldag\n• Bij schade: forfaitaire vergoeding €500 per schadegeval",
    },
    {
      icon: Shield,
      title: "Verzekering",
      content: "• WA-verzekering inbegrepen\n• Eigen risico bij schade\n• Optionele uitbreidingen:\n  - Verlaging eigen risico\n  - Bestuurdersverzekering\n  - Band- en ruitbescherming",
    },
    {
      icon: Car,
      title: "Gebruiksvoorwaarden",
      content: "• Gebruik als goede huisvader\n• Verboden:\n  - Roken of vapen\n  - Dieren (behalve in afgesloten draagmand)\n  - Rijden buiten verharde wegen\n• Tank minimaal 1/4 vol bij inlevering\n• Voertuig proper inleveren",
    },
    {
      icon: MapPin,
      title: "Kilometerstand",
      content:
        "Inbegrepen kilometers:\n• Halve dag: 75 km\n• Dag: 200 km\n• Weekend: 400 km\n• 5 dagen: 750 km\n• Week: 1000 km\n\nToeslag per extra km:\n• Bestelwagens: 0,21€\n• Minibus: 0,19€\n• Koelwagens: 0,28€",
    },
    {
      icon: AlertTriangle,
      title: "Bij ongeval",
      content: "• Direct GLOBAL CAR SERVICES informeren\n• Indien nodig politie verwittigen\n• Ter plaatse blijven tot anders geadviseerd\n• Geen aansprakelijkheid erkennen\n• Contactgegevens andere partijen noteren",
    },
    {
      icon: Clock,
      title: "Annulering en wijziging",
      content:
        "• Annulering: 40% van totaalbedrag als schadevergoeding\n• Wijzigingen mogelijk met extra kosten\n• Te late inlevering: 50% toeslag op dagtarief\n• Verkeersboetes worden doorgerekend",
    },
  ]

  const faqs = [
    {
      question: "Kan ik het voertuig op een ander tijdstip ophalen?",
      answer:
        "Ja, we bieden flexibele ophaal- en inlevertijden. Neem contact met ons op om een afspraak te maken buiten de reguliere openingstijden.",
    },
    {
      question: "Wat gebeurt er bij schade aan het voertuig?",
      answer:
        "Bij schade geldt een forfaitaire schadevergoeding van €500 per schadegeval. Het eigen risico wordt van de borg afgetrokken. Grote schades worden afgehandeld via de verzekeringsmaatschappij. Voor bandenschade bent u zelf verantwoordelijk voor herstel of vervanging.",
    },
    {
      question: "Kan ik de huurperiode verlengen?",
      answer:
        "Ja, verlenging is mogelijk mits het voertuig beschikbaar is. Neem zo vroeg mogelijk contact met ons op om de verlenging te regelen.",
    },
    {
      question: "Wat is inbegrepen in de huurprijs?",
      answer:
        "De huurprijs omvat: WA-verzekering, kilometerstand volgens gekozen formule, 24/7 pechservice, en een schone, getankte auto bij ophaling.",
    },
    {
      question: "Ben ik verzekerd voor alle schade?",
      answer:
        "Het voertuig is WA-verzekerd met een eigen risico. U kunt optioneel kiezen voor extra verzekeringen zoals verlaging eigen risico, bestuurdersverzekering en band- en ruitbescherming. Let op: schade door het niet naleven van hoogtebeperking of offroad rijden valt niet onder de verzekering.",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Huurvoorwaarden</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Alle belangrijke informatie over het huren van onze voertuigen
            </p>
          </div>
        </div>
      </section>

      {/* General Conditions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Algemene voorwaarden</h2>
            <p className="text-xl text-gray-600">Belangrijke informatie voor het huren van uw voertuig</p>
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
                  Verzekeringen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">Basisdekking</h4>
                  <p className="text-gray-600">
                    Al onze voertuigen zijn WA-verzekerd. Bij schade geldt een eigen risico.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">Extra opties</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Verlaging eigen risico</li>
                    <li>• Bestuurdersverzekering</li>
                    <li>• Band- en ruiten bescherming</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Restrictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <AlertTriangle className="h-6 w-6 mr-2 text-[#95c8e2]" />
                  Beperkingen en Kilometerstand
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">Inbegrepen kilometers</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Halve dag: 75 km</li>
                    <li>• Dag: 200 km</li>
                    <li>• Weekend: 400 km</li>
                    <li>• 5 dagen: 750 km</li>
                    <li>• Week: 1000 km</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#050b20] mb-2">Toeslag per extra km</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Bestelwagens: 0,21€</li>
                    <li>• Minibus: 0,19€</li>
                    <li>• Koelwagens: 0,28€</li>
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
                Boetes en extra kosten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Te late inlevering</h4>
                <p className="text-red-700">
                  Elke vertraging bij het inleveren van het voertuig wordt in rekening gebracht tegen het dagtarief plus 50%.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Verkeersovertredingen</h4>
                <p className="text-red-700">
                  Boetes en kosten in verband met verkeersovertredingen zijn voor rekening van de huurder.
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
            <h2 className="text-3xl font-bold text-[#050b20] mb-4">Veelgestelde vragen</h2>
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
