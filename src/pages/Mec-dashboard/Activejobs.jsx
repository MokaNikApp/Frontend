// import { useState, useRef, useEffect } from "react";
// import { FiMoreVertical, FiMapPin, FiChevronDown, FiTruck } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // Correctly importing your custom configured api instance!
// import api from "../../api/axios"; 
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";

// const dotMenuOptions = ["View Details", "Reassign Job", "Contact Customer", "Cancel Job"];
// const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
// const FALLBACK_CAR = "https://images.unsplash.com/photo-1617886326072-1bed7f8d2228?auto=format&fit=crop&w=600&q=80";

// function JobCard({ job, onComplete, onUpdateProgress, isCompleting }) {
//   const [showStatusMenu, setShowStatusMenu] = useState(false);
//   const [showDotMenu, setShowDotMenu] = useState(false);
//   const [progressInput, setProgressInput] = useState(job.progress);
//   const [showProgressEdit, setShowProgressEdit] = useState(false);
//   const statusRef = useRef(null);
//   const dotRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatusMenu(false);
//       if (dotRef.current && !dotRef.current.contains(e.target)) setShowDotMenu(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const isInProgress = job.type === "inprogress";
//   const isEnRoute = job.type === "enroute";

//   const statusOptions = [
//     { 
//       label: isCompleting ? "Completing..." : "Mark Complete", 
//       action: () => { onComplete(job.id); setShowStatusMenu(false); } 
//     },
//     { label: "Update Progress", action: () => { setShowProgressEdit(true); setShowStatusMenu(false); } },
//     { label: "Contact Customer", action: () => { setShowStatusMenu(false); } },
//     { label: "Cancel Job", action: () => { setShowStatusMenu(false); } },
//   ];

//   return (
//     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">

//       {/* TOP ROW */}
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3">
//           <img
//             src={job.carImage}
//             alt={job.carModel}
//             className="w-16 h-12 object-cover rounded-lg bg-gray-100"
//           />
//           <div>
//             <p className="font-bold text-gray-900 text-sm">{job.name}</p>
//             <p className="text-xs text-gray-500">
//               {job.carModel}{" "}
//               <span className="font-bold text-gray-800">{job.plateNumber}</span>
//             </p>
//             <div className="flex items-center gap-1.5 mt-1">
//               {isInProgress && (
//                 <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
//                   <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
//                   IN PROGRESS
//                 </span>
//               )}
//               {isEnRoute && (
//                 <span className="flex items-center gap-1 text-xs font-semibold text-orange-500">
//                   <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
//                   EN ROUTE
//                 </span>
//               )}
//               <span className="text-xs text-gray-400">{job.scheduledDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* THREE DOTS MENU */}
//         <div className="relative" ref={dotRef}>
//           <button
//             onClick={() => setShowDotMenu(!showDotMenu)}
//             className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
//           >
//             <FiMoreVertical size={16} />
//           </button>
//           {showDotMenu && (
//             <div className="absolute right-0 top-7 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
//               {dotMenuOptions.map((opt) => (
//                 <button
//                   key={opt}
//                   className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
//                     opt === "Cancel Job" ? "text-red-500" : "text-gray-700"
//                   }`}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* PROGRESS BAR */}
//       {isInProgress && job.service && (
//         <div>
//           <div className="flex items-center justify-between mb-1.5">
//             <p className="text-xs text-gray-500">{job.service}</p>
//             <p className="text-xs font-bold text-blue-600">{job.progress}%</p>
//           </div>
//           <div className="w-full bg-gray-100 rounded-full h-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${job.progress}%` }}
//             />
//           </div>
//           {showProgressEdit && (
//             <div className="flex items-center gap-2 mt-2">
//               <input
//                 type="range" min="0" max="100"
//                 value={progressInput}
//                 onChange={(e) => setProgressInput(Number(e.target.value))}
//                 className="flex-1"
//               />
//               <span className="text-xs font-bold text-blue-600 w-8">{progressInput}%</span>
//               <button
//                 onClick={() => { onUpdateProgress(job.id, progressInput); setShowProgressEdit(false); }}
//                 className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* PICKUP ADDRESS */}
//       {isEnRoute && job.pickupAddress && (
//         <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
//           <FiMapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
//           <div>
//             <p className="text-xs font-semibold text-gray-700">Pick-up Request</p>
//             <p className="text-xs text-gray-500">{job.pickupAddress}</p>
//           </div>
//         </div>
//       )}

