import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdCalendarToday,
  MdFileDownload,
  MdAdd,
  MdFlashOn,
  MdBuild,
  MdSettings,
  MdSync,
  MdAssignment,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function UsersBookings() {
  // --- STATE FOR INTERACTIVE OPERATIONS ---
  const [activeTab, setActiveTab] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortByDropdown, setSortByDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- MOCK LOG DATA FOR INTERACTION MATCHES ---
  const bookingData = [
    { id: "JS-01", name: "James Sullivan", vehicle: "Tesla Model 3 • 2021", initials: "JS", mechanic: "Marcus Chen", img: "/images/ub1.png", type: "Electrical Diagnostic", icon: <MdFlashOn className="text-xs" />, date: "Oct 24, 2023", time: "10:30 AM", status: "ACTIVE", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#ECFFF4] text-[#00612D]" },
    { id: "LW-02", name: "Linda White", vehicle: "BMW X5 • 2019", initials: "LW", mechanic: "Robert Taylor", img: "/images/ub2.png", type: "Oil Change", icon: <MdBuild className="text-[11px]" />, date: "Oct 25, 2023", time: "02:00 PM", status: "PENDING", bg: "bg-slate-100 text-slate-500 border-slate-200/50", badge: "bg-[#FFF4E5] text-[#B25E00]" },
    { id: "DK-03", name: "David Kim", vehicle: "Toyota Camry • 2022", initials: "DK", mechanic: "Sarah Lopez", img: "/images/ub3.png", type: "Brake Repair", icon: <MdSettings className="text-xs" />, date: "Oct 23, 2023", time: "09:15 AM", status: "COMPLETED", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#EAF1FF] text-[#0B44A0]" },
    { id: "EM-04", name: "Elena Moretti", vehicle: "Audi Q7 • 2020", initials: "EM", mechanic: "Not Assigned", img: null, type: "Tire Rotation", icon: <MdSync className="text-xs" />, date: "Oct 26, 2023", time: "11:00 AM", status: "CANCELLED", bg: "bg-rose-50 text-rose-600 border-rose-100", badge: "bg-[#FEECEB] text-[#BC1C1C]" },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5 animate-fade-in">

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Bookings Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview and management of all automotive service appointments across the MokaNik network.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert("Generating full bookings system log file distribution report...")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer"
          >
            <MdFileDownload className="text-base text-slate-500" /> Export Report
          </button>
          <button 
            onClick={() => alert("Opening secure scheduling suite setup for a new client entry...")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <MdAdd className="text-base" /> New Booking
          </button>
        </div>
      </div>

      {/* FILTER NAVIGATION & SORT ELEMENT BAR */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {["All", "Pending", "Active", "Completed", "Cancelled"].map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                activeTab === tab
                  ? "bg-[#0B44A0] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto relative">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">SORT BY:</span>
          <button 
            onClick={() => setSortByDropdown(!sortByDropdown)}
            className="bg-white border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold flex items-center gap-1 text-xs shadow-2xs hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
          >
            Date (Newest) <MdKeyboardArrowDown className={`text-slate-400 text-sm transition-transform duration-200 ${sortByDropdown ? "rotate-180" : ""}`} />
          </button>
          
          {sortByDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-100 rounded-lg shadow-lg z-20 py-1 text-xs font-semibold text-slate-600 min-w-36 animate-scale-up">
              <div onClick={() => { setSortByDropdown(false); alert("Sorting adjusted: Newest First."); }} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-[#0B44A0]">Date (Newest)</div>
              <div onClick={() => { setSortByDropdown(false); alert("Sorting adjusted: Oldest First."); }} className="px-3 py-2 hover:bg-slate-50 cursor-pointer">Date (Oldest)</div>
              <div onClick={() => { setSortByDropdown(false); alert("Sorting adjusted: Order Status Alpha."); }} className="px-3 py-2 hover:bg-slate-50 cursor-pointer">Status Profile</div>
            </div>
          )}
        </div>
      </div>

      {/* MANAGEMENT CENTRAL DATA TABLE */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-175">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
              <tr>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Mechanic Assigned</th>
                <th className="px-5 py-3.5">Service Type</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">

              {/* ROW 1: JAMES SULLIVAN */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAF1FF] text-[#0B44A0] flex items-center justify-center font-bold text-xs border border-blue-100/40 shrink-0">
                      JS
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">James Sullivan</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Tesla Model 3 • 2021</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <img src="/images/ub1.png" alt="" className="w-6 h-6 rounded-full object-cover border border-slate-100 shadow-3xs" />
                    <span className="font-semibold text-slate-800">Marcus Chen</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-1 rounded-md text-[11px] font-semibold transition-transform duration-200 hover:scale-102">
                    <MdFlashOn className="text-xs" /> Electrical Diagnostic
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900 leading-none">Oct 24, 2023</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">10:30 AM</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="bg-[#ECFFF4] text-[#00612D] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide select-none inline-block shadow-3xs">
                    ACTIVE
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button 
                    onClick={() => setSelectedBooking(bookingData[0])}
                    className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                  >
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 2: LINDA WHITE */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up [animation-delay:75ms]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs border border-slate-200/50 shrink-0">
                      LW
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">Linda White</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">BMW X5 • 2019</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <img src="/images/ub2.png" alt="" className="w-6 h-6 rounded-full object-cover border border-slate-100 shadow-3xs" />
                    <span className="font-semibold text-slate-800">Robert Taylor</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-transform duration-200 hover:scale-102">
                    <MdBuild className="text-[11px]" /> Oil Change
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900 leading-none">Oct 25, 2023</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">02:00 PM</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="bg-[#FFF4E5] text-[#B25E00] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide select-none inline-block shadow-3xs">
                    PENDING
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button 
                    onClick={() => setSelectedBooking(bookingData[1])}
                    className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                  >
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 3: DAVID KIM */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up [animation-delay:150ms]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAF1FF] text-[#0B44A0] flex items-center justify-center font-bold text-xs border border-blue-100/40 shrink-0">
                      DK
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">David Kim</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Toyota Camry • 2022</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <img src="/images/ub3.png" alt="" className="w-6 h-6 rounded-full object-cover border border-slate-100 shadow-3xs" />
                    <span className="font-semibold text-slate-800">Sarah Lopez</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-1 rounded-md text-[11px] font-semibold transition-transform duration-200 hover:scale-102">
                    <MdSettings className="text-xs" /> Brake Repair
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900 leading-none">Oct 23, 2023</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">09:15 AM</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide select-none inline-block shadow-3xs">
                    COMPLETED
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button 
                    onClick={() => setSelectedBooking(bookingData[2])}
                    className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                  >
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 4: ELENA MORETTI */}
              <tr className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up [animation-delay:225ms]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-100 shrink-0">
                      EM
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">Elena Moretti</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Audi Q7 • 2020</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-slate-400 font-medium italic select-none">Not Assigned</span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-transform duration-200 hover:scale-102">
                    <MdSync className="text-xs" /> Tire Rotation
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900 leading-none">Oct 26, 2023</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">11:00 AM</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="bg-[#FEECEB] text-[#BC1C1C] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide select-none inline-block shadow-3xs">
                    CANCELLED
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button 
                    onClick={() => setSelectedBooking(bookingData[3])}
                    className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                  >
                    View Detail
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
          <p className="font-medium">Showing <span className="font-bold text-slate-700">1 to 4</span> of <span className="font-bold text-slate-700">24</span> entries</p>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => { if(currentPage > 1) setCurrentPage(currentPage - 1); alert("Navigating to previous entries page..."); }}
              className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
            >
              <MdChevronLeft className="text-base" />
            </button>
            <button onClick={() => setCurrentPage(1)} className={`w-6 h-6 rounded-md flex items-center justify-center font-bold transition-all ${currentPage === 1 ? "bg-[#0B44A0] text-white shadow-xs" : "bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100 cursor-pointer"}`}>1</button>
            <button onClick={() => { setCurrentPage(2); alert("Navigating to pagination track index 2..."); }} className={`w-6 h-6 rounded-md flex items-center justify-center font-bold transition-all ${currentPage === 2 ? "bg-[#0B44A0] text-white shadow-xs" : "bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100 cursor-pointer"}`}>2</button>
            <button onClick={() => { setCurrentPage(3); alert("Navigating to pagination track index 3..."); }} className={`w-6 h-6 rounded-md flex items-center justify-center font-bold transition-all ${currentPage === 3 ? "bg-[#0B44A0] text-white shadow-xs" : "bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100 cursor-pointer"}`}>3</button>
            <button 
              onClick={() => { if(currentPage < 3) setCurrentPage(currentPage + 1); alert("Navigating to next entries page..."); }}
              className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
            >
              <MdChevronRight className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* STATS ANALYTICS LOWER CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: TOTAL BOOKINGS THIS MONTH */}
        <div className="bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-35 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:300ms]">
          <MdCalendarToday className="absolute -right-3 -bottom-3 text-white/5 text-7xl pointer-events-none transform rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          <div className="flex justify-between items-start w-full relative z-10">
            <MdCalendarToday className="text-xl text-blue-100/90 group-hover:scale-110 duration-300 smooth-transition" />
            <span className="bg-white/10 text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider select-none">
              Month
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition">128</p>
            <p className="text-xs text-blue-100/80 font-medium mt-0.5">Total Bookings this month</p>
          </div>
        </div>

        {/* CARD 2: BOOKINGS NEEDING ASSIGNMENT */}
        <div className="bg-[#EAF1FF]/70 border border-blue-100/30 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:375ms]">
          <MdAssignment className="absolute -right-3 -bottom-3 text-[#0B44A0]/5 text-7xl pointer-events-none transform -rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          <div className="flex justify-between items-start w-full relative z-10">
            <MdAssignment className="text-xl text-[#0B44A0] group-hover:scale-110 duration-300 smooth-transition" />
            <span className="bg-blue-100 text-[#0B44A0] text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold select-none shadow-3xs">
              Alert
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition text-[#0B44A0]">08</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Bookings needing assignment</p>
          </div>
        </div>

        {/* CARD 3: CUSTOMER SATISFACTION RATE */}
        <div className="bg-white border border-slate-100 shadow-xs p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:450ms]">
          <FaStar className="absolute -right-3 -bottom-3 text-amber-500/5 text-7xl pointer-events-none group-hover:scale-110 duration-300 smooth-transition" />
          <div className="flex justify-between items-start w-full relative z-10">
            <FaStar className="text-amber-500 text-lg group-hover:rotate-12 duration-300 smooth-transition" />
            <span className="text-amber-600 font-bold text-xs tracking-tight mt-0.5 select-none bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
              4.9/5.0
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition text-amber-500">94%</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Customer satisfaction rate</p>
          </div>
        </div>

      </div>

      {/* --- LIGHTWEIGHT DETAIL MODAL OVERLAY FOR ACTION MATRIX --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-sm w-full p-5 space-y-4 animate-scale-up relative">
            <button 
              onClick={() => setSelectedBooking(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md transition-colors"
            >
              <MdClose className="text-lg" />
            </button>
            
            <div className="text-center border-b border-dashed border-slate-200 pb-3 flex flex-col items-center">
              {selectedBooking.img ? (
                <img src={selectedBooking.img} alt="" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-blue-100 shadow-sm" />
              ) : (
                <div className={`w-12 h-12 rounded-full ${selectedBooking.bg} flex items-center justify-center font-bold text-sm mb-2 shadow-sm`}>
                  {selectedBooking.initials}
                </div>
              )}
              <h4 className="text-base font-bold text-slate-900">{selectedBooking.name}</h4>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">{selectedBooking.vehicle}</p>
            </div>

            <div className="space-y-2.5 text-xs font-medium text-slate-600">
              <div className="flex justify-between items-center">
                <span>Assigned Pro:</span>
                <span className="text-slate-900 font-bold">{selectedBooking.mechanic}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Service Spec:</span>
                <span className="text-[#0B44A0] font-semibold">{selectedBooking.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Target Timeline:</span>
                <span className="text-slate-900 font-medium">{selectedBooking.date} • {selectedBooking.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>System Status:</span>
                <span className={`${selectedBooking.badge} px-2 py-0.5 rounded text-[9px] font-bold shadow-3xs`}>{selectedBooking.status}</span>
              </div>
            </div>

            <button 
              onClick={() => { alert(`Protocol verification complete for entry token: ${selectedBooking.id}`); setSelectedBooking(null); }}
              className="w-full bg-[#0B44A0] hover:bg-blue-800 text-white text-xs font-bold py-2.5 rounded-lg shadow-2xs active:scale-98 transition-all cursor-pointer tracking-wide"
            >
              Update Record File
            </button>
          </div>
        </div>
      )}

      {/* MOTION COMPONENT KEYFRAMES INLINE FRAMEWORK */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-up { animation: scaleUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .smooth-transition { transition-property: all; cubic-bezier(0.4, 0, 0.2, 1); }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}