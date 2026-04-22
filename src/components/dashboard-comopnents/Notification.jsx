




import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ─── ICONS ─────────────────────────────────────────────────────────────────
const Icons = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  ),
  reply: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

// ─── TYPES CONFIG ──────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  completed: {
    icon: Icons.check,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Completed",
    dot: "bg-emerald-400",
  },
  mechanic: {
    icon: Icons.user,
    color: "text-blue-500",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    badge: "bg-blue-100 text-blue-700",
    label: "Assigned",
    dot: "bg-blue-400",
  },
  update: {
    icon: Icons.wrench,
    color: "text-amber-500",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    badge: "bg-amber-100 text-amber-700",
    label: "Update",
    dot: "bg-amber-400",
  },
  booking: {
    icon: Icons.car,
    color: "text-violet-500",
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    badge: "bg-violet-100 text-violet-700",
    label: "Booking",
    dot: "bg-violet-400",
  },
};

// ─── INITIAL DATA ──────────────────────────────────────────────────────────
const INITIAL_DATA = [
  {
    id: 1, group: "Today",
    title: "BMW X5 Diagnostic Complete",
    message: "The diagnostic for the BMW X5 is complete. We need to order a new transmission sensor before proceeding with the repair.",
    time: "2 mins ago", timestamp: Date.now() - 2 * 60 * 1000,
    type: "update", unread: true,
    meta: { vehicle: "BMW X5", booking: "BK-4401", mechanic: "James O.", priority: "High" },
  },
  {
    id: 2, group: "Today",
    title: "Service Completed #BK-4402",
    message: "Toyota Corolla full service is finished. Vehicle has been washed and is ready for customer pickup at Bay 3.",
    time: "1 hour ago", timestamp: Date.now() - 60 * 60 * 1000,
    type: "completed", unread: false,
    meta: { vehicle: "Toyota Corolla", booking: "BK-4402", mechanic: "Sarah J.", priority: "Normal" },
  },
  {
    id: 3, group: "Today",
    title: "New Booking Confirmed",
    message: "Honda Civic brake inspection scheduled. Assigned to Mechanic: Sarah J. Expected duration: 2 hours.",
    time: "3 hours ago", timestamp: Date.now() - 3 * 60 * 60 * 1000,
    type: "mechanic", unread: true,
    meta: { vehicle: "Honda Civic", booking: "BK-4403", mechanic: "Sarah J.", priority: "Normal" },
  },
  {
    id: 4, group: "Today",
    title: "New Booking: Mercedes C300",
    message: "Customer booked full service + AC recharge. Drop-off confirmed for 2:00 PM today.",
    time: "5 hours ago", timestamp: Date.now() - 5 * 60 * 60 * 1000,
    type: "booking", unread: true,
    meta: { vehicle: "Mercedes C300", booking: "BK-4404", mechanic: "Pending", priority: "Normal" },
  },
  {
    id: 5, group: "Yesterday",
    title: "BMW X5 Parts Ordered",
    message: "Transmission sensor and filter kit ordered from supplier. Estimated arrival: 2 business days.",
    time: "Yesterday, 4:30 PM", timestamp: Date.now() - 24 * 60 * 60 * 1000,
    type: "update", unread: false,
    meta: { vehicle: "BMW X5", booking: "BK-4401", mechanic: "James O.", priority: "High" },
  },
  {
    id: 6, group: "Yesterday",
    title: "Service Completed #BK-4399",
    message: "Ford Ranger oil change and tyre rotation completed. Customer notified via SMS.",
    time: "Yesterday, 11:00 AM", timestamp: Date.now() - 27 * 60 * 60 * 1000,
    type: "completed", unread: true,
    meta: { vehicle: "Ford Ranger", booking: "BK-4399", mechanic: "Mike A.", priority: "Normal" },
  },
  {
    id: 7, group: "Earlier",
    title: "New Mechanic Assignment",
    message: "Mike A. has been reassigned to Bay 2 for the Audi A4 suspension overhaul starting Monday.",
    time: "2 days ago", timestamp: Date.now() - 48 * 60 * 60 * 1000,
    type: "mechanic", unread: false,
    meta: { vehicle: "Audi A4", booking: "BK-4395", mechanic: "Mike A.", priority: "Low" },
  },
];

