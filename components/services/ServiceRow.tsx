import { formatDuration, formatPrice } from '@/content/services';
import type { Service } from '@/content/types';
import styles from './ServiceMenu.module.css';

export function ServiceRow({ service }: { service: Service }) {
  return (
    <li className={styles.row}>
      <div className={styles.nameBlock}>
        <h3 className={styles.name}>{service.name}</h3>
        {service.summary && <p className={styles.summary}>{service.summary}</p>}
      </div>
      <span className={styles.leader} aria-hidden="true" />
      <p className={styles.meta}>
        {service.durationMinutes && <span className={styles.duration}>{formatDuration(service.durationMinutes)}</span>}
        {service.price && <span className={styles.price}>{formatPrice(service.price)}</span>}
      </p>
    </li>
  );
}
