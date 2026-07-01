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
      <div className="bg-white border-b border-gray-200/80 dark:bg-gray-900 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-[18px] font-bold text-gray-900 dark:text-gray-100">My Vehicles</h1>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">
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








// import React, { useState, useEffect, useCallback } from "react";
// import api from "../../api/axios";

// const Icons = {
//   Car: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
//   ),
//   Plus: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
//   ),
//   Search: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
//   ),
//   Edit: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
//   ),
//   Trash: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
//   ),
//   History: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>
//   ),
//   X: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//   ),
//   ChevronRight: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
//   ),
//   Gauge: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
//   ),
//   Calendar: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
//   ),
//   AlertTriangle: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
//   ),
//   Check: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
//   ),
//   Loader: () => (
//     <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
//   ),
//   Palette: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.01 17.461 2 12 2z"/></svg>
//   ),
//   Hash: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
//   ),
// };

// // --- Toast Notification ---
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bg = type === "success" ? "bg-emerald-500" : type === "error" ? "bg-red-500" : "bg-blue-500";

//   return (
//     <div className={`fixed top-4 right-4 z-[60] ${bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2`}>
//       {type === "success" ? <Icons.Check /> : <Icons.AlertTriangle />}
//       <span className="text-sm font-medium">{message}</span>
//     </div>
//   );
// };

// // --- Modal Component ---
// const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
//       <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200`} onClick={e => e.stopPropagation()}>
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
//             <Icons.X />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// // --- Vehicle Form ---
// const VehicleForm = ({ vehicle, onSubmit, onCancel, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     brand: "",
//     model: "",
//     year: new Date().getFullYear(),
//     plateNumber: "",
//     color: "",
//     vin: "",
//     mileage: 0,
//     ...vehicle,
//   });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.brand.trim()) newErrors.brand = "Brand is required";
//     if (!formData.model.trim()) newErrors.model = "Model is required";
//     if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) newErrors.year = "Invalid year";
//     if (!formData.plateNumber.trim()) newErrors.plateNumber = "Plate number is required";
//     if (!formData.color.trim()) newErrors.color = "Color is required";
//     if (!formData.vin.trim()) newErrors.vin = "VIN is required";
//     if (formData.vin.length !== 17) newErrors.vin = "VIN must be 17 characters";
//     if (formData.mileage < 0) newErrors.mileage = "Mileage cannot be negative";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) onSubmit(formData);
//   };

//   const inputClass = (field) =>
//     `w-full px-4 py-2.5 rounded-xl border ${errors[field] ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-blue-100"} focus:border-blue-500 focus:ring-4 outline-none transition-all text-sm bg-gray-50 focus:bg-white`;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
//           <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className={inputClass("brand")} placeholder="e.g. Toyota" />
//           {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
//           <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className={inputClass("model")} placeholder="e.g. Camry" />
//           {errors.model && <p className="text-xs text-red-500 mt-1">{errors.model}</p>}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
//           <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value) || ""})} className={inputClass("year")} />
//           {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number *</label>
//           <input type="text" value={formData.plateNumber} onChange={e => setFormData({...formData, plateNumber: e.target.value.toUpperCase()})} className={inputClass("plateNumber")} placeholder="ABC-1234" />
//           {errors.plateNumber && <p className="text-xs text-red-500 mt-1">{errors.plateNumber}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
//           <input type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className={inputClass("color")} placeholder="e.g. Silver" />
//           {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color}</p>}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">VIN (17 chars) *</label>
//         <input type="text" value={formData.vin} onChange={e => setFormData({...formData, vin: e.target.value.toUpperCase().slice(0, 17)})} className={inputClass("vin")} placeholder="1HGBH41JXMN109186" maxLength={17} />
//         {errors.vin && <p className="text-xs text-red-500 mt-1">{errors.vin}</p>}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km) *</label>
//         <input type="number" value={formData.mileage} onChange={e => setFormData({...formData, mileage: parseInt(e.target.value) || 0})} className={inputClass("mileage")} placeholder="15000" />
//         {errors.mileage && <p className="text-xs text-red-500 mt-1">{errors.mileage}</p>}
//       </div>

//       <div className="flex gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
//         <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
//           {isSubmitting ? <><Icons.Loader /> Saving...</> : vehicle ? "Update Vehicle" : "Add Vehicle"}
//         </button>
//       </div>
//     </form>
//   );
// };

