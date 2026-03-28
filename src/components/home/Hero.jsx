import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const serviceText = "CAR SERVICE";

  const mechanicWords = [
    "MECHANICS",
    "PROVIDERS",
    "ENGINEERS",
    "TECHNICIANS",
    "SPECIALISTS",
    "CONSULTANTS",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [typedMechanic, setTypedMechanic] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [fade, setFade] = useState(true);

  const [typedService, setTypedService] = useState("");

  // TYPEWRITER FADE IN + TYPEWRITER FADE OUT
  useEffect(() => {
    const currentWord = mechanicWords[wordIndex];
    let i = isDeleting ? typedMechanic.length : 0;

    const interval = setInterval(() => {
      if (!isDeleting) {
        // typing forward
        setTypedMechanic(currentWord.slice(0, i + 1));
        i++;

        if (i === currentWord.length) {
          clearInterval(interval);

          // pause before deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        // deleting (typewriter fade out)
        setTypedMechanic(currentWord.slice(0, i - 1));
        i--;

        if (i === 0) {
          clearInterval(interval);

          // move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % mechanicWords.length);
        }
      }
    }, isDeleting ? 150 : 200);

    return () => clearInterval(interval);
  }, [wordIndex, isDeleting]);

  // FADE CONTROL
  useEffect(() => {
    setFade(false);
    const t = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(t);
  }, [typedMechanic]);

  // TYPEWRITER FOR SERVICE
  useEffect(() => {
    let j = 0;

    const interval = setInterval(() => {
      setTypedService(serviceText.slice(0, j + 1));
      j++;
      if (j === serviceText.length) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-6 py-10 sm:py-12 lg:py-12 md:flex items-center justify-between bg-white">

      {/* LEFT */}
      <div className="max-w-3xl px-4 sm:px-8 lg:px-24">
        
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          <span className="font-semibold text-blue-800">
            <b>New:</b>
          </span>{" "}
          Trusted Car Service Platform
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Book trusted{" "}
          <span
            className={`
              text-green-700 inline-block transition-opacity duration-300
              ${fade ? "opacity-100" : "opacity-0"}
            `}
          >
            {typedMechanic}
            <span className="animate-pulse">|</span>
          </span>{" "}
          for reliable{" "}
          <span className="text-green-700">
            {typedService}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="mt-4 text-gray-500 text-sm sm:text-base md:text-lg">
          Skip the stress of searching for workshops — our verified
          professionals come to you, making car servicing faster,
          safer, and more convenient every time.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
  
          <Link
            to="/services"
            className="bg-blue-800 hover:bg-blue-700 hover:text-base transition-all text-white px-6 py-3 rounded-lg text-sm font-medium w-full sm:w-auto text-center"
          >
            Book a Service
          </Link>

          <Link
            to="/providers"
            className="text-gray-700 text-sm font-medium w-full hover:text-base transition-all sm:w-auto text-center"
          >
            Become a Provider <span className="font-bold text-lg">→</span>
          </Link>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="mt-10 md:mt-0 flex justify-center">
        <img
          src="/images/hero-mechanic.png"
          alt="mechanic"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
}