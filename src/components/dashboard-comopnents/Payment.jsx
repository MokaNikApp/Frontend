



// import React, { useState } from "react";
// import {
//   HiOutlineDownload,
//   HiOutlineFilter,
//   HiOutlineClipboardCheck,
//   HiOutlineCash,
//   HiOutlineStar,
// } from "react-icons/hi";
// import { FaFileAlt, FaCreditCard, FaFileInvoiceDollar, FaPlus } from "react-icons/fa";

// const Payment = () => {
//   const [activeTab, setActiveTab] = useState("History");

//   const paymentRecords = [
//     { id: 1, service: "Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "12 Mar 2026", status: "Completed", amount: "$89" },
//     { id: 2, service: "Brake Repair", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "10 Mar 2026", status: "Pending", amount: "$120" },
//     { id: 3, service: "AC Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "08 Mar 2026", status: "Completed", amount: "$75" },
//   ];

//   const invoices = [
//     { id: "INV-1234", status: "Paid", amount: "$450.00", date: "12 Mar 2026" },
//     { id: "INV-1235", status: "Draft", amount: "$300.00", date: "10 Mar 2026" },
//     { id: "INV-1236", status: "Pending", amount: "$150.00", date: "08 Mar 2026" },
//   ];

//   const paymentMethods = [
//     { type: "Visa", last4: "4242", exp: "12/26", primary: true },
//     { type: "MasterCard", last4: "9876", exp: "08/27", primary: false },
//     { type: "Amex", last4: "1234", exp: "11/27", primary: false },
//   ];

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
//         <div>
//           <h1 className="text-xl font-semibold">Payment Records</h1>
//           <p className="text-sm text-gray-500">Review all your payment history across completed services.</p>
//         </div>
//         <div className="flex flex-wrap gap-3">
          
