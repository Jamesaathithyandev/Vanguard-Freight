'use client';

import React, { useEffect, useRef } from 'react';

const CLIP_DURATION = 5.04;
const VIDEO_1080P = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e02bb27f-80d8-445f-a03e-1b609dac4261.mp4';
const VIDEO_720P = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e8eb434f-d097-4b1b-b9e6-c8b46fa43040.mp4';
const POSTER_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5e018553-cb8a-420a-819f-fcdfa08e5df0.jpg';

// Cubic-bezier solver for Recorder mode: cubic-bezier(.45, .05, .55, .95)
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (x: number) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * (1 - t) * (1 - t) * t * p1x + 3 * (1 - t) * t * t * p2x + t * t * t;
      const currentSlope = 3 * (1 - t) * (1 - t) * p1x + 6 * (1 - t) * t * (p2x - p1x) + 3 * t * t * (1 - p2x);
      if (Math.abs(currentX - x) < 1e-5 || Math.abs(currentSlope) < 1e-5) break;
      t -= (currentX - x) / currentSlope;
    }
    t = Math.max(0, Math.min(1, t));
    return 3 * (1 - t) * (1 - t) * t * p1y + 3 * (1 - t) * t * t * p2y + t * t * t;
  };
}
const easeRec = cubicBezier(0.45, 0.05, 0.55, 0.95);

