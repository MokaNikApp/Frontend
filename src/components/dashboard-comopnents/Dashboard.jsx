

import React, { useState, useEffect } from "react";
import {
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiTool,
  FiCalendar,
  FiMapPin,
  FiPlus,
  FiChevronRight,
  FiInfo,
  FiCreditCard,
  FiAlertCircle,
  FiBriefcase,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const BLUE = "#1C52AF";
const BLUE_DARK = "#163f87";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const humanize = (str) => {
  if (!str) return "";
  const s = str.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const monthShort = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: "short" }).toUpperCase() : "—";

const dayNum = (iso) => (iso ? new Date(iso).getDate() : "—");

const activityConfig = {
  service_completed: { icon: FiCheckCircle, text: "text-emerald-600", bg: "bg-emerald-50" },
  payment_received: { icon: FiCreditCard, text: "text-[#1C52AF]", bg: "bg-blue-50" },
  invoice_paid: { icon: FiCreditCard, text: "text-[#1C52AF]", bg: "bg-blue-50" },
  appointment_rescheduled: { icon: FiCalendar, text: "text-amber-600", bg: "bg-amber-50" },
  default: { icon: FiInfo, text: "text-gray-500", bg: "bg-gray-100" },
};

const statusPill = {
  EN_ROUTE: "En route",
  IN_PROGRESS: "In progress",
  PENDING: "Pending",
  COMPLETED: "Completed",
};

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const Skel = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-100 rounded-2xl ${className}`} />
);

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5">
    <div className="flex items-center gap-2.5">
      <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${iconBg}`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
    <div className="mt-1.5 text-xs">{children}</div>
  </div>
);

