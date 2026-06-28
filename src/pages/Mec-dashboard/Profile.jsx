// import React, { useState, useEffect, useRef, useCallback } from "react";

// import { useNavigate } from "react-router-dom";
// import {
//   HiPencil, HiUser, HiPhone, HiMail, HiLocationMarker,
//   HiShieldCheck, HiLockClosed, HiChevronRight, HiPlus,
//   HiHome, HiBriefcase, HiDotsVertical, HiCamera, HiCheck,
//   HiX, HiEye, HiEyeOff, HiExclamationCircle,
// } from "react-icons/hi";
// import { HiBuildingOffice2 } from "react-icons/hi2";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";

// /* ══════════════════════════════════════════════════════════════════════
//    HELPERS
// ══════════════════════════════════════════════════════════════════════ */
// function getInitials(firstName, lastName) {
//   return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
// }

// function fmtPhone(phone) {
//   if (!phone) return "—";
//   return phone;
// }

// /* ══════════════════════════════════════════════════════════════════════
//    MODAL
// ══════════════════════════════════════════════════════════════════════ */
// function Modal({ open, onClose, title, children }) {
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   if (!open) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
//       onClick={e => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
//         style={{ animation: "modalIn 0.25s cubic-bezier(0.34,1.4,0.64,1)" }}
//       >
//         {title && (
//           <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//             <p className="font-semibold text-gray-800">{title}</p>
//             <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
//               <HiX size={18} />
//             </button>
//           </div>
//         )}
//         <div className="p-5">
//           {children}
//         </div>
//       </div>
//       <style>{`
//         @keyframes modalIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
//       `}</style>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    EDIT PROFILE MODAL
// ══════════════════════════════════════════════════════════════════════ */
// function EditProfileModal({ open, onClose, user, onSave }) {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     city: "",
//     state: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user && open) {
//       setForm({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phoneNumber: user.phoneNumber || "",
//         address: user.address || "",
//         city: user.city || "",
//         state: user.state || "",
//       });
//     }
//   }, [user, open]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); setError(null);
//     try {
//       const res = await api.put("/auth/profile", form);
//       onSave?.(res.data);
//       onClose();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Edit Profile">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">First Name</label>
//             <input name="firstName" value={form.firstName} onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Last Name</label>
//             <input name="lastName" value={form.lastName} onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//           </div>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
//           <input name="email" type="email" value={form.email} onChange={handleChange}
//             className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//         </div>
//         <div>
//           <label className="text-xs font-medium text-gray-500 mb-1 block">Phone Number</label>
//           <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange}
//             className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//         </div>
//         <div>
//           <label className="text-xs font-medium text-gray-500 mb-1 block">Address</label>
//           <input name="address" value={form.address} onChange={handleChange}
//             className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//         </div>
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">City</label>
//             <input name="city" value={form.city} onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">State</label>
//             <input name="state" value={form.state} onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//           </div>
//         </div>
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
//             <HiExclamationCircle size={14} className="text-red-500 shrink-0" />
//             <p className="text-xs text-red-600">{error}</p>
//           </div>
//         )}
//         <div className="flex gap-2 pt-1">
//           <button type="button" onClick={onClose}
//             className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
//             Cancel
//           </button>
//           <button type="submit" disabled={loading}
//             className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all disabled:opacity-50">
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    CHANGE PASSWORD MODAL
// ══════════════════════════════════════════════════════════════════════ */
// function ChangePasswordModal({ open, onClose }) {
//   const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.newPassword !== form.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     setLoading(true); setError(null);
//     try {
//       await api.put("/auth/change-password", {
//         currentPassword: form.currentPassword,
//         newPassword: form.newPassword,
//       });
//       setSuccess(true);
//       setTimeout(() => { setSuccess(false); onClose(); setForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); }, 2000);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to change password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Change Password">
//       {success ? (
//         <div className="flex flex-col items-center gap-3 py-6">
//           <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
//             <HiCheck size={28} className="text-green-500" />
//           </div>
//           <p className="text-sm font-semibold text-gray-800">Password Changed!</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
//           {[
//             { name: "currentPassword", label: "Current Password", key: "current" },
//             { name: "newPassword", label: "New Password", key: "new" },
//             { name: "confirmPassword", label: "Confirm New Password", key: "confirm" },
//           ].map(({ name, label, key }) => (
//             <div key={name}>
//               <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
//               <div className="relative">
//                 <input name={name} type={showPass[key] ? "text" : "password"} value={form[name]} onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
//                 <button type="button" onClick={() => setShowPass(p => ({ ...p, [key]: !p[key] }))}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                   {showPass[key] ? <HiEyeOff size={16} /> : <HiEye size={16} />}
//                 </button>
//               </div>
//             </div>
//           ))}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
//               <HiExclamationCircle size={14} className="text-red-500 shrink-0" />
//               <p className="text-xs text-red-600">{error}</p>
//             </div>
//           )}
//           <div className="flex gap-2 pt-1">
//             <button type="button" onClick={onClose}
//               className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
//               Cancel
//             </button>
//             <button type="submit" disabled={loading}
//               className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all disabled:opacity-50">
//               {loading ? "Updating..." : "Update Password"}
//             </button>
//           </div>
//         </form>
//       )}
//     </Modal>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    PROFILE IMAGE UPLOADER
// ══════════════════════════════════════════════════════════════════════ */
// function ProfileImageUploader({ user, onUpdate }) {
//   const [uploading, setUploading] = useState(false);
//   const fileRef = useRef(null);

