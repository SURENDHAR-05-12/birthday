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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full group">
      {/* Image fade transition */}
      <motion.img
        key={GALLERY[index]}
        src={GALLERY[index]}
        alt={`gallery-${index}`}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full h-[40vh] sm:h-[55vh] object-cover rounded-2xl select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      />

      {/* ⬅ Prev Button */}
      <button
        onClick={() => {
          setPaused(true);
          prev();
        }}
        className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition opacity-0 group-hover:opacity-100 active:scale-95"
      >
        ⏮
      </button>

      {/* ➡ Next Button */}
      <button
        onClick={() => {
          setPaused(true);
          next();
        }}
        className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition opacity-0 group-hover:opacity-100 active:scale-95"
      >
        ⏭
      </button>

      {/* 🔘 Dots Indicator */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-3 sm:pb-4">
        {GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-6 sm:w-8 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
