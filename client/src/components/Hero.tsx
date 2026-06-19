/* ============================================================
   Hero — static photo, animated entry
   ============================================================ */
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHOTO = "/Me/Me.png";

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] md:min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-16 dot-grid"
    >
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: text */}
          <div className="space-y-5 sm:space-y-7 order-2 md:order-1 text-center md:text-left">
            <motion.div variants={item} className="flex items-center gap-2 w-fit mx-auto md:mx-0">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400 tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base sm:text-lg text-foreground/65 leading-relaxed max-w-lg mx-auto md:mx-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 min-h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.97]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("hero.cta1")} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto px-6 py-3.5 min-h-11 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("hero.cta3")}
              </button>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div variants={item} className="flex justify-center order-1 md:order-2">
            <div className="relative flex flex-col items-center">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-400/12 rounded-full blur-3xl pointer-events-none" />
              <div
                className="relative w-full max-w-[280px] sm:max-w-[360px] md:w-96 md:max-w-none h-[400px] sm:h-[480px] md:h-[560px] overflow-hidden"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.4) 90%, transparent 100%)",
                  maskImage:       "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.4) 90%, transparent 100%)",
                }}
              >
                <img
                  src={PHOTO}
                  alt="Mukhammed"
                  className="absolute inset-0 w-full h-full object-contain object-top"
                />
              </div>
              <div className="mt-2 px-4 py-2 rounded-xl bg-card border border-white/10 shadow-xl backdrop-blur-sm">
                <p className="text-xs font-mono text-cyan-400">KARAKALPAKSTAN / UZBEKISTAN</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <p className="text-xs text-foreground/40 font-mono tracking-widest">SCROLL</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
