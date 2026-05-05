import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import CoreTagline from "@/components/CoreTagline";
import Architecture from "@/components/Architecture";
import Roadmap from "@/components/Roadmap";
import TechStack from "@/components/TechStack";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-brand selection:text-black">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E24_1px,transparent_1px),linear-gradient(to_bottom,#1E1E24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <Hero />
        <ProblemSolution />
        <CoreTagline />
        <Architecture />
        <Roadmap />
        <TechStack />
        <Manifesto />
        <Footer />
      </div>
    </main>
  );
}
