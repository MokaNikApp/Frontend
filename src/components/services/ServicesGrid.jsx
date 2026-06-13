





// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// const services = [
//   {
//     id: 1,
//     title: "Oil Change",
//     desc: "Keep your engine running smoothly with regular oil changes.",
//     price: "$40.99",
//     image: "/images/service3.png",
//     tag: "Standard",
//     tagColor: "bg-green-100 text-green-600",
//     rating: "5.0",
//     reviews: "(250+)",
//   },
//   {
//     id: 2,
//     title: "Brake Repair",
//     desc: "Ensure your safety with reliable brake system checks.",
//     price: "$120.00",
//     image: "/images/service2.png",
//     tag: "Best Seller",
//     tagColor: "bg-blue-100 text-blue-600",
//     rating: "5.0",
//     reviews: "(120+)",
//   },
//   {
//     id: 3,
//     title: "Engine Diagnostics",
//     desc: "Identify engine issues quickly with advanced diagnostics.",
//     price: "$80.50",
//     image: "/images/service1.png",
//     tag: "Diagnostics",
//     tagColor: "bg-gray-100 text-gray-600",
//     rating: "5.0",
//     reviews: "(85+)",
//   },
//   {
//     id: 4,
//     title: "Tire Replacement",
//     desc: "Get quality tires installed for a smoother ride.",
//     price: "$200.00",
//     image: "/images/service3.png",
//     tag: "Available",
//     tagColor: "bg-green-100 text-green-600",
//     rating: "5.0",
//     reviews: "(98+)",
//   },
//   {
//     id: 5,
//     title: "Battery Check",
//     desc: "Avoid breakdowns with a quick battery inspection.",
//     price: "$30.99",
//     image: "/images/service2.png",
//     tag: "Popular",
//     tagColor: "bg-blue-100 text-blue-600",
//     rating: "5.0",
//     reviews: "(150+)",
//   },
//   {
//     id: 6,
//     title: "Cooling System",
//     desc: "Maintain engine temperature with cooling system service.",
//     price: "$90.00",
//     image: "/images/service1.png",
//     tag: "Diagnostics",
//     tagColor: "bg-gray-100 text-gray-600",
//     rating: "5.0",
//     reviews: "(70+)",
//   },
// ];

// export default function ServicesGrid() {
//   return (
//     <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-8 sm:py-10 lg:py-16">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
//             Popular Services
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Top booked repairs in your area this week
//           </p>
//         </div>

//         <Link
//           to="/services"
//           className="text-sm font-medium text-[#1D52AF] hover:underline"
//         >
//           View all services →
//         </Link>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {services.map((item) => (
//           <div
//             key={item.id}
//             className="
//               bg-white rounded-xl overflow-hidden border border-gray-100
//               shadow-sm transition-all duration-300
//               hover:-translate-y-1 hover:shadow-lg
//             "
//           >

//             {/* IMAGE */}
//             <div className="overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-4 sm:p-5">

//               {/* TAG + RATING */}
//               <div className="flex justify-between items-center mb-3">
//                 <span className={`text-xs px-3 py-1 rounded-full ${item.tagColor}`}>
//                   {item.tag}
//                 </span>

//                 <span className="text-xs sm:text-sm text-gray-600">
//                   ⭐ <b>{item.rating}</b> {item.reviews}
//                 </span>
//               </div>

//               {/* TITLE */}
//               <h3 className="text-base sm:text-lg font-semibold text-slate-800">
//                 {item.title}
//               </h3>

//               {/* DESC */}
//               <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
//                 {item.desc}
//               </p>

//               {/* FOOTER */}
//               <div className="flex justify-between items-center mt-4">

//                 <span className="font-bold text-slate-800 text-sm sm:text-base">
//                   {item.price}
//                 </span>

//                 <Link
//                   to={`/services/${item.id}`}
//                   className="
//                     bg-[#1D52AF] text-white
//                     px-4 py-2 rounded-lg text-xs sm:text-sm
//                     transition hover:bg-blue-700
//                   "
//                 >
//                   View Details
//                 </Link>

//               </div>
//             </div>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }





// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// // Fallback images mapped by category for when `images` is null
// const categoryImages = {
//   ac_service: "/images/service3.png",
//   brake_repair: "/images/service2.png",
//   electrical: "/images/service1.png",
//   engine_diagnostic: "/images/service1.png",
//   oil_change: "/images/service3.png",
//   suspension: "/images/service2.png",
//   tire_rotation: "/images/service3.png",
//   transmission: "/images/service1.png",
// };

// // Tag mapping based on category
// const categoryTags = {
//   ac_service: { tag: "Standard", tagColor: "bg-green-100 text-green-600" },
//   brake_repair: { tag: "Best Seller", tagColor: "bg-blue-100 text-blue-600" },
//   electrical: { tag: "Diagnostics", tagColor: "bg-gray-100 text-gray-600" },
//   engine_diagnostic: { tag: "Diagnostics", tagColor: "bg-gray-100 text-gray-600" },
//   oil_change: { tag: "Popular", tagColor: "bg-blue-100 text-blue-600" },
//   suspension: { tag: "Available", tagColor: "bg-green-100 text-green-600" },
//   tire_rotation: { tag: "Standard", tagColor: "bg-green-100 text-green-600" },
//   transmission: { tag: "Available", tagColor: "bg-green-100 text-green-600" },
// };

