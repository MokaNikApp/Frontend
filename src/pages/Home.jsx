import NavBarr from "../components/home/NavBarr";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import HowItWorks from "../components/home/HowItWorks";
import WhyChoose from "../components/home/WhyChoose";
import CTA from "../components/home/CTA";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Stats from "../components/home/Stats";
import Footer from "../components/home/Footers";

export default function Home() {
  return (
    <div>
      <NavBarr />

      {/* ✅ RESPONSIVE WRAPPER START */}
      <div className="px-4 sm:px-6 lg:px-24">
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <WhyChoose />
        <CTA />
        <Testimonials />
        <FAQ />
        <Stats />
      </div>
      {/* ✅ RESPONSIVE WRAPPER END */}

      <Footer />
    </div>
  );
}