'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const EASE = 'power3.out';
export const REDUCED = '(prefers-reduced-motion: reduce)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** Tell the boot watchdog that motion code mounted, so pre-hidden content stays under our control. */
export function markMotionReady() {
  (window as unknown as { __blMotion?: boolean }).__blMotion = true;
}

/** Split a heading into masked lines and raise them into place; the split is reverted afterwards
 *  so the text reflows naturally on resize. Resolves when finished. */
export function riseLines(el: Element, opts: { delay?: number; duration?: number } = {}) {
  gsap.set(el, { opacity: 1 });
  const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
  return gsap.from(split.lines, {
    yPercent: 110,
    duration: opts.duration ?? 1.05,
    delay: opts.delay ?? 0,
    ease: 'power4.out',
    stagger: 0.09,
    onComplete: () => split.revert(),
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