//           <p className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm cursor-pointer">
//             <HiOutlineDownload className="text-lg" /> Export CSV
//           </p>
//           <p className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm cursor-pointer">
//             <FaFileAlt className="text-lg" /> Statements
//           </p>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//           <div className="p-3 text-blue-600 bg-blue-100 rounded-full"><HiOutlineClipboardCheck size={20} /></div>
//           <div>
//             <p className="text-sm text-gray-500">Total Revenue</p>
//             <h2 className="text-2xl font-bold">$45,230.00</h2>
//             <p className="text-[#16A34A] text-sm">+12.5% from last month</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//           <div className="p-3 text-green-600 bg-green-100 rounded-full"><HiOutlineCash size={20} /></div>
//           <div>
//             <p className="text-sm text-gray-500">Pending Invoices</p>
//             <h2 className="text-2xl font-bold">$1,205.00</h2>
//             <p className="text-sm text-red-700">8 pending due this week</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
//           <div className="p-3 text-purple-600 bg-purple-100 rounded-full"><HiOutlineStar size={20} /></div>
//           <div>
//             <p className="text-sm text-gray-500">Success Rate</p>
//             <h2 className="text-2xl font-bold">99.4%</h2>
//             <p className="text-sm text-[#1C52AF]">Excellent Across 3 gateways</p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap w-full gap-2 p-1 mt-6 bg-gray-100 rounded-lg md:w-fit">
//         {["History", "Invoices", "Payment Methods"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-1.5 text-sm rounded-lg transition ${
//               activeTab === tab ? "bg-white shadow text-black" : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4 space-y-6">
//         {/* History */}
//         {activeTab === "History" && (
//           <div className="overflow-x-auto">
//             <table className="table table-zebra w-full min-w-[700px]">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Service</th>
//                   <th>Vehicle</th>
//                   <th>Mechanic</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentRecords.map((r) => (
//                   <tr key={r.id}>
//                     <th>{r.id}</th>
//                     <td>{r.service}</td>
//                     <td>{r.vehicle}</td>
//                     <td>{r.mechanic}</td>
//                     <td>{r.date}</td>
//                     <td>
//                       <span className={`badge ${r.status === "Completed" ? "badge-success" : "badge-warning"}`}>
//                         {r.status}
//                       </span>
//                     </td>
//                     <td>{r.amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Invoices */}
//         {activeTab === "Invoices" && (
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {invoices.map((inv) => (
//               <div key={inv.id} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg">
//                 <div className="flex items-center gap-3 mb-4">
//                   <FaFileInvoiceDollar size={24} className="text-[#1C52AF]" />
//                   <div>
//                     <h3 className="font-semibold">{inv.id}</h3>
//                     <p className={`text-sm ${inv.status === "Paid" ? "text-green-600" : inv.status === "Draft" ? "text-yellow-600" : "text-red-600"}`}>
//                       {inv.status}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="font-bold">{inv.amount}</p>
//                   <p className="text-sm text-gray-400">{inv.date}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Payment Methods */}
//         {activeTab === "Payment Methods" && (
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {paymentMethods.map((pm, i) => (
//               <div key={i} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg">
//                 <div className="flex items-center gap-3 mb-4">
//                   <FaCreditCard size={24} className="text-[#1C52AF]" />
//                   <div>
//                     <h3 className="font-semibold">{pm.type} ending in {pm.last4}</h3>
//                     <p className="text-sm text-gray-500">Expires {pm.exp}</p>
//                   </div>
//                 </div>
//                 {pm.primary && <span className="text-sm text-white bg-[#1C52AF] px-2 py-1 rounded-full w-fit">Primary</span>}
//                 <button className="mt-3 bg-[#1C52AF] text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-2 justify-center">
//                   <FaPlus /> Add New
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;






import React, { useState } from "react";
import {
  HiOutlineDownload,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineStar,
} from "react-icons/hi";
import { FaFileAlt, FaCreditCard, FaFileInvoiceDollar, FaPlus } from "react-icons/fa";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("History");

  const paymentRecords = [
    { id: 1, service: "Oil Change", vehicle: "Tesla Model 3", mechanic: "Marco Rossi", date: "12 Mar 2026", status: "Completed", amount: "$89" },
    { id: 2, service: "Brake Repair", vehicle: "Honda Civic", mechanic: "Lara Smith", date: "10 Mar 2026", status: "Pending", amount: "$120" },
    { id: 3, service: "AC Service", vehicle: "Toyota Camry", mechanic: "John Doe", date: "08 Mar 2026", status: "Completed", amount: "$75" },
  ];

  const invoices = [
    { id: "INV-1234", status: "Paid", amount: "$450.00", date: "12 Mar 2026" },
    { id: "INV-1235", status: "Draft", amount: "$300.00", date: "10 Mar 2026" },
    { id: "INV-1236", status: "Pending", amount: "$150.00", date: "08 Mar 2026" },
  ];

  const paymentMethods = [
    { type: "Visa", last4: "4242", exp: "12/26", primary: true },
    { type: "MasterCard", last4: "9876", exp: "08/27", primary: false },
    { type: "Amex", last4: "1234", exp: "11/27", primary: false },
  ];

  return (
    <div className="min-h-screen px-4 py-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Payment Records
          </h1>
          <p className="text-sm text-gray-500">
            Review all your payment history across completed services.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50">
            <HiOutlineDownload className="text-[#1C52AF]" />
            Export
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] hover:bg-[#1C52AF]/20 text-sm">
            <FaFileAlt />
            Statements
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="p-3 bg-[#1C52AF]/10 text-[#1C52AF] rounded-full">
            <HiOutlineClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold text-gray-900">$45,230</h2>
            <p className="text-xs text-green-600">+12.5%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="p-3 text-gray-700 bg-gray-100 rounded-full">
            <HiOutlineCash size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-gray-900">$1,205</h2>
            <p className="text-xs text-gray-500">Due soon</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
            <HiOutlineStar size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Success Rate</p>
            <h2 className="text-xl font-bold text-gray-900">99.4%</h2>
            <p className="text-xs text-green-600">Excellent</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap w-full gap-2 p-1 mt-6 bg-gray-100 rounded-lg md:w-fit">
        {["History", "Invoices", "Payment Methods"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              activeTab === tab
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="mt-6 space-y-6">

        {/* HISTORY */}
        {activeTab === "History" && (
          <>
            {/* MOBILE CARD VIEW */}
            <div className="grid grid-cols-1 gap-3 sm:hidden">
              {paymentRecords.map((r) => (
                <div key={r.id} className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                  <div className="flex justify-between">
                    <p className="font-semibold">{r.service}</p>
                    <span className="font-bold text-gray-700">{r.amount}</span>
                  </div>
                  <p className="text-sm text-gray-500">{r.vehicle}</p>
                  <p className="text-sm text-gray-500">{r.mechanic}</p>

                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-400">{r.date}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      r.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto bg-white border border-gray-100 shadow-sm sm:block rounded-xl">
              <table className="min-w-[700px] w-full text-sm">
                <thead className="text-gray-600 bg-gray-50">
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

                <tbody>
                  {paymentRecords.map((r) => (
                    <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3">{r.id}</td>
                      <td className="p-3">{r.service}</td>
                      <td className="p-3">{r.vehicle}</td>
                      <td className="p-3">{r.mechanic}</td>
                      <td className="p-3">{r.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          r.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 font-semibold">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* INVOICES */}
        {activeTab === "Invoices" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div className="flex items-center gap-3">
                  <FaFileInvoiceDollar className="text-[#1C52AF]" />
                  <div>
                    <p className="font-semibold">{inv.id}</p>
                    <p className="text-sm text-gray-500">{inv.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAYMENT METHODS */}
        {activeTab === "Payment Methods" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((pm, i) => (
              <div key={i} className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-[#1C52AF]" />
                  <div>
                    <p className="font-semibold">{pm.type}</p>
                    <p className="text-sm text-gray-500">**** {pm.last4}</p>
                  </div>
                </div>

                {pm.primary && (
                  <span className="text-xs bg-[#1C52AF]/10 text-[#1C52AF] px-2 py-1 rounded-full mt-2 inline-block">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Payment;
