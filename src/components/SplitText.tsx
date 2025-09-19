"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.1
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    // Set initial state
    gsap.set(chars, {
      y: 100,
      opacity: 0,
      rotationX: -90
    });

    // Animate in
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      stagger,
      delay,
      ease: "back.out(1.7)"
    });

  }, [children, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}