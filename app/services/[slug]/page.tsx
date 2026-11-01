import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookingFinale } from '@/components/home/BookingFinale';
import { ServiceMenu } from '@/components/services/ServiceMenu';
import { TreatmentFAQ } from '@/components/services/TreatmentFAQ';
import { PageIntro } from '@/components/ui/PageIntro';
import { ResponsiveMedia } from '@/components/ui/ResponsiveMedia';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { categories, getCategory, hasDetailPage } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';
import styles from './treatment.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories.filter(hasDetailPage).map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} in Salt Lake City`, description: c.summary, path: `/services/${c.slug}` });
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c || !hasDetailPage(c)) notFound();

  const index = categories.indexOf(c);
  const next = categories[(index + 1) % categories.length]!;

  return (
    <>
      <PageIntro label={`${c.number} · ${c.name}`} title={c.headline} lead={c.summary} media={c.image} />

      <section className={styles.section} aria-labelledby="about-title">
        <div className={`container ${styles.grid}`}>
          <div className={styles.side}>
            <SectionLabel>About</SectionLabel>
            <h2 id="about-title" className="visually-hidden">
              About {c.name.toLowerCase()}
            </h2>
          </div>
          <div className={styles.prose} data-reveal>
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="expect-title">
        <div className={`container ${styles.grid}`}>
          <div className={styles.side}>
            <SectionLabel>Your appointment</SectionLabel>
            <h2 id="expect-title" className={`display ${styles.h2}`} data-split>
              What to <em>expect</em>
            </h2>
            {c.detailImage && (
              <ResponsiveMedia media={c.detailImage} sizes="(min-width: 1024px) 26vw, 70vw" className={styles.detail} reveal />
            )}
          </div>
          <ol role="list" className={styles.steps}>
            {c.expect.map((e, i) => (
              <li key={e} data-reveal>
                <span>0{i + 1}</span>
                <p>{e}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="menu-title">
        <div className={`container ${styles.grid}`}>
          <div className={styles.side}>
            <SectionLabel>Menu</SectionLabel>
            <h2 id="menu-title" className={`display ${styles.h2}`} data-split>
              {c.name} <em>prices</em>
            </h2>
          </div>
          <div>
            <ServiceMenu category={c.id} />
          </div>
        </div>
      </section>

      {(c.preparation || c.aftercare) && (
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="care-title">
          <div className={`container ${styles.grid}`}>
            <div className={styles.side}>
              <SectionLabel>Care</SectionLabel>
              <h2 id="care-title" className={`display ${styles.h2}`} data-split>
                Before &amp; <em>after</em>
              </h2>
            </div>
            <div className={styles.care}>
              {c.preparation && (
                <div data-reveal>
                  <h3 className={styles.h3}>Before you come in</h3>
                  <ul role="list">
                    {c.preparation.value.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {c.aftercare && (
                <div data-reveal>
                  <h3 className={styles.h3}>Afterwards</h3>
                  <ul role="list">
                    {c.aftercare.value.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {c.faqs && c.faqs.value.length > 0 && (
        <section className={styles.section} aria-labelledby="faq-title">
          <div className={`container ${styles.grid}`}>
            <div className={styles.side}>
              <SectionLabel>Questions</SectionLabel>
              <h2 id="faq-title" className={`display ${styles.h2}`} data-split>
                Good to <em>know</em>
              </h2>
            </div>
            <TreatmentFAQ items={c.faqs.value} />
          </div>
        </section>
      )}

      <nav aria-label="Next treatment" className={styles.next}>
        <Link href={`/services/${next.slug}`} className={`container ${styles.nextLink}`}>
          <span className="label">Next · {next.number}</span>
          <span className={styles.nextName}>{next.name}</span>
        </Link>
      </nav>

      <BookingFinale title={`${c.name}, *whenever you’re ready.*`} />
    </>
  );
}
