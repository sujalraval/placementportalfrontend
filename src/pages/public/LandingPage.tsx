import { SubNav } from '@/components/landing/SubNav'
import { Hero } from '@/components/landing/Hero'
import { StatsStrip } from '@/components/landing/StatsStrip'
import { OfficerBand } from '@/components/landing/OfficerBand'
import { AboutSection } from '@/components/landing/AboutSection'
import { TeamSection } from '@/components/landing/TeamSection'
import { GallerySection } from '@/components/landing/GallerySection'
import { NewsSection } from '@/components/landing/NewsSection'
import { JobsSection } from '@/components/landing/JobsSection'
import { DrivesSection } from '@/components/landing/DrivesSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PartnersSection } from '@/components/landing/PartnersSection'
import { JoinSection } from '@/components/landing/JoinSection'
import { AudienceSection } from '@/components/landing/AudienceSection'
import { DeptGridSection } from '@/components/landing/DeptGridSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { Footer } from '@/components/landing/Footer'

export function LandingPage() {
  return (
    <div className="mx-auto max-w-[1180px]">
      <SubNav />
      <Hero />
      <StatsStrip />
      <OfficerBand />
      <AboutSection />
      <TeamSection />
      <GallerySection />
      <NewsSection />
      <JobsSection />
      <DrivesSection />
      <FeaturesSection />
      <PartnersSection />
      <JoinSection />
      <AudienceSection />
      <DeptGridSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default LandingPage
