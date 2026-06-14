import React, { useState, useEffect, useRef } from "react";
import {
  FaCar,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaHistory,
  FaTimes,
  FaGasPump,
  FaTachometerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaWrench,
} from "react-icons/fa";
import { MdDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const statusConfig = {
  active: {
    label: "Active",
    icon: FaCheckCircle,
    className: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  inactive: {
    label: "Inactive",
    icon: FaTimesCircle,
    className: "bg-gray-100 text-gray-500 border border-gray-200",
  },
};

const carColors = {
  Silver: "#C0C0C0",
  White: "#F5F5F5",
  Black: "#1a1a1a",
  Red: "#DC2626",
  Blue: "#2563EB",
  Gray: "#6B7280",
  Gold: "#D97706",
  Green: "#059669",
  Brown: "#92400E",
};

const COLOR_DOT = (color) => {
  const hex = carColors[color];
  if (!hex) return null;
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
      style={{ backgroundColor: hex }}
    />
  );
};

const EMPTY_FORM = {
  brand: "",
  model: "",
  year: "",
  plateNumber: "",
  color: "",
  vin: "",
  mileage: "",
  engine: "",
  status: "active",
};

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, children, wide }) => {
  const overlayRef = useRef();
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onMouseDown={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${
          wide ? "max-w-2xl" : "max-w-md"
        } max-h-[90vh] overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
const useToast = () => {
  const [toast, setToast] = useState(null);
  const show = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
};

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all animate-slide-up
        ${
          toast.type === "success"
            ? "bg-emerald-600 text-white"
            : toast.type === "error"
            ? "bg-red-600 text-white"
            : "bg-gray-800 text-white"
        }`}
    >
      {toast.type === "success" ? (
        <FaCheckCircle />
      ) : (
        <FaExclamationTriangle />
      )}
      {toast.message}
    </div>
  );
};

// ─── VEHICLE FORM MODAL ───────────────────────────────────────────────────────
const VehicleFormModal = ({ open, onClose, vehicle, onSaved }) => {
  const isEdit = !!vehicle;
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setErrors({});
      setForm(
        vehicle
          ? {
              brand: vehicle.brand || "",
              model: vehicle.model || "",
              year: vehicle.year || "",
              plateNumber: vehicle.plateNumber || "",
              color: vehicle.color || "",
              vin: vehicle.vin || "",
              mileage: vehicle.mileage || "",
              engine: vehicle.engine || "",
              status: vehicle.status || "active",
            }
          : EMPTY_FORM
      );
    }
  }, [open, vehicle]);

  const validate = () => {
    const e = {};
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.year) e.year = "Year is required";
    if (!form.plateNumber.trim()) e.plateNumber = "Plate number is required";
    if (!form.vin.trim()) e.vin = "VIN is required";
    if (!form.mileage && form.mileage !== 0) e.mileage = "Mileage is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        year: parseInt(form.year),
        mileage: parseInt(form.mileage),
        engine: form.engine || null,
        lastServiceMileage: null,
        imageUrl: null,
        documents: null,
      };
      if (isEdit) {
        await api.put(`/vehicles/${vehicle.id}`, payload);
      } else {
        await api.post("/vehicles", payload);
      }
      onSaved(isEdit ? "updated" : "created");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, id, type = "text", placeholder, half }) => (
    <div className={half ? "" : "col-span-2"}>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={form[id]}
        onChange={(e) => {
          setForm((f) => ({ ...f, [id]: e.target.value }));
          if (errors[id]) setErrors((er) => ({ ...er, [id]: null }));
        }}
        placeholder={placeholder}
        className={`w-full h-10 px-3.5 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition
          ${
            errors[id]
              ? "border-red-300 focus:ring-red-100"
              : "border-gray-200 focus:ring-blue-100 focus:border-blue-300"
          }`}
      />
      {errors[id] && (
        <p className="text-xs text-red-500 mt-1">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <FaCar className="text-[#1C52AF] text-base" />
          </div>
          <h2 className="text-base font-bold text-gray-800">
            {isEdit ? "Edit vehicle" : "Add new vehicle"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
        >
          <FaTimes />
        </button>
      </div>

      <div className="px-6 py-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Brand" id="brand" placeholder="e.g. Toyota" half />
          <Field label="Model" id="model" placeholder="e.g. Camry" half />
          <Field label="Year" id="year" type="number" placeholder="e.g. 2020" half />
          <Field label="Color" id="color" placeholder="e.g. Silver" half />
          <Field label="Plate number" id="plateNumber" placeholder="e.g. ABC-1234" half />
          <Field label="Mileage (km)" id="mileage" type="number" placeholder="e.g. 15000" half />
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              VIN
            </label>
            <input
              type="text"
              value={form.vin}
              onChange={(e) => {
                setForm((f) => ({ ...f, vin: e.target.value }));
                if (errors.vin) setErrors((er) => ({ ...er, vin: null }));
              }}
              placeholder="e.g. 1HGBH41JXMN109186"
              className={`w-full h-10 px-3.5 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition
                ${
                  errors.vin
                    ? "border-red-300 focus:ring-red-100"
                    : "border-gray-200 focus:ring-blue-100 focus:border-blue-300"
                }`}
            />
            {errors.vin && (
              <p className="text-xs text-red-500 mt-1">{errors.vin}</p>
            )}
          </div>
          <Field label="Engine (optional)" id="engine" placeholder="e.g. 2.5L V6" half />
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full h-10 px-3.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 text-sm font-semibold text-white bg-[#1C52AF] rounded-lg hover:bg-[#1540a0] transition disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isEdit ? (
            <FaEdit />
          ) : (
            <FaPlus />
          )}
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add vehicle"}
        </button>
      </div>
    </Modal>
  );
};

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
const DetailModal = ({ open, onClose, vehicle }) => {
  if (!vehicle) return null;
  const { label, className } = statusConfig[vehicle.status] || statusConfig.active;

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-none">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="text-[#1C52AF] text-sm" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{value || "—"}</p>
      </div>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800">Vehicle details</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* Hero */}
      <div className="mx-6 mt-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 flex items-center justify-center shadow-sm">
          <MdDirectionsCar className="text-[#1C52AF] text-4xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {vehicle.brand} {vehicle.model}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-sm text-gray-500">{vehicle.year}</span>
            {vehicle.color && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                · {COLOR_DOT(vehicle.color)} {vehicle.color}
              </span>
            )}
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}
            >
              {label}
            </span>
          </div>
          <p className="text-sm font-mono font-bold text-gray-700 mt-1.5 tracking-wider">
            {vehicle.plateNumber}
          </p>
        </div>
      </div>

      <div className="px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Technical
        </p>
        <InfoRow icon={FaIdCard} label="VIN" value={vehicle.vin} />
        <InfoRow icon={FaGasPump} label="Engine" value={vehicle.engine} />
        <InfoRow
          icon={FaTachometerAlt}
          label="Current mileage"
          value={`${vehicle.mileage?.toLocaleString()} km`}
        />
        <InfoRow
          icon={FaWrench}
          label="Last service mileage"
          value={
            vehicle.lastServiceMileage
              ? `${vehicle.lastServiceMileage.toLocaleString()} km`
              : null
          }
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mt-4 mb-2">
          Record
        </p>
        <InfoRow
          icon={FaCalendarAlt}
          label="Added on"
          value={new Date(vehicle.createdAt).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <InfoRow
          icon={FaCalendarAlt}
          label="Last updated"
          value={new Date(vehicle.updatedAt).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </div>
    </Modal>
  );
};

// ─── HISTORY MODAL ────────────────────────────────────────────────────────────
const HistoryModal = ({ open, onClose, vehicle }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && vehicle) {
      setLoading(true);
      api
        .get(`/vehicles/${vehicle.id}/history`)
        .then(({ data }) => setHistory(Array.isArray(data) ? data : []))
        .catch(() => setHistory([]))
        .finally(() => setLoading(false));
    }
  }, [open, vehicle]);

  if (!vehicle) return null;

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800">Service history</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {vehicle.brand} {vehicle.model} · {vehicle.plateNumber}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
        >
          <FaTimes />
        </button>
      </div>

      <div className="px-6 py-5 min-h-[200px]">
        {loading ? (
          <div className="flex flex-col items-center py-10 text-gray-400">
            <span className="w-8 h-8 border-2 border-blue-200 border-t-[#1C52AF] rounded-full animate-spin mb-3" />
            <p className="text-sm">Loading history…</p>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-gray-400">
            <FaHistory className="text-3xl mb-3 opacity-30" />
            <p className="text-sm font-medium">No service history found</p>
            <p className="text-xs mt-1">Service records will appear here</p>
          </div>
        ) : (
          <div className="relative pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
            {history.map((entry, i) => (
              <div key={entry.id || i} className="relative mb-5 last:mb-0">
                <span className="absolute -left-5 top-1.5 w-3 h-3 rounded-full bg-[#1C52AF] border-2 border-white shadow-sm" />
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {entry.serviceType || entry.type || "Service"}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString("en-NG")
                        : entry.createdAt
                        ? new Date(entry.createdAt).toLocaleDateString("en-NG")
                        : ""}
                    </span>
                  </div>
                  {entry.description && (
                    <p className="text-xs text-gray-500 mt-1">{entry.description}</p>
                  )}
                  {entry.mileage && (
                    <p className="text-xs text-[#1C52AF] font-medium mt-1.5">
                      <FaTachometerAlt className="inline mr-1" />
                      {entry.mileage.toLocaleString()} km
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

// ─── DELETE CONFIRM MODAL ─────────────────────────────────────────────────────
const DeleteModal = ({ open, onClose, vehicle, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/vehicles/${vehicle.id}`);
      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-6 py-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <FaTrash className="text-red-500 text-xl" />
        </div>
        <h2 className="text-base font-bold text-gray-800">Delete vehicle</h2>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700">
            {vehicle.brand} {vehicle.model}
          </span>{" "}
          ({vehicle.plateNumber})? This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── VEHICLE CARD ─────────────────────────────────────────────────────────────
const VehicleCard = ({ vehicle, onView, onEdit, onDelete, onHistory }) => {
  const { label, icon: StatusIcon, className } = statusConfig[vehicle.status] || statusConfig.active;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
      {/* Card image area */}
      <div className="relative h-36 rounded-t-2xl bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center overflow-hidden">
        <MdDirectionsCar className="text-8xl text-blue-100 group-hover:text-blue-200 transition-colors" />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}
          >
            <StatusIcon className="text-[10px]" />
            {label}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-bold tracking-widest text-gray-600 bg-white/90 border border-gray-200 rounded-md px-2.5 py-1 shadow-sm font-mono">
            {vehicle.plateNumber}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              {vehicle.brand} {vehicle.model}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{vehicle.year}</span>
              {vehicle.color && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  · {COLOR_DOT(vehicle.color)} {vehicle.color}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-3 py-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTachometerAlt className="text-[#1C52AF]" />
            {vehicle.mileage?.toLocaleString()} km
          </div>
          {vehicle.engine && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaGasPump className="text-[#1C52AF]" />
              {vehicle.engine}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onView(vehicle)}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <FaEye className="text-[10px]" /> View
          </button>
          <button
            onClick={() => onHistory(vehicle)}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <FaHistory className="text-[10px]" /> History
          </button>
          <button
            onClick={() => onEdit(vehicle)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-[#1C52AF] hover:border-blue-200 transition text-gray-500"
          >
            <FaEdit className="text-xs" />
          </button>
          <button
            onClick={() => onDelete(vehicle)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition text-gray-500"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const Vehicles = () => {
  const navigate = useNavigate();
  const { toast, show: showToast } = useToast();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [detailVehicle, setDetailVehicle] = useState(null);
  const [historyVehicle, setHistoryVehicle] = useState(null);
  const [deleteVehicle, setDeleteVehicle] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/vehicles");
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
      showToast("Failed to load vehicles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filtered = vehicles.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      v.brand?.toLowerCase().includes(q) ||
      v.model?.toLowerCase().includes(q) ||
      v.plateNumber?.toLowerCase().includes(q) ||
      v.color?.toLowerCase().includes(q);
    const matchFilter = filter === "all" || v.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "active").length,
    avgMileage: vehicles.length
      ? Math.round(vehicles.reduce((s, v) => s + (v.mileage || 0), 0) / vehicles.length)
      : 0,
    needsService: vehicles.filter(
      (v) => v.mileage - (v.lastServiceMileage || 0) > 10000
    ).length,
  };

  const openEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setShowForm(true);
  };

  const openAdd = () => {
    setEditVehicle(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <Toast toast={toast} />

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Vehicles</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and track all your registered vehicles.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1C52AF] rounded-xl hover:bg-[#1540a0] transition w-full sm:w-auto justify-center shadow-sm shadow-blue-200"
        >
          <FaPlus className="text-xs" />
          Add vehicle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total vehicles", value: stats.total, color: "text-blue-600", bg: "bg-blue-50", icon: FaCar },
          { label: "Active", value: stats.active, color: "text-emerald-600", bg: "bg-emerald-50", icon: FaCheckCircle },
          { label: "Avg mileage", value: `${stats.avgMileage.toLocaleString()} km`, color: "text-indigo-600", bg: "bg-indigo-50", icon: FaTachometerAlt },
          { label: "Need service", value: stats.needsService, color: "text-amber-600", bg: "bg-amber-50", icon: FaWrench },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`${color} text-base`} />
            </div>
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search brand, model, plate…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 h-10 text-sm font-medium rounded-xl transition capitalize ${
                filter === f
                  ? "bg-[#1C52AF] text-white shadow-sm shadow-blue-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center py-20 text-gray-400">
          <span className="w-10 h-10 border-2 border-blue-200 border-t-[#1C52AF] rounded-full animate-spin mb-4" />
          <p className="text-sm">Loading vehicles…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-gray-400">
          <FaCar className="text-5xl mb-4 opacity-20" />
          <p className="text-base font-semibold text-gray-500">No vehicles found</p>
          <p className="text-sm mt-1">
            {search || filter !== "all"
              ? "Try adjusting your search or filter."
              : "Add your first vehicle to get started."}
          </p>
          {!search && filter === "all" && (
            <button
              onClick={openAdd}
              className="mt-5 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1C52AF] rounded-xl hover:bg-[#1540a0] transition"
            >
              <FaPlus className="text-xs" /> Add vehicle
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onView={setDetailVehicle}
              onEdit={openEdit}
              onDelete={setDeleteVehicle}
              onHistory={setHistoryVehicle}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <VehicleFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        vehicle={editVehicle}
        onSaved={(action) => {
          showToast(
            action === "updated" ? "Vehicle updated successfully" : "Vehicle added successfully"
          );
          fetchVehicles();
        }}
      />

      <DetailModal
        open={!!detailVehicle}
        onClose={() => setDetailVehicle(null)}
        vehicle={detailVehicle}
      />

      <HistoryModal
        open={!!historyVehicle}
        onClose={() => setHistoryVehicle(null)}
        vehicle={historyVehicle}
      />

      <DeleteModal
        open={!!deleteVehicle}
        onClose={() => setDeleteVehicle(null)}
        vehicle={deleteVehicle}
        onDeleted={() => {
          showToast("Vehicle deleted", "error");
          fetchVehicles();
        }}
      />
    </div>
  );
};

export default Vehicles;
