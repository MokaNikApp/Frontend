// components/Users-admin-components/AdminNotifications.jsx
import { useState } from "react";
import {
  MdNotifications,
  MdSettings,
} from "react-icons/md";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-10 h-5 rounded-full transition ${
      enabled ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition ${
        enabled ? "translate-x-5" : ""
      }`}
    />
  </button>
);

export default function AdminNotifications() {
  const [activeTab, setActiveTab] = useState("all");

  const [emailDigest, setEmailDigest] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState(false);

  const tabs = ["All", "System", "Bookings", "Payments"];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <p className="text-sm text-gray-500">
          Stay updated with platform alerts, booking changes, and payment status.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 space-y-4">

          {/* Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg ${
                    activeTab === tab.toLowerCase()
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="text-xs text-blue-600 font-semibold">
                Mark all as read
              </button>
              <MdSettings className="text-gray-500" />
            </div>
          </div>

          {/* Notification Cards */}

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-blue-500 font-bold mb-1">SYSTEM ALERT</p>
            <p className="text-sm font-semibold">
              Server Maintenance scheduled for Oct 30, 2:00 AM UTC.
            </p>
            <div className="mt-2 flex gap-3 text-xs text-blue-600">
              <button>Mark as Read</button>
              <button className="text-gray-400">Dismiss</button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-purple-500 font-bold mb-1">BOOKING UPDATE</p>
            <p className="text-sm font-semibold">
              New booking request from Julian Marc for Full Engine Service.
            </p>
            <div className="mt-2 flex gap-3 text-xs">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                View Details
              </button>
              <button className="text-gray-400">Quick Approve</button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-green-500 font-bold mb-1">PAYMENT ALERT</p>
            <p className="text-sm font-semibold">
              Payout of $1,240.50 successfully processed for Mechanic: Marco Silva.
            </p>
            <div className="mt-2 flex gap-3 text-xs text-blue-600">
              <button>Download Invoice</button>
              <button className="text-gray-400">Audit Log</button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-red-500 font-bold mb-1">DISPUTE ALERT</p>
            <p className="text-sm font-semibold">
              New dispute opened by Elena Rodriguez regarding Service #MK-7281.
            </p>
            <div className="mt-2 flex gap-3 text-xs">
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                Resolve Now
              </button>
              <button className="text-gray-400">View Evidence</button>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-80 space-y-4">

          {/* Activity */}
          <div className="bg-[#1D4ED8] text-white p-5 rounded-2xl">
            <p className="text-sm mb-2">Activity Snapshot</p>
            <p className="text-3xl font-bold">24</p>
            <p className="text-xs text-blue-200 mb-4">Unread alerts</p>

            <div className="flex justify-between text-xs">
              <div>
                <p className="text-blue-200">Avg response</p>
                <p className="font-bold">1.4h</p>
              </div>
              <div>
                <p className="text-blue-200">Resolution rate</p>
                <p className="font-bold">98.2%</p>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white p-4 rounded-xl border space-y-4">
            <p className="text-xs font-bold text-gray-500">QUICK SETTINGS</p>

            <div className="flex justify-between items-center">
              <p className="text-sm">Email Digests</p>
              <Toggle enabled={emailDigest} onChange={setEmailDigest} />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm">Push Notifications</p>
              <Toggle enabled={pushNotif} onChange={setPushNotif} />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm">Slack Webhooks</p>
              <Toggle enabled={slackWebhook} onChange={setSlackWebhook} />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border text-xs">
              <p className="font-semibold mb-1">Need help with disputes?</p>
              <p className="text-gray-500 mb-2">
                View the specialized admin guide for handling customer service issues.
              </p>
              <button className="text-blue-600 font-semibold">
                GO TO GUIDE →
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-100 p-3 rounded-xl text-xs text-gray-600 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            ALL SYSTEMS OPERATIONAL
          </div>

        </div>

      </div>
    </div>
  );
}