import { ReviewsSection } from "@/components/reviews-section"
import HeroSection from "./components/hero-section"
import OverflowCard from "./components/luxury-card"
import DummyHeroSection from "./components/dummy-hero-section"

export default function Page() {
  return (
    <>
      {/* <HeroSection /> */}
      <DummyHeroSection />
      <ReviewsSection />
      <OverflowCard />
    </>
  )
}
