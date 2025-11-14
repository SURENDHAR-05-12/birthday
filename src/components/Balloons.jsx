import { motion } from "framer-motion";
import { useMemo } from "react";

export default function CelebrationShimmer() {
  const shimmerCount = typeof window !== "undefined" && window.innerWidth < 640 ? 15 : 30;

  const particles = useMemo(() => {
    return Array.from({ length: shimmerCount }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 3, // 3px - 9px dots
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      color: Math.random() > 0.5 ? "#FFD700" : "#C0C0C0", // gold / silver
      xDrift: Math.random() * 50 - 25,
    }));
  }, [shimmerCount]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[40]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: ["110vh", "-10vh"],
            x: [0, p.xDrift, -p.xDrift],
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: "50%",
            boxShadow: `0 0 12px ${p.color}, 0 0 20px ${p.color}88`,
          }}
          className="absolute"
        />
      ))}
    </div>
  );
}
