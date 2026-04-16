// import React from "react";
// import {
//   HiOutlineFilter,
//   HiOutlineDownload,
//   HiOutlineClipboardCheck,
//   HiOutlineCash,
//   HiOutlineClock,
//   HiOutlineStar,
// } from "react-icons/hi";

// const ServiceHistory = () => {
//   return (
//     <div>
//       <div className="flex flex-col gap-4 mb-4">
//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//           <div>
//             <h1 className="text-xl font-semibold">Service History</h1>
//             <p className="text-sm text-gray-500">
//               Review all historical maintenance and repair services across your
//               fleet.
//             </p>
//           </div>

//           <div className="flex gap-3">
//             {/* Filters */}
//             <p className="bg-white flex items-center gap-2 px-3 py-2 rounded-md shadow-sm cursor-pointer">
//               <HiOutlineFilter className="text-lg" />
//               Filters
//             </p>

//             {/* Export */}
//             <p className="bg-white flex items-center gap-2 px-3 py-2 rounded-md shadow-sm cursor-pointer">
//               <HiOutlineDownload className="text-lg" />
//               Export CSV
//             </p>
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-4">
//           {/* Total Completed */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//             <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
//               <HiOutlineClipboardCheck size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Completed</p>
//               <h2 className="text-2xl font-bold">1,284</h2>
//               <p className="text-[#16A34A] text-sm">12% vs last month</p>
//             </div>
//           </div>

//           {/* Avg Cost */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//             <div className="p-3 text-green-600 bg-green-100 rounded-full">
//               <HiOutlineCash size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Avg. Service Cost</p>
//               <h2 className="text-2xl font-bold">$186.50</h2>
//               <p className="text-sm text-red-700">3% vs last month</p>
//             </div>
//           </div>

//           {/* Pending */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//             <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
//               <HiOutlineClock size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Pending Payments</p>
//               <h2 className="text-2xl font-bold">18</h2>
//               <p className="text-[#D97706] text-sm">Action required</p>
//             </div>
//           </div>

//           {/* Satisfaction */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//             <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
//               <HiOutlineStar size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Customer Satisfaction</p>
//               <h2 className="text-2xl font-bold">4.9/5</h2>
//               <p className="text-sm text-green-600">High rating</p>
//             </div>
//           </div>
//         </div>

//         <div className="">
//           {/* Table Section */}

//           <div className="mt-6 bg-white rounded-xl shadow p-4">
//             <div className="w-full overflow-x-auto">
//               <table className="table table-zebra w-full min-w-[700px]">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Service</th>
//                     <th>Vehicle</th>
//                     <th>Mechanic</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <th>1</th>
//                     <td>Oil Change</td>
//                     <td>Tesla Model 3</td>
//                     <td>Marco Rossi</td>
//                     <td>12 Mar 2026</td>
//                     <td>
//                       <span className="badge badge-success">Completed</span>
//                     </td>
//                     <td>$89</td>
//                   </tr>
//                   <tr>
//                     <th>2</th>
//                     <td>Brake Repair</td>
//                     <td>Honda Civic</td>
//                     <td>Lara Smith</td>
//                     <td>10 Mar 2026</td>
//                     <td>
//                       <span className="badge badge-warning">Pending</span>
//                     </td>
//                     <td>$120</td>
//                   </tr>
//                   <tr>
//                     <th>3</th>
//                     <td>AC Service</td>
//                     <td>Toyota Camry</td>
//                     <td>John Doe</td>
//                     <td>08 Mar 2026</td>
//                     <td>
//                       <span className="badge badge-error">Cancelled</span>
//                     </td>
//                     <td>$75</td>
//                   </tr>
//                   <tr>
//                     <th>4</th>
//                     <td>Tire Rotation</td>
//                     <td>Tesla Model 3</td>
//                     <td>Marco Rossi</td>
//                     <td>05 Mar 2026</td>
//                     <td>
//                       <span className="badge badge-success">Completed</span>
//                     </td>
//                     <td>$45</td>
//                   </tr>
//                   <tr>
//                     <th>5</th>
//                     <td>Engine Diagnostic</td>
//                     <td>Honda Civic</td>
//                     <td>Lara Smith</td>
//                     <td>01 Mar 2026</td>
//                     <td>
//                       <span className="badge badge-success">Completed</span>
//                     </td>
//                     <td>$99</td>
//                   </tr>
//                   <tr>
//                     <th>6</th>
//                     <td>Full Service</td>
//                     <td>Toyota Camry</td>
//                     <td>John Doe</td>
//                     <td>28 Feb 2026</td>
//                     <td>
//                       <span className="badge badge-warning">Pending</span>
//                     </td>
//                     <td>$250</td>
//                   </tr>
//                   <tr>
//                     <th>7</th>
//                     <td>AC Repair</td>
//                     <td>Tesla Model 3</td>
//                     <td>Marco Rossi</td>
//                     <td>25 Feb 2026</td>
//                     <td>
//                       <span className="badge badge-success">Completed</span>
//                     </td>
//                     <td>$80</td>
//                   </tr>
//                   <tr>
//                     <th>8</th>
//                     <td>Brake Pad Replacement</td>
//                     <td>Honda Civic</td>
//                     <td>Lara Smith</td>
//                     <td>20 Feb 2026</td>
//                     <td>
//                       <span className="badge badge-error">Cancelled</span>
//                     </td>
//                     <td>$110</td>
//                   </tr>
//                   <tr>
//                     <th>9</th>
//                     <td>Battery Check</td>
//                     <td>Toyota Camry</td>
//                     <td>John Doe</td>
//                     <td>15 Feb 2026</td>
//                     <td>
//                       <span className="badge badge-success">Completed</span>
//                     </td>
//                     <td>$30</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceHistory;







