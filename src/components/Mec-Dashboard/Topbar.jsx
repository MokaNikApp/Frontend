import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

export default function Topbar({ toggleSidebar, isOnline, setIsOnline }) {

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between border-b">

      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden text-gray-700 text-xl" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="flex items-center bg-gray-100 text-black  px-3 py-2 rounded-lg w-40 sm:w-68 lg:w-[40%]">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search requests..."
            className="bg-transparent outline-none text-blue-800 text-sm w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex sm:gap-6 items-center gap-4">

        {/* ONLINE / OFFLINE TOGGLE */}
        <button
          onClick={handleToggle}
          className="hidden sm:flex border border-gray-200 rounded-lg text-xs whitespace-nowrap shrink-0 overflow-hidden"
        >
          <span
            className={`px-3 py-1.5 font-semibold transition-colors duration-300 ${
              isOnline ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
            }`}
          >
            Online
          </span>
          <span
            className={`px-3 py-1.5 font-semibold transition-colors duration-300 ${
              !isOnline ? "bg-red-100 text-red-500" : "text-gray-400"
            }`}
          >
            Offline
          </span>
        </button>

        {/* BELL */}
        <div className="relative">
          <FiBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs hidden sm:block">
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