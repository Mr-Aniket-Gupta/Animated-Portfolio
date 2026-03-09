"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section className="relative z-20 bg-background text-white pt-32 pb-12 px-8 border-t border-white/10 mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-24 flex flex-col items-center w-full"
        >
          <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
            <Mail size={16} />
            <p>06 / GET IN TOUCH</p>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12">
            Let's build <br className="hidden md:block"/> something together.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 w-full">
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              href="mailto:aniketgupta2226@gmail.com" 
              className="inline-block relative overflow-hidden group"
            >
              <span className="text-2xl md:text-3xl font-light tracking-tight text-white/70 group-hover:text-white transition-colors duration-300">
                aniketgupta2226@gmail.com
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.a>
            
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              href="https://github.com/Mr-Aniket-Gupta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block relative overflow-hidden group"
            >
              <span className="text-2xl md:text-3xl font-light tracking-tight text-white/70 group-hover:text-white transition-colors duration-300">
                GitHub ↗
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.a>

            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              href="https://www.linkedin.com/in/aniket-guptatechnology-enthusiast/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block relative overflow-hidden group"
            >
              <span className="text-2xl md:text-3xl font-light tracking-tight text-white/70 group-hover:text-white transition-colors duration-300">
                LinkedIn ↗
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono border-t border-white/10 pt-8 mt-12 gap-4"
        >
          <p>© {new Date().getFullYear()} Aniket Gupta. All rights reserved.</p>
          <p>Built with Next.js, Tailwind, & Framer Motion.</p>
        </motion.div>
      </div>
    </section>
  );
}
