import { useEffect, useState } from "react";

export default function Hero() {
  const mechanicText = "MECHANICS";
  const serviceText = "CAR SERVICE";

  const [typedMechanic, setTypedMechanic] = useState("");
  const [typedService, setTypedService] = useState("");

  const images = [
    "/images/hero-mechanic.png",
    "/images/hero-mechanic2.jpeg",
    "/images/hero-mechanic3.jpeg",
    "/images/hero-mechanic4.jpeg",
    "/images/hero-mechanic5.jpeg",
    "/images/hero-mechanic6.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [fade, setFade] = useState(true);

  // TYPEWRITER
  useEffect(() => {
    let i = 0;
    let j = 0;

    const mechanicInterval = setInterval(() => {
      setTypedMechanic(mechanicText.slice(0, i + 1));
      i++;
      if (i === mechanicText.length) clearInterval(mechanicInterval);
    }, 100);

    const serviceInterval = setInterval(() => {
      setTypedService(serviceText.slice(0, j + 1));
      j++;
      if (j === serviceText.length) clearInterval(serviceInterval);
    }, 120);

    return () => {
      clearInterval(mechanicInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  // FADE IMAGE TRANSITION
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]);
        setFade(true);
      }, 500);
    }, 3000);

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
          <span className="text-green-700">
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
          <button className="bg-blue-800 hover:bg-blue-700 hover:text-base transition-all text-white px-6 py-3 rounded-lg text-sm font-medium w-full sm:w-auto">
            Book a Service
          </button>

          <button className="text-gray-700 text-sm font-medium w-full hover:text-base transition-all sm:w-auto text-center sm:text-center">
            Become a Provider <span className="font-bold text-lg">→</span>
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="mt-10 md:mt-0 flex justify-center px-4 sm:px-8 lg:px-24">
        <img
          src={currentImage}
          alt="mechanic"
          className={`
            w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain
            transition-opacity duration-500 ease-in-out
            ${fade ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>
    </div>
  );
}