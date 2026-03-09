"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import SkillModel from './SkillModel';

export default function Skills() {
  return (
    <section className="relative z-20 bg-background text-white py-32 overflow-hidden w-full">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 max-w-7xl mx-auto px-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
              <Terminal size={16} />
              <p>03 / TECHNICAL ARSENAL</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Skills & Tools</h2>
            <div className="h-[1px] w-full max-w-md bg-white/10" />
            <p className="mt-6 text-gray-400 font-light max-w-xl mx-auto">
              Hover over the floating elements to scatter them.
            </p>
          </div>
        </motion.div>

        {/* Full-width 3D Model Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-[600px] md:h-[80vh] flex justify-center items-center relative"
        >
          {/* Subtle gradient vignette to blend canvas edges */}
          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_100px_50px_rgba(18,18,18,1)]" />
          
          <div className="w-full h-full relative z-0">
            <SkillModel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
