import React, { useState, useEffect, useCallback } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiHash,
  FiDroplet,
  FiActivity,
  FiCalendar,
  FiAlertTriangle,
  FiCheck,
  FiTruck,
  FiTool,
  FiInbox,
  FiSettings,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { DEFAULT_CAR_IMAGE } from "../../lib/utils/config";
import api from "../../api/axios";

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const PILL = "bg-white/15 text-white border border-white/25 backdrop-blur-sm";
const statusConfig = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pill: PILL,
  },
  inactive: {
    label: "Inactive",
    dot: "bg-gray-300",
    badge: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    pill: PILL,
  },
  maintenance: {
    label: "Service",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    pill: PILL,
  },
};

const getStatus = (status) => statusConfig[status?.toLowerCase()] ?? statusConfig.inactive;

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles =
    type === "success"
      ? "bg-emerald-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-[#1C52AF]";

  return (
    <div
      className={`fixed top-6 right-6 z-[70] ${styles} text-white pl-4 pr-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 fade-in duration-300`}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
        {type === "success" ? <FiCheck className="w-3.5 h-3.5" /> : <FiAlertTriangle className="w-3.5 h-3.5" />}
      </div>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`bg-white border border-gray-200/60 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[88vh] overflow-y-auto animate-in zoom-in-95 duration-200 dark:bg-gray-900 dark:border-gray-800`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-all duration-200 flex-shrink-0"
            aria-label="Close"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1"><FiAlertTriangle className="w-3 h-3"/>{error}</p>}
  </div>
);

const inputBase =
  "w-full h-10 px-3.5 text-sm rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-900";

const inputClass = (hasError) =>
  `${inputBase} ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-900 dark:focus:ring-red-900/20"
      : "border-gray-200 focus:border-[#1C52AF]/50 focus:ring-[#1C52AF]/10 dark:border-gray-700 dark:focus:border-[#1C52AF]/50 dark:focus:ring-[#1C52AF]/20"
  }`;

// ─── VEHICLE FORM ─────────────────────────────────────────────────────────────
const VehicleForm = ({ vehicle, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    plateNumber: "",
    color: "",
    vin: "",
    mileage: 0,
    imageUrl: "",
    ...vehicle,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.brand.trim()) e.brand = "Brand is required";
    if (!formData.model.trim()) e.model = "Model is required";
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) e.year = "Invalid year";
    if (!formData.plateNumber.trim()) e.plateNumber = "Plate number is required";
    if (!formData.color.trim()) e.color = "Color is required";
    if (!formData.vin.trim()) e.vin = "VIN is required";
    else if (formData.vin.length !== 17) e.vin = "VIN must be 17 characters";
    if (formData.mileage < 0) e.mileage = "Mileage cannot be negative";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Brand" error={errors.brand}>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className={inputClass(errors.brand)}
            placeholder="e.g. Toyota"
          />
        </Field>
        <Field label="Model" error={errors.model}>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className={inputClass(errors.model)}
            placeholder="e.g. Camry"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Year" error={errors.year}>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || "" })}
            className={inputClass(errors.year)}
          />
        </Field>
        <Field label="Plate number" error={errors.plateNumber}>
          <input
            type="text"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
            className={`${inputClass(errors.plateNumber)} font-mono tracking-wider`}
            placeholder="ABC-1234"
          />
        </Field>
        <Field label="Color" error={errors.color}>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className={inputClass(errors.color)}
            placeholder="e.g. Silver"
          />
        </Field>
      </div>

      <Field label="VIN · 17 characters" error={errors.vin}>
        <input
          type="text"
          value={formData.vin}
          onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase().slice(0, 17) })}
          className={`${inputClass(errors.vin)} font-mono tracking-widest`}
          placeholder="1HGBH41JXMN109186"
          maxLength={17}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Mileage (km)" error={errors.mileage}>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
            className={inputClass(errors.mileage)}
            placeholder="15000"
          />
        </Field>
        <Field label="Photo URL (optional)">
          <input
            type="text"
            value={formData.imageUrl || ""}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className={inputClass(false)}
            placeholder="https://…"
          />
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-10 rounded-xl bg-[#1C52AF] text-sm font-semibold text-white hover:bg-[#173f8a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#1C52AF]/25 hover:shadow-xl hover:shadow-[#1C52AF]/30"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : vehicle ? (
            "Update vehicle"
          ) : (
            "Add vehicle"
          )}
        </button>
      </div>
    </form>
  );
};

