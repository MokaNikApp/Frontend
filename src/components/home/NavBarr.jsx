import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md  border-gray-100 shadow-md">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="MokaNik"
            className="h-9 sm:h-12 object-contain"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-[#1C52AF] transition duration-300 hover:scale-105"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="hover:text-[#1C52AF] transition duration-300 hover:scale-105"
          >
            Services
          </Link>

          <Link
            to="/providers"
            className="hover:text-[#1C52AF] transition duration-300 hover:scale-105"
          >
            Providers
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm text-gray-700 hover:text-[#1C52AF] transition duration-300 font-semibold"
          >
            Log In
          </Link>

          <Link
            to="/services"
            className="bg-[#1C52AF] hover:bg-[#1C52AF] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:shadow-md transition duration-300"
          >
            Book a Service
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5 text-sm font-medium text-gray-700 shadow-md bg-white">
          
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-[#1C52AF] transition duration-300 font-semibold"
          >
            Home
          </Link>

          <Link
            to="/services"
            onClick={() => setOpen(false)}
            className="hover:text-[#1C52AF] transition duration-300 font-semibold"
          >
            Services
          </Link>

          <Link
            to="/providers"
            onClick={() => setOpen(false)}
            className="hover:text-[#1C52AF] transition duration-300 font-semibold"
          >
            Providers
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="hover:text-[#1C52AF] transition duration-300 font-semibold"
          >
            Log In
          </Link>

          <Link
            to="/services"
            onClick={() => setOpen(false)}
            className="bg-[#1C52AF] text-white py-2 rounded-md text-center font-semibold shadow-sm"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </div>
  );
}




