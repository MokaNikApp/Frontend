// import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function Footer() {

//   const customerLinks = [
//     { label: "How it Works", to: "#how-it-works" },
//     { label: "Help Center", to: "#contact" },
//     { label: "Pricing Guide", to: "#pricing" },
//     { label: "Service Areas", to: "/contact" },
//     { label: "Customer Reviews", to: "#reviews" },
//   ];

//   const mechanicLinks = [
//     { label: "Join as a Pro", to: "/signup" },
//     { label: "Mechanic Portal", to: "/mec-dashboard" },
//     { label: "Resource Center", to: "/resources" },
//     { label: "Success Stories", to: "/success-stories" },
//   ];

//   const supportLinks = [
//     { label: "Contact Us", to: "/contact" },
//     { label: "Privacy Policy", to: "/privacy" },
//     { label: "Terms of Service", to: "/terms" },
//   ];

//   const iconLinks = [
//     { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
//     { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
//     { icon: <FaBell />, to: "/notifications", label: "Notifications" },
//   ];

//   return (
//     <footer className="bg-[#15256E] text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24">

//       <div className="max-w-6xl mx-auto">

//         {/* TOP SECTION */}
//         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

//           {/* BRAND */}
//           <div className="space-y-4">
//             <img
//               src="/images/logo.png"
//               alt="MokaNik Logo"
//               className="h-10 sm:h-12"
//             />

//             <p className="max-w-xs text-sm leading-relaxed text-white">
//               Connecting car owners with trusted local mechanics for fast,
//               transparent, and reliable repair services.
//             </p>
//           </div>

//           {/* CUSTOMER LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Customers</h3>
//             <ul className="space-y-3 text-sm">
//               {customerLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* MECHANIC LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Mechanics</h3>
//             <ul className="space-y-3 text-sm">
//               {mechanicLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* SUPPORT LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">Support</h3>
//             <ul className="space-y-3 text-sm">
//               {supportLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-12 border-t border-white/10 sm:flex-row">

//           <p className="text-xs text-white sm:text-sm">
//             © 2026 MokaNik. All rights reserved.
//           </p>

//           {/* ICON LINKS */}
//           <div className="flex items-center gap-3 text-white">

//             {iconLinks.map((item, i) => (
//               <a
//                 key={i}
//                 href={item.to}
//                 target={item.to.startsWith("http") ? "_blank" : "_self"}
//                 rel="noreferrer"
//                 aria-label={item.label}
//                 className="flex items-center justify-center transition-all duration-200 rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
//               >
//                 {item.icon}
//               </a>
//             ))}

//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// }



// import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// export default function Footer() {
//   const navigate = useNavigate();

//   const customerLinks = [
//     { label: "How it Works", to: "how-it-works", type: "section" },
//     { label: "Help Center", to: "/contact", type: "route" },
//     { label: "Pricing Guide", to: "pricing", type: "section" },
//     { label: "Service Areas", to: "/contact", type: "route" },
//     { label: "Customer Reviews", to: "reviews", type: "section" },
//   ];

//   const mechanicLinks = [
//     { label: "Join as a Pro", to: "/signup", type: "route" },
//     { label: "Mechanic Portal", to: "/mec-dashboard", type: "route" },
//     { label: "Resource Center", to: "/resources", type: "route" },
//     { label: "Success Stories", to: "/providers", type: "route" },
//   ];

//   const supportLinks = [
//     { label: "Contact Us", to: "/contact", type: "route" },
//     { label: "Privacy Policy", to: "/privacy", type: "route" },
//     { label: "Terms of Service", to: "/terms", type: "route" },
//   ];

//   const iconLinks = [
//     { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
//     { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
//     { icon: <FaBell />, to: "/notifications", label: "Notifications" },
//   ];

//   // ✅ SMART NAVIGATION HANDLER
//   const handleClick = (item) => {
//     if (item.type === "route") {
//       navigate(item.to);
//     } else {
//       const el = document.getElementById(item.to);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//       } else {
//         // fallback if user is on another page
//         navigate("/");
//         setTimeout(() => {
//           document.getElementById(item.to)?.scrollIntoView({
//             behavior: "smooth",
//           });
//         }, 150);
//       }
//     }
//   };

