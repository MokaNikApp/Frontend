import { Link } from "react-router-dom";


export default function ProviderCTA() {
  return (
    <section className="relative bg-[#1C52AF] text-white py-12 sm:py-16 px-6 overflow-hidden">

      {/* SUBTLE BACKGROUND GLOW */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-2xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
          Ready to grow your business?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-blue-100 text-sm sm:text-base mt-4 leading-relaxed">
          Join <span className="text-white font-medium">MokaNik</span> today and start connecting with customers who need your expertise.  
          It only takes <span className="text-white font-medium">10 minutes</span> to get started.
        </p>

        {/* BUTTONS */}
    

<div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">

  {/* PRIMARY BUTTON → SIGNUP */}
  <Link
    to="/signup"
    className="bg-white text-[#1C52AF] px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto text-center"
  >
    Start Your Application
  </Link>

  {/* SECONDARY BUTTON → CONTACT */}
  <Link
    to="/contact"
    className="border border-white/60 px-6 py-3 rounded-lg text-sm font-medium hover:bg-white hover:text-[#1C52AF] transition-all duration-300 w-full sm:w-auto text-center"
  >
    Talk to Support
  </Link>

</div>
        {/* TRUST TEXT */}
        <p className="text-xs text-blue-200 mt-6">
          No long-term contracts • Pause anytime • Trusted by professionals
        </p>

      </div>
    </section>
  );
}