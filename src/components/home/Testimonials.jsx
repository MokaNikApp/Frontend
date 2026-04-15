// export default function Testimonials() {
//   const testimonials = [
//     {
//       name: "Dike Mitchell",
//       image: "/images/test1.png",
//       text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
//     },
//     {
//       name: "Sarah O'Conner",
//       image: "/images/test2.png",
//       text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
//     },
//     {
//       name: "Williams Baker",
//       image: "/images/test3.png",
//       text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
//     },
//   ];

//   return (
//     <section className="bg-[#36558C] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
      
//       {/* HEADER */}
//       <div className="text-center max-w-xl mx-auto">
//         <h2 className="text-2xl sm:text-3xl font-bold text-white">
//           What Our Customers Say
//         </h2>
//         <p className="text-white mt-3 px-4 sm:px-8 text-sm sm:text-base">
//           Real experiences from people who trust MokaNik for their car servicing needs.
//         </p>
//       </div>

//       {/* CARDS */}
//       <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
//         {testimonials.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white p-5 sm:p-6 rounded-xl shadow-md"
//           >
            
//             <div className="text-gray-300 mb-2">
//               <svg
//                 width="32"
//                 height="32"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M7 10h4v4H7z" />
//                 <path d="M13 10h4v4h-4z" />
//                 <path d="M7 10c0-3 2-5 5-5" />
//                 <path d="M13 10c0-3 2-5 5-5" />
//               </svg>
//             </div>

//             {/* STARS */}
//             <div className="text-yellow-400 text-xl sm:text-2xl mt-2">
//               ★★★★★
//             </div>

//             {/* TEXT */}
//             <p className="text-gray-600 text-sm mt-4 leading-relaxed">
//               {item.text}
//             </p>

//             {/* USER */}
//             <div className="flex items-center mt-5 sm:mt-6">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
//               />

//               <p className="ml-3 text-sm font-semibold text-gray-900">
//                 {item.name}
//               </p>
//             </div>

//           </div>
//         ))}
//       </div>

//     </section>
//   );
// }





export default function Testimonials() {
  const testimonials = [
    {
      name: "Dike Mitchell",
      image: "/images/test1.png",
      text: "MokaNik made finding trusted mechanics so easy. The service is fast, reliable, and stress-free.",
    },
    {
      name: "Sarah O'Conner",
      image: "/images/test2.png",
      text: "I love how transparent everything is. I always know what I’m paying for before the job starts.",
    },
    {
      name: "Williams Baker",
      image: "/images/test3.png",
      text: "Great experience overall. Booking a mechanic now takes minutes instead of hours of searching.",
    },
  ];

  return (
    <section className="bg-[#36558C] py-12 sm:py-18 px-4 sm:px-6 lg:px-24">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          What Our Customers Say
        </h2>

        <p className="text-white/80 mt-3 text-sm sm:text-base leading-relaxed px-2 sm:px-6">
          Real experiences from people who trust MokaNik for their car servicing needs.
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className="
              relative bg-white/95 backdrop-blur-md
              p-6 sm:p-7 rounded-2xl
              shadow-md hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >

            {/* quote icon */}
            <div className="text-blue-500 mb-4 opacity-70">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10h4v4H7zM13 10h4v4h-4z" />
              </svg>
            </div>

            {/* stars */}
            <div className="text-yellow-400 text-sm sm:text-base">
              ★★★★★
            </div>

            {/* text */}
            <p className="text-gray-600 text-sm sm:text-[15px] mt-4 leading-relaxed">
              “{item.text}”
            </p>

            {/* user */}
            <div className="flex items-center gap-3 mt-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-blue-100"
              />

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">Verified Customer</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}