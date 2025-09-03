import HeroSection from "@/components/hero-section";
import MarqueeAnimation from "@/components/MarqueeAnimation";
import Testimonial from "@/components/testimonial.tsx";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-screen flex flex-col">
      <HeroSection />
      <MarqueeAnimation />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Home