import Link from 'next/link';
import { ResponsiveMedia } from '@/components/ui/ResponsiveMedia';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import type { GalleryItem } from '@/content/types';
import styles from './SelectedWork.module.css';

/** A curated six-image spread. Omitted entirely when no authentic work is available. */
export function SelectedWork({ items }: { items: GalleryItem[] }) {
  const picks = items.slice(0, 6);
  if (picks.length < 3) return null;

  return (
    <section className={styles.section} aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <div>
          <SectionLabel>Selected work</SectionLabel>
          <h2 id="work-title" className={`display ${styles.title}`} data-split>
            Brows, lashes &amp; nails, <em>up close.</em>
          </h2>
        </div>
        <TextLink href="/our-work" className={styles.link}>
          View the full portfolio
        </TextLink>
      </div>

      <div className="container">
      <ul role="list" className={styles.spread}>
        {picks.map((item, i) => (
          <li key={item.id} className={styles[`cell${i + 1}`]}>
            <Link href="/our-work" className={styles.tile}>
              <figure>
                <ResponsiveMedia media={item.media} sizes="(min-width: 1024px) 30vw, 46vw" className={styles.frame} reveal parallax />
                {item.caption && (
                  <figcaption className={styles.caption}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
