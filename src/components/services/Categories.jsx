// const categories = [
//   { image: "/images/Background1.png", label: "Oil Change" },
//   { image: "/images/Background2.png", label: "Brake Repair" },
//   { image: "/images/Background3.png", label: "Tire Service" },
//   { image: "/images/Background4.png", label: "Engine Check" },
//   { image: "/images/Background5.png", label: "AC Repair" },
//   { image: "/images/Background6.png", label: "Battery" },
// ];

// export default function Categories() {
//   return (
//     <section className="px-4 sm:px-6 lg:px-24 py-10 bg-white">

//       {/* HEADER */}
//       <div className="flex items-end justify-between mb-8">
//         <div>
//           <p className="text-xs sm:text-sm font-medium text-[#1D52AF] uppercase tracking-widest mb-1">
//             What are you looking for?
//           </p>

//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
//             Browse by Category
//           </h2>
//         </div>
//       </div>

//       {/* SLIDER */}
//       <div className="relative overflow-hidden group">

//         {/* fades */}
//         <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
//         <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

//         {/* track */}
//         <div className="flex w-max animate-scroll gap-4 sm:gap-5 md:gap-6 group-hover:[animation-play-state:paused]">

//           {[...categories, ...categories].map((cat, i) => (
//             <button
//               key={i}
//               className="flex flex-col items-center gap-2 flex-shrink-0"
//             >
//               {/* CARD */}
//               <div className="
//                 flex items-center justify-center
//                 bg-slate-50 border border-slate-100
//                 rounded-2xl
//                 w-[88px] sm:w-[110px] md:w-[130px] lg:w-[150px] xl:w-[170px]
//                 h-[78px] sm:h-[92px] md:h-[105px] lg:h-[120px]
//                 transition-all duration-300
//               ">
//                 <img
//                   src={cat.image}
//                   alt={cat.label}
//                   className="
//                     object-contain
//                     max-h-[40px] sm:max-h-[52px] md:max-h-[62px] lg:max-h-[72px]
//                   "
//                 />
//               </div>

//               {/* LABEL */}
//               <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-600 text-center">
//                 {cat.label}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* mobile CTA */}
      

//       {/* animation */}
//       <style jsx>{`
//         .animate-scroll {
//           animation: scroll 28s linear infinite;
//         }

//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         @media (min-width: 1024px) {
//           .animate-scroll {
//             animation-duration: 36s;
//           }
//         }
//       `}</style>

//     </section>
//   );
// }






import { useState, useEffect } from "react";
import api from "../../api/axios";

// ─── Static image mapping for categories ────────────────────────────────────
const CATEGORY_IMAGES = {
  oil_change:        "/images/Background1.png",
  brake_repair:      "/images/Background2.png",
  tire_rotation:     "/images/Background3.png",
  engine_diagnostic: "/images/Background4.png",
  ac_service:        "/images/Background5.png",
  electrical:        "/images/Background6.png",
  transmission:      "/images/Background1.png",
  suspension:        "/images/Background2.png",
  custom:            "/images/Background3.png",
};

// ─── Fallback image if category not in mapping ──────────────────────────────
const FALLBACK_IMAGE = "/images/Background1.png";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/services/categories");
      const data = res.data?.categories || res.data?.data || [];
      
      // Map API categories to our format with images
      const mapped = data.map((cat) => ({
        id: cat.id,
        label: cat.name
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\\b\\w/g, (c) => c.toUpperCase()),
        image: CATEGORY_IMAGES[cat.id] || FALLBACK_IMAGE,
      }));
      
      setCategories(mapped);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(true);
      // Fallback to hardcoded categories if API fails
      setCategories([
        { id: "oil_change", label: "Oil Change", image: "/images/Background1.png" },
        { id: "brake_repair", label: "Brake Repair", image: "/images/Background2.png" },
        { id: "tire_rotation", label: "Tire Service", image: "/images/Background3.png" },
        { id: "engine_diagnostic", label: "Engine Check", image: "/images/Background4.png" },
        { id: "ac_service", label: "AC Repair", image: "/images/Background5.png" },
        { id: "electrical", label: "Battery", image: "/images/Background6.png" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Double the array for infinite scroll effect
  const doubledCategories = [...categories, ...categories];

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

      {/* Loading state */}
      {loading ? (
        <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 animate-pulse">
              <div className="bg-slate-100 rounded-2xl w-[88px] sm:w-[110px] md:w-[130px] lg:w-[150px] xl:w-[170px] h-[78px] sm:h-[92px] md:h-[105px] lg:h-[120px]" />
              <div className="h-3 bg-slate-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        /* SLIDER */
        <div className="relative overflow-hidden group">
          {/* fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          {/* track */}
          <div className="categories-scroll-track flex w-max gap-4 sm:gap-5 md:gap-6 group-hover:[animation-play-state:paused]">
            {doubledCategories.map((cat, i) => (
              <button
                key={`${cat.id}-${i}`}
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
                  hover:bg-slate-100 hover:border-slate-200
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
      )}

      {/* Inline styles for the scroll animation */}
      <style>{`
        .categories-scroll-track {
          animation: categoriesScroll 28s linear infinite;
        }

        @keyframes categoriesScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 1024px) {
          .categories-scroll-track {
            animation-duration: 36s;
          }
        }
      `}</style>
    </section>
  );
}