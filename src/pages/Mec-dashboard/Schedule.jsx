









// import React, { useState, useEffect, useMemo } from "react";
// import {
//   X,
//   User,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   Calendar,
//   Clock,
//   Wrench,
//   Car,
//   Phone,
//   MapPin,
//   CreditCard,
//   FileText,
//   AlertCircle,
// } from "lucide-react";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";


// // ─── Static Mock Data (from your API response) ─────────────────────

// const MOCK_SCHEDULE_WEEK = [
//   {
//     date: "2026-06-21",
//     dayName: "Sunday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       { time: "14:00", hour: 14, job: null },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-22",
//     dayName: "Monday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       {
//         time: "09:00",
//         hour: 9,
//         job: {
//           id: "job-001",
//           title: "Brake Pad Replacement",
//           status: "IN_PROGRESS",
//           scheduledAt: "2026-06-22T09:00:00Z",
//           duration: "2 Hours",
//           customerName: "Johnathan Doe",
//           phone: "+1 (555) 012-3456",
//           vehicle: "2021 BMW X5 M-Sport",
//           plateNumber: "AB-1234",
//           vehicleColor: "Alpine White",
//           serviceName: "Full Brake System Service",
//           serviceItems: ["Front Pads Replacement", "Rotor Inspection", "Brake Fluid Flush", "Caliper Check"],
//           notes: "Customer mentioned squeaking noise from front left wheel",
//           price: 245.00,
//           location: "Bay 3",
//           user: { firstName: "Johnathan", lastName: "Doe", phone: "+1 (555) 012-3456" },
//         },
//       },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       {
//         time: "12:00",
//         hour: 12,
//         job: {
//           id: "job-002",
//           title: "Oil Change",
//           status: "CONFIRMED",
//           scheduledAt: "2026-06-22T12:00:00Z",
//           duration: "1 Hour",
//           customerName: "Sarah Miller",
//           phone: "+1 (555) 987-6543",
//           vehicle: "2019 Audi A4 Premium",
//           plateNumber: "KL-9921",
//           vehicleColor: "Mythos Black",
//           serviceName: "Full Synthetic Oil Change",
//           serviceItems: ["Oil Filter Replacement", "Drain Plug Inspection", "Fluid Top-up", "Multi-point Inspection"],
//           notes: "",
//           price: 89.99,
//           location: "Bay 1",
//           user: { firstName: "Sarah", lastName: "Miller", phone: "+1 (555) 987-6543" },
//         },
//       },
//       { time: "13:00", hour: 13, job: null },
//       {
//         time: "14:00",
//         hour: 14,
//         job: {
//           id: "job-003",
//           title: "Engine Diagnostics",
//           status: "CONFIRMED",
//           scheduledAt: "2026-06-22T14:00:00Z",
//           duration: "1.5 Hours",
//           customerName: "Mike Johnson",
//           phone: "+1 (555) 456-7890",
//           vehicle: "2020 Toyota RAV4 LE",
//           plateNumber: "TX-4421",
//           vehicleColor: "Super White",
//           serviceName: "Engine Diagnostic Check",
//           serviceItems: ["Error Code Scan", "Sensor Testing", "Report Generation", "Throttle Body Cleaning"],
//           notes: "Check engine light came on yesterday",
//           price: 150.00,
//           location: "Bay 2",
//           user: { firstName: "Mike", lastName: "Johnson", phone: "+1 (555) 456-7890" },
//         },
//       },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       {
//         time: "17:00",
//         hour: 17,
//         job: {
//           id: "job-004",
//           title: "Tire Rotation",
//           status: "UPCOMING",
//           scheduledAt: "2026-06-22T17:00:00Z",
//           duration: "45 Minutes",
//           customerName: "Emily Chen",
//           phone: "+1 (555) 234-5678",
//           vehicle: "2022 Honda Civic Sport",
//           plateNumber: "CA-8832",
//           vehicleColor: "Rallye Red",
//           serviceName: "Tire Rotation & Balance",
//           serviceItems: ["Tire Rotation", "Wheel Balance", "Pressure Check", "Tread Depth Inspection"],
//           notes: "",
//           price: 65.00,
//           location: "Bay 4",
//           user: { firstName: "Emily", lastName: "Chen", phone: "+1 (555) 234-5678" },
//         },
//       },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-23",
//     dayName: "Tuesday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       {
//         time: "10:00",
//         hour: 10,
//         job: {
//           id: "job-005",
//           title: "AC Repair",
//           status: "CONFIRMED",
//           scheduledAt: "2026-06-23T10:00:00Z",
//           duration: "2 Hours",
//           customerName: "Robert Wilson",
//           phone: "+1 (555) 876-5432",
//           vehicle: "2018 Ford F-150",
//           plateNumber: "TX-1199",
//           vehicleColor: "Magnetic Gray",
//           serviceName: "Air Conditioning Repair",
//           serviceItems: ["Refrigerant Recharge", "Leak Detection", "Compressor Check", "Vent Inspection"],
//           notes: "AC blowing warm air",
//           price: 320.00,
//           location: "Bay 2",
//           user: { firstName: "Robert", lastName: "Wilson", phone: "+1 (555) 876-5432" },
//         },
//       },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       {
//         time: "14:00",
//         hour: 14,
//         job: {
//           id: "job-006",
//           title: "Transmission Service",
//           status: "WAITING",
//           scheduledAt: "2026-06-23T14:00:00Z",
//           duration: "3 Hours",
//           customerName: "Lisa Anderson",
//           phone: "+1 (555) 345-6789",
//           vehicle: "2017 Mercedes C300",
//           plateNumber: "NY-5543",
//           vehicleColor: "Iridium Silver",
//           serviceName: "Transmission Fluid Service",
//           serviceItems: ["Fluid Drain", "Filter Replacement", "Pan Gasket", "Test Drive"],
//           notes: "Delayed shifting between 2nd and 3rd gear",
//           price: 450.00,
//           location: "Bay 3",
//           user: { firstName: "Lisa", lastName: "Anderson", phone: "+1 (555) 345-6789" },
//         },
//       },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-24",
//     dayName: "Wednesday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       { time: "14:00", hour: 14, job: null },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-25",
//     dayName: "Thursday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       { time: "14:00", hour: 14, job: null },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-26",
//     dayName: "Friday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       { time: "14:00", hour: 14, job: null },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
//   {
//     date: "2026-06-27",
//     dayName: "Saturday",
//     timeSlots: [
//       { time: "08:00", hour: 8, job: null },
//       { time: "09:00", hour: 9, job: null },
//       { time: "10:00", hour: 10, job: null },
//       { time: "11:00", hour: 11, job: null },
//       { time: "12:00", hour: 12, job: null },
//       { time: "13:00", hour: 13, job: null },
//       { time: "14:00", hour: 14, job: null },
//       { time: "15:00", hour: 15, job: null },
//       { time: "16:00", hour: 16, job: null },
//       { time: "17:00", hour: 17, job: null },
//       { time: "18:00", hour: 18, job: null },
//       { time: "19:00", hour: 19, job: null },
//       { time: "20:00", hour: 20, job: null },
//     ],
//   },
// ];

// const MOCK_SCHEDULE_DAY = {
//   date: "2026-06-22",
//   dayName: "Monday",
//   timeSlots: [
//     { time: "08:00", hour: 8, job: null },
//     {
//       time: "09:00",
//       hour: 9,
//       job: {
//         id: "job-001",
//         title: "Brake Pad Replacement",
//         status: "IN_PROGRESS",
//         scheduledAt: "2026-06-22T09:00:00Z",
//         duration: "2 Hours",
//         customerName: "Johnathan Doe",
//         phone: "+1 (555) 012-3456",
//         vehicle: "2021 BMW X5 M-Sport",
//         plateNumber: "AB-1234",
//         vehicleColor: "Alpine White",
//         serviceName: "Full Brake System Service",
//         serviceItems: ["Front Pads Replacement", "Rotor Inspection", "Brake Fluid Flush", "Caliper Check"],
//         notes: "Customer mentioned squeaking noise from front left wheel",
//         price: 245.00,
//         location: "Bay 3",
//         user: { firstName: "Johnathan", lastName: "Doe", phone: "+1 (555) 012-3456" },
//       },
//     },
//     { time: "10:00", hour: 10, job: null },
//     { time: "11:00", hour: 11, job: null },
//     {
//       time: "12:00",
//       hour: 12,
//       job: {
//         id: "job-002",
//         title: "Oil Change",
//         status: "CONFIRMED",
//         scheduledAt: "2026-06-22T12:00:00Z",
//         duration: "1 Hour",
//         customerName: "Sarah Miller",
//         phone: "+1 (555) 987-6543",
//         vehicle: "2019 Audi A4 Premium",
//         plateNumber: "KL-9921",
//         vehicleColor: "Mythos Black",
//         serviceName: "Full Synthetic Oil Change",
//         serviceItems: ["Oil Filter Replacement", "Drain Plug Inspection", "Fluid Top-up", "Multi-point Inspection"],
//         notes: "",
//         price: 89.99,
//         location: "Bay 1",
//         user: { firstName: "Sarah", lastName: "Miller", phone: "+1 (555) 987-6543" },
//       },
//     },
//     { time: "13:00", hour: 13, job: null },
//     {
//       time: "14:00",
//       hour: 14,
//       job: {
//         id: "job-003",
//         title: "Engine Diagnostics",
//         status: "CONFIRMED",
//         scheduledAt: "2026-06-22T14:00:00Z",
//         duration: "1.5 Hours",
//         customerName: "Mike Johnson",
//         phone: "+1 (555) 456-7890",
//         vehicle: "2020 Toyota RAV4 LE",
//         plateNumber: "TX-4421",
//         vehicleColor: "Super White",
//         serviceName: "Engine Diagnostic Check",
//         serviceItems: ["Error Code Scan", "Sensor Testing", "Report Generation", "Throttle Body Cleaning"],
//         notes: "Check engine light came on yesterday",
//         price: 150.00,
//         location: "Bay 2",
//         user: { firstName: "Mike", lastName: "Johnson", phone: "+1 (555) 456-7890" },
//       },
//     },
//     { time: "15:00", hour: 15, job: null },
//     { time: "16:00", hour: 16, job: null },
//     {
//       time: "17:00",
//       hour: 17,
//       job: {
//         id: "job-004",
//         title: "Tire Rotation",
//         status: "UPCOMING",
//         scheduledAt: "2026-06-22T17:00:00Z",
//         duration: "45 Minutes",
//         customerName: "Emily Chen",
//         phone: "+1 (555) 234-5678",
//         vehicle: "2022 Honda Civic Sport",
//         plateNumber: "CA-8832",
//         vehicleColor: "Rallye Red",
//         serviceName: "Tire Rotation & Balance",
//         serviceItems: ["Tire Rotation", "Wheel Balance", "Pressure Check", "Tread Depth Inspection"],
//         notes: "",
//         price: 65.00,
//         location: "Bay 4",
//         user: { firstName: "Emily", lastName: "Chen", phone: "+1 (555) 234-5678" },
//       },
//     },
//     { time: "18:00", hour: 18, job: null },
//     { time: "19:00", hour: 19, job: null },
//     { time: "20:00", hour: 20, job: null },
//   ],
// };

// // ─── Constants ─────────────────────────────────────────────────────

// const HOURS = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
//   "18:00", "19:00", "20:00",
// ];

// const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// const STATUS_CONFIG = {
//   CONFIRMED: { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600", label: "Confirmed", border: "border-blue-200" },
//   IN_PROGRESS: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600", label: "In Progress", border: "border-amber-200" },
//   COMPLETED: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", label: "Completed", border: "border-emerald-200" },
//   WAITING: { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600", label: "Waiting", border: "border-orange-200" },
//   UPCOMING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Upcoming", border: "border-slate-200" },
//   PENDING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Pending", border: "border-slate-200" },
//   CANCELLED: { color: "bg-red-500", bg: "bg-red-50", text: "text-red-600", label: "Cancelled", border: "border-red-200" },
// };

// // ─── Helpers ───────────────────────────────────────────────────────

// const getWeekDates = (baseDate) => {
//   const start = new Date(baseDate);
//   const day = start.getDay();
//   const diff = start.getDate() - day + (day === 0 ? -6 : 1);
//   start.setDate(diff);
//   start.setHours(0, 0, 0, 0);
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// const formatDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatDateShort = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });
// };

// const formatDateISO = (date) => {
//   return date.toISOString().split("T")[0];
// };

// const timeToMinutes = (timeStr) => {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToTop = (minutes) => {
//   const startMinutes = 8 * 60;
//   return ((minutes - startMinutes) / 60) * 80;
// };

// const getDurationHeight = (startTime, endTime) => {
//   const startMins = timeToMinutes(startTime);
//   const endMins = timeToMinutes(endTime);
//   return ((endMins - startMins) / 60) * 80;
// };

// const getStatusStyle = (status) => {
//   return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
// };

// // ─── Map API job from timeSlot to appointment format ───────────────

// const mapTimeSlotJobToAppointment = (job, timeStr, dateStr) => {
//   const startHour = parseInt(timeStr.split(":")[0], 10);
  
//   // Parse duration to calculate end time
//   let durationHours = 1;
//   if (job.duration) {
//     const match = job.duration.match(/(\d+(\.\d+)?)/);
//     if (match) durationHours = parseFloat(match[1]);
//   }
  
//   const endHour = startHour + durationHours;
//   const startTime = `${String(startHour).padStart(2, "0")}:00`;
//   const endMin = (durationHours % 1) * 60;
//   const endTime = `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.round(endMin)).padStart(2, "0")}`;

//   const scheduledDate = dateStr ? new Date(dateStr) : new Date();
//   scheduledDate.setHours(startHour, 0, 0, 0);

//   return {
//     id: job.id,
//     title: job.title || "Service Request",
//     status: job.status || "CONFIRMED",
//     scheduledAt: job.scheduledAt || scheduledDate.toISOString(),
//     startTime,
//     endTime,
//     duration: job.duration || "1 Hour",
//     customerName: job.user
//       ? `${job.user.firstName} ${job.user.lastName}`
//       : job.customerName || "Unknown Customer",
//     phone: job.user?.phone || job.phone || "N/A",
//     vehicle: job.vehicle || job.description || "Vehicle not specified",
//     plateNumber: job.plateNumber || "N/A",
//     vehicleColor: job.vehicleColor || "N/A",
//     serviceName: job.serviceName || job.title || "Service",
//     serviceItems: job.serviceItems || job.tasks || [],
//     notes: job.notes || "",
//     price: job.price || null,
//     location: job.location || null,
//     _raw: job,
//   };
// };

// // ─── Extract appointments from schedule data ───────────────────────

// const extractAppointmentsFromSchedule = (scheduleData) => {
//   if (!scheduleData) return [];
  
//   const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
//   const appointments = [];
//   const seenIds = new Set();

//   days.forEach((day) => {
//     if (!day?.timeSlots) return;
//     day.timeSlots.forEach((slot) => {
//       if (slot?.job && !seenIds.has(slot.job.id)) {
//         seenIds.add(slot.job.id);
//         appointments.push(mapTimeSlotJobToAppointment(slot.job, slot.time, day.date));
//       }
//     });
//   });

//   return appointments.sort((a, b) => 
//     new Date(a.scheduledAt) - new Date(b.scheduledAt)
//   );
// };

// // ─── Empty State Component ─────────────────────────────────────────

// function EmptyState({ message, submessage }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//       <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//         <Calendar size={28} className="text-gray-400" />
//       </div>
//       <p className="text-sm font-semibold text-gray-600">{message}</p>
//       {submessage && <p className="text-xs text-gray-400 mt-1">{submessage}</p>}
//     </div>
//   );
// }

// // ─── Main Component ────────────────────────────────────────────────

// export default function ScheduleView() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [viewMode, setViewMode] = useState("Week");
//   const [currentDate, setCurrentDate] = useState(new Date("2026-06-22"));
//   const [showDetails, setShowDetails] = useState(true);
//   const [showMobileDetails, setShowMobileDetails] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const handleStatusChange = (newStatus) => setIsOnline(newStatus);

//   const weekDates = getWeekDates(currentDate);

