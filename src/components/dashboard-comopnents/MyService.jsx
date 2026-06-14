import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  HiChatAlt2, HiLocationMarker, HiCheckCircle, HiClock, HiCalendar,
  HiStar, HiDownload, HiRefresh, HiChevronDown, HiChevronUp, HiX,
  HiPaperAirplane, HiPhone, HiExclamationCircle, HiShieldCheck,
  HiCheck,
} from "react-icons/hi";
import { HiWrench } from "react-icons/hi2";
import api from "../../api/axios";

/* ══════════════════════════════════════════════════════════════════════
   HELPERS — map API booking → UI shape
══════════════════════════════════════════════════════════════════════ */
const STATUS_COLOR = {
  pending:   "bg-orange-100 text-orange-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  in_progress: "bg-yellow-100 text-yellow-700",
};

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function fmtTime(raw) {
  // normalise "11:00am" → "11:00 AM", "05:00pm" → "5:00 PM"
  if (!raw) return "—";
  return raw.replace(/([ap]m)/i, v => " " + v.toUpperCase()).replace(/^0/, "");
}

/* ══════════════════════════════════════════════════════════════════════
   MODAL WRAPPER
══════════════════════════════════════════════════════════════════════ */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.32s cubic-bezier(0.34,1.4,0.64,1)" }}
      >
        {children}
      </div>
      <style>{`
        @keyframes modalIn { from{opacity:0;transform:translateY(48px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes typingBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes ripplePulse { 0%,100%{box-shadow:0 0 0 0 rgba(28,82,175,0.35)} 50%{box-shadow:0 0 0 9px rgba(28,82,175,0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   RESCHEDULE MODAL  — PATCH /bookings/:id
══════════════════════════════════════════════════════════════════════ */
const timeSlots = [
  "8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
];

function RescheduleModal({ open, onClose, booking, onSuccess }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const handleClose = () => {
    setSuccess(false); setSelectedDate(null); setSelectedTime(null); setError(null);
    onClose();
  };

  const confirm = async () => {
    if (!selectedDate || !selectedTime) return;
    setLoading(true); setError(null);
    try {

      
      // Format date as YYYY-MM-DD
      const yyyy = selectedDate.getFullYear();
      const mm   = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd   = String(selectedDate.getDate()).padStart(2, "0");
      const scheduledDate = `${yyyy}-${mm}-${dd}`;

      console.log("Full booking object:", booking);
console.log("Booking ID:", booking?.id);
console.log("Booking Number:", booking?.bookingNumber);

      await api.put(`/bookings/${booking.id}`, {
        scheduledDate,
        scheduledTime: selectedTime,
        status: booking.status,
        notes: booking.notes || "",
      });


      
   

      setSuccess(true);
      onSuccess?.({ id: booking.id, scheduledDate, scheduledTime: selectedTime });
      setTimeout(() => handleClose(), 2400);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reschedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Reschedule Appointment</p>
          <p className="text-xs text-gray-400">{booking.bookingNumber}</p>
        </div>
        <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4" style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-green-500" />
          </div>
          <p className="text-base font-semibold text-gray-800">Appointment Rescheduled!</p>
          <p className="text-sm text-gray-500 text-center">
            {selectedDate?.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
          </p>
          <p className="text-xs text-gray-400">You'll receive a confirmation shortly.</p>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Current appointment */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 flex items-start gap-2">
            <HiClock size={15} className="text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-orange-700 font-semibold">Current Appointment</p>
              <p className="text-xs text-orange-600">
                {fmtDate(booking.scheduledDate)} at {fmtTime(booking.scheduledTime)} · {booking.serviceCity}
              </p>
            </div>
          </div>

          {/* Date picker */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Select New Date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((d, i) => {
                const isSel = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border font-medium transition-all ${
                      isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md scale-105"
                            : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                    }`}>
                    <span className="text-[10px] uppercase opacity-80">{d.toLocaleDateString("en", { weekday: "short" })}</span>
                    <span className="text-lg font-bold mt-0.5 leading-none">{d.getDate()}</span>
                    <span className="text-[10px] mt-0.5 opacity-80">{d.toLocaleDateString("en", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div style={{ animation: "fadeSlide 0.25s ease" }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Available Time Slots</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => {
                  const isSel = selectedTime === t;
                  return (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                        isSel ? "bg-[#1C52AF] text-white border-[#1C52AF] shadow-md"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#1C52AF] hover:text-[#1C52AF]"
                      }`}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 flex items-center gap-2"
              style={{ animation: "fadeSlide 0.2s ease" }}>
              <HiCalendar size={15} className="text-[#1C52AF] shrink-0" />
              <p className="text-xs text-[#1C52AF] font-medium">
                New appointment: {selectedDate.toLocaleDateString("en-NG", { weekday: "long", month: "short", day: "numeric" })} at {selectedTime}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <button onClick={confirm} disabled={!selectedDate || !selectedTime || loading}
            className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
            {loading ? "Rescheduling…" : selectedDate && selectedTime ? "Confirm Reschedule" : "Select a date and time"}
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CANCEL MODAL  — POST /bookings/:id/cancel
══════════════════════════════════════════════════════════════════════ */
const cancelReasons = [
  "Change of plans",
  "Found a better price elsewhere",
  "Vehicle issue resolved on its own",
  "Scheduling conflict",
  "Mechanic not responding",
  "Other reason",
];

function CancelModal({ open, onClose, booking, onSuccess }) {
  const [reason, setReason]   = useState("");
  const [custom, setCustom]   = useState("");
  const [step, setStep]       = useState("reason");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const reset = () => { setReason(""); setCustom(""); setStep("reason"); setError(null); };
  const close = () => { reset(); onClose(); };

  const doCancel = async () => {
    setLoading(true); setError(null);
    try {
      const finalReason = reason === "Other reason" ? (custom || "Other") : reason;
      await api.post(`/bookings/${booking.id}/cancel`, { reason: finalReason });
      setStep("done");
      onSuccess?.(booking.id);
      setTimeout(() => { reset(); onClose(); }, 2400);
    } catch (err) {
      setError(err?.response?.data?.message || "Cancellation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;
  return (
    <Modal open={open} onClose={close}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <p className="font-semibold text-gray-800 text-sm">Cancel Booking</p>
        <button onClick={close} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      {step === "done" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4" style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <HiCheckCircle size={36} className="text-red-400" />
          </div>
          <p className="text-base font-semibold text-gray-800">Booking Cancelled</p>
          <p className="text-sm text-gray-500 text-center">
            {booking.bookingNumber} has been cancelled.<br />A refund will be processed within 3–5 business days.
          </p>
        </div>
      ) : step === "confirm" ? (
        <div className="px-4 py-4 flex flex-col gap-4" style={{ animation: "fadeSlide 0.25s ease" }}>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <HiExclamationCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-700">Are you sure you want to cancel?</p>
              <p className="text-xs text-red-400 mt-1">This cannot be undone. A cancellation fee may apply if within 24 hrs.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-0.5">
            <p className="text-xs text-gray-400">Booking</p>
            <p className="text-sm font-semibold text-gray-800">{booking.service?.name}</p>
            <p className="text-xs text-gray-500">{booking.vehicle?.brand} {booking.vehicle?.model} · {fmtDate(booking.scheduledDate)} at {fmtTime(booking.scheduledTime)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400 mb-0.5">Cancellation reason</p>
            <p className="text-sm text-gray-700">{reason === "Other reason" ? (custom || "Other") : reason}</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep("reason")} disabled={loading}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
              Go Back
            </button>
            <button onClick={doCancel} disabled={loading}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
              {loading ? "Cancelling…" : "Yes, Cancel Booking"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <p className="text-sm text-gray-500">Help us improve by telling us why you're cancelling.</p>
          <div className="flex flex-col gap-2">
            {cancelReasons.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${
                  reason === r ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium"
                               : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                }`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${reason === r ? "border-[#1C52AF]" : "border-gray-300"}`}>
                  {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
                </div>
                {r}
              </button>
            ))}
          </div>
          {reason === "Other reason" && (
            <textarea value={custom} onChange={e => setCustom(e.target.value)} rows={3}
              placeholder="Please describe your reason…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] resize-none transition-colors"
              style={{ animation: "fadeSlide 0.2s ease" }} />
          )}
          <button onClick={() => setStep("confirm")}
            disabled={!reason || (reason === "Other reason" && !custom.trim())}
            className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-95 transition-all mt-1">
            Continue to Confirm
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BOOKING DETAIL MODAL  — shows full booking info
══════════════════════════════════════════════════════════════════════ */
function BookingDetailModal({ open, onClose, booking }) {
  if (!booking) return null;
  const svc = booking.service || {};
  const veh = booking.vehicle || {};
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Booking Details</p>
          <p className="text-xs text-gray-400">{booking.bookingNumber}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <HiX size={18} />
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
        {/* Status badge */}
        <span className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${STATUS_COLOR[booking.status] || "bg-gray-100 text-gray-600"}`}>
          {booking.status}
        </span>

        {/* Service info */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1">
          <p className="text-xs text-gray-400">Service</p>
          <p className="text-sm font-semibold text-gray-800">{svc.name}</p>
          <p className="text-xs text-gray-500">{svc.description}</p>
          {svc.estimatedDurationMinutes && (
            <p className="text-xs text-[#1C52AF] font-medium mt-0.5">Est. duration: {svc.estimatedDurationMinutes} min</p>
          )}
        </div>

        {/* Vehicle info */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1">
          <p className="text-xs text-gray-400">Vehicle</p>
          <p className="text-sm font-semibold text-gray-800">{veh.brand} {veh.model} {veh.year}</p>
          <p className="text-xs text-gray-500">Plate: {veh.plateNumber} · Color: {veh.color}</p>
        </div>

        {/* Date / location */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 rounded-xl px-3 py-2.5">
            <p className="text-[10px] text-gray-400 mb-0.5">Date & Time</p>
            <p className="text-xs font-semibold text-gray-800">{fmtDate(booking.scheduledDate)}</p>
            <p className="text-xs text-[#1C52AF] font-medium">{fmtTime(booking.scheduledTime)}</p>
          </div>
          <div className="bg-blue-50 rounded-xl px-3 py-2.5">
            <p className="text-[10px] text-gray-400 mb-0.5">Location</p>
            <p className="text-xs font-semibold text-gray-800">{booking.serviceAddress}</p>
            <p className="text-xs text-gray-500">{booking.serviceCity}</p>
          </div>
        </div>

        {/* Additional services */}
        {booking.additionalServices?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Additional Services</p>
            <div className="flex flex-wrap gap-1.5">
              {booking.additionalServices.map((s, i) => (
                <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pricing</div>
          {[
            { label: "Subtotal",    value: `$${booking.subtotal}` },
            { label: "Service Fee", value: `$${booking.serviceFee}` },
            { label: "Taxes",       value: `$${booking.taxes}` },
          ].map(row => (
            <div key={row.label} className="flex justify-between px-4 py-2 border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-500">{row.label}</span>
              <span className="text-xs text-gray-700">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3 bg-blue-50">
            <span className="text-sm font-semibold text-gray-800">Total</span>
            <span className="text-sm font-bold text-[#1C52AF]">${booking.totalAmount}</span>
          </div>
        </div>

        {booking.notes ? (
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 border-l-4 border-[#1C52AF]">
            <p className="text-xs text-gray-500">📌 {booking.notes}</p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ANIMATED CARD WRAPPER
══════════════════════════════════════════════════════════════════════ */
function AnimatedCard({ children, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BOOKING CARD
══════════════════════════════════════════════════════════════════════ */
function BookingCard({ booking, index, onReschedule, onCancel, onViewDetail }) {
  const svc    = booking.service  || {};
  const veh    = booking.vehicle  || {};
  const status = booking.status;

  const isPending   = status === "pending";
  const isConfirmed = status === "confirmed";
  const isActive    = status === "in_progress";
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";

  const canReschedule = isPending || isConfirmed;
  const canCancel     = isPending || isConfirmed;

  return (
    <AnimatedCard index={index}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Top colour strip */}
        <div className={`h-1 w-full ${isCompleted ? "bg-green-400" : isCancelled ? "bg-red-400" : isActive ? "bg-yellow-400" : "bg-[#1C52AF]"}`} />

        <div className="p-4 flex flex-col gap-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{svc.name || "Service"}</p>
              <p className="text-xs text-gray-400 mt-0.5">{booking.bookingNumber}</p>
            </div>
            <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${STATUS_COLOR[status] || "bg-gray-100 text-gray-600"}`}>
              {status.replace("_", " ")}
            </span>
          </div>

          {/* Vehicle */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <HiWrench size={13} className="text-[#1C52AF] shrink-0" />
            <p className="text-xs text-gray-600">
              {veh.brand} {veh.model} {veh.year} · <span className="text-gray-400">{veh.color}</span>
            </p>
          </div>

          {/* Date / time / location row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <HiCalendar size={13} className="text-[#1C52AF] mx-auto mb-0.5" />
              <p className="text-[10px] text-gray-400">Date</p>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">
                {new Date(booking.scheduledDate).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <HiClock size={13} className="text-[#1C52AF] mx-auto mb-0.5" />
              <p className="text-[10px] text-gray-400">Time</p>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">{fmtTime(booking.scheduledTime)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <HiLocationMarker size={13} className="text-[#1C52AF] mx-auto mb-0.5" />
              <p className="text-[10px] text-gray-400">City</p>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight truncate">{booking.serviceCity || "—"}</p>
            </div>
          </div>

          {/* Additional services */}
          {booking.additionalServices?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {booking.additionalServices.map((s, i) => (
                <span key={i} className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md font-medium">{s}</span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex justify-between items-center bg-blue-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-sm font-bold text-[#1C52AF]">${booking.totalAmount}</p>
          </div>

          {/* Payment status */}
          {booking.paymentStatus === "pending" && !isCancelled && (
            <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
              <HiExclamationCircle size={14} className="text-orange-500 shrink-0" />
              <p className="text-xs text-orange-600 font-medium">Payment pending</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-2 justify-between items-center">
            <button onClick={() => onViewDetail(booking)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
              View Details
            </button>

            <div className="flex gap-2">
              {canCancel && (
                <button onClick={() => onCancel(booking)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all">
                  Cancel
                </button>
              )}
              {canReschedule && (
                <button onClick={() => onReschedule(booking)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
                  <HiCalendar size={13} /> Reschedule
                </button>
              )}
              {isCancelled && (
                <span className="text-xs text-red-400 font-medium px-2">Cancelled</span>
              )}
              {isCompleted && (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium px-2">
                  <HiCheckCircle size={13} /> Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SKELETON LOADER
══════════════════════════════════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 animate-pulse">
      <div className="h-1 w-full bg-gray-100 rounded" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-40 bg-gray-100 rounded" />
          <div className="h-3 w-28 bg-gray-100 rounded" />
        </div>
        <div className="h-6 w-20 bg-gray-100 rounded-lg" />
      </div>
      <div className="h-8 bg-gray-100 rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        {[0,1,2].map(i => <div key={i} className="h-14 bg-gray-100 rounded-lg" />)}
      </div>
      <div className="h-8 bg-gray-100 rounded-lg" />
      <div className="flex justify-between pt-2 border-t border-gray-100">
        <div className="h-8 w-24 bg-gray-100 rounded-lg" />
        <div className="h-8 w-28 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB CONFIG
══════════════════════════════════════════════════════════════════════ */
const TABS = [
  { key: "all",       label: "All",       statuses: null,                        color: "bg-blue-100 text-blue-700" },
  { key: "pending",   label: "Pending",   statuses: ["pending"],                 color: "bg-orange-100 text-orange-700" },
  { key: "active",    label: "Active",    statuses: ["confirmed", "in_progress"], color: "bg-yellow-100 text-yellow-700" },
  { key: "completed", label: "Completed", statuses: ["completed"],               color: "bg-green-100 text-green-700" },
  { key: "cancelled", label: "Cancelled", statuses: ["cancelled"],               color: "bg-red-100 text-red-600" },
];

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
const MyService = () => {
  const [bookings, setBookings]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [fetchError, setFetchError]       = useState(null);
  const [activeTab, setActiveTab]         = useState("all");
  const [animating, setAnimating]         = useState(false);

  const [rescheduleModal, setRescheduleModal] = useState({ open: false, booking: null });
  const [cancelModal, setCancelModal]         = useState({ open: false, booking: null });
  const [detailModal, setDetailModal]         = useState({ open: false, booking: null });

  /* ── Fetch bookings ── */
  const fetchBookings = useCallback(async () => {
    setLoading(true); setFetchError(null);
    try {
      const res = await api.get("/bookings");
      // API may return array directly or { data: [...] }
      const raw = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      setBookings(raw);
    } catch (err) {
      setFetchError(err?.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  /* ── Tab switching ── */
  const switchTab = (key) => {
    if (key === activeTab) return;
    setAnimating(true);
    setTimeout(() => { setActiveTab(key); setAnimating(false); }, 180);
  };

  /* ── Filter bookings for current tab ── */
  const tabConfig  = TABS.find(t => t.key === activeTab);
  const filtered   = tabConfig?.statuses
    ? bookings.filter(b => tabConfig.statuses.includes(b.status))
    : bookings;

  /* ── Count badges ── */
  const countFor = (tab) =>
    tab.statuses
      ? bookings.filter(b => tab.statuses.includes(b.status)).length
      : bookings.length;

  /* ── Reschedule success ── */
  const handleRescheduleSuccess = ({ id, scheduledDate, scheduledTime }) => {
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, scheduledDate, scheduledTime } : b
    ));
  };

  /* ── Cancel success ── */
  const handleCancelSuccess = (id) => {
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, status: "cancelled" } : b
    ));
  };

  /* ── Descriptions ── */
  const descriptions = {
    all:       "All your vehicle service bookings.",
    pending:   "Bookings awaiting confirmation or payment.",
    active:    "Confirmed & in-progress services.",
    completed: "Past completed services.",
    cancelled: "Cancelled bookings.",
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-1">
        <div>
          <h1 className="text-xl font-semibold capitalize">
            {activeTab === "all" ? "My Services" : `${activeTab.charAt(0).toUpperCase()}${activeTab.slice(1)} Services`}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{descriptions[activeTab]}</p>
        </div>

        {/* Refresh */}
        <button onClick={fetchBookings} disabled={loading}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-2 text-xs text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all active:scale-95 disabled:opacity-50">
          <HiRefresh size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => switchTab(tab.key)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all ${
              activeTab === tab.key ? "bg-white shadow text-gray-800 font-semibold" : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab.color}`}>
              {countFor(tab)}
            </span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="flex flex-col gap-4"
        style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.18s ease, transform 0.18s ease" }}
      >
        {/* Loading skeletons */}
        {loading && [0,1,2].map(i => <SkeletonCard key={i} />)}

        {/* Error */}
        {!loading && fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-6 flex flex-col items-center gap-3 text-center">
            <HiExclamationCircle size={32} className="text-red-400" />
            <p className="text-sm font-semibold text-red-700">Couldn't load bookings</p>
            <p className="text-xs text-red-400">{fetchError}</p>
            <button onClick={fetchBookings}
              className="px-4 py-2 text-xs text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all active:scale-95">
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !fetchError && filtered.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-12 flex flex-col items-center gap-3 text-center">
            <HiWrench size={32} className="text-gray-300" />
            <p className="text-sm font-semibold text-gray-500">No {activeTab === "all" ? "" : activeTab} bookings found</p>
            <p className="text-xs text-gray-400">Your bookings will appear here once created.</p>
          </div>
        )}

        {/* Booking cards */}
        {!loading && !fetchError && filtered.map((b, i) => (
          <BookingCard key={b.id} booking={b} index={i}
            onReschedule={bk => setRescheduleModal({ open: true, booking: bk })}
            onCancel={bk => setCancelModal({ open: true, booking: bk })}
            onViewDetail={bk => setDetailModal({ open: true, booking: bk })} />
        ))}
      </div>

      {/* ── Modals ── */}
      <RescheduleModal
        open={rescheduleModal.open}
        booking={rescheduleModal.booking}
        onClose={() => setRescheduleModal({ open: false, booking: null })}
        onSuccess={handleRescheduleSuccess}
      />
      <CancelModal
        open={cancelModal.open}
        booking={cancelModal.booking}
        onClose={() => setCancelModal({ open: false, booking: null })}
        onSuccess={handleCancelSuccess}
      />
      <BookingDetailModal
        open={detailModal.open}
        booking={detailModal.booking}
        onClose={() => setDetailModal({ open: false, booking: null })}
      />
    </div>
  );
};

export default MyService;