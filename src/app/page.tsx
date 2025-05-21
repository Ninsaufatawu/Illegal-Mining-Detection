
import CtaSection from './components/CtaSection'
import EducationHub from './components/EducationHub'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import ImpactDashboard from './components/ImpactDashboard'
import ImpactStatistics from './components/ImpactStatistics'
import LatestNews from './components/LatestNews'
import MapSection from './components/MapSection'
import Navbar from './components/Navbar'
import Partners from './components/Partners'
import SuccessStories from './components/SuccessStories'
import TechnologySection from './components/TechnologySection'
import Testimonials from './components/Testimonials'

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <ImpactDashboard />
      <TechnologySection />
      <MapSection />
      <EducationHub />
      <ImpactStatistics />
      <HowItWorks />
      <Testimonials />
      <LatestNews />
      <Partners />
      <SuccessStories />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}