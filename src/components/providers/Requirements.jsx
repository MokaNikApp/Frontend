import { FiCheckCircle } from "react-icons/fi";
import { PiPiggyBank } from "react-icons/pi";

export default function Requirements() {
  return (
    <section className="px-6 lg:px-24 py-12 sm:py-16 bg-[#F7F9FC]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-start">
              What you'll need
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center sm:text-start">
              To maintain high service quality, we require the following from our partners:
            </p>

            <div className="mt-6 space-y-4">

              {[
                {
                  title: "3+ Years Experience",
                  desc: "Demonstrated expertise in automotive repair and maintenance."
                },
                {
                  title: "Professional Tools",
                  desc: "Ownership of high-quality diagnostic and repair equipment."
                },
                {
                  title: "Background Check",
                  desc: "Willingness to undergo a standard verification process."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <FiCheckCircle className="text-blue-600 text-lg mt-1 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-full flex">
          <div className="bg-gradient-to-b from-[#1C52AF] to-[#1747a0] w-full text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col justify-between">

            <div>
              <div className="w-11 h-11 flex items-center justify-center bg-white/15 rounded-lg mb-5">
                <PiPiggyBank className="text-white text-xl" />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold">
                Earning Potential
              </h3>

              <p className="text-sm text-blue-100 mt-3 leading-relaxed">
                MokaNik providers earn on average 35% more than independent mobile mechanics
                by reducing marketing costs and downtime.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-6"></div>

            {/* STATS */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
              <div>
                <p className="text-blue-100 text-xs">Average Hourly Rate</p>
                <p className="font-bold text-white text-lg">$85 - $125</p>
              </div>

              <div className="sm:text-right">
                <p className="text-blue-100 text-xs">Service Fee</p>
                <p className="font-bold text-white text-lg">Flat 12%</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}