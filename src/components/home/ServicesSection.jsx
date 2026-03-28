import { services } from "../../lib/mock/services";
import ServiceCard from "../ServiceCard";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-30">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Our services
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Book reliable car care from verified mechanics — wherever you are
          </p>
        </div>

        <button className="bg-blue-800 hover:text-base transition-all text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 w-full sm:w-auto">
          View All Service
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {services.slice(0, 4).map((item) => (
          <Link key={item.id} to={`/services/${item.id}`}>
            <ServiceCard {...item} />
          </Link>
        ))}
      </div>

    </div>
  );
}