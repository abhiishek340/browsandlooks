import Link from 'next/link';
import { Arrow } from './Arrow';
import styles from './TextLink.module.css';

export function TextLink({ href, children, className, onDark }: { href: string; children: React.ReactNode; className?: string; onDark?: boolean }) {
  const cls = [styles.link, onDark && styles.onDark, className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className={styles.text}>{children}</span>
      <Arrow className={styles.arrow} />
    </>
  );
  return /^(tel:|mailto:|https?:)/.test(href) ? (
    <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
