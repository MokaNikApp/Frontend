import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";

// ─── Mock Payments (until live endpoint is ready) ───────────────────────────
const MOCK_PAYMENTS = [
  { id: "1", reference: "PAY-2024-ABC123DEF", bookingId: "BK-001", amount: 1500000, status: "success", paidAt: "2024-06-10T14:32:00Z", createdAt: "2024-06-10T14:00:00Z", customerId: "CUS-001", providerId: "PRV-001", currency: "NGN" },
  { id: "2", reference: "PAY-2024-GHI456JKL", bookingId: "BK-002", amount: 750000, status: "pending", paidAt: null, createdAt: "2024-06-11T09:15:00Z", customerId: "CUS-002", providerId: "PRV-001", currency: "NGN" },
  { id: "3", reference: "PAY-2024-MNO789PQR", bookingId: "BK-003", amount: 2200000, status: "success", paidAt: "2024-06-12T16:45:00Z", createdAt: "2024-06-12T16:00:00Z", customerId: "CUS-003", providerId: "PRV-001", currency: "NGN" },
  { id: "4", reference: "PAY-2024-STU012VWX", bookingId: "BK-004", amount: 500000, status: "failed", paidAt: null, createdAt: "2024-06-13T11:20:00Z", customerId: "CUS-004", providerId: "PRV-001", currency: "NGN" },
  { id: "5", reference: "PAY-2024-YZA345BCD", bookingId: "BK-005", amount: 3000000, status: "success", paidAt: "2024-06-14T08:00:00Z", createdAt: "2024-06-14T07:30:00Z", customerId: "CUS-005", providerId: "PRV-001", currency: "NGN" },
  { id: "6", reference: "PAY-2024-EFG678HIJ", bookingId: "BK-006", amount: 900000, status: "abandoned", paidAt: null, createdAt: "2024-06-15T13:00:00Z", customerId: "CUS-006", providerId: "PRV-001", currency: "NGN" },
  { id: "7", reference: "PAY-2024-KLM901NOP", bookingId: "BK-007", amount: 1800000, status: "processing", paidAt: null, createdAt: "2024-06-16T10:00:00Z", customerId: "CUS-007", providerId: "PRV-001", currency: "NGN" },
  { id: "8", reference: "PAY-2024-QRS234TUV", bookingId: "BK-008", amount: 1200000, status: "success", paidAt: "2024-06-17T15:00:00Z", createdAt: "2024-06-17T14:30:00Z", customerId: "CUS-008", providerId: "PRV-001", currency: "NGN" },
];

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