//       {/* TOWING SERVICE */}
//       {isEnRoute && job.service && job.service.toLowerCase().includes("tow") && (
//         <div className="flex items-start gap-2 bg-orange-50 rounded-lg px-3 py-2">
//           <FiTruck size={14} className="text-orange-500 mt-0.5 shrink-0" />
//           <div>
//             <p className="text-xs font-semibold text-gray-700">{job.service}</p>
//             <p className="text-xs text-gray-500">{job.pickupAddress}</p>
//           </div>
//         </div>
//       )}

//       {/* BOTTOM ROW */}
//       <div className="flex items-center justify-between mt-auto">
//         <div className="flex -space-x-2">
//           {job.avatars.map((av, i) => (
//             <img
//               key={i}
//               src={av}
//               alt={`avatar-${i}`}
//               className="w-8 h-8 rounded-full border-2 border-white object-cover bg-gray-200"
//             />
//           ))}
//         </div>

//         {/* UPDATE STATUS DROPDOWN */}
//         <div className="relative" ref={statusRef}>
//           <button
//             onClick={() => setShowStatusMenu(!showStatusMenu)}
//             className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Update Status <FiChevronDown size={13} />
//           </button>
//           {showStatusMenu && (
//             <div className="absolute right-0 bottom-10 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
//               {statusOptions.map((opt) => (
//                 <button
//                   key={opt.label}
//                   onClick={opt.action}
//                   disabled={opt.label === "Completing..."}
//                   className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
//                     opt.label === "Cancel Job" ? "text-red-500" : "text-gray-700"
//                   }`}
//                 >
//                   {opt.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// export default function ActiveJobs() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const queryClient = useQueryClient();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // ---------------------------------------------------------------------------
//   // 1. FETCH ONGOING SERVICES FROM SERVER
//   // ---------------------------------------------------------------------------
//   const { data: rawData, isLoading } = useQuery({
//     queryKey: ["jobsActive"],
//     queryFn: async () => {
//       const res = await api.get("/jobs/status/ACCEPTED");
//       return res.data;
//     }
//   });

//   // ---------------------------------------------------------------------------
//   // 2. MUTATIONS FOR UPDATING STATUS & PROGRESS
//   // ---------------------------------------------------------------------------
//   const completeJobMutation = useMutation({
//     mutationFn: async (jobId) => {
//       // Endpoint syntax matches your job request actions
//       return await api.post(`/jobs/${jobId}/complete`); 
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["jobsActive"]);
//     }
//   });

//   const updateProgressMutation = useMutation({
//     mutationFn: async ({ jobId, progressPercentage }) => {
//       return await api.patch(`/jobs/${jobId}`, { progressPercentage });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["jobsActive"]);
//     }
//   });

//   const handleComplete = (id) => {
//     completeJobMutation.mutate(id);
//   };

//   const handleUpdateProgress = (id, percentage) => {
//     updateProgressMutation.mutate({ jobId: id, progressPercentage: percentage });
//   };

//   // ---------------------------------------------------------------------------
//   // 3. TRANSLATION LAYER (Adapting Backend Data to match original UI fields)
//   // ---------------------------------------------------------------------------
//   const items = Array.isArray(rawData) 
//     ? rawData 
//     : Array.isArray(rawData?.data) 
//       ? rawData.data 
//       : [];

//   const activeJobs = items.map((j) => {
//     let displayDate = j.scheduledAt || "Pending Date";
//     if (j.scheduledAt) {
//       try {
//         displayDate = new Date(j.scheduledAt).toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//       } catch (e) {
//         // Fallback
//       }
//     }

//     const clientName = j.user ? `${j.user.firstName || ""} ${j.user.lastName || ""}`.trim() : "Client Request";
//     const currentProgress = j.progressPercentage || j.progress || 0;

