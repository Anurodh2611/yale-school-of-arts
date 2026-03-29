import React from 'react';

export default function About() {
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-12 mb-24 min-h-[60vh]">
      <div className="border-[8px] border-[var(--color-border)] bg-[var(--color-primary)] p-8 lg:p-16 brutal-shadow rotate-1 hover:rotate-0 transition-transform">
        <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 border-b-8 border-[var(--color-border)] pb-4 text-[var(--color-text-light)]">About the School</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-semibold text-xl lg:text-3xl leading-relaxed bg-[var(--color-surface)] border-4 border-[var(--color-border)] p-6 md:p-10 -rotate-2">
          <p>
            The Yale School of Art is a graduate school that grants MFA degrees in Graphic Design, Painting/Printmaking, Photography, and Sculpture.
          </p>
          <p className="border-t-4 lg:border-t-0 lg:border-l-4 border-[var(--color-border)] lg:pl-10 pt-4 lg:pt-0 text-[var(--color-primary)]">
            This wiki-style site functions as a community-driven information hub—constantly evolving and visually chaotic by design.
          </p>
        </div>
      </div>
    </div>
  );
}
