import { media, workMedia } from './media';
import type { Fact, Service, ServiceCategory, ServiceCategoryId } from './types';

/* Prices and durations are development placeholders — typical Salt Lake City
   ranges used only so the menu can be designed. Replace with the real menu. */
const price = (amount: number, qualifier?: 'from'): Fact<{ amount: number; qualifier?: 'from' }> => ({
  value: qualifier ? { amount, qualifier } : { amount },
  status: 'placeholder',
});
const mins = (value: number): Fact<number> => ({ value, status: 'placeholder' });

const placeholder = <T,>(value: T): Fact<T> => ({ value, status: 'placeholder' });

export const categories: ServiceCategory[] = [
  {
    id: 'threading',
    slug: 'threading',
    number: '01',
    name: 'Threading',
    headline: 'Precision, *one fine line* at a time.',
    summary: 'Precise, gentle threading for beautifully balanced, naturally defined features.',
    intro: [
      'Threading shapes brows and removes facial hair using a single twisted strand of cotton. The thread rolls across the skin and lifts each hair cleanly from the follicle — row by row, with no wax, heat or chemicals involved.',
      'Because the thread works in such fine lines, it allows a very exact shape. It is well suited to brows, upper lip, chin and the full face.',
    ],
    expect: [
      'A short conversation about the shape you want and how you wear your brows day to day.',
      'You hold the skin gently taut while the thread works through each area.',
      'A soothing finish to calm the skin, and a final check of symmetry in the mirror.',
    ],
    preparation: placeholder([
      'Come with a clean face, free of heavy makeup around the area.',
      'Let us know about any recent retinoid or exfoliating treatments.',
    ]),
    aftercare: placeholder([
      'Avoid makeup, heat and steam on the area for a few hours.',
      'Skip exfoliating products on the area for 24 hours.',
    ]),
    faqs: placeholder([
      {
        question: 'Does threading hurt?',
        answer:
          'Most people feel a quick, light pinch that eases as the appointment goes on. Holding the skin taut makes a noticeable difference.',
      },
      {
        question: 'How often should I come in?',
        answer: 'Many clients return every three to five weeks, depending on how quickly their hair grows.',
      },
    ]),
    image: media.catBrows,
    detailImage: media.craftThread,
  },
  {
    id: 'brows',
    slug: 'brows',
    number: '02',
    name: 'Brows',
    headline: 'Shaped to suit *your* face.',
    summary: 'Tailored brow care to enhance your natural shape and expression.',
    intro: [
      'Brow appointments go beyond hair removal. Shaping, tinting and lamination are used together to give brows definition, fullness and a direction that suits the face.',
      'Lamination sets brow hairs into a brushed-up shape; tint adds depth to fine or light hairs. Both can be combined with threading for a finished look.',
    ],
    expect: [
      'A consultation on shape, colour and how much definition you would like.',
      'Shaping first, then tint or lamination where chosen.',
      'Finishing and styling so you leave with brows ready for the day.',
    ],
    preparation: placeholder([
      'Tint and lamination may need a patch test before your first appointment.',
      'Avoid brow growth serums and exfoliants on the area for a few days beforehand.',
    ]),
    aftercare: placeholder([
      'Keep brows dry for 24 hours after tint or lamination.',
      'Brush laminated brows into place each morning with a clean spoolie.',
    ]),
    faqs: placeholder([
      {
        question: 'How long does brow lamination last?',
        answer: 'Results typically soften over around four to six weeks, depending on hair type and aftercare.',
      },
    ]),
    image: workMedia.browStyling,
    detailImage: media.portraitAlt,
  },
  {
    id: 'lashes',
    slug: 'lashes',
    number: '03',
    name: 'Lashes',
    headline: 'Lifted, defined, *effortless*.',
    summary: 'Lash lifts, tints and extensions for an open, wide-awake look.',
    intro: [
      'A lash lift curls your natural lashes from the root so they look longer and more open, and a tint deepens their colour. Extensions add length and fullness, applied one lash at a time.',
      'Appointments are unhurried and spent lying back with your eyes closed.',
    ],
    expect: [
      'A conversation about the curl, length and fullness you would like.',
      'Lower lashes are protected with soft pads before work begins.',
      'A final comb-through and aftercare guidance.',
    ],
    preparation: placeholder([
      'Arrive without eye makeup and remove contact lenses beforehand.',
      'Lash tint and lift may need a patch test before your first appointment.',
    ]),
    aftercare: placeholder([
      'Keep lashes dry for 24 hours.',
      'Avoid oil-based products around the eyes.',
    ]),
    image: media.catLashes,
  },
  {
    id: 'nails',
    slug: 'nails',
    number: '04',
    name: 'Nails',
    headline: 'Polished, from *quiet* to *statement*.',
    summary: 'Elegant nail care for everyday polish, from minimalist to statement looks.',
    intro: [
      'Manicures and pedicures begin with careful cuticle work and shaping, finished in classic polish or long-wearing gel.',
      'Choose a single considered colour or add detail with nail art.',
    ],
    expect: [
      'Shape, length and colour chosen together.',
      'Cuticle care, shaping and a precise application.',
      'Time to let your nails set before you leave.',
    ],
    aftercare: placeholder([
      'Wear gloves for cleaning to help gel last.',
      'Apply cuticle oil daily.',
    ]),
    image: media.catNails,
    detailImage: media.heroNails,
  },
  {
    id: 'waxing',
    slug: 'waxing',
    number: '05',
    name: 'Waxing',
    headline: 'Smooth, *simply*.',
    summary: 'Face and body waxing, carried out quickly and with care.',
    intro: [
      'Waxing removes hair from the root for smoother results that last longer than shaving.',
      'Treatments cover the face and body, from a quick upper lip to full legs.',
    ],
    expect: [
      'A private, calm space and clean, single-use applicators.',
      'Each area is prepared, waxed and soothed in turn.',
    ],
    preparation: placeholder([
      'Hair should be roughly a quarter inch long for the wax to grip.',
      'Avoid exfoliating, tanning or retinoids on the area for a couple of days beforehand.',
    ]),
    aftercare: placeholder([
      'Avoid heat, hot baths and tight clothing on the area for 24 hours.',
      'Begin gentle exfoliation a few days later to help prevent ingrown hairs.',
    ]),
    image: media.catWaxing,
  },
];