//     return {
//       id: j.id,
//       name: clientName,
//       // If progress is greater than 0, mark as inprogress, otherwise show as enroute
//       type: currentProgress > 0 ? "inprogress" : "enroute", 
//       carModel: j.description || "Vehicle Request",
//       plateNumber: j.plateNumber || "KJA-123AA", 
//       scheduledDate: displayDate,
//       service: j.title || "Mechanical Service",
//       progress: currentProgress,
//       pickupAddress: j.pickupAddress || "Customer Location Base",
//       carImage: j.image || FALLBACK_CAR,
//       avatars: [j.user?.avatar || FALLBACK_AVATAR]
//     };
//   });

//   const filters = [
//     { label: "All Jobs", value: "all" },
//     { label: "En Route", value: "enroute" },
//     { label: "In Progress", value: "inprogress" },
//   ];

//   const filteredJobs =
//     activeFilter === "all"
//       ? activeJobs
//       : activeJobs.filter((job) => job.type === activeFilter);

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-100">

//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         isOnline={isOnline}
//         setIsOnline={setIsOnline}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

//         <main className="flex-1 overflow-y-auto p-4 sm:p-6">

//           {/* HEADER */}
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-black text-gray-800">Ongoing Services</h1>
//               <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                 Real-time status of all active workshop repairs.
//               </p>
//             </div>
//             <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden w-fit shrink-0">
//               {filters.map((f) => (
//                 <button
//                   key={f.value}
//                   onClick={() => setActiveFilter(f.value)}
//                   className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
//                     activeFilter === f.value
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   {f.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* JOBS GRID */}
//           {isLoading ? (
//             <div className="flex items-center justify-center h-48 text-xs font-semibold tracking-wide text-gray-400 animate-pulse">
//               ⚡ LOADING ACTIVE REPAIR TRACKS...
//             </div>
//           ) : filteredJobs.length === 0 ? (
//             <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
//               No jobs found for this filter.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {filteredJobs.map((job) => (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   onComplete={handleComplete}
//                   onUpdateProgress={handleUpdateProgress}
//                   isCompleting={completeJobMutation.isLoading}
//                 />
//               ))}
//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }
















// import React, { useState, useEffect } from 'react';
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";

// // ─── Mock Data ─────────────────────────────────────────────
// const INITIAL_JOBS = [
//   {
//     id: 1,
//     customerName: 'John Doe',
//     vehicle: 'Toyota Camry',
//     plate: 'ABC-1234',
//     carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=150&h=150&fit=crop',
//     status: 'in-progress',
//     startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
//     serviceType: 'workshop',
//     serviceName: 'Transmission Fluid Change',
//     progress: 65,
//     mechanics: [
//       'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
//     ],
//     location: null,
//   },
//   {
//     id: 2,
//     customerName: 'Sarah Smith',
//     vehicle: 'Honda CR-V',
//     plate: 'XYZ-9876',
//     carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=150&h=150&fit=crop',
//     status: 'en-route',
//     eta: 'ETA 15 mins',
//     serviceType: 'pickup',
//     serviceName: 'Pick-up Request',
//     location: '452 Oak Street, West Avenue',
//     driverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
//   },
//   {
//     id: 3,
//     customerName: 'Michael Chen',
//     vehicle: 'BMW M4',
//     plate: 'K-FAST-99',
//     carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=150&h=150&fit=crop',
//     status: 'in-progress',
//     startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45m ago
//     serviceType: 'workshop',
//     serviceName: 'Full Engine Diagnostic',
//     progress: 20,
//     mechanics: [
//       'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face',
//     ],
//     location: null,
//   },
//   {
//     id: 4,
//     customerName: 'Robert Miller',
//     vehicle: 'Ford F-150',
//     plate: 'TRK-2200',
//     carImage: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=150&h=150&fit=crop',
//     status: 'en-route',
//     eta: 'Arriving Now',
//     serviceType: 'towing',
//     serviceName: 'Towing Service',
//     location: 'Highway 101, Exit 24',
//     driverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
//   },
// ];

// // ─── Utility Components ────────────────────────────────────

// const StatusBadge = ({ status }) => {
//   const styles = {
//     'in-progress': 'bg-blue-50 text-blue-600 border-blue-100',
//     'en-route': 'bg-amber-50 text-amber-600 border-amber-100',
//   };