//   return (
//     <footer className="bg-[#15256E] text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24">
//       <div className="max-w-6xl mx-auto">

//         {/* TOP SECTION */}
//         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

//           {/* BRAND */}
//           <div className="space-y-4">
//             <img
//               src="/images/logo.png"
//               alt="MokaNik Logo"
//               className="h-10 sm:h-12"
//             />

//             <p className="max-w-xs text-sm leading-relaxed text-white">
//               Connecting car owners with trusted local mechanics for fast,
//               transparent, and reliable repair services.
//             </p>
//           </div>

//           {/* CUSTOMER LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Customers</h3>
//             <ul className="space-y-3 text-sm">
//               {customerLinks.map((item) => (
//                 <li key={item.label}>
//                   <button
//                     onClick={() => handleClick(item)}
//                     className="text-white hover:text-gray-200 transition"
//                   >
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* MECHANIC LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Mechanics</h3>
//             <ul className="space-y-3 text-sm">
//               {mechanicLinks.map((item) => (
//                 <li key={item.label}>
//                   <button
//                     onClick={() => handleClick(item)}
//                     className="text-white hover:text-gray-200 transition"
//                   >
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* SUPPORT LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">Support</h3>
//             <ul className="space-y-3 text-sm">
//               {supportLinks.map((item) => (
//                 <li key={item.label}>
//                   <button
//                     onClick={() => handleClick(item)}
//                     className="text-white hover:text-gray-200 transition"
//                   >
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-12 border-t border-white/10 sm:flex-row">

//           <p className="text-xs text-white sm:text-sm">
//             © 2026 MokaNik. All rights reserved.
//           </p>

//           {/* ICON LINKS */}
//           <div className="flex items-center gap-3 text-white">

//             {iconLinks.map((item, i) => (
//               <a
//                 key={i}
//                 href={item.to}
//                 target={item.to.startsWith("http") ? "_blank" : "_self"}
//                 rel="noreferrer"
//                 aria-label={item.label}
//                 className="flex items-center justify-center transition-all duration-200 rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
//               >
//                 {item.icon}
//               </a>
//             ))}

//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// }






// import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";

// // ─── Intersection Observer hook ───────────────────────────────────────────────
// function useInView(threshold = 0.12) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setInView(true); },
//       { threshold }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// }

// // ─── Magnetic icon button ──────────────────────────────────────────────────────
// function MagneticIcon({ item, delay = 0, inView }) {
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [hovered, setHovered] = useState(false);

//   const handleMove = (e) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - r.left - r.width / 2) * 0.45;
//     const y = (e.clientY - r.top - r.height / 2) * 0.45;
//     setPos({ x, y });
//   };

//   return (
    
//       href={item.to}
//       target={item.to.startsWith("http") ? "_blank" : "_self"}
//       rel="noreferrer"
//       aria-label={item.label}
//       onMouseMove={handleMove}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false); }}
//       style={{
//         transform: inView
//           ? `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.18 : 1})`
//           : "translateY(20px)",
//         opacity: inView ? 1 : 0,
//         transition: `transform 0.2s ease, opacity 0.5s ease ${delay}s, box-shadow 0.3s ease`,
//         boxShadow: hovered ? "0 0 18px rgba(255,255,255,0.25)" : "none",
//       }}
//       className="flex items-center justify-center rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
//     >
//       <span style={{ pointerEvents: "none" }}>{item.icon}</span>
//     </a>
//   );
// }

// // ─── Animated link item ────────────────────────────────────────────────────────
// function AnimLink({ label, delay, inView, onClick }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <li style={{
//       opacity: inView ? 1 : 0,
//       transform: inView ? "translateX(0)" : "translateX(-16px)",
//       transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
//     }}>
//       <button
//         onClick={onClick}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className="relative text-white transition text-sm"
//         style={{ outline: "none" }}
//       >
//         {label}
//         {/* underline slide */}
//         <span style={{
//           position: "absolute",
//           bottom: -2,
//           left: 0,
//           height: 1,
//           width: hovered ? "100%" : "0%",
//           background: "rgba(255,255,255,0.6)",
//           transition: "width 0.3s ease",
//           display: "block",
//         }} />
//       </button>
//     </li>
//   );
// }

