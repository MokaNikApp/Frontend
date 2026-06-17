import { useNavigate } from "react-router-dom";

export default function Schedule({ data = {} }) {
  const navigate = useNavigate();

  // Extract the timeSlots array safely from the backend object structure
  const slots = Array.isArray(data?.timeSlots) ? data.timeSlots : [];

  // Filter out the time slots that actually have an assigned job
  const activeBookings = slots.filter(slot => slot?.job !== null);

  // Helper to translate 24-hour server strings ("13:00") into clean 12-hour design tokens ("01:00", "PM")
  const formatTimeToken = (timeStr) => {
    if (!timeStr) return { hour: "--:--", period: "" };
    const [rawHour, rawMinute] = timeStr.split(":");
    let hour = parseInt(rawHour, 10);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert 0 to 12
    const formattedHour = hour < 10 ? `0${hour}:${rawMinute}` : `${hour}:${rawMinute}`;
    return { hour: formattedHour, period };
  };

  // Maps dynamic status values to your design classes
  const getStatusStyle = (status) => {
    const check = status?.toUpperCase() || "UPCOMING";
    if (check === "CONFIRMED") return "bg-blue-700 text-white";
    if (check === "WAITING" || check === "PENDING") return "bg-orange-400 text-white";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Upcoming Schedule</h3>
        <span
          onClick={() => navigate("/mec-dashboard/schedule")}
          className="text-blue-600 text-sm font-bold cursor-pointer hover:underline transition"
        >
          View Calendar
        </span>
      </div>

      {/* TIMELINE LIST INNER WINDOW */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {activeBookings.length === 0 ? (
          <div className="text-center py-12 px-5 text-gray-400 text-xs font-medium bg-white">
            <p className="text-sm font-bold text-gray-700 mb-1">📅 No appointments today</p>
            All slots are currently open. Click "View Calendar" to manage availability.
          </div>
        ) : (
          activeBookings.map((slot, index) => {
            const isLast = index === activeBookings.length - 1;
            const timeTokens = formatTimeToken(slot?.time);
            
            // Extract nested properties inside the 'job' block
            const jobData = slot.job || {};
            const serviceTitle = jobData?.title || jobData?.serviceName || "General Repair";
            const carDetails = jobData?.vehicle || `${jobData?.carMake || ""} ${jobData?.carModel || ""}`.trim() || "Unknown Car";
            const licensePlate = jobData?.plateNumber || jobData?.licensePlate ? ` (${jobData.plateNumber || jobData.licensePlate})` : "";
            const currentStatus = jobData?.status || "UPCOMING";

            return (
              <div
                key={slot?.hour || index}
                className={`flex items-center justify-between px-5 py-4 ${!isLast ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-5">
                  <div className="text-center w-10 shrink-0">
                    <p className="text-sm font-bold text-blue-600">{timeTokens.hour}</p>
                    <p className="text-xs text-gray-400 uppercase font-semibold">{timeTokens.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{serviceTitle}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{carDetails}{licensePlate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`font-bold text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider ${getStatusStyle(currentStatus)}`}>
                    {currentStatus}
                  </span>
                  <span className="text-gray-400 text-sm font-semibold select-none">›</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}