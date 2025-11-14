import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2005",
    title: "குட்டி தேவதை",
    desc: "தவலும் நினைவுகள்",
    image: "./images/pic1.jpeg",
  },
  {
    year: "2023",
    title: "பள்ளி பருவம்",
    desc: "பள்ளி நினைவுகள்",
    image: "./images/pic2.jpeg",
  },
  {
    year: "2008",
    title: "உறவு",
    desc: "மலரும் நினைவுகள்",
    image: "./images/pic3.jpeg",
  },
  {
    year: "2022",
    title: "உயிர்",
    desc: "உயிரை எடுக்கும் உயிர்",
    image: "./images/pic4.jpeg",
  },
];

export default function MemoryTimeline() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center py-16 px-4 sm:px-6">
      
      {/* ✨ Center dots timeline line */}
      <div className="hidden sm:flex absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-white/15 rounded-full pointer-events-none" />

      <div className="relative max-w-5xl w-full space-y-20 sm:space-y-28">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10
            ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
          >
            {/* Timeline dot */}
            <motion.div
              className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="relative flex-shrink-0 w-full sm:w-1/2 rounded-3xl overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.45)] border border-white/10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 sm:h-72 object-cover"
              />

              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Text */}
            <div className="text-center sm:text-left max-w-sm sm:max-w-md">
              <motion.h3
                className="text-2xl sm:text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {item.year} — {item.title}
              </motion.h3>

              <motion.p
                className="text-white/80 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {item.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
