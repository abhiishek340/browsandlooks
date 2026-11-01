import Link from 'next/link';
import styles from './Wordmark.module.css';

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={[styles.wordmark, className].filter(Boolean).join(' ')} aria-label="Browandlooks — home">
      browandlooks
    </Link>
  );
}