//   // ─── GET SCHEDULE DATA (static mocks) ──────────────────────────
//   const scheduleData = useMemo(() => {
//     if (viewMode === "Day") {
//       // Return day view for the selected date
//       const dateStr = formatDateISO(currentDate);
//       // In real app, fetch day view. Here we return mock day data if dates match
//       if (dateStr === "2026-06-22") return MOCK_SCHEDULE_DAY;
//       // Return empty day for other dates
//       return {
//         date: dateStr,
//         dayName: new Date(currentDate).toLocaleDateString("en-US", { weekday: "long" }),
//         timeSlots: HOURS.map(h => ({ time: h, hour: parseInt(h), job: null })),
//       };
//     }
//     return MOCK_SCHEDULE_WEEK;
//   }, [viewMode, currentDate]);

//   // Extract appointments from schedule timeSlots
//   const appointments = useMemo(
//     () => extractAppointmentsFromSchedule(scheduleData),
//     [scheduleData]
//   );

//   // Stats
//   const stats = useMemo(() => {
//     const total = appointments.length;
//     const inProgress = appointments.filter(a => a.status === "IN_PROGRESS").length;
//     const completed = appointments.filter(a => a.status === "COMPLETED").length;
//     const upcoming = appointments.filter(a => a.status === "CONFIRMED" || a.status === "UPCOMING").length;
//     return { total, inProgress, completed, upcoming };
//   }, [appointments]);

//   // Selected appointment state
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Auto-select first appointment when schedule loads
//   useEffect(() => {
//     if (appointments.length > 0 && !selectedAppointment) {
//       setSelectedAppointment(appointments[0]);
//     }
//   }, [appointments, selectedAppointment]);

//   // ─── Navigation ────────────────────────────────────────────────
//   const goToPrev = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() - 1);
//     else d.setDate(d.getDate() - 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToNext = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() + 1);
//     else d.setDate(d.getDate() + 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date("2026-06-22"));
//     setSelectedAppointment(null);
//   };

//   // ─── Appointment Click ─────────────────────────────────────────
//   const handleAppointmentClick = (apt) => {
//     setSelectedAppointment(apt);
//     if (!showDetails && !isMobile) setShowDetails(true);
//     if (isMobile) setShowMobileDetails(true);
//   };

//   const closeDetails = () => setShowDetails(false);
//   const closeMobileDetails = () => setShowMobileDetails(false);

//   // ─── Complete Job (local state only) ───────────────────────────
//   const [completingId, setCompletingId] = useState(null);

//   const handleCompleteJob = () => {
//     if (!selectedAppointment || selectedAppointment.status === "COMPLETED") return;
    
//     setCompletingId(selectedAppointment.id);
    
//     // Simulate completion delay
//     setTimeout(() => {
//       setSelectedAppointment(prev => prev ? { ...prev, status: "COMPLETED" } : null);
//       setCompletingId(null);
//     }, 800);
//   };

//   // ─── Render ────────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(1.3); opacity: 0; }
//         }
//         .animate-slide-in { animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
//         .calendar-grid {
//           display: grid;
//           grid-template-columns: 64px repeat(7, minmax(140px, 1fr));
//         }
//         .calendar-grid-mobile {
//           display: grid;
//           grid-template-columns: 52px repeat(7, minmax(110px, 1fr));
//         }
//         .time-slot {
//           height: 80px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .time-slot-mobile {
//           height: 64px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         isOnline={isOnline}
//         setIsOnline={handleStatusChange}
//       />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar
//           toggleSidebar={toggleSidebar}
//           isOnline={isOnline}
//           setIsOnline={handleStatusChange}
//         />

//         {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
//         <main className="flex-1 flex overflow-hidden relative">
          
//           {/* ─── Calendar Area ────────────────────────────────── */}
//           <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
//                   <Calendar size={20} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedule</h1>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                     {viewMode === "Day" 
//                       ? formatDate(currentDate) 
//                       : `${formatDateShort(weekDates[0])} – ${formatDateShort(weekDates[6])}`}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Stats pills (desktop) */}
//                 <div className="hidden lg:flex items-center gap-2 mr-2">
//                   <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                     {stats.total} Jobs
//                   </span>
//                   {stats.inProgress > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
//                       {stats.inProgress} Active
//                     </span>
//                   )}
//                   {stats.completed > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
//                       {stats.completed} Done
//                     </span>
//                   )}
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//                   {["Day", "Week"].map((mode) => (
//                     <button
//                       key={mode}
//                       onClick={() => {
//                         setViewMode(mode);
//                         setSelectedAppointment(null);
//                       }}
//                       className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
//                         viewMode === mode
//                           ? "bg-white text-gray-900 shadow-sm"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
//                   <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-white rounded-md transition-all">
//                     Today
//                   </button>
//                   <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 {/* Toggle details */}
//                 {!isMobile && (
//                   <button
//                     onClick={() => setShowDetails(!showDetails)}
//                     className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${
//                       showDetails ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                     title={showDetails ? "Hide details" : "Show details"}
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}

//                 {/* Mobile details toggle */}
//                 {isMobile && selectedAppointment && (
//                   <button
//                     onClick={() => setShowMobileDetails(true)}
//                     className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white"
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Days Header */}
//             <div className="overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
//               <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                 <div className="border-r border-gray-100 bg-gray-50/50"></div>
//                 {weekDates.map((date, i) => {
//                   const isToday = date.toDateString() === new Date("2026-06-22").toDateString();
//                   const isSelected = viewMode === "Day" 
//                     ? date.toDateString() === currentDate.toDateString()
//                     : date.toDateString() === currentDate.toDateString();
//                   const dayAppointments = appointments.filter((apt) => {
//                     const aptDate = new Date(apt.scheduledAt);
//                     return aptDate.toDateString() === date.toDateString();
//                   });
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => {
//                         setCurrentDate(new Date(date));
//                         if (viewMode === "Week") setViewMode("Day");
//                       }}
//                       className={`py-2.5 sm:py-3 text-center border-r border-gray-100 last:border-r-0 transition-all relative min-w-[110px] sm:min-w-[140px] ${
//                         isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
//                         isToday ? "text-blue-600" : "text-gray-400"
//                       }`}>
//                         {DAYS[i]}
//                       </p>
//                       <p className={`text-lg sm:text-xl font-bold mt-0.5 ${
//                         isToday ? "text-blue-600" : isSelected ? "text-gray-900" : "text-gray-700"
//                       }`}>
//                         {date.getDate()}
//                       </p>
//                       {dayAppointments.length > 0 && (
//                         <div className="flex justify-center gap-1 mt-1.5">
//                           {dayAppointments.slice(0, 4).map((apt, idx) => (
//                             <div 
//                               key={idx} 
//                               className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(apt.status).color}`} 
//                             />
//                           ))}
//                           {dayAppointments.length > 4 && (
//                             <span className="text-[8px] text-gray-400 ml-0.5">+{dayAppointments.length - 4}</span>
//                           )}
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Calendar Body */}
//             <div className="flex-1 overflow-auto custom-scrollbar relative bg-white">
//               {appointments.length === 0 ? (
//                 <EmptyState 
//                   message="No appointments scheduled"
//                   submessage="Select a different date or check back later"
//                 />
//               ) : (
//                 <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                   {/* Time Labels */}
//                   <div className="border-r border-gray-100 bg-gray-50/30 sticky left-0 z-10">
//                     {HOURS.map((hour) => (
//                       <div key={hour} className={`${isMobile ? "time-slot-mobile" : "time-slot"} flex items-start justify-end pr-2 sm:pr-3 pt-1 sm:pt-2`}>
//                         <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">{hour}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Day Columns */}
//                   {weekDates.map((date, dayIndex) => {
//                     const dayAppointments = appointments.filter((apt) => {
//                       const aptDate = new Date(apt.scheduledAt);
//                       return aptDate.toDateString() === date.toDateString();
//                     });

//                     const isToday = date.toDateString() === new Date("2026-06-22").toDateString();

//                     return (
//                       <div key={dayIndex} className={`relative border-r border-gray-100 last:border-r-0 min-w-[110px] sm:min-w-[140px] ${isToday ? "bg-blue-50/10" : ""}`}>
//                         {/* Hour grid lines */}
//                         {HOURS.map((_, i) => (
//                           <div key={i} className={`${isMobile ? "time-slot-mobile" : "time-slot"} ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}></div>
//                         ))}

//                         {/* Current time indicator */}
//                         {isToday && (() => {
//                           const now = new Date("2026-06-22T10:30:00"); // Simulated "now"
//                           const mins = now.getHours() * 60 + now.getMinutes();
//                           if (mins < 8 * 60 || mins > 20 * 60) return null;
//                           const top = minutesToTop(mins);
//                           return (
//                             <div 
//                               className="absolute left-0 right-0 z-20 pointer-events-none"
//                               style={{ top: `${top}px` }}
//                             >
//                               <div className="flex items-center">
//                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] ring-4 ring-red-500/20" />
//                                 <div className="flex-1 h-[2px] bg-red-500/40" />
//                               </div>
//                             </div>
//                           );
//                         })()}

//                         {/* Lunch break label */}
//                         {dayIndex === 2 && (
//                           <div className="absolute left-0 right-0 text-center pointer-events-none z-0" style={{ top: minutesToTop(12 * 60) + 20 }}>
//                             <span className="text-[9px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Lunch Break</span>
//                           </div>
//                         )}

//                         {/* Appointments */}
//                         {dayAppointments.map((apt) => {
//                           const top = minutesToTop(timeToMinutes(apt.startTime));
//                           const height = getDurationHeight(apt.startTime, apt.endTime);
//                           const isSelected = selectedAppointment?.id === apt.id;
//                           const statusStyle = getStatusStyle(apt.status);

//                           return (
//                             <div
//                               key={apt.id}
//                               onClick={() => handleAppointmentClick(apt)}
//                               className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md ${statusStyle.color} ${
//                                 isSelected ? "ring-[3px] ring-offset-2 ring-blue-500 scale-[1.02] z-10" : "hover:brightness-110"
//                               }`}
//                               style={{ top: `${top}px`, height: `${Math.max(height, 52)}px` }}
//                             >
//                               <div className="flex items-start justify-between gap-1">
//                                 <p className="text-white text-[10px] sm:text-xs font-bold leading-tight truncate flex-1">{apt.title}</p>
//                                 {apt.status === "IN_PROGRESS" && (
//                                   <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-white/80 text-[9px] sm:text-[10px] mt-1 leading-tight truncate">{apt.vehicle}</p>
//                               {height > 55 && (
//                                 <div className="mt-1.5 flex items-center gap-1">
//                                   <User size={9} className="text-white/60" />
//                                   <p className="text-white/70 text-[9px] sm:text-[10px] truncate">{apt.customerName}</p>
//                                 </div>
//                               )}
//                               {height > 70 && apt.plateNumber !== "N/A" && (
//                                 <p className="text-white/60 text-[9px] mt-1 truncate font-mono">{apt.plateNumber}</p>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ─── Desktop Details Sidebar ─────────── */}
//           {showDetails && !isMobile && (
//             <div className="hidden sm:flex w-[360px] lg:w-[400px] bg-white border-l border-gray-100 flex-col shadow-xl overflow-hidden animate-fade-in">
//               <DetailsPanel 
//                 appointment={selectedAppointment}
//                 onComplete={handleCompleteJob}
//                 onClose={closeDetails}
//                 isCompleting={completingId === selectedAppointment?.id}
//               />
//             </div>
//           )}

//           {/* ─── Mobile Details Overlay ─────────────────── */}
//           {isMobile && showMobileDetails && (
//             <>
//               <div 
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in sm:hidden"
//                 onClick={closeMobileDetails}
//               />
//               <div className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-[400px] bg-white z-50 animate-slide-in sm:hidden flex flex-col shadow-2xl">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
//                   <h2 className="text-base font-bold text-gray-900">Appointment Details</h2>
//                   <button
//                     onClick={closeMobileDetails}
//                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                   <DetailsPanel 
//                     appointment={selectedAppointment}
//                     onComplete={handleCompleteJob}
//                     onClose={closeMobileDetails}
//                     isCompleting={completingId === selectedAppointment?.id}
//                     isMobile={true}
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// // ─── Details Panel Component ─────────────────────────────────────

// function DetailsPanel({ appointment, onComplete, onClose, isCompleting, isMobile = false }) {
//   if (!appointment) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//           <Calendar size={28} className="text-gray-400" />
//         </div>
//         <p className="text-sm font-semibold text-gray-600">No appointment selected</p>
//         <p className="text-xs text-gray-400 mt-1">Click on a job in the calendar to view details</p>
//       </div>
//     );
//   }

//   const statusStyle = getStatusStyle(appointment.status);
//   const isDone = appointment.status === "COMPLETED";

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       {/* Header */}
//       {!isMobile && (
//         <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <h2 className="text-base font-bold text-gray-900">Job Details</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-4' : 'p-5'}`}>
//         {/* Status Banner */}
//         <div className={`flex items-center justify-between p-3 rounded-xl ${statusStyle.bg} border ${statusStyle.border} mb-5`}>
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2 h-2 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
//               {statusStyle.label}
//             </span>
//           </div>
//           <span className="text-[10px] text-gray-400 font-medium font-mono bg-white/60 px-2 py-0.5 rounded">
//             #{appointment.id?.slice(-6).toUpperCase()}
//           </span>
//         </div>

//         {/* Service Title */}
//         <div className="mb-5">
//           <h3 className="text-base font-bold text-gray-900 leading-tight">{appointment.serviceName}</h3>
//           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
//             <Wrench size={12} className="text-gray-400" />
//             {appointment.title}
//           </p>
//         </div>

//         {/* Customer Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <User size={10} /> Customer
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
//               <User size={20} className="text-gray-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-gray-900 truncate">{appointment.customerName}</p>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Phone size={10} className="text-gray-400" />
//                 <p className="text-xs text-gray-500">{appointment.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <Car size={10} /> Vehicle
//           </p>
//           <p className="text-sm font-bold text-gray-900">{appointment.vehicle}</p>
//           <div className="flex flex-wrap items-center gap-2 mt-2.5">
//             {appointment.plateNumber !== "N/A" && (
//               <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 font-mono tracking-wide">
//                 {appointment.plateNumber}
//               </span>
//             )}
//             {appointment.vehicleColor !== "N/A" && (
//               <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
//                 <span 
//                   className="w-3 h-3 rounded-full border border-gray-300" 
//                   style={{ 
//                     backgroundColor: appointment.vehicleColor.toLowerCase().includes("white") 
//                       ? "#f3f4f6" 
//                       : appointment.vehicleColor.toLowerCase().includes("black")
//                       ? "#374151"
//                       : appointment.vehicleColor.toLowerCase().includes("red")
//                       ? "#ef4444"
//                       : appointment.vehicleColor.toLowerCase().includes("blue")
//                       ? "#3b82f6"
//                       : appointment.vehicleColor.toLowerCase().includes("silver")
//                       ? "#9ca3af"
//                       : "#d1d5db"
//                   }}
//                 />
//                 {appointment.vehicleColor}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Time & Location Grid */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Start
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.startTime}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">
//               {new Date(appointment.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//             </p>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Duration
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.duration}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">Estimated</p>
//           </div>
//         </div>

//         {/* Location */}
//         {appointment.location && (
//           <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
//             <MapPin size={14} className="text-gray-400" />
//             <span className="text-xs font-medium text-gray-600">{appointment.location}</span>
//           </div>
//         )}

//         {/* Service Checklist */}
//         {appointment.serviceItems && appointment.serviceItems.length > 0 && (
//           <div className="mb-5">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//               <FileText size={10} /> Service Checklist
//             </p>
//             <div className="space-y-2">
//               {appointment.serviceItems.map((item, i) => (
//                 <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
//                   isDone 
//                     ? "bg-emerald-50/50 border-emerald-100" 
//                     : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
//                 }`}>
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//                     isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
//                   }`}>
//                     <Check size={11} strokeWidth={3} />
//                   </div>
//                   <span className={`text-xs leading-relaxed ${isDone ? "text-gray-700 font-medium" : "text-gray-500"}`}>
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notes */}
//         {appointment.notes && (
//           <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
//             <div className="flex items-center gap-1.5 mb-1.5">
//               <AlertCircle size={12} className="text-amber-500" />
//               <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Notes</p>
//             </div>
//             <p className="text-xs text-amber-800 leading-relaxed">{appointment.notes}</p>
//           </div>
//         )}

