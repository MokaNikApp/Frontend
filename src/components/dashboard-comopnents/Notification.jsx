



import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import api from "../../api/axios";
import { useFcmToken } from "../../hooks/useFcmToken";

// ─── ICONS ─────────────────────────────────────────────────────────────────
const Icons = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  doubleCheck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M2 12l5 5L17 7" /><path d="M8 12l5 5L23 7" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
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
  loader: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="w-5 h-5 animate-spin">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  eyeOff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

const Toggle = ({ active }) => (
  <svg viewBox="0 0 44 24" fill="none" className="w-9 h-5">
    <rect x="0" y="0" width="44" height="24" rx="12" fill={active ? "#1C52AF" : "#D1D5DB"} />
    <circle cx={active ? "32" : "12"} cy="12" r="9" fill="white" style={{ transition: "cx 0.2s" }} />
  </svg>
);

// ─── TYPE CONFIG ────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  completed: {
    icon: Icons.check,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Completed",
    dot: "bg-emerald-400",
    dotHex: "#34d399",
  },
  mechanic: {
    icon: Icons.user,
    color: "text-blue-500",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    badge: "bg-blue-100 text-blue-700",
    label: "Assigned",
    dot: "bg-blue-400",
    dotHex: "#60a5fa",
  },
  update: {
    icon: Icons.wrench,
    color: "text-amber-500",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    badge: "bg-amber-100 text-amber-700",
    label: "Update",
    dot: "bg-amber-400",
    dotHex: "#fbbf24",
  },
  booking: {
    icon: Icons.car,
    color: "text-violet-500",
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    badge: "bg-violet-100 text-violet-700",
    label: "Booking",
    dot: "bg-violet-400",
    dotHex: "#a78bfa",
  },
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
function getGroup(dateStr) {
  const diffDays = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Earlier";
}

function relativeTime(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (mins < 1)   return "Just now";
  if (mins < 60)  return `${mins} min${mins > 1 ? "s" : ""} ago`;
  if (hrs < 24)   return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function mapNotification(raw) {
  console.log("mapNotification → raw item:", raw);
  const dateStr = raw.createdAt ?? raw.created_at ?? new Date().toISOString();
  return {
    id:        raw.id,
    group:     getGroup(dateStr),
    title:     raw.title   ?? "Notification",
    message:   raw.message ?? raw.body ?? "",
    time:      relativeTime(dateStr),
    timestamp: new Date(dateStr).getTime(),
    type:      raw.type    ?? "update",
    unread:    raw.isRead === false,
    meta: {
      vehicle:  raw.vehicle   ?? raw.meta?.vehicle  ?? null,
      booking:  raw.bookingId ?? raw.meta?.booking  ?? null,
      mechanic: raw.mechanic  ?? raw.meta?.mechanic ?? null,
      priority: raw.priority  ?? raw.meta?.priority ?? "Normal",
    },
  };
}

// ─── READ BADGE ─────────────────────────────────────────────────────────────
const ReadBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, x: 8 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 28 }}
    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200"
  >
    <span className="text-emerald-500">{Icons.doubleCheck}</span>
    <span className="text-[10px] font-semibold text-emerald-600">Read</span>
  </motion.div>
);

// ─── SKELETON ───────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white animate-pulse">
    <div className="w-10 h-10 rounded-xl bg-gray-200 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 bg-gray-200 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      <div className="h-5 bg-gray-100 rounded-full w-1/3 mt-1" />
    </div>
  </div>
);

