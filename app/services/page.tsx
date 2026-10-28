'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('intermodal');
  const [filterRamp, setFilterRamp] = useState('all');

  const services = [
    {
      id: 'intermodal',
      badge: 'CONTAINER RAIL',
      title: 'Double-Stack Intermodal Rail',
      subtitle: 'Transcontinental container pipelines connecting coastal seaports to inland distribution hubs.',
      image: '/images/intermodal_train.jpg',
      imageCaption: 'Vanguard 53ft double-stack unit train on the Southwestern Transcon corridor.',
      desc: 'Our double-stack intermodal rail solutions allow shippers to move up to 280 containers on a single trainset. By shifting freight from congested highway corridors to dedicated mainline rail, shippers eliminate truck driver bottlenecks, cut line-haul freight costs by 30% to 40%, and achieve massive carbon emissions reductions.',
      features: [
        '53ft domestic high-cube and 40ft/20ft ISO ocean container compatibility',
        'Direct on-dock rail ingestion bypassing congested harbor drayage gates',
        'Guaranteed departure schedules with Class 1 trackage priority',
        'Precision axle monitoring and shock-dampened well car trucks for fragile cargo',
      ],
      specs: {
        'Capacity Per Train': 'Up to 280 Forty-Foot Containers (FEU)',
        'Fuel Efficiency': '492 ton-miles per single gallon of fuel',
        'Speed Class': 'Express Mainline Priority (Up to 70 mph)',
        'Interchange Network': 'Direct handoffs with BNSF, Union Pacific, CSX, and CPKC',
      },
    },
    {
      id: 'unit-trains',
      badge: 'DEDICATED POWER',
      title: 'Dedicated Unit Trainsets',
      subtitle: 'Single-commodity freight moving direct from origin to destination without intermediate yard delays.',
      image: '/images/about_hero.jpg',
      imageCaption: '110-car dedicated bulk unit train negotiating high-tonnage mountain grades.',
      desc: 'When high volume demands an entire train, our dedicated unit train services provide 100 to 120 cars operating as an exclusive closed loop. There are no stops at classification hump yards, no car switching, and zero transit latency. Tailored for agricultural bulk, aggregate minerals, energy commodities, and automotive manufacturing lines.',
      features: [
        'Exclusive locomotive power (GE Tier 4 4,400 HP units) and dedicated crew rotation',
        'Bypass intermediate hump yards for true origin-to-destination transit',
        'Automated weight-in-motion scale integration and optical wheel scanners',
        'Custom loading-loop turnaround windows designed for terminal silos and manufacturing plants',
      ],
      specs: {
        'Trainset Length': '100 – 120 railcars (~7,200 ft continuous train)',
        'Payload Gross': 'Up to 14,000 net tons per movement',
        'Cycle Time Guarantee': 'Fixed corridor roundtrip scheduling',
        'Asset Availability': '99.8% scheduled trainset availability',
      },
    },
    {
      id: 'reefer',
      badge: 'TEMPERATURE-CONTROLLED',
      title: 'Precision Cold-Chain Boxcars',
      subtitle: 'Sub-zero frozen and refrigerated freight protected by continuous remote temperature monitoring.',
      image: '/images/services_hero.jpg',
      imageCaption: 'Insulated cryogenic railcars staged at terminal siding for immediate perishable loading.',
      desc: 'Engineered for produce, dairy, frozen proteins, and pharmaceutical raw materials. Our 72ft refrigerated railcars offer three times the volume of standard refrigerated highway trailers. Equipped with carrier-grade hybrid refrigeration units and satellite sensors that actively alert our operations staff if temperatures deviate by more than 1°F.',
      features: [
        'Active temperature envelope maintained between -20°F and +70°F',
        'Independent multi-day generator backup with low-fuel automatic alerts',
        'Remote setpoint adjustment directly from central operations control',
        'Automated temperature compliance logs exportable for FDA/FSMA audits',
      ],
      specs: {
        'Cubic Capacity': '7,855 cubic feet (equivalent to 3.5 highway trailers)',
        'Payload Limit': '142,000 lbs insulated cargo capacity',
        'Telemetry Sensors': 'Internal 6-point temp probes + door proximity',
        'Pre-Cooling Protocol': 'Automated thermal pull-down prior to loading',
      },
    },
    {
      id: 'cross-border',
      badge: 'BONDED CORRIDORS',
      title: 'Cross-Border Customs & Drayage',
      subtitle: 'Bonded customs transit across United States, Canadian, and Mexican industrial corridors.',
      image: '/images/locomotive_steel.jpg',
      imageCaption: 'Night interchange inspection at the Laredo international rail bridge.',
      desc: 'Cross-border logistics without border dwell. Our in-house licensed customs brokers and bonded rail manifests allow your cargo to clear regulatory requirements while in transit on the rails, avoiding multi-day truck staging lines at Laredo, El Paso, and Detroit border crossings.',
      features: [
        'C-TPAT Tier 3 and FAST certified expedited customs processing',
        'Electronic In-Bond filing and automated customs release prior to ramp arrival',
        'Integrated last-mile terminal drayage with pre-vetted local carrier networks',
        'Single consolidated billing covering rail haul, customs fees, and ramp handling',
      ],
      specs: {
        'Border Dwell Reduction': 'Average 18 hours saved vs highway customs queues',
        'Customs Documentation': 'Full automated ACE / ACI electronic integration',
        'Bonded Yard Access': 'Secure bonded intermodal storage at 14 border hubs',
        'Carrier Alliance': 'Seamless interlining with CPKC, BNSF, and Ferromex',
      },
    },
  ];

  const caseStudies = [
    {
      sector: 'Automotive Manufacturing',
      headline: 'Stabilizing High-Volume Engine Block Deliveries from Mexico to the Midwest',
      metric: '72% Variance Reduction',
      story: 'A Tier-1 automotive manufacturer was experiencing recurring 48-hour highway delays at Laredo customs. Vanguard engineered a dedicated bonded rail corridor directly from Monterrey to Chicago, moving 60 containers per week with 99.8% on-time plant arrival.',
    },
    {
      sector: 'Perishable Agriculture',
      headline: 'Transcontinental Organic Produce Transit with Zero Cold-Chain Excursions',
      metric: '0 Spoiled Loads in 24 Months',
      story: 'By switching from team-truck highway haul to Vanguard 72ft cryogenic boxcars, an organic grower cooperative cut transportation costs by 34% while maintaining constant 34°F air temperature from Salinas Valley to Philadelphia distribution centers.',
    },
    {
      sector: 'Industrial Chemical Bulk',
      headline: 'Securing High-Purity Resin Movements Across the Gulf Coast Petrochemical Belt',
      metric: '100% FRA Compliance Record',
      story: 'Vanguard manages private siding switching and dedicated 100-car tank train movements for a major plastics producer, coordinating directly with regional switching terminals to maintain unbroken supply to downstream molding facilities.',
    },
  ];

  const ramps = [
    { name: 'Chicago Corwith Yard', code: 'CHI-COR', region: 'Midwest', tracks: 24, liftCapacity: '1,200 lifts/day', status: 'Active' },
    { name: 'Los Angeles Hobart Yard', code: 'LAX-HOB', region: 'West Coast', tracks: 32, liftCapacity: '2,400 lifts/day', status: 'Active' },
    { name: 'Dallas Logistics Center', code: 'DFW-DLC', region: 'Southwest', tracks: 18, liftCapacity: '950 lifts/day', status: 'Active' },
    { name: 'Kansas City Argentine Yard', code: 'KCY-ARG', region: 'Midwest', tracks: 20, liftCapacity: '1,100 lifts/day', status: 'Active' },
    { name: 'Newark Doremus Intermodal', code: 'EWR-DOR', region: 'East Coast', tracks: 16, liftCapacity: '800 lifts/day', status: 'Active' },
    { name: 'Houston Barbour Cut Terminal', code: 'HOU-BCT', region: 'Gulf Coast', tracks: 14, liftCapacity: '750 lifts/day', status: 'Active' },
  ];

  const filteredRamps = filterRamp === 'all' ? ramps : ramps.filter((r) => r.region.toLowerCase().includes(filterRamp.toLowerCase()));
  const activeServiceData = services.find((s) => s.id === selectedService) || services[0];

  return (
    <main className="services-page-main">
      {/* Services Hero Section with Animated Ken Burns Photography */}
      <section className="services-hero-section">
        <div className="hero-bg-photo-wrapper">
          <Image
            src="/images/services_hero.jpg"
            alt="Intermodal freight terminal at dusk"
            fill
            priority
            className="hero-bg-photo animated-kenburns"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="services-container">
          <div className="services-hero-content">
            <ScrollReveal direction="down" duration={800}>
              <div className="services-eyebrow-pill">
                <span className="badge-glow-dot" />
                <span>COMMERCIAL LOGISTICS & FREIGHT CAPABILITIES</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} duration={850}>
              <h1 className="services-hero-title">
                THE CONTINENTAL FREIGHT RAIL NETWORK
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200} duration={900}>
              <p className="services-hero-desc">
                High-capacity double-stack intermodal corridors, dedicated unit trainsets, and certified temperature-controlled rolling stock. Designed to give high-volume shippers predictable schedule integrity and lower overall transportation costs.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up" duration={950}>
              <div className="hero-stats-banner">
                <div className="stat-box animated-stat-hover">
                  <span className="stat-big">
                    <AnimatedCounter end={14200} suffix="+" duration={2000} />
                  </span>
                  <span className="stat-sub">Active Railcars in Fleet</span>
                </div>
                <div className="stat-box animated-stat-hover">
                  <span className="stat-big">
                    <AnimatedCounter end={42} duration={1600} />
                  </span>
                  <span className="stat-sub">Interchange Ramp Terminals</span>
                </div>
                <div className="stat-box animated-stat-hover">
                  <span className="stat-big">
                    <AnimatedCounter end={99.4} suffix="%" decimals={1} duration={2200} />
                  </span>
                  <span className="stat-sub">Schedule Adherence Rate</span>
                </div>
                <div className="stat-box animated-stat-hover">
                  <span className="stat-big">Class 1</span>
                  <span className="stat-sub">Trackage Common Carrier</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Service Explorer with Cross-Fade Animations */}
      <section className="service-details-section" id="solutions-explorer">
        <div className="services-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">CORE DISCIPLINES</span>
              <h2 className="section-heading">FREIGHT MODALITIES & CAPABILITIES</h2>
              <p className="section-lead">
                Explore our primary transportation modes, equipment specifications, and operating parameters.
              </p>
            </div>
          </ScrollReveal>

          {/* Service Selector Tabs with Animated Active Highlight */}
          <div className="service-selector-tabs">
            {services.map((srv) => (
              <button
                key={srv.id}
                className={`service-tab-button animated-tab ${selectedService === srv.id ? 'active' : ''}`}
                onClick={() => setSelectedService(srv.id)}
              >
                <span className="tab-pill-badge">{srv.badge}</span>
                <span className="tab-button-title">{srv.title}</span>
                {selectedService === srv.id && <span className="tab-active-indicator" />}
              </button>
            ))}
          </div>

          {/* Active Service Showcase Card with Animated Key Dissolve */}
          <div key={activeServiceData.id} className="service-showcase-card animated-modality-fade">
            {/* Visual Header with Real Image */}
            <div className="showcase-visual-row">
              <div className="showcase-photo-box group-hover-zoom">
                <div className="photo-ambient-backlight" />
                <Image
                  src={activeServiceData.image}
                  alt={activeServiceData.title}
                  width={680}
                  height={380}
                  className="showcase-img"
                />
                <span className="photo-caption">{activeServiceData.imageCaption}</span>
              </div>

              <div className="showcase-summary-box">
                <span className="showcase-badge animated-badge-pulse">{activeServiceData.badge}</span>
                <h3 className="showcase-name">{activeServiceData.title}</h3>
                <p className="showcase-sub">{activeServiceData.subtitle}</p>
                <p className="showcase-desc-text">{activeServiceData.desc}</p>

                <div className="showcase-cta-row">
                  <Link href="/#company-overview" className="btn-service-action animated-shimmer-btn">
                    <span>Inquire About Lane Capacity</span>
                    <svg viewBox="0 0 20 20" fill="none" width="16" height="16" className="animated-arrow-icon">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="showcase-body-grid">
              {/* Left Column: Operational Advantages */}
              <div className="showcase-info-col">
                <h4 className="features-list-title">OPERATIONAL ADVANTAGES</h4>
                <ul className="features-checklist">
                  {activeServiceData.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="feature-check-item animated-check-item"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <span className="check-icon animated-check-bounce">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Technical Specifications */}
              <div className="showcase-specs-col">
                <div className="specs-card animated-card-highlight">
                  <h4 className="specs-card-title">EQUIPMENT & OPERATING SPECIFICATIONS</h4>
                  <div className="specs-key-value-list">
                    {Object.entries(activeServiceData.specs).map(([key, val]) => (
                      <div key={key} className="spec-kv-item">
                        <span className="spec-key">{key}</span>
                        <strong className="spec-value">{val}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="specs-guarantee-box animated-shield-box">
                    <span className="shield-icon animated-shield-pulse">🛡️</span>
                    <div className="guarantee-text">
                      <strong>Vanguard Corridor Reliability SLA:</strong> Departure windows are guaranteed. If a mainline movement experiences transit variance outside force majeure, demurrage charges are waived automatically.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipper Case Studies Section */}
      <section className="case-studies-section">
        <div className="services-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">PROVEN RESULTS</span>
              <h2 className="section-heading">CLIENT CASE STUDIES</h2>
              <p className="section-lead">
                How enterprise shippers partner with Vanguard to lower costs and stabilize critical supply chain lanes.
              </p>
            </div>
          </ScrollReveal>

          <div className="case-studies-grid">
            {caseStudies.map((cs, idx) => (
              <ScrollReveal key={idx} delay={idx * 140} direction="up">
                <div className="case-study-card animated-hover-lift">
                  <div className="card-top-shine-line" />
                  <span className="case-sector">{cs.sector}</span>
                  <h3 className="case-headline">{cs.headline}</h3>
                  <div className="case-metric-pill animated-pulse-pill">
                    <span className="metric-tag">{cs.metric}</span>
                  </div>
                  <p className="case-story">{cs.story}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Ramp Directory */}
      <section className="terminal-directory-section" id="terminals">
        <div className="services-container">
          <ScrollReveal>
            <div className="section-head">
              <span className="section-pre">RAMP INFRASTRUCTURE</span>
              <h2 className="section-heading">INTERCHANGE TERMINAL NETWORK</h2>
              <p className="section-lead">
                Major interchange ramps equipped with wide-span automated gantry cranes and dedicated staging tracks.
              </p>
            </div>
          </ScrollReveal>

          {/* Region Filters with Smooth Pill Transitions */}
          <div className="ramp-filter-bar">
            {['all', 'Midwest', 'West Coast', 'East Coast', 'Gulf Coast'].map((reg) => (
              <button
                key={reg}
                className={`filter-btn animated-filter-pill ${filterRamp === reg ? 'active' : ''}`}
                onClick={() => setFilterRamp(reg)}
              >
                {reg === 'all' ? 'All Hubs' : reg}
              </button>
            ))}
          </div>

          {/* Ramp Grid with Staggered Entrance */}
          <div className="ramps-grid">
            {filteredRamps.map((ramp, idx) => (
              <ScrollReveal key={ramp.code} delay={idx * 70} direction="up">
                <div className="ramp-card animated-ramp-hover">
                  <div className="ramp-top">
                    <span className="ramp-code">{ramp.code}</span>
                    <div className="ramp-status-beacon">
                      <span className="beacon-ping" />
                      <span className="beacon-core" />
                      <span className="ramp-status-pill">{ramp.status}</span>
                    </div>
                  </div>
                  <h3 className="ramp-name">{ramp.name}</h3>
                  <div className="ramp-region-badge">{ramp.region}</div>
                  <div className="ramp-stats">
                    <div className="r-stat">
                      <span className="lbl">Mainline Tracks:</span>
                      <span className="val">{ramp.tracks} Receiving Tracks</span>
                    </div>
                    <div className="r-stat">
                      <span className="lbl">Crane Lift Capacity:</span>
                      <span className="val">{ramp.liftCapacity}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Corporate Call to Action with generous non-overlapping margin */}
          <div className="services-footer-cta-wrapper" style={{ marginTop: '56px' }}>
            <ScrollReveal delay={200} direction="up">
              <div className="services-footer-cta animated-cta-gradient">
                <h3 className="footer-cta-title">Need specialized siding switches or private car allocations?</h3>
                <p className="footer-cta-sub">Our railway design engineers work directly with industrial plants, distribution centers, and grain elevators to engineer custom trackage connections.</p>
                <div className="footer-cta-btn-group">
                  <Link href="/#company-overview" className="btn-cta-white animated-shimmer-btn">
                    <span>Contact Commercial Accounts Team</span>
                    <span className="animated-arrow">→</span>
                  </Link>
                  <Link href="/about" className="btn-cta-transparent">
                    About Vanguard Freight Systems
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
