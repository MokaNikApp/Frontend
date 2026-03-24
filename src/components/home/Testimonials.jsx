export default function Testimonials() {
  const testimonials = [
    {
      name: "Dike Mitchell",
      image: "/images/test1.png",
      text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
    },
    {
      name: "Sarah O'Conner",
      image: "/images/test2.png",
      text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
    },
    {
      name: "Williams Baker",
      image: "/images/test3.png",
      text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build",
    },
  ];

  return (
    <section className="bg-blue-800 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
      
      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          What Our Customers Say
        </h2>
        <p className="text-white mt-3 px-4 sm:px-8 text-sm sm:text-base">
          Real experiences from people who trust MokaNik for their car servicing needs.
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 sm:p-6 rounded-xl shadow-md"
          >
            
            <div className="text-gray-300 mb-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10h4v4H7z" />
                <path d="M13 10h4v4h-4z" />
                <path d="M7 10c0-3 2-5 5-5" />
                <path d="M13 10c0-3 2-5 5-5" />
              </svg>
            </div>

            {/* STARS */}
            <div className="text-yellow-400 text-xl sm:text-2xl mt-2">
              ★★★★★
            </div>

            {/* TEXT */}
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {item.text}
            </p>

            {/* USER */}
            <div className="flex items-center mt-5 sm:mt-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
              />

              <p className="ml-3 text-sm font-semibold text-gray-900">
                {item.name}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}