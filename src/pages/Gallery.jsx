import React from 'react';
import Card from '../components/Card';

export default function Gallery() {
  return (
    <div className="w-full flex-1">
      <div className="bg-[var(--color-primary)] text-[var(--color-secondary)] p-8 md:p-16 border-b-[8px] border-[var(--color-secondary)]">
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-widest text-center mix-blend-difference mb-4">Gallery</h1>
        <p className="text-center text-xl md:text-3xl font-bold font-mono text-[var(--color-text-light)]">Selected Works - 2026 Archive</p>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 mt-12 mb-24 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <Card badgeText="Mixed Media" backgroundColor="bg-[var(--color-primary)]" className="break-inside-avoid shadow-[16px_16px_0_0_var(--color-border)]">
          <div className="bg-[var(--color-surface)] border-4 border-[var(--color-border)] w-full h-80 flex items-center justify-center font-black text-4xl text-[var(--color-primary)] uppercase">Artwork A</div>
        </Card>
        
        <Card badgeText="Photography" backgroundColor="bg-[var(--color-surface)]" className="break-inside-avoid -rotate-1 shadow-[8px_8px_0_0_var(--color-border)]">
          <div className="bg-[#ccc] border-4 border-[var(--color-border)] w-full h-[450px] flex justify-center items-center italic font-serif text-3xl">Portrait Series</div>
        </Card>

        <Card badgeText="Graphic Design" backgroundColor="bg-[var(--color-background)]" className="break-inside-avoid rotate-2 shadow-[12px_12px_0_0_var(--color-border)]">
          <div className="bg-[var(--color-primary)] text-[var(--color-text-light)] border-4 border-[var(--color-surface)] w-full h-[250px] flex items-center justify-center font-mono">Typography Poster</div>
        </Card>
        
        <Card badgeText="Sculpture" backgroundColor="bg-[var(--color-secondary)]" className="break-inside-avoid text-[var(--color-text-light)] shadow-[10px_10px_0_0_var(--color-border)]">
           <div className="bg-transparent border-4 border-[var(--color-surface)] w-full h-96 flex justify-center items-center text-5xl font-black uppercase text-center p-4">Installation 04</div>
        </Card>

      </div>
    </div>
  );
}