// export default function ServicesGrid() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/services");
//         // Adjust based on your actual API response shape
//         const data = response.data?.data ?? response.data ?? [];
//         setServices(data);
//       } catch (err) {
//         setError("Failed to load services. Please try again later.");
//         console.error("Services fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   if (loading) {
//     return (
//       <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D52AF]"></div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
//         <div className="text-center text-red-600 bg-red-50 rounded-xl p-6 max-w-md mx-auto">
//           <p>{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-[#1D52AF] text-white rounded-lg text-sm hover:bg-blue-700 transition"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (services.length === 0) {
//     return (
//       <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
//         <div className="text-center text-gray-500">
//           <p className="text-lg">No services available at the moment.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-8 sm:py-10 lg:py-16">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
//             Popular Services
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Top booked repairs in your area this week
//           </p>
//         </div>

//         <Link
//           to="/services"
//           className="text-sm font-medium text-[#1D52AF] hover:underline"
//         >
//           View all services →
//         </Link>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {services.map((item) => {
//           const tagInfo = categoryTags[item.category] || {
//             tag: "Available",
//             tagColor: "bg-gray-100 text-gray-600",
//           };
//           const image = item.images || categoryImages[item.category] || "/images/service1.png";
//           const price = typeof item.price === "number"
//             ? `$${item.price.toFixed(2)}`
//             : `$${item.price}`;

//           return (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//             >
//               {/* IMAGE */}
//               <div className="overflow-hidden">
//                 <img
//                   src={image}
//                   alt={item.name}
//                   className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="p-4 sm:p-5">
//                 {/* TAG + RATING */}
//                 <div className="flex justify-between items-center mb-3">
//                   <span className={`text-xs px-3 py-1 rounded-full ${tagInfo.tagColor}`}>
//                     {tagInfo.tag}
//                   </span>
//                   <span className="text-xs sm:text-sm text-gray-600">
//                     ⭐ <b>5.0</b> (New)
//                   </span>
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-base sm:text-lg font-semibold text-slate-800">
//                   {item.name}
//                 </h3>

//                 {/* DESC */}
//                 <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
//                   {item.description}
//                 </p>

//                 {/* DURATION (optional, from API) */}
//                 {item.estimatedDurationMinutes && (
//                   <p className="text-xs text-gray-400 mt-1">
//                     ⏱️ ~{item.estimatedDurationMinutes} min
//                   </p>
//                 )}

//                 {/* FOOTER */}
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="font-bold text-slate-800 text-sm sm:text-base">
//                     {price}
//                   </span>

//                   <Link
//                     to={`/services/${item.id}`}
//                     className="bg-[#1D52AF] text-white px-4 py-2 rounded-lg text-xs sm:text-sm transition hover:bg-blue-700"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }





import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const INITIAL_COUNT = 3;

const categoryImages = {
  ac_service: "/images/service3.png",
  brake_repair: "/images/service2.png",
  electrical: "/images/service1.png",
  engine_diagnostic: "/images/service1.png",
  oil_change: "/images/service3.png",
  suspension: "/images/service2.png",
  tire_rotation: "/images/service3.png",
  transmission: "/images/service1.png",
};

const categoryTags = {
  ac_service: { tag: "Standard", tagColor: "bg-green-100 text-green-600" },
  brake_repair: { tag: "Best Seller", tagColor: "bg-blue-100 text-blue-600" },
  electrical: { tag: "Diagnostics", tagColor: "bg-gray-100 text-gray-600" },
  engine_diagnostic: { tag: "Diagnostics", tagColor: "bg-gray-100 text-gray-600" },
  oil_change: { tag: "Popular", tagColor: "bg-blue-100 text-blue-600" },
  suspension: { tag: "Available", tagColor: "bg-green-100 text-green-600" },
  tire_rotation: { tag: "Standard", tagColor: "bg-green-100 text-green-600" },
  transmission: { tag: "Available", tagColor: "bg-green-100 text-green-600" },
};

export default function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.get("/services");
        const data = response.data?.data ?? response.data ?? [];
        setServices(data);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
        console.error("Services fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const visibleServices = showAll ? services : services.slice(0, INITIAL_COUNT);
  const hasMore = services.length > INITIAL_COUNT;

  if (loading) {
    return (
      <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D52AF]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
        <div className="text-center text-red-600 bg-red-50 rounded-xl p-6 max-w-md mx-auto">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#1D52AF] text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-16">
        <div className="text-center text-gray-500">
          <p className="text-lg">No services available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-8 sm:py-10 lg:py-16">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Popular Services
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Top booked repairs in your area this week
          </p>
        </div>

        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-[#1D52AF] hover:underline flex items-center gap-1"
          >
            {showAll ? "Show less ←" : "View all services →"}
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleServices.map((item) => {
          const tagInfo = categoryTags[item.category] || {
            tag: "Available",
            tagColor: "bg-gray-100 text-gray-600",
          };
          const image = item.images || categoryImages[item.category] || "/images/service1.png";
          const price = typeof item.price === "number"
            ? `$${item.price.toFixed(2)}`
            : `$${item.price}`;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt={item.name}
                  className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-5">
                {/* TAG + RATING */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full ${tagInfo.tagColor}`}>
                    {tagInfo.tag}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    ⭐ <b>5.0</b> (New)
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                  {item.name}
                </h3>

                {/* DESC */}
                <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </p>

                {/* DURATION */}
                {item.estimatedDurationMinutes && (
                  <p className="text-xs text-gray-400 mt-1">
                    ⏱️ ~{item.estimatedDurationMinutes} min
                  </p>
                )}

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-slate-800 text-sm sm:text-base">
                    {price}
                  </span>

                  <Link
                    to={`/services/${item.id}`}
                    className="bg-[#1D52AF] text-white px-4 py-2 rounded-lg text-xs sm:text-sm transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}