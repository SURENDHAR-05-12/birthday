import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Balloons() {
  const balloonCount = typeof window !== "undefined" && window.innerWidth < 640 ? 6 : 12;

  // 🎨 Random colors for balloons
  const colors = ["#ff80b5", "#8b5cf6", "#3b82f6", "#f59e0b", "#22d3ee", "#ec4899"];

  // 🪩 Memoize random properties so balloons stay consistent on re-renders
  const balloons = useMemo(() => {
    return Array.from({ length: balloonCount }).map(() => ({
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 25, // 25px - 55px
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 10,
      xDrift: Math.random() * 40 - 20, // side motion
      emoji: ["🎈", "🎉", "💖"][Math.floor(Math.random() * 3)],
    }));
  }, [balloonCount]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[50]">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: 0, opacity: 0 }}
          animate={{
            y: ["100vh", "-150px"],
            x: [0, b.xDrift, -b.xDrift / 2],
            opacity: [0, 1, 1, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: b.left,
            fontSize: `${b.size}px`,
            color: b.color,
            textShadow: `0 0 10px ${b.color}55, 0 0 20px ${b.color}66`,
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
          }}
          className="absolute"
        >
          {b.emoji}
        </motion.div>
      ))}
    </div>
  );
}
