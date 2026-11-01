import { ThreadAccent } from '@/components/motion/ThreadAccent';
import { ResponsiveMedia } from '@/components/ui/ResponsiveMedia';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { media } from '@/content/media';
import styles from './CraftStory.module.css';

const steps = [
  { title: 'Consult', text: 'We look at your features, your natural growth and how you like to wear your brows.' },
  { title: 'Shape', text: 'The thread works in fine rows, lifting each hair cleanly from the root.' },
  { title: 'Finish', text: 'A calming finish and a last look at balance before you leave the chair.' },
];

export function CraftStory() {
  return (
    <section className={styles.section} aria-labelledby="craft-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <ResponsiveMedia media={media.portraitAlt} sizes="(min-width: 1024px) 38vw, 88vw" className={styles.main} reveal parallax />
          <ResponsiveMedia media={media.browCloseUp} sizes="(min-width: 1024px) 16vw, 40vw" className={styles.detail} />
        </div>

        <div className={styles.copy}>
          <SectionLabel>The craft</SectionLabel>
          <h2 id="craft-title" className={`display ${styles.title}`} data-split>
            A single thread, <em>twisted with intention.</em>
          </h2>
          <ThreadAccent
            className={styles.thread}
            mode="scroll"
            viewBox="0 0 600 60"
            preserveAspectRatio="none"
            paths={[
              'M 0 40 C 90 40 150 18 230 22',
              'M 230 22 Q 244 10 258 20 T 286 18 T 314 16',
              'M 230 22 Q 244 32 258 20 T 286 18 T 314 16',
              'M 314 16 C 400 10 480 42 600 30',
            ]}
          />
          <div className={styles.text} data-reveal>
            <p>
              Threading is a time-honoured way to shape a brow. A length of cotton is doubled, twisted, and rolled
              across the skin so the twist lifts each hair from the root.
            </p>
            <p>
              No wax and no heat — just a steady hand and a careful eye, working in fine, deliberate lines.
            </p>
          </div>
          <ol role="list" className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className={styles.stepNum}>0{i + 1}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
