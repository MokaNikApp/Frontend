



import { services } from "../../lib/mock/services";
import ServiceCard from "../ServiceCard";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import api from "../../api/axios";

// ─── Floating particles canvas ───────────────────────────────────────────────
function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      W = rect.width;
      H = rect.height;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // ✅ FIXED PARTICLE SPAWN (NO MORE BOTTOM STACKING)
    const mkParticle = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.5 + 0.4),
      a: Math.random() * 0.55 + 0.15,
      life: 0,
      maxLife: 180 + Math.random() * 220,
    });

    // Fill entire screen evenly
      for (let i = 0; i < 90; i++){
      const p = mkParticle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        const a =
          p.a * (t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(28,82,175,${(a * 0.6).toFixed(3)})`;
        ctx.fill();

        // ✅ FIXED RESET (NO BOTTOM RESPAWN)
        if (p.life > p.maxLife) {
          particles[i] = mkParticle();
        }
      });

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / 60;
    const tick = () => {
      current = Math.min(current + step, target);
      setCount(Math.round(current));
      if (current < target) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 600);
    return () => clearTimeout(t);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── 3-D magnetic card wrapper ────────────────────────────────────────────────
function MagneticCard({ children, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `perspective(600px) rotateX(${(
      (-y / r.height) *
      8
    ).toFixed(2)}deg) rotateY(${((x / r.width) * 8).toFixed(
      2
    )}deg) translateY(-6px)`;
  };

  const handleLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F5F8] py-6 sm:py-8 relative overflow-hidden"
    >
      {/* particles */}
      <ParticlesCanvas />

      <div className="max-w-6xl px-4 mx-auto relative z-10">

        {/* header */}
      {/* header */}
<div className="flex flex-col sm:gap-8 sm:mb-8 gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
  
  {/* LEFT TEXT */}
  <div className="max-w-xl text-center sm:text-left">
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
      Our{" "}
      <span className="relative inline-block">
        Services
        <motion.span
          className="absolute left-0 bottom-[-2px] h-[2px] bg-[#1C52AF] rounded"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        />
      </span>
    </h2>

    <p className="mt-3 text-sm text-gray-500 sm:text-base">
      Book reliable car care from verified mechanics — wherever you are
    </p>
  </div>

  {/* RIGHT BUTTON (RESTORED) */}
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
    className="flex justify-center sm:justify-end"
  >
    <motion.button
      className="relative bg-[#1C52AF] text-white px-5 py-2.5 rounded-md text-sm font-medium overflow-hidden"
      whileHover={{
        y: -2,
        boxShadow: "0 8px 24px rgba(28,82,175,0.35)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute top-0 left-0 w-1/2 h-full bg-white/20 skew-x-[-15deg]"
        initial={{ x: "-100%" }}
        whileHover={{ x: "280%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      View All Services
    </motion.button>
  </motion.div>

</div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch"
        >
          {services.slice(0, 3).map((item) => (
            <motion.div key={item.id} variants={cardVariant} className="h-full">
              <MagneticCard className="group h-full">
                <Link to={`/services/${item.id}`} className="block h-full">
                  <div className="relative overflow-hidden rounded-xl h-full">
                    <motion.div
                      className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-[-15deg] pointer-events-none z-10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "280%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="h-full transition-all duration-300 group-hover:shadow-xl rounded-xl">
                      <ServiceCard {...item} />
                    </div>
                  </div>
                </Link>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}





// import ServiceCard from "../ServiceCard";
// import { Link } from "react-router-dom";
// import { motion, useInView } from "framer-motion";
// import { useRef, useEffect, useState } from "react";
// import api from "../../api/axios";

// // ─── Floating particles canvas ───────────────────────────────────────────────
// function ParticlesCanvas() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let W, H, particles = [], raf;

//     const resize = () => {
//       const rect = canvas.parentElement.getBoundingClientRect();
//       const dpr = window.devicePixelRatio || 1;
//       W = rect.width;
//       H = rect.height;
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       canvas.style.width = rect.width + "px";
//       canvas.style.height = rect.height + "px";
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };

//     resize();
//     window.addEventListener("resize", resize);

//     const mkParticle = () => ({
//       x: Math.random() * W,
//       y: Math.random() * H,
//       r: Math.random() * 2 + 0.3,
//       vx: (Math.random() - 0.5) * 0.5,
//       vy: -(Math.random() * 0.5 + 0.4),
//       a: Math.random() * 0.55 + 0.15,
//       life: 0,
//       maxLife: 180 + Math.random() * 220,
//     });

//     for (let i = 0; i < 90; i++) {
//       const p = mkParticle();
//       p.life = Math.random() * p.maxLife;
//       particles.push(p);
//     }

//     const tick = () => {
//       ctx.clearRect(0, 0, W, H);
//       particles.forEach((p, i) => {
//         p.life++;
//         p.x += p.vx;
//         p.y += p.vy;
//         const t = p.life / p.maxLife;
//         const a = p.a * (t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1);
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(28,82,175,${(a * 0.6).toFixed(3)})`;
//         ctx.fill();
//         if (p.life > p.maxLife) particles[i] = mkParticle();
//       });
//       raf = requestAnimationFrame(tick);
//     };

//     tick();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full pointer-events-none"
//     />
//   );
// }

// // ─── Animated counter ─────────────────────────────────────────────────────────
// function Counter({ target, suffix = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let current = 0;
//     const step = target / 60;
//     const tick = () => {
//       current = Math.min(current + step, target);
//       setCount(Math.round(current));
//       if (current < target) requestAnimationFrame(tick);
//     };
//     const t = setTimeout(() => requestAnimationFrame(tick), 600);
//     return () => clearTimeout(t);
//   }, [inView, target]);

//   return <span ref={ref}>{count}{suffix}</span>;
// }

// // ─── 3-D magnetic card wrapper ────────────────────────────────────────────────
// function MagneticCard({ children, className }) {
//   const ref = useRef(null);

//   const handleMove = (e) => {
//     const r = ref.current.getBoundingClientRect();
//     const x = e.clientX - r.left - r.width / 2;
//     const y = e.clientY - r.top - r.height / 2;
//     ref.current.style.transform = `perspective(600px) rotateX(${(
//       (-y / r.height) * 8
//     ).toFixed(2)}deg) rotateY(${((x / r.width) * 8).toFixed(2)}deg) translateY(-6px)`;
//   };

//   const handleLeave = () => {
//     ref.current.style.transform = "";
//   };

//   return (
//     <div
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={handleLeave}
//       className={className}
//       style={{
//         transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
//         willChange: "transform",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// // ─── Main section ─────────────────────────────────────────────────────────────
// export default function ServicesSection() {
//   const sectionRef = useRef(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-80px" });

//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     api
//       .get("/services")
//       .then((res) => {
//         setServices(res.data.data ?? res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to load services:", err);
//         setError("Could not load services. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const container = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.08 } },
//   };

//   const cardVariant = {
//     hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
//     show: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.45, ease: "easeOut" },
//     },
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-[#F7F5F8] py-6 sm:py-8 relative overflow-hidden"
//     >
//       <ParticlesCanvas />

//       <div className="max-w-6xl px-4 mx-auto relative z-10">

//         {/* header */}
//         <div className="flex flex-col sm:gap-8 sm:mb-8 gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
//           <div className="max-w-xl text-center sm:text-left">
//             <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               Our{" "}
//               <span className="relative inline-block">
//                 Services
//                 <motion.span
//                   className="absolute left-0 bottom-[-2px] h-[2px] bg-[#1C52AF] rounded"
//                   initial={{ width: 0 }}
//                   animate={inView ? { width: "100%" } : {}}
//                   transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
//                 />
//               </span>
//             </h2>
//             <p className="mt-3 text-sm text-gray-500 sm:text-base">
//               Book reliable car care from verified mechanics — wherever you are
//             </p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, x: 16 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
//             className="flex justify-center sm:justify-end"
//           >
//             <motion.button
//               className="relative bg-[#1C52AF] text-white px-5 py-2.5 rounded-md text-sm font-medium overflow-hidden"
//               whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(28,82,175,0.35)" }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <motion.span
//                 className="absolute top-0 left-0 w-1/2 h-full bg-white/20 skew-x-[-15deg]"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: "280%" }}
//                 transition={{ duration: 0.45, ease: "easeOut" }}
//               />
//               View All Services
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//             {[1, 2, 3].map((n) => (
//               <div key={n} className="h-52 rounded-xl bg-gray-200 animate-pulse" />
//             ))}
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500 py-10">{error}</p>
//         ) : (
//           <motion.div
//             variants={container}
//             initial="hidden"
//             animate={inView ? "show" : "hidden"}
//             className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch"
//           >
//             {services.slice(0, 3).map((item) => (
//               <motion.div key={item.id} variants={cardVariant} className="h-full">
//                 <MagneticCard className="group h-full">
//                   <Link to={`/services/${item.id}`} className="block h-full">
//                     <div className="relative overflow-hidden rounded-xl h-full">
//                       <motion.div
//                         className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-[-15deg] pointer-events-none z-10"
//                         initial={{ x: "-100%" }}
//                         whileHover={{ x: "280%" }}
//                         transition={{ duration: 0.6 }}
//                       />
//                       <div className="h-full transition-all duration-300 group-hover:shadow-xl rounded-xl">
//                         <ServiceCard {...item} />
//                       </div>
//                     </div>
//                   </Link>
//                 </MagneticCard>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//       </div>
//     </section>
//   );
// }
