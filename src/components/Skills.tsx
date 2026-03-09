"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: "Core Languages",
    skills: ["C++", "Python", "Rust", "JavaScript / TypeScript", "SQL"]
  },
  {
    title: "Web Technologies",
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "HTML / CSS", "Tailwind CSS"]
  },
  {
    title: "Data & UI Tools",
    skills: ["Power BI", "Excel", "Data Analysis", "Figma", "UI/UX Design", "Canva"]
  },
  {
    title: "Core Competencies",
    skills: ["AI Strategy Design", "Analytical Reporting", "OOP Concepts", "Git / GitHub", "Problem Solving"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Skills() {
  return (
    <section className="relative z-20 bg-background text-white py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
            <Terminal size={16} />
            <p>03 / TECHNICAL ARSENAL</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Skills & Tools</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <h3 className="text-2xl font-medium tracking-tight mb-6 text-white pb-4 border-b border-white/10">
                {category.title}
              </h3>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, sIdx) => (
                  <motion.span 
                    key={sIdx} 
                    variants={itemVariants}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300 hover:text-white hover:border-white/30 transition-colors shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
