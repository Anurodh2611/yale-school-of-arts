import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t-[8px] border-[var(--color-border)] bg-[var(--color-secondary)] text-[var(--color-text-light)] p-8 md:p-16 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 mix-blend-difference hover:rotate-2 transition-transform cursor-pointer">Yale School <br/> of Art</h2>
          <p className="font-mono bg-[var(--color-primary)] inline-block p-2 border-2 border-[var(--color-surface)] font-bold text-lg">1156 Chapel Street, POB 208339</p>
          <br/>
          <p className="font-mono bg-[var(--color-primary)] inline-block p-2 border-2 border-[var(--color-surface)] font-bold text-lg mt-2">New Haven, Connecticut, 06520-8339</p>
        </div>
        <div className="flex flex-col items-start md:items-end justify-center">
          <marquee scrollamount="15" className="text-2xl md:text-4xl font-black text-[var(--color-text-light)] bg-[var(--color-primary)] border-4 border-[var(--color-accent)] p-4 uppercase rotate-1">
             Support the School /// Become a Patron /// Join the Archive /// 
          </marquee>
        </div>
      </div>
    </footer>
  );
}
