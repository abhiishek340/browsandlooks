import { ThreadAccent } from '@/components/motion/ThreadAccent';
import { BookButton } from '@/components/ui/BookButton';
import { emphasise } from '@/components/ui/EditorialHeading';
import { business } from '@/content/business';
import { getBookingAction, telLink } from '@/lib/booking';
import styles from './BookingFinale.module.css';

export function BookingFinale({ title = 'Your chair is *ready when you are.*' }: { title?: string }) {
  return (
    <section className={`on-dark ${styles.section}`} aria-labelledby="finale-title" data-booking-anchor>
      <div className={`container ${styles.inner}`}>
        <p className={`label ${styles.label}`}>Appointments</p>
        <h2 id="finale-title" className={styles.title} data-split>
          {emphasise(title)}
        </h2>
        <ThreadAccent
          className={styles.thread}
          mode="enter"
          tone="ivory"
          viewBox="0 0 800 40"
          preserveAspectRatio="none"
          paths={[
            'M 0 26 C 160 30 260 14 380 18',
            'M 380 18 Q 392 8 404 17 T 428 16 T 452 15',
            'M 380 18 Q 392 28 404 17 T 428 16 T 452 15',
            'M 452 15 C 560 12 680 30 800 22',
          ]}
        />
        <div className={styles.actions} data-reveal>
          <BookButton variant="ivory" arrow />
          {business.phone && (
            <a href={telLink(business.phone.value)} className={styles.phone}>
              {getBookingAction().kind === 'phone' ? business.phone.value : `or call ${business.phone.value}`}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