//   const labels = {
//     'in-progress': 'IN PROGRESS',
//     'en-route': 'EN ROUTE',
//   };

//   const dotColors = {
//     'in-progress': 'bg-blue-500',
//     'en-route': 'bg-amber-500',
//   };

//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
//       {labels[status]}
//     </span>
//   );
// };

// const ProgressBar = ({ progress }) => (
//   <div className="mt-3">
//     <div className="flex justify-between items-center mb-1.5">
//       <span className="text-sm font-medium text-gray-700">{progress.serviceName}</span>
//       <span className="text-sm font-semibold text-blue-600">{progress.value}%</span>
//     </div>
//     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
//         style={{ width: `${progress.value}%` }}
//       />
//     </div>
//   </div>
// );

// const LocationInfo = ({ serviceType, location }) => {
//   const icons = {
//     pickup: (
//       <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     ),
//     towing: (
//       <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//   };

//   return (
//     <div className="mt-3 flex items-start gap-3">
//       <div className="mt-0.5 shrink-0">{icons[serviceType]}</div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">
//           {serviceType === 'pickup' ? 'Pick-up Request' : 'Towing Service'}
//         </p>
//         <p className="text-sm text-gray-500">{location}</p>
//       </div>
//     </div>
//   );
// };

// const UpdateStatusDropdown = ({ currentStatus, onUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = React.useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const statusOptions = [
//     { value: 'en-route', label: 'En Route' },
//     { value: 'in-progress', label: 'In Progress' },
//     { value: 'completed', label: 'Completed' },
//     { value: 'cancelled', label: 'Cancelled' },
//   ];

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
//       >
//         Update Status
//         <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
//           {statusOptions.map((option) => (
//             <button
//               key={option.value}
//               onClick={() => {
//                 onUpdate(option.value);
//                 setIsOpen(false);
//               }}
//               className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
//                 currentStatus === option.value ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const JobCard = ({ job, onUpdateStatus }) => {
//   const getTimeAgo = (isoString) => {
//     const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000 / 60);
//     if (diff < 60) return `Started ${diff}m ago`;
//     const hours = Math.floor(diff / 60);
//     return `Started ${hours}h ago`;
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-4">
//           <img
//             src={job.carImage}
//             alt={job.vehicle}
//             className="w-16 h-16 rounded-xl object-cover bg-gray-100"
//           />
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">{job.customerName}</h3>
//             <div className="flex items-center gap-2 mt-0.5">
//               <span className="text-sm text-gray-500">{job.vehicle}</span>
//               <span className="text-sm font-semibold text-gray-900">{job.plate}</span>
//             </div>
//             <div className="flex items-center gap-3 mt-2">
//               <StatusBadge status={job.status} />
//               {job.startedAt && (
//                 <span className="text-sm text-gray-400">{getTimeAgo(job.startedAt)}</span>
//               )}
//               {job.eta && !job.startedAt && (
//                 <span className="text-sm text-gray-400">{job.eta}</span>
//               )}
//             </div>
//           </div>
//         </div>
//         <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//           </svg>
//         </button>
//       </div>

//       {/* Service Details */}
//       <div className="mt-4 pt-4 border-t border-gray-50">
//         {job.serviceType === 'workshop' ? (
//           <ProgressBar progress={{ serviceName: job.serviceName, value: job.progress }} />
//         ) : (
//           <LocationInfo serviceType={job.serviceType} location={job.location} />
//         )}
//       </div>

//       {/* Footer */}
//       <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
//         <div className="flex -space-x-2">
//           {job.mechanics?.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt="Mechanic"
//               className="w-8 h-8 rounded-full border-2 border-white object-cover"
//             />
//           ))}
//           {job.driverImage && (
//             <img
//               src={job.driverImage}
//               alt="Driver"
//               className="w-8 h-8 rounded-full border-2 border-white object-cover"
//             />
//           )}
//         </div>
//         <UpdateStatusDropdown currentStatus={job.status} onUpdate={(status) => onUpdateStatus(job.id, status)} />
//       </div>
//     </div>
//   );
// };

// // ─── Main Dashboard ────────────────────────────────────────

// const OngoingServices = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [jobs, setJobs] = useState(INITIAL_JOBS);

//   const tabs = [
//     { id: 'all', label: 'All Jobs' },
//     { id: 'en-route', label: 'En Route' },
//     { id: 'in-progress', label: 'In Progress' },
//   ];

//   const filteredJobs = jobs.filter((job) => {
//     if (activeTab === 'all') return true;
//     return job.status === activeTab;
//   });

//   const handleUpdateStatus = async (jobId, newStatus) => {
//     // Optimistic update
//     setJobs((prev) =>
//       prev.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job))
//     );

//     // API integration ready — replace with your actual endpoint
//     // const token = localStorage.getItem('token');
//     // await fetch(`/api/jobs/${jobId}/status`, {
//     //   method: 'PATCH',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`,
//     //   },
//     //   body: JSON.stringify({ status: newStatus }),
//     // });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ongoing Services</h1>
//             <p className="text-gray-500 mt-1">Real-time status of all active workshop repairs.</p>
//           </div>

//           {/* Tabs */}
//           <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-white shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {filteredJobs.map((job) => (
//             <JobCard key={job.id} job={job} onUpdateStatus={handleUpdateStatus} />
//           ))}
//         </div>

//         {filteredJobs.length === 0 && (
//           <div className="text-center py-20">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
//             <p className="text-gray-500 mt-1">There are no {activeTab !== 'all' ? activeTab.replace('-', ' ') : 'active'} jobs at the moment.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OngoingServices;






// import React, { useState, useEffect } from 'react';
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";

// // ─── Mock Data ─────────────────────────────────────────────
// const INITIAL_JOBS = [
//   {
//     id: 1,
//     customerName: 'John Doe',
//     vehicle: 'Toyota Camry',
//     plate: 'ABC-1234',
//     carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=150&h=150&fit=crop',
//     status: 'in-progress',
//     startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     serviceType: 'workshop',
//     serviceName: 'Transmission Fluid Change',
//     progress: 65,
//     mechanics: [
//       'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
//     ],
//     location: null,
//   },
//   {
//     id: 2,
//     customerName: 'Sarah Smith',
//     vehicle: 'Honda CR-V',
//     plate: 'XYZ-9876',
//     carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=150&h=150&fit=crop',
//     status: 'en-route',
//     eta: 'ETA 15 mins',
//     serviceType: 'pickup',
//     serviceName: 'Pick-up Request',
//     location: '452 Oak Street, West Avenue',
//     driverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
//   },
//   {
//     id: 3,
//     customerName: 'Michael Chen',
//     vehicle: 'BMW M4',
//     plate: 'K-FAST-99',
//     carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=150&h=150&fit=crop',
//     status: 'in-progress',
//     startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
//     serviceType: 'workshop',
//     serviceName: 'Full Engine Diagnostic',
//     progress: 20,
//     mechanics: [
//       'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face',
//     ],
//     location: null,
//   },
//   {
//     id: 4,
//     customerName: 'Robert Miller',
//     vehicle: 'Ford F-150',
//     plate: 'TRK-2200',
//     carImage: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=150&h=150&fit=crop',
//     status: 'en-route',
//     eta: 'Arriving Now',
//     serviceType: 'towing',
//     serviceName: 'Towing Service',
//     location: 'Highway 101, Exit 24',
//     driverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
//   },
// ];

// // ─── Utility Components ────────────────────────────────────

// const StatusBadge = ({ status }) => {
//   const styles = {
//     'in-progress': 'bg-blue-50 text-blue-600 border-blue-100',
//     'en-route': 'bg-amber-50 text-amber-600 border-amber-100',
//     'completed': 'bg-green-50 text-green-600 border-green-100',
//     'cancelled': 'bg-red-50 text-red-600 border-red-100',
//   };

//   const labels = {
//     'in-progress': 'IN PROGRESS',
//     'en-route': 'EN ROUTE',
//     'completed': 'COMPLETED',
//     'cancelled': 'CANCELLED',
//   };

//   const dotColors = {
//     'in-progress': 'bg-blue-500',
//     'en-route': 'bg-amber-500',
//     'completed': 'bg-green-500',
//     'cancelled': 'bg-red-500',
//   };

