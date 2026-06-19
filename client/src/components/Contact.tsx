/* ============================================================
   Contact — Dark, clean
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

const contactLinks = [
  { icon: Mail,    label: "Email",    value: "gbpforfuture@gmail.com",         href: "mailto:gbpforfuture@gmail.com",                              color: "text-cyan-400",    bg: "bg-cyan-400/10    border-cyan-400/20"    },
  { icon: Github,  label: "GitHub",   value: "github.com/SHIM1999",            href: "https://github.com/SHIM1999",                                color: "text-foreground",  bg: "bg-white/5        border-white/10"        },
  { icon: Linkedin,label: "LinkedIn", value: "linkedin.com/in/mukhammed-shimbergenov", href: "https://www.linkedin.com/in/mukhammed-shimbergenov-789a10260/", color: "text-blue-400",    bg: "bg-blue-400/10    border-blue-400/20"    },
  { icon: MapPin,  label: "Location", value: "Korea 🇰🇷",                      href: "#",                                                          color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center section-header-mb">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4"
          >
            07 / Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's <span className="gradient-text-blue">Build Something</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-foreground/55 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Have a project in mind? Want to collaborate? Or just want to chat about engineering?
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto space-y-3"
        >
          {contactLinks.map(({ icon: Icon, label, value, href, color, bg }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex items-center gap-4 p-4 min-h-[56px] rounded-xl bg-card border ${bg.split(" ")[1]} hover:border-opacity-60 transition-all group`}
            >
              <div className={`w-11 h-11 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground/40 font-mono mb-0.5">{label}</p>
                <p className="text-foreground font-semibold text-sm break-all sm:break-normal">{value}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
