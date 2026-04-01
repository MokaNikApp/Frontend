




import React, { useState, useEffect } from "react"; 
import { HiMail, HiArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const email = "user@example.com";

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("code-0")?.focus();
  }, []);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        document.getElementById(`code-${index - 1}`)?.focus();
        newCode[index - 1] = "";
      }
      setCode(newCode);
    }
  };

 const submitCode = () => {
  const otp = code.join("");
  if (otp.length < 6) {
    alert("Please enter the full 6-digit code");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    if (otp === "123456") {
      alert("Email verified successfully ✅");

      // Navigate only to Verify2
      navigate("/verify2");
    } else {
      alert("Invalid code ❌");
    }
  }, 1000);
};

  const resendCode = () => {
    if (resendTimer > 0) return;
    setResendTimer(10);
    alert("Verification code resent 📩");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F8]">
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-10 sm:px-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md sm:p-8">
          <div className="bg-[#E0E7FF] p-3 rounded-full mb-4 w-max mx-auto">
            <HiMail className="text-3xl text-[#1D52AF]" />
          </div>

          <h1 className="mb-2 text-xl font-bold text-center sm:text-2xl">
            Verify Your Email
          </h1>

          <p className="mb-6 text-sm text-center text-gray-600 sm:text-base">
            We've sent a 6-digit verification code to your <br />
            <span className="font-thin text-[#1D52AF]">verifying: {email}</span>
            <br />
            Please enter it below to secure your account.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
              />
            ))}
          </div>

          <button
            onClick={submitCode}
            disabled={loading}
            className="w-full bg-[#1D52AF] text-white py-2 sm:py-3 rounded mb-4 hover:bg-[#1D52AF] transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-gray-600 sm:text-sm">
              Didn't receive any code?
            </span>
            <button
              onClick={resendCode}
              disabled={resendTimer > 0}
              className={`text-[#1D52AF] hover:underline text-xs sm:text-sm ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
            </button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#1D52AF] hover:underline flex items-center justify-center gap-1">
            <Link to="/signup" className="flex items-center gap-1">
              Back to Sign Up <HiArrowRight className="text-sm" />
            </Link>
          </p>
        </div>
      </div>

      <footer className="py-4 text-xs text-center text-[#485567] sm:text-sm">
        &copy; 2026 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default VerifyEmail;
