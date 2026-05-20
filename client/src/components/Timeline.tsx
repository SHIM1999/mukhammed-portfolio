/* ============================================================
   Timeline — Scroll-driven gear on the center line
   Gear rotates clockwise on scroll-down, counter-clockwise on scroll-up.
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const events = [
  { year: "Nukus", label: "Born in Nukus, Karakalpakstan, Uzbekistan", desc: "Grew up in a small city with big dreams.", accent: "cyan" },
  { year: "–2018", label: "Studied Architecture for 2 years", desc: "Built a foundation in spatial thinking and design.", accent: "indigo" },
  { year: "2017",  label: "Started learning Korean", desc: "Language became the first door to a new world.", accent: "cyan" },
  { year: "2018",  label: "Arrived in Korea", desc: "Came alone, with hope and very little else. A new chapter began.", accent: "indigo" },
  { year: "2018–", label: "Studied Global Business at Ulsan College", desc: "Adapted to Korean academic culture, built discipline.", accent: "cyan" },
  { year: "2020",  label: "Difficult period during COVID-19", desc: "Uncertainty, isolation, and the need to restart — again.", accent: "indigo" },
  { year: "2021+", label: "Worked and learned from real life", desc: "Barista, customer service, real-world resilience.", accent: "cyan" },
  { year: "2022",  label: "Chose IT and programming", desc: "Decided to build systems, not just survive. Changed direction.", accent: "indigo" },
  { year: "2022–", label: "Learned C, Java, JS, Android, C#, Databases…", desc: "Self-taught across multiple stacks with relentless focus.", accent: "cyan" },
  { year: "2023",  label: "Built Android apps, JavaFX systems, vision tools", desc: "ShiftShare app, CBT system, OCR experiments.", accent: "indigo" },
  { year: "Now",   label: "Industrial automation, OCR, robotics, AI inspection", desc: "Building toward precision engineering. Still growing.", accent: "cyan" },
];

// ---------------------------------------------------------------------------
// Gear helpers
// ---------------------------------------------------------------------------

function buildGearPath(cx: number, cy: number, outerR: number, innerR: number, teeth: number): string {
  const step = (Math.PI * 2) / teeth;
  const hw = step * 0.2; // half-tooth angular width
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    pts.push(
      `${(cx + innerR * Math.cos(a - hw)).toFixed(2)},${(cy + innerR * Math.sin(a - hw)).toFixed(2)}`,
      `${(cx + outerR * Math.cos(a)).toFixed(2)},${(cy + outerR * Math.sin(a)).toFixed(2)}`,
      `${(cx + outerR * Math.cos(a + step * 0.5 - hw)).toFixed(2)},${(cy + outerR * Math.sin(a + step * 0.5 - hw)).toFixed(2)}`,
      `${(cx + innerR * Math.cos(a + step * 0.5)).toFixed(2)},${(cy + innerR * Math.sin(a + step * 0.5)).toFixed(2)}`,
    );
  }
  return `M ${pts.join(" L ")} Z`;
}

const GEAR_PATH = buildGearPath(32, 32, 28, 18, 14);

function ScrollGear({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg
      ref={svgRef}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      style={{ transformOrigin: "32px 32px" }}
      className="drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]"
    >
      <path d={GEAR_PATH} fill="rgba(34,211,238,0.45)" />
      <circle cx="32" cy="32" r="10" fill="#070f1c" />
      <circle cx="32" cy="32" r="6" fill="none" stroke="rgba(34,211,238,0.75)" strokeWidth="1.8" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Timeline item
// ---------------------------------------------------------------------------

function TimelineItem({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;
  const isCyan = event.accent === "cyan";

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-8 flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        className={`md:w-[calc(50%-2.5rem)] w-full ${isLeft ? "md:pr-8" : "md:pl-8"} pl-10 md:pl-0`}
      >
        <div className="relative bg-card rounded-2xl p-4 border border-white/8 hover:border-white/14 transition-colors">
          <div
            className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full ${
              isCyan ? "bg-cyan-400/60" : "bg-indigo-400/60"
            }`}
          />
          <div className="pl-3">
            <span
              className={`text-xs font-mono font-semibold ${
                isCyan ? "text-cyan-400" : "text-indigo-400"
              } block mb-1`}
            >
              {event.year}
            </span>
            <h4
              className="text-foreground font-semibold text-sm mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {event.label}
            </h4>
            <p
              className="text-foreground/50 text-xs leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {event.desc}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 300 }}
          className={`w-3.5 h-3.5 rounded-full border-2 border-background z-20 shadow-lg ${
            isCyan ? "bg-cyan-400" : "bg-indigo-400"
          }`}
        />
      </div>

      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      const gear = gearRef.current;
      if (!el || !gear) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalDistance = el.offsetHeight + viewportH;
      const scrolled = viewportH - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
      gear.style.transform = `rotate(${progress * 1440}deg)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // No overflow-hidden — sticky won't work inside overflow:hidden
    <section id="journey" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4">
            02 / Journey
          </span>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My <span className="gradient-text-blue">Journey</span>
          </h2>
          <p className="text-foreground/50 mt-3 text-sm font-mono">
            Progress, not sadness. Building blocks, step by step.
          </p>
        </div>

        <div className="relative">
          {/* ── Sticky gear ──────────────────────────────────────────────
               Zero-height sticky div: takes no flow space but pins the gear
               to 46 vh while the timeline scrolls past it.
               Hidden on mobile (timeline is left-aligned there).
          ─────────────────────────────────────────────────────────────── */}
          <div
            className="hidden md:flex justify-center items-center pointer-events-none"
            style={{ position: "sticky", top: "46vh", height: 0, zIndex: 30 }}
          >
            <ScrollGear svgRef={gearRef} />
          </div>

          {/* Vertical center line */}
          <div className="absolute left-1.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/25 via-indigo-400/15 to-transparent" />

          {/* Timeline items */}
          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
