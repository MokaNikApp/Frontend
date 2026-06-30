




import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative px-4 py-8 overflow-hidden sm:py-20 sm:px-6 lg:px-24">

      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute bg-blue-100 rounded-full -top-24 -left-24 w-72 h-72 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bg-indigo-100 rounded-full -bottom-24 -right-24 w-72 h-72 blur-3xl"
      />

      <div className="relative grid items-center max-w-7xl grid-cols-1 gap-12 mx-auto lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex flex-col items-center text-center lg:text-left lg:items-start"
        >

          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-sm font-semibold tracking-wide text-blue-700 uppercase"
          >
            Join our network
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl"
          >
            Join the MokaNik Mechanic Network
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            className="max-w-md mt-5 text-sm leading-relaxed text-gray-600 sm:text-base"
          >
            Are you a professional mechanic? Join MokaNik to receive service
            requests, grow your customer base, and manage your jobs more
            efficiently with a smooth digital workflow.
          </motion.p>

          {/* BUTTON */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to="/providers"
              className="inline-flex items-center gap-2 py-3 mt-8 text-white bg-blue-800 shadow-md px-7 rounded-xl"
            >
              <motion.span
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                Become a Provider
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative group"
          >
            <img
              src="/images/CTAmechanic.png"
              alt="Mechanic"
              className="object-cover w-full max-w-md shadow-xl lg:max-w-lg rounded-3xl"
            />

            {/* glowing highlight */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bg-blue-100 -inset-3 rounded-3xl blur-2xl -z-10"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}