import { business } from '@/content/business';
import { services } from '@/content/services';

export type BookingAction = {
  href: string;
  kind: 'provider' | 'phone' | 'email' | 'none';
  external: boolean;
  /** Short hint for assistive tech / small print, e.g. "Opens booking site" */
  hint?: string;
};

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

/**
 * The single source of truth for every "Book" control on the site.
 * Order: service-specific provider URL → global provider URL → phone → email.
 */
export function getBookingAction(serviceId?: string): BookingAction {
  const service = serviceId ? services.find((s) => s.id === serviceId) : undefined;
  const providerUrl = service?.bookingUrl ?? business.bookingUrl?.value;

  if (providerUrl) {
    return { href: providerUrl, kind: 'provider', external: true, hint: 'Opens our booking site in a new tab' };
  }
  if (business.phone) {
    return { href: telHref(business.phone.value), kind: 'phone', external: false, hint: `Call ${business.phone.value} to book` };
  }
  if (business.email) {
    return { href: `mailto:${business.email.value}`, kind: 'email', external: false, hint: 'Email us to book' };
  }
  return { href: '/visit', kind: 'none', external: false };
}

export const telLink = telHref;
