





// export default function WhyChoose() {
//   const features = [
//     {
//       image: "/images/wcm3.png",
//       title: "Verified Mechanics",
//       desc: "Every mechanic on MokaNik is carefully reviewed and approved to ensure reliable and professional service.",
//     },
//     {
//       image: "/images/wcm2.png",
//       title: "Transparent Pricing",
//       desc: "Get clear service estimates before booking so you always know what to expect.",
//     },
//     {
//       image: "/images/wcm1.png",
//       title: "Secure & Reliable",
//       desc: "Your bookings, payments, and service updates are handled safely through our platform.",
//     },
//   ];

//   return (
//     <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-24">
      
//       {/* HEADER */}
//       <div className="text-center max-w-2xl mx-auto">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//           Why Choose MokaNik?
//         </h2>
//         <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed px-4">
//           We make car servicing easier by connecting you with trusted mechanics and a seamless booking experience.
//         </p>
//       </div>

//       {/* FEATURES */}
//       <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
//         {features.map((item, index) => (
//           <div key={index} className="text-center px-2 sm:px-3">
            
//             {/* IMAGE */}
//             <div className="flex justify-center">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-16 sm:h-18 md:h-20 w-auto object-contain"
//               />
//             </div>

//             {/* TITLE */}
//             <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">
//               {item.title}
//             </h3>

//             {/* DESC */}
//             <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
//               {item.desc}
//             </p>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// }




import { motion } from "framer-motion";

export default function WhyChoose() {
  const features = [
    {
      image: "/images/wcm3.png",
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-24 bg-[#FAFAFA]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Why Choose MokaNik?
        </h2>
        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed px-4">
          We make car servicing easier by connecting you with trusted mechanics and a seamless booking experience.
        </p>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 max-w-6xl mx-auto"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            className="text-center px-2 sm:px-3"
          >
            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-16 sm:h-18 md:h-20 w-auto object-contain"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}