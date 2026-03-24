// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen p-4 sm:p-6">
      
//       {/* Top Section */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
//         {/* Greeting */}
//         <div>
//           <p className="text-lg font-semibold sm:text-xl">
//             Good afternoon, Olamide 👋
//           </p>
//           <p className="text-sm text-gray-500">
//             Here's what's happening with your vehicles today.
//           </p>
//         </div>

//         {/* Button */}
//         <button className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
//           + Book a Service
//         </button>
//       </div>

//       {/* Cards Section */}
//       <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        
//         {/* Card 1 */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <p className="text-sm text-gray-500">Total Vehicles</p>
//           <h2 className="text-2xl font-bold">3</h2>
//           <p className="text-[#16A34A]"> from last month</p>
//         </div>

//         {/* Card 2 */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <p className="text-sm text-gray-500">Active Services</p>
//           <h2 className="text-2xl font-bold">1</h2>
//           <p>Efficiency rate: 92%</p>
//         </div>

//         {/* Card 3 */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <p className="text-sm text-gray-500">Pending Payments</p>
//           <h2 className="text-2xl font-bold">₦45,000</h2>
//           <p className="text-[#D97706]">2 require immediate action</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;





// import React from "react";
// import { FaCar, FaTools, FaMoneyBillWave } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen p-4 sm:p-6">
      
//       {/* Top Section */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
//         {/* Greeting */}
//         <div>
//           <p className="text-lg font-semibold sm:text-xl">
//             Good afternoon, Olamide 👋
//           </p>
//           <p className="text-sm text-gray-500">
//             Here's what's happening with your vehicles today.
//           </p>
//         </div>

//         {/* Button */}
//         <button className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
//           + Book a Service
//         </button>
//       </div>

//       {/* Cards Section */}
//       <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        
//         {/* Card 1 */}
//         <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
//              <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
//             <FaCar size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Vehicles</p>
//             <h2 className="text-2xl font-bold">3</h2>
//             <p className="text-[#16A34A] text-sm">+2 from last month</p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
//              <div className="p-3 text-green-600 bg-green-100 rounded-full">
//             <FaTools size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Active Services</p>
//             <h2 className="text-2xl font-bold">1</h2>
//             <p className="text-sm text-gray-500">Efficiency rate: 92%</p>
//           </div>
//           <div className="p-3 text-green-600 bg-green-100 rounded-full">
//             <FaTools size={20} />
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
//              <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
//             <FaMoneyBillWave size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Pending Payments</p>
//             <h2 className="text-2xl font-bold">₦45,000</h2>
//             <p className="text-[#D97706] text-sm">
//               2 require immediate action
//             </p>
//           </div>
          
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;





import React from "react";
import { FaCar, FaTools, FaMoneyBillWave } from "react-icons/fa";
import Background from '../../assets/images/Background.png'

const Dashboard = () => {
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

        <button className="px-4 py-2 text-sm text-white bg-[#1C52AF] rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
          + Book a Service
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1 */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
            <FaCar size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Vehicles</p>
            <h2 className="text-2xl font-bold">3</h2>
            <p className="text-[#16A34A] text-sm">+2 from last month</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-green-600 bg-green-100 rounded-full">
            <FaTools size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Services</p>
            <h2 className="text-2xl font-bold">1</h2>
            <p className="text-sm text-gray-500">Efficiency rate: 92%</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
            <FaMoneyBillWave size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <h2 className="text-2xl font-bold">₦45,000</h2>
            <p className="text-[#D97706] text-sm">
              2 require immediate action
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="">
            <p>Active Service Status</p>
        </div>
        <div className="">
            <p>In Progress</p>
        </div>
         <div className="">
        <div className="">
         <img src={Background} alt="" />   
        </div>
        <div className="">
            <p>Toyota Camry 2022 - V6 Engine</p>
            <p>Full Diagnostic & Engine Tune-up</p>
        </div>
        <div className="flex justify-between">
            <p>Progress</p>
            <p>65%</p>
        </div>
        <p>i need progress br</p>
        </div>
        <div className="">Estimated completion: 2:00 PM</div>
        </div>
        <div className="">
            <p>View Live Progress</p>
        </div>
    </div>
  );
};

export default Dashboard;