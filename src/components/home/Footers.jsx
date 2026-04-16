// import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function Footer() {

//   const customerLinks = [
//     { label: "How it Works", to: "#how-it-works" },
//     { label: "Help Center", to: "#contact" },
//     { label: "Pricing Guide", to: "#pricing" },
//     { label: "Service Areas", to: "/contact" },
//     { label: "Customer Reviews", to: "#reviews" },
//   ];

//   const mechanicLinks = [
//     { label: "Join as a Pro", to: "/signup" },
//     { label: "Mechanic Portal", to: "/mec-dashboard" },
//     { label: "Resource Center", to: "/resources" },
//     { label: "Success Stories", to: "/success-stories" },
//   ];

//   const supportLinks = [
//     { label: "Contact Us", to: "/contact" },
//     { label: "Privacy Policy", to: "/privacy" },
//     { label: "Terms of Service", to: "/terms" },
//   ];

//   const iconLinks = [
//     { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
//     { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
//     { icon: <FaBell />, to: "/notifications", label: "Notifications" },
//   ];

//   return (
//     <footer className="bg-[#15256E] text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24">

//       <div className="max-w-6xl mx-auto">

//         {/* TOP SECTION */}
//         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

//           {/* BRAND */}
//           <div className="space-y-4">
//             <img
//               src="/images/logo.png"
//               alt="MokaNik Logo"
//               className="h-10 sm:h-12"
//             />

//             <p className="max-w-xs text-sm leading-relaxed text-white">
//               Connecting car owners with trusted local mechanics for fast,
//               transparent, and reliable repair services.
//             </p>
//           </div>

//           {/* CUSTOMER LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Customers</h3>
//             <ul className="space-y-3 text-sm">
//               {customerLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* MECHANIC LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">For Mechanics</h3>
//             <ul className="space-y-3 text-sm">
//               {mechanicLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* SUPPORT LINKS */}
//           <div>
//             <h3 className="mb-4 font-semibold text-white">Support</h3>
//             <ul className="space-y-3 text-sm">
//               {supportLinks.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-white transition hover:text-white"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-12 border-t border-white/10 sm:flex-row">

//           <p className="text-xs text-white sm:text-sm">
//             © 2026 MokaNik. All rights reserved.
//           </p>

//           {/* ICON LINKS */}
//           <div className="flex items-center gap-3 text-white">

//             {iconLinks.map((item, i) => (
//               <a
//                 key={i}
//                 href={item.to}
//                 target={item.to.startsWith("http") ? "_blank" : "_self"}
//                 rel="noreferrer"
//                 aria-label={item.label}
//                 className="flex items-center justify-center transition-all duration-200 rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
//               >
//                 {item.icon}
//               </a>
//             ))}

//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// }



import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const customerLinks = [
    { label: "How it Works", to: "how-it-works", type: "section" },
    { label: "Help Center", to: "/contact", type: "route" },
    { label: "Pricing Guide", to: "pricing", type: "section" },
    { label: "Service Areas", to: "/contact", type: "route" },
    { label: "Customer Reviews", to: "reviews", type: "section" },
  ];

  const mechanicLinks = [
    { label: "Join as a Pro", to: "/signup", type: "route" },
    { label: "Mechanic Portal", to: "/mec-dashboard", type: "route" },
    { label: "Resource Center", to: "/resources", type: "route" },
    { label: "Success Stories", to: "/providers", type: "route" },
  ];

  const supportLinks = [
    { label: "Contact Us", to: "/contact", type: "route" },
    { label: "Privacy Policy", to: "/privacy", type: "route" },
    { label: "Terms of Service", to: "/terms", type: "route" },
  ];

  const iconLinks = [
    { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
    { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
    { icon: <FaBell />, to: "/notifications", label: "Notifications" },
  ];

  // ✅ SMART NAVIGATION HANDLER
  const handleClick = (item) => {
    if (item.type === "route") {
      navigate(item.to);
    } else {
      const el = document.getElementById(item.to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // fallback if user is on another page
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.to)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 150);
      }
    }
  };

  return (
    <footer className="bg-[#15256E] text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-4">
            <img
              src="/images/logo.png"
              alt="MokaNik Logo"
              className="h-10 sm:h-12"
            />

            <p className="max-w-xs text-sm leading-relaxed text-white">
              Connecting car owners with trusted local mechanics for fast,
              transparent, and reliable repair services.
            </p>
          </div>

          {/* CUSTOMER LINKS */}
          <div>
            <h3 className="mb-4 font-semibold text-white">For Customers</h3>
            <ul className="space-y-3 text-sm">
              {customerLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleClick(item)}
                    className="text-white hover:text-gray-200 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* MECHANIC LINKS */}
          <div>
            <h3 className="mb-4 font-semibold text-white">For Mechanics</h3>
            <ul className="space-y-3 text-sm">
              {mechanicLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleClick(item)}
                    className="text-white hover:text-gray-200 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT LINKS */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleClick(item)}
                    className="text-white hover:text-gray-200 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-12 border-t border-white/10 sm:flex-row">

          <p className="text-xs text-white sm:text-sm">
            © 2026 MokaNik. All rights reserved.
          </p>

          {/* ICON LINKS */}
          <div className="flex items-center gap-3 text-white">

            {iconLinks.map((item, i) => (
              <a
                key={i}
                href={item.to}
                target={item.to.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                aria-label={item.label}
                className="flex items-center justify-center transition-all duration-200 rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 active:scale-95"
              >
                {item.icon}
              </a>
            ))}

          </div>

        </div>

      </div>
    </footer>
  );
}