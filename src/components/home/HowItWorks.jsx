import React from "react";

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-white py-20 px-4 sm:px-6 lg:px-24 overflow-hidden font-sans lg:min-h-225">

      {/* HEADER */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        How MokaNik Works
      </h2>

      <p className="text-gray-500 mt-4 sm:mt-6 text-sm sm:text-base max-w-xl">
        Booking a trusted mechanic has never been easier. <br />
        Booking a trusted mechanic has never been
      </p>

      <button className="mt-6 bg-blue-800 hover:bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm cursor-pointer">
        Get Started
      </button>

      {/* ================= MOBILE VERSION ================= */}
      <div className="mt-12 space-y-12 lg:hidden">

        {/* STEP 1 */}
        <div>
          <span className="text-6xl font-black text-gray-200">1</span>
          <h3 className="text-xl font-bold text-slate-800 mt-2">Book a Service</h3>
          <p className="text-sm text-slate-500 mt-2">
            Choose the car service you need and submit your request in. Choose the car service you n.
          </p>
        </div>

        {/* STEP 2 */}
        <div>
          <span className="text-6xl font-black text-gray-200">2</span>
          <h3 className="text-xl font-bold text-slate-800 mt-2">Get Matched</h3>
          <p className="text-sm text-slate-500 mt-2">
            His defective nor convinced residence own. Connection has put impossible own apartments boisterous.
          </p>
        </div>

        {/* STEP 3 */}
        <div>
          <span className="text-6xl font-black text-gray-200">3</span>
          <h3 className="text-xl font-bold text-slate-800 mt-2">Track & Pay</h3>
          <p className="text-sm text-slate-500 mt-2">
            From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.
          </p>
        </div>

      </div>

      {/* ================= DESKTOP VERSION ================= */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">

        {/* Glow */}
        <div className="absolute top-1/4 -right-20 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px]" />

        {/* SVG LINE */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="absolute top-[15%] left-0 w-full h-[70%]"
        >
          <path
            d="M 0 300
               C 100 300, 120 420, 200 420
               C 350 420, 400 300, 530 300
               C 650 300, 700 120, 830 120
               L 1100 10"
            stroke="#1d4ed8"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-[0_12px_15px_rgba(29,78,216,0.2)]"
          />
        </svg>

        {/* STEP 1 */}
        <div className="absolute left-[20%] top-[74%] -translate-x-1/2 w-72">
          <span className="absolute -top-32 -left-10 text-[260px] font-black text-gray-300/60 -z-10">1</span>

          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-4 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Book a Service</h3>
            <p className="text-base text-slate-500 mt-2">
              Choose the car service you need and submit your request in. Choose the car service you n.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="absolute left-[53%] top-[57%] -translate-x-1/2 w-72">
          <span className="absolute -top-36 -left-12 text-[260px] font-black text-gray-300/60 -z-10">2</span>

          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-4 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Get Matched</h3>
            <p className="text-base text-slate-500 mt-2">
              His defective nor convinced residence own. Connection has put impossible own apartments boisterous.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="absolute left-[83%] top-[32%] -translate-x-1/2 w-80">
          <span className="absolute -top-40 -left-16 text-[280px] font-black text-gray-300/40 -z-10">3</span>

          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-6 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Track & Pay</h3>
            <p className="text-base text-slate-500 mt-2">
              From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}