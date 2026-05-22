




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prof from "../../public/images/prof.png";
import api from "../api/axios";

/* ─── Validation ────────────────────────────────────────────────────────────── */
const validate = (form) => {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  else if (form.firstName.trim().length < 2) errors.firstName = "At least 2 characters";

  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  else if (form.lastName.trim().length < 2) errors.lastName = "At least 2 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (form.phoneNumber.replace(/\D/g, "").length < 10) {
    errors.phoneNumber = "Phone number must be at least 10 digits";
  }

  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 8) errors.password = "At least 8 characters";
  else if (!/[A-Z]/.test(form.password)) errors.password = "Include one uppercase letter";
  else if (!/[0-9]/.test(form.password)) errors.password = "Include at least one number";

  if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password";
  else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";

  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.state.trim()) errors.state = "State is required";
  if (!form.city.trim()) errors.city = "City is required";

  return errors;
};

/* ─── Password Strength ──────────────────────────────────────────────────────── */
const getStrength = (pw) => {
  if (!pw) return { level: 0, label: "", color: "bg-gray-200" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { level: 2, label: "Fair", color: "bg-amber-500" };
  if (score === 3) return { level: 3, label: "Good", color: "bg-blue-500" };
  return { level: 4, label: "Strong", color: "bg-emerald-500" };
};

/* ─── Reusable Field Component ───────────────────────────────────────────────── */
const Field = ({ label, error, hint, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-700">{label}</label>
    {children}
    {error ? (
      <span className="flex items-center gap-1 text-xs text-red-500">
        <span>⚠</span> {error}
      </span>
    ) : hint ? (
      <span className="text-xs text-gray-400">{hint}</span>
    ) : null}
  </div>
);

/* ─── Spinner Component ─────────────────────────────────────────────────────── */
const LoadingSpinner = () => (
  <svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
    <circle style={{ opacity: .25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path style={{ opacity: .75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const SignupPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "",
    password: "", confirmPassword: "", address: "", state: "", city: "",
  });

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      const v = validate(updated);
      setErrors((p) => ({ ...p, [name]: v[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const v = validate(form);
    setErrors((p) => ({ ...p, [name]: v[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const v = validate(form);
    if (Object.keys(v).length) {
      setErrors(v);
      toast.error("Please fix the errors before submitting.");
      return;
    }

  
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
        role: accountType === "user" ? "customer" : "provider",
        address: form.address,
        state: form.state,
        city: form.city,
      });

      console.log("Signup response:", res);

      // ── Extract values safely ──────────────────────────────────────────────
      const token = res.data?.token;
      const user = res.data?.user;

      // userId: try every possible field name the backend might return
      const userId =
        user?.id ||
        user?.userId ||
        user?._id ||
        res.data?.id ||
        res.data?.userId ||
        null;

      const email =
        user?.email ||
        res.data?.email ||
        form.email; // fallback to what the user typed

      // Only store if we actually have values — never store "undefined" strings
      if (token) localStorage.setItem("token", token);

      if (email) localStorage.setItem("email", email);
      else {
        toast.error("Signup response missing email. Contact support.");
        return;
      }

      if (userId) localStorage.setItem("userId", String(userId));
      else {
        toast.error("Signup response missing user ID. Contact support.");
        return;
      }

      toast.success("Account created! Redirecting...", { autoClose: 1800 });
      setTimeout(() => navigate("/verify"), 1900);

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (fieldName) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white outline-none transition-all duration-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-300 bg-red-50/50"
        : "border-gray-300"
    }`;

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-[1100px] bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.10)]">

          {/* ── Image Side ── */}
          <div className="w-full md:w-[45%] h-48 md:h-auto shrink-0">
            <img src={prof} alt="Profile" className="object-cover w-full h-full" />
          </div>

          {/* ── Form Side ── */}
          <div className="flex flex-col flex-1 max-h-screen p-6 overflow-y-auto md:p-10">

            <h1 className="text-2xl md:text-[1.6rem] font-bold text-gray-800 mb-1">
              Create Account
            </h1>
            <p className="mb-5 text-sm text-gray-500">
              Join the leading auto repair marketplace today.
            </p>

            {/* Account Type Tabs */}
            <div className="flex p-1 mb-5 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setAccountType("user")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  accountType === "user"
                    ? "bg-blue-800 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => { setAccountType("mechanic"); navigate("/booking/1"); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  accountType === "mechanic"
                    ? "bg-blue-800 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mechanic
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Field label="First Name" error={touched.firstName && errors.firstName}>
                  <input type="text" name="firstName" placeholder="First name"
                    value={form.firstName} onChange={handleChange} onBlur={handleBlur}
                    className={inputClass("firstName")} />
                </Field>
                <Field label="Last Name" error={touched.lastName && errors.lastName}>
                  <input type="text" name="lastName" placeholder="Last name"
                    value={form.lastName} onChange={handleChange} onBlur={handleBlur}
                    className={inputClass("lastName")} />
                </Field>
              </div>

              <Field label="Email" error={touched.email && errors.email}>
                <input type="email" name="email" placeholder="Enter your email"
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                  className={inputClass("email")} />
              </Field>

              <Field label="Phone Number" error={touched.phoneNumber && errors.phoneNumber} hint="Include country code e.g. +234...">
                <input type="tel" name="phoneNumber" placeholder="+2347032090989"
                  value={form.phoneNumber} onChange={handleChange} onBlur={handleBlur}
                  className={inputClass("phoneNumber")} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Field label="Password" error={touched.password && errors.password}>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} name="password"
                      placeholder="Enter password" value={form.password}
                      onChange={handleChange} onBlur={handleBlur}
                      className={`${inputClass("password")} pr-10`} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-600">
                      {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              i <= strength.level ? strength.color : "bg-gray-200"
                            }`} />
                        ))}
                      </div>
                      <span className={`text-[10px] font-semibold mt-0.5 block ${
                        strength.level === 1 ? "text-red-500" :
                        strength.level === 2 ? "text-amber-500" :
                        strength.level === 3 ? "text-blue-500" :
                        "text-emerald-500"
                      }`}>{strength.label}</span>
                    </div>
                  )}
                </Field>
                <Field label="Confirm Password" error={touched.confirmPassword && errors.confirmPassword}>
                  <div className="relative">
                    <input type={showCpw ? "text" : "password"} name="confirmPassword"
                      placeholder="Confirm password" value={form.confirmPassword}
                      onChange={handleChange} onBlur={handleBlur}
                      className={`${inputClass("confirmPassword")} pr-10`} />
                    <button type="button" onClick={() => setShowCpw(!showCpw)}
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-600">
                      {showCpw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </Field>
              </div>

              <Field label="Address" error={touched.address && errors.address}>
                <input type="text" name="address" placeholder="123 Main St"
                  value={form.address} onChange={handleChange} onBlur={handleBlur}
                  className={inputClass("address")} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Field label="State" error={touched.state && errors.state}>
                  <input type="text" name="state" placeholder="e.g. Lagos"
                    value={form.state} onChange={handleChange} onBlur={handleBlur}
                    className={inputClass("state")} />
                </Field>
                <Field label="City" error={touched.city && errors.city}>
                  <input type="text" name="city" placeholder="e.g. Ikeja"
                    value={form.city} onChange={handleChange} onBlur={handleBlur}
                    className={inputClass("city")} />
                </Field>
              </div>

              <button type="submit" disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-3 mt-1 text-sm font-semibold text-white transition-colors bg-blue-800 rounded-lg hover:bg-blue-900 disabled:opacity-55 disabled:cursor-not-allowed">
                {loading ? (<><LoadingSpinner /> Creating Account...</>) : "Create Account"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            <a href="https://accounts.google.com/"
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <FcGoogle size={22} />
              Sign in with Google
            </a>

            <p className="mt-4 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="inline-flex items-center gap-1 font-bold text-blue-800 hover:underline">
                Sign In <HiArrowRight className="text-xs" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;