//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['in-progress']}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors['in-progress']}`} />
//       {labels[status] || labels['in-progress']}
//     </span>
//   );
// };

// const ProgressBar = ({ progress }) => (
//   <div className="mt-3">
//     <div className="flex justify-between items-center mb-1.5">
//       <span className="text-sm font-medium text-gray-700">{progress.serviceName}</span>
//       <span className="text-sm font-semibold text-blue-600">{progress.value}%</span>
//     </div>
//     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
//         style={{ width: `${progress.value}%` }}
//       />
//     </div>
//   </div>
// );

// const LocationInfo = ({ serviceType, location }) => {
//   const icons = {
//     pickup: (
//       <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     ),
//     towing: (
//       <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//   };

//   return (
//     <div className="mt-3 flex items-start gap-3">
//       <div className="mt-0.5 shrink-0">{icons[serviceType]}</div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">
//           {serviceType === 'pickup' ? 'Pick-up Request' : 'Towing Service'}
//         </p>
//         <p className="text-sm text-gray-500">{location}</p>
//       </div>
//     </div>
//   );
// };

// const UpdateStatusDropdown = ({ currentStatus, onUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = React.useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const statusOptions = [
//     { value: 'en-route', label: 'En Route' },
//     { value: 'in-progress', label: 'In Progress' },
//     { value: 'completed', label: 'Completed' },
//     { value: 'cancelled', label: 'Cancelled' },
//   ];

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
//       >
//         Update Status
//         <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
//           {statusOptions.map((option) => (
//             <button
//               key={option.value}
//               onClick={() => {
//                 onUpdate(option.value);
//                 setIsOpen(false);
//               }}
//               className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
//                 currentStatus === option.value ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const JobCard = ({ job, onUpdateStatus }) => {
//   const getTimeAgo = (isoString) => {
//     const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000 / 60);
//     if (diff < 60) return `Started ${diff}m ago`;
//     const hours = Math.floor(diff / 60);
//     return `Started ${hours}h ago`;
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-4">
//           <img
//             src={job.carImage}
//             alt={job.vehicle}
//             className="w-16 h-16 rounded-xl object-cover bg-gray-100"
//           />
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">{job.customerName}</h3>
//             <div className="flex items-center gap-2 mt-0.5">
//               <span className="text-sm text-gray-500">{job.vehicle}</span>
//               <span className="text-sm font-semibold text-gray-900">{job.plate}</span>
//             </div>
//             <div className="flex items-center gap-3 mt-2">
//               <StatusBadge status={job.status} />
//               {job.startedAt && (
//                 <span className="text-sm text-gray-400">{getTimeAgo(job.startedAt)}</span>
//               )}
//               {job.eta && !job.startedAt && (
//                 <span className="text-sm text-gray-400">{job.eta}</span>
//               )}
//             </div>
//           </div>
//         </div>
//         <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//           </svg>
//         </button>
//       </div>

//       {/* Service Details */}
//       <div className="mt-4 pt-4 border-t border-gray-50">
//         {job.serviceType === 'workshop' ? (
//           <ProgressBar progress={{ serviceName: job.serviceName, value: job.progress }} />
//         ) : (
//           <LocationInfo serviceType={job.serviceType} location={job.location} />
//         )}
//       </div>

//       {/* Footer */}
//       <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
//         <div className="flex -space-x-2">
//           {job.mechanics?.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt="Mechanic"
//               className="w-8 h-8 rounded-full border-2 border-white object-cover"
//             />
//           ))}
//           {job.driverImage && (
//             <img
//               src={job.driverImage}
//               alt="Driver"
//               className="w-8 h-8 rounded-full border-2 border-white object-cover"
//             />
//           )}
//         </div>
//         <UpdateStatusDropdown currentStatus={job.status} onUpdate={(status) => onUpdateStatus(job.id, status)} />
//       </div>
//     </div>
//   );
// };

// // ─── Main Dashboard Page ───────────────────────────────────

// const OngoingServices = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [jobs, setJobs] = useState(INITIAL_JOBS);

