'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from './gsap';
import styles from './ThreadAccent.module.css';

type Props = {
  /** One or more path definitions drawn in sequence */
  paths: string[];
  viewBox: string;
  preserveAspectRatio?: string;
  className?: string;
  /** scroll: scrubbed with scroll position; enter: draws once when visible */
  mode: 'scroll' | 'enter';
  tone?: 'brass' | 'ivory' | 'oxblood';
  strokeWidth?: number;
};

/** The signature fine thread. Decorative only: hidden from assistive tech and pointer events. */
export function ThreadAccent({ paths, viewBox, preserveAspectRatio = 'xMidYMid meet', className, mode, tone = 'brass', strokeWidth = 1 }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = gsap.utils.toArray<SVGPathElement>('path', ref.current);
        gsap.set(els, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger:
            mode === 'scroll'
              ? { trigger: ref.current, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 }
              : { trigger: ref.current, start: 'top 80%', once: true },
        });
        els.forEach((p, i) =>
          tl.to(p, { strokeDashoffset: 0, duration: mode === 'enter' ? 1.1 : 1, ease: mode === 'enter' ? 'power2.inOut' : 'none' }, i === 0 ? 0 : '>-0.15'),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={[styles.thread, styles[tone], className].filter(Boolean).join(' ')}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} fill="none" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      ))}
    </svg>
  );
}
