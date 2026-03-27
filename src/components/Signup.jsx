


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiArrowRight } from "react-icons/hi";
// import { FcGoogle } from "react-icons/fc";
// import prof from "../../public/images/prof.png";
// import { useNavigate } from "react-router-dom";



// const SignupPage = () => {
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [accountType, setAccountType] = useState("user");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [confirmPassword, setConfirmPassword] = useState("");
  

// const handleSubmit = (e) => {
//   e.preventDefault();

//   // simple validation (optional but recommended)
//   if (password !== confirmPassword) {
//     alert("Passwords do not match");
//     return;
//   }

//   console.log({ fullName, email, accountType, password });

//   // ✅ Redirect to verify page
//   navigate("/verify");
// };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
     
//       <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

//         {/* Image Section */}
//         <div className="relative w-full h-48 md:h-auto md:w-1/2">
//           <img src={prof} alt="Profile" className="object-cover w-full h-full" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-transparent"></div>
//         </div>

//         {/* Form Section */}
//         <div className="flex flex-col justify-center w-full p-5 md:p-12 md:w-1/2">
//           <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Create Account</h1>
//           <p className="mb-6 text-gray-600">
//             Join the leading auto repair marketplace today.
//           </p>

//           {/* Account Type Tabs */}
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-semibold text-gray-700">
//               Account Type
//             </label>
//             <div className="flex p-1 bg-gray-100 rounded-lg">
//               <button
//                 type="button"
//                 onClick={() => setAccountType("user")}
//                 className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//                   accountType === "user"
//                     ? "bg-[#1D52AF] text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setAccountType("mechanic")}
//                 className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//                   accountType === "mechanic"
//                     ? "bg-[#1D52AF] text-white"
//                     : "text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Mechanic
//               </button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">

//             {/* Full Name */}
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Password + Confirm Password */}
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Confirm Password</label>
//                 <input
//                   type="password"
//                   placeholder="Confirm password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full p-3 mt-2 text-white bg-[#1D52AF] rounded-lg hover:bg-blue-700 transition"
//             >
//               Create Account
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-4">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-2 text-sm text-gray-400">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google login */}
//           <a
//             href="https://accounts.google.com/"
//             className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100"
//           >
//             <FcGoogle size={24} />
//             <span>Sign in with Google</span>
//           </a>

//           {/* Login Link */}
//           <p className="mt-6 text-center text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="inline-flex items-center gap-1 text-[#1D52AF] font-bold hover:underline"
//             >
//               Sign In <HiArrowRight className="text-sm" />
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import prof from "../../public/images/prof.png";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState("user");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({ fullName, email, accountType, password });

    navigate("/verify");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

        {/* Image Section */}
        <div className="relative w-full h-48 md:h-auto md:w-1/2">
          <img src={prof} alt="Profile" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-transparent"></div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center w-full p-5 md:p-12 md:w-1/2">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Create Account</h1>
          <p className="mb-6 text-gray-600">
            Join the leading auto repair marketplace today.
          </p>

          {/* Account Type Tabs */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Account Type
            </label>
            <div className="flex p-1 bg-gray-100 rounded-lg">
              
              {/* USER */}
              <button
                type="button"
                onClick={() => setAccountType("user")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  accountType === "user"
                    ? "bg-[#1D52AF] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                User
              </button>

              {/* MECHANIC */}
              <button
                type="button"
                onClick={() => {
                  setAccountType("mechanic");

                  // 🔥 Navigate to booking step
                  navigate("/booking/1");
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  accountType === "mechanic"
                    ? "bg-[#1D52AF] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Mechanic
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-2 text-white bg-[#1D52AF] rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google login */}
          <a
            href="https://accounts.google.com/"
            className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </a>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[#1D52AF] font-bold hover:underline"
            >
              Sign In <HiArrowRight className="text-sm" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;