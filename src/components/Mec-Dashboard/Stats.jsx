import { FiClipboard, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-[#FAFAFA]">

      {/* CARD 1 */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border">
        <div className="flex justify-between items-start">
          <FiClipboard className="text-blue-600 bg-blue-100 p-0.5 rounded-md text-lg" />
          <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
            +12%
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4">Total Jobs</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">124</h3>
      </div>

      {/* CARD 2 */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border">
        <div className="flex justify-between items-start">
          <FiCheckCircle className="text-green-600 bg-green-100 p-0.5 rounded-md text-lg" />
          <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
            +10%
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4">Completed</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">118</h3>
      </div>

      {/* CARD 3 */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border">
        <div className="flex justify-between items-start">
          <FiClock className="text-yellow-500 bg-yellow-100 p-0.5 rounded-md text-lg" />
          <span className="text-red-500 text-xs bg-red-100 px-2 py-0.5 rounded">
            -2%
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4">Pending</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">6</h3>
      </div>

      {/* CARD 4 */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border">
        <div className="flex justify-between items-start">
          <FiDollarSign className="text-purple-600 p-0.5 bg-purple-100 rounded-md text-lg" />
          <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
            +15%
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4">Monthly Earnings</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">$8,420</h3>
      </div>

    </div>
  );
}