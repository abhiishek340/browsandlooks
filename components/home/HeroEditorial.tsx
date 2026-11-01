'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { BookButton } from '@/components/ui/BookButton';
import { TextLink } from '@/components/ui/TextLink';
import { gsap, useGSAP, markMotionReady, MOTION_OK } from '@/components/motion/gsap';
import { media } from '@/content/media';
import styles from './HeroEditorial.module.css';

/* Thread geometry is drawn in the portrait's own pixel space (2400 × 3605),
   so it stays registered to the photograph at every size. It rises from the
   copy side, makes one twisted loop in open space — the way a threading loop
   is held taut — then sweeps across the backdrop and fades as it meets the
   tail of the brow. */
const THREAD_IN = 'M -960 600 C -900 460 -820 330 -700 300';
const TWIST_A = 'M -700 300 Q -658 270 -610 287 T -520 275 T -430 262';
const TWIST_B = 'M -700 300 Q -652 318 -610 287 T -520 275 T -430 262';
const THREAD_OUT = 'M -430 262 C -230 230 0 300 220 400 C 380 470 520 540 630 585';

const { heroPortrait: portrait, heroNails: nails } = media;

export function HeroEditorial() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      markMotionReady();
      const html = document.documentElement;
      const mm = gsap.matchMedia();

      // Depth: the manicure card rises a little faster than the page as the hero scrolls away
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        gsap.to('[data-hero-card]', {
          y: -36,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      if (html.classList.contains('intro-seen')) return () => mm.revert();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => root.current?.classList.add(styles.settled!),
        });

        // fromTo renders its start state immediately, so the CSS pre-hide can be released now
        tl.fromTo(q('[data-hero-fade]'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.12 }, 0)
          // y: 0 discards the stylesheet's pre-hide translate, which GSAP would otherwise keep as a pixel offset
          .fromTo(q('[data-hero-line]'), { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 0.95, ease: 'power4.out', stagger: 0.1 }, 0.05)
          .fromTo(q('[data-hero-media]'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.inOut', stagger: 0.28, clearProps: 'clipPath' }, 0.08)
          .fromTo(q('[data-hero-media] img'), { scale: 1.06 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0.1)
          .fromTo(q('[data-hero-thread]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 1, duration: 0 }, 0)
          .to(q('[data-thread-in]'), { strokeDashoffset: 0, duration: 0.32, ease: 'power1.in' }, 0.5)
          .to(q('[data-thread-twist]'), { strokeDashoffset: 0, duration: 0.24, ease: 'none' }, '>')
          .to(q('[data-thread-out]'), { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, '>');

        html.classList.add('intro-seen');
        try {
          sessionStorage.setItem('bl-intro', '1');
        } catch {}
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const style = { '--focal-desktop': portrait.focal.desktop, '--focal-mobile': portrait.focal.mobile } as React.CSSProperties;

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`label ${styles.kicker}`} data-hero-fade>
            Brows <span aria-hidden="true">·</span> Threading <span aria-hidden="true">·</span> Lashes{' '}
            <span aria-hidden="true">·</span> Nails
          </p>
          <h1 id="hero-title" className={`display ${styles.title}`}>
            <span className={styles.line}>
              <span data-hero-line>The art of</span>
            </span>
            <span className={styles.line}>
              <span data-hero-line>
                <em>feeling beautiful.</em>
              </span>
            </span>
          </h1>
          <p className={styles.support} data-hero-fade>
            Thoughtful beauty. Beautifully you.
          </p>
          <div className={styles.actions} data-booking-anchor>
            <BookButton arrow />
            <TextLink href="/services">Explore services</TextLink>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.portraitBox}>
            <div className={styles.portrait} data-hero-media style={style}>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                quality={80}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className={styles.portraitImg}
              />
            </div>
            <svg
              className={styles.thread}
              viewBox={`0 0 ${portrait.width} ${portrait.height}`}
              preserveAspectRatio="xMidYMin slice"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="thread-fade" gradientUnits="userSpaceOnUse" x1="380" y1="0" x2="650" y2="0">
                  <stop offset="0" stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g fill="none" strokeLinecap="round" strokeWidth="1.15" vectorEffect="non-scaling-stroke">
                <path d={THREAD_IN} pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-thread-in data-hero-thread />
                <path d={TWIST_A} pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-thread-twist data-hero-thread />
                <path d={TWIST_B} pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-thread-twist data-hero-thread />
                <path d={THREAD_OUT} pathLength={1} stroke="url(#thread-fade)" vectorEffect="non-scaling-stroke" data-thread-out data-hero-thread />
              </g>
            </svg>
          </div>
          <div className={styles.nails} data-hero-media data-hero-card>
            <Image src={nails.src} alt={nails.alt} fill quality={80} sizes="(min-width: 1024px) 19vw, 42vw" className={styles.nailsImg} style={{ objectPosition: nails.focal.desktop }} />
          </div>
        </div>
      </div>
    </section>
  );
}
