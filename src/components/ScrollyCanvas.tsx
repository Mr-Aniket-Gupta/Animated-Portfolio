"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

const FRAME_COUNT = 75;
const FRAME_PREFIX = "frame_";
const FRAME_SUFFIX = "_delay-0.066s.png";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(2, "0");
      img.src = `/sequence/${FRAME_PREFIX}${paddedIndex}${FRAME_SUFFIX}`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    if (images.length === 0 || !images[index] || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(Math.round(latest));
  });

  useEffect(() => {
    if (imagesLoaded === FRAME_COUNT) {
      renderFrame(Math.round(frameIndex.get()));
      
      const handleResize = () => renderFrame(Math.round(frameIndex.get()));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm text-foreground">
            <div className="text-xl font-light tracking-widest uppercase">
              Loading {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Cinematic Gradient Fade to transition smoothly to the About section */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent z-[15] pointer-events-none" />
        
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
