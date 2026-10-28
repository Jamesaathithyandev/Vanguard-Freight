'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Top Banner: Corporate Inquiries & Headquarters */}
      <div className="footer-dispatch-banner">
        <div className="footer-container dispatch-banner-inner">
          <div className="dispatch-live-tag">
            <span className="live-dot" />
            <span className="live-label">VANGUARD CORPORATE OPERATIONS</span>
          </div>
          <div className="dispatch-contacts">
            <span className="dispatch-item">
              <span className="item-label">Corporate Inquiries:</span>{' '}
              <strong className="item-val">+1 (800) 555-0190</strong>
            </span>
            <span className="dispatch-divider">/</span>
            <span className="dispatch-item">
              <span className="item-label">Headquarters:</span>{' '}
              <strong className="item-val">Chicago, Illinois</strong>
            </span>
            <span className="dispatch-divider">/</span>
            <span className="dispatch-item">
              <span className="item-label">Email:</span>{' '}
              <strong className="item-val">info@vanguardfreight.com</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="footer-container footer-main-grid">
        {/* Brand & Mission Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand-header">
            <div className="footer-brand-logo">
              <svg viewBox="0 0 24 24" fill="none" className="brand-svg" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15V8.5C4 7.12 5.12 6 6.5 6H17.5C18.88 6 20 7.12 20 8.5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 15H22V18C22 18.55 21.55 19 21 19H3C2.45 19 2 18.55 2 18V15Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                <circle cx="7" cy="15" r="1.5" fill="currentColor" />
                <circle cx="17" cy="15" r="1.5" fill="currentColor" />
                <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="22" x2="8" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="22" x2="16" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="footer-brand-title">VANGUARD FREIGHT</span>
            </div>
            <p className="footer-tagline">Logistics that works as hard as you do.</p>
          </div>
          <p className="footer-desc">
            A North American Class 1 common carrier providing enterprise intermodal double-stack rail, dedicated unit train movements, and cross-border logistics solutions.
          </p>

          <div className="footer-hub-chips">
            <span className="hub-chip">Chicago HQ</span>
            <span className="hub-chip">Los Angeles Basin</span>
            <span className="hub-chip">Houston Gulf</span>
            <span className="hub-chip">Rotterdam Intermodal</span>
          </div>
        </div>

        {/* Column 2: Freight Solutions */}
        <div className="footer-col">
          <h4 className="footer-heading">FREIGHT SOLUTIONS</h4>
          <ul className="footer-links">
            <li><Link href="/services#intermodal">Double-Stack Intermodal</Link></li>
            <li><Link href="/services#unit-trains">Dedicated Unit Trainsets</Link></li>
            <li><Link href="/services#reefer">Precision Cold-Chain Boxcars</Link></li>
            <li><Link href="/services#cross-border">Bonded Cross-Border Rail</Link></li>
            <li><Link href="/services#terminals">Intermodal Ramp Directory</Link></li>
            <li><Link href="/services#specs">Certified Rolling Stock</Link></li>
          </ul>
        </div>

        {/* Column 3: Company & Governance */}
        <div className="footer-col">
          <h4 className="footer-heading">COMPANY & GOVERNANCE</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Vanguard Freight</Link></li>
            <li><Link href="/about#leadership">Executive Leadership</Link></li>
            <li><Link href="/about#safety">FRA Safety Standards</Link></li>
            <li><Link href="/about#sustainability">Sustainability (ESG)</Link></li>
            <li><Link href="/#company-overview">Corporate Offices</Link></li>
            <li><Link href="/#company-overview">Contact Commercial Sales</Link></li>
          </ul>
        </div>

        {/* Column 4: Corporate Communications */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">CORPORATE BRIEFINGS</h4>
          <p className="newsletter-text">
            Subscribe to receive quarterly earnings, network corridor expansion updates, and official commercial bulletins.
          </p>
          <form className="footer-subscribe-form" onSubmit={handleSubscribe}>
            <div className="input-group">
              <input
                type="email"
                placeholder="executive@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-email-input"
              />
              <button type="submit" className="footer-submit-btn">
                <span>Subscribe</span>
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {subscribed && (
              <p className="subscribe-success-msg">
                ✓ You have successfully subscribed to Vanguard corporate announcements.
              </p>
            )}
          </form>

          <div className="accreditation-badges">
            <span className="badge-item" title="Association of American Railroads Compliant">AAR Class 1</span>
            <span className="badge-item" title="EPA SmartWay Transport Partner">SmartWay Partner</span>
            <span className="badge-item" title="ISO 9001 / ISO 14001 Quality Certified">ISO 9001 Certified</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal & Attribution */}
      <div className="footer-bottom-bar">
        <div className="footer-container bottom-bar-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} Vanguard Freight Systems, Inc. All rights reserved. Operating under STB common carrier tariffs.
          </p>
          <div className="legal-links">
            <a href="#terms">Terms of Carriage</a>
            <span className="sep">•</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="sep">•</span>
            <a href="#tariffs">Public Tariffs (AAR-600)</a>
            <span className="sep">•</span>
            <a href="#safety">FRA Safety Reporting</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
