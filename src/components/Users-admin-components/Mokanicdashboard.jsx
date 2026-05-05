
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

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

// Generate ~90 days of data (every 2 days) so the filters actually do something
const generateRevenueData = () => {
  const data = [];
  const start = new Date("2023-08-01");
  for (let i = 0; i < 46; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i * 2);
    const revenue = Math.floor(6000 + Math.random() * 10000);
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue,
    });
  }
  return data;
};
const fullRevenueData = generateRevenueData();

const allBookings = [
  {
    initials: "JD",
    name: "Jane Doe",
    service: "Full Engine Tune-up",
    status: "COMPLETED",
    color: "bg-indigo-500",
  },
  {
    initials: "MS",
    name: "Mark Smith",
    service: "Brake Pad Replacement",
    status: "IN PROGRESS",
    color: "bg-emerald-500",
  },
  {
    initials: "AL",
    name: "Alice Lawson",
    service: "Oil Change & Filter",
    status: "PENDING",
    color: "bg-amber-500",
  },
  {
    initials: "RT",
    name: "Robert Torres",
    service: "Diagnostics",
    status: "IN PROGRESS",
    color: "bg-rose-500",
  },
  {
    initials: "KC",
    name: "Karen Chen",
    service: "Transmission Flush",
    status: "COMPLETED",
    color: "bg-cyan-500",
  },
  {
    initials: "DW",
    name: "David Wright",
    service: "Tire Rotation",
    status: "PENDING",
    color: "bg-orange-500",
  },
  {
    initials: "SL",
    name: "Steve Lopez",
    service: "AC Recharge",
    status: "COMPLETED",
    color: "bg-lime-600",
  },
  {
    initials: "NB",
    name: "Nina Brown",
    service: "Wheel Alignment",
    status: "IN PROGRESS",
    color: "bg-pink-500",
  },
];

const allMechanics = [
  {
    name: "Carlos Mendoza",
    specialty: "Hybrid/Electric",
    joined: "Oct 24, 2023",
    initials: "CM",
    color: "bg-violet-500",
  },
  {
    name: "Sarah Jenkins",
    specialty: "Diesel Engines",
    joined: "Oct 23, 2023",
    initials: "SJ",
    color: "bg-sky-500",
  },
  {
    name: "Mike Peterson",
    specialty: "Suspension & Steering",
    joined: "Oct 21, 2023",
    initials: "MP",
    color: "bg-teal-500",
  },
  {
    name: "Elena Vasquez",
    specialty: "Transmission",
    joined: "Oct 19, 2023",
    initials: "EV",
    color: "bg-fuchsia-500",
  },
  {
    name: "James O'Connor",
    specialty: "Body Work",
    joined: "Oct 15, 2023",
    initials: "JO",
    color: "bg-rose-500",
  },
  {
    name: "Priya Patel",
    specialty: "Electrical",
    joined: "Oct 12, 2023",
    initials: "PP",
    color: "bg-amber-500",
  },
];

