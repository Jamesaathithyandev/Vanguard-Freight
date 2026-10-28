'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [statusMsg, setStatusMsg] = useState('CONNECTING TO MAINLINE DISPATCH...');

  useEffect(() => {
    // Reset scroll to top while loading
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const duration = 2400; // 2.4 seconds total countup
    const startTime = performance.now();

    let frameId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth custom easing that accelerates then settles at 100
      let currentVal: number;
      if (rawProgress < 0.6) {
        currentVal = Math.round((rawProgress / 0.6) * 65);
      } else if (rawProgress < 0.9) {
        currentVal = Math.round(65 + ((rawProgress - 0.6) / 0.3) * 30);
      } else {
        currentVal = Math.round(95 + ((rawProgress - 0.9) / 0.1) * 5);
      }

      currentVal = Math.min(100, Math.max(0, currentVal));
      setProgress(currentVal);

      // Dynamic telemetry messages as progress climbs
      if (currentVal < 28) {
        setStatusMsg('CONNECTING TO MAINLINE DISPATCH & INTERCHANGES...');
      } else if (currentVal < 62) {
        setStatusMsg('CALIBRATING TRACK SENSORS & OPTICAL DETECTORS...');
      } else if (currentVal < 88) {
        setStatusMsg('SYNCING INTERMODAL CORRIDOR TIMETABLES...');
      } else if (currentVal < 100) {
        setStatusMsg('INITIALIZING AERIAL TOP-DOWN CAMERA CLIMB...');
      } else {
        setStatusMsg('ALL SYSTEMS NOMINAL • ENTERING NETWORK');
      }

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setStatusMsg('ALL SYSTEMS NOMINAL • ENTERING NETWORK');

        // Hold at 100% for 400ms so user clearly sees 100%
        setTimeout(() => {
          setFading(true);
          // Wait for fade transition then remove from DOM
          setTimeout(() => {
            setHidden(true);
          }, 700);
        }, 400);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (hidden) return null;

  return (
    <div className={`initial-loader-overlay ${fading ? 'loader-fade-out' : ''}`}>
      <div className="loader-central-box">
        {/* Animated Brand Locomotive Emblem */}
        <div className="loader-emblem">
          <svg viewBox="0 0 24 24" fill="none" className="loader-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 14V8.5C4 7.12 5.12 6 6.5 6H17.5C18.88 6 20 7.12 20 8.5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 14H22V17.5C22 18.05 21.55 18.5 21 18.5H3C2.45 18.5 2 18.05 2 17.5V14Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
            <circle cx="7" cy="14" r="1.5" fill="currentColor" />
            <circle cx="17" cy="14" r="1.5" fill="currentColor" />
            <line x1="8" y1="9.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="21" x2="8" y2="18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="21" x2="16" y2="18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Name */}
        <h2 className="loader-brand-title">VANGUARD</h2>
        <span className="loader-brand-sub">FREIGHT SYSTEMS • CLASS 1 RAIL LOGISTICS</span>

        {/* Big Bold 0 to 100 Counter */}
        <div className="loader-big-counter-box">
          <span className="loader-big-num">{progress}</span>
          <span className="loader-big-percent">%</span>
        </div>

        {/* Progress Track with Glowing Pulse */}
        <div className="loader-progress-track">
          <div
            className="loader-progress-bar"
            style={{ width: `${progress}%` }}
          >
            <div className="loader-bar-head-glow" />
          </div>
        </div>

        {/* Telemetry Status Line */}
        <div className="loader-status-text">
          <span className="status-indicator-dot" />
          <span>{statusMsg}</span>
        </div>
      </div>
    </div>
  );
}
