import type { Media } from '@/content/types';
import { emphasise } from './EditorialHeading';
import { ResponsiveMedia } from './ResponsiveMedia';
import { SectionLabel } from './SectionLabel';
import styles from './PageIntro.module.css';

export function PageIntro({
  label,
  title,
  lead,
  media,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  media?: Media;
  children?: React.ReactNode;
}) {
  return (
    <header className={`${styles.intro} ${media ? styles.withMedia : ''}`} data-page-intro>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div data-intro-fade>
            <SectionLabel>{label}</SectionLabel>
          </div>
          <h1 className={`display ${styles.title}`} data-intro-title>
            {emphasise(title)}
          </h1>
          {lead && (
            <p className={styles.lead} data-intro-fade>
              {lead}
            </p>
          )}
          {children}
        </div>
        {media && (
          <ResponsiveMedia media={media} priority sizes="(min-width: 1024px) 40vw, 100vw" className={styles.media} intro parallax />
        )}
      </div>
    </header>
  );
}
