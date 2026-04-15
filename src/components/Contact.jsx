



import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const offices = [
    {
      title: "Lagos Office",
      text: "First Floor, Suite 16, Nahco Complex, Murtala Muhammed Airport, Ikeja, Lagos.",
    },
    {
      title: "Abuja Office",
      text: "Plot 425, B2 Close, off 1st Avenue, Gwarinpa, Abuja.",
    },
    {
      title: "UK Office",
      text: "23, Elmwood Road, Rochester, ME3 8NB.",
    },
  ];

  return (
    <section className="relative bg-[#F8FAFC] min-h-screen px-4 sm:px-6 lg:px-24 py-10 overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/2348022341424"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">

          {/* pulse ring */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-30"></span>

          {/* button */}
          <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl active:scale-95 transition-transform">
            <FaWhatsapp size={22} />
          </div>

          {/* tooltip */}
          <div className=" absolute -left-32 top-2 bg-black text-white text-xs px-3 py-1 rounded-lg opacity-80">
            Chat with us
          </div>

        </div>
      </a>

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="mt-3 text-gray-600 text-sm sm:text-base px-2">
            We’re always ready to help. Reach out anytime and our team will respond quickly.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {offices.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-[#1C52AF]">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* PHONE CARD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-[#1C52AF]">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600 text-sm mt-1">
                    +234 802 234 1424 (Nigeria)
                  </p>
                  <p className="text-gray-600 text-sm">
                    +44 7351 662748 (UK)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Send a Message
            </h2>

            <form className="space-y-5">

              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows="5"
                  placeholder="Type your message..."
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C52AF] hover:bg-[#163f8a] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Send Message
              </button>

            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              We usually reply within a few hours ⚡
            </p>
          </motion.div>

        </div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="sm:mt-10 mt-6 rounded-2xl overflow-hidden shadow-lg border border-gray-100"
        >
          <iframe
            className="w-full h-50"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            loading="lazy"
          />
        </motion.div>

      </div>
    </section>
  );
}