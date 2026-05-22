import React, { useState, useMemo } from "react";
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
  // --- EXTENDED LIVE DATASET ---
  const [bookings, setBookings] = useState([
    { id: "JS-01", name: "James Sullivan", vehicle: "Tesla Model 3 • 2021", initials: "JS", mechanic: "Marcus Chen", img: "/images/ub1.png", type: "Electrical Diagnostic", serviceIcon: "flash", date: "2023-10-24", time: "10:30 AM", status: "ACTIVE", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#ECFFF4] text-[#00612D]" },
    { id: "LW-02", name: "Linda White", vehicle: "BMW X5 • 2019", initials: "LW", mechanic: "Robert Taylor", img: "/images/ub2.png", type: "Oil Change", serviceIcon: "build", date: "2023-10-25", time: "02:00 PM", status: "PENDING", bg: "bg-slate-100 text-slate-500 border-slate-200/50", badge: "bg-[#FFF4E5] text-[#B25E00]" },
    { id: "DK-03", name: "David Kim", vehicle: "Toyota Camry • 2022", initials: "DK", mechanic: "Sarah Lopez", img: "/images/ub3.png", type: "Brake Repair", serviceIcon: "settings", date: "2023-10-23", time: "09:15 AM", status: "COMPLETED", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#EAF1FF] text-[#0B44A0]" },
    { id: "EM-04", name: "Elena Moretti", vehicle: "Audi Q7 • 2020", initials: "EM", mechanic: "Not Assigned", img: null, type: "Tire Rotation", serviceIcon: "sync", date: "2023-10-26", time: "11:00 AM", status: "CANCELLED", bg: "bg-rose-50 text-rose-600 border-rose-100", badge: "bg-[#FEECEB] text-[#BC1C1C]" },
    { id: "BH-05", name: "Brandon Hall", vehicle: "Ford F-150 • 2018", initials: "BH", mechanic: "Marcus Chen", img: null, type: "Brake Repair", serviceIcon: "settings", date: "2023-10-27", time: "08:00 AM", status: "PENDING", bg: "bg-slate-100 text-slate-500 border-slate-200/50", badge: "bg-[#FFF4E5] text-[#B25E00]" },
    { id: "SR-06", name: "Susan Rogers", vehicle: "Honda Civic • 2020", initials: "SR", mechanic: "Sarah Lopez", img: null, type: "Oil Change", serviceIcon: "build", date: "2023-10-22", time: "04:15 PM", status: "COMPLETED", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#EAF1FF] text-[#0B44A0]" },
    { id: "TM-07", name: "Thomas Miller", vehicle: "Chevrolet Silverado • 2017", initials: "TM", mechanic: "Robert Taylor", img: null, type: "Electrical Diagnostic", serviceIcon: "flash", date: "2023-10-28", time: "01:30 PM", status: "ACTIVE", bg: "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40", badge: "bg-[#ECFFF4] text-[#00612D]" },
    { id: "AW-08", name: "Alice Wong", vehicle: "Jeep Wrangler • 2021", initials: "AW", mechanic: "Not Assigned", img: null, type: "Tire Rotation", serviceIcon: "sync", date: "2023-10-29", time: "10:00 AM", status: "PENDING", bg: "bg-slate-100 text-slate-500 border-slate-200/50", badge: "bg-[#FFF4E5] text-[#B25E00]" },
  ]);

  // --- COMPONENT UI STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortByDropdown, setSortByDropdown] = useState(false);
  const [currentSort, setCurrentSort] = useState("Newest"); // Newest, Oldest, Status
  const [currentPage, setCurrentPage] = useState(1);
  const [newBookingModal, setNewBookingModal] = useState(false);

  // --- NEW BOOKING CONTROL DATA CONTAINER ---
  const [formData, setFormData] = useState({
    name: "", vehicle: "", mechanic: "Not Assigned", type: "Oil Change", serviceIcon: "build", date: "", time: "", status: "PENDING"
  });

  const itemsPerPage = 4;

  // --- RENDER DYNAMIC ICON MAPPER ---
  const renderServiceIcon = (iconName) => {
    switch (iconName) {
      case "flash": return <MdFlashOn className="text-xs" />;
      case "build": return <MdBuild className="text-[11px]" />;
      case "settings": return <MdSettings className="text-xs" />;
      case "sync": return <MdSync className="text-xs" />;
      default: return <MdBuild className="text-xs" />;
    }
  };

  // --- DYNAMIC DATA PIPELINE (FILTERING & SORTING) ---
  const processedBookings = useMemo(() => {
    let result = [...bookings];

    if (activeTab !== "All") {
      result = result.filter(b => b.status.toLowerCase() === activeTab.toLowerCase());
    }

    if (currentSort === "Newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSort === "Oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (currentSort === "Status") {
      result.sort((a, b) => a.status.localeCompare(b.status));
    }

    return result;
  }, [bookings, activeTab, currentSort]);

  // --- PAGINATION CHUNKS ---
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [processedBookings, currentPage]);

  const totalPages = Math.ceil(processedBookings.length / itemsPerPage) || 1;

  // --- HANDLERS FOR ACTION OPERATIONS ---
  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.vehicle || !formData.date || !formData.time) return;

    const initials = formData.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const id = `ID-${Math.floor(100 + Math.random() * 900)}`;
    
    let badgeStyle = "bg-[#FFF4E5] text-[#B25E00]";
    let bgStyle = "bg-slate-100 text-slate-500 border-slate-200/50";
    if (formData.status === "ACTIVE") {
      badgeStyle = "bg-[#ECFFF4] text-[#00612D]";
      bgStyle = "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40";
    }

    const newEntry = {
      ...formData,
      id,
      initials,
      img: null,
      bg: bgStyle,
      badge: badgeStyle
    };

    setBookings([newEntry, ...bookings]);
    setNewBookingModal(false);
    setFormData({ name: "", vehicle: "", mechanic: "Not Assigned", type: "Oil Change", serviceIcon: "build", date: "", time: "", status: "PENDING" });
  };

  const handleUpdateStatus = (id, newStatus) => {
    let badgeStyle = "bg-[#FFF4E5] text-[#B25E00]";
    let bgStyle = "bg-slate-100 text-slate-500 border-slate-200/50";
    
    if (newStatus === "ACTIVE") {
      badgeStyle = "bg-[#ECFFF4] text-[#00612D]";
      bgStyle = "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40";
    } else if (newStatus === "COMPLETED") {
      badgeStyle = "bg-[#EAF1FF] text-[#0B44A0]";
      bgStyle = "bg-[#EAF1FF] text-[#0B44A0] border-blue-100/40";
    } else if (newStatus === "CANCELLED") {
      badgeStyle = "bg-[#FEECEB] text-[#BC1C1C]";
      bgStyle = "bg-rose-50 text-rose-600 border-rose-100";
    }

    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus, badge: badgeStyle, bg: bgStyle } : b));
    setSelectedBooking(null);
  };

  const handleExportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(bookings, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "MokaNik_Bookings_Report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- ANALYTICS DATA CALCULATIONS ---
  const stats = useMemo(() => {
    const totalThisMonth = bookings.length + 120; // Simulated historical growth offset
    const needingAssignment = bookings.filter(b => b.mechanic === "Not Assigned").length;
    return { totalThisMonth, needingAssignment };
  }, [bookings]);

  const formatDateString = (rawDate) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(rawDate + 'T00:00:00').toLocaleDateString('en-US', options);
  };

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
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer"
          >
            <MdFileDownload className="text-base text-slate-500" /> Export Report
          </button>
          <button 
            onClick={() => setNewBookingModal(true)}
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
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
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
            {currentSort === "Newest" && "Date (Newest)"}
            {currentSort === "Oldest" && "Date (Oldest)"}
            {currentSort === "Status" && "Status Profile"}
            <MdKeyboardArrowDown className={`text-slate-400 text-sm transition-transform duration-200 ${sortByDropdown ? "rotate-180" : ""}`} />
          </button>
          
          {sortByDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-100 rounded-lg shadow-lg z-20 py-1 text-xs font-semibold text-slate-600 min-w-36 animate-scale-up">
              <div onClick={() => { setCurrentSort("Newest"); setSortByDropdown(false); }} className={`px-3 py-2 hover:bg-slate-50 cursor-pointer ${currentSort === 'Newest' ? 'text-[#0B44A0]' : ''}`}>Date (Newest)</div>
              <div onClick={() => { setCurrentSort("Oldest"); setSortByDropdown(false); }} className={`px-3 py-2 hover:bg-slate-50 cursor-pointer ${currentSort === 'Oldest' ? 'text-[#0B44A0]' : ''}`}>Date (Oldest)</div>
              <div onClick={() => { setCurrentSort("Status"); setSortByDropdown(false); }} className={`px-3 py-2 hover:bg-slate-50 cursor-pointer ${currentSort === 'Status' ? 'text-[#0B44A0]' : ''}`}>Status Profile</div>
            </div>
          )}
        </div>
      </div>

      {/* CENTRAL REGISTRATION DATA WORKSTATION TABLE */}
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
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/40 transition-colors duration-150 animate-slide-up">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {booking.img ? (
                          <img src={booking.img} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-3xs shrink-0" />
                        ) : (
                          <div className={`w-8 h-8 rounded-full ${booking.bg} flex items-center justify-center font-bold text-xs shrink-0`}>
                            {booking.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{booking.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{booking.vehicle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {booking.mechanic !== "Not Assigned" ? (
                          <>
                            <span className="font-semibold text-slate-800">{booking.mechanic}</span>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium italic select-none">Not Assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-1 rounded-md text-[11px] font-semibold transition-transform duration-200 hover:scale-102">
                        {renderServiceIcon(booking.serviceIcon)} {booking.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-slate-900 leading-none">{formatDateString(booking.date)}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{booking.time}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`${booking.badge} px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide select-none inline-block shadow-3xs`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 duration-150 shadow-2xs cursor-pointer"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400 font-medium bg-white">
                    No matching bookings found for this category criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white select-none">
          <p className="font-medium">
            Showing <span className="font-bold text-slate-700">{processedBookings.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedBookings.length)}</span> of <span className="font-bold text-slate-700">{processedBookings.length}</span> entries
          </p>

          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <MdChevronLeft className="text-base" />
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)} 
                className={`w-6 h-6 rounded-md flex items-center justify-center font-bold transition-all cursor-pointer ${currentPage === index + 1 ? "bg-[#0B44A0] text-white shadow-xs" : "bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100"}`}
              >
                {index + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
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
            <span className="bg-white/10 text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider select-none">Month</span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition">{stats.totalThisMonth}</p>
            <p className="text-xs text-blue-100/80 font-medium mt-0.5">Total active configuration matrix</p>
          </div>
        </div>

        {/* CARD 2: BOOKINGS NEEDING ASSIGNMENT */}
        <div className="bg-[#EAF1FF]/70 border border-blue-100/30 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:375ms]">
          <MdAssignment className="absolute -right-3 -bottom-3 text-[#0B44A0]/5 text-7xl pointer-events-none transform -rotate-12 group-hover:scale-110 duration-300 smooth-transition" />
          <div className="flex justify-between items-start w-full relative z-10">
            <MdAssignment className="text-xl text-[#0B44A0] group-hover:scale-110 duration-300 smooth-transition" />
            <span className="bg-blue-100 text-[#0B44A0] text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold select-none shadow-3xs">Alert</span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition text-[#0B44A0]">
              {stats.needingAssignment < 10 ? `0${stats.needingAssignment}` : stats.needingAssignment}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Bookings needing assignment</p>
          </div>
        </div>

        {/* CARD 3: CUSTOMER SATISFACTION RATE */}
        <div className="bg-white border border-slate-100 shadow-xs p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer animate-slide-up [animation-delay:450ms]">
          <FaStar className="absolute -right-3 -bottom-3 text-amber-500/5 text-7xl pointer-events-none group-hover:scale-110 duration-300 smooth-transition" />
          <div className="flex justify-between items-start w-full relative z-10">
            <FaStar className="text-amber-500 text-lg group-hover:rotate-12 duration-300 smooth-transition" />
            <span className="text-amber-600 font-bold text-xs tracking-tight mt-0.5 select-none bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">4.9 / 5.0</span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight mt-3 group-hover:translate-x-1 duration-300 smooth-transition text-amber-500">94%</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Customer satisfaction rate</p>
          </div>
        </div>
      </div>

      {/* --- RE-ARCHITECTED INTERACTIVE ACTION DETAILS MODAL OVERLAY --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
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
                <span className="text-slate-900 font-medium">{formatDateString(selectedBooking.date)} • {selectedBooking.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>System Status:</span>
                <span className={`${selectedBooking.badge} px-2 py-0.5 rounded text-[9px] font-bold shadow-3xs`}>{selectedBooking.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              {selectedBooking.status !== "ACTIVE" && (
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, "ACTIVE")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2 rounded-md transition-all cursor-pointer text-center"
                >
                  Set Active
                </button>
              )}
              {selectedBooking.status !== "COMPLETED" && (
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, "COMPLETED")}
                  className="bg-[#0B44A0] hover:bg-blue-800 text-white text-[11px] font-bold py-2 rounded-md transition-all cursor-pointer text-center"
                >
                  Complete
                </button>
              )}
              {selectedBooking.status !== "CANCELLED" && (
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, "CANCELLED")}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold py-2 rounded-md transition-all cursor-pointer text-center col-span-2"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW REGISTRATION LOG MODAL SCREEN --- */}
      {newBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl max-w-md w-full p-6 space-y-4 animate-scale-up relative">
            <button 
              onClick={() => setNewBookingModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md transition-colors"
            >
              <MdClose className="text-lg" />
            </button>
            
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Create New Network Booking</h3>
              <p className="text-[11px] text-slate-400">Add an unexpected live client event sequence to local cache state.</p>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Customer Full Name</label>
                <input 
                  type="text" required placeholder="John Doe"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Vehicle Blueprint Descriptor</label>
                <input 
                  type="text" required placeholder="Ford Mustang • 2022"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                  value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Service Routine</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                    value={formData.type} 
                    onChange={(e) => {
                      const value = e.target.value;
                      let icon = "build";
                      if (value === "Electrical Diagnostic") icon = "flash";
                      if (value === "Brake Repair") icon = "settings";
                      if (value === "Tire Rotation") icon = "sync";
                      setFormData({...formData, type: value, serviceIcon: icon});
                    }}
                  >
                    <option value="Oil Change">Oil Change</option>
                    <option value="Electrical Diagnostic">Electrical Diagnostic</option>
                    <option value="Brake Repair">Brake Repair</option>
                    <option value="Tire Rotation">Tire Rotation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">Mechanic Assignment</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                    value={formData.mechanic} onChange={(e) => setFormData({...formData, mechanic: e.target.value})}
                  >
                    <option value="Not Assigned">Leave Unassigned</option>
                    <option value="Marcus Chen">Marcus Chen</option>
                    <option value="Robert Taylor">Robert Taylor</option>
                    <option value="Sarah Lopez">Sarah Lopez</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Target Date</label>
                  <input 
                    type="date" required
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">Target Timestamp</label>
                  <input 
                    type="text" required placeholder="11:30 AM"
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-[#0B44A0] font-semibold"
                    value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-[#0B44A0] hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg transition-all shadow-2xs cursor-pointer tracking-wide text-center"
                >
                  Commit Log to Base System State
                </button>
              </div>
            </form>
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
        .smooth-transition { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}