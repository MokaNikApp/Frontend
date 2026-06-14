





import React from "react";
import { FaCar, FaTools, FaMoneyBillWave } from "react-icons/fa";
import Background from '../../assets/images/Background.png'
import ActiveService from "../../components/dashboard-comopnents/ActiveService";
import RecentActivity from "./RecentActivity";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-6">
      
      {/* Top Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold sm:text-xl">
            Good afternoon, Olamide 👋
          </p>
          <p className="text-sm text-gray-500">
            Here's what's happening with your vehicles today.
          </p>
        </div>

      
        <button
          onClick={() => navigate("/book-service")}
          className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md transition w-full sm:w-auto"
        >
          + Book a Service
        </button>
      </div>

      {/* Cards */}
    {/* Cards */}
<div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">

  {/* Card 1 */}
  <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm border border-blue-100 hover:shadow-md transition">
    <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
      <FaCar size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Total Vehicles</p>
      <h2 className="text-2xl font-bold text-gray-800">3</h2>
      <p className="text-sm text-green-600 font-medium">+2 from last month</p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-sm border border-green-100 hover:shadow-md transition">
    <div className="p-3 text-green-600 bg-green-100 rounded-full">
      <FaTools size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Active Services</p>
      <h2 className="text-2xl font-bold text-gray-800">1</h2>
      <p className="text-sm text-gray-500 font-medium">Efficiency rate: 92%</p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-white shadow-sm border border-yellow-100 hover:shadow-md transition">
    <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
      <FaMoneyBillWave size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Pending Payments</p>
      <h2 className="text-2xl font-bold text-gray-800">₦45,000</h2>
      <p className="text-sm text-yellow-600 font-medium">
        2 require immediate action
      </p>
    </div>
  </div>

</div>
      
  <div className="mt-8">
   <ActiveService />
   </div>
   <div className="mt-8">
   <RecentActivity />
   </div>
    </div>
  );
};

export default Dashboard;







