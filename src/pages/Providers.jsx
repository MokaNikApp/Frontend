import NavBarr from "../components/home/NavBarr"; 
import Footer from "../components/services/Footers";
import Hero from "../components/providers/Hero";
import WhyPartner from "../components/providers/WhyPartner";
import HowItWorks from "../components/home/HowItWorks";
import Requirements from "../components/providers/Requirements";
import SuccessStories from "../components/providers/SuccessStories";
import ProviderCTA from "../components/providers/ProviderCTA";

export default function Providers() {
  return (
    <div>
      <NavBarr />
      <Hero />
      <WhyPartner />
      <HowItWorks />
      <Requirements />
      <SuccessStories />
      <ProviderCTA />
      <Footer />
    </div>
  );
}