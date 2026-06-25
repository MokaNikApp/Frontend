import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiCheckCircle, HiClock, HiCalendar, HiX, HiChatAlt2, HiPhone,
  HiShieldCheck, HiExclamationCircle, HiRefresh, HiArrowRight,
  HiPhotograph, HiDocumentText, HiUpload, HiClipboardList,
  HiCurrencyDollar, HiInformationCircle, HiBan, HiAnnotation,
  HiChevronRight, HiChevronLeft, HiSearch, HiFilter,
} from "react-icons/hi";
import api from "../../api/axios";

const STATUS_MAP = {
  PENDING: { label: "PENDING", badgeColor: "bg-orange-100 text-orange-700", icon: HiClock },
  ACCEPTED: { label: "ACCEPTED", badgeColor: "bg-blue-100 text-blue-700", icon: HiCheckCircle },
  IN_PROGRESS: { label: "IN PROGRESS", badgeColor: "bg-indigo-100 text-indigo-700", icon: HiRefresh },
  COMPLETED: { label: "COMPLETED", badgeColor: "bg-emerald-100 text-emerald-700", icon: HiCheckCircle },
  CANCELLED: { label: "CANCELLED", badgeColor: "bg-red-100 text-red-600", icon: HiBan },
  REVIEWING: { label: "REVIEWING", badgeColor: "bg-purple-100 text-purple-700", icon: HiShieldCheck },
};

function fmtDate(iso) {
  if (!iso) return "Not scheduled";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Not scheduled";
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
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
  return fmtDate(iso);
}

function formatCurrency(amount) {
  if (amount == null) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / 100);
}

function AnimatedCard({ children, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, children, maxWidth = "sm:max-w-lg" }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`bg-white w-full ${maxWidth} sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden`} style={{ animation: "modalIn 0.3s cubic-bezier(0.34,1.4,0.64,1)", maxHeight: "90vh" }}>
        {children}
      </div>
      <style>{`
        @keyframes modalIn { from{opacity:0;transform:translateY(40px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

function TimelineModal({ open, onClose, jobId }) {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !jobId) return;
    const fetchTimeline = async () => {
      setLoading(true); setError(null);
      try {
        const res = await api.get(`/jobs/${jobId}/timeline`);
        setTimeline(res.data?.data || res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load timeline");
      } finally { setLoading(false); }
    };
    fetchTimeline();
  }, [open, jobId]);

  const getStatusIcon = (status) => {
    const cfg = STATUS_MAP[status] || STATUS_MAP.PENDING;
    const Icon = cfg.icon;
    return <Icon size={18} className={cfg.badgeColor.replace("bg-", "text-").split(" ")[0]} />;
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiClock size={20} className="text-[#1C52AF]" />
          <p className="font-semibold text-gray-800 text-sm">Job Timeline</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
      </div>
      <div className="px-5 py-5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
        {loading && (
          <div className="flex flex-col gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5 py-1">
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <HiExclamationCircle size={18} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && timeline.length === 0 && (
          <div className="text-center py-8">
            <HiClipboardList size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No timeline events yet</p>
          </div>
        )}
        {!loading && !error && timeline.length > 0 && (
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100" />
            <div className="flex flex-col gap-0">
              {timeline.map((event, i) => (
                <div key={i} className="relative flex gap-3 pb-6 last:pb-0" style={{ animation: "fadeSlide 0.3s ease", animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${STATUS_MAP[event.status]?.badgeColor?.split(" ")[0] || "bg-gray-100"}`}>
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-gray-800">{event.event}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_MAP[event.status]?.badgeColor || "bg-gray-100 text-gray-600"}`}>
                        {event.status}
                      </span>
                      {event.timestamp && (
                        <span className="text-xs text-gray-400">{fmtRelativeTime(event.timestamp)} &middot; {fmtDate(event.timestamp)} {fmtTime(event.timestamp)}</span>
                      )}
                    </div>
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

