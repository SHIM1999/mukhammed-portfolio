/* ============================================================
   Hero — photo slideshow, animated entry
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";

const BASE_PHOTO = "/Me/me.png";
const EXTRA_PHOTOS = [
  "/Me/Me2left.png",
  "/Me/Me2left2down.png",
  "/Me/Me2right.png",
  "/Me/Me2right2down.png",
  "/Me/Me2up2left.png",
  "/Me/Me2up2right.png",
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
function buildQueue() { return [BASE_PHOTO, ...shuffle(EXTRA_PHOTOS)]; }

export default function Hero() {
  const { t } = useLanguage();
  const [queue, setQueue] = useState<string[]>(buildQueue);
  const [idx,   setIdx]   = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPhoto = queue[idx] ?? BASE_PHOTO;

  useEffect(() => {
    const delay = currentPhoto === BASE_PHOTO ? 3500 : 1500;
    timerRef.current = setTimeout(() => {
      setIdx((prev) => {
        const next = prev + 1;
        if (next >= queue.length) { setQueue(buildQueue()); return 0; }
        return next;
      });
    }, delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, queue, currentPhoto]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 dot-grid"
    >
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: text */}
          <div className="space-y-7 order-2 md:order-1">
            <motion.div variants={item} className="flex items-center gap-2 w-fit">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400 tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-foreground/65 leading-relaxed max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.97]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("hero.cta1")} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
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
                className="relative w-96 sm:w-[440px] overflow-hidden"
                style={{
                  height: 560,
                  WebkitMaskImage: "radial-gradient(ellipse 82% 88% at 50% 38%, black 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 78%, transparent 92%)",
                  maskImage:       "radial-gradient(ellipse 82% 88% at 50% 38%, black 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 78%, transparent 92%)",
                }}
              >
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentPhoto}
                    src={currentPhoto}
                    alt="Mukhammed"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ objectPosition: "center 15%" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
