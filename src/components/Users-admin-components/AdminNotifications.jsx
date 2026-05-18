import { useState } from "react";
import {
  MdTune,
  MdCircle,
  MdInfo,
  MdCalendarToday,
  MdPayments,
  MdReportProblem,
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
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500">
          Stay updated with platform alerts, booking changes, and payment status.
        </p>
      </div>

      {/* TOP BAR (FULL WIDTH) */}
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTab === tab.toLowerCase()
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-blue-600 font-semibold">
            ✓ Mark all as read
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-50">
            <MdTune className="text-gray-500 text-lg" />
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MdInfo className="text-blue-600" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-blue-600">
                  SYSTEM ALERT <span className="text-red-500">•</span>
                </p>
                <span className="text-xs text-gray-400">12m ago</span>
              </div>

              <p className="text-sm font-semibold mt-1">
                Server Maintenance scheduled for Oct 30, 2:00 AM UTC.
              </p>

              <div className="mt-2 flex gap-4 text-xs">
                <button className="text-blue-600 font-medium">Mark as Read</button>
                <button className="text-gray-400">Dismiss</button>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <MdCalendarToday className="text-purple-600" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-purple-600">BOOKING UPDATE</p>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>

              <p className="text-sm font-semibold mt-1">
                New booking request from Julian Marc for Full Engine Service.
              </p>

              <div className="mt-3 flex gap-3 text-xs">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                  View Details
                </button>
                <button className="text-gray-400">Quick Approve</button>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <MdPayments className="text-green-600" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-green-600">PAYMENT ALERT</p>
                <span className="text-xs text-gray-400">4h ago</span>
              </div>

              <p className="text-sm font-semibold mt-1">
                Payout of $1,240.50 successfully processed for Mechanic: Marco Silva.
              </p>

              <div className="mt-2 flex gap-4 text-xs">
                <button className="text-blue-600">Download Invoice</button>
                <button className="text-gray-400">Audit Log</button>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <MdReportProblem className="text-red-600" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-red-600">DISPUTE ALERT</p>
                <span className="text-xs text-gray-400">Yesterday</span>
              </div>

              <p className="text-sm font-semibold mt-1">
                New dispute opened by Elena Rodriguez regarding Service #MK-7281.
              </p>

              <div className="mt-3 flex gap-3 text-xs">
                <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                  Resolve Now
                </button>
                <button className="text-gray-400">View Evidence</button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* Activity */}
          <div className="bg-blue-900 text-white p-6 rounded-2xl">
            <p className="text-sm">Activity Snapshot</p>

            <div className="flex items-center justify-between mt-2">
              <h2 className="text-3xl font-bold">24</h2>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                +12% vs last week
              </span>
            </div>

            <p className="text-xs text-blue-200 mb-4">Unread alerts</p>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-blue-200">Avg response time</p>
                <p className="font-bold">1.4h</p>
              </div>

              <div>
                <p className="text-blue-200">Resolution rate</p>
                <p className="font-bold">98.2%</p>
              </div>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="bg-blue-50 p-5 rounded-2xl border space-y-4">
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

            <div className="bg-white p-3 rounded-lg border text-xs">
              <p className="font-semibold mb-1">Need help with disputes?</p>
              <p className="text-gray-500 mb-2">
                View the specialized admin guide for handling customer service issues.
              </p>
              <button className="text-blue-600 font-semibold">
                GO TO GUIDE →
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="bg-gray-100 p-3 rounded-xl text-xs flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            ALL SYSTEMS OPERATIONAL
          </div>

        </div>
      </div>
    </div>
  );
}