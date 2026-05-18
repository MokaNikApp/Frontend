import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdBuild,
  MdAccessTime,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdArrowUpward,
  MdArrowDownward,
  MdLocationOn,
  MdCalendarToday,
  MdPhone,
  MdStar,
  MdCheck,
  MdClose,
} from "react-icons/md";

const statusColors = {
  Pending: {
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    tab: "bg-amber-500 text-white shadow-lg shadow-amber-200",
    card: "border-amber-200 bg-amber-50",
    icon: "text-amber-500 bg-amber-100",
    glow: "shadow-amber-100",
  },
  Approved: {
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    tab: "bg-emerald-500 text-white shadow-lg shadow-emerald-200",
    card: "border-emerald-200 bg-emerald-50",
    icon: "text-emerald-500 bg-emerald-100",
    glow: "shadow-emerald-100",
  },
  Rejected: {
    badge: "bg-rose-100 text-rose-700 border border-rose-200",
    tab: "bg-rose-500 text-white shadow-lg shadow-rose-200",
    card: "border-rose-200 bg-rose-50",
    icon: "text-rose-500 bg-rose-100",
    glow: "shadow-rose-100",
  },
};

const initialData = [
  { id: 1, name: "John Doe", location: "Lagos", exp: "5 Years", status: "Pending", date: "2026-05-01", specialty: "Engine Repair", rating: null, phone: "+234 801 234 5678" },
  { id: 2, name: "Adewale Shola", location: "Ibadan", exp: "3 Years", status: "Approved", date: "2026-04-28", specialty: "Electrical Systems", rating: 4.8, phone: "+234 802 345 6789" },
  { id: 3, name: "Michael Johnson", location: "Abuja", exp: "7 Years", status: "Rejected", date: "2026-04-25", specialty: "Transmission", rating: null, phone: "+234 803 456 7890" },
  { id: 4, name: "David Ojo", location: "Port Harcourt", exp: "4 Years", status: "Pending", date: "2026-04-22", specialty: "Brake Systems", rating: null, phone: "+234 804 567 8901" },
  { id: 5, name: "Samuel Akin", location: "Lagos", exp: "6 Years", status: "Approved", date: "2026-04-20", specialty: "AC & Cooling", rating: 4.5, phone: "+234 805 678 9012" },
  { id: 6, name: "Chukwu Emeka", location: "Enugu", exp: "2 Years", status: "Pending", date: "2026-05-03", specialty: "Body Work", rating: null, phone: "+234 806 789 0123" },
  { id: 7, name: "Fatima Bello", location: "Kano", exp: "8 Years", status: "Approved", date: "2026-04-15", specialty: "Engine Diagnostics", rating: 4.9, phone: "+234 807 890 1234" },
];

const avatarColors = ["#0f4c81","#1b6b44","#7c2d12","#4a1d96","#134e4a","#831843","#1e3a5f"];

function Avatar({ name, size = 36 }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.38, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
      {initials}
    </div>
  );
}

function StarRating({ rating }) {
  if (!rating) return <span style={{ color: "#aaa", fontSize: 12 }}>—</span>;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <MdStar style={{ color: "#f59e0b" }} size={15} />
      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{rating}</span>
    </span>
  );
}

function Modal({ app, onClose, onApprove, onReject }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!app) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,20,40,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, animation: "fadeIn 0.18s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.18)", animation: "slideUp 0.22s cubic-bezier(.34,1.4,.64,1)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", padding: "24px 20px 18px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.1)"}
          >×</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={app.name} size={48} />
            <div style={{ minWidth: 0 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: 0, fontFamily: "'Sora', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.name}</p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.specialty} · {app.exp} experience</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            {[
              { label: "Location", value: app.location, icon: <MdLocationOn size={14} style={{ color: "#94a3b8" }} /> },
              { label: "Applied", value: app.date, icon: <MdCalendarToday size={14} style={{ color: "#94a3b8" }} /> },
              { label: "Phone", value: app.phone, icon: <MdPhone size={14} style={{ color: "#94a3b8" }} /> },
              { label: "Rating", value: app.rating ? app.rating : "N/A", icon: <MdStar size={14} style={{ color: "#94a3b8" }} /> },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ background: "#f8fafc", borderRadius: 12, padding: "10px 12px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: 10, color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
                  {icon} <span>{label}</span>
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0, wordBreak: "break-word" }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>Current status</span>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, ...getBadgeStyle(app.status) }}>{app.status}</span>
          </div>
          {app.status === "Pending" && (
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <button onClick={() => onReject(app.id)} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid #fecaca", background: "#fff5f5", color: "#ef4444", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onMouseEnter={e => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "#fff5f5"; e.target.style.color = "#ef4444"; }}
              >
                <MdClose size={16} /> Reject
              </button>
              <button onClick={() => onApprove(app.id)} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 12px rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onMouseEnter={e => e.target.style.opacity = 0.9}
                onMouseLeave={e => e.target.style.opacity = 1}
              >
                <MdCheck size={16} /> Approve
              </button>
            </div>
          )}
          {app.status !== "Pending" && (
            <button onClick={onClose} style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Close</button>
          )}
        </div>
      </div>
    </div>
  );
}

