import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const BankIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const ResolveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const PaymentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const CopyIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const SpinnerIcon = () => (
  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const dots = {
    success: "bg-emerald-500",
    failed: "bg-red-500",
    pending: "bg-amber-500",
    processing: "bg-blue-500 animate-pulse",
  };
  const key = status?.toLowerCase() || "pending";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${map[key] || map.pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[key] || dots.pending}`} />
      {status || "Pending"}
    </span>
  );
};

// ─── Copy Button ──────────────────────────────────────────────────────────────
const CopyBtn = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="text-slate-400 hover:text-slate-600 transition-colors" title="Copy">
      {copied ? <span className="text-[10px] font-semibold text-emerald-600">✓</span> : <CopyIcon />}
    </button>
  );
};

// ─── Tab: Banks List ──────────────────────────────────────────────────────────
const BanksList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const fetchBanks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/payments/banks/list");
      setBanks(data?.data || data || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load banks. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBanks(); }, [fetchBanks]);

  const filtered = banks.filter(b =>
    b.name?.toLowerCase().includes(query.toLowerCase()) ||
    b.code?.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSearch = (e) => { setQuery(e.target.value); setPage(1); };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Supported Banks</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${filtered.length} bank${filtered.length !== 1 ? "s" : ""} available`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search bank or code…"
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-56 placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={fetchBanks}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors"
            title="Refresh"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span className="text-red-500">⚠</span>
          {error}
          <button onClick={fetchBanks} className="ml-auto text-red-600 font-medium underline underline-offset-2 hover:no-underline">Retry</button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paginated.map((bank) => (
              <div
                key={bank.code}
                className="group flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all cursor-default"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{bank.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{bank.code}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                  <CopyBtn value={bank.code} />
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {paginated.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium text-slate-600">No banks match "{query}"</p>
              <p className="text-sm mt-1">Try a different name or sort code</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-slate-400">
                Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  return p <= totalPages ? (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 text-xs rounded-lg transition-colors ${p === page
                        ? "bg-blue-600 text-white border border-blue-600"
                        : "border border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                    >
                      {p}
                    </button>
                  ) : null;
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ─── Tab: Account Resolver ────────────────────────────────────────────────────
const AccountResolver = () => {
  const [banks, setBanks] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState("");

  useEffect(() => {
    api.get("/payments/banks/list")
      .then(({ data }) => setBanks(data?.data || data || []))
      .catch(() => { });
  }, []);

  const selectedBank = banks.find(b => b.code === bankCode);
  const filteredBanks = banks.filter(b =>
    b.name?.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.code?.toLowerCase().includes(bankSearch.toLowerCase())
  );

;


const resolve = async () => {
  if (!accountNumber || !bankCode) return;

  console.log("Account Number:", accountNumber);
  console.log("Bank Code:", bankCode);

  setLoading(true);
  setError(null);
  setResult(null);

  try {
      const { data } = await api.get("/payments/banks/resolve", {
  params: {
    account_number: accountNumber,
    bank_code: bankCode,
  },
});

    console.log("SUCCESS RESPONSE:", data);

    setResult(data?.data || data);
  } catch (e) {
    console.log("FULL ERROR:", e);
    console.log("ERROR RESPONSE:", e?.response);
    console.log("ERROR DATA:", e?.response?.data);
    console.log("ERROR STATUS:", e?.response?.status);

    setError(
      e?.response?.data?.message ||
      "Could not resolve account. Check the details and try again."
    );
  } finally {
    setLoading(false);
  }
};


  const isValid = accountNumber.length === 10 && bankCode;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Resolve Account</h2>
        <p className="text-sm text-slate-500 mt-0.5">Verify a bank account number before initiating a transfer</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
        {/* Account Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Account Number</label>
          <input
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter 10-digit account number"
            className="w-full px-4 py-2.5 text-sm font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-300 placeholder:font-sans"
          />
          <p className={`text-xs ${accountNumber.length === 10 ? "text-emerald-600" : "text-slate-400"}`}>
            {accountNumber.length}/10 digits
          </p>
        </div>

        {/* Bank Selector */}
        <div className="space-y-1.5 relative">
          <label className="text-sm font-medium text-slate-700">Bank</label>
          <button
            onClick={() => setBankOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            <span className={selectedBank ? "text-slate-800" : "text-slate-400"}>
              {selectedBank ? selectedBank.name : "Select a bank"}
            </span>
            <div className="flex items-center gap-2 text-slate-400">
              {selectedBank && <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{selectedBank.code}</span>}
              <ChevronIcon open={bankOpen} />
            </div>
          </button>

          {bankOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
                  <input
                    autoFocus
                    value={bankSearch}
                    onChange={e => setBankSearch(e.target.value)}
                    placeholder="Search banks…"
                    className="w-full pl-8 pr-3 py-2 text-sm focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <ul className="max-h-52 overflow-y-auto">
                {filteredBanks.map(bank => (
                  <li key={bank.code}>
                    <button
                      onClick={() => { setBankCode(bank.code); setBankOpen(false); setBankSearch(""); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors text-left ${bank.code === bankCode ? "bg-blue-50 text-blue-700" : "text-slate-700"}`}
                    >
                      <span>{bank.name}</span>
                      <span className="font-mono text-xs text-slate-400">{bank.code}</span>
                    </button>
                  </li>
                ))}
                {filteredBanks.length === 0 && (
                  <li className="px-4 py-3 text-sm text-slate-400 text-center">No banks found</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Resolve Button */}
        <button
          onClick={resolve}
          disabled={!isValid || loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {loading ? <><SpinnerIcon /> Resolving…</> : "Resolve Account"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span className="text-red-500 mt-0.5">⚠</span>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="text-lg">✓</span>
            <span className="font-semibold text-sm">Account verified</span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Account Name", value: result.account_name },
              { label: "Account Number", value: result.account_number, mono: true },
              { label: "Bank", value: result.bank_name || selectedBank?.name },
            ].map(({ label, value, mono }) => value ? (
              <div key={label} className="flex items-center justify-between py-2 border-b border-emerald-100 last:border-0">
                <span className="text-xs text-emerald-600 font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm text-slate-800 font-semibold ${mono ? "font-mono" : ""}`}>{value}</span>
                  <CopyBtn value={value} />
                </div>
              </div>
            ) : null)}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Tab: Payments ────────────────────────────────────────────────────────────
const STATUSES = ["all", "success", "failed", "pending", "processing"];

const PaymentRow = ({ payment, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
        onClick={() => setOpen(o => !o)}
      >
        <td className="px-4 py-3">
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {payment.jobId?.slice(0, 8) || "—"}…
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-slate-700 font-medium">{payment.amount ? `₦${Number(payment.amount).toLocaleString()}` : "—"}</td>
        <td className="px-4 py-3 text-sm text-slate-600">{payment.recipient || payment.accountName || "—"}</td>
        <td className="px-4 py-3"><StatusBadge status={payment.status} /></td>
        <td className="px-4 py-3 text-xs text-slate-400">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—"}</td>
        <td className="px-4 py-3 text-slate-400"><ChevronIcon open={open} /></td>
      </tr>
      {open && (
        <tr className="bg-blue-50/40 border-b border-blue-100">
          <td colSpan={6} className="px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {Object.entries(payment).map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-blue-500 font-medium capitalize">{k.replace(/_/g, " ")}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-slate-700 font-mono text-xs break-all">{String(v || "—")}</p>
                    {v && <CopyBtn value={String(v)} />}
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("success");
  const [jobId, setJobId] = useState("8b8b8b8b-8b8b-8b8b-8b8b-8b8b8b8b8b8b");
  const [jobInput, setJobInput] = useState(jobId);
  const [searched, setSearched] = useState(false);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const params = {};
      if (status !== "all") params.status = status;
      if (jobInput.trim()) params.jobId = jobInput.trim();
      const { data } = await api.get("/payments", { params });
      const list = data?.data || data || [];
      setPayments(Array.isArray(list) ? list : [list]);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  }, [status, jobInput]);

  useEffect(() => { fetchPayments(); }, []);

  const counts = payments.reduce((acc, p) => {
    const s = p.status?.toLowerCase();
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Payments</h2>
          <p className="text-sm text-slate-500 mt-0.5">Filter and track payment transactions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-2">
          {/* Job ID */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Job ID</label>
            <input
              value={jobInput}
              onChange={e => setJobInput(e.target.value)}
              placeholder="UUID…"
              className="w-64 px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-300 placeholder:font-sans"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-8 cursor-pointer"
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchPayments}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <SearchIcon /> Search
          </button>
        </div>
      </div>

      {/* Summary chips */}
      {payments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(counts).map(([s, c]) => (
            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">
              <StatusBadge status={s} />
              <span className="font-semibold">{c}</span>
            </span>
          ))}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
            Total: {payments.length}
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span>⚠</span> {error}
          <button onClick={fetchPayments} className="ml-auto font-medium underline underline-offset-2 hover:no-underline">Retry</button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-blue-600 gap-3">
          <SpinnerIcon /> <span className="text-sm text-slate-500">Fetching payments…</span>
        </div>
      )}

      {/* Table */}
      {!loading && !error && payments.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Job ID", "Amount", "Recipient", "Status", "Date", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => <PaymentRow key={p.jobId || i} payment={p} index={i} />)}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && searched && payments.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-medium text-slate-600">No payments found</p>
          <p className="text-sm mt-1">Try adjusting the status filter or job ID</p>
        </div>
      )}
    </div>
  );
};

// ─── Root: Dashboard ──────────────────────────────────────────────────────────
const TABS = [
  { id: "banks", label: "Banks", icon: BankIcon },
  { id: "resolve", label: "Resolve Account", icon: ResolveIcon },
  { id: "payments", label: "Payments", icon: PaymentIcon },
];

export default function PaymentDashboard() {
  const [tab, setTab] = useState("banks");
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} isOnline={isOnline} setIsOnline={setIsOnline} />

        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">Payments & Payouts</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your bank details, resolve accounts, and track payment transactions.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  tab === id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tab === "banks" && <BanksList />}
          {tab === "resolve" && <AccountResolver />}
          {tab === "payments" && <Payments />}
        </main>
      </div>
    </div>
  );
}