//   const handleFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("profileImage", file);
//       const res = await api.put("/auth/profile/image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       onUpdate?.(res.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="relative group">
//       <div className={`w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-white shadow-lg ${uploading ? "opacity-70" : ""}`}>
//         {user?.profileImage ? (
//           <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
//         ) : (
//           <span className="text-2xl font-bold text-[#1C52AF]">
//             {getInitials(user?.firstName, user?.lastName)}
//           </span>
//         )}
//       </div>
//       <button
//         onClick={() => fileRef.current?.click()}
//         disabled={uploading}
//         className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1C52AF] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-800 transition-all active:scale-95"
//       >
//         {uploading ? (
//           <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
//         ) : (
//           <HiCamera size={14} />
//         )}
//       </button>
//       <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    SAVED VEHICLES
// ══════════════════════════════════════════════════════════════════════ */
// function SavedVehicles() {
//   const vehicles = [
//     { id: 1, year: 2023, brand: "Tesla", model: "Model 3", image: null, lastServiced: "Oct 12" },
//     { id: 2, brand: "BMW", model: "X5", year: 2021, image: null, serviceDue: "500mi" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <HiBuildingOffice2 size={18} className="text-[#1C52AF]" />
//           <h3 className="font-semibold text-gray-800 text-sm">Saved Vehicles</h3>
//         </div>
//         <button className="text-xs font-medium text-[#1C52AF] hover:underline">View All</button>
//       </div>
//       <div className="flex flex-col gap-3">
//         {vehicles.map(v => (
//           <div key={v.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
//             <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
//               {v.image ? (
//                 <img src={v.image} alt="" className="w-full h-full object-cover" />
//               ) : (
//                 <HiBuildingOffice2 size={20} className="text-gray-400" />
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-gray-800">{v.year} {v.brand} {v.model}</p>
//               <p className="text-xs text-gray-400">
//                 {v.lastServiced ? `Last serviced ${v.lastServiced}` : `Service due in ${v.serviceDue}`}
//               </p>
//             </div>
//             <HiChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
//           </div>
//         ))}
//         <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#1C52AF] hover:text-[#1C52AF] transition-all text-sm">
//           <HiPlus size={16} /> Add New Vehicle
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    SAVED ADDRESSES
// ══════════════════════════════════════════════════════════════════════ */
// function SavedAddresses({ user }) {
//   const addresses = [
//     { id: 1, label: "Home Address", isDefault: true, address: user?.address || "123, New Haven", city: user?.city || "Ibadan", state: user?.state || "Oyo" },
//     { id: 2, label: "Office", isDefault: false, address: "456 Corporate Plaza", city: "Ibadan", state: "Oyo" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <HiHome size={18} className="text-[#1C52AF]" />
//           <h3 className="font-semibold text-gray-800 text-sm">Saved Addresses</h3>
//         </div>
//         <button className="text-xs font-medium text-[#1C52AF] hover:underline">Add New</button>
//       </div>
//       <div className="flex flex-col gap-3">
//         {addresses.map(addr => (
//           <div key={addr.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
//               {addr.label.includes("Home") ? <HiHome size={18} className="text-[#1C52AF]" /> : <HiBriefcase size={18} className="text-[#1C52AF]" />}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm font-semibold text-gray-800">{addr.label}</p>
//                 {addr.isDefault && (
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C52AF] bg-blue-50 px-2 py-0.5 rounded-md">
//                     Default
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-0.5">{addr.address}, {addr.city}, {addr.state}</p>
//             </div>
//             <button className="text-gray-300 hover:text-gray-500 p-1">
//               <HiDotsVertical size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* Map placeholder */}
//       <div className="mt-4 rounded-xl overflow-hidden h-40 bg-gradient-to-br from-teal-600 to-teal-800 relative">
//         <div className="absolute inset-0 opacity-20" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
//             <HiLocationMarker size={20} className="text-[#1C52AF]" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    PROFILE COMPLETENESS
// ══════════════════════════════════════════════════════════════════════ */
// function ProfileCompleteness({ user }) {
//   const fields = [
//     user?.firstName, user?.lastName, user?.email,
//     user?.phoneNumber, user?.address, user?.profileImage,
//   ];
//   const filled = fields.filter(Boolean).length;
//   const percent = Math.round((filled / fields.length) * 100);

