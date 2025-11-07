import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/videos/clip1.mp4",
    title: "Finland",
    desc: "Serene lakes and calm reflections.",
  },
  {
    src: "/videos/clip2.mp4",
    title: "Autumn Magic",
    desc: "Golden leaves and endless joy.",
  },
  {
    src: "/videos/clip3.mp4",
    title: "Mountain View",
    desc: "Peaceful horizons and sweet smiles.",
  },
];

const SurpriseVideoSlider_Fullscreen = ({ open, onClose }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const videoRef = useRef(null);

  // 🔄 Handle next / prev video
  const next = () => {
    setIndex((i) => (i + 1) % slides.length);
    setPlaying(true);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setPlaying(true);
  };

  // ▶️ / ⏸ Toggle play
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  // 🧠 Detect actual video resolution smoothly
  const handleMetadata = () => {
    const video = videoRef.current;
    if (video?.videoWidth && video?.videoHeight) {
      const ratio = video.videoWidth / video.videoHeight;
      setAspectRatio(ratio || 16 / 9);
    }
  };

  // 🎬 Autoplay safely without glitch
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const playPromise = playing ? video.play() : video.pause();
    if (playPromise !== undefined) {
      playPromise.catch(() => {}); // avoid error
    }
  }, [index]);

  // ⚙️ Decide width dynamically
  const aspectStyle = {
    aspectRatio: aspectRatio,
    width: aspectRatio >= 1 ? "90vw" : "auto",
    maxWidth: aspectRatio >= 1 ? "900px" : "400px",
    maxHeight: "80vh",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-2xl px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ✖ Always visible close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-pink-300 active:scale-95 transition z-[1000]"
          >
            ✖
          </button>

          {/* 🎥 Video Player */}
          <div
            className="relative overflow-hidden shadow-2xl rounded-3xl bg-black/40 flex items-center justify-center"
            style={aspectStyle}
          >
            <video
              ref={videoRef}
              src={slides[index].src}
              onLoadedMetadata={handleMetadata}
              className="w-full h-full object-contain"
              autoPlay={playing}
              muted
              loop
              playsInline
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:left-10 text-white drop-shadow-lg">
              <h3 className="text-xl sm:text-3xl font-extrabold">{slides[index].title}</h3>
              <p className="text-sm sm:text-base text-white/90 mt-1 max-w-md">
                {slides[index].desc}
              </p>
            </div>
          </div>

          {/* 🎛 Controls */}
          <div className="flex gap-5 mt-6 sm:mt-8 z-[1000]">
            <button
              onClick={prev}
              className="text-lg sm:text-xl px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white active:scale-95"
            >
              ⏮
            </button>

            <button
              onClick={handlePlayPause}
              className="text-lg sm:text-xl px-5 py-2 bg-white text-black font-bold rounded-full shadow-md active:scale-95 transition"
            >
              {playing ? "⏸ Pause" : "▶️ Play"}
            </button>

            <button
              onClick={next}
              className="text-lg sm:text-xl px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white active:scale-95"
            >
              ⏭
            </button>
          </div>

          {/* Clip counter */}
          <p className="text-white/80 text-xs mt-3">Clip {index + 1} of {slides.length}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseVideoSlider_Fullscreen;
