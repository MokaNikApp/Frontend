import React, { useState, useEffect, useCallback } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiChevronRight,
  FiHash,
  FiDroplet,
  FiActivity,
  FiCalendar,
  FiAlertTriangle,
  FiCheck,
  FiTruck,
  FiTool,
  FiInbox,
} from "react-icons/fi";
import api from "../../api/axios";

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const statusConfig = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
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
      className={`fixed top-4 right-4 z-[70] ${styles} text-white pl-3 pr-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-200`}
    >
      {type === "success" ? <FiCheck className="w-4 h-4 flex-shrink-0" /> : <FiAlertTriangle className="w-4 h-4 flex-shrink-0" />}
      <span className="text-[13px] font-medium">{message}</span>
    </div>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`bg-white border border-gray-200/80 rounded-xl shadow-xl w-full ${maxWidth} max-h-[88vh] overflow-y-auto animate-in zoom-in-95 duration-150 dark:bg-gray-900 dark:border-gray-800`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            {subtitle && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
  </div>
);

const inputBase =
  "w-full h-9 px-3 text-[13px] rounded-lg border bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:ring-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-900";

const inputClass = (hasError) =>
  `${inputBase} ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-900"
      : "border-gray-200 focus:border-[#1C52AF]/50 focus:ring-[#1C52AF]/10 dark:border-gray-700 dark:focus:border-[#1C52AF]/50"
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            className={`${inputClass(errors.plateNumber)} font-mono`}
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
          className={`${inputClass(errors.vin)} font-mono`}
          placeholder="1HGBH41JXMN109186"
          maxLength={17}
        />
      </Field>

      <Field label="Mileage (km)" error={errors.mileage}>
        <input
          type="number"
          value={formData.mileage}
          onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
          className={inputClass(errors.mileage)}
          placeholder="15000"
        />
      </Field>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-9 rounded-lg border border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-9 rounded-lg bg-[#1C52AF] text-[13px] font-medium text-white hover:bg-[#173f8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
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
  <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-[11px] font-mono font-semibold tracking-wide dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
    {plate}
  </span>
);

// ─── VEHICLE CARD ─────────────────────────────────────────────────────────────
const VehicleCard = ({ vehicle, onEdit, onDelete, onViewHistory, onViewDetails }) => {
  const status = getStatus(vehicle.status);

  return (
    <div className="group bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200 overflow-hidden dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] dark:bg-[#1C52AF]/20 flex-shrink-0">
              <FiTruck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.brand} {vehicle.model}
              </h3>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{vehicle.year}</span>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${status.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <PlateChip plate={vehicle.plateNumber} />
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
            <FiDroplet className="w-3 h-3" />
            {vehicle.color}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 px-2.5 py-2">
            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 mb-0.5">
              <FiActivity className="w-3 h-3" />
              <span className="text-[9px] font-semibold uppercase tracking-wide">Mileage</span>
            </div>
            <p className="text-[12px] font-semibold text-gray-800 dark:text-gray-200">
              {vehicle.mileage?.toLocaleString()} km
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 px-2.5 py-2">
            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 mb-0.5">
              <FiCalendar className="w-3 h-3" />
              <span className="text-[9px] font-semibold uppercase tracking-wide">Added</span>
            </div>
            <p className="text-[12px] font-semibold text-gray-800 dark:text-gray-200">
              {new Date(vehicle.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onViewDetails(vehicle)}
            className="flex-1 h-8 rounded-lg text-[12px] font-medium text-[#1C52AF] hover:bg-[#1C52AF]/5 dark:hover:bg-[#1C52AF]/10 transition-colors flex items-center justify-center gap-1"
          >
            Details <FiChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => onViewHistory(vehicle)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
            title="Service history"
          >
            <FiClock className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onEdit(vehicle)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
            title="Edit"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(vehicle)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
            title="Delete"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
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
    { label: "Plate number", value: vehicle.plateNumber, icon: <FiHash className="w-3.5 h-3.5" />, mono: true },
    { label: "Color", value: vehicle.color, icon: <FiDroplet className="w-3.5 h-3.5" /> },
    { label: "VIN", value: vehicle.vin, icon: <FiHash className="w-3.5 h-3.5" />, mono: true },
    { label: "Mileage", value: `${vehicle.mileage?.toLocaleString()} km`, icon: <FiActivity className="w-3.5 h-3.5" /> },
    { label: "Engine", value: vehicle.engine || "Not specified", icon: <FiTruck className="w-3.5 h-3.5" /> },
    {
      label: "Last service mileage",
      value: vehicle.lastServiceMileage ? `${vehicle.lastServiceMileage.toLocaleString()} km` : "Not serviced yet",
      icon: <FiClock className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1C52AF]/10 text-[#1C52AF] dark:bg-[#1C52AF]/20 flex-shrink-0">
          <FiTruck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
            {vehicle.brand} {vehicle.model}
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {vehicle.year}
            </span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {rows.map((item, i) => (
          <div key={i} className="rounded-lg bg-gray-50 dark:bg-gray-800/60 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1">
              {item.icon}
              <span className="text-[9px] font-semibold uppercase tracking-wide">{item.label}</span>
            </div>
            <p className={`text-[13px] font-semibold text-gray-800 dark:text-gray-200 ${item.mono ? "font-mono" : ""}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onViewHistory(vehicle)}
          className="flex-1 h-9 rounded-lg bg-[#1C52AF] text-[13px] font-medium text-white hover:bg-[#173f8a] transition-colors flex items-center justify-center gap-2"
        >
          <FiClock className="w-3.5 h-3.5" /> Service history
        </button>
        <button
          onClick={() => onEdit(vehicle)}
          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Edit"
        >
          <FiEdit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(vehicle)}
          className="w-9 h-9 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
          title="Delete"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
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
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1C52AF]/10 text-[#1C52AF] dark:bg-[#1C52AF]/20">
          <FiClock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">Service history</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {vehicle.brand} {vehicle.model} · {vehicle.plateNumber}
          </p>
        </div>
      </div>

      {historyList.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 mb-3">
            <FiClock className="w-5 h-5" />
          </div>
          <h4 className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 mb-0.5">No service history yet</h4>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">This vehicle hasn't been serviced yet.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {historyList.map((record, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C52AF]/10 text-[#1C52AF] dark:bg-[#1C52AF]/20">
                  <FiTool className="w-3 h-3" />
                </span>
                {i !== historyList.length - 1 && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-800 my-1" />}
              </div>
              <div className="flex-1 pb-4 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
                    {record.serviceType || "General service"}
                  </h4>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {record.description || "No description provided"}
                </p>
                {record.mileage && (
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">At {record.mileage.toLocaleString()} km</p>
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
  <div className="text-center">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 mx-auto mb-3">
      <FiAlertTriangle className="w-5 h-5" />
    </div>
    <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5">Delete vehicle?</h3>
    <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-5">
      This will permanently remove <span className="font-medium text-gray-800 dark:text-gray-200">{vehicle.brand} {vehicle.model}</span>{" "}
      and its records. This can't be undone.
    </p>
    <div className="flex gap-2">
      <button
        onClick={onCancel}
        className="flex-1 h-9 rounded-lg border border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isDeleting}
        className="flex-1 h-9 rounded-lg bg-red-600 text-[13px] font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
      >
        {isDeleting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
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
  <div className="flex flex-col items-center text-center py-16 px-4">
    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 mb-4">
      {isFiltered ? <FiInbox className="w-6 h-6" /> : <FiTruck className="w-6 h-6" />}
    </div>
    {isFiltered ? (
      <>
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-1">No matches</h3>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Try a different brand, model, plate, or VIN.</p>
      </>
    ) : (
      <>
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5">No vehicles yet</h3>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
          Add your first vehicle to start booking services and tracking maintenance history.
        </p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[#1C52AF] text-[13px] font-medium text-white hover:bg-[#173f8a] transition-colors shadow-sm"
        >
          <FiPlus className="w-3.5 h-3.5" /> Add your first vehicle
        </button>
      </>
    )}
  </div>
);

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200/80 rounded-xl p-4 animate-pulse dark:bg-gray-900 dark:border-gray-800">
    <div className="flex items-center gap-2.5 mb-3.5">
      <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
        <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
      </div>
    </div>
    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3" />
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg" />
    </div>
    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg" />
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className=" border-gray-200/80 dark:bg-gray-900 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-[18px] sm:text-2xl font-bold text-gray-900 dark:text-gray-100">My Vehicles</h1>
              <p className="text-[12px] sm:text-[15px] text-gray-500 dark:text-gray-400 mt-0.5">
                Manage your vehicles and track service history
              </p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[#1C52AF] text-[13px] font-medium text-white hover:bg-[#173f8a] active:scale-[0.98] transition-all shadow-sm flex-shrink-0"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add vehicle
            </button>
          </div>

          <div className="relative max-w-xs mt-4 group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#1C52AF] transition-colors pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand, model, plate, VIN…"
              className="w-full h-8 pl-8 pr-8 text-[13px] rounded-lg border border-transparent bg-gray-100 text-gray-900 placeholder:text-gray-400
                focus:bg-white focus:border-[#1C52AF]/40 focus:ring-2 focus:ring-[#1C52AF]/10 outline-none transition-all
                dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-900 dark:focus:border-[#1C52AF]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded p-0.5"
                aria-label="Clear search"
              >
                <FiX className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <EmptyState onAdd={openAdd} isFiltered={vehicles.length > 0} />
        ) : (
          <>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </>
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




