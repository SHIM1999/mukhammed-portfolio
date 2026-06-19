/* ============================================================
   Footer — Dark, minimal
   ============================================================ */
import { Zap } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/8 py-10 md:py-12" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Mukhammed
              </span>
            </div>
            <p className="text-foreground/45 text-sm">Building systems that matter.</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-foreground/70 font-semibold text-sm mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Links
            </p>
            <ul className="space-y-2 text-sm text-foreground/45">
              {["about", "projects", "skills", "contact"].map((id) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="capitalize hover:text-cyan-400 transition-colors py-1 min-h-9">
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-foreground/70 font-semibold text-sm mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Connect
            </p>
            <ul className="space-y-2 text-sm text-foreground/45">
              {[
                ["GitHub",   "https://github.com/SHIM1999"],
                ["LinkedIn", "https://www.linkedin.com/in/mukhammed-shimbergenov-789a10260/"],
                ["Email",    "mailto:gbpforfuture@gmail.com"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-cyan-400 transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/35 font-mono">
          <p>© 2026 Mukhammed. All rights reserved.</p>
          <p>Made with ♥ in Korea 🇰🇷</p>
        </div>
      </div>
    </footer>
  );
}
