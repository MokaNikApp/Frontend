export default function Hero() {
  return (
    <section className="px-6 lg:px-24 py-16 bg-gray-50">

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            Join the MokaNik <br /> Network
          </h1>

          <p className="text-gray-500 mt-4">
            Grow your auto repair business with a steady stream of local
            customers and powerful management tools designed for modern mechanics.
          </p>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-blue-800 hover:bg-blue-700 text-white px-5 py-3 rounded-md text-sm">
              Apply to Provide Service
            </button>

            <span className="text-sm font-bold text-gray-600 cursor-pointer">
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
        <div>
          <img
            src="/images/hero-mechanic.png"
            alt="mechanic"
            className="w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}