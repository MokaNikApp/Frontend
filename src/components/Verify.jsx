import React, { useState, useEffect } from "react";
import { HiMail, HiArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email  = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const role   = localStorage.getItem("role"); // "customer" | "provider"

  // focus first input
  useEffect(() => {
    document.getElementById("code-0")?.focus();
  }, []);

  // auto-send OTP on mount
  useEffect(() => {
    if (email && userId) sendOtp();
  }, []);

  // countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const sendOtp = async () => {
    try {
      setResendTimer(60);
      await api.post("/otp/send", {
        purpose: "EMAIL_VERIFICATION",
        channel: "EMAIL",
        userId,
        email,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Please try again.");
      setResendTimer(0);
    }
  };

  // ── Input handlers ────────────────────────────────────────────────────────
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
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

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const submitCode = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/verify-email", { email, otp });

      toast.success("Email verified! Redirecting...", { autoClose: 1800 });

      setTimeout(() => {
        // provider → onboarding; customer → login (or dashboard)
        if (role === "provider") navigate("/booking/1");
        else navigate("/login");
      }, 1900);

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend ────────────────────────────────────────────────────────────────
  const resendCode = async () => {
    if (resendTimer > 0) return;
    await sendOtp();
    toast.success("A new code has been sent to your email.");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <ToastContainer position="top-right" />

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
              Enter the 6-digit code sent to <br />
              <span className="text-[#1D52AF] font-medium">{email}</span>
            </p>

            {/* OTP inputs */}
            <div className="flex justify-center gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center border rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1D52AF] focus:border-[#1D52AF] transition-all"
                />
              ))}
            </div>

            {/* Verify button */}
            <button
              onClick={submitCode}
              disabled={loading || code.join("").length < 6}
              className="w-full bg-[#1D52AF] text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : "Verify Email"}
            </button>

            {/* Resend */}
            <div className="text-center mt-4">
              <button
                onClick={resendCode}
                disabled={resendTimer > 0}
                className="text-[#1D52AF] text-sm hover:underline disabled:text-gray-400 disabled:no-underline transition-colors"
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
              </button>
            </div>

            {/* Back */}
            <p className="mt-4 text-center">
              <Link to="/signup" className="text-[#1D52AF] flex items-center justify-center gap-1 text-sm hover:underline">
                Back to Sign Up <HiArrowRight />
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;





// import React, { useState, useEffect } from "react";
// import { HiMail, HiArrowRight } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// const VerifyEmail = () => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [resendTimer, setResendTimer] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const email = localStorage.getItem("email");
//   const userId = localStorage.getItem("userId");

//   // focus first input
//   useEffect(() => {
//     document.getElementById("code-0")?.focus();
//   }, []);

//   // ✅ AUTO SEND OTP AFTER PAGE LOAD
//   useEffect(() => {
//     if (email && userId) {
//       sendOtp(); // auto send OTP
//     }
//   }, []);

//   // timer
//   useEffect(() => {
//     let timer;
//     if (resendTimer > 0) {
//       timer = setTimeout(() => setResendTimer((p) => p - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [resendTimer]);

//   // ========================
//   // ✅ SEND OTP FUNCTION
//   // ========================
//   const sendOtp = async () => {
//     try {
//       setResendTimer(10);

//       await api.post("/otp/send", {
//         purpose: "EMAIL_VERIFICATION",
//         channel: "EMAIL",
//         userId,
//         email,
//       });

//       console.log("OTP sent automatically");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send OTP");
//       setResendTimer(0);
//     }
//   };

//   // ========================
//   // OTP INPUT HANDLERS
//   // ========================
//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     if (/^\d?$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);

//       if (value && index < 5) {
//         document.getElementById(`code-${index + 1}`)?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const newCode = [...code];

//       if (newCode[index]) {
//         newCode[index] = "";
//       } else if (index > 0) {
//         document.getElementById(`code-${index - 1}`)?.focus();
//         newCode[index - 1] = "";
//       }

//       setCode(newCode);
//     }
//   };

//   // ========================
//   // ✅ VERIFY OTP (FIXED)
//   // ========================
//   const submitCode = async () => {
//     const otp = code.join("");

//     if (otp.length !== 6) {
//       alert("Please enter full 6-digit code");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/verify-email", {
//         email,
//         otp,
//       });
//       console.log(res)

//       alert("Email verified successfully");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========================
//   // RESEND OTP
//   // ========================
//   const resendCode = async () => {
//     if (resendTimer > 0) return;

//     await sendOtp();
//     alert("OTP resent successfully");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#F2F4F8]">
//       <div className="flex flex-col items-center justify-center flex-grow px-4 py-10 sm:px-6">
//         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md sm:p-8">

//           <div className="bg-[#E0E7FF] p-3 rounded-full mb-4 w-max mx-auto">
//             <HiMail className="text-3xl text-[#1D52AF]" />
//           </div>

//           <h1 className="mb-2 text-xl font-bold text-center sm:text-2xl">
//             Verify Your Email
//           </h1>

//           <p className="mb-6 text-sm text-center text-gray-600 sm:text-base">
//             Enter the 6-digit code sent to <br />
//             <span className="text-[#1D52AF] font-medium">{email}</span>
//           </p>

//           {/* OTP INPUTS */}
//           <div className="flex justify-center gap-2 mb-6">
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`code-${index}`}
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 className="w-10 h-10 sm:w-12 sm:h-12 text-center border rounded"
//               />
//             ))}
//           </div>

//           {/* VERIFY */}
//           <button
//             onClick={submitCode}
//             disabled={loading}
//             className="w-full bg-[#1D52AF] text-white py-2 sm:py-3 rounded mb-4"
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>

//           {/* RESEND */}
//           <div className="text-center mt-4">
//             <button
//               onClick={resendCode}
//               disabled={resendTimer > 0}
//               className="text-[#1D52AF] text-sm hover:underline"
//             >
//               {resendTimer > 0
//                 ? `Resend in ${resendTimer}s`
//                 : "Resend Code"}
//             </button>
//           </div>  

//           {/* BACK */}
//           <p className="mt-4 text-center">
//             <Link to="/signup" className="text-[#1D52AF] flex items-center justify-center gap-1">
//               Back to Sign Up <HiArrowRight />
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
