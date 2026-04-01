




import React, { useState } from "react";
import { HiCheckCircle, HiUser, HiBell, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

// ✅ DATA
const initialToday = [
  {
    id: 1,
    title: "BMW X5 Diagnostic Complete",
    message:
      "The diagnostic for the BMW X5 is complete. We need to order a new transmission sensor before proceeding.",
    time: "2 mins ago",
    type: "update",
    unread: true,
  },
  {
    id: 2,
    title: "Service Completed #BK-4402",
    message: "Toyota Corolla service is finished. Ready for pickup.",
    time: "1 hour ago",
    type: "completed",
    unread: false,
  },
  {
    id: 3,
    title: "New Booking Confirmed",
    message: "Assigned to Mechanic: Sarah J.",
    time: "3 hours ago",
    type: "mechanic",
    unread: true,
  },
];

const initialYesterday = [
  {
    id: 4,
    title: "BMW X5 Diagnostic Complete",
    message: "Diagnostic completed successfully.",
    time: "Yesterday",
    type: "update",
    unread: false,
  },
  {
    id: 5,
    title: "Service Completed #BK-4403",
    message: "Vehicle serviced and ready.",
    time: "Yesterday",
    type: "completed",
    unread: true,
  },
];

const Notification = () => {
  const [tab, setTab] = useState("all");
  const [today, setToday] = useState(initialToday);
  const [yesterday, setYesterday] = useState(initialYesterday);
  const [selected, setSelected] = useState(null);

  // ICONS
  const getIcon = (type) => {
    switch (type) {
      case "completed":
        return <HiCheckCircle className="text-green-500 text-xl" />;
      case "mechanic":
        return <HiUser className="text-blue-500 text-xl" />;
      default:
        return <HiBell className="text-gray-400 text-xl" />;
    }
  };

  // FILTER
  const filterData = (data) => (tab === "unread" ? data.filter((n) => n.unread) : data);

  // MARK ALL AS READ
  const markAllRead = () => {
    setToday(today.map((n) => ({ ...n, unread: false })));
    setYesterday(yesterday.map((n) => ({ ...n, unread: false })));
  };

  // REPLY FUNCTION
  const handleReply = (note) => {
    alert(`Replying to: ${note.title}`);
  };

  // CARD
  const renderCard = (note) => (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:scale-[1.01] transition-all lg:hover:scale-100"
    >
      {/* Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg flex-shrink-0">
        {getIcon(note.type)}
        {note.unread && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 mt-2 sm:mt-0">
        <h3 className="font-semibold text-gray-800">{note.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{note.message}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={() => handleReply(note)}
            className="px-3 py-1 bg-[#1C52AF] text-white rounded-md text-xs hover:opacity-90 transition"
          >
            Reply Now
          </button>
          <button
            onClick={() => setSelected(note)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Time */}
      <div className="text-gray-400 text-xs whitespace-nowrap mt-2 sm:mt-0 sm:ml-4">
        {note.time}
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 space-y-6 w-full max-w-md mx-auto lg:max-w-full lg:mx-0">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Notifications</h1>
        <p className="text-gray-400 text-sm">
          Stay updated with service progress and bookings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setTab("all")}
            className={`pb-1 transition ${
              tab === "all"
                ? "text-[#1C52AF] border-b-2 border-[#1C52AF]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setTab("unread")}
            className={`pb-1 transition ${
              tab === "unread"
                ? "text-[#1C52AF] border-b-2 border-[#1C52AF]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Unread
          </button>
        </div>
        <button
          onClick={markAllRead}
          className="text-sm text-gray-400 hover:text-gray-700 transition"
        >
          Mark all as read
        </button>
      </div>

      {/* TODAY */}
      {filterData(today).length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Today
          </h2>
          <AnimatePresence>
            <div className="space-y-3">{filterData(today).map(renderCard)}</div>
          </AnimatePresence>
        </div>
      )}

      {/* YESTERDAY */}
      {filterData(yesterday).length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Yesterday
          </h2>
          <AnimatePresence>
            <div className="space-y-3">{filterData(yesterday).map(renderCard)}</div>
          </AnimatePresence>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              >
                <HiX size={18} />
              </button>

              <h3 className="font-semibold text-lg text-gray-800 mb-2">{selected.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{selected.message}</p>
              <div className="text-xs text-gray-400">{selected.time}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;