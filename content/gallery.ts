import { isLaunchBuild } from './business';
import { workMedia as w } from './media';
import type { GalleryItem, Testimonial } from './types';

const all: GalleryItem[] = [
  { id: 'glow', category: 'brows', media: w.glow, span: 'tall', caption: 'Defined brows, luminous skin' },
  { id: 'nails-rings', category: 'nails', media: w.nailsRings, span: 'tall', caption: 'Milky almond, gold rings' },
  { id: 'brows-jewel', category: 'brows', media: w.browsJewel, span: 'tall', caption: 'Polished brows, statement gold' },
  { id: 'nails-pearls', category: 'nails', media: w.nailsPearls, span: 'tall', caption: 'Soft white almond with pearls' },
  { id: 'lash-application', category: 'lashes', media: w.lashApplication, span: 'wide', caption: 'Lashes, finished by hand' },
  { id: 'nails-chrome', category: 'nails', media: w.nailsChrome, span: 'tall', caption: 'Gold chrome almond' },
  { id: 'brow-styling', category: 'brows', media: w.browStyling, span: 'tall', caption: 'Brows brushed into place' },
  { id: 'nails-satin', category: 'nails', media: w.nailsSatin, span: 'wide', caption: 'Red on black satin' },
  { id: 'brow-macro', category: 'brows', media: w.browMacro, span: 'square', caption: 'Full, feathered brow' },
  { id: 'nails-gold-ring', category: 'nails', media: w.nailsGoldRing, span: 'square', caption: 'Nude with a fine gold ring' },
  { id: 'nails-almond', category: 'nails', media: w.nailsAlmond, span: 'square', caption: 'Nude chrome almond' },
  { id: 'lash-profile', category: 'lashes', media: w.lashProfile, span: 'wide', caption: 'Long, lifted lashes' },
];

/** Generated or stock imagery must never be shown as client results in production. */
export const gallery: GalleryItem[] = isLaunchBuild
  ? all.filter((g) => g.media.kind === 'authentic')
  : all;

/** Filters appear only when a category has enough work to be meaningful. */
export const MIN_PER_FILTER = 4;

/** Verified, permissioned testimonials only. None supplied yet — the section is omitted. */
export const testimonials: Testimonial[] = [];
