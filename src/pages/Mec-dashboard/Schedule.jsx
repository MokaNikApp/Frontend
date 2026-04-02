import { useState, useRef, useEffect } from "react";
import { FiX, FiCheck, FiMoreVertical } from "react-icons/fi";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
const WEEK_DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const HOUR_HEIGHT = 80;

// Blue = In Progress | Green = Done | Orange = Started
const colorMap = {
  inprogress: { bg: "bg-blue-600",   text: "text-white" },
  done:       { bg: "bg-green-500",  text: "text-white" },
  started:    { bg: "bg-orange-400", text: "text-white" },
};

const statusBadge = {
  inprogress: "bg-orange-400 text-white",
  done:       "bg-green-100 text-green-700",
  started:    "bg-blue-100 text-blue-700",
};

const statusLabel = {
  inprogress: "IN PROGRESS",
  done:       "DONE",
  started:    "STARTED",
};

const BASE_APPOINTMENTS = [
  // WEEK + DAY
  { id: 1, view: ["week","day"], dayIndex: 1, startHour: 10, durationHours: 1.5,
    title: "Brake Service", car: "BMW X5 · AB-7234", status: "inprogress", jobId: "#SRV-9021",
    customer: "Johnathan Doe", phone: "+1 (550) 012-3456", vehicle: "2021 BMW X5 M-Sport",
    plate: "AB-1234", color2: "Alpine White", service: "Full Brake System Service",
    tasks: ["Front Pads Replacement", "Rotor Inspection", "Brake Fluid Flush"],
    start: "10:30 AM", duration: "2.5 Hours" },
  { id: 2, view: ["week"], dayIndex: 3, startHour: 10, durationHours: 1,
    title: "Oil Change", car: "Audi A4 · SJ-9921", status: "done", jobId: "#SRV-9022",
    customer: "Sarah Johnson", phone: "+1 (550) 098-7654", vehicle: "2020 Audi A4",
    plate: "SJ-9921", color2: "Glacier White", service: "Full Synthetic Oil Change",
    tasks: ["Drain & Replace Oil", "Replace Oil Filter", "Check Fluid Levels"],
    start: "10:00 AM", duration: "1.0 Hour" },
  { id: 3, view: ["week"], dayIndex: 4, startHour: 11, durationHours: 2,
    title: "Engine Diagnostic", car: "Toyota Camry · TX-3127", status: "started", jobId: "#SRV-9023",
    customer: "Mike Torres", phone: "+1 (550) 345-6789", vehicle: "2019 Toyota Camry",
    plate: "TX-3127", color2: "Midnight Black", service: "Full Engine Diagnostic",
    tasks: ["OBD-II Scan", "Check Engine Light Analysis", "Report & Estimate"],
    start: "11:00 AM", duration: "2.0 Hours" },
  { id: 4, view: ["week"], dayIndex: 0, startHour: 9, durationHours: 1,
    title: "Tire Rotation", car: "Honda CR-V · HN-4421", status: "done", jobId: "#SRV-9024",
    customer: "Emily Ross", phone: "+1 (550) 221-9900", vehicle: "2022 Honda CR-V",
    plate: "HN-4421", color2: "Sonic Gray", service: "Tire Rotation & Balance",
    tasks: ["Rotate All 4 Tires", "Rebalance Wheels", "Check Tire Pressure"],
    start: "09:00 AM", duration: "1.0 Hour" },
  { id: 5, view: ["week"], dayIndex: 5, startHour: 9, durationHours: 1,
    title: "AC Service", car: "Ford F-150 · FD-8812", status: "started", jobId: "#SRV-9025",
    customer: "James Carter", phone: "+1 (550) 667-3341", vehicle: "2020 Ford F-150",
    plate: "FD-8812", color2: "Oxford White", service: "AC System Recharge",
    tasks: ["Check Refrigerant", "Recharge AC System", "Test Cooling Output"],
    start: "09:00 AM", duration: "1.0 Hour" },
  // DAY only
  { id: 6, view: ["day"], dayIndex: 1, startHour: 9, durationHours: 1,
    title: "Inspection", car: "Kia Sportage · KS-1123", status: "done", jobId: "#SRV-9026",
    customer: "Lena Marsh", phone: "+1 (550) 112-5566", vehicle: "2021 Kia Sportage",
    plate: "KS-1123", color2: "Snow White", service: "Annual Vehicle Inspection",
    tasks: ["Safety Check", "Lights & Signals", "Fluid Levels"],
    start: "09:00 AM", duration: "1.0 Hour" },
  // MONTH
  { id: 7, view: ["month"], week: 1, dayIndex: 1, startHour: 10, durationHours: 1,
    title: "Brake Service", car: "BMW X5 · AB-7234", status: "inprogress", jobId: "#SRV-9021",
    customer: "Johnathan Doe", phone: "+1 (550) 012-3456", vehicle: "2021 BMW X5 M-Sport",
    plate: "AB-1234", color2: "Alpine White", service: "Full Brake System Service",
    tasks: ["Front Pads Replacement", "Rotor Inspection", "Brake Fluid Flush"],
    start: "10:30 AM", duration: "2.5 Hours" },
  { id: 8, view: ["month"], week: 1, dayIndex: 4, startHour: 11, durationHours: 1,
    title: "Engine Diagnostic", car: "Toyota Camry · TX-3127", status: "started", jobId: "#SRV-9023",
    customer: "Mike Torres", phone: "+1 (550) 345-6789", vehicle: "2019 Toyota Camry",
    plate: "TX-3127", color2: "Midnight Black", service: "Full Engine Diagnostic",
    tasks: ["OBD-II Scan", "Check Engine Light", "Report & Estimate"],
    start: "11:00 AM", duration: "2.0 Hours" },
  { id: 9, view: ["month"], week: 2, dayIndex: 0, startHour: 9, durationHours: 1,
    title: "Oil Change", car: "Audi A4 · SJ-9921", status: "done", jobId: "#SRV-9022",
    customer: "Sarah Johnson", phone: "+1 (550) 098-7654", vehicle: "2020 Audi A4",
    plate: "SJ-9921", color2: "Glacier White", service: "Full Synthetic Oil Change",
    tasks: ["Drain & Replace Oil", "Replace Oil Filter", "Check Fluid Levels"],
    start: "09:00 AM", duration: "1.0 Hour" },
  { id: 10, view: ["month"], week: 2, dayIndex: 3, startHour: 11, durationHours: 1,
    title: "Tire Rotation", car: "Honda CR-V · HN-4421", status: "done", jobId: "#SRV-9024",
    customer: "Emily Ross", phone: "+1 (550) 221-9900", vehicle: "2022 Honda CR-V",
    plate: "HN-4421", color2: "Sonic Gray", service: "Tire Rotation & Balance",
    tasks: ["Rotate All 4 Tires", "Rebalance Wheels", "Tire Pressure Check"],
    start: "11:00 AM", duration: "1.0 Hour" },
  { id: 11, view: ["month"], week: 3, dayIndex: 2, startHour: 10, durationHours: 1,
    title: "AC Service", car: "Ford F-150 · FD-8812", status: "started", jobId: "#SRV-9025",
    customer: "James Carter", phone: "+1 (550) 667-3341", vehicle: "2020 Ford F-150",
    plate: "FD-8812", color2: "Oxford White", service: "AC System Recharge",
    tasks: ["Check Refrigerant", "Recharge AC", "Test Cooling Output"],
    start: "10:00 AM", duration: "1.0 Hour" },
  { id: 12, view: ["month"], week: 3, dayIndex: 5, startHour: 9, durationHours: 1,
    title: "Inspection", car: "Kia Sportage · KS-1123", status: "done", jobId: "#SRV-9026",
    customer: "Lena Marsh", phone: "+1 (550) 112-5566", vehicle: "2021 Kia Sportage",
    plate: "KS-1123", color2: "Snow White", service: "Annual Inspection",
    tasks: ["Safety Check", "Lights & Signals", "Fluid Levels"],
    start: "09:00 AM", duration: "1.0 Hour" },
];

