import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Header = ({ NAME_NICK }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Memories", href: "#memories" },
    { label: "Gallery", href: "#gallery" },
    { label: "Videos", href: "#videos" },
    { label: "Letter", href: "#letter" },
    { label: "Wishes", href: "#wishes" },
    { label: "Surprise", href: "#surprise" },
  ];

  // ✅ Smooth Scroll with Offset Fix
  const handleScroll = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    setMenuOpen(false);
    if (section) {
      const yOffset = -30; // Adjust based on header height (h-16 ≈ 64px)
      const y =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ---- Top Nav ---- */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between
        rounded-b-3xl border border-white/20 backdrop-blur-xl
        bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20
        shadow-[0_8px_25px_rgba(0,0,0,0.25)]"
      >
        {/* Logo / Title */}
        <a
          href="#top"
          onClick={(e) => handleScroll(e, "#top")}
          className="font-extrabold tracking-tight text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
            text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
        >
          𝐇𝐚𝐩𝐩𝐲 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {navItems.map((n) => (
            <motion.a
              key={n.label}
              href={n.href}
              onClick={(e) => handleScroll(e, n.href)}
              className="relative text-white/80 hover:text-white px-2 py-1 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {n.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100"
              />
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl 
         bg-white/5 border border-white/10 backdrop-blur-md
          active:scale-95 transition shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.28 }}
            className="text-xl text-white/90"
          >
            {menuOpen ? "✕" : "≡"}
          </motion.span>
        </button>
      </motion.div>

      {/* ---- Mobile Drawer ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="sm:hidden absolute top-16 left-0 w-full z-40
            bg-gradient-to-b from-pink-500/30 via-purple-500/20 to-blue-500/30
            backdrop-blur-2xl border-t border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            rounded-b-3xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-5 space-y-3">
              {navItems.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => handleScroll(e, n.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 rounded-xl text-base font-semibold text-white/90 text-center
                    bg-white/10 hover:bg-white/20 border border-white/10 shadow-md 
                    transition-all duration-300"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
