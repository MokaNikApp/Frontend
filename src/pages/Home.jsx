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
import FadeIn from "../components/common/FadeIn";

export default function Home() {
  return (
    <div>
      <NavBarr />

      <div className="px-4 sm:px-6 lg:px-1">

        <FadeIn>
          <Hero />
        </FadeIn>

        <FadeIn delay={100}>
          <ServicesSection />
        </FadeIn>

        <FadeIn delay={200}>
          <HowItWorks />
        </FadeIn>

        <FadeIn delay={300}>
          <WhyChoose />
        </FadeIn>

        <FadeIn delay={400}>
          <CTA />
        </FadeIn>

        <FadeIn delay={500}>
          <Testimonials />
        </FadeIn>

        <FadeIn delay={600}>
          <FAQ />
        </FadeIn>

        <FadeIn delay={700}>
          <Stats />
        </FadeIn>

      </div>

      <Footer />
    </div>
  );
}