// import React from "react";
// import {
//   HiOutlineFilter,
//   HiOutlineDownload,
//   HiOutlineClipboardCheck,
//   HiOutlineCash,
//   HiOutlineClock,
//   HiOutlineStar,
// } from "react-icons/hi";

// const ServiceHistory = () => {
//   return (
//     <div className="px-4 sm:px-6 lg:px-10 py-6 bg-gray-50 min-h-screen">

//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-6">

//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">
//               Service History
//             </h1>
//             <p className="text-sm text-gray-500">
//               Review all historical maintenance and repair services across your fleet.
//             </p>
//           </div>

//           {/* BUTTONS (SOFT COLORS) */}
//           <div className="flex flex-wrap gap-3">

//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition text-gray-700 text-sm">
//               <HiOutlineFilter className="text-lg text-[#1C52AF]" />
//               Filters
//             </button>

//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/20 transition text-sm">
//               <HiOutlineDownload className="text-lg" />
//               Export CSV
//             </button>

//           </div>
//         </div>

//         {/* CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
//             <div className="p-3 text-[#1C52AF] bg-[#1C52AF]/10 rounded-full">
//               <HiOutlineClipboardCheck size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Completed</p>
//               <h2 className="text-2xl font-bold text-gray-900">1,284</h2>
//               <p className="text-xs text-green-600">+12% vs last month</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
//             <div className="p-3 text-emerald-600 bg-emerald-50 rounded-full">
//               <HiOutlineCash size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Avg. Service Cost</p>
//               <h2 className="text-2xl font-bold text-gray-900">$186.50</h2>
//               <p className="text-xs text-gray-500">-3% vs last month</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
//             <div className="p-3 text-amber-600 bg-amber-50 rounded-full">
//               <HiOutlineClock size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Pending Payments</p>
//               <h2 className="text-2xl font-bold text-gray-900">18</h2>
//               <p className="text-xs text-amber-600">Action required</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
//             <div className="p-3 text-purple-600 bg-purple-50 rounded-full">
//               <HiOutlineStar size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Satisfaction</p>
//               <h2 className="text-2xl font-bold text-gray-900">4.9/5</h2>
//               <p className="text-xs text-emerald-600">Excellent</p>
//             </div>
//           </div>

//         </div>

//         {/* TABLE */}
//         <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">

//           <div className="overflow-x-auto">
//             <table className="min-w-[800px] w-full text-sm">

//               <thead className="bg-gray-50 text-gray-600">
//                 <tr>
//                   <th className="p-3 text-left">#</th>
//                   <th className="p-3 text-left">Service</th>
//                   <th className="p-3 text-left">Vehicle</th>
//                   <th className="p-3 text-left">Mechanic</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Amount</th>
//                 </tr>
//               </thead>

