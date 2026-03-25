export default function Hero() {
  return (
    <div className="px-4 sm:px-6 lg:px-6 py-10 sm:py-12 lg:py-12 md:flex items-center justify-between bg-white">

      {/* LEFT */}
      <div className="max-w-3xl px-4 sm:px-8 lg:px-24">
        
        {/* SMALL BADGE */}
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          <span className="font-semibold text-blue-800">
            <b>New:</b>
          </span>{" "}
          Trusted Car Service Platform
        </span>

        {/* MAIN TEXT */}
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Book trusted mechanics for reliable car service
        </h1>

        {/* SUBTEXT */}
        <p className="mt-4 text-gray-500 text-sm sm:text-base md:text-lg">
          Skip the stress of searching for workshops — our verified
          professionals come to you, making car servicing faster,
          safer, and more convenient every time.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <button className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium w-full sm:w-auto">
            Book a Service
          </button>

          <button className="text-gray-700 text-sm font-medium w-full sm:w-auto text-center sm:text-center">
            Become a Provider <span className="font-bold text-lg">→</span>
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="mt-10 md:mt-0 flex justify-center">
        <img
          src="/images/hero-mechanic.png"
          alt="mechanic"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
}