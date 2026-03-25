import { motion } from "framer-motion";
import Navbar from "../components/home/NavBarr";
import Footer from "../components/home/Footers";

import ServiceHero from "../components/serviceDetail/ServiceHero";
import ServiceIncludes from "../components/serviceDetail/ServiceIncludes";
import ServiceExtra from "../components/serviceDetail/ServiceExtra";
import Testimonials from "../components/home/Testimonials";
import RelatedService from "../components/serviceDetail/RelatedService";

export default function ServiceDetail() {
  return (
    <div className="bg-white">

      <Navbar />

      {/* MAIN CONTENT WRAPPER */}
      <main className="space-y-12 lg:space-y-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ServiceHero />
        </motion.div>

        <div className="px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <ServiceIncludes />
          </motion.div>
        </div>

        <div className="px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ServiceExtra />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <Testimonials title="What our customers say" />
        </motion.div>

        <div className="px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <RelatedService />
          </motion.div>
        </div>

      </main>

      <Footer />

    </div>
  );
}