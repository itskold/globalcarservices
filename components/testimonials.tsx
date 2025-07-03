"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { EditableTranslation } from "./admin/editable-translation"

export default function Testimonials() {
  const t = useTranslations("testimonials")

  // Créer un tableau statique pour les indices des avis
  const reviews = [
    { index: 0, rating: 5 },
    { index: 1, rating: 5 },
    { index: 2, rating: 5 }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <EditableTranslation translationKey="testimonials.title">
              {t("title")}
            </EditableTranslation>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <EditableTranslation translationKey="testimonials.subtitle">
              {t("subtitle")}
            </EditableTranslation>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Image
                    src="/Google__G__logo.svg.png"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "<EditableTranslation translationKey={`testimonials.reviews.${review.index}.text`}>
                    {t(`reviews.${review.index}.text`)}
                  </EditableTranslation>"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    <EditableTranslation translationKey={`testimonials.reviews.${review.index}.name`}>
                      {t(`reviews.${review.index}.name`)}
                    </EditableTranslation>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
