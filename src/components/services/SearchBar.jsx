import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaCar } from "react-icons/fa";

export default function SearchBar() {
  return (
    <section className="relative py-20 px-6 lg:px-24 text-center overflow-hidden">
      
      {/* BACKGROUND ICON */}
      <FaCar className="absolute right-10 top-10 text-[300px] text-blue-300 opacity-20 pointer-events-none" />

      {/* HEADING */}
      <h1 className="text-4xl font-bold text-slate-800 relative z-10">
        Available Services
      </h1>

      <p className="mt-4 text-gray-500 max-w-xl mx-auto relative z-10">
        Find trusted mechanics and book reliable car services easily.
      </p>

      {/* SEARCH BAR */}
      <div className="relative z-10 mt-10 max-w-xl mx-auto bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* SERVICE INPUT */}
        <div className="flex items-center flex-1 px-4 py-4 border-gray-400 border-b md:border-b-0 md:border-r">
          <FiSearch className="text-gray-400 text-lg mr-3" />
          <input
            type="text"
            placeholder="Search Service"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* LOCATION INPUT */}
        <div className="flex items-center flex-1 px-4 py-4 border-b md:border-b-0 md:border-r">
          <FiMapPin className="text-gray-400 text-lg mr-3" />
          <input
            type="text"
            placeholder="City or Zip Code"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* BUTTON */}
        <button className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 text-sm font-medium">
          Search
        </button>

      </div>
    </section>
  );
}