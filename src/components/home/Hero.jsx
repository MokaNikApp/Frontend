import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hero() {
  const words = [
    "trusted mechanics at your doorstep",
    "emergency car repair anytime you need",
    "verified experts you can rely on",
    "same-day car service near you",
    "affordable repairs without workshop stress",
    "quick roadside assistance 24/7",
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
          background: linear-gradient(90deg, #1C52AF 0%, #6fa3f7 40%, #1C52AF 65%, #1C52AF 100%);
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
      <section className="w-full bg-white relative overflow-hidden">

        {/* DOT GRID BG */}
        <div className="absolute inset-0 dot-grid opacity-[0.045] pointer-events-none -z-10" />

        {/* GLOW BLOBS */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none -z-10 blob-bg"
        />
        <div
          className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-35 pointer-events-none -z-10 blob-bg"
          style={{ animationDelay: "4s" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto py-8 px-6 sm:px-0 gap-10">

          {/* ── LEFT TEXT ── */}
          <div className={`flex flex-col justify-center text-center md:text-left transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>

            {/* BADGE */}
            <div className="fu d1 inline-flex items-center gap-2 rounded-full bg-[#F1F2F9] py-2 px-5 text-sm font-medium text-black w-fit mx-auto md:mx-0">
              <span className="ping-dot" />
              <span><span className="font-bold text-[#1C52AF]">New:</span> Trusted Car Service Platform</span>
            </div>

            {/* HEADING */}
            <h1 className="fu d2 text-2xl text-black sm:text-5xl font-bold leading-tight mt-5">
              Book trusted mechanics for{" "}
              <span className="shimmer-type">{typedText}</span>
              <span className="cursor" />
            </h1>

            {/* DESCRIPTION */}
            <p className="fu d3 mt-6 text-gray-600 text-base md:text-lg max-w-lg mx-auto md:mx-0">
              Skip the stress of searching for workshops. Verified professionals
              come to you — making car servicing faster, smarter, and more convenient.
            </p>

            {/* BUTTONS */}
            <div className="fu d4 mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/services"
                className="btn-shine px-7 py-3 text-sm font-semibold text-white bg-[#1C52AF] rounded-lg transition-all duration-200 shadow-md"
              >
                Book a Service
              </Link>
              <Link
                to="/providers"
                className="btn-out px-7 py-3 text-sm font-semibold text-[#1C52AF] border border-gray-300 rounded-lg hover:bg-[#1C52AF] hover:text-white transition-all duration-200"
              >
                Become a Provider
              </Link>
            </div>

            {/* SOCIAL PROOF */}
            <div className="fu d5 mt-7 flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`/images/test${i}.png`} alt="user"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                ))}
                <div className="w-7 h-7 rounded-full bg-[#1C52AF] text-white flex items-center justify-center text-[9px] font-bold border-2 border-white">+2k</div>
              </div>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-800">2,000+</span> car owners trust MokaNik
              </p>
              <div className="hidden sm:flex gap-0.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
              </div>
            </div>

          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="flex justify-center md:justify-end">
            <div className="relative sm:w-[600px] sm:h-[420px] w-[340px] h-[300px] flex items-center justify-center">

              {/* BLOB BEHIND IMAGE */}
              <div
                className="absolute inset-4 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-60 pointer-events-none blob-bg"
                style={{ borderRadius: "55% 45% 40% 60% / 50% 45% 55% 50%" }}
              />

              <img
                src="/images/hero-mechanic.png"
                alt="mechanic"
                className="float-img relative w-full h-full object-contain drop-shadow-xl z-10"
              />

              {/* FLOAT CARD — top left */}
              <div className="card-pop card-a" style={{ top: "8%", left: "-10px" }}>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold flex-shrink-0">✓</div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Mechanic Arrived</p>
                  <p className="text-[10px] text-gray-400">Emmanuel O. · 4.9 ★</p>
                </div>
              </div>

              {/* FLOAT CARD — bottom right */}
              <div className="card-pop card-b" style={{ bottom: "8%", right: "-10px" }}>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-base flex-shrink-0">🔧</div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Booking Confirmed</p>
                  <p className="text-[10px] text-green-500 font-semibold">Today, 2:30 PM</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}