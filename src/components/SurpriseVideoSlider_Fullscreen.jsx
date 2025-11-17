import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "./videos/clip1.mp4", title: "HEMA" },
  { src: "./videos/clip2.mp4", title: "DHARANI" },
  { src: "./videos/clip3.mp4", title: "NAVEENA" },
  { src: "./videos/clip4.mp4", title: "VIMALA" },
  { src: "./videos/clip5.mp4", title: "SWETHA" },
  { src: "./videos/clip6.mp4", title: "CLARA" },
  { src: "./videos/clip7.mp4", title: "GAYU" },
  { src: "./videos/clip8.mp4", title: "SRI" },
  { src: "./videos/clip9.mp4", title: "MEGAA" },
  { src: "./videos/clip10.mp4", title: "SUSHMITHA" },
  { src: "./videos/clip11.mp4", title: "YUVA" },
  { src: "./videos/clip12.mp4", title: "ILAKKI" },
  { src: "./videos/clip13.mp4", title: "HARINI" },
  { src: "./videos/clip14.mp4", title: "SITHAPA" },
];

const SurpriseVideoSlider_Fullscreen = ({ open, onClose }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [fade, setFade] = useState(false);
  const videoRef = useRef(null);

  // ESC close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Preload next video
  useEffect(() => {
    const next = (index + 1) % slides.length;
    const preload = document.createElement("video");
    preload.src = slides[next].src;
    preload.preload = "auto";
  }, [index]);

  // Detect aspect ratio
  const handleMetadata = () => {
    const v = videoRef.current;
    if (v?.videoWidth && v?.videoHeight) {
      const ratio = v.videoWidth / v.videoHeight;
      setAspectRatio(ratio || 16 / 9);
    }
  };

  // Play / pause
  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
    setPlaying(!v.paused);
  };

  // Change slide smoothly
  const changeVideo = (direction) => {
    setFade(true);
    setTimeout(() => {
      setIndex((prev) => {
        if (direction === "next") {
          return prev < slides.length - 1 ? prev + 1 : prev; // stop at last
        }
        if (direction === "prev") {
          return prev > 0 ? prev - 1 : prev; // stop at first
        }
        return prev;
      });
      setFade(false);
    }, 330);
  };


  // Auto play on index change
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    if (playing) v.play().catch(() => { });
  }, [index]);

  // Pause video when closing
  useEffect(() => {
    if (!open && videoRef.current) videoRef.current.pause();
  }, [open]);

  // Responsive container sizing
  const aspectStyle = {
    aspectRatio,
    width: aspectRatio >= 1 ? "90vw" : "auto",
    maxWidth: aspectRatio >= 1 ? "900px" : "420px",
    maxHeight: "80vh",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center 
          bg-black/60 backdrop-blur-3xl px-3 sm:px-4 touch-action-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[1000] group"
          >
            <motion.div
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 6px rgba(255,255,255,0.15)",
                  "0 0 16px rgba(255,138,208,0.45)",
                  "0 0 6px rgba(255,255,255,0.15)"
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded-xl flex items-center justify-center
    backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20
    transition duration-300"
            >
              <span className="text-white text-xl font-light">
                ✕
              </span>
            </motion.div>
          </button>




          {/* Video Container */}
          <motion.div
            style={aspectStyle}
            className="relative overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)]
            border border-white/20 bg-white/10 backdrop-blur-2xl flex items-center justify-center
            before:absolute before:inset-0 before:bg-gradient-to-br 
            before:from-pink-500/10 before:via-purple-500/10 before:to-blue-500/10 before:z-0"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.video
              key={slides[index].src}
              ref={videoRef}
              src={slides[index].src}
              onLoadedMetadata={handleMetadata}
              onEnded={() => changeVideo("next")}
              className="relative w-full h-full object-cover sm:object-contain z-[2]"
              autoPlay={playing}
              loop={false}
              playsInline
              muted={false}
              animate={{ opacity: fade ? 0 : 1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
              pointer-events-none z-[3]" />

            {/* Title */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 
            sm:left-10 sm:translate-x-0 text-white z-[4]">
              <h3 className="text-xl sm:text-3xl font-extrabold bg-clip-text text-transparent 
                bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {slides[index].title}
              </h3>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex gap-5 mt-6 sm:mt-8 z-[1000]">
            <button
              onClick={() => changeVideo("prev")}
              className="text-base sm:text-xl px-4 py-2 sm:px-5 sm:py-3 rounded-full 
              bg-white/10 hover:bg-white/20 border border-white/20 text-white active:scale-95
              backdrop-blur-xl shadow-[0_0_15px_rgba(255,255,255,0.15)] transition"
            >
              ⏮
            </button>

            <button
              onClick={handlePlayPause}
              className="text-base sm:text-xl px-6 py-2 sm:px-7 rounded-full bg-gradient-to-r 
              from-pink-400 via-purple-400 to-blue-400 text-white font-bold shadow-lg 
              active:scale-95 transition"
            >
              {playing ? "⏸ Pause" : "▶️ Play"}
            </button>

            <button
              onClick={() => changeVideo("next")}
              className="text-base sm:text-xl px-4 py-2 sm:px-5 sm:py-3 rounded-full 
              bg-white/10 hover:bg-white/20 border border-white/20 text-white active:scale-95
              backdrop-blur-xl shadow-[0_0_15px_rgba(255,255,255,0.15)] transition"
            >
              ⏭
            </button>
          </div>

          {/* Counter */}
          <p className="text-white/70 text-xs mt-4">
            Clip {index + 1} of {slides.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseVideoSlider_Fullscreen;