//         {/* Price */}
//         {appointment.price && (
//           <div className="mb-5 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
//             <div className="flex items-center gap-2">
//               <CreditCard size={14} className="text-emerald-600" />
//               <span className="text-xs font-semibold text-emerald-700">Estimated Price</span>
//             </div>
//             <span className="text-sm font-bold text-emerald-700">${appointment.price.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Actions */}
//         <div className={`${isMobile ? 'pt-2 pb-6' : 'pt-2 pb-4'} space-y-2.5`}>
//           <button
//             onClick={onComplete}
//             disabled={isDone || isCompleting}
//             className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
//               isDone
//                 ? "bg-emerald-100 text-emerald-700 cursor-default"
//                 : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
//             }`}
//           >
//             {isCompleting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Completing...
//               </>
//             ) : isDone ? (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Job Completed
//               </>
//             ) : (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Complete Job
//               </>
//             )}
//           </button>
          
//           {!isDone && (
//             <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
//               Reschedule
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








// import React, { useState, useEffect, useMemo } from "react";
// import {
//   X,
//   User,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   Calendar,
//   Clock,
//   Wrench,
//   Car,
//   Phone,
//   MapPin,
//   CreditCard,
//   FileText,
//   AlertCircle,
// } from "lucide-react";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";


// // ─── Constants ─────────────────────────────────────────────────────

// const HOURS = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
//   "18:00", "19:00", "20:00",
// ];

// const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// const STATUS_CONFIG = {
//   CONFIRMED: { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600", label: "Confirmed", border: "border-blue-200" },
//   IN_PROGRESS: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600", label: "In Progress", border: "border-amber-200" },
//   COMPLETED: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", label: "Completed", border: "border-emerald-200" },
//   WAITING: { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600", label: "Waiting", border: "border-orange-200" },
//   UPCOMING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Upcoming", border: "border-slate-200" },
//   PENDING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Pending", border: "border-slate-200" },
//   CANCELLED: { color: "bg-red-500", bg: "bg-red-50", text: "text-red-600", label: "Cancelled", border: "border-red-200" },
// };

// // ─── Helpers ───────────────────────────────────────────────────────

// const getWeekDates = (baseDate) => {
//   const start = new Date(baseDate);
//   const day = start.getDay();
//   const diff = start.getDate() - day + (day === 0 ? -6 : 1);
//   start.setDate(diff);
//   start.setHours(0, 0, 0, 0);
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// const formatDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatDateShort = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });
// };

// const formatDateISO = (date) => {
//   return date.toISOString().split("T")[0];
// };

// const timeToMinutes = (timeStr) => {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToTop = (minutes) => {
//   const startMinutes = 8 * 60;
//   return ((minutes - startMinutes) / 60) * 80;
// };

// const getDurationHeight = (startTime, endTime) => {
//   const startMins = timeToMinutes(startTime);
//   const endMins = timeToMinutes(endTime);
//   return ((endMins - startMins) / 60) * 80;
// };

// const getStatusStyle = (status) => {
//   return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
// };

// // ─── Map API job from timeSlot to appointment format ───────────────

// const mapTimeSlotJobToAppointment = (job, timeStr, dateStr) => {
//   const startHour = parseInt(timeStr.split(":")[0], 10);
  
//   // Parse duration to calculate end time
//   let durationHours = 1;
//   if (job.duration) {
//     const match = job.duration.match(/(\d+(\.\d+)?)/);
//     if (match) durationHours = parseFloat(match[1]);
//   }
  
//   const endHour = startHour + durationHours;
//   const startTime = `${String(startHour).padStart(2, "0")}:00`;
//   const endMin = (durationHours % 1) * 60;
//   const endTime = `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.round(endMin)).padStart(2, "0")}`;

//   const scheduledDate = dateStr ? new Date(dateStr) : new Date();
//   scheduledDate.setHours(startHour, 0, 0, 0);

//   return {
//     id: job.id,
//     title: job.title || "Service Request",
//     status: job.status || "CONFIRMED",
//     scheduledAt: job.scheduledAt || scheduledDate.toISOString(),
//     startTime,
//     endTime,
//     duration: job.duration || "1 Hour",
//     customerName: job.user
//       ? `${job.user.firstName} ${job.user.lastName}`
//       : job.customerName || "Unknown Customer",
//     phone: job.user?.phone || job.phone || "N/A",
//     vehicle: job.vehicle || job.description || "Vehicle not specified",
//     plateNumber: job.plateNumber || "N/A",
//     vehicleColor: job.vehicleColor || "N/A",
//     serviceName: job.serviceName || job.title || "Service",
//     serviceItems: job.serviceItems || job.tasks || [],
//     notes: job.notes || "",
//     price: job.price || null,
//     location: job.location || null,
//     _raw: job,
//   };
// };

// // ─── Extract appointments from schedule data ───────────────────────

// const extractAppointmentsFromSchedule = (scheduleData) => {
//   if (!scheduleData) return [];
  
//   const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
//   const appointments = [];
//   const seenIds = new Set();

//   days.forEach((day) => {
//     if (!day?.timeSlots) return;
//     day.timeSlots.forEach((slot) => {
//       if (slot?.job && !seenIds.has(slot.job.id)) {
//         seenIds.add(slot.job.id);
//         appointments.push(mapTimeSlotJobToAppointment(slot.job, slot.time, day.date));
//       }
//     });
//   });

//   return appointments.sort((a, b) => 
//     new Date(a.scheduledAt) - new Date(b.scheduledAt)
//   );
// };

// // ─── Real API Fetch ──────────────────────────────────────────────
// // GET /provider/schedule?date=YYYY-MM-DD -> { date, dayName, timeSlots: [...] }
// // The endpoint only ever returns a single day, so Week view fans out
// // into 7 parallel requests (one per day of the visible week).

// const fetchDaySchedule = async (dateStr) => {
//   const response = await api.get("/provider/schedule", {
//     params: { date: dateStr },
//   });
//   return response.data;
// };

// const fetchWeekSchedule = async (weekDates) => {
//   const results = await Promise.all(
//     weekDates.map((d) => fetchDaySchedule(formatDateISO(d)))
//   );
//   return results;
// };

// // ─── Empty State Component ─────────────────────────────────────────

// function EmptyState({ message, submessage }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//       <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//         <Calendar size={28} className="text-gray-400" />
//       </div>
//       <p className="text-sm font-semibold text-gray-600">{message}</p>
//       {submessage && <p className="text-xs text-gray-400 mt-1">{submessage}</p>}
//     </div>
//   );
// }

// // ─── Main Component ────────────────────────────────────────────────

// export default function ScheduleView() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [viewMode, setViewMode] = useState("Week");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showDetails, setShowDetails] = useState(true);
//   const [showMobileDetails, setShowMobileDetails] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const handleStatusChange = (newStatus) => setIsOnline(newStatus);

//   const weekDates = getWeekDates(currentDate);

//   // ─── GET SCHEDULE DATA (real API) ──────────────────────────────
//   const [scheduleData, setScheduleData] = useState(null);
//   const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
//   const [scheduleError, setScheduleError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     const loadSchedule = async () => {
//       setIsLoadingSchedule(true);
//       setScheduleError(null);
//       try {
//         if (viewMode === "Day") {
//           const dateStr = formatDateISO(currentDate);
//           const data = await fetchDaySchedule(dateStr);
//           if (!cancelled) setScheduleData(data);
//         } else {
//           const data = await fetchWeekSchedule(weekDates);
//           if (!cancelled) setScheduleData(data);
//         }
//       } catch (err) {
//         console.error("Failed to load schedule:", err);
//         if (!cancelled) {
//           setScheduleError(err);
//           setScheduleData(null);
//         }
//       } finally {
//         if (!cancelled) setIsLoadingSchedule(false);
//       }
//     };

//     loadSchedule();
//     return () => {
//       cancelled = true;
//     };
//     // weekDates is derived from currentDate each render, so currentDate/viewMode are the real deps
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [viewMode, currentDate]);

//   // Extract appointments from schedule timeSlots
//   const appointments = useMemo(
//     () => extractAppointmentsFromSchedule(scheduleData),
//     [scheduleData]
//   );

//   // Stats
//   const stats = useMemo(() => {
//     const total = appointments.length;
//     const inProgress = appointments.filter(a => a.status === "IN_PROGRESS").length;
//     const completed = appointments.filter(a => a.status === "COMPLETED").length;
//     const upcoming = appointments.filter(a => a.status === "CONFIRMED" || a.status === "UPCOMING").length;
//     return { total, inProgress, completed, upcoming };
//   }, [appointments]);

//   // Selected appointment state
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Auto-select first appointment when schedule loads
//   useEffect(() => {
//     if (appointments.length > 0 && !selectedAppointment) {
//       setSelectedAppointment(appointments[0]);
//     }
//   }, [appointments, selectedAppointment]);

//   // ─── Navigation ────────────────────────────────────────────────
//   const goToPrev = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() - 1);
//     else d.setDate(d.getDate() - 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToNext = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() + 1);
//     else d.setDate(d.getDate() + 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//     setSelectedAppointment(null);
//   };

//   // ─── Appointment Click ─────────────────────────────────────────
//   const handleAppointmentClick = (apt) => {
//     setSelectedAppointment(apt);
//     if (!showDetails && !isMobile) setShowDetails(true);
//     if (isMobile) setShowMobileDetails(true);
//   };

//   const closeDetails = () => setShowDetails(false);
//   const closeMobileDetails = () => setShowMobileDetails(false);

//   // ─── Complete Job (local state only) ───────────────────────────
//   const [completingId, setCompletingId] = useState(null);

//   const handleCompleteJob = () => {
//     if (!selectedAppointment || selectedAppointment.status === "COMPLETED") return;
    
//     setCompletingId(selectedAppointment.id);
    
//     // Simulate completion delay
//     setTimeout(() => {
//       setSelectedAppointment(prev => prev ? { ...prev, status: "COMPLETED" } : null);
//       setCompletingId(null);
//     }, 800);
//   };

//   // ─── Render ────────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(1.3); opacity: 0; }
//         }
//         .animate-slide-in { animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
//         .calendar-grid {
//           display: grid;
//           grid-template-columns: 64px repeat(7, minmax(140px, 1fr));
//         }
//         .calendar-grid-mobile {
//           display: grid;
//           grid-template-columns: 52px repeat(7, minmax(110px, 1fr));
//         }
//         .time-slot {
//           height: 80px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .time-slot-mobile {
//           height: 64px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         isOnline={isOnline}
//         setIsOnline={handleStatusChange}
//       />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar
//           toggleSidebar={toggleSidebar}
//           isOnline={isOnline}
//           setIsOnline={handleStatusChange}
//         />

//         {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
//         <main className="flex-1 flex overflow-hidden relative">
          
//           {/* ─── Calendar Area ────────────────────────────────── */}
//           <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
//                   <Calendar size={20} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedule</h1>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                     {viewMode === "Day" 
//                       ? formatDate(currentDate) 
//                       : `${formatDateShort(weekDates[0])} – ${formatDateShort(weekDates[6])}`}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Stats pills (desktop) */}
//                 <div className="hidden lg:flex items-center gap-2 mr-2">
//                   <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                     {stats.total} Jobs
//                   </span>
//                   {stats.inProgress > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
//                       {stats.inProgress} Active
//                     </span>
//                   )}
//                   {stats.completed > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
//                       {stats.completed} Done
//                     </span>
//                   )}
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//                   {["Day", "Week"].map((mode) => (
//                     <button
//                       key={mode}
//                       onClick={() => {
//                         setViewMode(mode);
//                         setSelectedAppointment(null);
//                       }}
//                       className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
//                         viewMode === mode
//                           ? "bg-white text-gray-900 shadow-sm"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
//                   <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-white rounded-md transition-all">
//                     Today
//                   </button>
//                   <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 {/* Toggle details */}
//                 {!isMobile && (
//                   <button
//                     onClick={() => setShowDetails(!showDetails)}
//                     className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${
//                       showDetails ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                     title={showDetails ? "Hide details" : "Show details"}
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}

//                 {/* Mobile details toggle */}
//                 {isMobile && selectedAppointment && (
//                   <button
//                     onClick={() => setShowMobileDetails(true)}
//                     className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white"
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Days Header */}
//             <div className="overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
//               <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                 <div className="border-r border-gray-100 bg-gray-50/50"></div>
//                 {weekDates.map((date, i) => {
//                   const isToday = date.toDateString() === new Date().toDateString();
//                   const isSelected = viewMode === "Day" 
//                     ? date.toDateString() === currentDate.toDateString()
//                     : date.toDateString() === currentDate.toDateString();
//                   const dayAppointments = appointments.filter((apt) => {
//                     const aptDate = new Date(apt.scheduledAt);
//                     return aptDate.toDateString() === date.toDateString();
//                   });
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => {
//                         setCurrentDate(new Date(date));
//                         if (viewMode === "Week") setViewMode("Day");
//                       }}
//                       className={`py-2.5 sm:py-3 text-center border-r border-gray-100 last:border-r-0 transition-all relative min-w-[110px] sm:min-w-[140px] ${
//                         isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
//                         isToday ? "text-blue-600" : "text-gray-400"
//                       }`}>
//                         {DAYS[i]}
//                       </p>
//                       <p className={`text-lg sm:text-xl font-bold mt-0.5 ${
//                         isToday ? "text-blue-600" : isSelected ? "text-gray-900" : "text-gray-700"
//                       }`}>
//                         {date.getDate()}
//                       </p>
//                       {dayAppointments.length > 0 && (
//                         <div className="flex justify-center gap-1 mt-1.5">
//                           {dayAppointments.slice(0, 4).map((apt, idx) => (
//                             <div 
//                               key={idx} 
//                               className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(apt.status).color}`} 
//                             />
//                           ))}
//                           {dayAppointments.length > 4 && (
//                             <span className="text-[8px] text-gray-400 ml-0.5">+{dayAppointments.length - 4}</span>
//                           )}
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Calendar Body */}
//             <div className="flex-1 overflow-auto custom-scrollbar relative bg-white">
//               {isLoadingSchedule ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-8 h-8 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin mb-4" />
//                   <p className="text-sm font-semibold text-gray-500">Loading schedule…</p>
//                 </div>
//               ) : scheduleError ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
//                     <AlertCircle size={28} className="text-red-400" />
//                   </div>
//                   <p className="text-sm font-semibold text-gray-700">Couldn't load the schedule</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {scheduleError?.response?.status === 401 || scheduleError?.response?.status === 403
//                       ? "You may need to sign in again."
//                       : "Check your connection and try again."}
//                   </p>
//                 </div>
//               ) : appointments.length === 0 ? (
//                 <EmptyState 
//                   message="No appointments scheduled"
//                   submessage="Select a different date or check back later"
//                 />
//               ) : (
//                 <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                   {/* Time Labels */}
//                   <div className="border-r border-gray-100 bg-gray-50/30 sticky left-0 z-10">
//                     {HOURS.map((hour) => (
//                       <div key={hour} className={`${isMobile ? "time-slot-mobile" : "time-slot"} flex items-start justify-end pr-2 sm:pr-3 pt-1 sm:pt-2`}>
//                         <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">{hour}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Day Columns */}
//                   {weekDates.map((date, dayIndex) => {
//                     const dayAppointments = appointments.filter((apt) => {
//                       const aptDate = new Date(apt.scheduledAt);
//                       return aptDate.toDateString() === date.toDateString();
//                     });

//                     const isToday = date.toDateString() === new Date().toDateString();

//                     return (
//                       <div key={dayIndex} className={`relative border-r border-gray-100 last:border-r-0 min-w-[110px] sm:min-w-[140px] ${isToday ? "bg-blue-50/10" : ""}`}>
//                         {/* Hour grid lines */}
//                         {HOURS.map((_, i) => (
//                           <div key={i} className={`${isMobile ? "time-slot-mobile" : "time-slot"} ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}></div>
//                         ))}

