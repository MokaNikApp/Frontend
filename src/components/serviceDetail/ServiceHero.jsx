import { useParams } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { FaShieldAlt, FaHeadset } from "react-icons/fa";
import { services } from "../../lib/mock/services";
import { service } from "../../lib/mock/service";

export default function ServiceHero() {
  const { id } = useParams();

  const allServices = [...services, ...service];

  const selectedService = allServices.find(
    (item) => String(item.id) === String(id)
  );

  if (!selectedService) {
    return <div className="p-10">Service not found</div>;
  }

  return (
    <section className="px-6 lg:px-24 py-12">

      {/* TOP TEXT */}
      <div className="max-w-3xl">
        <p className="text-sm text-gray-600">
          ⭐⭐⭐⭐⭐ {selectedService.rating} ({selectedService.reviews} reviews)
        </p>

        <h1 className="text-3xl font-bold text-slate-800 mt-2">
          {selectedService.title}
        </h1>

        <p className="mt-4 text-gray-500 leading-relaxed">
          Regular oil changes are essential for maintaining your engine's health and longevity. 
          Our full synthetic service provides superior protection against heat and friction, 
          helping your vehicle run smoother and more efficiently.
        </p>
      </div>

      {/* IMAGE + CARD */}
      <div className="grid lg:grid-cols-3 gap-10 mt-10 items-start">

        {/* IMAGE */}
        <div className="lg:col-span-2">
          <img
            src={selectedService.image}
            alt={selectedService.title}
            className="w-full h-87.5 object-cover rounded-xl"
          />
        </div>

        {/* BOOKING CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border">

          <p className="text-sm text-gray-500">Estimated Price</p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            {selectedService.price}
          </h2>

          <p className="text-xs text-gray-400">All inclusive</p>

          {/* LOCATION */}
          <div className="mt-6">
            <label className="text-xs text-gray-500">Location</label>
            <div className="flex mt-1 rounded-lg bg-gray-100 items-center flex-1 mr-3 px-3 py-1">
                <FiMapPin className="text-gray-400 text-lg mr-3" />
                <input
                type="text"
                placeholder="Enter zip or city"
                className="w-full border-none px-3 py-2 text-sm outline-none"
                />
            </div>
          </div>

          {/* DATE */}
          <div className="mt-4">
            <label className="text-xs text-gray-500">Date & Time</label>
            <div className="flex rounded-lg mt-1 bg-gray-100 items-center flex-1 mr-3 px-3 py-1">
                <FiCalendar className="text-gray-400 text-lg mr-3" />
                <input
                type="text"
                placeholder="Select date and time"
                className="w-full border-none px-3 py-2 text-sm outline-none"
                />
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-lg">
            Book Service
          </button>

          <p className="text-xs text-center text-gray-400 mt-3">
            No payment required until service is complete.
          </p>
          <br />
            <hr className="p-4 text-gray-200" />
          {/* TRUST */}
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <p className= "flex"><FaShieldAlt className="text-green-400 text-lg mr-3" /> Secure booking protection</p>
            <br />
            <p className= "flex"><FaHeadset className="text-green-400 text-lg mr-3" /> 24/7 customer support</p>
          </div>

        </div>

      </div>
        <section className="px-2 lg:px-2 py-2">
            <h2 className="text-xl text-slate-800 mb-4">
                About this Service
            </h2>
            <p className="text-gray-500 lg:pr-24 leading-relaxed">
                Our premium oil change isn't just a simple fluid swap. It's a comprehensive 
                engine health check performed by certified technicians. We use only high-grade 
                synthetic oils that are engineered to provide maximum performance for modern 
                high-performance engines.

                <br /><br />

                Synthetic oil offers better chemical and shear stability, improved viscosity 
                index, and resistance to oxidation and thermal breakdown. This means fewer oil 
                changes over the long run and a cleaner, better-protected engine today.
            </p>
        </section>
    </section>
  );
}