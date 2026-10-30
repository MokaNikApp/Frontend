import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiArrowRight,
  HiRefresh,
  HiClipboardList,
  HiCurrencyDollar,
  HiCalendar,
} from "react-icons/hi";
import api from "../../api/axios";

/* ═══════════════════════════════════════════════════════════════
   SUCCESS RECEIPT
   ═══════════════════════════════════════════════════════════════ */
const BRAND = "#1C52AF";
const CONFETTI_COLORS = ["#1C52AF", "#F97316", "#10B981", "#FACC15", "#60A5FA"];

const receiptStyles = `
@keyframes pr-draw { to { stroke-dashoffset: 0; } }
@keyframes pr-pop { 0% { transform: scale(.6); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
@keyframes pr-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pr-fall { 0% { transform: translate3d(0,-10px,0) rotate(0deg); opacity: 1; } 100% { transform: translate3d(var(--dx),240px,0) rotate(var(--rot)); opacity: 0; } }
.pr-pop { animation: pr-pop .5s cubic-bezier(.2,.9,.3,1.2) both; }
.pr-check { stroke-dasharray: 48; stroke-dashoffset: 48; animation: pr-draw .55s .35s ease-out forwards; }
.pr-rise { animation: pr-rise .55s ease-out both; }
.pr-confetti { position: absolute; top: 0; width: 8px; height: 12px; border-radius: 2px; animation: pr-fall 1.8s ease-out forwards; }
@media (prefers-reduced-motion: reduce) {
  .pr-pop, .pr-rise, .pr-confetti { animation: none !important; opacity: 1; }
  .pr-check { animation: none !important; stroke-dashoffset: 0; }
  .pr-confetti { display: none; }
}
@media print {
  body * { visibility: hidden; }
  #payment-receipt, #payment-receipt * { visibility: visible; }
  #payment-receipt { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; }
  .no-print { display: none !important; }
}
`;

function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const end = Number(target);
    if (!isFinite(end)) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || end === 0) {
      setVal(end);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(end * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Confetti() {
  const pieces = Array.from({ length: 26 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    dx: `${((i * 53) % 90) - 45}px`,
    rot: `${(i * 97) % 540}deg`,
    delay: `${(i % 7) * 0.06}s`,
  }));
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-64 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((c, i) => (
        <span
          key={i}
          className="pr-confetti"
          style={{
            left: c.left,
            background: c.color,
            "--dx": c.dx,
            "--rot": c.rot,
            animationDelay: c.delay,
          }}
        />
      ))}
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm text-right ${strong ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}
      >
        {value}
      </span>
    </div>
  );
}

