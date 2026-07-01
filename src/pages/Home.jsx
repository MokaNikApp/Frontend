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

      <div className="">

          <div>
          <Hero />
           </div>
        

          

        {/* <div>
          <ServicesSection />
        </div> */}

        <div>
          <HowItWorks />
        </div>

        <div>
          <WhyChoose />
        </div>

        <div>
          <CTA />
        </div>

        <div>
          <Testimonials />
        </div>

        <div>
          <FAQ />
        </div>

       <div>
          <Stats />
          </div>
      

      </div>

      <Footer />
    </div>
  );
}