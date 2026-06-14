import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import {
  HiPencil, HiOutlineTruck, HiOutlinePlus, HiOutlineLockClosed,
  HiOutlineShieldCheck, HiOutlineHome, HiOutlineChevronRight,
  HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone,
  HiOutlineUser, HiOutlineCheck, HiX, HiEye, HiEyeOff,
  HiCheckCircle, HiOutlineBadgeCheck, HiOutlineExclamationCircle,
} from "react-icons/hi";
import api from "../../api/axios";

const SPRING = { type: "spring", stiffness: 320, damping: 28 };
const EASE   = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

function getInitials(firstName = "", lastName = "") {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "??";
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 200, damping: 20 });
  const sy  = useSpring(y, { stiffness: 200, damping: 20 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width/2)) * strength);
    y.set((e.clientY - (r.top  + r.height/2)) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x:sx, y:sy }}
      onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0);}} className="inline-flex">
      {children}
    </motion.div>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <motion.div initial={{ y:-60, opacity:0, scale:0.92 }}
      animate={{ y:0, opacity:1, scale:1 }} exit={{ y:-60, opacity:0, scale:0.92 }}
      transition={SPRING}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5
                 bg-white border border-emerald-200 shadow-2xl px-5 py-3 rounded-2xl
                 text-sm font-bold text-gray-800 shadow-emerald-900/10">
      <HiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
      {msg}
    </motion.div>
  );
}

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="ov" initial={{ opacity:0 }} animate={{ opacity:1 }}
            exit={{ opacity:0 }} transition={{ duration:0.2 }} onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-50" />
          <motion.div key="mo" initial={{ opacity:0, scale:0.94, y:24 }}
            animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94, y:24 }}
            transition={SPRING}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e=>e.stopPropagation()}>
            <motion.div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
              onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <h2 className="text-base font-black text-gray-900 tracking-tight">{title}</h2>
                <motion.button whileHover={{ scale:1.12, rotate:90 }} whileTap={{ scale:0.9 }}
                  transition={SPRING} onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
                  <HiX className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="px-6 py-5">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, type="text", value, onChange, placeholder, error, suffix }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none
                      transition-all ${suffix?"pr-10":""}
                      ${error ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1C52AF] focus:ring-2 focus:ring-[#1C52AF]/20"}`} />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
      {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
    </div>
  );
}

