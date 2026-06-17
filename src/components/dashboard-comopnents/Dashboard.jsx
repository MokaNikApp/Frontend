





// import React from "react";
// import { FaCar, FaTools, FaMoneyBillWave } from "react-icons/fa";
// import Background from '../../assets/images/Background.png'
// import ActiveService from "../../components/dashboard-comopnents/ActiveService";
// import RecentActivity from "./RecentActivity";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const Dashboard = () => {

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen p-4 sm:p-6">
      
//       {/* Top Section */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="text-lg font-semibold sm:text-xl">
//             Good afternoon, Olamide 👋
//           </p>
//           <p className="text-sm text-gray-500">
//             Here's what's happening with your vehicles today.
//           </p>
//         </div>

      
//         <button
//           onClick={() => navigate("/book-service")}
//           className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md transition w-full sm:w-auto"
//         >
//           + Book a Service
//         </button>
//       </div>

//       {/* Cards */}
//     {/* Cards */}
// <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">

//   {/* Card 1 */}
//   <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm border border-blue-100 hover:shadow-md transition">
//     <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
//       <FaCar size={20} />
//     </div>
//     <div>
//       <p className="text-sm text-gray-500">Total Vehicles</p>
//       <h2 className="text-2xl font-bold text-gray-800">3</h2>
//       <p className="text-sm text-green-600 font-medium">+2 from last month</p>
//     </div>
//   </div>

//   {/* Card 2 */}
//   <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-sm border border-green-100 hover:shadow-md transition">
//     <div className="p-3 text-green-600 bg-green-100 rounded-full">
//       <FaTools size={20} />
//     </div>
//     <div>
//       <p className="text-sm text-gray-500">Active Services</p>
//       <h2 className="text-2xl font-bold text-gray-800">1</h2>
//       <p className="text-sm text-gray-500 font-medium">Efficiency rate: 92%</p>
//     </div>
//   </div>

//   {/* Card 3 */}
//   <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-white shadow-sm border border-yellow-100 hover:shadow-md transition">
//     <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
//       <FaMoneyBillWave size={20} />
//     </div>
//     <div>
//       <p className="text-sm text-gray-500">Pending Payments</p>
//       <h2 className="text-2xl font-bold text-gray-800">₦45,000</h2>
//       <p className="text-sm text-yellow-600 font-medium">
//         2 require immediate action
//       </p>
//     </div>
//   </div>

// </div>
      
//   <div className="mt-8">
//    <ActiveService />
//    </div>
//    <div className="mt-8">
//    <RecentActivity />
//    </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { FaCar, FaTools, FaMoneyBillWave, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import ActiveService from "../../components/dashboard-comopnents/ActiveService";
import RecentActivity from "./RecentActivity";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/customer/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1C52AF] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-[#1C52AF] underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { user, stats, activeServices, upcomingServices, recentActivity, maintenanceTips } = dashboardData;

  return (
    <div className="min-h-screen p-4 sm:p-6">

      {/* Top Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold sm:text-xl">
            Good afternoon, {user?.firstName} 👋
          </p>
          <p className="text-sm text-gray-500">
            Here's what's happening with your vehicles today.
          </p>
        </div>
        <button
          onClick={() => navigate("/book-service")}
          className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md transition w-full sm:w-auto hover:bg-[#163f8a] active:scale-95"
        >
          + Book a Service
        </button>
      </div>

      {/* Stats Cards — all 5 fields from API */}
      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 xl:grid-cols-5">

        {/* 1. Total Vehicles */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm border border-blue-100 hover:shadow-md transition">
          <div className="p-2.5 text-blue-600 bg-blue-100 rounded-full shrink-0">
            <FaCar size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Vehicles</p>
            <h2 className="text-xl font-bold text-gray-800">{stats?.vehiclesCount ?? 0}</h2>
            {stats?.monthlyChange && stats.monthlyChange !== "0" ? (
              <p className="text-[11px] text-green-600 font-medium">+{stats.monthlyChange} this month</p>
            ) : (
              <p className="text-[11px] text-gray-400">No change</p>
            )}
          </div>
        </div>

        {/* 2. Total Services */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow-sm border border-indigo-100 hover:shadow-md transition">
          <div className="p-2.5 text-indigo-600 bg-indigo-100 rounded-full shrink-0">
            <FaTools size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Services</p>
            <h2 className="text-xl font-bold text-gray-800">{stats?.totalServices ?? 0}</h2>
            <p className="text-[11px] text-gray-400">All time</p>
          </div>
        </div>

        {/* 3. Completed */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-sm border border-green-100 hover:shadow-md transition">
          <div className="p-2.5 text-green-600 bg-green-100 rounded-full shrink-0">
            <FaCheckCircle size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Completed</p>
            <h2 className="text-xl font-bold text-gray-800">{stats?.completed ?? 0}</h2>
            <p className="text-[11px] text-gray-400">
              Efficiency: {stats?.efficiencyRate ?? 0}%
            </p>
          </div>
        </div>

        {/* 4. Pending */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-white shadow-sm border border-yellow-100 hover:shadow-md transition">
          <div className="p-2.5 text-yellow-600 bg-yellow-100 rounded-full shrink-0">
            <FaHourglassHalf size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-gray-800">{stats?.pending ?? 0}</h2>
            {stats?.pending > 0 ? (
              <p className="text-[11px] text-yellow-600 font-medium">Awaiting action</p>
            ) : (
              <p className="text-[11px] text-gray-400">All clear</p>
            )}
          </div>
        </div>

        {/* 5. Unpaid Bills — pendingCount */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-red-50 to-white shadow-sm border border-red-100 hover:shadow-md transition col-span-2 sm:col-span-1">
          <div className="p-2.5 text-red-500 bg-red-100 rounded-full shrink-0">
            <FaMoneyBillWave size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Unpaid Bills</p>
            <h2 className="text-xl font-bold text-gray-800">{stats?.pendingCount ?? 0}</h2>
            {stats?.pendingCount > 0 ? (
              <p className="text-[11px] text-red-500 font-medium">Needs attention</p>
            ) : (
              <p className="text-[11px] text-gray-400">All paid up</p>
            )}
          </div>
        </div>

      </div>

      {/* Active Service — always shown, handles empty state internally */}
      <div className="mt-8">
        <ActiveService
          activeServices={activeServices}
          upcomingServices={upcomingServices}
        />
      </div>

      {/* Recent Activity — always shown */}
      <div className="mt-8">
        <RecentActivity
          recentActivity={recentActivity}
          maintenanceTips={maintenanceTips}
        />
      </div>

    </div>
  );
};

export default Dashboard;