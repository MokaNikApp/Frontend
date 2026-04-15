const categories = [
  { image: "/images/Background1.png", label: "Oil Change" },
  { image: "/images/Background2.png", label: "Brake Repair" },
  { image: "/images/Background3.png", label: "Tire Service" },
  { image: "/images/Background4.png", label: "Engine Check" },
  { image: "/images/Background5.png", label: "AC Repair" },
  { image: "/images/Background6.png", label: "Battery" },
];

export default function Categories() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-10 bg-white">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs sm:text-sm font-medium text-[#1D52AF] uppercase tracking-widest mb-1">
            What are you looking for?
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            Browse by Category
          </h2>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative overflow-hidden group">

        {/* fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

        {/* track */}
        <div className="flex w-max animate-scroll gap-4 sm:gap-5 md:gap-6 group-hover:[animation-play-state:paused]">

          {[...categories, ...categories].map((cat, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              {/* CARD */}
              <div className="
                flex items-center justify-center
                bg-slate-50 border border-slate-100
                rounded-2xl
                w-[88px] sm:w-[110px] md:w-[130px] lg:w-[150px] xl:w-[170px]
                h-[78px] sm:h-[92px] md:h-[105px] lg:h-[120px]
                transition-all duration-300
              ">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="
                    object-contain
                    max-h-[40px] sm:max-h-[52px] md:max-h-[62px] lg:max-h-[72px]
                  "
                />
              </div>

              {/* LABEL */}
              <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-600 text-center">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* mobile CTA */}
      

      {/* animation */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll 28s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 1024px) {
          .animate-scroll {
            animation-duration: 36s;
          }
        }
      `}</style>

    </section>
  );
}