'use client';

import React, { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export interface ResponsiveLineSplitProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  once?: boolean;
  start?: string;
}

/**
 * ResponsiveLineSplit
 * Recreates the official GSAP "Responsive line splits on scroll" demo:
 * - Dynamically splits text lines with GSAP SplitText.
 * - Wraps each line in an overflow-hidden mask.
 * - Slides lines up with smooth power3.out easing as you scroll.
 * - Re-splits cleanly on window resize and font load for 100% responsiveness.
 */
export function ResponsiveLineSplit({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.1,
  scrollTrigger = true,
  once = false,
  start = 'top 85%',
}: ResponsiveLineSplitProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (el.hasAttribute('data-no-split') || el.closest('[data-no-split]') || el.closest('.hero-section')) {
      return;
    }

    let splitInstance: SplitText | null = null;
    let anim: gsap.core.Tween | null = null;
    let isDisposed = false;

    const setup = () => {
      if (isDisposed || !containerRef.current) return;

      // Clean up previous instance
      if (anim) {
        anim.kill();
        anim = null;
      }
      if (splitInstance) {
        try {
          splitInstance.revert();
        } catch {
          // ignore
        }
        splitInstance = null;
      }

      try {
        splitInstance = new SplitText(el, {
          type: 'lines',
          linesClass: 'split-line-child',
        });

        if (!splitInstance.lines || splitInstance.lines.length === 0) {
          return;
        }

        // Wrap each line in a mask container for clean overflow clipping with ample room for accents/matras
        const lineMasks: HTMLElement[] = [];
        splitInstance.lines.forEach((line) => {
          const mask = document.createElement('div');
          mask.className = 'split-line-mask';
          mask.style.overflow = 'hidden';
          mask.style.display = 'block';
          mask.style.paddingTop = '0.22em';
          mask.style.marginTop = '-0.22em';
          mask.style.paddingBottom = '0.28em';
          mask.style.marginBottom = '-0.28em';
          line.parentNode?.insertBefore(mask, line);
          mask.appendChild(line);
          lineMasks.push(mask);
        });

        const animConfig: gsap.TweenVars = {
          yPercent: 115,
          opacity: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          onComplete: () => {
            lineMasks.forEach((m) => {
              m.style.overflow = 'visible';
            });
          },
        };

        if (scrollTrigger) {
          animConfig.scrollTrigger = {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            once,
          };
        }

        anim = gsap.from(splitInstance.lines, animConfig);
      } catch (err) {
        console.warn('ResponsiveLineSplit notice:', err);
      }
    };

    // Run setup immediately
    setup();

    // Also run setup when fonts finish loading to re-measure exact line breaks
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isDisposed) setup();
      });
    }

    // Debounce resize to reflow text lines seamlessly across device widths
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isDisposed) {
          ScrollTrigger.refresh();
          setup();
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (anim) anim.kill();
      if (splitInstance) {
        try {
          splitInstance.revert();
        } catch {
          // ignore
        }
      }
    };
  }, [children, delay, duration, stagger, scrollTrigger, once, start]);

  return (
    <Component ref={containerRef} data-split-handled="true" className={className}>
      {children}
    </Component>
  );
}
