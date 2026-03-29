import React from 'react';

export default function Events() {
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-12 min-h-[60vh]">
      <h1 className="text-7xl md:text-9xl font-black border-4 border-[var(--color-border)] border-dashed bg-[var(--color-background)] inline-block px-8 py-2 mb-12 transform -translate-x-4 shadow-[10px_10px_0_0_var(--color-border)]">EVENTS</h1>
      
      <div className="flex flex-col gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col md:flex-row border-[6px] border-[var(--color-border)] brutal-shadow-hover bg-[var(--color-surface)] hover:bg-[var(--color-accent)] transition-all">
            <div className="bg-[var(--color-primary)] text-[var(--color-text-light)] p-6 md:w-48 flex justify-center items-center flex-col uppercase font-black">
              <span className="text-xl">MAR</span>
              <span className="text-5xl">{12 + item}</span>
            </div>
            <div className="p-6 md:p-10 flex-1">
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-[var(--color-primary)]">Visiting Artist Lecture Series</h2>
              <p className="text-xl font-bold font-mono">Room 201 // 6:30 PM - 8:00 PM</p>
              <p className="mt-4 text-lg border-t-4 border-[var(--color-border)] pt-4">An evening discussing radical brutalism in modern web structures and user interactivity patterns.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
