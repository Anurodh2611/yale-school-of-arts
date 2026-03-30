import { Link } from 'react-router-dom';

export default function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="border-b-[6px] border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 z-50 brutal-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center flex-wrap">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl md:text-5xl font-black uppercase tracking-tighter hover:text-[var(--color-primary)] transition-colors no-underline">
              Yale School <br className="hidden md:block"/> of Art
            </Link>
          </div>
          <div className="flex space-x-2 md:space-x-6 mt-4 md:mt-0 font-bold text-lg md:text-2xl uppercase">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 border-4 border-[var(--color-border)] bg-[var(--color-surface)] brutal-shadow-hover no-underline text-[var(--color-text-primary)] transform hover:bg-[var(--color-primary)] hover:text-[var(--color-text-light)]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
