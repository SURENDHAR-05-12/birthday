import React, { useRef, useState, useEffect } from "react";

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
    <div className="fixed right-3 bottom-3 z-50 sm:right-4 sm:bottom-4">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="bg-white text-black font-semibold rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-md active:scale-95 transition"
      >
        {playing ? "⏸️ Pause" : "▶️ Play"}
      </button>
      <audio ref={audioRef} src={src} loop preload="auto" />
    </div>
  );
}
