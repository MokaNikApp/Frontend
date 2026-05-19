import React, { useState } from "react";
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
  MdLockOpen,
  MdTrendingUp,
  MdAccountBalance,
  MdClose,
} from "react-icons/md";
import { FaGraduationCap, FaAward } from "react-icons/fa";

export default function WalletPayments() {
  // --- STATE FOR INTERACTIVE BUTTON OPERATIONS ---
  const [isReleasingAll, setIsReleasingAll] = useState(false);
  const [row4Status, setRow4Status] = useState("AWAITING RELEASE");
  const [row2Status, setRow2Status] = useState("PROCESSING");
  const [activeReceipt, setActiveReceipt] = useState(null);

  // --- ACTIONS ---
  const handleReleaseAll = () => {
    setIsReleasingAll(true);
    setTimeout(() => {
      setIsReleasingAll(false);
      setRow4Status("PROCESSING");
      alert("All pending payments have been securely initialized for release.");
    }, 1500);
  };

  const handleSingleRelease = () => {
    setRow4Status("PROCESSING");
    alert("Payout protocol initialized for David Chen.");
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5 animate-fade-in">

      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wallet & Payments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor revenue streams and manage mechanic payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert("Filtering by all types")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all active:scale-95 duration-200 shadow-2xs cursor-pointer"
          >
            All Types
          </button>
          <button 
            onClick={() => alert("Timeframe set to last 30 days")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-all active:scale-95 duration-200 cursor-pointer"
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* TOP ANALYTICS METRIC CARDS WITH INTEGRATED WATERMARKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: TOTAL REVENUE */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up">
          {/* Faint Architectural Background Watermark Icon */}
          <MdAccountBalance className="absolute -right-2 -bottom-2 text-slate-100/70 text-7xl pointer-events-none transform -rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-[#0B44A0] mb-3 group-hover:bg-[#0B44A0] group-hover:text-white duration-300 smooth-transition">
              <MdTrendingUp className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-[#0B44A0] duration-300 smooth-transition">
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
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:100ms]">
          {/* Faint Decorative Background Watermark Icon */}
          <MdAccessTime className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none transform rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-amber-500 mb-3 group-hover:bg-amber-500 group-hover:text-white duration-300 smooth-transition">
              <MdAccessTime className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-amber-600 duration-300 smooth-transition">
              $8,240.50
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            12 mechanics awaiting release
          </p>
        </div>

        {/* CARD 3: COMPLETED PAYOUTS */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-32.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:200ms]">
          {/* Faint Badge Background Watermark Icon */}
          <FaAward className="absolute -right-2 -bottom-2 text-slate-100/60 text-7xl pointer-events-none group-hover:scale-110 duration-300 smooth-transition" />
          
          <div>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-3 group-hover:bg-teal-600 group-hover:text-white duration-300 smooth-transition">
              <MdCheckCircle className="text-base" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-teal-600 duration-300 smooth-transition">
              $96,120.25
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
            Processed this year
          </p>
        </div>
      </div>

      {/* CENTRAL COMPACT TRANSACTIONS CARD PANEL */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-sm animate-fade-in [animation-delay:300ms]">
        
        {/* ROW COMPONENT HEADER */}
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <h2 className="font-bold text-sm text-slate-900">
            Recent Transactions
          </h2>
          <div className="flex gap-1.5">
            <button 
              onClick={() => alert("Showing all interaction types")}
              className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 transition-all active:scale-95 duration-150 cursor-pointer"
            >
              All Types
            </button>
            <button 
              onClick={() => alert("Filtering timeline details")}
              className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 transition-all active:scale-95 duration-150 cursor-pointer"
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* COMPACT DATA MATRIX TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-150">
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
              <tr className="hover:bg-slate-50/40 transition-colors duration-150">
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
                  <button 
                    onClick={() => alert("Elena Rodriguez: Option Menu Opened.")}
                    className="text-slate-400 hover:text-slate-600 p-1 transition-transform active:scale-90 duration-150 cursor-pointer"
                  >
                    <MdMoreVert className="text-base" />
                  </button>
                </td>
              </tr>

              {/* ROW 2 */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150">
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
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide duration-300 transition-colors ${
                    row2Status === "PROCESSING" ? "bg-blue-50 text-[#0B44A0]" : "bg-[#ECFFF4] text-[#00612D]"
                  }`}>
                    {row2Status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button 
                    onClick={() => setActiveReceipt({ name: "Marco Silva", amount: "$1,200.00", date: "Oct 23, 2023", id: "TXN-84205" })}
                    className="text-[#0B44A0] hover:underline hover:text-blue-800 text-[11px] font-bold active:scale-95 duration-150 cursor-pointer"
                  >
                    View Receipt
                  </button>
                </td>
              </tr>

              {/* ROW 3 */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150">
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
                  <button 
                    onClick={() => alert("Thomas H.: Option Menu Opened.")}
                    className="text-slate-400 hover:text-slate-600 p-1 transition-transform active:scale-90 duration-150 cursor-pointer"
                  >
                    <MdMoreVert className="text-base" />
                  </button>
                </td>
              </tr>

              {/* ROW 4 */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150">
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
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide duration-300 transition-colors ${
                    row4Status === "AWAITING RELEASE" ? "bg-[#FFF4E5] text-[#B25E00]" : "bg-blue-50 text-[#0B44A0] animate-pulse"
                  }`}>
                    {row4Status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  {row4Status === "AWAITING RELEASE" ? (
                    <button 
                      onClick={handleSingleRelease}
                      className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1 rounded-md text-[11px] font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                    >
                      Release Now
                    </button>
                  ) : (
                    <button 
                      onClick={() => setActiveReceipt({ name: "David Chen", amount: "$750.40", date: "Oct 22, 2023", id: "TXN-75040" })}
                      className="text-[#0B44A0] hover:underline hover:text-blue-800 text-[11px] font-bold active:scale-95 duration-150 cursor-pointer"
                    >
                      View Receipt
                    </button>
                  )}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* COMPACT STYLIZED PAGINATION FOOTER */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
          <p className="font-medium">Showing <span className="font-bold text-slate-700">4</span> of <span className="font-bold text-slate-700">1,248</span> transactions</p>

          <div className="flex items-center gap-1">
            <button onClick={() => alert("Navigating to previous transaction logs")} className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer">‹</button>
            <button className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#0B44A0] text-white shadow-xs">1</button>
            <button onClick={() => alert("Navigating to ledger page 2")} className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors active:scale-90 cursor-pointer">2</button>
            <button onClick={() => alert("Navigating to ledger page 3")} className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors active:scale-90 cursor-pointer">3</button>
            <button onClick={() => alert("Navigating to next transaction logs")} className="w-6 h-6 rounded flex items-center justify-center font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200/60 active:scale-90 cursor-pointer">›</button>
          </div>
        </div>

      </div>

      {/* BOTTOM LAYOUT BLOCKS: ACTIONS & DATA PROJECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* LEFT COLUMN: PENDING PAYOUT RELEASE (Solid Dark Blue Theme) */}
        <div className="md:col-span-2 bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-4 animate-slide-up [animation-delay:400ms]">
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

          <button 
            onClick={handleReleaseAll}
            disabled={isReleasingAll}
            className="w-full bg-white text-[#0B44A0] hover:bg-blue-50 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] shadow-sm tracking-wider cursor-pointer disabled:opacity-80 disabled:cursor-wait"
          >
            {isReleasingAll ? (
              <div className="w-4 h-4 border-2 border-[#0B44A0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdLockOpen className="text-sm" />
            )}
            {isReleasingAll ? "PROCESSING RELEASE..." : "RELEASE ALL PAYMENTS"}
          </button>
        </div>

        {/* RIGHT COLUMN: REVENUE PROJECTION (Soft Shaded Base Background Chart Frame) */}
        <div className="md:col-span-3 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4 animate-slide-up [animation-delay:500ms]">

          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Revenue Projection</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Estimated growth for Q4 2023</p>
            </div>

            <div className="flex gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[#0B44A0] rounded-full animate-pulse"></span>
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
              <div key={i} className="flex flex-col items-center justify-end h-full w-14 relative group mx-0.5 sm:mx-1">
                {/* Visual Data Column Block with Height Transition */}
                <div 
                  className={`w-full ${color} rounded-t-md transition-all duration-1000 relative animate-grow-y cursor-pointer hover:brightness-95`} 
                  style={{ height, animationDelay: `${i * 75}ms` }}
                >
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

            <button 
              onClick={() => alert("Downloading Full Matrix Report Summary Data Bundle...")}
              className="text-[#0B44A0] hover:underline text-[11px] font-bold tracking-tight transition-transform active:translate-x-0.5 duration-150 cursor-pointer"
            >
              Full Projection Report →
            </button>
          </div>

        </div>

      </div>

      {/* --- LIGHTWEIGHT OVERLAY MODAL FOR VIEW RECEIPT HANDLERS --- */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-sm w-full p-5 space-y-4 animate-scale-up relative">
            <button 
              onClick={() => setActiveReceipt(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
            >
              <MdClose className="text-lg" />
            </button>
            <div className="text-center border-b border-dashed border-slate-200 pb-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Transaction Receipt</p>
              <h4 className="text-2xl font-bold text-slate-900 mt-1">{activeReceipt.amount}</h4>
              <span className="inline-block bg-slate-50 text-slate-400 text-[10px] px-2 py-0.5 font-mono rounded mt-1">{activeReceipt.id}</span>
            </div>
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between"><span>Recipient:</span><span className="text-slate-900 font-bold">{activeReceipt.name}</span></div>
              <div className="flex justify-between"><span>Date Logged:</span><span className="text-slate-900">{activeReceipt.date}</span></div>
              <div className="flex justify-between"><span>Method:</span><span className="text-slate-900">Direct Account Settlement</span></div>
            </div>
            <button 
              onClick={() => { alert("Receipt saved locally."); setActiveReceipt(null); }}
              className="w-full bg-[#0B44A0] hover:bg-blue-800 text-white text-xs font-bold py-2 rounded-lg shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              Download PDF Ledger
            </button>
          </div>
        </div>
      )}

      {/* REUSABLE MOTION KEYFRAMES BLOCK */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes growY {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }
        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-up { animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-grow-y { animation: growY 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .smooth-transition { transition-property: all; cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

    </div>
  );
}