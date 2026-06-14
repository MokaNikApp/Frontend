 import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  MdKeyboardArrowDown, MdCalendarToday, MdFileDownload, MdAdd,
  MdFlashOn, MdBuild, MdSettings, MdSync, MdAssignment,
  MdChevronLeft, MdChevronRight, MdClose, MdRefresh,
  MdLocationOn, MdPhone, MdEmail, MdDirectionsCar,
  MdReceipt, MdAccessTime, MdBuildCircle, MdCancel,
  MdCheckCircle, MdPending, MdTrendingUp,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import api from "../../api/axios";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  "bg-indigo-500","bg-emerald-500","bg-amber-500","bg-rose-500",
  "bg-cyan-500","bg-violet-500","bg-sky-500","bg-teal-500",
  "bg-pink-500","bg-orange-500","bg-fuchsia-500","bg-lime-600",
];
const getAvatarColor = (id = "") =>
  AVATAR_COLORS[id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length];

const getInitials = (first = "", last = "") => {
  const f = (first || "")[0] || "";
  const l = (last || "")[0] || "";
  return `${f}${l}`.toUpperCase() || "?";
};

const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const fmtDateTime = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
};
const fmtTime = (t) => {
  if (!t) return "—";
  const [h, m] = t.split(":");
  const hr = parseInt(h, 10);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};
