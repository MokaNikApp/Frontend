
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  FiCamera,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiSettings,
  FiChevronRight,
} from "react-icons/fi";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getInitials = (firstName, lastName) => {
  const f = firstName?.[0] ?? "";
  const l = lastName?.[0] ?? "";
  return (f + l).toUpperCase() || "U";
};

const getRoleBadgeStyle = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800";
    case "mechanic":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    default:
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
  }
};

const getRoleLabel = (role) => {
  switch (role?.toLowerCase()) {
    case "admin": return "Administrator";
    case "mechanic": return "Service Provider";
    default: return "Customer";
  }
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setMessage({ type: "error", text: "Failed to load profile. Please try again." });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Auto-dismiss message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please upload a valid image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image must be less than 5MB." });
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploadingImage(true);
    setMessage({ type: "", text: "" });
    try {
      const { data } = await api.patch("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(data);
      setMessage({ type: "success", text: "Profile image updated successfully." });
    } catch (error) {
      console.error("Failed to upload image:", error);
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to upload image." });
    } finally {
      setUploadingImage(false);
    }
  };

  // ─── LOADING STATE ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-[#1C52AF] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* ── HEADER BANNER ─────────────────────────────────────────────── */}
      <div className="relative h-48 bg-gradient-to-r from-[#1C52AF] to-[#2d6fdb] dark:from-[#143d85] dark:to-[#1C52AF]">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        {/* ── PROFILE CARD ──────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Top section with avatar and basic info */}
          <div className="px-6 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-6">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1C52AF] text-white flex items-center justify-center text-2xl font-bold">
                      {getInitials(profile?.firstName, profile?.lastName)}
                    </div>
                  )}
                </div>

                {/* Camera overlay button */}
                <button
                  onClick={handleImageClick}
                  disabled={uploadingImage}
                  className="absolute -bottom-2 -right-2 w-9 h-9 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#1C52AF] hover:border-[#1C52AF]/30 transition-all disabled:opacity-50"
                  title="Change profile photo"
                >
                  {uploadingImage ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <FiCamera className="w-4 h-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Name & Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {profile?.firstName} {profile?.lastName}
                  </h1>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadgeStyle(profile?.role)}`}>
                    {getRoleLabel(profile?.role)}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="w-3.5 h-3.5" />
                    {profile?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiPhone className="w-3.5 h-3.5" />
                    {profile?.phoneNumber || "Not set"}
                  </span>
                </div>

                {/* Verification badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile?.isEmailVerified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium dark:bg-emerald-900/20 dark:text-emerald-400">
                      <FiCheckCircle className="w-3 h-3" />
                      Email Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-medium dark:bg-amber-900/20 dark:text-amber-400">
                      <FiAlertCircle className="w-3 h-3" />
                      Email Unverified
                    </span>
                  )}
                  {profile?.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium dark:bg-blue-900/20 dark:text-blue-400">
                      <FiShield className="w-3 h-3" />
                      Account Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Settings button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C52AF] text-white text-sm font-medium hover:bg-[#1647a0] transition-colors shadow-sm"
                >
                  <FiSettings className="w-3.5 h-3.5" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Alert messages */}
          {message.text && (
            <div className={`mx-6 sm:mx-8 mb-4 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
            }`}>
              {message.type === "success" ? <FiCheckCircle className="w-4 h-4 flex-shrink-0" /> : <FiAlertCircle className="w-4 h-4 flex-shrink-0" />}
              {message.text}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* ── INFO SECTIONS ─────────────────────────────────────────────── */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── Personal Information ── */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-[#1C52AF]" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        First Name
                      </label>
                      <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                        {profile?.firstName || "—"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Last Name
                      </label>
                      <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                        {profile?.lastName || "—"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Email Address
                    </label>
                    <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <FiMail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {profile?.email}
                      {profile?.isEmailVerified && (
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" title="Verified" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Phone Number
                    </label>
                    <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <FiPhone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {profile?.phoneNumber || (
                        <span className="text-gray-400 dark:text-gray-500 italic">Not set</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Location Information ── */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-[#1C52AF]" />
                  Location Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        State
                      </label>
                      <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                        {profile?.state || (
                          <span className="text-gray-400 dark:text-gray-500 italic">Not set</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        City
                      </label>
                      <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                        {profile?.city || (
                          <span className="text-gray-400 dark:text-gray-500 italic">Not set</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Street Address
                    </label>
                    <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 min-h-[80px]">
                      {profile?.address || (
                        <span className="text-gray-400 dark:text-gray-500 italic">No address provided</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Account Status ── */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                <FiShield className="w-4 h-4 text-[#1C52AF]" />
                Account Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Type</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                    {getRoleLabel(profile?.role)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${profile?.isEmailVerified ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {profile?.isEmailVerified ? "Verified" : "Unverified"}
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Verification</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${profile?.isVerified ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {profile?.isVerified ? "Verified" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                <FiSettings className="w-4 h-4 text-[#1C52AF]" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#1C52AF]">
                      <FiSettings className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Account Settings</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Edit profile, change password, preferences</p>
                    </div>
                  </div>
                  <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1C52AF] transition-colors" />
                </button>

                <button
                  onClick={() => navigate("/change-password")}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                      <FiShield className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Security</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Change password, manage sessions</p>
                    </div>
                  </div>
                  <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;