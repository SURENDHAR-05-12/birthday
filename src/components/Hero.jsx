import { motion } from "framer-motion";

const Hero = ({ title, date, nick }) => {
  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#0B0B0F]">

      {/* ✨ Soft Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,192,0.14)_0%,transparent_70%)]" />

      {/* 🌟 Floating gold dust */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-rose-300/60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [-30, window.innerHeight + 30],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* 🧊 Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative bg-white/5 backdrop-blur-xl border border-rose-200/20 rounded-3xl shadow-[0_0_45px_rgba(255,182,193,0.2)] px-6 sm:px-10 py-10 max-w-3xl"
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-300 via-rose-200 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,182,193,0.3)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-2xl text-rose-100/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Celebrating <span className="font-semibold text-rose-300">{nick}</span> • {date}
        </motion.p>

        {/* Rose gold underline */}
        <motion.div
          className="mx-auto mt-7 h-[3px] w-36 rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "9rem", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25 }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
