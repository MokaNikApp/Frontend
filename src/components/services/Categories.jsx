import { FaTools, FaCar, FaWrench, FaSearch, FaFan } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";

const categories = [
  { name: "Maintenance", icon: <FaTools /> },
  { name: "Engine", icon: <FaCar /> },
  { name: "Brakes", icon: <FaWrench /> },
  { name: "Tires", icon: <GiCarWheel /> },
  { name: "Diagnostics", icon: <FaSearch /> },
  { name: "Cooling", icon: <FaFan /> },
];

export default function Categories() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 mt-8">
      
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Browse by Category
      </h2>

      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-between">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-sm border shadow-lg border-gray-300 text-xs sm:text-sm text-gray-700 hover:bg-blue-700 hover:text-white transition"
          >
            <span className="text-base sm:text-lg">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}