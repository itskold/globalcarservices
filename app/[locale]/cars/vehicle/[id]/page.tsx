"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Fuel, Gauge, Users, Phone, Mail, Car } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { db } from "@/lib/firebase"
import { doc, getDoc, DocumentData, collection, query, where, getDocs, limit } from 'firebase/firestore'
import { EditableTranslationText } from "@/components/admin/editable-translation-text"

interface CarData extends DocumentData {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  year: number;
  fuel: string;
  seats: number;
  mileage: number;
  images: string[];
  specifications: {
    engine: string;
    power: string;
    consumption: string;
    color: string;
    interior: string;
    doors: string;
  };
  options: string[];
  included: string[];
}

export default function CarPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [car, setCar] = useState<CarData | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [similarCars, setSimilarCars] = useState<CarData[]>([])
    const t = useTranslations("cars.vehicle.page")

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carRef = doc(db, 'cars', id)
        const carSnap = await getDoc(carRef)

        if (!carSnap.exists()) {
          notFound()
          return
        }

        const carData = { id: carSnap.id, ...carSnap.data() } as CarData
        setCar(carData)

        const carsRef = collection(db, 'cars')
        const q = query(
          carsRef,
          where('category', '==', carData.category),
          where('id', '!=', id),
          limit(2)
        )
        const querySnapshot = await getDocs(q)
        const similarCarsData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as CarData))
        setSimilarCars(similarCarsData)

      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchCarData()
  }, [id])

  if (loading || !car) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#050b20]"></div>
    </div>
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#050b20] to-[#0a1530] text-white py-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{car.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={car.images[selectedImage]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((image: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImage === idx ? "ring-2 ring-[#95c8e2]" : ""
                    }`}
                  >
                    <img src={image} alt={`${car.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="text-2xl font-semibold px-6 py-3 bg-[#95c8e2] text-[#050b20]">
                    €{car.price.toLocaleString()}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i: number) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < car.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({car.reviewCount} <EditableTranslationText namespace="cars.vehicle.page" id="reviews" />)
                    </span>
                  </div>
                </div>

                <Card className="mb-8">
                  <CardContent className="grid grid-cols-2 gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.year" />
                        </p>
                        <p className="font-medium">{car.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.fuel" />
                        </p>
                        <p className="font-medium">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.seats" />
                        </p>
                        <p className="font-medium">{car.seats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5 text-[#95c8e2]" />
                      <div>
                        <p className="text-sm text-gray-600">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.mileage" />
                        </p>
                        <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      <EditableTranslationText namespace="cars.vehicle.page" id="specs.title" />
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.engine" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.engine}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.power" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.power}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.consumption" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.consumption}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.color" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.color}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.interior" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.interior}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#050b20]">
                          <EditableTranslationText namespace="cars.vehicle.page" id="specs.doors" />
                        </h3>
                        <p className="text-gray-600">{car.specifications.doors}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      <EditableTranslationText namespace="cars.vehicle.page" id="options.title" />
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {car.options.map((option: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full"></div>
                          <span className="text-gray-600">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      <EditableTranslationText namespace="cars.vehicle.page" id="included.title" />
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {car.included.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#95c8e2] rounded-full"></div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Link href="tel:+32489876613" className="flex-1">
                      <Button className="w-full bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20]" size="lg">
                        <Phone className="mr-2 h-5 w-5" />
                        <EditableTranslationText namespace="cars.vehicle.page" id="actions.call" />
                      </Button>
                    </Link>
                    <Link href="mailto:info@globalcarservices.be" className="flex-1">
                      <Button className="w-full bg-[#050b20] hover:bg-[#0a1530] text-white" size="lg">
                        <Mail className="mr-2 h-5 w-5" />
                        <EditableTranslationText namespace="cars.vehicle.page" id="actions.email" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 