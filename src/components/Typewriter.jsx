import React, { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 25 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <pre className="whitespace-pre-wrap text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
      {display}
    </pre>
  );
}
