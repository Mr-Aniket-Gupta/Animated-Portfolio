"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function About() {
  return (
    <section className="relative z-20 bg-background text-white py-32 px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 text-white/40 font-mono tracking-widest mb-4">
            <User size={16} />
            <p>02 / ABOUT ME</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Who I Am</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-gray-300 font-light leading-relaxed">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-6"
          >
            I am a BSc Information Technology student with a strong foundation in software development, data handling, and modern web technologies. My core strengths lie in C++ with OOP concepts, Python, SQL, and full-stack web development.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-6"
          >
            Supported by hands-on experience building real-world projects and scalable applications, I have worked extensively with HTML, CSS, JavaScript, MERN stack technologies, and UI/UX design principles to create user-focused, efficient digital solutions. 
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mb-6"
          >
            Alongside development, I bring practical experience in data analysis and visualization using Power BI and Excel, enabling me to transform raw data into meaningful insights. I am a continuous learner who values discipline, clarity, and purposeful work. I enjoy solving problems, improving systems, and building products that deliver real impact.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            With experience across academic projects, internships, hackathons, and independent development, I am comfortable working both independently and in collaborative environments. I am actively seeking opportunities in web development, software engineering, and data-driven roles where I can contribute my skills, learn from experienced teams, and grow into a well-rounded technology professional.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
