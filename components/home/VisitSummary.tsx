import { BookButton } from '@/components/ui/BookButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { business } from '@/content/business';
import { telLink } from '@/lib/booking';
import { groupHours } from '@/lib/hours';
import styles from './VisitSummary.module.css';

export function VisitSummary() {
  const address = business.address?.value;
  const hours = business.hours ? groupHours(business.hours.value) : [];

  return (
    <section className={styles.section} aria-labelledby="visit-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionLabel>Visit</SectionLabel>
          <h2 id="visit-title" className={`display ${styles.title}`} data-split>
            Find us in <em className={styles.break}>Salt Lake City.</em>
          </h2>
        </div>

        <dl className={styles.facts}>
          {address && (
            <div className={styles.fact} data-reveal>
              <dt className="label">Address</dt>
              <dd>
                <address>
                  {address.street && (
                    <>
                      {address.street}
                      <br />
                    </>
                  )}
                  {address.locality}, {address.region}
                </address>
                {business.directionsUrl && (
                  <TextLink href={business.directionsUrl.value} className={styles.inline}>
                    Get directions
                  </TextLink>
                )}
              </dd>
            </div>
          )}
          {hours.length > 0 && (
            <div className={styles.fact} data-reveal>
              <dt className="label">Hours</dt>
              <dd>
                <ul role="list" className={styles.hours}>
                  {hours.map((h) => (
                    <li key={h.days}>
                      <span>{h.days}</span>
                      <span>{h.range}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {business.phone && (
            <div className={styles.fact} data-reveal>
              <dt className="label">Telephone</dt>
              <dd>
                <a href={telLink(business.phone.value)} className={styles.phone}>
                  {business.phone.value}
                </a>
              </dd>
            </div>
          )}
          <div className={styles.fact} data-reveal>
            <dt className="label">Appointments</dt>
            <dd>
              <BookButton variant="outline" size="compact" arrow />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
