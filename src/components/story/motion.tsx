'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Fade + rise on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const M = motion[as];
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </M>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

/** Grid/list whose direct <Item> children rise in one after another. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={rise} className={className}>
      {children}
    </motion.div>
  );
}

/** Photograph in a rounded frame that tilts in 3D towards the cursor and drifts on scroll. */
export function TiltImage({
  src,
  alt,
  className = '',
  sizes = '(max-width:1024px) 100vw, 46vw',
  position = 'object-top',
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  position?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={`image-frame will-change-transform ${className}`}
    >
      <motion.div style={{ y: drift }} className="absolute inset-[-8%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${position}`} />
      </motion.div>
    </motion.div>
  );
}

/** Thin progress bar that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0 50%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-[var(--saffron)]"
    />
  );
}

/** Background image with a slow parallax drift (used on dark banner sections). */
export function ParallaxBg({ src, overlay = 'linear-gradient(90deg,rgba(13,28,40,.9),rgba(13,28,40,.5))' }: { src: string; overlay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%]">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
