import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  MdOutlinePayment,
  MdOutlineAttachMoney,
  MdOutlineCheckCircle,
  MdOutlinePendingActions,
  MdOutlineWarningAmber,
  MdOutlineReceiptLong,
  MdOutlineCalendarMonth,
  MdOutlineSchedule,
  MdOutlineTrendingUp,
  MdOutlineRefresh,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlineAccountBalance,
  MdOutlinePercent,
  MdOutlineLocalAtm,
  MdOutlineDoneAll,
  MdOutlineHourglassEmpty,
  MdOutlineCancel,
} from "react-icons/md";

/* ═══════════════════════════════════════════════════════════════
   STATUS CONFIGURATION — unified visual language for PAYMENTS
   ═══════════════════════════════════════════════════════════════ */
const statusConfig = {
  success: {
    label: "Successful",
    icon: MdOutlineDoneAll,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-100",
    chipText: "text-emerald-700",
  },
  pending: {
    label: "Pending",
    icon: MdOutlineHourglassEmpty,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    chipBg: "bg-amber-100",
    chipText: "text-amber-700",
  },
  failed: {
    label: "Failed",
    icon: MdOutlineCancel,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    chipBg: "bg-red-100",
    chipText: "text-red-700",
  },
};

const getStatusStyle = (status) =>
  statusConfig[status] || statusConfig.pending;

/* ═══════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════ */
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
};

/* ═══════════════════════════════════════════════════════════════
   STAT CARD COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, accentColor, delay }) => (
  <div
    className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
            <MdOutlineTrendingUp className={`w-3.5 h-3.5 ${trendUp ? "" : "rotate-180"}`} />
            {trend}
          </div>
        )}
      </div>
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${accentColor.replace("bg-", "bg-opacity-10 bg-")} text-gray-700 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PAYMENT ROW COMPONENT (expandable)
   ═══════════════════════════════════════════════════════════════ */
const PaymentRow = ({ payment, index, isExpanded, onToggle }) => {
  const status = getStatusStyle(payment.status);
  const StatusIcon = status.icon;

  // Calculate fee percentages for visual bars
  const providerPercent = payment.totalAmount > 0 
    ? Math.round((payment.providerFee / payment.totalAmount) * 100) 
    : 0;
  const platformPercent = payment.totalAmount > 0 
    ? Math.round((payment.platformFee / payment.totalAmount) * 100) 
    : 0;

  return (
    <>
      <tr
        className={`group transition-colors duration-150 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
        } hover:bg-blue-50/40`}
        onClick={onToggle}
      >
        {/* Reference */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
              <MdOutlinePayment className="w-5 h-5 text-[#1C52AF]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1C52AF] transition-colors font-mono">
                {payment.reference}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Job ID: {payment.jobId.slice(0, 8)}...
              </p>
            </div>
          </div>
        </td>

        {/* Amount */}
        <td className="px-6 py-4">
          <p className="text-sm font-bold text-gray-900">
            {formatCurrency(payment.totalAmount)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {payment.status === "success" ? "Paid in full" : "Awaiting payment"}
          </p>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.chipBg} ${status.chipText} border ${status.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </td>

        {/* Date */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <MdOutlineCalendarMonth className="w-4 h-4 text-gray-400" />
            {formatDate(payment.createdAt)}
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 ml-5">
            {timeAgo(payment.createdAt)}
          </p>
        </td>

        {/* Paid At */}
        <td className="px-6 py-4">
          {payment.paidAt ? (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <MdOutlineSchedule className="w-4 h-4 text-emerald-400" />
              {formatDate(payment.paidAt)}
            </div>
          ) : (
            <span className="text-sm text-gray-400 italic">Not yet paid</span>
          )}
        </td>

        {/* Actions — only MoreVert, no arrow */}
        <td className="px-6 py-4">
          <div className="flex items-center justify-end">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="More options"
            >
              <MdOutlineMoreVert className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Detail Row */}
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-6 py-0">
            <div className="bg-gray-50/80 border-y border-gray-100 px-6 py-5 animate-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Payment Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Payment Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payment ID</span>
                      <span className="font-mono text-xs text-gray-700 bg-white px-2 py-0.5 rounded border">{payment.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Reference</span>
                      <span className="font-mono text-xs text-gray-700">{payment.reference}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Job ID</span>
                      <span className="font-mono text-xs text-gray-700">{payment.jobId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.chipBg} ${status.chipText}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown — EXPLAINED */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Fee Breakdown
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <MdOutlineLocalAtm className="w-4 h-4 text-[#1C52AF]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Total Amount</p>
                          <p className="text-[10px] text-gray-400">What the customer paid</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(payment.totalAmount)}</span>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Provider Fee */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <MdOutlineAccountBalance className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Provider Fee</p>
                            <p className="text-[10px] text-gray-400">What the mechanic earns (90%)</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">{formatCurrency(payment.providerFee)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${providerPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 text-right">{providerPercent}% of total</p>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Platform Fee */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                            <MdOutlinePercent className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Platform Fee</p>
                            <p className="text-[10px] text-gray-400">Our commission (10%)</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-purple-600">{formatCurrency(payment.platformFee)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${platformPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 text-right">{platformPercent}% of total</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MdOutlineSchedule className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Initiated</p>
                        <p className="text-xs text-gray-500">{formatDateTime(payment.createdAt)}</p>
                      </div>
                    </div>

                    {payment.paidAt ? (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MdOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment Confirmed</p>
                          <p className="text-xs text-gray-500">{formatDateTime(payment.paidAt)}</p>
                          <p className="text-[10px] text-emerald-600 mt-0.5">
                            Transaction completed successfully
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MdOutlineHourglassEmpty className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Awaiting Confirmation</p>
                          <p className="text-xs text-gray-500">Payment not yet completed</p>
                          <p className="text-[10px] text-amber-600 mt-0.5">
                            The customer has not finalized this payment
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {payment.status === "pending" && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MdOutlineWarningAmber className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-amber-800">Payment Pending</p>
                          <p className="text-[10px] text-amber-600 mt-0.5">
                            This payment is awaiting customer action. The job will proceed once payment is confirmed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const PaymentHistory = () => {

  // ── State ─────────────────────────────────────────────────────
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalRevenue: 0,
    successfulCount: 0,
    pendingCount: 0,
  });

  // ── Tabs ──────────────────────────────────────────────────────
  const tabs = [
    { key: "ALL", label: "All Payments", count: null },
    { key: "success", label: "Successful", count: null },
    { key: "pending", label: "Pending", count: null },
    { key: "failed", label: "Failed", count: null },
  ];

  // ── Fetch Data ────────────────────────────────────────────────
  const fetchPayments = async (status = "ALL", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/payments");
      const paymentList = Array.isArray(data) ? data : data?.data ?? [];

      // Filter by status if not ALL
      const filtered = status === "ALL" 
        ? paymentList 
        : paymentList.filter((p) => p.status === status);

      // Simple client-side pagination
      const total = filtered.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const start = (page - 1) * pagination.limit;
      const paginated = filtered.slice(start, start + pagination.limit);

      setPayments(paginated);
      setPagination({
        page,
        limit: pagination.limit,
        total,
        totalPages: Math.max(totalPages, 1),
      });

      // Compute stats from ALL payments
      setStats({
        totalPayments: paymentList.length,
        totalRevenue: paymentList
          .filter((p) => p.status === "success")
          .reduce((sum, p) => sum + (p.totalAmount || 0), 0),
        successfulCount: paymentList.filter((p) => p.status === "success").length,
        pendingCount: paymentList.filter((p) => p.status === "pending").length,
      });
    } catch (err) {
      console.error("Failed to fetch payments:", err);
      setError("Unable to load payment history. Please try again.");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(activeTab, 1);
  }, [activeTab]);

  // ── Filtered Payments (search) ────────────────────────────────
  const filteredPayments = useMemo(() => {
    if (!searchQuery.trim()) return payments;
    const q = searchQuery.toLowerCase();
    return payments.filter(
      (p) =>
        p.reference.toLowerCase().includes(q) ||
        p.jobId.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [payments, searchQuery]);

  // ── Handlers ──────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchPayments(activeTab, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Page Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Payment History
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Track all your transactions, fees, and payment statuses
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchPayments(activeTab, pagination.page)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <MdOutlineRefresh className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ═══ STAT CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Payments"
            value={stats.totalPayments}
            subtitle="All time transactions"
            icon={MdOutlineReceiptLong}
            accentColor="bg-[#1C52AF]"
            delay={0}
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            subtitle="Successfully processed"
            icon={MdOutlineAttachMoney}
            accentColor="bg-emerald-500"
            trend="+8% from last month"
            trendUp={true}
            delay={100}
          />
          <StatCard
            title="Successful"
            value={stats.successfulCount}
            subtitle="Confirmed payments"
            icon={MdOutlineCheckCircle}
            accentColor="bg-blue-500"
            delay={200}
          />
          <StatCard
            title="Pending"
            value={stats.pendingCount}
            subtitle="Awaiting confirmation"
            icon={MdOutlinePendingActions}
            accentColor="bg-amber-500"
            delay={300}
          />
        </div>

        {/* ═══ FILTERS & SEARCH ═══ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-100">
            <div className="flex items-center gap-1 px-4 py-3 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setExpandedRow(null);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-blue-50 text-[#1C52AF]"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1C52AF] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by reference, job ID, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400
                  focus:bg-white focus:border-[#1C52AF]/40 focus:ring-2 focus:ring-[#1C52AF]/10 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {filteredPayments.length} result{filteredPayments.length !== 1 ? "s" : ""}
              </span>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <MdOutlineFilterList className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* ═══ TABLE ═══ */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Initiated
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Paid At
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  // Skeleton Loading
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                          <div className="space-y-2">
                            <div className="w-32 h-4 bg-gray-200 rounded" />
                            <div className="w-48 h-3 bg-gray-200 rounded" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-20 h-6 bg-gray-200 rounded-full" /></td>
                      <td className="px-6 py-4"><div className="w-28 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-28 h-4 bg-gray-200 rounded" /></td>
                      <td className="px-6 py-4"><div className="w-8 h-8 bg-gray-200 rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                          <MdOutlineWarningAmber className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">{error}</p>
                        <button
                          onClick={() => fetchPayments(activeTab, 1)}
                          className="text-sm text-[#1C52AF] hover:underline font-medium"
                        >
                          Try again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <MdOutlineReceiptLong className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          No payments found
                        </p>
                        <p className="text-xs text-gray-400 max-w-xs">
                          {searchQuery
                            ? "No results match your search. Try different keywords."
                            : `You don't have any ${activeTab !== "ALL" ? activeTab.toLowerCase() : ""} payments yet.`}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <PaymentRow
                      key={payment.id}
                      payment={payment}
                      index={index}
                      isExpanded={expandedRow === payment.id}
                      onToggle={() => toggleRow(payment.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ═══ PAGINATION ═══ */}
          {!loading && !error && filteredPayments.length > 0 && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">{pagination.total}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <MdOutlineChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                      pagination.page === page
                        ? "bg-[#1C52AF] text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <MdOutlineChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
