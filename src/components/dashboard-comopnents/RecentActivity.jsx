import React from "react";
import { 
  HiCheckCircle, 
  HiCash, 
  HiCalendar, 
  HiLocationMarker 
} from "react-icons/hi";

const RecentActivity = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-6">

        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-xl shadow-md space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">
            Recent Activity
          </h1>

          {/* Item */}
          <div className="flex gap-4 items-start">
            <HiCheckCircle className="text-green-500 text-2xl mt-1" />
            <div>
              <h2 className="font-medium">Service Completed</h2>
              <p className="text-gray-500 text-sm">
                Brake pads replacement for Honda Civic (ABC-123-XY)
              </p>
              <p className="text-xs text-gray-400">Today, 10:45 AM</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <HiCash className="text-blue-500 text-2xl mt-1" />
            <div>
              <h2 className="font-medium">Invoice Paid</h2>
              <p className="text-gray-500 text-sm">
                Payment of $250.00 for Annual Inspection received.
              </p>
              <p className="text-xs text-gray-400">Yesterday, 4:20 PM</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <HiCalendar className="text-yellow-500 text-2xl mt-1" />
            <div>
              <h2 className="font-medium">Appointment Rescheduled</h2>
              <p className="text-gray-500 text-sm">
                Oil change moved to Nov 24, 2023 at 9:00 AM.
              </p>
              <p className="text-xs text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="sm:-mt-26">
      <div className="bg-[#1C52AF] text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
        <div>
          <p className="text-lg font-semibold mb-2">
            Maintenance Tip
          </p>
          <p className="text-sm leading-relaxed">
            Did you know that keeping your tires properly inflated
            can improve your gas mileage by up to 3%?
          </p>
        </div>

        <button className="mt-6 bg-white text-[#1C52AF] py-2 rounded-lg font-medium hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-md space-y-3 mt-5">
          <div className="flex items-center gap-2">
            <HiLocationMarker className="text-[#1C52AF] text-xl" />
            <h2 className="font-semibold text-gray-700">
              Service Location
            </h2>
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

export default RecentActivity;