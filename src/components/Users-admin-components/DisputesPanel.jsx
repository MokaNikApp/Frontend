import { useState, useEffect, useRef } from "react";
import {
  MdMoreVert,
  MdSend,
  MdFilterList,
  MdPayment,
  MdOutlineGavel,
  MdCheckCircle,
  MdClose,
  MdReceiptLong,
  MdOutlinePerson,
  MdOutlineFlag,
  MdOutlineAccountBalanceWallet,
  MdArrowBack,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";

export default function DisputesPanel() {
  // 1. Core State Registry containing 7 detailed active cases with unread status tracking
  const [cases, setCases] = useState({
    james: {
      id: "james",
      userName: "James Wilson",
      userAvatar: "/images/DisputeUser1.png",
      ticketNumber: "Ticket #MN-8291",
      statusText: "IN PROGRESS",
      statusTheme: "bg-[#D3E3FF] text-[#0B44A0]",
      caseSubject: "Overcharged for Engine Diagnostic",
      caseSnippet: "Customer claims the mechanic charged twice for the initial...",
      categoryBadge: "Payment Issue",
      categoryIcon: <MdPayment />,
      categoryTheme: "bg-[#EAF1FF] text-[#0B44A0]",
      timeAgo: "2 hours ago",
      timelineTag: "ISSUE OPENED OCT 24, 10:42 AM",
      subHeaderMeta: "Customer: James Wilson  ▪  Mechanic: Peak Performance Auto",
      isUnread: true,
      messages: [
        {
          id: "m1",
          type: "incoming",
          avatar: "/images/DisputeUser1.png",
          text: "I was quoted $80 for the diagnostic scan, but my receipt shows $160. I asked the mechanic and they said it was for 'advanced testing' but never mentioned the extra cost beforehand.",
          time: "10:45 AM",
        },
        {
          id: "m2",
          type: "outgoing",
          text: "Hello James, I am investigating the transaction logs. Can you please upload a photo of the receipt you received?",
          time: "11:12 AM",
        },
        {
          id: "m3",
          type: "incoming",
          avatar: "/images/DisputeUser1.png",
          text: "Sure, here it is. You can clearly see the double charge under 'Scan Services'.",
          time: "11:30 AM",
          hasAttachment: true,
          attachmentName: "receipt_img.png",
        },
      ],
    },
    sarah: {
      id: "sarah",
      userName: "Sarah Jenkins",
      userAvatar: "/images/DisputeUser2.png",
      ticketNumber: "Ticket #MN-8290",
      statusText: "OPEN",
      statusTheme: "bg-[#FFE3E8] text-[#D80036]",
      caseSubject: "Mechanic arrived 45 mins late",
      caseSnippet: "Service scheduled for 9:00 AM, mechanic showed up at...",
      categoryBadge: "Service Quality",
      categoryIcon: <MdOutlineGavel />,
      categoryTheme: "bg-slate-100 text-slate-600",
      timeAgo: "4 hours ago",
      timelineTag: "ISSUE OPENED OCT 24, 8:15 AM",
      subHeaderMeta: "Customer: Sarah Jenkins  ▪  Mechanic: QuickFix Garages Ltd.",
      isUnread: true,
      messages: [
        {
          id: "s1",
          type: "incoming",
          avatar: "/images/DisputeUser2.png",
          text: "Service scheduled for 9:00 AM, mechanic showed up at 9:45 AM without dropping any warning notice or message. I had to reschedule my whole morning shift.",
          time: "08:20 AM",
        },
      ],
    },
    robert: {
      id: "robert",
      userName: "Robert Chen",
      userAvatar: "/images/DisputeUser3.png",
      ticketNumber: "Ticket #MN-8285",
      statusText: "IN PROGRESS",
      statusTheme: "bg-[#D3E3FF] text-[#0B44A0]",
      caseSubject: "Unfinished Brake Pad Installation",
      caseSnippet: "Customer reports squealing sounds after brake...",
      categoryBadge: "Service Quality",
      categoryIcon: <MdOutlineGavel />,
      categoryTheme: "bg-slate-100 text-slate-600",
      timeAgo: "Yesterday",
      timelineTag: "ISSUE OPENED OCT 23, 2:10 PM",
      subHeaderMeta: "Customer: Robert Chen  ▪  Mechanic: MasterBrakes Workshop",
      isUnread: false,
      messages: [
        {
          id: "r1",
          type: "incoming",
          avatar: "/images/DisputeUser3.png",
          text: "Customer reports heavy squealing sounds after brake pad replacements yesterday. Feels like they didn't align the caliper assemblies fully.",
          time: "02:15 PM",
        },
      ],
    },
    emily: {
      id: "emily",
      userName: "Emily Rodriguez",
      userAvatar: "/images/DisputeUser1.png", 
      ticketNumber: "Ticket #MN-8279",
      statusText: "OPEN",
      statusTheme: "bg-[#FFE3E8] text-[#D80036]",
      caseSubject: "Wrong Oil Filter Type Used",
      caseSnippet: "Invoice states 5W-30 synthetic, but visual inspection shows...",
      categoryBadge: "Service Quality",
      categoryIcon: <MdOutlineGavel />,
      categoryTheme: "bg-slate-100 text-slate-600",
      timeAgo: "2 days ago",
      timelineTag: "ISSUE OPENED OCT 22, 11:00 AM",
      subHeaderMeta: "Customer: Emily Rodriguez  ▪  Mechanic: LubeExpress Hub",
      isUnread: true,
      messages: [
        {
          id: "e1",
          type: "incoming",
          avatar: "/images/DisputeUser1.png",
          text: "I checked the model part number they installed and it doesn't match my vehicle manual specification specs at all.",
          time: "11:02 AM",
        },
      ],
    },
    marcus: {
      id: "marcus",
      userName: "Marcus Vance",
      userAvatar: "/images/DisputeUser2.png",
      ticketNumber: "Ticket #MN-8274",
      statusText: "IN PROGRESS",
      statusTheme: "bg-[#D3E3FF] text-[#0B44A0]",
      caseSubject: "Towing Fee Dispute Authorization",
      caseSnippet: "Charged an extra $120 mileage fee that wasn't approved...",
      categoryBadge: "Payment Issue",
      categoryIcon: <MdPayment />,
      categoryTheme: "bg-[#EAF1FF] text-[#0B44A0]",
      timeAgo: "3 days ago",
      timelineTag: "ISSUE OPENED OCT 21, 4:50 PM",
      subHeaderMeta: "Customer: Marcus Vance  ▪  Mechanic: Citywide Tow & Recovery",
      isUnread: false,
      messages: [
        {
          id: "mar1",
          type: "incoming",
          avatar: "/images/DisputeUser2.png",
          text: "They told me standard radius flat rates applied, then tacked on a fuel index surcharge line item without letting me know.",
          time: "04:52 PM",
        },
      ],
    },
    amanda: {
      id: "amanda",
      userName: "Amanda Ross",
      userAvatar: "/images/DisputeUser3.png",
      ticketNumber: "Ticket #MN-8261",
      statusText: "OPEN",
      statusTheme: "bg-[#FFE3E8] text-[#D80036]",
      caseSubject: "Scratched Door Panel Post-Repair",
      caseSnippet: "Deep clear-coat scratch near the passenger side door handle...",
      categoryBadge: "Service Quality",
      categoryIcon: <MdOutlineGavel />,
      categoryTheme: "bg-slate-100 text-slate-600",
      timeAgo: "4 days ago",
      timelineTag: "ISSUE OPENED OCT 20, 1:15 PM",
      subHeaderMeta: "Customer: Amanda Ross  ▪  Mechanic: Elite Auto Body Work",
      isUnread: true,
      messages: [
        {
          id: "am1",
          type: "incoming",
          avatar: "/images/DisputeUser3.png",
          text: "My car did not have this scratch when I brought it in on Tuesday morning. I have timestamped walkaround photos from before drop-off.",
          time: "01:18 PM",
        },
      ],
    },
    david: {
      id: "david",
      userName: "David Kim",
      userAvatar: "/images/DisputeUser1.png",
      ticketNumber: "Ticket #MN-8255",
      statusText: "IN PROGRESS",
      statusTheme: "bg-[#D3E3FF] text-[#0B44A0]",
      caseSubject: "AC Recharge Lost Coldness in 24 Hours",
      caseSnippet: "Paid for full system leak check and coolant recharge, but...",
      categoryBadge: "Service Quality",
      categoryIcon: <MdOutlineGavel />,
      categoryTheme: "bg-slate-100 text-slate-600",
      timeAgo: "5 days ago",
      timelineTag: "ISSUE OPENED OCT 19, 9:30 AM",
      subHeaderMeta: "Customer: David Kim  ▪  Mechanic: CoolBreeze Auto Climate",
      isUnread: false,
      messages: [
        {
          id: "d1",
          type: "incoming",
          avatar: "/images/DisputeUser1.png",
          text: "The air conditioning is blowing hot air again already. There must be a major line puncture that they completely missed during the inspection scan.",
          time: "09:35 AM",
        },
      ],
    },
  });

  // UI Navigation & Workflow States
  const [selectedCaseId, setSelectedCaseId] = useState("james");
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortNewest, setSortNewest] = useState(true);
  
  // WhatsApp Mobile View Toggle Engine State
  const [mobileViewMode, setMobileViewMode] = useState("list"); // "list" or "chat"

  const chatStreamEndRef = useRef(null);
  const currentCase = cases[selectedCaseId];

  // Instantly mark a case as read when target selection loads or shifts
  useEffect(() => {
    if (cases[selectedCaseId]?.isUnread) {
      setCases((prev) => ({
        ...prev,
        [selectedCaseId]: {
          ...prev[selectedCaseId],
          isUnread: false,
        },
      }));
    }
  }, [selectedCaseId]);

  // Smooth auto-scroll behavior matching real active communication apps
  useEffect(() => {
    if (mobileViewMode === "chat") {
      chatStreamEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentCase.messages, mobileViewMode]);

  // Handle item tap selection inside mobile lists
  const handleCaseSelection = (id) => {
    setSelectedCaseId(id);
    setIsMenuOpen(false);
    setMobileViewMode("chat");
  };

  // Global Chat Core Submission Logic
  const handleDispatchMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newPayload = {
      id: `custom_${Date.now()}`,
      type: "outgoing",
      text: inputValue.trim(),
      time: timestamp,
    };

    setCases((prev) => ({
      ...prev,
      [selectedCaseId]: {
        ...prev[selectedCaseId],
        messages: [...prev[selectedCaseId].messages, newPayload],
      },
    }));

    setInputValue("");
  };

  // State Handler Action: Resolve Dispute Execution Flow
  const handleResolveTicket = () => {
    setCases((prev) => ({
      ...prev,
      [selectedCaseId]: {
        ...prev[selectedCaseId],
        statusText: "RESOLVED",
        statusTheme: "bg-emerald-100 text-emerald-700",
      },
    }));
  };

  // State Handler Action: Close Dispute Execution Flow
  const handleCloseTicket = () => {
    setCases((prev) => ({
      ...prev,
      [selectedCaseId]: {
        ...prev[selectedCaseId],
        statusText: "CLOSED",
        statusTheme: "bg-slate-200 text-slate-700",
      },
    }));
  };

  // State Handler Action: Virtual Report Download Generation Engine
  const handleExportDataReport = () => {
    const rawDataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cases, null, 2));
    const downstreamAnchor = document.createElement("a");
    downstreamAnchor.setAttribute("href", rawDataString);
    downstreamAnchor.setAttribute("download", `Dispute_Report_Log_${selectedCaseId}.json`);
    document.body.appendChild(downstreamAnchor);
    downstreamAnchor.click();
    downstreamAnchor.remove();
  };

  // Filtering Matrix for Sidebar Processing Streams
  const processedCaseKeys = Object.keys(cases)
    .filter((key) => {
      if (statusFilter === "ALL") return true;
      return cases[key].statusText === statusFilter;
    })
    .sort((a, b) => {
      return sortNewest ? 1 : -1;
    });

  return (
    <div className="bg-[#FAFBFD] min-h-screen p-3 sm:p-5 lg:p-8 font-sans text-slate-700 antialiased">
      
      {/* GLOBAL TOP NAVBAR CONTAINER (Hidden on strict mobile chat viewport layer just like WhatsApp) */}
      <div className={`items-center justify-between pb-5 mb-6 border-b border-slate-100 ${mobileViewMode === "chat" ? "hidden md:flex" : "flex"}`}>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">Disputes & Support</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium hidden sm:block">
            Manage active support tickets and user disputes.
          </p>
        </div>

        {/* TOP LEVEL INTERACTIVE CONTROL ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          <button 
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-lg border transition-all active:scale-[0.98] ${
              isFilterDropdownOpen || statusFilter !== "ALL"
                ? "bg-[#EEF2F8] border-[#0B44A0]/20 text-[#0B44A0]"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MdFilterList className="text-base" /> Filter {statusFilter !== "ALL" && `(${statusFilter})`}
          </button>

          {/* DYNAMIC FILTER POPUP SELECTOR */}
          {isFilterDropdownOpen && (
            <div className="absolute right-28 sm:right-36 top-10 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs font-semibold">
              {["ALL", "OPEN", "IN PROGRESS", "RESOLVED", "CLOSED"].map((filterOpt) => (
                <button
                  key={filterOpt}
                  onClick={() => { setStatusFilter(filterOpt); setIsFilterDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors ${statusFilter === filterOpt ? "text-[#0B44A0] bg-[#F2F7FF]" : "text-slate-600"}`}
                >
                  {filterOpt} Units
                </button>
              ))}
            </div>
          )}

          <button 
            onClick={handleExportDataReport}
            className="px-3 sm:px-4 py-2 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-all active:scale-[0.98]"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* WHATSAPP-STYLE INTERACTIVE SCREEN LAYER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch h-[calc(100vh-140px)] md:h-auto">

        {/* LEFT COMPONENT: MONITOR INDEX STREAM */}
        <div className={`lg:col-span-1 flex flex-col space-y-3 h-full ${mobileViewMode === "chat" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold tracking-wider uppercase px-1">
            <p>Active Cases ({Object.keys(cases).length})</p>
            <p 
              onClick={() => setSortNewest(!sortNewest)}
              className="text-[#0B44A0] cursor-pointer hover:underline normal-case font-bold transition-all"
            >
              Sort by {sortNewest ? "Newest" : "Oldest"}
            </p>
          </div>

          {/* INDEX SCROLL TRACKER BLOCK */}
          <div className="space-y-3 overflow-y-auto flex-1 lg:max-h-[calc(100vh-180px)] pr-1 pb-4">
            {processedCaseKeys.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-dashed border-slate-200 text-xs font-medium text-slate-400">
                No matching dispute cases found.
              </div>
            ) : (
              processedCaseKeys.map((caseKey) => {
                const item = cases[caseKey];
                const isActive = selectedCaseId === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleCaseSelection(item.id)}
                    className={`rounded-xl p-4 relative overflow-hidden border cursor-pointer transition-all duration-200 bg-white ${
                      isActive 
                        ? "lg:border-[#0B44A0] lg:ring-1 lg:ring-[#0B44A0]/20 lg:shadow-md" 
                        : "border-slate-100 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    {isActive && <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#0B44A0] hidden lg:block"></div>}
                    
                    {item.isUnread && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-xs"></div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={item.userAvatar} alt="Profile Asset" className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.userName}</p>
                        <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{item.ticketNumber}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wide shrink-0 uppercase ${item.statusTheme}`}>
                        {item.statusText}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-900 mt-3 line-clamp-1">
                      {item.caseSubject}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.caseSnippet}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-[10px]">
                      <span className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded ${item.categoryTheme}`}>
                        {item.categoryIcon} {item.categoryBadge}
                      </span>
                      <p className="text-slate-400 font-medium">{item.timeAgo}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT: THE MAIN ENVIRONMENT WRAPPER */}
        <div className={`lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 flex flex-col overflow-hidden shadow-sm h-full lg:h-[calc(100vh-180px)] min-h-125 ${mobileViewMode === "list" ? "hidden lg:flex" : "flex"}`}>

          {/* ACTIVE BANNER HEADER LAYER */}
          <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 border-b border-slate-100 bg-white shrink-0 relative">
            
            {/* WHATSAPP MOBILE BACK INTERACTION ARROW BUTTON */}
            <button 
              onClick={() => setMobileViewMode("list")}
              className="p-1.5 mr-1 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors lg:hidden focus:outline-none"
            >
              <MdArrowBack className="text-xl" />
            </button>

            {/* Cash/Wallet Icon Wrapper Matching image_40f9ad.png */}
            <div className="bg-[#EEF2F8] p-2.5 sm:p-3 rounded-xl text-[#0B44A0] shrink-0 border border-slate-100 hidden sm:block">
              <MdOutlineAccountBalanceWallet className="text-lg" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-slate-950 tracking-tight truncate">
                {currentCase.caseSubject}
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate mt-0.5">
                {currentCase.subHeaderMeta}
              </p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                <MdMoreVert className="text-xl cursor-pointer" />
              </button>

              {/* CONTEXT ACTIONS MENU */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs font-medium text-slate-700">
                  <button onClick={() => setIsMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 transition-colors">
                    <MdReceiptLong className="text-slate-400 text-sm" /> View Original Invoice
                  </button>
                  <button onClick={() => setIsMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 transition-colors">
                    <MdOutlinePerson className="text-slate-400 text-sm" /> View Mechanic Profile
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button onClick={() => setIsMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 text-red-600 hover:bg-red-50/60 transition-colors font-semibold">
                    <MdOutlineFlag className="text-red-400 text-sm" /> Flag Dispute Escalation
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CHAT MESSAGES LOG RUNTIME STREAM */}
          <div className="flex-1 space-y-5 p-4 sm:p-5 overflow-y-auto bg-white">

            {/* TIMELINE METADATA DATE BADGE */}
            <div className="flex justify-center my-2">
              <div className="bg-[#F2F7FF] text-[#0B44A0] text-[10px] font-bold px-3.5 py-1.5 rounded-md tracking-wider shadow-2xs">
                {currentCase.timelineTag}
              </div>
            </div>

            {/* RENDER CHAT LOG OBJECTS */}
            {currentCase.messages.map((msg) => {
              if (msg.type === "incoming") {
                return (
                  <div key={msg.id} className="flex flex-col gap-2 items-start max-w-[85%] sm:max-w-[80%]">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <img src={msg.avatar} alt="Avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover mt-0.5 shrink-0 shadow-2xs" />
                      <div className="bg-[#EBF2FC] p-3.5 sm:p-4 rounded-2xl rounded-tl-xs border border-slate-100">
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">
                          {msg.text}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-2 font-bold text-left">{msg.time}</p>
                      </div>
                    </div>
                    
                    {/* INLINE ATTACHMENT MANAGER STORAGE BOX */}
                    {msg.hasAttachment && (
                      <div className="ml-10 sm:ml-11 group relative rounded-xl overflow-hidden border border-slate-200 bg-white p-1.5 w-32 shadow-xs hover:border-[#0B44A0]/40 transition-colors cursor-pointer">
                        <div className="w-full h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-lg">
                          <FaReceipt className="opacity-30" />
                        </div>
                        <div className="pt-1.5 px-0.5 bg-white text-[9px] font-bold text-slate-500 truncate">
                          {msg.attachmentName}
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 sm:gap-3 max-w-[85%] sm:max-w-[80%] ml-auto justify-end">
                    <div className="bg-[#1D59BF] text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-xs shadow-2xs">
                      <p className="text-xs leading-relaxed font-medium">
                        {msg.text}
                      </p>
                      <p className="text-[9px] mt-2 text-blue-200 font-bold text-right">{msg.time}</p>
                    </div>
                    {/* Verified outward message icon indicator from image_40f9ad.png */}
                    <div className="w-7 h-7 bg-[#1D59BF] rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white shadow-xs">
                      <MdOutlinePerson className="text-sm" />
                    </div>
                  </div>
                );
              }
            })}
            
            <div ref={chatStreamEndRef} />
          </div>

          {/* LOWER CONTROL ACTION FOOTER AREA */}
          <div className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0 space-y-4">

            {/* ACTION TRIGGERS FOR RUNTIME STATUS TICKET BADGES */}
            <div className="grid grid-cols-2 gap-3 pb-0.5">
              <button 
                onClick={handleResolveTicket}
                className="flex items-center justify-center gap-1.5 bg-[#ECFFF4] text-[#00612D] py-2.5 rounded-xl text-xs font-bold hover:bg-[#D4FFE6] transition-all active:scale-[0.98] border border-[#00612D]/10"
              >
                <MdCheckCircle className="text-sm sm:text-base" /> Resolve Issue
              </button>
              <button 
                onClick={handleCloseTicket}
                className="flex items-center justify-center gap-1.5 bg-[#F3F4F6] text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-[#E5E7EB] transition-all active:scale-[0.98] border border-slate-200/60"
              >
                <MdClose className="text-sm sm:text-base" /> Close Case
              </button>
            </div>

            {/* MESSAGE ENTRY DOCK FIELD */}
            <form 
              onSubmit={handleDispatchMessage}
              className="flex items-center gap-3 border border-slate-200 focus-within:border-[#0B44A0] focus-within:ring-1 focus-within:ring-[#0B44A0]/20 rounded-xl px-4 py-2.5 bg-[#FAFCFF] transition-all duration-200"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write a response..."
                className="flex-1 bg-transparent outline-none text-xs text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <button 
                type="submit"
                className="bg-[#0B44A0] text-white p-2 rounded-lg hover:bg-blue-800 transition-all active:scale-[0.93] shadow-sm shrink-0"
              >
                <MdSend className="text-xs" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}