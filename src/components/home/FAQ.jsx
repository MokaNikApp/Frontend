





import { useState } from "react";
import { Link } from "react-router-dom";

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
    <section className="bg-white py-12 sm:py-20 lg:py-24 px-6 sm:px-24">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT SIDE (mobile optimized) */}
        <div className="text-center lg:text-left">

          <h2 className="text-xl sm:text-4xl font-bold text-gray-900 leading-snug sm:leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
            Got questions? We’ve answered the most common ones to help you understand MokaNik better.
          </p>

          {/* buttons → full width on mobile */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">

            <Link
              to="/faq"
              className="w-full sm:w-auto text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-sm transition-all active:scale-95"
            >
              See All FAQs
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto text-center bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm transition-all active:scale-95"
            >
              Contact Support
            </Link>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3 mt-6 lg:mt-0">

          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`
                  rounded-2xl border
                  px-4 sm:px-6 py-4 sm:py-5
                  transition-all duration-300
                  ${isOpen
                    ? "border-blue-200 bg-blue-50/30 shadow-md"
                    : "border-gray-200"
                  }
                `}
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start sm:items-center justify-between gap-4 text-left"
                >

                  <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-snug pr-2">
                    {item.question}
                  </h3>

                  <div
                    className={`
                      w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                      rounded-full text-lg font-bold shrink-0
                      transition-all duration-300
                      ${isOpen
                        ? "bg-blue-800 text-white rotate-45"
                        : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    +
                  </div>

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}