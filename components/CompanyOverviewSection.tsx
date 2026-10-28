'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function CompanyOverviewSection() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activeSector, setActiveSector] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryEmail && inquiryName) {
      setInquirySubmitted(true);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryCompany('');
      setInquiryMessage('');
      setTimeout(() => setInquirySubmitted(false), 6000);
    }
  };

  const industries = [
    {
      title: 'Consumer Goods & Retail',
      desc: 'Scheduled intermodal double-stack capacity connecting deep-water coastal ports directly to major consumer population centers, minimizing dwell times and stabilizing inventory flow.',
      stat: '500K+ Annual TEUs',
      highlight: 'Direct On-Dock Rail Access',
    },
    {
      title: 'Heavy Industry & Automotive',
      desc: 'Custom multi-car trainsets engineered for steel coils, industrial machinery, and bi-level auto racks, providing reliable production-line replenishment for assembly plants.',
      stat: '99.4% On-Time Delivery',
      highlight: 'Dedicated Plant Switching',
    },
    {
      title: 'Agriculture & Food Logistics',
      desc: 'Insulated and refrigerated boxcars maintaining precise climate regulation for perishables, dairy, and bulk agricultural commodities across interstate borders.',
      stat: 'FSMA & FDA Compliant',
      highlight: 'Continuous Cryo-Telemetry',
    },
    {
      title: 'Chemical & Mineral Bulk',
      desc: 'Rigorous safety standards and specialized rolling stock operating under federal hazardous materials carriage regulations with dedicated emergency response protocols.',
      stat: 'Responsible Care Certified',
      highlight: '100% PTC Monitored Mainlines',
    },
  ];

  return (
    <section className="company-overview-section" id="company-overview">
      <div className="overview-container">
        {/* Section Header with Staggered Blur Reveal */}
        <ScrollReveal direction="down" duration={900}>
          <div className="overview-header-block">
            <div className="overview-badge">
              <span className="badge-glow-dot" />
              <span>ABOUT VANGUARD FREIGHT SYSTEMS</span>
            </div>
            <h2 className="overview-title">
              THE ARCHITECTURE OF MODERN RAIL COMMERCE
            </h2>
            <p className="overview-lead">
              Headquartered in Chicago with interchange hubs at key North American gateways, Vanguard Freight Systems operates as an independent Class 1 rail logistics provider. We combine dedicated heavy-haul trackage with single-point management to deliver dependability that high-volume businesses can build on.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Corporate Scale Metrics with Live Counting Animations */}
        <div className="scale-metrics-grid">
          <ScrollReveal delay={100} direction="up">
            <div className="scale-metric-card group-hover-shine">
              <div className="card-ambient-glow" />
              <div className="scale-number">
                <AnimatedCounter end={14200} suffix="+" duration={2200} />
              </div>
              <strong className="scale-label">Freight Cars in Service</strong>
              <p className="scale-desc">Double-stack well cars, insulated boxcars, and specialized heavy bulk units.</p>
              <div className="scale-card-accent-bar" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="up">
            <div className="scale-metric-card group-hover-shine">
              <div className="card-ambient-glow" />
              <div className="scale-number">
                <AnimatedCounter end={42} duration={1800} />
              </div>
              <strong className="scale-label">Terminal Interchange Hubs</strong>
              <p className="scale-desc">Strategic connections linking coastal container ports to inland distribution clusters.</p>
              <div className="scale-card-accent-bar" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} direction="up">
            <div className="scale-metric-card group-hover-shine">
              <div className="card-ambient-glow" />
              <div className="scale-number">
                <AnimatedCounter end={75} suffix="%" duration={2000} />
              </div>
              <strong className="scale-label">Lower Carbon Footprint</strong>
              <p className="scale-desc">Moving freight by rail produces up to 75% fewer greenhouse gas emissions than highway trucks.</p>
              <div className="scale-card-accent-bar" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="up">
            <div className="scale-metric-card group-hover-shine">
              <div className="card-ambient-glow" />
              <div className="scale-number">
                <AnimatedCounter end={99.4} suffix="%" decimals={1} duration={2400} />
              </div>
              <strong className="scale-label">Mainline Schedule Adherence</strong>
              <p className="scale-desc">Guaranteed trainset departures backed by dedicated account management teams.</p>
              <div className="scale-card-accent-bar" />
            </div>
          </ScrollReveal>
        </div>

        {/* Industries Served Section with Interactive Cards */}
        <div className="industries-section">
          <ScrollReveal>
            <div className="industries-header">
              <span className="sub-title">CORE SECTORS</span>
              <h3 className="section-h3">INDUSTRIES POWERED BY OUR RAIL NETWORK</h3>
              <p className="section-p">
                From global retail supply chains to foundational heavy industries, our rail infrastructure provides the backbone for North American enterprise commerce.
              </p>
            </div>
          </ScrollReveal>

          <div className="industries-grid">
            {industries.map((ind, i) => (
              <ScrollReveal key={i} delay={i * 120} direction="up">
                <div
                  className={`industry-card ${activeSector === i ? 'sector-highlighted' : ''}`}
                  onMouseEnter={() => setActiveSector(i)}
                >
                  <div className="industry-top-line" />
                  <div className="industry-top">
                    <h4 className="industry-name">{ind.title}</h4>
                    <span className="industry-stat">{ind.stat}</span>
                  </div>
                  <p className="industry-desc">{ind.desc}</p>
                  <div className="industry-feature-tag">
                    <span className="tag-dot">✓</span>
                    <span>{ind.highlight}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Environmental & Corporate Governance (ESG) Block with Parallax Photo Zoom */}
        <ScrollReveal delay={150} direction="up">
          <div className="esg-banner-card">
            <div className="esg-bg-photo-wrapper">
              <Image
                src="/images/locomotive_steel.jpg"
                alt="Locomotive steel track detail"
                fill
                className="esg-bg-photo animated-kenburns"
              />
              <div className="esg-bg-overlay" />
            </div>

            <div className="esg-content">
              <div className="esg-tag-row">
                <span className="esg-pulse-beacon" />
                <span className="esg-tag">SUSTAINABLE LOGISTICS</span>
              </div>
              <h3 className="esg-heading">DECARBONIZING CONTINENTAL FREIGHT</h3>
              <p className="esg-text">
                On average, Vanguard trains can move one ton of freight over 490 miles on a single gallon of fuel. By partnering with us, corporate shippers significantly reduce their Scope 3 greenhouse gas emissions while insulating their supply chains from recurring highway fuel volatility.
              </p>
              <div className="esg-action">
                <Link href="/about#sustainability" className="btn-esg-link animated-shimmer-btn">
                  <span>Read our Corporate Sustainability Commitment</span>
                  <span className="animated-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Corporate Hubs & Direct Inquiry */}
        <div className="contact-hubs-grid">
          {/* Left: Regional Office Locations */}
          <ScrollReveal delay={100} direction="right">
            <div className="hubs-info-card">
              <h3 className="hubs-card-title">REGIONAL OFFICES & DISPATCH CENTERS</h3>
              <p className="hubs-card-sub">
                Our regional operations directors oversee corridor velocity and maintain continuous coordination with interchange partners.
              </p>

              <div className="offices-list">
                <div className="office-item animated-card-item">
                  <strong className="office-city">Chicago Corporate Headquarters</strong>
                  <span className="office-address">200 South Wacker Drive, Suite 2400, Chicago, IL 60606</span>
                  <span className="office-contact">Phone: +1 (312) 555-0190 • Email: info@vanguardfreight.com</span>
                </div>

                <div className="office-item animated-card-item">
                  <strong className="office-city">West Coast Intermodal Gateway</strong>
                  <span className="office-address">Pier 400 Logistics Center, Long Beach, CA 90802</span>
                  <span className="office-contact">Phone: +1 (562) 555-0144 • Email: westcoast@vanguardfreight.com</span>
                </div>

                <div className="office-item animated-card-item">
                  <strong className="office-city">Gulf Coast Energy Operations</strong>
                  <span className="office-address">1200 Smith Street, Suite 1800, Houston, TX 77002</span>
                  <span className="office-contact">Phone: +1 (713) 555-0182 • Email: gulfcoast@vanguardfreight.com</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Business Inquiry Form with Shimmer Glow Button */}
          <ScrollReveal delay={200} direction="left">
            <div className="inquiry-form-card">
              <h3 className="hubs-card-title">CORPORATE BUSINESS INQUIRY</h3>
              <p className="hubs-card-sub">
                Speak with a dedicated rail logistics specialist to review annual lane volume, service level commitments, and contract terms.
              </p>

              <form className="business-inquiry-form" onSubmit={handleSubmit}>
                <div className="form-field-row">
                  <div className="field-group">
                    <label htmlFor="inquiry-name" className="field-label">Full Name</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="field-input animated-input"
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="inquiry-email" className="field-label">Corporate Email</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      placeholder="vance@enterprise.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="field-input animated-input"
                    />
                  </div>
                </div>

                <div className="form-field-row">
                  <div className="field-group">
                    <label htmlFor="inquiry-company" className="field-label">Company / Organization</label>
                    <input
                      id="inquiry-company"
                      type="text"
                      placeholder="e.g. Apex Industrial Group"
                      value={inquiryCompany}
                      onChange={(e) => setInquiryCompany(e.target.value)}
                      className="field-input animated-input"
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="inquiry-volume" className="field-label">Estimated Annual Volume</label>
                    <select id="inquiry-volume" className="field-select animated-input">
                      <option>50 – 500 Containers (TEU)</option>
                      <option>500 – 2,500 Containers</option>
                      <option>2,500+ Containers</option>
                      <option>Dedicated Unit Trainset Movements</option>
                    </select>
                  </div>
                </div>

                <div className="field-group full-width">
                  <label htmlFor="inquiry-message" className="field-label">Corridors of Interest or Cargo Details</label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    placeholder="Outline key shipping origins, destinations, or specific equipment requirements..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="field-textarea animated-input"
                  />
                </div>

                <button type="submit" className="btn-submit-inquiry animated-shimmer-btn">
                  <span>Submit Corporate Inquiry</span>
                  <span className="animated-arrow">→</span>
                </button>

                {inquirySubmitted && (
                  <p className="inquiry-success-text">
                    ✓ Thank you. Your inquiry has been routed to our commercial accounts team. A representative will contact you within one business day.
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
