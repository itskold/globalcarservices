import { unstable_setRequestLocale } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { User, FileText, CreditCard, Shield, MapPin, Clock, AlertTriangle, Car, Scale } from "lucide-react"

export default function RentalConditionsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Algemene Voorwaarden
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Global Car Services - Algemene voorwaarden van toepassing op alle verhuurprestaties
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Article 1 - Toepassingsgebied */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Scale className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 1. Toepassingsgebied
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  1.1 De algemene voorwaarden zijn van toepassing op elk aanbod, elke overeenkomst en elke levering van voertuigen tussen GLOBAL CAR SERVICES en de klant, tenzij uitdrukkelijk en schriftelijk anders is overeengekomen.
                </p>
                <p className="text-gray-700">
                  1.2 Tenzij anders schriftelijk is overeengekomen wordt de klant verondersteld van deze algemene voorwaarden kennis te hebben genomen alsook van de toepassing ervan en er alle onderdelen van te hebben aanvaard.
                </p>
                <p className="text-gray-700">
                  1.3 De klant erkent dat de toepassing van zijn eventuele eigen algemene voorwaarden uitdrukkelijk wordt uitgesloten. Iedere door de klant gestelde voorwaarde of beding dat strijdig is met deze algemene voorwaarden is slechts geldig wanneer deze door GLOBAL CAR SERVICES vooraf uitdrukkelijk en schriftelijk werd aanvaard.
                </p>
                <p className="text-gray-700">
                  1.4 De eventuele gehele of gedeeltelijke ongeldigheid, nietigheid of onafdwingbaarheid van één of meerdere clausules laat het overige gedeelte onverlet.
                </p>
              </CardContent>
            </Card>

            {/* Article 2 - Gebruiksrecht */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <User className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 2. Gebruiksrecht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  2.1 Het gebruiksrecht van de voertuigen is voorbehouden voor klanten die in het bezit zijn van een geldig Europees rijbewijs klasse B dienstig voor het betrokken voertuig waarmee gereden wordt.
                </p>
                <p className="text-gray-700">
                  2.2 Een geldig Europees rijbewijs is een rijbewijs dat werd afgeleverd door een lidstaat van de EU of van de EER. Een voorlopig rijbewijs wordt niet als een geldig rijbewijs aanzien.
                </p>
                <p className="text-gray-700">
                  2.3 De klant moet minimum twee jaar in het bezit zijn van voormeld rijbewijs dan wel ouder zijn dan 25 jaar.
                </p>
                <p className="text-gray-700">
                  2.4 Opdat de klant zich kan beroepen op het gebruiksrecht dient deze een kopie van voor- en achterzijde van de identiteitskaart en van het rijbewijs te bezorgen aan GLOBAL CAR SERVICES.
                </p>
                <p className="text-gray-700">
                  2.6 Het is verboden de voertuigen te gebruiken in strijd met de geldende verzekeringsvoorwaarden. Verder is het niet toegestaan om te roken, vapen of om dieren, reptielen en/of insecten mee te nemen in een voertuig, tenzij in een daarvoor voorziene afgesloten draagmand.
                </p>
              </CardContent>
            </Card>

            {/* Article 3 - Offertes en overeenkomsten */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <FileText className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 3. Offertes en overeenkomsten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  3.1 Offertes worden nauwkeurig op maat opgesteld op basis van een gedetailleerd kennismakingsgesprek. De uitvoering van de opdracht start pas na schriftelijke goedkeuring van de offerte door de klant.
                </p>
                <p className="text-gray-700">
                  3.2 Tenzij anders vermeld zijn alle aanbiedingen en offertes van GLOBAL CAR SERVICES steeds, zowel ten aanzien van de prijs, de inhoud alsook de uitvoering, vrijblijvend.
                </p>
                <p className="text-gray-700">
                  3.3 GLOBAL CAR SERVICES is slechts gebonden tot uitvoering van de dienstverlening na schriftelijke aanvaarding van deze opdracht door GLOBAL CAR SERVICES zelf.
                </p>
                <p className="text-gray-700">
                  3.5 De in de offerte vermelde prijzen zijn uitgedrukt in euro en exclusief BTW, andere heffingen van overheidswege alsook eventuele in het kader van de overeenkomst te maken kosten.
                </p>
                <p className="text-gray-700">
                  3.7 Iedere overeenkomst tussen GLOBAL CAR SERVICES en de klant wordt geacht te zijn afgesloten op de maatschappelijke zetel van GLOBAL CAR SERVICES, met name te 2100 Antwerpen, Van Heetveldelei 157.
                </p>
              </CardContent>
            </Card>

            {/* Article 4 - Annulatie */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Clock className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 4. Annulatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  4.1 Elke annulering door de klant moet steeds schriftelijk gebeuren en is slechts geldig mits schriftelijke aanvaarding door GLOBAL CAR SERVICES.
                </p>
                <p className="text-gray-700">
                  4.2 In geval van annulering door de klant, is deze gehouden tot betaling van een forfaitaire schadevergoeding van 40% van het totaalbedrag van de offerte, onverminderd het recht van GLOBAL CAR SERVICES om haar werkelijke schade te vorderen indien deze het overeengekomen forfait zou overstijgen.
                </p>
                <p className="text-gray-700">
                  4.3 GLOBAL CAR SERVICES behoudt zich het recht voor om steeds de gedwongen uitvoering van de offerte/overeenkomst te vorderen.
                </p>
                <p className="text-gray-700">
                  4.4 Bij wijziging van de opdracht/offerte ten verzoeke van de klant, zijn alle daaruit voortvloeiende kosten voor rekening van de klant.
                </p>
              </CardContent>
            </Card>

            {/* Article 5 - Betaling */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <CreditCard className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 5. Betaling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  5.1 De verschuldigde vergoeding, verhoogd met de BTW en eventuele overige onkosten of heffingen, zal per factuur aangerekend worden aan de klant. GLOBAL CAR SERVICES behoudt zich het recht voor om een voorschotfactuur te richten aan de klant.
                </p>
                <p className="text-gray-700">
                  5.2 De facturen, dewelke niet binnen de 8 dagen na de factuurdatum per aangetekend schrijven en op omstandige wijze worden geprotesteerd, worden definitief en onherroepelijk als aanvaard beschouwd.
                </p>
                <p className="text-gray-700">
                  5.3 Niet-betaling op de vervaldag van één enkele factuur maakt het verschuldigd saldo van alle andere, zelfs van niet-vervallen facturen, van rechtswege onmiddellijk opeisbaar.
                </p>
                <p className="text-gray-700">
                  5.4 Elke som, dewelke is verschuldigd door de klant, doch niet of niet tijdig op de vervaldag wordt betaald, zal van rechtswege en zonder aanmaning forfaitair worden verhoogd met een schadevergoeding van 10%, met een minimum van 250,00 euro.
                </p>
                <p className="text-gray-700">
                  5.7 Door de klant veroorzaakte kosten en eventuele boetes worden rechtstreeks aan de klant aangerekend.
                </p>
              </CardContent>
            </Card>

            {/* Article 6 - Klachten */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <AlertTriangle className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 6. Klachten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  6.1 Klachten met betrekking tot geleverde diensten dienen, op straffe van verval en van enig recht op schadevergoeding, prijsvermindering of terugbetaling, uiterlijk binnen 3 dagen na ontdekking of na ontvangst van de factuur per aangetekend schrijven en op gemotiveerde alsook gegronde wijze worden gemeld aan GLOBAL CAR SERVICES.
                </p>
                <p className="text-gray-700">
                  6.2 De klant is gehouden tot vergoeding van de kosten gemaakt naar aanleiding van onterechte klachten alsook de hieruit voortvloeiende schade ten laste van GLOBAL CAR SERVICES.
                </p>
              </CardContent>
            </Card>

            {/* Article 8 - Verplichtingen van de klant */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Car className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 8. Verplichtingen van de klant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  8.1 De klant draagt er zorg voor dat alle documenten en informatie, waarvan GLOBAL CAR SERVICES aangeeft dat ze noodzakelijk zijn of waarvan de klant redelijkerwijze behoort te weten dat ze noodzakelijk zijn voor de uitvoering van de overeenkomst, tijdig aan GLOBAL CAR SERVICES worden verstrekt.
                </p>
                <p className="text-gray-700">
                  8.3 De klant verplicht zich ertoe het gehuurde voertuig te gebruiken op een voorzichtige en redelijke manier zoals een goede huisvader en overeenkomstig de handleiding, het bestuurdershandboek, de voertuigdocumentatie en de specificaties van de producent.
                </p>
                <p className="text-gray-700">
                  8.4 De klant is verplicht de geldende hoogtebeperkingen na te leven. Voor schade aan het dak van het voertuig en eventuele andere schade die voortvloeit uit de niet-naleving, is de klant aansprakelijk.
                </p>
                <p className="text-gray-700">
                  8.5 De klant verplicht zich ertoe zich te allen tijde te houden aan alle toepasselijke wet- en regelgevingen die betrekking hebben op het gebruik van voertuigen op openbare wegen.
                </p>
                <p className="text-gray-700">
                  8.6 De klant verbindt er zich toe het voertuig voor het einde van de reservatieperiode en in overeenstemming met de in het handboek vermelde voorschriften terug te geven. Een rechtmatige teruggave bestaat uit een proper voertuig, waarvan de tank minstens voor 1/4e gevuld is en het voertuig tegen diefstal beveiligd is.
                </p>
              </CardContent>
            </Card>

            {/* Article 9 - Aansprakelijkheid */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Shield className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 9. Aansprakelijkheid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  9.1 GLOBAL CAR SERVICES staat garant voor een professioneel resultaat in overeenstemming met de actuele normen in het vakgebied. Zij gaat een inspanningsverbintenis/middelenverbintenis aan en kan slechts worden aangesproken voor haar opzettelijke fout.
                </p>
                <p className="text-gray-700">
                  9.2 Vertraging van de dienstverlening kan nooit aanleiding geven tot aansprakelijkheid of tot vermindering van de overeengekomen prijs, schadevergoeding, annulering van de dienstlevering of ontbinding van de overeenkomst ten laste van GLOBAL CAR SERVICES.
                </p>
                <p className="text-gray-700">
                  9.5 De klant dient zoals een redelijk, normaal en zorgvuldig klant zorg te dragen voor de voertuigen. In geval van schade in welke vorm dan ook aan de voertuigen, zal de klant een forfaitaire schadevergoeding ten belope van 500,00 euro per schadegeval verschuldigd zijn aan GLOBAL CAR SERVICES.
                </p>
                <p className="text-gray-700">
                  9.7 De klant staat in voor de nodige herstelling en/of vervanging van de banden wanneer schade door haar is toegebracht aan de banden van de door haar gebruikte voertuigen.
                </p>
                <p className="text-gray-700">
                  9.9 GLOBAL CAR SERVICES is niet verantwoordelijk voor de voorwerpen die in het voertuig worden achtergelaten, noch is zij aansprakelijk voor het eventuele verlies hiervan tijdens of na de periode van gebruik van het voertuig.
                </p>
              </CardContent>
            </Card>

            {/* Article 10 - In geval van een ongeval */}
            <Card className="mb-8 bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Artikel 10. In geval van een ongeval
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-700">
                  10.1 Indien het voertuig betrokken geraakt bij een ongeval, of als schade of letsel wordt veroorzaakt aan een persoon of eigendom als gevolg van het gebruik van het voertuig, moet de klant:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-red-700">
                  <li>Onmiddellijk GLOBAL CAR SERVICES in kennis stellen van de situatie</li>
                  <li>Onmiddellijk, indien nodig, de politie hiervan inlichten, zeker als een derde letsel heeft opgelopen of eigendommen van derden zijn beschadigd</li>
                  <li>Op de plaats van het ongeval blijven tot GLOBAL CAR SERVICES en/of de politie anders adviseert</li>
                  <li>Geen aansprakelijkheid erkennen aan derden of een fout toegeven</li>
                  <li>Contactinformatie krijgen van alle andere partijen (waaronder getuigen)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Article 13 - Overmacht */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <AlertTriangle className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 13. Overmacht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  13.1 In geval van overmacht is GLOBAL CAR SERVICES bevrijd van om het even welke verbintenis zonder dat de klant aanspraak kan maken op enige schadevergoeding of terugbetaling van de reeds betaalde bedragen.
                </p>
                <p className="text-gray-700">
                  13.2 Onder overmacht worden alle omstandigheden begrepen die niet te wijten zijn aan een fout in hoofde van GLOBAL CAR SERVICES en die de uitvoering van diens verbintenissen onmogelijk maken, bemoeilijken, vertragen of kostelijker maken zoals onder meer brand, ongevallen, stakingen, uitzonderlijke weersomstandigheden, pandemie of epidemie, oproer of oorlog.
                </p>
              </CardContent>
            </Card>

            {/* Article 15 - Gegevensbescherming */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#050b20]">
                  <Shield className="h-6 w-6 mr-2 text-[#56aad1]" />
                  Artikel 15. Gegevensbescherming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  15.1 GLOBAL CAR SERVICES verzamelt en verwerkt de persoonsgegevens van haar klanten, waaronder de locatie van haar voertuigen. Bedoeling hiervan is onder meer beveiliging, het evalueren van het correcte gebruik van het voertuig en het bevorderen van het administratieve beheer.
                </p>
                <p className="text-gray-700">
                  15.2 Voor een gedetailleerde omschrijving van de wijze van verwerking en de verwerkingsdoeleinden wordt verwezen naar het privacybeleid hetwelk u steeds op uw eerste verzoek wordt bezorgd.
                </p>
              </CardContent>
            </Card>

            {/* Contact en bevoegdheid */}
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  Artikel 16. Bevoegdheid en contactgegevens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  <strong>GLOBAL CAR SERVICES</strong><br />
                  Van Heetveldelei 157<br />
                  2100 Antwerpen<br />
                  België
                </p>
                <p className="text-blue-700 mt-4">
                  16.1 Op alle aanbiedingen, offertes en overeenkomsten tussen GLOBAL CAR SERVICES en de klant is steeds het Belgisch recht van toepassing.
                </p>
                <p className="text-blue-700">
                  16.2 De rechtbanken te Antwerpen, afdeling Antwerpen alsook het Hof van Beroep te Antwerpen zijn uitsluitend bevoegd om kennis te nemen van geschillen omtrent de aanbiedingen, offertes en overeenkomsten tussen GLOBAL CAR SERVICES en de klant.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </main>
  )
}