//               <tbody className="text-gray-700">

//                 {[
//                   ["1", "Oil Change", "Tesla Model 3", "Marco Rossi", "12 Mar 2026", "Completed", "$89", "green"],
//                   ["2", "Brake Repair", "Honda Civic", "Lara Smith", "10 Mar 2026", "Pending", "$120", "amber"],
//                   ["3", "AC Service", "Toyota Camry", "John Doe", "08 Mar 2026", "Cancelled", "$75", "red"],
//                 ].map((row, i) => (
//                   <tr key={i} className="border-t hover:bg-gray-50 transition">
//                     {row.slice(0, 5).map((cell, j) => (
//                       <td key={j} className="p-3 whitespace-nowrap">{cell}</td>
//                     ))}

//                     {/* STATUS */}
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium
//                           ${row[5] === "Completed" ? "bg-emerald-100 text-emerald-700"
//                           : row[5] === "Pending" ? "bg-amber-100 text-amber-700"
//                           : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {row[5]}
//                       </span>
//                     </td>

//                     <td className="p-3 font-semibold">{row[6]}</td>
//                   </tr>
//                 ))}

//               </tbody>

//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ServiceHistory;






import React from "react";
import {
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineClock,
  HiOutlineStar,
} from "react-icons/hi";

const ServiceHistory = () => {
  return (
    <div className=" py-6 min-h-screen px-2">

      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Service History
            </h1>
            <p className="text-sm text-gray-500">
              Review all historical maintenance and repair services across your fleet.
            </p>
          </div>

          {/* BUTTONS (SOFT BORDERS UPDATED) */}
          <div className="flex flex-wrap gap-3">

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-50 hover:bg-gray-50 transition text-gray-700 text-sm">
              <HiOutlineFilter className="text-lg text-[#1C52AF]" />
              Filters
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/20 transition text-sm border border-transparent">
              <HiOutlineDownload className="text-lg" />
              Export CSV
            </button>

          </div>
        </div>

        {/* CARDS (SOFTER BORDER FEEL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
            <div className="p-3 text-[#1C52AF] bg-[#1C52AF]/10 rounded-full">
              <HiOutlineClipboardCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Completed</p>
              <h2 className="text-2xl font-bold text-gray-900">1,284</h2>
              <p className="text-xs text-green-600">+12% vs last month</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
            <div className="p-3 text-emerald-600 bg-emerald-50 rounded-full">
              <HiOutlineCash size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Service Cost</p>
              <h2 className="text-2xl font-bold text-gray-900">$186.50</h2>
              <p className="text-xs text-gray-500">-3% vs last month</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
            <div className="p-3 text-amber-600 bg-amber-50 rounded-full">
              <HiOutlineClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <h2 className="text-2xl font-bold text-gray-900">18</h2>
              <p className="text-xs text-amber-600">Action required</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
            <div className="p-3 text-purple-600 bg-purple-50 rounded-full">
              <HiOutlineStar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Satisfaction</p>
              <h2 className="text-2xl font-bold text-gray-900">4.9/5</h2>
              <p className="text-xs text-emerald-600">Excellent</p>
            </div>
          </div>

        </div>

        {/* TABLE (SOFTER GRID LINES) */}
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-50">

          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Vehicle</th>
                  <th className="p-3 text-left">Mechanic</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Amount</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">

                {[
                  ["1", "Oil Change", "Tesla Model 3", "Marco Rossi", "12 Mar 2026", "Completed", "$89"],
                  ["2", "Brake Repair", "Honda Civic", "Lara Smith", "10 Mar 2026", "Pending", "$120"],
                  ["3", "AC Service", "Toyota Camry", "John Doe", "08 Mar 2026", "Cancelled", "$75"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50 transition"
                  >
                    {row.slice(0, 5).map((cell, j) => (
                      <td key={j} className="p-3 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${row[5] === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : row[5] === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
                          }`}
                      >
                        {row[5]}
                      </span>
                    </td>

                    <td className="p-3 font-semibold">{row[6]}</td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceHistory;