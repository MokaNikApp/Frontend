import { useState, useRef, useEffect } from "react";
import { FiX, FiCheck, FiMoreVertical } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// Constants adapted for your active 08:00 - 20:00 operational timespan
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const HOUR_HEIGHT = 80;

const colorMap = {
  inprogress: { bg: "bg-blue-600", text: "text-white" },
  done: { bg: "bg-green-500", text: "text-white" },
  started: { bg: "bg-orange-400", text: "text-white" },
};

const statusBadge = {
  inprogress: "bg-orange-400 text-white",
  done: "bg-green-100 text-green-700",
  started: "bg-blue-100 text-blue-700",
};

const statusLabel = {
  inprogress: "IN PROGRESS",
  done: "DONE",
  started: "STARTED",
};

const normalizeStatus = (rawStatus) => {
  const status = rawStatus?.toUpperCase() || "";
  if (status === "DONE" || status === "COMPLETED") return "done";
  if (status === "IN_PROGRESS" || status === "CONFIRMED") return "inprogress";
  return "started";
};

export default function Schedule() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState("Week"); // Day | Week | Month
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // API QUERY: Syncs live data stream based on active view mode parameter
  const { data: scheduleData, isLoading } = useQuery({
    queryKey: ["providerSchedule", viewMode],
    queryFn: async () => {
      const response = await axios.get(`/provider/schedule?view=${viewMode.toLowerCase()}`);
      return response.data;
    },
  });

  // API MUTATION: Patch state modification back up to backend infrastructure
  const updateStatusMutation = useMutation({
    mutationFn: async ({ jobId, nextStatus }) => {
      return await axios.patch(`/provider/jobs/${jobId}/status`, { status: nextStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["providerSchedule"]);
    },
  });

  // Dynamic Date Resolvers based on server timestamp contexts
  const rawServerDate = scheduleData?.date || "2026-06-16";
  const displayDateLabel = new Date(rawServerDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const serverDayName = scheduleData?.dayName?.toUpperCase() || "TUESDAY";
  const todayIndex = WEEK_DAYS.findIndex((d) => serverDayName.startsWith(d)) !== -1 
    ? WEEK_DAYS.findIndex((d) => serverDayName.startsWith(d)) 
    : 1;

  const getWeekDates = (baseDateStr) => {
    const current = new Date(baseDateStr);
    const dayOffset = current.getDay() === 0 ? 6 : current.getDay() - 1;
    const monday = new Date(current);
    monday.setDate(current.getDate() - dayOffset);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };
  const weekDates = getWeekDates(rawServerDate);

  // DATA MAP ADAPTER: Extracts nested server slots mapping into interactive layout blocks
  const appointments = [];
  const slots = Array.isArray(scheduleData?.timeSlots) ? scheduleData.timeSlots : [];

  slots.forEach((slot) => {
    if (slot?.job) {
      const job = slot.job;
      appointments.push({
        id: job.id || `slot-${slot.hour}`,
        view: ["day", "week", "month"],
        dayIndex: todayIndex, 
        startHour: slot.hour,
        durationHours: job.durationHours || 1.0,
        title: job.title || job.serviceName || "Vehicle Service",
        car: `${job.vehicle || `${job.carMake || "Vehicle"} ${job.carModel || ""}`.trim()} · ${job.plateNumber || job.licensePlate || "N/A"}`,
        status: normalizeStatus(job.status),
        jobId: job.jobId || `#SRV-${job.id || "9000"}`,
        customer: job.customer?.name || job.customerName || "Customer Client",
        phone: job.customer?.phone || job.customerPhone || "N/A",
        vehicle: job.vehicle || `${job.carMake || ""} ${job.carModel || ""}`.trim() || "Unspecified Model",
        plate: job.plateNumber || job.licensePlate || "N/A",
        color2: job.carColor || "N/A",
        service: job.serviceName || job.title || "General Maintenance",
        tasks: Array.isArray(job.tasks) ? job.tasks : ["Standard System Operational Evaluation Check"],
        start: slot.time || `${slot.hour}:00`,
        duration: job.duration || `${job.durationHours || 1} Hour(s)`
      });
    }
  });

  const activeAppt = appointments.find((a) => a.id === selectedAppt?.id) || selectedAppt || appointments[0];

  const handleStatusChange = (id, newStatus) => {
    const targetJob = appointments.find((a) => a.id === id);
    if (targetJob) {
      updateStatusMutation.mutate({ jobId: targetJob.id, nextStatus: newStatus.toUpperCase() });
      setSelectedAppt({ ...targetJob, status: newStatus });
    }
  };

  const handleComplete = () => {
    if (activeAppt) handleStatusChange(activeAppt.id, "done");
  };

  const handleReschedule = () => {
    alert(`Reschedule flow triggered for ${activeAppt?.customer}`);
  };

  const getApptStyle = (appt) => ({
    top: `${(appt.startHour - 8) * HOUR_HEIGHT + 8}px`, // Baseline adjusted dynamically to 08:00 AM index zero offset
    height: `${appt.durationHours * HOUR_HEIGHT - 12}px`,
  });

  function BlockMenu({ appt, onStatusChange, onSelect }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const options = [
      { label: "View Details", action: () => { onSelect(); setOpen(false); } },
      { label: "Mark as Started", action: () => { onStatusChange(appt.id, "started"); setOpen(false); } },
      { label: "Mark as In Progress", action: () => { onStatusChange(appt.id, "inprogress"); setOpen(false); } },
      { label: "Mark as Done", action: () => { onStatusChange(appt.id, "done"); setOpen(false); } },
    ];

    return (
      <div ref={ref} className="absolute top-1 right-1 z-10">
        <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/30 transition-colors text-current">
          <FiMoreVertical size={12} />
        </button>
        {open && (
          <div className="absolute right-0 top-6 bg-white border border-gray-100 rounded-xl shadow-lg w-44 py-1 z-50">
            {options.map((opt) => (
              <button key={opt.label} onClick={opt.action}
                className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const ApptBlock = ({ appt, style }) => {
    const c = colorMap[appt.status] || colorMap.started;
    return (
      <div className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 cursor-pointer ${c.bg} ${c.text} overflow-visible shadow-sm hover:opacity-90 transition-opacity z-20`}
        style={style || getApptStyle(appt)}
        onClick={() => { setSelectedAppt(appt); setShowPanel(true); }}
      >
        <BlockMenu appt={appt} onStatusChange={handleStatusChange} onSelect={() => { setSelectedAppt(appt); setShowPanel(true); }} />
        <p className="text-xs font-bold leading-tight pr-4 truncate">{appt.title}</p>
        <p className="text-xs opacity-80 mt-0.5 leading-tight truncate">{appt.car}</p>
      </div>
    );
  };

  const WeekView = () => (
    <div>
      {/* Weekdays Header Row */}
      <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: "56px repeat(7, minmax(80px, 1fr))" }}>
        <div className="border-r border-gray-100" />
        {WEEK_DAYS.map((day, i) => (
          <div key={day} className={`text-center py-3 border-r border-gray-100 last:border-r-0 ${i === todayIndex ? "bg-blue-50" : ""}`}>
            <p className="text-xs font-semibold text-gray-400">{day}</p>
            <p className={`text-sm font-black mt-0.5 w-7 h-7 flex items-center justify-center mx-auto rounded-full ${i === todayIndex ? "bg-blue-600 text-white" : "text-gray-800"}`}>
              {weekDates[i].getDate()}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline Grid */}
      <div className="overflow-y-auto overflow-x-auto" style={{ maxHeight: "500px" }}>
        <div className="relative grid" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
          
          {/* Left Side Hours Column */}
          <div className="relative">
            {HOURS.map((h) => (
              <div key={h} className="border-b border-gray-50 flex items-start pt-1 justify-end pr-2" style={{ height: `${HOUR_HEIGHT}px` }}>
                <span className="text-xs text-gray-300 font-medium">{h}</span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {WEEK_DAYS.map((day, dayIdx) => (
            <div key={day} className={`relative border-r border-gray-50 last:border-r-0 ${dayIdx === todayIndex ? "bg-blue-50/10" : ""}`}
              style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}>
              
              {/* Draw Horizontal Row Grid Lines & "Available" Placeholders */}
              {HOURS.map((h, hi) => (
                <div key={h} className="absolute w-full border-b border-gray-50 flex items-center px-2 group transition-colors hover:bg-gray-50/50" 
                  style={{ top: `${hi * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}>
                  {/* Subtle placeholder to show the timeline is active */}
                  {dayIdx === todayIndex && (
                    <span className="text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity font-semibold cursor-pointer">
                      + Open Window
                    </span>
                  )}
                </div>
              ))}

              {/* Render Assigned Job Blocks */}
              {appointments.filter((a) => a.view.includes("week") && a.dayIndex === dayIdx).map((appt) => (
                <ApptBlock key={appt.id} appt={appt} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DayView = () => (
    <div>
      <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: "56px 1fr" }}>
        <div className="border-r border-gray-100" />
        <div className="text-center py-3 bg-blue-50">
          <p className="text-xs font-semibold text-gray-400">{serverDayName.substring(0, 3)}</p>
          <p className="text-sm font-black mt-0.5 w-7 h-7 flex items-center justify-center mx-auto rounded-full bg-blue-600 text-white">
            {new Date(rawServerDate).getDate()}
          </p>
        </div>
      </div>
      
      <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
        <div className="relative grid" style={{ gridTemplateColumns: "56px 1fr" }}>
          
          {/* Hours Column */}
          <div className="relative">
            {HOURS.map((h) => (
              <div key={h} className="border-b border-gray-50 flex items-start pt-1 justify-end pr-2" style={{ height: `${HOUR_HEIGHT}px` }}>
                <span className="text-xs text-gray-300 font-medium">{h}</span>
              </div>
            ))}
          </div>

          {/* Core Daily Track */}
          <div className="relative bg-blue-50/10" style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}>
            {HOURS.map((h, hi) => (
              <div key={h} className="absolute w-full border-b border-gray-100 flex items-center px-4 group hover:bg-white transition-colors" 
                style={{ top: `${hi * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}>
                <span className="text-xs text-gray-300 italic opacity-40 group-hover:opacity-100 font-medium transition-opacity">
                  No active bookings at {h} — Available
                </span>
              </div>
            ))}

            {/* Overlay Active Bookings */}
            {appointments.filter((a) => a.view.includes("day")).map((appt) => (
              <ApptBlock key={appt.id} appt={appt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MonthView = () => (
    <div className="p-8 text-center text-xs text-gray-400 font-medium bg-gray-50/50">
      <p className="text-sm font-bold text-gray-700 mb-1">📅 Month Overview Manifest</p>
      Displaying active scheduling slots contextually calculated for {displayDateLabel}.
      <div className="mt-4 max-w-md mx-auto space-y-2 text-left">
        {appointments.length === 0 ? (
          <div className="p-4 border border-dashed rounded-lg text-center text-[11px] text-gray-400">
            No entries loaded for this month cycle view.
          </div>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} onClick={() => { setSelectedAppt(appt); setShowPanel(true); }}
              className="p-3 bg-white rounded-lg border border-gray-100 flex justify-between items-center cursor-pointer shadow-sm hover:border-blue-300 transition-colors">
              <div>
                <p className="font-bold text-gray-800 text-xs">{appt.title}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{appt.car} • {appt.start}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${statusBadge[appt.status]}`}>
                {statusLabel[appt.status]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {isLoading ? (
            <div className="h-[550px] w-full flex items-center justify-center text-xs font-semibold tracking-wider text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
              ⚡ SYNCHRONIZING REAL-TIME REPAIR PIPELINE...
            </div>
          ) : (
            <div className="flex flex-col xl:flex-row gap-4">

              {/* TIMELINE INTERACTIVE MAIN CONTAINER */}
              <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div>
                    <h1 className="text-lg font-black text-gray-800">Schedule View</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{displayDateLabel}</p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    {["Day", "Week", "Month"].map((v) => (
                      <button key={v} onClick={() => { setViewMode(v); setShowPanel(false); }}
                        className={`px-4 py-1.5 text-xs font-semibold transition-colors ${viewMode === v ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                {viewMode === "Week" && <WeekView />}
                {viewMode === "Day" && <DayView />}
                {viewMode === "Month" && <MonthView />}
              </div>

              {/* SLIDEOUT SIDE DETAILS PANEL */}
              {showPanel && activeAppt && (
                <div className="w-full xl:w-72 xl:shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden xl:self-start">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800">Appointment Details</p>
                    <button onClick={() => setShowPanel(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiX size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${statusBadge[activeAppt.status]}`}>
                      {statusLabel[activeAppt.status]}
                    </span>
                    <span className="text-xs text-gray-400">{activeAppt.jobId}</span>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Customer</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                        {activeAppt.customer.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{activeAppt.customer}</p>
                        <p className="text-xs text-gray-400">{activeAppt.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-white border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Vehicle</p>
                    <p className="text-xs font-bold text-gray-800">{activeAppt.vehicle}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activeAppt.plate} · {activeAppt.color2}</p>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Service</p>
                    <p className="text-xs font-bold text-gray-800 mb-2">{activeAppt.service}</p>
                    <div className="flex flex-col gap-1">
                      {activeAppt.tasks.map((task) => (
                        <div key={task} className="flex items-center gap-1.5">
                          <FiCheck size={11} className="text-green-500 shrink-0" />
                          <span className="text-xs text-gray-500 leading-tight">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border-b border-gray-100">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 border-r border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Start</p>
                        <p className="text-sm font-black text-gray-800">{activeAppt.start}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Duration</p>
                        <p className="text-sm font-black text-gray-800">{activeAppt.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-4 flex flex-col gap-2 bg-white">
                    <button onClick={handleComplete}
                      disabled={activeAppt.status === "done" || updateStatusMutation.isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                      {updateStatusMutation.isLoading ? "Saving State..." : "Complete Job"}
                    </button>
                    <button onClick={handleReschedule}
                      className="w-full border border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>
    </div>
  );
}