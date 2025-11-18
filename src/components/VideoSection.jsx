import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEOS = [
  { src: "./videos/vid1.mp4", title: "" },
  { src: "./videos/vid2.mp4", title: "" },
  { src: "./videos/vid3.mp4", title: "" },
  { src: "./videos/vid4.mp4", title: "" },
  { src: "./videos/vid5.mp4", title: "" },
  { src: "./videos/vid6.mp4", title: "" },
  { src: "./videos/vid7.mp4", title: "" },
  { src: "./videos/vid8.mp4", title: "" },
  { src: "./videos/vid9.mp4", title: "" },
  { src: "./videos/vid10.mp4", title: "" },
];

export default function VideoSection() {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p < VIDEOS.length - 1 ? p + 1 : p));
  const prev = () => setActive((p) => (p > 0 ? p - 1 : p));

  return (
    <section
      id="videos"
      className="relative py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text 
        bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-14 text-center">
        தோழிகள்
      </h2>

      {/* Carousel Wrapper */}
      <div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center">

        {VIDEOS.map((video, i) => (
          <VideoCard
            key={i}
            video={video}
            index={i}
            active={active}
            setActive={setActive}
          />
        ))}

        {/* Prev Button */}
        {active > 0 && (
          <button
            onClick={prev}
            className="absolute left-1 sm:left-1 p-2 rounded-full bg-white/15 border border-white/20
            text-white backdrop-blur-xl hover:bg-white/25 transition"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Next Button */}
        {active < VIDEOS.length - 1 && (
          <button
            onClick={next}
            className="absolute right-1 sm:right-1 p-2 rounded-full bg-white/15 border border-white/20
            text-white backdrop-blur-xl hover:bg-white/25 transition"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------
      🔥 Single 3D Carousel Card with Auto-Pause Fix
------------------------------------------------------*/
function VideoCard({ video, index, active, setActive }) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(index === 0 ? false : false);
  const [isMuted, setIsMuted] = useState(index === 0 ? false : false);

  const togglePlay = () => {
    if (!ref.current) return;
    if (isPlaying) ref.current.pause();
    else ref.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    ref.current.muted = !ref.current.muted;
    setIsMuted(!isMuted);
  };

  /* ⭐ Auto-pause video when not visible on screen */
  useEffect(() => {
    const videoEl = ref.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (index === active) {
      // first video stays paused
      if (index === 0) {
        ref.current.pause();
        setIsPlaying(false);
      } else {
        ref.current.play().catch(() => { });
        setIsPlaying(true);
      }
      ref.current.muted = false; // always sound ON
    } else {
      ref.current.pause();
      setIsPlaying(false);
    }
  }, [active]);



  /* ⭐ Auto-pause when card is not active */
  useEffect(() => {
    if (index !== active && ref.current) {
      ref.current.pause();
      setIsPlaying(false);
    }
  }, [active]);

  return (
    <motion.div
      onClick={() => setActive(index)}
      className="absolute rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/15 shadow-xl cursor-pointer"
      layout
      animate={{
        x: (index - active) * 360,
        scale: index === active ? 1 : 0.78,
        opacity: index === active ? 1 : 0.4,
        zIndex: index === active ? 20 : 5,
        rotateY: index === active ? 0 : (index < active ? 8 : -8),
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.25 }}
      whileHover={index === active ? { scale: 1.03 } : {}}
    >
      {/* Video */}
      <video
        ref={ref}
        src={video.src}
        muted={isMuted}
        autoPlay={true}
        loop
        playsInline
        className="w-[300px] sm:w-[360px] md:w-[400px] h-[420px] object-cover"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      />

      {/* Top Controls */}
      {index === active && (
        <div className="absolute top-3 right-3 flex gap-3">
          <ControlButton onClick={togglePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </ControlButton>
          <ControlButton onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </ControlButton>
        </div>
      )}

      {/* Title */}
      {video.title && index === active && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-black/40 backdrop-blur-md">
          <h3 className="text-white text-lg font-semibold">{video.title}</h3>
        </div>
      )}
    </motion.div>
  );
}

/* Reusable control buttons */
function ControlButton({ children, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="bg-white/15 hover:bg-white/30 p-3 rounded-full border border-white/20 text-white 
      backdrop-blur-md transition active:scale-90"
    >
      {children}
    </button>
  );
}
