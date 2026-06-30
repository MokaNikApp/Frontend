// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
// import {
//   HiPencil, HiOutlineTruck, HiOutlinePlus, HiOutlineLockClosed,
//   HiOutlineShieldCheck, HiOutlineHome, HiOutlineChevronRight,
//   HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone,
//   HiOutlineUser, HiOutlineCheck, HiX, HiEye, HiEyeOff,
//   HiCheckCircle, HiOutlineBadgeCheck, HiOutlineExclamationCircle,
// } from "react-icons/hi";
// import api from "../../api/axios";

// const SPRING = { type: "spring", stiffness: 320, damping: 28 };
// const EASE   = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

// function getInitials(firstName = "", lastName = "") {
//   return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "??";
// }

// function capitalize(str = "") {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

// function Magnetic({ children, strength = 0.25 }) {
//   const ref = useRef(null);
//   const x   = useMotionValue(0);
//   const y   = useMotionValue(0);
//   const sx  = useSpring(x, { stiffness: 200, damping: 20 });
//   const sy  = useSpring(y, { stiffness: 200, damping: 20 });
//   const move = (e) => {
//     const r = ref.current.getBoundingClientRect();
//     x.set((e.clientX - (r.left + r.width/2)) * strength);
//     y.set((e.clientY - (r.top  + r.height/2)) * strength);
//   };
//   return (
//     <motion.div ref={ref} style={{ x:sx, y:sy }}
//       onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0);}} className="inline-flex">
//       {children}
//     </motion.div>
//   );
// }

// function Toast({ msg, onDone }) {
//   useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
//   return (
//     <motion.div initial={{ y:-60, opacity:0, scale:0.92 }}
//       animate={{ y:0, opacity:1, scale:1 }} exit={{ y:-60, opacity:0, scale:0.92 }}
//       transition={SPRING}
//       className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5
//                  bg-white border border-emerald-200 shadow-2xl px-5 py-3 rounded-2xl
//                  text-sm font-bold text-gray-800 shadow-emerald-900/10">
//       <HiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
//       {msg}
//     </motion.div>
//   );
// }

// function Modal({ open, onClose, title, children }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div key="ov" initial={{ opacity:0 }} animate={{ opacity:1 }}
//             exit={{ opacity:0 }} transition={{ duration:0.2 }} onClick={onClose}
//             className="fixed inset-0 bg-black/30 backdrop-blur-md z-50" />
//           <motion.div key="mo" initial={{ opacity:0, scale:0.94, y:24 }}
//             animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94, y:24 }}
//             transition={SPRING}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             onClick={e=>e.stopPropagation()}>
//             <motion.div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
//               onClick={e=>e.stopPropagation()}>
//               <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
//                 <h2 className="text-base font-black text-gray-900 tracking-tight">{title}</h2>
//                 <motion.button whileHover={{ scale:1.12, rotate:90 }} whileTap={{ scale:0.9 }}
//                   transition={SPRING} onClick={onClose}
//                   className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
//                   <HiX className="w-4 h-4" />
//                 </motion.button>
//               </div>
//               <div className="px-6 py-5">{children}</div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// function Field({ label, type="text", value, onChange, placeholder, error, suffix }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
//       <div className="relative">
//         <input type={type} value={value} onChange={onChange} placeholder={placeholder}
//           className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none
//                       transition-all ${suffix?"pr-10":""}
//                       ${error ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200"
//                               : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1C52AF] focus:ring-2 focus:ring-[#1C52AF]/20"}`} />
//         {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
//       </div>
//       {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
//     </div>
//   );
// }

// function ModalActions({ onCancel, onConfirm, confirmLabel="Save", loading=false }) {
//   return (
//     <div className="flex gap-3 pt-2">
//       <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={onCancel}
//         disabled={loading}
//         className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold
//                    text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
//         Cancel
//       </motion.button>
//       <motion.button whileHover={{ scale:1.02, boxShadow:"0 8px 20px rgba(28,82,175,.35)" }}
//         whileTap={{ scale:0.97 }} onClick={onConfirm} disabled={loading}
//         className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-sm font-bold text-white
//                    shadow-md shadow-[#1C52AF]/30 disabled:opacity-60 flex items-center justify-center gap-2">
//         {loading && (
//           <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//           </svg>
//         )}
//         {confirmLabel}
//       </motion.button>
//     </div>
//   );
// }

// export default function ProfileSettings() {
//   const [ready,   setReady]   = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [fetchErr,setFetchErr]= useState(null);
//   const [toast,   setToast]   = useState("");
//   const [mod,     setMod]     = useState("");
//   const [err,     setErr]     = useState({});
//   const [saving,  setSaving]  = useState(false);

//   const notify = (m) => setToast(m);
//   const open   = (k) => { setMod(k); setErr({}); };
//   const close  = ()  => { setMod(""); setErr({}); };

//   useEffect(() => { requestAnimationFrame(() => setReady(true)); }, []);

//   // ── Profile state ──────────────────────────────────────────────────────────
//   const [raw, setRaw] = useState(null);
//   const [profile, setProfile] = useState({
//     id: "", firstName: "", lastName: "", email: "",
//     phoneNumber: "", address: "", city: "", state: "",
//     role: "", status: "", isEmailVerified: false, isVerified: false,
//     isActive: true, profileImage: null,
//   });
//   const [editBuf, setEditBuf] = useState({});

//   // Fetch profile
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const { data } = await api.get("/auth/profile");
//         const u = data.user ?? data;
//         setRaw(u);
//         setProfile({
//           id:              u.id              ?? "",
//           firstName:       u.firstName       ?? "",
//           lastName:        u.lastName        ?? "",
//           email:           u.email           ?? "",
//           phoneNumber:     u.phoneNumber     ?? "",
//           address:         u.address         ?? "",
//           city:            u.city            ?? "",
//           state:           u.state           ?? "",
//           role:            u.role            ?? "",
//           status:          u.status          ?? "",
//           isEmailVerified: u.isEmailVerified ?? false,
//           isVerified:      u.isVerified      ?? false,
//           isActive:        u.isActive        ?? true,
//           profileImage:    u.profileImage    ?? null,
//         });
//       } catch (e) {
//         setFetchErr(e?.response?.data?.message || e.message || "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const fullName = `${profile.firstName} ${profile.lastName}`.trim();
//   const initials = getInitials(profile.firstName, profile.lastName);
//   const location = [profile.address, capitalize(profile.city), profile.state?.toUpperCase()]
//     .filter(Boolean).join(", ");

