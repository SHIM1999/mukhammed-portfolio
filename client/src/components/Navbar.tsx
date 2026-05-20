/* ============================================================
   Navbar — Glassmorphism sticky navigation
   ============================================================ */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Journey",  href: "#journey" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Vision",   href: "#vision" },
  { label: "Resume",   href: "#resume" },
  { label: "Contact",  href: "#contact" },
];

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-1.5">
      {(["ENG", "KOR"] as const).map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            onClick={toggleLanguage}
            className={`rounded-md overflow-hidden border transition-all duration-200 active:scale-95 ${
              active
                ? "border-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.25)]"
                : "border-white/10 opacity-45 hover:opacity-70"
            }`}
            style={{ width: active ? 36 : 28, height: active ? 36 : 28 }}
          >
            <img src={`/${lang}.png`} alt={lang} className="w-full h-full object-cover" />
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive ? "text-cyan-400" : "text-white/60 hover:text-white/90"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-cyan-400/10 border border-cyan-400/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: lang + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <LanguageToggle />
            <button
              onClick={() => handleNav("#contact")}
              className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden border-t border-white/8 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active === item.href.slice(1)
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
