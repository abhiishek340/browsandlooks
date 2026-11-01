import { BookingFinale } from '@/components/home/BookingFinale';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { PageIntro } from '@/components/ui/PageIntro';
import { gallery, MIN_PER_FILTER } from '@/content/gallery';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Our Work',
  description: 'Brows, lashes and nails by Browandlooks in Salt Lake City.',
  path: '/our-work',
});

export default function OurWorkPage() {
  return (
    <>
      <PageIntro
        label="Our work"
        title="Details, *up close.*"
        lead="A selection of brows, lashes and nails. Select any image to see it larger."
      />
      {gallery.length > 0 ? (
        <GalleryGrid items={gallery} minPerFilter={MIN_PER_FILTER} />
      ) : (
        <p className="container" style={{ paddingBottom: 'var(--section-space)' }}>
          Our portfolio is being photographed. Follow along in the studio soon.
        </p>
      )}
      <BookingFinale title="Your look, *next.*" />
    </>
  );
}
