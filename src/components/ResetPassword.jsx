


import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const OTP_LENGTH = 6;

const strengthMeta = [
  { label: "" },
  { label: "Weak" },
  { label: "Fair" },
  { label: "Good" },
  { label: "Strong" },
];

const strengthBarColor = (barIndex, strength) => {
  if (barIndex >= strength) return "bg-slate-200";
  if (strength === 1) return "bg-red-500";
  if (strength === 2) return "bg-orange-400";
  if (strength === 3) return "bg-yellow-400";
  return "bg-green-500";
};

const strengthLabelColor = (strength) => {
  if (strength === 1) return "text-red-500";
  if (strength === 2) return "text-orange-400";
  if (strength === 3) return "text-yellow-500";
  if (strength === 4) return "text-green-500";
  return "";
};

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

/* ── Icons ─────────────────────────────────────────────── */
const LockIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-white">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XMarkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Reusable password input ────────────────────────────── */
const PasswordField = ({ label, placeholder, value, onChange, show, onToggle, hasError, hasSuccess, hint }) => (
  <div className="w-full">
    <p className="text-[10.5px] sm:text-xs font-bold tracking-[0.08em] uppercase text-slate-400 mb-2">
      {label}
    </p>
    <div
      className={`
        flex items-center rounded-xl border-2 overflow-hidden w-full
        transition-all duration-200
        focus-within:shadow-[0_0_0_3px_rgba(28,82,175,0.18)]
        ${hasError
          ? "border-red-400 bg-red-50 focus-within:border-red-500"
          : hasSuccess
          ? "border-green-400 bg-green-50 focus-within:border-green-500"
          : value
          ? "border-blue-700 bg-white focus-within:border-blue-700"
          : "border-slate-200 bg-slate-50 focus-within:border-blue-700 focus-within:bg-white"
        }
      `}
    >
      <span className="flex flex-shrink-0 pl-4 text-slate-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-3.5 sm:py-4 bg-transparent outline-none text-sm sm:text-base text-slate-800 placeholder:text-slate-400 min-w-0"
      />
      {(hasError || hasSuccess) && (
        <span className="flex flex-shrink-0 pr-1">
          {hasSuccess ? <CheckIcon /> : <XMarkIcon />}
        </span>
      )}
      <button
        type="button"
        tabIndex={-1}
        onClick={onToggle}
        className="flex flex-shrink-0 px-4 transition-opacity hover:opacity-60"
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
    {hint && (
      <p className={`text-xs mt-1.5 font-medium ${hasError ? "text-red-500" : "text-green-500"}`}>
        {hint}
      </p>
    )}
  </div>
);

