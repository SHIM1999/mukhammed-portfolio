/* ============================================================
   Engineering Direction — Dark pipeline diagram
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, FileText, Bot, Database, Brain, CheckCircle, ArrowRight } from "lucide-react";

const pipeline = [
  { label: "Capture",  icon: Camera,       color: "text-cyan-400",   bg: "bg-cyan-400/10   border-cyan-400/20"   },
  { label: "Process",  icon: FileText,     color: "text-blue-400",   bg: "bg-blue-400/10   border-blue-400/20"   },
  { label: "Detect",   icon: Brain,        color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
  { label: "Decide",   icon: Bot,          color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
  { label: "Save",     icon: Database,     color: "text-emerald-400",bg: "bg-emerald-400/10 border-emerald-400/20"},
  { label: "Improve",  icon: CheckCircle,  color: "text-cyan-400",   bg: "bg-cyan-400/10   border-cyan-400/20"   },
];

function PipelineStep({ step, index }: { step: typeof pipeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.08, y: -4 }}
        className={`w-20 h-20 rounded-2xl border ${step.bg} flex items-center justify-center transition-all`}
      >
        <Icon className={`w-8 h-8 ${step.color}`} />
      </motion.div>
      <p className="mt-3 text-sm font-semibold text-foreground text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {step.label}
      </p>
      {index < pipeline.length - 1 && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          className="mt-3 text-foreground/30"
        >
          <ArrowRight className="w-4 h-4 rotate-90" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function EngineeringDirection() {
  return (
    <section id="vision" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4">05 / Vision</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My Engineering <span className="gradient-text-blue">Direction</span>
          </h2>
          <p className="text-foreground/55 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Industrial automation, vision systems, and AI-powered inspection. This is the pipeline I'm building toward.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-14"
        >
          {pipeline.map((step, i) => (
            <PipelineStep key={step.label} step={step} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-white/8 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Vision
          </h3>
          <p className="text-foreground/60 leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I want to build systems that connect the physical and digital worlds. Using cameras, AI, and automation, I aim to create inspection and control systems that solve real industrial problems.
          </p>
          <p className="text-foreground/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From capturing images to making decisions, from storing data to continuous improvement—every step matters. This is where I'm heading.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
