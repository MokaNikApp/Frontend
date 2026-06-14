import { useState, useMemo, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500",
  "bg-cyan-500", "bg-orange-500", "bg-lime-600", "bg-pink-500",
  "bg-violet-500", "bg-sky-500", "bg-teal-500", "bg-fuchsia-500",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const getColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatJoined = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ------------------------------------------------------------------ */
/*  STATUS CONFIG                                                      */
/* ------------------------------------------------------------------ */

const statusConfig = {
  completed: {
    label: "COMPLETED",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  in_progress: {
    label: "IN PROGRESS",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  pending: {
    label: "PENDING",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  in_review: {
    label: "IN REVIEW",
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-400",
  },
};

const getStatus = (raw = "") => {
  const key = raw.toLowerCase().replace(/\s+/g, "_");
  return (
    statusConfig[key] ?? {
      label: raw.toUpperCase(),
      bg: "bg-gray-100",
      text: "text-gray-600",
      dot: "bg-gray-400",
    }
  );
};

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-3 text-sm text-white bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
        <p className="mb-1 font-semibold text-gray-200">{label}</p>
        <p className="font-bold text-blue-300">
          Bookings:{" "}
          <span className="text-white">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Modal = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-white border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-5">
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{label}</p>
      <p className="mt-0.5 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const SkeletonRow = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 animate-pulse">
    <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  MAIN DASHBOARD                                                     */
/* ------------------------------------------------------------------ */

export default function MokanicDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("All");
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [mechanicsModalOpen, setMechanicsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/admin/dashboard/overview");
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message ?? "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  /* Map platformActivity to chart format */
  const fullChartData = useMemo(() => {
    if (!data?.platformActivity) return [];
    return data.platformActivity.map((item) => ({
      date: formatDate(item.date),
      bookings: item.totalBookings,
    }));
  }, [data]);

  /* Filter chart data based on period */
  const chartData = useMemo(() => {
    if (period === "Last 7 Days") return fullChartData.slice(-7);
    if (period === "Last 30 Days") return fullChartData.slice(-30);
    return fullChartData;
  }, [period, fullChartData]);

  /* Enrich bookings with display fields */
  const enrichedBookings = useMemo(() => {
    if (!data?.recentBookings) return [];
    return data.recentBookings.map((b, i) => ({
      ...b,
      initials: getInitials(b.customerName),
      color: getColor(i),
      displayDate: formatDate(b.createdAt),
    }));
  }, [data]);

  /* Enrich mechanics with display fields */
  const enrichedMechanics = useMemo(() => {
    if (!data?.newMechanics) return [];
    return data.newMechanics.map((m, i) => ({
      ...m,
      initials: getInitials(m.name),
      color: getColor(i + 4),
      joinedFormatted: formatJoined(m.joinedAt),
    }));
  }, [data]);

  const previewBookings = enrichedBookings.slice(0, 4);
  const previewMechanics = enrichedMechanics.slice(0, 4);

  /* ---------------------------------------------------------------- */
  /*  ERROR STATE                                                      */
  /* ---------------------------------------------------------------- */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 font-semibold hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  RENDER                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div
      className="min-h-screen font-sans bg-gray-50"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ---------- Metric Cards ---------- */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
        <MetricCard
          label="Total Bookings"
          value={loading ? "—" : (data?.metrics?.totalBookings ?? 0)}
          color="bg-blue-50"
          icon={
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <MetricCard
          label="Active Services"
          value={loading ? "—" : (data?.metrics?.activeServices ?? 0)}
          color="bg-emerald-50"
          icon={
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <MetricCard
          label="Total Revenue"
          value={
            loading
              ? "—"
              : `$${(data?.metrics?.totalRevenue ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
          color="bg-amber-50"
          icon={
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* ---------- Chart Section ---------- */}
      <div className="p-4 bg-white border-b border-gray-100 shadow-sm sm:p-6 lg:p-8 rounded-2xl">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Platform Activity
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Booking trends over the selected period
            </p>
          </div>
          <div className="relative shrink-0">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-auto"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All</option>
            </select>
            <svg
              className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="h-56 sm:h-64 lg:h-72">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No activity data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                  minTickGap={30}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  width={40}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#bookingsGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ---------- Bottom Tables ---------- */}
      <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2 sm:gap-6">
        {/* Recent Bookings */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-50 sm:p-6">
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">Recent Bookings</h3>
            <button
              onClick={() => setBookingsModalOpen(true)}
              className="text-sm font-semibold text-blue-500 transition-colors hover:text-blue-700"
            >
              View All
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="hidden grid-cols-3 gap-4 px-2 mb-3 sm:grid">
              {["CUSTOMER", "DATE", "STATUS"].map((h) => (
                <span key={h} className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {h}
                </span>
              ))}
            </div>

            <div className="space-y-2 sm:space-y-1">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                : previewBookings.length === 0
                ? (
                  <p className="py-6 text-sm text-center text-gray-400">No recent bookings.</p>
                )
                : previewBookings.map((b, i) => {
                    const st = getStatus(b.status);
                    return (
                      <div
                        key={b.id ?? i}
                        className="flex flex-col gap-2 p-3 transition-colors bg-gray-50 rounded-xl sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:bg-transparent sm:px-2 sm:py-3 sm:hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {b.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{b.customerName}</p>
                            <p className="text-xs text-gray-400 sm:hidden">{b.email}</p>
                          </div>
                        </div>
                        <span className="hidden text-sm text-gray-500 truncate sm:block">{b.displayDate}</span>
                        <div className="flex items-center justify-between sm:justify-start">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${st.bg} ${st.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>

        {/* New Mechanic Onboarding */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-50 sm:p-6">
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">New Mechanic Onboarding</h3>
            <button
              onClick={() => setMechanicsModalOpen(true)}
              className="text-sm font-semibold text-blue-500 transition-colors hover:text-blue-700"
            >
              View All
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="hidden grid-cols-3 gap-4 px-2 mb-3 sm:grid">
              {["MECHANIC", "SPECIALTY", "JOINED"].map((h) => (
                <span key={h} className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {h}
                </span>
              ))}
            </div>

            <div className="space-y-2 sm:space-y-1">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                : previewMechanics.length === 0
                ? (
                  <p className="py-6 text-sm text-center text-gray-400">No new mechanics.</p>
                )
                : previewMechanics.map((m, i) => (
                  <div
                    key={m.id ?? i}
                    className="flex flex-col gap-1 p-3 transition-colors bg-gray-50 rounded-xl sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:bg-transparent sm:px-2 sm:py-3 sm:hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {m.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-800 truncate">{m.name}</span>
                    </div>
                    <span className="pl-12 text-sm text-gray-500 sm:pl-0">
                      {m.specialty ?? <span className="text-gray-300 italic">—</span>}
                    </span>
                    <span className="pl-12 text-sm text-gray-500 sm:pl-0">{m.joinedFormatted}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Modals ---------- */}
      <Modal open={bookingsModalOpen} onClose={() => setBookingsModalOpen(false)} title="All Bookings">
        <div className="space-y-2">
          {enrichedBookings.map((b, i) => {
            const st = getStatus(b.status);
            return (
              <div key={b.id ?? i} className="grid items-center grid-cols-1 gap-3 p-3 border border-gray-100 rounded-xl sm:grid-cols-3 sm:gap-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {b.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{b.customerName}</p>
                    <p className="text-xs text-gray-400 truncate">{b.email}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{b.displayDate}</span>
                <span className={`inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold w-fit ${st.bg} ${st.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </Modal>

      <Modal open={mechanicsModalOpen} onClose={() => setMechanicsModalOpen(false)} title="All Mechanics">
        <div className="space-y-2">
          {enrichedMechanics.map((m, i) => {
            const st = getStatus(m.verificationStatus);
            return (
              <div key={m.id ?? i} className="grid items-center grid-cols-1 gap-3 p-3 border border-gray-100 rounded-xl sm:grid-cols-4 sm:gap-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {m.initials}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{m.name}</span>
                </div>
                <span className="text-sm text-gray-500">{m.specialty ?? "—"}</span>
                <span className="text-sm text-gray-500">{m.joinedFormatted}</span>
                <span className={`inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold w-fit ${st.bg} ${st.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}