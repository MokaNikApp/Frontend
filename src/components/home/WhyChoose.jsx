export default function WhyChoose() {
  const features = [
    {
      image: "/images/wcm3.png", // replace with your actual image
      title: "Verified Mechanics",
      desc: "Every mechanic on MokaNik is carefully reviewed and approved to ensure reliable and professional service.",
    },
    {
      image: "/images/wcm2.png",
      title: "Transparent Pricing",
      desc: "Get clear service estimates before booking so you always know what to expect.",
    },
    {
      image: "/images/wcm1.png",
      title: "Secure & Reliable",
      desc: "Your bookings, payments, and service updates are handled safely through our platform.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-24">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose MokaNik?
        </h2>
      </div>

      {/* FEATURES */}
      <div className="mt-16 grid md:grid-cols-3 gap-10">
        {features.map((item, index) => (
          <div key={index} className="text-center">
            
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="mx-auto h-20 object-contain"
            />

            {/* TITLE */}
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}