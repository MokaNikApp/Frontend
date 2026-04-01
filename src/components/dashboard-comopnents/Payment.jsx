



import React, { useState } from "react";
import {
  HiOutlineDownload,
  HiOutlineFilter,
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
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Payment Records</h1>
          <p className="text-sm text-gray-500">Review all your payment history across completed services.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          
          <p className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm cursor-pointer">
            <HiOutlineDownload className="text-lg" /> Export CSV
          </p>
          <p className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm cursor-pointer">
            <FaFileAlt className="text-lg" /> Statements
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-blue-600 bg-blue-100 rounded-full"><HiOutlineClipboardCheck size={20} /></div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold">$45,230.00</h2>
            <p className="text-[#16A34A] text-sm">+12.5% from last month</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-green-600 bg-green-100 rounded-full"><HiOutlineCash size={20} /></div>
          <div>
            <p className="text-sm text-gray-500">Pending Invoices</p>
            <h2 className="text-2xl font-bold">$1,205.00</h2>
            <p className="text-sm text-red-700">8 pending due this week</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="p-3 text-purple-600 bg-purple-100 rounded-full"><HiOutlineStar size={20} /></div>
          <div>
            <p className="text-sm text-gray-500">Success Rate</p>
            <h2 className="text-2xl font-bold">99.4%</h2>
            <p className="text-sm text-[#1C52AF]">Excellent Across 3 gateways</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg flex-wrap w-full md:w-fit mt-6">
        {["History", "Invoices", "Payment Methods"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-lg transition ${
              activeTab === tab ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 space-y-6">
        {/* History */}
        {activeTab === "History" && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full min-w-[700px]">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Vehicle</th>
                  <th>Mechanic</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentRecords.map((r) => (
                  <tr key={r.id}>
                    <th>{r.id}</th>
                    <td>{r.service}</td>
                    <td>{r.vehicle}</td>
                    <td>{r.mechanic}</td>
                    <td>{r.date}</td>
                    <td>
                      <span className={`badge ${r.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoices */}
        {activeTab === "Invoices" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <FaFileInvoiceDollar size={24} className="text-[#1C52AF]" />
                  <div>
                    <h3 className="font-semibold">{inv.id}</h3>
                    <p className={`text-sm ${inv.status === "Paid" ? "text-green-600" : inv.status === "Draft" ? "text-yellow-600" : "text-red-600"}`}>
                      {inv.status}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold">{inv.amount}</p>
                  <p className="text-gray-400 text-sm">{inv.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Methods */}
        {activeTab === "Payment Methods" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((pm, i) => (
              <div key={i} className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <FaCreditCard size={24} className="text-[#1C52AF]" />
                  <div>
                    <h3 className="font-semibold">{pm.type} ending in {pm.last4}</h3>
                    <p className="text-gray-500 text-sm">Expires {pm.exp}</p>
                  </div>
                </div>
                {pm.primary && <span className="text-sm text-white bg-[#1C52AF] px-2 py-1 rounded-full w-fit">Primary</span>}
                <button className="mt-3 bg-[#1C52AF] text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-2 justify-center">
                  <FaPlus /> Add New
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
