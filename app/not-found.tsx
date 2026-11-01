import type { Metadata } from 'next';
import { ThreadAccent } from '@/components/motion/ThreadAccent';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import styles from './not-found.module.css';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <p className="label">404</p>
      <h1 id="nf-title" className={`display ${styles.title}`}>
        This page has <em>slipped the thread.</em>
      </h1>
      <ThreadAccent
        className={styles.thread}
        mode="enter"
        viewBox="0 0 600 60"
        preserveAspectRatio="none"
        paths={[
          'M 0 40 C 90 40 150 18 230 22',
          'M 230 22 Q 244 10 258 20 T 286 18 T 314 16',
          'M 230 22 Q 244 32 258 20 T 286 18 T 314 16',
          'M 314 16 C 340 14 352 22 360 34',
        ]}
      />
      <p className={styles.text}>The page you were looking for has moved or no longer exists.</p>
      <div className={styles.actions}>
        <Button href="/services" arrow>
          See our services
        </Button>
        <TextLink href="/">Back to the homepage</TextLink>
      </div>
    </section>
  );
}
