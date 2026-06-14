export default function AvailableServices() {
  return (
    <section className="relative bg-slate-100 overflow-hidden flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 sm:min-h-[350px]">

      {/* Background car SVG — hidden on small screens, shown md+ */}
      <svg
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-56 lg:w-72 h-auto opacity-15 pointer-events-none"
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="60" y="110" width="200" height="120" rx="16" fill="#94a3b8" />
        <rect x="80" y="90" width="160" height="80" rx="12" fill="#94a3b8" />
        <circle cx="100" cy="230" r="28" fill="#94a3b8" />
        <circle cx="220" cy="230" r="28" fill="#94a3b8" />
        <rect x="115" y="200" width="90" height="30" rx="4" fill="#cbd5e1" />
        <rect x="85" y="145" width="55" height="35" rx="6" fill="#cbd5e1" />
        <rect x="180" y="145" width="55" height="35" rx="6" fill="#cbd5e1" />
        <rect x="148" y="64" width="12" height="36" rx="4" fill="#94a3b8" transform="rotate(-10 148 64)" />
        <rect x="185" y="50" width="12" height="44" rx="4" fill="#94a3b8" transform="rotate(8 185 50)" />
        <rect x="215" y="60" width="28" height="12" rx="4" fill="#94a3b8" transform="rotate(-15 215 60)" />
        <rect x="235" y="40" width="28" height="12" rx="4" fill="#94a3b8" transform="rotate(20 235 40)" />
        <rect x="255" y="75" width="28" height="12" rx="4" fill="#94a3b8" transform="rotate(-5 255 75)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 leading-tight">
          Available Services
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-md sm:max-w-lg mx-auto px-2">
          Find and book top-rated auto repair services near you. Expert mechanics
          at your fingertips with guaranteed pricing and quality service.
        </p>

        {/* Search Bar — stacked on mobile, inline on sm+ */}
        <div className="bg-white rounded-xl shadow-sm w-full mx-auto overflow-hidden
                        flex flex-col sm:flex-row sm:items-center sm:px-3 sm:py-2.5">

          {/* Service input */}
          <div className="flex items-center gap-2 px-4 py-3 sm:py-1.5 sm:flex-1
                          border-b border-slate-200 sm:border-b-0 sm:border-r">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for oil change, brakes, etc."
              className="border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent w-full"
            />
          </div>

          {/* Location input */}
          <div className="flex items-center gap-2 px-4 py-3 sm:py-1.5 sm:flex-[0.8]
                          border-b border-slate-200 sm:border-b-0">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder="City or Zip Code"
              className="border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent w-full"
            />
          </div>

          {/* Search button — full width on mobile, auto on sm+ */}
          <button className="bg-[#1D52AF] hover:bg-blue-700 active:scale-95 text-white
                             px-8 py-3.5 sm:py-3 sm:rounded-lg
                             text-sm font-semibold transition-all w-full sm:w-auto
                             rounded-none sm:mx-1">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}