# Multi-Page Website Playbook: From MotionSites to Production

> **A reusable, step-by-step workflow guide to transform any scroll-driven motion template into a clean, professional, multi-page business website.**

---

## The 8-Step Blueprint

```
[Phase 1] Base Prototype ──▶ [Phase 2] Convert to Next.js ──▶ [Phase 3] 3-Page Multi-Page Structure
                                                                        │
┌───────────────────────────────────────────────────────────────────────┘
▼
[Phase 4] Floating Navbar ──▶ [Phase 5] 0–100 Loading Screen ──▶ [Phase 6] Photo Generation & Placement
                                                                          │
┌─────────────────────────────────────────────────────────────────────────┘
▼
[Phase 7] Smooth Animations & Interactive Elements ──▶ [Phase 8] Final Polish & Verification
```

---

### Step 1: Base Prototype Setup
1. **Extract Template Specs**:
   - Grab the video clip (1080p and 720p fallback for mobile) and poster frame from your motion prompt.
   - Note down the primary colors, headline typography, and key scrolling blocks.
2. **Build Single-File Prototype**:
   - Create a sticky full-viewport `<video>` container behind an absolute scrolling layer.
   - Wire up scroll-to-video scrubbing in JavaScript so scrolling down plays the animation forward and scrolling up reverses it.
3. **Verify Locally**:
   - Host locally and test that scrolling scrubs the video smoothly without stutter or black screen.

---

### Step 2: Convert to Next.js
1. **Set Up Next.js Project**:
   - Initialize a Next.js App Router project with TypeScript and clean CSS tokens.
2. **Componentize the Hero**:
   - Move the scroll-driven video engine into a dedicated client component (e.g., `FreightHero.tsx` or `MotionHero.tsx`).
   - Use `'use client'` on components that interact with scroll events and DOM elements.
3. **Run Dev Server**:
   - Run `npm run dev` and ensure the base page renders cleanly on `http://localhost:3000`.

---

### Step 3: Expand into a 3-Page Structure
Instead of a single landing page or web app, structure the site as a complete corporate presence across 3 pages:
1. **Home / Overview (`/`)**:
   - Initial loading screen.
   - The sticky scroll-driven hero experience.
   - Seamless transition into customer proof / testimonials.
   - Key business scale metrics, core industry sectors, and contact inquiry form.
2. **Services / Solutions (`/services`)**:
   - Dedicated hero section with editorial background image.
   - Interactive service switcher (tabs with matching photography, specifications, and SLAs).
   - Real-world client case studies with concrete metrics.
   - Directory / network of facilities, terminals, or service hubs.
3. **About Us (`/about`)**:
   - Corporate heritage hero with background image.
   - Interactive milestone timeline across different eras/decades.
   - Visual breakdown of equipment, infrastructure, or technical engineering.
   - Executive leadership profiles.
   - Expandable FAQ / governance accordion.

---

### Step 4: Floating Capsule Navigation (Aero-Dock)
1. **Floating Design**:
   - Make the navbar a compact, floating capsule dock with rounded pill borders and frosted glass background (`backdrop-filter: blur(24px)`).
   - Place it fixed at the top center with `pointer-events: none` on the outer wrapper so it never letterboxes or blocks the hero video underneath.
2. **Keep it Clean**:
   - Only include the company logo and the 3 page links (**Overview**, **Services**, **About Us**).
   - Avoid SaaS clutter like live status beacons, track buttons, or app badges.
3. **Add Mobile Menu**:
   - Include a mobile hamburger toggle that opens a clean floating drawer on smaller screens.

---

### Step 5: Initial 0-to-100 Loading Screen
1. **Create the Loader Component**:
   - Mount a full-screen dark overlay before the home page content displays.
   - Include a pulsing brand logo/emblem, company name, and subtitle.
2. **Add 0 to 100 Counter**:
   - A bold, prominent number counter counting from `0%` to `100%`.
   - A linear progress bar with a glowing leading-edge dot that tracks the progress.
   - Dynamic status lines that update as the progress advances (e.g. *Connecting dispatch...*, *Calibrating systems...*, *Ready*).
3. **Smooth Exit**:
   - Pause briefly at 100% so the user registers completion.
   - Scale up slightly (`scale(1.02)`) and fade out (`opacity: 0`) smoothly into the page.

---

### Step 6: Generate & Place Authentic Photos
Avoid empty CSS boxes or generic icons by generating high-resolution, realistic editorial photography tailored to your industry:

1. **Where to Place Photos**:
   - **Services Hero**: Wide atmospheric hero background with a dark gradient overlay so text remains readable.
   - **About Hero**: Dramatic landscape or operations scene matching the company's domain.
   - **Service Modality Tabs**: Dedicated photos for each individual service or product offering.
   - **Key Feature Banner**: A dramatic photo embedded behind key mission cards (e.g., Sustainability / ESG).
   - **Engineering / Infrastructure Cards**: Close-up detail photos showing equipment, hardware, or technical craftsmanship.
