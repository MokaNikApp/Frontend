export default function Stats() {
  const stats = [
    { number: "5,000+", label: "Services Completed" },
    { number: "800+", label: "Verified Mechanics" },
    { number: "98%", label: "Happy Customers" },
    { number: "98%", label: "Happy Customers" },
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-gray-200">
          
          {stats.map((item, index) => (
            <div key={index} className="px-6">
              
              {/* NUMBER */}
              <h3 className="text-3xl font-bold text-gray-900">
                {item.number}
              </h3>

              {/* LABEL */}
              <p className="text-sm text-gray-500 mt-2">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}