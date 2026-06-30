
import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "1",
    title: "Book a Service",
    desc: "Choose the car service you need and submit your request in minutes.",
  },
  {
    number: "2",
    title: "Get Matched",
    desc: "We connect you with a verified, nearby mechanic for your job.",
  },
  {
    number: "3",
    title: "Track & Pay",
    desc: "Monitor your service in real time and pay securely when done.",
  },
];

export default function HowMokaNikWorks() {
  return (
    <section id="how-it-works" className="relative px-6 pb-0 overflow-hidden font-sans bg-white sm:px-32 py-14 pb-14">
      {/* Decorative circle */}
      <div className="absolute top-0 -right-16 w-[420px] h-[420px] bg-gray-300 rounded-full opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-xl mb-12">
        <h2 className="mb-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          How MokaNik Works
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-500 sm:text-base">
          No more searching or waiting around. Find a trusted mechanic instantly and get your car
          serviced quickly, safely, and conveniently — right where you are.
        </p>
        <Link to="/signup">
        <button className="bg-[#1C52AF] hover:bg-[#163f8a] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Get Started
        </button>
      </Link>
      </div>

      {/* ── MOBILE: vertical stepper ── */}
      <div className="flex flex-col gap-0 sm:hidden">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            {/* Left: number + connector line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#1C52AF] flex items-center justify-center text-[#1C52AF] font-bold text-base shrink-0 shadow-sm">
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-[#1C52AF] opacity-30 my-1" />
              )}
            </div>

            {/* Right: text */}
            <div className="pt-1 pb-4">
              <p className="mb-1 text-base font-bold text-gray-900">
                {step.title}
              </p>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: SVG curve + nodes ── */}
      <div className="hidden sm:block relative bottom-[150px] -mb-[160px]" style={{ height: "280px" }}>
        <svg
          viewBox="0 0 900 260"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Curved path */}
          <path
            d="M 60 200 C 150 200, 180 130, 280 130 C 380 130, 420 60, 520 60 C 620 60, 660 10, 760 10"
            fill="none"
            stroke="#1C52AF"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Step 1 node */}
          <g transform="translate(280,130)">
            <rect x="-30" y="-30" width="60" height="60" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1C52AF">1</text>
          </g>

          {/* Step 2 node */}
          <g transform="translate(520,60)">
            <rect x="-30" y="-30" width="60" height="60" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1C52AF">2</text>
          </g>

          {/* Step 3 node */}
          <g transform="translate(760,10)">
            <rect x="-30" y="-30" width="60" height="60" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1C52AF">3</text>
          </g>
        </svg>

        {/* Step labels — positioned below each node */}
        {[
          { x: (280 / 900) * 100, top: 160 },
          { x: (520 / 900) * 100, top: 90 },
          { x: (760 / 900) * 100, top: 45 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-44"
            style={{ left: `${pos.x}%`, top: `${pos.top}px`, transform: "translateX(-50%)" }}
          >
            <p className="text-gray-900 text-[22px] font-bold mt-6">{steps[i].title}</p>
            <p className="text-gray-500 text-[14px] leading-relaxed">{steps[i].desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




