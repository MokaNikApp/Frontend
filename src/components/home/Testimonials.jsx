



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
    <section id="reviews" className="bg-[#36558C] py-12 sm:py-18 px-4 sm:px-6 lg:px-24">

      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
          What Our Customers Say
        </h2>

        <p className="px-2 mt-3 text-sm leading-relaxed text-white/80 sm:text-base sm:px-6">
          Real experiences from people who trust MokaNik for their car servicing needs.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 gap-6 mt-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className="relative p-6 transition-all duration-300 shadow-md  bg-white/95 backdrop-blur-md sm:p-7 rounded-2xl hover:shadow-xl hover:-translate-y-1"
          >

            {/* quote icon */}
            <div className="mb-4 text-blue-500 opacity-70">
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
            <div className="text-sm text-yellow-400 sm:text-base">
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
                className="object-cover w-10 h-10 rounded-full sm:w-11 sm:h-11 ring-2 ring-blue-100"
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