2. **Photo Hover Animations**:
   - Wrap images in containers with `overflow: hidden`.
   - Add smooth zoom on hover: `transform: scale(1.04)` over `0.8s cubic-bezier(0.16, 1, 0.3, 1)`.
   - Add dark gradient overlays at the bottom of photos with crisp white captions.

---

### Step 7: Professional Animations & Interactive Polish
To make the site feel deeply attractive, dynamic, and human-crafted:

1. **Blur-Dissolve Scroll Reveals**:
   - Wrap cards, headers, and grids in a `ScrollReveal` component using `IntersectionObserver`.
   - Combine opacity, upward translation, and a soft blur dissolve (`filter: blur(8px) -> blur(0); scale(0.98) -> scale(1)`) using `cubic-bezier(0.16, 1, 0.3, 1)` for an Apple/Linear-grade entrance.
2. **Animated Number Counters**:
   - When key metric cards scroll into the viewport, animate numbers rolling up smoothly from `0` to their final values (e.g. `0` -> `14,200+`, `0%` -> `99.4%`) using an easing curve.
3. **Ken Burns Photographic Breathing**:
   - Add a slow, subtle zoom/pan animation (`scale(1.02) -> scale(1.07)` over 24–30s) to background hero photos to give them a cinematic film feel.
4. **Interactive Tab Cross-Fades**:
   - When switching between service/feature tabs, apply a key-driven cross-fade (`opacity: 0, translateY(14px) -> opacity: 1, translateY(0)`) so photos and specs transition seamlessly without layout jumping.
   - Add a glowing indicator bar that marks the currently active tab.
5. **Button Shimmer Light Sweep**:
   - Add a diagonal white gradient sheen to primary action buttons that sweeps across the button on hover (`left: -70% -> 140%`).
   - Animate directional arrows to slide forward smoothly (`transform: translateX(5px)`).
6. **Card Hover Elevations & Spotlight Glow**:
   - Give cards a subtle lift (`translateY(-5px)`), deepen their drop shadows, and animate a colored top-accent line expanding from `36px` to `100%` on hover.
   - Add an ambient colored backlight behind featured product/equipment photos that illuminates on hover.
7. **Connected Milestone Timeline**:
   - Draw an illuminated dashed track line behind timeline/milestone buttons that visually connects the eras.
   - Give active milestones glowing tags and animated icon pulses.
8. **Fluid FAQ Accordion with Rotating Icon**:
   - Expand and collapse answers using CSS grid interpolation (`grid-template-rows: 0fr -> 1fr`) for jitter-free height animation.
   - Rotate the toggle icon 45 degrees (`rotate(45deg)`) smoothly when expanding.
9. **Navbar Ambient Sheen**:
   - Run a subtle periodic light sheen across the floating capsule dock's border (`dockBorderSheen`) to keep the navigation feeling alive and premium.

---

### Step 8: Corporate Footer & Final Check
1. **Build a Complete Corporate Footer**:
   - Live operations banner (inquiries phone, headquarters location, corporate email).
   - Organized columns for Solutions, Company Governance, and Newsletter Briefings.
   - Industry certification badges (e.g., ISO, safety alliances, partner seals).
   - Legal copyright bar with terms, privacy policy, and regulatory links.
2. **Review & Test**:
   - Verify all 3 pages load instantly and navigate smoothly.
   - Test that the initial loader runs cleanly from 0 to 100.
   - Check responsiveness on desktop, tablet, and mobile screens.

---

## Quick Reference Checklist for Next Project

- [ ] Sticky video hero setup with scroll scrub loop
- [ ] Converted to Next.js App Router (`/`, `/services`, `/about`)
- [ ] Compact floating navbar (no background blocking) + border shimmer sheen
- [ ] 0-to-100 animated loading screen on initial load
- [ ] High-res photos generated for heroes, service cards, and feature banners
- [ ] Blur-dissolve scroll-reveals (`filter: blur(8px) -> blur(0); scale(0.98) -> scale(1)`)
- [ ] Animated number counters on key metrics (0 -> final value on scroll)
- [ ] Ken Burns slow breathing zoom on background photos
- [ ] Button shimmer sweeps and sliding arrow icons
- [ ] Interactive tab cross-fades with ambient photo backlights
- [ ] Connected timeline rail track and rotating accordion toggles
- [ ] Realistic, authoritative industry copy (no generic AI filler)
- [ ] Complete corporate footer with certifications and contact info
"# Vanguard-Freight-Website" 
