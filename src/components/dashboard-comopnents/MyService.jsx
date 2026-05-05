






// import React, { useState, useEffect, useRef } from "react";
// import pic2 from '../../assets/images/pic2.png';
// import pic3 from '../../assets/images/pic3.png';
// import pic4 from '../../assets/images/pic4.png';
// import Background2 from '../../assets/images/Background2.png';
// import {
//   HiChatAlt2, HiLocationMarker, HiCheckCircle, HiClock, HiCalendar,
//   HiStar, HiDownload, HiRefresh, HiChevronDown, HiChevronUp, HiX,
//   HiPaperAirplane, HiPhone, HiExclamationCircle, HiShieldCheck,
//   HiCog, HiCheck
// } from "react-icons/hi";

// /* ══════════════════════════════════════════════════════════════════════════
//    DATA
// ══════════════════════════════════════════════════════════════════════════ */
// const activeServices = [
//   {
//     img: pic2, status: "IN PROGRESS", statusColor: "bg-yellow-100 text-yellow-700",
//     id: "#SRV-8821", title: "Full Engine Diagnostics & Tune-up",
//     car: "2021 Toyota Camry Hybrid • Silver", time: "Today, 4:30 PM", progress: 65,
//     mechanic: { name: "James Okafor", role: "Senior Mechanic", avatar: Background2, phone: "+234 801 234 5678", rating: 4.9 },
//     steps: [
//       { label: "Service Booked", done: true, time: "8:00 AM" },
//       { label: "Mechanic Assigned", done: true, time: "8:45 AM" },
//       { label: "Diagnostics Running", done: true, time: "10:00 AM" },
//       { label: "Parts Ordered", done: false, time: "~2:00 PM" },
//       { label: "Repair Complete", done: false, time: "~4:30 PM" },
//     ],
//     eta: "Today, 4:30 PM", location: "AutoFix Lagos, Lekki Phase 1",
//   },
//   {
//     img: pic3, status: "MECHANIC ASSIGNED", statusColor: "bg-blue-100 text-blue-700",
//     id: "#SRV-8820", title: "Brake Pad Replacement & Rotor Polish",
//     car: "2019 Tesla Model 3 • Deep Sea Blue", time: "Tomorrow, 9:00 AM", progress: 30,
//     mechanic: { name: "Emeka Adeyemi", role: "Brake Specialist", avatar: Background2, phone: "+234 802 345 6789", rating: 4.7 },
//     steps: [
//       { label: "Service Booked", done: true, time: "Yesterday 3:00 PM" },
//       { label: "Mechanic Assigned", done: true, time: "Yesterday 5:00 PM" },
//       { label: "Inspection Started", done: false, time: "~9:00 AM" },
//       { label: "Parts Ordered", done: false, time: "~11:00 AM" },
//       { label: "Repair Complete", done: false, time: "~1:00 PM" },
//     ],
//     eta: "Tomorrow, 1:00 PM", location: "AutoFix Lagos, Victoria Island",
//   },
//   {
//     img: pic4, status: "IN PROGRESS", statusColor: "bg-yellow-100 text-yellow-700",
//     id: "#SRV-8819", title: "Annual Safety Inspection & Emission Test",
//     car: "2023 Honda CR-V • Metallic Gray", time: "Today, 6:00 PM", progress: 80,
//     mechanic: { name: "Chukwudi Nwosu", role: "Inspection Expert", avatar: Background2, phone: "+234 803 456 7890", rating: 4.8 },
//     steps: [
//       { label: "Service Booked", done: true, time: "7:30 AM" },
//       { label: "Mechanic Assigned", done: true, time: "8:15 AM" },
//       { label: "Inspection Running", done: true, time: "9:00 AM" },
//       { label: "Emission Test", done: true, time: "11:30 AM" },
//       { label: "Report Pending", done: false, time: "~6:00 PM" },
//     ],
//     eta: "Today, 6:00 PM", location: "AutoFix Lagos, Ikeja",
//   },
// ];

// const scheduledServices = [
//   {
//     img: pic2, status: "SCHEDULED", statusColor: "bg-purple-100 text-purple-700",
//     id: "#SRV-8835", title: "Full Transmission Service & Fluid Change",
//     car: "2020 Ford F-150 • Magnetic Gray",
//     date: "Mon, 28 Apr 2025", time: "10:00 AM", duration: "~3 hrs",
//     location: "AutoFix Lagos, Lekki Phase 1",
//     mechanic: { name: "Tunde Balogun", role: "Transmission Specialist", avatar: Background2, phone: "+234 804 567 8901", rating: 4.6 },
//     price: "₦85,000", note: "Please arrive 10 min early. Bring vehicle registration.",
//   },
//   {
//     img: pic3, status: "CONFIRMED", statusColor: "bg-green-100 text-green-700",
//     id: "#SRV-8836", title: "AC System Recharge & Leak Check",
//     car: "2022 Lexus RX 350 • Pearl White",
//     date: "Wed, 30 Apr 2025", time: "2:00 PM", duration: "~1.5 hrs",
//     location: "AutoFix Lagos, Victoria Island",
//     mechanic: { name: "Sola Adewale", role: "AC & Cooling Expert", avatar: Background2, phone: "+234 805 678 9012", rating: 4.9 },
//     price: "₦40,000", note: "Your mechanic will contact you 1 hour before appointment.",
//   },
//   {
//     img: pic4, status: "PENDING PAYMENT", statusColor: "bg-orange-100 text-orange-700",
//     id: "#SRV-8837", title: "Wheel Alignment & Tyre Rotation",
//     car: "2018 Mercedes C300 • Obsidian Black",
//     date: "Fri, 2 May 2025", time: "9:30 AM", duration: "~1 hr",
//     location: "AutoFix Lagos, Ikeja",
//     mechanic: null, price: "₦25,000",
//     note: "Complete payment to confirm mechanic assignment.",
//   },
// ];

// const completedServices = [
//   {
//     img: pic2, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
//     id: "#SRV-8801", title: "Oil Change & Filter Replacement",
//     car: "2021 Toyota Camry Hybrid • Silver", completedDate: "Mon, 14 Apr 2025", duration: "45 min",
//     mechanic: { name: "James Okafor", role: "Senior Mechanic", avatar: Background2, phone: "+234 801 234 5678", rating: 4.9 },
//     price: "₦18,500", rating: 5, review: "James was super professional and fast. Highly recommend!",
//     parts: ["Synthetic Oil 5W-30 (5L)", "OEM Oil Filter", "Drain Plug Gasket"], invoice: "#INV-4421",
//   },
//   {
//     img: pic3, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
//     id: "#SRV-8788", title: "Battery Replacement & Electrical Check",
//     car: "2019 Tesla Model 3 • Deep Sea Blue", completedDate: "Thu, 10 Apr 2025", duration: "1.5 hrs",
//     mechanic: { name: "Emeka Adeyemi", role: "EV Specialist", avatar: Background2, phone: "+234 802 345 6789", rating: 4.7 },
//     price: "₦62,000", rating: 4, review: "Very thorough inspection. Caught a wiring issue I didn't know about.",
//     parts: ["AGM Battery 70Ah", "Terminal Connectors", "Wiring Harness Clip"], invoice: "#INV-4398",
//   },
//   {
//     img: pic4, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
//     id: "#SRV-8771", title: "Suspension Overhaul – Front & Rear",
//     car: "2023 Honda CR-V • Metallic Gray", completedDate: "Sat, 5 Apr 2025", duration: "4 hrs",
//     mechanic: { name: "Chukwudi Nwosu", role: "Suspension Expert", avatar: Background2, phone: "+234 803 456 7890", rating: 4.8 },
//     price: "₦145,000", rating: 5, review: "Car drives like new! Worth every naira.",
//     parts: ["Front Strut Assembly (x2)", "Rear Shock Absorbers (x2)", "Sway Bar Links", "Control Arm Bushings"],
//     invoice: "#INV-4370",
//   },
// ];

// /* ══════════════════════════════════════════════════════════════════════════
//    MODAL WRAPPER
// ══════════════════════════════════════════════════════════════════════════ */
// function Modal({ open, onClose, children }) {
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);
//   if (!open) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
//       style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
//       onClick={e => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
//         style={{ animation: "modalIn 0.32s cubic-bezier(0.34,1.4,0.64,1)" }}
//       >
//         {children}
//       </div>
//       <style>{`
//         @keyframes modalIn { from { opacity:0; transform:translateY(48px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
//         @keyframes fadeSlide { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes typingBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
//         @keyframes ripplePulse { 0%,100%{box-shadow:0 0 0 0 rgba(28,82,175,0.35)} 50%{box-shadow:0 0 0 9px rgba(28,82,175,0)} }
//       `}</style>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    MESSAGE MODAL
// ══════════════════════════════════════════════════════════════════════════ */
// const seedMessages = [
//   { from: "mechanic", text: "Hi! I've been assigned to your vehicle. Starting diagnostics shortly.", time: "10:02 AM" },
//   { from: "user", text: "Great, thanks! How long do you think it'll take?", time: "10:05 AM" },
//   { from: "mechanic", text: "Based on my initial check — about 2–3 hours. I'll keep you updated!", time: "10:07 AM" },
//   { from: "mechanic", text: "Found a minor coolant leak. Fixing it as part of the service at no extra charge.", time: "11:30 AM" },
//   { from: "user", text: "Wow, thank you so much for catching that!", time: "11:33 AM" },
// ];

