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
    <section className="px-6 bg-gray-200 ml-20 lg:mr-120 lg:px-12 py-8 border-gray-200 rounded-2xl">
      <h2 className="text-xl text-slate-800 mb-6">
        What's Included
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">

            <div className="text-blue-600 text-xl">
              {item.icon}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
    
  );
}