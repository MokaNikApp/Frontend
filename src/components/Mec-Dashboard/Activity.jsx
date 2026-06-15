import { FiUser, FiDollarSign, FiStar, FiMessageSquare } from "react-icons/fi";

export default function Activity() {
  return (
    <div>
        
        <h3 className="font-bold text-xl text-gray-800 mb-4">
            Recent Activity
        </h3>

        <div className="bg-white p-4 sm:p-5 w-full rounded-xl border border-gray-200">

        <div className="space-y-4 text-sm">

            <div className="flex gap-3">
            <FiUser className="text-blue-600 mt-1" />
            <div>
                <p className="font-medium text-black">Sarah Miller requested a service</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
            </div>
            </div>

            <div className="flex gap-3">
            <FiDollarSign className="text-green-600 mt-1" />
            <div>
                <p className="font-medium text-black">Payment of $125.00 received</p>
                <p className="text-xs text-gray-400">45 minutes ago</p>
            </div>
            </div>

            <div className="flex gap-3">
            <FiStar className="text-yellow-500 mt-1" />
            <div>
                <p className="font-medium text-black">New 5-star review from James W.</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
            </div>

            <div className="flex gap-3">
            <FiMessageSquare className="text-gray-600 mt-1" />
            <div>
                <p className="font-medium text-black">Message from Auto Parts Co.</p>
                <p className="text-xs text-gray-400">Yesterday, 5:30 PM</p>
            </div>
            </div>

        </div>

        <button className="w-full mt-4 bg-gray-100 text-black py-2 rounded text-sm hover:bg-gray-300 transition">
            View All Activity
        </button>

        </div>
    </div>
  );
}