// ─── TAB 1: Banks List (Live API) ────────────────────────────────────────────
const BanksList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PER = 12;

  useEffect(() => {
    let cancelled = false;
    const fetchBanks = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const res = await api.get("/payments/banks/list");
        const data = Array.isArray(res.data) ? res.data : [];
        if (!cancelled) setBanks(data);
      } catch (err) {
        if (!cancelled) setFetchError(err.response?.data?.message || err.message || "Failed to load banks");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchBanks();
    return () => { cancelled = true; };
  }, []);

  const filtered = banks.filter(b =>
    b.name?.toLowerCase().includes(query.toLowerCase()) || b.code?.includes(query)
  );
  const pages = Math.ceil(filtered.length / PER);
  const slice = filtered.slice((page - 1) * PER, page * PER);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Spinner className="mb-3 text-blue-600" width="24" height="24" />
        <p className="text-sm font-medium">Loading supported banks…</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-16 px-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" className="mx-auto mb-3 block"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p className="text-sm font-semibold text-red-600 m-0 mb-1">Could not load banks</p>
        <p className="text-[13px] text-slate-500 m-0 mb-4">{fetchError}</p>
        <button onClick={() => window.location.reload()} className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <div className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">Supported Banks</div>
          <p className="text-[13px] text-slate-500 m-0">{filtered.length} bank{filtered.length !== 1 ? "s" : ""} available</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search name or code…"
            className="h-[38px] pl-8 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-600 transition-colors w-[210px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5 mb-5">
        {slice.map((bank, idx) => (
          <div key={`${bank.code}-${idx}`}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-default transition-all hover:border-blue-300 hover:shadow-md"
          >
            <BankInitial name={bank.name} code={bank.code} />
            <div className="flex-1 min-w-0">
              <p className="m-0 text-[13px] font-semibold text-slate-900 truncate">{bank.name}</p>
              <p className="m-0 text-[11px] font-mono text-slate-400 mt-0.5">{bank.code}</p>
            </div>
            <CopyBtn value={bank.code} />
          </div>
        ))}
      </div>

      {slice.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 block text-slate-300"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <p className="text-sm font-semibold text-slate-600 m-0 mb-1">No banks match "{query}"</p>
          <p className="text-[13px] m-0">Try a different name or bank code</p>
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Showing {(page - 1) * PER + 1}–{Math.min(page * PER, filtered.length)} of {filtered.length}</span>
          <div className="flex gap-1">
            <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50 disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, pages - 4)) + i;
              return p <= pages ? (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer ${page === p ? "bg-blue-600 text-white border-none" : "bg-white text-slate-600 border border-slate-200"}`}>{p}</button>
              ) : null;
            })}
            <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50 disabled:opacity-40" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── TAB 2: Manage Bank Account (Live API) ───────────────────────────────────
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
      const payload = {
        accountNumber: form.accountNumber,
        bankCode: form.bankCode
      };
      // POST for register, PATCH for update
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
      <div className="max-w-[480px] mx-auto">
        <div className="bg-white border-2 border-green-200 rounded-[20px] p-9 text-center shadow-lg shadow-green-100/50">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 m-0 mb-2 tracking-tight">
            {mode === "register" ? "Account Linked" : "Account Updated"}
          </h3>
          <p className="text-[13px] text-slate-500 m-0 mb-6 leading-relaxed">
            Your bank account is ready to receive payouts from completed jobs.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase m-0 mb-1">Subaccount ID</p>
              <p className="text-[13px] font-mono text-blue-600 m-0">{success}</p>
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
    <div className="max-w-[520px] mx-auto">
      {/* Mode toggle */}
      <div className="flex gap-0 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {[
          ["register", "Register Account"],
          ["update", "Update Account"]
        ].map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setError(null); }}
            className={`px-4 py-1.5 rounded-lg border-none text-[13px] font-semibold cursor-pointer transition-all ${mode === m ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-400"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6">
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
                <span className="flex-1">
                  {banksLoading ? "Loading banks…" : selectedBank ? selectedBank.name : "Select your bank"}
                </span>
                {selectedBank && <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{selectedBank.code}</span>}
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
                          <span className="flex-1">{bank.name}</span>
                          <span className="text-[11px] font-mono text-slate-400">{bank.code}</span>
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

// ─── TAB 3: Payments (Mock data until live endpoint) ─────────────────────────
const STATUSES = ["success", "pending", "failed", "abandoned"];

const PaymentsTab = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const LIMIT = 10;

  const payments = statusFilter
    ? MOCK_PAYMENTS.filter(p => p.status === statusFilter)
    : MOCK_PAYMENTS;

  const paginated = payments.slice((page - 1) * LIMIT, page * LIMIT);

  const earned = paginated.filter(p => p.status === "success").reduce((a, p) => a + (p.amount || 0), 0);
  const successCount = paginated.filter(p => p.status === "success").length;
  const pendingCount = paginated.filter(p => p.status === "pending").length;

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Earned (this page)", value: toNaira(earned), color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
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

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {paginated.length === 0 ? (
          <div className="text-center py-16 px-6">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" className="mx-auto mb-3.5 block"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
            <p className="text-[15px] font-bold text-slate-600 m-0 mb-1.5">No payments found</p>
            <p className="text-[13px] text-slate-400 m-0">
              {statusFilter ? `No ${statusFilter} payments yet.` : "Payments will appear here once customers pay for your jobs."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-2.5 border-b border-slate-100">
              {["Reference", "Amount", "Date", "Status", ""].map(h => (
                <span key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
              ))}
            </div>
            {paginated.map((p, i) => (
              <div
                key={p.id || i}
                onClick={() => setDetail(p)}
                className="grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-3.5 items-center cursor-pointer transition-colors hover:bg-slate-50"
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
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      {payments.length > LIMIT && (
        <div className="flex items-center justify-between mt-3.5">
          <span className="text-xs text-slate-400">Page {page}</span>
          <div className="flex gap-1.5">
            <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
            <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={paginated.length < LIMIT} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {detail && (
        <>
          <div onClick={() => setDetail(null)} className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-40" />
          <div className="fixed top-0 right-0 bottom-0 w-[360px] bg-white z-50 shadow-[-8px_0_40px_rgba(0,0,0,0.14)] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="m-0 text-[15px] font-bold text-slate-900">Payment Detail</h3>
              <button onClick={() => setDetail(null)} className="w-[30px] h-[30px] rounded-lg border border-slate-200 bg-white cursor-pointer flex items-center justify-center text-lg text-slate-500 leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="text-center bg-slate-50 rounded-[14px] p-6 mb-6 border border-slate-200">
                <p className="m-0 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
                <p className="m-0 mb-3 text-[32px] font-black text-slate-900 tracking-tighter">{toNaira(detail.amount || 0)}</p>
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
  { id: "banks", label: "Banks", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> },
  { id: "account", label: "Payout Account", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
  { id: "payments", label: "Payments", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
];

export default function PaymentDashboard() {
  const [tab, setTab] = useState("banks");
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <main className="flex-1 overflow-y-auto p-7 pb-12 bg-slate-100 min-h-0">
          <div className="mb-6">
            <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">Payments & Payouts</h1>
            <p className="text-[13px] text-slate-500 mt-1">Manage your payout account and track all incoming payments.</p>
          </div>

          <div className="flex gap-0.5 bg-white border border-slate-200 rounded-xl p-1 mb-6 w-fit">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all ${tab === id ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : "bg-transparent text-slate-500"}`}>
                <Icon /> {label}
              </button>
            ))}
          </div>

          {tab === "banks"    && <BanksList />}
          {tab === "account"  && <ManageBankAccount />}
          {tab === "payments" && <PaymentsTab />}
        </main>
      </div>
    </div>
  );
}















// import { useState, useRef, useEffect } from "react";
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import api from "../../api/axios";
// // ─── Mock Data ───────────────────────────────────────────────────────────────
// const MOCK_BANKS = [
//   { code: "044", name: "Access Bank" },
//   { code: "023", name: "Citibank Nigeria" },
//   { code: "050", name: "EcoBank Nigeria" },
//   { code: "070", name: "Fidelity Bank" },
//   { code: "011", name: "First Bank of Nigeria" },
//   { code: "214", name: "First City Monument Bank" },
//   { code: "058", name: "Guaranty Trust Bank" },
//   { code: "030", name: "Heritage Bank" },
//   { code: "301", name: "Jaiz Bank" },
//   { code: "082", name: "Keystone Bank" },
//   { code: "076", name: "Polaris Bank" },
//   { code: "101", name: "Providus Bank" },
//   { code: "221", name: "Stanbic IBTC Bank" },
//   { code: "068", name: "Standard Chartered Bank" },
//   { code: "232", name: "Sterling Bank" },
//   { code: "032", name: "Union Bank of Nigeria" },
//   { code: "033", name: "United Bank for Africa" },
//   { code: "215", name: "Unity Bank" },
//   { code: "035", name: "Wema Bank" },
//   { code: "057", name: "Zenith Bank" },
//   { code: "063", name: "Diamond Bank" },
//   { code: "103", name: "Globus Bank" },
//   { code: "105", name: "Lotus Bank" },
//   { code: "107", name: "Optimus Bank" },
// ];

// const MOCK_PAYMENTS = [
//   { id: "1", reference: "PAY-2024-ABC123DEF", bookingId: "BK-001", amount: 1500000, status: "success", paidAt: "2024-06-10T14:32:00Z", createdAt: "2024-06-10T14:00:00Z", customerId: "CUS-001", providerId: "PRV-001", currency: "NGN" },
//   { id: "2", reference: "PAY-2024-GHI456JKL", bookingId: "BK-002", amount: 750000, status: "pending", paidAt: null, createdAt: "2024-06-11T09:15:00Z", customerId: "CUS-002", providerId: "PRV-001", currency: "NGN" },
//   { id: "3", reference: "PAY-2024-MNO789PQR", bookingId: "BK-003", amount: 2200000, status: "success", paidAt: "2024-06-12T16:45:00Z", createdAt: "2024-06-12T16:00:00Z", customerId: "CUS-003", providerId: "PRV-001", currency: "NGN" },
//   { id: "4", reference: "PAY-2024-STU012VWX", bookingId: "BK-004", amount: 500000, status: "failed", paidAt: null, createdAt: "2024-06-13T11:20:00Z", customerId: "CUS-004", providerId: "PRV-001", currency: "NGN" },
//   { id: "5", reference: "PAY-2024-YZA345BCD", bookingId: "BK-005", amount: 3000000, status: "success", paidAt: "2024-06-14T08:00:00Z", createdAt: "2024-06-14T07:30:00Z", customerId: "CUS-005", providerId: "PRV-001", currency: "NGN" },
//   { id: "6", reference: "PAY-2024-EFG678HIJ", bookingId: "BK-006", amount: 900000, status: "abandoned", paidAt: null, createdAt: "2024-06-15T13:00:00Z", customerId: "CUS-006", providerId: "PRV-001", currency: "NGN" },
//   { id: "7", reference: "PAY-2024-KLM901NOP", bookingId: "BK-007", amount: 1800000, status: "processing", paidAt: null, createdAt: "2024-06-16T10:00:00Z", customerId: "CUS-007", providerId: "PRV-001", currency: "NGN" },
//   { id: "8", reference: "PAY-2024-QRS234TUV", bookingId: "BK-008", amount: 1200000, status: "success", paidAt: "2024-06-17T15:00:00Z", createdAt: "2024-06-17T14:30:00Z", customerId: "CUS-008", providerId: "PRV-001", currency: "NGN" },
// ];

// // ─── Status badge config ─────────────────────────────────────────────────────
// const STATUS_CONFIG = {
//   success:    { classes: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500", label: "Success" },
//   failed:     { classes: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", label: "Failed" },
//   pending:    { classes: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", label: "Pending" },
//   abandoned:  { classes: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-400", label: "Abandoned" },
//   processing: { classes: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", label: "Processing" },
// };

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// const toNaira = (kobo) => `₦${(kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
// const shortRef = (r = "") => r.length > 18 ? `${r.slice(0, 8)}…${r.slice(-6)}` : r;
// const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—";

// const bankColor = (code = "") => {
//   let h = 0;
//   for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % 360;
//   return `hsl(${h},55%,62%)`;
// };

// // ─── Sub-components ──────────────────────────────────────────────────────────

// const CopyBtn = ({ value }) => {
//   const [ok, setOk] = useState(false);
//   const copy = () => {
//     navigator.clipboard.writeText(value);
//     setOk(true);
//     setTimeout(() => setOk(false), 1600);
//   };
//   return (
//     <button onClick={copy} title="Copy" className={`inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border transition-all duration-150 cursor-pointer ${ok ? "bg-green-50 border-green-200 text-green-600" : "bg-white border-slate-200 text-slate-400"}`}>
//       {ok ? (
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
//       ) : (
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
//       )}
//     </button>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const s = (status || "pending").toLowerCase();
//   const cfg = STATUS_CONFIG[s] || STATUS_CONFIG.pending;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${cfg.classes}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${s === "processing" ? "animate-pulse" : ""}`} />
//       {cfg.label}
//     </span>
//   );
// };

// const BankInitial = ({ name = "", code = "" }) => {
//   const bg = bankColor(code);
//   return (
//     <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0 tracking-wide" style={{ background: bg }}>
//       {name.charAt(0)}
//     </div>
//   );
// };

// // ─── TAB 1: Banks List ───────────────────────────────────────────────────────
// const BanksList = () => {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const PER = 12;

//   const filtered = MOCK_BANKS.filter(b =>
//     b.name?.toLowerCase().includes(query.toLowerCase()) || b.code?.includes(query)
//   );
//   const pages = Math.ceil(filtered.length / PER);
//   const slice = filtered.slice((page - 1) * PER, page * PER);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//         <div>
//           <div className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">Supported Banks</div>
//           <p className="text-[13px] text-slate-500 m-0">{filtered.length} bank{filtered.length !== 1 ? "s" : ""} available</p>
//         </div>
//         <div className="relative">
//           <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
//           <input
//             value={query}
//             onChange={e => { setQuery(e.target.value); setPage(1); }}
//             placeholder="Search name or code…"
//             className="h-[38px] pl-8 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-600 transition-colors w-[210px]"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5 mb-5">
//         {slice.map((bank, idx) => (
//           <div key={`${bank.code}-${idx}`}
//             className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-default transition-all hover:border-blue-300 hover:shadow-md"
//           >
//             <BankInitial name={bank.name} code={bank.code} />
//             <div className="flex-1 min-w-0">
//               <p className="m-0 text-[13px] font-semibold text-slate-900 truncate">{bank.name}</p>
//               <p className="m-0 text-[11px] font-mono text-slate-400 mt-0.5">{bank.code}</p>
//             </div>
//             <CopyBtn value={bank.code} />
//           </div>
//         ))}
//       </div>

//       {slice.length === 0 && (
//         <div className="text-center py-16 text-slate-400">
//           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 block text-slate-300"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
//           <p className="text-sm font-semibold text-slate-600 m-0 mb-1">No banks match "{query}"</p>
//           <p className="text-[13px] m-0">Try a different name or bank code</p>
//         </div>
//       )}

//       {pages > 1 && (
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-slate-400">Showing {(page - 1) * PER + 1}–{Math.min(page * PER, filtered.length)} of {filtered.length}</span>
//           <div className="flex gap-1">
//             <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50 disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
//             {Array.from({ length: Math.min(5, pages) }, (_, i) => {
//               const p = Math.max(1, Math.min(page - 2, pages - 4)) + i;
//               return p <= pages ? (
//                 <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer ${page === p ? "bg-blue-600 text-white border-none" : "bg-white text-slate-600 border border-slate-200"}`}>{p}</button>
//               ) : null;
//             })}
//             <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50 disabled:opacity-40" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next →</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── TAB 2: Manage Bank Account ──────────────────────────────────────────────
// const ManageBankAccount = () => {
//   const [form, setForm] = useState({ accountNumber: "", bankCode: "" });
//   const [mode, setMode] = useState("register");
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [bankOpen, setBankOpen] = useState(false);
//   const [bankSearch, setBankSearch] = useState("");
//   const bankDropRef = useRef(null);

//   useEffect(() => {
//     const h = (e) => { if (bankDropRef.current && !bankDropRef.current.contains(e.target)) setBankOpen(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const selectedBank = MOCK_BANKS.find(b => b.code === form.bankCode);
//   const filteredBanks = MOCK_BANKS.filter(b =>
//     b.name?.toLowerCase().includes(bankSearch.toLowerCase()) || b.code?.includes(bankSearch)
//   );

//   const handleSubmit = () => {
//     setError(null);
//     if (!form.accountNumber || !form.bankCode) { setError("Please fill in all fields."); return; }
//     if (form.accountNumber.length !== 10) { setError("Account number must be exactly 10 digits."); return; }
//     // Simulate success
//     setSuccess("ACCT_" + Math.random().toString(36).slice(2, 10).toUpperCase());
//   };

//   if (success) {
//     return (
//       <div className="max-w-[480px] mx-auto">
//         <div className="bg-white border-2 border-green-200 rounded-[20px] p-9 text-center shadow-lg shadow-green-100/50">
//           <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
//           </div>
//           <h3 className="text-lg font-extrabold text-slate-900 m-0 mb-2 tracking-tight">
//             {mode === "register" ? "Account Linked" : "Account Updated"}
//           </h3>
//           <p className="text-[13px] text-slate-500 m-0 mb-6 leading-relaxed">
//             Your bank account is ready to receive payouts from completed jobs.
//           </p>
//           <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 flex items-center justify-between">
//             <div>
//               <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase m-0 mb-1">Subaccount ID</p>
//               <p className="text-[13px] font-mono text-blue-600 m-0">{success}</p>
//             </div>
//             <CopyBtn value={success} />
//           </div>
//           <button
//             onClick={() => { setSuccess(null); setMode("update"); setForm({ accountNumber: "", bankCode: "" }); }}
//             className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all"
//           >
//             Update Account
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[520px] mx-auto">
//       {/* Mode toggle */}
//       <div className="flex gap-0 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
//         {[["register", "Register Account"], ["update", "Update Account"]].map(([m, label]) => (
//           <button key={m} onClick={() => { setMode(m); setError(null); }}
//             className={`px-4 py-1.5 rounded-lg border-none text-[13px] font-semibold cursor-pointer transition-all ${mode === m ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-400"}`}>
//             {label}
//           </button>
//         ))}
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="p-6">
//           <div className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-4">
//             {mode === "register" ? "Link payout account" : "Change payout account"}
//           </div>

//           {error && (
//             <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700 mb-4">
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Bank selector */}
//           <div className="flex flex-col gap-1.5 mb-4">
//             <label className="text-xs font-semibold text-slate-700 tracking-wide">Bank</label>
//             <div ref={bankDropRef} className="relative">
//               <button
//                 onClick={() => setBankOpen(o => !o)}
//                 className={`w-full h-[42px] pl-3.5 pr-9 rounded-xl border text-sm text-left cursor-pointer flex items-center gap-2.5 transition-colors font-[inherit] ${bankOpen ? "border-blue-600" : "border-slate-200"} ${selectedBank ? "text-slate-900" : "text-slate-400"} bg-white`}
//               >
//                 {selectedBank && <BankInitial name={selectedBank.name} code={selectedBank.code} />}
//                 <span className="flex-1">{selectedBank ? selectedBank.name : "Select your bank"}</span>
//                 {selectedBank && <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{selectedBank.code}</span>}
//                 <svg className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform text-slate-400 pointer-events-none ${bankOpen ? "rotate-180" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
//               </button>

//               {bankOpen && (
//                 <div className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
//                   <div className="p-2 pb-1.5 border-b border-slate-100">
//                     <div className="relative">
//                       <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
//                       <input
//                         autoFocus
//                         value={bankSearch}
//                         onChange={e => setBankSearch(e.target.value)}
//                         placeholder="Search banks…"
//                         className="w-full h-[34px] pl-7 pr-2.5 border border-slate-200 rounded-lg text-[13px] outline-none font-[inherit] box-border"
//                       />
//                     </div>
//                   </div>
//                   <ul className="max-h-[220px] overflow-y-auto m-0 py-1 list-none">
//                     {filteredBanks.map((bank, idx) => (
//                       <li key={`${bank.code}-${idx}`}>
//                         <button
//                           onClick={() => { setForm(f => ({ ...f, bankCode: bank.code })); setBankOpen(false); setBankSearch(""); }}
//                           className={`w-full flex items-center gap-2.5 px-3.5 py-2 border-none text-[13px] cursor-pointer text-left transition-colors ${bank.code === form.bankCode ? "bg-blue-50 text-blue-700 font-semibold" : "bg-transparent text-slate-700 font-normal hover:bg-slate-50"}`}
//                         >
//                           <BankInitial name={bank.name} code={bank.code} />
//                           <span className="flex-1">{bank.name}</span>
//                           <span className="text-[11px] font-mono text-slate-400">{bank.code}</span>
//                         </button>
//                       </li>
//                     ))}
//                     {filteredBanks.length === 0 && (
//                       <li className="p-3.5 text-[13px] text-slate-400 text-center">No banks found</li>
//                     )}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Account number */}
//           <div className="flex flex-col gap-1.5 mb-6">
//             <label className="text-xs font-semibold text-slate-700 tracking-wide">Account Number</label>
//             <div className="relative">
//               <input
//                 value={form.accountNumber}
//                 onChange={e => setForm(f => ({ ...f, accountNumber: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
//                 placeholder="0123456789"
//                 className="w-full h-[42px] pl-3.5 pr-14 text-sm text-slate-900 bg-white border border-slate-200 rounded-xl outline-none font-mono tracking-wider focus:border-blue-600 transition-colors box-border"
//               />
//               <span className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold font-mono ${form.accountNumber.length === 10 ? "text-green-600" : "text-slate-400"}`}>
//                 {form.accountNumber.length}/10
//               </span>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             disabled={!form.accountNumber || !form.bankCode}
//             className={`w-full h-[42px] rounded-xl border-none bg-blue-600 text-white text-sm font-semibold cursor-pointer shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 ${!form.accountNumber || !form.bankCode ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
//           >
//             {mode === "register" ? "Link Bank Account" : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── TAB 3: Payments ─────────────────────────────────────────────────────────
// const STATUSES = ["success", "pending", "failed", "abandoned"];

// const PaymentsTab = () => {
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [detail, setDetail] = useState(null);
//   const LIMIT = 10;

//   const payments = statusFilter
//     ? MOCK_PAYMENTS.filter(p => p.status === statusFilter)
//     : MOCK_PAYMENTS;

//   const paginated = payments.slice((page - 1) * LIMIT, page * LIMIT);

//   const earned = paginated.filter(p => p.status === "success").reduce((a, p) => a + (p.amount || 0), 0);
//   const successCount = paginated.filter(p => p.status === "success").length;
//   const pendingCount = paginated.filter(p => p.status === "pending").length;

//   return (
//     <div>
//       {/* Stats row */}
//       <div className="grid grid-cols-3 gap-3 mb-5">
//         {[
//           { label: "Earned (this page)", value: toNaira(earned), color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
//           { label: "Successful", value: successCount, color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
//           { label: "Pending", value: pendingCount, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
//         ].map(s => (
//           <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-4`}>
//             <p className="m-0 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
//             <p className={`m-0 text-[22px] font-extrabold ${s.color} tracking-tight`}>{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex items-center gap-2 mb-4 flex-wrap">
//         {["", ...STATUSES].map(s => (
//           <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
//             className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${statusFilter === s ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white text-slate-500"}`}>
//             {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         {paginated.length === 0 ? (
//           <div className="text-center py-16 px-6">
//             <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" className="mx-auto mb-3.5 block"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
//             <p className="text-[15px] font-bold text-slate-600 m-0 mb-1.5">No payments found</p>
//             <p className="text-[13px] text-slate-400 m-0">
//               {statusFilter ? `No ${statusFilter} payments yet.` : "Payments will appear here once customers pay for your jobs."}
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-2.5 border-b border-slate-100">
//               {["Reference", "Amount", "Date", "Status", ""].map(h => (
//                 <span key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
//               ))}
//             </div>
//             {paginated.map((p, i) => (
//               <div
//                 key={p.id || i}
//                 onClick={() => setDetail(p)}
//                 className="grid grid-cols-[1fr_130px_140px_110px_40px] gap-2 px-5 py-3.5 items-center cursor-pointer transition-colors hover:bg-slate-50"
//               >
//                 <div>
//                   <p className="m-0 mb-0.5 text-xs font-mono text-slate-700 font-semibold">{shortRef(p.reference || "")}</p>
//                   <p className="m-0 text-[11px] text-slate-400">Booking {(p.bookingId || "").slice(-8) || "—"}</p>
//                 </div>
//                 <p className="m-0 text-sm font-bold text-slate-900">{toNaira(p.amount || 0)}</p>
//                 <div>
//                   <p className="m-0 mb-px text-xs text-slate-700">{fmtDate(p.paidAt || p.createdAt)}</p>
//                   <p className="m-0 text-[11px] text-slate-400">
//                     {p.paidAt ? new Date(p.paidAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—"}
//                   </p>
//                 </div>
//                 <StatusBadge status={p.status} />
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       {/* Pagination */}
//       {payments.length > LIMIT && (
//         <div className="flex items-center justify-between mt-3.5">
//           <span className="text-xs text-slate-400">Page {page}</span>
//           <div className="flex gap-1.5">
//             <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
//             <button className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] font-medium cursor-pointer hover:bg-slate-50 transition-all disabled:opacity-40" disabled={paginated.length < LIMIT} onClick={() => setPage(p => p + 1)}>Next →</button>
//           </div>
//         </div>
//       )}

//       {/* Detail drawer */}
//       {detail && (
//         <>
//           <div onClick={() => setDetail(null)} className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-40" />
//           <div className="fixed top-0 right-0 bottom-0 w-[360px] bg-white z-50 shadow-[-8px_0_40px_rgba(0,0,0,0.14)] flex flex-col">
//             <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
//               <h3 className="m-0 text-[15px] font-bold text-slate-900">Payment Detail</h3>
//               <button onClick={() => setDetail(null)} className="w-[30px] h-[30px] rounded-lg border border-slate-200 bg-white cursor-pointer flex items-center justify-center text-lg text-slate-500 leading-none">×</button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-5">
//               <div className="text-center bg-slate-50 rounded-[14px] p-6 mb-6 border border-slate-200">
//                 <p className="m-0 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
//                 <p className="m-0 mb-3 text-[32px] font-black text-slate-900 tracking-tighter">{toNaira(detail.amount || 0)}</p>
//                 <StatusBadge status={detail.status} />
//               </div>
//               {[
//                 { label: "Reference", value: detail.reference, mono: true },
//                 { label: "Booking ID", value: detail.bookingId },
//                 { label: "Customer ID", value: detail.customerId },
//                 { label: "Provider ID", value: detail.providerId },
//                 { label: "Currency", value: detail.currency },
//                 { label: "Paid At", value: detail.paidAt ? `${fmtDate(detail.paidAt)} · ${new Date(detail.paidAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}` : "Not yet paid" },
//               ].map(f => (
//                 <div key={f.label} className="flex items-start justify-between py-3 border-b border-slate-100 gap-3">
//                   <p className="m-0 text-xs font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">{f.label}</p>
//                   <div className="flex items-center gap-2 min-w-0">
//                     <p className={`m-0 text-[13px] text-slate-700 break-all text-right ${f.mono ? "font-mono" : ""}`}>{f.value || "—"}</p>
//                     {f.value && <CopyBtn value={f.value} />}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ─── Root ─────────────────────────────────────────────────────────────────────
// const TABS = [
//   { id: "banks", label: "Banks", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> },
//   { id: "account", label: "Payout Account", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
//   { id: "payments", label: "Payments", icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
// ];

// export default function PaymentDashboard() {
//   const [tab, setTab] = useState("banks");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-100">
//       <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//         <main className="flex-1 overflow-y-auto p-7 pb-12 bg-slate-100 min-h-0">
//           <div className="mb-6">
//             <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">Payments & Payouts</h1>
//             <p className="text-[13px] text-slate-500 mt-1">Manage your payout account and track all incoming payments.</p>
//           </div>

//           <div className="flex gap-0.5 bg-white border border-slate-200 rounded-xl p-1 mb-6 w-fit">
//             {TABS.map(({ id, label, icon: Icon }) => (
//               <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all ${tab === id ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : "bg-transparent text-slate-500"}`}>
//                 <Icon /> {label}
//               </button>
//             ))}
//           </div>

//           {tab === "banks"    && <BanksList />}
//           {tab === "account"  && <ManageBankAccount />}
//           {tab === "payments" && <PaymentsTab />}
//         </main>
//       </div>
//     </div>
//   );
// }