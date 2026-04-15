import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const [active, setActive] = useState("intro");

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "info", title: "Information We Collect" },
    { id: "use", title: "How We Use Information" },
    { id: "legal", title: "Legal Basis" },
    { id: "share", title: "Sharing of Information" },
    { id: "retention", title: "Data Retention" },
    { id: "rights", title: "Your Rights" },
    { id: "security", title: "Data Security" },
    { id: "location", title: "Location Data" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "contact", title: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActive(id);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 130;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;

          if (scrollPos >= top && scrollPos < bottom) {
            setActive(sec.id);
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen mb-12">

      {/* HEADER */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-24 py-6 sm:py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          MokaNik Mobile Car Service Platform (Nigeria) — Effective April 2026
        </p>
      </div>

      

      {/* LAYOUT */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24 h-fit">
          <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
            <p className="text-xs text-gray-400 px-3 py-2 uppercase">
              Sections
            </p>

            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm mb-1 transition-all ${
                  active === s.id
                    ? "bg-blue-50 text-[#1C52AF] font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3 space-y-8">

          <Section id="intro" title="Introduction">
            This Privacy Policy explains how MokaNik collects, uses, and protects
            your data in compliance with the Nigeria Data Protection Act (NDPA).
          </Section>

          <Section id="info" title="Information We Collect">
            <strong>Personal:</strong> Name, phone, email, profile photo, payment data
            <br /><br />
            <strong>Service:</strong> Vehicle details, service history, location
            <br /><br />
            <strong>Technical:</strong> Device type, IP address, app usage logs
          </Section>

          <Section id="use" title="How We Use Information">
            We use your data to provide services, match technicians, process payments,
            communicate updates, improve experience, and comply with legal obligations.
          </Section>

          <Section id="legal" title="Legal Basis for Processing">
            We process data based on consent, contract necessity, legal obligations,
            and legitimate business interests.
          </Section>

          <Section id="share" title="Sharing of Information">
            We may share data with technicians, payment providers, analytics services,
            and regulators when required. We do not sell your data.
          </Section>

          <Section id="retention" title="Data Retention">
            Data is retained only as long as needed for service delivery, legal compliance,
            and dispute resolution.
          </Section>

          <Section id="rights" title="Your Rights (NDPA)">
            You can access, correct, delete, or restrict your data, withdraw consent,
            and file complaints with NDPC.
          </Section>

          <Section id="security" title="Data Security">
            We use encryption, secure servers, and access controls. However, no system
            is 100% secure.
          </Section>

          <Section id="location" title="Location Data">
            Location is used for service delivery. You may disable it, but some features
            will not work properly.
          </Section>

          <Section id="cookies" title="Cookies & Tracking">
            We use cookies to improve performance, analyze usage, and personalize experience.
            You can control them in your browser settings.
          </Section>

          <Section id="contact" title="Contact">
            Email: info@308digital.com <br />
            Lagos: Nahco Complex, Ikeja <br />
            Abuja: Gwarinpa, Abuja
          </Section>

          {/* FOOTER TRUST CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Your privacy matters
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              By using MokaNik, you acknowledge and accept this Privacy Policy.
            </p>

            <button className="mt-4 w-full bg-[#1C52AF] hover:bg-[#163f8a] text-white py-3 rounded-xl font-medium transition-all active:scale-95">
              I Understand
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* SECTION COMPONENT */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 sm:mb-12"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {children}
      </p>
    </motion.section>
  );
}