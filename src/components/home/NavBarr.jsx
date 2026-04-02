import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        
        {/* LEFT - Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="MokaNik"
            className="h-8 sm:h-10 object-contain"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm">
          <Link
            to="/"
            className="hover:text-blue-700 text-black hover:underline transition-300"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="hover:text-blue-700 text-black hover:underline transition-300"
          >
            Services
          </Link>

          <Link
            to="/providers"
            className="hover:text-blue-700 text-black hover:underline transition-300"
          >
            Providers
          </Link>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <Link to="/login" className="text-sm hover:text-base transition-all text-gray-900">
            <b>Log In</b>
          </Link>

          <Link
            to="/services"
            className="bg-blue-800 hover:bg-blue-700 hover:text-base transition-all text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-medium"
          >
            Book a Service
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 py-6 sm:px-6 pb-4 flex flex-col space-y-4 text-sm border-t">
          
          {/* LEFT ITEMS */}
          <div className="flex flex-col text-black space-y-4 text-left">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link to="/providers" onClick={() => setOpen(false)}>
              Providers
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-gray-900 hover:text-blue-600 transition"
            >
              <b>Log In</b>
            </Link>
          </div>

          {/* RIGHT ITEMS (centered) */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="bg-blue-800 text-white px-4 py-2 rounded-lg text-center w-full sm:w-auto"
            >
              Book a Service
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}