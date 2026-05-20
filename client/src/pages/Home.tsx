import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EngineeringDirection from "@/components/EngineeringDirection";
import Philosophy from "@/components/Philosophy";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <EngineeringDirection />
      <Philosophy />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
