"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { Users, Fuel, Settings, Phone, Mail, Check, Star, ArrowLeft, Share2, Heart, Shield, Clock } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { vehicles } from "@/data/vehicles"

// Mettre à jour l'interface Vehicle pour inclure la nouvelle structure de prix
interface Vehicle {
  id: string;
  icon: any;
  title: string;
  description: string;
  pricing: Array<{
    duration: '4 uur' | 'day' | 'weekend' | '5_days' | 'week' | 'month';
    price: number;
    included_km: number;
  }>;
  km_price: number;
  features: string[];
  image: string;
  type: string;
  brand: string;
  year: number;
  category: string;
  seats: number;
  fuel: string;
  transmission: string;
  rating: number;
  reviewCount: number;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    consumption: string;
    doors: number;
    luggage: string;
    aircon: boolean;
    gps: boolean;
  };
  included: string[];
  extras: Array<{ id: string; name: string; price: number }>;
}

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vehicleId = params.id as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [pickupDateTime, setPickupDateTime] = useState<Date | undefined>(undefined)
  const [returnDateTime, setReturnDateTime] = useState<Date | undefined>(undefined)
  const [selectedDuration, setSelectedDuration] = useState<'1/2_day' | 'day' | 'weekend' | '5_days' | 'week' | 'month'>('day')
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    message: "",
    insurance: "basic",
    extras: [] as string[],
  })

  // Find the vehicle based on the ID
  const vehicle = vehicles.find((v) => v.id === vehicleId)

  // If vehicle not found, redirect to rental page
  if (!vehicle) {
    router.push("/rental")
    return null
  }

  // Find similar vehicles (same type, excluding current vehicle)
  const similarVehicles = vehicles
    .filter((v) => v.type === vehicle.type && v.id !== vehicle.id)
    .slice(0, 2)
    .map((v) => ({
      id: v.id,
      brand: v.brand,
      model: v.title.split(" ").slice(1).join(" "),
      price: v.pricing[0].price,
      seats: v.seats,
      image: v.image,
    }))

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking data:", {
      ...bookingData,
      pickupDateTime,
      returnDateTime,
      vehicleId,
    })
    // Here you would send the booking data to your API
  }

  const handleExtraToggle = (extraId: string) => {
    setBookingData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId) ? prev.extras.filter((id) => id !== extraId) : [...prev.extras, extraId],
    }))
  }

  const calculateTotal = () => {
    const selectedPricing = vehicle.pricing.find(p => p.duration === selectedDuration);
    if (!selectedPricing) return 0;

    const basePrice = selectedPricing.price;
    const extrasPrice = bookingData.extras.reduce((total, extraId) => {
      const extra = vehicle.extras.find((e) => e.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);

    const insurancePrice = bookingData.insurance === "premium" ? 15 : 0;

    return basePrice + extrasPrice + insurancePrice;
  }

  const getRentalDays = () => {
    if (!pickupDateTime || !returnDateTime) return 1
    return Math.max(1, Math.ceil((returnDateTime.getTime() - pickupDateTime.getTime()) / (1000 * 60 * 60 * 24)))
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/rental" className="flex items-center text-gray-600 hover:text-[#050b20] transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar overzicht
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Delen
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Bewaren
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#95c8e2] text-[#050b20]">{vehicle.category}</Badge>

              </div>
              <h1 className="text-3xl font-bold text-[#050b20] mb-2">
                {vehicle.brand} {vehicle.title} ({vehicle.year})
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {vehicle.seats} personen
                </span>
                <span className="flex items-center">
                  <Fuel className="h-4 w-4 mr-1" />
                  {vehicle.fuel}
                </span>
                <span className="flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  {vehicle.transmission}
                </span>
              </div>
            </div>

            {/* Vehicle Images */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={vehicle.images[selectedImage]}
                  alt={`${vehicle.brand} ${vehicle.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {vehicle.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImage === idx ? "ring-2 ring-[#95c8e2]" : ""
                    }`}
                  >
                    <img src={image} alt={`${vehicle.brand} ${vehicle.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#050b20] mb-4">Over dit voertuig</h2>
              <p className="text-gray-600 mb-6">{vehicle.description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#050b20] mb-3">Specificaties</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      Motor: {vehicle.specifications.engine}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      Vermogen: {vehicle.specifications.power}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      Verbruik: {vehicle.specifications.consumption}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      Laadruimte: {vehicle.specifications.luggage}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#050b20] mb-3">Features</h3>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Similar Vehicles */}
            <div>
              <h2 className="text-2xl font-bold text-[#050b20] mb-4">Vergelijkbare voertuigen</h2>
              <div className="grid grid-cols-2 gap-4">
                {similarVehicles.map((similar) => (
                  <Link key={similar.id} href={`/rental/vehicle/${similar.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{similar.brand} {similar.model}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                          <img src={similar.image} alt={`${similar.brand} ${similar.model}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-sm">
                          <p>Vanaf €{similar.price}</p>
                          <p className="text-gray-600">{similar.seats} zitplaatsen</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[#050b20] mb-2">
                        €{vehicle.pricing.find(p => p.duration === selectedDuration)?.price || 'Op aanvraag'}/{selectedDuration}
                      </div>
                      <div className="text-sm text-gray-600">
                        {vehicle.pricing.find(p => p.duration === selectedDuration)?.included_km} km inbegrepen
                        <br />
                        Extra kilometers: €{vehicle.km_price}/km
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="duration">Selecteer huurtermijn</Label>
                      <Select
                        value={selectedDuration}
                        onValueChange={(value: '1/2_day' | 'day' | 'weekend' | '5_days' | 'week' | 'month') => setSelectedDuration(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Kies een huurtermijn" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4 uur">½ dag (4 uur)</SelectItem>
                          <SelectItem value="day">1 dag</SelectItem>
                          <SelectItem value="weekend">Weekend</SelectItem>
                          <SelectItem value="5_days">5 dagen</SelectItem>
                          <SelectItem value="week">1 week</SelectItem>
                          <SelectItem value="month">1 maand (op aanvraag)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBooking} className="space-y-6">
                    {/* Insurance */}
                    <div>
                      <Label>Verzekering</Label>
                      <Select
                        value={bookingData.insurance}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, insurance: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kies een verzekering" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basis verzekering (inbegrepen)</SelectItem>
                          <SelectItem value="premium">Premium verzekering (+€15/dag)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Extras */}
                    <div>
                      <Label className="mb-2 block">Extra's</Label>
                      <div className="space-y-2">
                        {vehicle.extras.map((extra) => (
                          <div key={extra.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-[#050b20]">{extra.name}</div>
                              <div className="text-sm text-gray-600">+€{extra.price}/dag</div>
                            </div>
                            <Button
                              type="button"
                              variant={bookingData.extras.includes(extra.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleExtraToggle(extra.id)}
                            >
                              {bookingData.extras.includes(extra.id) ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" /> Geselecteerd
                                </>
                              ) : (
                                "Toevoegen"
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <div>
                        <Label>Naam</Label>
                        <Input
                          value={bookingData.name}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Uw volledige naam"
                        />
                      </div>
                      <div>
                        <Label>E-mail</Label>
                        <Input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="uw@email.com"
                        />
                      </div>
                      <div>
                        <Label>Telefoon</Label>
                        <Input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+32 489 87 66 13"
                        />
                      </div>
                      <div>
                        <Label>Bericht (optioneel)</Label>
                        <Textarea
                          value={bookingData.message}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, message: e.target.value }))}
                          placeholder="Extra informatie of vragen..."
                        />
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Aantal dagen</span>
                        <span className="font-medium">{getRentalDays()}</span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Totaal</span>
                        <span>€{calculateTotal()}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Inclusief BTW</div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#050b20] hover:bg-[#0a1530]">
                      Nu reserveren
                    </Button>

                    {/* Included Services */}
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-[#050b20] mb-3">Inbegrepen services</h3>
                      <ul className="space-y-2">
                        {vehicle.included.map((service, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <Shield className="h-4 w-4 mr-2 text-[#95c8e2]" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact Support */}
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-[#050b20] mb-3">Hulp nodig?</h3>
                      <div className="space-y-2">
                        <Link
                          href="tel:+32489876613"
                          className="flex items-center text-gray-600 hover:text-[#050b20] transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          +32 489 87 66 13
                        </Link>
                        <Link
                          href="mailto:info@globalcarservices.be"
                          className="flex items-center text-gray-600 hover:text-[#050b20] transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          info@globalcarservices.be
                        </Link>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
