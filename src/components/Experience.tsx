"use client";

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const highlights = [
  {
    id: "01",
    title: "Software Developer Intern",
    category: "Qualyval",
    description: "Developing and testing application features, collaborating in team workflows, and applying best practices in version control.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "02",
    title: "Web Development Intern",
    category: "CodTech IT Solutions",
    description: "Built practical web development skills over a 6-week intensive internship focusing on full-stack technologies.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "03",
    title: "BSc Information Technology",
    category: "B. K. Birla College",
    description: "Currently pursuing degree (2023-2026). Strong foundation in C++ (OOP), Python, SQL, and the MERN stack.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "04",
    title: "Data Analysis & UI",
    category: "Core Competencies",
    description: "Proficient in translating raw data into insights via Power BI & Excel, alongside UI/UX design via Figma.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
  }
];

function TiltCard({ item }: { item: typeof highlights[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex flex-col justify-end p-8 md:p-12 h-[500px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      >
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      </div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 rounded-2xl pointer-events-none" 
      />
      
      {/* Decorative background glow for hover effect */}
      <div 
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 rounded-2xl pointer-events-none" 
      />

      <div 
        style={{ transform: "translateZ(75px)" }}
        className="relative z-20 flex flex-col gap-4 transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none"
      >
        <div className="flex justify-between items-center text-gray-400 font-mono text-sm border-b border-white/10 pb-4">
          <span>{item.id}</span>
          <span>{item.category}</span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight mt-2 pb-2 text-white">
          {item.title}
        </h3>
        
        <p className="text-gray-400 max-w-sm mt-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="relative z-20 bg-background text-white py-32 px-8 min-h-screen overflow-hidden" style={{ perspective: "1000px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
            <Briefcase size={16} />
            <p>04 / PATHWAY</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Experience & Skills</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-4 pr-4 pb-4">
          {highlights.map((item) => (
            <TiltCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