const MONTH_WEEKS = [
  { label: "Week 1 (Oct 1–7)", wi: 1 },
  { label: "Week 2 (Oct 8–14)", wi: 2 },
  { label: "Week 3 (Oct 15–21)", wi: 3 },
  { label: "Week 4 (Oct 22–28)", wi: 4 },
];

const BASE_MONDAY = new Date(2023, 9, 23);

function getWeekDates(mon) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    return d;
  });
}

// Three dots block menu
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
    { label: "Reschedule", action: () => { alert(`Reschedule: ${appt.customer} — ${appt.service}`); setOpen(false); } },
  ];

  return (
    <div ref={ref} className="absolute top-1 right-1 z-10">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/30 transition-colors"
      >
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

export default function Schedule() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState("Week");
  const [selectedAppt, setSelectedAppt] = useState(BASE_APPOINTMENTS[0]);
  const [showPanel, setShowPanel] = useState(true);
  const [statuses, setStatuses] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);
  const weekDates = getWeekDates(BASE_MONDAY);
  const todayIndex = 1;

  const getStatus = (appt) => statuses[appt.id] || appt.status;

  const handleStatusChange = (id, newStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
    const appt = BASE_APPOINTMENTS.find((a) => a.id === id);
    if (appt) setSelectedAppt({ ...appt, status: newStatus });
  };

  const handleComplete = () => handleStatusChange(selectedAppt.id, "done");

  const handleReschedule = () => {
    alert(`Reschedule requested for ${selectedAppt.customer} — ${selectedAppt.service}`);
  };

  const getApptStyle = (appt) => ({
    top: `${(appt.startHour - 9) * HOUR_HEIGHT + 8}px`,
    height: `${appt.durationHours * HOUR_HEIGHT - 12}px`,
  });

  const ApptBlock = ({ appt, style, wide = false }) => {
    const status = getStatus(appt);
    const c = colorMap[status];
    return (
      <div
        className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 cursor-pointer ${c.bg} ${c.text} overflow-visible shadow-sm hover:opacity-90 transition-opacity`}
        style={style || getApptStyle(appt)}
        onClick={() => { setSelectedAppt({ ...appt, status }); setShowPanel(true); }}
      >
        <BlockMenu
          appt={appt}
          onStatusChange={handleStatusChange}
          onSelect={() => { setSelectedAppt({ ...appt, status }); setShowPanel(true); }}
        />
        <p className="text-xs font-bold leading-tight pr-4">{appt.title}</p>
        <p className="text-xs opacity-80 mt-0.5 leading-tight">{appt.car}</p>
      </div>
    );
  };

  // ── WEEK VIEW ──
  const WeekView = () => (
    <div>
      <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
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
      <div className="overflow-y-auto" style={{ maxHeight: "420px" }}>
        <div className="relative grid" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
          <div className="relative">
            {HOURS.map((h) => (
              <div key={h} className="border-b border-gray-50 flex items-start pt-1 justify-end pr-2" style={{ height: `${HOUR_HEIGHT}px` }}>
                <span className="text-xs text-gray-300">{h}</span>
              </div>
            ))}
          </div>
          {WEEK_DAYS.map((day, dayIdx) => (
            <div key={day} className={`relative border-r border-gray-50 last:border-r-0 ${dayIdx === todayIndex ? "bg-blue-50/30" : ""}`}
              style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}>
              {HOURS.map((h, hi) => (
                <div key={h} className="absolute w-full border-b border-gray-50" style={{ top: `${hi * HOUR_HEIGHT}px` }} />
              ))}
              {dayIdx === 2 && (
                <div className="absolute w-full flex items-center justify-center" style={{ top: `${(12 - 9) * HOUR_HEIGHT + 30}px` }}>
                  <span className="text-xs text-gray-300 tracking-widest uppercase">Lunch Break</span>
                </div>
              )}
              {BASE_APPOINTMENTS.filter((a) => a.view.includes("week") && a.dayIndex === dayIdx).map((appt) => (
                <ApptBlock key={appt.id} appt={appt} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── DAY VIEW ──
  const DayView = () => (
    <div>
      <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: "56px 1fr" }}>
        <div className="border-r border-gray-100" />
        <div className="text-center py-3 bg-blue-50">
          <p className="text-xs font-semibold text-gray-400">TUE</p>
          <p className="text-sm font-black mt-0.5 w-7 h-7 flex items-center justify-center mx-auto rounded-full bg-blue-600 text-white">24</p>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "420px" }}>
        <div className="relative grid" style={{ gridTemplateColumns: "56px 1fr" }}>
          <div className="relative">
            {HOURS.map((h) => (
              <div key={h} className="border-b border-gray-50 flex items-start pt-1 justify-end pr-2" style={{ height: `${HOUR_HEIGHT}px` }}>
                <span className="text-xs text-gray-300">{h}</span>
              </div>
            ))}
          </div>
          <div className="relative bg-blue-50/30" style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}>
            {HOURS.map((h, hi) => (
              <div key={h} className="absolute w-full border-b border-gray-50" style={{ top: `${hi * HOUR_HEIGHT}px` }} />
            ))}
            {BASE_APPOINTMENTS.filter((a) => a.view.includes("day")).map((appt) => (
              <ApptBlock key={appt.id} appt={appt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── MONTH VIEW ──
  const MonthView = () => (
    <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
      {MONTH_WEEKS.map(({ label, wi }) => {
        const wAppts = BASE_APPOINTMENTS.filter((a) => a.view.includes("month") && a.week === wi);
        return (
          <div key={label} className="border-b border-gray-100 last:border-b-0">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500">{label}</p>
            </div>
            <div className="grid grid-cols-7 min-h-20">
              {WEEK_DAYS.map((day, di) => {
                const appts = wAppts.filter((a) => a.dayIndex === di);
                return (
                  <div key={day} className={`border-r border-gray-50 last:border-r-0 p-1 ${di === todayIndex && wi === 1 ? "bg-blue-50/30" : ""}`}>
                    <p className="text-xs text-gray-300 mb-1">{day}</p>
                    {appts.map((appt) => {
                      const status = getStatus(appt);
                      const c = colorMap[status];
                      return (
                        <div key={appt.id} className={`relative rounded px-1.5 py-1 mb-1 cursor-pointer ${c.bg} ${c.text} hover:opacity-90 transition-opacity`}
                          onClick={() => { setSelectedAppt({ ...appt, status }); setShowPanel(true); }}>
                          <BlockMenu appt={appt} onStatusChange={handleStatusChange}
                            onSelect={() => { setSelectedAppt({ ...appt, status }); setShowPanel(true); }} />
                          <p className="text-xs font-bold truncate pr-4">{appt.title}</p>
                          <p className="text-xs opacity-75 truncate">{appt.start}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const currentStatus = getStatus(selectedAppt);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex-1 overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} />
        <div className="p-4 sm:p-6">
          <div className="flex gap-4">

            {/* CALENDAR */}
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h1 className="text-lg font-black text-gray-800">Schedule View</h1>
                  <p className="text-xs text-gray-400 mt-0.5">October 24, 2023</p>
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  {["Day", "Week", "Month"].map((v) => (
                    <button key={v} onClick={() => setViewMode(v)}
                      className={`px-4 py-1.5 text-xs font-semibold transition-colors ${viewMode === v ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {viewMode === "Week"  && <WeekView />}
              {viewMode === "Day"   && <DayView />}
              {viewMode === "Month" && <MonthView />}
            </div>

            {/* APPOINTMENT DETAILS */}
            {showPanel && selectedAppt && (
              <div className="w-64 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden self-start">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800">Appointment Details</p>
                  <button onClick={() => setShowPanel(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FiX size={16} />
                  </button>
                </div>

                {/* STATUS */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${statusBadge[currentStatus]}`}>
                    {statusLabel[currentStatus]}
                  </span>
                  <span className="text-xs text-gray-400">{selectedAppt.jobId}</span>
                </div>

                {/* CUSTOMER */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Customer</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                      {selectedAppt.customer.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{selectedAppt.customer}</p>
                      <p className="text-xs text-gray-400">{selectedAppt.phone}</p>
                    </div>
                  </div>
                </div>

                {/* VEHICLE */}
                <div className="px-4 py-3 bg-white border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Vehicle</p>
                  <p className="text-xs font-bold text-gray-800">{selectedAppt.vehicle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedAppt.plate} · {selectedAppt.color2}</p>
                </div>

                {/* SERVICE */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Service</p>
                  <p className="text-xs font-bold text-gray-800 mb-2">{selectedAppt.service}</p>
                  <div className="flex flex-col gap-1">
                    {selectedAppt.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-1.5">
                        <FiCheck size={11} className="text-green-500 shrink-0" />
                        <span className="text-xs text-gray-500">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* START | DURATION */}
                <div className="bg-white border-b border-gray-100">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-3 border-r border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Start</p>
                      <p className="text-sm font-black text-gray-800">{selectedAppt.start}</p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Duration</p>
                      <p className="text-sm font-black text-gray-800">{selectedAppt.duration}</p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="px-4 py-4 flex flex-col gap-2 bg-white">
                  <button onClick={handleComplete}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                    Complete Job
                  </button>
                  <button onClick={handleReschedule}
                    className="w-full border border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}