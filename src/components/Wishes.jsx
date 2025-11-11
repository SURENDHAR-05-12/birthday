import { motion } from "framer-motion";
import { useMemo } from "react";

const WISHES = [
  {
    from: "Amma",
    message:
      "Happy birthday, kanna! You make every day brighter. Proud of you always!",
    video: "",
  },
  {
    from: "Appa",
    message:
      "Keep smiling and keep shining, superstar! You make us proud every day ❤️",
    video: "",
  },
];

export default function Wishes() {
  // 🎈 Generate small floating heart particles
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: Math.random() * 20 + 10,
      })),
    []
  );

  return (
    <div className="relative">
      {/* 💞 Floating Heart Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: ["100%", "-10%"],
              opacity: [0, 0.6, 0],
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
              color: "rgba(255, 192, 203, 0.6)",
            }}
            className="absolute"
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* 🌈 Wish Cards */}
      <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 z-[10]">
        {WISHES.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -6 }}
            className="group relative rounded-3xl border border-white/10 
              bg-gradient-to-br from-white/10 via-white/5 to-transparent 
              backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] 
              p-5 sm:p-6 overflow-hidden transition-all duration-500"
          >
            {/* ✨ Gradient Shine Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"
            />

            {/* ❤️ Header */}
            <div className="relative mb-3 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
                {w.from}
              </h3>
              <span className="text-lg sm:text-xl">💌</span>
            </div>

            {/* 📝 Message */}
            <p className="relative text-white/90 text-sm sm:text-base leading-relaxed mb-4">
              {w.message}
            </p>

            {/* 🎥 Optional Video */}
            {w.video ? (
              <video
                src={w.video}
                controls
                className="relative w-full rounded-xl border border-white/10 mt-2 shadow-lg"
              />
            ) : (
              <div className="relative rounded-xl border border-white/10 p-3 text-xs sm:text-sm text-white/60 text-center bg-white/5">
                (Video message coming soon 💫)
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
