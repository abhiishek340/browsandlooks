import { business } from '@/content/business';
import { services } from '@/content/services';

export type BookingAction = {
  href: string;
  kind: 'provider' | 'phone' | 'email' | 'none';
  external: boolean;
  /** Short hint for assistive tech / small print, e.g. "Opens booking site" */
  hint?: string;
};

/** tel: link in E.164, so (385) 313-7676 dials as +13853137676 from any phone */
const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d]/g, '');
  const e164 = phone.trim().startsWith('+') ? `+${digits}` : digits.length === 10 ? `+1${digits}` : digits;
  return `tel:${e164}`;
};

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