//                         {/* Current time indicator */}
//                         {isToday && (() => {
//                           const now = new Date();
//                           const mins = now.getHours() * 60 + now.getMinutes();
//                           if (mins < 8 * 60 || mins > 20 * 60) return null;
//                           const top = minutesToTop(mins);
//                           return (
//                             <div 
//                               className="absolute left-0 right-0 z-20 pointer-events-none"
//                               style={{ top: `${top}px` }}
//                             >
//                               <div className="flex items-center">
//                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] ring-4 ring-red-500/20" />
//                                 <div className="flex-1 h-[2px] bg-red-500/40" />
//                               </div>
//                             </div>
//                           );
//                         })()}

//                         {/* Lunch break label */}
//                         <div className="absolute left-0 right-0 text-center pointer-events-none z-0" style={{ top: minutesToTop(12 * 60) + 20 }}>
//                           <span className="text-[9px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Lunch Break</span>
//                         </div>

//                         {/* Appointments */}
//                         {dayAppointments.map((apt) => {
//                           const top = minutesToTop(timeToMinutes(apt.startTime));
//                           const height = getDurationHeight(apt.startTime, apt.endTime);
//                           const isSelected = selectedAppointment?.id === apt.id;
//                           const statusStyle = getStatusStyle(apt.status);

//                           return (
//                             <div
//                               key={apt.id}
//                               onClick={() => handleAppointmentClick(apt)}
//                               className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md ${statusStyle.color} ${
//                                 isSelected ? "ring-[3px] ring-offset-2 ring-blue-500 scale-[1.02] z-10" : "hover:brightness-110"
//                               }`}
//                               style={{ top: `${top}px`, height: `${Math.max(height, 52)}px` }}
//                             >
//                               <div className="flex items-start justify-between gap-1">
//                                 <p className="text-white text-[10px] sm:text-xs font-bold leading-tight truncate flex-1">{apt.title}</p>
//                                 {apt.status === "IN_PROGRESS" && (
//                                   <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-white/80 text-[9px] sm:text-[10px] mt-1 leading-tight truncate">{apt.vehicle}</p>
//                               {height > 55 && (
//                                 <div className="mt-1.5 flex items-center gap-1">
//                                   <User size={9} className="text-white/60" />
//                                   <p className="text-white/70 text-[9px] sm:text-[10px] truncate">{apt.customerName}</p>
//                                 </div>
//                               )}
//                               {height > 70 && apt.plateNumber !== "N/A" && (
//                                 <p className="text-white/60 text-[9px] mt-1 truncate font-mono">{apt.plateNumber}</p>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ─── Desktop Details Sidebar ─────────── */}
//           {showDetails && !isMobile && (
//             <div className="hidden sm:flex w-[360px] lg:w-[400px] bg-white border-l border-gray-100 flex-col shadow-xl overflow-hidden animate-fade-in">
//               <DetailsPanel 
//                 appointment={selectedAppointment}
//                 onComplete={handleCompleteJob}
//                 onClose={closeDetails}
//                 isCompleting={completingId === selectedAppointment?.id}
//               />
//             </div>
//           )}

//           {/* ─── Mobile Details Overlay ─────────────────── */}
//           {isMobile && showMobileDetails && (
//             <>
//               <div 
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in sm:hidden"
//                 onClick={closeMobileDetails}
//               />
//               <div className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-[400px] bg-white z-50 animate-slide-in sm:hidden flex flex-col shadow-2xl">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
//                   <h2 className="text-base font-bold text-gray-900">Appointment Details</h2>
//                   <button
//                     onClick={closeMobileDetails}
//                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                   <DetailsPanel 
//                     appointment={selectedAppointment}
//                     onComplete={handleCompleteJob}
//                     onClose={closeMobileDetails}
//                     isCompleting={completingId === selectedAppointment?.id}
//                     isMobile={true}
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// // ─── Details Panel Component ─────────────────────────────────────

// function DetailsPanel({ appointment, onComplete, onClose, isCompleting, isMobile = false }) {
//   if (!appointment) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//           <Calendar size={28} className="text-gray-400" />
//         </div>
//         <p className="text-sm font-semibold text-gray-600">No appointment selected</p>
//         <p className="text-xs text-gray-400 mt-1">Click on a job in the calendar to view details</p>
//       </div>
//     );
//   }

//   const statusStyle = getStatusStyle(appointment.status);
//   const isDone = appointment.status === "COMPLETED";

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       {/* Header */}
//       {!isMobile && (
//         <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <h2 className="text-base font-bold text-gray-900">Job Details</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-4' : 'p-5'}`}>
//         {/* Status Banner */}
//         <div className={`flex items-center justify-between p-3 rounded-xl ${statusStyle.bg} border ${statusStyle.border} mb-5`}>
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2 h-2 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
//               {statusStyle.label}
//             </span>
//           </div>
//           <span className="text-[10px] text-gray-400 font-medium font-mono bg-white/60 px-2 py-0.5 rounded">
//             #{appointment.id?.slice(-6).toUpperCase()}
//           </span>
//         </div>

//         {/* Service Title */}
//         <div className="mb-5">
//           <h3 className="text-base font-bold text-gray-900 leading-tight">{appointment.serviceName}</h3>
//           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
//             <Wrench size={12} className="text-gray-400" />
//             {appointment.title}
//           </p>
//         </div>

//         {/* Customer Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <User size={10} /> Customer
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
//               <User size={20} className="text-gray-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-gray-900 truncate">{appointment.customerName}</p>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Phone size={10} className="text-gray-400" />
//                 <p className="text-xs text-gray-500">{appointment.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <Car size={10} /> Vehicle
//           </p>
//           <p className="text-sm font-bold text-gray-900">{appointment.vehicle}</p>
//           <div className="flex flex-wrap items-center gap-2 mt-2.5">
//             {appointment.plateNumber !== "N/A" && (
//               <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 font-mono tracking-wide">
//                 {appointment.plateNumber}
//               </span>
//             )}
//             {appointment.vehicleColor !== "N/A" && (
//               <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
//                 <span 
//                   className="w-3 h-3 rounded-full border border-gray-300" 
//                   style={{ 
//                     backgroundColor: appointment.vehicleColor.toLowerCase().includes("white") 
//                       ? "#f3f4f6" 
//                       : appointment.vehicleColor.toLowerCase().includes("black")
//                       ? "#374151"
//                       : appointment.vehicleColor.toLowerCase().includes("red")
//                       ? "#ef4444"
//                       : appointment.vehicleColor.toLowerCase().includes("blue")
//                       ? "#3b82f6"
//                       : appointment.vehicleColor.toLowerCase().includes("silver")
//                       ? "#9ca3af"
//                       : "#d1d5db"
//                   }}
//                 />
//                 {appointment.vehicleColor}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Time & Location Grid */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Start
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.startTime}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">
//               {new Date(appointment.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//             </p>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Duration
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.duration}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">Estimated</p>
//           </div>
//         </div>

//         {/* Location */}
//         {appointment.location && (
//           <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
//             <MapPin size={14} className="text-gray-400" />
//             <span className="text-xs font-medium text-gray-600">{appointment.location}</span>
//           </div>
//         )}

//         {/* Service Checklist */}
//         {appointment.serviceItems && appointment.serviceItems.length > 0 && (
//           <div className="mb-5">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//               <FileText size={10} /> Service Checklist
//             </p>
//             <div className="space-y-2">
//               {appointment.serviceItems.map((item, i) => (
//                 <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
//                   isDone 
//                     ? "bg-emerald-50/50 border-emerald-100" 
//                     : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
//                 }`}>
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//                     isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
//                   }`}>
//                     <Check size={11} strokeWidth={3} />
//                   </div>
//                   <span className={`text-xs leading-relaxed ${isDone ? "text-gray-700 font-medium" : "text-gray-500"}`}>
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notes */}
//         {appointment.notes && (
//           <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
//             <div className="flex items-center gap-1.5 mb-1.5">
//               <AlertCircle size={12} className="text-amber-500" />
//               <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Notes</p>
//             </div>
//             <p className="text-xs text-amber-800 leading-relaxed">{appointment.notes}</p>
//           </div>
//         )}

//         {/* Price */}
//         {appointment.price && (
//           <div className="mb-5 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
//             <div className="flex items-center gap-2">
//               <CreditCard size={14} className="text-emerald-600" />
//               <span className="text-xs font-semibold text-emerald-700">Estimated Price</span>
//             </div>
//             <span className="text-sm font-bold text-emerald-700">${appointment.price.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Actions */}
//         <div className={`${isMobile ? 'pt-2 pb-6' : 'pt-2 pb-4'} space-y-2.5`}>
//           <button
//             onClick={onComplete}
//             disabled={isDone || isCompleting}
//             className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
//               isDone
//                 ? "bg-emerald-100 text-emerald-700 cursor-default"
//                 : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
//             }`}
//           >
//             {isCompleting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Completing...
//               </>
//             ) : isDone ? (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Job Completed
//               </>
//             ) : (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Complete Job
//               </>
//             )}
//           </button>
          
//           {!isDone && (
//             <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
//               Reschedule
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect, useMemo } from "react";
// import {
//   X,
//   User,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   Calendar,
//   Clock,
//   Wrench,
//   Car,
//   Phone,
//   MapPin,
//   CreditCard,
//   FileText,
//   AlertCircle,
// } from "lucide-react";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";


// // ─── Constants ─────────────────────────────────────────────────────

// const HOURS = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
//   "18:00", "19:00", "20:00",
// ];

// const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// const STATUS_CONFIG = {
//   CONFIRMED: { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600", label: "Confirmed", border: "border-blue-200" },
//   IN_PROGRESS: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600", label: "In Progress", border: "border-amber-200" },
//   COMPLETED: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", label: "Completed", border: "border-emerald-200" },
//   WAITING: { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600", label: "Waiting", border: "border-orange-200" },
//   UPCOMING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Upcoming", border: "border-slate-200" },
//   PENDING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Pending", border: "border-slate-200" },
//   CANCELLED: { color: "bg-red-500", bg: "bg-red-50", text: "text-red-600", label: "Cancelled", border: "border-red-200" },
// };

// // ─── Helpers ───────────────────────────────────────────────────────

// const getWeekDates = (baseDate) => {
//   const start = new Date(baseDate);
//   const day = start.getDay();
//   const diff = start.getDate() - day + (day === 0 ? -6 : 1);
//   start.setDate(diff);
//   start.setHours(0, 0, 0, 0);
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// const formatDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatDateShort = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });
// };

// const formatDateISO = (date) => {
//   // IMPORTANT: do NOT use date.toISOString() here — it converts to UTC first,
//   // which silently shifts the date by a day for any timezone that isn't UTC+0
//   // (e.g. in UTC+1, any local time before 1:00 AM reports as the previous day).
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const timeToMinutes = (timeStr) => {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToTop = (minutes) => {
//   const startMinutes = 8 * 60;
//   return ((minutes - startMinutes) / 60) * 80;
// };

// const getDurationHeight = (startTime, endTime) => {
//   const startMins = timeToMinutes(startTime);
//   const endMins = timeToMinutes(endTime);
//   return ((endMins - startMins) / 60) * 80;
// };

// const getStatusStyle = (status) => {
//   return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
// };

// // ─── Map API job from timeSlot to appointment format ───────────────

// const mapTimeSlotJobToAppointment = (job, timeStr, dateStr) => {
//   const startHour = parseInt(timeStr.split(":")[0], 10);
  
//   // Parse duration to calculate end time
//   let durationHours = 1;
//   if (job.duration) {
//     const match = job.duration.match(/(\d+(\.\d+)?)/);
//     if (match) durationHours = parseFloat(match[1]);
//   }
  
//   const endHour = startHour + durationHours;
//   const startTime = `${String(startHour).padStart(2, "0")}:00`;
//   const endMin = (durationHours % 1) * 60;
//   const endTime = `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.round(endMin)).padStart(2, "0")}`;

//   // Parse a "YYYY-MM-DD" string as a LOCAL date, not UTC.
//   // new Date("2026-06-21") parses as UTC midnight, which can land on the
//   // previous local day for negative-offset timezones (e.g. US) — this avoids that.
//   const parseISODateLocal = (str) => {
//     const [y, m, d] = str.split("-").map(Number);
//     return new Date(y, m - 1, d);
//   };

//   const scheduledDate = dateStr ? parseISODateLocal(dateStr) : new Date();
//   scheduledDate.setHours(startHour, 0, 0, 0);

//   return {
//     id: job.id,
//     title: job.title || "Service Request",
//     status: job.status || "CONFIRMED",
//     scheduledAt: job.scheduledAt || scheduledDate.toISOString(),
//     startTime,
//     endTime,
//     duration: job.duration || "1 Hour",
//     customerName: job.user
//       ? `${job.user.firstName} ${job.user.lastName}`
//       : job.customerName || "Unknown Customer",
//     phone: job.user?.phone || job.phone || "N/A",
//     vehicle: job.vehicle || job.description || "Vehicle not specified",
//     plateNumber: job.plateNumber || "N/A",
//     vehicleColor: job.vehicleColor || "N/A",
//     serviceName: job.serviceName || job.title || "Service",
//     serviceItems: job.serviceItems || job.tasks || [],
//     notes: job.notes || "",
//     price: job.price || null,
//     location: job.location || null,
//     _raw: job,
//   };
// };

// // ─── Extract appointments from schedule data ───────────────────────

// const extractAppointmentsFromSchedule = (scheduleData) => {
//   if (!scheduleData) return [];
  
//   const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
//   const appointments = [];
//   const seenIds = new Set();

//   days.forEach((day) => {
//     if (!day?.timeSlots) return;
//     day.timeSlots.forEach((slot) => {
//       if (slot?.job && !seenIds.has(slot.job.id)) {
//         seenIds.add(slot.job.id);
//         appointments.push(mapTimeSlotJobToAppointment(slot.job, slot.time, day.date));
//       }
//     });
//   });

//   return appointments.sort((a, b) => 
//     new Date(a.scheduledAt) - new Date(b.scheduledAt)
//   );
// };

// // ─── Real API Fetch ──────────────────────────────────────────────
// // GET /provider/schedule?date=YYYY-MM-DD -> { date, dayName, timeSlots: [...] }
// // The endpoint only ever returns a single day, so Week view fans out
// // into 7 parallel requests (one per day of the visible week).

// const fetchDaySchedule = async (dateStr) => {
//   const response = await api.get("/provider/schedule", {
//     params: { date: dateStr },
//   });
//   console.log(`[/provider/schedule?date=${dateStr}] response:`, response.data);
//   return response.data;
// };

// const fetchWeekSchedule = async (weekDates) => {
//   const results = await Promise.all(
//     weekDates.map((d) => fetchDaySchedule(formatDateISO(d)))
//   );
//   console.log("[/provider/schedule] full week response:", results);
//   return results;
// };

// // ─── Empty State Component ─────────────────────────────────────────

// function EmptyState({ message, submessage }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//       <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//         <Calendar size={28} className="text-gray-400" />
//       </div>
//       <p className="text-sm font-semibold text-gray-600">{message}</p>
//       {submessage && <p className="text-xs text-gray-400 mt-1">{submessage}</p>}
//     </div>
//   );
// }

// // ─── Main Component ────────────────────────────────────────────────

// export default function ScheduleView() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [viewMode, setViewMode] = useState("Week");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showDetails, setShowDetails] = useState(true);
//   const [showMobileDetails, setShowMobileDetails] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const handleStatusChange = (newStatus) => setIsOnline(newStatus);

//   const weekDates = getWeekDates(currentDate);

//   // ─── GET SCHEDULE DATA (real API) ──────────────────────────────
//   const [scheduleData, setScheduleData] = useState(null);
//   const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
//   const [scheduleError, setScheduleError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     const loadSchedule = async () => {
//       setIsLoadingSchedule(true);
//       setScheduleError(null);
//       try {
//         if (viewMode === "Day") {
//           const dateStr = formatDateISO(currentDate);
//           const data = await fetchDaySchedule(dateStr);
//           if (!cancelled) setScheduleData(data);
//         } else {
//           const data = await fetchWeekSchedule(weekDates);
//           if (!cancelled) setScheduleData(data);
//         }
//       } catch (err) {
//         console.error("Failed to load schedule:", err);
//         console.error("[error detail] status:", err?.response?.status, "| body:", err?.response?.data);
//         if (!cancelled) {
//           setScheduleError(err);
//           setScheduleData(null);
//         }
//       } finally {
//         if (!cancelled) setIsLoadingSchedule(false);
//       }
//     };

//     loadSchedule();
//     return () => {
//       cancelled = true;
//     };
//     // weekDates is derived from currentDate each render, so currentDate/viewMode are the real deps
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [viewMode, currentDate]);

//   // Extract appointments from schedule timeSlots
//   const appointments = useMemo(() => {
//     const result = extractAppointmentsFromSchedule(scheduleData);
//     console.log("[scheduleData -> appointments] scheduleData:", scheduleData, "| parsed appointments:", result);
//     return result;
//   }, [scheduleData]);

//   // Stats
//   const stats = useMemo(() => {
//     const total = appointments.length;
//     const inProgress = appointments.filter(a => a.status === "IN_PROGRESS").length;
//     const completed = appointments.filter(a => a.status === "COMPLETED").length;
//     const upcoming = appointments.filter(a => a.status === "CONFIRMED" || a.status === "UPCOMING").length;
//     return { total, inProgress, completed, upcoming };
//   }, [appointments]);

//   // Selected appointment state
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Auto-select first appointment when schedule loads
//   useEffect(() => {
//     if (appointments.length > 0 && !selectedAppointment) {
//       setSelectedAppointment(appointments[0]);
//     }
//   }, [appointments, selectedAppointment]);

//   // ─── Navigation ────────────────────────────────────────────────
//   const goToPrev = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() - 1);
//     else d.setDate(d.getDate() - 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToNext = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() + 1);
//     else d.setDate(d.getDate() + 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//     setSelectedAppointment(null);
//   };

//   // ─── Appointment Click ─────────────────────────────────────────
//   const handleAppointmentClick = (apt) => {
//     setSelectedAppointment(apt);
//     if (!showDetails && !isMobile) setShowDetails(true);
//     if (isMobile) setShowMobileDetails(true);
//   };

//   const closeDetails = () => setShowDetails(false);
//   const closeMobileDetails = () => setShowMobileDetails(false);

//   // ─── Complete Job (local state only) ───────────────────────────
//   const [completingId, setCompletingId] = useState(null);

//   const handleCompleteJob = () => {
//     if (!selectedAppointment || selectedAppointment.status === "COMPLETED") return;
    
//     setCompletingId(selectedAppointment.id);
    
//     // Simulate completion delay
//     setTimeout(() => {
//       setSelectedAppointment(prev => prev ? { ...prev, status: "COMPLETED" } : null);
//       setCompletingId(null);
//     }, 800);
//   };

//   // ─── Render ────────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(1.3); opacity: 0; }
//         }
//         .animate-slide-in { animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
//         .calendar-grid {
//           display: grid;
//           grid-template-columns: 64px repeat(7, minmax(140px, 1fr));
//         }
//         .calendar-grid-mobile {
//           display: grid;
//           grid-template-columns: 52px repeat(7, minmax(110px, 1fr));
//         }
//         .time-slot {
//           height: 80px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .time-slot-mobile {
//           height: 64px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         isOnline={isOnline}
//         setIsOnline={handleStatusChange}
//       />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar
//           toggleSidebar={toggleSidebar}
//           isOnline={isOnline}
//           setIsOnline={handleStatusChange}
//         />

//         {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
//         <main className="flex-1 flex overflow-hidden relative">
          
//           {/* ─── Calendar Area ────────────────────────────────── */}
//           <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
//                   <Calendar size={20} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedule</h1>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                     {viewMode === "Day" 
//                       ? formatDate(currentDate) 
//                       : `${formatDateShort(weekDates[0])} – ${formatDateShort(weekDates[6])}`}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Stats pills (desktop) */}
//                 <div className="hidden lg:flex items-center gap-2 mr-2">
//                   <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                     {stats.total} Jobs
//                   </span>
//                   {stats.inProgress > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
//                       {stats.inProgress} Active
//                     </span>
//                   )}
//                   {stats.completed > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
//                       {stats.completed} Done
//                     </span>
//                   )}
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//                   {["Day", "Week"].map((mode) => (
//                     <button
//                       key={mode}
//                       onClick={() => {
//                         setViewMode(mode);
//                         setSelectedAppointment(null);
//                       }}
//                       className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
//                         viewMode === mode
//                           ? "bg-white text-gray-900 shadow-sm"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
//                   <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-white rounded-md transition-all">
//                     Today
//                   </button>
//                   <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 {/* Toggle details */}
//                 {!isMobile && (
//                   <button
//                     onClick={() => setShowDetails(!showDetails)}
//                     className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${
//                       showDetails ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                     title={showDetails ? "Hide details" : "Show details"}
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}

