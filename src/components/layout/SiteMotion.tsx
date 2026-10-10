'use client';

import { useEffect } from 'react';

const revealSelector = [
  // Do not mutate the streamed route root (often a <main>) before React has
  // hydrated it. Next can deliver this element after this observer starts.
  'main > *:not(main)',
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
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-site-visible', '');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
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
        intersectionObserver.observe(element);
      });
    };

    observeElements(document);

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
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
