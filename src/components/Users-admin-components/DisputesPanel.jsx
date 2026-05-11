import {
  MdMoreVert,
  MdSend,
  MdFilterList,
} from "react-icons/md";

export default function DisputesPanel() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Disputes & Support</h1>
          <p className="text-sm text-gray-500">
            Manage active support tickets and user disputes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 rounded-lg">
            <MdFilterList /> Filter
          </button>
          <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT LIST */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 space-y-4">

          <div className="flex justify-between text-xs text-gray-500">
            <p>ACTIVE CASES (24)</p>
            <p className="text-blue-600 cursor-pointer">Sort by Newest</p>
          </div>

          {/* ITEM 1 */}
          <div className="rounded-xl p-3 bg-blue-50">
            <div className="flex items-center gap-3">
              <img src="/images/DisputeUser1.png" alt="" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">James Wilson</p>
                <p className="text-xs text-gray-400">Ticket #MN-8291</p>
              </div>
              <span className="text-[10px] bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                IN PROGRESS
              </span>
            </div>

            <p className="text-sm font-semibold mt-2">
              Overcharged for Engine Diagnostic
            </p>
            <p className="text-xs text-gray-500">
              Customer claims mechanic charged twice.
            </p>
            <p className="text-[11px] text-gray-400 mt-2">2 hours ago</p>
          </div>

          {/* ITEM 2 */}
          <div className="rounded-xl p-3">
            <div className="flex items-center gap-3">
              <img src="/images/DisputeUser2.png" alt="" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Sarah Jenkins</p>
                <p className="text-xs text-gray-400">Ticket #MN-8290</p>
              </div>
              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full">
                OPEN
              </span>
            </div>

            <p className="text-sm font-semibold mt-2">
              Mechanic arrived 45 mins late
            </p>
            <p className="text-xs text-gray-500">
              Service scheduled for 9:00 AM...
            </p>
            <p className="text-[11px] text-gray-400 mt-2">4 hours ago</p>
          </div>

          {/* ITEM 3 */}
          <div className="rounded-xl p-3">
            <div className="flex items-center gap-3">
              <img src="/images/DisputeUser3.png" alt="" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Robert Chen</p>
                <p className="text-xs text-gray-400">Ticket #MN-8285</p>
              </div>
              <span className="text-[10px] bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                IN PROGRESS
              </span>
            </div>

            <p className="text-sm font-semibold mt-2">
              Unfinished Brake Pad Installation
            </p>
            <p className="text-xs text-gray-500">
              Customer reports noise after fix...
            </p>
            <p className="text-[11px] text-gray-400 mt-2">Yesterday</p>
          </div>

        </div>

        {/* RIGHT CHAT */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between pb-3">
            <div>
              <p className="font-semibold">
                Overcharged for Engine Diagnostic
              </p>
              <p className="text-xs text-gray-400">
                Customer: James Wilson · Mechanic: Peak Performance Auto
              </p>
            </div>
            <MdMoreVert />
          </div>

          {/* CHAT */}
          <div className="flex-1 space-y-4 py-4">

            <div className="bg-gray-100 p-3 rounded-xl w-fit max-w-md">
              <p className="text-sm">
                I was quoted $80 but was charged $160...
              </p>
              <p className="text-[10px] text-gray-400 mt-1">10:45 AM</p>
            </div>

            <div className="bg-blue-700 text-white p-3 rounded-xl w-fit max-w-md ml-auto">
              <p className="text-sm">
                Hello James, can you upload a receipt?
              </p>
              <p className="text-[10px] mt-1 opacity-80">11:12 AM</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-xl w-fit max-w-md">
              <p className="text-sm">
                Sure, here it is.
              </p>
              <p className="text-[10px] text-gray-400 mt-1">11:30 AM</p>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pb-4">
            <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-semibold">
              Resolve Issue
            </button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-semibold">
              Close Case
            </button>
          </div>

          {/* INPUT */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
            <input
              type="text"
              placeholder="Write a response..."
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-blue-700 text-white p-2 rounded-lg">
              <MdSend />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}