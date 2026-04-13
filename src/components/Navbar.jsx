import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

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
          <div className="flex space-x-2 md:space-x-6 mt-4 md:mt-0 font-bold text-lg md:text-2xl uppercase items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 border-4 border-[var(--color-border)] bg-[var(--color-surface)] brutal-shadow-hover no-underline text-[var(--color-text-primary)] transform hover:bg-[var(--color-primary)] hover:text-[var(--color-text-light)]"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="relative ml-4">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-12 h-12 border-4 border-[var(--color-border)] bg-[var(--color-surface)] brutal-shadow-hover flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer"
                title="Account"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-surface)] border-4 border-[var(--color-border)] brutal-shadow flex flex-col z-[100] text-lg">
                  {!isLoggedIn ? (
                    <>
                      <Link 
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-3 border-b-4 border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white transition-colors no-underline text-[var(--color-text-primary)] block"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-3 hover:bg-[var(--color-primary)] hover:text-white transition-colors no-underline text-[var(--color-text-primary)] block"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-3 text-left hover:bg-black hover:text-white transition-colors font-bold uppercase w-full block cursor-pointer"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
