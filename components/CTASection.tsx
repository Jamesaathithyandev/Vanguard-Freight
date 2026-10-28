'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail) {
      setInquirySubmitted(true);
      setContactEmail('');
      setTimeout(() => setInquirySubmitted(false), 6000);
    }
  };

  return (
    <section className="cta-banner-section">
      <div className="cta-container">
        <div className="cta-inner-card">
          {/* Subtle industrial grid line pattern behind */}
          <div className="cta-bg-glow" />

          <div className="cta-content">
            <div className="cta-pill">
              <span className="dot" />
              <span>CAPACITY ALLOCATION OPEN FOR Q1 / Q2</span>
            </div>

            <h2 className="cta-heading">
              READY TO PROTECT YOUR TIMELINE AND CUT FREIGHT COSTS?
            </h2>

            <p className="cta-description">
              Whether moving 50 containers a week or staging 100-car unit trains, our dedicated dispatch teams provide guaranteed rail slots, real-time GPS telemetry, and single-point accountability.
            </p>

            <div className="cta-actions-group">
              <Link href="/services" className="cta-btn-primary">
                <span>Explore Solutions & Tariffs</span>
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link href="/tracking" className="cta-btn-secondary">
                <span>Test Live Shipment Tracking</span>
              </Link>
            </div>

            <form className="cta-quick-inquiry-form" onSubmit={handleSubmit}>
              <div className="quick-inquiry-box">
                <span className="inquiry-prompt">Need dedicated trainset capacity?</span>
                <div className="inquiry-input-wrap">
                  <input
                    type="email"
                    placeholder="Enter corporate email for lane availability..."
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="inquiry-input"
                  />
                  <button type="submit" className="inquiry-btn">
                    Request Lane Brief
                  </button>
                </div>
              </div>
              {inquirySubmitted && (
                <p className="inquiry-success">
                  ✓ Dispatch team alerted. A regional account director will contact you within 2 business hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

