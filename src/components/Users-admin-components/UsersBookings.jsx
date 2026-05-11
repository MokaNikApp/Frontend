import {
  MdKeyboardArrowDown,
  MdCalendarToday,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function UsersBookings() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Bookings Management
          </h1>
          <p className="text-sm text-gray-500">
            Overview and management of all automotive service appointments across the MokaNik network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-blue-600">
            Export Report
          </button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            + New Booking
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["All", "Pending", "Active", "Completed", "Cancelled"].map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                i === 0
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 flex items-center gap-1">
          SORT BY: <span className="text-blue-600">Date (Newest)</span>
          <MdKeyboardArrowDown />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl p-4">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 text-xs text-gray-400 pb-3 border-b">
          <p>CUSTOMER NAME</p>
          <p>MECHANIC ASSIGNED</p>
          <p>SERVICE TYPE</p>
          <p>DATE & TIME</p>
          <p>STATUS</p>
          <p>ACTIONS</p>
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-6 items-center py-4 border-b">
          {/* CUSTOMER */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
              JS
            </div>
            <div>
              <p className="text-sm font-semibold">James Sullivan</p>
              <p className="text-xs text-gray-400">Tesla Model 3 • 2021</p>
            </div>
          </div>

          {/* MECHANIC */}
          <div className="flex items-center gap-2">
            <img src="images/ub1.png" className="w-8 h-8 rounded-full" />
            <p className="text-sm">Marcus Chen</p>
          </div>

          {/* SERVICE */}
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-lg">
              Electrical Diagnostic
            </span>
          </div>

          {/* DATE */}
          <div>
            <p className="text-sm">Oct 24, 2023</p>
            <p className="text-xs text-gray-400">10:30 AM</p>
          </div>

          {/* STATUS */}
          <div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              ACTIVE
            </span>
          </div>

          {/* ACTION */}
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs w-fit">
            View Detail
          </button>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-6 items-center py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-semibold">
              LW
            </div>
            <div>
              <p className="text-sm font-semibold">Linda White</p>
              <p className="text-xs text-gray-400">BMW X5 • 2019</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src="images/ub2.png" className="w-8 h-8 rounded-full" />
            <p className="text-sm">Robert Taylor</p>
          </div>

          <div>
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-lg">
              Oil Change
            </span>
          </div>

          <div>
            <p className="text-sm">Oct 25, 2023</p>
            <p className="text-xs text-gray-400">02:00 PM</p>
          </div>

          <div>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
              PENDING
            </span>
          </div>

          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs w-fit">
            View Detail
          </button>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-6 items-center py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
              DK
            </div>
            <div>
              <p className="text-sm font-semibold">David Kim</p>
              <p className="text-xs text-gray-400">Toyota Camry • 2022</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src="images/ub3.png" className="w-8 h-8 rounded-full" />
            <p className="text-sm">Sarah Lopez</p>
          </div>

          <div>
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-lg">
              Brake Repair
            </span>
          </div>

          <div>
            <p className="text-sm">Oct 23, 2023</p>
            <p className="text-xs text-gray-400">09:15 AM</p>
          </div>

          <div>
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              COMPLETED
            </span>
          </div>

          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs w-fit">
            View Detail
          </button>
        </div>

        {/* ROW 4 */}
        <div className="grid grid-cols-6 items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-semibold">
              EM
            </div>
            <div>
              <p className="text-sm font-semibold">Elena Moretti</p>
              <p className="text-xs text-gray-400">Audi Q7 • 2020</p>
            </div>
          </div>

          <p className="text-sm text-gray-400">Not Assigned</p>

          <div>
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-lg">
              Tire Rotation
            </span>
          </div>

          <div>
            <p className="text-sm">Oct 26, 2023</p>
            <p className="text-xs text-gray-400">11:00 AM</p>
          </div>

          <div>
            <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
              CANCELLED
            </span>
          </div>

          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs w-fit">
            View Detail
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-4 text-sm text-gray-400">
          <p>Showing 1 to 4 of 24 entries</p>

          <div className="flex gap-2">
            <button className="w-8 h-8 bg-gray-100 rounded">1</button>
            <button className="w-8 h-8 bg-gray-100 rounded">2</button>
            <button className="w-8 h-8 bg-gray-100 rounded">3</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-blue-800 text-white p-5 rounded-xl">
          <MdCalendarToday className="text-xl mb-2" />
          <p className="text-2xl font-bold">128</p>
          <p className="text-sm opacity-80">Total Bookings this month</p>
        </div>

        <div className="bg-gray-200 p-5 rounded-xl">
          <p className="text-2xl font-bold">08</p>
          <p className="text-sm text-gray-600">Bookings needing assignment</p>
        </div>

        <div className="bg-white p-5 rounded-xl">
          <FaStar className="text-yellow-500 mb-2" />
          <p className="text-2xl font-bold">94%</p>
          <p className="text-sm text-gray-500">Customer satisfaction rate</p>
        </div>

      </div>
    </div>
  );
}