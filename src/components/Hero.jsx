import React from "react";
import { motion } from "framer-motion";

const Hero = ({ title, date, nick }) => {
  return (
    <div className="text-center py-16 md:py-32 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-snug"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 text-base sm:text-lg md:text-xl text-white/90"
      >
        Celebrating {nick} • {date}
      </motion.p>
    </div>
  );
};

export default Hero;