// ─── SWIPEABLE CARD ────────────────────────────────────────────────────────
const SwipeCard = ({ note, onDelete, onMarkRead, onSelect }) => {
  const x = useMotionValue(0);
  const bg = useTransform(x, [-80, 0, 80], ["#fef2f2", "#ffffff", "#f0fdf4"]);
  const opacity = useTransform(x, [-120, -80, 0, 80, 120], [0, 1, 1, 1, 0]);
  const cfg = TYPE_CONFIG[note.type] || TYPE_CONFIG.update;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative"
    >
      {/* Swipe hints */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <span className="text-red-400 opacity-0 group-hover:opacity-100">{Icons.trash}</span>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.1}
        style={{ x, backgroundColor: bg, opacity }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) onDelete(note.id);
          else if (info.offset.x > 80) onMarkRead(note.id);
        }}
        onClick={() => { onSelect(note); onMarkRead(note.id); }}
        className="relative cursor-pointer select-none"
      >
        <div
          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200
            ${note.unread
              ? "border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              : "border-gray-100 bg-gray-50/60"
            } hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] hover:border-gray-200`}
        >
          {/* Icon */}
          <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ring-1 ${cfg.bg} ${cfg.ring} ${cfg.color}`}>
            {cfg.icon}
            {note.unread && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-1 -right-1 w-3 h-3 ${cfg.dot} rounded-full ring-2 ring-white`}
              />
            )}
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`text-sm font-semibold leading-snug truncate ${note.unread ? "text-gray-900" : "text-gray-600"}`}>
                {note.title}
              </h3>
              <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium mt-0.5">{note.time}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{note.message}</p>
            <div className="flex items-center gap-2 mt-2.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.badge}`}>
                {cfg.icon}
                {cfg.label}
              </span>
              {note.meta?.vehicle && (
                <span className="text-[10px] text-gray-400 font-medium">{note.meta.vehicle}</span>
              )}
              {note.meta?.priority === "High" && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">● High</span>
              )}
            </div>
          </div>

          {/* Chevron */}
          <div className="flex-shrink-0 text-gray-300 mt-1">
            {Icons.chevronRight}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── DETAIL MODAL ──────────────────────────────────────────────────────────
