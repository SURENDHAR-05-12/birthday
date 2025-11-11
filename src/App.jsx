import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Section from "./components/Section";
import MemoryTimeline from "./components/MemoryTimeline";
import Gallery from "./components/Gallery";
import Wishes from "./components/Wishes";
import Typewriter from "./components/Typewriter";
import Balloons from "./components/Balloons";
import MusicPlayer from "./components/MusicPlayer";
import SurpriseVideoSlider_Fullscreen from "./components/SurpriseVideoSlider_Fullscreen";

const SITE_TITLE = "Happy Birthday, KABI! 🎂";
const NAME_NICK = "KABINI";
const BIRTHDAY_DATE = "19 Nov 2025";

const LETTER_TEXT = `
 Happy birthday my sweetest thangachi Kabi 💫💖

Enna solla da, nee en life la vandha moment la irundhu dhan, house la oru special vibe varudhu 💕.
Morning la nee pesum first word kooda day ah change pannidum 😌.
Unna paatha time la stress ellam poidum, un smile la enakku peace iruku da ❤️.

Kabi… nee siricha world ah stop pannura alavuku cute ah iruka 😄.
Un voice, un teasing, un mokkai, un love — ellam mix aagumbothu en life la oru color add panniduchu 🌈.
Sometimes fight pannuvom, sometimes silent irupom… but end la anna oda heart la nee dhan favourite person 💕.

Unna vida special edhum illa for me da — coz nee en thangachi illa, nee oru heartbeat mathiri ❤️.
Na unna paatha proud aaguren da Kabi — nee epdi irundha kuda, real ah, kind ah iruka 😇.
I just want you to chase your dreams boldly, and never lose that beautiful smile 😍.

God bless you with all happiness, success, and peace 💫
And remember one thing —
“Un anna always behind you… no matter what happens!” 🤝❤️

Enjoy your day da Kabi 🎂🎉
Un smile ah kuda cake la ice cream la mix panna kooda indha sweetness varadhu 😋
Love you loads my kutty queen 👑💖

– With lots of love,
Your Anna 💝
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
          title="The Journey"
          subtitle="From tiny giggles to big dreams – a timeline of love."
        >
          <MemoryTimeline />
        </Section>

        {/* Gallery */}
        <Section
          id="gallery"
          title="Photo Gallery"
          subtitle="A few of our favourite frames."
        >
          <Gallery />
        </Section>

        {/* Heartfelt Letter */}
        <Section
          id="letter"
          title={`A Letter to ${NAME_NICK}`}
          subtitle="Typed from the heart…"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 md:p-8 shadow">
            <Typewriter text={LETTER_TEXT} speed={18} />
          </div>
        </Section>

        {/* Family Wishes */}
        <Section
          id="wishes"
          title="With Love, From Family & Friends"
          subtitle="Tap to play videos if added."
        >
          <Wishes />
        </Section>

        {/* 🎁 Surprise Section */}
        <Section
          id="surprise"
          title="One Last Surprise"
          subtitle="Click the button when you're ready!"
        >
          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => setSliderOpen(true)}
              className="rounded-2xl bg-white text-black px-6 py-3 w-full sm:w-auto font-bold shadow hover:shadow-lg transition"
            >
              🎁 Open Surprise
            </button>
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
