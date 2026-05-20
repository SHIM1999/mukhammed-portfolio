/* ============================================================
   Projects — Dark glass cards
   ============================================================ */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Smartphone, Monitor, Gamepad2, Eye, Box } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "ShiftShare Android App",
    icon: Smartphone,
    color: "from-blue-500/20 to-cyan-500/10",
    border: "hover:border-blue-400/30",
    iconColor: "text-blue-400",
    desc: "An Android app connecting part-time workers and store owners. Login, registration, role selection, profile setup, and backend REST API integration.",
    tags: ["Android", "Java", "REST API", "MariaDB"],
  },
  {
    id: 2,
    title: "JavaFX CBT System",
    icon: Monitor,
    color: "from-purple-500/20 to-indigo-500/10",
    border: "hover:border-purple-400/30",
    iconColor: "text-purple-400",
    desc: "A computer-based testing system with JavaFX and MySQL. Admin/user roles, exam creation, and question management.",
    tags: ["Java", "JavaFX", "MySQL", "Database"],
  },
  {
    id: 3,
    title: "Way to School Game",
    icon: Gamepad2,
    color: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-400/30",
    iconColor: "text-emerald-400",
    desc: "A mobile mini-game based on my real daily journey to school. Waking up, alarm mini-game, and classroom navigation.",
    tags: ["Unity", "C#", "Android Game", "Mini-games"],
  },
  {
    id: 4,
    title: "Industrial OCR / Vision System",
    icon: Eye,
    color: "from-cyan-500/20 to-teal-500/10",
    border: "hover:border-cyan-400/30",
    iconColor: "text-cyan-400",
    desc: "Research around OCR, camera images, preprocessing, and industrial inspection for reading VIN numbers or labels.",
    tags: ["OCR", "PaddleOCR", "OpenCV", "C#", "Python"],
  },
  {
    id: 5,
    title: "3D Point Cloud & ICP",
    icon: Box,
    color: "from-orange-500/20 to-amber-500/10",
    border: "hover:border-orange-400/30",
    iconColor: "text-orange-400",
    desc: "Experiments with 3D point cloud processing, ICP alignment, and depth camera integration for industrial applications.",
    tags: ["3D Point Cloud", "ICP", "Kinect", "Scanner"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className={`relative h-full bg-card border border-white/8 ${project.border} rounded-2xl p-6 transition-all duration-300 overflow-hidden`}>
        {/* Gradient top tint */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
            <Icon className={`w-5 h-5 ${project.iconColor}`} />
          </div>

          <h3 className="text-foreground font-bold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {project.title}
          </h3>

          <p className="text-foreground/55 text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-foreground/60 font-mono">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-foreground text-xs font-semibold transition-colors">
              <Github className="w-3.5 h-3.5" /> Code
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 text-xs font-semibold transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4">04 / Projects</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Work I'm <span className="gradient-text-blue">Proud Of</span>
          </h2>
          <p className="text-foreground/55 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From Android apps to vision systems, each project is a block in my engineering journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
