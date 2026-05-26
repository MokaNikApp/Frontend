






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowLeft,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiPlus,
  HiX,
} from "react-icons/hi";
import api from "../api/axios";

// ─── constants ────────────────────────────────────────────────────────────────
const SPECIALIZATIONS = [
  "Transmission Repair",
  "Mechanical",
  "Electrical",
  "Plumbing",
  "Painting",
  "Carpentry",
  "AC Repair",
  "Body Work",
  "Diagnostics",
  "Suspension & Steering",
];

const BUSINESS_TYPES = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
];

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const DEFAULT_HOURS = { open: "09:00", close: "18:00", enabled: true };

// ─── small helpers ────────────────────────────────────────────────────────────
function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const remove = (item) => onChange(value.filter((v) => v !== item));

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 bg-[#1D52AF] text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
        >
          <HiPlus />
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-[#1D52AF] rounded-full font-medium"
            >
              {item}
              <button
                type="button"
                onClick={() => remove(item)}
                className="hover:text-red-500 transition-colors"
              >
                <HiX size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiSelect({ options, value, onChange, placeholder }) {
  const toggle = (opt) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            value.includes(opt)
              ? "bg-[#1D52AF] text-white border-[#1D52AF]"
              : "bg-white text-gray-600 border-gray-300 hover:border-[#1D52AF]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 sm:text-sm">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
const BookingB = ({ currentStep = 2, totalSteps = 4 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  // ── form state ──
  const [form, setForm] = useState({
    yearsOfExperience: "",
    workshopName: "",
    primarySpecialization: "",
    serviceAreas: [],           // array of strings
    secondarySpecializations: [],
    serviceRadius: "",
    yearsInBusiness: "",
    businessPhoneNumber: "",
    businessType: "",
    taxId: "",
    certifications: [],
    insuranceProvider: "",
    insurancePolicyNumber: "",
    website: "",
    description: "",
  });

  const [businessHours, setBusinessHours] = useState(
    Object.fromEntries(DAYS.map((d) => [d, { ...DEFAULT_HOURS }]))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const updateHour = (day, field, value) =>
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));

  const toggleDay = (day) =>
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));

  // build the business-hours payload the backend expects
  const buildHoursPayload = () =>
    Object.fromEntries(
      DAYS.filter((d) => businessHours[d].enabled).map((d) => [
        d,
        `${businessHours[d].open}-${businessHours[d].close}`,
      ])
    );

  // ── api call ──
  const handleNext = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      yearsOfExperience: Number(form.yearsOfExperience),
      workshopName: form.workshopName || undefined,
      primarySpecialization: form.primarySpecialization,
      serviceAreas: form.serviceAreas,
      secondarySpecializations: form.secondarySpecializations,
      serviceRadius: Number(form.serviceRadius),
      yearsInBusiness: Number(form.yearsInBusiness),
      businessHours: buildHoursPayload(),
      businessPhoneNumber: form.businessPhoneNumber,
      businessType: form.businessType,
      taxId: form.taxId || undefined,
      certifications: form.certifications,
      insuranceProvider: form.insuranceProvider || undefined,
      insurancePolicyNumber: form.insurancePolicyNumber || undefined,
      website: form.website || undefined,
      description: form.description,
    };

    try {
      await api.put("/provider/onboarding/professional-details", payload);
      navigate(`/booking/${currentStep + 1}`);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => navigate(`/booking/${currentStep - 1}`);

  // ─── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto p-4 sm:max-w-3xl sm:p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* ── header ── */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700 sm:text-base">
          Step {currentStep}: Professional Details
        </p>
        <p className="text-sm text-gray-500">
          {currentStep}/{totalSteps}
        </p>
      </div>

      {/* ── progress ── */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-[#1D52AF] h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 -mt-4">Onboarding Progress</p>

      {/* ── intro ── */}
      <div>
        <h2 className="text-base font-semibold sm:text-lg">Professional Details</h2>
        <p className="text-xs text-gray-600 sm:text-sm mt-1">
          Tell us about your expertise and service location to help us match you with the right jobs.
        </p>
      </div>

      {/* ── error banner ── */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
          <HiX className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleNext} className="space-y-8">
        {/* ════════════════════════ 1. EXPERIENCE ════════════════════════ */}
        <Section title="Experience">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Years of Experience *">
              <input
                type="number"
                min="0"
                value={form.yearsOfExperience}
                onChange={setField("yearsOfExperience")}
                required
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                placeholder="e.g. 6"
              />
            </Field>

            <Field label="Years in Business *">
              <input
                type="number"
                min="0"
                value={form.yearsInBusiness}
                onChange={setField("yearsInBusiness")}
                required
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                placeholder="e.g. 4"
              />
            </Field>
          </div>

          <Field label="Description *" hint="Briefly describe your services and expertise.">
            <textarea
              value={form.description}
              onChange={setField("description")}
              required
              rows={3}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm resize-none"
              placeholder="Quality auto repairs with 6 years experience..."
            />
          </Field>
        </Section>

        {/* ════════════════════════ 2. SPECIALIZATION ════════════════════════ */}
        <Section title="Specialization">
          <Field label="Primary Specialization *">
            <select
              value={form.primarySpecialization}
              onChange={setField("primarySpecialization")}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
            >
              <option value="" disabled>Select primary specialization</option>
              {SPECIALIZATIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field
            label="Secondary Specializations"
            hint="Select all that apply."
          >
            <MultiSelect
              options={SPECIALIZATIONS.filter((s) => s !== form.primarySpecialization)}
              value={form.secondarySpecializations}
              onChange={set("secondarySpecializations")}
            />
          </Field>

          <Field label="Certifications" hint="Press Enter or click + to add each certification.">
            <TagInput
              value={form.certifications}
              onChange={set("certifications")}
              placeholder="e.g. ASE Certified"
            />
          </Field>
        </Section>

        {/* ════════════════════════ 3. BUSINESS INFO ════════════════════════ */}
        <Section title="Business Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Workshop Name (Optional)">
              <div className="relative">
                <HiOutlineBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.workshopName}
                  onChange={setField("workshopName")}
                  className="w-full pl-9 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                  placeholder="Acme Auto Repair"
                />
              </div>
            </Field>

            <Field label="Business Type *">
              <select
                value={form.businessType}
                onChange={setField("businessType")}
                required
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
              >
                <option value="" disabled>Select type</option>
                {BUSINESS_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </Field>

            <Field label="Business Phone *">
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={form.businessPhoneNumber}
                  onChange={setField("businessPhoneNumber")}
                  required
                  className="w-full pl-9 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
            </Field>

            <Field label="Website (Optional)">
              <div className="relative">
                <HiOutlineGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={form.website}
                  onChange={setField("website")}
                  className="w-full pl-9 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </Field>

            <Field label="Tax ID (Optional)">
              <input
                type="text"
                value={form.taxId}
                onChange={setField("taxId")}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                placeholder="12-3456789"
              />
            </Field>
          </div>
        </Section>

        {/* ════════════════════════ 4. INSURANCE ════════════════════════ */}
        <Section title="Insurance (Optional)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Insurance Provider">
              <input
                type="text"
                value={form.insuranceProvider}
                onChange={setField("insuranceProvider")}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                placeholder="e.g. Allstate"
              />
            </Field>

            <Field label="Policy Number">
              <input
                type="text"
                value={form.insurancePolicyNumber}
                onChange={setField("insurancePolicyNumber")}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                placeholder="e.g. POL123456"
              />
            </Field>
          </div>
        </Section>

        {/* ════════════════════════ 5. SERVICE AREA ════════════════════════ */}
        <Section title="Service Area">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field
                label="Service Cities / Areas *"
                hint="Press Enter or click + to add each area."
              >
                <TagInput
                  value={form.serviceAreas}
                  onChange={set("serviceAreas")}
                  placeholder="e.g. Ikeja"
                />
              </Field>
              {form.serviceAreas.length === 0 && (
                <p className="text-xs text-red-400 mt-1">At least one service area is required.</p>
              )}
            </div>

            <Field label="Service Radius (km) *">
              <div className="relative">
                <HiOutlineLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={form.serviceRadius}
                  onChange={setField("serviceRadius")}
                  required
                  className="w-full pl-9 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF] text-sm"
                  placeholder="e.g. 25"
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* ════════════════════════ 6. BUSINESS HOURS ════════════════════════ */}
        <Section title="Business Hours">
          <div className="space-y-2">
            {DAYS.map((day) => {
              const h = businessHours[day];
              return (
                <div
                  key={day}
                  className={`grid grid-cols-[auto_1fr] sm:grid-cols-[140px_1fr] items-center gap-3 p-3 rounded-lg border transition-colors ${
                    h.enabled ? "border-blue-200 bg-blue-50/40" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {/* day toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        h.enabled ? "bg-[#1D52AF]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          h.enabled ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-xs font-semibold text-gray-700 capitalize min-w-[60px]">
                      {day.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  {/* time range */}
                  {h.enabled ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={h.open}
                        onChange={(e) => updateHour(day, "open", e.target.value)}
                        className="flex-1 p-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                      />
                      <span className="text-gray-400 text-xs">to</span>
                      <input
                        type="time"
                        value={h.close}
                        onChange={(e) => updateHour(day, "close", e.target.value)}
                        className="flex-1 p-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ════════════════════════ ACTIONS ════════════════════════ */}
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className="flex-1 p-3 text-white bg-gray-400 rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <HiArrowLeft /> Back
          </button>
          <button
            type="submit"
            disabled={isLoading || form.serviceAreas.length === 0}
            className="flex-1 p-3 text-white bg-[#1D52AF] rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>Next Step <HiArrowRight /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingB;