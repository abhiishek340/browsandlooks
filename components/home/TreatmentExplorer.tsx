'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { gsap, useGSAP } from '@/components/motion/gsap';
import type { ServiceCategory } from '@/content/types';
import styles from './TreatmentExplorer.module.css';

type Item = Pick<ServiceCategory, 'id' | 'slug' | 'number' | 'name' | 'summary' | 'image'> & { fromPrice?: string };

export function TreatmentExplorer({ items }: { items: Item[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const previous = useRef(0);

  const { contextSafe } = useGSAP({ scope: root });

  const show = contextSafe((index: number) => {
    if (index === previous.current) return;
    setActive(index);
    const frames = gsap.utils.toArray<HTMLElement>('[data-stage-frame]', root.current);
    const incoming = frames[index];
    const outgoing = frames[previous.current];
    previous.current = index;
    if (!incoming) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    frames.forEach((f) => gsap.set(f, { zIndex: f === incoming ? 2 : f === outgoing ? 1 : 0 }));
    // overwrite kills any in-flight tween on the same frame, so rapid hovering never stacks
    gsap.fromTo(
      incoming,
      { clipPath: 'inset(0 0 0 100%)', opacity: 1 },
      { clipPath: 'inset(0 0 0 0%)', duration: reduce ? 0 : 0.42, ease: 'power2.inOut', overwrite: true },
    );
    gsap.fromTo(incoming.querySelector('img'), { scale: reduce ? 1 : 1.05 }, { scale: 1, duration: reduce ? 0 : 0.9, ease: 'power3.out', overwrite: true });
  });

  return (
    <section ref={root} className={styles.section} aria-labelledby="menu-title">
      <div className={`container ${styles.head}`}>
        <SectionLabel>The beauty menu</SectionLabel>
        <h2 id="menu-title" className={`display ${styles.title}`} data-split>
          Little rituals. <em className={styles.break}>Lasting confidence.</em>
        </h2>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.stage} aria-hidden="true">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={styles.frame}
              data-stage-frame
              style={{ zIndex: i === 0 ? 2 : 0, clipPath: i === 0 ? undefined : 'inset(0 0 0 100%)' }}
            >
              <Image src={item.image.src} alt="" fill sizes="(min-width: 1024px) 40vw, 1px" quality={80} className={styles.img} style={{ objectPosition: item.image.focal.desktop }} />
            </div>
          ))}
          <p className={styles.caption}>
            <span>{items[active]?.number}</span> {items[active]?.name}
          </p>
        </div>

        <ol role="list" className={styles.list}>
          {items.map((item, i) => (
            <li key={item.id} className={styles.item} data-reveal>
              <Link
                href={`/services/${item.slug}`}
                className={styles.row}
                data-active={i === active || undefined}
                onMouseEnter={() => show(i)}
                onFocus={() => show(i)}
              >
                <span className={styles.thumb}>
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 1px, 92vw" quality={70} className={styles.img} style={{ objectPosition: item.image.focal.mobile }} />
                </span>
                <span className={styles.num}>{item.number}</span>
                <span className={styles.text}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.summary}>{item.summary}</span>
                </span>
                <span className={styles.meta}>
                  {item.fromPrice && <span className={styles.price}>from {item.fromPrice}</span>}
                  <span className={styles.cta}>
                    <span className="visually-hidden">Explore {item.name}</span>
                    <Arrow />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
