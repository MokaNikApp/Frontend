





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiArrowRight } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prof from "../../public/images/prof.png";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const { user, token } = res.data;

      // Store token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back! Redirecting...", { autoClose: 1500 });

      // Role-based navigation
      setTimeout(() => {
        if (user.role === "provider" || user.role === "mechanic") {
          navigate("/mechanic/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1600);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check your credentials and try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputBaseClass =
    "w-full px-3 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white outline-none transition-all duration-200 focus:border-blue-800 focus:ring-3 focus:ring-blue-800/10";

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white shadow-xl rounded-xl md:flex-row">

          {/* Image Section */}
          <div className="relative flex-shrink-0 w-full h-48 md:w-1/2 md:h-auto">
            <img src={prof} alt="Profile" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-transparent" />
          </div>

          {/* Form Section */}
          <div className="flex flex-col justify-center w-full p-6 md:p-12 md:w-1/2">
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="mb-6 text-sm text-gray-500">
              Sign in to manage your bookings or mechanic jobs.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBaseClass}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputBaseClass} pr-10`}
                    required
                  />

                  {/* Toggle Eye */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute p-0 text-gray-400 transition-colors transform -translate-y-1/2 bg-transparent border-none cursor-pointer right-3 top-1/2 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="mt-1 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-blue-800 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-3 mt-1 text-sm font-semibold text-white transition-colors duration-200 bg-blue-800 rounded-lg hover:bg-blue-900 disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle style={{ opacity: .25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: .75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Google login */}
            <a
              href="https://accounts.google.com/"
              className="flex items-center justify-center w-full gap-2 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50 no-underline"
            >
              <FcGoogle size={22} />
              Sign in with Google
            </a>

            {/* Sign up */}
            <p className="mt-4 text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-bold text-blue-800 no-underline hover:underline"
              >
                Sign Up <HiArrowRight className="text-xs" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

