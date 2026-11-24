'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * LineSplitScrollManager
 * Global controller that finds all headings and editorial titles across the ENTIRE website
 * and applies the GSAP "Responsive line splits on scroll" animation.
 * Re-runs on page navigation, font load, and window resize.
 */
export function LineSplitScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isDisposed = false;
    const splitInstances: SplitText[] = [];
    const scrollTriggers: ScrollTrigger[] = [];

    const initAll = () => {
      if (isDisposed) return;

      // 1. Clean up any previous animations and splits
      scrollTriggers.forEach((st) => st.kill());
      scrollTriggers.length = 0;
      splitInstances.forEach((s) => {
        try {
          s.revert();
        } catch {
          // ignore
        }
      });
      splitInstances.length = 0;

      // 2. Query all major headings and editorial titles across the current page
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          'main h1:not([data-no-split]), main h2:not([data-no-split]), main .ed-title, main .ed-h2, main .ed-display, [data-split-scroll], .split-line-scroll'
        )
      );

      candidates.forEach((target) => {
        // Skip elements that are explicitly marked no-split, hero section, or already handled
        if (
          target.hasAttribute('data-no-split') ||
          target.closest('[data-no-split]') ||
          target.closest('.hero-section') ||
          target.hasAttribute('data-split-handled') ||
          target.closest('[data-split-handled]') ||
          target.querySelector('.split-line-mask') ||
          target.closest('.split-line-mask')
        ) {
          return;
        }

        // Skip empty or hidden elements
        const text = target.textContent?.trim();
        if (!text || text.length === 0) return;

        // Skip interactive inputs or form controls
        if (target.matches('input, textarea, button, select')) return;

        try {
          target.setAttribute('data-split-handled', 'true');

          const split = new SplitText(target, {
            type: 'lines',
            linesClass: 'split-line-child',
          });

          if (!split.lines || split.lines.length === 0) {
            target.removeAttribute('data-split-handled');
            return;
          }

          splitInstances.push(split);

          // Wrap each line in an overflow:hidden mask container with ample room for accents/matras
          const lineMasks: HTMLElement[] = [];
          split.lines.forEach((line) => {
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

          // Check if element is above the fold (within initial viewport)
          const rect = target.getBoundingClientRect();
          const isAboveFold = rect.top < window.innerHeight * 0.7;

          const st = ScrollTrigger.create({
            trigger: target,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
            animation: gsap.from(split.lines, {
              yPercent: 115,
              opacity: 0,
              duration: 1.05,
              stagger: 0.1,
              ease: 'power3.out',
              delay: isAboveFold ? 0.2 : 0,
              onComplete: () => {
                lineMasks.forEach((m) => {
                  m.style.overflow = 'visible';
                });
              },
            }),
          });

          scrollTriggers.push(st);
        } catch (err) {
          console.warn('LineSplitScrollManager init error:', err);
          target.removeAttribute('data-split-handled');
        }
      });
    };

    // Small delay to allow Next.js route DOM hydration
    const timer = setTimeout(() => {
      initAll();
    }, 100);

    // Also run when custom fonts (Garamond, Rozha One) finish loading to reflow exact lines
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isDisposed) {
          initAll();
        }
      });
    }

    // Debounced window resize handler for 100% responsiveness
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isDisposed) {
          ScrollTrigger.refresh();
          initAll();
        }
      }, 200);
    };

    window.addEventListener('resize', onResize);

    return () => {
      isDisposed = true;
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      scrollTriggers.forEach((st) => st.kill());
      splitInstances.forEach((s) => {
        try {
          s.revert();
        } catch {
          // ignore
        }
      });
      // Remove handled markers so future navigations can re-initialize cleanly
      document.querySelectorAll('[data-split-handled]').forEach((el) => {
        el.removeAttribute('data-split-handled');
      });
    };
  }, [pathname]);

  return null;
}