// // --- Vehicle Card ---
// const VehicleCard = ({ vehicle, onEdit, onDelete, onViewHistory, onViewDetails }) => {
//   const brandColors = {
//     Toyota: "bg-red-50 text-red-700",
//     Tesla: "bg-slate-100 text-slate-700",
//     Honda: "bg-blue-50 text-blue-700",
//     BMW: "bg-blue-50 text-blue-800",
//     Mercedes: "bg-gray-100 text-gray-800",
//     Ford: "bg-blue-50 text-blue-700",
//   };
//   const brandBadge = brandColors[vehicle.brand] || "bg-gray-50 text-gray-700";

//   return (
//     <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden">
//       <div className="p-5">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
//               <Icons.Car />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 text-lg leading-tight">{vehicle.brand} {vehicle.model}</h3>
//               <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium mt-1 ${brandBadge}`}>
//                 {vehicle.year}
//               </span>
//             </div>
//           </div>
//           <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${vehicle.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
//             {vehicle.status}
//           </span>
//         </div>

//         <div className="space-y-2.5 mb-5">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Icons.Hash />
//             <span className="font-mono text-gray-800">{vehicle.plateNumber}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Icons.Palette />
//             <span>{vehicle.color}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Icons.Gauge />
//             <span>{vehicle.mileage?.toLocaleString()} km</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Icons.Calendar />
//             <span>Added {new Date(vehicle.createdAt).toLocaleDateString()}</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
//           <button onClick={() => onViewDetails(vehicle)} className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
//             Details <Icons.ChevronRight />
//           </button>
//           <button onClick={() => onViewHistory(vehicle)} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" title="Service History">
//             <Icons.History />
//           </button>
//           <button onClick={() => onEdit(vehicle)} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" title="Edit">
//             <Icons.Edit />
//           </button>
//           <button onClick={() => onDelete(vehicle)} className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors" title="Delete">
//             <Icons.Trash />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Vehicle Detail View ---
// const VehicleDetail = ({ vehicle, onClose, onEdit, onDelete, onViewHistory }) => {
//   if (!vehicle) return null;
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
//           <Icons.Car />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">{vehicle.brand} {vehicle.model}</h2>
//           <div className="flex items-center gap-2 mt-1">
//             <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{vehicle.year}</span>
//             <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${vehicle.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
//               {vehicle.status}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {[
//           { label: "Plate Number", value: vehicle.plateNumber, icon: <Icons.Hash /> },
//           { label: "Color", value: vehicle.color, icon: <Icons.Palette /> },
//           { label: "VIN", value: vehicle.vin, icon: <Icons.Hash /> },
//           { label: "Mileage", value: `${vehicle.mileage?.toLocaleString()} km`, icon: <Icons.Gauge /> },
//           { label: "Engine", value: vehicle.engine || "Not specified", icon: <Icons.Car /> },
//           { label: "Last Service Mileage", value: vehicle.lastServiceMileage ? `${vehicle.lastServiceMileage.toLocaleString()} km` : "Not serviced yet", icon: <Icons.History /> },
//         ].map((item, i) => (
//           <div key={i} className="bg-gray-50 rounded-xl p-4">
//             <div className="flex items-center gap-2 text-gray-500 mb-1">
//               {item.icon}
//               <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
//             </div>
//             <p className="text-sm font-semibold text-gray-900">{item.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button onClick={() => onViewHistory(vehicle)} className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
//           <Icons.History /> Service History
//         </button>
//         <button onClick={() => onEdit(vehicle)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
//           <Icons.Edit />
//         </button>
//         <button onClick={() => onDelete(vehicle)} className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors">
//           <Icons.Trash />
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- Service History View ---
// const ServiceHistory = ({ vehicle, history, onClose }) => {
//   // Ensure history is always an array
//   const historyList = Array.isArray(history) ? history : [];
  
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
//           <Icons.History />
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">Service History</h3>
//           <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model} • {vehicle.plateNumber}</p>
//         </div>
//       </div>

