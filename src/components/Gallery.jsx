import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const GALLERY = [
  "./images/img1.jpeg",
  "./images/img2.jpeg",
  "./images/img3.jpeg",
  "./images/img4.jpeg",
  "./images/img5.jpeg",
  "./images/img6.jpeg",
  "./images/img7.jpeg",
  "./images/img8.jpeg",
  "./images/img9.jpeg",
  "./images/img10.jpeg",
  "./images/img11.jpeg",
  "./images/img12.jpeg",
  "./images/img13.jpeg",
  "./images/img14.jpeg",
  "./images/img15.jpeg",
  "./images/img16.jpeg",
  "./images/img17.jpeg",
  "./images/img19.jpeg",
  "./images/img20.jpeg",
  "./images/img21.jpeg",
  "./images/img22.jpeg",
  "./images/img23.jpeg",
  "./images/img24.jpeg",
  "./images/img25.jpeg",
  "./images/img26.jpeg",
  "./images/img27.jpeg",
  "./images/img28.jpeg",
  "./images/img29.jpeg",
  "./images/img30.jpeg",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => next(), 3500);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setIndex((i) => (i + 1) % GALLERY.length);
  const prev = () => setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[48vh] sm:h-[65vh] overflow-hidden rounded-[2.2rem]
      shadow-[0_0_60px_rgba(0,0,0,0.45)] group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ⭐ 3D parallax glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* 🎯 Animated Slide */}
      <AnimatePresence mode="wait">
        <motion.img
          key={GALLERY[index]}
          src={GALLERY[index]}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover rounded-[2.2rem]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.015 }}
        />
      </AnimatePresence>

      {/* 🌪 3D glow tilt */}
      <motion.div
        className="absolute inset-0 rounded-[2.2rem] pointer-events-none"
        whileHover={{ rotateX: -4, rotateY: 4 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />

      {/* 🧭 Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-6 z-[5]">
        <motion.button
          whileHover={{ scale: 1.13 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="p-4 rounded-full bg-black/10 text-white border border-white/20 
          shadow-[0_0_20px_rgba(255,255,255,0.35)]"
        >
          ⏮
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.13 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="p-4 rounded-full bg-black/10 text-white border border-white/20 
          shadow-[0_0_20px_rgba(255,255,255,0.35)]"
        >
          ⏭
        </motion.button>
      </div>

      {/* 🔥 3-DOT SLIDING INDICATOR */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center z-[7]">
        <motion.div
          layout             // ⭐ IMPORTANT — tells Framer to animate position change
          className="flex gap-6"
          transition={{ duration: 0.35, type: "spring", stiffness: 280, damping: 22 }}
        >
          {[index - 1, index, index + 1].map((pos, i) => {
            const realIndex = (pos + GALLERY.length) % GALLERY.length;
            const isActive = realIndex === index;

            return (
              <motion.div
                key={realIndex}       // ⭐ not i — use realIndex to trigger animation
                layout                // ⭐ dot itself animates sliding
                onClick={() => setIndex(realIndex)}
                className="bg-white rounded-full cursor-pointer"
                animate={{
                  width: isActive ? 11 : 7,
                  height: isActive ? 11 : 7,
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.18 : 1,
                }}
                transition={{ duration: 0.32, type: "spring" }}
              />
            );
          })}
        </motion.div>
      </div>



      {/* Border outline */}
      <div className="absolute inset-0 rounded-[2.2rem] border border-white/20 pointer-events-none" />
    </div>
  );
}
