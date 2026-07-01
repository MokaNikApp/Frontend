import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiCheckCircle, HiClock, HiCalendar, HiX, HiChatAlt2, HiPhone,
  HiShieldCheck, HiExclamationCircle, HiRefresh, HiArrowRight,
  HiPhotograph, HiDocumentText, HiUpload, HiClipboardList,
  HiCurrencyDollar, HiInformationCircle, HiBan, HiAnnotation,
  HiChevronRight, HiChevronLeft, HiSearch, HiFilter, HiLocationMarker,
  HiStar, HiTruck, HiBadgeCheck, HiOutlineClock,
  HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineCalendar,
  HiOutlineChat, HiOutlinePhotograph, HiOutlineDocumentText,
  HiOutlineBan, HiOutlineRefresh, HiOutlineChevronRight,
} from "react-icons/hi";
import api from "../../api/axios";

// ─── Design Tokens ───
const STATUS_MAP = {
  PENDING: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: HiClock,
    light: "bg-amber-50",
  },
  ACCEPTED: {
    label: "Accepted",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: HiCheckCircle,
    light: "bg-blue-50",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
    icon: HiRefresh,
    light: "bg-indigo-50",
  },
  COMPLETED: {
    label: "Completed",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    icon: HiBadgeCheck,
    light: "bg-emerald-50",
  },
  CANCELLED: {
    label: "Cancelled",
    badge: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
    icon: HiBan,
    light: "bg-red-50",
  },
  REVIEWING: {
    label: "Reviewing",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    icon: HiShieldCheck,
    light: "bg-purple-50",
  },
};

// ─── Utilities ───
function fmtDate(iso) {
  if (!iso) return "Not scheduled";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Not scheduled";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function fmtShortDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function fmtRelativeTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return fmtShortDate(iso);
}

function formatCurrency(amount) {
  if (amount == null) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / 100);
}

