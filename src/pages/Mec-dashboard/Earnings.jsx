import { useState } from "react";
import { FiTrendingUp, FiDownload, FiEye } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const allTransactions = [
  { id: 1,  date: "Jun 02, 2024", time: "10:45 AM", txId: "#TRX-948562", amount: 145.00,  status: "Pending" },
  { id: 2,  date: "May 31, 2024", time: "03:20 PM", txId: "#TRX-827411", amount: 340.20,  status: "Paid" },
  { id: 3,  date: "May 29, 2024", time: "09:05 AM", txId: "#TRX-719482", amount: 210.00,  status: "Paid" },
  { id: 4,  date: "May 28, 2024", time: "06:50 PM", txId: "#TRX-662361", amount: 550.00,  status: "Paid" },
  { id: 5,  date: "May 26, 2024", time: "11:10 AM", txId: "#TRX-601245", amount: 180.00,  status: "Paid" },
  { id: 6,  date: "May 24, 2024", time: "02:30 PM", txId: "#TRX-589034", amount: 420.00,  status: "Paid" },
  { id: 7,  date: "May 22, 2024", time: "08:15 AM", txId: "#TRX-574812", amount: 95.00,   status: "Paid" },
  { id: 8,  date: "May 21, 2024", time: "04:00 PM", txId: "#TRX-561290", amount: 310.00,  status: "Paid" },
  { id: 9,  date: "May 19, 2024", time: "01:45 PM", txId: "#TRX-548731", amount: 650.00,  status: "Paid" },
  { id: 10, date: "May 17, 2024", time: "10:00 AM", txId: "#TRX-534120", amount: 275.00,  status: "Paid" },
  { id: 11, date: "May 15, 2024", time: "03:55 PM", txId: "#TRX-521843", amount: 490.00,  status: "Paid" },
  { id: 12, date: "May 14, 2024", time: "09:30 AM", txId: "#TRX-510674", amount: 130.00,  status: "Paid" },
  { id: 13, date: "May 12, 2024", time: "02:20 PM", txId: "#TRX-498302", amount: 380.00,  status: "Paid" },
  { id: 14, date: "May 10, 2024", time: "11:40 AM", txId: "#TRX-487651", amount: 220.00,  status: "Paid" },
  { id: 15, date: "May 08, 2024", time: "08:50 AM", txId: "#TRX-475029", amount: 315.00,  status: "Paid" },
  { id: 16, date: "May 07, 2024", time: "05:10 PM", txId: "#TRX-463418", amount: 175.00,  status: "Paid" },
  { id: 17, date: "May 05, 2024", time: "01:00 PM", txId: "#TRX-451807", amount: 560.00,  status: "Paid" },
  { id: 18, date: "May 03, 2024", time: "10:25 AM", txId: "#TRX-440196", amount: 90.00,   status: "Paid" },
  { id: 19, date: "May 01, 2024", time: "03:40 PM", txId: "#TRX-428585", amount: 430.00,  status: "Paid" },
  { id: 20, date: "Apr 29, 2024", time: "09:55 AM", txId: "#TRX-416974", amount: 260.00,  status: "Paid" },
  { id: 21, date: "Apr 27, 2024", time: "02:10 PM", txId: "#TRX-405363", amount: 345.00,  status: "Paid" },
  { id: 22, date: "Apr 25, 2024", time: "11:30 AM", txId: "#TRX-393752", amount: 510.00,  status: "Paid" },
  { id: 23, date: "Apr 23, 2024", time: "04:45 PM", txId: "#TRX-382141", amount: 195.00,  status: "Paid" },
  { id: 24, date: "Apr 21, 2024", time: "08:00 AM", txId: "#TRX-370530", amount: 420.00,  status: "Paid" },
];

// Build chart data from actual transaction amounts
const dailyData = allTransactions.slice(0, 6).map((t) => ({
  label: t.date.slice(0, 6),
  value: t.amount,
})).reverse();

