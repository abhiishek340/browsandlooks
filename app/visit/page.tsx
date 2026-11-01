import { BookingFinale } from '@/components/home/BookingFinale';
import { BookButton } from '@/components/ui/BookButton';
import { PageIntro } from '@/components/ui/PageIntro';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { HoursTable } from '@/components/visit/HoursTable';
import { business, visibleSocials } from '@/content/business';
import { media } from '@/content/media';
import { telLink } from '@/lib/booking';
import { pageMetadata } from '@/lib/metadata';
import styles from './visit.module.css';

export const metadata = pageMetadata({
  title: 'Visit',
  description: 'Find Browandlooks in Salt Lake City: address, opening hours, directions and how to book.',
  path: '/visit',
});

export default function VisitPage() {
  const address = business.address?.value;
  const hours = business.hours?.value ?? [];

  return (
    <>
      <PageIntro label="Visit" title="Find us in *Salt Lake City.*" media={media.studioLounge} />

      <section className={styles.section} aria-label="Visit details">
        <div className={`container ${styles.grid}`}>
          {address && (
            <div className={styles.block} id="address">
              <SectionLabel>Address</SectionLabel>
              <address className={styles.big}>
                {address.street && (
                  <>
                    {address.street}
                    <br />
                  </>
                )}
                {address.locality}, {address.region}
                {address.postalCode ? ` ${address.postalCode}` : ''}
              </address>
              {business.directionsUrl && <TextLink href={business.directionsUrl.value}>Open in Google Maps</TextLink>}
            </div>
          )}

          {hours.length > 0 && (
            <div className={styles.block}>
              <SectionLabel>Opening hours</SectionLabel>
              <HoursTable hours={hours} timezone={business.timezone} className={styles.hours} />
            </div>
          )}

          <div className={styles.block} id="contact">
            <SectionLabel>Contact</SectionLabel>
            <ul role="list" className={styles.contact}>
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
            <BookButton arrow />
            <SocialLinks links={visibleSocials()} />
          </div>
        </div>
      </section>

      <BookingFinale />
    </>
  );
}
