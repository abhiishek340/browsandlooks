'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/components/motion/gsap';
import styles from './ServiceMarquee.module.css';

const WORDS = ['Threading', 'Brows', 'Lashes', 'Nails', 'Waxing'];

/** A slow editorial ribbon of the treatments. Drifts continuously, leans into the
 *  scroll a little, pauses off screen, and stands still for reduced motion. */
export function ServiceMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector('[data-track]');
        const loop = gsap.to(track, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 });
        const boost = gsap.quickTo(loop, 'timeScale', { duration: 0.6, ease: 'power2.out' });
        // One restartable settle timer — eases back to cruising speed once scrolling stops
        const settle = gsap.delayedCall(0.25, () => boost(1)).pause();
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
            boost(1 + v);
            settle.restart(true);
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const run = (hidden: boolean) =>
    WORDS.map((w) => (
      <span key={`${w}-${hidden}`} className={styles.item} aria-hidden={hidden || undefined}>
        <span className={styles.word}>{w}</span>
        <span className={styles.dot} aria-hidden="true" />
      </span>
    ));

  return (
    <div ref={root} className={styles.marquee} role="presentation">
      <div className={styles.track} data-track aria-hidden="true">
        {run(false)}
        {run(true)}
        {run(true)}
        {run(true)}
      </div>
    </div>
  );
}