function NotesModal({ open, onClose, jobId, existingNotes = [], onNoteAdded }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(existingNotes);

  useEffect(() => {
    if (open) { setNotes(existingNotes); setNote(""); setError(null); }
  }, [open, existingNotes]);

  const handleSubmit = async () => {
    if (!note.trim()) return;
    setLoading(true); setError(null);
    try {
      await api.post(`/jobs/${jobId}/notes`, { note: note.trim() });
      const newNote = { note: note.trim(), timestamp: new Date().toISOString(), id: Date.now().toString() };
      setNotes(prev => [newNote, ...prev]);
      setNote("");
      onNoteAdded?.(newNote);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add note");
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiAnnotation size={20} className="text-[#1C52AF]" />
          <p className="font-semibold text-gray-800 text-sm">Job Notes</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
        <div className="flex gap-2">
          <input type="text" value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Add a note..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all" />
          <button onClick={handleSubmit} disabled={!note.trim() || loading}
            className="px-4 py-2.5 bg-[#1C52AF] text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95 flex items-center gap-1.5">
            {loading ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} /> : <HiArrowRight size={16} />}
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
            <div className="text-center py-6">
              <HiDocumentText size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No notes yet. Add one above.</p>
            </div>
          )}
          {notes.map((n, i) => (
            <div key={n.id || i} className="bg-gray-50 rounded-xl px-4 py-3 border-l-4 border-[#1C52AF]" style={{ animation: "fadeSlide 0.25s ease", animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <p className="text-sm text-gray-700">{n.note}</p>
              <p className="text-[11px] text-gray-400 mt-1.5">{fmtRelativeTime(n.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function UploadModal({ open, onClose, jobId, existingImages = [], onImagesUploaded }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(existingImages);

  useEffect(() => {
    if (open) { setUploadedImages(existingImages); setFiles([]); setPreviews([]); setError(null); }
  }, [open, existingImages]);

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;
    setFiles(prev => [...prev, ...selected]);
    const newPreviews = selected.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append("images", file));
      await api.post(`/jobs/${jobId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const newImages = previews.map((url, i) => ({ id: `local_${Date.now()}_${i}`, url, timestamp: new Date().toISOString() }));
      setUploadedImages(prev => [...newImages, ...prev]);
      onImagesUploaded?.(newImages);
      setFiles([]); setPreviews([]);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiPhotograph size={20} className="text-[#1C52AF]" />
          <p className="font-semibold text-gray-800 text-sm">Upload Images</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "65vh" }}>
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-6 py-8 cursor-pointer hover:border-[#1C52AF] hover:bg-blue-50/30 transition-all group">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <HiUpload size={24} className="text-[#1C52AF]" />
          </div>
          <p className="text-sm font-medium text-gray-600">Click to upload images</p>
          <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
          <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
        </label>

        {previews.length > 0 && (
          <div style={{ animation: "fadeSlide 0.25s ease" }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Selected ({previews.length})</p>
            <div className="grid grid-cols-3 gap-2">
              {previews.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                  <img src={url} alt={`preview-${i}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeFile(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all">
                    <HiX size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleUpload} disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
              {loading ? "Uploading…" : `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`}
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Uploaded Images</p>
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.map((img, i) => (
                <div key={img.id || i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => window.open(img.url, "_blank")}>
                  <img src={img.url} alt={`uploaded-${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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

function CancelModal({ open, onClose, jobId, onSuccess }) {
  const [reason, setReason] = useState("");
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("reason");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelReasons = [
    "Change of plans", "Found a better price elsewhere", "Vehicle issue resolved on its own",
    "Scheduling conflict", "Provider not responding", "Other reason"
  ];

  const reset = () => { setReason(""); setCustom(""); setStep("reason"); setError(null); };
  const close = () => { reset(); onClose(); };

  const doCancel = async () => {
    setLoading(true); setError(null);
    try {
      const finalReason = reason === "Other reason" ? (custom.trim() || "Other") : reason;
      await api.post(`/jobs/${jobId}/cancel`, { reason: finalReason });
      setStep("done");
      onSuccess?.(jobId);
      setTimeout(() => { reset(); onClose(); }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Cancellation failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={close} maxWidth="sm:max-w-md">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiBan size={20} className="text-red-500" />
          <p className="font-semibold text-gray-800 text-sm">Cancel Job</p>
        </div>
        <button onClick={close} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
      </div>
      {step === "done" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 px-4" style={{ animation: "fadeSlide 0.3s ease" }}>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"><HiCheckCircle size={36} className="text-red-500" /></div>
          <p className="text-base font-semibold text-gray-800">Job Cancelled</p>
          <p className="text-sm text-gray-500 text-center">The job has been cancelled successfully.</p>
        </div>
      ) : step === "confirm" ? (
        <div className="px-5 py-4 flex flex-col gap-4" style={{ animation: "fadeSlide 0.25s ease" }}>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <HiExclamationCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-700">Are you sure?</p>
              <p className="text-xs text-red-400 mt-1">This action cannot be undone.</p>
            </div>
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
            <button onClick={() => setStep("reason")} disabled={loading} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">Go Back</button>
            <button onClick={doCancel} disabled={loading} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
              {loading ? "Cancelling…" : "Yes, Cancel"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-5 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          <p className="text-sm text-gray-500">Why are you cancelling this job?</p>
          <div className="flex flex-col gap-2">
            {cancelReasons.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${reason === r ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${reason === r ? "border-[#1C52AF]" : "border-gray-300"}`}>
                  {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
                </div>
                {r}
              </button>
            ))}
          </div>
          {reason === "Other reason" && (
            <textarea value={custom} onChange={e => setCustom(e.target.value)} rows={3} placeholder="Please describe your reason…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] resize-none transition-colors" style={{ animation: "fadeSlide 0.2s ease" }} />
          )}
          <button onClick={() => setStep("confirm")} disabled={!reason || (reason === "Other reason" && !custom.trim())}
            className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-95 transition-all mt-1">Continue</button>
        </div>
      )}
    </Modal>
  );
}

function JobDetailModal({ open, onClose, job }) {
  if (!job) return null;
  const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
  const provider = job.provider || {};
  const customer = job.user || {};

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800 text-sm">Job Details</p>
          <p className="text-xs text-gray-400 mt-0.5">{job.id?.slice(0, 8)}...</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
      </div>
      <div className="px-5 py-5 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
        <div className="flex items-center justify-between">
          <span className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${statusCfg.badgeColor}`}>
            {statusCfg.label}
          </span>
          {job.isCompletedByProvider && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <HiCheck size={14} /> Completed by provider
            </span>
          )}
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{job.title}</p>
          <p className="text-sm text-gray-500 mt-1">{job.description}</p>
        </div>
        {provider.id && (
          <div className="bg-gray-50 rounded-xl px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C52AF] flex items-center justify-center text-white font-bold text-sm">
                {provider.firstName?.[0]}{provider.lastName?.[0]}
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Service Provider</p>
                <p className="text-sm font-bold text-gray-800">{provider.firstName} {provider.lastName}</p>
                <p className="text-xs text-gray-500">{provider.email}</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all">
              <HiChatAlt2 size={14} /> Message
            </button>
          </div>
        )}
        <div className="bg-gray-50 rounded-xl px-4 py-3.5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Customer</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
              {customer.firstName?.[0]}{customer.lastName?.[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{customer.firstName} {customer.lastName}</p>
              <p className="text-xs text-gray-500">{customer.email}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl px-3 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <HiCurrencyDollar size={14} className="text-[#1C52AF]" />
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Amount</p>
            </div>
            <p className="text-lg font-bold text-[#1C52AF]">{formatCurrency(job.totalAmount)}</p>
          </div>
          <div className="bg-blue-50 rounded-xl px-3 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <HiCalendar size={14} className="text-[#1C52AF]" />
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Scheduled</p>
            </div>
            <p className="text-sm font-bold text-gray-800">{fmtDate(job.scheduledAt)}</p>
            <p className="text-xs text-[#1C52AF]">{fmtTime(job.scheduledAt)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <HiCheckCircle size={14} className="text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Accepted</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">{job.acceptedAt ? fmtDate(job.acceptedAt) : "Not yet"}</p>
            <p className="text-xs text-gray-500">{job.acceptedAt ? fmtTime(job.acceptedAt) : "—"}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <HiInformationCircle size={14} className="text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Job ID</p>
            </div>
            <p className="text-xs font-mono text-gray-600 truncate">{job.id}</p>
          </div>
        </div>
        {job.providerProfileId && (
          <div className="bg-gray-50 rounded-xl px-4 py-3 border-l-4 border-[#1C52AF]">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Provider Profile</p>
            <p className="text-xs font-mono text-gray-600 mt-0.5">{job.providerProfileId}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ServiceCard({ job, index, onReschedule, onCancel, onViewDetail, onViewTimeline, onAddNote, onUploadImage, onPayNow, payingJobId }) {
  const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
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
    <AnimatedCard index={index}>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusCfg.badgeColor}`}>
                  {statusCfg.label}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">{job.id?.slice(0, 8)}...</span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight truncate">{job.title}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-bold text-[#1C52AF]">{formatCurrency(job.totalAmount)}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{isCompleted ? "Paid" : isCancelled ? "Refunded" : "Total"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <HiCalendar size={16} className="text-[#1C52AF]" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Scheduled</p>
                <p className="text-sm font-semibold text-gray-800">{fmtDate(job.scheduledAt)}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-2">
              <HiClock size={16} className="text-[#1C52AF]" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Time</p>
                <p className="text-sm font-semibold text-gray-800">{fmtTime(job.scheduledAt)}</p>
              </div>
            </div>
            {job.acceptedAt && (
              <>
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2">
                  <HiCheckCircle size={16} className="text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Accepted</p>
                    <p className="text-sm font-semibold text-gray-800">{fmtRelativeTime(job.acceptedAt)}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {provider.id ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C52AF] to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                  {provider.firstName?.[0]}{provider.lastName?.[0]}
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Provider</p>
                  <p className="text-sm font-bold text-gray-800">{provider.firstName} {provider.lastName}</p>
                  <p className="text-xs text-gray-500">{provider.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isCompleted && (
                  <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition-all">
                    <HiChatAlt2 size={14} /> Chat
                  </button>
                )}
                {!isCompleted && (
                  <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
                    <HiPhone size={14} /> Call
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <HiClock size={18} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-700">Awaiting Provider Assignment</p>
                <p className="text-xs text-amber-600">We are matching you with the best available provider.</p>
              </div>
            </div>
          )}

          {canInteract && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => onViewDetail(job)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
                <HiDocumentText size={14} /> Details
              </button>
              <button onClick={() => onViewTimeline(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
                <HiClock size={14} /> Timeline
              </button>
              <button onClick={() => onAddNote(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
                <HiAnnotation size={14} /> Notes
              </button>
              <button onClick={() => onUploadImage(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
                <HiPhotograph size={14} /> Photos
              </button>
              {canCancel && (
                <button onClick={() => onCancel(job)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all ml-auto">
                  <HiBan size={14} /> Cancel
                </button>
              )}
            </div>
          )}
          {(isCompleted || isCancelled) && (
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => onViewDetail(job)} className="flex-1 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center">
                View Details
              </button>
              <button onClick={() => onViewTimeline(job.id)} className="flex-1 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center">
                View Timeline
              </button>
              {isCompleted && !job.isPaid && (
                <button onClick={() => onPayNow?.(job)} disabled={isPaying}
                  className="flex-1 py-2 text-xs text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 active:scale-95 transition-all text-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5">
                  {isPaying ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />
                      Loading...
                    </>
                  ) : (
                    <>
                      <HiCurrencyDollar size={14} />
                      Pay Now
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-5 w-24 bg-gray-100 rounded" />
            <div className="h-6 w-3/4 bg-gray-100 rounded mt-1" />
            <div className="h-4 w-full bg-gray-100 rounded" />
          </div>
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-14 bg-gray-100 rounded-xl" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
          <div className="h-8 w-24 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-9 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

function StatsBar({ jobs }) {
  const total = jobs.length;
  const active = jobs.filter(b => ["ACCEPTED", "IN_PROGRESS", "REVIEWING"].includes(b.status)).length;
  const scheduled = jobs.filter(b => b.status === "PENDING").length;
  const completed = jobs.filter(b => b.status === "COMPLETED").length;
  const cancelled = jobs.filter(b => b.status === "CANCELLED").length;
  const totalSpent = jobs.filter(b => b.status !== "CANCELLED").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {[
        { label: "Total Jobs", value: total, color: "text-[#1C52AF]", bg: "bg-blue-50", icon: HiClipboardList },
        { label: "Active", value: active, color: "text-blue-600", bg: "bg-blue-50", icon: HiRefresh },
        { label: "Scheduled", value: scheduled, color: "text-amber-600", bg: "bg-amber-50", icon: HiClock },
        { label: "Completed", value: completed, color: "text-emerald-600", bg: "bg-emerald-50", icon: HiCheckCircle },
        { label: "Cancelled", value: cancelled, color: "text-red-600", bg: "bg-red-50", icon: HiBan },
        { label: "Total Spent", value: formatCurrency(totalSpent), color: "text-gray-800", bg: "bg-gray-50", icon: HiCurrencyDollar },
      ].map(stat => (
        <div key={stat.label} className={`${stat.bg} rounded-xl px-4 py-3 flex flex-col gap-1.5`}>
          <div className="flex items-center gap-1.5">
            <stat.icon size={14} className={stat.color} />
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</p>
          </div>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ tab }) {
  const messages = {
    active: { title: "No active jobs", desc: "Your ongoing service jobs will appear here.", icon: HiRefresh },
    scheduled: { title: "No scheduled jobs", desc: "Upcoming appointments will show up here.", icon: HiCalendar },
    completed: { title: "No completed jobs", desc: "Your service history will appear here.", icon: HiCheckCircle },
    cancelled: { title: "No cancelled jobs", desc: "Cancelled bookings will appear here.", icon: HiBan },
  };
  const msg = messages[tab] || messages.active;
  const Icon = msg.icon;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-20 flex flex-col items-center gap-4 text-center" style={{ animation: "fadeSlide 0.4s ease" }}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon size={32} className="text-gray-300" />
      </div>
      <p className="text-lg font-semibold text-gray-500">{msg.title}</p>
      <p className="text-sm text-gray-400 max-w-sm">{msg.desc}</p>
    </div>
  );
}

const TABS = [
  { key: "active", label: "Active", statuses: ["ACCEPTED", "IN_PROGRESS", "REVIEWING"] },
  { key: "scheduled", label: "Scheduled", statuses: ["PENDING"] },
  { key: "completed", label: "Completed", statuses: ["COMPLETED"] },
  { key: "cancelled", label: "Cancelled", statuses: ["CANCELLED"] },
];

const ITEMS_PER_PAGE = 5;

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

  const [detailModal, setDetailModal] = useState({ open: false, job: null });
  const [timelineModal, setTimelineModal] = useState({ open: false, jobId: null });
  const [cancelModal, setCancelModal] = useState({ open: false, jobId: null });
  const [notesModal, setNotesModal] = useState({ open: false, jobId: null, notes: [] });
  const [uploadModal, setUploadModal] = useState({ open: false, jobId: null, images: [] });

  const fetchJobs = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await api.get("/jobs");
      const data = res.data?.data || res.data || [];
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load jobs. Please try again.");
      setJobs([]);
    } finally { setLoading(false); }
  }, []);

  const fetchJobsByStatus = useCallback(async (status) => {
    setLoading(true); setError(null);
    try {
      const res = await api.get(`/jobs/status/${status}`);
      const data = res.data?.data || res.data || [];
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to load ${status} jobs.`);
      setJobs([]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const switchTab = (key) => {
    if (key === activeTab) return;
    setAnimating(true); setCurrentPage(1);
    setTimeout(() => { setActiveTab(key); setAnimating(false); }, 150);
  };

  const handleCancelSuccess = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: "CANCELLED" } : j));
  };

  const handleNoteAdded = (jobId, note) => {
    setJobs(prev => prev.map(j => j.id !== jobId ? j : { ...j, notes: [...(j.notes || []), note] }));
  };

  const handleImagesUploaded = (jobId, images) => {
    setJobs(prev => prev.map(j => j.id !== jobId ? j : { ...j, images: [...(j.images || []), ...images] }));
  };

  
const handlePayNow = async (job) => {
  setPayingJobId(job.id);
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // get user if stored
    
    const payload = {
      jobId: job.id,
      metadata: {
        source: "mobile_app",
        jobTitle: job.title,
      },
      // Try adding these one by one if the above fails
      amount: job.totalAmount,
      email: user.email || "customer@example.com",
    };
    
    console.log("Sending payload:", payload);
    const res = await api.post("/payments/initialize", payload);
    console.log("Success:", res.data);

    const authUrl = res.data?.data?.authorization_url || res.data?.authorization_url;
    if (!authUrl) throw new Error("No payment URL received");

    const reference = res.data?.data?.reference || res.data?.reference;
    if (reference) {
      localStorage.setItem("paystack_pending_reference", reference);
      localStorage.setItem("paystack_pending_jobId", job.id);
    }

    window.location.href = authUrl;

  } catch (err) {
    console.error("Backend error:", err.response?.data);
    const msg = err.response?.data?.message || err.response?.data?.error || "Payment failed";
    setError(msg);
    setTimeout(() => setError(null), 5000);
  } finally {
    setPayingJobId(null);
  }
};

  const tabConfig = TABS.find(t => t.key === activeTab);
  let filtered = tabConfig?.statuses ? jobs.filter(j => tabConfig.statuses.includes(j.status)) : jobs;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(j =>
      (j.title?.toLowerCase().includes(q)) ||
      (j.description?.toLowerCase().includes(q)) ||
      (j.provider?.firstName?.toLowerCase().includes(q)) ||
      (j.provider?.lastName?.toLowerCase().includes(q)) ||
      (j.id?.toLowerCase().includes(q))
    );
  }

  if (statusFilter) filtered = filtered.filter(j => j.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const countFor = (tab) => tab.statuses ? jobs.filter(j => tab.statuses.includes(j.status)).length : jobs.length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">My Services</h1>
            <p className="text-base text-gray-500 mt-1">Real-time tracking of your ongoing vehicle maintenance and repairs.</p>
          </div>
          <button onClick={fetchJobs} className="self-start flex items-center gap-2 px-4 py-2.5 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all active:scale-95">
            <HiRefresh size={16} /> Refresh
          </button>
        </div>

        {!loading && jobs.length > 0 && <StatsBar jobs={jobs} />}

        {!loading && jobs.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <HiSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search jobs, providers..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
            <div className="relative">
              <HiFilter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none cursor-pointer">
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

        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => switchTab(tab.key)}
              className={`shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg transition-all ${activeTab === tab.key ? "bg-[#1C52AF] text-white shadow font-semibold" : "text-gray-500 hover:text-gray-700"}`}>
              {tab.label}
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}>
                {countFor(tab)}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3">
            <HiExclamationCircle size={22} className="text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">Error loading jobs</p>
              <p className="text-xs text-red-500">{error}</p>
            </div>
            <button onClick={fetchJobs} className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-all">Retry</button>
          </div>
        )}

        <div className="flex flex-col gap-5" style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.15s ease, transform 0.15s ease" }}>
          {loading && [0, 1, 2].map(i => <SkeletonCard key={i} />)}
          {!loading && !error && filtered.length === 0 && <EmptyState tab={activeTab} />}
          {!loading && !error && paginatedJobs.map((job, i) => (
            <ServiceCard
              key={job.id} job={job} index={i} payingJobId={payingJobId}
              onReschedule={(j) => {}}
              onCancel={(j) => setCancelModal({ open: true, jobId: j.id })}
              onViewDetail={(j) => setDetailModal({ open: true, job: j })}
              onViewTimeline={(id) => setTimelineModal({ open: true, jobId: id })}
              onAddNote={(id) => setNotesModal({ open: true, jobId: id, notes: job.notes || [] })}
              onUploadImage={(id) => setUploadModal({ open: true, jobId: id, images: job.images || [] })}
              onPayNow={handlePayNow}
            />
          ))}
        </div>

        {!loading && !error && filtered.length > 0 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-gray-400">Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} jobs</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage <= 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all">
                <HiChevronLeft size={16} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === safePage ? "bg-[#1C52AF] text-white shadow" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {page}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all">
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <JobDetailModal open={detailModal.open} job={detailModal.job} onClose={() => setDetailModal({ open: false, job: null })} />
      <TimelineModal open={timelineModal.open} jobId={timelineModal.jobId} onClose={() => setTimelineModal({ open: false, jobId: null })} />
      <CancelModal open={cancelModal.open} jobId={cancelModal.jobId} onClose={() => setCancelModal({ open: false, jobId: null })} onSuccess={handleCancelSuccess} />
      <NotesModal open={notesModal.open} jobId={notesModal.jobId} existingNotes={notesModal.notes} onClose={() => setNotesModal({ open: false, jobId: null, notes: [] })} onNoteAdded={(note) => handleNoteAdded(notesModal.jobId, note)} />
      <UploadModal open={uploadModal.open} jobId={uploadModal.jobId} existingImages={uploadModal.images} onClose={() => setUploadModal({ open: false, jobId: null, images: [] })} onImagesUploaded={(imgs) => handleImagesUploaded(uploadModal.jobId, imgs)} />
    </div>
  );
};

export default ActiveServices;










// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   HiLocationMarker,
//   HiCheckCircle,
//   HiClock,
//   HiCalendar,
//   HiX,
//   HiChatAlt2,
//   HiPhone,
//   HiShieldCheck,
//   HiStar,
//   HiExclamationCircle,
//   HiRefresh,
//   HiDownload,
//   HiArrowRight,
//   HiCheck,
//   HiPlus,
//   HiPhotograph,
//   HiDocumentText,
//   HiTrash,
//   HiUpload,
//   HiPencil,
//   HiClipboardList,
//   HiUser,
//   HiMail,
//   HiCurrencyDollar,
//   HiInformationCircle,
//   HiFlag,
//   HiBan,
//   HiDotsVertical,
//   HiPaperClip,
//   HiAnnotation,
//   HiChevronRight,
//   HiChevronLeft,
//   HiSearch,
//   HiFilter,
// } from "react-icons/hi";
// import api from "../../api/axios";

// /* ───────────────────────── STATUS MAPPING ───────────────────────── */
// const STATUS_MAP = {
//   PENDING: { label: "PENDING", badgeColor: "bg-orange-100 text-orange-700", icon: HiClock },
//   ACCEPTED: { label: "ACCEPTED", badgeColor: "bg-blue-100 text-blue-700", icon: HiCheckCircle },
//   IN_PROGRESS: { label: "IN PROGRESS", badgeColor: "bg-indigo-100 text-indigo-700", icon: HiRefresh },
//   COMPLETED: { label: "COMPLETED", badgeColor: "bg-emerald-100 text-emerald-700", icon: HiCheckCircle },
//   CANCELLED: { label: "CANCELLED", badgeColor: "bg-red-100 text-red-600", icon: HiBan },
//   REVIEWING: { label: "REVIEWING", badgeColor: "bg-purple-100 text-purple-700", icon: HiShieldCheck },
// };

// const TAB_STATUS_MAP = {
//   active: ["ACCEPTED", "IN_PROGRESS", "REVIEWING"],
//   scheduled: ["PENDING"],
//   completed: ["COMPLETED"],
//   cancelled: ["CANCELLED"],
// };

// /* ───────────────────────── HELPERS ───────────────────────── */
// function fmtDate(iso) {
//   if (!iso) return "Not scheduled";
//   const d = new Date(iso);
//   if (isNaN(d.getTime())) return "Not scheduled";
//   return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
// }

// function fmtDateShort(iso) {
//   if (!iso) return "TBD";
//   const d = new Date(iso);
//   if (isNaN(d.getTime())) return "TBD";
//   return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
// }

// function fmtTime(iso) {
//   if (!iso) return "—";
//   const d = new Date(iso);
//   if (isNaN(d.getTime())) return "—";
//   return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
// }

// function fmtRelativeTime(iso) {
//   if (!iso) return "";
//   const d = new Date(iso);
//   const now = new Date();
//   const diffMs = now - d;
//   const diffMins = Math.floor(diffMs / 60000);
//   const diffHours = Math.floor(diffMs / 3600000);
//   const diffDays = Math.floor(diffMs / 86400000);
//   if (diffMins < 1) return "Just now";
//   if (diffMins < 60) return `${diffMins}m ago`;
//   if (diffHours < 24) return `${diffHours}h ago`;
//   if (diffDays < 7) return `${diffDays}d ago`;
//   return fmtDateShort(iso);
// }

// function formatCurrency(amount) {
//   if (amount == null) return "$0.00";
//   return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / 100);
// }

// /* ───────────────────────── ANIMATED CARD ───────────────────────── */
// function AnimatedCard({ children, index }) {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), index * 100);
//     return () => clearTimeout(t);
//   }, [index]);
//   return (
//     <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
//       {children}
//     </div>
//   );
// }

// /* ───────────────────────── MODAL COMPONENT ───────────────────────── */
// function Modal({ open, onClose, children, maxWidth = "sm:max-w-lg" }) {
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className={`bg-white w-full ${maxWidth} sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden`} style={{ animation: "modalIn 0.3s cubic-bezier(0.34,1.4,0.64,1)", maxHeight: "90vh" }}>
//         {children}
//       </div>
//       <style>{`
//         @keyframes modalIn { from{opacity:0;transform:translateY(40px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
//         @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes spin { to{transform:rotate(360deg)} }
//         @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:0.5} 100%{transform:scale(1.3);opacity:0} }
//       `}</style>
//     </div>
//   );
// }

// /* ───────────────────────── TIMELINE MODAL ───────────────────────── */
// function TimelineModal({ open, onClose, jobId }) {
//   const [timeline, setTimeline] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!open || !jobId) return;
//     const fetchTimeline = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await api.get(`/jobs/${jobId}/timeline`);
//         setTimeline(res.data?.data || res.data || []);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load timeline");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTimeline();
//   }, [open, jobId]);

//   const getStatusIcon = (status) => {
//     const cfg = STATUS_MAP[status] || STATUS_MAP.PENDING;
//     const Icon = cfg.icon;
//     return <Icon size={18} className={cfg.badgeColor.replace("bg-", "text-").split(" ")[0]} />;
//   };

//   return (
//     <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <HiClock size={20} className="text-[#1C52AF]" />
//           <p className="font-semibold text-gray-800 text-sm">Job Timeline</p>
//         </div>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
//       </div>
//       <div className="px-5 py-5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
//         {loading && (
//           <div className="flex flex-col gap-4">
//             {[1,2,3].map(i => (
//               <div key={i} className="flex gap-3 animate-pulse">
//                 <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
//                 <div className="flex-1 flex flex-col gap-1.5 py-1">
//                   <div className="h-4 w-3/4 bg-gray-100 rounded" />
//                   <div className="h-3 w-1/2 bg-gray-100 rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
//             <HiExclamationCircle size={18} className="text-red-500 shrink-0" />
//             <p className="text-sm text-red-600">{error}</p>
//           </div>
//         )}
//         {!loading && !error && timeline.length === 0 && (
//           <div className="text-center py-8">
//             <HiClipboardList size={40} className="text-gray-300 mx-auto mb-3" />
//             <p className="text-sm text-gray-500">No timeline events yet</p>
//           </div>
//         )}
//         {!loading && !error && timeline.length > 0 && (
//           <div className="relative">
//             <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100" />
//             <div className="flex flex-col gap-0">
//               {timeline.map((event, i) => (
//                 <div key={i} className="relative flex gap-3 pb-6 last:pb-0" style={{ animation: "fadeSlide 0.3s ease", animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
//                   <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${STATUS_MAP[event.status]?.badgeColor?.split(" ")[0] || "bg-gray-100"}`}>
//                     {getStatusIcon(event.status)}
//                   </div>
//                   <div className="flex-1 pt-0.5">
//                     <p className="text-sm font-semibold text-gray-800">{event.event}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_MAP[event.status]?.badgeColor || "bg-gray-100 text-gray-600"}`}>
//                         {event.status}
//                       </span>
//                       {event.timestamp && (
//                         <span className="text-xs text-gray-400">{fmtRelativeTime(event.timestamp)} · {fmtDate(event.timestamp)} {fmtTime(event.timestamp)}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

// /* ───────────────────────── NOTES MODAL ───────────────────────── */
// function NotesModal({ open, onClose, jobId, existingNotes = [], onNoteAdded }) {
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notes, setNotes] = useState(existingNotes);

//   useEffect(() => {
//     if (open) {
//       setNotes(existingNotes);
//       setNote("");
//       setError(null);
//     }
//   }, [open, existingNotes]);

//   const handleSubmit = async () => {
//     if (!note.trim()) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await api.post(`/jobs/${jobId}/notes`, { note: note.trim() });
//       const newNote = { note: note.trim(), timestamp: new Date().toISOString(), id: Date.now().toString() };
//       setNotes(prev => [newNote, ...prev]);
//       setNote("");
//       onNoteAdded?.(newNote);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add note");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} maxWidth="sm:max-w-md">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <HiAnnotation size={20} className="text-[#1C52AF]" />
//           <p className="font-semibold text-gray-800 text-sm">Job Notes</p>
//         </div>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
//       </div>
//       <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={note}
//             onChange={e => setNote(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && handleSubmit()}
//             placeholder="Add a note..."
//             className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all"
//           />
//           <button
//             onClick={handleSubmit}
//             disabled={!note.trim() || loading}
//             className="px-4 py-2.5 bg-[#1C52AF] text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-blue-800 transition-all active:scale-95 flex items-center gap-1.5"
//           >
//             {loading ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} /> : <HiArrowRight size={16} />}
//           </button>
//         </div>
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
//             <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
//             <p className="text-xs text-red-600">{error}</p>
//           </div>
//         )}
//         <div className="flex flex-col gap-3">
//           {notes.length === 0 && (
//             <div className="text-center py-6">
//               <HiDocumentText size={32} className="text-gray-300 mx-auto mb-2" />
//               <p className="text-sm text-gray-400">No notes yet. Add one above.</p>
//             </div>
//           )}
//           {notes.map((n, i) => (
//             <div key={n.id || i} className="bg-gray-50 rounded-xl px-4 py-3 border-l-4 border-[#1C52AF]" style={{ animation: "fadeSlide 0.25s ease", animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
//               <p className="text-sm text-gray-700">{n.note}</p>
//               <p className="text-[11px] text-gray-400 mt-1.5">{fmtRelativeTime(n.timestamp)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Modal>
//   );
// }

// /* ───────────────────────── UPLOAD MODAL ───────────────────────── */
// function UploadModal({ open, onClose, jobId, existingImages = [], onImagesUploaded }) {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadedImages, setUploadedImages] = useState(existingImages);

//   useEffect(() => {
//     if (open) {
//       setUploadedImages(existingImages);
//       setFiles([]);
//       setPreviews([]);
//       setError(null);
//     }
//   }, [open, existingImages]);

//   const handleFileSelect = (e) => {
//     const selected = Array.from(e.target.files);
//     if (selected.length === 0) return;
//     setFiles(prev => [...prev, ...selected]);
//     const newPreviews = selected.map(file => URL.createObjectURL(file));
//     setPreviews(prev => [...prev, ...newPreviews]);
//   };

//   const removeFile = (index) => {
//     setFiles(prev => prev.filter((_, i) => i !== index));
//     URL.revokeObjectURL(previews[index]);
//     setPreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const formData = new FormData();
//       files.forEach(file => formData.append("images", file));
//       await api.post(`/jobs/${jobId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//       const newImages = previews.map((url, i) => ({ id: `local_${Date.now()}_${i}`, url, timestamp: new Date().toISOString() }));
//       setUploadedImages(prev => [...newImages, ...prev]);
//       onImagesUploaded?.(newImages);
//       setFiles([]);
//       setPreviews([]);
//     } catch (err) {
//       setError(err.response?.data?.message || "Upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <HiPhotograph size={20} className="text-[#1C52AF]" />
//           <p className="font-semibold text-gray-800 text-sm">Upload Images</p>
//         </div>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
//       </div>
//       <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "65vh" }}>
//         {/* Upload Area */}
//         <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-6 py-8 cursor-pointer hover:border-[#1C52AF] hover:bg-blue-50/30 transition-all group">
//           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
//             <HiUpload size={24} className="text-[#1C52AF]" />
//           </div>
//           <p className="text-sm font-medium text-gray-600">Click to upload images</p>
//           <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
//           <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
//         </label>

//         {/* Selected Files Preview */}
//         {previews.length > 0 && (
//           <div style={{ animation: "fadeSlide 0.25s ease" }}>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Selected ({previews.length})</p>
//             <div className="grid grid-cols-3 gap-2">
//               {previews.map((url, i) => (
//                 <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
//                   <img src={url} alt={`preview-${i}`} className="w-full h-full object-cover" />
//                   <button onClick={() => removeFile(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all">
//                     <HiX size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={handleUpload}
//               disabled={loading}
//               className="w-full mt-3 py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
//               {loading ? "Uploading…" : `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`}
//             </button>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
//             <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
//             <p className="text-xs text-red-600">{error}</p>
//           </div>
//         )}

//         {/* Existing Images */}
//         {uploadedImages.length > 0 && (
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Uploaded Images</p>
//             <div className="grid grid-cols-3 gap-2">
//               {uploadedImages.map((img, i) => (
//                 <div key={img.id || i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => window.open(img.url, "_blank")}>
//                   <img src={img.url} alt={`uploaded-${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
//                     <HiArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

// /* ───────────────────────── CANCEL MODAL ───────────────────────── */
// function CancelModal({ open, onClose, jobId, onSuccess }) {
//   const [reason, setReason] = useState("");
//   const [custom, setCustom] = useState("");
//   const [step, setStep] = useState("reason");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const cancelReasons = [
//     "Change of plans",
//     "Found a better price elsewhere",
//     "Vehicle issue resolved on its own",
//     "Scheduling conflict",
//     "Provider not responding",
//     "Other reason"
//   ];

//   const reset = () => { setReason(""); setCustom(""); setStep("reason"); setError(null); };
//   const close = () => { reset(); onClose(); };

//   const doCancel = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const finalReason = reason === "Other reason" ? (custom.trim() || "Other") : reason;
//       await api.post(`/jobs/${jobId}/cancel`, { reason: finalReason });
//       setStep("done");
//       onSuccess?.(jobId);
//       setTimeout(() => { reset(); onClose(); }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Cancellation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={close} maxWidth="sm:max-w-md">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <HiBan size={20} className="text-red-500" />
//           <p className="font-semibold text-gray-800 text-sm">Cancel Job</p>
//         </div>
//         <button onClick={close} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
//       </div>
//       {step === "done" ? (
//         <div className="flex flex-col items-center justify-center gap-3 py-14 px-4" style={{ animation: "fadeSlide 0.3s ease" }}>
//           <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"><HiCheckCircle size={36} className="text-red-500" /></div>
//           <p className="text-base font-semibold text-gray-800">Job Cancelled</p>
//           <p className="text-sm text-gray-500 text-center">The job has been cancelled successfully.</p>
//         </div>
//       ) : step === "confirm" ? (
//         <div className="px-5 py-4 flex flex-col gap-4" style={{ animation: "fadeSlide 0.25s ease" }}>
//           <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
//             <HiExclamationCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
//             <div>
//               <p className="text-sm font-semibold text-red-700">Are you sure?</p>
//               <p className="text-xs text-red-400 mt-1">This action cannot be undone.</p>
//             </div>
//           </div>
//           <div className="bg-gray-50 rounded-xl px-4 py-3">
//             <p className="text-xs text-gray-400 mb-0.5">Cancellation reason</p>
//             <p className="text-sm text-gray-700">{reason === "Other reason" ? (custom || "Other") : reason}</p>
//           </div>
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
//               <HiExclamationCircle size={15} className="text-red-500 shrink-0" />
//               <p className="text-xs text-red-600">{error}</p>
//             </div>
//           )}
//           <div className="flex gap-2 mt-1">
//             <button onClick={() => setStep("reason")} disabled={loading} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">Go Back</button>
//             <button onClick={doCancel} disabled={loading} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2">
//               {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
//               {loading ? "Cancelling…" : "Yes, Cancel"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="px-5 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "60vh" }}>
//           <p className="text-sm text-gray-500">Why are you cancelling this job?</p>
//           <div className="flex flex-col gap-2">
//             {cancelReasons.map(r => (
//               <button key={r} onClick={() => setReason(r)}
//                 className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-sm text-left transition-all active:scale-[0.98] ${reason === r ? "border-[#1C52AF] bg-blue-50 text-[#1C52AF] font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"}`}>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${reason === r ? "border-[#1C52AF]" : "border-gray-300"}`}>
//                   {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#1C52AF]" />}
//                 </div>
//                 {r}
//               </button>
//             ))}
//           </div>
//           {reason === "Other reason" && (
//             <textarea value={custom} onChange={e => setCustom(e.target.value)} rows={3} placeholder="Please describe your reason…"
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#1C52AF] resize-none transition-colors" style={{ animation: "fadeSlide 0.2s ease" }} />
//           )}
//           <button onClick={() => setStep("confirm")} disabled={!reason || (reason === "Other reason" && !custom.trim())}
//             className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-red-600 active:scale-95 transition-all mt-1">Continue</button>
//         </div>
//       )}
//     </Modal>
//   );
// }

// /* ───────────────────────── JOB DETAIL MODAL ───────────────────────── */
// function JobDetailModal({ open, onClose, job }) {
//   if (!job) return null;
//   const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
//   const provider = job.provider || {};
//   const customer = job.user || {};

//   return (
//     <Modal open={open} onClose={onClose} maxWidth="sm:max-w-lg">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <div>
//           <p className="font-semibold text-gray-800 text-sm">Job Details</p>
//           <p className="text-xs text-gray-400 mt-0.5">{job.id?.slice(0, 8)}...</p>
//         </div>
//         <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><HiX size={18} /></button>
//       </div>
//       <div className="px-5 py-5 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
//         {/* Status Badge */}
//         <div className="flex items-center justify-between">
//           <span className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${statusCfg.badgeColor}`}>
//             {statusCfg.label}
//           </span>
//           {job.isCompletedByProvider && (
//             <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
//               <HiCheck size={14} /> Completed by provider
//             </span>
//           )}
//         </div>

//         {/* Title & Description */}
//         <div>
//           <p className="text-xl font-bold text-gray-900">{job.title}</p>
//           <p className="text-sm text-gray-500 mt-1">{job.description}</p>
//         </div>

//         {/* Provider Card */}
//         {provider.id && (
//           <div className="bg-gray-50 rounded-xl px-4 py-3.5 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#1C52AF] flex items-center justify-center text-white font-bold text-sm">
//                 {provider.firstName?.[0]}{provider.lastName?.[0]}
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400">Service Provider</p>
//                 <p className="text-sm font-bold text-gray-800">{provider.firstName} {provider.lastName}</p>
//                 <p className="text-xs text-gray-500">{provider.email}</p>
//               </div>
//             </div>
//             <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all">
//               <HiChatAlt2 size={14} /> Message
//             </button>
//           </div>
//         )}

//         {/* Customer Info */}
//         <div className="bg-gray-50 rounded-xl px-4 py-3.5">
//           <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Customer</p>
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
//               {customer.firstName?.[0]}{customer.lastName?.[0]}
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-gray-800">{customer.firstName} {customer.lastName}</p>
//               <p className="text-xs text-gray-500">{customer.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-blue-50 rounded-xl px-3 py-3">
//             <div className="flex items-center gap-1.5 mb-1">
//               <HiCurrencyDollar size={14} className="text-[#1C52AF]" />
//               <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Amount</p>
//             </div>
//             <p className="text-lg font-bold text-[#1C52AF]">{formatCurrency(job.totalAmount)}</p>
//           </div>
//           <div className="bg-blue-50 rounded-xl px-3 py-3">
//             <div className="flex items-center gap-1.5 mb-1">
//               <HiCalendar size={14} className="text-[#1C52AF]" />
//               <p className="text-[10px] text-gray-400 uppercase tracking-wide">Scheduled</p>
//             </div>
//             <p className="text-sm font-bold text-gray-800">{fmtDate(job.scheduledAt)}</p>
//             <p className="text-xs text-[#1C52AF]">{fmtTime(job.scheduledAt)}</p>
//           </div>
//           <div className="bg-gray-50 rounded-xl px-3 py-3">
//             <div className="flex items-center gap-1.5 mb-1">
//               <HiCheckCircle size={14} className="text-gray-400" />
//               <p className="text-[10px] text-gray-400 uppercase tracking-wide">Accepted</p>
//             </div>
//             <p className="text-sm font-semibold text-gray-800">{job.acceptedAt ? fmtDate(job.acceptedAt) : "Not yet"}</p>
//             <p className="text-xs text-gray-500">{job.acceptedAt ? fmtTime(job.acceptedAt) : "—"}</p>
//           </div>
//           <div className="bg-gray-50 rounded-xl px-3 py-3">
//             <div className="flex items-center gap-1.5 mb-1">
//               <HiInformationCircle size={14} className="text-gray-400" />
//               <p className="text-[10px] text-gray-400 uppercase tracking-wide">Job ID</p>
//             </div>
//             <p className="text-xs font-mono text-gray-600 truncate">{job.id}</p>
//           </div>
//         </div>

//         {/* Provider Profile ID if present */}
//         {job.providerProfileId && (
//           <div className="bg-gray-50 rounded-xl px-4 py-3 border-l-4 border-[#1C52AF]">
//             <p className="text-[10px] text-gray-400 uppercase tracking-wide">Provider Profile</p>
//             <p className="text-xs font-mono text-gray-600 mt-0.5">{job.providerProfileId}</p>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

// /* ───────────────────────── SERVICE CARD ───────────────────────── */
// function ServiceCard({ job, index, onReschedule, onCancel, onViewDetail, onViewTimeline, onAddNote, onUploadImage, onPayNow }) {
//   const statusCfg = STATUS_MAP[job.status] || STATUS_MAP.PENDING;
//   const provider = job.provider || {};
//   const customer = job.user || {};
//   const isPending = job.status === "PENDING";
//   const isAccepted = job.status === "ACCEPTED";
//   const isInProgress = job.status === "IN_PROGRESS";
//   const isCompleted = job.status === "COMPLETED";
//   const isCancelled = job.status === "CANCELLED";
//   const canCancel = isPending || isAccepted;
//   const canInteract = !isCompleted && !isCancelled;

//   return (
//     <AnimatedCard index={index}>
//       <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//         <div className="p-5 flex flex-col gap-4">
//           {/* Header */}
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex flex-col gap-1.5 flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusCfg.badgeColor}`}>
//                   {statusCfg.label}
//                 </span>
//                 <span className="text-[11px] text-gray-400 font-mono">{job.id?.slice(0, 8)}...</span>
//               </div>
//               <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight truncate">{job.title}</p>
//               <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
//             </div>
//             <div className="text-right shrink-0">
//               <p className="text-xl font-bold text-[#1C52AF]">{formatCurrency(job.totalAmount)}</p>
//               <p className="text-[11px] text-gray-400 mt-0.5">{isCompleted ? "Paid" : isCancelled ? "Refunded" : "Total"}</p>
//             </div>
//           </div>

//           {/* Scheduled Info */}
//           <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
//             <div className="flex items-center gap-2">
//               <HiCalendar size={16} className="text-[#1C52AF]" />
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-wide">Scheduled</p>
//                 <p className="text-sm font-semibold text-gray-800">{fmtDate(job.scheduledAt)}</p>
//               </div>
//             </div>
//             <div className="w-px h-8 bg-gray-200" />
//             <div className="flex items-center gap-2">
//               <HiClock size={16} className="text-[#1C52AF]" />
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-wide">Time</p>
//                 <p className="text-sm font-semibold text-gray-800">{fmtTime(job.scheduledAt)}</p>
//               </div>
//             </div>
//             {job.acceptedAt && (
//               <>
//                 <div className="w-px h-8 bg-gray-200 hidden sm:block" />
//                 <div className="hidden sm:flex items-center gap-2">
//                   <HiCheckCircle size={16} className="text-emerald-500" />
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-wide">Accepted</p>
//                     <p className="text-sm font-semibold text-gray-800">{fmtRelativeTime(job.acceptedAt)}</p>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Provider Info */}
//           {provider.id ? (
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C52AF] to-blue-400 flex items-center justify-center text-white font-bold text-sm">
//                   {provider.firstName?.[0]}{provider.lastName?.[0]}
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-wide">Provider</p>
//                   <p className="text-sm font-bold text-gray-800">{provider.firstName} {provider.lastName}</p>
//                   <p className="text-xs text-gray-500">{provider.email}</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 {!isCompleted && (
//                   <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition-all">
//                     <HiChatAlt2 size={14} /> Chat
//                   </button>
//                 )}
//                 {!isCompleted && (
//                   <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#1C52AF] rounded-lg hover:bg-blue-800 active:scale-95 transition-all">
//                     <HiPhone size={14} /> Call
//                   </button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
//               <HiClock size={18} className="text-amber-500 shrink-0" />
//               <div>
//                 <p className="text-sm font-semibold text-amber-700">Awaiting Provider Assignment</p>
//                 <p className="text-xs text-amber-600">We are matching you with the best available provider.</p>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           {canInteract && (
//             <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
//               <button onClick={() => onViewDetail(job)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
//                 <HiDocumentText size={14} /> Details
//               </button>
//               <button onClick={() => onViewTimeline(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
//                 <HiClock size={14} /> Timeline
//               </button>
//               <button onClick={() => onAddNote(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
//                 <HiAnnotation size={14} /> Notes
//               </button>
//               <button onClick={() => onUploadImage(job.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
//                 <HiPhotograph size={14} /> Photos
//               </button>
//               {canCancel && (
//                 <button onClick={() => onCancel(job)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:scale-95 transition-all ml-auto">
//                   <HiBan size={14} /> Cancel
//                 </button>
//               )}
//             </div>
//           )}
//           {(isCompleted || isCancelled) && (
//             <div className="flex gap-2 pt-2 border-t border-gray-100">
//               <button onClick={() => onViewDetail(job)} className="flex-1 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center">
//                 View Details
//               </button>
//               <button onClick={() => onViewTimeline(job.id)} className="flex-1 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center">
//                 View Timeline
//               </button>
//               {isCompleted && !job.isPaid && (
//                 <button onClick={() => onPayNow?.(job)} className="flex-1 py-2 text-xs text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 active:scale-95 transition-all text-center font-semibold">
//                   Pay Now
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </AnimatedCard>
//   );
// }

// /* ───────────────────────── SKELETON CARD ───────────────────────── */
// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
//       <div className="p-5 flex flex-col gap-4">
//         <div className="flex justify-between">
//           <div className="flex flex-col gap-1.5 flex-1">
//             <div className="h-5 w-24 bg-gray-100 rounded" />
//             <div className="h-6 w-3/4 bg-gray-100 rounded mt-1" />
//             <div className="h-4 w-full bg-gray-100 rounded" />
//           </div>
//           <div className="h-8 w-20 bg-gray-100 rounded-lg" />
//         </div>
//         <div className="h-14 bg-gray-100 rounded-xl" />
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-gray-100 rounded-full" />
//             <div className="h-4 w-32 bg-gray-100 rounded" />
//           </div>
//           <div className="h-8 w-24 bg-gray-100 rounded-lg" />
//         </div>
//         <div className="h-9 bg-gray-100 rounded-lg" />
//       </div>
//     </div>
//   );
// }

// /* ───────────────────────── STATS BAR ───────────────────────── */
// function StatsBar({ jobs }) {
//   const total = jobs.length;
//   const active = jobs.filter(b => ["ACCEPTED", "IN_PROGRESS", "REVIEWING"].includes(b.status)).length;
//   const scheduled = jobs.filter(b => b.status === "PENDING").length;
//   const completed = jobs.filter(b => b.status === "COMPLETED").length;
//   const cancelled = jobs.filter(b => b.status === "CANCELLED").length;
//   const totalSpent = jobs.filter(b => b.status !== "CANCELLED").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//       {[
//         { label: "Total Jobs", value: total, color: "text-[#1C52AF]", bg: "bg-blue-50", icon: HiClipboardList },
//         { label: "Active", value: active, color: "text-blue-600", bg: "bg-blue-50", icon: HiRefresh },
//         { label: "Scheduled", value: scheduled, color: "text-amber-600", bg: "bg-amber-50", icon: HiClock },
//         { label: "Completed", value: completed, color: "text-emerald-600", bg: "bg-emerald-50", icon: HiCheckCircle },
//         { label: "Cancelled", value: cancelled, color: "text-red-600", bg: "bg-red-50", icon: HiBan },
//         { label: "Total Spent", value: formatCurrency(totalSpent), color: "text-gray-800", bg: "bg-gray-50", icon: HiCurrencyDollar },
//       ].map(stat => (
//         <div key={stat.label} className={`${stat.bg} rounded-xl px-4 py-3 flex flex-col gap-1.5`}>
//           <div className="flex items-center gap-1.5">
//             <stat.icon size={14} className={stat.color} />
//             <p className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</p>
//           </div>
//           <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ───────────────────────── EMPTY STATE ───────────────────────── */
// function EmptyState({ tab }) {
//   const messages = {
//     active: { title: "No active jobs", desc: "Your ongoing service jobs will appear here.", icon: HiRefresh },
//     scheduled: { title: "No scheduled jobs", desc: "Upcoming appointments will show up here.", icon: HiCalendar },
//     completed: { title: "No completed jobs", desc: "Your service history will appear here.", icon: HiCheckCircle },
//     cancelled: { title: "No cancelled jobs", desc: "Cancelled bookings will appear here.", icon: HiBan },
//   };
//   const msg = messages[tab] || messages.active;
//   const Icon = msg.icon;
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl px-4 py-20 flex flex-col items-center gap-4 text-center" style={{ animation: "fadeSlide 0.4s ease" }}>
//       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//         <Icon size={32} className="text-gray-300" />
//       </div>
//       <p className="text-lg font-semibold text-gray-500">{msg.title}</p>
//       <p className="text-sm text-gray-400 max-w-sm">{msg.desc}</p>
//     </div>
//   );
// }

// /* ───────────────────────── TABS CONFIG ───────────────────────── */
// const TABS = [
//   { key: "active", label: "Active", statuses: ["ACCEPTED", "IN_PROGRESS", "REVIEWING"] },
//   { key: "scheduled", label: "Scheduled", statuses: ["PENDING"] },
//   { key: "completed", label: "Completed", statuses: ["COMPLETED"] },
//   { key: "cancelled", label: "Cancelled", statuses: ["CANCELLED"] },
// ];

// const ITEMS_PER_PAGE = 5;  // change this to whatever you want

// /* ───────────────────────── MAIN COMPONENT ───────────────────────── */
// const ActiveServices = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("active");
//   const [animating, setAnimating] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // ─── PAGINATION STATE ───
//   const [currentPage, setCurrentPage] = useState(1);

//   // Modals
//   const [detailModal, setDetailModal] = useState({ open: false, job: null });
//   const [timelineModal, setTimelineModal] = useState({ open: false, jobId: null });
//   const [cancelModal, setCancelModal] = useState({ open: false, jobId: null });
//   const [notesModal, setNotesModal] = useState({ open: false, jobId: null, notes: [] });
//   const [uploadModal, setUploadModal] = useState({ open: false, jobId: null, images: [] });

//   // Fetch all jobs
//   const fetchJobs = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await api.get("/jobs");
//       const data = res.data?.data || res.data || [];
//       setJobs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load jobs. Please try again.");
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch jobs by status
//   const fetchJobsByStatus = useCallback(async (status) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await api.get(`/jobs/status/${status}`);
//       const data = res.data?.data || res.data || [];
//       setJobs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError(err.response?.data?.message || `Failed to load ${status} jobs.`);
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchJobs();
//   }, [fetchJobs]);

//   const switchTab = (key) => {
//     if (key === activeTab) return;
//     setAnimating(true);
//     setCurrentPage(1);          // reset to page 1 on tab switch
//     setTimeout(() => {
//       setActiveTab(key);
//       setAnimating(false);
//     }, 150);
//   };

//   const handleCancelSuccess = (jobId) => {
//     setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: "CANCELLED" } : j));
//   };

//   const handleNoteAdded = (jobId, note) => {
//     setJobs(prev => prev.map(j => {
//       if (j.id !== jobId) return j;
//       return { ...j, notes: [...(j.notes || []), note] };
//     }));
//   };

//   const handleImagesUploaded = (jobId, images) => {
//     setJobs(prev => prev.map(j => {
//       if (j.id !== jobId) return j;
//       return { ...j, images: [...(j.images || []), ...images] };
//     }));
//   };

//   const tabConfig = TABS.find(t => t.key === activeTab);
//   let filtered = tabConfig?.statuses ? jobs.filter(j => tabConfig.statuses.includes(j.status)) : jobs;

//   // Search filter
//   if (searchQuery.trim()) {
//     const q = searchQuery.toLowerCase();
//     filtered = filtered.filter(j =>
//       (j.title?.toLowerCase().includes(q)) ||
//       (j.description?.toLowerCase().includes(q)) ||
//       (j.provider?.firstName?.toLowerCase().includes(q)) ||
//       (j.provider?.lastName?.toLowerCase().includes(q)) ||
//       (j.id?.toLowerCase().includes(q))
//     );
//   }

//   // Status filter
//   if (statusFilter) {
//     filtered = filtered.filter(j => j.status === statusFilter);
//   }

//   // ─── PAGINATION LOGIC ───
//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   const safePage = Math.min(currentPage, totalPages);
//   const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
//   const paginatedJobs = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const countFor = (tab) => tab.statuses ? jobs.filter(j => tab.statuses.includes(j.status)).length : jobs.length;

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">My Services</h1>
//             <p className="text-base text-gray-500 mt-1">Real-time tracking of your ongoing vehicle maintenance and repairs.</p>
//           </div>
//           <button onClick={fetchJobs} className="self-start flex items-center gap-2 px-4 py-2.5 text-sm text-[#1C52AF] bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all active:scale-95">
//             <HiRefresh size={16} /> Refresh
//           </button>
//         </div>

//         {/* Stats */}
//         {!loading && jobs.length > 0 && <StatsBar jobs={jobs} />}

//         {/* Search & Filter */}
//         {!loading && jobs.length > 0 && (
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative flex-1">
//               <HiSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search jobs, providers..."
//                 value={searchQuery}
//                 onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all"
//               />
//             </div>
//             <div className="relative">
//               <HiFilter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//               <select
//                 value={statusFilter}
//                 onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
//                 className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1C52AF] focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none cursor-pointer"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="ACCEPTED">Accepted</option>
//                 <option value="IN_PROGRESS">In Progress</option>
//                 <option value="REVIEWING">Reviewing</option>
//                 <option value="COMPLETED">Completed</option>
//                 <option value="CANCELLED">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit overflow-x-auto">
//           {TABS.map(tab => (
//             <button key={tab.key} onClick={() => switchTab(tab.key)}
//               className={`shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg transition-all ${activeTab === tab.key ? "bg-[#1C52AF] text-white shadow font-semibold" : "text-gray-500 hover:text-gray-700"}`}>
//               {tab.label}
//               <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}>
//                 {countFor(tab)}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3">
//             <HiExclamationCircle size={22} className="text-red-500 shrink-0" />
//             <div className="flex-1">
//               <p className="text-sm font-semibold text-red-700">Error loading jobs</p>
//               <p className="text-xs text-red-500">{error}</p>
//             </div>
//             <button onClick={fetchJobs} className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-all">
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Jobs List */}
//         <div className="flex flex-col gap-5" style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.15s ease, transform 0.15s ease" }}>
//           {loading && [0, 1, 2].map(i => <SkeletonCard key={i} />)}
//           {!loading && !error && filtered.length === 0 && <EmptyState tab={activeTab} />}
//           {!loading && !error && paginatedJobs.map((job, i) => (
//             <ServiceCard
//               key={job.id}
//               job={job}
//               index={i}
//               onReschedule={(j) => { /* TODO: implement reschedule API */ }}
//               onCancel={(j) => setCancelModal({ open: true, jobId: j.id })}
//               onViewDetail={(j) => setDetailModal({ open: true, job: j })}
//               onViewTimeline={(id) => setTimelineModal({ open: true, jobId: id })}
//               onAddNote={(id) => setNotesModal({ open: true, jobId: id, notes: job.notes || [] })}
//               onUploadImage={(id) => setUploadModal({ open: true, jobId: id, images: job.images || [] })}
//               onPayNow={(j) => navigate(`/payment/${j.id}`)}
//             />
//           ))}
//         </div>

//         {/* ─── WORKING PAGINATION ─── */}
//         {!loading && !error && filtered.length > 0 && (
//           <div className="flex items-center justify-between pt-4">
//             <p className="text-xs text-gray-400">
//               Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} jobs
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={safePage <= 1}
//                 className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
//               >
//                 <HiChevronLeft size={16} />
//               </button>

//               {/* Page numbers */}
//               <div className="flex gap-1">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
//                       page === safePage
//                         ? "bg-[#1C52AF] text-white shadow"
//                         : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                 disabled={safePage >= totalPages}
//                 className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
//               >
//                 <HiChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <JobDetailModal open={detailModal.open} job={detailModal.job} onClose={() => setDetailModal({ open: false, job: null })} />
//       <TimelineModal open={timelineModal.open} jobId={timelineModal.jobId} onClose={() => setTimelineModal({ open: false, jobId: null })} />
//       <CancelModal open={cancelModal.open} jobId={cancelModal.jobId} onClose={() => setCancelModal({ open: false, jobId: null })} onSuccess={handleCancelSuccess} />
//       <NotesModal open={notesModal.open} jobId={notesModal.jobId} existingNotes={notesModal.notes} onClose={() => setNotesModal({ open: false, jobId: null, notes: [] })} onNoteAdded={(note) => handleNoteAdded(notesModal.jobId, note)} />
//       <UploadModal open={uploadModal.open} jobId={uploadModal.jobId} existingImages={uploadModal.images} onClose={() => setUploadModal({ open: false, jobId: null, images: [] })} onImagesUploaded={(imgs) => handleImagesUploaded(uploadModal.jobId, imgs)} />
//     </div>
//   );
// };

// export default ActiveServices;
