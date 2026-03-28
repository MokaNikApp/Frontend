import { useEffect, useState } from "react";

export default function Stats() {
  const stats = [
    { target: 5000, suffix: "+", label: "Services Completed" },
    { target: 800, suffix: "+", label: "Verified Mechanics" },
    { target: 98, suffix: "%", label: "Happy Customers" },
    { target: 24, suffix: "/7", label: "Support Availability" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      let start = 0;
      const duration = 3000; // animation duration
      const increment = stat.target / (duration / 16);

      return setInterval(() => {
        start += increment;
        setCounts((prev) => {
          const updated = [...prev]
          updated[i] =
            start >= stat.target ? stat.target : Math.floor(start);
          return updated;
        });

        if (start >= stat.target) clearInterval(intervals[i]);
      }, 16);
    });

    return () => intervals.forEach((int) => clearInterval(int));
  }, []);

  return (
    <section className="bg-white py-0  sm:py-16 px-4 sm:px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {stats.map((item, index) => (
            <div key={index} className="px-4 sm:px-6 py-6 md:py-0">
              
              {/* NUMBER */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {counts[index].toLocaleString()}
                {item.suffix}
              </h3>

              {/* LABEL */}
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {item.label}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}