// // ─── Floating particles ────────────────────────────────────────────────────────
// function Particles() {
//   const dots = Array.from({ length: 18 }, (_, i) => ({
//     id: i,
//     left: `${(i * 5.8 + 2) % 100}%`,
//     size: 1.5 + (i % 3) * 1,
//     dur: 6 + (i % 5) * 2,
//     delay: -(i * 0.7),
//     opacity: 0.06 + (i % 4) * 0.04,
//   }));

//   return (
//     <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
//       {dots.map(d => (
//         <div key={d.id} style={{
//           position: "absolute",
//           bottom: "-10px",
//           left: d.left,
//           width: d.size,
//           height: d.size,
//           borderRadius: "50%",
//           background: "white",
//           opacity: d.opacity,
//           animation: `riseUp ${d.dur}s ease-in-out ${d.delay}s infinite`,
//         }} />
//       ))}
//     </div>
//   );
// }

// // ─── Main Footer ───────────────────────────────────────────────────────────────
// export default function Footer() {
//   const [footerRef, footerInView] = useInView(0.08);
//   const [bottomRef, bottomInView] = useInView(0.3);

//   const navigate = (to) => { window.location.href = to; };

//   const handleClick = (item) => {
//     if (item.type === "route") {
//       navigate(item.to);
//     } else {
//       const el = document.getElementById(item.to);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//       else {
//         navigate("/");
//         setTimeout(() => document.getElementById(item.to)?.scrollIntoView({ behavior: "smooth" }), 150);
//       }
//     }
//   };

//   const customerLinks = [
//     { label: "How it Works", to: "how-it-works", type: "section" },
//     { label: "Help Center", to: "/contact", type: "route" },
//     { label: "Pricing Guide", to: "pricing", type: "section" },
//     { label: "Service Areas", to: "/contact", type: "route" },
//     { label: "Customer Reviews", to: "reviews", type: "section" },
//   ];
//   const mechanicLinks = [
//     { label: "Join as a Pro", to: "/signup", type: "route" },
//     { label: "Mechanic Portal", to: "/mec-dashboard", type: "route" },
//     { label: "Resource Center", to: "/resources", type: "route" },
//     { label: "Success Stories", to: "/providers", type: "route" },
//   ];
//   const supportLinks = [
//     { label: "Contact Us", to: "/contact", type: "route" },
//     { label: "Privacy Policy", to: "/privacy", type: "route" },
//     { label: "Terms of Service", to: "/terms", type: "route" },
//   ];
//   const iconLinks = [
//     { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
//     { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
//     { icon: <FaBell />, to: "/notifications", label: "Notifications" },
//   ];

