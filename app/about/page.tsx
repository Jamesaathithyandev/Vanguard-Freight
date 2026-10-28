'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function AboutPage() {
  const [activeDecade, setActiveDecade] = useState('1974');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const timelineMilestones = [
    {
      year: '1974',
      badge: 'FOUNDING ERA',
      title: 'Incorporation & Midwest Switching Infrastructure',
      summary: 'Vanguard Freight begins operations as a licensed switching terminal in South Chicago, managing freight car classification and heavy yard transfers for the Great Lakes steel and industrial corridor.',
      milestones: [
        'Acquired 18 miles of dedicated industrial trackage in the Calumet rail district',
        'Built initial interchange ties with Pennsylvania Railroad and Santa Fe trackage',
        'Achieved first 100,000 incident-free freight car movements',
      ],
      equipment: 'EMD GP38-2 Switchers • 50-ton Friction Bearing Boxcars',
    },
    {
      year: '1988',
      badge: 'INTERMODAL EXPANSION',
      title: 'First Transcontinental Double-Stack Corridors',
      summary: 'Recognizing the global shift toward containerized ocean shipping, Vanguard pioneers dedicated double-stack container trains connecting the Port of Long Beach to Chicago intermodal yards.',
      milestones: [
        'Deployed 300 articulated five-platform well cars capable of 286,000 lbs GRL',
        'Reduced transcontinental ocean-to-rail dwell from 72 hours down to 18 hours',
        'Established proprietary dispatch corridors with joint Class 1 track rights',
      ],
      equipment: 'Thrall 53ft Intermodal Well Cars • GE Dash 8-40CW Power',
    },
    {
      year: '2003',
      badge: 'NETWORK VELOCITY',
      title: 'Precision Railroading & Inland Gateway Construction',
      summary: 'Vanguard executes a $1.2 billion capital expansion program, constructing automated interchange hubs across Kansas City, Dallas-Fort Worth, and the Houston petrochemical basin.',
      milestones: [
        'Constructed Kansas City Argentine wide-span automated gantry terminal',
        'Introduced real-time acoustic bearing detectors along all mainline trackage',
        'Integrated electronic customs clearance for expedited Mexican cross-border commerce',
      ],
      equipment: 'GE AC4400CW High-Tractive Power • Cryogenic 72ft Reefer Boxcars',
    },
    {
      year: '2016',
      badge: 'SAFETY & ESG PIONEERING',
      title: 'Positive Train Control (PTC) & EPA SmartWay Excellence',
      summary: 'Completed 100% full-line installation of automated Positive Train Control two years ahead of federal statutory deadlines, establishing Vanguard as one of the safest heavy-haul carriers in the hemisphere.',
      milestones: [
        'Equipped 100% of mainline locomotive fleet with GPS and computer-controlled braking',
        'Certified as an EPA SmartWay Transport Partner with Tier 4 low-emission engines',
        'Achieved 14 consecutive years of E.H. Harriman Rail Safety Recognition',
      ],
      equipment: 'GE Tier 4 ET44AC Heavy Haulers • Lightweight Aerodynamic Double-Stacks',
    },
    {
      year: '2026+',
      badge: 'THE MODERN ERA',
      title: 'Autonomous Optical Diagnostics & Decarbonized Power',
      summary: 'Operating 14,200+ freight cars across 42 continental interchanges. Today, Vanguard leads North American rail logistics through automated wayside vision systems and high-density unit train operations.',
      milestones: [
        'Deploying AI-assisted machine-vision track geometry inspection cars',
        'Expanding renewable biodiesel blends and battery-electric yard switcher trials',
        'Moving over 1.8 million container lifts annually with 99.4% on-time integrity',
      ],
      equipment: 'Precision Tier 4 Heavy Road Power • Satellite-Monitored Smart Rolling Stock',
    },
  ];

  const leadership = [
    {
      name: 'Marcus Vance',
      role: 'Chief Executive Officer',
      tenure: '28 Years Rail Operations',
      bio: 'Former Executive VP of Transportation at transcontinental carriers. Marcus has overseen over $4B in capital infrastructure projects, focusing on terminal velocity and long-term shipper alliances.',
    },
    {
      name: 'Elena Rostova',
      role: 'Chief Operating Officer',
      tenure: '24 Years Network Management',
      bio: 'Specializes in Precision Scheduled Railroading (PSR), locomotive fleet maintenance, and intermodal ramp crane automation across our 42 North American gateways.',
    },
    {
      name: 'David K. Thorne',
      role: 'Executive VP, Commercial Logistics',
      tenure: '22 Years Shipper Contracts',
      bio: 'Directs Vanguard commercial agreements with global retailers, automotive manufacturers, and agricultural cooperatives, structuring long-term corridor capacity guarantees.',
    },
    {
      name: 'Dr. Alistair Chen',
      role: 'VP of Safety & Infrastructure Engineering',
      tenure: '19 Years FRA Compliance',
      bio: 'Ph.D. in Railway Civil Engineering from University of Illinois Urbana-Champaign. Directs our automated track geometry cars, optical wheel detectors, and FRA safety reporting.',
    },
  ];

  const values = [
    {
      title: 'Operational Precision',
      desc: 'We treat freight schedules with the exacting discipline of high-speed passenger lines. Departure windows are firm, interline transfers are rehearsed, and delays are mitigated before they reach the shipper.',
    },
    {
      title: 'Single-Point Accountability',
      desc: 'No finger-pointing between line-haul railroads, switching terminals, and drayage carriers. Vanguard acts as the single accountable common carrier for your cargo from initial ramp release to final delivery.',
    },
    {
      title: 'Environmental Stewardship',
      desc: 'Rail is the most fuel-efficient transportation mode on land. We actively invest in Tier 4 low-emission power and double-stack well aerodynamics to slash corporate Scope 3 emissions by up to 75%.',
    },
    {
      title: 'Uncompromising Safety Culture',
      desc: 'Zero preventable incidents is our non-negotiable benchmark. Every employee, from track maintenance crews to locomotive engineers, possesses full stop-work authority for any safety concern.',
    },
  ];

  const corporateFaqs = [
    {
      q: 'How does rail freight economics compare with long-haul interstate trucking?',
      a: 'Rail delivers substantial economic advantages on movements exceeding 450 miles. Because a single Vanguard train can move the payload of 280 commercial trucks with 75% lower fuel consumption, shippers routinely achieve 30% to 40% line-haul cost reductions, with greater rate stability against highway fuel surcharges.',
    },
    {
      q: 'What common carrier regulatory standards govern Vanguard shipments?',
      a: 'Vanguard operates as a Class 1 common carrier under the regulatory oversight of the Surface Transportation Board (STB) and Federal Railroad Administration (FRA). All shipments are protected by published STB common carrier tariffs (AAR-600) with formal dispute resolution and demurrage transparency rules.',
    },
    {
      q: 'How does Vanguard handle hazardous materials and chemical commodities?',
      a: 'All hazardous materials carriage strictly adheres to 49 CFR Parts 171-180 regulations. Our trainsets utilize Positive Train Control (PTC) automated speed enforcements, buffer railcars, electronic consist manifests, and 24/7 dedicated hazmat emergency response teams coordinated with local first responders.',
    },
    {
      q: 'Can Vanguard assist with private rail siding connections for industrial facilities?',
      a: 'Yes. Our Railway Civil Engineering group works directly with distribution centers, chemical manufacturing plants, and grain elevators to design, permit, and construct direct mainline siding turnouts and staging tracks connecting to Vanguard mainline corridors.',
    },
  ];

  const activeMilestone = timelineMilestones.find((m) => m.year === activeDecade) || timelineMilestones[0];

  return (
    <main className="about-page-main">
      {/* Editorial Hero Section with Animated Ken Burns Photography */}
      <section className="about-hero-section">
        <div className="hero-bg-photo-wrapper">
          <Image
            src="/images/about_hero.jpg"
            alt="Vanguard heavy-haul freight train traversing mountain pass at sunrise"
            fill
            priority
            className="hero-bg-photo animated-kenburns"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="about-container">
          <div className="about-hero-content">
            <ScrollReveal direction="down" duration={800}>
              <div className="about-eyebrow-pill">
                <span className="badge-glow-dot" />
                <span>CORPORATE PROFILE & HERITAGE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} duration={850}>
              <h1 className="about-hero-title">
                FIFTY YEARS OF HEAVY RAIL INFRASTRUCTURE
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200} duration={900}>
              <p className="about-hero-desc">
                Vanguard Freight Systems was founded on a simple principle: high-volume commerce requires certainty. By pairing long-haul heavy rail assets with transparent corporate governance, we provide enterprise shippers with the dependable backbone their supply chains depend on.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up" duration={950}>
              <div className="about-stats-row">
                <div className="about-stat-item animated-stat-hover">
                  <span className="stat-num">
                    <AnimatedCounter end={50} suffix="+" duration={1800} />
                  </span>
                  <span className="stat-desc">Years Rail Operations</span>
                </div>
                <div className="about-stat-item animated-stat-hover">
                  <span className="stat-num">
                    <AnimatedCounter end={14200} suffix="+" duration={2200} />
                  </span>
                  <span className="stat-desc">Active Railcars in Fleet</span>
                </div>
                <div className="about-stat-item animated-stat-hover">
                  <span className="stat-num">
                    <AnimatedCounter end={42} duration={1600} />
                  </span>
                  <span className="stat-desc">Interline Gateway Hubs</span>
                </div>
                <div className="about-stat-item animated-stat-hover">
                  <span className="stat-num">
                    <AnimatedCounter end={1850} suffix="+" duration={2000} />
                  </span>
                  <span className="stat-desc">Certified Railroaders</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive 5-Decade Heritage Timeline with Animated Track */}
      <section className="about-timeline-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">PROVEN EVOLUTION</span>
              <h2 className="section-heading">FIVE DECADES OF RAIL INNOVATION</h2>
              <p className="section-lead">
                Explore how Vanguard evolved from a regional Chicago switching line into one of North America’s most dependable Class 1 rail logistics providers.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline Navigation Bar with Connecting Rail Beam */}
          <div className="timeline-nav-wrapper">
            <div className="timeline-nav-rail-line" />
            <div className="timeline-nav-bar">
              {timelineMilestones.map((m) => (
                <button
                  key={m.year}
                  className={`timeline-year-btn animated-tab ${activeDecade === m.year ? 'active' : ''}`}
                  onClick={() => setActiveDecade(m.year)}
                >
                  <span className="btn-year">{m.year}</span>
                  <span className="btn-badge">{m.badge}</span>
                  {activeDecade === m.year && <span className="tab-active-indicator" />}
                </button>
              ))}
            </div>
          </div>

          {/* Active Era Milestone Card with Key-Based Crossfade Animation */}
          <div key={activeMilestone.year} className="timeline-active-card animated-modality-fade">
            <div className="timeline-card-header">
              <div>
                <span className="era-badge animated-badge-pulse">{activeMilestone.badge}</span>
                <h3 className="era-title">{activeMilestone.title}</h3>
              </div>
              <span className="era-year-large animated-year-glow">{activeMilestone.year}</span>
            </div>

            <p className="era-summary-text">{activeMilestone.summary}</p>

            <div className="era-details-grid">
              <div className="era-achievements-box animated-box-highlight">
                <h4 className="box-title">HISTORICAL MILESTONES</h4>
                <ul className="milestone-list">
                  {activeMilestone.milestones.map((ms, idx) => (
                    <li
                      key={idx}
                      className="milestone-list-item animated-milestone-item"
                      style={{ animationDelay: `${idx * 90}ms` }}
                    >
                      <span className="bullet-point">▸</span>
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="era-equipment-box animated-box-highlight">
                <h4 className="box-title">REPRESENTATIVE MOTIVE POWER & ROLLING STOCK</h4>
                <div className="equipment-tag-box animated-equipment-glow">
                  <span className="tag-icon animated-icon-pulse">🚂</span>
                  <p className="tag-text">{activeMilestone.equipment}</p>
                </div>
                <p className="equipment-note">
                  All equipment deployed under AAR standards with certified journal bearings, air brakes, and dynamic braking capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photographic Heavy Infrastructure Section with 3D Hover Depth */}
      <section className="about-infrastructure-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">ENGINEERED INTEGRITY</span>
              <h2 className="section-heading">HEAVY ROLLING STOCK & TRACK SAFETY</h2>
              <p className="section-lead">
                Built to sustain extreme continental tonnages with maximum mechanical reliability.
              </p>
            </div>
          </ScrollReveal>

          <div className="infrastructure-visual-grid">
            <ScrollReveal delay={100} direction="right">
              <div className="infra-card animated-infra-card">
                <div className="infra-image-box group-hover-zoom">
                  <Image
                    src="/images/locomotive_steel.jpg"
                    alt="Heavy steel coupler and snow plow on high-tonnage mainline rails"
                    width={600}
                    height={380}
                    className="infra-img"
                  />
                  <div className="infra-img-overlay">
                    <span className="infra-tag">HEAVY MECHANICAL</span>
                    <strong className="infra-label">Type E/F Couplers & Cushioned Draft Gear</strong>
                  </div>
                </div>
                <div className="infra-info">
                  <h3 className="infra-title">Tension & Slack Action Management</h3>
                  <p className="infra-desc">
                    Long freight trains endure immense in-train dynamic forces. Vanguard utilizes hydraulic end-of-car cushioning and Grade E cast steel knuckles to protect sensitive cargo from run-in slack shock.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="left">
              <div className="infra-card animated-infra-card">
                <div className="infra-image-box group-hover-zoom">
                  <Image
                    src="/images/intermodal_train.jpg"
                    alt="High-speed intermodal container train moving through transcontinental corridor"
                    width={600}
                    height={380}
                    className="infra-img"
                  />
                  <div className="infra-img-overlay">
                    <span className="infra-tag">MAINLINE VELOCITY</span>
                    <strong className="infra-label">Double-Stack Articulated Well Geometry</strong>
                  </div>
                </div>
                <div className="infra-info">
                  <h3 className="infra-title">Low Center-of-Gravity Double Stacks</h3>
                  <p className="infra-desc">
                    By carrying container bottoms just 8 inches above rail level, our well cars ensure exceptional aerodynamic stability in crosswinds and permit speeds up to 70 mph on mainline corridors.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="about-values-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">FOUNDATIONAL PRINCIPLES</span>
              <h2 className="section-heading">THE VALUES THAT GUIDE OUR OPERATIONS</h2>
              <p className="section-lead">
                Our business is built on trust, consistency, and an unyielding commitment to operational excellence border to border.
              </p>
            </div>
          </ScrollReveal>

          <div className="values-grid">
            {values.map((val, idx) => (
              <ScrollReveal key={idx} delay={idx * 110} direction="up">
                <div className="value-card animated-value-card">
                  <div className="value-card-glow" />
                  <div className="value-num animated-num-shimmer">0{idx + 1}</div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-text">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="about-leadership-section" id="leadership">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">MANAGEMENT</span>
              <h2 className="section-heading">EXECUTIVE LEADERSHIP TEAM</h2>
              <p className="section-lead">
                Decades of hands-on railroad operations, mechanical engineering, and commercial supply chain leadership.
              </p>
            </div>
          </ScrollReveal>

          <div className="leadership-grid">
            {leadership.map((person, idx) => (
              <ScrollReveal key={idx} delay={idx * 120} direction="up">
                <div className="leader-card animated-leader-card">
                  <div className="leader-top-glow" />
                  <div className="leader-header">
                    <div>
                      <h3 className="leader-name">{person.name}</h3>
                      <span className="leader-role">{person.role}</span>
                    </div>
                    <span className="leader-tenure-badge animated-badge-pulse">{person.tenure}</span>
                  </div>
                  <p className="leader-bio">{person.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate FAQs & Regulatory Accordion with Smooth Smooth Rotating Toggles */}
      <section className="about-faq-section" id="faq">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">REGULATORY & OPERATIONAL CLARITY</span>
              <h2 className="section-heading">FREQUENTLY ASKED COMMERCIAL QUESTIONS</h2>
              <p className="section-lead">
                Clear answers regarding common carrier rules, fuel stability, hazardous commodities, and private siding connections.
              </p>
            </div>
          </ScrollReveal>

          <div className="faq-accordion-list">
            {corporateFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-accordion-item animated-faq-item ${isOpen ? 'active' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span className="faq-question-text">{faq.q}</span>
                    <span className={`faq-toggle-icon animated-toggle-spin ${isOpen ? 'open' : ''}`}>
                      <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                        <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div className={`faq-collapsible-wrapper ${isOpen ? 'expanded' : ''}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Sustainability Call to Action */}
      <section className="about-commitments-section" id="sustainability">
        <div className="about-container">
          <ScrollReveal direction="up">
            <div className="commitments-card animated-commitments-glow">
              <div className="commitments-content">
                <span className="commitments-badge animated-badge-pulse">SUSTAINABILITY & SAFETY</span>
                <h2 className="commitments-title">
                  COMMITTED TO ADVANCING CLEANER, SAFER COMMERCE
                </h2>
                <p className="commitments-text">
                  Freight railroads generate up to 75% fewer greenhouse gas emissions per ton-mile than long-haul highway trucks. Moving high-volume cargo on Vanguard trains preserves natural environments, curtails road maintenance strain, and shields corporate shippers from volatile highway diesel surcharges.
                </p>
                <div className="commitments-bullets">
                  <div className="bullet-box animated-bullet-hover">
                    <strong>Positive Train Control (PTC)</strong>
                    <p>100% of our mainline corridors are actively protected by automated collision-prevention speed control.</p>
                  </div>
                  <div className="bullet-box animated-bullet-hover">
                    <strong>SmartWay Transport Partner</strong>
                    <p>Verified by the U.S. Environmental Protection Agency for operational freight emissions efficiency.</p>
                  </div>
                  <div className="bullet-box animated-bullet-hover">
                    <strong>Wayside Acoustic Detectors</strong>
                    <p>Automated acoustic bearing detectors and geometry cars constantly monitor axle and track integrity.</p>
                  </div>
                </div>

                <div className="commitments-actions">
                  <Link href="/services" className="btn-primary-about animated-shimmer-btn">
                    <span>Explore Freight Solutions</span>
                    <span className="animated-arrow">→</span>
                  </Link>
                  <Link href="/#company-overview" className="btn-secondary-about animated-ghost-btn">
                    Contact Commercial Accounts
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