//   return (
//     <div className="bg-[#1C52AF] rounded-2xl p-5 text-white">
//       <h3 className="font-semibold text-sm mb-1">Profile Completeness</h3>
//       <p className="text-xs text-blue-100 mb-4">Complete your profile to unlock premium features and faster support.</p>
//       <div className="w-full h-2 bg-blue-800/50 rounded-full overflow-hidden mb-3">
//         <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
//       </div>
//       <div className="flex items-center justify-between">
//         <span className="text-xs font-bold uppercase tracking-wider">{percent}% COMPLETE</span>
//         <span className="text-xs font-bold uppercase tracking-wider">LEVEL {Math.ceil(percent / 25)}</span>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    SECURITY SECTION
// ══════════════════════════════════════════════════════════════════════ */
// function SecuritySection({ onChangePassword }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//       <h3 className="font-semibold text-gray-800 text-sm mb-4">Security</h3>
//       <div className="flex flex-col gap-1">
//         <button onClick={onChangePassword}
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
//           <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
//             <HiLockClosed size={18} className="text-gray-500 group-hover:text-[#1C52AF]" />
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-800">Change Password</p>
//           </div>
//           <HiChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
//         </button>
//         <div className="flex items-center gap-3 p-3 rounded-xl">
//           <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
//             <HiShieldCheck size={18} className="text-gray-500" />
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-800">Two-Factor Auth</p>
//           </div>
//           <span className="text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">ON</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    MAIN PROFILE PAGE — WRAPPED IN DASHBOARD LAYOUT
// ══════════════════════════════════════════════════════════════════════ */
// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [passwordOpen, setPasswordOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);

//   const navigate = useNavigate();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const fetchProfile = useCallback(async () => {
//     setLoading(true); setError(null);
//     try {
//       const res = await api.get("/auth/profile");
//       console.log("[Profile] API Response:", res.data);
//       setUser(res.data);
//     } catch (err) {
//       console.error("[Profile] Error:", err?.response?.data || err.message);
//       setError(err?.response?.data?.message || "Failed to load profile.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   const handleUpdate = (updatedUser) => {
//     setUser(prev => ({ ...prev, ...updatedUser }));
//   };

//   const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
//   const isProvider = user?.role === "provider";

//   // ─── Loading State ───────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//         <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
//           <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
//             <div className="animate-pulse flex flex-col gap-4 max-w-7xl mx-auto">
//               <div className="h-32 bg-gray-100 rounded-2xl" />
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <div className="lg:col-span-2 h-96 bg-gray-100 rounded-2xl" />
//                 <div className="h-96 bg-gray-100 rounded-2xl" />
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   // ─── Error State ─────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//         <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
//           <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 flex items-center justify-center">
//             <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 text-center max-w-sm">
//               <HiExclamationCircle size={32} className="text-red-400" />
//               <p className="text-sm font-semibold text-red-700">Couldn't load profile</p>
//               <p className="text-xs text-red-400">{error}</p>
//               <button onClick={fetchProfile}
//                 className="px-4 py-2 text-xs text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all">
//                 Try Again
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   // ─── Main Render ─────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
      
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
        
//         <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
//           <div className="max-w-7xl mx-auto">
            