function SuccessReceipt({
  message,
  paymentData,
  amount,
  jobId,
  formatAmount,
  formatDate,
  onViewJob,
  onHistory,
  onDashboard,
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  const shown = useCountUp(amount ?? 0);

  // Optional job details (service + mechanic). Fails silently if unavailable.
  useEffect(() => {
    const id = jobId || paymentData?.jobId;
    if (!id) return;
    let off = false;
    api
      .get(`/jobs/${encodeURIComponent(id)}`)
      .then((r) => {
        if (off) return;
        const d =
          r.data?.data && typeof r.data.data === "object"
            ? r.data.data
            : r.data;
        setJob(d);
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, [jobId, paymentData?.jobId]);

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(paymentData?.reference || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const provider = job?.provider || {};
  const providerName = [provider.firstName, provider.lastName]
    .filter(Boolean)
    .join(" ");
  const initials =
    `${provider.firstName?.[0] || ""}${provider.lastName?.[0] || ""}`.toUpperCase();
  const hasAmount =
    amount !== null && amount !== undefined && isFinite(Number(amount));

  return (
    <div className="relative">
      <style>{receiptStyles}</style>
      <Confetti />

      <div
        id="payment-receipt"
        className="relative flex flex-col items-center text-center"
      >
        {/* Animated check */}
        <div
          className="pr-pop w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg,#10B981,#059669)" }}
        >
          <svg
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path className="pr-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <h2
          className="pr-rise mt-5 text-2xl font-extrabold text-gray-900"
          style={{ animationDelay: ".15s" }}
        >
          Payment successful
        </h2>
        <p
          className="pr-rise mt-1 text-sm text-gray-500 max-w-xs"
          style={{ animationDelay: ".25s" }}
        >
          {message}
        </p>

        {/* Amount */}
        <div className="pr-rise mt-6" style={{ animationDelay: ".35s" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Amount paid
          </p>
          <p
            className="mt-1 text-5xl font-black tracking-tight tabular-nums"
            style={{ color: BRAND }}
          >
            {hasAmount ? formatAmount(shown) : "—"}
          </p>
          {paymentData?.method && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold capitalize">
              Paid by {paymentData.method}
            </span>
          )}
        </div>

        {/* Service + mechanic */}
        {job && (
          <div
            className="pr-rise w-full mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left flex items-center gap-3"
            style={{ animationDelay: ".45s" }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ background: BRAND }}
            >
              {initials || "M"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {job.title || "Your service"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {providerName ? `with ${providerName}` : "Mechanic assigned"}
                {job.scheduledAt
                  ? ` · ${new Date(job.scheduledAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}`
                  : ""}
              </p>
            </div>
          </div>
        )}

        {/* Collapsible receipt */}
        <div
          className="pr-rise w-full mt-4 rounded-2xl border border-gray-100 text-left"
          style={{ animationDelay: ".55s" }}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="no-print w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800"
          >
            Receipt details
            <span
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              ⌄
            </span>
          </button>
          <div
            className={`${open ? "block" : "hidden"} print:block px-4 pb-3 divide-y divide-gray-100`}
          >
            {paymentData?.providerFee != null && (
              <Row
                label="Mechanic's share"
                value={formatAmount(paymentData.providerFee)}
              />
            )}
            {paymentData?.platformFee != null && (
              <Row
                label="Service fee"
                value={formatAmount(paymentData.platformFee)}
              />
            )}
            <Row
              label="Total"
              value={hasAmount ? formatAmount(amount) : "—"}
              strong
            />
            <Row label="Paid on" value={formatDate(paymentData?.paidAt)} />
            <div className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm text-gray-500">Reference</span>
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono text-gray-700 break-all text-right">
                  {paymentData?.reference}
                </span>
                <button
                  type="button"
                  onClick={copyRef}
                  className="no-print text-xs font-semibold shrink-0"
                  style={{ color: BRAND }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </span>
            </div>
          </div>
        </div>

        <p
          className="pr-rise mt-4 text-xs text-gray-400 leading-relaxed max-w-xs"
          style={{ animationDelay: ".65s" }}
        >
          Your money is held securely and released to the mechanic after the
          settlement window. You can request a refund from Payment History
          during that time.
        </p>

        {/* Actions */}
        <div
          className="no-print pr-rise w-full mt-6 flex flex-col gap-2"
          style={{ animationDelay: ".75s" }}
        >
          <button
            onClick={onViewJob}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-md transition active:scale-[.98] hover:opacity-95"
            style={{ background: BRAND }}
          >
            View job details
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => window.print()}
              className="py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[.98] transition"
            >
              Save receipt
            </button>
            <button
              onClick={onHistory}
              className="py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[.98] transition"
            >
              Payment history
            </button>
          </div>
          <button
            onClick={onDashboard}
            className="py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [paymentData, setPaymentData] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null); // For troubleshooting
  const hasVerified = useRef(false);

  useEffect(() => {
    const reference =
      searchParams.get("reference") || searchParams.get("trxref");
    const jobIdFromUrl = searchParams.get("jobId");

    setJobId(jobIdFromUrl);

    // ─── 2. GUARD: NO REFERENCE ───
    if (!reference) {
      setStatus("error");
      setMessage(
        "No payment reference found in URL. The payment may have been cancelled or the link is invalid.",
      );
      return;
    }

    // ─── 3. PREVENT DOUBLE VERIFICATION ───
    // (no "already verified" guard: the effect cleanup cancels stale runs, which
    // keeps React StrictMode's double-mount from skipping verification)

    // ─── 4. DEBUG LOGGING ───
    console.log("🔵 PaymentCallback mounted");
    console.log("   URL:", window.location.href);
    console.log("   Extracted reference:", reference);
    console.log("   Extracted jobId:", jobIdFromUrl);

    // Payments API guide: GET /payments/verify/:reference returns a PLAIN object
    // (no { data } wrapper) with status: initiated | pending | success | failed | refunded
    // and amounts in NAIRA. While "pending" we poll every 3s for ~30s.
    const POLL_MS = 3000;
    const MAX_POLLS = 10;
    let cancelled = false;
    let timer = null;

    const applyResult = (reference, p) => {
      const st = String(p?.status || "").toLowerCase();
      setPaymentData({
        ...p,
        reference: p?.reference || reference,
        jobId: p?.jobId || jobIdFromUrl,
      });
      if (p?.jobId) setJobId(p.jobId);
      if (st === "success") {
        setStatus("success");
        setMessage(
          "Payment verified successfully! Your job has been marked as paid.",
        );
        return true;
      }
      if (st === "failed") {
        setStatus("failed");
        setMessage("Payment failed. Please try again or contact support.");
        return true;
      }
      if (st === "refunded") {
        setStatus("success");
        setMessage("This payment has been refunded.");
        return true;
      }
      return false; // initiated / pending -> keep polling
    };

    const verifyPayment = async (attempt = 0) => {
      try {
        setStatus("verifying");
        setDebugInfo({
          step: "Calling backend",
          reference,
          attempt,
          endpoint: `/payments/verify/${reference}`,
        });
        const res = await api.get(
          `/payments/verify/${encodeURIComponent(reference)}`,
        );
        if (cancelled) return;
        console.log("🟢 Verify response:", res.data);
        const payload =
          res.data?.data && typeof res.data.data === "object"
            ? res.data.data
            : res.data;
        setDebugInfo((prev) => ({ ...prev, backendResponse: res.data }));

        if (applyResult(reference, payload)) return;

        if (attempt < MAX_POLLS) {
          setMessage("Payment is still processing. Please wait...");
          timer = setTimeout(() => verifyPayment(attempt + 1), POLL_MS);
        } else {
          setStatus("error");
          setMessage(
            "We haven't received confirmation yet. If you were charged, it will show in Payment History shortly. You can also retry verification.",
          );
        }
      } catch (err) {
        if (cancelled) return;
        console.error("🔴 Verification error:", err);
        setDebugInfo((prev) => ({
          ...prev,
          error: err.message,
          response: err.response?.data,
        }));

        let errorMsg = "Failed to verify payment. Please contact support.";
        if (err.response) {
          const statusCode = err.response.status;
          let serverMsg =
            err.response.data?.message || err.response.data?.error;
          if (Array.isArray(serverMsg)) serverMsg = serverMsg.join(". ");
          if (statusCode === 404) {
            errorMsg =
              "Transaction not found. It may still be processing or the reference is invalid.";
          } else if (statusCode === 401) {
            errorMsg = "Authentication failed. Please log in again.";
          } else if (statusCode === 403) {
            errorMsg =
              "This payment belongs to another account. Log in as the customer who made it.";
          } else if (statusCode === 502 || statusCode === 503) {
            errorMsg =
              "Server is temporarily unavailable. Please retry in a moment.";
          } else if (serverMsg) {
            errorMsg = serverMsg;
          }
        } else if (err.request) {
          errorMsg = "Network error. Please check your connection and retry.";
        }
        setStatus("error");
        setMessage(errorMsg);
      }
    };

    verifyPayment();

    // ─── 9. CLEANUP LOCALSTORAGE ───
    localStorage.removeItem("paystack_pending_reference");
    localStorage.removeItem("paystack_pending_jobId");

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [searchParams]);

  const handleGoToJobs = () => navigate("/dashboard");

  const handleGoToJobDetail = () => {
    if (jobId) {
      navigate(`/my-services?highlight=${jobId}`);
    } else {
      handleGoToJobs();
    }
  };

  const handleRetry = () => {
    hasVerified.current = false;
    window.location.reload();
  };

  const formatAmount = (amount) => {
    if (
      amount === null ||
      amount === undefined ||
      amount === "" ||
      isNaN(Number(amount))
    )
      return "—";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount));
  };

  const paidAmount =
    paymentData?.totalAmount ??
    paymentData?.total_amount ??
    paymentData?.amount ??
    (paymentData?.providerFee != null && paymentData?.platformFee != null
      ? Number(paymentData.providerFee) + Number(paymentData.platformFee)
      : null);

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
        {/* ─── VERIFYING STATE ─── */}
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-[#1C52AF] border-t-transparent animate-spin" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Verifying Payment
              </h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
            <p className="text-xs text-gray-400">
              Please do not close this window...
            </p>
          </div>
        )}

        {/* ─── SUCCESS STATE ─── */}
        {status === "success" && (
          <SuccessReceipt
            message={message}
            paymentData={paymentData}
            amount={paidAmount}
            jobId={jobId}
            formatAmount={formatAmount}
            formatDate={formatDate}
            onViewJob={handleGoToJobDetail}
            onHistory={() => navigate("/payment-history")}
            onDashboard={handleGoToJobs}
          />
        )}

        {/* ─── FAILED STATE ─── */}
        {status === "failed" && (
          <div className="flex flex-col items-center gap-4 animate-fadeSlide">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <HiExclamationCircle size={36} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Payment Issue</h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
            {paymentData && (
              <div className="w-full bg-gray-50 rounded-xl p-4 text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                  Reference
                </p>
                <p className="text-sm font-mono text-gray-700 break-all">
                  {paymentData.reference}
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={handleGoToJobs}
                className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleRetry}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <HiRefresh size={16} /> Retry Verification
              </button>
            </div>
          </div>
        )}

        {/* ─── ERROR STATE ─── */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 animate-fadeSlide">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <HiExclamationCircle size={36} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Verification Error
              </h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
            {jobId && <p className="text-xs text-gray-400">Job ID: {jobId}</p>}

            {/* Debug info for troubleshooting - remove in production */}
            {debugInfo && process.env.NODE_ENV === "development" && (
              <div className="w-full bg-gray-100 rounded-lg p-3 text-left">
                <p className="text-[10px] text-gray-500 font-mono mb-1">
                  Debug:
                </p>
                <pre className="text-[10px] text-gray-600 overflow-x-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={handleGoToJobs}
                className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleRetry}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <HiRefresh size={16} /> Retry Verification
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide { animation: fadeSlide 0.4s ease; }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 0.7s linear infinite; }
      `}</style>
    </div>
  );
};

export default PaymentCallback;
