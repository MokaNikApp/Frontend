import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {

  // ✨ Better marketing words
  const words = [
    "MokaNik Network",
    "trusted mechanic platform",
    "verified customer bookings",
    "growing auto repair business",
    "steady income opportunities",
    "local car owners near you",
    "professional mechanic career",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // ✨ Typing effect
  useEffect(() => {
    const currentWord = words[index];
    const speed = deleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentWord.slice(0, subIndex + 1));
        setSubIndex((prev) => prev + 1);

        if (subIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(currentWord.slice(0, subIndex - 1));
        setSubIndex((prev) => prev - 1);

        if (subIndex - 1 === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <section className="relative px-6 lg:px-24 py-12 bg-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">

          {/* BADGE */}
          <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
           Trusted Network for Mechanics
          </div>

          {/* HEADING */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-snug">
            Grow with{" "}
            <span className="text-[#1C52AF]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            Join MokaNik and connect with car owners near you.
            Manage bookings easily, grow your business, and get paid securely.
          </p>

         

        {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">

            {/* APPLY → SIGNUP */}
            <Link
              to="/signup"
              className="bg-[#1C52AF] hover:bg-[#174494] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
            >
              Apply to Provide Service
            </Link>

            {/* LEARN MORE → SERVICES */}
            <Link
              to="/services"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
            >
              Learn More →
            </Link>

          </div>
          {/* SOCIAL PROOF */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">

            <div className="flex -space-x-2">
              <img src="/images/test1.png" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/images/test2.png" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/images/test3.png" className="w-8 h-8 rounded-full border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-[#1C52AF] text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                +500
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              <span className="font-bold text-gray-900">500+</span> verified mechanics joined
            </p>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">

          {/* BACK CARD */}
          <div className="absolute w-[85%] h-[85%] bg-blue-50 rounded-3xl rotate-2"></div>

          <img
            src="/images/mokanik2.png"
            alt="mechanic"
            className="relative w-full max-w-[420px] sm:max-w-[550px] lg:max-w-[900px] object-contain"
          />

        </div>

      </div>
    </section>
  );
}




