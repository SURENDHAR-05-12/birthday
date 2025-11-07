import { motion } from "framer-motion";

const WISHES = [
  { from: "Amma", message: "Happy birthday, kanna! You make every day brighter. Proud of you always!", video: "" },
  { from: "Appa", message: "Keep smiling and keep shining. Love you, superstar!", video: "" },
  { from: "Chithi", message: "Our little angel, wishing you a year full of fun and magic!", video: "" },
];

export default function Wishes() {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {WISHES.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 sm:p-5 shadow"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg font-bold">{w.from}</span>
            <span className="text-sm text-white/70">❤️</span>
          </div>
          <p className="text-white/90 text-sm sm:text-base mb-3 leading-relaxed">{w.message}</p>
          {w.video ? (
            <video src={w.video} controls className="w-full rounded-xl border border-white/10 mt-2" />
          ) : (
            <div className="rounded-xl border border-white/10 p-3 text-xs sm:text-sm text-white/70 text-center">
              (Add a video link in WISHES to show here)
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
