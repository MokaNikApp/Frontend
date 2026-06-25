



import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle, HiRefresh, HiArrowLeft } from "react-icons/hi";
import api from "../../api/axios"; // adjust path based on your folder structure

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [message, setMessage] = useState("");

  // Paystack sends back ?reference=xxx or ?trxref=xxx
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const pendingRef = localStorage.getItem("paystack_pending_reference");
  const pendingJobId = localStorage.getItem("paystack_pending_jobId");

  useEffect(() => {
    const verifyPayment = async () => {
      const refToVerify = reference || pendingRef;

      if (!refToVerify) {
        setStatus("failed");
        setMessage("No payment reference found. Please check your email for confirmation.");
        return;
      }

      try {
        // Call YOUR backend to verify the payment with Paystack
        const res = await api.post("/payments/verify", {
          reference: refToVerify,
          jobId: pendingJobId,
        });

        if (res.data?.data?.status === "success" || res.data?.status === "success") {
          setStatus("success");
          setMessage("Your payment has been confirmed successfully!");
          // Clean up
          localStorage.removeItem("paystack_pending_reference");
          localStorage.removeItem("paystack_pending_jobId");
        } else {
          setStatus("failed");
          setMessage(res.data?.message || "Payment could not be verified.");
        }
      } catch (err) {
        setStatus("failed");
        setMessage(err.response?.data?.message || "We could not verify your payment. If you were charged, please contact support.");
      }
    };

    verifyPayment();
  }, [reference, pendingRef, pendingJobId]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#1C52AF] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium text-lg">Verifying your payment...</p>
        <p className="text-sm text-gray-400">Please do not close this window</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-gray-50">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
          <HiCheckCircle size={56} className="text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-500 text-center max-w-md">{message}</p>
        <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 mt-4 w-full max-w-sm">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Reference</span>
            <span className="font-mono text-gray-700">{reference || pendingRef}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => navigate("/services")}
            className="px-6 py-3 bg-[#1C52AF] text-white rounded-xl font-semibold hover:bg-blue-800 transition-all active:scale-95 flex items-center gap-2">
            <HiArrowLeft size={18} /> Back to My Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-gray-50">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-2">
        <HiXCircle size={56} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Payment Failed</h1>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
      <div className="flex gap-3 mt-6">
        <button onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95">
          <HiRefresh size={18} /> Retry Verification
        </button>
        <button onClick={() => navigate("/my-service")}
          className="px-5 py-3 bg-[#1C52AF] text-white rounded-xl font-semibold hover:bg-blue-800 transition-all active:scale-95">
          Back to Services
        </button>
      </div>
    </div>
  );
}
