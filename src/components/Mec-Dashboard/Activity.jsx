import { useState } from "react";
import { FiUser, FiDollarSign, FiStar, FiMessageSquare, FiActivity, FiX } from "react-icons/fi";

export default function Activity({ data = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // DYNAMIC ICON & STYLE MAPPER
  // Inspects common action terms to pair them with their matching interface accents
  // ---------------------------------------------------------------------------
  const getActivityConfig = (item) => {
    const type = String(item?.type || item?.category || "").toLowerCase();
    const message = String(item?.title || item?.message || item?.description || "").toLowerCase();

    if (type.includes("payment") || type.includes("earn") || message.includes("payment") || message.includes("paid")) {
      return { icon: <FiDollarSign className="text-green-600 mt-0.5 text-base shrink-0" />, bg: "bg-green-50" };
    }
    if (type.includes("review") || type.includes("star") || type.includes("rate") || message.includes("star") || message.includes("review")) {
      return { icon: <FiStar className="text-yellow-500 mt-0.5 text-base shrink-0" />, bg: "bg-yellow-50" };
    }
    if (type.includes("message") || type.includes("chat") || message.includes("message") || message.includes("replied")) {
      return { icon: <FiMessageSquare className="text-purple-600 mt-0.5 text-base shrink-0" />, bg: "bg-purple-50" };
    }
    // Default fallback category (Jobs, generic appointments, or status changes)
    return { icon: <FiUser className="text-blue-600 mt-0.5 text-base shrink-0" />, bg: "bg-blue-50" };
  };

  // Preview Limit: Display only the first 4 latest interactions on the main dashboard layout
  const previewActivities = Array.isArray(data) ? data.slice(0, 4) : [];

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
        Recent Activity
      </h3>

      <div className="bg-white p-4 sm:p-5 w-full rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 justify-between">
        
        {/* MAIN DISPLAY LOGS CONTAINER */}
        <div className="space-y-4 text-sm">
          {previewActivities.length > 0 ? (
            previewActivities.map((item, index) => {
              const config = getActivityConfig(item);
              return (
                <div key={item?.id || index} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    {config.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {item?.title || item?.message || item?.description || "System update logged"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item?.time || item?.timestamp || item?.createdAt || "Just now"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
              <FiActivity className="text-3xl text-gray-300 mb-2 animate-pulse" />
              <p className="text-xs font-medium">No recent activity logged for today.</p>
            </div>
          )}
        </div>

        {/* TRIGGER BUTTON */}
        {data.length > 0 && (
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full mt-5 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors duration-200 tracking-wide"
          >
            View All Activity ({data.length})
          </button>
        )}
      </div>

      {/* --- BACKDROP MODAL WINDOW OVERLAY --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          
          {/* Frosted Glass Backdrop click-to-close feature */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Container Body */}
          <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[85vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Navigation Header Panel */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Comprehensive Activity Logs</h4>
                <p className="text-xs text-gray-400 mt-0.5">Full interaction history concerning you today</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Scrollable Modal Timeline body list area */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 max-h-[50vh]">
              {data.map((item, index) => {
                const config = getActivityConfig(item);
                return (
                  <div key={item?.id || index} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      {config.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-gray-800 break-words">
                        {item?.title || item?.message || item?.description || "System logs verified"}
                      </p>
                      
                      {/* Optional meta fields like status strings, locations or customer contextual snippets */}
                      {item?.meta && (
                        <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-1.5 rounded border border-gray-100">
                          {item.meta}
                        </p>
                      )}

                      <p className="text-[11px] text-gray-400 font-medium mt-1">
                        {item?.time || item?.timestamp || item?.createdAt || "Today"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Sticky Bottom Action Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
              >
                Close Logs Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}