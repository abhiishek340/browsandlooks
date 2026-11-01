import Link from 'next/link';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { business, visibleSocials } from '@/content/business';
import { primaryNav } from '@/content/navigation';
import { telLink } from '@/lib/booking';
import { groupHours } from '@/lib/hours';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const address = business.address?.value;
  const hours = business.hours ? groupHours(business.hours.value) : [];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.tagline}>
            Thoughtful beauty. <em>Beautifully you.</em>
          </p>
        </div>

        <nav aria-label="Footer" className={styles.col}>
          <h2 className="label">Explore</h2>
          <ul role="list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className="label">Visit</h2>
          {address && (
            <address className={styles.address}>
              {address.street && <span>{address.street}</span>}
              <span>
                {address.locality}, {address.region}
                {address.postalCode ? ` ${address.postalCode}` : ''}
              </span>
            </address>
          )}
          {business.directionsUrl && (
            <a href={business.directionsUrl.value} target="_blank" rel="noopener" className={styles.small}>
              Directions ↗
            </a>
          )}
        </div>

        {hours.length > 0 && (
          <div className={styles.col}>
            <h2 className="label">Hours</h2>
            <dl className={styles.hours}>
              {hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.range}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className={styles.col}>
          <h2 className="label">Contact</h2>
          <ul role="list">
            {business.phone && (
              <li>
                <a href={telLink(business.phone.value)}>{business.phone.value}</a>
              </li>
            )}
            {business.email && (
              <li>
                <a href={`mailto:${business.email.value}`}>{business.email.value}</a>
              </li>
            )}
          </ul>
          <SocialLinks links={visibleSocials()} className={styles.social} />
        </div>
      </div>

      <div className={styles.signature} aria-hidden="true" data-split-chars>
        {'browandlooks'.split('').map((ch, i) => (
          <span key={i} className={styles.charMask}>
            <span className={styles.char} data-char>
              {ch}
            </span>
          </span>
        ))}
      </div>

      <div className={`container ${styles.base}`}>
        <p>
          © {year} {business.name} · Salt Lake City
        </p>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
