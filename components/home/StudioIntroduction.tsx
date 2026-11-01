'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { gsap, useGSAP, MOTION_OK } from '@/components/motion/gsap';
import { media } from '@/content/media';
import styles from './StudioIntroduction.module.css';

/** Signature sequence 3: the studio photograph opens from an inset frame to the full section
 * width as it scrolls through, while the surface warms from ivory to parchment. No pinning. */
export function StudioIntroduction() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '[data-studio-wide]', start: 'top 85%', end: 'center 45%', scrub: 0.8 },
        });
        tl.fromTo('[data-studio-wide]', { clipPath: 'inset(0% 18% 0% 18%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
          .fromTo('[data-studio-wide] img', { scale: 1.12 }, { scale: 1, ease: 'none' }, 0)
          .fromTo(root.current, { backgroundColor: '#f7f2ea' }, { backgroundColor: '#e8ded2', ease: 'none' }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const wide = media.studioRoom;
  const detail = media.studioArch;

  return (
    <section ref={root} className={styles.section} aria-labelledby="studio-title">
      <div className={`container ${styles.head}`}>
        <SectionLabel>The studio</SectionLabel>
        <h2 id="studio-title" className={`display ${styles.title}`} data-split>
          A calm room. <em>An unhurried hour.</em>
        </h2>
      </div>

      <div className={styles.wideWrap}>
        <div className={styles.wide} data-studio-wide>
          <Image src={wide.src} alt={wide.alt} fill sizes="100vw" quality={80} className={styles.img} style={{ objectPosition: wide.focal.desktop }} />
        </div>
      </div>

      <div className={`container ${styles.pair}`}>
        <div className={styles.detailFrame}>
          <div className={styles.detail} data-image-reveal>
            <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 1024px) 26vw, 60vw" quality={80} className={styles.img} />
          </div>
        </div>
        <div className={styles.copy} data-reveal>
          <p className={styles.lead}>
            Every appointment is given its own time, so nothing about your visit feels rushed.
          </p>
          <p>
            The studio is designed as a quiet place to sit back for a moment: soft light, clean surfaces and a chair
            that is ready for you when you arrive.
          </p>
          <TextLink href="/the-studio">Inside the studio</TextLink>
        </div>
      </div>
    </section>
  );
}
