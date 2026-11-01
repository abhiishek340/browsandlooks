'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import type { GalleryItem } from '@/content/types';
import { GalleryLightbox } from './GalleryLightbox';
import styles from './GalleryGrid.module.css';

type Filter = 'all' | GalleryItem['category'];
const LABELS: Record<Filter, string> = { all: 'All work', brows: 'Brows', nails: 'Nails', lashes: 'Lashes' };

export function GalleryGrid({ items, minPerFilter }: { items: GalleryItem[]; minPerFilter: number }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const filters = useMemo(() => {
    const counts = items.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.category]: (acc[i.category] ?? 0) + 1 }), {});
    const usable = (Object.keys(counts) as Filter[]).filter((k) => (counts[k] ?? 0) >= minPerFilter);
    return usable.length > 1 ? (['all', ...usable] as Filter[]) : [];
  }, [items, minPerFilter]);

  const visible = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <>
      {filters.length > 0 && (
        <div className={`container ${styles.filters}`} role="group" aria-label="Filter work">
          {filters.map((f) => (
            <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {LABELS[f]}
            </button>
          ))}
          <p className={styles.count} aria-live="polite">
            {visible.length} images
          </p>
        </div>
      )}

      <div className="container">
        <ul role="list" className={styles.grid}>
          {visible.map((item, i) => (
            <li key={item.id} className={styles[item.span]}>
              <button
                type="button"
                className={styles.tile}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                aria-label={`View larger: ${item.caption ?? item.media.alt}`}
              >
                <span className={styles.frame} data-image-reveal>
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    fill
                    quality={70}
                    sizes={item.span === 'wide' ? '(min-width: 1024px) 60vw, 92vw' : '(min-width: 1024px) 30vw, 46vw'}
                    className={styles.img}
                    style={{ objectPosition: item.media.focal.desktop }}
                  />
                </span>
                {item.caption && <span className={styles.caption}>{item.caption}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <GalleryLightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => {
          setOpenIndex(null);
          opener.current?.focus();
        }}
      />
    </>
  );
}
