import { Link } from "react-router-dom";

const relatedServices = [
  {
    id: 1,
    title: "Brake Inspection",
    desc: "Complete evaluation of pads, rotors, and fluid levels for your safety.",
    price: "From $49.00",
    image: "/images/Brake Inspection.png",
  },
  {
    id: 2,
    title: "Tire Rotation",
    desc: "Ensure even wear and extend the life of your tires with professional rotation.",
    price: "From $35.00",
    image: "/images/Tire Rotation.png",
  },
  {
    id: 3,
    title: "Battery Check",
    desc: "Test your battery’s health and terminal connections to avoid being stranded.",
    price: "From $29.00",
    image: "/images/Battery Check.png",
  },
];

export default function RelatedServices() {
  return (
    <section className="py-12 sm:py-16">

      <div className="max-w-6xl mx-auto px-6 lg:px-24">

        {/* TITLE */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
          Related Services
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 sm:h-44 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 sm:p-5">

                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>

                {/* PRICE + LINK */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-800">
                    {item.price}
                  </span>

                  <Link
                    to={`/services/${item.id}`}
                    className="text-blue-700 text-sm font-medium hover:underline"
                  >
                    Book &gt;
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}