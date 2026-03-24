import { FiCalendar, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export default function ServiceExtra() {
  return (
    <section className="py-12 sm:py-16">

      <div className="max-w-6xl mx-auto px-6 lg:px-24">

        {/* TITLE */}
        <h2 className="text-center text-gray-600 mb-10 text-lg sm:text-xl">
          How it Works
        </h2>

        {/* STEPS */}
        <div className="flex flex-col md:flex-row items-center justify-between relative gap-10 md:gap-0">

          {/* LINE */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] border-t border-gray-300 border-dashed"></div>

          {/* STEP 1 */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-300">
              <FiCalendar className="text-blue-600 text-lg sm:text-xl" />
            </div>

            <h3 className="mt-4 font-semibold text-sm sm:text-base">
              1. Book online
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-55">
              Choose your time, location, and service package in seconds.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-300">
              <FiTruck className="text-blue-600 text-lg sm:text-xl" />
            </div>

            <h3 className="mt-4 font-semibold text-sm sm:text-base">
              2. Drop off or Arrival
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-55">
              Visit our partner shop or have a mobile technician come to you.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-300">
              <FaCheckCircle className="text-blue-600 text-lg sm:text-xl" />
            </div>

            <h3 className="mt-4 font-semibold text-sm sm:text-base">
              3. Service Completed
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-55">
              Drive away with peace of mind and a digital service record.
            </p>
          </div>

        </div>

        {/* FEATURED PROVIDER */}
        <div className="mt-16">
          <h3 className="text-gray-700 mb-4 text-sm sm:text-base">
            Featured Provider
          </h3>

          <div className="bg-white rounded-xl border p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">

            {/* IMAGE */}
            <img
              src="/images/tecst.png"
              alt="provider"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h4 className="font-semibold text-base sm:text-lg text-slate-800">
                John Smith
              </h4>

              <p className="text-blue-600 text-xs sm:text-sm">
                ASE Certified Master Technician
              </p>

              {/* META */}
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-2">
                  <FiClock />
                  <span>15 years experience</span>
                </span>

                <span className="flex items-center gap-2">
                  <FiCheckCircle />
                  <span>2,400+ jobs done</span>
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed">
                "I take pride in my work and treat every vehicle like it's my own.
                Specializing in European and Japanese imports with a focus on
                preventative maintenance."
              </p>
            </div>

            {/* RATING */}
            <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start md:self-center">
              ⭐ 4.9
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}