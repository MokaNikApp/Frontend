





import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-10 sm:py-20 px-4 sm:px-6 lg:px-24 overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

          <span className="text-blue-700 font-semibold text-sm tracking-wide uppercase">
            Join our network
          </span>

          <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Join the MokaNik Mechanic Network
          </h2>

          <p className="mt-5 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            Are you a professional mechanic? Join MokaNik to receive service
            requests, grow your customer base, and manage your jobs more
            efficiently with a smooth digital workflow.
          </p>

          <Link
            to="/providers"
            className="mt-8 inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all text-white px-7 py-3 rounded-xl shadow-md hover:shadow-lg"
          >
            Become a Provider
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">

          <div className="relative group">
            <img
              src="/images/CTAmechanic.png"
              alt="Mechanic"
              className="
                w-full max-w-md lg:max-w-lg
                object-cover
                rounded-3xl
                shadow-xl
                transition-transform duration-500
                group-hover:scale-[1.03]
              "
            />

            {/* floating highlight */}
            <div className="absolute -inset-3 bg-blue-100 rounded-3xl blur-2xl opacity-20 -z-10" />
          </div>

        </div>

      </div>
    </section>
  );
}