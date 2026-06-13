import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import api from "../../api/axios";
import ServiceCard from "../ServiceCard";

// ─── Placeholder images cycling through your existing assets ─────────────────
const PLACEHOLDER_IMAGES = [
  "/images/service1.png",
  "/images/service2.png",
  "/images/service3.png",
];

// ─── Category → tag label + colour mapping ────────────────────────────────────
const CATEGORY_TAG = {
  oil_change:         { tag: "Standard",    tagColor: "bg-green-100 text-green-600" },
  brake_repair:       { tag: "Best Seller", tagColor: "bg-blue-100 text-blue-600" },
  engine_diagnostic:  { tag: "Diagnostics", tagColor: "bg-gray-100 text-gray-600" },
  ac_service:         { tag: "AC",          tagColor: "bg-cyan-100 text-cyan-600" },
  electrical:         { tag: "Electrical",  tagColor: "bg-yellow-100 text-yellow-700" },
  suspension:         { tag: "Suspension",  tagColor: "bg-orange-100 text-orange-600" },
  tire_rotation:      { tag: "Tires",       tagColor: "bg-purple-100 text-purple-600" },
  transmission:       { tag: "Transmission",tagColor: "bg-red-100 text-red-600" },
};

const DEFAULT_TAG = { tag: "Service", tagColor: "bg-gray-100 text-gray-600" };

// ─── Map API payload → ServiceCard props ─────────────────────────────────────
function mapService(svc, index) {
  const { tag, tagColor } = CATEGORY_TAG[svc.category] ?? DEFAULT_TAG;
  return {
    id:    svc.id,
    title: svc.name,
    desc:  svc.description,
    price: `$${parseFloat(svc.price).toFixed(0)}`,
    image: svc.images?.[0] ?? PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
    tag,
    tagColor,
    rating:  "5.0",
    reviews: "(0+)",
    estimatedDurationMinutes: svc.estimatedDurationMinutes,
    category: svc.category,
  };
}

// ─── Floating particles canvas ────────────────────────────────────────────────
function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;
    let particles = [];
    let raf;

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

    for (let i = 0; i < 90; i++) {
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
        const a = p.a * (t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(28,82,175,${(a * 0.6).toFixed(3)})`;
        ctx.fill();
        if (p.life > p.maxLife) particles[i] = mkParticle();
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

// ─── 3-D magnetic card wrapper ────────────────────────────────────────────────
function MagneticCard({ children, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `perspective(600px) rotateX(${(
      (-y / r.height) * 8
    ).toFixed(2)}deg) rotateY(${((x / r.width) * 8).toFixed(2)}deg) translateY(-6px)`;
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

// ─── Skeleton card (loading state) ───────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
        <div className="flex justify-between pt-2">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5" />
          <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-1">Failed to load services</p>
      <p className="text-xs text-gray-400 mb-4">Please check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#1C52AF] text-white text-xs font-medium rounded-md hover:bg-[#1644a0] transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get(
        "/services"
      );
      const mapped = res.data.data
        .filter((s) => s.isActive)
        .slice(0, 3)
        .map(mapService);
      setServices(mapped);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ── animation variants ──
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
      <ParticlesCanvas />

      <div className="max-w-6xl px-4 mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:gap-8 sm:mb-8 gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
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

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center sm:justify-end"
          >
            <Link to="/services">
              <motion.button
                className="relative bg-[#1C52AF] text-white px-5 py-2.5 rounded-md text-sm font-medium overflow-hidden"
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(28,82,175,0.35)" }}
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
            </Link>
          </motion.div>
        </div>

        {/* ── Grid content ── */}
        {loading ? (
          // Skeleton placeholders while fetching
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <ErrorState onRetry={fetchServices} />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch"
          >
            {services.map((item) => (
              <motion.div key={item.id} variants={cardVariant} className="h-full">
                <MagneticCard className="group h-full">
                  <div className="relative overflow-hidden rounded-xl h-full cursor-pointer">
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
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}