import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEOS = [
  { src: "./videos/vid1.mp4", title: "", desc: "" },
  { src: "./videos/vid2.mp4", title: "", desc: "" },
];

export default function VideoSection() {
  return (
    <section
      id="videos"
      className="relative z-10 py-16 sm:py-24 flex flex-col items-center justify-center
      bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-blue-900/20 backdrop-blur-xl"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text 
      bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-12 text-center">
        தோழர்கள்
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl w-full px-6">
        {VIDEOS.map((video, i) => (
          <GlassyVideoCard key={i} video={video} />
        ))}
      </div>
    </section>
  );
}

// 🔥 Single video card component
function GlassyVideoCard({ video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto pause when video is outside viewport
  useEffect(() => {
    const handler = () => {
      const rect = videoRef.current.getBoundingClientRect();
      const visible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!visible && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isPlaying]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) vid.pause();
    else vid.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    vid.muted = !vid.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative group rounded-3xl overflow-hidden
      border border-white/10 bg-white/5 backdrop-blur-xl
      shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_55px_rgba(0,0,0,0.5)]
      transition-all duration-500"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]
        object-cover cursor-pointer transition-all duration-400"
        onClick={togglePlay}
      />

      {/* Dark overlay fade when paused */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isPlaying ? "opacity-30" : "opacity-60"
        } bg-gradient-to-t from-black via-black/40 to-transparent`}
      />

      {/* Controls */}
      <div className="absolute top-3 right-3 flex gap-3">
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </ControlButton>
        <ControlButton onClick={toggleMute}>
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </ControlButton>
      </div>

      {/* Title + Desc */}
      {(video.title || video.desc) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-semibold">{video.title}</h3>
          <p className="text-white/70 text-sm sm:text-base mt-1">{video.desc}</p>
        </div>
      )}
    </div>
  );
}

// 🔥 Stylish control button component
function ControlButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/15 hover:bg-white/25 active:scale-95
      backdrop-blur-md p-3 rounded-full border border-white/20
      text-white transition flex items-center justify-center"
    >
      {children}
    </button>
  );
}
