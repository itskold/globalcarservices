import Hero from "@/components/hero"
import SearchSection from "@/components/search-section"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import VehicleRental from "@/components/vehicle-rental"
import Testimonials from "@/components/testimonials"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SearchSection />
      <Services />
      <VehicleRental />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}
