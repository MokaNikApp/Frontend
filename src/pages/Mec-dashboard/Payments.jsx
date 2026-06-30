
import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";

// ─── Status badge config ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  success:    { classes: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500", label: "Success" },
  failed:     { classes: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", label: "Failed" },
  pending:    { classes: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", label: "Pending" },
  abandoned:  { classes: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-400", label: "Abandoned" },
  processing: { classes: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", label: "Processing" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toNaira = (kobo) => `₦${(kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
const shortRef = (r = "") => r.length > 18 ? `${r.slice(0, 8)}…${r.slice(-6)}` : r;
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—";

const bankColor = (code = "") => {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % 360;
  return `hsl(${h},55%,62%)`;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const CopyBtn = ({ value }) => {
  const [ok, setOk] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setOk(true);
    setTimeout(() => setOk(false), 1600);
  };
  return (
    <button onClick={copy} title="Copy" className={`inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border transition-all duration-150 cursor-pointer ${ok ? "bg-green-50 border-green-200 text-green-600" : "bg-white border-slate-200 text-slate-400"}`}>
      {ok ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
      )}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const s = (status || "pending").toLowerCase();
  const cfg = STATUS_CONFIG[s] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${s === "processing" ? "animate-pulse" : ""}`} />
      {cfg.label}
    </span>
  );
};

const BankInitial = ({ name = "", code = "" }) => {
  const bg = bankColor(code);
  return (
    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0 tracking-wide" style={{ background: bg }}>
      {name.charAt(0)}
    </div>
  );
};

const Spinner = ({ className = "" }) => (
  <svg className={`animate-spin ${className}`} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ─── TAB 1: Manage Bank Account (Live API) ───────────────────────────────────
const ManageBankAccount = () => {
  const [banks, setBanks] = useState([]);
  const [banksLoading, setBanksLoading] = useState(true);
  const [form, setForm] = useState({ accountNumber: "", bankCode: "" });
  const [mode, setMode] = useState("register");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const bankDropRef = useRef(null);

  // Fetch banks for dropdown
  useEffect(() => {
    let cancelled = false;
    const fetchBanks = async () => {
      try {
        setBanksLoading(true);
        const res = await api.get("/payments/banks/list");
        const data = Array.isArray(res.data) ? res.data : [];
        if (!cancelled) setBanks(data);
      } catch (err) {
        if (!cancelled) setError("Could not load bank list. Please refresh the page.");
      } finally {
        if (!cancelled) setBanksLoading(false);
      }
    };
    fetchBanks();
    return () => { cancelled = true; };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (bankDropRef.current && !bankDropRef.current.contains(e.target)) setBankOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selectedBank = banks.find(b => b.code === form.bankCode);
  const filteredBanks = banks.filter(b =>
    b.name?.toLowerCase().includes(bankSearch.toLowerCase()) || b.code?.includes(bankSearch)
  );

  const handleSubmit = async () => {
    setError(null);
    if (!form.accountNumber || !form.bankCode) { setError("Please fill in all fields."); return; }
    if (form.accountNumber.length !== 10) { setError("Account number must be exactly 10 digits."); return; }

    setSubmitting(true);
    try {
      const payload = { accountNumber: form.accountNumber, bankCode: form.bankCode };
      const res = mode === "register"
        ? await api.post("/provider/bank-account", payload)
        : await api.patch("/provider/bank-account", payload);

      const subaccountId = res.data?.subaccountId || res.data?.data?.subaccountId || res.data?.id || "ACCT_OK";
      setSuccess(subaccountId);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Request failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-[520px] mx-auto px-4 sm:px-0">
        <div className="bg-white border-2 border-green-200 rounded-[20px] p-6 sm:p-9 text-center shadow-lg shadow-green-100/50">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 m-0 mb-2 tracking-tight">
            {mode === "register" ? "Account Linked" : "Account Updated"}
          </h3>
          <p className="text-[13px] text-slate-500 m-0 mb-6 leading-relaxed">
            Your bank account is ready to receive payouts from completed jobs.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase m-0 mb-1">Subaccount ID</p>
              <p className="text-[13px] font-mono text-blue-600 m-0 truncate">{success}</p>
            </div>
            <CopyBtn value={success} />
          </div>
          <button
            onClick={() => { setSuccess(null); setMode("update"); setForm({ accountNumber: "", bankCode: "" }); }}
            className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all"
          >
            Update Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[520px] mx-auto px-4 sm:px-0">
      {/* Mode toggle */}
      <div className="flex gap-0 bg-slate-100 rounded-xl p-1 mb-6 w-full sm:w-fit">
        {[
          ["register", "Register Account"],
          ["update", "Update Account"]
        ].map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setError(null); }}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg border-none text-[13px] font-semibold cursor-pointer transition-all ${mode === m ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-400"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6">
          <div className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-4">
            {mode === "register" ? "Link payout account" : "Change payout account"}
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700 mb-4">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <span>{error}</span>
            </div>
          )}

          {/* Bank selector */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-semibold text-slate-700 tracking-wide">Bank</label>
            <div ref={bankDropRef} className="relative">
              <button
                onClick={() => !banksLoading && setBankOpen(o => !o)}
                disabled={banksLoading}
                className={`w-full h-[42px] pl-3.5 pr-9 rounded-xl border text-sm text-left cursor-pointer flex items-center gap-2.5 transition-colors font-[inherit] ${bankOpen ? "border-blue-600" : "border-slate-200"} ${selectedBank ? "text-slate-900" : "text-slate-400"} bg-white disabled:opacity-60`}
              >
                {selectedBank && <BankInitial name={selectedBank.name} code={selectedBank.code} />}
                <span className="flex-1 truncate">
                  {banksLoading ? "Loading banks…" : selectedBank ? selectedBank.name : "Select your bank"}
                </span>
                {selectedBank && <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline">{selectedBank.code}</span>}
                <svg className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform text-slate-400 pointer-events-none ${bankOpen ? "rotate-180" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>

              {bankOpen && (
                <div className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-2 pb-1.5 border-b border-slate-100">
                    <div className="relative">
                      <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <input
                        autoFocus
                        value={bankSearch}
                        onChange={e => setBankSearch(e.target.value)}
                        placeholder="Search banks…"
                        className="w-full h-[34px] pl-7 pr-2.5 border border-slate-200 rounded-lg text-[13px] outline-none font-[inherit] box-border"
                      />
                    </div>
                  </div>
                  <ul className="max-h-[220px] overflow-y-auto m-0 py-1 list-none">
                    {filteredBanks.map((bank, idx) => (
                      <li key={`${bank.code}-${idx}`}>
                        <button
                          onClick={() => { setForm(f => ({ ...f, bankCode: bank.code })); setBankOpen(false); setBankSearch(""); }}
                          className={`w-full flex items-center gap-2.5 px-3.5 py-2 border-none text-[13px] cursor-pointer text-left transition-colors ${bank.code === form.bankCode ? "bg-blue-50 text-blue-700 font-semibold" : "bg-transparent text-slate-700 font-normal hover:bg-slate-50"}`}
                        >
                          <BankInitial name={bank.name} code={bank.code} />
                          <span className="flex-1 truncate">{bank.name}</span>
                          <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">{bank.code}</span>
                        </button>
                      </li>
                    ))}
                    {filteredBanks.length === 0 && (
                      <li className="p-3.5 text-[13px] text-slate-400 text-center">No banks found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Account number */}
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-xs font-semibold text-slate-700 tracking-wide">Account Number</label>
            <div className="relative">
              <input
                value={form.accountNumber}
                onChange={e => setForm(f => ({ ...f, accountNumber: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                placeholder="0123456789"
                className="w-full h-[42px] pl-3.5 pr-14 text-sm text-slate-900 bg-white border border-slate-200 rounded-xl outline-none font-mono tracking-wider focus:border-blue-600 transition-colors box-border"
              />
              <span className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold font-mono ${form.accountNumber.length === 10 ? "text-green-600" : "text-slate-400"}`}>
                {form.accountNumber.length}/10
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!form.accountNumber || !form.bankCode || submitting}
            className={`w-full h-[42px] rounded-xl border-none bg-blue-600 text-white text-sm font-semibold cursor-pointer shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 ${(!form.accountNumber || !form.bankCode || submitting) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            {submitting && <Spinner className="text-white" />}
            {submitting ? "Processing…" : mode === "register" ? "Link Bank Account" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── TAB 2: Payments (Live API) ──────────────────────────────────────────────
const STATUSES = ["success", "pending", "failed"];

const PaymentsTab = () => {
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsError, setPaymentsError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  // Fetch payments from live API
  useEffect(() => {
    let cancelled = false;
    const fetchPayments = async () => {
      try {
        setPaymentsLoading(true);
        setPaymentsError(null);
        const params = { page, limit: LIMIT };
        if (statusFilter) params.status = statusFilter;
        const res = await api.get("/payments", { params });
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        const total = res.data?.total || res.data?.meta?.total || data.length;
        if (!cancelled) {
          setPayments(data);
          setTotalPages(Math.ceil(total / LIMIT) || 1);
        }
      } catch (err) {
        if (!cancelled) {
          setPaymentsError(err.response?.data?.message || err.message || "Failed to load payments.");
          setPayments([]);
        }
      } finally {
        if (!cancelled) setPaymentsLoading(false);
      }
    };
    fetchPayments();
    return () => { cancelled = true; };
  }, [page, statusFilter]);

  const filteredPayments = statusFilter
    ? payments.filter(p => p.status === statusFilter)
    : payments;

  const earned = payments.filter(p => p.status === "success").reduce((a, p) => a + (p.amount || 0), 0);
  const successCount = payments.filter(p => p.status === "success").length;
  const pendingCount = payments.filter(p => p.status === "pending").length;

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: "Earned", value: toNaira(earned), color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
          { label: "Successful", value: successCount, color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
          { label: "Pending", value: pendingCount, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-4`}>
            <p className="m-0 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            <p className={`m-0 text-[22px] font-extrabold ${s.color} tracking-tight`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {["", ...STATUSES].map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${statusFilter === s ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white text-slate-500"}`}>
            {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {paymentsLoading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <Spinner className="text-blue-600 mx-auto mb-3" />
          <p className="text-[13px] text-slate-400 font-medium">Loading payments…</p>
        </div>
      )}

      {/* Error */}
      {!paymentsLoading && paymentsError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="mx-auto mb-2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          <p className="text-[13px] text-red-700 font-medium">{paymentsError}</p>
        </div>
      )}

      {/* Table */}
      {!paymentsLoading && !paymentsError && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-16 px-6">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" className="mx-auto mb-3.5 block"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              <p className="text-[15px] font-bold text-slate-600 m-0 mb-1.5">No payments found</p>
              <p className="text-[13px] text-slate-400 m-0">
                {statusFilter ? `No ${statusFilter} payments yet.` : "Payments will appear here once customers pay for your jobs."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop header */}
              <div className="hidden sm:grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-2.5 border-b border-slate-100">
                {["Reference", "Amount", "Date", "Status", ""].map(h => (
                  <span key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                ))}
              </div>
              {/* Desktop rows */}
              {filteredPayments.map((p, i) => (
                <div key={p.id || i}>
                  {/* Desktop */}
                  <div
                    onClick={() => setDetail(p)}
                    className="hidden sm:grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-3.5 items-center cursor-pointer transition-colors hover:bg-slate-50 border-b border-slate-50 last:border-b-0"
                  >
                    <div>
                      <p className="m-0 mb-0.5 text-xs font-mono text-slate-700 font-semibold">{shortRef(p.reference || "")}</p>
                      <p className="m-0 text-[11px] text-slate-400">Booking {(p.bookingId || "").slice(-8) || "—"}</p>
                    </div>
                    <p className="m-0 text-sm font-bold text-slate-900">{toNaira(p.amount || 0)}</p>
                    <div>
                      <p className="m-0 mb-px text-xs text-slate-700">{fmtDate(p.paidAt || p.createdAt)}</p>
                      <p className="m-0 text-[11px] text-slate-400">
                        {p.paidAt ? new Date(p.paidAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </p>
                    </div>
                    <StatusBadge status={p.status} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </div>
                  {/* Mobile card */}
                  <div
                    onClick={() => setDetail(p)}
                    className="sm:hidden p-4 border-b border-slate-50 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="m-0 text-xs font-mono text-slate-700 font-semibold truncate">{shortRef(p.reference || "")}</p>
                        <p className="m-0 text-[11px] text-slate-400">Booking {(p.bookingId || "").slice(-8) || "—"}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="m-0 text-sm font-bold text-slate-900">{toNaira(p.amount || 0)}</p>
                      <p className="m-0 text-[11px] text-slate-400">{fmtDate(p.paidAt || p.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Pagination */}
      {!paymentsLoading && !paymentsError && totalPages > 1 && (
        <div className="flex items-center justify-between mt-3.5 flex-wrap gap-2">
          <span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
          <div className="flex gap-1.5">
            <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
            <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {detail && (
        <>
          <div onClick={() => setDetail(null)} className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-40" />
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[360px] bg-white z-50 shadow-[-8px_0_40px_rgba(0,0,0,0.14)] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="m-0 text-[15px] font-bold text-slate-900">Payment Detail</h3>
              <button onClick={() => setDetail(null)} className="w-[30px] h-[30px] rounded-lg border border-slate-200 bg-white cursor-pointer flex items-center justify-center text-lg text-slate-500 leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="text-center bg-slate-50 rounded-[14px] p-6 mb-6 border border-slate-200">
                <p className="m-0 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
                <p className="m-0 mb-3 text-[28px] sm:text-[32px] font-black text-slate-900 tracking-tighter">{toNaira(detail.amount || 0)}</p>
                <StatusBadge status={detail.status} />
              </div>
              {[
                { label: "Reference", value: detail.reference, mono: true },
                { label: "Booking ID", value: detail.bookingId },
                { label: "Customer ID", value: detail.customerId },
                { label: "Provider ID", value: detail.providerId },
                { label: "Currency", value: detail.currency },
                { label: "Paid At", value: detail.paidAt ? `${fmtDate(detail.paidAt)} · ${new Date(detail.paidAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}` : "Not yet paid" },
              ].map(f => (
                <div key={f.label} className="flex items-start justify-between py-3 border-b border-slate-100 gap-3">
                  <p className="m-0 text-xs font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">{f.label}</p>
                  <div className="flex items-center gap-2 min-w-0">
                    <p className={`m-0 text-[13px] text-slate-700 break-all text-right ${f.mono ? "font-mono" : ""}`}>{f.value || "—"}</p>
                    {f.value && <CopyBtn value={f.value} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "account", label: "Payout Account", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
  { id: "payments", label: "Payments", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
];

export default function PaymentDashboard() {
  const [tab, setTab] = useState("account");
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-7 pb-12 bg-slate-100 min-h-0">
          <div className="mb-6">
            <h1 className="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">Payments & Payouts</h1>
            <p className="text-[13px] text-slate-500 mt-1">Manage your payout account and track all incoming payments.</p>
          </div>

          <div className="flex gap-0.5 bg-white border border-slate-200 rounded-xl p-1 mb-6 w-full sm:w-fit overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all whitespace-nowrap flex-1 sm:flex-none ${tab === id ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : "bg-transparent text-slate-500"}`}>
                <Icon /> {label}
              </button>
            ))}
          </div>

          {tab === "account"  && <ManageBankAccount />}
          {tab === "payments" && <PaymentsTab />}
        </main>
      </div>
    </div>
  );
}