//                 {/* Mobile details toggle */}
//                 {isMobile && selectedAppointment && (
//                   <button
//                     onClick={() => setShowMobileDetails(true)}
//                     className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white"
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Days Header */}
//             <div className="overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
//               <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                 <div className="border-r border-gray-100 bg-gray-50/50"></div>
//                 {weekDates.map((date, i) => {
//                   const isToday = date.toDateString() === new Date().toDateString();
//                   const isSelected = viewMode === "Day" 
//                     ? date.toDateString() === currentDate.toDateString()
//                     : date.toDateString() === currentDate.toDateString();
//                   const dayAppointments = appointments.filter((apt) => {
//                     const aptDate = new Date(apt.scheduledAt);
//                     return aptDate.toDateString() === date.toDateString();
//                   });
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => {
//                         setCurrentDate(new Date(date));
//                         if (viewMode === "Week") setViewMode("Day");
//                       }}
//                       className={`py-2.5 sm:py-3 text-center border-r border-gray-100 last:border-r-0 transition-all relative min-w-[110px] sm:min-w-[140px] ${
//                         isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
//                         isToday ? "text-blue-600" : "text-gray-400"
//                       }`}>
//                         {DAYS[i]}
//                       </p>
//                       <p className={`text-lg sm:text-xl font-bold mt-0.5 ${
//                         isToday ? "text-blue-600" : isSelected ? "text-gray-900" : "text-gray-700"
//                       }`}>
//                         {date.getDate()}
//                       </p>
//                       {dayAppointments.length > 0 && (
//                         <div className="flex justify-center gap-1 mt-1.5">
//                           {dayAppointments.slice(0, 4).map((apt, idx) => (
//                             <div 
//                               key={idx} 
//                               className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(apt.status).color}`} 
//                             />
//                           ))}
//                           {dayAppointments.length > 4 && (
//                             <span className="text-[8px] text-gray-400 ml-0.5">+{dayAppointments.length - 4}</span>
//                           )}
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Calendar Body */}
//             <div className="flex-1 overflow-auto custom-scrollbar relative bg-white">
//               {isLoadingSchedule ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-8 h-8 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin mb-4" />
//                   <p className="text-sm font-semibold text-gray-500">Loading schedule…</p>
//                 </div>
//               ) : scheduleError ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
//                     <AlertCircle size={28} className="text-red-400" />
//                   </div>
//                   <p className="text-sm font-semibold text-gray-700">Couldn't load the schedule</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {scheduleError?.response?.status === 401 || scheduleError?.response?.status === 403
//                       ? "You may need to sign in again."
//                       : "Check your connection and try again."}
//                   </p>
//                 </div>
//               ) : appointments.length === 0 ? (
//                 <EmptyState 
//                   message="No appointments scheduled"
//                   submessage="Select a different date or check back later"
//                 />
//               ) : (
//                 <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                   {/* Time Labels */}
//                   <div className="border-r border-gray-100 bg-gray-50/30 sticky left-0 z-10">
//                     {HOURS.map((hour) => (
//                       <div key={hour} className={`${isMobile ? "time-slot-mobile" : "time-slot"} flex items-start justify-end pr-2 sm:pr-3 pt-1 sm:pt-2`}>
//                         <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">{hour}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Day Columns */}
//                   {weekDates.map((date, dayIndex) => {
//                     const dayAppointments = appointments.filter((apt) => {
//                       const aptDate = new Date(apt.scheduledAt);
//                       return aptDate.toDateString() === date.toDateString();
//                     });

//                     const isToday = date.toDateString() === new Date().toDateString();

//                     return (
//                       <div key={dayIndex} className={`relative border-r border-gray-100 last:border-r-0 min-w-[110px] sm:min-w-[140px] ${isToday ? "bg-blue-50/10" : ""}`}>
//                         {/* Hour grid lines */}
//                         {HOURS.map((_, i) => (
//                           <div key={i} className={`${isMobile ? "time-slot-mobile" : "time-slot"} ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}></div>
//                         ))}

//                         {/* Current time indicator */}
//                         {isToday && (() => {
//                           const now = new Date();
//                           const mins = now.getHours() * 60 + now.getMinutes();
//                           if (mins < 8 * 60 || mins > 20 * 60) return null;
//                           const top = minutesToTop(mins);
//                           return (
//                             <div 
//                               className="absolute left-0 right-0 z-20 pointer-events-none"
//                               style={{ top: `${top}px` }}
//                             >
//                               <div className="flex items-center">
//                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] ring-4 ring-red-500/20" />
//                                 <div className="flex-1 h-[2px] bg-red-500/40" />
//                               </div>
//                             </div>
//                           );
//                         })()}

//                         {/* Lunch break label */}
//                         <div className="absolute left-0 right-0 text-center pointer-events-none z-0" style={{ top: minutesToTop(12 * 60) + 20 }}>
//                           <span className="text-[9px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Lunch Break</span>
//                         </div>

//                         {/* Appointments */}
//                         {dayAppointments.map((apt) => {
//                           const top = minutesToTop(timeToMinutes(apt.startTime));
//                           const height = getDurationHeight(apt.startTime, apt.endTime);
//                           const isSelected = selectedAppointment?.id === apt.id;
//                           const statusStyle = getStatusStyle(apt.status);

//                           return (
//                             <div
//                               key={apt.id}
//                               onClick={() => handleAppointmentClick(apt)}
//                               className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md ${statusStyle.color} ${
//                                 isSelected ? "ring-[3px] ring-offset-2 ring-blue-500 scale-[1.02] z-10" : "hover:brightness-110"
//                               }`}
//                               style={{ top: `${top}px`, height: `${Math.max(height, 52)}px` }}
//                             >
//                               <div className="flex items-start justify-between gap-1">
//                                 <p className="text-white text-[10px] sm:text-xs font-bold leading-tight truncate flex-1">{apt.title}</p>
//                                 {apt.status === "IN_PROGRESS" && (
//                                   <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-white/80 text-[9px] sm:text-[10px] mt-1 leading-tight truncate">{apt.vehicle}</p>
//                               {height > 55 && (
//                                 <div className="mt-1.5 flex items-center gap-1">
//                                   <User size={9} className="text-white/60" />
//                                   <p className="text-white/70 text-[9px] sm:text-[10px] truncate">{apt.customerName}</p>
//                                 </div>
//                               )}
//                               {height > 70 && apt.plateNumber !== "N/A" && (
//                                 <p className="text-white/60 text-[9px] mt-1 truncate font-mono">{apt.plateNumber}</p>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ─── Desktop Details Sidebar ─────────── */}
//           {showDetails && !isMobile && (
//             <div className="hidden sm:flex w-[360px] lg:w-[400px] bg-white border-l border-gray-100 flex-col shadow-xl overflow-hidden animate-fade-in">
//               <DetailsPanel 
//                 appointment={selectedAppointment}
//                 onComplete={handleCompleteJob}
//                 onClose={closeDetails}
//                 isCompleting={completingId === selectedAppointment?.id}
//               />
//             </div>
//           )}

//           {/* ─── Mobile Details Overlay ─────────────────── */}
//           {isMobile && showMobileDetails && (
//             <>
//               <div 
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in sm:hidden"
//                 onClick={closeMobileDetails}
//               />
//               <div className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-[400px] bg-white z-50 animate-slide-in sm:hidden flex flex-col shadow-2xl">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
//                   <h2 className="text-base font-bold text-gray-900">Appointment Details</h2>
//                   <button
//                     onClick={closeMobileDetails}
//                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                   <DetailsPanel 
//                     appointment={selectedAppointment}
//                     onComplete={handleCompleteJob}
//                     onClose={closeMobileDetails}
//                     isCompleting={completingId === selectedAppointment?.id}
//                     isMobile={true}
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// // ─── Details Panel Component ─────────────────────────────────────

// function DetailsPanel({ appointment, onComplete, onClose, isCompleting, isMobile = false }) {
//   if (!appointment) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//           <Calendar size={28} className="text-gray-400" />
//         </div>
//         <p className="text-sm font-semibold text-gray-600">No appointment selected</p>
//         <p className="text-xs text-gray-400 mt-1">Click on a job in the calendar to view details</p>
//       </div>
//     );
//   }

//   const statusStyle = getStatusStyle(appointment.status);
//   const isDone = appointment.status === "COMPLETED";

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       {/* Header */}
//       {!isMobile && (
//         <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <h2 className="text-base font-bold text-gray-900">Job Details</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-4' : 'p-5'}`}>
//         {/* Status Banner */}
//         <div className={`flex items-center justify-between p-3 rounded-xl ${statusStyle.bg} border ${statusStyle.border} mb-5`}>
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2 h-2 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
//               {statusStyle.label}
//             </span>
//           </div>
//           <span className="text-[10px] text-gray-400 font-medium font-mono bg-white/60 px-2 py-0.5 rounded">
//             #{appointment.id?.slice(-6).toUpperCase()}
//           </span>
//         </div>

//         {/* Service Title */}
//         <div className="mb-5">
//           <h3 className="text-base font-bold text-gray-900 leading-tight">{appointment.serviceName}</h3>
//           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
//             <Wrench size={12} className="text-gray-400" />
//             {appointment.title}
//           </p>
//         </div>

//         {/* Customer Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <User size={10} /> Customer
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
//               <User size={20} className="text-gray-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-gray-900 truncate">{appointment.customerName}</p>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Phone size={10} className="text-gray-400" />
//                 <p className="text-xs text-gray-500">{appointment.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <Car size={10} /> Vehicle
//           </p>
//           <p className="text-sm font-bold text-gray-900">{appointment.vehicle}</p>
//           <div className="flex flex-wrap items-center gap-2 mt-2.5">
//             {appointment.plateNumber !== "N/A" && (
//               <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 font-mono tracking-wide">
//                 {appointment.plateNumber}
//               </span>
//             )}
//             {appointment.vehicleColor !== "N/A" && (
//               <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
//                 <span 
//                   className="w-3 h-3 rounded-full border border-gray-300" 
//                   style={{ 
//                     backgroundColor: appointment.vehicleColor.toLowerCase().includes("white") 
//                       ? "#f3f4f6" 
//                       : appointment.vehicleColor.toLowerCase().includes("black")
//                       ? "#374151"
//                       : appointment.vehicleColor.toLowerCase().includes("red")
//                       ? "#ef4444"
//                       : appointment.vehicleColor.toLowerCase().includes("blue")
//                       ? "#3b82f6"
//                       : appointment.vehicleColor.toLowerCase().includes("silver")
//                       ? "#9ca3af"
//                       : "#d1d5db"
//                   }}
//                 />
//                 {appointment.vehicleColor}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Time & Location Grid */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Start
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.startTime}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">
//               {new Date(appointment.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//             </p>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Duration
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.duration}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">Estimated</p>
//           </div>
//         </div>

//         {/* Location */}
//         {appointment.location && (
//           <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
//             <MapPin size={14} className="text-gray-400" />
//             <span className="text-xs font-medium text-gray-600">{appointment.location}</span>
//           </div>
//         )}

//         {/* Service Checklist */}
//         {appointment.serviceItems && appointment.serviceItems.length > 0 && (
//           <div className="mb-5">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//               <FileText size={10} /> Service Checklist
//             </p>
//             <div className="space-y-2">
//               {appointment.serviceItems.map((item, i) => (
//                 <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
//                   isDone 
//                     ? "bg-emerald-50/50 border-emerald-100" 
//                     : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
//                 }`}>
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//                     isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
//                   }`}>
//                     <Check size={11} strokeWidth={3} />
//                   </div>
//                   <span className={`text-xs leading-relaxed ${isDone ? "text-gray-700 font-medium" : "text-gray-500"}`}>
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notes */}
//         {appointment.notes && (
//           <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
//             <div className="flex items-center gap-1.5 mb-1.5">
//               <AlertCircle size={12} className="text-amber-500" />
//               <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Notes</p>
//             </div>
//             <p className="text-xs text-amber-800 leading-relaxed">{appointment.notes}</p>
//           </div>
//         )}

