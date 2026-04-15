// import { Link } from "react-router-dom";

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
//     tag: "Available Today",
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
//     <section className="bg-[#F7F5F8] px-4 sm:px-6 lg:px-24 py-10 sm:py-12 lg:py-16">
      
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
//         <div>
//         <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
//           Popular Services
//         </h2>
//         <p>Top booked repairs in your area this week</p>
//         </div>

//         <div>
//         <span className="text-[#1D52AF] text-sm hover:text-base transition-all font-semibold border-b cursor-pointer text-center sm:text-left">
//           View all services
//         </span>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//         {services.map((item) => (
//           <div
//             key={item.id}
//             className="
//               bg-white rounded-xl overflow-hidden border border-gray-200
//               shadow-sm
//               transform transition duration-300 ease-in-out
//               hover:-translate-y-2
//               hover:shadow-[0_10px_30px_rgba(30,64,175,0.25),0_10px_30px_rgba(22,163,74,0.25)]
//             "
//           >
//             {/* IMAGE */}
//             <div className="overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="
//                   w-full h-40 sm:h-44 lg:h-48 object-cover
//                   transition duration-300 ease-in-out
//                   hover:scale-105
//                 "
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-4 sm:p-5">
              
//               {/* TAG + RATING */}
//               <div className="flex justify-between items-center mb-2 sm:mb-3">
//                 <span className={`text-xs px-2 sm:px-3 py-1 rounded-full ${item.tagColor}`}>
//                   {item.tag}
//                 </span>

//                 <span className="text-black text-xs sm:text-sm">
//                   ⭐ <b>{item.rating}</b> {item.reviews}
//                 </span>
//               </div>

//               {/* TITLE */}
//               <h3 className="text-base sm:text-lg font-semibold text-slate-800 transition hover:text-[#1D52AF]">
//                 {item.title}
//               </h3>

//               {/* DESC */}
//               <p className="text-xs sm:text-sm text-gray-500 mt-2">
//                 {item.desc}
//               </p>

//               {/* PRICE + BUTTON */}
//               <div className="flex justify-between items-center mt-4">
//                 <span className="font-bold text-slate-800 text-sm sm:text-base">
//                   {item.price}
//                 </span>

//                 <Link
//                   to={`/services/${item.id}`}
//                   className="
//                     bg-[#1D52AF] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm
//                     transition-all
//                     hover:bg-[#1D52AF] hover:text-base
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
    tag: "Available",
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

        <Link
          to="/services"
          className="text-sm font-medium text-[#1D52AF] hover:underline"
        >
          View all services →
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((item) => (
          <div
            key={item.id}
            className="
              bg-white rounded-xl overflow-hidden border border-gray-100
              shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
            "
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-5">

              {/* TAG + RATING */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>

                <span className="text-xs sm:text-sm text-gray-600">
                  ⭐ <b>{item.rating}</b> {item.reviews}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
                {item.desc}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">

                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  {item.price}
                </span>

                <Link
                  to={`/services/${item.id}`}
                  className="
                    bg-[#1D52AF] text-white
                    px-4 py-2 rounded-lg text-xs sm:text-sm
                    transition hover:bg-blue-700
                  "
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