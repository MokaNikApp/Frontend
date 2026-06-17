












import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const COLOR_MAP = {
  Silver: "#C0C0C0",
  White: "#E5E5E5",
  Black: "#1a1a1a",
  Red: "#DC2626",
  Blue: "#2563EB",
  Gray: "#6B7280",
  Gold: "#D97706",
  Green: "#059669",
  Brown: "#92400E",
};

const COLORS = Object.keys(COLOR_MAP);

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

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function ColorDot({ color }) {
  const hex = COLOR_MAP[color];
  if (!hex) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: hex,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
      }}
    />
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const show = (message, type = "success") => {
    clearTimeout(timerRef.current);
    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 3500);
  };
  return { toast, show };
}

function Toast({ toast }) {
  if (!toast) return null;
  const bg = toast.type === "success" ? "#166534" : toast.type === "error" ? "#991b1b" : "#1e3a5f";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "10px 18px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        animation: "fadeUp 0.2s ease",
        maxWidth: "calc(100vw - 48px)",
        wordBreak: "break-word",
      }}
    >
      {toast.message}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, children, maxWidth = 560 }) {
  const overlayRef = useRef();
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          width: "100%",
          maxWidth,
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────────
function Field({ label, id, type = "text", placeholder, value, onChange, error, optional }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          color: "#6b7280",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
        {optional && (
          <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 4, color: "#9ca3af" }}>
            (optional)
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          width: "100%",
          height: 40,
          padding: "0 12px",
          fontSize: 13,
          color: "#111827",
          background: error ? "#fff8f8" : "#f9fafb",
          border: `1px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
          borderRadius: 8,
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
          boxSizing: "border-box",
          fontFamily: id === "vin" ? "ui-monospace, monospace" : "inherit",
          letterSpacing: id === "vin" ? "0.04em" : "normal",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#1C52AF";
          e.target.style.boxShadow = "0 0 0 3px rgba(28,82,175,0.1)";
          e.target.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#fca5a5" : "#e5e7eb";
          e.target.style.boxShadow = "none";
          e.target.style.background = error ? "#fff8f8" : "#f9fafb";
        }}
      />
      {error && (
        <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4, marginBottom: 0 }}>{error}</p>
      )}
    </div>
  );
}

// ─── VEHICLE FORM MODAL ───────────────────────────────────────────────────────
function VehicleFormModal({ open, onClose, vehicle, onSaved }) {
  const isEdit = !!vehicle;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setErrors({});
      setForm(
        vehicle
          ? {
              brand: vehicle.brand || "",
              model: vehicle.model || "",
              year: String(vehicle.year || ""),
              plateNumber: vehicle.plateNumber || "",
              color: vehicle.color || "",
              vin: vehicle.vin || "",
              mileage: String(vehicle.mileage || ""),
              engine: vehicle.engine || "",
              status: vehicle.status || "active",
            }
          : { ...EMPTY_FORM }
      );
    }
  }, [open, vehicle]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.year) e.year = "Year is required";
    if (!form.plateNumber.trim()) e.plateNumber = "Plate number is required";
    if (!form.vin.trim()) e.vin = "VIN is required";
    if (form.mileage === "" || form.mileage === null) e.mileage = "Mileage is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        year: parseInt(form.year, 10),
        mileage: parseInt(form.mileage, 10),
        engine: form.engine.trim() || null,
        lastServiceMileage: vehicle?.lastServiceMileage ?? null,
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

  const inputStyle = (key) => ({
    width: "100%",
    height: 40,
    padding: "0 12px",
    fontSize: 13,
    color: "#111827",
    background: errors[key] ? "#fff8f8" : "#f9fafb",
    border: `1px solid ${errors[key] ? "#fca5a5" : "#e5e7eb"}`,
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  });

  return (
    <Modal open={open} onClose={onClose} maxWidth={580}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C52AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4v4a2 2 0 0 1-2 2h-1"/>
              <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              <path d="M14 5h1l4 4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>
            {isEdit ? "Edit vehicle" : "Add new vehicle"}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #e5e7eb",
            borderRadius: 7,
            background: "transparent",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: 16,
          }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field
            label="Brand"
            id="brand"
            placeholder="e.g. Toyota"
            value={form.brand}
            onChange={set("brand")}
            error={errors.brand}
          />
          <Field
            label="Model"
            id="model"
            placeholder="e.g. Camry"
            value={form.model}
            onChange={set("model")}
            error={errors.model}
          />
          <Field
            label="Year"
            id="year"
            type="number"
            placeholder="e.g. 2021"
            value={form.year}
            onChange={set("year")}
            error={errors.year}
          />

          {/* Color */}
          <div>
            <label
              htmlFor="color"
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Color
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="color"
                value={form.color}
                onChange={set("color")}
                style={{
                  ...inputStyle("color"),
                  paddingLeft: form.color ? 26 : 12,
                  cursor: "pointer",
                  appearance: "auto",
                }}
              >
                <option value="">Select color</option>
                {COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {form.color && (
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <ColorDot color={form.color} />
                </span>
              )}
            </div>
          </div>

          <Field
            label="Plate number"
            id="plateNumber"
            placeholder="e.g. ABC-1234"
            value={form.plateNumber}
            onChange={set("plateNumber")}
            error={errors.plateNumber}
          />
          <Field
            label="Mileage (km)"
            id="mileage"
            type="number"
            placeholder="e.g. 15000"
            value={form.mileage}
            onChange={set("mileage")}
            error={errors.mileage}
          />

          {/* VIN full width */}
          <div style={{ gridColumn: "span 2" }}>
            <label
              htmlFor="vin"
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              VIN
            </label>
            <input
              id="vin"
              type="text"
              value={form.vin}
              onChange={set("vin")}
              placeholder="e.g. 1HGBH41JXMN109186"
              autoComplete="off"
              style={{
                ...inputStyle("vin"),
                fontFamily: "ui-monospace, 'Courier New', monospace",
                letterSpacing: "0.05em",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1C52AF";
                e.target.style.boxShadow = "0 0 0 3px rgba(28,82,175,0.1)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.vin ? "#fca5a5" : "#e5e7eb";
                e.target.style.boxShadow = "none";
                e.target.style.background = errors.vin ? "#fff8f8" : "#f9fafb";
              }}
            />
            {errors.vin && (
              <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4, marginBottom: 0 }}>{errors.vin}</p>
            )}
          </div>

          <Field
            label="Engine"
            id="engine"
            placeholder="e.g. 2.5L V6"
            value={form.engine}
            onChange={set("engine")}
            optional
          />

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Status
            </label>
            <select
              id="status"
              value={form.status}
              onChange={set("status")}
              style={{ ...inputStyle("status"), cursor: "pointer", appearance: "auto" }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
          padding: "14px 24px",
          borderTop: "1px solid #f3f4f6",
          background: "#fafafa",
          borderRadius: "0 0 14px 14px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            height: 38,
            padding: "0 18px",
            fontSize: 13,
            fontWeight: 500,
            color: "#374151",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            height: 38,
            padding: "0 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            background: loading ? "#93b4e8" : "#1C52AF",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "background 0.15s",
          }}
        >
          {loading ? (
            <>
              <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
              Saving…
            </>
          ) : isEdit ? (
            "Save changes"
          ) : (
            "Add vehicle"
          )}
        </button>
      </div>
    </Modal>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function DetailModal({ open, onClose, vehicle }) {
  if (!vehicle) return null;

  const InfoRow = ({ icon, label, value }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 14,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{label}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0, wordBreak: "break-word" }}>{value || "—"}</p>
      </div>
    </div>
  );

  const isActive = vehicle.status === "active";

  return (
    <Modal open={open} onClose={onClose} maxWidth={520}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Vehicle details</h2>
        <button
          onClick={onClose}
          style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: 7, background: "transparent", cursor: "pointer", color: "#6b7280", fontSize: 16 }}
        >
          ×
        </button>
      </div>

      {/* Hero card */}
      <div style={{ margin: "16px 24px", background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)", borderRadius: 12, padding: 20, border: "1px solid #dbeafe", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ width: 60, height: 60, borderRadius: 12, background: "#fff", border: "1px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1C52AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4v4a2 2 0 0 1-2 2h-1"/>
            <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
            <path d="M14 5h1l4 4"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
            {vehicle.brand} {vehicle.model}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{vehicle.year}</span>
            {vehicle.color && (
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6b7280" }}>
                · <ColorDot color={vehicle.color} /> {vehicle.color}
              </span>
            )}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: 20,
                background: isActive ? "#dcfce7" : "#f3f4f6",
                color: isActive ? "#15803d" : "#6b7280",
              }}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "ui-monospace, monospace", color: "#374151", margin: "6px 0 0", letterSpacing: "0.1em" }}>
            {vehicle.plateNumber}
          </p>
        </div>
      </div>

      <div style={{ padding: "0 24px 20px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", marginBottom: 4 }}>Technical</p>
        <InfoRow icon="🔖" label="VIN" value={vehicle.vin} />
        <InfoRow icon="⛽" label="Engine" value={vehicle.engine} />
        <InfoRow icon="📏" label="Current mileage" value={vehicle.mileage != null ? `${vehicle.mileage.toLocaleString()} km` : null} />
        <InfoRow icon="🔧" label="Last service mileage" value={vehicle.lastServiceMileage ? `${vehicle.lastServiceMileage.toLocaleString()} km` : null} />

        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", margin: "16px 0 4px" }}>Record</p>
        <InfoRow icon="📅" label="Added on" value={new Date(vehicle.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })} />
        <InfoRow icon="🕒" label="Last updated" value={new Date(vehicle.updatedAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })} />
      </div>
    </Modal>
  );
}

// ─── HISTORY MODAL ────────────────────────────────────────────────────────────
function HistoryModal({ open, onClose, vehicle }) {
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
    <Modal open={open} onClose={onClose} maxWidth={520}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Service history</h2>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{vehicle.brand} {vehicle.model} · {vehicle.plateNumber}</p>
        </div>
        <button onClick={onClose} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: 7, background: "transparent", cursor: "pointer", color: "#6b7280", fontSize: 16 }}>×</button>
      </div>

      <div style={{ padding: "20px 24px", minHeight: 200 }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", color: "#9ca3af" }}>
            <span style={{ width: 28, height: 28, border: "2px solid #bfdbfe", borderTopColor: "#1C52AF", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite", marginBottom: 12 }} />
            <p style={{ fontSize: 13, margin: 0 }}>Loading history…</p>
          </div>
        ) : history.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", color: "#9ca3af" }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>No service history found</p>
            <p style={{ fontSize: 12, margin: "4px 0 0" }}>Service records will appear here</p>
          </div>
        ) : (
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 1, background: "#e5e7eb" }} />
            {history.map((entry, i) => (
              <div key={entry.id || i} style={{ position: "relative", marginBottom: 16 }}>
                <span style={{ position: "absolute", left: -20, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#1C52AF", border: "2px solid #fff", boxShadow: "0 0 0 1px #dbeafe" }} />
                <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px", border: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>
                      {entry.serviceType || entry.type || "Service"}
                    </p>
                    <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>
                      {new Date(entry.date || entry.createdAt).toLocaleDateString("en-NG")}
                    </span>
                  </div>
                  {entry.description && (
                    <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>{entry.description}</p>
                  )}
                  {entry.mileage && (
                    <p style={{ fontSize: 12, color: "#1C52AF", fontWeight: 500, margin: "6px 0 0" }}>
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
}

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────
// ─── DELETE MODAL (FIXED) ─────────────────────────────────────────────────────
function DeleteModal({ open, onClose, vehicle, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    // DEBUG: Log what we're trying to delete
    console.log("Attempting to delete vehicle:", vehicle);
    console.log("Vehicle ID:", vehicle?.id);
    console.log("Vehicle ID type:", typeof vehicle?.id);

    if (!vehicle?.id) {
      console.error("Cannot delete: vehicle.id is missing or undefined");
      setError("Vehicle ID is missing. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const deleteUrl = `/vehicles/${vehicle.id}`;
      console.log("DELETE request to:", deleteUrl);

      const response = await api.delete(deleteUrl);

      console.log("Delete successful:", response.status, response.statusText);
      onDeleted();
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);

      // Log detailed error info
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
        console.error("Response headers:", err.response.headers);
        setError(`Server error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server. Check your network connection.");
      } else {
        console.error("Error setting up request:", err.message);
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth={400}>
      <div style={{ padding: "28px 24px", textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>
          🗑️
        </div>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>Delete vehicle</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px", lineHeight: 1.6 }}>
          Are you sure you want to delete{" "}
          <strong style={{ color: "#374151" }}>{vehicle.brand} {vehicle.model}</strong>{" "}
          ({vehicle.plateNumber})?
        </p>
        
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#dc2626" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, height: 40, fontSize: 13, fontWeight: 500, color: "#374151", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 9, cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{
              flex: 1,
              height: 40,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: loading ? "#fca5a5" : "#dc2626",
              border: "none",
              borderRadius: 9,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {loading ? (
              <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
            ) : null}
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── VEHICLE CARD ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, onView, onEdit, onDelete, onHistory }) {
  const isActive = vehicle.status === "active";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        transition: "box-shadow 0.18s, border-color 0.18s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = "#bfdbfe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 110,
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4v4a2 2 0 0 1-2 2h-1"/>
          <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
          <path d="M14 5h1l4 4"/>
        </svg>

        {/* Status badge */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 20,
            background: isActive ? "#dcfce7" : "#f3f4f6",
            color: isActive ? "#15803d" : "#6b7280",
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </span>

        {/* Plate badge */}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "ui-monospace, 'Courier New', monospace",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 5,
            padding: "3px 8px",
            color: "#374151",
            letterSpacing: "0.07em",
          }}
        >
          {vehicle.plateNumber}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 3px" }}>
          {vehicle.brand} {vehicle.model}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}>
          <span>{vehicle.year}</span>
          {vehicle.color && (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              · <ColorDot color={vehicle.color} /> {vehicle.color}
            </span>
          )}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 14,
            margin: "10px 0",
            padding: "10px 0",
            borderTop: "1px solid #f3f4f6",
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: "#1C52AF" }}>⊙</span>
            {vehicle.mileage != null ? vehicle.mileage.toLocaleString() : 0} km
          </span>
          {vehicle.engine && (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#1C52AF" }}>⛽</span>
              {vehicle.engine}
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6 }}>
          <ActionBtn label="View" onClick={() => onView(vehicle)} flex />
          <ActionBtn label="History" onClick={() => onHistory(vehicle)} flex />
          <ActionIconBtn label="Edit" onClick={() => onEdit(vehicle)} />
          <ActionIconBtn label="Delete" onClick={() => onDelete(vehicle)} danger />
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ label, onClick, flex }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...(flex ? { flex: 1 } : {}),
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        fontSize: 12,
        fontWeight: 500,
        color: "#374151",
        background: hovered ? "#f3f4f6" : "transparent",
        border: "1px solid #e5e7eb",
        borderRadius: 7,
        cursor: "pointer",
        transition: "background 0.12s",
        padding: "0 8px",
      }}
    >
      {label}
    </button>
  );
}

