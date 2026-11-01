import { isLaunchBuild } from '@/content/business';
import styles from './PreviewNotice.module.css';

/** Visible in every non-launch build so placeholder facts and imagery are never mistaken for real ones. */
export function PreviewNotice() {
  if (isLaunchBuild) return null;
  return (
    <p className={styles.notice} role="note">
      Preview · prices, hours, contact details and photography are placeholders
    </p>
  );
}
