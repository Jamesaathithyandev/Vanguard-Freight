'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 850,
  blur = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'none';
    switch (direction) {
      case 'up':
        return 'translateY(32px) scale(0.98)';
      case 'down':
        return 'translateY(-32px) scale(0.98)';
      case 'left':
        return 'translateX(32px) scale(0.98)';
      case 'right':
        return 'translateX(-32px) scale(0.98)';
      default:
        return 'scale(0.96)';
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${className} ${isVisible ? 'is-revealed' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : 'none',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
