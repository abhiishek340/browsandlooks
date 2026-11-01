import { servicesFor } from '@/content/services';
import type { ServiceCategoryId } from '@/content/types';
import { ServiceRow } from './ServiceRow';
import styles from './ServiceMenu.module.css';

export function ServiceMenu({ category }: { category: ServiceCategoryId }) {
  return (
    <ul role="list" className={styles.menu}>
      {servicesFor(category).map((s) => (
        <ServiceRow key={s.id} service={s} />
      ))}
    </ul>
  );
}