//   // ── SAVE PROFILE via PUT /users/profile ───────────────────────────────────
//   const saveProfile = async () => {
//     const e = {};
//     if (!editBuf.firstName?.trim()) e.firstName = "First name is required";
//     if (!editBuf.lastName?.trim())  e.lastName  = "Last name is required";
//     if (!editBuf.email?.trim())     e.email     = "Email is required";
//     if (Object.keys(e).length) return setErr(e);

//     setSaving(true);
//     try {
//       const { data } = await api.put("/users/profile", {
//         firstName:   editBuf.firstName.trim(),
//         lastName:    editBuf.lastName.trim(),
//         email:       editBuf.email.trim(),
//         phoneNumber: editBuf.phoneNumber?.trim() || undefined,
//         address:     editBuf.address?.trim()     || undefined,
//         city:        editBuf.city?.trim()        || undefined,
//         state:       editBuf.state?.trim()       || undefined,
//       });

//       const u = data.user ?? data;
//       setRaw(u);
//       setProfile(prev => ({
//         ...prev,
//         id:              u.id              ?? prev.id,
//         firstName:       u.firstName       ?? prev.firstName,
//         lastName:        u.lastName        ?? prev.lastName,
//         email:           u.email           ?? prev.email,
//         phoneNumber:     u.phoneNumber     ?? prev.phoneNumber,
//         address:         u.address         ?? prev.address,
//         city:            u.city            ?? prev.city,
//         state:           u.state           ?? prev.state,
//         role:            u.role            ?? prev.role,
//         status:          u.status          ?? prev.status,
//         isEmailVerified: u.isEmailVerified ?? prev.isEmailVerified,
//         isVerified:      u.isVerified      ?? prev.isVerified,
//         isActive:        u.isActive        ?? prev.isActive,
//         profileImage:    u.profileImage    ?? prev.profileImage,
//       }));
//       close();
//       notify("Profile updated ✓");
//     } catch (err) {
//       setErr({ api: err?.response?.data?.message || err.message || "Failed to update profile." });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Addresses ─────────────────────────────────────────────────────────────
//   const [addrs, setAddrs] = useState([]);
//   const [addrBuf, setAddrBuf] = useState({ type:"Home", addr:"" });

//   useEffect(() => {
//     if (!profile.address) return;
//     setAddrs([{
//       id: 1,
//       type: "Home",
//       addr: location,
//       def: true,
//     }]);
//   }, [profile.address, profile.city, profile.state]);

//   const addAddr = () => {
//     if (!addrBuf.addr.trim()) return setErr({ addr:"Address is required" });
//     setAddrs(p=>[...p,{...addrBuf,id:Date.now(),def:false}]);
//     setAddrBuf({ type:"Home", addr:"" }); close(); notify("Address added ✓");
//   };
//   const delAddr = (id) => { setAddrs(p=>p.filter(a=>a.id!==id)); notify("Address removed"); };
//   const defAddr = (id) => setAddrs(p=>p.map(a=>({...a,def:a.id===id})));

//   // ── Vehicles ──────────────────────────────────────────────────────────────
//   const EMPTY_VEH = { brand:"", model:"", year:"", plateNumber:"", color:"", vin:"", mileage:"", engine:"" };
//   const [vehs,        setVehs]        = useState([]);
//   const [vehsLoading, setVehsLoading] = useState(true);
//   const [vehsErr,     setVehsErr]     = useState(null);
//   const [vehBuf,      setVehBuf]      = useState(EMPTY_VEH);
//   const [vehSaving,   setVehSaving]   = useState(false);

//   const statusTag = (s) => s === "active" ? "ok" : "warn";
//   const tagColor  = { ok:"text-emerald-600 bg-emerald-50", warn:"text-amber-600 bg-amber-50" };
//   const vehLabel  = (v) => [v.year, v.brand, v.model].filter(Boolean).join(" ");
//   const vehSub    = (v) => [v.color, v.plateNumber].filter(Boolean).join(" · ") || v.status;

//   useEffect(() => {
//     (async () => {
//       try {
//         setVehsLoading(true);
//         const { data } = await api.get("/vehicles");
//         setVehs(Array.isArray(data) ? data : []);
//       } catch (e) {
//         setVehsErr(e?.response?.data?.message || e.message || "Failed to load vehicles.");
//       } finally {
//         setVehsLoading(false);
//       }
//     })();
//   }, []);

//   const addVeh = async () => {
//     const e = {};
//     if (!vehBuf.brand.trim()) e.brand = "Brand is required";
//     if (!vehBuf.model.trim()) e.model = "Model is required";
//     if (!vehBuf.year)         e.year  = "Year is required";
//     if (Object.keys(e).length) return setErr(e);

//     const payload = {
//       brand:       vehBuf.brand.trim(),
//       model:       vehBuf.model.trim(),
//       year:        Number(vehBuf.year),
//       plateNumber: vehBuf.plateNumber.trim() || undefined,
//       color:       vehBuf.color.trim()       || undefined,
//       vin:         vehBuf.vin.trim()         || undefined,
//       mileage:     vehBuf.mileage ? Number(vehBuf.mileage) : undefined,
//       engine:      vehBuf.engine.trim()      || null,
//     };

//     try {
//       setVehSaving(true);
//       const { data } = await api.post("/vehicles", payload);
//       setVehs(prev => [...prev, data]);
//       setVehBuf(EMPTY_VEH);
//       close();
//       notify("Vehicle added ✓");
//     } catch (e) {
//       setErr({ vehApi: e?.response?.data?.message || e.message || "Could not add vehicle." });
//     } finally {
//       setVehSaving(false);
//     }
//   };

