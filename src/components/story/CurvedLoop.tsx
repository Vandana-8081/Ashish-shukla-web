'use client';

import { useEffect, useId, useRef } from 'react';

/** Text that loops along a gentle curve (inspired by reactbits "Curved Loop"). */
export function CurvedLoop({ text, speed = 0.6 }: { text: string; speed?: number }) {
  const id = useId().replace(/:/g, '');
  const measure = useRef<SVGTextElement>(null);
  const textPath = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const m = measure.current;
    const tp = textPath.current;
    if (!m || !tp) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let offset = 0;
    const start = () => {
      const w = m.getComputedTextLength();
      if (!w) return;
      const loop = () => {
        offset = (offset - speed) % w;
        tp.setAttribute('startOffset', `${offset}`);
        if (!reduce) raf = requestAnimationFrame(loop);
      };
      loop();
    };
    const t = setTimeout(start, 100);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [speed, text]);

  const repeated = text.repeat(8);

  return (
    <div className="w-full overflow-hidden select-none" aria-hidden>
      <svg viewBox="0 0 1440 140" className="w-full h-auto block">
        <text ref={measure} className="font-editorial" style={{ visibility: 'hidden', fontSize: 64 }}>
          {text}
        </text>
        <defs>
          <path id={`curve-${id}`} d="M-100,20 Q720,130 1540,20" fill="none" />
        </defs>
        <text className="font-editorial" fill="currentColor" style={{ fontSize: 64, fontWeight: 600 }}>
          <textPath ref={textPath} href={`#curve-${id}`} startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
