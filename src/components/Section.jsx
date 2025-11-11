import React from "react";
import { motion } from "framer-motion";

const Section = ({ id, title, subtitle, children }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-14 sm:py-20 md:py-28 px-5 sm:px-8 overflow-hidden"
    >
      {/* 🌈 Glassy background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-pink-400/5 to-blue-400/10 backdrop-blur-3xl rounded-3xl border-t border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] -z-10" />

      {/* ✨ Content Container */}
      <div className="mx-auto max-w-6xl text-center sm:text-left">
        {/* 🏷️ Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 
                     bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-transparent bg-clip-text"
        >
          {title}
        </motion.h2>

        {/* 🌟 Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[3px] w-24 sm:w-28 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 
                     rounded-full origin-left mb-6 sm:mb-8 mx-auto sm:mx-0"
        />

        {/* 📝 Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/80 max-w-2xl mb-10 sm:mb-14 text-base sm:text-lg leading-relaxed mx-auto sm:mx-0"
          >
            {subtitle}
          </motion.p>
        )}

        {/* 💫 Section Content */}
        <div>{children}</div>
      </div>
    </motion.section>
  );
};

export default Section;
