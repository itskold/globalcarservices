"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { EditableTranslation } from "./admin/editable-translation"
import { EditableImage } from "./admin/editable-image"
import { useHeroImages } from "@/lib/hooks/use-hero-images"

export default function Hero() {
  const t = useTranslations("home.hero")
  const params = useParams()
  const locale = params.locale as string
  const { currentImage, currentImageIndex, totalImages, nextImage, previousImage, goToImage } = useHeroImages()

  return (
    <section className="relative h-screen flex items-center justify-center rounded-t-[4rem]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <EditableImage
          src={currentImage.src}
          alt="Global Car Services"
          fill
          className="object-cover rounded-t-[4rem] transition-opacity duration-500"
          priority
          documentName={`hero-${currentImageIndex + 1}`}
          collectionName="images"
        />
      </div>
      <div className="absolute inset-0 bg-[#050b20]/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 uppercase">
          <EditableTranslation translationKey={`home.hero.slides.${currentImageIndex + 1}.title`}>
            {t(`slides.${currentImageIndex + 1}.title`)}
          </EditableTranslation>
        </h1>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#56aad1] hover:bg-[#7bb8d9] text-[#050b20] font-semibold text-lg px-8 py-4"
          >
            <Link href={`/${locale}${currentImage.buttonLink}`}>
              <EditableTranslation translationKey={`home.hero.slides.${currentImageIndex + 1}.button`}>
                {t(`slides.${currentImageIndex + 1}.button`)}
              </EditableTranslation>
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImageIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
