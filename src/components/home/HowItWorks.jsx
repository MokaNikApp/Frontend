import React from "react";

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-white py-32 px-8 lg:px-24 overflow-hidden font-sans min-h-[900px]">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-900">
          How MokaNik Works
        </h2>

        <p className="text-gray-500 mt-6">
          Booking a trusted mechanic has never been easier. <br />
          Booking a trusted mechanic has never been
        </p>

        <button className="mt-6 bg-blue-800 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm cursor-pointer">
          Get Started
        </button>

      {/* 2. THE VISUAL AREA (The Curve and the Steps) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Soft Decorative Glow (Far Right) */}
        <div className="absolute top-1/4 -right-20 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

        {/* THE SVG PATH 
            The coordinates below are mapped to match the 'top' and 'left' 
            percentages of the step cards exactly.
        */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="absolute top-[15%] left-0 w-full h-[70%] pointer-events-none"
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

        {/* STEP 1: Book a Service (Bottom Valley) */}
        <div className="absolute left-[20%] top-[74%] -translate-x-1/2 w-72">
          {/* Faint Background Number */}
          <span className="absolute -top-32 -left-10 text-[260px] font-black text-gray-100/60 select-none -z-10">1</span>
          
          {/* Node Box (Centered on the line) */}
          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-50">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-4 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Book a Service</h3>
            <p className="text-base text-slate-500 mt-2 leading-relaxed">
              Choose the car service you need and submit your request in. Choose the car service you n.
            </p>
          </div>
        </div>

        {/* STEP 2: Get Matched (Middle Rise) */}
        <div className="absolute left-[53%] top-[57%] -translate-x-1/2 w-72">
          <span className="absolute -top-36 -left-12 text-[260px] font-black text-gray-100/60 select-none -z-10">2</span>
          
          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-50">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-4 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Get Matched</h3>
            <p className="text-base text-slate-500 mt-2 leading-relaxed">
              His defective nor convinced residence own. Connection has put impossible own apartments boisterous.
            </p>
          </div>
        </div>

        {/* STEP 3: Track & Pay (Top Peak) */}
        <div className="absolute left-[83%] top-[32%] -translate-x-1/2 w-80">
          <span className="absolute -top-40 -left-16 text-[280px] font-black text-gray-100/40 select-none -z-10">3</span>
          
          <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-50">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          <div className="mt-14 px-6 text-left">
            <h3 className="text-2xl font-bold text-slate-800">Track & Pay</h3>
            <p className="text-base text-slate-500 mt-2 leading-relaxed">
              From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}