// ─── SWIPE CARD ─────────────────────────────────────────────────────────────
const SwipeCard = ({ note, onMarkRead, onSelect }) => {
  const x   = useMotionValue(0);
  const bg  = useTransform(x, [-80, 0, 80], ["#fef2f2", "#ffffff", "#f0fdf4"]);
  const cfg = TYPE_CONFIG[note.type] ?? TYPE_CONFIG.update;

  const isRead = !note.unread;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative"
    >
      {/* Left accent bar — green when read, type color when unread */}
      <motion.div
        animate={{
          backgroundColor: isRead ? "#10b981" : cfg.dotHex,
          opacity: isRead ? 1 : 0.7,
        }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
      />

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.1}
        style={{ x, backgroundColor: bg }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80) onMarkRead(note.id);
        }}
        onClick={() => { onSelect(note); onMarkRead(note.id); }}
        className="cursor-pointer select-none ml-3"
      >
        <motion.div
          animate={{
            backgroundColor: isRead ? "#f8fffe" : "#ffffff",
            borderColor:      isRead ? "#d1fae5" : "#e5e7eb",
          }}
          transition={{ duration: 0.4 }}
          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-shadow duration-200
            ${isRead
              ? "shadow-none"
              : "shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            } hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)]`}
        >
          {/* Icon bubble */}
          <div className="relative flex-shrink-0">
            <motion.div
              animate={{
                opacity: isRead ? 0.55 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 ${cfg.bg} ${cfg.ring} ${cfg.color}`}
            >
              {cfg.icon}
            </motion.div>

            {/* Unread dot — animates out when read */}
            <AnimatePresence>
              {note.unread && (
                <motion.span
                  key="unread-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`absolute -top-1 -right-1 w-3 h-3 ${cfg.dot} rounded-full ring-2 ring-white`}
                />
              )}
            </AnimatePresence>

            {/* Read checkmark — animates in when read */}
            <AnimatePresence>
              {isRead && (
                <motion.div
                  key="read-check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <motion.h3
                animate={{ color: isRead ? "#6b7280" : "#111827" }}
                transition={{ duration: 0.35 }}
                className="text-sm font-semibold leading-snug truncate"
              >
                {note.title}
              </motion.h3>
              <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium mt-0.5">
                {note.time}
              </span>
            </div>

            <motion.p
              animate={{ color: isRead ? "#9ca3af" : "#6b7280" }}
              transition={{ duration: 0.35 }}
              className="text-xs mt-1 leading-relaxed line-clamp-2"
            >
              {note.message}
            </motion.p>

            {/* Footer row */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <motion.span
                animate={{ opacity: isRead ? 0.5 : 1 }}
                transition={{ duration: 0.35 }}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.badge}`}
              >
                {cfg.icon}{cfg.label}
              </motion.span>

              {note.meta?.vehicle && (
                <span className="text-[10px] text-gray-400 font-medium">
                  {note.meta.vehicle}
                </span>
              )}

              {note.meta?.priority === "High" && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                  ● High
                </span>
              )}

              {/* Read badge — slides in when read */}
              <AnimatePresence>
                {isRead && <ReadBadge key="read-badge" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Right chevron / read indicator */}
          <div className="flex-shrink-0 mt-1">
            <AnimatePresence mode="wait">
              {isRead ? (
                <motion.div
                  key="read-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-emerald-400"
                >
                  {Icons.doubleCheck}
                </motion.div>
              ) : (
                <motion.div
                  key="chevron"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-300"
                >
                  {Icons.chevronRight}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── DETAIL MODAL ────────────────────────────────────────────────────────────
const DetailModal = ({ note, onClose }) => {
  const [replyText, setReplyText] = useState("");
  const [sent, setSent] = useState(false);
  const cfg   = TYPE_CONFIG[note.type] ?? TYPE_CONFIG.update;
  const isRead = !note.unread;

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
        {/* Top strip — green if read, type color if unread */}
        <motion.div
          animate={{ backgroundColor: isRead ? "#10b981" : cfg.dotHex }}
          transition={{ duration: 0.5 }}
          className="h-1.5 w-full"
        />

        <div className="p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ring-2 ${cfg.bg} ${cfg.ring} ${cfg.color}`}>
                {cfg.icon}
              </div>
              {/* Read status pill */}
              <AnimatePresence mode="wait">
                {isRead ? (
                  <motion.div
                    key="read-pill"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">Read</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unread-pill"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-semibold text-blue-700">Unread</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              {Icons.x}
            </button>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 leading-snug mb-1">{note.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.badge}`}>{cfg.label}</span>
            <span className="text-xs text-gray-400">{note.time}</span>
          </div>

          {/* Message box — subtle green tint when read */}
          <motion.div
            animate={{
              backgroundColor: isRead ? "#f0fdf4" : "#f9fafb",
              borderColor:     isRead ? "#bbf7d0" : "transparent",
            }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-4 mb-5 border"
          >
            <p className="text-sm text-gray-600 leading-relaxed">{note.message}</p>
          </motion.div>

          {/* Meta grid */}
          {note.meta && (
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { label: "Vehicle",    value: note.meta.vehicle },
                { label: "Booking ID", value: note.meta.booking },
                { label: "Mechanic",   value: note.meta.mechanic },
                { label: "Priority",   value: note.meta.priority },
              ]
                .filter(({ value }) => value)
                .map(({ label, value }) => (
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
const Toast = ({ message, type = "success", onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 ${
        type === "error" ? "bg-red-600" : "bg-gray-900"
      }`}
    >
      <span className={type === "error" ? "text-red-200" : "text-emerald-400"}>
        {Icons.check}
      </span>
      {message}
    </motion.div>
  );
};

// ─── MAIN ───────────────────────────────────────────────────────────────────
export default function Notification() {
  const [data,          setData]          = useState([]);
  const [meta,          setMeta]          = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [loading,       setLoading]       = useState(true);
  const [loadingMore,   setLoadingMore]   = useState(false);
  const [tab,           setTab]           = useState("all");
  const [typeFilter,    setTypeFilter]    = useState("all");
  const [selected,      setSelected]      = useState(null);
  const [toast,         setToast]         = useState(null);
  const [showFilters,   setShowFilters]   = useState(false);
  const [notifEnabled,  setNotifEnabled]  = useState(false);
  const [togglingNotif, setTogglingNotif] = useState(false);

  const { token: fcmToken, permission, requestPermissionAndToken } = useFcmToken();

  useEffect(() => {
    if (permission === "granted" && fcmToken) setNotifEnabled(true);
  }, [permission, fcmToken]);

  const showToast = (message, type = "success") =>
    setToast({ message, type, key: Date.now() });

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchPage = useCallback(
    async (page = 1, append = false) => {
      try {
        append ? setLoadingMore(true) : setLoading(true);
        const params = { page, limit: 10 };
        if (typeFilter !== "all") params.type = typeFilter;

        console.log("fetchPage → GET /notifications params:", params);
        const res = await api.get("/notifications", { params });
        console.log("fetchPage → full response:", res.data);

        const items  = res.data?.data ?? [];
        const m      = res.data?.meta ?? {};
        console.log("fetchPage → items:", items.length, "meta:", m);

        const mapped = items.map(mapNotification);
        setData((prev) => (append ? [...prev, ...mapped] : mapped));
        setMeta({
          currentPage: m.currentPage ?? 1,
          totalPages:  m.totalPages  ?? 1,
          totalItems:  m.totalItems  ?? 0,
        });
      } catch (err) {
        console.error("fetchPage → error:", err?.response?.status, err?.response?.data);
        showToast("Failed to load notifications", "error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [typeFilter]
  );

  useEffect(() => { fetchPage(1); }, [fetchPage]);

  // ── Mark single read ─────────────────────────────────────────────────────
  const markRead = useCallback(async (id) => {
    console.log("markRead → id:", id);
    setData((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    // Also update selected modal if open
    setSelected((prev) => prev?.id === id ? { ...prev, unread: false } : prev);
    try {
      const res = await api.patch(`/notifications/${id}/read`);
      console.log("markRead → success:", res.data);
    } catch (err) {
      console.error("markRead → error:", err?.response?.status, err?.response?.data);
      setData((prev) => prev.map((n) => (n.id === id ? { ...n, unread: true } : n)));
      showToast("Couldn't mark as read", "error");
    }
  }, []);

  // ── Mark all read ────────────────────────────────────────────────────────
  const markAllRead = useCallback(async () => {
    console.log("markAllRead → called");
    const prev = data;
    setData((d) => d.map((n) => ({ ...n, unread: false })));
    try {
      const res = await api.patch("/notifications/read-all");
      console.log("markAllRead → success:", res.data);
      showToast("All notifications marked as read");
    } catch (err) {
      console.error("markAllRead → error:", err?.response?.status, err?.response?.data);
      setData(prev);
      showToast("Couldn't mark all as read", "error");
    }
  }, [data]);

  // ── Toggle push ──────────────────────────────────────────────────────────
  const toggleNotifications = useCallback(async () => {
    if (togglingNotif) return;
    setTogglingNotif(true);
    const enabling = !notifEnabled;
    console.log("toggleNotifications → enabling:", enabling, "token:", fcmToken);
    try {
      if (enabling && permission !== "granted") {
        await requestPermissionAndToken();
        await new Promise((r) => setTimeout(r, 300));
      }
      if (!fcmToken) {
        showToast("Allow notifications in your browser first", "error");
        return;
      }
      const payload = enabling
        ? { deviceType: "WEB", notificationToken: fcmToken }
        : { notificationToken: fcmToken };

      const res = await api.put(`/notifications/${enabling ? "enable" : "disable"}`, payload);
      console.log("toggleNotifications → success:", res.data);
      setNotifEnabled(enabling);
      showToast(`Notifications ${enabling ? "enabled" : "disabled"}`);
    } catch (err) {
      console.error("toggleNotifications → error:", err?.response?.status, err?.response?.data);
      showToast("Couldn't update notification settings", "error");
    } finally {
      setTogglingNotif(false);
    }
  }, [notifEnabled, togglingNotif, fcmToken, permission, requestPermissionAndToken]);

  // ── Load more ────────────────────────────────────────────────────────────
  const loadMore = () => {
    if (meta.currentPage < meta.totalPages && !loadingMore) {
      fetchPage(meta.currentPage + 1, true);
    }
  };

  // ── Derived ──────────────────────────────────────────────────────────────
  const unreadCount = data.filter((n) => n.unread).length;
  const readCount   = data.filter((n) => !n.unread).length;

  const filtered = data.filter((n) => {
    if (tab === "unread" && !n.unread) return false;
    if (tab === "read"   &&  n.unread) return false;
    if (typeFilter !== "all" && n.type !== typeFilter) return false;
    return true;
  });

  const groupedFiltered = ["Today", "Yesterday", "Earlier"]
    .map((g) => ({ group: g, items: filtered.filter((n) => n.group === g) }))
    .filter((g) => g.items.length > 0);

  const hasMore = meta.currentPage < meta.totalPages;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .notif-root { font-family: 'DM Sans', sans-serif; }
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .animate-pulse { animation: pulse 1.8s ease-in-out infinite; }
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

            <div className="flex items-center gap-2">
              <button
                onClick={toggleNotifications}
                disabled={togglingNotif}
                title={notifEnabled ? "Disable push" : "Enable push"}
                className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity disabled:opacity-40"
              >
                <Toggle active={notifEnabled} />
              </button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters((v) => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  showFilters ? "bg-[#1C52AF] text-white" : "bg-white text-gray-500 shadow-sm border border-gray-200"
                }`}
              >
                {Icons.filter}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchPage(1)}
                disabled={loading}
                className="h-9 px-3 rounded-xl text-xs font-semibold text-gray-500 bg-white shadow-sm border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors disabled:opacity-50"
              >
                Refresh
              </motion.button>
            </div>
          </motion.div>

          {/* ── STATS ROW ── */}
          {!loading && data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3 mb-5"
            >
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Unread</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                  {Icons.doubleCheck}
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-600">{readCount}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Read</p>
                </div>
              </div>
            </motion.div>
          )}

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
                  {[
                    ["all",       "All Types"],
                    ["update",    "Updates"],
                    ["completed", "Completed"],
                    ["mechanic",  "Assigned"],
                    ["booking",   "Bookings"],
                  ].map(([val, label]) => (
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
              {[
                ["all",    "All"],
                ["unread", `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`],
                ["read",   `Read${readCount > 0 ? ` (${readCount})` : ""}`],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setTab(val)}
                  className={`relative flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                    tab === val
                      ? val === "read" ? "text-emerald-600" : "text-[#1C52AF]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === val && (
                    <motion.div
                      layoutId="tab-bg"
                      className={`absolute inset-0 rounded-xl ${val === "read" ? "bg-emerald-50" : "bg-blue-50"}`}
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
                className="ml-2 text-xs text-gray-400 hover:text-emerald-600 font-medium transition-colors whitespace-nowrap pr-1"
              >
                Mark all read
              </button>
            )}
          </motion.div>

          {/* ── SWIPE HINT ── */}
          {!loading && data.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[11px] text-center text-gray-400 mb-4 font-medium"
            >
              Swipe right to mark read →
            </motion.p>
          )}

          {/* ── LIST ── */}
          {loading ? (
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
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
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">
                    {tab === "read" ? "No read notifications yet" : "You're all caught up"}
                  </h3>
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
                              onMarkRead={markRead}
                              onSelect={setSelected}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}

                  {hasMore && (
                    <div className="flex justify-center pt-2 pb-4">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-[#1C52AF] bg-white border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors disabled:opacity-60"
                      >
                        {loadingMore
                          ? <>{Icons.loader} Loading…</>
                          : <>Load more · {meta.totalItems - data.length} remaining</>
                        }
                      </motion.button>
                    </div>
                  )}

                  {meta.totalItems > 0 && (
                    <p className="text-center text-[11px] text-gray-400 pb-2">
                      Showing {data.length} of {meta.totalItems} notifications
                    </p>
                  )}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <DetailModal note={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.key}
            message={toast.message}
            type={toast.type}
            onDone={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}