/**
 * Lists every placeholder fact and image. Fails (exit 1) when LAUNCH=1 so a
 * launch build cannot ship invented business details or stock photography.
 *   npm run check:content          → report
 *   LAUNCH=1 npm run check:content → report + fail if anything is unverified
 */
import { business } from '../content/business';
import { gallery, testimonials } from '../content/gallery';
import { media, workMedia } from '../content/media';
import { categories, services } from '../content/services';
import type { Fact } from '../content/types';

const issues: string[] = [];
const check = (label: string, f?: Fact<unknown>) => {
  if (!f) issues.push(`MISSING      ${label}`);
  else if (f.status !== 'verified') issues.push(`PLACEHOLDER  ${label}`);
};

check('business.phone', business.phone);
check('business.email', business.email);
check('business.address', business.address);
check('business.hours', business.hours);
check('business.directionsUrl', business.directionsUrl);
check('business.bookingUrl', business.bookingUrl);
check('business.siteUrl (domain)', business.siteUrl);
if (business.social.length === 0) issues.push('MISSING      business.social (verified Instagram etc.)');

for (const s of services) {
  check(`service "${s.name}" price`, s.price);
  if (s.durationMinutes) check(`service "${s.name}" duration`, s.durationMinutes);
}
for (const c of categories) {
  if (c.preparation) check(`${c.name} preparation guidance`, c.preparation);
  if (c.aftercare) check(`${c.name} aftercare guidance`, c.aftercare);
  if (c.faqs) check(`${c.name} FAQs`, c.faqs);
}
for (const [key, m] of Object.entries({ ...media, ...workMedia })) {
  if (m.kind !== 'authentic') issues.push(`IMAGE        ${key} (${m.src}) is ${m.kind} — ${m.rights}`);
}
if (gallery.length === 0) issues.push('MISSING      authentic portfolio images (Selected Work / Our Work hidden)');
if (testimonials.length === 0) issues.push('NOTE         no verified testimonials (section omitted)');

const blocking = issues.filter((i) => !i.startsWith('NOTE'));
console.log(`\nContent check — ${blocking.length} item(s) to resolve before launch\n`);
for (const i of issues) console.log('  ' + i);
console.log('');

if (process.env.LAUNCH === '1' && blocking.length > 0) {
  console.error('LAUNCH=1: refusing to pass with placeholder content.');
  process.exit(1);
}
