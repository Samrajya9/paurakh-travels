import { ReviewsSection } from "@/components/reviews-section"
import { CTASection } from "@/components/sections/cta-section"
import HeroSection from "./components/hero-section"
import OverflowCard from "./components/luxury-card"
import DummyHeroSection from "./components/dummy-hero-section"
import { FeaturedPackagesSection } from "@/components/sections/featured-packages-section"
import HeroSectionV2 from "./components/hero-section-v2"

export default function Page() {
  return (
    <>
      {/* <HeroSection /> */}
      {/* <DummyHeroSection /> */}

      <HeroSectionV2 />
      <ReviewsSection />
      <CTASection />
    </>
  )
}
