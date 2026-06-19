/* ============================================================
   Resume — Education, Experience, Certifications
   Design: Clean professional cards, glass layout
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Download } from "lucide-react";

const education = [
  {
    institution: "Ulsan College / Ulsan Science University",
    degree: "Global Business → IT Major",
    period: "2018 – Present",
    desc: "Transitioned from Global Business to IT, building a foundation in software development and systems thinking.",
  },
  {
    institution: "Architecture Study",
    degree: "Pre-Korea Education",
    period: "2016 – 2018",
    desc: "Two years of architectural study in Uzbekistan, developing spatial reasoning and design fundamentals.",
  },
];

const experience = [
  {
    role: "Android App Developer (Self-directed)",
    company: "Personal Projects",
    period: "2023 – Present",
    desc: "Built ShiftShare app concept with full backend integration, role-based auth, and REST API connectivity.",
  },
  {
    role: "JavaFX CBT System Developer",
    company: "Academic Project",
    period: "2023",
    desc: "Designed and built a complete computer-based testing system with admin/user roles and MySQL backend.",
  },
  {
    role: "Industrial Vision & OCR Research",
    company: "Self-directed Learning",
    period: "2023 – Present",
    desc: "Studying OCR, camera inspection workflows, PaddleOCR, OpenCV, and 3D point cloud alignment.",
  },
  {
    role: "Barista / Customer Service",
    company: "Korea (Various)",
    period: "2019 – 2022",
    desc: "Real-world work experience in Korea, building language skills, discipline, and cultural understanding.",
  },
];

const certifications = [
  { name: "Internet Management Level 2", issuer: "Korean Certification", year: "2023" },
  { name: "Driver's License", issuer: "Korea", year: "2022" },
];

function SectionBlock({ title, icon: Icon, children, delay = 0 }: { title: string; icon: any; children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-cyan-400" />
        </div>
        <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="relative section-pad overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between section-header-mb gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4"
            >
              07 / Resume
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title font-extrabold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Experience &amp; <span className="gradient-text-cyan">Education</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 min-h-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/10 transition-colors self-start sm:self-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Download className="w-4 h-4" />
            {/* TODO: Replace # with actual resume PDF URL */}
            Download PDF
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-10">
            <SectionBlock title="Education" icon={GraduationCap}>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="glass-card rounded-2xl p-4 border border-white/8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1">
                      <h4 className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {edu.institution}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400/60 sm:flex-shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-cyan-400/80 text-xs font-mono mb-2">{edu.degree}</p>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock title="Certifications" icon={Award} delay={0.1}>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between glass-card rounded-xl p-3 border border-white/8">
                    <div>
                      <p className="text-white text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cert.name}</p>
                      <p className="text-white/40 text-xs font-mono">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono text-indigo-400/70">{cert.year}</span>
                  </div>
                ))}
              </div>
            </SectionBlock>
          </div>

          {/* Right column */}
          <SectionBlock title="Experience" icon={Briefcase} delay={0.05}>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 border border-white/8 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/60 to-indigo-400/30 rounded-full" />
                  <div className="pl-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-0.5">
                      <h4 className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400/60 sm:flex-shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-indigo-400/70 text-xs font-mono mb-2">{exp.company}</p>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        </div>
      </div>
    </section>
  );
}
