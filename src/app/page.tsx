import { CustomCursor } from '@/components/CustomCursor'
import { Nav } from '@/components/Nav'
import { HeroSection } from '@/components/HeroSection'
import { IntroSection } from '@/components/IntroSection'
import { WorkSection } from '@/components/WorkSection'
import { ContactSection } from '@/components/ContactSection'
import { FishDivider } from '@/components/FishDivider'
import { RiverDivider } from '@/components/RiverDivider'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />

      {/* Hero — Waves animation */}
      <HeroSection />

      {/* Intro sentence + physics skill pills */}
      <IntroSection />

      {/* Fish divider */}
      <FishDivider />

      {/* River divider */}
      <RiverDivider fromColor="#F5F0E8" toColor="#F5F0E8" />

      {/* Work — case studies */}
      <WorkSection />

      {/* Contact — Dithering CTA */}
      <ContactSection />
    </>
  )
}
