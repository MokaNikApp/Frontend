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
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    const jobIdFromUrl = searchParams.get("jobId");

    setJobId(jobIdFromUrl);

    // ─── 2. GUARD: NO REFERENCE ───
    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found in URL. The payment may have been cancelled or the link is invalid.");
      return;
    }

    // ─── 3. PREVENT DOUBLE VERIFICATION ───
    if (hasVerified.current) return;
    hasVerified.current = true;

    // ─── 4. DEBUG LOGGING ───
    console.log("🔵 PaymentCallback mounted");
    console.log("   URL:", window.location.href);
    console.log("   Extracted reference:", reference);
    console.log("   Extracted jobId:", jobIdFromUrl);

    const verifyPayment = async () => {
      try {
        setStatus("verifying");
        setDebugInfo({ step: "Calling backend", reference, endpoint: `/payments/verify/${reference}` });

        // ─── 5. CALL BACKEND VERIFICATION ───
        const res = await api.get(`/payments/verify/${reference}`);
        console.log("🟢 Verify response:", res.data);
        setDebugInfo(prev => ({ ...prev, backendResponse: res.data }));

        // ─── 6. HANDLE RESPONSE STRUCTURE ───
        // Your backend wraps Paystack response. Common patterns:
        // { status: true, message: "...", data: { ...paystackData } }
        // OR { data: { status: "success", ... } }
        const responseData = res.data?.data || res.data;
        const paystackStatus = responseData?.status; // "success", "failed", "abandoned"
        const amount = responseData?.amount;
        const paidAt = responseData?.paidAt || responseData?.paid_at;

        setPaymentData({
          reference,
          amount,
          paidAt,
          status: paystackStatus,
          jobId: jobIdFromUrl,
          gatewayResponse: responseData?.gateway_response,
          channel: responseData?.channel,
          ...responseData,
        });

        // ─── 7. STATUS HANDLING ───
        if (paystackStatus === "success") {
          setStatus("success");
          setMessage("Payment verified successfully! Your job has been marked as paid.");
        } else if (paystackStatus === "failed") {
          setStatus("failed");
          setMessage("Payment failed. Please try again or contact support.");
        } else if (paystackStatus === "abandoned") {
          setStatus("failed");
          setMessage("Payment was abandoned. You can retry the payment from your services page.");
        } else if (paystackStatus === "pending") {
          setStatus("verifying");
          setMessage("Payment is still processing. Please wait...");
          // Optional: poll again after delay
          setTimeout(() => {
            hasVerified.current = false; // Allow retry
            window.location.reload();
          }, 5000);
        } else {
          setStatus("failed");
          setMessage(`Payment status: ${paystackStatus}. Please contact support if you believe this is an error.`);
        }
      } catch (err) {
        console.error("🔴 Verification error:", err);
        setDebugInfo(prev => ({ ...prev, error: err.message, response: err.response?.data }));

        // ─── 8. DETAILED ERROR HANDLING ───
        let errorMsg = "Failed to verify payment. Please contact support.";
        
        if (err.response) {
          // Server responded with error status
          const statusCode = err.response.status;
          const serverMsg = err.response.data?.message || err.response.data?.error;
          
          if (statusCode === 404) {
            errorMsg = "Transaction not found. It may still be processing or the reference is invalid.";
          } else if (statusCode === 401) {
            errorMsg = "Authentication failed. Please log in again.";
          } else if (statusCode === 502 || statusCode === 503) {
            errorMsg = "Server is temporarily unavailable. Please retry in a moment.";
          } else if (serverMsg) {
            errorMsg = serverMsg;
          }
        } else if (err.request) {
          // Request made but no response
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
  }, [searchParams]);

  const handleGoToJobs = () => navigate("/dashboard");
  
  const handleGoToJobDetail = () => {
    if (jobId) {
      navigate(`/services?highlight=${jobId}`);
    } else {
      handleGoToJobs();
    }
  };

  const handleRetry = () => {
    hasVerified.current = false;
    window.location.reload();
  };

  const formatAmount = (amount) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount / 100);
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
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
              <h2 className="text-lg font-bold text-gray-800">Verifying Payment</h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
            <p className="text-xs text-gray-400">Please do not close this window...</p>
          </div>
        )}

        {/* ─── SUCCESS STATE ─── */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fadeSlide">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
              <HiCheckCircle size={36} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Payment Successful!</h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>

            {paymentData && (
              <div className="w-full bg-gray-50 rounded-xl p-4 text-left flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <HiCurrencyDollar size={16} className="text-[#1C52AF]" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Amount Paid</p>
                    <p className="text-lg font-bold text-[#1C52AF]">{formatAmount(paymentData.amount)}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <HiClipboardList size={16} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Reference</p>
                    <p className="text-sm font-mono text-gray-700 break-all">{paymentData.reference}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <HiCalendar size={16} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Paid At</p>
                    <p className="text-sm text-gray-700">{formatDate(paymentData.paidAt)}</p>
                  </div>
                </div>
                {jobId && (
                  <>
                    <div className="w-full h-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <HiClipboardList size={16} className="text-gray-400" />
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Job ID</p>
                        <p className="text-sm font-mono text-gray-700 break-all">{jobId}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 w-full mt-2">
              <button onClick={handleGoToJobDetail}
                className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                View Job Details <HiArrowRight size={16} />
              </button>
              <button onClick={handleGoToJobs}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95">
                Back to Dashboard
              </button>
            </div>
          </div>
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
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Reference</p>
                <p className="text-sm font-mono text-gray-700 break-all">{paymentData.reference}</p>
              </div>
            )}
            <div className="flex flex-col gap-2 w-full mt-2">
              <button onClick={handleGoToJobs}
                className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95">
                Back to Dashboard
              </button>
              <button onClick={handleRetry}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
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
              <h2 className="text-lg font-bold text-gray-800">Verification Error</h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
            {jobId && <p className="text-xs text-gray-400">Job ID: {jobId}</p>}
            
            {/* Debug info for troubleshooting - remove in production */}
            {debugInfo && process.env.NODE_ENV === "development" && (
              <div className="w-full bg-gray-100 rounded-lg p-3 text-left">
                <p className="text-[10px] text-gray-500 font-mono mb-1">Debug:</p>
                <pre className="text-[10px] text-gray-600 overflow-x-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="flex flex-col gap-2 w-full mt-2">
              <button onClick={handleGoToJobs}
                className="w-full py-3 rounded-xl bg-[#1C52AF] text-white text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95">
                Back to Dashboard
              </button>
              <button onClick={handleRetry}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
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