

import React from "react";
import { Link } from "react-router-dom";
import {
  HiCheckCircle,
  HiCash,
  HiCalendar,
  HiLocationMarker,
} from "react-icons/hi";

const RecentActivity = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-6">

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

          <h1 className="text-lg font-semibold text-gray-700">
            Recent Activity
          </h1>

          {/* Item 1 */}
          <div className="flex gap-4 items-start group">
            <HiCheckCircle className="text-green-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h2 className="font-medium group-hover:text-gray-900 transition">
                Service Completed
              </h2>
              <p className="text-gray-500 text-sm">
                Brake pads replacement for Honda Civic (ABC-123-XY)
              </p>
              <p className="text-xs text-gray-400">Today, 10:45 AM</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 items-start group">
            <HiCash className="text-blue-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h2 className="font-medium group-hover:text-gray-900 transition">
                Invoice Paid
              </h2>
              <p className="text-gray-500 text-sm">
                Payment of $250.00 for Annual Inspection received.
              </p>
              <p className="text-xs text-gray-400">Yesterday, 4:20 PM</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 items-start group">
            <HiCalendar className="text-yellow-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h2 className="font-medium group-hover:text-gray-900 transition">
                Appointment Rescheduled
              </h2>
              <p className="text-gray-500 text-sm">
                Oil change moved to Nov 24, 2023 at 9:00 AM.
              </p>
              <p className="text-xs text-gray-400">2 days ago</p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-6 sm:-mt-24">

        {/* Tip Card */}
        <div className="bg-[#1C52AF] text-white p-6 rounded-2xl shadow-md
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

          <div>
            <p className="text-lg font-semibold mb-2">
              Maintenance Tip
            </p>

            <p className="text-sm leading-relaxed text-white/90">
              Did you know that keeping your tires properly inflated
              can improve your gas mileage by up to 3%?
            </p>
          </div>

          {/* Button becomes LINK */}
          <Link
            to="/tips"
            className="inline-block mt-6 bg-white text-[#1C52AF] py-2 px-4 rounded-lg font-medium
            hover:bg-gray-100 transition active:scale-95 w-full text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Map Card */}
        <div className="bg-white p-5 rounded-2xl shadow-md space-y-3
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

          <div className="flex items-center gap-2">
            <HiLocationMarker className="text-[#1C52AF] text-xl transition-transform duration-300 hover:scale-110" />
            <h2 className="font-semibold text-gray-700">
              Service Location
            </h2>
          </div>

          <div className="w-full h-24 rounded-xl overflow-hidden">
            <iframe
              title="map"
              className="w-full h-full border-0"
              src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentActivity;