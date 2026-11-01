import type { Business } from './types';

/**
 * Salon details. Everything marked `placeholder` was invented for layout
 * during development (Salt Lake City was the only confirmed fact) and must be
 * replaced with real information before launch.
 */
export const business: Business = {
  name: 'Browandlooks',
  description:
    'A beauty studio in Salt Lake City for threading, brows, lashes, nails and waxing.',
  phone: { value: '(385) 313-7676', status: 'verified' },
  email: { value: 'hello@browandlooks.com', status: 'placeholder' },
  address: {
    value: {
      street: 'Studio address to be confirmed',
      locality: 'Salt Lake City',
      region: 'UT',
      country: 'US',
    },
    status: 'placeholder',
  },
  hours: {
    value: [
      { day: 'Monday', opens: '10:00', closes: '19:00' },
      { day: 'Tuesday', opens: '10:00', closes: '19:00' },
      { day: 'Wednesday', opens: '10:00', closes: '19:00' },
      { day: 'Thursday', opens: '10:00', closes: '20:00' },
      { day: 'Friday', opens: '10:00', closes: '20:00' },
      { day: 'Saturday', opens: '09:00', closes: '18:00' },
      { day: 'Sunday', opens: '11:00', closes: '17:00' },
    ],
    status: 'placeholder',
  },
  timezone: 'America/Denver',
  directionsUrl: {
    value: 'https://www.google.com/maps/search/?api=1&query=Salt+Lake+City+UT',
    status: 'placeholder',
  },
  // Appointments are booked by phone; set a provider URL here to switch every Book button.
  bookingUrl: undefined,
  siteUrl: { value: 'https://browandlooks.com', status: 'placeholder' },
  // Profile links not yet supplied: these point at each platform until the real
  // handles are added. Unverified links are hidden in launch builds.
  social: [
    { value: { platform: 'Instagram', url: 'https://www.instagram.com/', handle: '' }, status: 'placeholder' },
    { value: { platform: 'TikTok', url: 'https://www.tiktok.com/', handle: '' }, status: 'placeholder' },
    { value: { platform: 'Facebook', url: 'https://www.facebook.com/', handle: '' }, status: 'placeholder' },
  ],
};

export const isLaunchBuild = process.env.LAUNCH === '1';

/** Social profiles safe to show: verified ones always, placeholders only in preview builds.
 *  Resolve on the server and pass down, so client components never read build env. */
export const visibleSocials = () =>
  business.social.filter((s) => s.status === 'verified' || !isLaunchBuild).map((s) => s.value);
