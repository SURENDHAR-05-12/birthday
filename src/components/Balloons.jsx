import { motion } from "framer-motion";

export default function Balloons() {
  const balloonCount = window.innerWidth < 640 ? 6 : 12;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: balloonCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: [-20, -window.innerHeight - Math.random() * 300],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
          className="absolute text-3xl sm:text-4xl"
          style={{ left: `${Math.random() * 100}%` }}
        >
          🎈
        </motion.div>
      ))}
    </div>
  );
}
