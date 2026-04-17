import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyChoose() {
  const features = [
    {
      image: "/images/wcm3.png",
      title: "Verified Mechanics",
      desc: "Every mechanic on MokaNik is carefully reviewed and approved to ensure reliable and professional service.",
    },
    {
      image: "/images/wcm2.png",
      title: "Transparent Pricing",
      desc: "Get clear service estimates before booking so you always know what to expect.",
    },
    {
      image: "/images/wcm1.png",
      title: "Secure & Reliable",
      desc: "Your bookings, payments, and service updates are handled safely through our platform.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // HEADER
  const header = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // CONTAINER (stagger)
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // CARD
  const card = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // IMAGE FLOAT (premium subtle movement)
  const imageFloat = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-24 bg-[#FAFAFA] overflow-hidden"
    >
      {/* background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(59,130,246,0.08), transparent)",
        }}
      />

      {/* HEADER */}
      <motion.div
        variants={header}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-blue-100 text-blue-600 rounded-full">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          Why MokaNik
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Why Choose MokaNik?
        </h2>

        <p className="mt-4 text-gray-500 text-sm sm:text-base px-4">
          We make car servicing easier by connecting you with trusted mechanics
          and a seamless booking experience.
        </p>
      </motion.div>

      {/* CARDS */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -8 }}
            className="text-center group"
          >
            {/* IMAGE */}
            <motion.div
              {...imageFloat}
              className="flex justify-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 sm:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            {/* TITLE */}
            <h3 className="mt-6 text-lg sm:text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
              {item.desc}
            </p>

            {/* subtle underline animation */}
            <div className="mt-4 h-[2px] w-0 bg-blue-500 mx-auto transition-all duration-500 group-hover:w-10" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}