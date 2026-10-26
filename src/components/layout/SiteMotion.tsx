'use client';

import { useEffect } from 'react';

const revealSelector = [
  // Page-level wrappers (`main > *`) are deliberately not animated: they can be
  // thousands of pixels tall, and hiding them until a fraction is visible left
  // whole pages blank when jumping to an #anchor.
  'main section',
  'main article',
  'main [class*="rounded-2xl"][class*="border"][class*="bg-white"]',
  'main [class*="rounded-3xl"][class*="border"][class*="bg-white"]',
].join(', ');

const cardSelector = [
  'main article',
  'main [class*="rounded-2xl"][class*="border"][class*="bg-white"]',
  'main [class*="rounded-3xl"][class*="border"][class*="bg-white"]',
].join(', ');

export function SiteMotion() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Very tall elements (e.g. a whole page wrapper) can never reach a 12%
          // ratio, so also reveal once a quarter of the viewport is covered.
          const coversViewport =
            entry.intersectionRect.height >= window.innerHeight * 0.25;
          if (entry.isIntersecting && (entry.intersectionRatio >= 0.12 || coversViewport)) {
            entry.target.setAttribute('data-site-visible', '');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: [0, 0.01, 0.05, 0.12], rootMargin: '0px 0px -32px 0px' },
    );

    const observeElements = (root: ParentNode) => {
      const elements: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches(revealSelector)) {
        elements.push(root);
      }
      elements.push(...root.querySelectorAll<HTMLElement>(revealSelector));

      elements.forEach((element) => {
        // Blog pages stream from searchParams. Mutating their server-rendered
        // nodes before the segment hydrates causes a React hydration mismatch.
        if (element.closest('[data-site-motion-ignore]')) return;
        if (element.hasAttribute('data-site-motion')) return;

        element.setAttribute('data-site-motion', '');
        if (element.matches(cardSelector)) {
          element.setAttribute('data-site-card', '');
        }
        // Anything already on screen is shown in the same frame it is marked, so
        // it never flashes hidden and fades back in on load or route change.
        const rect = element.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          element.setAttribute('data-site-visible', '');
          return;
        }
        intersectionObserver.observe(element);
      });
    };

    observeElements(document);

    // Failsafe: if the observer has not revealed what is on screen (e.g. after
    // jumping to an #anchor), reveal it so content is never left invisible.
    const revealInViewport = () => {
      document.querySelectorAll<HTMLElement>('[data-site-motion]:not([data-site-visible])').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          el.setAttribute('data-site-visible', '');
          intersectionObserver.unobserve(el);
        }
      });
    };
    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('[data-site-motion]:not([data-site-visible])').forEach((el) => {
        el.setAttribute('data-site-visible', '');
        intersectionObserver.unobserve(el);
      });
    };
    // Last resort for embedded/emulated viewers where observers misbehave: if
    // nothing has been revealed after ~1.5s, show everything instead of
    // leaving the page blank. Normal browsers keep the scroll animation.
    const revealAllTimer = window.setTimeout(() => {
      if (!document.querySelector('[data-site-visible]')) revealAll();
    }, 1500);
    const failsafeTimer = window.setTimeout(revealInViewport, 600);
    window.addEventListener('hashchange', revealInViewport);
    window.addEventListener('scroll', revealInViewport, { passive: true });

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeElements(node);
          }
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(failsafeTimer);
      window.clearTimeout(revealAllTimer);
      window.removeEventListener('hashchange', revealInViewport);
      window.removeEventListener('scroll', revealInViewport);
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
