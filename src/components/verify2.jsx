import React, { useState, useEffect, useRef } from "react";
import { HiDeviceMobile } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Verify2 = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const inputRefs = useRef([]);

  const phone = location.state?.phone || "+234 801 234 5678";

  const maskPhone = (num) => {
    return num.replace(/(\+\d{3})\s?(\d{3})\d{3}(\d{4})/, "$1 $2***$3");
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
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
      if (index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        newCode[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      setCode(newCode);
    }
  };

  const submitCode = () => {
    const otp = code.join("");
    if (otp.length < 6) {
      alert("Enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        alert("Phone number verified successfully ✅");
        navigate("/car-model"); // Only navigates when button clicked
      } else {
        alert("Invalid verification code ❌");
      }
    }, 1000);
  };

  const resendCode = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    alert("A new code has been sent 📩");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F8]">
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-10 sm:px-6">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md sm:p-8">
          <div className="bg-[#E0E7FF] p-3 rounded-full mb-4 w-max mx-auto">
            <HiDeviceMobile className="text-3xl text-[#1D52AF]" />
          </div>

          <h1 className="mb-2 text-xl font-bold text-center sm:text-2xl">
            Verify your phone number
          </h1>

          <div className="mb-6 text-sm text-center text-gray-600 sm:text-base">
            <p>
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-800">{maskPhone(phone)}</span>
            </p>
            <p>Please enter it below to secure your account.</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
              />
            ))}
          </div>

          <button
            onClick={submitCode}
            disabled={loading}
            className="w-full bg-[#1D52AF] text-white py-2 sm:py-3 rounded-lg mb-4 hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-gray-600 sm:text-sm">Didn’t receive the code?</span>
            <button
              onClick={resendCode}
              disabled={resendTimer > 0}
              className={`text-[#1D52AF] text-xs sm:text-sm font-medium ${
                resendTimer > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"
              }`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </button>
          </div>

          <Link
            to="/signup"
            className="mt-4 text-xs sm:text-sm text-[#1D52AF] hover:underline flex justify-center"
          >
            Change phone number
          </Link>
        </div>
      </div>

      <footer className="py-4 text-xs text-center text-[#485567] sm:text-sm">
        © 2026 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Verify2;