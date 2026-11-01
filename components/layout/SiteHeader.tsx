import { BookButton } from '@/components/ui/BookButton';
import { visibleSocials } from '@/content/business';
import { MobileNavigation } from './MobileNavigation';
import { NavLinks } from './NavLinks';
import { Wordmark } from './Wordmark';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Wordmark />
        <nav aria-label="Primary" className={styles.nav}>
          <NavLinks />
        </nav>
        <div className={styles.actions}>
          <BookButton size="compact" className={styles.book} />
          <MobileNavigation socials={visibleSocials()} />
        </div>
      </div>
    </header>
  );
}
