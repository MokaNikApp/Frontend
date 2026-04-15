import { FaMoneyBill } from "react-icons/fa";
import { FiUsers, FiCalendar, FiSettings } from "react-icons/fi";

const features = [
  {
    title: "More Customers",
    desc: "Access a large pool of car owners in your area looking for quality service.",
    icon: <FiUsers />,
  },
  {
    title: "Flexible Work",
    desc: "Set your own hours and choose the jobs that fit your expertise and location.",
    icon: <FiCalendar />,
  },
  {
    title: "Reliable Payments",
    desc: "Secure, automated payments directly to your account after every completed job.",
    icon: <FaMoneyBill />,
  },
  {
    title: "Management Tools",
    desc: "Digital tools to track bookings, communicate with clients, and manage invoices.",
    icon: <FiSettings />,
  },
];

export default function WhyPartner() {
  return (
    <section className="px-6 lg:px-24 py-12 sm:py-14 bg-[#F7F9FC]">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Why partner with MokaNik?
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Everything you need to succeed as a modern service provider, all in one platform.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

        {features.map((item, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center 
                            bg-blue-50 text-blue-700 rounded-xl mb-5
                            group-hover:bg-blue-600 group-hover:text-white
                            transition-all duration-300 text-xl">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-gray-900 text-base">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}