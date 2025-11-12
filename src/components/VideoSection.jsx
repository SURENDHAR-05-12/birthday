import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEOS = [
  {
    src: "./videos/vid1.mp4",
    title: "",
    desc: "",
  },
  {
    src: "./videos/vid2.mp4",
    title: "",
    desc: "",
  },
];

export default function VideoSection() {
  return (
    <div className="relative z-10 py-16 sm:py-24 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-blue-900/20 backdrop-blur-xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-12 text-center">
        தோழர்கள்
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full px-6">
        {VIDEOS.map((video, i) => (
          <GlassyVideoCard key={i} video={video} />
        ))}
      </div>
    </div>
  );
}

function GlassyVideoCard({ video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isPlaying) {
      vid.pause();
    } else {
      vid.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = !vid.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] 
      bg-white/5 backdrop-blur-lg transition-transform duration-500 hover:scale-[1.03]"
    >
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        className="w-full h-64 sm:h-72 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

      {/* 🎮 Controls */}
      <div className="absolute top-3 right-3 flex gap-3">
        <button
          onClick={togglePlay}
          className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          {isPlaying ? <Pause size={20} color="white" /> : <Play size={20} color="white" />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
        </button>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center text-white">
        <h3 className="text-xl sm:text-2xl font-semibold">{video.title}</h3>
        <p className="text-white/70 text-sm sm:text-base mt-1">{video.desc}</p>
      </div>
    </div>
  );
}
