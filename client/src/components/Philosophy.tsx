/* ============================================================
   Philosophy — Dark, centered quote
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="philosophy" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-10"
        >
          06 / Philosophy
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            I don't just want to write code.
            <br />
            <span className="gradient-text-blue">I want to build useful systems</span>
            <br />
            that solve <span className="text-indigo-400">real problems</span>.
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-foreground/55 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Every line of code, every system I build, every tool I create should have purpose. It should connect to the real world, solve actual problems, and make someone's work easier or better.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-12 h-px w-20 bg-gradient-to-r from-cyan-400 to-indigo-400 mx-auto"
        />
      </div>
    </section>
  );
}
