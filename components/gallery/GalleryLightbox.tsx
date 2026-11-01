'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/content/types';
import styles from './GalleryLightbox.module.css';

type Props = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({ items, index, onIndexChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('overlay-open');
    }
  }, [index]);

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onIndexChange((index + dir + items.length) % items.length);
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label="Image viewer"
      onClose={() => {
        document.documentElement.classList.remove('overlay-open');
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {item && (
        <div className={styles.inner}>
          <div className={styles.bar}>
            <p className={styles.counter} aria-live="polite">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <button type="button" className={styles.close} onClick={() => ref.current?.close()} autoFocus>
              Close
            </button>
          </div>
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image key={item.id} src={item.media.src} alt={item.media.alt} fill sizes="90vw" quality={90} className={styles.img} />
            </div>
            {item.caption && <figcaption className={styles.caption}>{item.caption}</figcaption>}
          </figure>
          {items.length > 1 && (
            <div className={styles.nav}>
              <button type="button" onClick={() => step(-1)} className={styles.navBtn}>
                <span aria-hidden="true">←</span> Previous
              </button>
              <button type="button" onClick={() => step(1)} className={styles.navBtn}>
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
