




import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const stats = [
    { target: 5000, suffix: "+", label: "Services Completed", short: "Services" },
    { target: 800, suffix: "+", label: "Verified Mechanics", short: "Mechanics" },
    { target: 98, suffix: "%", label: "Happy Customers", short: "Happy %" },
    { target: 24, suffix: "/7", label: "Support Availability", short: "24/7" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCounting();
        }
      },
      { threshold: 0.4 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  const startCounting = () => {
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCounts(stats.map((stat) => Math.floor(progress * stat.target)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="w-full bg-[#F7F5F8] py-8" ref={sectionRef}>
      <div className="w-full px-4 sm:px-6 lg:px-16">

        {/* 2-col on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4">

          {stats.map((item, index) => (
            <div key={index} className="relative py-6 px-4 text-center">

              {/* Divider: vertical on all screens except first col */}
              {index % 2 !== 0 && (
                <div className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200" />
              )}
              {index !== 0 && (
                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200" />
              )}

              {/* Horizontal divider between rows on mobile */}
              {index >= 2 && (
                <div className="sm:hidden absolute top-0 left-4 right-4 h-px bg-gray-200" />
              )}

              {/* Number */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {counts[index].toLocaleString()}
                {item.suffix}
              </h3>

              {/* Label */}
              <p className="text-gray-500 mt-1 text-xs sm:text-sm tracking-wide leading-tight">
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}