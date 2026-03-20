import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-4 bg-gray-100 border-t border-gray-300">
      <div className="flex flex-col items-center justify-between gap-4 mx-auto max-w-7xl sm:flex-row">
        {/* Left side: copyright */}
        <div className="text-sm text-center text-gray-600 sm:text-left">
          © 2026 MokaNik Inc. All rights reserved.
        </div>

        {/* Right side: links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 sm:justify-end">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/help" className="hover:underline">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;