




import { services } from "../../lib/mock/services";
import ServiceCard from "../ServiceCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServicesSection() {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08, // faster, tighter (feels premium)
      },
    },
  };

  const card = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#F7F5F8] py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-8">
          
          <div className="text-center sm:text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Services
            </h2>

            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Book reliable car care from verified mechanics — wherever you are
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button className="bg-[#1C52AF] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all hover:bg-[#163f85] hover:shadow-md">
              View All Services
            </button>
          </div>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              variants={card}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Link to={`/services/${item.id}`} className="block h-full">
                
                {/* subtle hover effect wrapper */}
                <div className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/60 rounded-xl">
                  <ServiceCard {...item} />
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}