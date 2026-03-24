import { FaOilCan, FaFilter, FaTint, FaClipboardCheck } from "react-icons/fa";

const items = [
  {
    icon: <FaOilCan />,
    title: "Up to 5 qts synthetic oil",
    desc: "Premium grade SAE viscosity oil specific to your vehicle model.",
  },
  {
    icon: <FaFilter />,
    title: "New premium oil filter",
    desc: "High-efficiency filter replacement for superior contaminant removal.",
  },
  {
    icon: <FaTint />,
    title: "Fluid top-off",
    desc: "Checking and filling coolant, brake, and washer fluids.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Multi-point safety inspection",
    desc: "Visual check of belts, hoses, tires, and lights.",
  },
];

export default function ServiceIncludes() {
  return (
    <section className="bg-gray-200 py-8 sm:py-10 lg:py-12 rounded-2xl">

      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6">
          What's Included
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 items-start">

              <div className="text-blue-600 text-lg sm:text-xl mt-1">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
      
    </section>
  );
}