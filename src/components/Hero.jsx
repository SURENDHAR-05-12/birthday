import React from "react";
import { motion } from "framer-motion";

const Hero = ({ title, date, nick }) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4">
      
      {/* 🌌 Background gradient blur glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* ✨ Floating glass particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full backdrop-blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, -30],
              opacity: [0.3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + Math.random() * 4,
              ease: "easeOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* 🌈 Glass card container */}
      <motion.div
        className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 max-w-3xl z-10"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 🏷️ Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-pink-400 to-purple-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        >
          {title}
        </motion.h1>

        {/* ✨ Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-white/80"
        >
          Celebrating <span className="font-semibold text-pink-400">{nick}</span> • {date}
        </motion.p>

        {/* 💫 Soft glowing line */}
        <motion.div
          className="mt-8 w-32 h-[3px] mx-auto rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 blur-[1px]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "8rem", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 🎇 Background shine overlay */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default Hero;
