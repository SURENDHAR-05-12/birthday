import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WISHES = [
  {
    from: "அம்மா",
    message: "பிறந்தநாள் வாழ்த்துக்கள் ❤️",
    video: "./videos/amma.mp4",
  },
  {
    from: "அப்பா",
    message: "பிறந்தநாள் வாழ்த்துக்கள் ❤️",
    video: "./videos/appa.mp4",
  },
];

export default function Wishes() {
  const [openVideo, setOpenVideo] = useState(null);
  const [videoSize, setVideoSize] = useState({ w: 300, h: 250 });

  // Floating hearts
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 6,
        size: Math.random() * 18 + 14,
      })),
    []
  );

  // Detect ratio & auto fit
  const handleMeta = (e) => {
    const vw = e.target.videoWidth;
    const vh = e.target.videoHeight;
    const maxW = window.innerWidth * 0.82;
    const maxH = window.innerHeight * 0.62;

    let w = vw, h = vh;
    if (w > maxW) {
      const r = maxW / w;
      w = maxW; h = h * r;
    }
    if (h > maxH) {
      const r = maxH / h;
      h = maxH; w = w * r;
    }
    setVideoSize({ w, h });
  };

  return (
    <section id="wishes" className="relative py-20 px-5 text-center">

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: ["110%", "-10%"], opacity: [0, 0.55, 0] }}
            transition={{
              delay: h.delay,
              duration: h.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ left: h.left, fontSize: `${h.size}px` }}
            className="absolute text-pink-400"
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="relative z-10 text-4xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-12">
        Family Wishes 💝
      </motion.h2>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
        {WISHES.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: i * 0.1 }}
            className="group relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl
              border border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.05)]
              cursor-pointer overflow-hidden"
            onClick={() => setOpenVideo(w.video)}
          >
            {/* Glow hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br 
                from-[#ff43d1]/20 via-[#675dff]/20 to-[#42d7ff]/20 opacity-0
                group-hover:opacity-100 transition duration-500"
            />

            <h3 className="text-xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-pink-400 to-blue-400 mb-2 relative z-10">
              {w.from}
            </h3>

            <p className="text-white/85 mb-4 relative z-10">
              {w.message}
            </p>

            {/* Better Open Video button */}
            <button className="relative z-10 w-full py-3 rounded-xl 
              bg-white/10 text-white font-medium tracking-wide
              flex justify-center items-center gap-2
              border border-white/20
              hover:bg-white/20 transition">
              😜 Thottu Paaru
            </button>
          </motion.div>
        ))}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[999] 
              flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenVideo(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl 
                bg-white/10 border border-white/20 text-white 
                flex items-center justify-center text-lg"
            >
              ✕
            </motion.button>

            {/* Smart Ratio Video */}
            <motion.div
              style={{ width: videoSize.w, height: videoSize.h }}
              className="rounded-2xl overflow-hidden bg-white/10 
                border border-white/15 shadow-[0_0_35px_rgba(255,255,255,0.2)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <video
                key={openVideo}
                src={openVideo}
                autoPlay
                playsInline
                controls
                muted={false}
                onLoadedMetadata={handleMeta}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