//         {/* Price */}
//         {appointment.price && (
//           <div className="mb-5 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
//             <div className="flex items-center gap-2">
//               <CreditCard size={14} className="text-emerald-600" />
//               <span className="text-xs font-semibold text-emerald-700">Estimated Price</span>
//             </div>
//             <span className="text-sm font-bold text-emerald-700">${appointment.price.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Actions */}
//         <div className={`${isMobile ? 'pt-2 pb-6' : 'pt-2 pb-4'} space-y-2.5`}>
//           <button
//             onClick={onComplete}
//             disabled={isDone || isCompleting}
//             className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
//               isDone
//                 ? "bg-emerald-100 text-emerald-700 cursor-default"
//                 : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
//             }`}
//           >
//             {isCompleting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Completing...
//               </>
//             ) : isDone ? (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Job Completed
//               </>
//             ) : (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Complete Job
//               </>
//             )}
//           </button>
          
//           {!isDone && (
//             <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
//               Reschedule
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useState, useEffect, useMemo } from "react";
// import {
//   X,
//   User,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   Calendar,
//   Clock,
//   Wrench,
//   Car,
//   Phone,
//   MapPin,
//   CreditCard,
//   FileText,
//   AlertCircle,
// } from "lucide-react";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";


// // ─── Constants ─────────────────────────────────────────────────────

// const STATUS_CONFIG = {
//   CONFIRMED: { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600", label: "Confirmed", border: "border-blue-200" },
//   IN_PROGRESS: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600", label: "In Progress", border: "border-amber-200" },
//   COMPLETED: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", label: "Completed", border: "border-emerald-200" },
//   WAITING: { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600", label: "Waiting", border: "border-orange-200" },
//   UPCOMING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Upcoming", border: "border-slate-200" },
//   PENDING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Pending", border: "border-slate-200" },
//   CANCELLED: { color: "bg-red-500", bg: "bg-red-50", text: "text-red-600", label: "Cancelled", border: "border-red-200" },
// };

// // ─── Helpers ───────────────────────────────────────────────────────

// const getWeekDates = (baseDate) => {
//   const start = new Date(baseDate);
//   const day = start.getDay();
//   const diff = start.getDate() - day + (day === 0 ? -6 : 1);
//   start.setDate(diff);
//   start.setHours(0, 0, 0, 0);
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// const formatDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatDateShort = (date) => {
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });
// };

// const formatDateISO = (date) => {
//   // IMPORTANT: do NOT use date.toISOString() here — it converts to UTC first,
//   // which silently shifts the date by a day for any timezone that isn't UTC+0
//   // (e.g. in UTC+1, any local time before 1:00 AM reports as the previous day).
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const timeToMinutes = (timeStr) => {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// };

// const minutesToTop = (minutes, gridStartMinutes = 0) => {
//   return ((minutes - gridStartMinutes) / 60) * 80;
// };

// const getDurationHeight = (startTime, endTime) => {
//   const startMins = timeToMinutes(startTime);
//   const endMins = timeToMinutes(endTime);
//   return ((endMins - startMins) / 60) * 80;
// };

// const getStatusStyle = (status) => {
//   return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
// };

// // ─── Map API job from timeSlot to appointment format ───────────────

// const mapTimeSlotJobToAppointment = (job, timeStr, dateStr) => {
//   const startHour = parseInt(timeStr.split(":")[0], 10);
  
//   // Parse duration to calculate end time
//   let durationHours = 1;
//   if (job.duration) {
//     const match = job.duration.match(/(\d+(\.\d+)?)/);
//     if (match) durationHours = parseFloat(match[1]);
//   }
  
//   const endHour = startHour + durationHours;
//   const startTime = `${String(startHour).padStart(2, "0")}:00`;
//   const endMin = (durationHours % 1) * 60;
//   const endTime = `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.round(endMin)).padStart(2, "0")}`;

//   // Parse a "YYYY-MM-DD" string as a LOCAL date, not UTC.
//   // new Date("2026-06-21") parses as UTC midnight, which can land on the
//   // previous local day for negative-offset timezones (e.g. US) — this avoids that.
//   const parseISODateLocal = (str) => {
//     const [y, m, d] = str.split("-").map(Number);
//     return new Date(y, m - 1, d);
//   };

//   const scheduledDate = dateStr ? parseISODateLocal(dateStr) : new Date();
//   scheduledDate.setHours(startHour, 0, 0, 0);

//   return {
//     id: job.id,
//     title: job.title || "Service Request",
//     status: job.status || "CONFIRMED",
//     scheduledAt: job.scheduledAt || scheduledDate.toISOString(),
//     startTime,
//     endTime,
//     duration: job.duration || "1 Hour",
//     customerName: job.user
//       ? `${job.user.firstName} ${job.user.lastName}`
//       : job.customerName || "Unknown Customer",
//     phone: job.user?.phone || job.phone || "N/A",
//     vehicle: job.vehicle || job.description || "Vehicle not specified",
//     plateNumber: job.plateNumber || "N/A",
//     vehicleColor: job.vehicleColor || "N/A",
//     serviceName: job.serviceName || job.title || "Service",
//     serviceItems: job.serviceItems || job.tasks || [],
//     notes: job.notes || "",
//     price: job.price || null,
//     location: job.location || null,
//     _raw: job,
//   };
// };

// // ─── Extract appointments from schedule data ───────────────────────

// const extractAppointmentsFromSchedule = (scheduleData) => {
//   if (!scheduleData) return [];
  
//   const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
//   const appointments = [];
//   const seenIds = new Set();

//   days.forEach((day) => {
//     if (!day?.timeSlots) return;
//     day.timeSlots.forEach((slot) => {
//       if (slot?.job && !seenIds.has(slot.job.id)) {
//         seenIds.add(slot.job.id);
//         appointments.push(mapTimeSlotJobToAppointment(slot.job, slot.time, day.date));
//       }
//     });
//   });

//   return appointments.sort((a, b) => 
//     new Date(a.scheduledAt) - new Date(b.scheduledAt)
//   );
// };

// // ─── Real API Fetch ──────────────────────────────────────────────
// // GET /provider/schedule?date=YYYY-MM-DD -> { date, dayName, timeSlots: [...] }
// // The endpoint only ever returns a single day, so Week view fans out
// // into 7 parallel requests (one per day of the visible week).

// const fetchDaySchedule = async (dateStr) => {
//   const response = await api.get("/provider/schedule", {
//     params: { date: dateStr },
//   });
//   console.log(`[/provider/schedule?date=${dateStr}] response:`, response.data);
//   return response.data;
// };

// const fetchWeekSchedule = async (weekDates) => {
//   const results = await Promise.all(
//     weekDates.map((d) => fetchDaySchedule(formatDateISO(d)))
//   );
//   console.log("[/provider/schedule] full week response:", results);
//   return results;
// };

// // ─── Empty State Component ─────────────────────────────────────────

// function EmptyState({ message, submessage }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//       <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//         <Calendar size={28} className="text-gray-400" />
//       </div>
//       <p className="text-sm font-semibold text-gray-600">{message}</p>
//       {submessage && <p className="text-xs text-gray-400 mt-1">{submessage}</p>}
//     </div>
//   );
// }

// // ─── Main Component ────────────────────────────────────────────────

// export default function ScheduleView() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [viewMode, setViewMode] = useState("Week");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showDetails, setShowDetails] = useState(true);
//   const [showMobileDetails, setShowMobileDetails] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const handleStatusChange = (newStatus) => setIsOnline(newStatus);

//   const weekDates = getWeekDates(currentDate);

//   // ─── GET SCHEDULE DATA (real API) ──────────────────────────────
//   const [scheduleData, setScheduleData] = useState(null);
//   const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
//   const [scheduleError, setScheduleError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     const loadSchedule = async () => {
//       setIsLoadingSchedule(true);
//       setScheduleError(null);
//       try {
//         if (viewMode === "Day") {
//           const dateStr = formatDateISO(currentDate);
//           const data = await fetchDaySchedule(dateStr);
//           if (!cancelled) setScheduleData(data);
//         } else {
//           const data = await fetchWeekSchedule(weekDates);
//           if (!cancelled) setScheduleData(data);
//         }
//       } catch (err) {
//         console.error("Failed to load schedule:", err);
//         console.error("[error detail] status:", err?.response?.status, "| body:", err?.response?.data);
//         if (!cancelled) {
//           setScheduleError(err);
//           setScheduleData(null);
//         }
//       } finally {
//         if (!cancelled) setIsLoadingSchedule(false);
//       }
//     };

//     loadSchedule();
//     return () => {
//       cancelled = true;
//     };
//     // weekDates is derived from currentDate each render, so currentDate/viewMode are the real deps
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [viewMode, currentDate]);

//   // Extract appointments from schedule timeSlots
//   const appointments = useMemo(() => {
//     const result = extractAppointmentsFromSchedule(scheduleData);
//     console.log("[scheduleData -> appointments] scheduleData:", scheduleData, "| parsed appointments:", result);
//     return result;
//   }, [scheduleData]);

//   // ─── Hour grid driven entirely by the real timeSlots the backend sent ───
//   // (no hardcoded 08:00–20:00 list — if the backend ever changes operating
//   // hours, this picks it up automatically instead of drifting out of sync)
//   const hourSlots = useMemo(() => {
//     if (!scheduleData) return [];
//     const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
//     const dayWithSlots = days.find((d) => Array.isArray(d?.timeSlots) && d.timeSlots.length > 0);
//     return dayWithSlots?.timeSlots || [];
//   }, [scheduleData]);

//   const gridStartMinutes = hourSlots.length > 0 ? hourSlots[0].hour * 60 : 0;
//   const gridEndMinutes = hourSlots.length > 0 ? (hourSlots[hourSlots.length - 1].hour + 1) * 60 : 0;

//   // Stats
//   const stats = useMemo(() => {
//     const total = appointments.length;
//     const inProgress = appointments.filter(a => a.status === "IN_PROGRESS").length;
//     const completed = appointments.filter(a => a.status === "COMPLETED").length;
//     const upcoming = appointments.filter(a => a.status === "CONFIRMED" || a.status === "UPCOMING").length;
//     return { total, inProgress, completed, upcoming };
//   }, [appointments]);

//   // Selected appointment state
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Auto-select first appointment when schedule loads
//   useEffect(() => {
//     if (appointments.length > 0 && !selectedAppointment) {
//       setSelectedAppointment(appointments[0]);
//     }
//   }, [appointments, selectedAppointment]);

//   // ─── Navigation ────────────────────────────────────────────────
//   const goToPrev = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() - 1);
//     else d.setDate(d.getDate() - 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToNext = () => {
//     const d = new Date(currentDate);
//     if (viewMode === "Day") d.setDate(d.getDate() + 1);
//     else d.setDate(d.getDate() + 7);
//     setCurrentDate(d);
//     setSelectedAppointment(null);
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//     setSelectedAppointment(null);
//   };

//   // ─── Appointment Click ─────────────────────────────────────────
//   const handleAppointmentClick = (apt) => {
//     setSelectedAppointment(apt);
//     if (!showDetails && !isMobile) setShowDetails(true);
//     if (isMobile) setShowMobileDetails(true);
//   };

//   const closeDetails = () => setShowDetails(false);
//   const closeMobileDetails = () => setShowMobileDetails(false);

//   // ─── Complete Job (local state only) ───────────────────────────
//   const [completingId, setCompletingId] = useState(null);

//   const handleCompleteJob = () => {
//     if (!selectedAppointment || selectedAppointment.status === "COMPLETED") return;
    
//     setCompletingId(selectedAppointment.id);
    
//     // Simulate completion delay
//     setTimeout(() => {
//       setSelectedAppointment(prev => prev ? { ...prev, status: "COMPLETED" } : null);
//       setCompletingId(null);
//     }, 800);
//   };

//   // ─── Render ────────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(1.3); opacity: 0; }
//         }
//         .animate-slide-in { animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
//         .calendar-grid {
//           display: grid;
//           grid-template-columns: 64px repeat(7, minmax(140px, 1fr));
//         }
//         .calendar-grid-mobile {
//           display: grid;
//           grid-template-columns: 52px repeat(7, minmax(110px, 1fr));
//         }
//         .time-slot {
//           height: 80px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .time-slot-mobile {
//           height: 64px;
//           border-bottom: 1px solid #f1f5f9;
//         }
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         isOnline={isOnline}
//         setIsOnline={handleStatusChange}
//       />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar
//           toggleSidebar={toggleSidebar}
//           isOnline={isOnline}
//           setIsOnline={handleStatusChange}
//         />

//         {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
//         <main className="flex-1 flex overflow-hidden relative">
          
//           {/* ─── Calendar Area ────────────────────────────────── */}
//           <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
//                   <Calendar size={20} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedule</h1>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                     {viewMode === "Day" 
//                       ? formatDate(currentDate) 
//                       : `${formatDateShort(weekDates[0])} – ${formatDateShort(weekDates[6])}`}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Stats pills (desktop) */}
//                 <div className="hidden lg:flex items-center gap-2 mr-2">
//                   <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                     {stats.total} Jobs
//                   </span>
//                   {stats.inProgress > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
//                       {stats.inProgress} Active
//                     </span>
//                   )}
//                   {stats.completed > 0 && (
//                     <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
//                       {stats.completed} Done
//                     </span>
//                   )}
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
//                   {["Day", "Week"].map((mode) => (
//                     <button
//                       key={mode}
//                       onClick={() => {
//                         setViewMode(mode);
//                         setSelectedAppointment(null);
//                       }}
//                       className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
//                         viewMode === mode
//                           ? "bg-white text-gray-900 shadow-sm"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
//                   <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-white rounded-md transition-all">
//                     Today
//                   </button>
//                   <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 {/* Toggle details */}
//                 {!isMobile && (
//                   <button
//                     onClick={() => setShowDetails(!showDetails)}
//                     className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${
//                       showDetails ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                     title={showDetails ? "Hide details" : "Show details"}
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}

//                 {/* Mobile details toggle */}
//                 {isMobile && selectedAppointment && (
//                   <button
//                     onClick={() => setShowMobileDetails(true)}
//                     className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white"
//                   >
//                     <Menu size={16} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Days Header */}
//             <div className="overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
//               <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                 <div className="border-r border-gray-100 bg-gray-50/50"></div>
//                 {weekDates.map((date, i) => {
//                   const isToday = date.toDateString() === new Date().toDateString();
//                   const isSelected = viewMode === "Day" 
//                     ? date.toDateString() === currentDate.toDateString()
//                     : date.toDateString() === currentDate.toDateString();
//                   const dayAppointments = appointments.filter((apt) => {
//                     const aptDate = new Date(apt.scheduledAt);
//                     return aptDate.toDateString() === date.toDateString();
//                   });
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => {
//                         setCurrentDate(new Date(date));
//                         if (viewMode === "Week") setViewMode("Day");
//                       }}
//                       className={`py-2.5 sm:py-3 text-center border-r border-gray-100 last:border-r-0 transition-all relative min-w-[110px] sm:min-w-[140px] ${
//                         isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
//                         isToday ? "text-blue-600" : "text-gray-400"
//                       }`}>
//                         {date.toLocaleDateString("en-US", { weekday: "short" })}
//                       </p>
//                       <p className={`text-lg sm:text-xl font-bold mt-0.5 ${
//                         isToday ? "text-blue-600" : isSelected ? "text-gray-900" : "text-gray-700"
//                       }`}>
//                         {date.getDate()}
//                       </p>
//                       {dayAppointments.length > 0 && (
//                         <div className="flex justify-center gap-1 mt-1.5">
//                           {dayAppointments.slice(0, 4).map((apt, idx) => (
//                             <div 
//                               key={idx} 
//                               className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(apt.status).color}`} 
//                             />
//                           ))}
//                           {dayAppointments.length > 4 && (
//                             <span className="text-[8px] text-gray-400 ml-0.5">+{dayAppointments.length - 4}</span>
//                           )}
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Calendar Body */}
//             <div className="flex-1 overflow-auto custom-scrollbar relative bg-white">
//               {isLoadingSchedule ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-8 h-8 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin mb-4" />
//                   <p className="text-sm font-semibold text-gray-500">Loading schedule…</p>
//                 </div>
//               ) : scheduleError ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                   <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
//                     <AlertCircle size={28} className="text-red-400" />
//                   </div>
//                   <p className="text-sm font-semibold text-gray-700">Couldn't load the schedule</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {scheduleError?.response?.status === 401 || scheduleError?.response?.status === 403
//                       ? "You may need to sign in again."
//                       : "Check your connection and try again."}
//                   </p>
//                 </div>
//               ) : appointments.length === 0 ? (
//                 <EmptyState 
//                   message="No appointments scheduled"
//                   submessage="Select a different date or check back later"
//                 />
//               ) : (
//                 <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
//                   {/* Time Labels */}
//                   <div className="border-r border-gray-100 bg-gray-50/30 sticky left-0 z-10">
//                     {hourSlots.map((slot) => (
//                       <div key={slot.time} className={`${isMobile ? "time-slot-mobile" : "time-slot"} flex items-start justify-end pr-2 sm:pr-3 pt-1 sm:pt-2`}>
//                         <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">{slot.time}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Day Columns */}
//                   {weekDates.map((date, dayIndex) => {
//                     const dayAppointments = appointments.filter((apt) => {
//                       const aptDate = new Date(apt.scheduledAt);
//                       return aptDate.toDateString() === date.toDateString();
//                     });

