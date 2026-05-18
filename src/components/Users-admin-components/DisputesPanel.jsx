import {
  MdMoreVert,
  MdSend,
  MdFilterList,
  MdPayment,
  MdOutlineGavel,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";

export default function DisputesPanel() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased">
      
      {/* GLOBAL HEADER - Tightened spacing and font proportions */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Disputes & Support</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage active support tickets and user disputes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#EEF2F8] text-[#0B44A0] rounded-lg hover:bg-[#E2E9F3] transition-colors">
            <MdFilterList className="text-sm" /> Filter
          </button>
          <button className="px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

        {/* LEFT COLUMN: TICKETS LIST */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold tracking-wider uppercase px-1">
            <p>Active Cases (24)</p>
            <p className="text-[#0B44A0] cursor-pointer hover:underline normal-case font-semibold">Sort by Newest</p>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-2 space-y-2">

            {/* CASE ITEM 1 (Active/Selected State) */}
            <div className="rounded-lg p-3 bg-[#F2F7FF] relative overflow-hidden border border-slate-100">
              <div className="absolute top-0 left-0 bottom-0 w-0.75 bg-[#0B44A0]"></div>
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img src="/images/DisputeUser1.png" alt="User profile" className="w-8 h-8 rounded-full object-cover border-2 border-[#0B44A0]" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">James Wilson</p>
                  <p className="text-[10px] text-slate-400 truncate">Ticket #MN-8291</p>
                </div>
                <span className="text-[9px] font-bold bg-[#D3E3FF] text-[#0B44A0] px-2 py-0.5 rounded-md tracking-wide shrink-0">
                  IN PROGRESS
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                Overcharged for Engine Diagnostic
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-normal">
                Customer claims the mechanic charged twice for the initial...
              </p>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 text-[10px]">
                <span className="flex items-center gap-1 font-medium bg-[#EAF1FF] text-[#0B44A0] px-2 py-0.5 rounded">
                  <MdPayment /> Payment Issue
                </span>
                <p className="text-slate-400">2 hours ago</p>
              </div>
            </div>

            {/* CASE ITEM 2 */}
            <div className="rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent">
              <div className="flex items-center gap-2.5">
                <img src="/images/DisputeUser2.png" alt="User profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-400 truncate">Ticket #MN-8290</p>
                </div>
                <span className="text-[9px] font-bold bg-[#FFE3E8] text-[#D80036] px-2 py-0.5 rounded-md tracking-wide">
                  OPEN
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                Mechanic arrived 45 mins late
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-normal">
                Service scheduled for 9:00 AM, mechanic showed up at...
              </p>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-transparent text-[10px]">
                <span className="flex items-center gap-1 font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  <MdOutlineGavel /> Service Quality
                </span>
                <p className="text-slate-400">4 hours ago</p>
              </div>
            </div>

            {/* CASE ITEM 3 */}
            <div className="rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent">
              <div className="flex items-center gap-2.5">
                <img src="/images/DisputeUser3.png" alt="User profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Robert Chen</p>
                  <p className="text-[10px] text-slate-400 truncate">Ticket #MN-8285</p>
                </div>
                <span className="text-[9px] font-bold bg-[#D3E3FF] text-[#0B44A0] px-2 py-0.5 rounded-md tracking-wide">
                  IN PROGRESS
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                Unfinished Brake Pad Installation
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-normal">
                Customer reports squealing sounds after brake...
              </p>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-transparent text-[10px]">
                <span className="flex items-center gap-1 font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  <MdOutlineGavel /> Service Quality
                </span>
                <p className="text-slate-400">Yesterday</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: CHAT WINDOW STRUCTURE */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-xs border border-slate-100 flex flex-col overflow-hidden h-[calc(100vh-120px)] min-h-137.5">

          {/* WINDOW ACTIVE STATUS HEADER */}
          <div className="flex items-center gap-3 p-3.5 border-b border-slate-100 bg-white shrink-0">
            <div className="bg-[#EEF2F8] p-2 rounded-xl text-[#0B44A0] shrink-0">
              <FaReceipt className="text-base" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-950 truncate">
                Overcharged for Engine Diagnostic
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                Customer: James Wilson · Mechanic: Peak Performance Auto
              </p>
            </div>
            <MdMoreVert className="text-lg text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>

          {/* WINDOW STREAM CONTAINER */}
          <div className="flex-1 space-y-4 p-4 overflow-y-auto bg-slate-50/40">

            {/* TIMELINE METADATA TAG */}
            <div className="flex justify-center my-2">
              <div className="bg-[#F2F7FF] text-[#0B44A0] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Issue Opened Oct 24, 10:42 AM
              </div>
            </div>

            {/* INCOMING CHAT LAYOUT FRAME */}
            <div className="flex items-start gap-2.5 max-w-[85%]">
              <img src="/images/DisputeUser1.png" alt="" className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0" />
              <div className="bg-[#EEF2FA] p-3 rounded-2xl rounded-tl-xs shadow-2xs">
                <p className="text-xs text-slate-900 leading-relaxed font-medium">
                  I was quoted $80 for the diagnostic scan, but my receipt shows $160. I asked the mechanic and they said it was for 'advanced testing' but never mentioned the extra cost beforehand.
                </p>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold text-right">10:45 AM</p>
              </div>
            </div>

            {/* OUTGOING CHAT LAYOUT FRAME */}
            <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
              <div className="bg-[#0B44A0] text-white p-3 rounded-2xl rounded-tr-xs shadow-2xs">
                <p className="text-xs leading-relaxed font-medium">
                  Hello James, I am investigating the transaction logs. Can you please upload a photo of the receipt you received?
                </p>
                <p className="text-[9px] mt-1 text-blue-200 font-semibold text-right">11:12 AM</p>
              </div>
              <div className="w-7 h-7 bg-slate-300 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-xs">
                AD
              </div>
            </div>

            {/* INCOMING RESPONSE WITH ATTACHMENT ASSET */}
            <div className="flex flex-col gap-2 items-start max-w-[85%]">
              <div className="flex items-start gap-2.5">
                <img src="/images/DisputeUser1.png" alt="" className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0" />
                <div className="bg-[#EEF2FA] p-3 rounded-2xl rounded-tl-xs shadow-2xs">
                  <p className="text-xs text-slate-900 leading-relaxed font-medium">
                    Sure, here it is. You can clearly see the double charge under 'Scan Services'.
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1 font-semibold text-right">11:30 AM</p>
                </div>
              </div>
              
              {/* Scaled-down inline document asset image box */}
              <div className="ml-9 group relative rounded-lg overflow-hidden border border-slate-200 bg-white p-1 max-w-32.5 shadow-2xs">
                <div className="w-full h-24 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-lg">
                  <FaReceipt className="opacity-40" />
                </div>
                <div className="p-1 bg-white text-[9px] text-slate-500 font-semibold truncate">
                  receipt_img.png
                </div>
              </div>
            </div>

          </div>

          {/* CHAT DOCK PANEL FOOTER CONTROLS */}
          <div className="p-3 border-t border-slate-100 bg-white shrink-0 space-y-3">

            {/* QUICK RESOLUTION ACTIONS BUTTONS */}
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 bg-[#ECFFF4] text-[#00612D] py-2 rounded-lg text-xs font-bold hover:bg-[#D4FFE6] transition-colors shadow-2xs">
                <MdCheckCircle className="text-sm" /> Resolve Issue
              </button>
              <button className="flex items-center justify-center gap-1.5 bg-[#F5F7FA] text-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-[#EAEFF4] transition-colors shadow-2xs">
                <MdClose className="text-sm" /> Close Case
              </button>
            </div>

            {/* SYSTEM MESSAGE RESPONSE INPUT BOX */}
            <div className="flex items-center gap-2 border border-slate-200 focus-within:border-blue-400 rounded-xl px-3 py-1.5 bg-[#FAFCFF] transition-colors">
              <input
                type="text"
                placeholder="Write a response..."
                className="flex-1 bg-transparent outline-none text-xs text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <button className="bg-[#0B44A0] text-white p-2 rounded-lg hover:bg-blue-800 transition-colors shadow-xs shrink-0">
                <MdSend className="text-xs" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}