//   const cols = [
//     { title: "For Customers", links: customerLinks },
//     { title: "For Mechanics", links: mechanicLinks },
//     { title: "Support", links: supportLinks },
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes riseUp {
//           0%   { transform: translateY(0) scale(1);   opacity: var(--op, 0.08); }
//           50%  { opacity: calc(var(--op, 0.08) * 1.8); }
//           100% { transform: translateY(-420px) scale(0.4); opacity: 0; }
//         }
//         @keyframes gradientSlide {
//           0%   { background-position: 0% 50%; }
//           100% { background-position: 100% 50%; }
//         }
//         @keyframes logoPulse {
//           0%, 100% { filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
//           50%       { filter: drop-shadow(0 0 8px rgba(255,255,255,0.18)); }
//         }
//         @keyframes copyrightSlide {
//           from { opacity: 0; transform: translateX(-20px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>

//       <footer
//         ref={footerRef}
//         className="text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24"
//         style={{ background: "#15256E", position: "relative", overflow: "hidden" }}
//       >
//         {/* Floating particles */}
//         <Particles />

//         <div className="max-w-6xl mx-auto" style={{ position: "relative", zIndex: 1 }}>

//           {/* TOP GRID */}
//           <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

//             {/* BRAND */}
//             <div
//               className="space-y-4"
//               style={{
//                 opacity: footerInView ? 1 : 0,
//                 transform: footerInView ? "translateY(0)" : "translateY(30px)",
//                 transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
//               }}
//             >
//               <img
//                 src="/images/logo.png"
//                 alt="MokaNik Logo"
//                 className="h-10 sm:h-12"
//                 style={{ animation: footerInView ? "logoPulse 4s ease-in-out infinite" : "none" }}
//               />
//               <p className="max-w-xs text-sm leading-relaxed text-white">
//                 Connecting car owners with trusted local mechanics for fast,
//                 transparent, and reliable repair services.
//               </p>
//             </div>

//             {/* LINK COLUMNS */}
//             {cols.map((col, ci) => (
//               <div
//                 key={col.title}
//                 style={{
//                   opacity: footerInView ? 1 : 0,
//                   transform: footerInView ? "translateY(0)" : "translateY(30px)",
//                   transition: `opacity 0.7s ease ${0.15 + ci * 0.1}s, transform 0.7s ease ${0.15 + ci * 0.1}s`,
//                 }}
//               >
//                 <h3 className="mb-4 font-semibold text-white">{col.title}</h3>
//                 <ul className="space-y-3">
//                   {col.links.map((item, li) => (
//                     <AnimLink
//                       key={item.label}
//                       label={item.label}
//                       delay={footerInView ? 0.2 + ci * 0.1 + li * 0.06 : 0}
//                       inView={footerInView}
//                       onClick={() => handleClick(item)}
//                     />
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* ANIMATED DIVIDER */}
//           <div
//             ref={bottomRef}
//             style={{
//               height: 1,
//               marginTop: "3rem",
//               borderRadius: 999,
//               background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(147,197,253,0.6), rgba(255,255,255,0.5), transparent)",
//               backgroundSize: "200% 100%",
//               animation: bottomInView ? "gradientSlide 2.5s linear infinite alternate" : "none",
//               opacity: bottomInView ? 1 : 0,
//               transition: "opacity 0.8s ease",
//             }}
//           />

//           {/* BOTTOM ROW */}
//           <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">

//             <p
//               className="text-xs text-white sm:text-sm"
//               style={{
//                 animation: bottomInView ? "copyrightSlide 0.6s ease 0.2s both" : "none",
//                 opacity: bottomInView ? 1 : 0,
//               }}
//             >
//               © 2026 MokaNik. All rights reserved.
//             </p>

//             {/* MAGNETIC ICONS */}
//             <div className="flex items-center gap-3 text-white">
//               {iconLinks.map((item, i) => (
//                 <MagneticIcon
//                   key={i}
//                   item={item}
//                   delay={0.1 + i * 0.1}
//                   inView={bottomInView}
//                 />
//               ))}
//             </div>

//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }




