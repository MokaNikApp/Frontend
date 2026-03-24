import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-16 px-6 lg:px-24">
      
      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* LOGO */}
          <div>
            <img
              src="/images/logo.png"
              alt="MokaNik Logo"
              className="h-10 mb-6"
            />

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Connecting car owners with the best local mechanics for reliable,
              transparent, and high-quality repair services.
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              For Customers
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-700">How it Works</a></li>
              <li><a href="#" className="hover:text-blue-700">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-700">Pricing Guide</a></li>
              <li><a href="#" className="hover:text-blue-700">Service Areas</a></li>
              <li><a href="#" className="hover:text-blue-700">Customer Reviews</a></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              For Mechanics
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-700">Join as a Pro</a></li>
              <li><a href="#" className="hover:text-blue-700">Mechanic Portal</a></li>
              <li><a href="#" className="hover:text-blue-700">Resource Center</a></li>
              <li><a href="#" className="hover:text-blue-700">Success Stories</a></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-700">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-700">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-700">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2026 MokaNik. All Rights Reserved.
          </p>

          {/* ICONS */}
          <div className="flex space-x-4">
            
            <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition">
              <FaGlobe size={14} />
            </div>

            <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition">
              <FaEnvelope size={14} />
            </div>

            <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition">
              <FaBell size={14} />
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}