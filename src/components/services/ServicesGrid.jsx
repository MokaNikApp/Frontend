import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Oil Change",
    desc: "Keep your engine running smoothly with regular oil changes.",
    price: "$40.99",
    image: "/images/service3.png",
    tag: "Standard",
    tagColor: "bg-green-100 text-green-600",
    rating: "5.0",
    reviews: "(250+)",
  },
  {
    id: 2,
    title: "Brake Repair",
    desc: "Ensure your safety with reliable brake system checks.",
    price: "$120.00",
    image: "/images/service2.png",
    tag: "Best Seller",
    tagColor: "bg-blue-100 text-blue-600",
    rating: "5.0",
    reviews: "(120+)",
  },
  {
    id: 3,
    title: "Engine Diagnostics",
    desc: "Identify engine issues quickly with advanced diagnostics.",
    price: "$80.50",
    image: "/images/service1.png",
    tag: "Diagnostics",
    tagColor: "bg-gray-100 text-gray-600",
    rating: "5.0",
    reviews: "(85+)",
  },
  {
    id: 4,
    title: "Tire Replacement",
    desc: "Get quality tires installed for a smoother ride.",
    price: "$200.00",
    image: "/images/service3.png",
    tag: "Available Today",
    tagColor: "bg-green-100 text-green-600",
    rating: "5.0",
    reviews: "(98+)",
  },
  {
    id: 5,
    title: "Battery Check",
    desc: "Avoid breakdowns with a quick battery inspection.",
    price: "$30.99",
    image: "/images/service2.png",
    tag: "Popular",
    tagColor: "bg-blue-100 text-blue-600",
    rating: "5.0",
    reviews: "(150+)",
  },
  {
    id: 6,
    title: "Cooling System",
    desc: "Maintain engine temperature with cooling system service.",
    price: "$90.00",
    image: "/images/service1.png",
    tag: "Diagnostics",
    tagColor: "bg-gray-100 text-gray-600",
    rating: "5.0",
    reviews: "(70+)",
  },
];

export default function ServicesGrid() {
  return (
    <section className="px-6 lg:px-24 py-16">
      
    <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold text-slate-800">
            Popular Services
        </h2>

        <span className="text-blue-700 text-sm font-semibold border-b cursor-pointer text-underline">
            View all services
        </span>
    </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
              
              {/* TAG + RATING */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>

                <span className="text-black text-sm">
                    ⭐ <b>{item.rating}</b> {item.reviews}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-slate-800">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>

              {/* PRICE + BUTTON */}
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-slate-800">
                  {item.price}
                </span>

                <Link
                    to={`/services/${item.id}`}
                    className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}