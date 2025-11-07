import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Header = ({ NAME_NICK }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Memories", href: "#memories" },
    { label: "Gallery", href: "#gallery" },
    { label: "Letter", href: "#letter" },
    { label: "Wishes", href: "#wishes" },
    { label: "Surprise", href: "#surprise" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    setMenuOpen(false);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ---- Top bar ---- */}
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between 
        bg-gradient-to-r from-fuchsia-600/80 to-pink-600/80 backdrop-blur-md
        border-b border-white/20 shadow-md rounded-b-xl">
        <a
          href="#top"
          onClick={(e) => handleScroll(e, "#top")}
          className="font-extrabold tracking-tight text-white text-lg"
        >
          🎉 {NAME_NICK} B'Day
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          {navItems.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(e) => handleScroll(e, n.href)}
              className="text-white/90 hover:text-white transition font-medium"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl text-white focus:outline-none active:scale-90 transition"
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* ---- Mobile Drawer ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="sm:hidden absolute w-full left-0 bg-gradient-to-b from-fuchsia-700/95 to-pink-600/95
              backdrop-blur-xl border-t border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-b-3xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-2">
              {navItems.map((n) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => handleScroll(e, n.href)}
                  whileTap={{ scale: 0.96 }}
                  className="py-3 rounded-xl text-base font-semibold text-white/90 text-center
                    bg-white/10 hover:bg-white/20 transition"
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