//                     const isToday = date.toDateString() === new Date().toDateString();

//                     return (
//                       <div key={dayIndex} className={`relative border-r border-gray-100 last:border-r-0 min-w-[110px] sm:min-w-[140px] ${isToday ? "bg-blue-50/10" : ""}`}>
//                         {/* Hour grid lines */}
//                         {hourSlots.map((slot, i) => (
//                           <div key={slot.time} className={`${isMobile ? "time-slot-mobile" : "time-slot"} ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}></div>
//                         ))}

//                         {/* Current time indicator */}
//                         {isToday && (() => {
//                           const now = new Date();
//                           const mins = now.getHours() * 60 + now.getMinutes();
//                           if (mins < gridStartMinutes || mins > gridEndMinutes) return null;
//                           const top = minutesToTop(mins, gridStartMinutes);
//                           return (
//                             <div 
//                               className="absolute left-0 right-0 z-20 pointer-events-none"
//                               style={{ top: `${top}px` }}
//                             >
//                               <div className="flex items-center">
//                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] ring-4 ring-red-500/20" />
//                                 <div className="flex-1 h-[2px] bg-red-500/40" />
//                               </div>
//                             </div>
//                           );
//                         })()}

//                         {/* Appointments */}
//                         {dayAppointments.map((apt) => {
//                           const top = minutesToTop(timeToMinutes(apt.startTime), gridStartMinutes);
//                           const height = getDurationHeight(apt.startTime, apt.endTime);
//                           const isSelected = selectedAppointment?.id === apt.id;
//                           const statusStyle = getStatusStyle(apt.status);

//                           return (
//                             <div
//                               key={apt.id}
//                               onClick={() => handleAppointmentClick(apt)}
//                               className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md ${statusStyle.color} ${
//                                 isSelected ? "ring-[3px] ring-offset-2 ring-blue-500 scale-[1.02] z-10" : "hover:brightness-110"
//                               }`}
//                               style={{ top: `${top}px`, height: `${Math.max(height, 52)}px` }}
//                             >
//                               <div className="flex items-start justify-between gap-1">
//                                 <p className="text-white text-[10px] sm:text-xs font-bold leading-tight truncate flex-1">{apt.title}</p>
//                                 {apt.status === "IN_PROGRESS" && (
//                                   <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-white/80 text-[9px] sm:text-[10px] mt-1 leading-tight truncate">{apt.vehicle}</p>
//                               {height > 55 && (
//                                 <div className="mt-1.5 flex items-center gap-1">
//                                   <User size={9} className="text-white/60" />
//                                   <p className="text-white/70 text-[9px] sm:text-[10px] truncate">{apt.customerName}</p>
//                                 </div>
//                               )}
//                               {height > 70 && apt.plateNumber !== "N/A" && (
//                                 <p className="text-white/60 text-[9px] mt-1 truncate font-mono">{apt.plateNumber}</p>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ─── Desktop Details Sidebar ─────────── */}
//           {showDetails && !isMobile && (
//             <div className="hidden sm:flex w-[360px] lg:w-[400px] bg-white border-l border-gray-100 flex-col shadow-xl overflow-hidden animate-fade-in">
//               <DetailsPanel 
//                 appointment={selectedAppointment}
//                 onComplete={handleCompleteJob}
//                 onClose={closeDetails}
//                 isCompleting={completingId === selectedAppointment?.id}
//               />
//             </div>
//           )}

//           {/* ─── Mobile Details Overlay ─────────────────── */}
//           {isMobile && showMobileDetails && (
//             <>
//               <div 
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in sm:hidden"
//                 onClick={closeMobileDetails}
//               />
//               <div className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-[400px] bg-white z-50 animate-slide-in sm:hidden flex flex-col shadow-2xl">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
//                   <h2 className="text-base font-bold text-gray-900">Appointment Details</h2>
//                   <button
//                     onClick={closeMobileDetails}
//                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                   <DetailsPanel 
//                     appointment={selectedAppointment}
//                     onComplete={handleCompleteJob}
//                     onClose={closeMobileDetails}
//                     isCompleting={completingId === selectedAppointment?.id}
//                     isMobile={true}
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// // ─── Details Panel Component ─────────────────────────────────────

// function DetailsPanel({ appointment, onComplete, onClose, isCompleting, isMobile = false }) {
//   if (!appointment) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//           <Calendar size={28} className="text-gray-400" />
//         </div>
//         <p className="text-sm font-semibold text-gray-600">No appointment selected</p>
//         <p className="text-xs text-gray-400 mt-1">Click on a job in the calendar to view details</p>
//       </div>
//     );
//   }

//   const statusStyle = getStatusStyle(appointment.status);
//   const isDone = appointment.status === "COMPLETED";

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       {/* Header */}
//       {!isMobile && (
//         <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <h2 className="text-base font-bold text-gray-900">Job Details</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-4' : 'p-5'}`}>
//         {/* Status Banner */}
//         <div className={`flex items-center justify-between p-3 rounded-xl ${statusStyle.bg} border ${statusStyle.border} mb-5`}>
//           <div className="flex items-center gap-2.5">
//             <div className={`w-2 h-2 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
//             <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
//               {statusStyle.label}
//             </span>
//           </div>
//           <span className="text-[10px] text-gray-400 font-medium font-mono bg-white/60 px-2 py-0.5 rounded">
//             #{appointment.id?.slice(-6).toUpperCase()}
//           </span>
//         </div>

//         {/* Service Title */}
//         <div className="mb-5">
//           <h3 className="text-base font-bold text-gray-900 leading-tight">{appointment.serviceName}</h3>
//           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
//             <Wrench size={12} className="text-gray-400" />
//             {appointment.title}
//           </p>
//         </div>

//         {/* Customer Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <User size={10} /> Customer
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
//               <User size={20} className="text-gray-500" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-gray-900 truncate">{appointment.customerName}</p>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Phone size={10} className="text-gray-400" />
//                 <p className="text-xs text-gray-500">{appointment.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Card */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//             <Car size={10} /> Vehicle
//           </p>
//           <p className="text-sm font-bold text-gray-900">{appointment.vehicle}</p>
//           <div className="flex flex-wrap items-center gap-2 mt-2.5">
//             {appointment.plateNumber !== "N/A" && (
//               <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 font-mono tracking-wide">
//                 {appointment.plateNumber}
//               </span>
//             )}
//             {appointment.vehicleColor !== "N/A" && (
//               <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
//                 <span 
//                   className="w-3 h-3 rounded-full border border-gray-300" 
//                   style={{ 
//                     backgroundColor: appointment.vehicleColor.toLowerCase().includes("white") 
//                       ? "#f3f4f6" 
//                       : appointment.vehicleColor.toLowerCase().includes("black")
//                       ? "#374151"
//                       : appointment.vehicleColor.toLowerCase().includes("red")
//                       ? "#ef4444"
//                       : appointment.vehicleColor.toLowerCase().includes("blue")
//                       ? "#3b82f6"
//                       : appointment.vehicleColor.toLowerCase().includes("silver")
//                       ? "#9ca3af"
//                       : "#d1d5db"
//                   }}
//                 />
//                 {appointment.vehicleColor}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Time & Location Grid */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Start
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.startTime}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">
//               {new Date(appointment.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//             </p>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
//               <Clock size={10} /> Duration
//             </p>
//             <p className="text-sm font-bold text-gray-900">{appointment.duration}</p>
//             <p className="text-[10px] text-gray-400 mt-0.5">Estimated</p>
//           </div>
//         </div>

//         {/* Location */}
//         {appointment.location && (
//           <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
//             <MapPin size={14} className="text-gray-400" />
//             <span className="text-xs font-medium text-gray-600">{appointment.location}</span>
//           </div>
//         )}

//         {/* Service Checklist */}
//         {appointment.serviceItems && appointment.serviceItems.length > 0 && (
//           <div className="mb-5">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
//               <FileText size={10} /> Service Checklist
//             </p>
//             <div className="space-y-2">
//               {appointment.serviceItems.map((item, i) => (
//                 <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
//                   isDone 
//                     ? "bg-emerald-50/50 border-emerald-100" 
//                     : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
//                 }`}>
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//                     isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
//                   }`}>
//                     <Check size={11} strokeWidth={3} />
//                   </div>
//                   <span className={`text-xs leading-relaxed ${isDone ? "text-gray-700 font-medium" : "text-gray-500"}`}>
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notes */}
//         {appointment.notes && (
//           <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
//             <div className="flex items-center gap-1.5 mb-1.5">
//               <AlertCircle size={12} className="text-amber-500" />
//               <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Notes</p>
//             </div>
//             <p className="text-xs text-amber-800 leading-relaxed">{appointment.notes}</p>
//           </div>
//         )}

//         {/* Price */}
//         {appointment.price && (
//           <div className="mb-5 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
//             <div className="flex items-center gap-2">
//               <CreditCard size={14} className="text-emerald-600" />
//               <span className="text-xs font-semibold text-emerald-700">Estimated Price</span>
//             </div>
//             <span className="text-sm font-bold text-emerald-700">${appointment.price.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Actions */}
//         <div className={`${isMobile ? 'pt-2 pb-6' : 'pt-2 pb-4'} space-y-2.5`}>
//           <button
//             onClick={onComplete}
//             disabled={isDone || isCompleting}
//             className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
//               isDone
//                 ? "bg-emerald-100 text-emerald-700 cursor-default"
//                 : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
//             }`}
//           >
//             {isCompleting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Completing...
//               </>
//             ) : isDone ? (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Job Completed
//               </>
//             ) : (
//               <>
//                 <Check size={16} strokeWidth={3} />
//                 Complete Job
//               </>
//             )}
//           </button>
          
//           {!isDone && (
//             <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
//               Reschedule
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  Calendar,
  Clock,
  Wrench,
  Car,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";


// ─── Constants ─────────────────────────────────────────────────────

