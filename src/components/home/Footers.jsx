import { FaGlobe, FaEnvelope, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  const customerLinks = [
    { label: "How it Works", to: "/how-it-works" },
    { label: "Help Center", to: "/help" },
    { label: "Pricing Guide", to: "/pricing" },
    { label: "Service Areas", to: "/locations" },
    { label: "Customer Reviews", to: "/reviews" },
  ];

  const mechanicLinks = [
    { label: "Join as a Pro", to: "/join-mechanic" },
    { label: "Mechanic Portal", to: "/mechanic/login" },
    { label: "Resource Center", to: "/resources" },
    { label: "Success Stories", to: "/success-stories" },
  ];

  const supportLinks = [
    { label: "Contact Us", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ];

  const iconLinks = [
    { icon: <FaGlobe />, to: "https://www.mokanik.com", label: "Website" },
    { icon: <FaEnvelope />, to: "mailto:info@308digital.com", label: "Email" },
    { icon: <FaBell />, to: "/notifications", label: "Notifications" },
  ];

  return (
    <footer className="bg-[#15256E] text-gray-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-24">

      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-4">
            <img
              src="/images/logo.png"
              alt="MokaNik Logo"
              className="h-10 sm:h-12"
            />

            <p className="text-sm leading-relaxed text-white max-w-xs">
              Connecting car owners with trusted local mechanics for fast,
              transparent, and reliable repair services.
            </p>
          </div>

          {/* CUSTOMER LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Customers</h3>
            <ul className="space-y-3 text-sm">
              {customerLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MECHANIC LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Mechanics</h3>
            <ul className="space-y-3 text-sm">
              {mechanicLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs sm:text-sm text-white">
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
                className="
                  w-9 h-9 flex items-center justify-center
                  rounded-full bg-white/10
                  hover:bg-white/20
                  transition-all duration-200
                  active:scale-95
                "
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