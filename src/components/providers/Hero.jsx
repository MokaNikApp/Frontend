export default function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-6 py-8 sm:py-10 lg:py-12 bg-gray-50 overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="max-w-3xl px-4 sm:px-8 lg:px-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            Join the MokaNik <br /> Network
          </h1>

          <p className="text-gray-500 mt-4 text-sm sm:text-base md:text-lg">
            Grow your auto repair business with a steady stream of local
            customers and powerful management tools designed for modern mechanics.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            <button className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm w-full sm:w-auto">
              Apply to Provide Service
            </button>

            <span className="text-sm font-bold text-gray-600 cursor-pointer text-center sm:text-center">
              Learn more →
            </span>
          </div>

          {/* AVATARS */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex -space-x-2">
              <img src="/images/test1.png" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/images/test2.png" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/images/test3.png" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>

            <span className="text-sm text-gray-500">
              <b>500+</b> experts already joined
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="mt-0 lg:mt-0 flex justify-center">
          <img
            src="/images/hero-mechanic.png"
            alt="mechanic"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

      </div>
    </section>
  );
}