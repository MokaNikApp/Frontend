import { FiCheckCircle } from "react-icons/fi";
import { PiPiggyBank } from "react-icons/pi";

export default function Requirements() {
  return (
    <section className="px-6 lg:px-24 py-12 sm:py-16 bg-[#F7F9FC]">
      <div className="grid items-stretch grid-cols-1 gap-10 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-center text-gray-900 sm:text-2xl sm:text-start">
              What you'll need
            </h2>

            <p className="mt-2 text-xs text-center text-gray-500 sm:text-sm sm:text-start">
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
                  className="flex gap-3 p-4 transition bg-white shadow-sm rounded-xl hover:shadow-md"
                >
                  <FiCheckCircle className="mt-1 text-lg text-blue-600 shrink-0" />
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
        <div className="flex h-full">
          <div className="bg-gradient-to-b from-[#1C52AF] to-[#1747a0] w-full text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col justify-between">

            <div>
              <div className="flex items-center justify-center mb-5 rounded-lg w-11 h-11 bg-white/15">
                <PiPiggyBank className="text-xl text-white" />
              </div>

              <h3 className="text-lg font-semibold sm:text-xl">
                Earning Potential
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                MokaNik providers earn on average 35% more than independent mobile mechanics
                by reducing marketing costs and downtime.
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/20"></div>

            {/* STATS */}
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <p className="text-xs text-white">Average Hourly Rate</p>
                <p className="text-lg font-bold text-white">$85 - $125</p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-white">Service Fee</p>
                <p className="text-lg font-bold text-white">Flat 12%</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}