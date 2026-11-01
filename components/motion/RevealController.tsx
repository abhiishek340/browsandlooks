'use client';

import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, useGSAP, markMotionReady, riseLines, MOTION_OK, REDUCED } from './gsap';

/**
 * Drives the shared, attribute-based motion vocabulary for the current page:
 *   [data-page-intro]      inner-page entrance (label, masked title lines, lead, image curtain)
 *   [data-split]           headings rise line by line behind masks, once, on enter
 *   [data-reveal]          lift + fade, batched, once
 *   [data-image-reveal]    curtain wipe with a settling scale, once
 *   [data-parallax]        slow drift of an oversized image inside its frame (desktop)
 *   [data-split-chars]     characters rise in sequence (footer signature)
 * Signature sequences (hero, explorer, studio, marquee) live in their own components.
 */
export function RevealController() {
  const pathname = usePathname();

  useGSAP(
    () => {
      markMotionReady();
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Inner-page entrance
        const intro = document.querySelector('[data-page-intro]');
        if (intro) {
          const q = gsap.utils.selector(intro);
          const tl = gsap.timeline({ delay: 0.05 });
          tl.fromTo(q('[data-intro-fade]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0);
          q('[data-intro-title]').forEach((t) => tl.add(riseLines(t, { duration: 1.15 }), 0.08));
          const media = q('[data-intro-media]');
          if (media.length) {
            tl.fromTo(media, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'expo.inOut' }, 0.1)
              .fromTo(q('[data-intro-media] img'), { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0.1);
          }
        }

        ScrollTrigger.batch('[data-split]', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => els.forEach((el, i) => riseLines(el, { delay: i * 0.08 })),
        });

        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
        });

        ScrollTrigger.batch('[data-image-reveal]', {
          start: 'top 90%',
          once: true,
          onEnter: (els) => {
            els.forEach((el, i) => {
              const img = el.querySelector('img');
              const tl = gsap.timeline({ delay: i * 0.1 });
              tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.15, ease: 'expo.inOut' });
              if (img) tl.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0.1);
            });
          },
        });

        gsap.utils.toArray<HTMLElement>('[data-split-chars]').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              gsap.set(el, { opacity: 1 });
              const split = gsap.utils.toArray<HTMLElement>('[data-char]', el);
              gsap.fromTo(split, { yPercent: 105 }, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.045 });
            },
          });
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener('load', refresh, { once: true });
        return () => window.removeEventListener('load', refresh);
      });

      // Parallax only where there is room for it and motion is welcome
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((frame) => {
          const img = frame.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -6 },
            { yPercent: 6, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });
      });

      mm.add(REDUCED, () => {
        gsap.set('[data-reveal], [data-intro-fade]', { opacity: 1, y: 0 });
        gsap.set('[data-image-reveal], [data-intro-media]', { clipPath: 'none' });
        gsap.set('[data-split], [data-intro-title], [data-split-chars]', { opacity: 1 });
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