// const mechReplies = [
//   "Got it! I'll take care of that.",
//   "Sure, no problem at all.",
//   "I'll update you as soon as I have more info.",
//   "Almost done — should be wrapped up soon!",
//   "Thanks for your patience, you're in good hands!",
//   "On it right now! Give me a few minutes.",
// ];

// function MessageModal({ open, onClose, service }) {
//   const [messages, setMessages] = useState(seedMessages);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   const send = () => {
//     const txt = input.trim();
//     if (!txt) return;
//     const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     setMessages(m => [...m, { from: "user", text: txt, time: now }]);
//     setInput("");
//     setTyping(true);
//     setTimeout(() => {
//       setTyping(false);
//       const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//       setMessages(m => [...m, { from: "mechanic", text: mechReplies[Math.floor(Math.random() * mechReplies.length)], time: replyTime }]);
//     }, 1600 + Math.random() * 800);
//   };

//   if (!service) return null;
//   return (
//     <Modal open={open} onClose={onClose}>
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
//         <div className="relative">
//           <img src={service.mechanic?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
//           <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-semibold text-gray-800">{service.mechanic?.name}</p>
//           <p className="text-xs text-gray-400">{service.mechanic?.role} · Online</p>
//         </div>
//         <a href={`tel:${service.mechanic?.phone}`} className="p-2 rounded-full bg-blue-50 text-[#1C52AF] hover:bg-blue-100 transition-colors">
//           <HiPhone size={17} />
//         </a>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
//           <HiX size={18} />
//         </button>
//       </div>

//       {/* Service chip */}
//       <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
//         <HiWrench size={13} className="text-[#1C52AF]" />
//         <p className="text-xs text-[#1C52AF] font-medium truncate">{service.title} · {service.id}</p>
//       </div>

//       {/* Messages */}
//       <div className="px-4 py-3 flex flex-col gap-3 overflow-y-auto" style={{ minHeight: 280, maxHeight: 340 }}>
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
//             style={{ animation: `fadeSlide 0.25s ease ${i < seedMessages.length ? "0s" : "0s"} both` }}>
//             {msg.from === "mechanic" && (
//               <img src={service.mechanic?.avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0" />
//             )}
//             <div className={`max-w-[72%] flex flex-col gap-0.5 ${msg.from === "user" ? "items-end" : "items-start"}`}>
//               <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
//                 msg.from === "user" ? "bg-[#1C52AF] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"
//               }`}>
//                 {msg.text}
//               </div>
//               <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
//             </div>
//           </div>
//         ))}
//         {typing && (
//           <div className="flex justify-start items-center gap-2">
//             <img src={service.mechanic?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
//             <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
//               {[0, 1, 2].map(i => (
//                 <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 block"
//                   style={{ animation: `typingBounce 1s ease infinite ${i * 0.16}s` }} />
//               ))}
//             </div>
//           </div>
//         )}
//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-center bg-gray-50">
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && send()}
//           placeholder="Type a message…"
//           className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors"
//         />
//         <button onClick={send} disabled={!input.trim()}
//           className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1C52AF] text-white disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-90">
//           <HiPaperAirplane size={16} className="rotate-90" />
//         </button>
//       </div>
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    TRACK MODAL
// ══════════════════════════════════════════════════════════════════════════ */
// function TrackModal({ open, onClose, service }) {
//   if (!service) return null;
//   const activeStepIdx = service.steps.filter(s => s.done).length - 1;

//   return (
//     <Modal open={open} onClose={onClose}>
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//         <div>
//           <p className="font-semibold text-gray-800 text-sm">Live Tracking</p>
//           <p className="text-xs text-gray-400">{service.id} · {service.car}</p>
//         </div>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
//           <HiX size={18} />
//         </button>
//       </div>

//       <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
//         {/* Location */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-blue-100">
//           <div className="w-10 h-10 rounded-full bg-[#1C52AF] flex items-center justify-center shrink-0">
//             <HiLocationMarker size={20} className="text-white" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Service Location</p>
//             <p className="text-sm font-semibold text-gray-800">{service.location}</p>
//           </div>
//         </div>

//         {/* Stats row */}
//         <div className="grid grid-cols-3 gap-2">
//           {[
//             { label: "ETA", value: service.eta, icon: <HiClock size={14} className="text-[#1C52AF]" /> },
//             { label: "Progress", value: `${service.progress}%`, icon: <HiWrench size={14} className="text-[#1C52AF]" /> },
//             { label: "Rating", value: `⭐ ${service.mechanic.rating}`, icon: <HiShieldCheck size={14} className="text-[#1C52AF]" /> },
//           ].map((item, i) => (
//             <div key={i} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
//               <div className="flex justify-center mb-1">{item.icon}</div>
//               <p className="text-[10px] text-gray-400">{item.label}</p>
//               <p className="text-xs font-bold text-gray-800">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Vertical timeline */}
//         <div className="flex flex-col">
//           {service.steps.map((step, i) => {
//             const isDone = step.done;
//             const isActive = i === activeStepIdx + 1 && !isDone;
//             const isLast = i === service.steps.length - 1;
//             return (
//               <div key={i} className="flex gap-3">
//                 <div className="flex flex-col items-center" style={{ width: 28 }}>
//                   <div
//                     className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
//                       isDone ? "bg-[#1C52AF] text-white" : isActive ? "bg-white border-2 border-[#1C52AF] text-[#1C52AF]" : "bg-gray-100 border-2 border-gray-200 text-gray-300"
//                     }`}
//                     style={isActive ? { animation: "ripplePulse 2s ease infinite" } : {}}
//                   >
//                     {isDone ? <HiCheck size={13} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
//                   </div>
//                   {!isLast && (
//                     <div className={`w-0.5 mt-1 mb-1 flex-1 rounded-full transition-all duration-700 ${isDone ? "bg-[#1C52AF]" : "bg-gray-200"}`}
//                       style={{ minHeight: 24 }} />
//                   )}
//                 </div>
//                 <div className={`flex-1 flex justify-between items-start pb-4 ${isLast ? "pb-0" : ""}`}>
//                   <div>
//                     <p className={`text-sm font-medium ${isDone ? "text-gray-800" : isActive ? "text-[#1C52AF]" : "text-gray-400"}`}>
//                       {step.label}
//                     </p>
//                     {isDone && <p className="text-xs text-[#1C52AF] mt-0.5 font-medium">{step.time} · Done</p>}
//                     {isActive && (
//                       <p className="text-xs text-blue-500 mt-0.5 font-medium flex items-center gap-1">
//                         <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" style={{ animation: "typingBounce 1.2s ease infinite" }} />
//                         In progress…
//                       </p>
//                     )}
//                     {!isDone && !isActive && <p className="text-xs text-gray-400 mt-0.5">Est. {step.time}</p>}
//                   </div>
//                   {isDone && <HiCheckCircle size={16} className="text-[#1C52AF] mt-1 shrink-0" />}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Mechanic row */}
//         <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <img src={service.mechanic.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
//             <div>
//               <p className="text-xs text-gray-400">{service.mechanic.role}</p>
//               <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
//             </div>
//           </div>
//           <a href={`tel:${service.mechanic.phone}`}
//             className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
//             <HiPhone size={14} /> Call Mechanic
//           </a>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    RESCHEDULE MODAL
// ══════════════════════════════════════════════════════════════════════════ */
// const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