// ─── PLATE CHIP ───────────────────────────────────────────────────────────────
const PlateChip = ({ plate }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-gray-300/80 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 text-xs font-mono font-bold tracking-widest shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-gray-300">
    {plate}
  </span>
);

// ─── VEHICLE TYPE DETECTION ───────────────────────────────────────────────────
const detectVehicleType = (vehicle) => {
  const text = `${vehicle.brand || ""} ${vehicle.model || ""} ${vehicle.type || ""}`.toLowerCase();
  if (/\b(van|transit|sprinter|crafter|express|caravan|cargo)\b/.test(text)) return "van";
  if (/\b(truck|pickup|f-?150|silverado|ranger|hilux|tacoma|colorado|ram\s?\d*|frontier)\b/.test(text)) return "truck";
  if (/\b(suv|x[1-7]|rav4|tahoe|explorer|highlander|cr-?v|pilot|4runner|escalade|suburban|land\s?cruiser|range\s?rover|q[3-8]|gl[ecs]|xc\d0|santa\s?fe|traverse|pathfinder)\b/.test(text)) return "suv";
  return "sedan";
};

// ─── BLUEPRINT WHEEL ──────────────────────────────────────────────────────────
const Wheel = ({ cx, cy, r = 15 }) => (
  <g stroke="currentColor" fill="none">
    <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.05)" strokeWidth="2" />
    <circle cx={cx} cy={cy} r={r * 0.38} strokeWidth="1.4" />
    <line x1={cx - r * 0.65} y1={cy} x2={cx + r * 0.65} y2={cy} strokeWidth="1" opacity="0.5" />
    <line x1={cx} y1={cy - r * 0.65} x2={cx} y2={cy + r * 0.65} strokeWidth="1" opacity="0.5" />
  </g>
);

// ─── BLUEPRINT VEHICLE SCHEMATICS (side elevation line art) ──────────────────
const VehicleSchematic = ({ type }) => {
  switch (type) {
    case "suv":
      return (
        <g stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M18 92 L18 80 Q18 70 27 68 L44 48 Q50 36 64 36 L176 36 Q190 36 196 48 L213 68 Q222 70 222 80 L222 92 Z"
            fill="rgba(255,255,255,0.07)"
          />
          <line x1="120" y1="36" x2="118" y2="68" strokeWidth="1.3" opacity="0.55" />
          <line x1="60" y1="49" x2="196" y2="49" strokeWidth="1" opacity="0.35" />
          <Wheel cx={66} cy={94} r={17} />
          <Wheel cx={176} cy={94} r={17} />
        </g>
      );
    case "van":
      return (
        <g stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M26 92 L26 46 Q26 34 40 34 L204 34 Q216 34 216 46 L216 92 Z"
            fill="rgba(255,255,255,0.07)"
          />
          <line x1="66" y1="34" x2="66" y2="92" strokeWidth="1.3" opacity="0.45" />
          <line x1="40" y1="55" x2="66" y2="55" strokeWidth="1" opacity="0.35" />
          <Wheel cx={64} cy={94} r={16} />
          <Wheel cx={178} cy={94} r={16} />
        </g>
      );
    case "truck":
      return (
        <g stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M22 92 L22 70 Q22 60 32 58 L52 40 Q58 34 68 34 L104 34 L104 92 Z"
            fill="rgba(255,255,255,0.07)"
          />
          <path d="M104 58 L212 58 L212 92 L104 92" fill="rgba(255,255,255,0.05)" />
          <line x1="60" y1="46" x2="60" y2="58" strokeWidth="1" opacity="0.4" />
          <Wheel cx={60} cy={94} r={15} />
          <Wheel cx={182} cy={94} r={15} />
        </g>
      );
    default:
      return (
        <g stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M18 92 L18 82 Q18 74 26 72 L52 64 L78 40 Q86 32 98 32 L142 32 Q154 32 162 40 L188 64 L214 72 Q222 74 222 82 L222 92 Z"
            fill="rgba(255,255,255,0.07)"
          />
          <line x1="128" y1="38" x2="126" y2="72" strokeWidth="1.3" opacity="0.55" />
          <line x1="80" y1="49" x2="186" y2="49" strokeWidth="1" opacity="0.35" />
          <Wheel cx={68} cy={94} r={15} />
          <Wheel cx={172} cy={94} r={15} />
        </g>
      );
  }
};

