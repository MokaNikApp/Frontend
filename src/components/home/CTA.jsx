import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-24">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            Join the MokaNik Mechanic Network
          </h2>

          <p className="mt-4 text-gray-500 max-w-md text-sm sm:text-base">
            Are you a professional mechanic? Join MokaNik to receive service
            requests, grow your customer base, and manage your jobs more
            efficiently.
          </p>

          <Link
            to="/providers"
            className="inline-block mt-6 bg-blue-800 hover:bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm"
          >
            Become a Provider
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="/images/CTAmechanic.png"
            alt="Mechanic"
            className="
              w-full h-auto object-cover
              rounded-tl-lg
              rounded-br-lg
              rounded-tr-[60px] sm:rounded-tr-[80px]
              rounded-bl-[60px] sm:rounded-bl-[80px]
            "
          />
        </div>

      </div>

    </section>
  );
}