function getBadgeStyle(status) {
  const map = {
    Pending: { background: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" },
    Approved: { background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0" },
    Rejected: { background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
  };
  return map[status] || {};
}

function ConfirmToast({ message, visible }) {
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`, opacity: visible ? 1 : 0, transition: "all 0.3s cubic-bezier(.34,1.4,.64,1)", background: "#0f172a", color: "#fff", padding: "12px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, zIndex: 2000, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", pointerEvents: "none", maxWidth: "90vw", textAlign: "center", whiteSpace: "nowrap" }}>
      <MdCheckCircle size={16} style={{ color: "#10b981" }} /> {message}
    </div>
  );
}

export default function UserMechanic() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Pending");
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [sortDir, setSortDir] = useState("desc");
  const toastTimer = useRef(null);

  const tabs = ["Pending", "Approved", "Rejected"];

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, message });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  };

  const handleApprove = (id) => {
    setData(d => d.map(item => item.id === id ? { ...item, status: "Approved", rating: 4.5 } : item));
    setSelected(null);
    showToast("Mechanic approved successfully");
    setTimeout(() => setActive("Approved"), 300);
  };

  const handleReject = (id) => {
    setData(d => d.map(item => item.id === id ? { ...item, status: "Rejected" } : item));
    setSelected(null);
    showToast("Application rejected");
    setTimeout(() => setActive("Rejected"), 300);
  };

  const filtered = data
    .filter(d => d.status === active)
    .filter(d =>
      search === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

  const counts = tabs.reduce((acc, t) => ({ ...acc, [t]: data.filter(d => d.status === t).length }), {});

  const statCards = [
    { label: "Pending", status: "Pending", icon: MdAccessTime, color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d", shadow: "rgba(245,158,11,0.12)" },
    { label: "Approved", status: "Approved", icon: MdCheckCircle, color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7", shadow: "rgba(16,185,129,0.12)" },
    { label: "Rejected", status: "Rejected", icon: MdCancel, color: "#ef4444", bg: "#fff1f2", border: "#fca5a5", shadow: "rgba(239,68,68,0.12)" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes rowIn { from { opacity: 0; transform: translateX(-8px) } to { opacity: 1; transform: translateX(0) } }
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; }

        @media (max-width: 640px) {
          .mobile-stack { flex-direction: column !important; align-items: stretch !important; }
          .mobile-full { width: 100% !important; }
          .mobile-hide { display: none !important; }
          .mobile-pad { padding: 12px 14px !important; }
          .mobile-scroll { -webkit-overflow-scrolling: touch; }
          .mobile-cards { display: flex !important; flex-wrap: nowrap !important; overflow-x: auto !important; gap: 10px !important; }
          .mobile-card { min-width: 140px !important; flex: 0 0 auto !important; padding: 14px 16px !important; }
          .mobile-card-num { font-size: 24px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", padding: "20px 12px", fontFamily: "'DM Sans', sans-serif", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* HEADER */}
          <div className="mobile-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MdBuild style={{ color: "#fff", fontSize: 16 }} />
                </div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mechanic Applications</h1>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>Review and manage technician credentials</p>
            </div>

            {/* Tabs */}
            <div className="mobile-full" style={{ display: "flex", gap: 4, background: "#e2e8f0", padding: 4, borderRadius: 50, overflowX: "auto", flexShrink: 0 }}>
              {tabs.map(tab => {
                const isActive = active === tab;
                return (
                  <button key={tab} onClick={() => setActive(tab)} style={{ padding: "7px 14px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, transition: "all .22s cubic-bezier(.34,1.4,.64,1)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, ...(isActive ? { background: tab === "Pending" ? "#f59e0b" : tab === "Approved" ? "#10b981" : "#ef4444", color: "#fff", boxShadow: `0 4px 12px ${tab === "Pending" ? "rgba(245,158,11,0.35)" : tab === "Approved" ? "rgba(16,185,129,0.35)" : "rgba(239,68,68,0.35)"}` } : { background: "transparent", color: "#64748b" }) }}>
                    {tab}
                    <span style={{ background: isActive ? "rgba(255,255,255,0.25)" : "#cbd5e1", color: isActive ? "#fff" : "#475569", borderRadius: 50, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{counts[tab]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="mobile-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {statCards.map(({ label, status, icon: IconComponent, color, bg, border, shadow }) => {
              const isActive = active === status;
              return (
                <div 
                  key={status} 
                  onClick={() => setActive(status)} 
                  className="mobile-card"
                  style={{ 
                    borderRadius: 14, 
                    padding: "16px 18px", 
                    border: `1.5px solid ${isActive ? border : "#e2e8f0"}`, 
                    background: isActive ? bg : "#fff", 
                    cursor: "pointer", 
                    transition: "all .25s", 
                    boxShadow: isActive ? `0 6px 20px ${shadow}` : "0 1px 4px rgba(0,0,0,0.06)", 
                    transform: isActive ? "translateY(-2px)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}
                >
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 10, 
                    background: isActive ? color : "#f1f5f9", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: isActive ? "#fff" : color,
                    fontSize: 20,
                    flexShrink: 0,
                    transition: "all .25s"
                  }}>
                    <IconComponent size={20} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p className="mobile-card-num" style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{counts[status]}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABLE SECTION */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

            {/* Table toolbar */}
            <div className="mobile-stack mobile-pad" style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a", fontFamily: "'Sora', sans-serif" }}>Application Queue</h2>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{filtered.length} record{filtered.length !== 1 ? "s" : ""} shown</p>
              </div>
              <div className="mobile-stack mobile-full" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", color: "#94a3b8", pointerEvents: "none" }}>
                    <MdSearch size={16} />
                  </span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, city, skill..." style={{ paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8, fontSize: 13, border: "1.5px solid #e2e8f0", borderRadius: 10, outline: "none", width: "100%", fontFamily: "'DM Sans', sans-serif", color: "#334155", background: "#f8fafc", transition: "border .2s" }}
                    onFocus={e => e.target.style.borderColor = "#94a3b8"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
                <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, border: "1.5px solid #e2e8f0", borderRadius: 10, background: "#f8fafc", color: "#475569", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .2s", flexShrink: 0, whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.target.style.borderColor = "#94a3b8"}
                  onMouseLeave={e => e.target.style.borderColor = "#e2e8f0"}
                >
                  {sortDir === "desc" ? <MdArrowDownward size={14} /> : <MdArrowUpward size={14} />} Date
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="mobile-scroll" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 700 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Technician", "Location", "Specialty", "Exp", "Status", "Date", "Action"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc", transition: "background .15s", animation: `rowIn 0.25s ease ${i * 0.04}s both`, cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar name={item.name} size={34} />
                          <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                            <p className="mobile-hide" style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{item.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MdLocationOn size={16} className="text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569", whiteSpace: "nowrap" }}>{item.specialty}</td>
                      <td style={{ padding: "12px 14px", color: "#475569", whiteSpace: "nowrap" }}>
                        <span style={{ background: "#f1f5f9", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontWeight: 600, color: "#334155" }}>{item.exp}</span>
                      </td>
                      <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, ...getBadgeStyle(item.status) }}>{item.status}</span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b", fontSize: 13, whiteSpace: "nowrap" }}>{item.date}</td>
                      <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button onClick={() => { setSelected(item); navigate(`/mechanic-approval/${item.id}`); }} style={{ padding: "5px 10px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .18s" }}
                            onMouseEnter={e => { e.target.style.borderColor = "#0f172a"; e.target.style.color = "#0f172a"; }}
                            onMouseLeave={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#334155"; }}
                          >View</button>
                          {item.status === "Pending" && (
                            <>
                              <button onClick={() => handleApprove(item.id)} style={{ padding: "5px 8px", borderRadius: 8, border: "none", background: "#ecfdf5", color: "#059669", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .18s", display: "inline-flex", alignItems: "center" }}
                                onMouseEnter={e => { e.target.style.background = "#059669"; e.target.style.color = "#fff"; }}
                                onMouseLeave={e => { e.target.style.background = "#ecfdf5"; e.target.style.color = "#059669"; }}
                              ><MdCheck size={14} /></button>
                              <button onClick={() => handleReject(item.id)} style={{ padding: "5px 8px", borderRadius: 8, border: "none", background: "#fff1f2", color: "#ef4444", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .18s", display: "inline-flex", alignItems: "center" }}
                                onMouseEnter={e => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; }}
                                onMouseLeave={e => { e.target.style.background = "#fff1f2"; e.target.style.color = "#ef4444"; }}
                              ><MdClose size={14} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: "48px 0", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, color: "#cbd5e1" }}>
                          <MdSearch size={36} />
                        </div>
                        <p style={{ margin: 0, color: "#94a3b8", fontWeight: 600, fontSize: 14 }}>No {active.toLowerCase()} applications found</p>
                        {search && <p style={{ margin: "6px 0 0", color: "#cbd5e1", fontSize: 12 }}>Try clearing your search</p>}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mobile-stack mobile-pad" style={{ padding: "12px 18px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Total: <strong style={{ color: "#475569" }}>{data.length}</strong></p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["All", ...tabs].map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#f1f5f9", color: "#64748b", fontWeight: 600 }}>
                    {t === "All" ? `All: ${data.length}` : `${t}: ${counts[t]}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <Modal app={selected} onClose={() => setSelected(null)} onApprove={handleApprove} onReject={handleReject} />}

      {/* Toast */}
      <ConfirmToast message={toast.message} visible={toast.visible} />
    </>
  );
}