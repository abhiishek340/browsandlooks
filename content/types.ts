/** A business fact. `placeholder` values are development stand-ins and must be
 * replaced before launch — `npm run check:content` lists every one. */
export type Fact<T> = { value: T; status: 'verified' | 'placeholder' };

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type OpeningHours = { day: DayOfWeek; opens?: string; closes?: string };

export type PostalAddress = {
  street?: string;
  locality: string;
  region: string;
  postalCode?: string;
  country: string;
};

export type Business = {
  name: string;
  description: string;
  phone?: Fact<string>;
  email?: Fact<string>;
  whatsapp?: Fact<string>;
  address?: Fact<PostalAddress>;
  hours?: Fact<OpeningHours[]>;
  timezone: string;
  directionsUrl?: Fact<string>;
  bookingUrl?: Fact<string>;
  siteUrl?: Fact<string>;
  social: Fact<{ platform: string; url: string; handle: string }>[];
};

export type MediaKind = 'authentic' | 'conceptual' | 'placeholder';

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position values */
  focal: { desktop: string; mobile: string };
  kind: MediaKind;
  rights: string;
};

export type ServiceCategoryId = 'threading' | 'brows' | 'lashes' | 'nails' | 'waxing';

export type Price = { amount: number; qualifier?: 'from' };

export type Service = {
  id: string;
  category: ServiceCategoryId;
  name: string;
  summary?: string;
  price?: Fact<Price>;
  durationMinutes?: Fact<number>;
  bookingUrl?: string;
  /** Extras such as nail art: listed on the menu, never used as a category's "from" price */
  addOn?: boolean;
};

export type FAQ = { question: string; answer: string };

export type ServiceCategory = {
  id: ServiceCategoryId;
  slug: string;
  number: string;
  name: string;
  /** Headline with a single italic phrase, marked with *asterisks* */
  headline: string;
  summary: string;
  intro: string[];
  expect: string[];
  preparation?: Fact<string[]>;
  aftercare?: Fact<string[]>;
  faqs?: Fact<FAQ[]>;
  image: Media;
  detailImage?: Media;
};

export type GalleryItem = {
  id: string;
  category: 'brows' | 'nails' | 'lashes';
  media: Media;
  caption?: string;
  /** Layout hint for the editorial grid */
  span: 'tall' | 'wide' | 'square';
};

export type Testimonial = {
  quote: string;
  name: string;
  source: string;
  sourceUrl?: string;
  basis: string;
};
