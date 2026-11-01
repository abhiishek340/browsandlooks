import Link from 'next/link';
import { BookingFinale } from '@/components/home/BookingFinale';
import { CategoryJumpNav } from '@/components/services/CategoryJumpNav';
import { ServiceMenu } from '@/components/services/ServiceMenu';
import { emphasise } from '@/components/ui/EditorialHeading';
import { PageIntro } from '@/components/ui/PageIntro';
import { ResponsiveMedia } from '@/components/ui/ResponsiveMedia';
import { TextLink } from '@/components/ui/TextLink';
import { categories, hasDetailPage } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';
import styles from './services.module.css';

export const metadata = pageMetadata({
  title: 'Services & Prices',
  description:
    'The Browandlooks menu: eyebrow threading, brow shaping and lamination, lash lifts and extensions, manicures, pedicures and waxing in Salt Lake City.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="The menu"
        title="Every treatment, *considered.*"
        lead="Threading, brows, lashes, nails and waxing — each one carried out with care and given the time it needs."
      />

      <CategoryJumpNav items={categories.map(({ slug, number, name }) => ({ slug, number, name }))} />

      <div className={styles.categories}>
        {categories.map((c, i) => (
          <section key={c.id} id={c.slug} className={styles.category} aria-labelledby={`${c.slug}-title`}>
            <div className={`container ${styles.grid}`}>
              <div className={styles.aside}>
                <p className={styles.num}>{c.number}</p>
                <h2 id={`${c.slug}-title`} className={`display ${styles.name}`} data-split>
                  {c.name}
                </h2>
                <p className={styles.headline}>{emphasise(c.headline)}</p>
                <ResponsiveMedia
                  media={c.image}
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className={styles.image}
                  priority={i === 0}
                  reveal={i > 0}
                  parallax
                />
                {hasDetailPage(c) && <TextLink href={`/services/${c.slug}`}>About {c.name.toLowerCase()}</TextLink>}
              </div>
              <div className={styles.menu}>
                <p className={styles.summary}>{c.summary}</p>
                <ServiceMenu category={c.id} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className={`container ${styles.note}`}>
        Prices are in US dollars. Durations are approximate. <Link href="/visit">Questions? Get in touch.</Link>
      </p>

      <BookingFinale title="Found your *ritual?*" />
    </>
  );
}
