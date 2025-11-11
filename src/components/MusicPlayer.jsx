import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ src }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  if (!src) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* 🎧 Glassy Player Button */}
      <motion.button
        onClick={() => setPlaying((p) => !p)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 
          rounded-full backdrop-blur-2xl bg-white/10 border border-white/20 
          shadow-[0_0_25px_rgba(255,255,255,0.2)] text-white font-medium transition-all duration-300"
      >
        {/* 🎵 Equalizer Animation (only when playing) */}
        <AnimatePresence>
          {playing && (
            <motion.div
              className="flex items-end gap-[3px] h-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: ["10%", "100%", "20%"],
                  }}
                  transition={{
                    duration: 0.6 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[3px] sm:w-[4px] bg-gradient-to-t from-pink-400 to-blue-400 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔘 Button Text */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm sm:text-base font-semibold tracking-wide drop-shadow"
        >
          {playing ? "Pause Music" : "Play Music"}
        </motion.span>

        {/* ✨ Glow Ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 opacity-40 blur-lg -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* 🎧 Audio */}
      <audio ref={audioRef} src={src} loop preload="auto" />
    </div>
  );
}
