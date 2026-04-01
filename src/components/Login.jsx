// iport React, { useState } from "react";
// impmort { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { HiArrowRight } from "react-icons/hi";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import prof from "../../public/images/prof.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   import { useNavigate } from "react-router-dom";
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault(); 
//     navigate("/dashboard");
//   };
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
//       <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

//        {/* <div className="flex flex-col-reverse w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row"> */}

//         {/* Image Section */}
//         <div className="relative w-full h-64 md:w-1/2 md:h-auto">
//           <img src={prof} alt="Profile" className="object-cover w-full h-full" /> 
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-transparent"></div>
//         </div>

//         {/* Form Section */}
//         <div className="flex flex-col justify-center w-full p-6 md:p-12 md:w-1/2">
//           <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="mb-6 text-gray-600">
//             Sign in to manage your bookings or mechanic jobs.
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//             {/* Email */}
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-gray-700">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />

//                 {/* Toggle Eye */}
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
//                 >
//                   {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                 </span>
//               </div>

//               {/* Forgot Password */}
//               <div className="mt-2 text-right">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm font-bold text-[#1D52AF] hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="p-3 mt-2 text-white transition bg-[#1D52AF] rounded-lg hover:bg-blue-700"
//             >
//               Login
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

//           {/* Sign up */}
//           <p className="text-center text-gray-600">
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="inline-flex items-center gap-1 text-[#1D52AF] hover:underline font-bold"
//             >
//               Sign Up <HiArrowRight className="text-sm" />
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiArrowRight } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import prof from "../../public/images/prof.png";

const Login = () => {
  const navigate = useNavigate(); // ✅ correct place

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ prevent reload

    // 👉 you can add validation or API here later

    navigate("/dashboard"); // ✅ redirect after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

        {/* Image Section */}
        <div className="relative w-full h-64 md:w-1/2 md:h-auto">
          <img src={prof} alt="Profile" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-transparent"></div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center w-full p-6 md:p-12 md:w-1/2">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mb-6 text-gray-600">
            Sign in to manage your bookings or mechanic jobs.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
                  required
                />

                {/* Toggle Eye */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>

              {/* Forgot Password */}
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-bold text-[#1D52AF] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="p-3 mt-2 text-white transition bg-[#1D52AF] rounded-lg hover:bg-blue-700"
            >
              Login
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

          {/* Sign up */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 text-[#1D52AF] hover:underline font-bold"
            >
              Sign Up <HiArrowRight className="text-sm" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

