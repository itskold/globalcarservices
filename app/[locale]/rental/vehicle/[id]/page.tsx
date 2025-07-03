"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
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
import { db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, getDocs, DocumentData } from 'firebase/firestore'
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

interface VehicleData extends DocumentData {
  id: string;
  brand: string;
  title: string;
  category: string;
  type: string;
  year: number;
  seats: number;
  fuel: string;
  transmission: string;
  description: string;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    consumption: string;
    luggage: string;
  };
  features: string[];
  pricing: Array<{
    duration: string;
    price: number;
    included_km: string;
  }>;
  km_price: number;
  extras: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  included: string[];
}

export default function VehicleDetailPage() {
  const t = useTranslations('vehicleDetail')
  const params = useParams()
  const router = useRouter()
  const vehicleId = params.id as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [pickupDateTime, setPickupDateTime] = useState<Date | undefined>(undefined)
  const [returnDateTime, setReturnDateTime] = useState<Date | undefined>(undefined)
  const [selectedDuration, setSelectedDuration] = useState<'4_uur' | 'day' | 'weekend' | '5_days' | 'week' | 'month'>('day')
  const [vehicle, setVehicle] = useState<VehicleData | null>(null)
  const [similarVehicles, setSimilarVehicles] = useState<VehicleData[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    message: "",
    insurance: "basic",
    extras: [] as string[],
  })

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        // Récupérer les détails du véhicule
        const vehicleRef = doc(db, 'vehicles', vehicleId)
        const vehicleSnap = await getDoc(vehicleRef)

        if (!vehicleSnap.exists()) {
          router.push("/rental")
          return
        }

        const vehicleData = { id: vehicleId, ...vehicleSnap.data() } as VehicleData
        setVehicle(vehicleData)

        // Récupérer les véhicules similaires
        const vehiclesRef = collection(db, 'vehicles')
        const q = query(
          vehiclesRef, 
          where('type', '==', vehicleData.type),
          where('id', '!=', vehicleId)
        )
        const querySnapshot = await getDocs(q)
        const similarVehiclesData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as VehicleData))
          .slice(0, 2)
        setSimilarVehicles(similarVehiclesData)

      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
        router.push("/rental")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleData()
  }, [vehicleId, router])

  if (loading || !vehicle) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#050b20]"></div>
    </div>
  }

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
              <EditableTranslationText namespace="vehicleDetail" id="navigation.backToOverview" />
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                <EditableTranslationText namespace="vehicleDetail" id="navigation.share" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                <EditableTranslationText namespace="vehicleDetail" id="navigation.save" />
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
                  {vehicle.seats} <EditableTranslationText namespace="vehicleDetail" id="specifications.persons" />
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
              <h2 className="text-2xl font-bold text-[#050b20] mb-4">
                <EditableTranslationText namespace="vehicleDetail" id="specifications.aboutVehicle" />
              </h2>
              <p className="text-gray-600 mb-6">{vehicle.description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#050b20] mb-3">
                    <EditableTranslationText namespace="vehicleDetail" id="specifications.title" />
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      <EditableTranslationText namespace="vehicleDetail" id="specifications.engine" />: {vehicle.specifications.engine}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      <EditableTranslationText namespace="vehicleDetail" id="specifications.power" />: {vehicle.specifications.power}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      <EditableTranslationText namespace="vehicleDetail" id="specifications.consumption" />: {vehicle.specifications.consumption}
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-[#95c8e2] rounded-full mr-2"></div>
                      <EditableTranslationText namespace="vehicleDetail" id="specifications.storage" />: {vehicle.specifications.luggage}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#050b20] mb-3">
                    <EditableTranslationText namespace="vehicleDetail" id="specifications.features" />
                  </h3>
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

          
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-[#050b20] mb-2">
                      €{vehicle.pricing.find(p => p.duration === selectedDuration)?.price || 'Op aanvraag'}/{selectedDuration?.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {vehicle.pricing.find(p => p.duration === selectedDuration)?.included_km} <EditableTranslationText namespace="vehicleDetail" id="booking.included_km" />
                      <br />
                      <EditableTranslationText namespace="vehicleDetail" id="booking.extra_km" />: €{vehicle.km_price}<EditableTranslationText namespace="vehicleDetail" id="booking.per_km" />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.selectDuration" />
                    </Label>
                    <Select value={selectedDuration} onValueChange={(value: any) => setSelectedDuration(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.selectDuration")} />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicle.pricing.map((price) => (
                          <SelectItem key={price.duration} value={price.duration}>
                            {price.duration} - €{price.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.insurance.title" />
                    </Label>
                    <Select value={bookingData.insurance} onValueChange={(value: any) => setBookingData(prev => ({ ...prev, insurance: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.insurance.title")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">
                          <EditableTranslationText namespace="vehicleDetail" id="booking.insurance.basic" />
                        </SelectItem>
                        <SelectItem value="premium">
                          <EditableTranslationText namespace="vehicleDetail" id="booking.insurance.premium" /> (+€15)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.extras.title" />
                    </Label>
                    <div className="space-y-2">
                      {vehicle.extras.map((extra) => (
                        <div key={extra.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={extra.id}
                            checked={bookingData.extras.includes(extra.id)}
                            onChange={() => handleExtraToggle(extra.id)}
                            className="mr-2"
                          />
                          <label htmlFor={extra.id} className="text-sm text-gray-600">
                            {extra.name} (+€{extra.price})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.contact.name" />
                    </Label>
                    <Input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t("booking.contact.name_placeholder")}
                      required
                    />
                  </div>
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.contact.email" />
                    </Label>
                    <Input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t("booking.contact.email_placeholder")}
                      required
                    />
                  </div>
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.contact.phone" />
                    </Label>
                    <Input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder={t("booking.contact.phone_placeholder")}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>
                      <EditableTranslationText namespace="vehicleDetail" id="booking.contact.message" />
                    </Label>
                    <Textarea
                      value={bookingData.message}
                      onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={t("booking.contact.message_placeholder")}
                      rows={4}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold mb-2">
                      <span>
                        <EditableTranslationText namespace="vehicleDetail" id="booking.total.total" />
                      </span>
                      <span>€{calculateTotal()}</span>
                    </div>
                    <Button type="submit" className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20]">
                      <EditableTranslationText namespace="vehicleDetail" id="booking.submit" />
                    </Button>
                  </div>

                  {/* Included Services */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-[#050b20] mb-3">
                      <EditableTranslationText namespace="vehicleDetail" id="booking.included_services" />
                    </h3>
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
                    <h3 className="font-semibold text-[#050b20] mb-3">
                      <EditableTranslationText namespace="vehicleDetail" id="booking.need_help" />
                    </h3>
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
    </main>
  )
}