const weeklyData = [
  { label: "Week 1", value: allTransactions.slice(18, 24).reduce((s, t) => s + t.amount, 0) },
  { label: "Week 2", value: allTransactions.slice(14, 18).reduce((s, t) => s + t.amount, 0) },
  { label: "Week 3", value: allTransactions.slice(10, 14).reduce((s, t) => s + t.amount, 0) },
  { label: "Week 4", value: allTransactions.slice(6, 10).reduce((s, t) => s + t.amount, 0) },
  { label: "Week 5", value: allTransactions.slice(0, 6).reduce((s, t) => s + t.amount, 0) },
];

const monthlyData = [
  { label: "Apr", value: allTransactions.slice(19, 24).reduce((s, t) => s + t.amount, 0) },
  { label: "May", value: allTransactions.slice(0, 19).reduce((s, t) => s + t.amount, 0) },
];

const chartMap = { Daily: dailyData, Weekly: weeklyData, Monthly: monthlyData };

const ROWS_PER_PAGE = 4;

export default function Earnings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [chartPeriod, setChartPeriod] = useState("Weekly");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredBar, setHoveredBar] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const chartData = chartMap[chartPeriod];
  const totalPages = Math.ceil(allTransactions.length / ROWS_PER_PAGE);
  const paginated = allTransactions.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleExport = () => {
    const headers = ["Date", "Time", "Transaction ID", "Amount", "Status"];
    const rows = allTransactions.map((t) => [t.date, t.time, t.txId, `$${t.amount.toFixed(2)}`, t.status]);
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
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen overflow-hidden">

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
      />

      <div className="flex-1 overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} />

        <div className="p-4 sm:p-6">

          {/* PAGE HEADER */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">Earnings Summary</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Monitor your workshop's financial performance and payout history.
            </p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Daily Earnings</p>
                <FiTrendingUp className="text-green-500" size={16} />
              </div>
              <p className="text-3xl font-black text-gray-900">$145.00</p>
              <p className="text-xs text-green-500 font-semibold mt-1">+12% vs yesterday</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Weekly Earnings</p>
                <FiTrendingUp className="text-green-500" size={16} />
              </div>
              <p className="text-3xl font-black text-gray-900">$1,240.50</p>
              <p className="text-xs text-green-500 font-semibold mt-1">+5% vs last week</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Monthly Earnings</p>
                <FiTrendingUp className="text-green-500" size={16} />
              </div>
              <p className="text-3xl font-black text-gray-900">$4,850.00</p>
              <p className="text-xs text-green-500 font-semibold mt-1">+18% vs last month</p>
            </div>
          </div>

          {/* EARNINGS PERFORMANCE CHART */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="font-bold text-gray-800 text-sm">Earnings Performance</p>
                <p className="text-xs text-gray-400 mt-0.5">Revenue over the last 30 days</p>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                {["Daily", "Weekly", "Monthly"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      chartPeriod === p
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 h-52 outline-none">
              <ResponsiveContainer width="100%" height="100%" style={{ outline: "none" }}>
                <BarChart
                  data={chartData}
                  barCategoryGap="4%"
                  margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
                  style={{ outline: "none" }}
                >
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    contentStyle={{
                      background: "#1E3A8A",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                      padding: "6px 12px",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
                  />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    onMouseEnter={(_, index) => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{ outline: "none" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.value === Math.max(...chartData.map((d) => d.value))
                            ? "#2563EB"
                            : "#DBEAFE"
                        }
                        style={{ outline: "none" }}
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
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold hover:underline transition-colors"
              >
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
                  {paginated.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index === paginated.length - 1 ? "border-0" : ""
                      }`}
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-xs font-semibold text-gray-800">{row.date}</p>
                        <p className="text-xs text-gray-400">{row.time}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{row.txId}</td>
                      <td className="px-5 py-4 text-xs font-bold text-gray-800 whitespace-nowrap">
                        ${row.amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`flex items-center gap-1 text-xs font-semibold w-fit ${
                          row.status === "Pending" ? "text-orange-500" : "text-green-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            row.status === "Pending" ? "bg-orange-500" : "bg-green-500"
                          }`}></span>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FiEye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {((currentPage - 1) * ROWS_PER_PAGE) + 1} to{" "}
                {Math.min(currentPage * ROWS_PER_PAGE, allTransactions.length)} of{" "}
                {allTransactions.length} transactions
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}