
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedStars() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLit(i);
      if (i >= 5) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-sm sm:text-base mt-1">
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          style={{
            color: n <= lit ? "#facc15" : "#d1d5db",
            transition: "color 0.3s ease",
            display: "inline-block",
            transform: n <= lit ? "scale(1.2)" : "scale(1)",
          }}
        >★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ item, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, box-shadow 0.3s ease`,
        position: "relative",
        overflow: "hidden",
      }}
      className="relative p-6 shadow-md bg-white/95 backdrop-blur-md sm:p-7 rounded-2xl hover:shadow-xl hover:-translate-y-1"
    >
      {/* Shimmer sweep on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
          transform: hovered ? "translateX(100%)" : "translateX(-100%)",
          transition: hovered ? "transform 0.55s ease" : "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Quote icon — subtle float */}
      <div
        className="mb-4 text-blue-500 opacity-70"
        style={{
          animation: "floatIcon 3s ease-in-out infinite",
          animationDelay: `${index * 0.4}s`,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10h4v4H7zM13 10h4v4h-4z" />
        </svg>
      </div>

      {/* Stars — animate only when card is visible */}
      {inView && <AnimatedStars />}
      {!inView && <div className="text-sm text-gray-300 sm:text-base mt-1">★★★★★</div>}

      {/* Text */}
      <p className="text-gray-600 text-sm sm:text-[15px] mt-4 leading-relaxed">
        "{item.text}"
      </p>

      {/* User */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-10 h-10 rounded-full sm:w-11 sm:h-11 ring-2 ring-blue-100"
          style={{ transition: "transform 0.3s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">Verified Customer</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dike Mitchell",
      image: "/images/test1.png",
      text: "MokaNik made finding trusted mechanics so easy. The service is fast, reliable, and stress-free.",
    },
    {
      name: "Sarah O'Conner",
      image: "/images/test2.png",
      text: "I love how transparent everything is. I always know what I'm paying for before the job starts.",
    },
    {
      name: "Williams Baker",
      image: "/images/test3.png",
      text: "Great experience overall. Booking a mechanic now takes minutes instead of hours of searching.",
    },
  ];

  const [sectionRef, sectionInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>

      <section
        id="reviews"
        className="bg-[#36558C] py-12 sm:py-18 px-4 sm:px-6 lg:px-24"
      >
        {/* HEADER */}
        <div
          ref={sectionRef}
          className="max-w-2xl mx-auto text-center"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            What Our Customers Say
          </h2>
          <p className="px-2 mt-3 text-sm leading-relaxed text-white/80 sm:text-base sm:px-6">
            Real experiences from people who trust MokaNik for their car servicing needs.
          </p>
        </div>

        {/* CARDS */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 mt-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
        >
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              item={item}
              index={index}
              inView={cardsInView}
            />
          ))}
        </div>
      </section>
    </>
  );
}