function ActionIconBtn({ onClick, label, danger }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      style={{
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? (danger ? "#fef2f2" : "#eff6ff") : "transparent",
        border: `1px solid ${hovered ? (danger ? "#fecaca" : "#bfdbfe") : "#e5e7eb"}`,
        borderRadius: 7,
        cursor: "pointer",
        color: hovered ? (danger ? "#dc2626" : "#1C52AF") : "#6b7280",
        fontSize: 13,
        transition: "all 0.12s",
      }}
    >
      {danger ? "🗑" : "✏️"}
    </button>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Vehicles() {
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
    needsService: vehicles.filter((v) => v.mileage - (v.lastServiceMileage || 0) > 10000).length,
  };

  const openEdit = (vehicle) => { setEditVehicle(vehicle); setShowForm(true); };
  const openAdd = () => { setEditVehicle(null); setShowForm(true); };

  return (
    <div style={{ minHeight: "100vh", padding: "24px", background: "#f9fafb" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        
        /* Desktop: keep original structure */
        @media (min-width: 768px) {
          .vehicles-header { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
          .toolbar { flex-direction: row !important; align-items: center !important; }
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .vehicle-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 767px) {
          .vehicles-header { flex-direction: column !important; }
          .toolbar { flex-direction: column !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vehicle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Toast toast={toast} />

      {/* Header */}
      <div className="vehicles-header" style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 3px" }}>My vehicles</h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Manage and track your registered vehicles</p>
        </div>
        <button
          onClick={openAdd}
          style={{
            height: 38,
            padding: "0 18px",
            background: "#1C52AF",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1540a0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1C52AF")}
        >
          + Add vehicle
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total vehicles", value: stats.total, bg: "#eff6ff", color: "#1C52AF" },
          { label: "Active", value: stats.active, bg: "#f0fdf4", color: "#15803d" },
          { label: "Avg mileage", value: `${stats.avgMileage.toLocaleString()} km`, bg: "#eef2ff", color: "#4338ca" },
          { label: "Need service", value: stats.needsService, bg: "#fffbeb", color: "#b45309" },
        ].map(({ label, value, bg, color }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 2px" }}>{label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {/* Search - NO ICON */}
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <input
            type="text"
            placeholder="Search brand, model, plate number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 38,
              padding: "0 36px 0 12px",
              fontSize: 13,
              color: "#111827",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 9,
              outline: "none",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#1C52AF"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,175,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16, lineHeight: 1, padding: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              ×
            </button>
          )}
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                height: 38,
                padding: "0 16px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 9,
                cursor: "pointer",
                border: filter === f ? "none" : "1px solid #e5e7eb",
                background: filter === f ? "#1C52AF" : "#fff",
                color: filter === f ? "#fff" : "#374151",
                transition: "all 0.12s",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", color: "#9ca3af" }}>
          <span style={{ width: 36, height: 36, border: "3px solid #bfdbfe", borderTopColor: "#1C52AF", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite", marginBottom: 14 }} />
          <p style={{ fontSize: 14, margin: 0 }}>Loading vehicles…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 16px", color: "#9ca3af" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#6b7280", margin: "0 0 4px", textAlign: "center" }}>No vehicles found</p>
          <p style={{ fontSize: 13, margin: 0, textAlign: "center" }}>
            {search || filter !== "all" ? "Try adjusting your search or filter." : "Add your first vehicle to get started."}
          </p>
        </div>
      ) : (
        <div className="vehicle-grid" style={{ display: "grid", gap: 16 }}>
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
          showToast(action === "updated" ? "Vehicle updated successfully" : "Vehicle added successfully");
          fetchVehicles();
        }}
      />
      <DetailModal open={!!detailVehicle} onClose={() => setDetailVehicle(null)} vehicle={detailVehicle} />
      <HistoryModal open={!!historyVehicle} onClose={() => setHistoryVehicle(null)} vehicle={historyVehicle} />
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
}