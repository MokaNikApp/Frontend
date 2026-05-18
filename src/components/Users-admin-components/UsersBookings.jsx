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
} from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function UsersBookings() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen p-4 lg:p-6 font-sans text-slate-700 antialiased space-y-5">

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
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs">
            <MdFileDownload className="text-base text-slate-500" /> Export Report
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#0B44A0] text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors">
            <MdAdd className="text-base" /> New Booking
          </button>
        </div>
      </div>

      {/* FILTER NAVIGATION & SORT ELEMENT BAR */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Pending", "Active", "Completed", "Cancelled"].map((tab, i) => (
            <button
              key={i}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                i === 0
                  ? "bg-[#0B44A0] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">SORT BY:</span>
          <button className="bg-white border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold flex items-center gap-1 text-xs shadow-2xs hover:bg-slate-50">
            Date (Newest) <MdKeyboardArrowDown className="text-slate-400 text-sm" />
          </button>
        </div>
      </div>

      {/* MANAGEMENT CENTRAL DATA TABLE */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
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
              <tr className="hover:bg-slate-50/40 transition-colors">
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
                    <img src="/images/ub1.png" alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-slate-800">Marcus Chen</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-1 rounded-md text-[11px] font-semibold">
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
                  <span className="bg-[#ECFFF4] text-[#00612D] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    ACTIVE
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-2xs">
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 2: LINDA WHITE */}
              <tr className="hover:bg-slate-50/40 transition-colors">
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
                    <img src="/images/ub2.png" alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-slate-800">Robert Taylor</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold">
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
                  <span className="bg-[#FFF4E5] text-[#B25E00] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    PENDING
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-2xs">
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 3: DAVID KIM */}
              <tr className="hover:bg-slate-50/40 transition-colors">
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
                    <img src="/images/ub3.png" alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-slate-800">Sarah Lopez</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-1 rounded-md text-[11px] font-semibold">
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
                  <span className="bg-[#EAF1FF] text-[#0B44A0] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    COMPLETED
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-2xs">
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ROW 4: ELENA MORETTI */}
              <tr className="hover:bg-slate-50/40 transition-colors">
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
                  <span className="text-xs text-slate-400 font-medium italic">Not Assigned</span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold">
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
                  <span className="bg-[#FEECEB] text-[#BC1C1C] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                    CANCELLED
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="bg-[#EAF1FF] text-[#0B44A0] hover:bg-[#D3E3FF] px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-2xs">
                    View Detail
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="flex justify-between items-center px-5 py-3 text-xs text-slate-400 border-t border-slate-100 bg-white">
          <p className="font-medium">Showing <span className="font-bold text-slate-700">1 to 4</span> of <span className="font-bold text-slate-700">24</span> entries</p>

          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 transition-colors">
              <MdChevronLeft className="text-base" />
            </button>
            <button className="w-6 h-6 rounded-md flex items-center justify-center font-bold bg-[#0B44A0] text-white shadow-xs">1</button>
            <button className="w-6 h-6 rounded-md flex items-center justify-center font-bold bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100 transition-colors">2</button>
            <button className="w-6 h-6 rounded-md flex items-center justify-center font-bold bg-slate-50 border border-slate-200/60 text-slate-500 hover:bg-slate-100 transition-colors">3</button>
            <button className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100 transition-colors">
              <MdChevronRight className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* STATS ANALYTICS LOWER CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* CARD 1: TOTAL BOOKINGS THIS MONTH */}
        <div className="bg-[#0B44A0] text-white p-5 rounded-xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-35">
          <div className="flex justify-between items-start w-full">
            <MdCalendarToday className="text-xl text-blue-100/90" />
            <span className="bg-white/10 text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider">
              Month
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight mt-3">128</p>
            <p className="text-xs text-blue-100/80 font-medium mt-0.5">Total Bookings this month</p>
          </div>
        </div>

        {/* CARD 2: BOOKINGS NEEDING ASSIGNMENT */}
        <div className="bg-[#EAF1FF]/70 border border-blue-100/30 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35">
          <div className="flex justify-between items-start w-full">
            <MdAssignment className="text-xl text-[#0B44A0]" />
            <span className="bg-blue-100 text-[#0B44A0] text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
              Alert
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3">08</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Bookings needing assignment</p>
          </div>
        </div>

        {/* CARD 3: CUSTOMER SATISFACTION RATE */}
        <div className="bg-white border border-slate-100 shadow-xs p-5 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-35">
          <div className="flex justify-between items-start w-full">
            <FaStar className="text-amber-500 text-lg" />
            <span className="text-amber-600 font-bold text-xs tracking-tight mt-0.5">
              4.9/5.0
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3">94%</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Customer satisfaction rate</p>
          </div>
        </div>

      </div>

    </div>
  );
}