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
    <section className="px-6 lg:px-24 py-16 bg-gray-100">

      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">
          Why partner with MokaNik?
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Everything you need to succeed as a modern service provider, all in one platform.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            {/* ICON */}
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-800 rounded-md mb-4 text-lg">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-gray-900 text-sm">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-xs text-gray-500 mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}