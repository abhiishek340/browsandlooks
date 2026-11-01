import type { Media } from './types';

/**
 * Asset manifest. Every image below is a development placeholder: Unsplash
 * licence photography, self-hosted and colour-graded to one warm look. None of
 * it shows Browandlooks clients or the real studio. Replace with the studio's
 * own photography before launch (see CONTENT-CHECKLIST.md for the shot list).
 */
const unsplash = (id: string) =>
  `Placeholder · Unsplash licence · unsplash.com/photos/${id}`;

const img = (
  name: string,
  width: number,
  height: number,
  alt: string,
  id: string,
  focal: Media['focal'] = { desktop: '50% 50%', mobile: '50% 50%' },
): Media => ({
  src: `/images/${name}.jpg`,
  width,
  height,
  alt,
  focal,
  kind: 'placeholder',
  rights: unsplash(id),
});

export const media = {
  heroPortrait: img(
    'hero-portrait-brows',
    2400,
    3605,
    'Beauty portrait of a woman with sculpted, defined brows and winged liner, eyes closed, glowing skin.',
    '1637851497145-0faa2e456081',
    { desktop: '50% 0%', mobile: '50% 0%' },
  ),
  heroNails: img(
    'hero-manicure-gold-l',
    1240,
    1410,
    'A hand with glossy red almond nails, a gold cuff and ring, resting on a pomegranate.',
    '1781793326532-345a6a157d4f',
    { desktop: '50% 50%', mobile: '50% 50%' },
  ),
  craftThread: img(
    'craft-thread',
    2000,
    3000,
    'A beauty therapist holding a length of fine cotton thread taut between her fingers.',
    '1733145820333-6fa6ed6f8f5d',
    { desktop: '60% 20%', mobile: '60% 18%' },
  ),
  browCloseUp: img(
    'cat-threading',
    1600,
    1067,
    'Close-up of a cleanly shaped brow above a hazel eye.',
    '1651839633408-3fccd671b832',
    { desktop: '40% 40%', mobile: '40% 40%' },
  ),
  catBrows: img(
    'cat-brows-2',
    1800,
    2700,
    'Close-up of a sculpted, brushed-up brow and winged liner on glowing skin.',
    '1595550912256-b24059bb08e8',
    { desktop: '50% 30%', mobile: '50% 30%' },
  ),
  catLashes: img(
    'cat-lashes-2',
    1800,
    2400,
    'Macro of full, feathered volume lash extensions.',
    '1683719312734-e31de63957ab',
    { desktop: '50% 45%', mobile: '50% 45%' },
  ),
  catNails: img(
    'cat-nails-2',
    1800,
    1724,
    'Soft nude polish being brushed onto a fresh manicure against a peach backdrop.',
    '1618222988376-ecf1706ee7ce',
    { desktop: '50% 50%', mobile: '50% 50%' },
  ),
  catWaxing: img(
    'cat-waxing-2',
    1800,
    2700,
    'Fingertips with a slim gold ring resting on smooth skin at the collarbone.',
    '1561228987-8e7379dde477',
    { desktop: '50% 40%', mobile: '50% 40%' },
  ),
  studioRoom: img(
    'studio-reception',
    2400,
    2400,
    'A calm, sculptural reception in warm ivory tones as a woman walks past the desk.',
    '1763873993447-1d0be71a96d9',
    { desktop: '50% 58%', mobile: '50% 55%' },
  ),
  studioArch: img(
    'studio-salon',
    1800,
    2308,
    'A grand salon with a crystal chandelier, gilded mirror and antique chairs.',
    '1785441513755-af171009e068',
    { desktop: '50% 45%', mobile: '50% 45%' },
  ),
  studioCandle: img(
    'studio-candlelight',
    1800,
    1201,
    'A candle glowing in a softly lit stone alcove.',
    '1761470575018-135c213340eb',
  ),
  studioMirror: img(
    'studio-marble',
    1800,
    1225,
    'Marble vanity with brass taps, oval gold mirrors and white flowers.',
    '1564540583246-934409427776',
    { desktop: '30% 50%', mobile: '30% 50%' },
  ),
  studioLounge: img(
    'studio-lounge',
    2000,
    1125,
    'A quiet lounge with rounded velvet armchairs, warm wood panelling and soft light.',
    '1693578538512-fc66f318c833',
    { desktop: '62% 50%', mobile: '62% 50%' },
  ),
  portraitAlt: img(
    'portrait-alt',
    1800,
    1200,
    'A woman with full, groomed brows and dark wavy hair, fingertips resting at her lips.',
    '1744371386847-ded3b4a66017',
    { desktop: '42% 30%', mobile: '42% 30%' },
  ),
} satisfies Record<string, Media>;

export const workMedia = {
  browStyling: img('work-brow-styling', 1400, 2097, 'A woman combing her brows into shape in a hand mirror, pearl earring catching the light.', '1618322802324-a9185814211d', { desktop: '50% 30%', mobile: '50% 30%' }),
  browMacro: img('work-brow-macro', 1400, 1012, 'A full, softly feathered brow above a green eye in warm light.', '1633346152343-5486573d3d50'),
  browsJewel: img('work-brows-jewel', 1400, 1750, 'Polished brows and statement jewellery on a woman with a sculpted updo.', '1784412713404-e1643be06f28', { desktop: '50% 25%', mobile: '50% 25%' }),
  glow: img('work-glow', 1400, 2100, 'A woman with eyes closed, defined brows and luminous skin.', '1613730317814-1cede28e0151', { desktop: '50% 30%', mobile: '50% 30%' }),
  lashApplication: img('work-lash-application', 1800, 1200, 'Mascara being applied to a client lying back, seen from above.', '1550005869-5fca7db35ddb'),
  lashProfile: img('work-lash-profile', 1800, 1200, 'Profile of a woman with long, lifted lashes and a defined brow.', '1541088254193-0d6d787da995', { desktop: '40% 50%', mobile: '40% 50%' }),
  nailsRings: img('work-nails-rings', 1400, 2100, 'Milky almond nails and delicate gold rings, hand resting against the cheek.', '1770721478216-3e5dbbe8dcc2', { desktop: '50% 45%', mobile: '50% 45%' }),
  nailsPearls: img('work-nails-pearls', 1400, 2100, 'Soft white almond nails with stacked pearl bracelets.', '1553375385-2d9820966cdb', { desktop: '50% 50%', mobile: '50% 50%' }),
  nailsGoldRing: img('work-nails-gold-ring', 1400, 933, 'A nude manicure with a fine gold ring in bright, soft light.', '1630843599725-32ead7671867'),
  nailsSatin: img('work-nails-satin', 1800, 1200, 'Red nails against a black satin dress.', '1769029174082-23b1bb39e030'),
  nailsChrome: img('work-nails-chrome', 1400, 2100, 'Gold chrome almond nails.', '1770210257340-dc2b0f44642a', { desktop: '50% 45%', mobile: '50% 45%' }),
  nailsAlmond: img('work-nails-almond', 1400, 1750, 'Nude chrome almond nails resting on tailored trousers.', '1679931992300-0ac06f445c16'),
} satisfies Record<string, Media>;
