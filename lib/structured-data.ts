import { business, isLaunchBuild } from '@/content/business';
import type { Fact } from '@/content/types';
import { siteUrl } from './metadata';

/** Only verified facts are marked up in launch builds. No ratings or reviews. */
const usable = <T,>(f?: Fact<T>) => (f && (!isLaunchBuild || f.status === 'verified') ? f.value : undefined);

export function beautySalonJsonLd() {
  const address = usable(business.address);
  const hours = usable(business.hours);
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: business.name,
    description: business.description,
    url: siteUrl,
    telephone: usable(business.phone),
    email: usable(business.email),
    image: `${siteUrl}/images/hero-portrait-brows.jpg`,
    address: address && {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: hours
      ?.filter((h) => h.opens && h.closes)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.day, opens: h.opens, closes: h.closes })),
    sameAs: business.social.filter((s) => s.status === 'verified').map((s) => s.value.url),
  };
}
