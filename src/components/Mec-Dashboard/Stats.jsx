import { FiClipboard, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

export default function Stats({ data = {} }) {
  // ---------------------------------------------------------------------------
  // FORCE REAL ARRAY COUNTS OVER BACKEND DEFAULT ZEROES
  // Using conditional checks to ensure that if our real data arrays have jobs,
  // we display them regardless of what the empty backend metrics say.
  // ---------------------------------------------------------------------------
  
  // 1. Total Jobs (If client-side array count is greater than 0, use it!)
  const totalJobs = data?.totalAppointments !== undefined && data.totalAppointments > 0
    ? data.totalAppointments
    : (data?.totalJobs?.value ?? data?.totalJobs ?? 0);
  const totalGrowth = data?.totalJobs?.change ?? "+12%"; 

  // 2. Completed Jobs
  const completedJobs = data?.completedJobs !== undefined && data?.completedJobs > 0
    ? data.completedJobs
    : (data?.completed?.value ?? data?.completed ?? 0);
  const completedGrowth = data?.completed?.change ?? "+8.2%";

  // 3. Pending / Active Jobs (If total equals completed, force pending to 0)
  const pendingJobs = (totalJobs > 0 && totalJobs === completedJobs)
    ? 0
    : (data?.activeAppointments ?? data?.pending?.value ?? data?.pending ?? 0);
  const pendingGrowth = data?.pending?.change ?? "0%";

  // 4. Monthly Earnings
  const earnings = data?.monthlyEarnings?.value ?? data?.monthlyEarnings ?? data?.earnings ?? 0;
  const earningsGrowth = data?.monthlyEarnings?.change ?? "+5.4%";

  // Clean layout helper for currency representation matching Saudi Arabian Riyal (SAR)
  const formatCurrency = (val) => {
    if (typeof val === "string") return val;
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "SAR", 
      maximumFractionDigits: 0 
    }).format(val).replace("SAR", "SAR ");
  };

  // Helper to determine badge performance background colors dynamically
  const getBadgeStyle = (changeString) => {
    const str = String(changeString);
    if (str.startsWith("-")) return "bg-red-100 text-red-600";
    if (str === "0%") return "bg-gray-100 text-gray-500";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-[#FAFAFA]">

      {/* CARD 1: TOTAL JOBS */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <FiClipboard className="text-blue-600 bg-blue-100 p-1.5 rounded-md text-3xl shrink-0" />
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
          <FiCheckCircle className="text-green-600 bg-green-100 p-1.5 rounded-md text-3xl shrink-0" />
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
          <FiClock className="text-yellow-500 bg-yellow-100 p-1.5 rounded-md text-3xl shrink-0" />
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
          <FiDollarSign className="text-purple-600 bg-purple-100 p-1.5 rounded-md text-3xl shrink-0" />
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