/* ── Main ────────────────────────────────────────────────── */
const ResetPassword = () => {
  const [otp, setOtp]                         = useState(Array(OTP_LENGTH).fill(""));
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew]                 = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [visible, setVisible]                 = useState(false);
  const [touched, setTouched]                 = useState({ confirm: false });
  const inputRefs = useRef([]);
  const navigate  = useNavigate();
  const email     = localStorage.getItem("resetEmail");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    inputRefs.current[0]?.focus();
    return () => clearTimeout(t);
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!paste) return;
    const next = paste.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    setOtp(next);
    inputRefs.current[Math.min(paste.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setTouched({ confirm: true });
    const otpString = otp.join("");
    if (otpString.length < OTP_LENGTH || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;
    try {
      setLoading(true);
      const res = await api.post("/auth/reset-password", {
        email,
        otp: otpString,
        newPassword,
        channel: "EMAIL",
      });
      console.log(res.data);
      
      // Show success toast, then navigate after delay
      toast.success("Password reset successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: () => {
          localStorage.removeItem("resetEmail");
          navigate("/login");
        }
      });
      
    } catch (err) {
      console.log("RESET ERROR:", err.response?.data);
      toast.error(err?.response?.data?.message || "Reset failed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ── No session ─────────────────────────────────────────── */
  if (!email) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-4">
        <div className="w-full max-w-lg px-8 py-12 text-center bg-white border shadow-xl rounded-3xl sm:px-12 border-slate-100">
          <div className="mb-4 text-5xl">⚠️</div>
          <h2 className="mb-2 text-xl font-bold text-slate-800">Session Expired</h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-500">
            No reset session found. Please restart the process.
          </p>
          <Link to="/forgot-password" className="text-sm font-semibold text-blue-700 underline transition-colors underline-offset-4 hover:text-blue-900">
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  /* ── Derived ─────────────────────────────────────────────── */
  const otpFilled      = otp.every((d) => d !== "");
  const s              = newPassword ? getStrength(newPassword) : 0;
  const passwordsMatch = newPassword === confirmPassword;
  const confirmTouched = touched.confirm && confirmPassword.length > 0;
  const canSubmit      = otpFilled && newPassword.length > 0 && passwordsMatch && !loading;

  const rules = [
    { rule: newPassword.length >= 8,          label: "8+ characters" },
    { rule: /[A-Z]/.test(newPassword),        label: "Uppercase letter" },
    { rule: /[0-9]/.test(newPassword),        label: "Number" },
    { rule: /[^A-Za-z0-9]/.test(newPassword), label: "Special character" },
  ];

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen px-3 py-10 overflow-hidden bg-white sm:px-6 lg:px-8">
      {/* ── Background orbs ── */}
      <div className="absolute -top-48 -right-36 w-[500px] h-[500px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute rounded-full pointer-events-none -bottom-32 -left-24 w-96 h-96 opacity-20 blur-3xl animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full pointer-events-none top-1/3 left-1/4" />
      <div className="absolute w-40 h-40 rounded-full pointer-events-none bottom-1/4 right-1/4 opacity-10 blur-2xl" />

      {/* ── Card ── */}
      <div
        className={`
          relative z-10 w-full
          max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl
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
            Secure Reset
          </span>
        </div>

        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center shadow-[0_8px_28px_rgba(28,82,175,0.42)]">
            <LockIcon />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center sm:text-3xl text-slate-900">
          Reset Password
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-center sm:text-base text-slate-500 sm:mb-10">
          Code sent to{" "}
          <span className="font-mono text-xs sm:text-[13px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md whitespace-nowrap">
            {email}
          </span>
        </p>

        <form onSubmit={handleReset} className="flex flex-col gap-5 sm:gap-6">

          {/* ── OTP ── */}
          <div>
            <p className="text-[10.5px] sm:text-xs font-bold tracking-[0.08em] uppercase text-slate-400 mb-3">
              Verification Code
            </p>
            <div
              className="flex items-center justify-between gap-2 sm:gap-3"
              onPaste={handleOtpPaste}
            >
              {otp.map((digit, i) => (
                <React.Fragment key={i}>
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`
                      w-full max-w-[52px] sm:max-w-[60px] md:max-w-[68px]
                      h-[52px] sm:h-[60px] md:h-[66px]
                      rounded-xl border-2 text-center font-mono
                      text-lg sm:text-xl md:text-2xl font-semibold
                      outline-none caret-transparent
                      transition-all duration-200
                      focus:-translate-y-0.5
                      focus:shadow-[0_0_0_3px_rgba(28,82,175,0.18)]
                      ${digit
                        ? "border-blue-700 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-700 focus:bg-white"
                      }
                    `}
                  />
                  {i === 2 && (
                    <span className="flex-shrink-0 text-base font-light select-none text-slate-300 sm:text-lg">—</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 tracking-widest uppercase whitespace-nowrap">
              Create new password
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* ── New password ── */}
          <PasswordField
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            show={showNew}
            onToggle={() => setShowNew((v) => !v)}
            hasError={false}
            hasSuccess={false}
          />

          {/* Strength bar */}
          {newPassword.length > 0 && (
            <div className="flex items-center gap-2 -mt-3">
              <div className="flex gap-1.5 flex-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strengthBarColor(i, s)}`}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold min-w-[44px] text-right transition-colors duration-300 ${strengthLabelColor(s)}`}>
                {strengthMeta[s]?.label}
              </span>
            </div>
          )}

          {/* Rules grid — 2 cols on mobile, 4 cols on sm+ */}
          {newPassword.length > 0 && (
            <div className="grid grid-cols-2 gap-2 p-3 -mt-2 border sm:grid-cols-4 sm:p-4 rounded-xl bg-slate-50 border-slate-100">
              {rules.map(({ rule, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${rule ? "bg-green-100" : "bg-slate-200"}`}>
                    {rule
                      ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <svg width="6" height="6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#94a3b8" /></svg>
                    }
                  </span>
                  <span className={`text-[10.5px] sm:text-xs font-medium leading-tight ${rule ? "text-green-600" : "text-slate-400"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Confirm password ── */}
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setTouched({ confirm: true });
            }}
            show={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
            hasError={confirmTouched && !passwordsMatch}
            hasSuccess={confirmTouched && passwordsMatch && confirmPassword.length > 0}
            hint={
              confirmTouched && confirmPassword.length > 0
                ? passwordsMatch
                  ? "✓ Passwords match"
                  : "Passwords do not match"
                : ""
            }
          />

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={!canSubmit}
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
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full sm:w-5 sm:h-5 border-white/30 border-t-white animate-spin" />
                <span>Resetting…</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowIcon />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center sm:text-sm text-slate-500">
          Didn't receive the code?{" "}
          <Link
            to="/forgot-password"
            className="font-semibold text-blue-700 transition-all hover:underline underline-offset-2"
          >
            Resend
          </Link>
        </p>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ResetPassword;