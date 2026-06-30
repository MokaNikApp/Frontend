





import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import {
  User, MapPin, Phone, Mail, Clock, Star, Briefcase, Award,
  Shield, Edit3, Save, X, ChevronRight, Camera, Wrench,
  Building2, Globe, FileText, CheckCircle2, AlertCircle,
  BadgeCheck, Timer, Truck, DollarSign, Landmark, Plus,
  Trash2, GripVertical, ArrowLeft, Settings, Bell, Lock,
  CreditCard, Palette, Languages, Moon, Sun, ChevronDown,
  Search, XCircle, Check, Info, Loader2, Sparkles
} from "lucide-react";

const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const DAY_LABELS = {
  monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",
  thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday"
};

const BUSINESS_TYPES = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
];

const SPECIALIZATIONS = [
  "Transmission Repair","AC Repair","Electrical","Engine Repair",
  "Brake Repair","Suspension","Oil Change","Tire Service",
  "Diagnostic","Body Work","Painting","Detailing"
];

const LAGOS_AREAS = [
  "Ikeja","Lekki","Victoria Island","Ajah","Surulere","Yaba",
  "Ikoyi","Maryland","Gbagada","Oshodi","Ikorodu","Festac"
];

export default function ProviderSettings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);

  // Form states
  const [personalForm, setPersonalForm] = useState({});
  const [businessForm, setBusinessForm] = useState({});
  const [locationForm, setLocationForm] = useState({});
  const [areasForm, setAreasForm] = useState([]);
  const [hoursForm, setHoursForm] = useState({});
  const [certificationsForm, setCertificationsForm] = useState([]);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/provider/profile");
      const data = res.data;
      setProfile(data);

      // Initialize all forms
      setPersonalForm({
        firstName: data.user?.firstName || "",
        lastName: data.user?.lastName || "",
        email: data.user?.email || "",
        phoneNumber: data.user?.phoneNumber || "",
        address: data.user?.address || "",
        city: data.user?.city || "",
        state: data.user?.state || "",
      });

      setBusinessForm({
        workshopName: data.workshopName || "",
        yearsOfExperience: data.yearsOfExperience || "",
        yearsInBusiness: data.yearsInBusiness || "",
        primarySpecialization: data.primarySpecialization || "",
        secondarySpecializations: data.secondarySpecializations || [],
        businessPhoneNumber: data.businessPhoneNumber || "",
        businessType: data.businessType || "",
        taxId: data.taxId || "",
        website: data.website || "",
        description: data.description || "",
        insuranceProvider: data.insuranceProvider || "",
        insurancePolicyNumber: data.insurancePolicyNumber || "",
      });

      setLocationForm({
        city: data.user?.city || "",
        state: data.user?.state || "",
        serviceRadius: data.serviceRadius || "",
      });

      setAreasForm(data.serviceAreas || []);
      setHoursForm(data.businessHours || {});
      setCertificationsForm(data.certifications || []);
      setUnsavedChanges(false);
    } catch (err) {
      showNotification("error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSectionChange = (section) => {
    if (unsavedChanges) {
      setPendingSection(section);
      setShowUnsavedModal(true);
      return;
    }
    setActiveSection(section);
  };

  const confirmSectionChange = () => {
    setShowUnsavedModal(false);
    setUnsavedChanges(false);
    if (pendingSection) {
      setActiveSection(pendingSection);
      setPendingSection(null);
    }
  };

  const discardAndChange = () => {
    fetchProfile(); // Reset forms
    confirmSectionChange();
  };

  // ─── SAVE HANDLERS ─────────────────────────────────────────────────────

  const savePersonal = async () => {
    try {
      setSaving(true);
      await api.put("/users/profile", {
        firstName: personalForm.firstName,
        lastName: personalForm.lastName,
        phoneNumber: personalForm.phoneNumber,
        address: personalForm.address,
      });
      showNotification("success", "Personal info saved");
      setUnsavedChanges(false);
      fetchProfile();
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveBusiness = async () => {
    try {
      setSaving(true);
      const payload = {
        yearsOfExperience: parseInt(businessForm.yearsOfExperience) || 0,
        workshopName: businessForm.workshopName,
        primarySpecialization: businessForm.primarySpecialization,
        serviceAreas: areasForm,
        secondarySpecializations: businessForm.secondarySpecializations,
        serviceRadius: parseInt(locationForm.serviceRadius) || 0,
        yearsInBusiness: parseInt(businessForm.yearsInBusiness) || 0,
        businessHours: hoursForm,
        businessPhoneNumber: businessForm.businessPhoneNumber,
        businessType: businessForm.businessType || null,
        taxId: businessForm.taxId || null,
        certifications: certificationsForm,
        insuranceProvider: businessForm.insuranceProvider || null,
        insurancePolicyNumber: businessForm.insurancePolicyNumber || null,
        website: businessForm.website || null,
        description: businessForm.description || null,
      };
      await api.put("/provider/onboarding/professional-details", payload);
      showNotification("success", "Business details saved");
      setUnsavedChanges(false);
      fetchProfile();
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveLocation = async () => {
    try {
      setSaving(true);
      await api.put("/provider/location", {
        city: locationForm.city,
        state: locationForm.state,
        serviceRadius: parseInt(locationForm.serviceRadius) || 0,
      });
      showNotification("success", "Location saved");
      setUnsavedChanges(false);
      fetchProfile();
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveServiceAreas = async () => {
    try {
      setSaving(true);
      await api.put("/provider/service-areas", { serviceAreas: areasForm });
      showNotification("success", "Service areas saved");
      setUnsavedChanges(false);
      fetchProfile();
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveHours = async () => {
    try {
      setSaving(true);
      // Hours are part of professional-details
      await api.put("/provider/onboarding/professional-details", {
        ...businessForm,
        businessHours: hoursForm,
        yearsOfExperience: parseInt(businessForm.yearsOfExperience) || 0,
        yearsInBusiness: parseInt(businessForm.yearsInBusiness) || 0,
        serviceRadius: parseInt(locationForm.serviceRadius) || 0,
      });
      showNotification("success", "Business hours saved");
      setUnsavedChanges(false);
      fetchProfile();
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ─── LOADING ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-[13px] text-gray-400 font-medium">Loading settings…</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "personal", label: "Personal Info", icon: User, desc: "Name, contact, address" },
    { id: "business", label: "Business Details", icon: Building2, desc: "Workshop, specializations" },
    { id: "location", label: "Location", icon: MapPin, desc: "City, state, radius" },
    { id: "areas", label: "Service Areas", icon: Truck, desc: "Covered locations" },
    { id: "hours", label: "Business Hours", icon: Clock, desc: "Operating schedule" },
    { id: "banking", label: "Banking", icon: CreditCard, desc: "Payout account" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border transition-all ${
            notification.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {notification.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-[13px] font-medium">{notification.message}</span>
          </div>
        )}

        {/* Unsaved Changes Modal */}
        {showUnsavedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Unsaved Changes</h3>
              <p className="text-[13px] text-gray-500 mb-5">You have unsaved changes. Save before leaving or discard them?</p>
              <div className="flex gap-2">
                <button onClick={discardAndChange} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                  Discard
                </button>
                <button onClick={confirmSectionChange} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 transition-colors">
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={() => navigate("/provider/profile")} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-[22px] sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Settings</h1>
                  <p className="text-gray-400 text-[13px] sm:text-sm">Manage your profile, business, and preferences</p>
                </div>
              </div>
            </div>

            {/* Unsaved indicator */}
            {unsavedChanges && (
              <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-[12px] font-medium text-amber-800">You have unsaved changes</span>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
                  <div className="p-4 border-b border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Settings</p>
                  </div>
                  <nav className="p-2">
                    {sections.map(sec => {
                      const Icon = sec.icon;
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleSectionChange(sec.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-0.5 ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                          <div className="min-w-0">
                            <p className={`text-[13px] font-semibold ${isActive ? "text-blue-700" : "text-gray-700"}`}>{sec.label}</p>
                            <p className="text-[11px] text-gray-400 truncate">{sec.desc}</p>
                          </div>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400 ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">

                {/* PERSONAL INFO */}
                {activeSection === "personal" && (
                  <SettingsCard
                    title="Personal Information"
                    icon={User}
                    description="Update your name, contact details, and address"
                    onSave={savePersonal}
                    saving={saving}
                    unsaved={unsavedChanges}
                    setUnsaved={setUnsavedChanges}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="First Name" value={personalForm.firstName} onChange={v => { setPersonalForm(f => ({...f, firstName: v})); setUnsavedChanges(true); }} />
                      <FormField label="Last Name" value={personalForm.lastName} onChange={v => { setPersonalForm(f => ({...f, lastName: v})); setUnsavedChanges(true); }} />
                    </div>
                    <FormField label="Email" type="email" value={personalForm.email} onChange={v => { setPersonalForm(f => ({...f, email: v})); setUnsavedChanges(true); }} disabled />
                    <FormField label="Phone Number" type="tel" value={personalForm.phoneNumber} onChange={v => { setPersonalForm(f => ({...f, phoneNumber: v})); setUnsavedChanges(true); }} />
                    <FormField label="Address" value={personalForm.address} onChange={v => { setPersonalForm(f => ({...f, address: v})); setUnsavedChanges(true); }} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="City" value={personalForm.city} onChange={v => { setPersonalForm(f => ({...f, city: v})); setUnsavedChanges(true); }} />
                      <FormField label="State" value={personalForm.state} onChange={v => { setPersonalForm(f => ({...f, state: v})); setUnsavedChanges(true); }} />
                    </div>
                  </SettingsCard>
                )}

                {/* BUSINESS DETAILS */}
                {activeSection === "business" && (
                  <SettingsCard
                    title="Business Details"
                    icon={Building2}
                    description="Workshop info, specializations, and certifications"
                    onSave={saveBusiness}
                    saving={saving}
                    unsaved={unsavedChanges}
                    setUnsaved={setUnsavedChanges}
                  >
                    <FormField label="Workshop Name" value={businessForm.workshopName} onChange={v => { setBusinessForm(f => ({...f, workshopName: v})); setUnsavedChanges(true); }} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Years of Experience" type="number" value={businessForm.yearsOfExperience} onChange={v => { setBusinessForm(f => ({...f, yearsOfExperience: v})); setUnsavedChanges(true); }} />
                      <FormField label="Years in Business" type="number" value={businessForm.yearsInBusiness} onChange={v => { setBusinessForm(f => ({...f, yearsInBusiness: v})); setUnsavedChanges(true); }} />
                    </div>

                    {/* Primary Specialization */}
                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Primary Specialization</label>
                      <div className="relative">
                        <select
                          value={businessForm.primarySpecialization}
                          onChange={e => { setBusinessForm(f => ({...f, primarySpecialization: e.target.value})); setUnsavedChanges(true); }}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select specialization</option>
                          {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Secondary Specializations */}
                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Secondary Specializations</label>
                      <div className="flex flex-wrap gap-2">
                        {SPECIALIZATIONS.map(spec => {
                          const selected = businessForm.secondarySpecializations?.includes(spec);
                          return (
                            <button
                              key={spec}
                              onClick={() => {
                                const current = businessForm.secondarySpecializations || [];
                                const updated = selected
                                  ? current.filter(s => s !== spec)
                                  : [...current, spec];
                                setBusinessForm(f => ({...f, secondarySpecializations: updated}));
                                setUnsavedChanges(true);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                                selected
                                  ? "bg-blue-50 border-blue-200 text-blue-700"
                                  : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 inline mr-1" />}
                              {spec}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Business Phone" type="tel" value={businessForm.businessPhoneNumber} onChange={v => { setBusinessForm(f => ({...f, businessPhoneNumber: v})); setUnsavedChanges(true); }} />
                      <FormField label="Website" type="url" value={businessForm.website} onChange={v => { setBusinessForm(f => ({...f, website: v})); setUnsavedChanges(true); }} placeholder="https://..." />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Business Type</label>
                        <div className="relative">
                          <select
                            value={businessForm.businessType}
                            onChange={e => { setBusinessForm(f => ({...f, businessType: e.target.value})); setUnsavedChanges(true); }}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select type</option>
                            {BUSINESS_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <FormField label="Tax ID" value={businessForm.taxId} onChange={v => { setBusinessForm(f => ({...f, taxId: v})); setUnsavedChanges(true); }} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Insurance Provider" value={businessForm.insuranceProvider} onChange={v => { setBusinessForm(f => ({...f, insuranceProvider: v})); setUnsavedChanges(true); }} />
                      <FormField label="Policy Number" value={businessForm.insurancePolicyNumber} onChange={v => { setBusinessForm(f => ({...f, insurancePolicyNumber: v})); setUnsavedChanges(true); }} />
                    </div>

                    {/* Certifications */}
                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Certifications</label>
                      <div className="flex flex-wrap gap-2">
                        {certificationsForm.map((cert, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[12px] font-medium border border-blue-100">
                            <Award className="w-3 h-3" />
                            {cert}
                            <button onClick={() => { setCertificationsForm(c => c.filter((_, idx) => idx !== i)); setUnsavedChanges(true); }} className="ml-1 hover:text-blue-900">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <AddTagInput
                          placeholder="Add certification..."
                          onAdd={v => { setCertificationsForm(c => [...c, v]); setUnsavedChanges(true); }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                      <textarea
                        value={businessForm.description}
                        onChange={e => { setBusinessForm(f => ({...f, description: e.target.value})); setUnsavedChanges(true); }}
                        rows={4}
                        placeholder="Describe your services and expertise..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                      />
                      <p className="text-[11px] text-gray-400">{businessForm.description?.length || 0}/500 characters</p>
                    </div>
                  </SettingsCard>
                )}

                {/* LOCATION */}
                {activeSection === "location" && (
                  <SettingsCard
                    title="Location & Coverage"
                    icon={MapPin}
                    description="Your base location and service coverage radius"
                    onSave={saveLocation}
                    saving={saving}
                    unsaved={unsavedChanges}
                    setUnsaved={setUnsavedChanges}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="City" value={locationForm.city} onChange={v => { setLocationForm(f => ({...f, city: v})); setUnsavedChanges(true); }} />
                      <FormField label="State" value={locationForm.state} onChange={v => { setLocationForm(f => ({...f, state: v})); setUnsavedChanges(true); }} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Service Radius</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={locationForm.serviceRadius || 25}
                          onChange={e => { setLocationForm(f => ({...f, serviceRadius: e.target.value})); setUnsavedChanges(true); }}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="w-20 text-center">
                          <span className="text-[18px] font-bold text-gray-900">{locationForm.serviceRadius || 25}</span>
                          <span className="text-[12px] text-gray-400 ml-1">km</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${((locationForm.serviceRadius || 25) / 100) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Visual radius indicator */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Truck className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-700">Coverage Area</p>
                          <p className="text-[11px] text-gray-400">Approximately {Math.round(Math.PI * Math.pow(locationForm.serviceRadius || 25, 2))} km²</p>
                        </div>
                      </div>
                    </div>
                  </SettingsCard>
                )}

                {/* SERVICE AREAS */}
                {activeSection === "areas" && (
                  <SettingsCard
                    title="Service Areas"
                    icon={Truck}
                    description="Select the areas you provide service to"
                    onSave={saveServiceAreas}
                    saving={saving}
                    unsaved={unsavedChanges}
                    setUnsaved={setUnsavedChanges}
                  >
                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Selected Areas</label>
                      <div className="flex flex-wrap gap-2">
                        {areasForm.map((area, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[12px] font-medium border border-blue-100">
                            <MapPin className="w-3 h-3" />
                            {area}
                            <button onClick={() => { setAreasForm(a => a.filter((_, idx) => idx !== i)); setUnsavedChanges(true); }} className="ml-1 hover:text-blue-900">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Available Areas</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {LAGOS_AREAS.map(area => {
                          const selected = areasForm.includes(area);
                          return (
                            <button
                              key={area}
                              onClick={() => {
                                setAreasForm(a => selected ? a.filter(x => x !== area) : [...a, area]);
                                setUnsavedChanges(true);
                              }}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-medium border transition-all ${
                                selected
                                  ? "bg-blue-50 border-blue-200 text-blue-700"
                                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                selected ? "bg-blue-600 border-blue-600" : "border-gray-300"
                              }`}>
                                {selected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              {area}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AddTagInput
                      placeholder="Add custom area..."
                      onAdd={v => { setAreasForm(a => [...a, v]); setUnsavedChanges(true); }}
                    />
                  </SettingsCard>
                )}

                {/* BUSINESS HOURS */}
                {activeSection === "hours" && (
                  <SettingsCard
                    title="Business Hours"
                    icon={Clock}
                    description="Set your weekly operating schedule"
                    onSave={saveHours}
                    saving={saving}
                    unsaved={unsavedChanges}
                    setUnsaved={setUnsavedChanges}
                  >
                    <div className="space-y-3">
                      {DAYS.map(day => {
                        const hours = hoursForm[day];
                        const isOpen = hours && hours.toLowerCase() !== "closed";
                        return (
                          <div key={day} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="w-24 flex-shrink-0">
                              <p className="text-[13px] font-semibold text-gray-700">{DAY_LABELS[day]}</p>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isOpen}
                                onChange={e => {
                                  setHoursForm(h => ({
                                    ...h,
                                    [day]: e.target.checked ? "09:00-18:00" : "Closed"
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>

                            {isOpen ? (
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="time"
                                  value={hours?.split("-")[0] || "09:00"}
                                  onChange={e => {
                                    const end = hours?.split("-")[1] || "18:00";
                                    setHoursForm(h => ({ ...h, [day]: `${e.target.value}-${end}` }));
                                    setUnsavedChanges(true);
                                  }}
                                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                  type="time"
                                  value={hours?.split("-")[1] || "18:00"}
                                  onChange={e => {
                                    const start = hours?.split("-")[0] || "09:00";
                                    setHoursForm(h => ({ ...h, [day]: `${start}-${e.target.value}` }));
                                    setUnsavedChanges(true);
                                  }}
                                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </div>
                            ) : (
                              <span className="text-[12px] text-gray-400 font-medium">Closed</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </SettingsCard>
                )}

                {/* BANKING */}
                {activeSection === "banking" && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <h3 className="text-[15px] font-bold text-gray-900">Banking</h3>
                      </div>
                      <p className="text-[12px] text-gray-400">Manage your payout account</p>
                    </div>
                    <div className="p-5 space-y-5">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[12px] font-semibold text-amber-800">Bank Account</p>
                          <p className="text-[12px] text-amber-700 mt-0.5">Banking details are managed through the Payments page for security.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoDisplay label="Bank Code" value={profile?.bankCode} />
                        <InfoDisplay label="Account Number" value={profile?.bankAccountNumber} />
                      </div>
                      <InfoDisplay label="Account Name" value={profile?.bankAccountName} />

                      <button
                        onClick={() => navigate("/mec-dashboard/mec-payments")}
                        className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[13px] font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Manage in Payments
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SettingsCard({ title, icon: Icon, description, children, onSave, saving, unsaved, setUnsaved }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon className="w-4 h-4 text-blue-600" />
            <h3 className="text-[15px] font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-[12px] text-gray-400">{description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {unsaved && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[11px] font-medium border border-amber-200">
              <Info className="w-3 h-3" /> Unsaved
            </span>
          )}
          <button
            onClick={onSave}
            disabled={saving || !unsaved}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
              saving || !unsaved
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            }`}
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
      <div className="p-5 space-y-5">
        {children}
      </div>
    </div>
  );
}

function FormField({ label, type = "text", value, onChange, disabled, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
          disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"
        }`}
      />
    </div>
  );
}

function InfoDisplay({ label, value }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-[13px] font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">{value}</p>
    </div>
  );
}

function AddTagInput({ placeholder, onAdd }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
      focused ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
    }`}>
      <Plus className="w-3.5 h-3.5 text-gray-400" />
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={e => {
          if (e.key === "Enter" && value.trim()) {
            onAdd(value.trim());
            setValue("");
          }
        }}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
      />
      {value.trim() && (
        <button
          onClick={() => { onAdd(value.trim()); setValue(""); }}
          className="px-2 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-semibold hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      )}
    </div>
  );
}