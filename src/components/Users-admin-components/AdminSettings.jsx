// AdminSettings.jsx
import { useState } from "react";
import {
  MdDashboard,
  MdPerson,
  MdTune,
  MdSecurity,
  MdAccessTime,
  MdCheckCircle,
  MdCameraAlt,
  MdExitToApp
} from "react-icons/md";

const tabs = [
  { key: "platform", label: "Platform", icon: <MdDashboard className="text-xl" /> },
  { key: "profile", label: "Admin Profile", icon: <MdPerson className="text-xl" /> },
  { key: "preferences", label: "System Preferences", icon: <MdTune className="text-xl" /> },
  { key: "security", label: "Security & Auth", icon: <MdSecurity className="text-xl" /> },
];

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
      enabled ? "bg-[#0B44A0]" : "bg-[#E2E8F0]"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
        enabled ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");
  const [saved, setSaved] = useState(false);

  // Form States
  const [serviceFee, setServiceFee] = useState("15.00");
  const [minWithdrawal, setMinWithdrawal] = useState("50.00");
  const [openingTime, setOpeningTime] = useState("08:00 AM");
  const [closingTime, setClosingTime] = useState("08:00 PM");

  const [adminName, setAdminName] = useState("Admin Administrator");
  const [adminEmail, setAdminEmail] = useState("admin@mokanik.com");
  const [adminRole] = useState("ADMIN");
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  const [appearance, setAppearance] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(false);

  // Security Specific States
  const [sessionTimeout, setSessionTimeout] = useState("15");
  const [loginAttempts, setLoginAttempts] = useState("5");
  const [requireDeviceApproval, setRequireDeviceApproval] = useState(true);
  const [reauthForPayouts, setReauthForPayouts] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDiscard = () => {
    setServiceFee("15.00");
    setMinWithdrawal("50.00");
    setOpeningTime("08:00 AM");
    setClosingTime("08:00 PM");
    setAdminName("Admin Administrator");
    setAdminEmail("admin@mokanik.com");
    setAppearance("light");
    setEmailNotifications(true);
    setInAppAlerts(false);
    setTwoFAEnabled(true);
    setSessionTimeout("15");
    setLoginAttempts("5");
    setRequireDeviceApproval(true);
    setReauthForPayouts(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] font-sans p-6 lg:p-10 text-[#1E293B]">
      
      {/* Toast Notification */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl shadow-xl transition-all">
          <MdCheckCircle className="text-lg" />
          Settings saved successfully
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1">Admin / Settings</p>
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your platform configuration and personal preferences.
        </p>
      </div>

      {/* Main Framework Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {" "}
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-64 bg-[#ECF2F9] rounded-2xl p-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-white text-[#0B44A0] shadow-sm"
                    : "text-[#4A5568] hover:bg-[#E2EAF4]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Platform Status Component Box */}
          <div className="pt-4">
            <div className="bg-[#1546A0] rounded-xl p-4 text-white relative overflow-hidden shadow-sm">
              {/* Subtle Cog Design Background */}
              <div className="absolute -bottom-4 -right-4 text-white/10 text-7xl select-none pointer-events-none font-bold">⚙</div>
              
              <p className="text-[11px] font-bold tracking-wider uppercase opacity-80 mb-1">Platform Status</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full shadow-[0_0_8px_#22C55E]"></span>
                <p className="text-sm font-bold tracking-wide">LIVE & OPTIMAL</p>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                You are currently managing the production environment of MokaNik.
              </p>
            </div>
          </div>
        </div>

        {/* Right Dynamic Workspace Panel */}
        <div className="flex-1 w-full space-y-6">

          {/* Conditional Blocks / Multi-Section View Layout */}
          {(activeTab === "platform" || activeTab === "all") && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
                <MdDashboard className="text-xl text-[#0B44A0]" />
                <h2 className="text-lg font-bold text-[#0F172A]">Platform Settings</h2>
              </div>

              {/* Numerical Control Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Service fee percentage</label>
                  <div className="flex items-center bg-[#EEF2FA] rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-300 transition-all">
                    <input
                      type="text"
                      value={serviceFee}
                      onChange={(e) => setServiceFee(e.target.value)}
                      className="w-full bg-transparent font-semibold text-[#0F172A] outline-none"
                    />
                    <span className="font-bold text-gray-400 ml-2">%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Applied to every booking completion on the platform.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Minimum withdrawal amount</label>
                  <div className="flex items-center bg-[#EEF2FA] rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-300 transition-all">
                    <span className="font-bold text-gray-400 mr-2">$</span>
                    <input
                      type="text"
                      value={minWithdrawal}
                      onChange={(e) => setMinWithdrawal(e.target.value)}
                      className="w-full bg-transparent font-semibold text-[#0F172A] outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">For both mechanics and partner service centers.</p>
                </div>
              </div>

              {/* Time Control Panels */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Operating hours (Auto-scheduling)</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-[#EEF2FA] p-4 rounded-xl">
                    <div className="bg-[#0B44A0]/10 p-2.5 rounded-lg text-[#0B44A0]">
                      <MdAccessTime className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider">OPENING</p>
                      <input 
                        type="text" 
                        value={openingTime} 
                        onChange={(e) => setOpeningTime(e.target.value)}
                        className="bg-transparent font-bold text-[#0F172A] text-base outline-none w-full mt-0.5" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#EEF2FA] p-4 rounded-xl">
                    <div className="bg-[#0B44A0]/10 p-2.5 rounded-lg text-[#0B44A0]">
                      <MdExitToApp className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider">CLOSING</p>
                      <input 
                        type="text" 
                        value={closingTime} 
                        onChange={(e) => setClosingTime(e.target.value)}
                        className="bg-transparent font-bold text-[#0F172A] text-base outline-none w-full mt-0.5" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "profile" || activeTab === "all") && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
                <MdPerson className="text-xl text-[#0B44A0]" />
                <h2 className="text-lg font-bold text-[#0F172A]">Admin Profile</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Visual Professional Avatar Component Layout */}
                <div className="relative group mx-auto md:mx-0">
                  <div className="w-24 h-24 rounded-2xl bg-[#3DB2B6] overflow-hidden flex items-end justify-center border border-gray-100 shadow-sm">
                    <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-[#0B44A0] p-2 rounded-full cursor-pointer text-white hover:bg-blue-700 shadow-md transition-colors">
                    <MdCameraAlt className="text-sm" />
                    <input type="file" hidden accept="image/*" />
                  </label>
                </div>

                {/* Identity Form Controls */}
                <div className="flex-1 w-full grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider mb-1.5 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full bg-[#EEF2FA] font-semibold text-[#0F172A] rounded-xl px-4 py-3 border border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider mb-1.5 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full bg-[#EEF2FA] font-semibold text-[#0F172A] rounded-xl px-4 py-3 border border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Role Component Controls */}
              <div className="flex items-center justify-between bg-[#EEF2FA] rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">Platform Role:</span>
                  <span className="bg-[#0B44A0]/10 text-[#0B44A0] font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wide">
                    {adminRole}
                  </span>
                </div>
                <button type="button" className="text-sm font-bold text-[#0B44A0] hover:underline">
                  Change Role
                </button>
              </div>

              {/* Security Switch Control Row */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm md:text-base">Security Authentication</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Enhanced protection for your admin privileges.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" className="hidden sm:inline-block bg-[#EEF2FA] text-[#0B44A0] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#E2EAF4] transition-colors">
                    Change Password
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Enable 2FA</span>
                    <Toggle enabled={twoFAEnabled} onChange={setTwoFAEnabled} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "preferences" || activeTab === "all") && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
                <MdTune className="text-xl text-[#0B44A0]" />
                <h2 className="text-lg font-bold text-[#0F172A]">System Preferences</h2>
              </div>

              {/* Visual Appearance Themes Array Grid Layout */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Appearance Mode</h3>
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  
                  {/* Light Card */}
                  <button
                    type="button"
                    onClick={() => setAppearance("light")}
                    className={`flex flex-col items-center gap-3 p-3 rounded-xl transition-all ${
                      appearance === "light"
                        ? "border-2 border-[#0B44A0] bg-[#FAFCFF]"
                        : "border border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-16 bg-[#EEF2FA] rounded-lg flex items-center justify-center p-2">
                      <div className="w-8 h-10 bg-white rounded border border-gray-100 shadow-xs" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Light</span>
                  </button>

                  {/* Dark Card */}
                  <button
                    type="button"
                    onClick={() => setAppearance("dark")}
                    className={`flex flex-col items-center gap-3 p-3 rounded-xl transition-all ${
                      appearance === "dark"
                        ? "border-2 border-[#0B44A0] bg-[#FAFCFF]"
                        : "border border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-16 bg-[#EEF2FA] rounded-lg flex items-center justify-center p-2">
                      <div className="w-8 h-10 bg-[#0F172A] rounded shadow-xs" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Dark</span>
                  </button>

                  {/* System Card */}
                  <button
                    type="button"
                    onClick={() => setAppearance("system")}
                    className={`flex flex-col items-center gap-3 p-3 rounded-xl transition-all ${
                      appearance === "system"
                        ? "border-2 border-[#0B44A0] bg-[#FAFCFF]"
                        : "border border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-16 bg-[#EEF2FA] rounded-lg flex items-center justify-center p-2">
                      <div className="w-8 h-10 bg-linear-to-br from-gray-200 to-gray-600 rounded shadow-xs" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">System</span>
                  </button>
                </div>
              </div>

              {/* Notification Control Rows */}
              <div className="space-y-4 max-w-2xl border-t border-gray-50 pt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Notifications</h3>
                
                {/* Email Switch Control Row */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-gray-100 text-gray-500 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">Email notifications</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Receive weekly platform reports</p>
                    </div>
                  </div>
                  <Toggle enabled={emailNotifications} onChange={setEmailNotifications} />
                </div>

                {/* In App Switch Control Row */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-gray-100 text-gray-500 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">In-app alerts</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Real-time booking confirmations</p>
                    </div>
                  </div>
                  <Toggle enabled={inAppAlerts} onChange={setInAppAlerts} />
                </div>
              </div>
            </div>
          )}

          {/* Security & Auth View Layout Panel */}
          {(activeTab === "security" || activeTab === "all") && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
                <MdSecurity className="text-xl text-[#0B44A0]" />
                <h2 className="text-lg font-bold text-[#0F172A]">Security & Authentication</h2>
              </div>

              {/* Threat Mitigation Constraints Array */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Session Timeout Duration</label>
                  <div className="flex items-center bg-[#EEF2FA] rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-300 transition-all">
                    <input
                      type="text"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="w-full bg-transparent font-semibold text-[#0F172A] outline-none"
                    />
                    <span className="font-bold text-gray-400 ml-2">Mins</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Automatically sign out idle administrators to ensure dashboard containment.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Max Login Attempts</label>
                  <div className="flex items-center bg-[#EEF2FA] rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-300 transition-all">
                    <input
                      type="text"
                      value={loginAttempts}
                      onChange={(e) => setLoginAttempts(e.target.value)}
                      className="w-full bg-transparent font-semibold text-[#0F172A] outline-none"
                    />
                    <span className="font-bold text-gray-400 ml-2">Attempts</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Temporary lockout parameter for sequential login failures.</p>
                </div>
              </div>

              {/* MokaNik-Specific Operational Security Rules */}
              <div className="space-y-4 border-t border-gray-50 pt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Platform Guard Rules</h3>

                {/* Mechanic Application Node Safeguard */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-gray-100 text-gray-500 p-2 rounded-lg">
                      <MdAccessTime className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">New Mechanic Device Approval</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Require manual admin authorization when a provider signs in on an unverified device.</p>
                    </div>
                  </div>
                  <Toggle enabled={requireDeviceApproval} onChange={setRequireDeviceApproval} />
                </div>

                {/* Core Financial Adjustments Escrow Switch */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-gray-100 text-gray-500 p-2 rounded-lg">
                      <MdExitToApp className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">Financial Parameters Guard</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Force strict 2FA re-verification prior to modifying system service fees or withdrawal limits.</p>
                    </div>
                  </div>
                  <Toggle enabled={reauthForPayouts} onChange={setReauthForPayouts} />
                </div>
              </div>
            </div>
          )}

          {/* Core Layout Action Controls Bar */}
          <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleDiscard}
              className="text-sm font-bold text-gray-500 hover:text-gray-700 px-4 py-2.5 transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#0B44A0] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-800 shadow-md shadow-blue-900/10 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}