import { BookingFinale } from '@/components/home/BookingFinale';
import { PageIntro } from '@/components/ui/PageIntro';
import { ResponsiveMedia } from '@/components/ui/ResponsiveMedia';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { media } from '@/content/media';
import { pageMetadata } from '@/lib/metadata';
import styles from './studio.module.css';

export const metadata = pageMetadata({
  title: 'The Studio',
  description: 'Inside the Browandlooks studio in Salt Lake City — our approach to threading, brows, lashes and nails.',
  path: '/the-studio',
});

const principles = [
  {
    title: 'Listen first',
    text: 'Every appointment starts with a conversation about what you want and how you wear it day to day.',
  },
  {
    title: 'Work precisely',
    text: 'Fine detail is the whole point. We take the time each treatment needs rather than the time a schedule allows.',
  },
  {
    title: 'Keep it natural',
    text: 'The aim is to look like yourself, beautifully finished — never overdone.',
  },
];

export default function StudioPage() {
  return (
    <>
      <PageIntro
        label="The studio"
        title="A quiet room for *careful work.*"
        lead="Browandlooks is a beauty studio in Salt Lake City for threading, brows, lashes, nails and waxing."
        media={media.studioArch}
      />

      <section className={styles.wideSection} aria-label="The space">
        <ResponsiveMedia media={media.studioRoom} sizes="100vw" className={styles.wide} reveal parallax />
      </section>

      <section className={styles.section} aria-labelledby="approach-title">
        <div className={`container ${styles.grid}`}>
          <div className={styles.side}>
            <SectionLabel>Approach</SectionLabel>
            <h2 id="approach-title" className={`display ${styles.h2}`} data-split>
              Three things <em>we hold to.</em>
            </h2>
          </div>
          <ol role="list" className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.title} data-reveal>
                <span>0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pairSection}`} aria-label="Studio details">
        <div className={`container ${styles.pair}`}>
          <ResponsiveMedia media={media.studioCandle} sizes="(min-width: 1024px) 30vw, 60vw" className={styles.small} reveal />
          <blockquote className={styles.pull} data-reveal>
            Take a seat, put your phone down, and let someone else take care of the details for an hour.
          </blockquote>
          <ResponsiveMedia media={media.studioMirror} sizes="(min-width: 1024px) 40vw, 100vw" className={styles.landscape} reveal parallax />
        </div>
      </section>

      <BookingFinale title="Come and *see the studio.*" />
    </>
  );
}
