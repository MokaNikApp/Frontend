




import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hero() {
  const words = [
    "reliable car service",
    "trusted mechanics at your doorstep",
    "emergency car repair anytime you need",
    "verified experts you can rely on",
    "same-day car service near you",
    "affordable repairs zero workshop stress",
    "quick roadside assistance 24/7",
    "engine diagnostics at home",
  "brake repair without the wait",
  "oil change at your office",
  "battery replacement on the spot",
  "tire service wherever you park",
  "AC repair before your trip",
  "certified auto technicians on demand",
  "mobile mechanic at your location",
  "transparent pricing no hidden fees",
  "quality repairs done right",
  "book online in under 60 seconds",
  "pre-purchase inspection made easy",
  "fleet maintenance for your business",
  "scheduled servicing on your time",
  "exhaust repair while you work",
  "transmission fix at your door",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) setTimeout(() => setIsDeleting(true), 1200);
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes blob {
          0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes ping2 {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to   { transform: translateX(200%)  skewX(-12deg); }
        }

        .fu  { animation: fadeUp   0.65s ease both; }
        .fr  { animation: fadeRight 0.75s ease both; }
        .d1  { animation-delay: 0.07s; }
        .d2  { animation-delay: 0.16s; }
        .d3  { animation-delay: 0.25s; }
        .d4  { animation-delay: 0.34s; }
        .d5  { animation-delay: 0.43s; }

        .float-img {
          animation: fadeRight 0.8s 0.2s ease both,
                     floatY   6s   1s  ease-in-out infinite;
        }
        .blob-bg {
          animation: blob 9s ease-in-out infinite;
        }

        /* shimmer on typed text */
        .shimmer-type {
          background: linear-gradient(90deg, #1C52AF 0%, #1C52AF 40%, #1C52AF 65%, #1C52AF 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.6s linear infinite;
        }

        /* proper blinking cursor */
        .cursor {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          background: #111;
          margin-left: 2px;
          vertical-align: middle;
          animation: cursorBlink 0.85s step-end infinite;
        }

        /* badge ping dot */
        .ping-dot {
          position: relative;
          display: inline-flex;
          width: 8px; height: 8px;
          flex-shrink: 0;
        }
        .ping-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #1C52AF;
          opacity: 0.5;
          animation: ping2 1.5s ease-out infinite;
        }
        .ping-dot::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 50%;
          background: #1C52AF;
        }

        /* primary button shine sweep */
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: translateX(-100%) skewX(-12deg);
          transition: none;
        }
        .btn-shine:hover::after {
          animation: shine 0.55s ease forwards;
        }
        .btn-shine:hover {
          box-shadow: 0 4px 20px rgba(28,82,175,0.35);
          transform: scale(1.025);
        }
        .btn-shine:active { transform: scale(0.975); }

        /* outline button */
        .btn-out:hover {
          transform: scale(1.025);
        }
        .btn-out:active { transform: scale(0.975); }

        /* floating cards */
        .card-pop {
          position: absolute;
          background: white;
          border-radius: 14px;
          box-shadow: 0 6px 28px rgba(0,0,0,0.09);
          border: 1px solid #f0f0f0;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 9px;
          white-space: nowrap;
        }
        .card-a {
          animation: cardIn 0.7s 0.6s ease both,
                     floatY  7s  1.3s ease-in-out infinite;
        }
        .card-b {
          animation: cardIn 0.7s 0.8s ease both,
                     floatY  8s  1.5s ease-in-out infinite;
        }

        /* dot grid */
        .dot-grid {
          background-image: radial-gradient(#93b4e8 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* mobile: hide float cards on very small screens */
        @media (max-width: 400px) {
          .card-pop { display: none; }
        }
      `}</style>
      <section className="relative w-full overflow-hidden bg-white px-6">

        {/* DOT GRID BG */}
        <div className="absolute inset-0 dot-grid opacity-[0.045] pointer-events-none -z-10" />

        {/* GLOW BLOBS */}
        <div
          className="absolute bg-blue-100 rounded-full pointer-events-none -top-20 -left-20 w-72 h-72 blur-3xl opacity-40 -z-10 blob-bg"
        />
        <div
          className="absolute w-64 h-64 bg-indigo-100 rounded-full pointer-events-none -bottom-16 -right-16 blur-3xl opacity-35 -z-10 blob-bg"
          style={{ animationDelay: "4s" }}
        />

        <div className="grid items-center max-w-6xl grid-cols-1 gap-10  mx-auto py-7 md:grid-cols-2  sm:py-12">

          {/* ── LEFT TEXT ── */}
          <div className={`flex flex-col justify-center text-center md:text-left transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>

            {/* BADGE */}
            <div className="fu d1 inline-flex items-center gap-2 rounded-full bg-[#F1F2F9] py-2 px-5 text-sm font-medium text-black w-fit mx-auto md:mx-0">
              <span className="ping-dot" />
              <span><span className="font-bold text-[#1C52AF]">New:</span> Trusted Car Service Platform</span>
            </div>

            {/* HEADING */}
            <h1 className="mt-5 text-2xl font-bold leading-tight text-black fu d2 sm:text-5xl">
              Book trusted mechanics for{" "}
              <span className="shimmer-type">{typedText}</span>
              <span className="cursor" />
            </h1>

            {/* DESCRIPTION */}
            <p className="max-w-lg mx-auto mt-6 text-base text-gray-600 fu d3 md:text-lg md:mx-0">
              Skip the stress of searching for workshops — our verified professionals come to you, making car servicing faster, safer, and more convenient every time.
            </p>

            
            <div className="flex flex-col items-center justify-center gap-4 mt-10 fu d4 sm:flex-row md:justify-start">
  <Link
    to="/services"
    className="btn-shine w-fit px-7 py-3 text-sm font-semibold text-white bg-[#1C52AF] rounded-lg transition-all duration-200 shadow-md"
  >
    Book a Service
  </Link>
  <Link
    to="/providers"
    className="btn-out w-fit px-7 py-3 text-sm font-semibold text-[#1C52AF] border border-gray-300 rounded-lg hover:bg-[#1C52AF] hover:text-white transition-all duration-200"
  >
    Become a Provider
  </Link>
</div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="flex justify-center md:justify-end">
            <div className="relative sm:w-[600px] sm:h-[420px] w-[340px] h-[300px] flex items-center justify-center">

              {/* BLOB BEHIND IMAGE */}
              <div
                className="absolute pointer-events-none inset-4 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-60 blob-bg"
                style={{ borderRadius: "55% 45% 40% 60% / 50% 45% 55% 50%" }}
              />

              
                          <img
              src="/images/HeroImage.png"
              alt="mechanic"
              className="relative z-10 object-contain w-[110%] h-[110%] float-img drop-shadow-xl"
            />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}










