





import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../api/axios";

/* ── Icons ─────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Component ──────────────────────────────────────────── */
const ForgotPassword = () => {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");
  const [touched, setTouched]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValid = validateEmail(email);

  const handleSend = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    if (!email) { setError("Email address is required"); return; }
    if (!isValid) { setError("Please enter a valid email address"); return; }

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email, channel: "EMAIL" });
      localStorage.setItem("resetEmail", email);
      setSubmitted(true);
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasError = error && touched;

  /* ── Success state ──────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="relative flex items-center justify-center w-full min-h-screen px-3 py-10 overflow-hidden bg-blue-50 sm:px-6 lg:px-8">
        {/* Orbs */}
        <div className="absolute -top-48 -right-36 w-[500px] h-[500px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute rounded-full pointer-events-none -bottom-32 -left-24 w-96 h-96 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 rounded-full pointer-events-none top-1/3 left-1/4" />

        <div className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(28,82,175,0.14),_0_6px_20px_rgba(0,0,0,0.06)] px-5 sm:px-10 md:px-14 lg:px-16 py-12 sm:py-14 text-center">

          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_8px_28px_rgba(34,197,94,0.40)]">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl text-slate-900">
            Check your email
          </h2>
          <p className="mb-8 text-sm leading-relaxed sm:text-base text-slate-500">
            We've sent a password reset code to{" "}
            <span className="font-mono text-xs sm:text-[13px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md whitespace-nowrap">
              {email}
            </span>
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 h-1.5 rounded-full w-full animate-pulse" />
          </div>
          <p className="text-xs font-medium sm:text-sm text-slate-400">Redirecting to reset page…</p>
        </div>
      </div>
    );
  }

  /* ── Main form ──────────────────────────────────────────── */
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen px-3 py-10 overflow-hidden sm:px-6 lg:px-8">

      {/* Background orbs */}
      <div className="absolute -top-48 -right-36 w-[500px] h-[500px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute rounded-full pointer-events-none -bottom-32 -left-24 w-96 h-96 opacity-20 blur-3xl animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full pointer-events-none top-1/3 left-1/4" />
      <div className="absolute w-40 h-40 rounded-full pointer-events-none bottom-1/4 right-1/4 opacity-10 blur-2xl" />

      {/* Card */}
      <div
        className={`
          relative z-10 w-full
          max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl
          bg-white rounded-3xl border border-slate-100
          shadow-[0_20px_60px_rgba(28,82,175,0.14),_0_6px_20px_rgba(0,0,0,0.06)]
          px-5 sm:px-10 md:px-14 lg:px-16
          py-8 sm:py-10 md:py-12
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        `}
      >

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-800 text-[10.5px] sm:text-xs font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 animate-pulse" />
            Account Recovery
          </span>
        </div>

        {/* Shield icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center shadow-[0_8px_28px_rgba(28,82,175,0.42)]">
            <ShieldIcon />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center sm:text-3xl text-slate-900">
          Forgot Password?
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-center sm:text-base text-slate-500 sm:mb-10">
          No worries — enter your email and we'll send you a reset code.
        </p>

        <form onSubmit={handleSend} className="flex flex-col gap-5 sm:gap-6">

          {/* Email field */}
          <div>
            <p className="text-[10.5px] sm:text-xs font-bold tracking-[0.08em] uppercase text-slate-400 mb-2.5">
              Email Address
            </p>
            <div
              className={`
                flex items-center rounded-xl border-2 overflow-hidden w-full
                transition-all duration-200
                focus-within:shadow-[0_0_0_3px_rgba(28,82,175,0.18)]
                ${hasError
                  ? "border-red-400 bg-red-50 focus-within:border-red-500 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.18)]"
                  : email && isValid
                  ? "border-blue-700 bg-white focus-within:border-blue-700"
                  : "border-slate-200 bg-slate-50 focus-within:border-blue-700 focus-within:bg-white"
                }
              `}
            >
              <span className={`pl-4 flex-shrink-0 flex ${hasError ? "text-red-400" : "text-slate-400"}`}>
                <Mail size={17} />
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                onBlur={() => setTouched(true)}
                className="flex-1 px-3 py-3.5 sm:py-4 bg-transparent outline-none text-sm sm:text-base text-slate-800 placeholder:text-slate-400 min-w-0"
              />
              {/* Valid indicator */}
              {email && isValid && !hasError && (
                <span className="pr-3.5 flex-shrink-0 flex">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>

            {/* Error message */}
            {hasError && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <AlertCircle size={14} className="flex-shrink-0 text-red-500" />
                <p className="text-xs font-medium text-red-500">{error}</p>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full flex items-center justify-center gap-2
              py-4 sm:py-[18px] rounded-xl
              text-white text-sm sm:text-base font-semibold tracking-wide
              bg-gradient-to-r from-blue-900 to-blue-600
              shadow-[0_6px_20px_rgba(28,82,175,0.40)]
              transition-all duration-200
              enabled:hover:-translate-y-0.5
              enabled:hover:shadow-[0_12px_28px_rgba(28,82,175,0.50)]
              enabled:active:translate-y-0 enabled:active:shadow-none
              disabled:opacity-60 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending reset code…</span>
              </>
            ) : (
              <>
                <span>Send Reset Code</span>
                <ArrowIcon />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Back to login */}
          <Link
            to="/login"
            className="
              w-full flex items-center justify-center gap-2
              py-3.5 sm:py-4 rounded-xl
              text-sm sm:text-base font-semibold text-slate-600
              border-2 border-slate-200 bg-white
              transition-all duration-200
              hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50
              hover:-translate-y-0.5
            "
          >
            <ArrowLeft size={17} />
            <span>Back to Sign In</span>
          </Link>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center sm:text-sm text-slate-500 sm:mt-8">
          Remember your password?{" "}
          <Link to="/login" className="font-semibold text-blue-700 transition-all hover:underline underline-offset-2">
            Sign in here
          </Link>
        </p>

        {/* Trust strip */}
        <div className="flex items-center justify-center gap-4 pt-5 mt-6 border-t sm:gap-6 border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400">
            <LockIcon />
            <span className="text-[11px] sm:text-xs font-medium">Encrypted</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <SpamIcon />
            <span className="text-[11px] sm:text-xs font-medium">Check spam folder</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] sm:text-xs font-medium">Expires in 10 min</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;