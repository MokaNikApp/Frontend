import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineCog,
  HiOutlineBeaker,
  HiOutlineLightningBolt,
  HiOutlineCloud,
  HiOutlineAdjustments,
  HiLocationMarker,
} from "react-icons/hi";
import Background2 from "../../assets/images/Background2.png";

const BookService = () => {
  const services = [
    {
      icon: <HiOutlineSparkles className="text-3xl" />,
      title: "Full Oil Change",
      price: "Starting from $89.00",
    },
    {
      icon: <HiOutlineCog className="text-3xl" />,
      title: "Tire Rotation",
      price: "Starting from $45.00",
    },
    {
      icon: <HiOutlineBeaker className="text-3xl" />,
      title: "Brake Repair",
      price: "Starting from $120.00",
    },
    {
      icon: <HiOutlineLightningBolt className="text-3xl" />,
      title: "Engine Diagnostic",
      price: "Starting from $99.00",
    },
    {
      icon: <HiOutlineCloud className="text-3xl" />,
      title: "AC Service",
      price: "Starting from $75.00",
    },
    {
      icon: <HiOutlineAdjustments className="text-3xl" />,
      title: "Other Service",
      price: "Get custom quote",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start p-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Location & Vehicle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Service Location */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Service Location
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <HiLocationMarker className="text-xl" />
              </span>
              <input
                type="text"
                placeholder="San Francisco, CA 94103"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Vehicle Select */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Vehicle</label>
            <select className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>2022 Tesla Model 3 (Gray)</option>
              <option>2023 Toyota Camry (White)</option>
              <option>2021 Honda Civic (Blue)</option>
            </select>
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-6">
          <h1 className="text-lg font-semibold text-gray-700 mb-4">
            Select Service
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg text-black hover:bg-[#1D52AF] hover:text-white transition cursor-pointer text-center space-y-2"
              >
                <div>{service.icon}</div>
                <p className="font-medium">{service.title}</p>
                <p className="text-sm">{service.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Schedule Card */}
          <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white">
            <h1 className="text-lg font-semibold mb-3">Schedule</h1>

            {/* Date Picker */}
            <label className="block mb-1 font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-2 py-1.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Time Slots */}
            <label className="block mb-1 font-medium text-gray-700">
              Time Slots
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["00:00am", "11:00am", "12:00pm","1:00pm","2:00pm","3:00pm"].map((time, idx) => (
                <button
                  key={idx}
                  className="border border-gray-300 rounded-lg py-1.5 text-sm hover:bg-[#1D52AF] hover:text-white transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Mechanics Card */}
          <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white">
            <h1 className="text-lg font-semibold mb-4">Available Mechanics</h1>

            {/* Mechanic List */}
            {[
              {
                name: "Marco Rossi",
                rating: "4.9 (120 reviews)",
                badge: "EXPERT",
              },
              {
                name: "Lara Smith",
                rating: "4.8 (95 reviews)",
                badge: "SENDER",
              },
              { name: "John Doe", rating: "4.7 (80 reviews)", badge: "FAST" },
            ].map((mech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 mb-3 border border-gray-200 rounded-xl hover:shadow-md cursor-pointer transition"
              >
                {/* Image + Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={Background2}
                    alt={mech.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{mech.name}</p>
                    <p className="text-xs text-gray-500">{mech.rating}</p>
                  </div>
                </div>

                {/* Badge */}
                <div
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    mech.badge === "EXPERT"
                      ? "bg-green-100 text-green-600"
                      : "SENDER"
                        ? "bg-[#F1F5F9] text-green-600"
                        : "bg-yellow-700 text-yellow-600"
                  }`}
                >
                  {mech.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (empty for now, you can add cards or tips) */}
      <div className="space-y-6">
        {/* Summary Card */}
        {/* Phone Wrapper */}

        <div className="w-[320px] h-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 p-4 overflow-y-auto">
          {/* Header */}
          <div className="bg-[#1D52AF] text-white p-4 rounded-xl">
            <p className="text-lg font-semibold">Book Summary</p>
            <p className="text-xs opacity-90">Order #MK-78219</p>
          </div>

          {/* Content */}
          <div className="mt-4 space-y-4">
            {/* Vehicle */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg text-sm">🚗</div>
              <div>
                <p className="text-xs text-gray-400">Vehicle</p>
                <p className="font-medium text-sm">Tesla Model 3 • Gray</p>
              </div>
            </div>

            {/* Mechanic */}
            <div className="flex items-center gap-3">
              <img
                src={Background2}
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
              />
              <div>
                <p className="text-xs text-gray-400">Mechanic</p>
                <p className="font-medium text-sm">Marco Rossi</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Pricing */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="text-gray-500">Full Oil Change</p>
                <p>$89.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Service Fee</p>
                <p>$10.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Taxes</p>
                <p>$5.00</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold border-t border-gray-100 pt-2">
              <p>Total</p>
              <p>$104.00</p>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <input
                placeholder="Promo code"
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-gray-100 px-3 rounded-lg text-sm">
                Apply
              </button>
            </div>

            {/* Button */}
            <button className="w-full bg-[#1D52AF] text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition">
              Confirm Booking →
            </button>

            {/* Note */}
            <p className="text-[11px] text-gray-400 leading-relaxed text-center">
              By confirming, you agree to MokaNik's Terms of Service and Privacy
              Policy. Cancellation is free up to 24h before.
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md space-y-3 mt-5">
          <div className="flex items-center gap-2">
            <HiLocationMarker className="text-[#1C52AF] text-xl" />
            <h2 className="font-semibold text-gray-700">Service Location</h2>
          </div>

          <div className="w-full h-28 rounded-lg overflow-hidden">
            <iframe
              title="map"
              className="w-full h-full border-0"
              src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