const statusConfig = {
  COMPLETED: {
    label: "COMPLETED",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  "IN PROGRESS": {
    label: "IN PROGRESS",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  PENDING: {
    label: "PENDING",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
};

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-3 text-sm text-white bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
        <p className="mb-1 font-semibold text-gray-200">{label}, 2023</p>
        <p className="font-bold text-blue-300">
          Revenue:{" "}
          <span className="text-white">
            $
            {payload[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 bg-black/50 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200"
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

/* ------------------------------------------------------------------ */
/*  MAIN DASHBOARD                                                     */
/* ------------------------------------------------------------------ */

export default function MokanicDashboard() {
  const [period, setPeriod] = useState("Last 30 Days");
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [mechanicsModalOpen, setMechanicsModalOpen] = useState(false);

  /* Filter chart data based on period */
  const chartData = useMemo(() => {
    if (period === "Last 7 Days") return fullRevenueData.slice(-4);
    if (period === "Last 30 Days") return fullRevenueData.slice(-16);
    return fullRevenueData; // 90 Days
  }, [period]);

  /* Show first 4 in preview tables */
  const previewBookings = allBookings.slice(0, 4);
  const previewMechanics = allMechanics.slice(0, 4);

  return (
    <div
      className="min-h-screen font-sans bg-gray-50"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ---------- Chart Section ---------- */}
      <div className="p-4 bg-white border-b border-gray-100 shadow-sm sm:p-6 lg:p-8 rounded-2xl">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Platform Activity
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Revenue and booking trends over the selected period
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
              <option>Last 90 Days</option>
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

        {/* Chart */}
        <div className="h-56 sm:h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
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
            {/* Header */}
            <div className="hidden grid-cols-3 gap-4 px-2 mb-3 sm:grid">
              {["CUSTOMER", "SERVICE", "STATUS"].map((h) => (
                <span key={h} className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="space-y-2 sm:space-y-1">
              {previewBookings.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-3 transition-colors bg-gray-50 rounded-xl sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:bg-transparent sm:px-2 sm:py-3 sm:hover:bg-gray-50"
                >
                  {/* Customer */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {b.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{b.name}</p>
                      <p className="text-xs text-gray-400 sm:hidden">{b.service}</p>
                    </div>
                  </div>

                  {/* Service */}
                  <span className="hidden text-sm text-gray-500 truncate sm:block">{b.service}</span>

                  {/* Status */}
                  <div className="flex items-center justify-between sm:justify-start">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig[b.status].bg} ${statusConfig[b.status].text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[b.status].dot}`} />
                      <span className="hidden sm:inline">{statusConfig[b.status].label}</span>
                      <span className="sm:hidden">{b.status === "IN PROGRESS" ? "IN PROG" : statusConfig[b.status].label}</span>
                    </span>
                  </div>
                </div>
              ))}
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
            {/* Header */}
            <div className="hidden grid-cols-3 gap-4 px-2 mb-3 sm:grid">
              {["MECHANIC", "SPECIALTY", "JOINED"].map((h) => (
                <span key={h} className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="space-y-2 sm:space-y-1">
              {previewMechanics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-3 transition-colors bg-gray-50 rounded-xl sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:bg-transparent sm:px-2 sm:py-3 sm:hover:bg-gray-50"
                >
                  {/* Mechanic */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {m.initials}
                    </div>
                    <span className="text-sm font-medium text-gray-800 truncate">{m.name}</span>
                  </div>

                  {/* Specialty */}
                  <span className="pl-12 text-sm text-gray-500 sm:pl-0">{m.specialty}</span>

                  {/* Joined */}
                  <span className="pl-12 text-sm text-gray-500 sm:pl-0">{m.joined}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Modals ---------- */}
      <Modal open={bookingsModalOpen} onClose={() => setBookingsModalOpen(false)} title="All Bookings">
        <div className="space-y-2">
          {allBookings.map((b, i) => (
            <div
              key={i}
              className="grid items-center grid-cols-1 gap-3 p-3 border border-gray-100 rounded-xl sm:grid-cols-3 sm:gap-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {b.initials}
                </div>
                <span className="text-sm font-medium text-gray-800">{b.name}</span>
              </div>
              <span className="text-sm text-gray-500">{b.service}</span>
              <span
                className={`inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold w-fit ${statusConfig[b.status].bg} ${statusConfig[b.status].text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[b.status].dot}`} />
                {statusConfig[b.status].label}
              </span>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={mechanicsModalOpen} onClose={() => setMechanicsModalOpen(false)} title="All Mechanics">
        <div className="space-y-2">
          {allMechanics.map((m, i) => (
            <div
              key={i}
              className="grid items-center grid-cols-1 gap-3 p-3 border border-gray-100 rounded-xl sm:grid-cols-3 sm:gap-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {m.initials}
                </div>
                <span className="text-sm font-medium text-gray-800">{m.name}</span>
              </div>
              <span className="text-sm text-gray-500">{m.specialty}</span>
              <span className="text-sm text-gray-500">{m.joined}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}