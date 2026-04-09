import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const navigate = useNavigate();

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-gray-900">Upcoming Schedule</h3>
        <span
          onClick={() => navigate("/mec-dashboard/schedule")}
          className="text-blue-600 text-sm font-bold cursor-pointer hover:underline transition"
        >
          View Calendar
        </span>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* ITEM 1 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="text-center w-10 shrink-0">
              <p className="text-sm font-bold text-blue-600">09:00</p>
              <p className="text-xs text-gray-400">AM</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Brake Pad Replacement</p>
              <p className="text-xs text-gray-400 mt-0.5">Toyota Corolla (ABC-1234)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg">
              CONFIRMED
            </span>
            <span className="text-gray-400 text-sm font-semibold">›</span>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="text-center w-10 shrink-0">
              <p className="text-sm font-bold text-blue-600">11:30</p>
              <p className="text-xs text-gray-400">AM</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Engine Oil Change</p>
              <p className="text-xs text-gray-400 mt-0.5">Honda Civic (XYZ-5678)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-orange-400 text-white font-bold text-xs px-3 py-1.5 rounded-lg">
              WAITING
            </span>
            <span className="text-gray-400 text-sm font-semibold">›</span>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="text-center w-10 shrink-0">
              <p className="text-sm font-bold text-blue-600">02:00</p>
              <p className="text-xs text-gray-400">PM</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Transmission Check</p>
              <p className="text-xs text-gray-400 mt-0.5">Ford F-150 (TRK-9012)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg">
              CONFIRMED
            </span>
            <span className="text-gray-400 text-sm font-semibold">›</span>
          </div>
        </div>

        {/* ITEM 4 */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-5">
            <div className="text-center w-10 shrink-0">
              <p className="text-sm font-bold text-blue-600">04:30</p>
              <p className="text-xs text-gray-400">PM</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">AC System Diagnostic</p>
              <p className="text-xs text-gray-400 mt-0.5">BMW M3 (GMN-3456)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-gray-200 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-lg">
              UPCOMING
            </span>
            <span className="text-gray-400 text-sm font-semibold">›</span>
          </div>
        </div>

      </div>
    </div>
  );
}