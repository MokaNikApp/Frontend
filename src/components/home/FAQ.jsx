import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How quickly can a mechanic arrive?",
      answer:
        "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
    },
    {
      question: "Are mechanics verified?",
      answer:
        "All mechanics go through a strict verification and approval process before being listed.",
    },
    {
      question: "Can I track my service?",
      answer:
        "Yes, you can track your service status in real-time directly from your dashboard.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept card payments, bank transfers, and other secure payment options.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Our support team is always available to resolve issues and ensure satisfaction.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-500 max-w-md text-sm sm:text-base">
            Still you have any questions? Contact our Team via{" "}
            <span className="text-purple-600">via</span>{" "}
            <span className="text-red-500">Info@techpro.com</span>
          </p>

          <button className="mt-6 bg-gray-200 text-gray-800 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm">
            See All FAQ’s
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 sm:p-5 transition-all"
              >
                {/* QUESTION */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center cursor-pointer gap-4"
                >
                  <h3 className="text-gray-900 font-medium text-sm sm:text-base transition-all duration-300">
                    {item.question}
                  </h3>

                  {/* ICON */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border rounded-md text-gray-800 shrink-0">
                    {isOpen ? "✕" : "+"}
                  </div>
                </div>

                {/* ANSWER */}
                {isOpen && (
                  <p className="mt-3 sm:mt-4 text-sm text-gray-500 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}