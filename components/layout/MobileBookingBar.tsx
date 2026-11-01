'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { business } from '@/content/business';
import { getBookingAction, telLink } from '@/lib/booking';
import styles from './MobileBookingBar.module.css';

/** Compact mobile booking access. Hides while an in-page booking action (hero, finale) is on screen. */
export function MobileBookingBar() {
  const pathname = usePathname();
  const [anchorVisible, setAnchorVisible] = useState(false);
  const action = getBookingAction();

  useEffect(() => {
    const targets = document.querySelectorAll('[data-booking-anchor]');
    const visible = new Set<Element>();
    setAnchorVisible(false);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setAnchorVisible(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className={styles.bar} data-hidden={anchorVisible || undefined}>
      {business.phone && action.kind !== 'phone' && (
        <a href={telLink(business.phone.value)} className={styles.secondary}>
          Call
        </a>
      )}
      <a
        href={action.href}
        className={styles.primary}
        {...(action.external ? { target: '_blank', rel: 'noopener' } : {})}
        aria-label={action.hint ? `Book appointment — ${action.hint}` : undefined}
      >
        Book appointment
      </a>
    </div>
  );
}