const DetailModal = ({ note, onClose, onDelete }) => {
  const [replyText, setReplyText] = useState("");
  const [sent, setSent] = useState(false);
  const cfg = TYPE_CONFIG[note.type] || TYPE_CONFIG.update;

  const handleSend = () => {
    if (!replyText.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setReplyText(""); }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header strip */}
        <div className={`h-1.5 w-full ${cfg.dot}`} />

        <div className="p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ring-2 ${cfg.bg} ${cfg.ring} ${cfg.color}`}>
              {cfg.icon}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { onDelete(note.id); onClose(); }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                {Icons.trash}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              >
                {Icons.x}
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 leading-snug mb-1">{note.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.badge}`}>{cfg.label}</span>
            <span className="text-xs text-gray-400">{note.time}</span>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-2xl p-4 mb-5">
            {note.message}
          </p>

          {/* Meta grid */}
          {note.meta && (
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { label: "Vehicle", value: note.meta.vehicle },
                { label: "Booking ID", value: note.meta.booking },
                { label: "Mechanic", value: note.meta.mechanic },
                { label: "Priority", value: note.meta.priority },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-xs font-semibold text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Reply box */}
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-300 transition-all">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply or note…"
                rows={2}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none outline-none"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                sent
                  ? "bg-emerald-500 text-white"
                  : replyText.trim()
                  ? "bg-[#1C52AF] text-white shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span key="sent" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    {Icons.check}
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    {Icons.send}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── TOAST ──────────────────────────────────────────────────────────────────
const Toast = ({ message, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2"
    >
      <span className="text-emerald-400">{Icons.check}</span>
      {message}
    </motion.div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Notification() {
  const [data, setData] = useState(INITIAL_DATA);
  const [tab, setTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const unreadCount = data.filter((n) => n.unread).length;

  const markRead = (id) => {
    setData((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllRead = () => {
    setData((prev) => prev.map((n) => ({ ...n, unread: false })));
    setToast("All notifications marked as read");
  };

  const deleteNote = (id) => {
    setData((prev) => prev.filter((n) => n.id !== id));
    setToast("Notification removed");
    if (selected?.id === id) setSelected(null);
  };

  const clearAll = () => {
    setData([]);
    setToast("All notifications cleared");
  };

  const filtered = data.filter((n) => {
    if (tab === "unread" && !n.unread) return false;
    if (typeFilter !== "all" && n.type !== typeFilter) return false;
    return true;
  });

  const groups = ["Today", "Yesterday", "Earlier"];
  const groupedFiltered = groups
    .map((g) => ({ group: g, items: filtered.filter((n) => n.group === g) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        .notif-root { font-family: 'DM Sans', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="notif-root min-h-screen bg-[#F4F6FA] p-4 sm:p-6">
        <div className="w-full">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between mb-6"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#1C52AF] text-white text-[11px] font-bold flex items-center justify-center"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-sm text-gray-500">Stay updated with service progress.</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters((v) => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${showFilters ? "bg-[#1C52AF] text-white" : "bg-white text-gray-500 shadow-sm border border-gray-200"}`}
              >
                {Icons.filter}
              </motion.button>
              {data.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className="h-9 px-3 rounded-xl text-xs font-semibold text-gray-500 bg-white shadow-sm border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  Clear all
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* ── TYPE FILTERS ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="flex gap-2 flex-wrap pb-1">
                  {[["all", "All Types"], ["update", "Updates"], ["completed", "Completed"], ["mechanic", "Assigned"], ["booking", "Bookings"]].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setTypeFilter(val)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        typeFilter === val
                          ? "bg-[#1C52AF] text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TABS ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between bg-white rounded-2xl p-1.5 mb-5 shadow-sm border border-gray-100"
          >
            <div className="flex gap-1 flex-1">
              {[["all", "All Updates"], ["unread", `Unread ${unreadCount > 0 ? `(${unreadCount})` : ""}`]].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setTab(val)}
                  className={`relative flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${
                    tab === val ? "text-[#1C52AF]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === val && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-blue-50 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="ml-2 text-xs text-gray-400 hover:text-[#1C52AF] font-medium transition-colors whitespace-nowrap pr-1"
              >
                Mark all read
              </button>
            )}
          </motion.div>

          {/* ── HINT ── */}
          {data.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[11px] text-center text-gray-400 mb-4 font-medium"
            >
              ← Swipe left to dismiss · Swipe right to mark read →
            </motion.p>
          )}

          {/* ── LIST ── */}
          <AnimatePresence>
            {groupedFiltered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">You're all caught up</h3>
                <p className="text-xs text-gray-400">No notifications to show right now.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {groupedFiltered.map(({ group, items }) => (
                  <div key={group}>
                    <motion.h2
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1"
                    >
                      {group}
                    </motion.h2>
                    <div className="space-y-2.5">
                      <AnimatePresence>
                        {items.map((note) => (
                          <SwipeCard
                            key={note.id}
                            note={note}
                            onDelete={deleteNote}
                            onMarkRead={markRead}
                            onSelect={setSelected}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <DetailModal
            note={selected}
            onClose={() => setSelected(null)}
            onDelete={deleteNote}
          />
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && <Toast key={toast} message={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
}