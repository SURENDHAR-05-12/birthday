import React, { useMemo } from "react";
import { motion } from "framer-motion";

const WISHES = [
  {
    from: "அம்மா",
    message: "பிறந்தநாள் வாழ்த்துக்கள்❤️",
  },
  {
    from: "அப்பா",
    message: "பிறந்தநாள் வாழ்த்துக்கள்❤️",
    video: "",
  },
];

export default function Wishes() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: Math.random() * 18 + 14,
      })),
    []
  );

  return (
    <section
      id="wishes"
      className="relative py-16 sm:py-24 px-5 flex flex-col items-center"
    >
      {/* Floating hearts background (light, not distracting) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: ["110%", "-10%"],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              delay: h.delay,
              duration: h.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: h.left,
              fontSize: `${h.size}px`,
            }}
            className="absolute text-pink-300"
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* Section heading */}
      <h2 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text 
      bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-12 text-center">
        வாழ்த்துக்கள் ♡
      </h2>

      {/* Cards */}
      <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {WISHES.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-2xl p-6 sm:p-7 
            bg-white/10 backdrop-blur-xl border border-white/15
            shadow-[0_0_35px_rgba(0,0,0,0.35)]
            hover:shadow-[0_0_45px_rgba(0,0,0,0.45)]
            transition-all duration-400"
          >
            {/* From */}
            <h3 className="text-xl sm:text-2xl font-bold 
              bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 mb-2">
              {w.from}
            </h3>

            {/* Message */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
              {w.message}
            </p>

            {/* Video (optional) */}
            {w.video ? (
              <video
                src={w.video}
                controls
                className="w-full rounded-xl border border-white/15 shadow-lg"
              />
            ) : (
              <div className="rounded-xl text-white/60 text-xs sm:text-sm 
              bg-white/5 border border-white/10 p-3 text-center">
                (Video message coming soon 💫)
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