import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Magnetic icon button ──────────────────────────────────────────────────────
function MagneticIcon({ item, delay = 0, inView }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.45;
    const y = (e.clientY - r.top - r.height / 2) * 0.45;
    setPos({ x, y });
  };

  return (
    <a
      href={item.to}
      target={item.to.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      aria-label={item.label}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setHovered(false);
      }}
      style={{
        transform: inView
          ? `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.18 : 1})`
          : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transition: `transform 0.15s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease ${delay}s, box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 0 18px rgba(255,255,255,0.25)" : "none",
        animation: hovered ? "none" : "iconFloat 3s ease-in-out infinite",
      }}
      className="flex items-center justify-center rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
    >
      <span style={{ pointerEvents: "none" }}>{item.icon}</span>
    </a>
  );
}

// ─── Animated link item ────────────────────────────────────────────────────────
function AnimLink({ label, delay, inView, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative text-white transition text-sm"
        style={{ outline: "none" }}
      >
        {label}

        <span
          style={{
            position: "absolute",
            bottom: -2,
            left: 0,
            height: 1,
            width: hovered ? "100%" : "0%",
            background: "rgba(255,255,255,0.6)",
            transition: "width 0.3s ease",
            display: "block",
          }}
        />
      </button>
    </li>
  );
}

// ─── Floating particles ────────────────────────────────────────────────────────
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.8 + 2) % 100}%`,
    size: 1.5 + (i % 3) * 1,
    dur: 6 + (i % 5) * 2,
    delay: -(i * 0.7),
    opacity: 0.06 + (i % 4) * 0.04,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "white",
            opacity: d.opacity,
            animation: `riseUp ${d.dur}s ease-in-out ${d.delay}s infinite, sway 6s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  const [footerRef, footerInView] = useInView(0.08);
  const [bottomRef, bottomInView] = useInView(0.3);

  const navigate = (to) => {
    window.location.href = to;
  };

  const handleClick = (item) => {
    if (item.type === "route") {
      navigate(item.to);
    } else {
      const el = document.getElementById(item.to);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.to)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  const customerLinks = [
    { label: "How it Works", to: "how-it-works", type: "section" },
    { label: "Help Center", to: "/contact", type: "route" },
    { label: "Pricing Guide", to: "pricing", type: "section" },
    { label: "Service Areas", to: "/contact", type: "route" },
    { label: "Customer Reviews", to: "reviews", type: "section" },
  ];

  const mechanicLinks = [
    { label: "Join as a Pro", to: "/signup", type: "route" },
    { label: "Mechanic Portal", to: "/mec-dashboard", type: "route" },
    { label: "Resource Center", to: "/resources", type: "route" },
    { label: "Success Stories", to: "/providers", type: "route" },
  ];

  const supportLinks = [
    { label: "Contact Us", to: "/contact", type: "route" },
    { label: "Privacy Policy", to: "/privacy", type: "route" },
    { label: "Terms of Service", to: "/terms", type: "route" },
  ];

  const iconLinks = [
    { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
    { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
    { icon: <FaBell />, to: "/notifications", label: "Notifications" },
  ];

  const cols = [
    { title: "For Customers", links: customerLinks },
    { title: "For Mechanics", links: mechanicLinks },
    { title: "Support", links: supportLinks },
  ];

  return (
    <>
      <style>{`
        @keyframes riseUp {
          0%   { transform: translateY(0) scale(1); opacity: var(--op, 0.08); }
          50%  { opacity: calc(var(--op, 0.08) * 1.8); }
          100% { transform: translateY(-420px) scale(0.4); opacity: 0; }
        }

        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes gradientSlide {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
          50%       { filter: drop-shadow(0 0 8px rgba(255,255,255,0.18)); }
        }

        @keyframes copyrightSlide {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24"
        style={{ background: "#15256E", position: "relative", overflow: "hidden" }}
      >
        <Particles />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* BRAND */}
            <div
              className="space-y-4"
              style={{
                opacity: footerInView ? 1 : 0,
                transform: footerInView ? "translateY(0)" : "translateY(30px)",
                transition: "0.7s ease",
              }}
            >
              <img
                src="/images/logo.png"
                alt="MokaNik Logo"
                className="h-10 sm:h-12"
                style={{
                  animation: footerInView ? "logoPulse 4s ease-in-out infinite" : "none",
                }}
              />

              <p className="max-w-xs text-sm text-white">
                Connecting car owners with trusted local mechanics for fast,
                transparent, and reliable repair services.
              </p>
            </div>

            {/* LINKS */}
            {cols.map((col, ci) => (
              <div key={col.title}>
                <h3 className="mb-4 font-semibold text-white">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((item, li) => (
                    <AnimLink
                      key={item.label}
                      label={item.label}
                      delay={0.2 + ci * 0.1 + li * 0.05}
                      inView={footerInView}
                      onClick={() => handleClick(item)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div
            ref={bottomRef}
            style={{
              height: 1,
              marginTop: "3rem",
              background:
                "linear-gradient(90deg, transparent, white, transparent)",
              backgroundSize: "200%",
              animation: bottomInView
                ? "gradientSlide 2.5s linear infinite alternate"
                : "none",
            }}
          />

          {/* BOTTOM */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
            <p className="text-xs text-white sm:text-sm">
              © 2026 MokaNik. All rights reserved.
            </p>

            <div className="flex gap-3">
              {iconLinks.map((item, i) => (
                <MagneticIcon
                  key={i}
                  item={item}
                  delay={i * 0.1}
                  inView={bottomInView}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}