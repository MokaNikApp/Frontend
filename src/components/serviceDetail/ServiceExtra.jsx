import { FiCalendar, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export default function ServiceExtra() {
  return (
    <section className="pl-20 lg:mr-24 py-16">

      {/* TITLE */}
      <h2 className="text-center text-gray-600 mb-10">
        How it Works
      </h2>

      {/* STEPS */}
      <div className="flex flex-col md:flex-row items-center justify-between relative">

        {/* LINE */}
        <div className="hidden md:block absolute top-10 left-1/9 right-1/9 border-t border-gray-400 border-dashed"></div>

        {/* STEP 1 */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-400">
            <FiCalendar className="text-blue-600 text-xl" />
          </div>

          <h3 className="mt-4 font-semibold">1. Book online</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-50">
            Choose your time, location, and service package in seconds.
          </p>
        </div>

        {/* STEP 2 */}
        <div className="flex flex-col items-center text-center relative z-10 mt-10 md:mt-0">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-400">
            <FiTruck className="text-blue-600 text-xl" />
          </div>

          <h3 className="mt-4 font-semibold">2. Drop off or Arrival</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-50">
            Visit our partner shop or have a mobile technician come to you.
          </p>
        </div>

        {/* STEP 3 */}
        <div className="flex flex-col items-center text-center relative z-10 mt-10 md:mt-0">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border-4 border-gray-400">
            <FaCheckCircle className="text-blue-600 text-xl" />
          </div>

          <h3 className="mt-4 font-semibold">3. Service Completed</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-50">
            Drive away with peace of mind and a digital service record.
          </p>
        </div>

      </div>
            {/* FEATURED PROVIDER */}
      <div className="mt-16">
        <h3 className="text-gray-700 mb-4">Featured Provider</h3>

        <div className="bg-white rounded-xl border p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">

          {/* IMAGE */}
          <img
            src="/images/tecst.png"
            alt="provider"
            className="w-20 h-20 rounded-lg object-cover"
          />

          {/* DETAILS */}
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-slate-800">
              John Smith
            </h4>

            <p className="text-blue-600 text-sm">
              ASE Certified Master Technician
            </p>

            {/* META */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-2">
                    <FiClock className="text-gray-500" />
                    <span>15 years experience</span>
                </span>
                <span className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500" />
                    <span>2,400+ jobs done</span>
                </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mt-3">
              "I take pride in my work and treat every vehicle like it's my own.
              Specializing in European and Japanese imports with a focus on
              preventative maintenance."
            </p>
          </div>

          {/* RATING */}
          <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ 4.9
          </div>

        </div>
      </div>

    </section>
  );
}