// function RescheduleModal({ open, onClose, service }) {
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const days = Array.from({ length: 14 }, (_, i) => {
//     const d = new Date(today);
//     d.setDate(today.getDate() + i + 1);
//     return d;
//   });

//   const handleClose = () => { setSuccess(false); setSelectedDate(null); setSelectedTime(null); onClose(); };

//   const confirm = () => {
//     if (!selectedDate || !selectedTime) return;
//     setSuccess(true);
//     setTimeout(() => handleClose(), 2400);
//   };

//   if (!service) return null;
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//         <div>
//           <p className="font-semibold text-gray-800 text-sm">Reschedule Appointment</p>
//           <p className="text-xs text-gray-400">{service.id}</p>
//         </div>
//         <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
//           <HiX size={18} />
//         </button>
//       </div>

//       {success ? (
//         <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
//           style={{ animation: "fadeSlide 0.3s ease" }}>
//           <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
//             <HiCheckCircle size={36} className="text-green-500" />
//           </div>
//           <p className="text-base font-semibold text-gray-800">Appointment Rescheduled!</p>
//           <p className="text-sm text-gray-500 text-center">
//             {selectedDate?.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
//           </p>
//           <p className="text-xs text-gray-400">You'll receive a confirmation shortly.</p>
//         </div>
//       ) : (
//         <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
//           {/* Current booking */}
//           <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 flex items-start gap-2">
//             <HiClock size={15} className="text-orange-500 mt-0.5 shrink-0" />
//             <div>
//               <p className="text-xs text-orange-700 font-semibold">Current Appointment</p>
//               <p className="text-xs text-orange-600">{service.date} at {service.time} · {service.location}</p>
//             </div>
//           </div>

//           {/* Date picker */}
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Select New Date</p>
//             <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
//               {days.map((d, i) => {
//                 const isSel = selectedDate?.toDateString() === d.toDateString();
//                 return (
//                   <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
//                     className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border font-medium transition-all ${
//                       isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md scale-105" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
//                     }`}>
//                     <span className="text-[10px] uppercase opacity-80">{d.toLocaleDateString("en", { weekday: "short" })}</span>
//                     <span className="text-lg font-bold mt-0.5 leading-none">{d.getDate()}</span>
//                     <span className="text-[10px] mt-0.5 opacity-80">{d.toLocaleDateString("en", { month: "short" })}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Time picker */}
//           {selectedDate && (
//             <div style={{ animation: "fadeSlide 0.25s ease" }}>
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Available Time Slots</p>
//               <div className="grid grid-cols-3 gap-2">
//                 {timeSlots.map(t => {
//                   const isSel = selectedTime === t;
//                   return (
//                     <button key={t} onClick={() => setSelectedTime(t)}
//                       className={`py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
//                         isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
//                       }`}>
//                       {t}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Summary */}
//           {selectedDate && selectedTime && (
//             <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 flex items-center gap-2"
//               style={{ animation: "fadeSlide 0.2s ease" }}>
//               <HiCalendar size={15} className="text-[#1C52AF] shrink-0" />
//               <p className="text-xs text-[#1C52AF] font-medium">
//                 New appointment: {selectedDate.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
//               </p>
//             </div>
//           )}

//           <button onClick={confirm} disabled={!selectedDate || !selectedTime}
//             className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95">
//             {selectedDate && selectedTime ? "Confirm Reschedule" : "Select a date and time to continue"}
//           </button>
//         </div>
//       )}
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    CANCEL MODAL
// ══════════════════════════════════════════════════════════════════════════ */
// const cancelReasons = [
//   "Change of plans",
//   "Found a better price elsewhere",
//   "Vehicle issue resolved on its own",
//   "Scheduling conflict",
//   "Mechanic not responding",
//   "Other reason",
// ];

// function CancelModal({ open, onClose, service, onConfirmCancel }) {
//   const [reason, setReason] = useState("");
//   const [custom, setCustom] = useState("");
//   const [step, setStep] = useState("reason"); // "reason" | "confirm" | "done"

//   const reset = () => { setReason(""); setCustom(""); setStep("reason"); };
//   const close = () => { reset(); onClose(); };
//   const doCancel = () => {
//     setStep("done");
//     setTimeout(() => { onConfirmCancel?.(service?.id); reset(); onClose(); }, 2400);
//   };

//   if (!service) return null;
//   return (
//     <Modal open={open} onClose={close}>
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//         <p className="font-semibold text-gray-800 text-sm">Cancel Booking</p>
//         <button onClick={close} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
//           <HiX size={18} />
//         </button>
//       </div>

//       {step === "done" ? (
//         <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
//           style={{ animation: "fadeSlide 0.3s ease" }}>
//           <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
//             <HiCheckCircle size={36} className="text-red-400" />
//           </div>
//           <p className="text-base font-semibold text-gray-800">Booking Cancelled</p>
//           <p className="text-sm text-gray-500 text-center">{service.id} has been cancelled.<br />A refund will be processed within 3–5 business days.</p>
//         </div>

//       ) : step === "confirm" ? (
//         <div className="px-4 py-4 flex flex-col gap-4" style={{ animation: "fadeSlide 0.25s ease" }}>
//           <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
//             <HiExclamationCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
//             <div>
//               <p className="text-sm font-semibold text-red-700">Are you sure you want to cancel?</p>
//               <p className="text-xs text-red-400 mt-1">This cannot be undone. A cancellation fee may apply if within 24 hrs.</p>
//             </div>
//           </div>

//           <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-0.5">
//             <p className="text-xs text-gray-400">Booking</p>
//             <p className="text-sm font-semibold text-gray-800">{service.title}</p>
//             <p className="text-xs text-gray-500">{service.car} · {service.date} at {service.time}</p>
//           </div>

//           <div className="bg-gray-50 rounded-xl px-4 py-3">
//             <p className="text-xs text-gray-400 mb-0.5">Cancellation reason</p>
//             <p className="text-sm text-gray-700">{reason === "Other reason" ? (custom || "Other") : reason}</p>
//           </div>

//           <div className="flex gap-2 mt-1">
//             <button onClick={() => setStep("reason")}
//               className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
//               Go Back
//             </button>
//             <button onClick={doCancel}
//               className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all">
//               Yes, Cancel Booking
//             </button>
//           </div>
//         </div>

//       ) : (
//         <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "70vh" }}>
//           <p className="text-sm text-gray-500">Help us improve by telling us why you're cancelling.</p>
//           <div className="flex flex-col gap-2">
//             {cancelReasons.map(r => (
//               <button key={r} onClick={() => setReason(r)}
//                 className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${
//                   reason === r ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
//                 }`}>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${reason === r ? "border-[#1C52AF]" : "border-gray-300"}`}>
//                   {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
//                 </div>
//                 {r}
//               </button>
//             ))}
//           </div>

//           {reason === "Other reason" && (
//             <textarea value={custom} onChange={e => setCustom(e.target.value)} rows={3}
//               placeholder="Please describe your reason…"
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] resize-none transition-colors"
//               style={{ animation: "fadeSlide 0.2s ease" }} />
//           )}

//           <button
//             onClick={() => setStep("confirm")}
//             disabled={!reason || (reason === "Other reason" && !custom.trim())}
//             className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-95 transition-all mt-1">
//             Continue to Confirm
//           </button>
//         </div>
//       )}
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    SHARED CARD UTILITIES
// ══════════════════════════════════════════════════════════════════════════ */
// function AnimatedCard({ children, index }) {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), index * 120);
//     return () => clearTimeout(t);
//   }, [index]);
//   return (
//     <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}>
//       {children}
//     </div>
//   );
// }

// function ProgressBar({ value }) {
//   const [width, setWidth] = useState(0);
//   useEffect(() => { const t = setTimeout(() => setWidth(value), 350); return () => clearTimeout(t); }, [value]);
//   return (
//     <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//       <div className="h-2 rounded-full bg-[#1C52AF]" style={{ width: `${width}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
//     </div>
//   );
// }

// function StepTracker({ steps }) {
//   return (
//     <div className="flex items-center gap-1 flex-wrap mt-1">
//       {steps.map((s, i) => (
//         <React.Fragment key={i}>
//           <div className="flex items-center gap-1">
//             <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${s.done ? "bg-[#1C52AF] text-white" : "bg-gray-200 text-gray-400"}`}>
//               {s.done ? "✓" : i + 1}
//             </div>
//             <span className={`text-[10px] ${s.done ? "text-[#1C52AF] font-medium" : "text-gray-400"}`}>{s.label}</span>
//           </div>
//           {i < steps.length - 1 && <div className={`flex-1 min-w-[8px] h-[2px] rounded ${s.done && steps[i + 1]?.done ? "bg-[#1C52AF]" : "bg-gray-200"}`} />}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// function StarRating({ rating }) {
//   return (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map(n => <HiStar key={n} size={14} className={n <= rating ? "text-yellow-400" : "text-gray-200"} />)}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    ACTIVE CARD
// ══════════════════════════════════════════════════════════════════════════ */
// function ActiveCard({ service, index, onMessage, onTrack }) {
//   return (
//     <AnimatedCard index={index}>
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//         <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
//         <div className="flex justify-between items-center flex-wrap gap-2">
//           <div className="flex gap-2 items-center flex-wrap">
//             <span className={`px-2 py-1 rounded text-xs font-semibold ${service.statusColor}`}>{service.status}</span>
//             <span className="text-sm font-medium text-gray-500">{service.id}</span>
//           </div>
//           <span className="text-xs text-gray-400">Estimated Completion</span>
//         </div>
//         <div className="flex justify-between items-start flex-wrap gap-2">
//           <div className="flex-1 min-w-[180px]">
//             <p className="font-semibold text-gray-800">{service.title}</p>
//             <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
//           </div>
//           <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
//             <HiClock size={14} className="text-[#1C52AF]" />{service.time}
//           </p>
//         </div>
//         <div>
//           <div className="flex justify-between text-xs text-gray-500 mb-1.5">
//             <span>Service Progress</span>
//             <span className="font-semibold text-[#1C52AF]">{service.progress}%</span>
//           </div>
//           <ProgressBar value={service.progress} />
//         </div>
//         <StepTracker steps={service.steps} />
//         <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-3">
//           <div className="flex items-center gap-2">
//             <img src={service.mechanic.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
//             <div>
//               <p className="text-xs text-gray-400">{service.mechanic.role}</p>
//               <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
            
//             <button onClick={() => onMessage(service)}
//               className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
//               <HiChatAlt2 size={15} /> Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </AnimatedCard>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    SCHEDULED CARD
// ══════════════════════════════════════════════════════════════════════════ */
// function ScheduledCard({ service, index, onMessage, onReschedule, onCancel }) {
//   return (
//     <AnimatedCard index={index}>
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//         <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
//         <div className="flex justify-between items-center flex-wrap gap-2">
//           <div className="flex gap-2 items-center flex-wrap">
//             <span className={`px-2 py-1 rounded text-xs font-semibold ${service.statusColor}`}>{service.status}</span>
//             <span className="text-sm font-medium text-gray-500">{service.id}</span>
//           </div>
//           <span className="text-sm font-bold text-[#1C52AF]">{service.price}</span>
//         </div>
//         <div>
//           <p className="font-semibold text-gray-800">{service.title}</p>
//           <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           {[
//             { icon: <HiCalendar size={14} />, label: "Date", value: service.date },
//             { icon: <HiClock size={14} />, label: "Time", value: service.time },
//             { icon: <HiRefresh size={14} />, label: "Duration", value: service.duration },
//           ].map((item, i) => (
//             <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
//               <div className="flex justify-center text-[#1C52AF] mb-0.5">{item.icon}</div>
//               <p className="text-[10px] text-gray-400">{item.label}</p>
//               <p className="text-xs font-semibold text-gray-700">{item.value}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2">
//           <HiLocationMarker size={16} className="text-[#1C52AF] mt-0.5 shrink-0" />
//           <p className="text-xs text-gray-600">{service.location}</p>
//         </div>
//         {service.mechanic ? (
//           <div className="flex items-center gap-2">
//             <img src={service.mechanic.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
//             <div>
//               <p className="text-xs text-gray-400">{service.mechanic.role}</p>
//               <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
//             <HiClock size={15} className="text-orange-500 shrink-0" />
//             <p className="text-xs text-orange-600 font-medium">Mechanic will be assigned after payment.</p>
//           </div>
//         )}
//         <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 border-l-4 border-[#1C52AF]">
//           📌 {service.note}
//         </div>
//         <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-2">
//           <button onClick={() => onCancel(service)}
//             className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all">
//             Cancel Booking
//           </button>
//           <div className="flex gap-2">
//             {service.mechanic && (
//               <button onClick={() => onMessage(service)}
//                 className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 active:scale-95 transition-all">
//                 <HiChatAlt2 size={14} /> Message
//               </button>
//             )}
//             {service.status === "PENDING PAYMENT" ? (
//               <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 active:scale-95 transition-all">
//                 Pay Now
//               </button>
//             ) : (
//               <button onClick={() => onReschedule(service)}
//                 className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
//                 <HiCalendar size={14} /> Reschedule
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </AnimatedCard>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    COMPLETED CARD
// ══════════════════════════════════════════════════════════════════════════ */
// function CompletedCard({ service, index, onMessage }) {
//   const [expanded, setExpanded] = useState(false);
//   return (
//     <AnimatedCard index={index}>
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//         <div className="relative">
//           <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
//           <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
//             <HiCheckCircle size={13} /> COMPLETED
//           </div>
//         </div>
//         <div className="flex justify-between items-center flex-wrap gap-2">
//           <div className="flex gap-2 items-center">
//             <span className="text-sm font-medium text-gray-500">{service.id}</span>
//             <span className="text-xs text-gray-400">•</span>
//             <span className="text-xs text-gray-400">{service.invoice}</span>
//           </div>
//           <span className="text-sm font-bold text-green-600">{service.price}</span>
//         </div>
//         <div>
//           <p className="font-semibold text-gray-800">{service.title}</p>
//           <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
//         </div>
//         <div className="flex gap-3 flex-wrap">
//           <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
//             <HiCalendar size={13} className="text-[#1C52AF]" />{service.completedDate}
//           </div>
//           <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
//             <HiClock size={13} className="text-[#1C52AF]" />Duration: {service.duration}
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <img src={service.mechanic.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-green-400/40" />
//           <div>
//             <p className="text-xs text-gray-400">{service.mechanic.role}</p>
//             <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
//           </div>
//         </div>
//         <div className="bg-yellow-50 rounded-lg px-3 py-2.5">
//           <div className="flex items-center gap-2 mb-1">
//             <StarRating rating={service.rating} />
//             <span className="text-xs font-semibold text-gray-600">{service.rating}.0 / 5</span>
//           </div>
//           <p className="text-xs text-gray-500 italic">"{service.review}"</p>
//         </div>
//         <button onClick={() => setExpanded(e => !e)}
//           className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
//           <span>Parts & Materials ({service.parts.length})</span>
//           {expanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
//         </button>
//         <div style={{ maxHeight: expanded ? `${service.parts.length * 42}px` : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
//           <ul className="flex flex-col gap-1.5 px-1">
//             {service.parts.map((part, i) => (
//               <li key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1C52AF] shrink-0" />{part}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-2">
//           <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
//             <HiDownload size={14} /> Invoice
//           </button>
//           <div className="flex gap-2">
//             <button onClick={() => onMessage(service)}
//               className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 active:scale-95 transition-all">
//               <HiChatAlt2 size={14} /> Message
//             </button>
//             <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
//               <HiRefresh size={14} /> Rebook
//             </button>
//           </div>
//         </div>
//       </div>
//     </AnimatedCard>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════ */
// const tabMeta = {
//   active: { color: "bg-yellow-100 text-yellow-700" },
//   scheduled: { color: "bg-purple-100 text-purple-700" },
//   completed: { color: "bg-green-100 text-green-700" },
// };

// const MyService = () => {
//   const [activeTab, setActiveTab] = useState("active");
//   const [animating, setAnimating] = useState(false);
//   const [cancelledIds, setCancelledIds] = useState([]);

//   const [messageModal, setMessageModal] = useState({ open: false, service: null });
//   const [trackModal, setTrackModal] = useState({ open: false, service: null });
//   const [rescheduleModal, setRescheduleModal] = useState({ open: false, service: null });
//   const [cancelModal, setCancelModal] = useState({ open: false, service: null });

//   const switchTab = (tab) => {
//     if (tab === activeTab) return;
//     setAnimating(true);
//     setTimeout(() => { setActiveTab(tab); setAnimating(false); }, 200);
//   };

//   const visibleScheduled = scheduledServices.filter(s => !cancelledIds.includes(s.id));

//   const tabDescriptions = {
//     active: "Real-time tracking of your ongoing vehicle maintenance and repairs.",
//     scheduled: "Upcoming appointments and confirmed bookings.",
//     completed: "Past services, invoices, and history.",
//   };

//   const counts = {
//     active: activeServices.length,
//     scheduled: visibleScheduled.length,
//     completed: completedServices.length,
//   };

//   return (
//     <div className="p-4 flex flex-col gap-4 w-full">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
//         <div>
//           <h1 className="text-xl font-semibold">
//             {activeTab === "active" ? "Active Services" : activeTab === "scheduled" ? "Scheduled Services" : "Completed Services"}
//           </h1>
//           <p className="text-sm text-gray-500 mt-0.5">{tabDescriptions[activeTab]}</p>
//         </div>
//         <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl w-full md:w-fit">
//           {["active", "scheduled", "completed"].map(tab => (
//             <button key={tab} onClick={() => switchTab(tab)}
//               className={`flex-1 md:flex-none px-3 py-1.5 text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 ${
//                 activeTab === tab ? "bg-white shadow text-black font-medium" : "text-gray-500 hover:text-gray-700"
//               }`}>
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tabMeta[tab].color}`}>
//                 {counts[tab]}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Cards */}
//       <div
//         className="flex flex-col gap-4"
//         style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", transition: "opacity 0.2s ease, transform 0.2s ease" }}
//       >
//         {activeTab === "active" && activeServices.map((s, i) => (
//           <ActiveCard key={s.id} service={s} index={i}
//             onMessage={svc => setMessageModal({ open: true, service: svc })}
//             onTrack={svc => setTrackModal({ open: true, service: svc })} />
//         ))}
//         {activeTab === "scheduled" && visibleScheduled.map((s, i) => (
//           <ScheduledCard key={s.id} service={s} index={i}
//             onMessage={svc => setMessageModal({ open: true, service: svc })}
//             onReschedule={svc => setRescheduleModal({ open: true, service: svc })}
//             onCancel={svc => setCancelModal({ open: true, service: svc })} />
//         ))}
//         {activeTab === "completed" && completedServices.map((s, i) => (
//           <CompletedCard key={s.id} service={s} index={i}
//             onMessage={svc => setMessageModal({ open: true, service: svc })} />
//         ))}
//       </div>

//       {/* Modals */}
//       <MessageModal open={messageModal.open} service={messageModal.service}
//         onClose={() => setMessageModal({ open: false, service: null })} />
//       <TrackModal open={trackModal.open} service={trackModal.service}
//         onClose={() => setTrackModal({ open: false, service: null })} />
//       <RescheduleModal open={rescheduleModal.open} service={rescheduleModal.service}
//         onClose={() => setRescheduleModal({ open: false, service: null })} />
//       <CancelModal open={cancelModal.open} service={cancelModal.service}
//         onClose={() => setCancelModal({ open: false, service: null })}
//         onConfirmCancel={id => setCancelledIds(prev => [...prev, id])} />
//     </div>
//   );
// };

// export default MyService;







import React, { useState, useEffect, useRef } from "react";
import pic2 from '../../assets/images/pic2.png';
import pic3 from '../../assets/images/pic3.png';
import pic4 from '../../assets/images/pic4.png';
import Background2 from '../../assets/images/Background2.png';
import {
  HiChatAlt2, HiLocationMarker, HiCheckCircle, HiClock, HiCalendar,
  HiStar, HiDownload, HiRefresh, HiChevronDown, HiChevronUp, HiX,
  HiPaperAirplane, HiPhone, HiExclamationCircle, HiShieldCheck,
  HiCog, HiCheck,          // ← FIX 1: HiWrench was missing
} from "react-icons/hi";

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */
const initialActiveServices = [
  {
    img: pic2, status: "IN PROGRESS", statusColor: "bg-yellow-100 text-yellow-700",
    id: "#SRV-8821", title: "Full Engine Diagnostics & Tune-up",
    car: "2021 Toyota Camry Hybrid • Silver", time: "Today, 4:30 PM", progress: 65,
    mechanic: { name: "James Okafor", role: "Senior Mechanic", avatar: Background2, phone: "+234 801 234 5678", rating: 4.9 },
    steps: [
      { label: "Service Booked", done: true, time: "8:00 AM" },
      { label: "Mechanic Assigned", done: true, time: "8:45 AM" },
      { label: "Diagnostics Running", done: true, time: "10:00 AM" },
      { label: "Parts Ordered", done: false, time: "~2:00 PM" },
      { label: "Repair Complete", done: false, time: "~4:30 PM" },
    ],
    eta: "Today, 4:30 PM", location: "AutoFix Lagos, Lekki Phase 1",
  },
  {
    img: pic3, status: "MECHANIC ASSIGNED", statusColor: "bg-blue-100 text-blue-700",
    id: "#SRV-8820", title: "Brake Pad Replacement & Rotor Polish",
    car: "2019 Tesla Model 3 • Deep Sea Blue", time: "Tomorrow, 9:00 AM", progress: 30,
    mechanic: { name: "Emeka Adeyemi", role: "Brake Specialist", avatar: Background2, phone: "+234 802 345 6789", rating: 4.7 },
    steps: [
      { label: "Service Booked", done: true, time: "Yesterday 3:00 PM" },
      { label: "Mechanic Assigned", done: true, time: "Yesterday 5:00 PM" },
      { label: "Inspection Started", done: false, time: "~9:00 AM" },
      { label: "Parts Ordered", done: false, time: "~11:00 AM" },
      { label: "Repair Complete", done: false, time: "~1:00 PM" },
    ],
    eta: "Tomorrow, 1:00 PM", location: "AutoFix Lagos, Victoria Island",
  },
  {
    img: pic4, status: "IN PROGRESS", statusColor: "bg-yellow-100 text-yellow-700",
    id: "#SRV-8819", title: "Annual Safety Inspection & Emission Test",
    car: "2023 Honda CR-V • Metallic Gray", time: "Today, 6:00 PM", progress: 80,
    mechanic: { name: "Chukwudi Nwosu", role: "Inspection Expert", avatar: Background2, phone: "+234 803 456 7890", rating: 4.8 },
    steps: [
      { label: "Service Booked", done: true, time: "7:30 AM" },
      { label: "Mechanic Assigned", done: true, time: "8:15 AM" },
      { label: "Inspection Running", done: true, time: "9:00 AM" },
      { label: "Emission Test", done: true, time: "11:30 AM" },
      { label: "Report Pending", done: false, time: "~6:00 PM" },
    ],
    eta: "Today, 6:00 PM", location: "AutoFix Lagos, Ikeja",
  },
];

// FIX 2: moved to state in MyService so reschedule can update it
const initialScheduledServices = [
  {
    img: pic2, status: "SCHEDULED", statusColor: "bg-purple-100 text-purple-700",
    id: "#SRV-8835", title: "Full Transmission Service & Fluid Change",
    car: "2020 Ford F-150 • Magnetic Gray",
    date: "Mon, 28 Apr 2025", time: "10:00 AM", duration: "~3 hrs",
    location: "AutoFix Lagos, Lekki Phase 1",
    mechanic: { name: "Tunde Balogun", role: "Transmission Specialist", avatar: Background2, phone: "+234 804 567 8901", rating: 4.6 },
    price: "₦85,000", note: "Please arrive 10 min early. Bring vehicle registration.",
  },
  {
    img: pic3, status: "CONFIRMED", statusColor: "bg-green-100 text-green-700",
    id: "#SRV-8836", title: "AC System Recharge & Leak Check",
    car: "2022 Lexus RX 350 • Pearl White",
    date: "Wed, 30 Apr 2025", time: "2:00 PM", duration: "~1.5 hrs",
    location: "AutoFix Lagos, Victoria Island",
    mechanic: { name: "Sola Adewale", role: "AC & Cooling Expert", avatar: Background2, phone: "+234 805 678 9012", rating: 4.9 },
    price: "₦40,000", note: "Your mechanic will contact you 1 hour before appointment.",
  },
  {
    img: pic4, status: "PENDING PAYMENT", statusColor: "bg-orange-100 text-orange-700",
    id: "#SRV-8837", title: "Wheel Alignment & Tyre Rotation",
    car: "2018 Mercedes C300 • Obsidian Black",
    date: "Fri, 2 May 2025", time: "9:30 AM", duration: "~1 hr",
    location: "AutoFix Lagos, Ikeja",
    mechanic: null, price: "₦25,000",
    note: "Complete payment to confirm mechanic assignment.",
  },
];

const completedServices = [
  {
    img: pic2, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
    id: "#SRV-8801", title: "Oil Change & Filter Replacement",
    car: "2021 Toyota Camry Hybrid • Silver", completedDate: "Mon, 14 Apr 2025", duration: "45 min",
    mechanic: { name: "James Okafor", role: "Senior Mechanic", avatar: Background2, phone: "+234 801 234 5678", rating: 4.9 },
    price: "₦18,500", rating: 5, review: "James was super professional and fast. Highly recommend!",
    parts: ["Synthetic Oil 5W-30 (5L)", "OEM Oil Filter", "Drain Plug Gasket"], invoice: "#INV-4421",
  },
  {
    img: pic3, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
    id: "#SRV-8788", title: "Battery Replacement & Electrical Check",
    car: "2019 Tesla Model 3 • Deep Sea Blue", completedDate: "Thu, 10 Apr 2025", duration: "1.5 hrs",
    mechanic: { name: "Emeka Adeyemi", role: "EV Specialist", avatar: Background2, phone: "+234 802 345 6789", rating: 4.7 },
    price: "₦62,000", rating: 4, review: "Very thorough inspection. Caught a wiring issue I didn't know about.",
    parts: ["AGM Battery 70Ah", "Terminal Connectors", "Wiring Harness Clip"], invoice: "#INV-4398",
  },
  {
    img: pic4, status: "COMPLETED", statusColor: "bg-green-100 text-green-700",
    id: "#SRV-8771", title: "Suspension Overhaul – Front & Rear",
    car: "2023 Honda CR-V • Metallic Gray", completedDate: "Sat, 5 Apr 2025", duration: "4 hrs",
    mechanic: { name: "Chukwudi Nwosu", role: "Suspension Expert", avatar: Background2, phone: "+234 803 456 7890", rating: 4.8 },
    price: "₦145,000", rating: 5, review: "Car drives like new! Worth every naira.",
    parts: ["Front Strut Assembly (x2)", "Rear Shock Absorbers (x2)", "Sway Bar Links", "Control Arm Bushings"],
    invoice: "#INV-4370",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   MODAL WRAPPER
══════════════════════════════════════════════════════════════════════════ */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.32s cubic-bezier(0.34,1.4,0.64,1)" }}
      >
        {children}
      </div>
      <style>{`
        @keyframes modalIn { from { opacity:0; transform:translateY(48px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes typingBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes ripplePulse { 0%,100%{box-shadow:0 0 0 0 rgba(28,82,175,0.35)} 50%{box-shadow:0 0 0 9px rgba(28,82,175,0)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MESSAGE MODAL
══════════════════════════════════════════════════════════════════════════ */
const seedMessages = [
  { from: "mechanic", text: "Hi! I've been assigned to your vehicle. Starting diagnostics shortly.", time: "10:02 AM" },
  { from: "user", text: "Great, thanks! How long do you think it'll take?", time: "10:05 AM" },
  { from: "mechanic", text: "Based on my initial check — about 2–3 hours. I'll keep you updated!", time: "10:07 AM" },
  { from: "mechanic", text: "Found a minor coolant leak. Fixing it as part of the service at no extra charge.", time: "11:30 AM" },
  { from: "user", text: "Wow, thank you so much for catching that!", time: "11:33 AM" },
];

const mechReplies = [
  "Got it! I'll take care of that.",
  "Sure, no problem at all.",
  "I'll update you as soon as I have more info.",
  "Almost done — should be wrapped up soon!",
  "Thanks for your patience, you're in good hands!",
  "On it right now! Give me a few minutes.",
];

function MessageModal({ open, onClose, service }) {
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { from: "user", text: txt, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(m => [...m, { from: "mechanic", text: mechReplies[Math.floor(Math.random() * mechReplies.length)], time: replyTime }]);
    }, 1600 + Math.random() * 800);
  };

  if (!service) return null;
  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <img src={service.mechanic?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{service.mechanic?.name}</p>
          <p className="text-xs text-gray-400">{service.mechanic?.role} · Online</p>
        </div>
        <a href={`tel:${service.mechanic?.phone}`} className="p-2 rounded-full bg-blue-50 text-[#1C52AF] hover:bg-blue-100 transition-colors">
          <HiPhone size={17} />
        </a>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {/* Service chip — HiWrench now imported so this no longer crashes */}
      <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
        <HiWrench size={13} className="text-[#1C52AF]" />
        <p className="text-xs text-[#1C52AF] font-medium truncate">{service.title} · {service.id}</p>
      </div>

      {/* Messages */}
      <div className="px-4 py-3 flex flex-col gap-3 overflow-y-auto" style={{ minHeight: 280, maxHeight: 340 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: `fadeSlide 0.25s ease both` }}>
            {msg.from === "mechanic" && (
              <img src={service.mechanic?.avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0" />
            )}
            <div className={`max-w-[72%] flex flex-col gap-0.5 ${msg.from === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user" ? "bg-[#1C52AF] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start items-center gap-2">
            <img src={service.mechanic?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 block"
                  style={{ animation: `typingBounce 1s ease infinite ${i * 0.16}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-center bg-gray-50">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Type a message…"
          className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors"
        />
        <button onClick={send} disabled={!input.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1C52AF] text-white disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-90">
          <HiPaperAirplane size={16} className="rotate-90" />
        </button>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TRACK MODAL
══════════════════════════════════════════════════════════════════════════ */
function TrackModal({ open, onClose, service }) {
  if (!service) return null;
  const activeStepIdx = service.steps.filter(s => s.done).length - 1;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Live Tracking</p>
          <p className="text-xs text-gray-400">{service.id} · {service.car}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-blue-100">
          <div className="w-10 h-10 rounded-full bg-[#1C52AF] flex items-center justify-center shrink-0">
            <HiLocationMarker size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Service Location</p>
            <p className="text-sm font-semibold text-gray-800">{service.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "ETA", value: service.eta, icon: <HiClock size={14} className="text-[#1C52AF]" /> },
            { label: "Progress", value: `${service.progress}%`, icon: <HiWrench size={14} className="text-[#1C52AF]" /> },
            { label: "Rating", value: `⭐ ${service.mechanic.rating}`, icon: <HiShieldCheck size={14} className="text-[#1C52AF]" /> },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
              <div className="flex justify-center mb-1">{item.icon}</div>
              <p className="text-[10px] text-gray-400">{item.label}</p>
              <p className="text-xs font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {service.steps.map((step, i) => {
            const isDone = step.done;
            const isActive = i === activeStepIdx + 1 && !isDone;
            const isLast = i === service.steps.length - 1;
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center" style={{ width: 28 }}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                      isDone ? "bg-[#1C52AF] text-white" : isActive ? "bg-white border-2 border-[#1C52AF] text-[#1C52AF]" : "bg-gray-100 border-2 border-gray-200 text-gray-300"
                    }`}
                    style={isActive ? { animation: "ripplePulse 2s ease infinite" } : {}}
                  >
                    {isDone ? <HiCheck size={13} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 mt-1 mb-1 flex-1 rounded-full transition-all duration-700 ${isDone ? "bg-[#1C52AF]" : "bg-gray-200"}`}
                      style={{ minHeight: 24 }} />
                  )}
                </div>
                <div className={`flex-1 flex justify-between items-start pb-4 ${isLast ? "pb-0" : ""}`}>
                  <div>
                    <p className={`text-sm font-medium ${isDone ? "text-gray-800" : isActive ? "text-[#1C52AF]" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    {isDone && <p className="text-xs text-[#1C52AF] mt-0.5 font-medium">{step.time} · Done</p>}
                    {isActive && (
                      <p className="text-xs text-blue-500 mt-0.5 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" style={{ animation: "typingBounce 1.2s ease infinite" }} />
                        In progress…
                      </p>
                    )}
                    {!isDone && !isActive && <p className="text-xs text-gray-400 mt-0.5">Est. {step.time}</p>}
                  </div>
                  {isDone && <HiCheckCircle size={16} className="text-[#1C52AF] mt-1 shrink-0" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={service.mechanic.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
            <div>
              <p className="text-xs text-gray-400">{service.mechanic.role}</p>
              <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
            </div>
          </div>
          <a href={`tel:${service.mechanic.phone}`}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
            <HiPhone size={14} /> Call Mechanic
          </a>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RESCHEDULE MODAL — FIX 3: accepts onConfirm(newDate, newTime) callback
══════════════════════════════════════════════════════════════════════════ */
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

function RescheduleModal({ open, onClose, service, onConfirm }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [success, setSuccess] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const handleClose = () => { setSuccess(false); setSelectedDate(null); setSelectedTime(null); onClose(); };

  const confirm = () => {
    if (!selectedDate || !selectedTime) return;
    setSuccess(true);
    // FIX: pass new date/time back so the card updates
    const newDateStr = selectedDate.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    onConfirm?.(service?.id, newDateStr, selectedTime);
    setTimeout(() => handleClose(), 2400);
  };

  if (!service) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Reschedule Appointment</p>
          <p className="text-xs text-gray-400">{service.id}</p>
        </div>
        <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
          style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-green-500" />
          </div>
          <p className="text-base font-semibold text-gray-800">Appointment Rescheduled!</p>
          <p className="text-sm text-gray-500 text-center">
            {selectedDate?.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
          </p>
          <p className="text-xs text-gray-400">You'll receive a confirmation shortly.</p>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 flex items-start gap-2">
            <HiClock size={15} className="text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-orange-700 font-semibold">Current Appointment</p>
              <p className="text-xs text-orange-600">{service.date} at {service.time} · {service.location}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Select New Date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((d, i) => {
                const isSel = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border font-medium transition-all ${
                      isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md scale-105" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                    }`}>
                    <span className="text-[10px] uppercase opacity-80">{d.toLocaleDateString("en", { weekday: "short" })}</span>
                    <span className="text-lg font-bold mt-0.5 leading-none">{d.getDate()}</span>
                    <span className="text-[10px] mt-0.5 opacity-80">{d.toLocaleDateString("en", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div style={{ animation: "fadeSlide 0.25s ease" }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Available Time Slots</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => {
                  const isSel = selectedTime === t;
                  return (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                        isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                      }`}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 flex items-center gap-2"
              style={{ animation: "fadeSlide 0.2s ease" }}>
              <HiCalendar size={15} className="text-[#1C52AF] shrink-0" />
              <p className="text-xs text-[#1C52AF] font-medium">
                New appointment: {selectedDate.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
              </p>
            </div>
          )}

          <button onClick={confirm} disabled={!selectedDate || !selectedTime}
            className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95">
            {selectedDate && selectedTime ? "Confirm Reschedule" : "Select a date and time to continue"}
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CANCEL MODAL
══════════════════════════════════════════════════════════════════════════ */
const cancelReasons = [
  "Change of plans",
  "Found a better price elsewhere",
  "Vehicle issue resolved on its own",
  "Scheduling conflict",
  "Mechanic not responding",
  "Other reason",
];

function CancelModal({ open, onClose, service, onConfirmCancel }) {
  const [reason, setReason] = useState("");
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("reason");

  const reset = () => { setReason(""); setCustom(""); setStep("reason"); };
  const close = () => { reset(); onClose(); };
  const doCancel = () => {
    setStep("done");
    setTimeout(() => { onConfirmCancel?.(service?.id); reset(); onClose(); }, 2400);
  };

  if (!service) return null;
  return (
    <Modal open={open} onClose={close}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <p className="font-semibold text-gray-800 text-sm">Cancel Booking</p>
        <button onClick={close} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {step === "done" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
          style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-red-400" />
          </div>
          <p className="text-base font-semibold text-gray-800">Booking Cancelled</p>
          <p className="text-sm text-gray-500 text-center">{service.id} has been cancelled.<br />A refund will be processed within 3–5 business days.</p>
        </div>
      ) : step === "confirm" ? (
        <div className="px-4 py-4 flex flex-col gap-4" style={{ animation: "fadeSlide 0.25s ease" }}>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <HiExclamationCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-700">Are you sure you want to cancel?</p>
              <p className="text-xs text-red-400 mt-1">This cannot be undone. A cancellation fee may apply if within 24 hrs.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-0.5">
            <p className="text-xs text-gray-400">Booking</p>
            <p className="text-sm font-semibold text-gray-800">{service.title}</p>
            <p className="text-xs text-gray-500">{service.car} · {service.date} at {service.time}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400 mb-0.5">Cancellation reason</p>
            <p className="text-sm text-gray-700">{reason === "Other reason" ? (custom || "Other") : reason}</p>
          </div>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep("reason")}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
              Go Back
            </button>
            <button onClick={doCancel}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all">
              Yes, Cancel Booking
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <p className="text-sm text-gray-500">Help us improve by telling us why you're cancelling.</p>
          <div className="flex flex-col gap-2">
            {cancelReasons.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${
                  reason === r ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                }`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${reason === r ? "border-[#1C52AF]" : "border-gray-300"}`}>
                  {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
                </div>
                {r}
              </button>
            ))}
          </div>
          {reason === "Other reason" && (
            <textarea value={custom} onChange={e => setCustom(e.target.value)} rows={3}
              placeholder="Please describe your reason…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] resize-none transition-colors"
              style={{ animation: "fadeSlide 0.2s ease" }} />
          )}
          <button
            onClick={() => setStep("confirm")}
            disabled={!reason || (reason === "Other reason" && !custom.trim())}
            className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-95 transition-all mt-1">
            Continue to Confirm
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAY NOW MODAL — FIX 4: new modal for pending payment
══════════════════════════════════════════════════════════════════════════ */
function PayNowModal({ open, onClose, service }) {
  const [step, setStep] = useState("details"); // "details" | "success"
  const [method, setMethod] = useState("card");

  const reset = () => { setStep("details"); setMethod("card"); };
  const handleClose = () => { reset(); onClose(); };

  const pay = () => {
    setStep("success");
    setTimeout(() => handleClose(), 2600);
  };

  if (!service) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Complete Payment</p>
          <p className="text-xs text-gray-400">{service.id}</p>
        </div>
        <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {step === "success" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
          style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-green-500" />
          </div>
          <p className="text-base font-semibold text-gray-800">Payment Successful!</p>
          <p className="text-sm text-gray-500 text-center">
            {service.price} paid for {service.title}.
          </p>
          <p className="text-xs text-gray-400">A mechanic will be assigned shortly.</p>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Summary */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Service</p>
              <p className="text-sm font-semibold text-gray-800">{service.title}</p>
              <p className="text-xs text-gray-500">{service.date} at {service.time}</p>
            </div>
            <p className="text-lg font-bold text-[#1C52AF]">{service.price}</p>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Payment Method</p>
            <div className="flex flex-col gap-2">
              {[
                { id: "card", label: "Debit / Credit Card", icon: "💳" },
                { id: "transfer", label: "Bank Transfer", icon: "🏦" },
                { id: "ussd", label: "USSD", icon: "📱" },
              ].map(opt => (
                <button key={opt.id} onClick={() => setMethod(opt.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all active:scale-[0.98] ${
                    method === opt.id ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                  }`}>
                  <span className="text-base">{opt.icon}</span>
                  {opt.label}
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === opt.id ? "border-[#1C52AF]" : "border-gray-300"}`}>
                    {method === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={pay}
            className="w-full py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all">
            Pay {service.price} Now
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INVOICE MODAL — FIX 5: new modal for completed service invoices
══════════════════════════════════════════════════════════════════════════ */
function InvoiceModal({ open, onClose, service }) {
  if (!service) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Invoice</p>
          <p className="text-xs text-gray-400">{service.invoice} · {service.id}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
        {/* Header info */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-400">Billed to</p>
            <p className="text-sm font-semibold text-gray-800">Customer</p>
            <p className="text-xs text-gray-500">{service.car}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Date</p>
            <p className="text-sm font-semibold text-gray-800">{service.completedDate}</p>
            <p className="text-xs text-green-600 font-semibold">PAID</p>
          </div>
        </div>

        {/* Service line */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="px-4 py-3 flex justify-between items-start border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">{service.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">Duration: {service.duration} · {service.mechanic.name}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">{service.price}</p>
          </div>
          {/* Parts */}
          {service.parts.map((part, i) => (
            <div key={i} className="px-4 py-2 flex justify-between items-center border-b border-gray-100 last:border-0">
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />{part}
              </p>
              <p className="text-xs text-gray-400">Included</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-3">
          <p className="text-sm font-semibold text-gray-800">Total Paid</p>
          <p className="text-lg font-bold text-[#1C52AF]">{service.price}</p>
        </div>

        {/* Download button */}
        <button
          onClick={() => {
            // Simulate download — in production, trigger PDF generation or API call here
            alert(`Invoice ${service.invoice} download started.`);
          }}
          className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 active:scale-95 transition-all">
          <HiDownload size={16} /> Download Invoice PDF
        </button>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   REBOOK MODAL — FIX 6: new modal to rebook a completed service
══════════════════════════════════════════════════════════════════════════ */
function RebookModal({ open, onClose, service }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [success, setSuccess] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const handleClose = () => { setSuccess(false); setSelectedDate(null); setSelectedTime(null); onClose(); };

  const confirm = () => {
    if (!selectedDate || !selectedTime) return;
    setSuccess(true);
    setTimeout(() => handleClose(), 2400);
  };

  if (!service) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Rebook Service</p>
          <p className="text-xs text-gray-400">{service.id}</p>
        </div>
        <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4"
          style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-green-500" />
          </div>
          <p className="text-base font-semibold text-gray-800">Service Rebooked!</p>
          <p className="text-sm text-gray-500 text-center">
            {selectedDate?.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
          </p>
          <p className="text-xs text-gray-400">Check your Scheduled tab for the new booking.</p>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Previous service summary */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
            <HiRefresh size={15} className="text-[#1C52AF] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-[#1C52AF] font-semibold">Rebooking</p>
              <p className="text-xs text-blue-600">{service.title}</p>
              <p className="text-xs text-blue-500">{service.car} · {service.price}</p>
            </div>
          </div>

          {/* Date picker */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Select Date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((d, i) => {
                const isSel = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border font-medium transition-all ${
                      isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md scale-105" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                    }`}>
                    <span className="text-[10px] uppercase opacity-80">{d.toLocaleDateString("en", { weekday: "short" })}</span>
                    <span className="text-lg font-bold mt-0.5 leading-none">{d.getDate()}</span>
                    <span className="text-[10px] mt-0.5 opacity-80">{d.toLocaleDateString("en", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div style={{ animation: "fadeSlide 0.25s ease" }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Available Time Slots</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => {
                  const isSel = selectedTime === t;
                  return (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                        isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                      }`}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 flex items-center gap-2"
              style={{ animation: "fadeSlide 0.2s ease" }}>
              <HiCalendar size={15} className="text-[#1C52AF] shrink-0" />
              <p className="text-xs text-[#1C52AF] font-medium">
                {selectedDate.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
              </p>
            </div>
          )}

          <button onClick={confirm} disabled={!selectedDate || !selectedTime}
            className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95">
            {selectedDate && selectedTime ? "Confirm Rebook" : "Select a date and time to continue"}
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SHARED CARD UTILITIES
══════════════════════════════════════════════════════════════════════════ */
function AnimatedCard({ children, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}>
      {children}
    </div>
  );
}

function ProgressBar({ value }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(value), 350); return () => clearTimeout(t); }, [value]);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-2 rounded-full bg-[#1C52AF]" style={{ width: `${width}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

function StepTracker({ steps }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mt-1">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${s.done ? "bg-[#1C52AF] text-white" : "bg-gray-200 text-gray-400"}`}>
              {s.done ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] ${s.done ? "text-[#1C52AF] font-medium" : "text-gray-400"}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 min-w-[8px] h-[2px] rounded ${s.done && steps[i + 1]?.done ? "bg-[#1C52AF]" : "bg-gray-200"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => <HiStar key={n} size={14} className={n <= rating ? "text-yellow-400" : "text-gray-200"} />)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ACTIVE CARD
══════════════════════════════════════════════════════════════════════════ */
function ActiveCard({ service, index, onMessage, onTrack }) {
  return (
    <AnimatedCard index={index}>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
        <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 items-center flex-wrap">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${service.statusColor}`}>{service.status}</span>
            <span className="text-sm font-medium text-gray-500">{service.id}</span>
          </div>
          <span className="text-xs text-gray-400">Estimated Completion</span>
        </div>
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="flex-1 min-w-[180px]">
            <p className="font-semibold text-gray-800">{service.title}</p>
            <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
          </div>
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            <HiClock size={14} className="text-[#1C52AF]" />{service.time}
          </p>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Service Progress</span>
            <span className="font-semibold text-[#1C52AF]">{service.progress}%</span>
          </div>
          <ProgressBar value={service.progress} />
        </div>
        <StepTracker steps={service.steps} />
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <img src={service.mechanic.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
            <div>
              <p className="text-xs text-gray-400">{service.mechanic.role}</p>
              <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onMessage(service)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
              <HiChatAlt2 size={15} /> Message
            </button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCHEDULED CARD — FIX 7: onPayNow prop wired up
══════════════════════════════════════════════════════════════════════════ */
function ScheduledCard({ service, index, onMessage, onReschedule, onCancel, onPayNow }) {
  return (
    <AnimatedCard index={index}>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
        <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 items-center flex-wrap">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${service.statusColor}`}>{service.status}</span>
            <span className="text-sm font-medium text-gray-500">{service.id}</span>
          </div>
          <span className="text-sm font-bold text-[#1C52AF]">{service.price}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{service.title}</p>
          <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <HiCalendar size={14} />, label: "Date", value: service.date },
            { icon: <HiClock size={14} />, label: "Time", value: service.time },
            { icon: <HiRefresh size={14} />, label: "Duration", value: service.duration },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="flex justify-center text-[#1C52AF] mb-0.5">{item.icon}</div>
              <p className="text-[10px] text-gray-400">{item.label}</p>
              <p className="text-xs font-semibold text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2">
          <HiLocationMarker size={16} className="text-[#1C52AF] mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600">{service.location}</p>
        </div>
        {service.mechanic ? (
          <div className="flex items-center gap-2">
            <img src={service.mechanic.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1C52AF]/20" />
            <div>
              <p className="text-xs text-gray-400">{service.mechanic.role}</p>
              <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
            <HiClock size={15} className="text-orange-500 shrink-0" />
            <p className="text-xs text-orange-600 font-medium">Mechanic will be assigned after payment.</p>
          </div>
        )}
        <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 border-l-4 border-[#1C52AF]">
          📌 {service.note}
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-2">
          <button onClick={() => onCancel(service)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all">
            Cancel Booking
          </button>
          <div className="flex gap-2">
            {service.mechanic && (
              <button onClick={() => onMessage(service)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 active:scale-95 transition-all">
                <HiChatAlt2 size={14} /> Message
              </button>
            )}
            {service.status === "PENDING PAYMENT" ? (
              // FIX: now calls onPayNow instead of doing nothing
              <button onClick={() => onPayNow(service)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 active:scale-95 transition-all">
                Pay Now
              </button>
            ) : (
              <button onClick={() => onReschedule(service)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
                <HiCalendar size={14} /> Reschedule
              </button>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMPLETED CARD — FIX 8: onInvoice and onRebook props wired up
══════════════════════════════════════════════════════════════════════════ */
function CompletedCard({ service, index, onMessage, onInvoice, onRebook }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimatedCard index={index}>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img src={service.img} alt="service" className="w-full rounded-lg object-cover max-h-48" />
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <HiCheckCircle size={13} /> COMPLETED
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">{service.id}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{service.invoice}</span>
          </div>
          <span className="text-sm font-bold text-green-600">{service.price}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{service.title}</p>
          <p className="text-sm text-gray-500 mt-0.5">{service.car}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
            <HiCalendar size={13} className="text-[#1C52AF]" />{service.completedDate}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
            <HiClock size={13} className="text-[#1C52AF]" />Duration: {service.duration}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={service.mechanic.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-green-400/40" />
          <div>
            <p className="text-xs text-gray-400">{service.mechanic.role}</p>
            <p className="text-sm font-semibold text-gray-800">{service.mechanic.name}</p>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={service.rating} />
            <span className="text-xs font-semibold text-gray-600">{service.rating}.0 / 5</span>
          </div>
          <p className="text-xs text-gray-500 italic">"{service.review}"</p>
        </div>
        <button onClick={() => setExpanded(e => !e)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
          <span>Parts & Materials ({service.parts.length})</span>
          {expanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
        </button>
        <div style={{ maxHeight: expanded ? `${service.parts.length * 42}px` : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <ul className="flex flex-col gap-1.5 px-1">
            {service.parts.map((part, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C52AF] shrink-0" />{part}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center flex-wrap gap-2">
          {/* FIX: Invoice button now calls onInvoice */}
          <button onClick={() => onInvoice(service)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
            <HiDownload size={14} /> Invoice
          </button>
          <div className="flex gap-2">
            <button onClick={() => onMessage(service)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 active:scale-95 transition-all">
              <HiChatAlt2 size={14} /> Message
            </button>
            {/* FIX: Rebook button now calls onRebook */}
            <button onClick={() => onRebook(service)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
              <HiRefresh size={14} /> Rebook
            </button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
const tabMeta = {
  active: { color: "bg-yellow-100 text-yellow-700" },
  scheduled: { color: "bg-purple-100 text-purple-700" },
  completed: { color: "bg-green-100 text-green-700" },
};

const MyService = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [animating, setAnimating] = useState(false);
  const [cancelledIds, setCancelledIds] = useState([]);

  // FIX 9: scheduledServices is now state so reschedule can update it
  const [scheduledServices, setScheduledServices] = useState(initialScheduledServices);

  const [messageModal, setMessageModal] = useState({ open: false, service: null });
  const [trackModal, setTrackModal] = useState({ open: false, service: null });
  const [rescheduleModal, setRescheduleModal] = useState({ open: false, service: null });
  const [cancelModal, setCancelModal] = useState({ open: false, service: null });
  const [payNowModal, setPayNowModal] = useState({ open: false, service: null });
  const [invoiceModal, setInvoiceModal] = useState({ open: false, service: null });
  const [rebookModal, setRebookModal] = useState({ open: false, service: null });

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => { setActiveTab(tab); setAnimating(false); }, 200);
  };

  // FIX: update the service date/time in state after reschedule
  const handleRescheduleConfirm = (serviceId, newDate, newTime) => {
    setScheduledServices(prev =>
      prev.map(s => s.id === serviceId ? { ...s, date: newDate, time: newTime } : s)
    );
  };

  const visibleScheduled = scheduledServices.filter(s => !cancelledIds.includes(s.id));

  const tabDescriptions = {
    active: "Real-time tracking of your ongoing vehicle maintenance and repairs.",
    scheduled: "Upcoming appointments and confirmed bookings.",
    completed: "Past services, invoices, and history.",
  };

  const counts = {
    active: initialActiveServices.length,
    scheduled: visibleScheduled.length,
    completed: completedServices.length,
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-xl font-semibold">
            {activeTab === "active" ? "Active Services" : activeTab === "scheduled" ? "Scheduled Services" : "Completed Services"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{tabDescriptions[activeTab]}</p>
        </div>
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl w-full md:w-fit">
          {["active", "scheduled", "completed"].map(tab => (
            <button key={tab} onClick={() => switchTab(tab)}
              className={`flex-1 md:flex-none px-3 py-1.5 text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab ? "bg-white shadow text-black font-medium" : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tabMeta[tab].color}`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div
        className="flex flex-col gap-4"
        style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", transition: "opacity 0.2s ease, transform 0.2s ease" }}
      >
        {activeTab === "active" && initialActiveServices.map((s, i) => (
          <ActiveCard key={s.id} service={s} index={i}
            onMessage={svc => setMessageModal({ open: true, service: svc })}
            onTrack={svc => setTrackModal({ open: true, service: svc })} />
        ))}
        {activeTab === "scheduled" && visibleScheduled.map((s, i) => (
          <ScheduledCard key={s.id} service={s} index={i}
            onMessage={svc => setMessageModal({ open: true, service: svc })}
            onReschedule={svc => setRescheduleModal({ open: true, service: svc })}
            onCancel={svc => setCancelModal({ open: true, service: svc })}
            onPayNow={svc => setPayNowModal({ open: true, service: svc })} />
        ))}
        {activeTab === "completed" && completedServices.map((s, i) => (
          <CompletedCard key={s.id} service={s} index={i}
            onMessage={svc => setMessageModal({ open: true, service: svc })}
            onInvoice={svc => setInvoiceModal({ open: true, service: svc })}
            onRebook={svc => setRebookModal({ open: true, service: svc })} />
        ))}
      </div>

      {/* Modals */}
      <MessageModal open={messageModal.open} service={messageModal.service}
        onClose={() => setMessageModal({ open: false, service: null })} />
      <TrackModal open={trackModal.open} service={trackModal.service}
        onClose={() => setTrackModal({ open: false, service: null })} />
      <RescheduleModal open={rescheduleModal.open} service={rescheduleModal.service}
        onClose={() => setRescheduleModal({ open: false, service: null })}
        onConfirm={handleRescheduleConfirm} />
      <CancelModal open={cancelModal.open} service={cancelModal.service}
        onClose={() => setCancelModal({ open: false, service: null })}
        onConfirmCancel={id => setCancelledIds(prev => [...prev, id])} />
      <PayNowModal open={payNowModal.open} service={payNowModal.service}
        onClose={() => setPayNowModal({ open: false, service: null })} />
      <InvoiceModal open={invoiceModal.open} service={invoiceModal.service}
        onClose={() => setInvoiceModal({ open: false, service: null })} />
      <RebookModal open={rebookModal.open} service={rebookModal.service}
        onClose={() => setRebookModal({ open: false, service: null })} />
    </div>
  );
};

export default MyService;