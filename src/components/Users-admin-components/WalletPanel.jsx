import {
  MdDownload,
  MdPayments,
  MdCheckCircle,
  MdAccessTime,
  MdArrowDownward,
  MdArrowUpward,
  MdMoreVert,
  MdVerified,
  MdAccountBalanceWallet,
  MdLock,
  MdTrendingUp,
  MdAccountBalance,
} from "react-icons/md";
import { FaGraduationCap, FaAward } from "react-icons/fa";

export default function WalletPayments() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5">

      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wallet & Payments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor revenue streams and manage mechanic payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs">
            All Types
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors">
            Last 30 Days
          </button>
        </div>
      </div>

      {/* TOP ANALYTICS METRIC CARDS WITH INTEGRATED WATERMARKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: TOTAL REVENUE */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5">
          {/* Faint Architectural Background Watermark Icon */}
          <MdAccountBalance className="absolute -right-2 -bottom-2 text-slate-100/70 text-7xl pointer-events-none transform -rotate-12" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-[#0B44A0] mb-3">
              <MdTrendingUp className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              $124,592.00
            </h2>
          </div>
          <div className="mt-2.5 relative z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ECFFF4] text-[#00612D] text-[10px] font-bold rounded-full">
              ↑ 12.5% vs last month
            </span>
          </div>
        </div>

        {/* CARD 2: PENDING PAYOUTS */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5">
          {/* Faint Decorative Background Watermark Icon */}
          <MdAccessTime className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none transform rotate-12" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-amber-500 mb-3">
              <MdAccessTime className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              $8,240.50
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            12 mechanics awaiting release
          </p>
        </div>

        {/* CARD 3: COMPLETED PAYOUTS */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5">
          {/* Faint Badge Background Watermark Icon */}
          <FaAward className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-3">
              <MdCheckCircle className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              $96,120.25
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            Processed this year
          </p>
        </div>
      </div>

      {/* CENTRAL COMPACT TRANSACTIONS CARD PANEL */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* ROW COMPONENT HEADER */}
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <h2 className="font-bold text-sm text-slate-900">
            Recent Transactions
          </h2>
          <div className="flex gap-1.5">
            <button className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 transition-colors">
              All Types
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 transition-colors">
              Last 30 Days
            </button>
          </div>
        </div>

        {/* COMPACT DATA MATRIX TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">

              {/* ROW 1 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span className="bg-emerald-50 p-1.5 rounded-lg shrink-0">
                      <MdArrowDownward className="text-emerald-600 text-xs" />
                    </span>
                    Payment
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src="/images/wallet1.png" alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 leading-none">Elena Rodriguez</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Customer</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-normal">Oct 24, 2023</td>
                <td className="px-5 py-3.5 font-bold text-slate-900">$245.00</td>
                <td className="px-5 py-3.5">
                  <span className="bg-[#ECFFF4] text-[#00612D] px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    SUCCESSFUL
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MdMoreVert className="text-base" />
                  </button>
                </td>
              </tr>

              {/* ROW 2 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span className="bg-blue-50 p-1.5 rounded-lg shrink-0">
                      <MdArrowUpward className="text-[#0B44A0] text-xs" />
                    </span>
                    Payout
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src="/images/wallet2.png" alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 leading-none">Marco Silva</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Mechanic</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-normal">Oct 23, 2023</td>
                <td className="px-5 py-3.5 font-bold text-slate-900">$1,200.00</td>
                <td className="px-5 py-3.5">
                  <span className="bg-[#EAF1FF] text-[#0B44A0] px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    PROCESSING
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-[#0B44A0] hover:underline text-[11px] font-bold">
                    View Receipt
                  </button>
                </td>
              </tr>

              {/* ROW 3 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span className="bg-emerald-50 p-1.5 rounded-lg shrink-0">
                      <MdArrowDownward className="text-emerald-600 text-xs" />
                    </span>
                    Payment
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">
                      TH
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">Thomas H.</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Customer</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-normal">Oct 23, 2023</td>
                <td className="px-5 py-3.5 font-bold text-slate-900">$89.00</td>
                <td className="px-5 py-3.5">
                  <span className="bg-[#ECFFF4] text-[#00612D] px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    SUCCESSFUL
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MdMoreVert className="text-base" />
                  </button>
                </td>
              </tr>

              {/* ROW 4 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span className="bg-blue-50 p-1.5 rounded-lg shrink-0">
                      <MdArrowUpward className="text-[#0B44A0] text-xs" />
                    </span>
                    Payout
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src="/images/wallet3.png" alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 leading-none">David Chen</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Mechanic</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-normal">Oct 22, 2023</td>
                <td className="px-5 py-3.5 font-bold text-slate-900">$750.40</td>
                <td className="px-5 py-3.5">
                  <span className="bg-[#FFF4E5] text-[#B25E00] px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    AWAITING RELEASE
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1 rounded-md text-[11px] font-bold transition-colors shadow-2xs">
                    Release Now
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* COMPACT STYLIZED PAGINATION FOOTER */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white">
          <p className="font-medium">Showing <span className="font-bold text-slate-700">4</span> of <span className="font-bold text-slate-700">1,248</span> transactions</p>

          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200/60">‹</button>
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#0B44A0] text-white shadow-xs">1</button>
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">2</button>
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">3</button>
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200/60">›</button>
          </div>
        </div>

      </div>

      {/* BOTTOM LAYOUT BLOCKS: ACTIONS & DATA PROJECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* LEFT COLUMN: PENDING PAYOUT RELEASE (Solid Dark Blue Theme) */}
        <div className="md:col-span-2 bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h2 className="font-bold text-base tracking-tight text-white">
              Pending Payout Release
            </h2>
            <p className="text-xs text-blue-100/90 leading-relaxed font-medium pr-12">
              There are currently 12 mechanics with verified completed services ready for payout totaling $8,240.50.
            </p>
          </div>

          <div className="space-y-2">
            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdVerified className="text-base text-blue-200" /> Verified Mechanics
              </span>
              <span className="font-bold text-sm">12</span>
            </div>

            <div className="bg-white/10 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-semibold border border-white/5">
              <span className="flex items-center gap-2 opacity-95">
                <MdAccountBalanceWallet className="text-base text-blue-200" /> Total Amount
              </span>
              <span className="font-bold text-sm">$8,240.50</span>
            </div>
          </div>

          <button className="w-full bg-white text-[#0B44A0] hover:bg-blue-50 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-colors shadow-sm tracking-wider">
            <MdLock className="text-sm" /> RELEASE ALL PAYMENTS
          </button>
        </div>

        {/* RIGHT COLUMN: REVENUE PROJECTION (Soft Shaded Base Background Chart Frame) */}
        <div className="md:col-span-3 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">

          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Revenue Projection</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Estimated growth for Q4 2023</p>
            </div>

            <div className="flex gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[#0B44A0] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
            </div>
          </div>

          {/* REVENUE GRAPH PANEL CONTAINER */}
          <div className="bg-[#EAF1FF]/60 rounded-xl px-4 pt-4 pb-2 h-36 flex items-end justify-between border border-blue-100/20">
            {[
              ["JUL", "40%", "bg-[#CAD4E6]"],
              ["AUG", "55%", "bg-[#CAD4E6]"],
              ["SEP", "45%", "bg-[#CAD4E6]"],
              ["OCT", "65%", "bg-[#CAD4E6]"],
              ["NOV", "60%", "bg-[#CAD4E6]"],
              ["DEC", "82%", "bg-[#0B44A0]"],
              ["JAN", "65%", "bg-[#CAD4E6]"],
            ].map(([month, height, color], i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full w-14 relative group">
                {/* Visual Data Column Block */}
                <div className={`w-full ${color} rounded-t-md transition-all duration-300 relative`} style={{ height }}>
                  {/* Superimposed Month Text At Base inside the bar container as seen in reference */}
                  <span className={`absolute bottom-1 left-0 right-0 text-center text-[9px] font-bold tracking-tight ${month === "DEC" ? "text-white" : "text-slate-500"}`}>
                    {month}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* LOWER METRICS GRID ROW */}
          <div className="flex justify-between items-center pt-1 text-xs">
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Predicted</p>
              <p className="font-bold text-slate-900 text-sm">$14,500.00</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidence</p>
              <p className="text-emerald-600 font-bold text-sm">92%</p>
            </div>

            <button className="text-[#0B44A0] hover:underline text-[11px] font-bold tracking-tight">
              Full Projection Report →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}