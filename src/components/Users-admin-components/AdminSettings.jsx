// AdminSettings.jsx
import { useState } from "react";
import {
  MdDashboard,
  MdPerson,
  MdTune,
  MdSecurity,
  MdAccessTime,
  MdLock,
  MdCheckCircle,
  MdCameraAlt,
  MdSettings
} from "react-icons/md";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const tabs = [
  { key: "platform", label: "Platform", icon: <MdDashboard /> },
  { key: "profile", label: "Admin Profile", icon: <MdPerson /> },
  { key: "preferences", label: "System Preferences", icon: <MdTune /> },
  { key: "security", label: "Security & Auth", icon: <MdSecurity /> },
];

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-10 h-5 rounded-full transition ${
      enabled ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform ${
        enabled ? "translate-x-5" : ""
      }`}
    />
  </button>
);

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");
  const [saved, setSaved] = useState(false);

  const [serviceFee, setServiceFee] = useState("15.00");
  const [minWithdrawal, setMinWithdrawal] = useState("50.00");
  const [openingTime, setOpeningTime] = useState("08:00 AM");
  const [closingTime, setClosingTime] = useState("08:00 PM");

  const [adminName, setAdminName] = useState("Admin Administrator");
  const [adminEmail, setAdminEmail] = useState("admin@mokanik.com");
  const [adminRole] = useState("ADMIN");
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const [appearance, setAppearance] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(false);

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
    setAvatar(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {saved && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-500 text-white text-sm rounded-xl shadow-lg">
          <MdCheckCircle className="w-4 h-4" />
          Settings saved successfully
        </div>
      )}

      <div className="mb-6">
        <p className="text-xs text-gray-400">Admin / Settings</p>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your platform configuration and personal preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-52 flex flex-row lg:flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}

          <div className="hidden lg:block mt-6 bg-[#1D4ED8] rounded-xl p-4 text-white relative overflow-hidden">
            <MdSettings className="absolute bottom-2 right-2 text-white/20 text-6xl" />
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-xs font-bold uppercase">Platform Status</p>
            </div>
            <p className="text-sm font-bold">● LIVE & OPTIMAL</p>
            <p className="text-xs text-blue-200">
              You are currently managing the production environment of MokaNik.
            </p>
          </div>
        </div>

        <div className="flex-1">

          {activeTab === "platform" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div className="flex items-center gap-2">
                <MdDashboard className="text-blue-600" />
                <h2 className="font-bold">Platform Settings</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-gray-500">Service fee percentage</label>
                  <div className="flex border rounded-lg">
                    <input
                      value={serviceFee}
                      onChange={(e) => setServiceFee(e.target.value)}
                      className="flex-1 px-3 py-2"
                    />
                    <span className="px-3 py-2 bg-gray-50">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Minimum withdrawal amount</label>
                  <div className="flex border rounded-lg">
                    <span className="px-3 py-2 bg-gray-50">$</span>
                    <input
                      value={minWithdrawal}
                      onChange={(e) => setMinWithdrawal(e.target.value)}
                      className="flex-1 px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500">Operating Hours (Auto-scheduling)</label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-xl">
                    <p className="text-xs">OPENING</p>
                    <input value={openingTime} onChange={(e)=>setOpeningTime(e.target.value)} />
                  </div>
                  <div className="border p-4 rounded-xl">
                    <p className="text-xs">CLOSING</p>
                    <input value={closingTime} onChange={(e)=>setClosingTime(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">

              <div className="flex items-center gap-4 border-b pb-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold overflow-hidden">
                    {avatar ? (
                      <img src={avatar} className="w-full h-full object-cover" />
                    ) : (
                      "AA"
                    )}
                  </div>

                  <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
                    <MdCameraAlt className="text-white text-sm" />
                    <input type="file" hidden onChange={handleImageUpload} />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 flex-1">
                  <input value={adminName} onChange={(e)=>setAdminName(e.target.value)} />
                  <input value={adminEmail} onChange={(e)=>setAdminEmail(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-between border-b pb-5">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">{adminRole}</span>
                <button className="text-blue-600">Change Role</button>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Security Authentication</p>
                  <p className="text-xs text-gray-400">Enhanced protection for your admin privileges.</p>
                </div>
                <Toggle enabled={twoFAEnabled} onChange={setTwoFAEnabled} />
              </div>

            </div>
          )}

          {activeTab === "preferences" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div className="flex gap-3">
                {[ "light","dark","system"].map((m)=>(
                  <button key={m} onClick={()=>setAppearance(m)} className="border px-5 py-3 rounded-xl">
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Email notifications</span>
                  <Toggle enabled={emailNotifications} onChange={setEmailNotifications}/>
                </div>
                <div className="flex justify-between">
                  <span>In-app alerts</span>
                  <Toggle enabled={inAppAlerts} onChange={setInAppAlerts}/>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleDiscard}>Discard Changes</button>
            <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2 rounded-xl">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}