export const services: Service[] = [
  // Threading
  { id: 'brow-threading', category: 'threading', name: 'Eyebrow threading', summary: 'Shape and clean-up', price: price(18), durationMinutes: mins(15) },
  { id: 'upper-lip', category: 'threading', name: 'Upper lip', price: price(9), durationMinutes: mins(5) },
  { id: 'chin', category: 'threading', name: 'Chin', price: price(10), durationMinutes: mins(10) },
  { id: 'forehead', category: 'threading', name: 'Forehead', price: price(9), durationMinutes: mins(5) },
  { id: 'sides', category: 'threading', name: 'Sides of face', price: price(15), durationMinutes: mins(10) },
  { id: 'full-face-threading', category: 'threading', name: 'Full face', summary: 'Brows, lip, chin, forehead and sides', price: price(48), durationMinutes: mins(40) },
  // Brows
  { id: 'brow-tint', category: 'brows', name: 'Brow tint', price: price(20), durationMinutes: mins(15) },
  { id: 'brow-shape-tint', category: 'brows', name: 'Brow shape & tint', summary: 'Threading with tint', price: price(36), durationMinutes: mins(30) },
  { id: 'henna-brows', category: 'brows', name: 'Henna brows', summary: 'Tints skin and hair for a fuller look', price: price(45), durationMinutes: mins(40) },
  { id: 'brow-lamination', category: 'brows', name: 'Brow lamination', summary: 'Includes shaping and tint', price: price(75), durationMinutes: mins(50) },
  // Lashes
  { id: 'lash-tint', category: 'lashes', name: 'Lash tint', price: price(25), durationMinutes: mins(20) },
  { id: 'lash-lift', category: 'lashes', name: 'Lash lift & tint', price: price(85), durationMinutes: mins(60) },
  { id: 'classic-extensions', category: 'lashes', name: 'Classic extensions', summary: 'Full set', price: price(140), durationMinutes: mins(120) },
  { id: 'lash-fill', category: 'lashes', name: 'Extension fill', summary: 'Within three weeks', price: price(65), durationMinutes: mins(60) },
  // Nails
  { id: 'signature-manicure', category: 'nails', name: 'Signature manicure', price: price(35), durationMinutes: mins(40) },
  { id: 'gel-manicure', category: 'nails', name: 'Gel manicure', price: price(48), durationMinutes: mins(50) },
  { id: 'signature-pedicure', category: 'nails', name: 'Signature pedicure', price: price(55), durationMinutes: mins(50) },
  { id: 'gel-pedicure', category: 'nails', name: 'Gel pedicure', price: price(65), durationMinutes: mins(60) },
  { id: 'nail-art', category: 'nails', name: 'Nail art', summary: 'Per nail', price: price(5, 'from'), addOn: true },
  { id: 'gel-removal', category: 'nails', name: 'Gel removal', price: price(15), durationMinutes: mins(15), addOn: true },
  // Waxing
  { id: 'face-wax', category: 'waxing', name: 'Full face', price: price(45), durationMinutes: mins(30) },
  { id: 'underarm-wax', category: 'waxing', name: 'Underarm', price: price(22), durationMinutes: mins(15) },
  { id: 'half-arm-wax', category: 'waxing', name: 'Half arm', price: price(35), durationMinutes: mins(20) },
  { id: 'full-arm-wax', category: 'waxing', name: 'Full arm', price: price(50), durationMinutes: mins(30) },
  { id: 'half-leg-wax', category: 'waxing', name: 'Half leg', price: price(45), durationMinutes: mins(30) },
  { id: 'full-leg-wax', category: 'waxing', name: 'Full leg', price: price(75), durationMinutes: mins(50) },
  { id: 'bikini-wax', category: 'waxing', name: 'Bikini line', price: price(45), durationMinutes: mins(20) },
  { id: 'brazilian-wax', category: 'waxing', name: 'Brazilian', price: price(65), durationMinutes: mins(35) },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const servicesFor = (id: ServiceCategoryId) => services.filter((s) => s.category === id);

/** A category gets its own page only when it has enough genuine content. */
export const hasDetailPage = (c: ServiceCategory) => c.intro.length >= 2 && c.expect.length >= 2;

export const formatPrice = (p: Fact<{ amount: number; qualifier?: 'from' }>) =>
  `${p.value.qualifier === 'from' ? 'from ' : ''}$${p.value.amount}`;

export const formatDuration = (d: Fact<number>) => {
  const m = d.value;
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} hr ${r} min` : `${h} hr`;
};
