import React from "react";

const Section = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-center sm:text-left">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/80 mb-6 sm:mb-10 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
