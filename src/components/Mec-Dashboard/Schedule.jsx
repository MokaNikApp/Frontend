export default function Schedule() {
  return (
    <div>

      {/* HEADER OUTSIDE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <h3 className="font-bold text-gray-800">Upcoming Schedule</h3>
        <span className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline transition">View Calendar</span>
      </div>

      {/* BOX */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border space-y-4">

        {/* ITEM */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-4">
            <div className="text-xs text-gray-400 text-center">
              <p>09:00</p>
              <p>AM</p>
            </div>

            <div>
              <p className="font-medium text-black text-sm">Brake Pad Replacement</p>
              <p className="text-xs text-gray-400">Toyota Corolla (ABC-1234)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-blue-800 text-blue-100 font-semibold text-xs px-2 py-1 rounded">
              CONFIRMED
            </span>
            <span>{">"}</span>
          </div>
        </div>

        {/* ITEM */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-4">
            <div className="text-xs text-gray-400 text-center">
              <p>11:30</p>
              <p>AM</p>
            </div>

            <div>
              <p className="font-medium text-black text-sm">Engine Oil Change</p>
              <p className="text-xs text-gray-400">Honda Civic (XYZ-5678)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-yellow-800 text-yellow-100 font-semibold text-xs px-2 py-1 rounded">
              WAITING
            </span>
            <span>{">"}</span>
          </div>
        </div>

        {/* ITEM */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-4">
            <div className="text-xs text-gray-400 text-center">
              <p>02:00</p>
              <p>PM</p>
            </div>

            <div>
              <p className="font-medium text-black text-sm">Transmission Check</p>
              <p className="text-xs text-gray-400">Ford F-150 (TRK-9012)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-blue-800 text-blue-100 font-semibold text-xs px-2 py-1 rounded">
              CONFIRMED
            </span>
            <span>{">"}</span>
          </div>
        </div>

        {/* ITEM */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-4">
            <div className="text-xs text-gray-400 text-center">
              <p>04:30</p>
              <p>PM</p>
            </div>

            <div>
              <p className="font-medium text-black text-sm">AC System Diagnostic</p>
              <p className="text-xs text-gray-400">BMW M3 (GMN-3456)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">  
            <span className="bg-gray-400 text-gray-900 font-bold text-xs px-2 py-1 rounded">
              UPCOMING
            </span>
            <span>{">"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}