//       {historyList.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
//             <Icons.History />
//           </div>
//           <h4 className="text-gray-900 font-medium mb-1">No service history yet</h4>
//           <p className="text-sm text-gray-500">This vehicle hasn't been serviced yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {historyList.map((record, i) => (
//             <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
//               <div className="flex flex-col items-center">
//                 <div className="w-3 h-3 rounded-full bg-blue-500" />
//                 {i !== historyList.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
//               </div>
//               <div className="flex-1 pb-2">
//                 <div className="flex items-start justify-between">
//                   <h4 className="font-medium text-gray-900">{record.serviceType || "General Service"}</h4>
//                   <span className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">{record.description || "No description provided"}</p>
//                 {record.mileage && <p className="text-xs text-gray-500 mt-1">At {record.mileage.toLocaleString()} km</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // --- Delete Confirmation ---
// const DeleteConfirm = ({ vehicle, onConfirm, onCancel, isDeleting }) => (
//   <div className="text-center">
//     <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-4">
//       <Icons.AlertTriangle />
//     </div>
//     <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Vehicle?</h3>
//     <p className="text-sm text-gray-500 mb-6">
//       Are you sure you want to delete <span className="font-medium text-gray-900">{vehicle.brand} {vehicle.model}</span>? This action cannot be undone.
//     </p>
//     <div className="flex gap-3">
//       <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
//       <button onClick={onConfirm} disabled={isDeleting} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
//         {isDeleting ? <><Icons.Loader /> Deleting...</> : "Delete Vehicle"}
//       </button>
//     </div>
//   </div>
// );

// // --- Empty State ---
// const EmptyState = ({ onAdd }) => (
//   <div className="text-center py-16 px-4">
//     <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
//       <Icons.Car />
//     </div>
//     <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles yet</h3>
//     <p className="text-gray-500 mb-8 max-w-sm mx-auto">Add your first vehicle to start booking services and tracking maintenance history.</p>
//     <button onClick={onAdd} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
//       <Icons.Plus /> Add Your First Vehicle
//     </button>
//   </div>
// );

// // --- Skeleton Loader ---
// const SkeletonCard = () => (
//   <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
//     <div className="flex items-start gap-3 mb-4">
//       <div className="w-12 h-12 rounded-xl bg-gray-200" />
//       <div className="flex-1 space-y-2">
//         <div className="h-5 bg-gray-200 rounded w-3/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/4" />
//       </div>
//     </div>
//     <div className="space-y-2 mb-5">
//       <div className="h-4 bg-gray-200 rounded w-full" />
//       <div className="h-4 bg-gray-200 rounded w-2/3" />
//       <div className="h-4 bg-gray-200 rounded w-1/2" />
//     </div>
//     <div className="h-10 bg-gray-200 rounded-xl" />
//   </div>
// );

// // ==================== MAIN COMPONENT ====================

// const VehiclesPage = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [modal, setModal] = useState({ type: null, vehicle: null });
//   const [submitting, setSubmitting] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(false);

//   // Fetch vehicles
//   const fetchVehicles = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/vehicles");
//       // Handle both array and wrapped responses
//       const data = Array.isArray(res.data) ? res.data : res.data?.data || res.data?.vehicles || [];
//       setVehicles(data);
//     } catch (err) {
//       showToast("Failed to load vehicles", "error");
//       console.error("Fetch vehicles error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVehicles();
//   }, [fetchVehicles]);

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//   };

//   // Filter vehicles
//   const filteredVehicles = vehicles.filter(v =>
//     `${v.brand} ${v.model} ${v.plateNumber} ${v.vin}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Create vehicle
//   const handleCreate = async (data) => {
//     try {
//       setSubmitting(true);
//       await api.post("/vehicles", data);
//       showToast("Vehicle added successfully");
//       setModal({ type: null, vehicle: null });
//       fetchVehicles();
//     } catch (err) {
//       showToast(err.response?.data?.message || "Failed to add vehicle", "error");
//       console.error("Create vehicle error:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Update vehicle — tries PATCH first, falls back to PUT
//   const handleUpdate = async (data) => {
//     try {
//       setSubmitting(true);
//       const id = modal.vehicle.id;
      
//       // Try PATCH first, fall back to PUT if 404
//       try {
//         await api.patch(`/vehicles/${id}`, data);
//       } catch (patchErr) {
//         if (patchErr.response?.status === 404 || patchErr.response?.status === 405) {
//           // Backend might use PUT instead of PATCH
//           await api.put(`/vehicles/${id}`, data);
//         } else {
//           throw patchErr;
//         }
//       }
      
