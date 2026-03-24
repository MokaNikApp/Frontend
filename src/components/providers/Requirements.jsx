import { FiCheckCircle } from "react-icons/fi";
import { PiPiggyBank } from "react-icons/pi";

export default function Requirements() {
  return (
    <section className="px-6 lg:px-24 py-12 sm:py-16 bg-gray-50 overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            What you'll need
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            To maintain high service quality, we require the following from our partners:
          </p>

          <div className="mt-6 space-y-4">

            <div className="flex gap-3 bg-gray-100 p-4 rounded-lg">
              <FiCheckCircle className="text-blue-600 text-lg mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  3+ Years Experience
                </h4>
                <p className="text-xs text-gray-500">
                  Demonstrated expertise in automotive repair and maintenance.
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-gray-100 p-4 rounded-lg">
              <FiCheckCircle className="text-blue-600 text-lg mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Professional Tools
                </h4>
                <p className="text-xs text-gray-500">
                  Ownership of high-quality diagnostic and repair equipment.
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-gray-100 p-4 rounded-lg">
              <FiCheckCircle className="text-blue-600 text-lg mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Background Check
                </h4>
                <p className="text-xs text-gray-500">
                  Willingness to undergo a standard verification and background process.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-blue-700 w-full max-w-md mx-auto lg:max-w-none text-white p-6 sm:p-8 rounded-xl">

          <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-md mb-4">
            <PiPiggyBank className="text-white text-lg" />
          </div>

          <h3 className="text-base sm:text-lg font-semibold">
            Earning Potential
          </h3>

          <p className="text-sm text-blue-100 mt-3 leading-relaxed">
            MokaNik providers earn on average 35% more than independent mobile mechanics
            by reducing marketing costs and downtime.
          </p>

          <div className="border-t border-blue-400 my-5"></div>

          {/* STATS */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-10 items-start sm:items-center">

            <div>
              <p className="text-blue-200 text-xs">Average Hourly Rate</p>
              <p className="font-bold text-white">$85 - $125</p>
            </div>

            <div className="sm:text-right">
              <p className="text-blue-200 text-xs">Service Fee</p>
              <p className="font-bold text-white">Flat 12%</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}