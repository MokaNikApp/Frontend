// MechanicApprovalPage.jsx
import { useState } from "react";
import UserSidebar from "../../components/Users-admin-components/UserSidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdLocationOn,
  MdWork,
  MdVerified,
  MdCheckCircle,
  MdCancel,
  MdOutlineFileDownload,
  MdInfoOutline,
  MdOutlineMail,
} from "react-icons/md";

export default function MechanicApprovalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract state passed from queue table, otherwise fallback gracefully to mock design values
  const [mechanicData, setMechanicData] = useState(
    location.state?.mechanic || {
      name: "Robert Fox",
      status: "Pending",
      location: "San Francisco, CA",
      exp: "12 Years",
      specialty: "Master ASE Certified",
      reliability: "98.4%",
      date: "Oct 24, 2023",
    }
  );

  const [showRejectPanel, setShowRejectPanel] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Status style matching state matrices
  const statusBadgeClasses = {
    Pending: "bg-indigo-100 text-indigo-600 border border-indigo-200",
    Approved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Rejected: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  const handleApproveAction = () => {
    setMechanicData((prev) => ({ ...prev, status: "Approved" }));
    setShowRejectPanel(false);
    triggerNotification("Mechanic registration approved successfully!");
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for application rejection.");
      return;
    }
    setMechanicData((prev) => ({ ...prev, status: "Rejected" }));
    triggerNotification("Application status set to Rejected.");
  };

  const triggerNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased selection:bg-blue-500 selection:text-white">
      <UserSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 transition-all duration-300">
        
        {/* TOAST SYSTEM */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 animate-slide-up">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* TOP BACK NAVIGATION */}
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-6 group">
          <MdArrowBack className="transform group-hover:-translate-x-1 transition-transform" />
          <Link to="/users-mechanics" className="font-semibold hover:underline tracking-tight">
            Back to Mechanics Management
          </Link>
        </div>

        {/* PROFILE HEADER SECTION */}
        <div className="flex gap-6 items-start mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
          {/* Avatar Container with overlapping Verified ID tag seen in Screenshot 2026-05-15 014800_2.png */}
          <div className="relative shrink-0">
            <img
              src="/images/mecappprofile.png"
              className="w-28 h-28 rounded-2xl object-cover shadow-inner ring-4 ring-slate-50"
              alt="Mechanic profile"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200";
              }}
            />
            <span className="absolute -bottom-1 -right-2 bg-blue-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
              VERIFIED ID
            </span>
          </div>

          <div className="flex-1 pt-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight font-display">
                {mechanicData.name}
              </h2>
              <span className={`px-2.5 py-0.5 text-[11px] font-bold tracking-wider rounded-md uppercase transition-all duration-300 ${statusBadgeClasses[mechanicData.status]}`}>
                {mechanicData.status} REVIEW
              </span>
            </div>

            {/* Sub attributes line */}
            <div className="flex flex-wrap gap-5 mt-3 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <MdLocationOn className="text-slate-400 text-base" /> {mechanicData.location}
              </span>
              <span className="flex items-center gap-1.5">
                <MdWork className="text-slate-400 text-base" /> {mechanicData.exp} Experience
              </span>
              <span className="flex items-center gap-1.5">
                <MdVerified className="text-blue-500 text-base" /> {mechanicData.specialty}
              </span>
            </div>

            {/* Score Metrics row */}
            <div className="flex gap-12 mt-5 pt-4 border-t border-slate-100 max-w-xs">
              <div className="flex flex-col items-center text-center">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Reliability Score</p>
                <p className="text-blue-600 font-extrabold text-xl mt-0.5 tracking-tight">{mechanicData.reliability || "98.4%"}</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Applied Date</p>
                <p className="font-bold text-slate-700 text-base mt-0.5 tracking-tight">{mechanicData.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CORE DETAILS SECTION */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: "100ms" }}>

          {/* DOCUMENTS VIEW GRID */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg font-display tracking-tight">
                Certification Documents
              </h3>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md tracking-tight">
                3 Documents Provided
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Document Item Card 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 hover:shadow-md transition-all duration-200">
                <div className="relative overflow-hidden rounded-xl bg-slate-50 mb-3 border border-slate-100">
                  <img
                    src="/images/mecappcertifi1.png"
                    className="w-full object-cover h-44 group-hover:scale-[1.02] transition-transform duration-300"
                    alt="ID Card attachment"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400"; }}
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">ID Card</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Expires: 12/2026</p>
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition" title="Download Document">
                    <MdOutlineFileDownload size={18} />
                  </button>
                </div>
              </div>

              {/* Document Item Card 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 hover:shadow-md transition-all duration-200">
                <div className="relative overflow-hidden rounded-xl bg-slate-50 mb-3 border border-slate-100">
                  <img
                    src="/images/mecappcertifi2.png"
                    className="w-full object-cover h-44 group-hover:scale-[1.02] transition-transform duration-300"
                    alt="ASE Certificate attachment"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"; }}
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">ASE Certification</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">ID: #88392-AF</p>
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition" title="Download Document">
                    <MdOutlineFileDownload size={18} />
                  </button>
                </div>
              </div>

              {/* Document Item Card 3 */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 hover:shadow-md transition-all duration-200">
                <div className="relative overflow-hidden rounded-xl bg-slate-50 mb-3 border border-slate-100">
                  <img
                    src="/images/mecappcertifi3.png"
                    className="w-full object-cover h-44 group-hover:scale-[1.02] transition-transform duration-300"
                    alt="Business License attachment"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=400"; }}
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">Business License</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">SF Municipal Code: 892-00</p>
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition" title="Download Document">
                    <MdOutlineFileDownload size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER ACTIONS & NOTES SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* INTERNAL NOTES (LEFT - COL SPAN 2) */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-85">
              <h3 className="font-bold text-slate-800 text-base mb-3 font-display tracking-tight">
                Admin Internal Notes
              </h3>

              <textarea
                placeholder="Add internal notes about this candidate's interview or background check..."
                className="w-full flex-1 border border-slate-100 rounded-xl p-3.5 text-sm outline-none focus:border-slate-300 focus:bg-slate-50/50 resize-none transition-all placeholder:text-slate-300 text-slate-700 leading-relaxed font-medium"
              />

              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mt-3 pt-2 border-t border-slate-50">
                <span>Last edited by Sarah Miller • 2 hours ago</span>
                <span className="text-blue-600 font-bold tracking-tight">Auto-save enabled</span>
              </div>
            </div>

            {/* RIGHT APPLICATION CONTROL BLOCK */}
            <div className="space-y-4">
              {/* PRIMARY APPLICATION CARD CONTAINER matching layout seen in Screenshot 2026-05-15 014838_2.png */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-base tracking-tight font-display mb-1">Application Control</h3>

                {/* APPROVE ACTION BUTTON */}
                <button 
                  onClick={handleApproveAction}
                  className="w-full flex items-center justify-center gap-2 bg-[#0041a3] hover:bg-[#003182] active:scale-[0.99] transition text-white py-3 rounded-xl font-bold text-sm shadow-sm"
                >
                  <MdCheckCircle className="text-lg" /> Approve Mechanic
                </button>

                {/* REJECT TOGGLE BUTTON */}
                <button 
                  onClick={() => setShowRejectPanel(!showRejectPanel)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${
                    showRejectPanel ? "bg-rose-100 text-rose-700" : "bg-[#dbe5f5] text-[#0041a3] hover:bg-[#ccdcf5]"
                  }`}
                >
                  <MdCancel className="text-lg" /> Reject Application
                </button>

                {/* COLLAPSIBLE DETAILED REJECTION BLOCK */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showRejectPanel ? "max-h-65 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 space-y-3">
                    <p className="text-[10px] text-rose-600 font-extrabold tracking-widest uppercase">
                      Reason for Rejection
                    </p>

                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Specific reason for the candidate's rejection..."
                      className="w-full border border-slate-200/80 rounded-xl p-2.5 text-xs font-medium text-slate-700 outline-none focus:border-rose-300 focus:bg-white resize-none h-20 transition"
                    />

                    <button 
                      onClick={handleRejectConfirm}
                      className="w-full bg-[#b81d1d] hover:bg-[#961515] active:scale-[0.99] text-white py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase transition shadow-sm"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-slate-50">
                  <MdInfoOutline className="text-slate-400 mt-0.5 shrink-0 text-base" />
                  <p className="text-[11px] text-slate-400 font-medium leading-normal tracking-tight">
                    Approving will automatically trigger onboarding credentials for {mechanicData.name.split(" ")[0]}.
                  </p>
                </div>
              </div>

              {/* REQUEST REVISION BUTTON */}
              <button className="w-full flex items-center justify-center gap-2 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all rounded-xl py-3 text-sm font-bold bg-white text-slate-600 shadow-sm">
                <MdOutlineMail className="text-base text-slate-400" /> Request More Documents
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Global CSS Injectable Styles */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out Jacques forwards;
        }
      `}</style>
    </div>
  );
}