//   // ── Security / Password ───────────────────────────────────────────────────
//   const [pwd,       setPwd]       = useState({ cur:"", nw:"", cf:"" });
//   const [show,      setShow]      = useState({ cur:false, nw:false, cf:false });
//   const [pwdSaving, setPwdSaving] = useState(false);
//   const toggleShow = (k) => setShow(p=>({...p,[k]:!p[k]}));

//   const savePwd = async () => {
//     const e = {};
//     if (!pwd.cur.trim())   e.cur = "Current password is required";
//     if (pwd.nw.length < 8) e.nw  = "Min 8 characters";
//     if (pwd.nw !== pwd.cf) e.cf  = "Passwords don't match";
//     if (Object.keys(e).length) return setErr(e);

//     setPwdSaving(true);
//     try {
//       await api.post("/auth/change-password", {
//         currentPassword:     pwd.cur,
//         newPassword:         pwd.nw,
//         confirmNewPassword:  pwd.cf,
//       });
//       setPwd({ cur:"", nw:"", cf:"" });
//       close();
//       notify("Password updated ✓");
//     } catch (err) {
//       setErr({ api: err?.response?.data?.message || err.message || "Failed to update password." });
//     } finally {
//       setPwdSaving(false);
//     }
//   };

//   const wrap = { hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ staggerChildren:0.07 } } };
//   const card = { hidden:{ opacity:0, y:22 }, visible:{ opacity:1, y:0, transition:EASE } };

//   const EyeBtn = ({ k }) => (
//     <motion.button type="button" whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}
//       onClick={()=>toggleShow(k)} className="text-gray-400 hover:text-gray-700 transition-colors">
//       {show[k] ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
//     </motion.button>
//   );

//   // ── Loading / Error screens ───────────────────────────────────────────────
//   if (loading) return (
//     <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-3">
//         <svg className="animate-spin h-8 w-8 text-[#1C52AF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//         </svg>
//         <p className="text-sm font-bold text-gray-400">Loading profile…</p>
//       </div>
//     </div>
//   );

//   if (fetchErr) return (
//     <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
//       <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-8 max-w-sm w-full text-center space-y-3">
//         <HiOutlineExclamationCircle className="w-10 h-10 text-red-400 mx-auto" />
//         <p className="text-sm font-bold text-gray-800">Failed to load profile</p>
//         <p className="text-xs text-gray-500">{fetchErr}</p>
//         <button onClick={() => window.location.reload()}
//           className="mt-2 px-5 py-2 rounded-xl bg-[#1C52AF] text-white text-sm font-bold">
//           Retry
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <AnimatePresence>{toast && <Toast msg={toast} onDone={()=>setToast("")} />}</AnimatePresence>

//       <motion.div initial="hidden" animate={ready?"visible":"hidden"} variants={wrap}
//         className="min-h-screen bg-[#f5f6fa]">
//         <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

//           {/* HEADER */}
//           <motion.div variants={card}
//             className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100">
//             <div className="absolute inset-0 pointer-events-none"
//               style={{ background:"radial-gradient(ellipse at 75% 50%, rgba(28,82,175,.06) 0%, transparent 70%)" }} />
//             <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
//               style={{ background:"radial-gradient(circle, rgba(28,82,175,.07) 0%, transparent 70%)" }} />

//             <div className="relative px-6 pt-6 pb-7">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
//                 <motion.div whileHover={{ scale:1.06 }} transition={SPRING}
//                   className="relative shrink-0 cursor-pointer">
//                   {profile.profileImage ? (
//                     <img src={profile.profileImage} alt={fullName}
//                       className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg shadow-[#1C52AF]/20" />
//                   ) : (
//                     <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br
//                                     from-[#1C52AF] to-[#0e3480] flex items-center justify-center
//                                     text-white font-black text-2xl tracking-tight select-none
//                                     shadow-lg shadow-[#1C52AF]/30">
//                       {initials}
//                     </div>
//                   )}
//                   <motion.span animate={{ scale:[1,1.4,1] }}
//                     transition={{ duration:2.6, repeat:Infinity, ease:"easeInOut" }}
//                     className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400
//                                border-2 border-white rounded-full shadow-md" />
//                 </motion.div>

