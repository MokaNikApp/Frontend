import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

export default function Topbar({ toggleSidebar }) {
  return (
    <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between border-b">

      {/* LEFT */}
      <div className="flex items-center gap-3 w-full sm:w-auto">

        {/* HAMBURGER */}
        <button
          className="lg:hidden text-gray-700 text-xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        {/* SEARCH */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full sm:w-75 lg:w-[40%]">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for jobs, clients or parts..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex sm:gap-6 items-center gap-4">

        <div className="hidden sm:flex border-gray-400 rounded-lg text-xs whitespace-nowrap shrink-0">
          <span className="px-2 py-1 bg-green-100 text-green-600">Online</span>
          <span className="px-2 py-1 text-gray-500">Offline</span>
        </div>

        <div className="relative">
          <FiBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <p className="font-medium text-gray-800">Marco Rossi</p>
            <p className="text-gray-400">Senior Mechanic</p>
          </div>

          <img
            src="/images/Profile.png"
            alt="profile"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}