import {
  MdDownload,
  MdPayments,
  MdCheckCircle,
  MdAccessTime,
  MdArrowDownward,
  MdArrowUpward,
  MdMoreVert,
  MdVerified,
  MdAccountBalanceWallet,
  MdLock,
} from "react-icons/md";

export default function WalletPayments() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Wallet & Payments</h1>
          <p className="text-sm text-gray-500">
            Monitor revenue streams and manage mechanic payouts.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm">
            <MdDownload /> Export Report
          </button>

          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            <MdPayments /> Release Payment
          </button>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Revenue */}
        <div className="bg-white p-5 rounded-xl">
          <MdArrowUpward className="text-blue-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">$124,592.00</h2>
          <p className="text-green-600 text-xs mt-1">↑ 12.5% vs last month</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-xl">
          <MdAccessTime className="text-yellow-500 text-xl mb-2" />
          <p className="text-sm text-gray-500">Pending Payouts</p>
          <h2 className="text-2xl font-bold">$8,240.50</h2>
          <p className="text-xs text-gray-400">12 mechanics awaiting release</p>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-xl">
          <MdCheckCircle className="text-green-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Completed Payouts</p>
          <h2 className="text-2xl font-bold">$96,120.25</h2>
          <p className="text-xs text-gray-400">Processed this year</p>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white rounded-xl p-4">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Recent Transactions</h2>

          <div className="flex gap-2">
            <button className="bg-gray-100 px-3 py-1 rounded text-xs">All Types</button>
            <button className="bg-gray-100 px-3 py-1 rounded text-xs">Last 30 Days</button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs">
            <tr>
              <th className="text-left py-2">TYPE</th>
              <th>USER</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            <tr className="border-t">
              <td className="py-3 flex items-center gap-2">
                <MdArrowDownward className="text-green-600" /> Payment
              </td>
              <td className="flex items-center gap-2 justify-center">
                <img src="/images/wallet1.png" className="w-8 h-8 rounded-full" />
                Elena Rodriguez
              </td>
              <td className="text-center">Oct 24, 2023</td>
              <td className="text-center">$245.00</td>
              <td className="text-center">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  SUCCESSFUL
                </span>
              </td>
              <td className="text-center"><MdMoreVert /></td>
            </tr>

            <tr className="border-t">
              <td className="py-3 flex items-center gap-2">
                <MdArrowUpward className="text-blue-600" /> Payout
              </td>
              <td className="flex items-center gap-2 justify-center">
                <img src="/images/wallet2.png" className="w-8 h-8 rounded-full" />
                Marco Silva
              </td>
              <td className="text-center">Oct 23, 2023</td>
              <td className="text-center">$1,200.00</td>
              <td className="text-center">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  PROCESSING
                </span>
              </td>
              <td className="text-blue-600 text-center text-xs cursor-pointer">
                View Receipt
              </td>
            </tr>

            <tr className="border-t">
              <td className="py-3 flex items-center gap-2">
                <MdArrowDownward className="text-green-600" /> Payment
              </td>
              <td className="flex items-center gap-2 justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  TH
                </div>
                Thomas H.
              </td>
              <td className="text-center">Oct 23, 2023</td>
              <td className="text-center">$89.00</td>
              <td className="text-center">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  SUCCESSFUL
                </span>
              </td>
              <td className="text-center"><MdMoreVert /></td>
            </tr>

            <tr className="border-t">
              <td className="py-3 flex items-center gap-2">
                <MdArrowUpward className="text-blue-600" /> Payout
              </td>
              <td className="flex items-center gap-2 justify-center">
                <img src="/images/wallet3.png" className="w-8 h-8 rounded-full" />
                David Chen
              </td>
              <td className="text-center">Oct 22, 2023</td>
              <td className="text-center">$750.40</td>
              <td className="text-center">
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                  AWAITING RELEASE
                </span>
              </td>
              <td className="text-center">
                <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs">
                  Release Now
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* BOTTOM */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT BLUE CARD */}
        <div className="bg-blue-800 text-white p-6 rounded-xl space-y-4">

          <h2 className="font-semibold">Pending Payout Release</h2>
          <p className="text-sm opacity-80">
            There are currently 12 mechanics with verified completed services ready for payout totaling $8,240.50.
          </p>

          <div className="bg-blue-700 p-3 rounded-lg flex justify-between items-center">
            <span className="flex items-center gap-2">
              <MdVerified /> Verified Mechanics
            </span>
            <span>12</span>
          </div>

          <div className="bg-blue-700 p-3 rounded-lg flex justify-between items-center">
            <span className="flex items-center gap-2">
              <MdAccountBalanceWallet /> Total Amount
            </span>
            <span>$8,240.50</span>
          </div>

          <button className="w-full bg-white text-blue-800 py-2 rounded-lg flex items-center justify-center gap-2">
            <MdLock /> RELEASE ALL PAYMENTS
          </button>
        </div>

        {/* RIGHT CHART */}
        <div className="bg-white p-5 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-3">Revenue Projection</h2>

          <div className="h-40 bg-gray-100 rounded-lg flex items-end gap-2 p-4">
            <div className="w-6 bg-gray-300 h-16"></div>
            <div className="w-6 bg-gray-300 h-24"></div>
            <div className="w-6 bg-gray-300 h-12"></div>
            <div className="w-6 bg-gray-400 h-28"></div>
            <div className="w-6 bg-gray-400 h-24"></div>
            <div className="w-6 bg-blue-700 h-32"></div>
            <div className="w-6 bg-gray-400 h-28"></div>
          </div>

          <div className="flex justify-between text-sm mt-4">
            <span>Predicted: $14,500.00</span>
            <span className="text-green-600">Confidence 92%</span>
          </div>
        </div>

      </div>

    </div>
  );
}