export default function FreightHero() {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneTintRef = useRef<HTMLDivElement>(null);
  const lastBlockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    const sceneTint = sceneTintRef.current;
    const lastBlock = lastBlockRef.current;

    if (!track || !video || !lastBlock) return;

    // Select 720p for screens <= 900px or Save-Data
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isLowRes = window.innerWidth <= 900 || (nav.connection && nav.connection.saveData);
    const targetSrc = isLowRes ? VIDEO_720P : VIDEO_1080P;

    if (!video.src || !video.src.includes(isLowRes ? 'e8eb434f' : 'e02bb27f')) {
      video.src = targetSrc;
      video.load();
    }

    // Decoder priming: HTML5 media engines require an initial playback tick
    // to instantiate the hardware/software video decoding pipeline for scrubbing while paused.
    let primed = false;
    const primeDecoder = () => {
      if (primed) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            primed = true;
            video.removeAttribute('poster');
            updateTargetTimeFromScroll();
          })
          .catch(() => {
            // Handled on first user interaction below
          });
      }
    };

    primeDecoder();
    video.addEventListener('loadeddata', () => {
      primeDecoder();
      updateLayout();
    });
    video.addEventListener('canplay', primeDecoder);

    const onFirstInteraction = () => {
      primeDecoder();
      window.removeEventListener('scroll', onFirstInteraction);
      window.removeEventListener('wheel', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
    window.addEventListener('scroll', onFirstInteraction, { passive: true, once: true });
    window.addEventListener('wheel', onFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', onFirstInteraction, { passive: true, once: true });

    const trackMetrics = {
      lastBlockBottom: 0,
      end: 0,
      trackHeight: 0,
      knee: 0.5,
    };

    function updateLayout() {
      if (!track || !lastBlock) return;
      const vh = window.innerHeight;
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const trackRect = track.getBoundingClientRect();
      const blockRect = lastBlock.getBoundingClientRect();

      const trackTopDoc = trackRect.top + currentScrollY;
      const blockBottomDoc = blockRect.bottom + currentScrollY;

      const lastBlockBottom = Math.max(100, blockBottomDoc - trackTopDoc);
      const end = lastBlockBottom + 0.75 * vh;
      const trackHeight = end + vh;

      trackMetrics.lastBlockBottom = lastBlockBottom;
      trackMetrics.end = end;
      trackMetrics.trackHeight = trackHeight;
      trackMetrics.knee = end > 0 ? lastBlockBottom / end : 0.5;

      track.style.height = `${trackHeight}px`;
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateLayout, 100);
    });

    // Two-part progress mapping:
    // p < knee: clip progress = p / knee * 0.46
    // p >= knee: runs from 0.46 to 1
    function computeClipProgress(p: number, knee: number) {
      const clampedP = Math.max(0, Math.min(1, p));
      if (clampedP < knee) {
        return (clampedP / (knee || 0.001)) * 0.46;
      } else {
        return 0.46 + ((clampedP - knee) / (1 - knee || 0.001)) * 0.54;
      }
    }

    let targetTime = 0;
    let curTime = 0;

    function updateTargetTimeFromScroll() {
      if (!track) return;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const trackTop = track.getBoundingClientRect().top + scrollY;
      const end = trackMetrics.end || 1;
      const p = Math.max(0, Math.min(1, (scrollY - trackTop) / end));
      const clipP = computeClipProgress(p, trackMetrics.knee);
      const duration = video?.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : CLIP_DURATION;
      targetTime = clipP * (duration - 1 / 48);

      // As clouds roll in (clipP > 0.46), fade scene-tint out so clouds remain pure white
      if (sceneTint) {
        if (clipP > 0.46) {
          const fade = Math.max(0, 1 - (clipP - 0.46) / (0.85 - 0.46));
          sceneTint.style.opacity = fade.toFixed(2);
        } else {
          sceneTint.style.opacity = '1';
        }
      }

      // Body background after the track: #e2dedd (cloud grey)
      if (scrollY >= end) {
        document.body.style.backgroundColor = 'var(--cloud-grey)';
        document.documentElement.style.backgroundColor = 'var(--cloud-grey)';
      } else {
        document.body.style.backgroundColor = 'var(--bg-coal)';
        document.documentElement.style.backgroundColor = 'var(--bg-coal)';
      }
    }

    window.addEventListener('scroll', updateTargetTimeFromScroll, { passive: true });

    // Smoothing: each frame, cur += (target - cur) * 0.22
    // Set currentTime only when readyState >= 1, !video.seeking and diff > 1/60s, re-seek on seeked
    let animFrameId: number;
    function scrubLoop() {
      curTime += (targetTime - curTime) * 0.22;
      if (video && video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - curTime) > 1 / 60) {
        try {
          video.currentTime = curTime;
        } catch {
          // ignore seek bounds
        }
      }
      animFrameId = requestAnimationFrame(scrubLoop);
    }
    animFrameId = requestAnimationFrame(scrubLoop);

    const onSeeked = () => {
      if (video && video.readyState >= 1 && Math.abs(video.currentTime - curTime) > 1 / 60) {
        try {
          video.currentTime = curTime;
        } catch {
          // ignore
        }
      }
    };
    video.addEventListener('seeked', onSeeked);

    // Deterministic recorder hook: window.__recTime(video, t)
    (window as unknown as { __recTime: (targetVideo: HTMLVideoElement, tSec: number) => number }).__recTime = function (targetVideo, tSec) {
      updateLayout();
      const totalDuration = 6.5;
      const normT = Math.max(0, Math.min(1, tSec / totalDuration));

      let animProgress = 0;
      if (normT <= 0.03) {
        animProgress = 0;
      } else if (normT >= 0.94) {
        animProgress = 1;
      } else {
        const seg = (normT - 0.03) / (0.94 - 0.03);
        animProgress = easeRec(seg);
      }

      const vh = window.innerHeight;
      const maxScroll = trackMetrics.end + 0.9 * vh;
      const scrollTarget = animProgress * maxScroll;
      window.scrollTo(0, scrollTarget);

      const end = trackMetrics.end || 1;
      const p = Math.max(0, Math.min(1, scrollTarget / end));
      const clipP = computeClipProgress(p, trackMetrics.knee);
      const duration = targetVideo.duration && !isNaN(targetVideo.duration) && targetVideo.duration > 0 ? targetVideo.duration : CLIP_DURATION;
      const resultTime = clipP * (duration - 1 / 48);

      if (sceneTint) {
        if (clipP > 0.46) {
          const fade = Math.max(0, 1 - (clipP - 0.46) / (0.85 - 0.46));
          sceneTint.style.opacity = fade.toFixed(2);
        } else {
          sceneTint.style.opacity = '1';
        }
      }

      if (scrollTarget >= end) {
        document.body.style.backgroundColor = 'var(--cloud-grey)';
        document.documentElement.style.backgroundColor = 'var(--cloud-grey)';
      } else {
        document.body.style.backgroundColor = 'var(--bg-coal)';
        document.documentElement.style.backgroundColor = 'var(--bg-coal)';
      }

      curTime = resultTime;
      targetTime = resultTime;
      if (targetVideo.readyState >= 1) {
        try {
          targetVideo.currentTime = resultTime;
        } catch {
          // ignore
        }
      }
      return resultTime;
    };

    // If URL has ?rec=1, drive progress with the 6.5s animation
    const isRec = new URLSearchParams(window.location.search).get('rec') === '1';
    if (isRec) {
      updateLayout();
      let startTime: number | null = null;
      const runRecAnimation = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = (now - startTime) / 1000;
        const recFn = (window as unknown as { __recTime?: (v: HTMLVideoElement, t: number) => number }).__recTime;
        if (recFn && video) {
          recFn(video, elapsed);
        }
        if (elapsed < 6.5) {
          requestAnimationFrame(runRecAnimation);
        }
      };
      requestAnimationFrame(runRecAnimation);
    }

    const onLoadedMetadata = () => {
      updateLayout();
      updateTargetTimeFromScroll();
    };
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('scroll', updateTargetTimeFromScroll);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  return (
    <>
      {/* Main Scroll Track */}
      <main className="track" ref={trackRef} id="track">
        {/* Sticky aerial train video scene (starts close-up over train) */}
        <div className="scene" id="scene">
          <video
            ref={videoRef}
            id="hero-video"
            className="scene-video"
            playsInline
            muted
            autoPlay
            preload="auto"
            poster={POSTER_URL}
          >
            <source src={VIDEO_1080P} type="video/mp4" media="(min-width: 901px)" />
            <source src={VIDEO_720P} type="video/mp4" />
          </video>
          <div className="scene-tint" ref={sceneTintRef} id="scene-tint" />
        </div>

        {/* Scrolling content layer */}
        <div className="content" id="content">
          {/* Intro Block: top 940/8 vh (enters after 140 design px of scroll) */}
          <header className="intro" id="intro">
            <p className="intro-eyebrow">WHY US</p>
            <h1 className="intro-headline">
              <span>LOGISTICS</span>
              <span>THAT WORKS</span>
              <span>AS HARD AS</span>
              <span>YOU DO.</span>
            </h1>
          </header>

          {/* Features container */}
          <div className="features-wrapper" id="features-wrapper">
            {/* Row 1 Left: One point of contact */}
            <article className="feature-block feature-row-1 feature-r1-left" id="feature-1">
              <div className="feature-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="21" stroke="#F9F9F9" strokeWidth="2" strokeDasharray="3 3.5" opacity="0.85" />
                  <circle cx="24" cy="24" r="14" stroke="#F9F9F9" strokeWidth="2.2" fill="none" />
                  <ellipse cx="24" cy="24" rx="7.5" ry="14" stroke="#F9F9F9" strokeWidth="1.8" />
                  <line x1="10" y1="24" x2="38" y2="24" stroke="#F9F9F9" strokeWidth="1.8" />
                  <line x1="13" y1="17.5" x2="35" y2="17.5" stroke="#F9F9F9" strokeWidth="1.4" opacity="0.8" />
                  <line x1="13" y1="30.5" x2="35" y2="30.5" stroke="#F9F9F9" strokeWidth="1.4" opacity="0.8" />
                  <circle cx="24" cy="24" r="2.4" fill="#F9F9F9" />
                </svg>
              </div>
              <h2 className="feature-title">
                ONE POINT
                <br />
                OF CONTACT
              </h2>
              <p className="feature-body">
                No more chasing multiple vendors. One
                <br />
                team manages your entire end-to-end flow,
                <br />
                origin to destination.
              </p>
            </article>

            {/* Row 1 Right: Full supply chain visibility */}
            <article className="feature-block feature-row-1 feature-r1-right" id="feature-2">
              <div className="feature-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 29L15 23L25 29L15 35L5 29Z" fill="#F9F9F9" fillOpacity="0.95" />
                  <path d="M5 29L15 35V42L5 36V29Z" fill="#D4D4D4" />
                  <path d="M15 35L25 29V36L15 42V35Z" fill="#ACACAC" />
                  <path d="M16 19L26 13L36 19L26 25L16 19Z" fill="#FFFFFF" />
                  <path d="M16 19L26 25V32L16 26V19Z" fill="#DCDCDC" />
                  <path d="M26 25L36 19V26L26 32V25Z" fill="#B4B4B4" />
                  <path d="M27 9L37 3L47 9L37 15L27 9Z" fill="#FFFFFF" />
                  <path d="M27 9L37 15V22L27 16V9Z" fill="#E8E8E8" />
                  <path d="M37 15L47 9V16L37 22V15Z" fill="#C0C0C0" />
                </svg>
              </div>
              <h2 className="feature-title">
                FULL SUPPLY
                <br />
                CHAIN VISIBILITY
              </h2>
              <p className="feature-body">
                Track your freight in real time and get
                <br />
                proactive updates before issues become
                <br />
                delays.
              </p>
            </article>

            {/* Row 2 Left: Compliance you can trust */}
            <article className="feature-block feature-row-2 feature-r2-left" id="feature-3">
              <div className="feature-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="21" stroke="#F9F9F9" strokeWidth="2" strokeDasharray="3 3.5" opacity="0.85" />
                  <circle cx="24" cy="24" r="14" fill="#F9F9F9" />
                  <path d="M17.5 24.5L22 29L30.5 19.5" stroke="#0a0b0c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="feature-title">
                COMPLIANCE
                <br />
                YOU CAN TRUST
              </h2>
              <p className="feature-body">
                Licensed customs brokers keep your
                <br />
                shipments moving within every regulatory
                <br />
                requirement, border to border.
              </p>
            </article>

            {/* Row 2 Right: Competitive, transparent pricing */}
            <article className="feature-block feature-row-2 feature-r2-right" id="feature-4">
              <div className="feature-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 5V43M16.5 14.5C16.5 10.5 19.5 8 24 8C28.5 8 32 10.5 32 14.5C32 21.5 16 21 16 29C16 33.5 19.5 36 24 36C29 36 32.5 33 32.5 29" stroke="#F9F9F9" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="feature-title">
                COMPETITIVE,
                <br />
                TRANSPARENT PRICING
              </h2>
              <p className="feature-body">
                No hidden fees. Clear, competitive pricing
                <br />
                backed by responsive sales support
                <br />
                throughout the shipment.
              </p>
            </article>

            {/* Row 3 Centred: Fast issue resolution */}
            <article className="feature-block feature-row-3" ref={lastBlockRef} id="feature-5">
              <div className="feature-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 13L24 24L13 35" stroke="#F9F9F9" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25 13L36 24L25 35" stroke="#F9F9F9" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="feature-title">
                FAST ISSUE
                <br />
                RESOLUTION
              </h2>
              <p className="feature-body">
                When something unexpected happens, we
                <br />
                do not point fingers, we solve it. Our team
                <br />
                acts at once to protect your timeline.
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* After the clouds: Testimonial Section (text only) */}
      <section className="trust" id="testimonials">
        <div className="trust-container">
          {/* Header */}
          <header className="trust-header">
            <h2 className="trust-title">
              <span>TRUSTED</span>
              <span>BY BUSINESSES</span>
              <span className="title-grey">ACROSS THE REGION</span>
            </h2>
            <p className="trust-note">
              From first-time importers to high-volume shippers, our customers stay because every consignment is treated like it matters.
            </p>
          </header>

          {/* Quotes */}
          <ul className="trust-quotes">
            <li className="trust-quote-row">
              <div className="quote-author">
                <strong className="quote-name">Thomas Reid</strong>
                <span className="quote-role">Director, Harbour Fit Group</span>
              </div>
              <blockquote className="quote-text">
                &ldquo;My business would not function without this team. They treat every consignment on its own merits, and our account managers know our business well enough to answer before we ask. We have never had that from a bigger carrier.&rdquo;
              </blockquote>
            </li>

            <li className="trust-quote-row">
              <div className="quote-author">
                <strong className="quote-name">Ana Park</strong>
                <span className="quote-role">Supply Chain Lead, Northline Projects</span>
              </div>
              <blockquote className="quote-text">
                &ldquo;As a first-time shipper on a major infrastructure job, we were in unfamiliar territory. They planned the whole route with us, flagged every risk early, and our first delivery reached site on the day they promised.&rdquo;
              </blockquote>
            </li>

            <li className="trust-quote-row">
              <div className="quote-author">
                <strong className="quote-name">Liam Carter</strong>
                <span className="quote-role">Operations Manager, Coastline Foods</span>
              </div>
              <blockquote className="quote-text">
                &ldquo;One contact, one dashboard, no surprises. When a vessel slipped two days, we heard about it before our customers did, and the new plan was already in place.&rdquo;
              </blockquote>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
