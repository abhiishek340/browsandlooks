import { SectionLabel } from '@/components/ui/SectionLabel';
import type { Testimonial } from '@/content/types';
import styles from './ClientExperiences.module.css';

/** Verified, permissioned quotes only. Renders nothing until real ones are supplied. */
export function ClientExperiences({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="words-title">
      <div className="container">
        <SectionLabel>Client words</SectionLabel>
        <h2 id="words-title" className="visually-hidden">
          Client experiences
        </h2>
        <ul role="list" className={styles.list}>
          {items.slice(0, 3).map((t) => (
            <li key={t.quote} data-reveal>
              <figure>
                <blockquote className={styles.quote}>“{t.quote}”</blockquote>
                <figcaption className={styles.cite}>
                  {t.name} ·{' '}
                  {t.sourceUrl ? (
                    <a href={t.sourceUrl} target="_blank" rel="noopener">
                      {t.source}
                    </a>
                  ) : (
                    t.source
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
