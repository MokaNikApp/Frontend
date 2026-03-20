export default function Hero() {
  return (
    <div className="p-20 md:flex items-center justify-between bg-white">
      {/* LEFT */}
        <div className="max-w-xl">
          
          {/* SMALL BADGE */}
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-blue-800"><b>New:</b></span> Trusted Car Service Platform
          </span>

          {/* MAIN TEXT */}
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Book trusted <br />
            mechanics for <br />
            reliable car service
          </h1>

          {/* SUBTEXT */}
          <p className="mt-4 text-gray-500 text-lg">
            Skip the stress of searching for workshops — our verified
            professionals come to you, making car servicing faster,
            safer, and more convenient every time.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex items-center gap-4">
            <button className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium cursor-pointer" to="/services">
              Book a Service
            </button>

            <button className="text-gray-700 text-sm font-medium cursor-pointer" to="/providers">
              Become a Provider <span className="font-bold text-lg">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="mt-10 md:mt-0">
          <img
            src="/images/hero-mechanic.png"
            alt="mechanic"
            className="w-87.5 md:w-105 object-contain"
          />
        </div>
    </div>
  );
}