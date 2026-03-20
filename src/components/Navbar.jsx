


import React from "react";
import logo from "../assets/images/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm py-4 px-6 lg:px-24">
      <div className="flex items-center justify-between mx-auto max-w-7xl">

        {/* Logo on the left */}
        <div className="shrink-0">
          {logo ? (
            <img
              src={logo}
              alt="Logo"
              className="w-auto h-8 sm:h-10" // smaller on mobile, bigger on sm+
            />
          ) : (
            <div className="flex items-center justify-center h-8 text-xs text-gray-500 bg-gray-200 w-28 sm:w-32 sm:h-10 sm:text-sm">
              Logo
            </div>
          )}
        </div>

        {/* Right side: Support + Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Support Info */}
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-600 sm:text-sm">Support</span>
            <span className="text-xs font-semibold text-gray-800 text-[9px] sm:text-sm">1-800-MOKANIK</span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2">
            {/* Profile Avatar */}
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full sm:w-10 sm:h-10">
              <HiOutlineUserCircle className="text-xl text-gray-400 sm:text-2xl" />
            </div>
            {/* Profile Info */}
           
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;