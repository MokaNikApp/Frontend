import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiCamera,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiSave,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
const tabs = [
  { id: "profile", label: "Profile", icon: FiUser },
  { id: "password", label: "Password", icon: FiLock },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "security", label: "Security", icon: FiShield },
];

// ─── TOAST COMPONENT ──────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
  };

  const Icon = type === "success" ? FiCheckCircle : FiAlertCircle;

  return (
    <div className={`fixed top-5 right-5 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-right ${styles[type]}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
const Settings = () => {
  const navigate = useNavigate();

  // ── Active tab ──
  const [activeTab, setActiveTab] = useState("profile");

  // ── Toast ──
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  // ── Profile state ──
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    profileImage: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  // ── Password state ──
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ── Notifications state ──
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    bookingUpdates: true,
    paymentAlerts: true,
    serviceReminders: true,
  });
  const [notifSaving, setNotifSaving] = useState(false);

  // ── Security state ──
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  // ── Fetch profile on mount ──
  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        const { data } = await api.get("/auth/profile");
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          email: data.email || "",
          profileImage: data.profileImage || "",
        });
      } catch (error) {
        showToast("Failed to load profile", "error");
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ── Profile handlers ──
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfile = () => {
    const errors = {};
    if (!profile.firstName.trim()) errors.firstName = "First name is required";
    if (!profile.lastName.trim()) errors.lastName = "Last name is required";
    if (!profile.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!profile.address.trim()) errors.address = "Address is required";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setProfileSaving(true);
    try {
      await api.put("/users/profile", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
      });
      showToast("Profile updated successfully");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update profile";
      showToast(msg, "error");
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Password handlers ──
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    if (!password.currentPassword) errors.currentPassword = "Current password is required";
    if (!password.newPassword) errors.newPassword = "New password is required";
    else if (password.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters";
    if (!password.confirmNewPassword) errors.confirmNewPassword = "Please confirm your new password";
    else if (password.newPassword !== password.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setPasswordSaving(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
        confirmNewPassword: password.confirmNewPassword,
      });
      showToast("Password changed successfully");
      setPassword({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to change password";
      showToast(msg, "error");
    } finally {
      setPasswordSaving(false);
    }
  };

  // ── Notification handlers ──
  const handleNotifToggle = (key) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotifSave = async () => {
    setNotifSaving(true);
    // Simulate API call - replace with actual endpoint when ready
    setTimeout(() => {
      showToast("Notification preferences saved");
      setNotifSaving(false);
    }, 800);
  };

  // ── Security handlers ──
  const handleSecurityToggle = (key) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSessionChange = (value) => {
    setSecuritySettings((prev) => ({ ...prev, sessionTimeout: value }));
  };

  // ── Avatar upload handler ──
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const { data } = await api.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, profileImage: data.imageUrl }));
      showToast("Profile picture updated");
    } catch (error) {
      showToast("Failed to upload image", "error");
    }
  };

  // ── Get initials ──
  const getInitials = (first, last) => {
    const f = first?.[0] ?? "";
    const l = last?.[0] ?? "";
    return (f + l).toUpperCase() || "U";
  };

  // ── Render helpers ──
  const InputField = ({ label, name, value, onChange, error, type = "text", placeholder, icon: Icon, disabled = false }) => (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full h-10 px-3 ${Icon ? "pl-10" : ""} text-[13px] rounded-lg border bg-white text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/10 focus:border-[#1C52AF]/40 transition-all
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:focus:border-[#1C52AF]/40
            ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200"}
            ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-900" : ""}`}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1"><FiAlertCircle className="w-3 h-3"/>{error}</p>}
    </div>
  );

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 pr-4">
        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{label}</p>
        {description && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/20 ${
          checked ? "bg-[#1C52AF]" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  // ── LOADING SKELETON ──
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#1C52AF] rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT SIDEBAR (Tabs) ── */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm overflow-hidden sticky top-6">
              <nav className="p-2 space-y-0.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                        isActive
                          ? "bg-[#1C52AF]/10 text-[#1C52AF] dark:bg-[#1C52AF]/20 dark:text-blue-400"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#1C52AF]" : "text-gray-400"}`} />
                      {tab.label}
                      {isActive && <FiChevronRight className="w-3.5 h-3.5 ml-auto text-[#1C52AF]" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── RIGHT CONTENT ── */}
          <main className="flex-1 min-w-0">
            {/* ═══════════════════════════════════════════════════════════
                PROFILE TAB
            ═══════════════════════════════════════════════════════════ */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Update your personal details</p>
                  </div>

                  <div className="p-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                      <div className="relative group">
                        {profile.profileImage ? (
                          <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-[#1C52AF] text-white flex items-center justify-center text-xl font-bold border-2 border-gray-200 dark:border-gray-700">
                            {getInitials(profile.firstName, profile.lastName)}
                          </div>
                        )}
                        <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-50 transition-colors">
                          <FiCamera className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {profile.firstName} {profile.lastName}
                        </p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">{profile.email}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField
                          label="First Name"
                          name="firstName"
                          value={profile.firstName}
                          onChange={handleProfileChange}
                          error={profileErrors.firstName}
                          placeholder="Enter first name"
                          icon={FiUser}
                        />
                        <InputField
                          label="Last Name"
                          name="lastName"
                          value={profile.lastName}
                          onChange={handleProfileChange}
                          error={profileErrors.lastName}
                          placeholder="Enter last name"
                          icon={FiUser}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField
                          label="Email Address"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          type="email"
                          placeholder="your@email.com"
                          disabled
                        />
                        <InputField
                          label="Phone Number"
                          name="phoneNumber"
                          value={profile.phoneNumber}
                          onChange={handleProfileChange}
                          error={profileErrors.phoneNumber}
                          placeholder="+2348012345678"
                          icon={FiUser}
                        />
                      </div>

                      <InputField
                        label="Address"
                        name="address"
                        value={profile.address}
                        onChange={handleProfileChange}
                        error={profileErrors.address}
                        placeholder="123, New Haven"
                      />

                      <div className="flex items-center justify-end pt-2">
                        <button
                          type="submit"
                          disabled={profileSaving}
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#1C52AF] text-white text-[13px] font-medium rounded-lg hover:bg-[#1648A0] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                        >
                          {profileSaving ? (
                            <>
                              <FiLoader className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <FiSave className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                PASSWORD TAB
            ═══════════════════════════════════════════════════════════ */}
            {activeTab === "password" && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Update your password to keep your account secure</p>
                </div>

                <div className="p-6">
                  {/* Security Tips */}
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-start gap-3">
                      <FiShield className="w-5 h-5 text-[#1C52AF] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-medium text-[#1C52AF] dark:text-blue-400">Password Requirements</p>
                        <ul className="mt-1.5 space-y-1 text-[11px] text-gray-600 dark:text-gray-400">
                          <li className="flex items-center gap-1.5">
                            <FiCheck className="w-3 h-3 text-emerald-500" />
                            Minimum 6 characters
                          </li>
                          <li className="flex items-center gap-1.5">
                            <FiCheck className="w-3 h-3 text-emerald-500" />
                            Include uppercase and lowercase letters
                          </li>
                          <li className="flex items-center gap-1.5">
                            <FiCheck className="w-3 h-3 text-emerald-500" />
                            Include at least one number or special character
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-lg">
                    {/* Current Password */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? "text" : "password"}
                          name="currentPassword"
                          value={password.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                          className={`w-full h-10 px-3 pr-10 text-[13px] rounded-lg border bg-white text-gray-900 placeholder:text-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/10 focus:border-[#1C52AF]/40 transition-all
                            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
                            ${passwordErrors.currentPassword ? "border-red-300" : "border-gray-200"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => ({ ...p, current: !p.current }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword.current ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1"><FiAlertCircle className="w-3 h-3"/>{passwordErrors.currentPassword}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-700 dark:text-gray-300">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          name="newPassword"
                          value={password.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                          className={`w-full h-10 px-3 pr-10 text-[13px] rounded-lg border bg-white text-gray-900 placeholder:text-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/10 focus:border-[#1C52AF]/40 transition-all
                            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
                            ${passwordErrors.newPassword ? "border-red-300" : "border-gray-200"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword.new ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1"><FiAlertCircle className="w-3 h-3"/>{passwordErrors.newPassword}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          name="confirmNewPassword"
                          value={password.confirmNewPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm new password"
                          className={`w-full h-10 px-3 pr-10 text-[13px] rounded-lg border bg-white text-gray-900 placeholder:text-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/10 focus:border-[#1C52AF]/40 transition-all
                            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
                            ${passwordErrors.confirmNewPassword ? "border-red-300" : "border-gray-200"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => ({ ...p, confirm: !p.confirm }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword.confirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.confirmNewPassword && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1"><FiAlertCircle className="w-3 h-3"/>{passwordErrors.confirmNewPassword}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-end pt-2">
                      <button
                        type="submit"
                        disabled={passwordSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1C52AF] text-white text-[13px] font-medium rounded-lg hover:bg-[#1648A0] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                      >
                        {passwordSaving ? (
                          <>
                            <FiLoader className="w-4 h-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <FiLock className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                NOTIFICATIONS TAB
            ═══════════════════════════════════════════════════════════ */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Email Notifications</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Choose what emails you want to receive</p>
                  </div>
                  <div className="px-6 divide-y divide-gray-100 dark:divide-gray-800">
                    <ToggleSwitch
                      label="Booking Updates"
                      description="Get notified when your booking status changes"
                      checked={notifSettings.bookingUpdates}
                      onChange={() => handleNotifToggle("bookingUpdates")}
                    />
                    <ToggleSwitch
                      label="Payment Alerts"
                      description="Receive alerts for payments and refunds"
                      checked={notifSettings.paymentAlerts}
                      onChange={() => handleNotifToggle("paymentAlerts")}
                    />
                    <ToggleSwitch
                      label="Service Reminders"
                      description="Reminders for upcoming scheduled services"
                      checked={notifSettings.serviceReminders}
                      onChange={() => handleNotifToggle("serviceReminders")}
                    />
                    <ToggleSwitch
                      label="Marketing & Promotions"
                      description="Receive special offers and promotions"
                      checked={notifSettings.marketingEmails}
                      onChange={() => handleNotifToggle("marketingEmails")}
                    />
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Push Notifications</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Control your in-app and browser notifications</p>
                  </div>
                  <div className="px-6 divide-y divide-gray-100 dark:divide-gray-800">
                    <ToggleSwitch
                      label="Enable Push Notifications"
                      description="Receive real-time notifications in your browser"
                      checked={notifSettings.pushNotifications}
                      onChange={() => handleNotifToggle("pushNotifications")}
                    />
                    <ToggleSwitch
                      label="SMS Notifications"
                      description="Get important alerts via text message"
                      checked={notifSettings.smsNotifications}
                      onChange={() => handleNotifToggle("smsNotifications")}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={handleNotifSave}
                    disabled={notifSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1C52AF] text-white text-[13px] font-medium rounded-lg hover:bg-[#1648A0] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  >
                    {notifSaving ? (
                      <>
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                SECURITY TAB
            ═══════════════════════════════════════════════════════════ */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                          <FiShield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-gray-900 dark:text-white">Authenticator App</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">Use an authenticator app to generate codes</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        checked={securitySettings.twoFactorEnabled}
                        onChange={() => handleSecurityToggle("twoFactorEnabled")}
                      />
                    </div>
                  </div>
                </div>

                {/* Login Activity */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Login Activity</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Monitor and control your active sessions</p>
                  </div>
                  <div className="px-6 divide-y divide-gray-100 dark:divide-gray-800">
                    <ToggleSwitch
                      label="Login Alerts"
                      description="Get notified when someone logs into your account"
                      checked={securitySettings.loginAlerts}
                      onChange={() => handleSecurityToggle("loginAlerts")}
                    />
                    <div className="py-4">
                      <label className="text-[13px] font-medium text-gray-700 dark:text-gray-300">Session Timeout</label>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 mb-2">Automatically log out after period of inactivity</p>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSessionChange(e.target.value)}
                        className="w-full sm:w-48 h-9 px-3 text-[13px] rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1C52AF]/10 focus:border-[#1C52AF]/40 transition-all dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900/30 shadow-sm">
                  <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/20">
                    <h2 className="text-base font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Irreversible account actions</p>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">Delete Account</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Permanently delete your account and all associated data</p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                            showToast("Account deletion request submitted", "success");
                          }
                        }}
                        className="px-4 py-2 text-[13px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/10 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
