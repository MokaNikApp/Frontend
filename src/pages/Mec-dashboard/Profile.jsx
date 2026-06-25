

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  HiPencil, HiUser, HiPhone, HiMail, HiLocationMarker,
  HiCheck, HiX, HiEye, HiEyeOff, HiExclamationCircle,
  HiLockClosed, HiShieldCheck, HiChevronRight,
} from "react-icons/hi";
import api from "../../api/axios";

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════════════ */
function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function fmtPhone(phone) {
  if (!phone) return "—";
  return phone;
}

/* ══════════════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════════════ */
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.25s cubic-bezier(0.34,1.4,0.64,1)" }}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{title}</p>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <HiX size={18} />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
      <style>{`
        @keyframes modalIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EDIT PROFILE MODAL
══════════════════════════════════════════════════════════════════════ */
function EditProfileModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && open) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await api.put("/auth/profile", form);
      onSave?.(res.data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Phone Number</label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Address</label>
          <input name="address" value={form.address} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">City</label>
            <input name="city" value={form.city} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">State</label>
            <input name="state" value={form.state} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <HiExclamationCircle size={14} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CHANGE PASSWORD MODAL
══════════════════════════════════════════════════════════════════════ */
function ChangePasswordModal({ open, onClose }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true); setError(null);
    try {
      await api.put("/auth/profile", { password: form.newPassword });
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); setForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Change Password">
      {success ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheck size={28} className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-gray-800">Password Changed!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {[
            { name: "currentPassword", label: "Current Password", key: "current" },
            { name: "newPassword", label: "New Password", key: "new" },
            { name: "confirmPassword", label: "Confirm New Password", key: "confirm" },
          ].map(({ name, label, key }) => (
            <div key={name}>
              <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
              <div className="relative">
                <input name={name} type={showPass[key] ? "text" : "password"} value={form[name]} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#1C52AF] transition-colors" />
                <button type="button" onClick={() => setShowPass(p => ({ ...p, [key]: !p[key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass[key] ? <HiEyeOff size={16} /> : <HiEye size={16} />}
                </button>
              </div>
            </div>
          ))}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <HiExclamationCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all disabled:opacity-50">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PROFILE IMAGE UPLOADER
══════════════════════════════════════════════════════════════════════ */
function ProfileImageUploader({ user, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const res = await api.put("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpdate?.(res.data);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className={`w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-white shadow-lg ${uploading ? "opacity-70" : ""}`}>
        {user?.profileImage ? (
          <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-[#1C52AF]">
            {getInitials(user?.firstName, user?.lastName)}
          </span>
        )}
      </div>
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1C52AF] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-800 transition-all active:scale-95"
      >
        {uploading ? (
          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PROFILE COMPLETENESS
══════════════════════════════════════════════════════════════════════ */
function ProfileCompleteness({ user }) {
  const fields = [
    user?.firstName, user?.lastName, user?.email,
    user?.phoneNumber, user?.address, user?.profileImage,
  ];
  const filled = fields.filter(Boolean).length;
  const percent = Math.round((filled / fields.length) * 100);

  return (
    <div className="bg-[#1C52AF] rounded-2xl p-5 text-white">
      <h3 className="font-semibold text-sm mb-1">Profile Completeness</h3>
      <p className="text-xs text-blue-100 mb-4">Complete your profile to unlock premium features and faster support.</p>
      <div className="w-full h-2 bg-blue-800/50 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider">{percent}% COMPLETE</span>
        <span className="text-xs font-bold uppercase tracking-wider">LEVEL {Math.ceil(percent / 25)}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECURITY SECTION
══════════════════════════════════════════════════════════════════════ */
function SecuritySection({ onChangePassword }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Security</h3>
      <div className="flex flex-col gap-1">
        <button onClick={onChangePassword}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
            <HiLockClosed size={18} className="text-gray-500 group-hover:text-[#1C52AF]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Change Password</p>
          </div>
          <HiChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
        </button>
        <div className="flex items-center gap-3 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <HiShieldCheck size={18} className="text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Two-Factor Auth</p>
          </div>
          <span className="text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">ON</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PROFILE PAGE
══════════════════════════════════════════════════════════════════════ */
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await api.get("/auth/profile");
      console.log("[Profile] API Response:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("[Profile] Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdate = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-32 bg-gray-100 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-96 bg-gray-100 rounded-2xl" />
            <div className="h-96 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 text-center max-w-sm">
          <HiExclamationCircle size={32} className="text-red-400" />
          <p className="text-sm font-semibold text-red-700">Couldn't load profile</p>
          <p className="text-xs text-red-400">{error}</p>
          <button onClick={fetchProfile}
            className="px-4 py-2 text-xs text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  const isProvider = user?.role === "provider";

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <ProfileImageUploader user={user} onUpdate={handleUpdate} />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800">{fullName}</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your account information and preferences</p>
            <div className="flex items-center gap-2 mt-2.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${isProvider ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                {isProvider ? "PROVIDER" : "CUSTOMER"}
              </span>
              {user?.isVerified && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-green-100 text-green-700 flex items-center gap-1">
                  <HiCheck size={10} /> VERIFIED
                </span>
              )}
            </div>
          </div>
          <button onClick={() => setEditOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#1C52AF] text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-all active:scale-95 shadow-sm">
            <HiPencil size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <HiUser size={18} className="text-[#1C52AF]" />
              <h3 className="font-semibold text-gray-800 text-sm">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {[
                { icon: HiUser, label: "FULL NAME", value: fullName },
                { icon: HiMail, label: "EMAIL ADDRESS", value: user?.email || "—" },
                { icon: HiPhone, label: "PHONE NUMBER", value: fmtPhone(user?.phoneNumber) },
                { icon: HiLocationMarker, label: "ADDRESS", value: `${user?.address || ""}, ${user?.city || ""}, ${user?.state || ""}`.replace(/^,\s*|,\s*$/g, "") || "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={12} className="text-gray-400" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="flex flex-col gap-4">
          {/* Profile Completeness */}
          <ProfileCompleteness user={user} />

          {/* Security */}
          <SecuritySection onChangePassword={() => setPasswordOpen(true)} />

          {/* Account Status Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-4">Account Status</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Email Verified</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${user?.isEmailVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {user?.isEmailVerified ? "YES" : "NO"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Profile Verified</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${user?.isVerified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {user?.isVerified ? "YES" : "PENDING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onSave={handleUpdate}
      />
      <ChangePasswordModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
};

export default Profile;
