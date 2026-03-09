"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy } from 'lucide-react';

const projectsList = [
  {
    id: "01",
    title: "UI Showdown",
    category: "Competition Prize",
    description: "Participated and won in a competitive coding and UI design showdown emphasizing creating high-quality, reactive front-end experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "02",
    title: "Hackathon - Code Competition",
    category: "Honors & Awards",
    description: "Engaged in an intensive problem-solving hackathon, utilizing C++ and full-stack technologies to deliver a working prototype under strict time constraints.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
  }
];

function TiltProjectCard({ project }: { project: typeof projectsList[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row gap-8 items-start md:items-center p-8 overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none md:hidden block" />
      </div>

      {/* Decorative background glow for hover effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 pointer-events-none" />

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-20 flex-shrink-0 text-gray-400 font-mono text-2xl md:text-4xl pr-8 md:border-r border-white/10 transition-transform duration-500 pointer-events-none"
      >
        {project.id}
      </div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-20 flex flex-col gap-2 transition-transform duration-500 pointer-events-none"
      >
        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">
          {project.category}
        </span>
        <h3 className="text-2xl md:text-4xl font-medium tracking-tight mb-2 text-white group-hover:text-blue-200 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 max-w-2xl text-lg font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative z-20 bg-background text-white py-32 px-8 overflow-hidden" style={{ perspective: "1000px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
            <Trophy size={16} />
            <p>05 / CREATIVE WORK</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Projects & Awards</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="space-y-12 pl-4 pr-4 pb-4">
          {projectsList.map((project) => (
            <TiltProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
