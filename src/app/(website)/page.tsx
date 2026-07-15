import { ReviewsSection } from "@/components/reviews-section"
import { CTASection } from "@/components/sections/cta-section"
import HeroSection from "./components/hero-section"
import HowItWork from "./components/how-it-work"
import FeaturedPackageSection from "./components/featured-package"
import BestRegionBento from "./components/best-region-bento"

export default function Page() {
  return (
    <>
      <HeroSection />

      <BestRegionBento />
      <FeaturedPackageSection />
      <ReviewsSection />
      <HowItWork />
      <CTASection />
    </>
  )
}
