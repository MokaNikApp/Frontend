import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-24">
      
      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

          {/* LOGO */}
          <div>
            <img
              src="/images/logo.png"
              alt="MokaNik Logo"
              className="h-8 sm:h-10 mb-4 sm:mb-6"
            />

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
              Connecting car owners with the best local mechanics for reliable,
              transparent, and high-quality repair services.
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              For Customers
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#">How it Works</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Pricing Guide</a></li>
              <li><a href="#">Service Areas</a></li>
              <li><a href="#">Customer Reviews</a></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              For Mechanics
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#">Join as a Pro</a></li>
              <li><a href="#">Mechanic Portal</a></li>
              <li><a href="#">Resource Center</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Support
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-10 sm:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

          {/* COPYRIGHT */}
          <p className="text-xs sm:text-sm text-gray-400">
            © 2026 MokaNik. All Rights Reserved 2026.
          </p>

          {/* ICONS */}
          <div className="flex space-x-3 sm:space-x-4 mt-4 md:mt-0">
            
            <div className="p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700">
              <FaGlobe size={14} />
            </div>

            <div className="p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700">
              <FaEnvelope size={14} />
            </div>

            <div className="p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700">
              <FaBell size={14} />
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}