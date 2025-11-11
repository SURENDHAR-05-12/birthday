import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Typewriter({ text, speed = 25 }) {
  const [display, setDisplay] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(id);
        setIsDone(true);
      }
    }, speed + Math.random() * 20); // small randomness for realistic typing
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <div className="font-mono text-sm sm:text-base md:text-lg leading-relaxed text-white/90 
                    bg-gradient-to-r from-white/10 to-transparent rounded-xl p-4 sm:p-6 
                    backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)] 
                    relative overflow-hidden">
      {/* 📝 Typewriter Text */}
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="whitespace-pre-wrap drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
      >
        {display}
        {/* ✨ Blinking Cursor */}
        <motion.span
          animate={{
            opacity: isDone ? 0 : [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
          className="text-pink-400 font-bold"
        >
          |
        </motion.span>
      </motion.pre>

      {/* 🌈 Soft Glow Border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 20px rgba(236,72,153,0.15)",
            "0 0 35px rgba(96,165,250,0.2)",
            "0 0 20px rgba(236,72,153,0.15)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