// ─── VEHICLE HERO (photo, or a blueprint-style schematic placeholder) ────────
let heroIdCounter = 0;

const isUsableImageUrl = (value) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (["null", "undefined", "n/a", "na", "-"].includes(trimmed.toLowerCase())) return false;
  // Must actually look like a URL (http(s):// or a root-relative /path), not arbitrary text.
  return /^(https?:\/\/|\/)/i.test(trimmed);
};

const VehicleHero = ({ vehicle, status }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const hasOwnImage = isUsableImageUrl(vehicle.imageUrl) && !imgFailed;
  const src = hasOwnImage ? vehicle.imageUrl : DEFAULT_CAR_IMAGE;

  return (
    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
      {fallbackFailed && !hasOwnImage ? (
        // Default image file is missing – plain background instead of a broken image
        <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
      ) : (
        <>
          <img
            src={src}
            alt={`${vehicle.brand} ${vehicle.model}`}
            onError={() => (hasOwnImage ? setImgFailed(true) : setFallbackFailed(true))}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </>
      )}
      <span
        className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        {status.label}
      </span>
    </div>
  );
};

// ─── VEHICLE CARD ─────────────────────────────────────────────────────────────
const VehicleCard = ({ vehicle, onEdit, onDelete, onViewHistory, onViewDetails }) => {
  const status = getStatus(vehicle.status);

  return (
    <div className="group relative bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden dark:bg-gray-900 dark:border-gray-800 dark:hover:shadow-black/20 dark:hover:border-gray-700">
      <VehicleHero vehicle={vehicle} status={status} />

      <div className="p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate leading-tight">
            {vehicle.brand} {vehicle.model}
          </h3>
          <PlateChip plate={vehicle.plateNumber} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
          {vehicle.year} · {vehicle.color}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
              Mileage
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {vehicle.mileage?.toLocaleString()} <span className="text-[10px] font-medium text-gray-400">km</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
              Added on
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {new Date(vehicle.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewDetails(vehicle)}
            className="h-9 px-4 rounded-lg text-xs font-bold text-white bg-[#1C52AF] hover:bg-[#173f8a] transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-[#1C52AF]/20"
          >
            Details
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewHistory(vehicle)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#1C52AF] dark:hover:bg-gray-800 dark:hover:text-[#1C52AF] transition-all duration-200"
              title="Service history"
            >
              <FiClock className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onEdit(vehicle)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-all duration-200"
              title="Edit"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200"
              title="Delete"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── VEHICLE DETAIL ───────────────────────────────────────────────────────────
const VehicleDetail = ({ vehicle, onEdit, onDelete, onViewHistory }) => {
  if (!vehicle) return null;
  const status = getStatus(vehicle.status);

  const rows = [
    { label: "Plate number", value: vehicle.plateNumber, icon: <FiHash className="w-4 h-4" />, mono: true },
    { label: "Color", value: vehicle.color, icon: <FiDroplet className="w-4 h-4" /> },
    { label: "VIN", value: vehicle.vin, icon: <FiHash className="w-4 h-4" />, mono: true },
    { label: "Mileage", value: `${vehicle.mileage?.toLocaleString()} km`, icon: <FiActivity className="w-4 h-4" /> },
    { label: "Engine", value: vehicle.engine || "Not specified", icon: <FiSettings className="w-4 h-4" /> },
    {
      label: "Last service",
      value: vehicle.lastServiceMileage ? `${vehicle.lastServiceMileage.toLocaleString()} km` : "Not serviced yet",
      icon: <FiClock className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden -mt-1">
        <VehicleHero vehicle={vehicle} status={status} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {vehicle.brand} {vehicle.model}
        </h2>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {vehicle.year}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold ${status.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((item, i) => (
          <div key={i} className="rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-900/60 px-4 py-3 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-200">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 mb-1.5">
              {item.icon}
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </div>
            <p className={`text-sm font-bold text-gray-800 dark:text-gray-200 ${item.mono ? "font-mono tracking-wider" : ""}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onViewHistory(vehicle)}
          className="flex-1 h-10 rounded-xl bg-[#1C52AF] text-sm font-bold text-white hover:bg-[#173f8a] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#1C52AF]/25 hover:shadow-xl hover:shadow-[#1C52AF]/30"
        >
          <FiClock className="w-4 h-4" /> Service history
        </button>
        <button
          onClick={() => onEdit(vehicle)}
          className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Edit"
        >
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(vehicle)}
          className="w-10 h-10 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center justify-center dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
          title="Delete"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ─── SERVICE HISTORY ──────────────────────────────────────────────────────────
const ServiceHistory = ({ vehicle, history }) => {
  const historyList = Array.isArray(history) ? history : [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C52AF]/15 to-[#1C52AF]/5 text-[#1C52AF] dark:from-[#1C52AF]/25 dark:to-[#1C52AF]/10">
          <FiClock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Service history</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {vehicle.brand} {vehicle.model} · {vehicle.plateNumber}
          </p>
        </div>
      </div>

      {historyList.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-300 dark:text-gray-600 mb-4 shadow-sm">
            <FiClock className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">No service history yet</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">This vehicle hasn't been serviced yet.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {historyList.map((record, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1C52AF]/15 to-[#1C52AF]/5 text-[#1C52AF] dark:from-[#1C52AF]/25 dark:to-[#1C52AF]/10 shadow-sm">
                  <FiTool className="w-3.5 h-3.5" />
                </span>
                {i !== historyList.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 my-1" />}
              </div>
              <div className="flex-1 pb-5 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {record.serviceType || "General service"}
                  </h4>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5 font-medium">
                    {new Date(record.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {record.description || "No description provided"}
                </p>
                {record.mileage && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                    <FiActivity className="w-3 h-3" />
                    {record.mileage.toLocaleString()} km
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── DELETE CONFIRM ───────────────────────────────────────────────────────────
const DeleteConfirm = ({ vehicle, onConfirm, onCancel, isDeleting }) => (
  <div className="text-center py-2">
    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 text-red-500 dark:text-red-400 mx-auto mb-4 shadow-sm">
      <FiAlertTriangle className="w-6 h-6" />
    </div>
    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">Delete vehicle?</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-[260px] mx-auto leading-relaxed">
      This will permanently remove <span className="font-bold text-gray-800 dark:text-gray-200">{vehicle.brand} {vehicle.model}</span> and all its records. This cannot be undone.
    </p>
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isDeleting}
        className="flex-1 h-10 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30"
      >
        {isDeleting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Deleting…
          </>
        ) : (
          "Delete vehicle"
        )}
      </button>
    </div>
  </div>
);

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
const EmptyState = ({ onAdd, isFiltered }) => (
  <div className="flex flex-col items-center text-center py-20 px-4">
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-300 dark:text-gray-600 mb-5 shadow-sm">
      {isFiltered ? <FiInbox className="w-7 h-7" /> : <FiTruck className="w-7 h-7" />}
    </div>
    {isFiltered ? (
      <>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">No matches found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Try a different brand, model, plate, or VIN.</p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No vehicles yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs leading-relaxed">
          Add your first vehicle to start booking services and tracking maintenance history.
        </p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#1C52AF] text-sm font-bold text-white hover:bg-[#173f8a] transition-all duration-200 shadow-lg shadow-[#1C52AF]/25 hover:shadow-xl hover:shadow-[#1C52AF]/30 active:scale-[0.98]"
        >
          <FiPlus className="w-4 h-4" /> Add your first vehicle
        </button>
      </>
    )}
  </div>
);

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden animate-pulse dark:bg-gray-900 dark:border-gray-800">
    <div className="h-44 bg-gray-200 dark:bg-gray-800" />
    <div className="p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2" />
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/3 mb-5" />
      <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-24" />
      </div>
      <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg" />
    </div>
  </div>
);

// ─── STAT TILE ────────────────────────────────────────────────────────────────
const StatTile = ({ icon, iconClass, label, value }) => (
  <div className="flex items-center gap-4 bg-white border border-gray-200/60 rounded-2xl px-5 py-4 dark:bg-gray-900 dark:border-gray-800">
    <div className={`flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${iconClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">{value}</p>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState({ type: null, vehicle: null });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/vehicles");
      const data = Array.isArray(res.data) ? res.data : res.data?.data || res.data?.vehicles || [];
      setVehicles(data);
    } catch (err) {
      showToast("Failed to load vehicles", "error");
      console.error("Fetch vehicles error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const filteredVehicles = vehicles.filter((v) =>
    `${v.brand} ${v.model} ${v.plateNumber} ${v.vin}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Stats ──────────────────────────────────────────────────────────────
  const totalFleet = vehicles.length;
  const activeCount = vehicles.filter((v) => v.status?.toLowerCase() === "active").length;
  const maintenanceCount = vehicles.filter((v) => v.status?.toLowerCase() === "maintenance").length;
  const alertCount = vehicles.filter((v) => v.alert || v.hasAlert).length;

  const handleCreate = async (data) => {
    try {
      setSubmitting(true);
      await api.post("/vehicles", data);
      showToast("Vehicle added successfully");
      setModal({ type: null, vehicle: null });
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to add vehicle", "error");
      console.error("Create vehicle error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setSubmitting(true);
      const id = modal.vehicle.id;
      try {
        await api.patch(`/vehicles/${id}`, data);
      } catch (patchErr) {
        if (patchErr.response?.status === 404 || patchErr.response?.status === 405) {
          await api.put(`/vehicles/${id}`, data);
        } else {
          throw patchErr;
        }
      }
      showToast("Vehicle updated successfully");
      setModal({ type: null, vehicle: null });
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update vehicle", "error");
      console.error("Update vehicle error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeletingId(modal.vehicle.id);
      await api.delete(`/vehicles/${modal.vehicle.id}`);
      showToast("Vehicle deleted successfully");
      setModal({ type: null, vehicle: null });
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete vehicle", "error");
      console.error("Delete vehicle error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewHistory = async (vehicle) => {
    setModal({ type: "history", vehicle });
    setHistory([]);
    try {
      setHistoryLoading(true);
      const res = await api.get(`/vehicles/${vehicle.id}/history`);

      let historyData = [];
      if (Array.isArray(res.data)) {
        historyData = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        historyData = res.data.data;
      } else if (res.data?.history && Array.isArray(res.data.history)) {
        historyData = res.data.history;
      } else if (res.data?.records && Array.isArray(res.data.records)) {
        historyData = res.data.records;
      } else if (typeof res.data === "object" && res.data !== null) {
        historyData = [res.data];
      }

      setHistory(historyData);
    } catch (err) {
      showToast("Failed to load service history", "error");
      console.error("History fetch error:", err);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const openAdd = () => setModal({ type: "add", vehicle: null });
  const openEdit = (vehicle) => setModal({ type: "edit", vehicle });
  const openDelete = (vehicle) => setModal({ type: "delete", vehicle });
  const openDetails = (vehicle) => setModal({ type: "details", vehicle });
  const closeModal = () => setModal({ type: null, vehicle: null });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header row: title + search + add */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              My Vehicles
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Overview of your active fleet and maintenance status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72 group">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#1C52AF] transition-colors duration-200 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model or plate…"
                className="w-full h-11 pl-10 pr-8 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400
                  focus:border-[#1C52AF]/40 focus:ring-4 focus:ring-[#1C52AF]/10 outline-none transition-all duration-200
                  dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label="Clear search"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#1C52AF] text-sm font-bold text-white hover:bg-[#173f8a] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-[#1C52AF]/25 hover:shadow-xl hover:shadow-[#1C52AF]/30 flex-shrink-0 whitespace-nowrap"
            >
              <FiPlus className="w-4 h-4" /> Add Vehicle
            </button>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatTile
            icon={<FiTruck className="w-5 h-5" />}
            iconClass="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            label="Total Fleet"
            value={totalFleet}
          />
          <StatTile
            icon={<FiCheckCircle className="w-5 h-5" />}
            iconClass="bg-blue-50 text-[#1C52AF] dark:bg-blue-900/20"
            label="Active"
            value={activeCount}
          />
          <StatTile
            icon={<FiTool className="w-5 h-5" />}
            iconClass="bg-orange-50 text-orange-500 dark:bg-orange-900/20"
            label="Maintenance"
            value={maintenanceCount}
          />
          <StatTile
            icon={<FiAlertTriangle className="w-5 h-5" />}
            iconClass="bg-red-50 text-red-500 dark:bg-red-900/20"
            label="Alerts"
            value={alertCount}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <EmptyState onAdd={openAdd} isFiltered={vehicles.length > 0} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={openEdit}
                onDelete={openDelete}
                onViewHistory={handleViewHistory}
                onViewDetails={openDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        onClose={closeModal}
        title={modal.type === "edit" ? "Edit vehicle" : "Add new vehicle"}
        subtitle={modal.type === "edit" ? "Update this vehicle's details" : "Enter the vehicle's details below"}
      >
        <VehicleForm
          vehicle={modal.vehicle}
          onSubmit={modal.type === "edit" ? handleUpdate : handleCreate}
          onCancel={closeModal}
          isSubmitting={submitting}
        />
      </Modal>

      {/* Details Modal */}
      <Modal isOpen={modal.type === "details"} onClose={closeModal} title="Vehicle details" maxWidth="max-w-xl">
        <VehicleDetail vehicle={modal.vehicle} onEdit={openEdit} onDelete={openDelete} onViewHistory={handleViewHistory} />
      </Modal>

      {/* History Modal */}
      <Modal isOpen={modal.type === "history"} onClose={closeModal} title="Service history" maxWidth="max-w-md">
        {historyLoading ? (
          <div className="flex items-center justify-center py-12">
            <span className="w-6 h-6 border-2 border-gray-200 border-t-[#1C52AF] rounded-full animate-spin" />
          </div>
        ) : (
          <ServiceHistory vehicle={modal.vehicle} history={history} />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={modal.type === "delete"} onClose={closeModal} title="Confirm deletion" maxWidth="max-w-sm">
        <DeleteConfirm vehicle={modal.vehicle} onConfirm={handleDelete} onCancel={closeModal} isDeleting={!!deletingId} />
      </Modal>
    </div>
  );
};

export default VehiclesPage;