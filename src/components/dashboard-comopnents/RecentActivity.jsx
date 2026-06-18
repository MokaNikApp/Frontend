import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiCheckCircle,
  HiCash,
  HiCalendar,
  HiLocationMarker,
  HiClipboardList,
} from "react-icons/hi";

const activityIcon = (type) => {
  switch (type) {
    case "service_completed":
      return <HiCheckCircle className="text-green-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />;
    case "invoice_paid":
      return <HiCash className="text-blue-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />;
    case "appointment_rescheduled":
    case "appointment_booked":
      return <HiCalendar className="text-yellow-500 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />;
    default:
      return <HiClipboardList className="text-gray-400 text-2xl mt-1 transition-transform duration-300 group-hover:scale-110" />;
  }
};

const RecentActivity = ({ recentActivity = [], maintenanceTips = [] }) => {
  const [tipIndex, setTipIndex] = useState(0);

  const hasTips = maintenanceTips?.length > 0;
  const currentTip = hasTips ? maintenanceTips[tipIndex] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── LEFT: Recent Activity — always rendered ── */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

          <h1 className="text-lg font-semibold text-gray-700">Recent Activity</h1>

          {recentActivity.length > 0 ? (
            recentActivity.map((item, index) => (
              <div key={item.id || index} className="flex gap-4 items-start group">
                {activityIcon(item.type)}
                <div>
                  <h2 className="font-medium group-hover:text-gray-900 transition">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  )}
                  {item.time && (
                    <p className="text-xs text-gray-400">{item.time}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            /* Empty state — always visible */
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
              <div className="p-4 bg-gray-50 rounded-full">
                <HiClipboardList className="text-gray-300 text-4xl" />
              </div>
              <div>
                <p className="text-gray-500 font-medium">No activity yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Completed services, payments, and appointments will appear here.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── RIGHT SECTION — always rendered ── */}
      <div className="space-y-6 sm:-mt-6">

        {/* Maintenance Tip Card — always shown */}
        <div className="bg-[#1C52AF] text-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

          <p className="text-lg font-semibold mb-2">
            {currentTip ? currentTip.title : "Maintenance Tip"}
          </p>

          <p className="text-sm leading-relaxed text-white/90">
            {currentTip
              ? currentTip.description
              : "Stay on top of your vehicle's health. Regular maintenance keeps you safe and saves money long-term."}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link
              to="/home"
              className="flex-1 inline-block bg-white text-[#1C52AF] py-2 px-4 rounded-lg font-medium
                hover:bg-gray-100 transition active:scale-95 text-center text-sm"
            >
              Learn More
            </Link>

            {maintenanceTips.length > 1 && (
              <button
                onClick={() => setTipIndex((prev) => (prev + 1) % maintenanceTips.length)}
                className="bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg
                  text-sm font-medium transition active:scale-95 whitespace-nowrap"
              >
                Next →
              </button>
            )}
          </div>

          {/* Pagination dots — only if multiple tips */}
          {maintenanceTips.length > 1 && (
            <div className="flex gap-1.5 mt-3 justify-center">
              {maintenanceTips.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTipIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === tipIndex ? "bg-white w-3" : "bg-white/40 w-1.5"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Map Card — always shown */}
        <div className="bg-white p-5 rounded-2xl shadow-md space-y-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center gap-2">
            <HiLocationMarker className="text-[#1C52AF] text-xl transition-transform duration-300 hover:scale-110" />
            <h2 className="font-semibold text-gray-700">Service Location</h2>
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