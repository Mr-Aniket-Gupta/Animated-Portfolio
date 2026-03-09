"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Visible from start, fades out by 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Section 2: Fades in at 25%, peaks at 35%, fades out by 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [150, -150]);

  // Section 3: Fades in at 55%, peaks at 65%, fades out by 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [150, -150]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full max-w-7xl mx-auto">
      {/* Section 1: Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 will-change-transform"
      >
        <p className="text-gray-400 font-mono tracking-[0.2em] mb-4 text-sm uppercase">Full Stack Developer</p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-none">
          Aniket Gupta.
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 font-light mt-4">
          C++ | Python | Full Stack | Power BI
        </p>
      </motion.div>

      {/* Section 2: Left */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start text-left p-8 md:p-24 will-change-transform"
      >
        <div className="max-w-3xl">
          <p className="text-white/40 font-mono tracking-widest mb-4">01 / EXPERTISE</p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
            I build <span className="text-gray-500 italic">scalable</span> digital solutions.
          </h2>
        </div>
      </motion.div>

      {/* Section 3: Right */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end text-right p-8 md:p-24 will-change-transform"
      >
        <div className="max-w-3xl">
          <p className="text-white/40 font-mono tracking-widest mb-4">02 / VISION</p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
            Bridging <span className="text-gray-500 italic">data</span> and engineering.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