//   const tabs = [
//     { id: 'all', label: 'All Jobs' },
//     { id: 'en-route', label: 'En Route' },
//     { id: 'in-progress', label: 'In Progress' },
//   ];

//   const filteredJobs = jobs.filter((job) => {
//     if (activeTab === 'all') return true;
//     return job.status === activeTab;
//   });

//   const handleUpdateStatus = async (jobId, newStatus) => {
//     setJobs((prev) =>
//       prev.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job))
//     );

//     // API integration ready
//     // const token = localStorage.getItem('token');
//     // await fetch(`/api/jobs/${jobId}/status`, {
//     //   method: 'PATCH',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`,
//     //   },
//     //   body: JSON.stringify({ status: newStatus }),
//     // });
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Topbar */}
//         <Topbar />

//         {/* Scrollable Content */}
//         <main className="flex-1 overflow-y-auto p-6 md:p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ongoing Services</h1>
//                 <p className="text-gray-500 mt-1">Real-time status of all active workshop repairs.</p>
//               </div>

//               {/* Tabs */}
//               <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       activeTab === tab.id
//                         ? 'bg-blue-600 text-white shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {filteredJobs.map((job) => (
//                 <JobCard key={job.id} job={job} onUpdateStatus={handleUpdateStatus} />
//               ))}
//             </div>

//             {filteredJobs.length === 0 && (
//               <div className="text-center py-20">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
//                 <p className="text-gray-500 mt-1">There are no {activeTab !== 'all' ? activeTab.replace('-', ' ') : 'active'} jobs at the moment.</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default OngoingServices;










import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";

// ─── Utility Components ────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    'IN_PROGRESS': 'bg-blue-50 text-blue-600 border-blue-100',
    'EN_ROUTE': 'bg-amber-50 text-amber-600 border-amber-100',
    'ACCEPTED': 'bg-purple-50 text-purple-600 border-purple-100',
    'COMPLETED': 'bg-green-50 text-green-600 border-green-100',
    'CANCELLED': 'bg-red-50 text-red-600 border-red-100',
    'PENDING': 'bg-gray-50 text-gray-600 border-gray-100',
  };

  const labels = {
    'IN_PROGRESS': 'IN PROGRESS',
    'EN_ROUTE': 'EN ROUTE',
    'ACCEPTED': 'ACCEPTED',
    'COMPLETED': 'COMPLETED',
    'CANCELLED': 'CANCELLED',
    'PENDING': 'PENDING',
  };

  const dotColors = {
    'IN_PROGRESS': 'bg-blue-500',
    'EN_ROUTE': 'bg-amber-500',
    'ACCEPTED': 'bg-purple-500',
    'COMPLETED': 'bg-green-500',
    'CANCELLED': 'bg-red-500',
    'PENDING': 'bg-gray-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['PENDING']}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors['PENDING']}`} />
      {labels[status] || labels['PENDING']}
    </span>
  );
};

