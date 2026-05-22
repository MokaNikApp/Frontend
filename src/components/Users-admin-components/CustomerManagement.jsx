import React, { useState, useMemo, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaSortAlphaDown,
  FaUsers,
  FaCalendarCheck,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaTimes,
  FaCheck,
  FaArrowUp,
  FaArrowDown,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const CustomerManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    bookings: 0,
    retention: 0,
  });

  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@mail.com", phone: "+1 234 567 890", bookings: 5, status: "Active" },
    { id: 2, name: "Aisha Bello", email: "aisha@mail.com", phone: "+234 801 234 5678", bookings: 2, status: "Inactive" },
    { id: 3, name: "David Ojo", email: "david@mail.com", phone: "+1 345 678 901", bookings: 8, status: "Active" },
    { id: 4, name: "Samuel Akin", email: "samuel@mail.com", phone: "+234 802 345 6789", bookings: 4, status: "Active" },
    { id: 5, name: "Grace Musa", email: "grace@mail.com", phone: "+1 456 789 012", bookings: 1, status: "Inactive" },
    { id: 6, name: "Emma Wilson", email: "emma@mail.com", phone: "+44 789 012 3456", bookings: 6, status: "Active" },
    { id: 7, name: "Michael Chen", email: "michael@mail.com", phone: "+86 138 0013 8000", bookings: 10, status: "Active" },
    { id: 8, name: "Sofia Martinez", email: "sofia@mail.com", phone: "+34 612 345 678", bookings: 3, status: "Inactive" },
  ]);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedStats({
        total: Math.round(1284 * easeOut),
        bookings: Math.round(312 * easeOut),
        retention: Math.round(88 * easeOut),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const filteredData = useMemo(() => {
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) =>
        statusFilter === "All" ? true : item.status === statusFilter
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [search, statusFilter, sort, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setData((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
    showToast("User deleted successfully", "success");
  };

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: Math.max(...data.map((u) => u.id), 0) + 1,
    };
    setData((prev) => [...prev, newUser]);
    setModalOpen(false);
    showToast("User added successfully", "success");
  };

  const handleEditUser = (userData) => {
    setData((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...userData } : u))
    );
    setModalOpen(false);
    showToast("User updated successfully", "success");
  };

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setCurrentUser(user);
    setModalOpen(true);
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <div className=" bg-gray-50 min-h-screen font-sans">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
        }`}>
          <FaCheck className="w-4 h-4" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaTrash className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-800">{modalMode === "add" ? "Add New User" : modalMode === "edit" ? "Edit User" : "User Details"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"><FaTimes className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {modalMode === "view" && currentUser ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {currentUser.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{currentUser.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(currentUser.status)}`}>{currentUser.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><FaEnvelope className="text-gray-400 w-4 h-4" />{currentUser.email}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><FaPhone className="text-gray-400 w-4 h-4" />{currentUser.phone}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Bookings</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><FaCalendarAlt className="text-gray-400 w-4 h-4" />{currentUser.bookings} bookings</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><span className={`w-2 h-2 rounded-full ${currentUser.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}></span>{currentUser.status}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.target); const userData = { name: formData.get("name"), email: formData.get("email"), phone: formData.get("phone"), bookings: Number(formData.get("bookings")) || 0, status: formData.get("status") }; modalMode === "add" ? handleAddUser(userData) : handleEditUser(userData); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input name="name" defaultValue={currentUser?.name || ""} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="Enter full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input name="email" type="email" defaultValue={currentUser?.email || ""} required className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input name="phone" defaultValue={currentUser?.phone || ""} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="+1 234 567 890" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bookings</label>
                      <input name="bookings" type="number" defaultValue={currentUser?.bookings || 0} min="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" defaultValue={currentUser?.status || "Active"} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 flex gap-3 justify-end">
                    <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm">{modalMode === "add" ? "Add User" : "Save Changes"}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-400">Admin / Customer Management</p>
          <h1 className="text-[22px] font-bold text-gray-800">Customer Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor your global client directory.</p>
        </div>
        <button onClick={() => openModal("add")} className="px-4 py-2 text-sm font-medium text-white bg-[#003B8C] rounded-lg shadow-sm hover:bg-[#002f6c] transition flex items-center gap-2">
          <FaPlus className="w-4 h-4" />Add Users
        </button>
      </div>

      {/* COMPACT STATS CARDS - SMALL AND SUBTLE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><FaUsers className="w-4 h-4" /></div>
            <div>
              <p className="text-xs text-gray-500">Total Customers</p>
              <h1 className="text-lg font-bold text-gray-800">{animatedStats.total.toLocaleString()}</h1>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><FaArrowUp className="w-3 h-3" />+12% this month</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg"><FaCalendarCheck className="w-4 h-4" /></div>
            <div>
              <p className="text-xs text-gray-500">Active Bookings</p>
              <h1 className="text-lg font-bold text-gray-800">{animatedStats.bookings.toLocaleString()}</h1>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>Live updates</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><FaChartLine className="w-4 h-4" /></div>
            <div>
              <p className="text-xs text-gray-500">Avg. Retention</p>
              <h1 className="text-lg font-bold text-gray-800">{animatedStats.retention}%</h1>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Past 90 days</p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <FaSearch className="text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="outline-none text-sm w-48" />
            {search && <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600"><FaTimes className="w-3 h-3" /></button>}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition">
            <FaFilter className="text-gray-400 w-4 h-4" />
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="outline-none text-sm bg-transparent">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")} className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition hover:bg-gray-50">
            {sort === "asc" ? <FaSortAlphaDown className="text-gray-400 w-4 h-4" /> : <FaArrowDown className="text-gray-400 w-4 h-4" />}
            Sort {sort === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">{filteredData.length}</span> users</p>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="text-sm border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white">
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Phone Number</th>
              <th className="px-5 py-3 text-left">Bookings</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user) => (
              <tr key={user.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{user.email}</td>
                <td className="px-5 py-4 text-gray-600">{user.phone}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <FaCalendarCheck className="w-3 h-3 mr-1" />{user.bookings}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${getStatusColor(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal("view", user)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                      <FaEye className="w-3.5 h-3.5" />View Details
                    </button>
                    <button onClick={() => openModal("edit", user)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition" title="Edit"><FaEdit className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteConfirm(user)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete"><FaTrash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <FaSearch className="w-8 h-8 text-gray-300" />
                    <p>No users found matching your criteria</p>
                    <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-sm text-blue-600 hover:underline">Clear filters</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 text-sm rounded-lg transition ${currentPage === page ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;