'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Overview', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <div className="floating-navbar-wrapper">
      <header className={`floating-dock ${isScrolled ? 'dock-scrolled' : ''}`}>
        {/* Brand Anchor */}
        <Link href="/" className="dock-brand" title="Vanguard Freight Systems">
          <div className="dock-logo-box">
            <svg viewBox="0 0 24 24" fill="none" className="dock-logo-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 14V8.5C4 7.12 5.12 6 6.5 6H17.5C18.88 6 20 7.12 20 8.5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 14H22V17.5C22 18.05 21.55 18.5 21 18.5H3C2.45 18.5 2 18.05 2 17.5V14Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
              <circle cx="7" cy="14" r="1.3" fill="currentColor" />
              <circle cx="17" cy="14" r="1.3" fill="currentColor" />
              <line x1="8" y1="9.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="dock-brand-text">VANGUARD</span>
        </Link>

        {/* Separator */}
        <span className="dock-divider" />

        {/* Desktop Nav Links */}
        <nav className="dock-nav-items">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`dock-link ${isActive ? 'active' : ''}`}
              >
                <span>{link.label}</span>
                {isActive && <span className="active-pill-glow" />}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`dock-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="bar" />
          <span className="bar" />
        </button>
      </header>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="dock-mobile-drawer">
          <nav className="mobile-drawer-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`drawer-link ${pathname === link.href ? 'active' : ''}`}
              >
                <span>{link.label}</span>
                <span className="drawer-arrow">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
