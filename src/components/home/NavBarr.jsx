



import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-[72px] px-6 sm:px-0">
        
        {/* ─── LOGO ─────────────────────────────────────────── */}
        <Link to="/" className="flex items-center shrink-0 h-full" onClick={handleNav}>
          <img
            src="/images/logo.png"
            alt="MokaNik"
            className="h-9 sm:h-11 object-contain"
          />
        </Link>

        {/* ─── DESKTOP LINKS ──────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/providers", label: "Providers" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex items-center h-full text-[15px] font-medium text-gray-600 hover:text-[#1C52AF] transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute left-0 bottom-4 w-0 h-0.5 bg-[#1C52AF] rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* ─── DESKTOP CTA BUTTONS ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-3 h-full">
          {/* Log In — Ghost Button */}
          <Link
            to="/login"
            className="relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-[15px] font-semibold text-gray-700 hover:text-[#1C52AF] transition-colors duration-200 group"
          >
            <span className="relative z-10">Log In</span>
            <span className="absolute inset-0 bg-blue-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
          </Link>

          {/* Book a Service — Primary Button */}
          <Link
            to="/services"
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C52AF] text-white text-[15px] font-semibold shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 group"
          >
            <span className="relative z-10">Book a Service</span>
           
            <span className="absolute inset-0 bg-gradient-to-r from-[#1C52AF] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* ─── MOBILE HAMBURGER ─────────────────────────────── */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <div className="w-5 h-5 relative flex flex-col justify-center items-center">
            <span className={`absolute block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
            <span className={`absolute block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </div>
        </button>
      </div>

      {/* ─── MOBILE MENU ──────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-1 bg-white border-t border-gray-100">
          {/* Nav Links */}
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/providers", label: "Providers" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleNav}
              className="px-4 py-3 rounded-xl text-[15px] font-medium text-gray-700 hover:text-[#1C52AF] hover:bg-blue-50/50 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-gray-100 my-2" />

          {/* Mobile Log In */}
          <Link
            to="/login"
            onClick={handleNav}
            className="mx-4 px-4 py-3 rounded-xl text-[15px] font-semibold text-center text-gray-700 border border-gray-200 hover:border-[#1C52AF] hover:text-[#1C52AF] hover:bg-blue-50/30 active:scale-[0.98] transition-all duration-200"
          >
            Log In
          </Link>

          {/* Mobile Book a Service */}
          <Link
            to="/services"
            onClick={handleNav}
            className="mx-4 mt-1 px-4 py-3.5 rounded-xl text-[15px] font-semibold text-center text-white bg-[#1C52AF] shadow-lg shadow-blue-900/20 active:scale-[0.98] active:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Book a Service
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}