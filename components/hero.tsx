import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center rounded-t-[4rem]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-vans.jpg"
          alt="Global Car Services - Flotte de véhicules professionnels"
          fill
          className="object-cover rounded-t-[4rem]"
          priority
        />
        {/*<div className="absolute inset-0 bg-[#050b20]/70"></div>*/}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Alles voor uw wagen onder één dak
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#95c8e2] hover:bg-[#7bb8d9] text-[#050b20] font-semibold text-lg px-8 py-4"
          >
            <Link href="/rental">Een voertuig huren</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#050b20] bg-transparent text-lg px-8 py-4"
          >
            <Link href="/appointment">Afspraak maken</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
