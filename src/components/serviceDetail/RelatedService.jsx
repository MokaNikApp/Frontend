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
    <section className="px-6 lg:px-24 py-16">
      
      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-700 mb-6">
        Related Services
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {relatedServices.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border-gray-300 overflow-hidden"
          >
            
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">
              
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
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
    </section>
  );
}