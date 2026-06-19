/* ============================================================
   About — story + hexagon radar chart + stats
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "2018", label: "Arrived in Korea",  sub: "Started from zero" },
  { value: "2022", label: "Coding Journey",    sub: "Self-taught, relentless" },
  { value: "10+",  label: "Technologies",      sub: "React · Android · Python · C#…" },
  { value: "3+",   label: "Live Projects",     sub: "Android, Vision, OCR" },
];

// ---------------------------------------------------------------------------
// Radar chart
// ---------------------------------------------------------------------------

const AXES = [
  { label: "AI / Prompting",   value: 95 },
  { label: "Automation",       value: 90 },
  { label: "Problem Solving",  value: 85 },
  { label: "Vision / Camera",  value: 78 },
  { label: "Backend Dev",      value: 65 },
  { label: "Systems Thinking", value: 75 },
];

const CX = 200, CY = 195, MAX_R = 110, N = AXES.length;

const ang = (i: number) => (i * Math.PI * 2) / N - Math.PI / 2;
const pt  = (i: number, r: number): [number, number] => [
  CX + r * Math.cos(ang(i)),
  CY + r * Math.sin(ang(i)),
];
const polyPts = (vals: number[]) =>
  vals.map((v, i) => pt(i, (v / 100) * MAX_R).join(",")).join(" ");
const gridPts = (level: number) => {
  const r = (level / 4) * MAX_R;
  return Array.from({ length: N }, (_, i) => pt(i, r).join(",")).join(" ");
};

function RadarChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px" });
  const vals   = AXES.map((a) => a.value);

  return (
    <svg ref={svgRef} viewBox="0 0 400 390" className="w-full h-full">
      {/* Grid rings */}
      {[1, 2, 3, 4].map((lvl) => (
        <polygon
          key={lvl}
          points={gridPts(lvl)}
          fill="none"
          stroke="rgba(34,211,238,0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Axis spokes */}
      {Array.from({ length: N }, (_, i) => {
        const [x, y] = pt(i, MAX_R);
        return (
          <line
            key={i}
            x1={CX} y1={CY} x2={x} y2={y}
            stroke="rgba(34,211,238,0.12)"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled data polygon */}
      <motion.polygon
        points={polyPts(vals)}
        fill="rgba(34,211,238,0.12)"
        stroke="rgba(34,211,238,0.75)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Indigo inner accent polygon (80% of values) */}
      <motion.polygon
        points={polyPts(vals.map((v) => v * 0.55))}
        fill="rgba(99,102,241,0.1)"
        stroke="rgba(99,102,241,0.35)"
        strokeWidth="1"
        strokeLinejoin="round"
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      />

      {/* Data dots */}
      {vals.map((v, i) => {
        const [x, y] = pt(i, (v / 100) * MAX_R);
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r={4}
            fill="rgba(34,211,238,1)"
            stroke="rgba(7,15,28,1)"
            strokeWidth="1.5"
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease: "backOut" }}
          />
        );
      })}

      {/* Labels */}
      {AXES.map((axis, i) => {
        const r = MAX_R + 28;
        const [x, y] = pt(i, r);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(221,238,255,0.55)"
            fontSize="10.5"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="500"
          >
            {axis.label}
          </text>
        );
      })}

      {/* Center dot */}
      <circle cx={CX} cy={CY} r={3} fill="rgba(34,211,238,0.6)" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------

export default function About() {
  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section id="about" className="relative section-pad overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Left — story */}
          <motion.div variants={item} className="space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase">
                01 / About
              </span>
              <h2
                className="section-title font-extrabold text-foreground mt-3 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Building my future,
                <br />
                <span className="gradient-text-blue">one block at a time</span>.
              </h2>
            </div>

            <p className="text-foreground/65 leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              I'm Mukhammed, an engineer from Uzbekistan now based in Korea. My journey has been about learning to build—not just code, but systems, tools, and solutions that solve real problems.
            </p>
            <p className="text-foreground/65 leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              I started in architecture, moved through business, and found my true passion in engineering. Every challenge—from learning Korean to mastering new technologies—has been a building block.
            </p>
            <p className="text-foreground/65 leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Today I focus on three things: <span className="text-cyan-400 font-semibold">building practical systems</span>, <span className="text-indigo-400 font-semibold">learning continuously</span>, and <span className="text-foreground font-semibold">improving every day</span>.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              {[
                { dot: "bg-cyan-400",    text: "Location: Korea 🇰🇷" },
                { dot: "bg-indigo-400",  text: "Focus: IT · Automation · Vision Systems" },
                { dot: "bg-emerald-400", text: "Philosophy: Build → Learn → Improve" },
              ].map(({ dot, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${dot} flex-shrink-0`} />
                  <span className="text-foreground/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — radar chart + stats */}
          <motion.div variants={item} className="space-y-4">
            {/* Radar card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-card p-2" style={{ aspectRatio: "4/3" }}>
              <RadarChart />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-[10px] font-mono text-cyan-400/40 tracking-widest uppercase">Engineering Profile</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="bg-card border border-white/8 rounded-xl p-4 hover:border-cyan-400/20 transition-colors"
                >
                  <p
                    className="text-2xl font-extrabold text-cyan-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-foreground text-sm font-semibold mt-0.5">{stat.label}</p>
                  <p className="text-foreground/45 text-xs mt-0.5 font-mono">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
