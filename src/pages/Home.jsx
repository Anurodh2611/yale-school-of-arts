import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="w-full flex-1">
      {/* Hero Section */}
      <section className="relative w-full border-b-[8px] border-[var(--color-border)] bg-[var(--color-secondary)] overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">

          <div className="lg:col-span-8 p-6 md:p-16 flex flex-col justify-center border-b-[8px] lg:border-b-0 lg:border-r-[8px] border-[var(--color-border)] bg-[var(--color-primary)] brutal-bg">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-[var(--color-text-light)] hover:rotate-1 transition-transform cursor-crosshair">
              Yale<br />
              School<br />
              of Art
            </h1>
            <p className="mt-8 text-2xl md:text-4xl font-bold bg-[var(--color-surface)] text-[var(--color-text-primary)] self-start px-2 py-1 border-4 border-[var(--color-border)] inline-block -rotate-2 hover:rotate-0 transition-all brutal-shadow">
              Current Students, Faculty, and Staff
            </p>
          </div>

          <div className="lg:col-span-4 p-8 bg-[var(--color-background)] grid content-between space-y-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold uppercase break-words border-b-8 border-[var(--color-border)] pb-4 text-[var(--color-primary)]">
              Welcome to the Wiki
            </h2>
            <div className="text-xl font-bold p-4 bg-[var(--color-surface)] border-4 border-[var(--color-border)] brutal-shadow-hover translate-x-4 lg:-translate-x-12 mt-4 hover:translate-x-0 cursor-pointer">
              <marquee scrollamount="12" className="py-2">
                ATTENTION: 2026 FALL EXHIBITION DEADLINE IS APPROACHING /// ENROLL NOW /// STUDIO TOURS OPEN TO PUBLIC
              </marquee>
            </div>
            <Link
              to="/contact"
              className="text-2xl font-black uppercase px-6 py-4 bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] border-[6px] border-[var(--color-border)] transition-colors w-full brutal-hover text-center block"
            >
              Apply Now ⇾
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="max-w-7xl mx-auto p-4 md:p-8 mt-12 mb-24">
        <h2 className="text-5xl md:text-8xl font-black uppercase mb-16 text-center border-y-[6px] border-dashed border-[var(--color-border)] py-4 bg-[var(--color-accent)] -rotate-1 brutal-shadow">
          Experimental Block List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

          {/* Card 1 */}
          <Card
            badgeText="Notice"
            title="Open Studios"
            description="Visiting hours are 10am-6pm. Please do not touch the wet paint."
            backgroundColor="bg-[var(--color-background)]"
            className="md:-rotate-2 rotate-1"
          >
            <a href="#" className="font-bold border-b-4 border-[var(--color-border)] py-1 uppercase text-sm mt-4 hover:bg-[var(--color-primary)] hover:text-[var(--color-text-light)] px-2">RSVP Here</a>
          </Card>

          {/* Card 2 */}
          <Card
            badgeText="Faculty"
            title="Design Ethics"
            description="A mandatory symposium for all MFA candidates."
            backgroundColor="bg-[var(--color-surface)]"
            className="translate-y-4 hover:-translate-y-4"
          >
            <div className="bg-[var(--color-secondary)] text-[var(--color-text-light)] font-black p-2 uppercase border-2 border-[var(--color-border)] text-center text-sm">
              Today @ 3PM
            </div>
          </Card>

          {/* Card 3 - Spanning columns if needed or just irregular */}
          <Card
            badgeText="System"
            title="Wiki Edit Access"
            description="All students must request edit access from administration before contributing to courses."
            backgroundColor="bg-[var(--color-primary)]"
            className="md:col-span-2 lg:col-span-1 border-dashed scale-105"
          >
            <p className="font-mono bg-[var(--color-primary)] text-green-400 p-2 text-xs">sudo chmod 777 /wiki/pages</p>
          </Card>

        </div>
      </section>
    </div>
  );
}
