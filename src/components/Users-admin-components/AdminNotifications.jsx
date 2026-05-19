import { useState } from "react";
import {
  MdTune,
  MdInfo,
  MdCalendarToday,
  MdPayments,
  MdReportProblem,
  MdCheck,
  MdOutlineDoneAll,
} from "react-icons/md";

// Smooth, interactive Custom Toggle Component
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 ${
      enabled ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// Expanded mock dataset for realistic population
const initialNotifications = [
  {
    id: 1,
    category: "system",
    label: "SYSTEM ALERT",
    icon: MdInfo,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    time: "12m ago",
    message: "Server Maintenance scheduled for Oct 30, 2:00 AM UTC.",
    unread: true,
  },
  {
    id: 2,
    category: "bookings",
    label: "BOOKING UPDATE",
    icon: MdCalendarToday,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    time: "2h ago",
    message: "New booking request from Julian Marc for Full Engine Service.",
    unread: true,
    hasActions: true,
  },
  {
    id: 3,
    category: "payments",
    label: "PAYMENT ALERT",
    icon: MdPayments,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    time: "4h ago",
    message: "Payout of $1,240.50 successfully processed for Mechanic: Marco Silva.",
    unread: false,
    hasInvoice: true,
  },
  {
    id: 4,
    category: "payments",
    label: "DISPUTE ALERT",
    icon: MdReportProblem,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    time: "Yesterday",
    message: "New dispute opened by Elena Rodriguez regarding Service #MK-7281.",
    unread: true,
    isDispute: true,
  },
  {
    id: 5,
    category: "system",
    label: "SYSTEM ALERT",
    icon: MdInfo,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    time: "2 days ago",
    message: "API Gateway rate-limiting thresholds optimized globally.",
    unread: false,
  },
  {
    id: 6,
    category: "bookings",
    label: "BOOKING UPDATE",
    icon: MdCalendarToday,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    time: "3 days ago",
    message: "Customer Tyson K. cancelled booking for Brake Pad Replacement.",
    unread: false,
  },
];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  // Quick Settings States
  const [emailDigest, setEmailDigest] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState(false);

  const tabs = ["All", "System", "Bookings", "Payments"];

  // --- Core Functional Logic ---
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // --- Dynamic Dashboard Metrics ---
  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.category === activeTab
  );

  const unreadCount = notifications.filter((n) => n.unread).length;
  
  // Calculate a mock dynamic resolution rate based on dismissed or read items
  const totalItems = notifications.length;
  const resolutionRate = totalItems > 0 
    ? ((notifications.filter(n => !n.unread).length / totalItems) * 100).toFixed(1) 
    : "100";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Stay updated with platform alerts, booking changes, and payment status.
        </p>
      </div>

      {/* TOP CONTROL BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Tabs Grid/Row */}
        <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner overflow-x-auto max-w-max scrollbar-none">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-200 transform active:scale-95 ${
                  isSelected
                    ? "bg-white text-blue-600 shadow-sm font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Global Action Actions */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transform"
          >
            <MdOutlineDoneAll className="text-base" />
            Mark all as read
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-xl border bg-white hover:bg-gray-50 shadow-sm transition-all duration-200 active:scale-95 transform hover:border-gray-300">
            <MdTune className="text-gray-500 text-lg" />
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* NOTIFICATION FEED LEFT PANEL */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-3">
                <MdCheck className="text-2xl" />
              </div>
              <p className="text-sm font-semibold text-gray-700">All caught up!</p>
              <p className="text-xs text-gray-400 mt-0.5">No notifications found in this segment.</p>
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const IconComponent = n.icon;
              return (
                <div
                  key={n.id}
                  className={`bg-white border rounded-xl p-4 flex gap-4 items-start transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md ${
                    n.unread ? "border-l-4 border-l-blue-600 border-gray-200" : "border-gray-200 opacity-85"
                  }`}
                >
                  {/* Category Rounded Icon */}
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${n.iconBg}`}>
                    <IconComponent className={`${n.iconColor} text-lg`} />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <p className={`text-xs font-bold tracking-wider ${n.iconColor}`}>
                        {n.label} {n.unread && <span className="text-red-500 ml-1 inline-block animate-pulse">●</span>}
                      </p>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
                    </div>

                    <p className={`text-sm mt-1 leading-relaxed ${n.unread ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                      {n.message}
                    </p>

                    {/* Contextual Action Rows */}
                    <div className="mt-3 flex flex-wrap gap-3 text-xs items-center">
                      {n.unread && (
                        <button
                          onClick={() => handleMarkAsRead(n.id)}
                          className="text-blue-600 font-bold hover:underline transition transform active:scale-95"
                        >
                          Mark as Read
                        </button>
                      )}
                      
                      {n.hasActions && (
                        <>
                          <button className="bg-blue-600 text-white font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-700 transition transform active:scale-95">
                            View Details
                          </button>
                          <button 
                            onClick={() => handleMarkAsRead(n.id)} 
                            className="text-gray-600 font-medium bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition transform active:scale-95"
                          >
                            Quick Approve
                          </button>
                        </>
                      )}

                      {n.hasInvoice && (
                        <>
                          <button className="text-blue-600 font-semibold hover:underline transition">
                            Download Invoice
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-gray-500 hover:text-gray-700 transition">
                            Audit Log
                          </button>
                        </>
                      )}

                      {n.isDispute && (
                        <>
                          <button className="bg-red-500 text-white font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-600 transition transform active:scale-95">
                            Resolve Now
                          </button>
                          <button className="text-gray-500 font-medium hover:text-gray-700 transition">
                            View Evidence
                          </button>
                        </>
                      )}

                      {!n.hasActions && !n.isDispute && (
                        <button
                          onClick={() => handleDismiss(n.id)}
                          className="text-gray-400 hover:text-gray-600 transition"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* SIDEBAR RIGHT PANEL */}
        <div className="space-y-4">

          {/* DYNAMIC METRIC SNAPSHOT */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none transform group-hover:scale-150 transition-transform duration-500" />
            <p className="text-xs uppercase font-semibold text-blue-200 tracking-wider">Activity Snapshot</p>

            <div className="flex items-baseline justify-between mt-3">
              <h2 className="text-4xl font-extrabold tracking-tight transition-all duration-300">
                {unreadCount}
              </h2>
              <span className="text-[11px] font-bold bg-white/15 backdrop-blur-md px-2 py-1 rounded-md text-blue-100">
                +12% vs last week
              </span>
            </div>

            <p className="text-xs text-blue-200/80 mt-1 mb-5">Unread notifications needing attention</p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
              <div>
                <p className="text-blue-200/70">Avg response</p>
                <p className="font-bold text-sm mt-0.5">1.4h</p>
              </div>

              <div>
                <p className="text-blue-200/70">Read/Resolve Rate</p>
                <p className="font-bold text-sm mt-0.5">{resolutionRate}%</p>
              </div>
            </div>
          </div>

          {/* SYSTEM QUICK CONFIGURATION */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <p className="text-xs font-bold text-gray-400 tracking-wider">QUICK SETTINGS</p>

            <div className="flex justify-between items-center transition hover:bg-gray-50/50 p-1 rounded-lg">
              <div className="pr-2">
                <p className="text-sm font-medium text-gray-700">Email Digests</p>
                <p className="text-[11px] text-gray-400">Daily structural summary</p>
              </div>
              <Toggle enabled={emailDigest} onChange={setEmailDigest} />
            </div>

            <div className="flex justify-between items-center transition hover:bg-gray-50/50 p-1 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                <p className="text-[11px] text-gray-400">Instant device delivery</p>
              </div>
              <Toggle enabled={pushNotif} onChange={setPushNotif} />
            </div>

            <div className="flex justify-between items-center transition hover:bg-gray-50/50 p-1 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Slack Webhooks</p>
                <p className="text-[11px] text-gray-400">Forward alerts to dev channels</p>
              </div>
              <Toggle enabled={slackWebhook} onChange={setSlackWebhook} />
            </div>

            {/* NESTED CTAS */}
            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100/70 text-xs">
              <p className="font-bold text-blue-900 mb-1">Need help with disputes?</p>
              <p className="text-gray-500 leading-relaxed mb-3.5">
                View the specialized admin guide for handling customer service issues.
              </p>
              <button className="text-blue-600 font-bold tracking-wider hover:text-blue-700 block transition transform active:translate-x-0.5">
                GO TO GUIDE →
              </button>
            </div>
          </div>

          {/* TELEMETRY SYSTEM PULSE STATE */}
          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-[11px] font-bold flex items-center gap-2.5 text-emerald-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ALL SYSTEMS OPERATIONAL
          </div>

        </div>
      </div>
    </div>
  );
}