// ─── Animation Components ───
function FadeIn({ children, delay = 0, duration = 400, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Modal Base ───
function Modal({ open, onClose, children, maxWidth = "max-w-lg", title, subtitle, icon: Icon }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <FadeIn duration={300} className={`bg-white w-full ${maxWidth} sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col`}>
        {(title || Icon) && (
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1C52AF] shrink-0">
                  <Icon size={18} />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{title}</h3>
                {subtitle && <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all flex items-center justify-center shrink-0"
            >
              <HiX size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </FadeIn>
    </div>
  );
}

// ─── Timeline Modal ───
function TimelineModal({ open, onClose, jobId }) {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !jobId) return;
    const fetchTimeline = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/jobs/${jobId}/timeline`);
        setTimeline(res.data?.data || res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load timeline");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [open, jobId]);

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md" title="Job Timeline" icon={HiOutlineClock}>
      <div className="px-5 sm:px-6 py-5">
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-gray-200 mt-2" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 w-3/4 bg-gray-100 rounded-lg" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <HiExclamationCircle size={18} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && timeline.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <HiClipboardList size={28} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900">No timeline events</p>
            <p className="text-xs text-gray-500 mt-1">Activity will appear here once the job progresses.</p>
          </div>
        )}
        {!loading && !error && timeline.length > 0 && (
          <div className="relative">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gray-200" />
            <div className="space-y-0">
              {timeline.map((event, i) => {
                const cfg = STATUS_MAP[event.status] || STATUS_MAP.PENDING;
                const Icon = cfg.icon;
                return (
                  <FadeIn key={i} delay={i * 80} className="relative flex gap-4 pb-8 last:pb-0">
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${cfg.light}`}>
                      <Icon size={18} className={cfg.badge.split(" ")[1]} />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="text-sm font-semibold text-gray-900">{event.event}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${cfg.badge}`}>
                          {event.status}
                        </span>
                        {event.timestamp && (
                          <span className="text-xs text-gray-400">
                            {fmtRelativeTime(event.timestamp)} · {fmtShortDate(event.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── Notes Modal ───
function NotesModal({ open, onClose, jobId, existingNotes = [], onNoteAdded }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(existingNotes);

  useEffect(() => {
    if (open) {
      setNotes(existingNotes);
      setNote("");
      setError(null);
    }
  }, [open, existingNotes]);

  const handleSubmit = async () => {
    if (!note.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await api.post(`/jobs/${jobId}/notes`, { note: note.trim() });
      const newNote = { note: note.trim(), timestamp: new Date().toISOString(), id: Date.now().toString() };
      setNotes((prev) => [newNote, ...prev]);
      setNote("");
      onNoteAdded?.(newNote);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md" title="Job Notes" icon={HiOutlineChat}>
      <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type a note..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
          />
          <button
            onClick={handleSubmit}
            disabled={!note.trim() || loading}
            className="px-4 py-2.5 bg-[#1C52AF] text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center min-w-[44px]"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <HiArrowRight size={16} />
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {notes.length === 0 && (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <HiDocumentText size={24} className="text-gray-300" />
              </div>
              <p className="text-sm text-gray-500">No notes yet</p>
            </div>
          )}
          {notes.map((n, i) => (
            <FadeIn key={n.id || i} delay={i * 60}>
              <div className="bg-gray-50 rounded-xl px-4 py-3.5 border-l-[3px] border-[#1C52AF]">
                <p className="text-sm text-gray-700 leading-relaxed">{n.note}</p>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">{fmtRelativeTime(n.timestamp)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// ─── Upload Modal ───
function UploadModal({ open, onClose, jobId, existingImages = [], onImagesUploaded }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(existingImages);

  useEffect(() => {
    if (open) {
      setUploadedImages(existingImages);
      setFiles([]);
      setPreviews([]);
      setError(null);
    }
  }, [open, existingImages]);

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;
    setFiles((prev) => [...prev, ...selected]);
    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      await api.post(`/jobs/${jobId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const newImages = previews.map((url, i) => ({ id: `local_${Date.now()}_${i}`, url, timestamp: new Date().toISOString() }));
      setUploadedImages((prev) => [...newImages, ...prev]);
      onImagesUploaded?.(newImages);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg" title="Upload Photos" icon={HiOutlinePhotograph}>
      <div className="px-5 sm:px-6 py-5 flex flex-col gap-5">
        <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl px-6 py-10 cursor-pointer hover:border-[#1C52AF] hover:bg-blue-50/20 transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <HiUpload size={28} className="text-[#1C52AF]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
          </div>
          <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
        </label>

        {previews.length > 0 && (
          <FadeIn>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Selected ({previews.length})</p>
              <div className="grid grid-cols-3 gap-2.5">
                {previews.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                    <img src={url} alt={`preview-${i}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFile(i)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <HiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                {loading ? "Uploading..." : `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </FadeIn>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <HiExclamationCircle size={16} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Uploaded</p>
            <div className="grid grid-cols-3 gap-2.5">
              {uploadedImages.map((img, i) => (
                <div
                  key={img.id || i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
                  onClick={() => window.open(img.url, "_blank")}
                >
                  <img src={img.url} alt={`uploaded-${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <HiArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── Cancel Modal ───
function CancelModal({ open, onClose, jobId, onSuccess }) {
  const [reason, setReason] = useState("");
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("reason");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelReasons = [
    "Change of plans",
    "Found a better price elsewhere",
    "Vehicle issue resolved on its own",
    "Scheduling conflict",
    "Provider not responding",
    "Other reason",
  ];

  const reset = () => {
    setReason("");
    setCustom("");
    setStep("reason");
    setError(null);
  };
  const close = () => {
    reset();
    onClose();
  };

  const doCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      const finalReason = reason === "Other reason" ? custom.trim() || "Other" : reason;
      await api.post(`/jobs/${jobId}/cancel`, { reason: finalReason });
      setStep("done");
      onSuccess?.(jobId);
      setTimeout(() => {
        reset();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Cancellation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={close} maxWidth="sm:max-w-md" title="Cancel Job" icon={HiOutlineBan}>
      {step === "done" ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <HiCheckCircle size={40} className="text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">Job Cancelled</p>
            <p className="text-sm text-gray-500 mt-1">Your job has been cancelled successfully.</p>
          </div>
        </div>
      ) : step === "confirm" ? (
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 flex items-start gap-3">
            <HiExclamationCircle size={22} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Are you sure?</p>
              <p className="text-xs text-amber-600 mt-1">This action cannot be undone and any deposit may be forfeited.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3.5">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-1">Reason</p>
            <p className="text-sm text-gray-800 font-medium">{reason === "Other reason" ? custom || "Other" : reason}</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <HiExclamationCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setStep("reason")}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              Go Back
            </button>
            <button
              onClick={doCancel}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              {loading ? "Cancelling..." : "Confirm Cancel"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
          <p className="text-sm text-gray-500">Please select a reason for cancellation:</p>
          <div className="flex flex-col gap-2">
            {cancelReasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${
                  reason === r
                    ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-semibold shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    reason === r ? "border-[#1C52AF]" : "border-gray-300"
                  }`}
                >
                  {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
                </div>
                {r}
              </button>
            ))}
          </div>
          {reason === "Other reason" && (
            <FadeIn>
              <textarea
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                rows={3}
                placeholder="Please describe your reason..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 resize-none transition-all bg-gray-50 focus:bg-white"
              />
            </FadeIn>
          )}
          <button
            onClick={() => setStep("confirm")}
            disabled={!reason || (reason === "Other reason" && !custom.trim())}
            className="w-full py-3.5 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-[0.98] transition-all mt-1"
          >
            Continue
          </button>
        </div>
      )}
    </Modal>
  );
}

// ─── Job Detail Modal ───
function JobDetailModal({ open, onClose, job }) {
  if (!job) return null;
  const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
  const provider = job.provider || {};
  const customer = job.user || {};

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg" title="Job Details" subtitle={`ID: ${job.id?.slice(0, 12)}...`} icon={HiOutlineDocumentText}>
      <div className="px-5 sm:px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${statusCfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </span>
          {job.isCompletedByProvider && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
              <HiCheckCircle size={14} /> Provider Done
            </span>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{job.description}</p>
        </div>

        {provider.id && (
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Service Provider</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C52AF] to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white shrink-0">
                {provider.firstName?.[0]}
                {provider.lastName?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {provider.firstName} {provider.lastName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{provider.email}</p>
                {provider.phone && <p className="text-xs text-gray-400">{provider.phone}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Customer</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
              {customer.firstName?.[0]}
              {customer.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{customer.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Total Amount",
              value: formatCurrency(job.totalAmount),
              icon: HiCurrencyDollar,
              color: "text-[#1C52AF]",
              bg: "bg-blue-50",
            },
            {
              label: "Scheduled",
              value: fmtDate(job.scheduledAt),
              sub: fmtTime(job.scheduledAt),
              icon: HiCalendar,
              color: "text-gray-900",
              bg: "bg-gray-50",
            },
            {
              label: "Accepted",
              value: job.acceptedAt ? fmtDate(job.acceptedAt) : "Not yet",
              sub: job.acceptedAt ? fmtTime(job.acceptedAt) : "—",
              icon: HiCheckCircle,
              color: "text-gray-600",
              bg: "bg-gray-50",
            },
            {
              label: "Vehicle",
              value: job.vehicle ? `${job.vehicle.brand} ${job.vehicle.model}` : "Not assigned",
              icon: HiTruck,
              color: "text-gray-600",
              bg: "bg-gray-50",
            },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-1.5 mb-2">
                <item.icon size={14} className={item.color} />
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{item.label}</p>
              </div>
              <p className={`text-sm font-bold ${item.color} break-words`}>{item.value}</p>
              {item.sub && <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// ─── Service Card (Mobile-First, No Chat/Call Buttons) ───
function ServiceCard({ job, index, onCancel, onViewDetail, onViewTimeline, onAddNote, onUploadImage, onPayNow, payingJobId }) {
  const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
  const StatusIcon = statusCfg.icon;
  const provider = job.provider || {};
  const isPending = job.status === "PENDING";
  const isAccepted = job.status === "ACCEPTED";
  const isInProgress = job.status === "IN_PROGRESS";
  const isCompleted = job.status === "COMPLETED";
  const isCancelled = job.status === "CANCELLED";
  const canCancel = isPending || isAccepted;
  const canInteract = !isCompleted && !isCancelled;
  const isPaying = payingJobId === job.id;

  return (
    <FadeIn delay={index * 80}>
      <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border ${statusCfg.badge}`}>
                  <StatusIcon size={12} className="sm:w-[13px] sm:h-[13px]" />
                  {statusCfg.label}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-mono">{job.id?.slice(0, 8)}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">{job.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{job.description}</p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-xl sm:text-2xl font-bold text-[#1C52AF] tracking-tight">{formatCurrency(job.totalAmount)}</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 font-medium">
                {isCompleted ? "Paid" : isCancelled ? "Refunded" : "Estimated"}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Bar */}
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-3 border border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                <HiCalendar size={14} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Date</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">{fmtDate(job.scheduledAt)}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200 mx-4" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                <HiClock size={14} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Time</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">{fmtTime(job.scheduledAt)}</p>
              </div>
            </div>
            {job.acceptedAt && (
              <>
                <div className="hidden sm:block w-px h-8 bg-gray-200 mx-4" />
                <div className="hidden sm:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <HiCheckCircle size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Accepted</p>
                    <p className="text-sm font-semibold text-gray-800">{fmtRelativeTime(job.acceptedAt)}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Provider Section - Clean, no buttons */}
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          {provider.id ? (
            <div className="flex items-center gap-3 bg-gray-50/60 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-100">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#1C52AF] to-blue-400 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm ring-2 ring-white shrink-0">
                {provider.firstName?.[0]}
                {provider.lastName?.[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Service Provider</p>
                <p className="text-sm font-bold text-gray-900 truncate">
                  {provider.firstName} {provider.lastName}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-3 sm:px-4 sm:py-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <HiClock size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-amber-800">Awaiting Provider Assignment</p>
                <p className="text-xs text-amber-600 mt-0.5">Matching you with the best available provider...</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          {canInteract ? (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-gray-100">
              <ActionButton onClick={() => onViewDetail(job)} icon={HiOutlineDocumentText} label="Details" />
              <ActionButton onClick={() => onViewTimeline(job.id)} icon={HiOutlineClock} label="Timeline" />
              <ActionButton onClick={() => onAddNote(job.id)} icon={HiOutlineChat} label="Notes" />
              <ActionButton onClick={() => onUploadImage(job.id)} icon={HiOutlinePhotograph} label="Photos" />
              {canCancel && (
                <button
                  onClick={() => onCancel(job)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all ml-auto"
                >
                  <HiOutlineBan size={13} /> Cancel
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => onViewDetail(job)}
                className="flex-1 py-2.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center"
              >
                View Details
              </button>
              <button
                onClick={() => onViewTimeline(job.id)}
                className="flex-1 py-2.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center"
              >
                Timeline
              </button>
              {isCompleted && !job.isPaid && (
                <button
                  onClick={() => onPayNow?.(job)}
                  disabled={isPaying}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 active:scale-95 transition-all text-center disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isPaying ? (
                    <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <HiCurrencyDollar size={14} />
                  )}
                  {isPaying ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function ActionButton({ onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
    >
      <Icon size={13} className="sm:w-[14px] sm:h-[14px]" /> {label}
    </button>
  );
}

// ─── Skeleton Card ───
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden animate-pulse">
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-5 w-28 bg-gray-100 rounded-lg" />
            <div className="h-6 sm:h-7 w-3/4 bg-gray-100 rounded-lg" />
            <div className="h-4 w-full bg-gray-100 rounded-lg" />
          </div>
          <div className="h-8 sm:h-10 w-24 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-14 sm:h-16 bg-gray-100 rounded-xl" />
        <div className="flex items-center gap-3">
          <div className="w-9 sm:w-11 h-9 sm:h-11 bg-gray-100 rounded-full" />
          <div className="h-4 w-32 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-9 sm:h-10 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Stats Bar ───
// function StatsBar({ jobs }) {
//   const total = jobs.length;
//   const active = jobs.filter((b) => ["ACCEPTED", "IN_PROGRESS", "REVIEWING"].includes(b.status)).length;
//   const scheduled = jobs.filter((b) => b.status === "PENDING").length;
//   const completed = jobs.filter((b) => b.status === "COMPLETED").length;
//   const cancelled = jobs.filter((b) => b.status === "CANCELLED").length;
//   const totalSpent = jobs.filter((b) => b.status !== "CANCELLED").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

//   const stats = [
//     { label: "Total", value: total, color: "text-[#1C52AF]", bg: "bg-blue-50", border: "border-blue-200", icon: HiClipboardList },
//     { label: "Active", value: active, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: HiRefresh },
//     { label: "Scheduled", value: scheduled, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: HiClock },
//     { label: "Completed", value: completed, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: HiCheckCircle },
//     { label: "Cancelled", value: cancelled, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: HiBan },
//     { label: "Spent", value: formatCurrency(totalSpent), color: "text-gray-800", bg: "bg-gray-50", border: "border-gray-200", icon: HiCurrencyDollar },
//   ];

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
//       {stats.map((stat) => (
//         <div
//           key={stat.label}
//           className={`${stat.bg} border ${stat.border} rounded-xl px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-1.5 sm:gap-2 transition-all hover:shadow-md`}
//         >
//           <div className="flex items-center justify-between">
//             <stat.icon size={16} className={`${stat.color} sm:w-[18px] sm:h-[18px]`} />
//             <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</p>
//           </div>
//           <p className={`text-xl sm:text-2xl font-bold ${stat.color} tracking-tight`}>{stat.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


// ─── Stats Bar ───
function StatsBar({ jobs }) {
  const total = jobs.length;
  const completed = jobs.filter((b) => b.status === "COMPLETED").length;
  const totalSpent = jobs.filter((b) => b.status !== "CANCELLED").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const stats = [
    {
      label: "Total Bookings",
      value: total,
      sublabel: "All time services",
      icon: HiClipboardList,
      gradient: "from-blue-600 to-blue-400",
      bg: "bg-white",
      ring: "ring-blue-100",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-gray-900",
      barColor: "bg-blue-500",
    },
    {
      label: "Completed",
      value: completed,
      sublabel: "Successfully done",
      icon: HiCheckCircle,
      gradient: "from-emerald-600 to-emerald-400",
      bg: "bg-white",
      ring: "ring-emerald-100",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-gray-900",
      barColor: "bg-emerald-500",
    },
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      sublabel: "Lifetime spending",
      icon: HiCurrencyDollar,
      gradient: "from-violet-600 to-violet-400",
      bg: "bg-white",
      ring: "ring-violet-100",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      valueColor: "text-gray-900",
      barColor: "bg-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 100}>
          <div
            className={`relative overflow-hidden rounded-2xl ${stat.bg} border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group ${stat.ring} hover:ring-2`}
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient}`} />

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className={`text-2xl sm:text-3xl font-bold ${stat.valueColor} mt-2 tracking-tight`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {stat.sublabel}
                  </p>
                </div>
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon size={22} className={`${stat.iconColor}`} />
                </div>
              </div>

              {/* Progress bar decoration */}
          
              <div
                className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-2xl`}
              />
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ─── Empty State ───
function EmptyState({ tab }) {
  const messages = {
    active: { title: "No active jobs", desc: "Your ongoing service jobs will appear here once a provider accepts them.", icon: HiRefresh },
    scheduled: { title: "No scheduled jobs", desc: "Create a new booking to see it here.", icon: HiCalendar },
    completed: { title: "No completed jobs", desc: "Your service history will build up over time.", icon: HiCheckCircle },
    cancelled: { title: "No cancelled jobs", desc: "Cancelled bookings will appear here.", icon: HiBan },
  };
  const msg = messages[tab] || messages.active;
  const Icon = msg.icon;
  return (
    <FadeIn>
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-16 sm:py-20 flex flex-col items-center gap-4 sm:gap-5 text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
          <Icon size={32} className="text-gray-300 sm:w-9 sm:h-9" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold text-gray-900">{msg.title}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">{msg.desc}</p>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Tab Button ───
function TabButton({ tab, activeTab, onClick, count }) {
  const isActive = activeTab === tab.key;
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all relative ${
        isActive
          ? "bg-[#1C52AF] text-white shadow-lg shadow-blue-200/50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      {tab.label}
      <span
        className={`text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full transition-all ${
          isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        {count}
      </span>
      {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1C52AF]" />}
    </button>
  );
}

// ─── Pagination ───
function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-200">
      <p className="text-xs text-gray-500 font-medium">
        Showing <span className="text-gray-900 font-semibold">{start}</span>–<span className="text-gray-900 font-semibold">{end}</span> of <span className="text-gray-900 font-semibold">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-white transition-all flex items-center justify-center"
        >
          <HiChevronLeft size={16} />
        </button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all ${
                page === currentPage
                  ? "bg-[#1C52AF] text-white shadow-md shadow-blue-200/50"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-white transition-all flex items-center justify-center"
        >
          <HiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Toast ───
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-[#1C52AF] text-white",
  };

  return (
    <FadeIn className="fixed top-4 right-4 z-[60] max-w-[90vw] sm:max-w-none">
      <div className={`${styles[type]} px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-xl shadow-black/10 flex items-center gap-3`}>
        {type === "success" ? <HiCheckCircle size={20} /> : <HiExclamationCircle size={20} />}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </FadeIn>
  );
}

// ─── Constants ───
const TABS = [
  { key: "active", label: "Active", statuses: ["ACCEPTED", "IN_PROGRESS", "REVIEWING"] },
  { key: "scheduled", label: "Scheduled", statuses: ["PENDING"] },
  { key: "completed", label: "Completed", statuses: ["COMPLETED"] },
  { key: "cancelled", label: "Cancelled", statuses: ["CANCELLED"] },
];

const ITEMS_PER_PAGE = 5;

// ==================== MAIN COMPONENT ====================

const ActiveServices = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [payingJobId, setPayingJobId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  const [detailModal, setDetailModal] = useState({ open: false, job: null });
  const [timelineModal, setTimelineModal] = useState({ open: false, jobId: null });
  const [cancelModal, setCancelModal] = useState({ open: false, jobId: null });
  const [notesModal, setNotesModal] = useState({ open: false, jobId: null, notes: [] });
  const [uploadModal, setUploadModal] = useState({ open: false, jobId: null, images: [] });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/jobs");
      const data = res.data?.data || res.data || [];
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load jobs. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const switchTab = (key) => {
    if (key === activeTab) return;
    setAnimating(true);
    setCurrentPage(1);
    setTimeout(() => {
      setActiveTab(key);
      setAnimating(false);
    }, 150);
  };

  const handleCancelSuccess = (jobId) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "CANCELLED" } : j)));
    showToast("Job cancelled successfully");
  };

  const handleNoteAdded = (jobId, note) => {
    setJobs((prev) => prev.map((j) => (j.id !== jobId ? j : { ...j, notes: [...(j.notes || []), note] })));
  };

  const handleImagesUploaded = (jobId, images) => {
    setJobs((prev) => prev.map((j) => (j.id !== jobId ? j : { ...j, images: [...(j.images || []), ...images] })));
  };

  const handlePayNow = useCallback(
    async (job) => {
      setPayingJobId(job.id);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const payload = {
          jobId: job.id,
          amount: job.totalAmount,
          email: user.email || "customer@example.com",
          callbackUrl: `${window.location.origin}/payment?jobId=${job.id}`,
          metadata: { source: "mobile_app", jobTitle: job.title, jobId: job.id, customerId: user.id },
        };
        const res = await api.post("/payments/initialize", payload);
        const authUrl =
          res.data?.data?.authorizationUrl ||
          res.data?.data?.authorization_url ||
          res.data?.authorizationUrl ||
          res.data?.authorization_url ||
          res.data?.data?.url ||
          res.data?.url;
        const reference = res.data?.data?.reference || res.data?.reference;
        if (!authUrl) throw new Error("No payment URL received");
        if (reference) {
          localStorage.setItem("paystack_pending_reference", reference);
          localStorage.setItem("paystack_pending_jobId", job.id);
        }
        window.location.href = authUrl;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "Payment failed";
        setError(msg);
        showToast(msg, "error");
      } finally {
        setPayingJobId(null);
      }
    },
    [showToast]
  );

  const tabConfig = TABS.find((t) => t.key === activeTab);
  let filtered = tabConfig?.statuses ? jobs.filter((j) => tabConfig.statuses.includes(j.status)) : jobs;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.title?.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q) ||
        j.provider?.firstName?.toLowerCase().includes(q) ||
        j.provider?.lastName?.toLowerCase().includes(q) ||
        j.id?.toLowerCase().includes(q)
    );
  }
  if (statusFilter) filtered = filtered.filter((j) => j.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const countFor = (tab) => (tab.statuses ? jobs.filter((j) => tab.statuses.includes(j.status)).length : jobs.length);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      
<div className=" sticky top-0 z-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">My Services</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Track and manage your vehicle maintenance bookings</p>
      </div>
      
      {/* Search + Refresh inline on the right */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial sm:w-64 lg:w-80">
          <HiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, providers..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <HiX size={14} />
            </button>
          )}
        </div>
        <button
          onClick={fetchJobs}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 active:scale-95 transition-all shrink-0"
        >
          <HiRefresh size={14} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6">
        {/* Stats */}
        {!loading && jobs.length > 0 && <StatsBar jobs={jobs} />}

        {/* Search & Filter */}
        {!loading && jobs.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <HiSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, providers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-white"
              />
            </div>
            <div className="relative">
              <HiFilter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none cursor-pointer min-w-[140px] sm:min-w-[160px] w-full sm:w-auto"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEWING">Reviewing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100/80 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl w-full overflow-x-auto backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-1 sm:w-fit">
          {TABS.map((tab) => (
            <TabButton key={tab.key} tab={tab} activeTab={activeTab} onClick={() => switchTab(tab.key)} count={countFor(tab)} />
          ))}
        </div>

        {/* Error */}
        {error && (
          <FadeIn>
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3">
              <HiExclamationCircle size={22} className="text-red-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-700">Error loading jobs</p>
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
              </div>
              <button onClick={fetchJobs} className="shrink-0 px-3 sm:px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-all">
                Retry
              </button>
            </div>
          </FadeIn>
        )}

        {/* Job List */}
        <div
          className="flex flex-col gap-4 sm:gap-5"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {loading && [0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          {!loading && !error && filtered.length === 0 && <EmptyState tab={activeTab} />}
          {!loading &&
            !error &&
            paginatedJobs.map((job, i) => (
              <ServiceCard
                key={job.id}
                job={job}
                index={i}
                payingJobId={payingJobId}
                onCancel={(j) => setCancelModal({ open: true, jobId: j.id })}
                onViewDetail={(j) => setDetailModal({ open: true, job: j })}
                onViewTimeline={(id) => setTimelineModal({ open: true, jobId: id })}
                onAddNote={(id) => setNotesModal({ open: true, jobId: id, notes: job.notes || [] })}
                onUploadImage={(id) => setUploadModal({ open: true, jobId: id, images: job.images || [] })}
                onPayNow={handlePayNow}
              />
            ))}
        </div>

        {/* Pagination */}
        {!loading && !error && filtered.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modals */}
      <JobDetailModal open={detailModal.open} job={detailModal.job} onClose={() => setDetailModal({ open: false, job: null })} />
      <TimelineModal open={timelineModal.open} jobId={timelineModal.jobId} onClose={() => setTimelineModal({ open: false, jobId: null })} />
      <CancelModal open={cancelModal.open} jobId={cancelModal.jobId} onClose={() => setCancelModal({ open: false, jobId: null })} onSuccess={handleCancelSuccess} />
      <NotesModal
        open={notesModal.open}
        jobId={notesModal.jobId}
        existingNotes={notesModal.notes}
        onClose={() => setNotesModal({ open: false, jobId: null, notes: [] })}
        onNoteAdded={(note) => handleNoteAdded(notesModal.jobId, note)}
      />
      <UploadModal
        open={uploadModal.open}
        jobId={uploadModal.jobId}
        existingImages={uploadModal.images}
        onClose={() => setUploadModal({ open: false, jobId: null, images: [] })}
        onImagesUploaded={(imgs) => handleImagesUploaded(uploadModal.jobId, imgs)}
      />
    </div>
  );
};

export default ActiveServices;