function ModalActions({ onCancel, onConfirm, confirmLabel="Save", loading=false }) {
  return (
    <div className="flex gap-3 pt-2">
      <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={onCancel}
        disabled={loading}
        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold
                   text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
        Cancel
      </motion.button>
      <motion.button whileHover={{ scale:1.02, boxShadow:"0 8px 20px rgba(28,82,175,.35)" }}
        whileTap={{ scale:0.97 }} onClick={onConfirm} disabled={loading}
        className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-sm font-bold text-white
                   shadow-md shadow-[#1C52AF]/30 disabled:opacity-60 flex items-center justify-center gap-2">
        {loading && (
          <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        )}
        {confirmLabel}
      </motion.button>
    </div>
  );
}

export default function ProfileSettings() {
  const [ready,   setReady]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchErr,setFetchErr]= useState(null);
  const [toast,   setToast]   = useState("");
  const [mod,     setMod]     = useState("");
  const [err,     setErr]     = useState({});
  const [saving,  setSaving]  = useState(false);

  const notify = (m) => setToast(m);
  const open   = (k) => { setMod(k); setErr({}); };
  const close  = ()  => { setMod(""); setErr({}); };

  useEffect(() => { requestAnimationFrame(() => setReady(true)); }, []);

  // ── Profile state ──────────────────────────────────────────────────────────
  const [raw, setRaw] = useState(null);
  const [profile, setProfile] = useState({
    id: "", firstName: "", lastName: "", email: "",
    phoneNumber: "", address: "", city: "", state: "",
    role: "", status: "", isEmailVerified: false, isVerified: false,
    isActive: true, profileImage: null,
  });
  const [editBuf, setEditBuf] = useState({});

  // Fetch profile
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/auth/profile");
        const u = data.user ?? data;
        setRaw(u);
        setProfile({
          id:              u.id              ?? "",
          firstName:       u.firstName       ?? "",
          lastName:        u.lastName        ?? "",
          email:           u.email           ?? "",
          phoneNumber:     u.phoneNumber     ?? "",
          address:         u.address         ?? "",
          city:            u.city            ?? "",
          state:           u.state           ?? "",
          role:            u.role            ?? "",
          status:          u.status          ?? "",
          isEmailVerified: u.isEmailVerified ?? false,
          isVerified:      u.isVerified      ?? false,
          isActive:        u.isActive        ?? true,
          profileImage:    u.profileImage    ?? null,
        });
      } catch (e) {
        setFetchErr(e?.response?.data?.message || e.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const initials = getInitials(profile.firstName, profile.lastName);
  const location = [profile.address, capitalize(profile.city), profile.state?.toUpperCase()]
    .filter(Boolean).join(", ");

  // ── SAVE PROFILE via PUT /users/profile ───────────────────────────────────
  const saveProfile = async () => {
    const e = {};
    if (!editBuf.firstName?.trim()) e.firstName = "First name is required";
    if (!editBuf.lastName?.trim())  e.lastName  = "Last name is required";
    if (!editBuf.email?.trim())     e.email     = "Email is required";
    if (Object.keys(e).length) return setErr(e);

    setSaving(true);
    try {
      const { data } = await api.put("/users/profile", {
        firstName:   editBuf.firstName.trim(),
        lastName:    editBuf.lastName.trim(),
        email:       editBuf.email.trim(),
        phoneNumber: editBuf.phoneNumber?.trim() || undefined,
        address:     editBuf.address?.trim()     || undefined,
        city:        editBuf.city?.trim()        || undefined,
        state:       editBuf.state?.trim()       || undefined,
      });

      const u = data.user ?? data;
      setRaw(u);
      setProfile(prev => ({
        ...prev,
        id:              u.id              ?? prev.id,
        firstName:       u.firstName       ?? prev.firstName,
        lastName:        u.lastName        ?? prev.lastName,
        email:           u.email           ?? prev.email,
        phoneNumber:     u.phoneNumber     ?? prev.phoneNumber,
        address:         u.address         ?? prev.address,
        city:            u.city            ?? prev.city,
        state:           u.state           ?? prev.state,
        role:            u.role            ?? prev.role,
        status:          u.status          ?? prev.status,
        isEmailVerified: u.isEmailVerified ?? prev.isEmailVerified,
        isVerified:      u.isVerified      ?? prev.isVerified,
        isActive:        u.isActive        ?? prev.isActive,
        profileImage:    u.profileImage    ?? prev.profileImage,
      }));
      close();
      notify("Profile updated ✓");
    } catch (err) {
      setErr({ api: err?.response?.data?.message || err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  // ── Addresses ─────────────────────────────────────────────────────────────
  const [addrs, setAddrs] = useState([]);
  const [addrBuf, setAddrBuf] = useState({ type:"Home", addr:"" });

  useEffect(() => {
    if (!profile.address) return;
    setAddrs([{
      id: 1,
      type: "Home",
      addr: location,
      def: true,
    }]);
  }, [profile.address, profile.city, profile.state]);

  const addAddr = () => {
    if (!addrBuf.addr.trim()) return setErr({ addr:"Address is required" });
    setAddrs(p=>[...p,{...addrBuf,id:Date.now(),def:false}]);
    setAddrBuf({ type:"Home", addr:"" }); close(); notify("Address added ✓");
  };
  const delAddr = (id) => { setAddrs(p=>p.filter(a=>a.id!==id)); notify("Address removed"); };
  const defAddr = (id) => setAddrs(p=>p.map(a=>({...a,def:a.id===id})));

  // ── Vehicles ──────────────────────────────────────────────────────────────
  const EMPTY_VEH = { brand:"", model:"", year:"", plateNumber:"", color:"", vin:"", mileage:"", engine:"" };
  const [vehs,        setVehs]        = useState([]);
  const [vehsLoading, setVehsLoading] = useState(true);
  const [vehsErr,     setVehsErr]     = useState(null);
  const [vehBuf,      setVehBuf]      = useState(EMPTY_VEH);
  const [vehSaving,   setVehSaving]   = useState(false);

  const statusTag = (s) => s === "active" ? "ok" : "warn";
  const tagColor  = { ok:"text-emerald-600 bg-emerald-50", warn:"text-amber-600 bg-amber-50" };
  const vehLabel  = (v) => [v.year, v.brand, v.model].filter(Boolean).join(" ");
  const vehSub    = (v) => [v.color, v.plateNumber].filter(Boolean).join(" · ") || v.status;

  useEffect(() => {
    (async () => {
      try {
        setVehsLoading(true);
        const { data } = await api.get("/vehicles");
        setVehs(Array.isArray(data) ? data : []);
      } catch (e) {
        setVehsErr(e?.response?.data?.message || e.message || "Failed to load vehicles.");
      } finally {
        setVehsLoading(false);
      }
    })();
  }, []);

  const addVeh = async () => {
    const e = {};
    if (!vehBuf.brand.trim()) e.brand = "Brand is required";
    if (!vehBuf.model.trim()) e.model = "Model is required";
    if (!vehBuf.year)         e.year  = "Year is required";
    if (Object.keys(e).length) return setErr(e);

    const payload = {
      brand:       vehBuf.brand.trim(),
      model:       vehBuf.model.trim(),
      year:        Number(vehBuf.year),
      plateNumber: vehBuf.plateNumber.trim() || undefined,
      color:       vehBuf.color.trim()       || undefined,
      vin:         vehBuf.vin.trim()         || undefined,
      mileage:     vehBuf.mileage ? Number(vehBuf.mileage) : undefined,
      engine:      vehBuf.engine.trim()      || null,
    };

    try {
      setVehSaving(true);
      const { data } = await api.post("/vehicles", payload);
      setVehs(prev => [...prev, data]);
      setVehBuf(EMPTY_VEH);
      close();
      notify("Vehicle added ✓");
    } catch (e) {
      setErr({ vehApi: e?.response?.data?.message || e.message || "Could not add vehicle." });
    } finally {
      setVehSaving(false);
    }
  };

  // ── Security / Password ───────────────────────────────────────────────────
  const [pwd,       setPwd]       = useState({ cur:"", nw:"", cf:"" });
  const [show,      setShow]      = useState({ cur:false, nw:false, cf:false });
  const [pwdSaving, setPwdSaving] = useState(false);
  const toggleShow = (k) => setShow(p=>({...p,[k]:!p[k]}));

  const savePwd = async () => {
    const e = {};
    if (!pwd.cur.trim())   e.cur = "Current password is required";
    if (pwd.nw.length < 8) e.nw  = "Min 8 characters";
    if (pwd.nw !== pwd.cf) e.cf  = "Passwords don't match";
    if (Object.keys(e).length) return setErr(e);

    setPwdSaving(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword:     pwd.cur,
        newPassword:         pwd.nw,
        confirmNewPassword:  pwd.cf,
      });
      setPwd({ cur:"", nw:"", cf:"" });
      close();
      notify("Password updated ✓");
    } catch (err) {
      setErr({ api: err?.response?.data?.message || err.message || "Failed to update password." });
    } finally {
      setPwdSaving(false);
    }
  };

  const wrap = { hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ staggerChildren:0.07 } } };
  const card = { hidden:{ opacity:0, y:22 }, visible:{ opacity:1, y:0, transition:EASE } };

  const EyeBtn = ({ k }) => (
    <motion.button type="button" whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}
      onClick={()=>toggleShow(k)} className="text-gray-400 hover:text-gray-700 transition-colors">
      {show[k] ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
    </motion.button>
  );

  // ── Loading / Error screens ───────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-[#1C52AF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm font-bold text-gray-400">Loading profile…</p>
      </div>
    </div>
  );

  if (fetchErr) return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
      <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-8 max-w-sm w-full text-center space-y-3">
        <HiOutlineExclamationCircle className="w-10 h-10 text-red-400 mx-auto" />
        <p className="text-sm font-bold text-gray-800">Failed to load profile</p>
        <p className="text-xs text-gray-500">{fetchErr}</p>
        <button onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 rounded-xl bg-[#1C52AF] text-white text-sm font-bold">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>{toast && <Toast msg={toast} onDone={()=>setToast("")} />}</AnimatePresence>

      <motion.div initial="hidden" animate={ready?"visible":"hidden"} variants={wrap}
        className="min-h-screen bg-[#f5f6fa]">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

          {/* HEADER */}
          <motion.div variants={card}
            className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:"radial-gradient(ellipse at 75% 50%, rgba(28,82,175,.06) 0%, transparent 70%)" }} />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background:"radial-gradient(circle, rgba(28,82,175,.07) 0%, transparent 70%)" }} />

            <div className="relative px-6 pt-6 pb-7">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <motion.div whileHover={{ scale:1.06 }} transition={SPRING}
                  className="relative shrink-0 cursor-pointer">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt={fullName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg shadow-[#1C52AF]/20" />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br
                                    from-[#1C52AF] to-[#0e3480] flex items-center justify-center
                                    text-white font-black text-2xl tracking-tight select-none
                                    shadow-lg shadow-[#1C52AF]/30">
                      {initials}
                    </div>
                  )}
                  <motion.span animate={{ scale:[1,1.4,1] }}
                    transition={{ duration:2.6, repeat:Infinity, ease:"easeInOut" }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400
                               border-2 border-white rounded-full shadow-md" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.h1 key={fullName}
                    initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={EASE}
                    className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    {fullName || "—"}
                  </motion.h1>
                  <motion.p key={profile.email}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.05,...EASE }}
                    className="text-sm text-gray-400 mt-0.5">{profile.email}
                  </motion.p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.role && (
                      <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-xs font-bold bg-blue-50 text-[#1C52AF] border border-blue-200 capitalize">
                        {profile.role}
                      </motion.span>
                    )}
                    {profile.isEmailVerified ? (
                      <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <HiCheckCircle className="w-3 h-3" />Email Verified
                      </motion.span>
                    ) : (
                      <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
                        <HiOutlineExclamationCircle className="w-3 h-3" />Email Unverified
                      </motion.span>
                    )}
                    {profile.isVerified ? (
                      <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <HiOutlineBadgeCheck className="w-3 h-3" />Verified
                      </motion.span>
                    ) : (
                      <motion.span whileHover={{ scale:1.08 }} transition={SPRING}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
                        Unverified
                      </motion.span>
                    )}
                  </div>
                </div>

                <Magnetic>
                  <motion.button
                    whileHover={{ scale:1.04, boxShadow:"0 12px 28px rgba(28,82,175,.4)" }}
                    whileTap={{ scale:0.96 }} transition={SPRING}
                    onClick={()=>{ setEditBuf({ ...profile }); open("edit"); }}
                    className="flex items-center gap-2 bg-[#1C52AF] text-white
                               px-5 py-2.5 rounded-xl text-sm font-bold
                               shadow-md shadow-[#1C52AF]/30">
                    <HiPencil className="w-4 h-4" />Edit Profile
                  </motion.button>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-5">

              {/* Personal Info */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="p-2 rounded-xl bg-blue-50">
                    <HiOutlineUser className="w-4 h-4 text-[#1C52AF]" />
                  </span>
                  <h2 className="text-sm font-black text-gray-900 tracking-tight">Personal Info</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label:"First Name",   value: profile.firstName,   icon: HiOutlineUser          },
                    { label:"Last Name",    value: profile.lastName,    icon: HiOutlineUser          },
                    { label:"Email",        value: profile.email,       icon: HiOutlineMail          },
                    { label:"Phone",        value: profile.phoneNumber, icon: HiOutlinePhone         },
                    { label:"Address",      value: location,            icon: HiOutlineLocationMarker},
                  ].map((item,i)=>(
                    <motion.div key={item.label}
                      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay:0.1+i*0.06,...EASE }}
                      whileHover={{ backgroundColor:"#f8f9ff", x:2 }}
                      className={`p-4 rounded-2xl border border-gray-100 cursor-default transition-colors
                                  ${item.label === "Address" ? "sm:col-span-2" : ""}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <item.icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] uppercase tracking-[.12em] font-black text-gray-400">
                          {item.label}
                        </span>
                      </div>
                      <motion.p key={item.value}
                        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={EASE}
                        className="text-sm font-bold text-gray-900">{item.value || "—"}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Addresses */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-blue-50">
                      <HiOutlineHome className="w-4 h-4 text-[#1C52AF]" />
                    </span>
                    <h2 className="text-sm font-black text-gray-900 tracking-tight">Addresses</h2>
                  </div>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
                    transition={SPRING}
                    onClick={()=>{ setAddrBuf({type:"Home",addr:""}); open("addr"); }}
                    className="flex items-center gap-1.5 text-[#1C52AF] text-xs font-bold
                               bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors">
                    <HiOutlinePlus className="w-3.5 h-3.5" />Add
                  </motion.button>
                </div>
                <AnimatePresence mode="popLayout">
                  {addrs.length === 0 && (
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      className="text-center text-sm text-gray-400 py-6">No addresses yet.</motion.p>
                  )}
                  {addrs.map(a=>(
                    <motion.div key={a.id} layout
                      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, x:-30, transition:{ duration:.2 } }} transition={SPRING}
                      whileHover={{ x:4 }} onClick={()=>defAddr(a.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer
                                  transition-colors mb-2 last:mb-0
                                  ${a.def ? "bg-blue-50/60 border-[#1C52AF]/25"
                                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}>
                      <HiOutlineHome className={`w-4 h-4 mt-0.5 shrink-0 ${a.def?"text-[#1C52AF]":"text-gray-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-gray-900">{a.type}</span>
                          {a.def && (
                            <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={SPRING}
                              className="px-2 py-0.5 bg-[#1C52AF] text-white
                                         text-[9px] font-black rounded-md uppercase tracking-wide">
                              Default
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{a.addr}</p>
                      </div>
                      <motion.button whileHover={{ scale:1.15 }} whileTap={{ scale:.9 }}
                        transition={SPRING}
                        onClick={e=>{ e.stopPropagation(); delAddr(a.id); }}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1">
                        <HiX className="w-3.5 h-3.5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Map */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.09)" }} transition={SPRING}
                className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-40 sm:h-50">
                <iframe title="location-map" loading="lazy" className="w-full h-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location || "Nigeria")}&t=&z=13&ie=UTF8&iwloc=&output=embed`} />
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5">

              {/* Vehicles */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-blue-50">
                      <HiOutlineTruck className="w-4 h-4 text-[#1C52AF]" />
                    </span>
                    <h2 className="text-sm font-black text-gray-900 tracking-tight">Vehicles</h2>
                  </div>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
                    transition={SPRING} onClick={()=>open("viewVeh")}
                    className="text-xs text-[#1C52AF] font-bold hover:underline underline-offset-2">
                    View All
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {vehsLoading && (
                    <div className="flex items-center justify-center py-4 gap-2 text-gray-400">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      <span className="text-xs font-bold">Loading…</span>
                    </div>
                  )}
                  {!vehsLoading && vehsErr && (
                    <p className="text-xs text-red-500 font-semibold text-center py-2">{vehsErr}</p>
                  )}
                  {!vehsLoading && !vehsErr && vehs.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">No vehicles yet.</p>
                  )}
                  {!vehsLoading && vehs.slice(0,2).map((v,i)=>(
                    <motion.div key={v.id}
                      initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                      transition={{ delay:i*.06,...EASE }}
                      whileHover={{ x:4, backgroundColor:"#f8f9ff" }} transition={SPRING}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100
                                 hover:border-blue-100 cursor-pointer transition-colors">
                      <span className="p-1.5 rounded-lg bg-blue-50">
                        <HiOutlineTruck className="w-3.5 h-3.5 text-[#1C52AF]" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{vehLabel(v)}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor[statusTag(v.status)]}`}>
                          {vehSub(v)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:.98 }} transition={SPRING}
                  onClick={()=>{ setVehBuf(EMPTY_VEH); open("veh"); }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5
                             border-2 border-dashed border-gray-200 rounded-2xl
                             text-xs font-bold text-gray-400
                             hover:border-[#1C52AF] hover:text-[#1C52AF] hover:bg-blue-50/50 transition-all">
                  <HiOutlinePlus className="w-3.5 h-3.5" />Add Vehicle
                </motion.button>
              </motion.div>

              {/* Completeness */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 20px 40px rgba(28,82,175,.3)" }} transition={SPRING}
                className="relative overflow-hidden bg-gradient-to-br from-[#1C52AF] to-[#0e3480]
                           rounded-3xl shadow-lg shadow-[#1C52AF]/20 p-6 text-white">
                {[140,100].map((s,i)=>(
                  <motion.div key={i}
                    animate={{ rotate: i%2===0?360:-360 }}
                    transition={{ duration:24-i*6, repeat:Infinity, ease:"linear" }}
                    className="absolute rounded-full border border-white/[.07] pointer-events-none"
                    style={{ width:s, height:s, top:"50%", right:"-10%",
                             transform:`translate(0,-50%) rotate(${i*30}deg)` }} />
                ))}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineCheck className="w-4 h-4" />
                    <h2 className="text-sm font-black tracking-tight">Profile</h2>
                  </div>
                  <p className="text-xs text-blue-200 mb-5 leading-relaxed">
                    {profile.isEmailVerified && profile.isVerified
                      ? "Your profile is fully verified and active."
                      : "Complete verification to unlock all features."}
                  </p>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                      <motion.div initial={{ width:0 }}
                        animate={{ width: profile.isEmailVerified && profile.isVerified ? "100%" : profile.isEmailVerified ? "60%" : "30%" }}
                        transition={{ duration:1.4, ease:[.22,1,.36,1], delay:.6 }}
                        className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full" />
                    </div>
                    <span className="text-xs font-black text-white/90">
                      {profile.isEmailVerified && profile.isVerified ? "100%" : profile.isEmailVerified ? "60%" : "30%"}
                    </span>
                  </div>
                  <p className="text-[10px] text-blue-300 font-bold mb-4">
                    {!profile.isEmailVerified ? "Verify your email to continue" : !profile.isVerified ? "Awaiting account verification" : "All checks passed"}
                  </p>
                  {(!profile.isEmailVerified || !profile.isVerified) && (
                    <Magnetic strength={0.15}>
                      <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
                        transition={SPRING}
                        className="w-full bg-white text-[#1C52AF] py-3 rounded-xl
                                   text-xs font-black shadow-lg shadow-black/20 p-2">
                        {!profile.isEmailVerified ? "Verify Email" : "Complete Profile"}
                      </motion.button>
                    </Magnetic>
                  )}
                </div>
              </motion.div>

              {/* Security */}
              <motion.div variants={card}
                whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(0,0,0,.07)" }} transition={SPRING}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="p-2 rounded-xl bg-red-50">
                    <HiOutlineShieldCheck className="w-4 h-4 text-red-500" />
                  </span>
                  <h2 className="text-sm font-black text-gray-900 tracking-tight">Security</h2>
                </div>
                <div className="space-y-1">
                  {[
                    { icon:HiOutlineLockClosed,  label:"Password",     badge:null },
                    { icon:HiOutlineShieldCheck, label:"2-Factor Auth", badge:"On" },
                  ].map(item=>(
                    <motion.button key={item.label}
                      whileHover={{ x:4, backgroundColor:"#f8f9ff" }} whileTap={{ scale:.98 }}
                      transition={SPRING} onClick={()=>open("sec")}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl text-left
                                 hover:bg-gray-50 cursor-pointer transition-colors">
                      <item.icon className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="flex-1 text-sm font-bold text-gray-800">{item.label}</span>
                      {item.badge && (
                        <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={SPRING}
                          className="px-2 py-0.5 bg-emerald-50 text-emerald-600
                                     text-[9px] font-black rounded-md uppercase tracking-wide">
                          {item.badge}
                        </motion.span>
                      )}
                      <HiOutlineChevronRight className="w-3.5 h-3.5 text-gray-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MODALS ───────────────────────────────────────────────────────────── */}

      {/* Edit Profile */}
      <Modal open={mod==="edit"} onClose={close} title="Edit Profile">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" value={editBuf.firstName ?? ""}
              onChange={e=>setEditBuf(p=>({...p,firstName:e.target.value}))}
              placeholder="First name" error={err.firstName} />
            <Field label="Last Name" value={editBuf.lastName ?? ""}
              onChange={e=>setEditBuf(p=>({...p,lastName:e.target.value}))}
              placeholder="Last name" error={err.lastName} />
          </div>
          <Field label="Email" type="email" value={editBuf.email ?? ""}
            onChange={e=>setEditBuf(p=>({...p,email:e.target.value}))}
            placeholder="you@example.com" error={err.email} />
          <Field label="Phone" type="tel" value={editBuf.phoneNumber ?? ""}
            onChange={e=>setEditBuf(p=>({...p,phoneNumber:e.target.value}))}
            placeholder="+234 800 000 0000" />
          <Field label="Address" value={editBuf.address ?? ""}
            onChange={e=>setEditBuf(p=>({...p,address:e.target.value}))}
            placeholder="Street address" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" value={editBuf.city ?? ""}
              onChange={e=>setEditBuf(p=>({...p,city:e.target.value}))}
              placeholder="City" />
            <Field label="State" value={editBuf.state ?? ""}
              onChange={e=>setEditBuf(p=>({...p,state:e.target.value}))}
              placeholder="State" />
          </div>

          {err.api && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
              <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-600 font-semibold">{err.api}</p>
            </div>
          )}

          <ModalActions onCancel={close} onConfirm={saveProfile}
            confirmLabel="Save Changes" loading={saving} />
        </div>
      </Modal>

      {/* Add Address */}
      <Modal open={mod==="addr"} onClose={close} title="Add Address">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</label>
            <select value={addrBuf.type} onChange={e=>setAddrBuf(p=>({...p,type:e.target.value}))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                         text-sm font-medium outline-none focus:border-[#1C52AF]
                         focus:ring-2 focus:ring-[#1C52AF]/20 transition-all">
              {["Home","Office","Other"].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Address</label>
            <textarea rows={3} value={addrBuf.addr}
              onChange={e=>setAddrBuf(p=>({...p,addr:e.target.value}))}
              placeholder="Enter full address"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none
                          resize-none transition-all
                          ${err.addr ? "border-red-300 bg-red-50"
                                     : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1C52AF] focus:ring-2 focus:ring-[#1C52AF]/20"}`} />
            {err.addr && <p className="text-xs text-red-500 font-semibold">{err.addr}</p>}
          </div>
          <ModalActions onCancel={close} onConfirm={addAddr} confirmLabel="Add Address" />
        </div>
      </Modal>

      {/* Add Vehicle */}
      <Modal open={mod==="veh"} onClose={()=>{ setVehBuf(EMPTY_VEH); close(); }} title="Add Vehicle">
        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Brand *" value={vehBuf.brand}
              onChange={e=>setVehBuf(p=>({...p,brand:e.target.value}))}
              placeholder="e.g. Toyota" error={err.brand} />
            <Field label="Model *" value={vehBuf.model}
              onChange={e=>setVehBuf(p=>({...p,model:e.target.value}))}
              placeholder="e.g. Camry" error={err.model} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Year *" type="number" value={vehBuf.year}
              onChange={e=>setVehBuf(p=>({...p,year:e.target.value}))}
              placeholder="2020" error={err.year} />
            <Field label="Color" value={vehBuf.color}
              onChange={e=>setVehBuf(p=>({...p,color:e.target.value}))}
              placeholder="e.g. Silver" />
          </div>
          <Field label="Plate Number" value={vehBuf.plateNumber}
            onChange={e=>setVehBuf(p=>({...p,plateNumber:e.target.value}))}
            placeholder="e.g. ABC-1234" />
          <Field label="VIN" value={vehBuf.vin}
            onChange={e=>setVehBuf(p=>({...p,vin:e.target.value}))}
            placeholder="17-character VIN" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Mileage (km)" type="number" value={vehBuf.mileage}
              onChange={e=>setVehBuf(p=>({...p,mileage:e.target.value}))}
              placeholder="e.g. 15000" />
            <Field label="Engine" value={vehBuf.engine}
              onChange={e=>setVehBuf(p=>({...p,engine:e.target.value}))}
              placeholder="e.g. 2.5L V6" />
          </div>
          {err.vehApi && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
              <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-600 font-semibold">{err.vehApi}</p>
            </div>
          )}
        </div>
        <div className="pt-4">
          <ModalActions onCancel={()=>{ setVehBuf(EMPTY_VEH); close(); }}
            onConfirm={addVeh} confirmLabel="Add Vehicle" loading={vehSaving} />
        </div>
      </Modal>

      {/* View All Vehicles */}
      <Modal open={mod==="viewVeh"} onClose={close} title={`All Vehicles (${vehs.length})`}>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {vehs.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-6">No vehicles registered yet.</p>
          )}
          <AnimatePresence>
            {vehs.map((v,i)=>(
              <motion.div key={v.id}
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:i*.04,...EASE }}
                whileHover={{ x:4, backgroundColor:"#f8f9ff" }} transition={SPRING}
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100
                           hover:border-blue-100 cursor-pointer transition-colors">
                <span className="p-1.5 rounded-lg bg-blue-50">
                  <HiOutlineTruck className="w-3.5 h-3.5 text-[#1C52AF]" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{vehLabel(v)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor[statusTag(v.status)]}`}>
                      {v.status}
                    </span>
                    {v.plateNumber && (
                      <span className="text-[10px] text-gray-400 font-semibold">{v.plateNumber}</span>
                    )}
                    {v.mileage != null && (
                      <span className="text-[10px] text-gray-400 font-semibold">{v.mileage.toLocaleString()} km</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Modal>

      {/* Security Settings */}
      <Modal open={mod==="sec"} onClose={close} title="Security Settings">
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
              Change Password
            </p>
            <div className="space-y-3">
              <Field label="Current Password" type={show.cur?"text":"password"}
                value={pwd.cur} onChange={e=>setPwd(p=>({...p,cur:e.target.value}))}
                placeholder="••••••••" error={err.cur} suffix={<EyeBtn k="cur" />} />
              <Field label="New Password" type={show.nw?"text":"password"}
                value={pwd.nw} onChange={e=>setPwd(p=>({...p,nw:e.target.value}))}
                placeholder="Min 8 characters" error={err.nw} suffix={<EyeBtn k="nw" />} />
              <Field label="Confirm Password" type={show.cf?"text":"password"}
                value={pwd.cf} onChange={e=>setPwd(p=>({...p,cf:e.target.value}))}
                placeholder="Repeat new password" error={err.cf} suffix={<EyeBtn k="cf" />} />
            </div>
          </div>

          {err.api && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
              <HiOutlineExclamationCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-600 font-semibold">{err.api}</p>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-emerald-800">2-Factor Auth is ON</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Your account is secured with an authenticator app.
              </p>
            </div>
          </div>

          <ModalActions 
            onCancel={close} 
            onConfirm={savePwd} 
            confirmLabel="Update Password" 
            loading={pwdSaving} 
          />
        </div>
      </Modal>
    </>
  );
}