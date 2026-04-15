



import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Terms() {
  const [active, setActive] = useState("intro");

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "service", title: "Nature of Service" },
    { id: "rights", title: "User Rights" },
    { id: "obligations", title: "Customer Obligations" },
    { id: "payments", title: "Payments" },
    { id: "refunds", title: "Refunds & Cancellation" },
    { id: "liability", title: "Liability" },
    { id: "data", title: "Data Protection" },
    { id: "dispute", title: "Dispute Resolution" },
    { id: "contact", title: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActive(id);
  };

  // 🔥 AUTO ACTIVE SECTION (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen mb-8">

      {/* HEADER */}
      <div className="mx-auto px-4 sm:px-6 lg:px-24 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          MokaNik Mobile Car Service Platform (Nigeria) — Effective April 2026
        </p>
      </div>

      {/* LAYOUT */}
      <div className="mx-auto px-4 sm:px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-4 gap-10">

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
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all mb-1 ${
                  active === s.id
                    ? "bg-blue-50 text-[#1C52AF] font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3 space-y-8 ">

          <Section id="intro" title="Introduction">
            These Terms govern your use of MokaNik, a platform connecting
            customers with independent vehicle service providers. By using the
            Platform, you agree to comply with Nigerian laws including FCCPA 2018.
          </Section>

          <Section id="service" title="Nature of Service">
            • We are a technology intermediary, not a direct repair provider.
            <br />• Technicians are independent contractors.
            <br />• We do not guarantee outcomes but enforce service standards.
          </Section>

          <Section id="rights" title="User Rights">
            Customers are entitled to reasonable care, transparent pricing, and
            protection against unfair or deceptive practices.
          </Section>

          <Section id="obligations" title="Customer Obligations">
            You must provide accurate vehicle details, ensure safe access, and
            approve additional work before execution.
          </Section>

          <Section id="payments" title="Payments">
            Prices may be fixed or estimated. Final cost depends on approved
            additional work. Payments must be completed via the platform.
          </Section>

          <Section id="refunds" title="Refunds & Cancellation">
            Customers may cancel within the allowed window. Late cancellations
            may attract fees. Refunds depend on service progress.
          </Section>

          <Section id="liability" title="Liability">
            We are not liable for acts of independent technicians but will
            handle verified complaints fairly under applicable law.
          </Section>

          <Section id="data" title="Data Protection">
            We comply with the Nigeria Data Protection Act (NDPA). See Privacy
            Policy for details.
          </Section>

          <Section id="dispute" title="Dispute Resolution">
            Disputes will first be resolved amicably. Unresolved cases may be
            escalated to FCCPC or Nigerian courts.
          </Section>

          <Section id="contact" title="Contact">
            Email: info@308digital.com <br />
            Lagos: Nahco Complex, Ikeja <br />
            Abuja: Gwarinpa, Abuja
          </Section>

          {/* ACCEPT BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md mb-8 sm:mb-12"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Accept Terms
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              By continuing, you agree to all Terms & Conditions above.
            </p>

            <button className="mt-4 w-full bg-[#1C52AF] hover:bg-[#163f8a] text-white py-3 rounded-xl font-medium transition-all active:scale-95">
              Accept & Continue
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* SECTION */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {children}
      </p>
    </motion.section>
  );
}