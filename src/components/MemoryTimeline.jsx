import React from "react";
import { motion } from "framer-motion";

const MEMORIES = [
  {
    year: "Baby Days",
    caption: "The sweetest first smile.",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "First Birthday",
    caption: "Cake, candles and cheeky giggles!",
    img: "https://images.unsplash.com/photo-1548372291-cc63c93c16b8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "School Start",
    caption: "Brave steps, bright eyes.",
    img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "Family Trips",
    caption: "Mountains, beaches and a million laughs.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
  },
];

const MemoryTimeline = () => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 -ml-[1px] h-full w-[2px] bg-white/10 hidden md:block" />

      <div className="flex flex-col gap-10 sm:gap-16">
        {MEMORIES.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col md:grid md:grid-cols-2 md:gap-10 items-center ${
              idx % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
            }`}
          >
            <div className="w-full">
              <motion.img
                src={m.img}
                alt={m.caption}
                className="w-full h-52 sm:h-64 md:h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="text-center md:text-left mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs sm:text-sm mb-3">
                <span>📍</span> <span>{m.year}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">{m.caption}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryTimeline;