//       showToast("Vehicle updated successfully");
//       setModal({ type: null, vehicle: null });
//       fetchVehicles();
//     } catch (err) {
//       showToast(err.response?.data?.message || "Failed to update vehicle", "error");
//       console.error("Update vehicle error:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Delete vehicle
//   const handleDelete = async () => {
//     try {
//       setDeletingId(modal.vehicle.id);
//       await api.delete(`/vehicles/${modal.vehicle.id}`);
//       showToast("Vehicle deleted successfully");
//       setModal({ type: null, vehicle: null });
//       fetchVehicles();
//     } catch (err) {
//       showToast(err.response?.data?.message || "Failed to delete vehicle", "error");
//       console.error("Delete vehicle error:", err);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // Fetch history — handles various response shapes
//   const handleViewHistory = async (vehicle) => {
//     setModal({ type: "history", vehicle });
//     setHistory([]); // Reset before fetch
//     try {
//       setHistoryLoading(true);
//       const res = await api.get(`/vehicles/${vehicle.id}/history`);
//       console.log("History API response:", res.data); // Debug log
      
//       // Handle multiple possible response shapes
//       let historyData = [];
//       if (Array.isArray(res.data)) {
//         historyData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         historyData = res.data.data;
//       } else if (res.data?.history && Array.isArray(res.data.history)) {
//         historyData = res.data.history;
//       } else if (res.data?.records && Array.isArray(res.data.records)) {
//         historyData = res.data.records;
//       } else if (typeof res.data === 'object' && res.data !== null) {
//         // If it's an object but not an array, maybe it's a single record
//         historyData = [res.data];
//       }
      
//       setHistory(historyData);
//     } catch (err) {
//       showToast("Failed to load service history", "error");
//       console.error("History fetch error:", err);
//       setHistory([]);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const openAdd = () => setModal({ type: "add", vehicle: null });
//   const openEdit = (vehicle) => setModal({ type: "edit", vehicle });
//   const openDelete = (vehicle) => setModal({ type: "delete", vehicle });
//   const openDetails = (vehicle) => setModal({ type: "details", vehicle });
//   const closeModal = () => setModal({ type: null, vehicle: null });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Toast */}
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       {/* Header */}
//       <div className="sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My Vehicles</h1>
//               <p className="text-sm text-gray-500 mt-0.5">Manage your vehicles and track service history</p>
//             </div>
//             <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 active:scale-95">
//               <Icons.Plus /> Add Vehicle
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mt-4 relative max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//               <Icons.Search />
//             </div>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               placeholder="Search by brand, model, plate, or VIN..."
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
//           </div>
//         ) : filteredVehicles.length === 0 ? (
//           vehicles.length === 0 ? (
//             <EmptyState onAdd={openAdd} />
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-500">No vehicles match your search.</p>
//             </div>
//           )
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredVehicles.map(vehicle => (
//               <VehicleCard
//                 key={vehicle.id}
//                 vehicle={vehicle}
//                 onEdit={openEdit}
//                 onDelete={openDelete}
//                 onViewHistory={handleViewHistory}
//                 onViewDetails={openDetails}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       <Modal
//         isOpen={modal.type === "add" || modal.type === "edit"}
//         onClose={closeModal}
//         title={modal.type === "edit" ? "Edit Vehicle" : "Add New Vehicle"}
//       >
//         <VehicleForm
//           vehicle={modal.vehicle}
//           onSubmit={modal.type === "edit" ? handleUpdate : handleCreate}
//           onCancel={closeModal}
//           isSubmitting={submitting}
//         />
//       </Modal>

//       {/* Details Modal */}
//       <Modal
//         isOpen={modal.type === "details"}
//         onClose={closeModal}
//         title="Vehicle Details"
//         maxWidth="max-w-2xl"
//       >
//         <VehicleDetail
//           vehicle={modal.vehicle}
//           onClose={closeModal}
//           onEdit={openEdit}
//           onDelete={openDelete}
//           onViewHistory={handleViewHistory}
//         />
//       </Modal>

//       {/* History Modal */}
//       <Modal
//         isOpen={modal.type === "history"}
//         onClose={closeModal}
//         title="Service History"
//         maxWidth="max-w-lg"
//       >
//         {historyLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <Icons.Loader />
//           </div>
//         ) : (
//           <ServiceHistory vehicle={modal.vehicle} history={history} onClose={closeModal} />
//         )}
//       </Modal>

//       {/* Delete Modal */}
//       <Modal
//         isOpen={modal.type === "delete"}
//         onClose={closeModal}
//         title="Confirm Deletion"
//         maxWidth="max-w-sm"
//       >
//         <DeleteConfirm
//           vehicle={modal.vehicle}
//           onConfirm={handleDelete}
//           onCancel={closeModal}
//           isDeleting={!!deletingId}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default VehiclesPage;