//             {/* Header Card */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 mb-6">
//               <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
//                 <ProfileImageUploader user={user} onUpdate={handleUpdate} />
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
//                   <p className="text-sm text-gray-400 mt-1">Manage your account information and preferences</p>
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${isProvider ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
//                       {isProvider ? "PROVIDER" : "CUSTOMER"}
//                     </span>
//                     {user?.isVerified && (
//                       <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-green-100 text-green-700 flex items-center gap-1">
//                         <HiCheck size={10} /> VERIFIED
//                       </span>
//                     )}
//                     {!user?.isEmailVerified && (
//                       <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-100 text-orange-700">
//                         EMAIL UNVERIFIED
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <button onClick={() => setEditOpen(true)}
//                   className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#1C52AF] text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-all active:scale-95 shadow-sm">
//                   <HiPencil size={14} /> Edit Profile
//                 </button>
//               </div>
//             </div>

//             {/* Main Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column (2/3) */}
//               <div className="lg:col-span-2 flex flex-col gap-6">
//                 {/* Personal Information */}
//                 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//                   <div className="flex items-center gap-2 mb-5">
//                     <HiUser size={18} className="text-[#1C52AF]" />
//                     <h3 className="font-semibold text-gray-800 text-sm">Personal Information</h3>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
//                     {[
//                       { icon: HiUser, label: "FULL NAME", value: fullName },
//                       { icon: HiMail, label: "EMAIL ADDRESS", value: user?.email || "—" },
//                       { icon: HiPhone, label: "PHONE NUMBER", value: fmtPhone(user?.phoneNumber) },
//                       { icon: HiLocationMarker, label: "ADDRESS", value: `${user?.address || ""}, ${user?.city || ""}, ${user?.state || ""}`.replace(/^,\s*|,\s*$/g, "") || "—" },
//                     ].map(({ icon: Icon, label, value }) => (
//                       <div key={label}>
//                         <div className="flex items-center gap-1.5 mb-1">
//                           <Icon size={12} className="text-gray-400" />
//                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
//                         </div>
//                         <p className="text-sm font-medium text-gray-800">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Saved Addresses */}
//                 <SavedAddresses user={user} />
//               </div>

//               {/* Right Column (1/3) */}
//               <div className="flex flex-col gap-6">
//                 {/* Saved Vehicles */}
//                 <SavedVehicles />

//                 {/* Profile Completeness */}
//                 <ProfileCompleteness user={user} />

//                 {/* Security */}
//                 <SecuritySection onChangePassword={() => setPasswordOpen(true)} />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Modals */}
//       <EditProfileModal
//         open={editOpen}
//         onClose={() => setEditOpen(false)}
//         user={user}
//         onSave={handleUpdate}
//       />
//       <ChangePasswordModal
//         open={passwordOpen}
//         onClose={() => setPasswordOpen(false)}
//       />
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  DollarSign,
  ChevronRight,
  UserPlus,
  Banknote,
  Star,
  MessageSquare,
  CalendarDays
} from 'lucide-react';
import api from '../../api/axios';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const StatCard = ({ icon: Icon, label, value, change, changeType, iconBg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className="text-gray-700" strokeWidth={2} />
      </div>
      {change && (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            changeType === 'positive'
              ? 'bg-green-50 text-green-600'
              : changeType === 'negative'
              ? 'bg-red-50 text-red-500'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {change}
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium mt-2">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'bg-blue-600 text-white',
    WAITING: 'bg-amber-400 text-white',
    UPCOMING: 'bg-gray-200 text-gray-500',
    COMPLETED: 'bg-green-500 text-white',
  };
  return (
    <span className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide ${styles[status] || styles.UPCOMING}`}>
      {status}
    </span>
  );
};

const ActivityIcon = ({ type }) => {
  const configs = {
    service_request: { bg: 'bg-blue-50', icon: UserPlus, color: 'text-blue-500' },
    payment: { bg: 'bg-green-50', icon: Banknote, color: 'text-green-500' },
    review: { bg: 'bg-amber-50', icon: Star, color: 'text-amber-500' },
    message: { bg: 'bg-gray-100', icon: MessageSquare, color: 'text-gray-500' },
    job: { bg: 'bg-blue-50', icon: ClipboardList, color: 'text-blue-500' },
  };
  const config = configs[type] || configs.message;
  const Icon = config.icon;
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
      <Icon size={18} className={config.color} />
    </div>
  );
};

// ─── Main Dashboard Component ──────────────────────────────────────

const ProviderDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 124,
    completed: 118,
    pending: 6,
    monthlyEarnings: 8420,
    changes: { totalJobs: '+12%', completed: '+10%', pending: '-2%', earnings: '+15%' },
  });
  const [schedule, setSchedule] = useState([
    { id: 1, time: '09:00 AM', title: 'Brake Pad Replacement', vehicle: 'Toyota Corolla (ABC-1234)', status: 'CONFIRMED' },
    { id: 2, time: '11:30 AM', title: 'Engine Oil Change', vehicle: 'Honda Civic (XYZ-5678)', status: 'WAITING' },
    { id: 3, time: '02:00 PM', title: 'Transmission Check', vehicle: 'Ford F-150 (TRK-9012)', status: 'CONFIRMED' },
    { id: 4, time: '04:30 PM', title: 'AC System Diagnostic', vehicle: 'BMW M3 (GMN-3456)', status: 'UPCOMING' },
  ]);
  const [activities, setActivities] = useState([
    { id: '1', type: 'service_request', title: 'Sarah Miller requested a service', timeAgo: '2 minutes ago', hasIndicator: true },
    { id: '2', type: 'payment', title: 'Payment of $125.00 received', timeAgo: '45 minutes ago' },
    { id: '3', type: 'review', title: 'New 5-star review from James W.', timeAgo: '2 hours ago' },
    { id: '4', type: 'message', title: 'Message from Auto Parts Co.', timeAgo: 'Yesterday, 5:30 PM' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/provider/dashboard`);

        const data = response.data;

        // Map API response to component state
        if (data.stats) setStats(data.stats);
        if (data.schedule) setSchedule(data.schedule);
        if (data.activities) {
          // Map API activities to UI format
          const mappedActivities = data.activities.map((act) => ({
            id: act.id,
            type: act.type === 'job' ? 'service_request' : act.type,
            title:
              act.type === 'job'
                ? `${act.customerName || 'Someone'} requested ${act.title}`
                : act.type === 'payment'
                ? `Payment of $${act.amount} received`
                : act.type === 'review'
                ? `New ${act.rating || 5}-star review from ${act.customerName || 'a customer'}`
                : act.title || 'New activity',
            timeAgo: act.timeAgo || act.time || 'Recently',
            hasIndicator: act.type === 'job' || act.type === 'service_request',
          }));
          setActivities(mappedActivities);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
        // Keep default/demo data on error so UI still renders
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    // Optional: Poll for real-time updates every 30 seconds
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  // ─── Loading State ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* ─── Header ─────────────────────────────────────────────── */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Good morning, Marc</h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">
                You have <span className="font-semibold text-gray-700">4 appointments</span> scheduled for today. One requires immediate attention.
              </p>
            </div>

            {/* ─── Stats Cards ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <StatCard
                icon={ClipboardList}
                label="Total Jobs"
                value={stats.totalJobs}
                change={stats.changes?.totalJobs}
                changeType="positive"
                iconBg="bg-blue-50"
              />
              <StatCard
                icon={CheckCircle2}
                label="Completed"
                value={stats.completed}
                change={stats.changes?.completed}
                changeType="positive"
                iconBg="bg-green-50"
              />
              <StatCard
                icon={Clock}
                label="Pending"
                value={stats.pending}
                change={stats.changes?.pending}
                changeType="negative"
                iconBg="bg-amber-50"
              />
              <StatCard
                icon={DollarSign}
                label="Monthly Earnings"
                value={`$${stats.monthlyEarnings?.toLocaleString()}`}
                change={stats.changes?.earnings}
                changeType="positive"
                iconBg="bg-indigo-50"
              />
            </div>

            {/* ─── Main Content Grid ──────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ─── Upcoming Schedule (2/3 width) ────────────────────── */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Upcoming Schedule</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
                    <CalendarDays size={16} />
                    View Calendar
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {schedule.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center p-4 md:p-5 hover:bg-gray-50 transition-colors cursor-pointer group ${
                        index !== schedule.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      {/* Time Column */}
                      <div className="w-16 md:w-20 flex-shrink-0 text-center">
                        <p className="text-sm font-bold text-gray-400 leading-tight">{item.time.split(' ')[0]}</p>
                        <p className="text-xs text-gray-400 uppercase">{item.time.split(' ')[1]}</p>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-10 bg-gray-200 mx-4 md:mx-6 flex-shrink-0"></div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{item.vehicle}</p>
                      </div>

                      {/* Status & Arrow */}
                      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                        <StatusBadge status={item.status} />
                        <ChevronRight
                          size={18}
                          className="text-gray-300 group-hover:text-gray-500 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Recent Activity (1/3 width) ───────────────────────── */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="space-y-5">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <ActivityIcon type={activity.type} />
                          {activity.hasIndicator && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{activity.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{activity.timeAgo}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>

            </div>

            {/* ─── Error Toast (if API fails) ─────────────────────────── */}
            {error && (
              <div className="fixed bottom-6 right-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Failed to load live data. Showing cached data.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;