const fmtMoney = (v) =>
  `$${parseFloat(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

/* Normalize customer data - backend sometimes returns "user" instead of "customer" */
const normalizeCustomer = (booking) => {
  if (!booking) return booking;
  const customer = booking.customer || booking.user || null;
  return { ...booking, customer };
};

/* ------------------------------------------------------------------ */
/*  STATUS + PAYMENT CONFIG                                            */
/* ------------------------------------------------------------------ */

const STATUS_MAP = {
  pending:     { badge: "bg-amber-50 text-amber-700 border border-amber-200",       dot: "bg-amber-400",   label: "PENDING"      },
  confirmed:   { badge: "bg-blue-50 text-blue-700 border border-blue-200",          dot: "bg-blue-500",    label: "CONFIRMED"    },
  active:      { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", label: "ACTIVE"       },
  in_progress: { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", label: "IN PROGRESS"  },
  completed:   { badge: "bg-indigo-50 text-indigo-700 border border-indigo-200",    dot: "bg-indigo-500",  label: "COMPLETED"    },
  cancelled:   { badge: "bg-rose-50 text-rose-700 border border-rose-200",          dot: "bg-rose-500",    label: "CANCELLED"    },
};
const getStatus = (s = "") =>
  STATUS_MAP[s.toLowerCase()] ?? {
    badge: "bg-slate-100 text-slate-600 border border-slate-200",
    dot: "bg-slate-400", label: s.toUpperCase(),
  };

const PAYMENT_BADGE = {
  pending:  "bg-amber-50 text-amber-700 border border-amber-200",
  paid:     "bg-emerald-50 text-emerald-700 border border-emerald-200",
  failed:   "bg-rose-50 text-rose-700 border border-rose-200",
  refunded: "bg-purple-50 text-purple-700 border border-purple-200",
};
const getPaymentBadge = (s = "") =>
  PAYMENT_BADGE[s?.toLowerCase()] ?? "bg-slate-100 text-slate-600 border border-slate-200";

/* ------------------------------------------------------------------ */
/*  SMALL UI ATOMS                                                     */
/* ------------------------------------------------------------------ */

const ServiceIcon = ({ name, className = "text-xs" }) => {
  const icons = { flash: MdFlashOn, settings: MdSettings, sync: MdSync };
  const Icon = icons[name] ?? MdBuild;
  return <Icon className={className} />;
};

const SkeletonRow = ({ cols = 8 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-3 bg-slate-100 rounded w-3/4" />
        {i === 0 && <div className="h-2 bg-slate-100 rounded w-1/2 mt-1.5" />}
      </td>
    ))}
  </tr>
);

const PageBtn = ({ disabled, onClick, children }) => (
  <button disabled={disabled} onClick={onClick}
    className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none">
    {children}
  </button>
);

const ActionBtn = ({ label, color, disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick}
    className={`${color} text-white text-[11px] font-bold py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap`}>
    {label}
  </button>
);

/* section card inside drawer */
const DrawerSection = ({ title, icon: Icon, children }) => (
  <div className="rounded-xl border border-slate-100 overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
      <Icon className="text-base text-slate-400" />
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{title}</p>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const DrawerField = ({ label, value, mono }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <p className={`text-xs font-semibold text-slate-800 mt-0.5 ${mono ? "font-mono" : ""}`}>{value ?? "—"}</p>
  </div>
);

const InfoRow = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-1.5 text-xs text-slate-500">
    <Icon className="text-slate-300 text-sm shrink-0" />
    <span>{value ?? "—"}</span>
  </div>
);

const FinancialRow = ({ label, value, bold }) => (
  <div className="flex justify-between items-center text-xs">
    <span className={bold ? "font-bold text-slate-900 text-sm" : "text-slate-500 font-medium"}>{label}</span>
    <span className={bold ? "font-bold text-slate-900 text-sm" : "font-semibold text-slate-700"}>{value}</span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, cardClass, iconClass, delay }) => (
  <div className={`${cardClass} p-4 rounded-xl border flex items-center gap-3 animate-slide-up`} style={{ animationDelay: delay }}>
    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm">
      <Icon className={`text-xl ${iconClass}`} />
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 leading-none">{label}</p>
      <p className="text-2xl font-bold mt-1 leading-none">{value ?? "—"}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  DETAIL DRAWER                                                      */
/* ------------------------------------------------------------------ */

const DetailDrawer = ({ bookingId, onClose, onStatusChange }) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true); setData(null); setError(null);
    api.get(`/admin/bookings/${bookingId}`)
      .then((r) => setData(normalizeCustomer(r.data)))
      .catch((e) => setError(e?.response?.data?.message ?? "Failed to load booking."))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const handleStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await api.patch(`/admin/bookings/${bookingId}/status`, { status: newStatus });
      setData((prev) => ({ ...prev, status: newStatus }));
      onStatusChange(bookingId, newStatus);
    } catch {/* silent */} finally { setUpdating(false); }
  };

  const st = data ? getStatus(data.status) : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto flex flex-col animate-slide-in-right" onClick={(e) => e.stopPropagation()}>

        {/* sticky header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Booking Detail</p>
            {data && <p className="font-mono text-xs text-slate-500 mt-0.5">{data.bookingNumber}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <MdClose className="text-lg" />
          </button>
        </div>

        {/* body */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#0B44A0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="text-sm text-slate-500">{error}</p>
          </div>
        ) : data ? (
          <div className="flex-1 p-5 space-y-4">

            {/* status badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} /> {st.label}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getPaymentBadge(data.paymentStatus)}`}>
                Payment: {data.paymentStatus?.toUpperCase() ?? "—"}
              </span>
            </div>

            {/* Customer */}
            <DrawerSection title="Customer" icon={MdEmail}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(data.customer?.id ?? "")} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {getInitials(data.customer?.firstName, data.customer?.lastName)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm">{data.customer?.firstName} {data.customer?.lastName}</p>
                  <div className="mt-1 space-y-0.5">
                    <InfoRow icon={MdEmail} value={data.customer?.email} />
                    <InfoRow icon={MdPhone} value={data.customer?.phoneNumber} />
                  </div>
                </div>
              </div>
            </DrawerSection>

            {/* Vehicle */}
            <DrawerSection title="Vehicle" icon={MdDirectionsCar}>
              {data.vehicle ? (
                <div className="grid grid-cols-2 gap-3">
                  <DrawerField label="Brand"  value={data.vehicle.brand} />
                  <DrawerField label="Model"  value={data.vehicle.model} />
                  <DrawerField label="Year"   value={data.vehicle.year} />
                  <DrawerField label="Plate"  value={data.vehicle.plateNumber ?? "—"} mono />
                </div>
              ) : <p className="text-xs text-slate-400 italic">No vehicle info</p>}
            </DrawerSection>

            {/* Service */}
            <DrawerSection title="Service" icon={MdBuildCircle}>
              {data.service ? (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-900">{data.service.name}</p>
                  {data.service.description && (
                    <p className="text-xs text-slate-500 leading-relaxed">{data.service.description}</p>
                  )}
                  {data.additionalServices?.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Add-ons</p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.additionalServices.map((s) => (
                          <span key={s} className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            {s.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : <p className="text-xs text-slate-400 italic">No service info</p>}
            </DrawerSection>

            {/* Schedule + Location */}
            <DrawerSection title="Schedule & Location" icon={MdLocationOn}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <DrawerField label="Scheduled Date" value={data.scheduledDate ? fmtDate(data.scheduledDate) : "Not set"} />
                  <DrawerField label="Scheduled Time" value={fmtTime(data.scheduledTime)} />
                  <DrawerField label="Created At"     value={fmtDateTime(data.createdAt)} />
                  <DrawerField label="Last Updated"   value={fmtDateTime(data.updatedAt)} />
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service Address</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {[data.serviceAddress, data.serviceCity, data.serviceState, data.serviceZip]
                      .filter(Boolean).join(", ") || "—"}
                  </p>
                </div>
              </div>
            </DrawerSection>

            {/* Provider */}
            <DrawerSection title="Assigned Mechanic" icon={MdBuild}>
              {data.provider ? (
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${getAvatarColor(data.provider.id ?? "")} flex items-center justify-center text-white font-bold text-xs`}>
                    {getInitials(data.provider.firstName ?? data.provider.name ?? "", data.provider.lastName ?? "")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {data.provider.name ?? `${data.provider.firstName ?? ""} ${data.provider.lastName ?? ""}`.trim()}
                    </p>
                    {data.provider.specialty && <p className="text-xs text-slate-400 mt-0.5">{data.provider.specialty}</p>}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <MdBuild className="text-slate-300 text-sm" /> Not yet assigned
                </div>
              )}
            </DrawerSection>

            {/* Payment Breakdown */}
            <DrawerSection title="Payment Breakdown" icon={MdReceipt}>
              <div className="space-y-2">
                <FinancialRow label="Subtotal"    value={fmtMoney(data.subtotal)} />
                <FinancialRow label="Service Fee" value={fmtMoney(data.serviceFee)} />
                <FinancialRow label="Taxes"       value={fmtMoney(data.taxes)} />
                <div className="border-t border-slate-100 pt-2">
                  <FinancialRow label="Total Amount" value={fmtMoney(data.totalAmount)} bold />
                </div>
              </div>
            </DrawerSection>

            {/* Notes */}
            {data.notes && (
              <DrawerSection title="Notes" icon={MdAssignment}>
                <p className="text-xs text-slate-600 leading-relaxed">{data.notes}</p>
              </DrawerSection>
            )}

            {/* Cancellation */}
            {data.cancellationReason && (
              <DrawerSection title="Cancellation Info" icon={MdCancel}>
                <div className="space-y-2">
                  <DrawerField label="Reason"       value={data.cancellationReason} />
                  <DrawerField label="Cancelled At" value={fmtDateTime(data.cancelledAt)} />
                </div>
              </DrawerSection>
            )}
          </div>
        ) : null}

        {/* sticky action footer */}
        {/* {data && (
          <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {!["confirmed","completed","cancelled"].includes(data.status) && (
                <ActionBtn label="Confirm"    color="bg-blue-600 hover:bg-blue-700"     disabled={updating} onClick={() => handleStatus("confirmed")} />
              )}
              {!["in_progress","completed","cancelled"].includes(data.status) && (
                <ActionBtn label="Set Active" color="bg-emerald-600 hover:bg-emerald-700" disabled={updating} onClick={() => handleStatus("in_progress")} />
              )}
              {!["completed","cancelled"].includes(data.status) && (
                <ActionBtn label="Complete"   color="bg-indigo-600 hover:bg-indigo-700"  disabled={updating} onClick={() => handleStatus("completed")} />
              )}
              {data.status !== "cancelled" && (
                <ActionBtn label="Cancel Booking" color="bg-rose-600 hover:bg-rose-700" disabled={updating} onClick={() => handleStatus("cancelled")} />
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const TABS  = ["All","Pending","Confirmed","Active","Completed","Cancelled"];
const LIMIT = 10;

export default function UsersBookings() {
  /* data */
  const [bookings,     setBookings]     = useState([]);
  const [meta,         setMeta]         = useState(null);
  const [overview,     setOverview]     = useState(null);
  const [recent,       setRecent]       = useState([]);
  const [loadingList,  setLoadingList]  = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error,        setError]        = useState(null);

  /* ui */
  const [activeTab,      setActiveTab]      = useState("All");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [sortBy,         setSortBy]         = useState("Newest");
  const [sortOpen,       setSortOpen]       = useState(false);
  const [selectedId,     setSelectedId]     = useState(null);
  const [activeSection,  setActiveSection]  = useState("bookings");

  /* ── fetch list ── */
  const fetchBookings = useCallback(async (page, tab) => {
    setLoadingList(true); setError(null);
    try {
      const params = { page, limit: LIMIT };
      if (tab !== "All") params.status = tab.toLowerCase();
      const res = await api.get("/admin/bookings", { params });
      const rawData = res.data.data ?? [];
      const normalized = rawData.map(normalizeCustomer);
      setBookings(normalized);
      setMeta(res.data.meta ?? null);
    } catch (e) {
      setError(e?.response?.data?.message ?? "Failed to load bookings.");
    } finally { setLoadingList(false); }
  }, []);

  /* ── fetch overview + recent ── */
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const [ov, rc] = await Promise.all([
        api.get("/admin/bookings/overview"),
        api.get("/admin/bookings/recent"),
      ]);
      setOverview(ov.data);
      const recentData = Array.isArray(rc.data) ? rc.data : (rc.data?.data ?? []);
      setRecent(recentData.map(normalizeCustomer));
    } catch { /* non-critical */ } finally { setLoadingStats(false); }
  }, []);

  useEffect(() => { fetchBookings(currentPage, activeTab); }, [currentPage, activeTab, fetchBookings]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  /* ── client-side sort on current page ── */
  const sorted = useMemo(() => {
    const arr = [...bookings];
    if (sortBy === "Newest")  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "Oldest") arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else arr.sort((a, b) => a.status.localeCompare(b.status));
    return arr;
  }, [bookings, sortBy]);

  /* ── optimistic update ── */
  const handleStatusChange = useCallback((id, newStatus) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    setRecent((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    fetchStats();
  }, [fetchStats]);

  /* ── export ── */
  const handleExport = () => {
    const a = Object.assign(document.createElement("a"), {
      href: `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(bookings, null, 2))}`,
      download: "MokaNik_Bookings.json",
    });
    document.body.appendChild(a); a.click(); a.remove();
  };

  /* ── pagination pills ── */
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;
  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const s = Math.max(1, currentPage - 2), e = Math.min(totalPages, s + 4);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }, [totalPages, currentPage]);

  /* ================================================================ */
  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans antialiased space-y-5 animate-fade-in">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bookings Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full overview of all service appointments across the MokaNik network.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => { fetchBookings(currentPage, activeTab); fetchStats(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer">
            <MdRefresh className="text-base text-slate-500" /> Refresh
          </button>
          <button onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer">
            <MdFileDownload className="text-base text-slate-500" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 active:scale-95 transition-all cursor-pointer">
            <MdAdd className="text-base" /> New Booking
          </button>
        </div>
      </div>

      {/* ── OVERVIEW CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {loadingStats ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-white border border-slate-100 rounded-xl animate-pulse" />
          ))
        ) : (
          <>
            <StatCard icon={MdCalendarToday} label="Total Bookings"  value={overview?.totalBookings}     cardClass="bg-[#0B44A0] text-white border-transparent"                         iconClass="text-blue-200"    delay="0ms" />
            <StatCard icon={MdPending}       label="Pending"         value={overview?.pendingBookings}   cardClass="bg-amber-50 text-amber-800 border border-amber-100"                iconClass="text-amber-500"   delay="50ms" />
            <StatCard icon={MdCheckCircle}   label="Confirmed"       value={overview?.confirmedBookings} cardClass="bg-blue-50 text-blue-800 border border-blue-100"                   iconClass="text-blue-500"    delay="100ms" />
            <StatCard icon={MdTrendingUp}    label="Completed"       value={overview?.completedBookings} cardClass="bg-indigo-50 text-indigo-800 border border-indigo-100"             iconClass="text-indigo-500"  delay="150ms" />
            <StatCard icon={MdCancel}        label="Cancelled"       value={overview?.cancelledBookings} cardClass="bg-rose-50 text-rose-800 border border-rose-100"                   iconClass="text-rose-500"    delay="200ms" />
            <StatCard icon={MdReceipt}       label="Revenue"         value={fmtMoney(overview?.totalRevenue ?? 0)} cardClass="bg-emerald-50 text-emerald-800 border border-emerald-100" iconClass="text-emerald-500" delay="250ms" />
          </>
        )}
      </div>

      {/* ── SECTION TOGGLE ── */}
      <div className="flex gap-2 border-b border-slate-100 pb-1">
        {[["bookings","All Bookings"],["recent","Recent Activity"]].map(([key, label]) => (
          <button key={key} onClick={() => setActiveSection(key)}
            className={`px-4 py-1.5 rounded-t-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === key
                ? "bg-[#0B44A0] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-lg"
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* ================================================================ */}
      {/* ALL BOOKINGS TABLE                                               */}
      {/* ================================================================ */}
      {activeSection === "bookings" && (
        <>
          {/* filter + sort */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {TABS.map((tab) => (
                <button key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    activeTab === tab ? "bg-[#0B44A0] text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative flex items-center gap-1.5 self-end sm:self-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Sort:</span>
              <button onClick={() => setSortOpen(!sortOpen)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold flex items-center gap-1 text-xs shadow-sm hover:bg-slate-50 cursor-pointer">
                {sortBy === "Newest" ? "Newest first" : sortBy === "Oldest" ? "Oldest first" : "By status"}
                <MdKeyboardArrowDown className={`text-slate-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 min-w-36 animate-scale-up">
                  {[["Newest","Newest first"],["Oldest","Oldest first"],["Status","By status"]].map(([v, l]) => (
                    <div key={v} onClick={() => { setSortBy(v); setSortOpen(false); }}
                      className={`px-3 py-2 text-xs font-semibold hover:bg-slate-50 cursor-pointer ${sortBy === v ? "text-[#0B44A0]" : "text-slate-600"}`}>
                      {l}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* table card */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            {error ? (
              <div className="py-16 flex flex-col items-center gap-2">
                <p className="text-sm text-slate-500">{error}</p>
                <button onClick={() => fetchBookings(currentPage, activeTab)} className="text-xs text-[#0B44A0] font-bold hover:underline cursor-pointer">Retry</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse min-w-[860px]">
                  <thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                    <tr>
                      <th className="px-4 py-3.5">Customer</th>
                      <th className="px-4 py-3.5">Booking #</th>
                      <th className="px-4 py-3.5">Service</th>
                      <th className="px-4 py-3.5">Vehicle</th>
                      <th className="px-4 py-3.5">Scheduled</th>
                      <th className="px-4 py-3.5">Amount</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {loadingList ? (
                      Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={8} />)
                    ) : sorted.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-14 text-center text-slate-400 text-sm">
                          No bookings found for this filter.
                        </td>
                      </tr>
                    ) : sorted.map((b, i) => {
                      const st  = getStatus(b.status);
                      const av  = getAvatarColor(b.id);
                      const ini = getInitials(b.customer?.firstName ?? "", b.customer?.lastName ?? "");
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/60 transition-colors animate-slide-up" style={{ animationDelay: `${i * 20}ms` }}>

                          {/* Customer */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full ${av} text-white flex items-center justify-center font-bold text-xs shrink-0`}>{ini}</div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 leading-none truncate max-w-[110px]">
                                  {b.customer?.firstName} {b.customer?.lastName}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[110px]">{b.customer?.email}</p>
                                {b.customer?.phoneNumber && (
                                  <p className="text-[10px] text-slate-300 mt-0.5">{b.customer.phoneNumber}</p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Booking # */}
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-[10px] text-slate-600 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                              {b.bookingNumber}
                            </span>
                          </td>

                          {/* Service */}
                          <td className="px-4 py-3.5">
                            <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap">
                              <MdBuild className="text-xs" />
                              {b.service?.name ?? "—"}
                            </span>
                          </td>

                          {/* Vehicle */}
                          <td className="px-4 py-3.5">
                            {b.vehicle ? (
                              <div>
                                <p className="font-semibold text-slate-800 leading-none whitespace-nowrap">
                                  {b.vehicle.brand} {b.vehicle.model}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{b.vehicle.year}</p>
                              </div>
                            ) : <span className="text-slate-400 italic text-[11px]">—</span>}
                          </td>

                          {/* Scheduled */}
                          <td className="px-4 py-3.5">
                            <p className="font-semibold text-slate-800 leading-none whitespace-nowrap">
                              {b.scheduledDate ? fmtDate(b.scheduledDate) : fmtDate(b.createdAt)}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{fmtTime(b.scheduledTime)}</p>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-slate-900 whitespace-nowrap">{fmtMoney(b.totalAmount)}</span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${st.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="px-4 py-3.5 text-center">
                            <button onClick={() => setSelectedId(b.id)}
                              className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#d3e3ff] px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-sm">
                              View Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* pagination */}
            {!error && (
              <div className="flex justify-between items-center px-4 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
                <p className="font-medium">
                  {totalItems === 0 ? "No entries" : (
                    <>Showing{" "}
                      <span className="font-bold text-slate-700">{((currentPage - 1) * LIMIT) + 1}–{Math.min(currentPage * LIMIT, totalItems)}</span>{" "}
                      of <span className="font-bold text-slate-700">{totalItems}</span> entries
                    </>
                  )}
                </p>
                <div className="flex items-center gap-1">
                  <PageBtn disabled={currentPage === 1 || loadingList} onClick={() => setCurrentPage((p) => p - 1)}>
                    <MdChevronLeft className="text-base" />
                  </PageBtn>
                  {pageNums.map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} disabled={loadingList}
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs transition-all cursor-pointer disabled:opacity-50 ${
                        currentPage === p ? "bg-[#0B44A0] text-white shadow-sm" : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}>
                      {p}
                    </button>
                  ))}
                  <PageBtn disabled={currentPage === totalPages || loadingList} onClick={() => setCurrentPage((p) => p + 1)}>
                    <MdChevronRight className="text-base" />
                  </PageBtn>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ================================================================ */}
      {/* RECENT BOOKINGS                                                   */}
      {/* ================================================================ */}
      {activeSection === "recent" && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Booking Activity</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Latest bookings — click any row to view full detail</p>
            </div>
            {!loadingStats && (
              <span className="bg-[#EAF1FF] text-[#0B44A0] text-[10px] font-bold px-2.5 py-1 rounded-full">
                {recent.length} entries
              </span>
            )}
          </div>

          {loadingStats ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-2 py-0.5">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-2 bg-slate-100 rounded w-2/3" />
                  </div>
                  <div className="h-5 w-16 bg-slate-100 rounded-full self-center" />
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">No recent bookings available.</div>
          ) : (
            <>
              {/* table header */}
              <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Booking #</div>
                <div className="col-span-2">Service</div>
                <div className="col-span-2">Vehicle</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-right">Date</div>
              </div>

              <div className="divide-y divide-slate-50">
                {recent.map((b, i) => {
                  const st  = getStatus(b.status);
                  const av  = getAvatarColor(b.id);
                  const ini = getInitials(b.customer?.firstName ?? "", b.customer?.lastName ?? "");
                  return (
                    <div key={b.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center px-5 py-3.5 hover:bg-slate-50/70 transition-colors cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${i * 25}ms` }}
                      onClick={() => { setSelectedId(b.id); setActiveSection("bookings"); }}>

                      {/* Customer */}
                      <div className="md:col-span-3 flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${av} text-white flex items-center justify-center font-bold text-xs shrink-0`}>{ini}</div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs leading-none truncate">
                            {b.customer?.firstName} {b.customer?.lastName}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{b.customer?.email}</p>
                        </div>
                      </div>

                      {/* Booking # */}
                      <div className="md:col-span-2">
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                          {b.bookingNumber}
                        </span>
                      </div>

                      {/* Service */}
                      <div className="md:col-span-2">
                        <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap">
                          <MdBuild className="text-[10px]" /> {b.service?.name ?? "—"}
                        </span>
                      </div>

                      {/* Vehicle */}
                      <div className="md:col-span-2">
                        <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                          {b.vehicle ? `${b.vehicle.brand} ${b.vehicle.model} ${b.vehicle.year}` : "—"}
                        </p>
                      </div>

                      {/* Amount */}
                      <div className="md:col-span-1">
                        <span className="text-xs font-bold text-slate-900">{fmtMoney(b.totalAmount)}</span>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${st.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="md:col-span-1 md:text-right">
                        <p className="text-[10px] text-slate-500 font-medium whitespace-nowrap">{fmtDate(b.createdAt)}</p>
                        <p className="text-[10px] text-slate-300">{fmtTime(b.scheduledTime)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── DETAIL DRAWER ── */}
      {selectedId && (
        <DetailDrawer
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      <style>{`
        @keyframes fadeIn       { from{opacity:0} to{opacity:1} }
        @keyframes slideUp      { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleUp      { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
        .animate-fade-in       { animation: fadeIn .3s ease both }
        .animate-slide-up      { animation: slideUp .4s cubic-bezier(.16,1,.3,1) both }
        .animate-scale-up      { animation: scaleUp .2s cubic-bezier(.34,1.56,.64,1) both }
        .animate-slide-in-right{ animation: slideInRight .3s cubic-bezier(.16,1,.3,1) both }
        .scrollbar-none::-webkit-scrollbar{display:none}
        .scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
    </div>
  );
}