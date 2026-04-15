



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

  useEffect(() => {
    const currentWord = words[wordIndex];

    const typingSpeed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));

        if (typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));

        if (typedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex, words]);

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto py-8 px-6 sm:px-0 gap-10">

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center text-center md:text-left">

          <p className="inline-block rounded-full bg-[#F1F2F9] py-2 px-6 text-sm font-medium text-black w-fit mx-auto md:mx-0">
            <span className="font-bold text-[#1C52AF]">New:</span> Trusted Car Service Platform
          </p>

          {/* PREMIUM HEADING */}
          <h1 className="text-2xl text-black sm:text-5xl  font-bold leading-tight mt-5">
            Book trusted mechanics for{" "}
            <span className="bg-[#1C52AF] bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="ml-1 inline-block w-[2px] h-[1em] bg-black animate-pulse"></span>
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-lg mx-auto md:mx-0">
            Skip the stress of searching for workshops. Verified professionals
            come to you — making car servicing faster, smarter, and more convenient.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/services"
              className="px-7 py-3 text-sm font-semibold text-white bg-[#1C52AF] rounded-lg hover:bg-[#17439a] transition"
            >
              Book a Service
            </Link>

            <Link
              to="/providers"
              className="px-7 py-3 text-sm font-semibold text-[#1C52AF] border border-gray-300 rounded-lg hover:bg-[#1C52AF] hover:text-white transition"
            >
              Become a Provider
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div className="sm:w-[600px] sm:h-[420px] w-[340px] h-[300px] flex items-center justify-center">
            <img
              src="/images/hero-mechanic.png"
              alt="mechanic"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}