const ProgressBar = ({ serviceName, progress }) => (
  <div className="mt-3">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm font-medium text-gray-700">{serviceName}</span>
      <span className="text-sm font-semibold text-blue-600">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const LocationInfo = ({ serviceType, location }) => {
  const icons = {
    pickup: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    towing: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

  return (
    <div className="mt-3 flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icons[serviceType]}</div>
      <div>
        <p className="text-sm font-medium text-gray-800">
          {serviceType === 'pickup' ? 'Pick-up Request' : 'Towing Service'}
        </p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

const UpdateStatusDropdown = ({ currentStatus, onUpdate, isUpdating }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = [
    { value: 'EN_ROUTE', label: 'En Route' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
  ];

  // Don't show options that are already the current status
  const availableOptions = statusOptions.filter(opt => opt.value !== currentStatus);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
      >
        {isUpdating ? 'Updating...' : 'Update Status'}
        {!isUpdating && (
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && availableOptions.length > 0 && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {availableOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onUpdate(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const JobCard = ({ job, onUpdateStatus, updatingJobId }) => {
  const isUpdating = updatingJobId === job.id;

  // Calculate progress based on status timestamps
  const getProgress = () => {
    if (job.status === 'COMPLETED') return 100;
    if (job.status === 'IN_PROGRESS') {
      // If startedAt exists, calculate pseudo-progress based on time elapsed
      if (job.startedAt) {
        const start = new Date(job.startedAt).getTime();
        const now = Date.now();
        const elapsed = now - start;
        // Assume avg job takes ~2 hours, cap at 95% until completed
        const progress = Math.min(95, Math.floor((elapsed / (2 * 60 * 60 * 1000)) * 100));
        return Math.max(20, progress);
      }
      return 45;
    }
    if (job.status === 'EN_ROUTE') return 10;
    if (job.status === 'ACCEPTED') return 5;
    return 0;
  };

  const getTimeDisplay = () => {
    if (job.startedAt) {
      const diff = Math.floor((Date.now() - new Date(job.startedAt).getTime()) / 1000 / 60);
      if (diff < 60) return `Started ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `Started ${hours}h ago`;
    }
    if (job.enRouteAt) {
      const diff = Math.floor((Date.now() - new Date(job.enRouteAt).getTime()) / 1000 / 60);
      if (diff < 60) return `En route ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `En route ${hours}h ago`;
    }
    if (job.acceptedAt) {
      const diff = Math.floor((Date.now() - new Date(job.acceptedAt).getTime()) / 1000 / 60);
      if (diff < 60) return `Accepted ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `Accepted ${hours}h ago`;
    }
    return null;
  };

  // Determine if this is a workshop job (has progress) or mobile service (has location)
  // For now, all API jobs are treated as workshop-style with progress
  const isWorkshop = !job.location;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {job.user?.firstName} {job.user?.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-gray-500">{job.title}</span>
              <span className="text-sm font-semibold text-gray-900">₦{job.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <StatusBadge status={job.status} />
              {getTimeDisplay() && (
                <span className="text-sm text-gray-400">{getTimeDisplay()}</span>
              )}
            </div>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Service Details */}
      <div className="mt-4 pt-4 border-t border-gray-50">
        {isWorkshop ? (
          <ProgressBar serviceName={job.title} progress={getProgress()} />
        ) : (
          <LocationInfo serviceType="pickup" location={job.location} />
        )}
        
        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 line-clamp-2">{job.description}</p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
            {job.provider?.firstName?.[0]}{job.provider?.lastName?.[0]}
          </div>
          <span className="text-sm text-gray-600">
            {job.provider?.firstName} {job.provider?.lastName}
          </span>
        </div>
        <UpdateStatusDropdown 
          currentStatus={job.status} 
          onUpdate={(status) => onUpdateStatus(job.id, status)} 
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
};

// ─── Main Dashboard Page ───────────────────────────────────

const OngoingServices = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Jobs' },
    { id: 'EN_ROUTE', label: 'En Route' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'ACCEPTED', label: 'Accepted' },
  ];

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/jobs');
      setJobs(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError(err.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'all') return true;
    return job.status === activeTab;
  });

  // Update job status via API
  const handleUpdateStatus = async (jobId, newStatus) => {
    setUpdatingJobId(jobId);
    
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
      
      // Update local state after successful API call
      setJobs((prev) =>
        prev.map((job) => 
          job.id === jobId 
            ? { 
                ...job, 
                status: newStatus,
                ...(newStatus === 'EN_ROUTE' && { enRouteAt: new Date().toISOString() }),
                ...(newStatus === 'IN_PROGRESS' && { startedAt: new Date().toISOString() }),
                ...(newStatus === 'COMPLETED' && { completedAt: new Date().toISOString(), isCompletedByProvider: true }),
              } 
            : job
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingJobId(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-2xl font-bold text-gray-900">Ongoing Services</h1>
                <p className="text-gray-500 mt-1">Real-time status of all active workshop repairs.</p>
              </div>

              {/* Tabs */}
              <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Error loading jobs</h3>
                <p className="text-gray-500 mt-1">{error}</p>
                <button 
                  onClick={fetchJobs}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Jobs Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onUpdateStatus={handleUpdateStatus}
                    updatingJobId={updatingJobId}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="text-gray-500 mt-1">
                  There are no {activeTab !== 'all' ? activeTab.replace('_', ' ') : 'active'} jobs at the moment.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OngoingServices;