const STATUS_CONFIG = {
  CONFIRMED: { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600", label: "Confirmed", border: "border-blue-200" },
  IN_PROGRESS: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600", label: "In Progress", border: "border-amber-200" },
  COMPLETED: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", label: "Completed", border: "border-emerald-200" },
  WAITING: { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600", label: "Waiting", border: "border-orange-200" },
  UPCOMING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Upcoming", border: "border-slate-200" },
  PENDING: { color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", label: "Pending", border: "border-slate-200" },
  CANCELLED: { color: "bg-red-500", bg: "bg-red-50", text: "text-red-600", label: "Cancelled", border: "border-red-200" },
};

// ─── Helpers ───────────────────────────────────────────────────────

const getWeekDates = (baseDate) => {
  const start = new Date(baseDate);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateShort = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatDateISO = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTop = (minutes, gridStartMinutes = 0) => {
  return ((minutes - gridStartMinutes) / 60) * 80;
};

const getDurationHeight = (startTime, endTime) => {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);
  return ((endMins - startMins) / 60) * 80;
};

const getStatusStyle = (status) => {
  return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
};

// ─── Map API job from timeSlot to appointment format ───────────────

const mapTimeSlotJobToAppointment = (job, timeStr, dateStr) => {
  const startHour = parseInt(timeStr.split(":")[0], 10);

  // Duration from backend only - no fallback
  let durationHours = 0;
  if (job.duration) {
    const match = job.duration.match(/(\d+(\.\d+)?)/);
    if (match) durationHours = parseFloat(match[1]);
  }

  const endHour = durationHours > 0 ? startHour + durationHours : startHour + 1;
  const startTime = `${String(startHour).padStart(2, "0")}:00`;
  const endMin = (durationHours % 1) * 60;
  const endTime = `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.round(endMin)).padStart(2, "0")}`;

  const parseISODateLocal = (str) => {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const scheduledDate = dateStr ? parseISODateLocal(dateStr) : new Date();
  scheduledDate.setHours(startHour, 0, 0, 0);

  return {
    id: job.id,
    title: job.title || "",
    status: job.status || "",
    scheduledAt: job.scheduledAt || scheduledDate.toISOString(),
    startTime,
    endTime,
    duration: job.duration || "",
    customerName: job.user
      ? `${job.user.firstName} ${job.user.lastName}`
      : job.customerName || "",
    phone: job.user?.phone || job.phone || "",
    vehicle: job.vehicle || job.description || "",
    plateNumber: job.plateNumber || "",
    vehicleColor: job.vehicleColor || "",
    serviceName: job.serviceName || job.title || "",
    serviceItems: job.serviceItems || job.tasks || [],
    notes: job.notes || "",
    price: job.price ?? null,
    location: job.location || null,
    _raw: job,
  };
};

// ─── Extract appointments from schedule data ───────────────────────

const extractAppointmentsFromSchedule = (scheduleData) => {
  if (!scheduleData) return [];

  const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
  const appointments = [];
  const seenIds = new Set();

  days.forEach((day) => {
    if (!day?.timeSlots) return;
    day.timeSlots.forEach((slot) => {
      if (slot?.job && !seenIds.has(slot.job.id)) {
        seenIds.add(slot.job.id);
        appointments.push(mapTimeSlotJobToAppointment(slot.job, slot.time, day.date));
      }
    });
  });

  return appointments.sort((a, b) =>
    new Date(a.scheduledAt) - new Date(b.scheduledAt)
  );
};

// ─── Real API Fetch ──────────────────────────────────────────────

const fetchDaySchedule = async (dateStr) => {
  const response = await api.get("/provider/schedule", {
    params: { date: dateStr },
  });
  console.log(`[/provider/schedule?date=${dateStr}] response:`, response.data);
  return response.data;
};

const fetchWeekSchedule = async (weekDates) => {
  const results = await Promise.all(
    weekDates.map((d) => fetchDaySchedule(formatDateISO(d)))
  );
  console.log("[/provider/schedule] full week response:", results);
  return results;
};

// ─── Empty State Component ─────────────────────────────────────────

function EmptyState({ message, submessage }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Calendar size={28} className="text-gray-400" />
      </div>
      <p className="text-sm font-semibold text-gray-600">{message}</p>
      {submessage && <p className="text-xs text-gray-400 mt-1">{submessage}</p>}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────

export default function ScheduleView() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState("Week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(true);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleStatusChange = (newStatus) => setIsOnline(newStatus);

  const weekDates = getWeekDates(currentDate);

  // ─── GET SCHEDULE DATA (real API) ──────────────────────────────
  const [scheduleData, setScheduleData] = useState(null);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const [scheduleError, setScheduleError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadSchedule = async () => {
      setIsLoadingSchedule(true);
      setScheduleError(null);
      try {
        if (viewMode === "Day") {
          const dateStr = formatDateISO(currentDate);
          const data = await fetchDaySchedule(dateStr);
          if (!cancelled) setScheduleData(data);
        } else {
          const data = await fetchWeekSchedule(weekDates);
          if (!cancelled) setScheduleData(data);
        }
      } catch (err) {
        console.error("Failed to load schedule:", err);
        console.error("[error detail] status:", err?.response?.status, "| body:", err?.response?.data);
        if (!cancelled) {
          setScheduleError(err);
          setScheduleData(null);
        }
      } finally {
        if (!cancelled) setIsLoadingSchedule(false);
      }
    };

    loadSchedule();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, currentDate]);

  // Extract appointments from schedule timeSlots
  const appointments = useMemo(() => {
    const result = extractAppointmentsFromSchedule(scheduleData);
    console.log("[scheduleData -> appointments] scheduleData:", scheduleData, "| parsed appointments:", result);
    return result;
  }, [scheduleData]);

  // ─── Hour grid driven entirely by the real timeSlots the backend sent ───
  const hourSlots = useMemo(() => {
    if (!scheduleData) return [];
    const days = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
    const dayWithSlots = days.find((d) => Array.isArray(d?.timeSlots) && d.timeSlots.length > 0);
    return dayWithSlots?.timeSlots || [];
  }, [scheduleData]);

  const gridStartMinutes = hourSlots.length > 0 ? hourSlots[0].hour * 60 : 0;
  const gridEndMinutes = hourSlots.length > 0 ? (hourSlots[hourSlots.length - 1].hour + 1) * 60 : 0;

  // Stats
  const stats = useMemo(() => {
    const total = appointments.length;
    const inProgress = appointments.filter(a => a.status === "IN_PROGRESS").length;
    const completed = appointments.filter(a => a.status === "COMPLETED").length;
    const upcoming = appointments.filter(a => a.status === "CONFIRMED" || a.status === "UPCOMING").length;
    return { total, inProgress, completed, upcoming };
  }, [appointments]);

  // Selected appointment state
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Auto-select first appointment when schedule loads
  useEffect(() => {
    if (appointments.length > 0 && !selectedAppointment) {
      setSelectedAppointment(appointments[0]);
    }
  }, [appointments, selectedAppointment]);

  // ─── Navigation ────────────────────────────────────────────────
  const goToPrev = () => {
    const d = new Date(currentDate);
    if (viewMode === "Day") d.setDate(d.getDate() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
    setSelectedAppointment(null);
  };

  const goToNext = () => {
    const d = new Date(currentDate);
    if (viewMode === "Day") d.setDate(d.getDate() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
    setSelectedAppointment(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedAppointment(null);
  };

  // ─── Appointment Click ─────────────────────────────────────────
  const handleAppointmentClick = (apt) => {
    setSelectedAppointment(apt);
    if (!showDetails && !isMobile) setShowDetails(true);
    if (isMobile) setShowMobileDetails(true);
  };

  const closeDetails = () => setShowDetails(false);
  const closeMobileDetails = () => setShowMobileDetails(false);

  // ─── Complete Job (local state only) ───────────────────────────
  const [completingId, setCompletingId] = useState(null);

  const handleCompleteJob = () => {
    if (!selectedAppointment || selectedAppointment.status === "COMPLETED") return;

    setCompletingId(selectedAppointment.id);

    setTimeout(() => {
      setSelectedAppointment(prev => prev ? { ...prev, status: "COMPLETED" } : null);
      setCompletingId(null);
    }, 800);
  };

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in { animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .calendar-grid {
          display: grid;
          grid-template-columns: 64px repeat(7, minmax(140px, 1fr));
        }
        .calendar-grid-mobile {
          display: grid;
          grid-template-columns: 52px repeat(7, minmax(110px, 1fr));
        }
        .time-slot {
          height: 80px;
          border-bottom: 1px solid #f1f5f9;
        }
        .time-slot-mobile {
          height: 64px;
          border-bottom: 1px solid #f1f5f9;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isOnline={isOnline}
        setIsOnline={handleStatusChange}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          toggleSidebar={toggleSidebar}
          isOnline={isOnline}
          setIsOnline={handleStatusChange}
        />

        {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 flex overflow-hidden relative">

          {/* ─── Calendar Area ────────────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 gap-3">
              <div className="flex items-start gap-3">
                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedule</h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {viewMode === "Day"
                      ? formatDate(currentDate)
                      : `${formatDateShort(weekDates[0])} – ${formatDateShort(weekDates[6])}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Stats pills (desktop) */}
                <div className="hidden lg:flex items-center gap-2 mr-2">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                    {stats.total} Jobs
                  </span>
                  {stats.inProgress > 0 && (
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                      {stats.inProgress} Active
                    </span>
                  )}
                  {stats.completed > 0 && (
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {stats.completed} Done
                    </span>
                  )}
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                  {["Day", "Week"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setViewMode(mode);
                        setSelectedAppointment(null);
                      }}
                      className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                        viewMode === mode
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                  <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-white rounded-md transition-all">
                    Today
                  </button>
                  <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-500 transition-all">
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Toggle details */}
                {!isMobile && (
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${
                      showDetails ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                    title={showDetails ? "Hide details" : "Show details"}
                  >
                    <Menu size={16} />
                  </button>
                )}

                {/* Mobile details toggle */}
                {isMobile && selectedAppointment && (
                  <button
                    onClick={() => setShowMobileDetails(true)}
                    className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white"
                  >
                    <Menu size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Days Header */}
            <div className="overflow-x-auto hide-scrollbar bg-white border-b border-gray-100">
              <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
                <div className="border-r border-gray-100 bg-gray-50/50"></div>
                {weekDates.map((date, i) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isSelected = viewMode === "Day"
                    ? date.toDateString() === currentDate.toDateString()
                    : date.toDateString() === currentDate.toDateString();
                  const dayAppointments = appointments.filter((apt) => {
                    const aptDate = new Date(apt.scheduledAt);
                    return aptDate.toDateString() === date.toDateString();
                  });

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentDate(new Date(date));
                        if (viewMode === "Week") setViewMode("Day");
                      }}
                      className={`py-2.5 sm:py-3 text-center border-r border-gray-100 last:border-r-0 transition-all relative min-w-[110px] sm:min-w-[140px] ${
                        isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/50"
                      }`}
                    >
                      <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                        isToday ? "text-blue-600" : "text-gray-400"
                      }`}>
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className={`text-lg sm:text-xl font-bold mt-0.5 ${
                        isToday ? "text-blue-600" : isSelected ? "text-gray-900" : "text-gray-700"
                      }`}>
                        {date.getDate()}
                      </p>
                      {dayAppointments.length > 0 && (
                        <div className="flex justify-center gap-1 mt-1.5">
                          {dayAppointments.slice(0, 4).map((apt, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(apt.status).color}`}
                            />
                          ))}
                          {dayAppointments.length > 4 && (
                            <span className="text-[8px] text-gray-400 ml-0.5">+{dayAppointments.length - 4}</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Body */}
            <div className="flex-1 overflow-auto custom-scrollbar relative bg-white">
              {isLoadingSchedule ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-8 h-8 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin mb-4" />
                  <p className="text-sm font-semibold text-gray-500">Loading schedule…</p>
                </div>
              ) : scheduleError ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <AlertCircle size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Couldn't load the schedule</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {scheduleError?.response?.status === 401 || scheduleError?.response?.status === 403
                      ? "You may need to sign in again."
                      : "Check your connection and try again."}
                  </p>
                </div>
              ) : appointments.length === 0 ? (
                <EmptyState
                  message="No appointments scheduled"
                  submessage="Select a different date or check back later"
                />
              ) : (
                <div className={`min-w-max ${isMobile ? "calendar-grid-mobile" : "calendar-grid"}`}>
                  {/* Time Labels */}
                  <div className="border-r border-gray-100 bg-gray-50/30 sticky left-0 z-10">
                    {hourSlots.map((slot) => (
                      <div key={slot.time} className={`${isMobile ? "time-slot-mobile" : "time-slot"} flex items-start justify-end pr-2 sm:pr-3 pt-1 sm:pt-2`}>
                        <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">{slot.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Day Columns */}
                  {weekDates.map((date, dayIndex) => {
                    const dayAppointments = appointments.filter((apt) => {
                      const aptDate = new Date(apt.scheduledAt);
                      return aptDate.toDateString() === date.toDateString();
                    });

                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                      <div key={dayIndex} className={`relative border-r border-gray-100 last:border-r-0 min-w-[110px] sm:min-w-[140px] ${isToday ? "bg-blue-50/10" : ""}`}>
                        {/* Hour grid lines */}
                        {hourSlots.map((slot, i) => (
                          <div key={slot.time} className={`${isMobile ? "time-slot-mobile" : "time-slot"} ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}></div>
                        ))}

                        {/* Current time indicator */}
                        {isToday && (() => {
                          const now = new Date();
                          const mins = now.getHours() * 60 + now.getMinutes();
                          if (mins < gridStartMinutes || mins > gridEndMinutes) return null;
                          const top = minutesToTop(mins, gridStartMinutes);
                          return (
                            <div
                              className="absolute left-0 right-0 z-20 pointer-events-none"
                              style={{ top: `${top}px` }}
                            >
                              <div className="flex items-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-[5px] ring-4 ring-red-500/20" />
                                <div className="flex-1 h-[2px] bg-red-500/40" />
                              </div>
                            </div>
                          );
                        })()}

                        {/* Appointments */}
                        {dayAppointments.map((apt) => {
                          const top = minutesToTop(timeToMinutes(apt.startTime), gridStartMinutes);
                          const height = getDurationHeight(apt.startTime, apt.endTime);
                          const isSelected = selectedAppointment?.id === apt.id;
                          const statusStyle = getStatusStyle(apt.status);

                          return (
                            <div
                              key={apt.id}
                              onClick={() => handleAppointmentClick(apt)}
                              className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md ${statusStyle.color} ${
                                isSelected ? "ring-[3px] ring-offset-2 ring-blue-500 scale-[1.02] z-10" : "hover:brightness-110"
                              }`}
                              style={{ top: `${top}px`, height: `${Math.max(height, 52)}px` }}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <p className="text-white text-[10px] sm:text-xs font-bold leading-tight truncate flex-1">{apt.title}</p>
                                {apt.status === "IN_PROGRESS" && (
                                  <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                  </span>
                                )}
                              </div>
                              {apt.vehicle && (
                                <p className="text-white/80 text-[9px] sm:text-[10px] mt-1 leading-tight truncate">{apt.vehicle}</p>
                              )}
                              {height > 55 && apt.customerName && (
                                <div className="mt-1.5 flex items-center gap-1">
                                  <User size={9} className="text-white/60" />
                                  <p className="text-white/70 text-[9px] sm:text-[10px] truncate">{apt.customerName}</p>
                                </div>
                              )}
                              {height > 70 && apt.plateNumber && (
                                <p className="text-white/60 text-[9px] mt-1 truncate font-mono">{apt.plateNumber}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── Desktop Details Sidebar ─────────── */}
          {showDetails && !isMobile && (
            <div className="hidden sm:flex w-[360px] lg:w-[400px] bg-white border-l border-gray-100 flex-col shadow-xl overflow-hidden animate-fade-in">
              <DetailsPanel
                appointment={selectedAppointment}
                onComplete={handleCompleteJob}
                onClose={closeDetails}
                isCompleting={completingId === selectedAppointment?.id}
              />
            </div>
          )}

          {/* ─── Mobile Details Overlay ─────────────────── */}
          {isMobile && showMobileDetails && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in sm:hidden"
                onClick={closeMobileDetails}
              />
              <div className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-[400px] bg-white z-50 animate-slide-in sm:hidden flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-base font-bold text-gray-900">Appointment Details</h2>
                  <button
                    onClick={closeMobileDetails}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <DetailsPanel
                    appointment={selectedAppointment}
                    onComplete={handleCompleteJob}
                    onClose={closeMobileDetails}
                    isCompleting={completingId === selectedAppointment?.id}
                    isMobile={true}
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Details Panel Component ─────────────────────────────────────

function DetailsPanel({ appointment, onComplete, onClose, isCompleting, isMobile = false }) {
  if (!appointment) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <Calendar size={28} className="text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-600">No appointment selected</p>
        <p className="text-xs text-gray-400 mt-1">Click on a job in the calendar to view details</p>
      </div>
    );
  }

  const statusStyle = getStatusStyle(appointment.status);
  const isDone = appointment.status === "COMPLETED";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      {!isMobile && (
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
            <h2 className="text-base font-bold text-gray-900">Job Details</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-4' : 'p-5'}`}>
        {/* Status Banner */}
        <div className={`flex items-center justify-between p-3 rounded-xl ${statusStyle.bg} border ${statusStyle.border} mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${statusStyle.color} ${appointment.status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium font-mono bg-white/60 px-2 py-0.5 rounded">
            #{appointment.id?.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* Service Title */}
        {appointment.serviceName && (
          <div className="mb-5">
            <h3 className="text-base font-bold text-gray-900 leading-tight">{appointment.serviceName}</h3>
            {appointment.title && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Wrench size={12} className="text-gray-400" />
                {appointment.title}
              </p>
            )}
          </div>
        )}

        {/* Customer Card */}
        {appointment.customerName && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User size={10} /> Customer
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <User size={20} className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{appointment.customerName}</p>
                {appointment.phone && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Phone size={10} className="text-gray-400" />
                    <p className="text-xs text-gray-500">{appointment.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Card */}
        {appointment.vehicle && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Car size={10} /> Vehicle
            </p>
            <p className="text-sm font-bold text-gray-900">{appointment.vehicle}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              {appointment.plateNumber && (
                <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 font-mono tracking-wide">
                  {appointment.plateNumber}
                </span>
              )}
              {appointment.vehicleColor && (
                <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: appointment.vehicleColor.toLowerCase().includes("white")
                        ? "#f3f4f6"
                        : appointment.vehicleColor.toLowerCase().includes("black")
                        ? "#374151"
                        : appointment.vehicleColor.toLowerCase().includes("red")
                        ? "#ef4444"
                        : appointment.vehicleColor.toLowerCase().includes("blue")
                        ? "#3b82f6"
                        : appointment.vehicleColor.toLowerCase().includes("silver")
                        ? "#9ca3af"
                        : "#d1d5db"
                    }}
                  />
                  {appointment.vehicleColor}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Time & Location Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Clock size={10} /> Start
            </p>
            <p className="text-sm font-bold text-gray-900">{appointment.startTime}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {new Date(appointment.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>
          </div>
          {appointment.duration && (
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Clock size={10} /> Duration
              </p>
              <p className="text-sm font-bold text-gray-900">{appointment.duration}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Estimated</p>
            </div>
          )}
        </div>

        {/* Location */}
        {appointment.location && (
          <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
            <MapPin size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{appointment.location}</span>
          </div>
        )}

        {/* Service Checklist */}
        {appointment.serviceItems && appointment.serviceItems.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText size={10} /> Service Checklist
            </p>
            <div className="space-y-2">
              {appointment.serviceItems.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  isDone
                    ? "bg-emerald-50/50 border-emerald-100"
                    : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDone ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}>
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span className={`text-xs leading-relaxed ${isDone ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {appointment.notes && (
          <div className="mb-5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle size={12} className="text-amber-500" />
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Notes</p>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">{appointment.notes}</p>
          </div>
        )}

        {/* Price */}
        {appointment.price !== null && appointment.price !== undefined && (
          <div className="mb-5 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2">
              <CreditCard size={14} className="text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">Estimated Price</span>
            </div>
            <span className="text-sm font-bold text-emerald-700">${appointment.price.toFixed(2)}</span>
          </div>
        )}

        {/* Actions */}
        <div className={`${isMobile ? 'pt-2 pb-6' : 'pt-2 pb-4'} space-y-2.5`}>
          <button
            onClick={onComplete}
            disabled={isDone || isCompleting}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
              isDone
                ? "bg-emerald-100 text-emerald-700 cursor-default"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            }`}
          >
            {isCompleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Completing...
              </>
            ) : isDone ? (
              <>
                <Check size={16} strokeWidth={3} />
                Job Completed
              </>
            ) : (
              <>
                <Check size={16} strokeWidth={3} />
                Complete Job
              </>
            )}
          </button>

          {!isDone && (
            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
              Reschedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}