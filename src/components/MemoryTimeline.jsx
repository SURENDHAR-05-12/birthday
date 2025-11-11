import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2005",
    title: "குட்டி தேவதை",
    desc: "தவலும் நினைவுகள்",
    image: "./images/pic1.jpeg",
  },
  {
    year: "2020",
    title: "Little Explorer",
    desc: "Curious eyes, tiny steps — every day a new adventure began.",
    image: "https://images.unsplash.com/photo-1608889175212-3b45c09a0a7f?q=80&w=800&auto=format",
  },
  {
    year: "2023",
    title: "Bright Star",
    desc: "Your smile shines brighter than any star in the sky.",
    image: "https://images.unsplash.com/photo-1531642764202-d17f08e37d90?q=80&w=800&auto=format",
  },
  {
    year: "2025",
    title: "The Celebration",
    desc: "A special year, filled with joy, laughter, and love from everyone.",
    image: "https://images.unsplash.com/photo-1519744346369-3f63a417c5d0?q=80&w=800&auto=format",
  },
];

export default function MemoryTimeline() {
  return (
    <div
      className="relative z-10 min-h-[70vh] sm:min-h-[80vh] w-full 
      overflow-visible flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-500/10 to-blue-500/10 
      backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.25)]" />

      <div className="relative w-full max-w-5xl px-4 py-12 sm:py-20">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-16 sm:mb-24 
              ${i % 2 === 0 ? "sm:flex-row-reverse" : ""} 
              transform-gpu will-change-transform`}
          >
            {/* Image */}
            <div className="relative flex-shrink-0 w-full sm:w-1/2">
              <div
                className="overflow-hidden rounded-2xl shadow-xl border border-white/10 
                bg-white/5 backdrop-blur-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 sm:h-72 object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center sm:text-left max-w-sm sm:max-w-md"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                {item.year} — {item.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 🎈 Decorative vertical line for timeline */}
       <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-30 pointer-events-none"></div>
    </div>
  );
}
