'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface RouteCalcResult {
  hours: number;
  miles: number;
  fuelSavedGal: number;
  co2SavedTons: number;
  costSavingsPercent: number;
}

export default function LiveOperationsSection() {
  const [origin, setOrigin] = useState('CHI');
  const [destination, setDestination] = useState('LAX');
  const [teus, setTeus] = useState(12);
  const [cargoType, setCargoType] = useState('dry');

  // Active corridor selection for the interactive telemetry tab
  const [activeCorridor, setActiveCorridor] = useState('heartland');

  // Corridor data
  const corridors = [
    {
      id: 'heartland',
      name: 'Heartland Intermodal Backbone',
      route: 'Chicago, IL ⟷ Dallas/Fort Worth, TX',
      distance: '972 miles',
      avgSpeed: '56.4 mph',
      activeTrains: 28,
      status: 'OPTIMAL',
      statusColor: 'var(--green-pulse)',
      onTimeRate: '99.6%',
      delayIndex: '0.04 hrs',
      weather: 'Clear / 54°F',
    },
    {
      id: 'pacific',
      name: 'Trans-Pacific High-Speed Rail Corridor',
      route: 'Port of Los Angeles, CA ⟷ Chicago Corwith Yard',
      distance: '2,240 miles',
      avgSpeed: '58.2 mph',
      activeTrains: 46,
      status: 'HIGH TRAFFIC',
      statusColor: 'var(--amber-pulse)',
      onTimeRate: '98.9%',
      delayIndex: '0.18 hrs',
      weather: 'Dry Haze / 68°F',
    },
    {
      id: 'gulf',
      name: 'Gulf Coast Industrial Chemical Corridor',
      route: 'Houston Petrochemical Hub ⟷ Newark Marine Terminal',
      distance: '1,640 miles',
      avgSpeed: '51.8 mph',
      activeTrains: 19,
      status: 'OPTIMAL',
      statusColor: 'var(--green-pulse)',
      onTimeRate: '99.2%',
      delayIndex: '0.08 hrs',
      weather: 'Light Rain / 72°F',
    },
    {
      id: 'northern',
      name: 'Northern Great Plains Bulk Line',
      route: 'Seattle / Tacoma, WA ⟷ Minneapolis / St. Paul, MN',
      distance: '1,810 miles',
      avgSpeed: '53.1 mph',
      activeTrains: 22,
      status: 'OPTIMAL',
      statusColor: 'var(--green-pulse)',
      onTimeRate: '99.4%',
      delayIndex: '0.02 hrs',
      weather: 'Partly Cloudy / 46°F',
    },
  ];

  // Dynamic route calculator
  const routeDistances: Record<string, number> = {
    'CHI-LAX': 2240,
    'CHI-DFW': 972,
    'CHI-EWR': 890,
    'LAX-DFW': 1430,
    'LAX-EWR': 2780,
    'DFW-EWR': 1580,
  };

  const getDistance = (orig: string, dest: string): number => {
    if (orig === dest) return 350;
    const key1 = `${orig}-${dest}`;
    const key2 = `${dest}-${orig}`;
    return routeDistances[key1] || routeDistances[key2] || 1500;
  };

  const calculateSavings = (): RouteCalcResult => {
    const dist = getDistance(origin, destination);
    const speed = cargoType === 'reefer' ? 58 : cargoType === 'heavy' ? 48 : 54;
    const hours = Math.round((dist / speed) * 10) / 10;
    // Rail is ~3.5x to 4x more fuel efficient than trucks per ton-mile
    // 1 truck per TEU/container
    const truckGal = (dist / 6.5) * teus;
    const railGal = (dist / 22.5) * teus;
    const fuelSavedGal = Math.round(truckGal - railGal);
    // ~22.4 lbs CO2 per gallon diesel -> 0.0101 metric tons per gal
    const co2SavedTons = Math.round(fuelSavedGal * 0.0101 * 10) / 10;
    const costSavingsPercent = cargoType === 'heavy' ? 42 : cargoType === 'reefer' ? 31 : 38;

    return {
      hours,
      miles: dist,
      fuelSavedGal,
      co2SavedTons,
      costSavingsPercent,
    };
  };

  const calcResult = calculateSavings();

  const currentCorridorData = corridors.find((c) => c.id === activeCorridor) || corridors[0];

  return (
    <section className="live-operations-section" id="operations-telemetry">
      <div className="ops-container">
        {/* Section Header */}
        <div className="ops-header-block">
          <div className="ops-badge">
            <span className="badge-pulse" />
            <span>REAL-TIME CORRIDOR TELEMETRY</span>
          </div>
          <h2 className="ops-title">
            PRECISION LOGISTICS AT CONTINENTAL SCALE
          </h2>
          <p className="ops-subtitle">
            Every train in our network is continuously tracked via dual-band satellite telemetry, axle health sensors, and automated trackside optical scanners.
          </p>
        </div>

        {/* 4 Macro Metrics */}
        <div className="metrics-counter-grid">
          <div className="metric-card">
            <div className="metric-val-row">
              <span className="metric-number">99.4</span>
              <span className="metric-unit">%</span>
            </div>
            <div className="metric-label">On-Time Dispatch Reliability</div>
            <div className="metric-footnote">Across 4 continental corridors</div>
          </div>

          <div className="metric-card">
            <div className="metric-val-row">
              <span className="metric-number">18,450</span>
              <span className="metric-unit">+</span>
            </div>
            <div className="metric-label">Monthly Double-Stack TEUs</div>
            <div className="metric-footnote">Dedicated unit & priority intermodal</div>
          </div>

          <div className="metric-card">
            <div className="metric-val-row">
              <span className="metric-number">42</span>
              <span className="metric-unit">Hubs</span>
            </div>
            <div className="metric-label">Direct Inland Terminals & Ramps</div>
            <div className="metric-footnote">Direct rail-to-port connections</div>
          </div>

          <div className="metric-card">
            <div className="metric-val-row">
              <span className="metric-number">1.4M</span>
              <span className="metric-unit">Tons</span>
            </div>
            <div className="metric-label">Annual CO₂ Emissions Avoided</div>
            <div className="metric-footnote">Vs. equivalent highway diesel haul</div>
          </div>
        </div>

        {/* Two-Column Interactive Grid: Corridor Telemetry + Route Calculator */}
        <div className="ops-interactive-grid">
          {/* Left Column: Corridor Explorer */}
          <div className="interactive-card corridor-card">
            <div className="card-top-bar">
              <div className="card-heading-group">
                <span className="card-pretitle">SATELLITE RADAR</span>
                <h3 className="card-title">Live Rail Corridors</h3>
              </div>
              <span className="live-network-tag">● 115 LOCOMOTIVES DISPATCHED</span>
            </div>

            {/* Corridor Tabs */}
            <div className="corridor-tab-list">
              {corridors.map((c) => (
                <button
                  key={c.id}
                  className={`corridor-tab-btn ${activeCorridor === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCorridor(c.id)}
                >
                  <span className="tab-btn-title">{c.name}</span>
                  <span className="tab-btn-route">{c.route}</span>
                </button>
              ))}
            </div>

            {/* Selected Corridor Telemetry Readout */}
            <div className="telemetry-display-panel">
              <div className="telemetry-row main-status">
                <div className="route-name-block">
                  <h4 className="active-route-name">{currentCorridorData.name}</h4>
                  <p className="active-route-path">{currentCorridorData.route}</p>
                </div>
                <div className="active-status-tag">
                  <span className="status-dot" style={{ backgroundColor: currentCorridorData.statusColor }} />
                  <span>{currentCorridorData.status}</span>
                </div>
              </div>

              <div className="telemetry-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Corridor Length</span>
                  <span className="spec-val">{currentCorridorData.distance}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Avg Mainline Speed</span>
                  <span className="spec-val">{currentCorridorData.avgSpeed}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Active Trainsets</span>
                  <span className="spec-val">{currentCorridorData.activeTrains} Unit Sets</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">On-Time Dispatches</span>
                  <span className="spec-val">{currentCorridorData.onTimeRate}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Track Variance Index</span>
                  <span className="spec-val">{currentCorridorData.delayIndex}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Trackside Weather</span>
                  <span className="spec-val">{currentCorridorData.weather}</span>
                </div>
              </div>

              <div className="corridor-action-row">
                <Link href="/tracking" className="btn-corridor-track">
                  <span>View Corridor Map & Active GPS Pins</span>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transit Time & Carbon Savings Calculator */}
          <div className="interactive-card calculator-card">
            <div className="card-top-bar">
              <div className="card-heading-group">
                <span className="card-pretitle">INSTANT ESTIMATOR</span>
                <h3 className="card-title">Intermodal Transit & Carbon Calculator</h3>
              </div>
              <span className="calc-accuracy-tag">2026 TARIFF RATES</span>
            </div>

            <form className="calculator-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row-pair">
                <div className="form-group">
                  <label htmlFor="origin-select" className="form-label">Origin Ramp / Hub</label>
                  <select
                    id="origin-select"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="calc-select"
                  >
                    <option value="CHI">Chicago Corwith Ramp (CHI)</option>
                    <option value="LAX">Los Angeles Harbor Yard (LAX)</option>
                    <option value="DFW">Dallas Intermodal Hub (DFW)</option>
                    <option value="EWR">Newark / NY Gateway (EWR)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="destination-select" className="form-label">Destination Ramp / Hub</label>
                  <select
                    id="destination-select"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="calc-select"
                  >
                    <option value="LAX">Los Angeles Harbor Yard (LAX)</option>
                    <option value="CHI">Chicago Corwith Ramp (CHI)</option>
                    <option value="DFW">Dallas Intermodal Hub (DFW)</option>
                    <option value="EWR">Newark / NY Gateway (EWR)</option>
                  </select>
                </div>
              </div>

              <div className="form-row-pair">
                <div className="form-group">
                  <label htmlFor="teu-input" className="form-label">Volume: {teus} Containers (TEU)</label>
                  <input
                    id="teu-input"
                    type="range"
                    min="1"
                    max="80"
                    value={teus}
                    onChange={(e) => setTeus(parseInt(e.target.value, 10))}
                    className="calc-range"
                  />
                  <div className="range-hints">
                    <span>1 TEU</span>
                    <span>40 TEU</span>
                    <span>80 TEU</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Freight Classification</label>
                  <div className="cargo-toggle-group">
                    <button
                      type="button"
                      className={`cargo-toggle-btn ${cargoType === 'dry' ? 'active' : ''}`}
                      onClick={() => setCargoType('dry')}
                    >
                      Dry Freight
                    </button>
                    <button
                      type="button"
                      className={`cargo-toggle-btn ${cargoType === 'reefer' ? 'active' : ''}`}
                      onClick={() => setCargoType('reefer')}
                    >
                      Reefer / Temp
                    </button>
                    <button
                      type="button"
                      className={`cargo-toggle-btn ${cargoType === 'heavy' ? 'active' : ''}`}
                      onClick={() => setCargoType('heavy')}
                    >
                      Heavy Bulk
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculator Results Grid */}
              <div className="calc-results-box">
                <div className="calc-result-item highlight">
                  <span className="res-label">Estimated Transit Time</span>
                  <span className="res-value">{calcResult.hours} <small>Hours</small></span>
                  <span className="res-sub">Door-to-door corridor schedule</span>
                </div>

                <div className="calc-result-item">
                  <span className="res-label">Direct Cost Savings</span>
                  <span className="res-value green">~{calcResult.costSavingsPercent}%</span>
                  <span className="res-sub">Vs. highway team drivers</span>
                </div>

                <div className="calc-result-item">
                  <span className="res-label">Diesel Conserved</span>
                  <span className="res-value">{calcResult.fuelSavedGal.toLocaleString()} <small>Gal</small></span>
                  <span className="res-sub">Reduced fuel burn</span>
                </div>

                <div className="calc-result-item">
                  <span className="res-label">CO₂ Abatement</span>
                  <span className="res-value green">-{calcResult.co2SavedTons} <small>Tons</small></span>
                  <span className="res-sub">Scope 3 reduction credit</span>
                </div>
              </div>

              <div className="calc-footer-btn-row">
                <Link href="/services" className="btn-get-formal-quote">
                  <span>Review Solutions & Lock In Tiered Pricing</span>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