// ─── ACTIVE SERVICE ROW ─────────────────────────────────────────────────────────
const ActiveServiceRow = ({ service, onView }) => {
  const title = service.vehicle && service.vehicle !== "Unknown Vehicle" ? service.vehicle : service.title;
  const subtitle =
    service.vehicle && service.vehicle !== "Unknown Vehicle" ? service.title : "Vehicle not linked";

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-5 first:pt-0 border-b border-gray-100 last:border-none last:pb-0">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-28 h-28 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
        <FiTool className="w-9 h-9 text-white/25" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[15px] font-bold text-gray-900">{title}</p>
            <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
          </div>
          <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 text-[#1C52AF]">
            {statusPill[service.status] || "Pending"}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-semibold text-gray-700">{service.progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${service.progress}%`, backgroundColor: BLUE }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FiClock className="w-3.5 h-3.5" />
            Estimated completion: {service.estimatedCompletion || "—"}
          </span>
          <button
            onClick={onView}
            className="text-sm font-semibold hover:underline"
            style={{ color: BLUE }}
          >
            View Live Progress
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ACTIVITY ROW ───────────────────────────────────────────────────────────────
const ActivityRow = ({ item, onClick }) => {
  const cfg = activityConfig[item.type] || activityConfig.default;
  const Icon = cfg.icon;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 py-4 border-b border-gray-100 last:border-none text-left hover:bg-gray-50/60 -mx-1 px-1 rounded-lg transition-colors"
    >
      <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
        <p className="mt-0.5 text-sm text-gray-500">{humanize(item.description)}</p>
        <span className="mt-1.5 inline-block text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {item.timeAgo}
        </span>
      </div>
      <FiChevronRight className="flex-shrink-0 w-4 h-4 text-gray-300 mt-2" />
    </button>
  );
};

// ─── UPCOMING ITEM ──────────────────────────────────────────────────────────────
const UpcomingItem = ({ item, onAction, actionLabel = "Details" }) => (
  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3.5">
    <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm">
      <span className="text-[9px] font-semibold uppercase text-gray-400">{monthShort(item.scheduledDate)}</span>
      <span className="text-lg font-bold leading-none" style={{ color: BLUE }}>
        {dayNum(item.scheduledDate)}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
      <p className="mt-0.5 text-xs text-gray-500 truncate">
        {item.vehicle && item.vehicle !== "Unknown Vehicle" ? item.vehicle : "Vehicle not linked"}
        {item.estimatedCompletion ? ` • ${item.estimatedCompletion}` : ""}
      </p>
      <button
        onClick={onAction}
        className="mt-2 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-2.5 py-1 hover:bg-gray-100 transition-colors"
      >
        {actionLabel}
      </button>
    </div>
  </div>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllActivity, setShowAllActivity] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: res } = await api.get("/customer/dashboard");
        setData(res);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("We couldn't load your dashboard. Try again in a moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 min-h-full">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-3">
          <FiAlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
          style={{ backgroundColor: BLUE }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <Skel className="h-16 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skel key={i} className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Skel className="h-96 lg:col-span-2" />
          <Skel className="h-96" />
        </div>
      </div>
    );
  }

  const { user, stats, activeServices = [], upcomingServices = [], recentActivity = [], maintenanceTips = [] } = data;

  const monthlyChangeNum = Number(stats?.monthlyChange);
  const isPositiveChange = !Number.isNaN(monthlyChangeNum) && monthlyChangeNum >= 0;

  const primaryTip = maintenanceTips?.[0];
  const otherTips = maintenanceTips?.slice(1) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.firstName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your {stats?.vehiclesCount ?? 0} vehicle
            {stats?.vehiclesCount === 1 ? "" : "s"} today.
          </p>
        </div>
        <button
          onClick={() => navigate("/book-service")}
          className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl shadow-sm transition-colors flex-shrink-0"
          style={{ backgroundColor: BLUE }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BLUE_DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
        >
          <FiPlus className="w-4 h-4" />
          Book a Service
        </button>
      </div>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={FiTruck}
          label="Total Services"
          value={stats?.totalServices ?? 0}
          iconBg="bg-blue-50"
          iconColor="text-[#1C52AF]"
        >
          {!Number.isNaN(monthlyChangeNum) && (
            <span className={`flex items-center gap-1 font-semibold ${isPositiveChange ? "text-emerald-600" : "text-red-500"}`}>
              {isPositiveChange ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
              {isPositiveChange ? "+" : ""}
              {stats.monthlyChange}% from last month
            </span>
          )}
        </StatCard>

        <StatCard
          icon={FiCheckCircle}
          label="Completed"
          value={stats?.completed ?? 0}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        >
          <span className="text-gray-400">Efficiency rate: {stats?.efficiencyRate ?? 0}%</span>
        </StatCard>

        <StatCard
          icon={FiBriefcase}
          label="Pending"
          value={stats?.pending ?? 0}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        >
          <span className="text-amber-600 font-medium">
            {stats?.pendingCount ?? 0} awaiting scheduling
          </span>
        </StatCard>
      </div>

      {/* ── MAIN GRID ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Service Status */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Active Service Status</h2>
              {activeServices.length > 0 && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 text-[#1C52AF]">
                  {activeServices.length} {activeServices.length === 1 ? "Active" : "Active"}
                </span>
              )}
            </div>

            {activeServices.length > 0 ? (
              <div>
                {activeServices.map((s) => (
                  <ActiveServiceRow key={s.id} service={s} onView={() => navigate("/my-service")} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 text-center">
                <FiTool className="w-6 h-6 text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-600">No active services right now</p>
                <p className="mt-0.5 text-xs text-gray-400">Book a service to track its progress here</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <button
                onClick={() => navigate("/service-history")}
                className="text-sm font-semibold hover:underline"
                style={{ color: BLUE }}
              >
                View All
              </button>
            </div>
            <div>
              {recentActivity.length > 0 ? (
                recentActivity
                .slice(0, showAllActivity ? recentActivity.length : 2)
                  .map((item) => (
                    <ActivityRow key={item.id} item={item} onClick={() => navigate("/service-history")} />
                  ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No activity yet</p>
              )}
            </div>
            {recentActivity.length > 2 && (
              <button
                onClick={() => setShowAllActivity(!showAllActivity)}
                className="mt-3 w-full text-center text-sm font-semibold py-2 rounded-xl transition-colors hover:bg-blue-50"
                style={{ color: BLUE }}
              >
                {showAllActivity ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-bold text-gray-900">Upcoming</h2>
              <button
                onClick={() => navigate("/book-service")}
                className="text-sm font-semibold hover:underline"
                style={{ color: BLUE }}
              >
                View All
              </button>
            </div>

            {upcomingServices.length > 0 ? (
              <div className="space-y-3">
                {upcomingServices.map((item) => (
                  <UpcomingItem
                    key={item.id}
                    item={item}
                    actionLabel="Reschedule"
                    onAction={() => navigate("/book-service")}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm">
                  <FiCalendar className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Nothing scheduled yet.</p>
                  <button
                    onClick={() => navigate("/book-service")}
                    className="mt-2 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-2.5 py-1 hover:bg-gray-100 transition-colors"
                  >
                    Schedule now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Maintenance Tip */}
          {primaryTip && (
            <div className="rounded-2xl p-6 text-white shadow-sm" style={{ backgroundColor: BLUE }}>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
                  <FiInfo className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold">Maintenance Tip</h2>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-blue-50">{primaryTip.description}</p>
              <button className="mt-5 w-full bg-white font-semibold rounded-xl px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors" style={{ color: BLUE }}>
                Learn More
              </button>
            </div>
          )}

          {/* Additional tips, compact */}
          {otherTips.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
              {otherTips.map((tip) => (
                <div key={tip.id} className="flex items-start gap-2.5">
                  <FiInfo className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{tip.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live tracking */}
          {activeServices.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="relative h-36 flex items-center justify-center"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #eef1f5 0px, #eef1f5 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #eef1f5 0px, #eef1f5 1px, transparent 1px, transparent 24px)",
                  backgroundColor: "#f7f8fa",
                }}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full shadow-md ring-4 ring-white" style={{ backgroundColor: BLUE }}>
                  <FiMapPin className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Technician location</span>
                <button
                  onClick={() => navigate("/my-service")}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: BLUE }}
                >
                  Track
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;