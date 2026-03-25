import { motion } from "framer-motion";
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
    <div className="w-full overflow-x-hidden">
      <NavBarr />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <WhyPartner />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <Requirements />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <SuccessStories />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        viewport={{ once: true }}
      >
        <ProviderCTA />
      </motion.div>

      <Footer />
    </div>
  );
}