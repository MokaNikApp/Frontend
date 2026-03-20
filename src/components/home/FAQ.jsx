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
    <section className="bg-white py-24 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-500 max-w-md">
            Still you have any questions? Contact our Team via{" "}
            <span className="text-purple-600">via</span>{" "}
            <span className="text-red-500">Info@techpro.com</span>
          </p>

          <button className="mt-6 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm">
            See All FAQ’s
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 transition-all"
              >
                {/* QUESTION */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="text-gray-900 font-medium transition-all duration-300">
                    {item.question}
                  </h3>

                  {/* ICON */}
                  <div className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-800">
                    {isOpen ? "✕" : "+"}
                  </div>
                </div>

                {/* ANSWER */}
                {isOpen && (
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed">
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