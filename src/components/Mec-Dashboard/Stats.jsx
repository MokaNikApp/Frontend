import { FiClipboard, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

export default function Stats({ data = {} }) {
  // Extract values and trend changes precisely from the nested backend fields
  const totalJobs = data?.totalJobs?.value ?? 0;
  const totalGrowth = data?.totalJobs?.change ?? "0%";

  const completedJobs = data?.completed?.value ?? 0;
  const completedGrowth = data?.completed?.change ?? "0%";

  const pendingJobs = data?.pending?.value ?? 0;
  const pendingGrowth = data?.pending?.change ?? "0%";

  const earnings = data?.monthlyEarnings?.value ?? 0;
  const earningsGrowth = data?.monthlyEarnings?.change ?? "0%";

  // Helper function to safely format numbers into currency structures ($0)
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      maximumFractionDigits: 0 
    }).format(val);
  };

  // Helper to determine badge background and text colors dynamically based on performance trends
  const getBadgeStyle = (changeString) => {
    if (changeString.startsWith("-")) return "bg-red-100 text-red-600";
    if (changeString === "0%") return "bg-gray-100 text-gray-500";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-[#FAFAFA]">

      {/* CARD 1: TOTAL JOBS */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <FiClipboard className="text-blue-600 bg-blue-100 p-0.5 rounded-md text-lg" />
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getBadgeStyle(totalGrowth)}`}>
            {totalGrowth}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-medium">Total Jobs</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">{totalJobs}</h3>
      </div>

      {/* CARD 2: COMPLETED */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <FiCheckCircle className="text-green-600 bg-green-100 p-0.5 rounded-md text-lg" />
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getBadgeStyle(completedGrowth)}`}>
            {completedGrowth}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-medium">Completed</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">{completedJobs}</h3>
      </div>

      {/* CARD 3: PENDING */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <FiClock className="text-yellow-500 bg-yellow-100 p-0.5 rounded-md text-lg" />
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getBadgeStyle(pendingGrowth)}`}>
            {pendingGrowth}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-medium">Pending</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">{pendingJobs}</h3>
      </div>

      {/* CARD 4: MONTHLY EARNINGS */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <FiDollarSign className="text-purple-600 p-0.5 bg-purple-100 rounded-md text-lg" />
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getBadgeStyle(earningsGrowth)}`}>
            {earningsGrowth}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-medium">Monthly Earnings</p>
        <h3 className="text-lg sm:text-xl text-black font-bold mt-1">{formatCurrency(earnings)}</h3>
      </div>

    </div>
  );
}