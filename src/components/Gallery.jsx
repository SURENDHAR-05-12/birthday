import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GALLERY = [
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549729574-ef4999c19012?q=80&w=1600&auto=format&fit=crop",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // ⏰ Auto-slide every 4s if not paused
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % GALLERY.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setIndex((i) => (i + 1) % GALLERY.length);
  const prev = () => setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)] group">
      {/* Background Glass Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-lg z-[1]" />

      {/* 🖼 Smooth but faster transitions */}
      <motion.img
        key={GALLERY[index]}
        src={GALLERY[index]}
        alt={`gallery-${index}`}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }} // faster
        className="relative w-full h-[45vh] sm:h-[60vh] object-cover rounded-3xl select-none z-[2]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      />

      {/* 🌈 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[3]" />

      {/* 🎛️ Navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 z-[4]">
        <motion.button
          onClick={() => {
            setPaused(true);
            prev();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 sm:p-4 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg"
        >
          ⏮
        </motion.button>

        <motion.button
          onClick={() => {
            setPaused(true);
            next();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 sm:p-4 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg"
        >
          ⏭
        </motion.button>
      </div>

      {/* 🔘 Indicators */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-[5]">
        {GALLERY.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.2 }}
            className={`h-2.5 w-8 rounded-full transition-all ${
              i === index
                ? "bg-gradient-to-r from-pink-400 to-blue-400 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)] pointer-events-none" />
    </div>
  );
}