//                 <div className="flex-1 min-w-0">
//                   <motion.h1 key={fullName}
//                     initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={EASE}
//                     className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
//                     {fullName || "—"}
//                   </motion.h1>
//                   <motion.p key={profile.email}
//                     initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.05,...EASE }}
//                     className="text-sm text-gray-400 mt-0.5">{profile.email}
//                   </motion.p>
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {profile.role && (
//                       <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
//                         className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
//                                    text-xs font-bold bg-blue-50 text-[#1C52AF] border border-blue-200 capitalize">
//                         {profile.role}
//                       </motion.span>
//                     )}
//                     {profile.isEmailVerified ? (
//                       <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
//                         className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
//                                    text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
//                         <HiCheckCircle className="w-3 h-3" />Email Verified
//                       </motion.span>
//                     ) : (
//                       <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
//                         className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
//                                    text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
//                         <HiOutlineExclamationCircle className="w-3 h-3" />Email Unverified
//                       </motion.span>
//                     )}
//                     {profile.isVerified ? (
//                       <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
//                         className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
//                                    text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
//                         <HiOutlineBadgeCheck className="w-3 h-3" />Verified
//                       </motion.span>
//                     ) : (
//                       <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
//                         className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
//                                    text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
//                         Unverified
//                       </motion.span>
//                     )}
//                   </div>
//                 </div>

//                 <Magnetic>
//                   <motion.button
//                     whileHover={{ scale:1.04, boxShadow:"0 12px 28px rgba(28,82,175,.4)" }}
//                     whileTap={{ scale:0.96 }} transition={SPRING}
//                     onClick={()=>{ setEditBuf({ ...profile }); open("edit"); }}
//                     className="flex items-center gap-2 bg-[#1C52AF] text-white
//                                px-5 py-2.5 rounded-xl text-sm font-bold
//                                shadow-md shadow-[#1C52AF]/30">
//                     <HiPencil className="w-4 h-4" />Edit Profile
//                   </motion.button>
//                 </Magnetic>
//               </div>
//             </div>
//           </motion.div>

//           {/* GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-5">

//               {/* Personal Info */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
//                 className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
//                 <div className="flex items-center gap-2.5 mb-5">
//                   <span className="p-2 rounded-xl bg-blue-50">
//                     <HiOutlineUser className="w-4 h-4 text-[#1C52AF]" />
//                   </span>
//                   <h2 className="text-sm font-black text-gray-900 tracking-tight">Personal Info</h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {[
//                     { label:"First Name",   value: profile.firstName,   icon: HiOutlineUser          },
//                     { label:"Last Name",    value: profile.lastName,    icon: HiOutlineUser          },
//                     { label:"Email",        value: profile.email,       icon: HiOutlineMail          },
//                     { label:"Phone",        value: profile.phoneNumber, icon: HiOutlinePhone         },
//                     { label:"Address",      value: location,            icon: HiOutlineLocationMarker},
//                   ].map((item,i)=>(
//                     <motion.div key={item.label}
//                       initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
//                       transition={{ delay:0.1+i*0.06,...EASE }}
//                       whileHover={{ backgroundColor:"#f8f9ff", x:2 }}
//                       className={`p-4 rounded-2xl border border-gray-100 cursor-default transition-colors
//                                   ${item.label === "Address" ? "sm:col-span-2" : ""}`}>
//                       <div className="flex items-center gap-1.5 mb-1.5">
//                         <item.icon className="w-3.5 h-3.5 text-gray-400" />
//                         <span className="text-[10px] uppercase tracking-[.12em] font-black text-gray-400">
//                           {item.label}
//                         </span>
//                       </div>
//                       <motion.p key={item.value}
//                         initial={{ opacity:0 }} animate={{ opacity:1 }} transition={EASE}
//                         className="text-sm font-bold text-gray-900">{item.value || "—"}
//                       </motion.p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Addresses */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
//                 className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
//                 <div className="flex justify-between items-center mb-5">
//                   <div className="flex items-center gap-2.5">
//                     <span className="p-2 rounded-xl bg-blue-50">
//                       <HiOutlineHome className="w-4 h-4 text-[#1C52AF]" />
//                     </span>
//                     <h2 className="text-sm font-black text-gray-900 tracking-tight">Addresses</h2>
//                   </div>
//                   <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
//                     transition={SPRING}
//                     onClick={()=>{ setAddrBuf({type:"Home",addr:""}); open("addr"); }}
//                     className="flex items-center gap-1.5 text-[#1C52AF] text-xs font-bold
//                                bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors">
//                     <HiOutlinePlus className="w-3.5 h-3.5" />Add
//                   </motion.button>
//                 </div>
//                 <AnimatePresence mode="popLayout">
//                   {addrs.length === 0 && (
//                     <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
//                       className="text-center text-sm text-gray-400 py-6">No addresses yet.</motion.p>
//                   )}
//                   {addrs.map(a=>(
//                     <motion.div key={a.id} layout
//                       initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
//                       exit={{ opacity:0, x:-30, transition:{ duration:.2 } }} transition={SPRING}
//                       whileHover={{ x:4 }} onClick={()=>defAddr(a.id)}
//                       className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer
//                                   transition-colors mb-2 last:mb-0
//                                   ${a.def ? "bg-blue-50/60 border-[#1C52AF]/25"
//                                           : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}>
//                       <HiOutlineHome className={`w-4 h-4 mt-0.5 shrink-0 ${a.def?"text-[#1C52AF]":"text-gray-400"}`} />
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-0.5">
//                           <span className="text-sm font-bold text-gray-900">{a.type}</span>
//                           {a.def && (
//                             <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={SPRING}
//                               className="px-2 py-0.5 bg-[#1C52AF] text-white
//                                          text-[9px] font-black rounded-md uppercase tracking-wide">
//                               Default
//                             </motion.span>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">{a.addr}</p>
//                       </div>
//                       <motion.button whileHover={{ scale:1.15 }} whileTap={{ scale:.9 }}
//                         transition={SPRING}
//                         onClick={e=>{ e.stopPropagation(); delAddr(a.id); }}
//                         className="text-gray-300 hover:text-red-500 transition-colors p-1">
//                         <HiX className="w-3.5 h-3.5" />
//                       </motion.button>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>

//               {/* Map */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.09)" }} transition={SPRING}
//                 className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-40 sm:h-50">
//                 <iframe title="location-map" loading="lazy" className="w-full h-full border-0"
//                   src={`https://maps.google.com/maps?q=${encodeURIComponent(location || "Nigeria")}&t=&z=13&ie=UTF8&iwloc=&output=embed`} />
//               </motion.div>
//             </div>

//             {/* RIGHT */}
//             <div className="space-y-5">

//               {/* Vehicles */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
//                 className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
//                 <div className="flex justify-between items-center mb-5">
//                   <div className="flex items-center gap-2.5">
//                     <span className="p-2 rounded-xl bg-blue-50">
//                       <HiOutlineTruck className="w-4 h-4 text-[#1C52AF]" />
//                     </span>
//                     <h2 className="text-sm font-black text-gray-900 tracking-tight">Vehicles</h2>
//                   </div>
//                   <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
//                     transition={SPRING} onClick={()=>open("viewVeh")}
//                     className="text-xs text-[#1C52AF] font-bold hover:underline underline-offset-2">
//                     View All
//                   </motion.button>
//                 </div>
//                 <div className="space-y-2">
//                   {vehsLoading && (
//                     <div className="flex items-center justify-center py-4 gap-2 text-gray-400">
//                       <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                       </svg>
//                       <span className="text-xs font-bold">Loading…</span>
//                     </div>
//                   )}
//                   {!vehsLoading && vehsErr && (
//                     <p className="text-xs text-red-500 font-semibold text-center py-2">{vehsErr}</p>
//                   )}
//                   {!vehsLoading && !vehsErr && vehs.length === 0 && (
//                     <p className="text-xs text-gray-400 text-center py-4">No vehicles yet.</p>
//                   )}
//                   {!vehsLoading && vehs.slice(0,2).map((v,i)=>(
//                     <motion.div key={v.id}
//                       initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
//                       transition={{ delay:i*.06,...EASE }}
//                       whileHover={{ x:4, backgroundColor:"#f8f9ff" }} transition={SPRING}
//                       className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100
//                                  hover:border-blue-100 cursor-pointer transition-colors">
//                       <span className="p-1.5 rounded-lg bg-blue-50">
//                         <HiOutlineTruck className="w-3.5 h-3.5 text-[#1C52AF]" />
//                       </span>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-bold text-gray-900 truncate">{vehLabel(v)}</p>
//                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor[statusTag(v.status)]}`}>
//                           {vehSub(v)}
//                         </span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//                 <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:.98 }} transition={SPRING}
//                   onClick={()=>{ setVehBuf(EMPTY_VEH); open("veh"); }}
//                   className="w-full mt-4 flex items-center justify-center gap-2 py-2.5
//                              border-2 border-dashed border-gray-200 rounded-2xl
//                              text-xs font-bold text-gray-400
//                              hover:border-[#1C52AF] hover:text-[#1C52AF] hover:bg-blue-50/50 transition-all">
//                   <HiOutlinePlus className="w-3.5 h-3.5" />Add Vehicle
//                 </motion.button>
//               </motion.div>

//               {/* Completeness */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 20px 40px rgba(28,82,175,.3)" }} transition={SPRING}
//                 className="relative overflow-hidden bg-gradient-to-br from-[#1C52AF] to-[#0e3480]
//                            rounded-3xl shadow-lg shadow-[#1C52AF]/20 p-6 text-white">
//                 {[140,100].map((s,i)=>(
//                   <motion.div key={i}
//                     animate={{ rotate: i%2===0?360:-360 }}
//                     transition={{ duration:24-i*6, repeat:Infinity, ease:"linear" }}
//                     className="absolute rounded-full border border-white/[.07] pointer-events-none"
//                     style={{ width:s, height:s, top:"50%", right:"-10%",
//                              transform:`translate(0,-50%) rotate(${i*30}deg)` }} />
//                 ))}
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-2 mb-3">
//                     <HiOutlineCheck className="w-4 h-4" />
//                     <h2 className="text-sm font-black tracking-tight">Profile</h2>
//                   </div>
//                   <p className="text-xs text-blue-200 mb-5 leading-relaxed">
//                     {profile.isEmailVerified && profile.isVerified
//                       ? "Your profile is fully verified and active."
//                       : "Complete verification to unlock all features."}
//                   </p>
//                   <div className="flex items-center gap-3 mb-1.5">
//                     <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
//                       <motion.div initial={{ width:0 }}
//                         animate={{ width: profile.isEmailVerified && profile.isVerified ? "100%" : profile.isEmailVerified ? "60%" : "30%" }}
//                         transition={{ duration:1.4, ease:[.22,1,.36,1], delay:.6 }}
//                         className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full" />
//                     </div>
//                     <span className="text-xs font-black text-white/90">
//                       {profile.isEmailVerified && profile.isVerified ? "100%" : profile.isEmailVerified ? "60%" : "30%"}
//                     </span>
//                   </div>
//                   <p className="text-[10px] text-blue-300 font-bold mb-4">
//                     {!profile.isEmailVerified ? "Verify your email to continue" : !profile.isVerified ? "Awaiting account verification" : "All checks passed"}
//                   </p>
//                   {(!profile.isEmailVerified || !profile.isVerified) && (
//                     <Magnetic strength={0.15}>
//                       <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
//                         transition={SPRING}
//                         className="w-full bg-white text-[#1C52AF] py-3 rounded-xl
//                                    text-xs font-black shadow-lg shadow-black/20 p-2">
//                         {!profile.isEmailVerified ? "Verify Email" : "Complete Profile"}
//                       </motion.button>
//                     </Magnetic>
//                   )}
//                 </div>
//               </motion.div>

//               {/* Security */}
//               <motion.div variants={card}
//                 whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
//                 className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
//                 <div className="flex items-center gap-2.5 mb-4">
//                   <span className="p-2 rounded-xl bg-red-50">
//                     <HiOutlineShieldCheck className="w-4 h-4 text-red-500" />
//                   </span>
//                   <h2 className="text-sm font-black text-gray-900 tracking-tight">Security</h2>
//                 </div>
//                 <div className="space-y-1">
//                   {[
//                     { icon:HiOutlineLockClosed,  label:"Password",     badge:null },
//                     { icon:HiOutlineShieldCheck, label:"2-Factor Auth", badge:"On" },
//                   ].map(item=>(
//                     <motion.button key={item.label}
//                       whileHover={{ x:4, backgroundColor:"#f8f9ff" }} whileTap={{ scale:.98 }}
//                       transition={SPRING} onClick={()=>open("sec")}
//                       className="w-full flex items-center gap-3 p-3 rounded-2xl text-left
//                                  hover:bg-gray-50 cursor-pointer transition-colors">
//                       <item.icon className="w-4 h-4 text-gray-500 shrink-0" />
//                       <span className="flex-1 text-sm font-bold text-gray-800">{item.label}</span>
//                       {item.badge && (
//                         <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={SPRING}
//                           className="px-2 py-0.5 bg-emerald-50 text-emerald-600
//                                      text-[9px] font-black rounded-md uppercase tracking-wide">
//                           {item.badge}
//                         </motion.span>
//                       )}
//                       <HiOutlineChevronRight className="w-3.5 h-3.5 text-gray-300" />
//                     </motion.button>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* ── MODALS ───────────────────────────────────────────────────────────── */}

//       {/* Edit Profile */}
//       <Modal open={mod==="edit"} onClose={close} title="Edit Profile">
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="First Name" value={editBuf.firstName ?? ""}
//               onChange={e=>setEditBuf(p=>({...p,firstName:e.target.value}))}
//               placeholder="First name" error={err.firstName} />
//             <Field label="Last Name" value={editBuf.lastName ?? ""}
//               onChange={e=>setEditBuf(p=>({...p,lastName:e.target.value}))}
//               placeholder="Last name" error={err.lastName} />
//           </div>
//           <Field label="Email" type="email" value={editBuf.email ?? ""}
//             onChange={e=>setEditBuf(p=>({...p,email:e.target.value}))}
//             placeholder="you@example.com" error={err.email} />
//           <Field label="Phone" type="tel" value={editBuf.phoneNumber ?? ""}
//             onChange={e=>setEditBuf(p=>({...p,phoneNumber:e.target.value}))}
//             placeholder="+234 800 000 0000" />
//           <Field label="Address" value={editBuf.address ?? ""}
//             onChange={e=>setEditBuf(p=>({...p,address:e.target.value}))}
//             placeholder="Street address" />
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="City" value={editBuf.city ?? ""}
//               onChange={e=>setEditBuf(p=>({...p,city:e.target.value}))}
//               placeholder="City" />
//             <Field label="State" value={editBuf.state ?? ""}
//               onChange={e=>setEditBuf(p=>({...p,state:e.target.value}))}
//               placeholder="State" />
//           </div>

//           {err.api && (
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
//               <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
//               <p className="text-xs text-red-600 font-semibold">{err.api}</p>
//             </div>
//           )}

//           <ModalActions onCancel={close} onConfirm={saveProfile}
//             confirmLabel="Save Changes" loading={saving} />
//         </div>
//       </Modal>

//       {/* Add Address */}
//       <Modal open={mod==="addr"} onClose={close} title="Add Address">
//         <div className="space-y-4">
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</label>
//             <select value={addrBuf.type} onChange={e=>setAddrBuf(p=>({...p,type:e.target.value}))}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
//                          text-sm font-medium outline-none focus:border-[#1C52AF]
//                          focus:ring-2 focus:ring-[#1C52AF]/20 transition-all">
//               {["Home","Office","Other"].map(o=><option key={o}>{o}</option>)}
//             </select>
//           </div>
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Address</label>
//             <textarea rows={3} value={addrBuf.addr}
//               onChange={e=>setAddrBuf(p=>({...p,addr:e.target.value}))}
//               placeholder="Enter full address"
//               className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none
//                           resize-none transition-all
//                           ${err.addr ? "border-red-300 bg-red-50"
//                                      : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1C52AF] focus:ring-2 focus:ring-[#1C52AF]/20"}`} />
//             {err.addr && <p className="text-xs text-red-500 font-semibold">{err.addr}</p>}
//           </div>
//           <ModalActions onCancel={close} onConfirm={addAddr} confirmLabel="Add Address" />
//         </div>
//       </Modal>

//       {/* Add Vehicle */}
//       <Modal open={mod==="veh"} onClose={()=>{ setVehBuf(EMPTY_VEH); close(); }} title="Add Vehicle">
//         <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="Brand *" value={vehBuf.brand}
//               onChange={e=>setVehBuf(p=>({...p,brand:e.target.value}))}
//               placeholder="e.g. Toyota" error={err.brand} />
//             <Field label="Model *" value={vehBuf.model}
//               onChange={e=>setVehBuf(p=>({...p,model:e.target.value}))}
//               placeholder="e.g. Camry" error={err.model} />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="Year *" type="number" value={vehBuf.year}
//               onChange={e=>setVehBuf(p=>({...p,year:e.target.value}))}
//               placeholder="2020" error={err.year} />
//             <Field label="Color" value={vehBuf.color}
//               onChange={e=>setVehBuf(p=>({...p,color:e.target.value}))}
//               placeholder="e.g. Silver" />
//           </div>
//           <Field label="Plate Number" value={vehBuf.plateNumber}
//             onChange={e=>setVehBuf(p=>({...p,plateNumber:e.target.value}))}
//             placeholder="e.g. ABC-1234" />
//           <Field label="VIN" value={vehBuf.vin}
//             onChange={e=>setVehBuf(p=>({...p,vin:e.target.value}))}
//             placeholder="17-character VIN" />
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="Mileage (km)" type="number" value={vehBuf.mileage}
//               onChange={e=>setVehBuf(p=>({...p,mileage:e.target.value}))}
//               placeholder="e.g. 15000" />
//             <Field label="Engine" value={vehBuf.engine}
//               onChange={e=>setVehBuf(p=>({...p,engine:e.target.value}))}
//               placeholder="e.g. 2.5L V6" />
//           </div>
//           {err.vehApi && (
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
//               <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
//               <p className="text-xs text-red-600 font-semibold">{err.vehApi}</p>
//             </div>
//           )}
//         </div>
//         <div className="pt-4">
//           <ModalActions onCancel={()=>{ setVehBuf(EMPTY_VEH); close(); }}
//             onConfirm={addVeh} confirmLabel="Add Vehicle" loading={vehSaving} />
//         </div>
//       </Modal>

//       {/* View All Vehicles */}
//       <Modal open={mod==="viewVeh"} onClose={close} title={`All Vehicles (${vehs.length})`}>
//         <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
//           {vehs.length === 0 && (
//             <p className="text-center text-sm text-gray-400 py-6">No vehicles registered yet.</p>
//           )}
//           <AnimatePresence>
//             {vehs.map((v,i)=>(
//               <motion.div key={v.id}
//                 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
//                 transition={{ delay:i*.04,...EASE }}
//                 whileHover={{ x:4, backgroundColor:"#f8f9ff" }} transition={SPRING}
//                 className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100
//                            hover:border-blue-100 cursor-pointer transition-colors">
//                 <span className="p-1.5 rounded-lg bg-blue-50">
//                   <HiOutlineTruck className="w-3.5 h-3.5 text-[#1C52AF]" />
//                 </span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-bold text-gray-900">{vehLabel(v)}</p>
//                   <div className="flex items-center gap-2 mt-0.5">
//                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor[statusTag(v.status)]}`}>
//                       {v.status}
//                     </span>
//                     {v.plateNumber && (
//                       <span className="text-[10px] text-gray-400 font-semibold">{v.plateNumber}</span>
//                     )}
//                     {v.mileage != null && (
//                       <span className="text-[10px] text-gray-400 font-semibold">{v.mileage.toLocaleString()} km</span>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </Modal>

//       {/* Security Settings */}
//       <Modal open={mod==="sec"} onClose={close} title="Security Settings">
//         <div className="space-y-5">
//           <div>
//             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
//               Change Password
//             </p>
//             <div className="space-y-3">
//               <Field label="Current Password" type={show.cur?"text":"password"}
//                 value={pwd.cur} onChange={e=>setPwd(p=>({...p,cur:e.target.value}))}
//                 placeholder="••••••••" error={err.cur} suffix={<EyeBtn k="cur" />} />
//               <Field label="New Password" type={show.nw?"text":"password"}
//                 value={pwd.nw} onChange={e=>setPwd(p=>({...p,nw:e.target.value}))}
//                 placeholder="Min 8 characters" error={err.nw} suffix={<EyeBtn k="nw" />} />
//               <Field label="Confirm Password" type={show.cf?"text":"password"}
//                 value={pwd.cf} onChange={e=>setPwd(p=>({...p,cf:e.target.value}))}
//                 placeholder="Repeat new password" error={err.cf} suffix={<EyeBtn k="cf" />} />
//             </div>
//           </div>

//           {err.api && (
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
//               <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
//               <p className="text-xs text-red-600 font-semibold">{err.api}</p>
//             </div>
//           )}

//           <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
//             <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm font-bold text-emerald-800">2-Factor Auth is ON</p>
//               <p className="text-xs text-emerald-700 mt-0.5">
//                 Your account is secured with an authenticator app.
//               </p>
//             </div>
//           </div>

//           <ModalActions 
//             onCancel={close} 
//             onConfirm={savePwd} 
//             confirmLabel="Update Password" 
//             loading={pwdSaving} 
//           />
//         </div>
//       </Modal>
//     </>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import api from "../../api/axios";

// --- Icons ---
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CameraIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PencilIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const AlertCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-white/80 text-slate-700 border border-white/50",
    success: "bg-emerald-100/80 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-100/80 text-amber-700 border border-amber-200",
    primary: "bg-indigo-100/80 text-indigo-700 border border-indigo-200",
    purple: "bg-purple-100/80 text-purple-700 border border-purple-200",
    rose: "bg-rose-100/80 text-rose-700 border border-rose-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

const InputField = ({ label, name, value, onChange, error, type = "text", icon: Icon, disabled = false, required = false, placeholder }) => (
  <div className="space-y-1.5 group">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 group-focus-within:text-indigo-500 transition-colors">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 ${error ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500" : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"} ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 text-sm bg-white text-slate-800 placeholder-slate-400 transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-400 hover:border-slate-300`}
      />
    </div>
    {error && (
      <p className="text-xs text-rose-600 font-medium flex items-center gap-1 animate-pulse">
        <AlertCircleIcon className="h-3 w-3" /> {error}
      </p>
    )}
  </div>
);

const VerificationBanner = ({ isEmailVerified, isVerified }) => {
  if (isEmailVerified && isVerified) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-0.5 mb-8 shadow-lg shadow-amber-500/20">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-[14px] p-5 flex items-start gap-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <AlertCircleIcon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-800">Account Verification Pending</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {!isEmailVerified
              ? "Please verify your email address to unlock all features."
              : "Your account is under review. You'll be notified once verified."}
          </p>
        </div>
        {!isEmailVerified && (
          <button className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95">
            Resend Email
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Profile Page ---

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/auth/profile");
      setProfile(response.data);
      setFormData(response.data);
      setImagePreview(response.data.profileImage);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    if (vehicles.length > 0) return;
    try {
      setViclesLoading(true);
      const response = await api.get("/vehicles");
      setVehicles(response.data || []);
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
    } finally {
      setVehiclesLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "vehicles") fetchVehicles();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFormErrors((prev) => ({ ...prev, profileImage: "Please select an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, profileImage: "Image must be less than 5MB" }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.profileImage;
      return next;
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName?.trim()) errors.firstName = "First name is required";
    if (!formData.lastName?.trim()) errors.lastName = "Last name is required";
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = "Phone number is required";
    if (!formData.state?.trim()) errors.state = "State is required";
    if (!formData.city?.trim()) errors.city = "City is required";
    if (!formData.address?.trim()) errors.address = "Address is required";

    const phoneRegex = /^(\+234|0)[7-9][0-1][0-9]{8}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\s/g, ""))) {
      errors.phoneNumber = "Enter a valid Nigerian phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setSaving(true);
      setError(null);
      let payload = { ...formData };
      if (imageFile) {
        payload = new FormData();
        Object.keys(formData).forEach((key) => payload.append(key, formData[key]));
        payload.append("profileImage", imageFile);
      }
      const response = await api.patch("/auth/profile", payload, {
        headers: imageFile ? { "Content-Type": "multipart/form-data" } : {},
      });
      setProfile(response.data);
      setFormData(response.data);
      setImagePreview(response.data.profileImage);
      setImageFile(null);
      setIsEditing(false);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setImagePreview(profile?.profileImage);
    setImageFile(null);
    setFormErrors({});
    setIsEditing(false);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to remove this vehicle?")) return;
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    } catch (err) {
      alert("Failed to delete vehicle");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-spin flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30">
            <AlertCircleIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Failed to load profile</h2>
          <button onClick={fetchProfile} className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-1 bg-white/60 rounded-full"></div>
                <span className="text-white/80 text-sm font-medium tracking-wider uppercase">My Account</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Profile Settings
              </h1>
              <p className="text-white/70 mt-2 text-base">Manage your personal information and vehicles</p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl text-sm font-semibold text-white hover:bg-white/25 transition-all active:scale-95 shadow-lg"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-semibold text-white hover:bg-white/20 transition-all active:scale-95"
                  >
                    <XIcon className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95 disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-20">
        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-2xl bg-rose-50 border-2 border-rose-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
              <AlertCircleIcon className="h-4 w-4 text-rose-600" />
            </div>
            <p className="text-sm font-medium text-rose-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-4 flex items-center gap-3 shadow-sm animate-in slide-in-from-top-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-emerald-700">{success}</p>
          </div>
        )}

        <VerificationBanner isEmailVerified={profile.isEmailVerified} isVerified={profile.isVerified} />

        {/* Glass Tab Bar */}
        <div className="mb-8 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 p-1.5 inline-flex">
          {[
            { id: "profile", label: "Profile Details", icon: UserIcon },
            { id: "vehicles", label: "My Vehicles", icon: CarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Profile Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-white/80">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="absolute top-0 left-0 right-0 h-32 opacity-30 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020l2.83%202.83-1.41%201.41L20%2021.41l-2.83%202.83-1.41-1.41L18.59%2020l-2.83-2.83%201.41-1.41L20%2018.59z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>

              <div className="relative px-8 pt-16 pb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                  {/* Avatar */}
                  <div className="relative group">
                    <div
                      onClick={handleImageClick}
                      className={`h-28 w-28 rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${isEditing ? "cursor-pointer ring-4 ring-indigo-500/30 ring-offset-2 ring-offset-white" : ""} transition-all`}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <UserIcon className="h-14 w-14 text-slate-300" />
                      )}
                    </div>
                    {isEditing && (
                      <div
                        onClick={handleImageClick}
                        className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <CameraIcon className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* Name & Badges */}
                  <div className="text-center sm:text-left flex-1 mb-1">
                    <h2 className="text-2xl font-extrabold text-slate-800">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                      <Badge variant={profile.role === "provider" ? "purple" : "primary"}>
                        {profile.role === "provider" ? "Service Provider" : "Customer"}
                      </Badge>
                      {profile.isVerified ? (
                        <Badge variant="success">
                          <ShieldCheckIcon className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning">Unverified</Badge>
                      )}
                      {profile.isEmailVerified && (
                        <Badge variant="primary">
                          <StarIcon className="h-3 w-3" /> Email Confirmed
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex gap-4">
                    <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-lg font-extrabold text-indigo-600">NG</p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Country</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-lg font-extrabold text-purple-600">{profile.state?.slice(0, 3)}</p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">State</p>
                    </div>
                  </div>
                </div>

                {formErrors.profileImage && (
                  <p className="text-xs text-rose-600 font-medium mt-3 text-center sm:text-left">{formErrors.profileImage}</p>
                )}
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-white/80 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                    <p className="text-sm text-slate-500">Your basic contact details</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={formErrors.firstName}
                    icon={UserIcon}
                    disabled={!isEditing}
                    required
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={formErrors.lastName}
                    icon={UserIcon}
                    disabled={!isEditing}
                    required
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={MailIcon}
                    disabled={true}
                  />
                  <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={formErrors.phoneNumber}
                    icon={PhoneIcon}
                    disabled={!isEditing}
                    required
                    placeholder="+2347032090989"
                  />
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-white/80 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <MapPinIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Location Details</h3>
                    <p className="text-sm text-slate-500">Where you're based for service matching</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={formErrors.state}
                    icon={MapPinIcon}
                    disabled={!isEditing}
                    required
                  />
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city}
                    icon={MapPinIcon}
                    disabled={!isEditing}
                    required
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={formErrors.address}
                      icon={MapPinIcon}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colorful Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <MailIcon className="h-8 w-8 text-white/80 mb-3" />
                <p className="text-sm font-medium text-white/70">Email Status</p>
                <p className="text-lg font-bold mt-1">{profile.isEmailVerified ? "Verified" : "Pending"}</p>
                <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${profile.isEmailVerified ? "bg-white/20" : "bg-white/20"}`}>
                  <div className={`h-2 w-2 rounded-full ${profile.isEmailVerified ? "bg-emerald-300" : "bg-amber-300"}`}></div>
                  {profile.isEmailVerified ? "Active" : "Action Needed"}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <ShieldCheckIcon className="h-8 w-8 text-white/80 mb-3" />
                <p className="text-sm font-medium text-white/70">Account Status</p>
                <p className="text-lg font-bold mt-1">{profile.isVerified ? "Verified" : "Under Review"}</p>
                <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20`}>
                  <div className={`h-2 w-2 rounded-full ${profile.isVerified ? "bg-emerald-300" : "bg-amber-300"}`}></div>
                  {profile.isVerified ? "All Good" : "Pending"}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white shadow-lg shadow-pink-500/20 relative overflow-hidden group hover:shadow-xl hover:shadow-pink-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <SparklesIcon className="h-8 w-8 text-white/80 mb-3" />
                <p className="text-sm font-medium text-white/70">Account Type</p>
                <p className="text-lg font-bold mt-1 capitalize">{profile.role}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                  <StarIcon className="h-3 w-3" />
                  Premium
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">My Vehicles</h2>
                <p className="text-sm text-slate-500 mt-1">Manage vehicles for service bookings</p>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95">
                <PlusIcon className="h-5 w-5" />
                Add Vehicle
              </button>
            </div>

            {vehiclesLoading ? (
              <div className="flex justify-center py-16">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-spin flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="rounded-3xl bg-white border-2 border-dashed border-slate-200 p-16 text-center shadow-sm">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6">
                  <CarIcon className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">No vehicles added yet</h3>
                <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm mx-auto">Add your first vehicle to start booking auto repair services with verified mechanics</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95">
                  <PlusIcon className="h-5 w-5" />
                  Add Your First Vehicle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="group rounded-3xl bg-white border border-slate-100 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                          <CarIcon className="h-7 w-7 text-indigo-500" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-800">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h4>
                          <p className="text-sm text-slate-500 font-mono mt-0.5">{vehicle.registrationNumber || "No plate"}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">VIN</p>
                        <p className="text-sm font-semibold text-slate-700 font-mono mt-1">{vehicle.vin || "N/A"}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: vehicle.color || "#cbd5e1" }}
                          />
                          <p className="text-sm font-semibold text-slate-700 capitalize">{vehicle.color || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}