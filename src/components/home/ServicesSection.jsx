import { services } from "../../lib/mock/services";
import ServiceCard from "../ServiceCard";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">
            Our services
            </h2>

            <p className="text-gray-500 text-sm mt-1">
            Book reliable car care from verified mechanics — wherever you are
            </p>
        </div>

        <button className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
            View All Service
        </button>
    </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {services.slice(0, 4).map((item) => (
          <Link key={item.id} to={`/services/${item.id}`}>
            <ServiceCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}