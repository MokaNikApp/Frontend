



import React, { useState } from "react";
import pic2 from '../../assets/images/pic2.png';
import pic3 from '../../assets/images/pic3.png';
import pic4 from '../../assets/images/pic4.png';
import Background2 from '../../assets/images/Background2.png';
import { HiChatAlt2, HiLocationMarker } from "react-icons/hi";

const MyService = () => {
  const [activeTab, setActiveTab] = useState("active");

  const serviceData = [
    {
      img: pic2,
      status: "IN PROGRESS",
      title: "Full Engine Diagnostics & Tune-up",
      car: "2021 Toyota Camry Hybrid • Silver",
      time: "Today, 4:30 PM",
      progress: 65,
    },
    {
      img: pic3,
      status: "Mechanic Assigned",
      title: "Brake Pad Replacement & Rotor Polish",
      car: "2019 Tesla Model 3 • Deep Sea Blue",
      time: "Tomorrow, 9:00 AM",
      progress: 65,
    },
    {
      img: pic4,
      status: "IN PROGRESS",
      title: "Annual Safety Inspection & Emission Test",
      car: "2023 Honda CR-V • Metallic Gray",
      time: "Today, 4:30 PM",
      progress: 65,
    },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">

      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-xl font-semibold">Active Services</h1>
          <p className="text-sm text-gray-500">
            Real-time tracking of your ongoing vehicle maintenance and repairs.
          </p>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg flex-wrap w-full md:w-fit">
          {["active", "scheduled", "completed"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-lg transition ${
                activeTab === tab ? "bg-white shadow text-black" : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      {serviceData.map((service, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-300 flex flex-col gap-4"
        >
          {/* Image */}
          <img src={service.img} alt="service" className="w-full rounded-lg" />

          {/* Status + ID */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex gap-3 items-center flex-wrap">
              <p className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                {service.status}
              </p>
              <p className="text-sm font-medium text-gray-600">#SRV-8821</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Estimated Completion</p>
            </div>
          </div>

          {/* Title + Time */}
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold text-gray-800">{service.title}</p>
              <p className="text-sm text-gray-500">{service.car}</p>
            </div>
            <div className="min-w-[100px]">
              <p className="text-sm font-medium text-gray-700">{service.time}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm flex-wrap gap-2">
              <p className="text-gray-600">Current Progress: Testing internal components</p>
              <p className="font-semibold text-gray-800">{service.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-[#1C52AF] h-2 rounded-full"
                style={{ width: `${service.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-3 flex justify-between items-center flex-wrap gap-3">
            {/* Mechanic */}
            <div className="flex items-center gap-2">
              <img src={Background2} alt="mechanic" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-xs text-gray-500">Reviewing</p>
                <p className="text-sm font-medium">#SRV-8752</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg">
                <HiChatAlt2 size={16} />
                Message
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg">
                <HiLocationMarker size={16} />
                Track Live
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyService;