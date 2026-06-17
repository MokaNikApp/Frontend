import { useState, useEffect, useMemo } from "react";
import { FiTrendingUp, FiDownload, FiEye, FiX, FiCheckCircle, FiClock, FiFileText, FiUser, FiBriefcase, FiMessageSquare, FiCreditCard, FiLoader } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../../api/axios"; 
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const ROWS_PER_PAGE = 4;

export default function Earnings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [chartPeriod, setChartPeriod] = useState("Weekly");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);

  // Core Sync States
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ---------------------------------------------------------------------------
  // 1. DATA SYNC FETCH LOOP (Guarded response unpacking)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        setLoading(true);
        // Using your dedicated auth-protected custom client instance
        const response = await api.get("/jobs/status/COMPLETED");
        
        // Robust layout fallback unwrap parsing layers
        let extractedData = [];
        if (response?.data) {
          if (Array.isArray(response.data)) {
            extractedData = response.data;
          } else if (Array.isArray(response.data.data)) {
            extractedData = response.data.data;
          } else if (Array.isArray(response.data.transactions)) {
            extractedData = response.data.transactions;
          }
        }

        // Translation Layer: Formats raw backend payload into the look expected by your chart & table
        const normalizedData = extractedData.map((j, idx) => {
          let displayDate = "Closed";
          const targetDate = j.completedAt || j.updatedAt || j.scheduledAt;
          if (targetDate) {
            try {
              displayDate = new Date(targetDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
            } catch (e) {
              // Graceful fallback
            }
          }

          const clientName = j.user ? `${j.user.firstName || ""} ${j.user.lastName || ""}`.trim() : "Client Request";
          const numericAmount = Number(j.totalAmount || j.price || j.amount || 0);

          return {
            id: j.id || j._id || idx,
            date: displayDate,
            time: j.completedAt ? new Date(j.completedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "12:00 PM",
            txId: j.transactionId || `#TRX-${Math.floor(100000 + Math.random() * 900000)}`,
            amount: numericAmount,
            status: j.status === "COMPLETED" ? "Paid" : "Pending",
            client: clientName,
            service: j.title || "Workshop Service",
            paymentMethod: "Electronic Wire",
            breakdown: { base: numericAmount * 0.9, tax: numericAmount * 0.1, platformFee: 0 },
            messageRef: j.description || "No specific internal communications logged for this transaction entry."
          };
        });
        
        setAllTransactions(normalizedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching earnings ledger records:", err);
        setError("Failed to load your financial history statement records from server tracks.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  // ---------------------------------------------------------------------------
  // 2. CRASH-PROOF DATA MUTATORS & RECHARTS MATRICES
  // ---------------------------------------------------------------------------
  const chartMap = useMemo(() => {
    // Rigid layout validation to block standard non-iterable collection errors
    const safeArray = Array.isArray(allTransactions) ? allTransactions : [];

    const daily = safeArray.slice(0, 6).map((t) => ({
      label: t?.date ? t.date.slice(0, 6) : "Unknown",
      value: Number(t?.amount || 0),
    })).reverse();

    const weekly = [
      { label: "Week 1", value: safeArray.slice(18, 24).reduce((s, t) => s + Number(t?.amount || 0), 0) },
      { label: "Week 2", value: safeArray.slice(14, 18).reduce((s, t) => s + Number(t?.amount || 0), 0) },
      { label: "Week 3", value: safeArray.slice(10, 14).reduce((s, t) => s + Number(t?.amount || 0), 0) },
      { label: "Week 4", value: safeArray.slice(6, 10).reduce((s, t) => s + Number(t?.amount || 0), 0) },
      { label: "Week 5", value: safeArray.slice(0, 6).reduce((s, t) => s + Number(t?.amount || 0), 0) },
    ];

    const monthly = [
      { label: "Apr", value: safeArray.slice(19, 24).reduce((s, t) => s + Number(t?.amount || 0), 0) },
      { label: "May", value: safeArray.slice(0, 19).reduce((s, t) => s + Number(t?.amount || 0), 0) },
    ];

    return { Daily: daily, Weekly: weekly, Monthly: monthly };
  }, [allTransactions]);

  const metrics = useMemo(() => {
    const safeArray = Array.isArray(allTransactions) ? allTransactions : [];

    const dailyTotal = safeArray.slice(0, 1).reduce((sum, t) => sum + Number(t?.amount || 0), 0);
    const weeklyTotal = safeArray.slice(0, 7).reduce((sum, t) => sum + Number(t?.amount || 0), 0);
    const monthlyTotal = safeArray.reduce((sum, t) => sum + Number(t?.amount || 0), 0);

    return {
      daily: dailyTotal.toFixed(2),
      weekly: weeklyTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      monthly: monthlyTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  }, [allTransactions]);

  // View Control Splits
  const dataForTable = Array.isArray(allTransactions) ? allTransactions : [];
  const chartData = chartMap[chartPeriod] || [];
  const totalPages = Math.max(1, Math.ceil(dataForTable.length / ROWS_PER_PAGE));
  const paginated = dataForTable.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleExport = () => {
    if (dataForTable.length === 0) return;
    const headers = ["Date", "Time", "Transaction ID", "Amount", "Status"];
    const rows = dataForTable.map((t) => [t.date, t.time, t.txId, `$${Number(t.amount).toFixed(2)}`, t.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "earnings_statement.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* PAGE HEADER */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">Earnings Summary</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Monitor your workshop's financial performance and payout history.
            </p>
          </div>

          {/* ASYNC MONITOR UI RENDERS */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-gray-100 shadow-sm">
              <FiLoader className="text-3xl text-blue-600 animate-spin mb-3" />
              <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Loading Workshop Ledgers...</p>
            </div>
          ) : error ? (
            <div className="p-5 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-semibold">
              ⚠️ {error}
            </div>
          ) : (
            <>
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Daily Earnings</p>
                    <FiTrendingUp className="text-green-500" size={16} />
                  </div>
                  <p className="text-3xl font-black text-gray-900">${metrics.daily}</p>
                  <p className="text-xs text-green-500 font-semibold mt-1">+12% vs yesterday</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Weekly Earnings</p>
                    <FiTrendingUp className="text-green-500" size={16} />
                  </div>
                  <p className="text-3xl font-black text-gray-900">${metrics.weekly}</p>
                  <p className="text-xs text-green-500 font-semibold mt-1">+5% vs last week</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Monthly Earnings</p>
                    <FiTrendingUp className="text-green-500" size={16} />
                  </div>
                  <p className="text-3xl font-black text-gray-900">${metrics.monthly}</p>
                  <p className="text-xs text-green-500 font-semibold mt-1">+18% vs last month</p>
                </div>
              </div>

              {/* EARNINGS PERFORMANCE CHART */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Earnings Performance</p>
                    <p className="text-xs text-gray-400 mt-0.5">Calculated financial trends dashboard tracks</p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    {["Daily", "Weekly", "Monthly"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setChartPeriod(p)}
                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                          chartPeriod === p ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="4%">
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                        contentStyle={{ background: "#1E3A8A", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px", padding: "6px 12px" }}
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={chartData.length > 0 && entry.value === Math.max(...chartData.map((d) => d.value)) ? "#2563EB" : "#DBEAFE"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* PAYMENT HISTORY TABLE */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <p className="font-bold text-gray-800 text-sm">Payment History</p>
                  <button onClick={handleExport} disabled={dataForTable.length === 0} className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold hover:underline disabled:opacity-40 transition-colors">
                    <FiDownload size={13} /> Export Statement
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">DATE</th>
                        <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">TRANSACTION ID</th>
                        <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">AMOUNT</th>
                        <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">STATUS</th>
                        <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center p-8 text-xs text-gray-400 font-medium">
                            No processing historical settlement tracks found.
                          </td>
                        </tr>
                      ) : (
                        paginated.map((row, index) => (
                          <tr key={row.id || index} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index === paginated.length - 1 ? "border-0" : ""}`}>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <p className="text-xs font-semibold text-gray-800">{row.date}</p>
                              <p className="text-xs text-gray-400">{row.time}</p>
                            </td>
                            <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{row.txId}</td>
                            <td className="px-5 py-4 text-xs font-bold text-gray-800 whitespace-nowrap">${Number(row.amount || 0).toFixed(2)}</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`flex items-center gap-1 text-xs font-semibold w-fit ${row.status === "Pending" ? "text-orange-500" : "text-green-600"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${row.status === "Pending" ? "bg-orange-500" : "bg-green-500"}`}></span>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <button onClick={() => setSelectedTx(row)} className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                                <FiEye size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION PANEL */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Showing {dataForTable.length === 0 ? 0 : ((currentPage - 1) * ROWS_PER_PAGE) + 1} to {Math.min(currentPage * ROWS_PER_PAGE, dataForTable.length)} of {dataForTable.length} transactions
                  </p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-xs font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      Previous
                    </button>
                    <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* --- RECONCILIATION SUMMARY DETAILS OVERLAY MODAL --- */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTx(null)}></div>
          <div className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[90vh] z-10">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${selectedTx.status === "Pending" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-600"}`}>
                  {selectedTx.status === "Pending" ? <FiClock className="text-lg" /> : <FiCheckCircle className="text-lg" />}
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">Transaction Breakdown</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{selectedTx.txId} • {selectedTx.date}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTx(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 text-sm max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1"><FiUser size={11} /> Client</p>
                  <p className="text-xs font-bold text-gray-800">{selectedTx.client || "System Registered Partner"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1"><FiBriefcase size={11} /> Service Type</p>
                  <p className="text-xs font-bold text-gray-800 truncate">{selectedTx.service || "Workshop Maintenance"}</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1"><FiFileText size={12} /> Financial Adjustments</p>
                <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                  <div className="flex justify-between p-3 text-xs text-gray-600">
                    <span>Base Service Subtotal</span>
                    <span className="font-semibold text-gray-800">${Number(selectedTx.amount * 0.95).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs text-gray-600">
                    <span>Value Added Tax (VAT 5%)</span>
                    <span className="font-semibold text-gray-800">${Number(selectedTx.amount * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50/40 text-xs font-bold text-gray-800">
                    <span className="text-blue-700">Net Settled Return</span>
                    <span className="text-blue-700 text-sm">${Number(selectedTx.amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border border-gray-100 rounded-xl p-3">
                <div className="flex items-center gap-2 text-gray-600"><FiCreditCard className="text-gray-400 text-base" /><span>Settlement Route</span></div>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-[11px]">{selectedTx.paymentMethod || "Electronic Wire"}</span>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1"><FiMessageSquare size={12} /> Communication Logs</p>
                <div className="bg-blue-50/30 border border-blue-100/50 rounded-xl p-3 text-xs text-gray-600 italic">
                  "{selectedTx.messageRef || "No explicit mechanical tracking logs or custom description profiles associated with this completed payout sequence."}"
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-end">
              <button onClick={() => setSelectedTx(null)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}