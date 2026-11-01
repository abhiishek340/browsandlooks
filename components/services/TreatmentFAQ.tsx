import type { FAQ } from '@/content/types';
import styles from './TreatmentFAQ.module.css';

/** Native <details> accordion: keyboard and screen-reader support without custom JS. */
export function TreatmentFAQ({ items }: { items: FAQ[] }) {
  return (
    <div className={styles.list}>
      {items.map((f) => (
        <details key={f.question} className={styles.item}>
          <summary className={styles.question}>
            <span>{f.question}</span>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
