import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How quickly can a mechanic arrive?",
      answer:
        "Most mechanics arrive within 30–60 minutes depending on your location and availability.",
    },
    {
      question: "Are mechanics verified?",
      answer:
        "Yes, every mechanic is carefully verified through identity checks, skill review, and past work history.",
    },
    {
      question: "Can I track my service?",
      answer:
        "Yes, you can track your mechanic in real-time from booking to job completion.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We support card payments, bank transfers, and secure in-app payment options.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Our support team will review your complaint and help resolve issues quickly or arrange a fix.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative px-6 py-12 overflow-hidden bg-white sm:py-20 lg:py-24 sm:px-24">

      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative grid max-w-6xl grid-cols-1 gap-10 mx-auto lg:grid-cols-2 lg:gap-16">

        {/* LEFT */}
        <div className="text-center lg:text-left">
          <h2 className="text-xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-md mx-auto mt-4 text-sm text-gray-600 sm:text-base lg:mx-0">
            Got questions? We’ve answered the most common ones to help you understand MokaNik better.
          </p>

          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <Link className="px-6 py-3 text-sm transition bg-gray-100 rounded-xl hover:bg-gray-200">
              See All FAQs
            </Link>

            <Link className="px-6 py-3 text-sm text-white transition bg-blue-800 rounded-xl hover:bg-blue-700">
              Contact Support
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-3">

          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}

                whileHover={{ scale: 1.01 }}

                className={`rounded-2xl border px-5 py-4 cursor-pointer transition-all ${
                  isOpen
                    ? "border-blue-300 bg-blue-50 shadow-md"
                    : "border-gray-200"
                }`}
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="pr-3 text-sm font-medium text-gray-900 sm:text-base">
                    {item.question}
                  </h3>

                  {/* animated icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      isOpen ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    +
                  </motion.div>
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden"
                    >
                      <p className="text-sm leading-relaxed text-gray-600">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}





