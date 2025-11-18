import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Section from "./components/Section";
import MemoryTimeline from "./components/MemoryTimeline";
import Gallery from "./components/Gallery";
import VideoSection from "./components/VideoSection";
import Wishes from "./components/Wishes";
import Typewriter from "./components/Typewriter";
import Balloons from "./components/Balloons";
import MusicPlayer from "./components/MusicPlayer";
import SurpriseVideoSlider_Fullscreen from "./components/SurpriseVideoSlider_Fullscreen";

const SITE_TITLE = "𝐇𝐚𝐩𝐩𝐲 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲, KABI ";
const NAME_NICK = "🇰 🇦 🇧 🇮 🇳 🇮 ";
const BIRTHDAY_DATE = "19 Nov 2025";

const LETTER_TEXT = `
 Happy birthday my dear enemy Kabi 💫💖

Enna solladrathu, nee en life la vandha moment la irundhu dhan, enakku tholla aarambichuthu 💕.
Unna paatha time la stress ellam adhigam aagidum, un smile ah paatha enakku erichal ah irukum 
Un voice, un teasing, un mokkai — ellam mix aagumbothu erichal pala madangu athigam aagidum.

Unna vida periya tholla vera edhum illa for me  — coz nee en thangachi illa, nee oru pisasu mathiri ❤️.
Ipa pola epayum sanda potutey irupom happy ah..

Anyway God bless you with all happiness, success, and peace 💫
And remember one thing —
“Un anna always behind you… no matter what happens!” 🤝❤️

Enjoy your day  Kabi 🎂🎉
Love you lot's my kutty "PISASU" 👑💖

– With lots of love,
Your Enemy 💝
`;

export default function App() {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  window.onresize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return (
    <div className="min-h-screen text-white">
      {/* 🎈 Floating Balloons */}
      <Balloons />

      {/* 🔝 Navigation */}
      <Header NAME_NICK={NAME_NICK} />

      {/* 🏠 Main Sections */}
      <main id="top">
        {/* Hero Section */}
        <Hero title={SITE_TITLE} date={BIRTHDAY_DATE} nick={NAME_NICK} />

        {/* Timeline */}
        <Section
          id="memories"
          title="Let's Begin"
          subtitle="வாழ்க வாழமுடன்"
        >
          <MemoryTimeline />
        </Section>

        {/* Gallery */}
        <Section
          id="gallery"
          title="Gallery"
          subtitle="நினைவுகள்"
        >
          <Gallery />
        </Section>

        <section id="videos" className="mt-20">
          <VideoSection />
        </section>


        {/* Heartfelt Letter */}
        <Section
          id="letter"
          title={`A Letter to ${NAME_NICK}`}
          subtitle="இதயத்திலிருந்து எழுதிய வார்த்தைகள்…"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 md:p-8 shadow">
            <Typewriter text={LETTER_TEXT} speed={18} />
          </div>
        </Section>

        {/* Family Wishes */}
        <Section
          id="wishes"
          title={"வாழ்த்துக்கள்"}
        >
          <Wishes />
        </Section>

        {/* 🎁 Surprise Section */}
        <Section
          id="surprise"
          title="One Last Surprise"
          subtitle="ஏதோ என்னால் முடிந்தது 😁"
        >
          <div className="flex flex-col items-center text-center">
            <motion.button
              onClick={() => setSliderOpen(true)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              className="relative group px-10 py-3 font-bold text-lg tracking-wide
  text-white rounded-2xl overflow-hidden
  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
  shadow-[0_0_20px_rgba(255,255,255,0.25)] transition"
            >
              {/* ✨ Glow border on hover */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
  bg-gradient-to-r from-white/40 via-transparent to-white/40 blur-xl transition duration-500"></span>

              {/* 🔥 Shiny swipe reflection */}
              <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%]
  bg-gradient-to-r from-transparent via-white/60 to-transparent
  skew-x-12 transition duration-700"></span>

              🎁 Open Surprise
            </motion.button>

          </div>

          {/* Fullscreen Video Slider */}
          <SurpriseVideoSlider_Fullscreen
            open={sliderOpen}
            onClose={() => setSliderOpen(false)}
          />
        </Section>
      </main>

      {/* 🎵 Background Music Player (optional) */}
      <MusicPlayer src="" />

      {/* 🎊 Confetti after surprise */}
      {sliderOpen && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={width < 640 ? 100 : 300}
          recycle={false}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 text-center py-6 text-white/80 text-sm">
        Made with ❤ for {NAME_NICK}. © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
