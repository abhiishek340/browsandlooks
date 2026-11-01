import { BookingFinale } from '@/components/home/BookingFinale';
import { ClientExperiences } from '@/components/home/ClientExperiences';
import { CraftStory } from '@/components/home/CraftStory';
import { HeroEditorial } from '@/components/home/HeroEditorial';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ServiceMarquee } from '@/components/home/ServiceMarquee';
import { StudioIntroduction } from '@/components/home/StudioIntroduction';
import { TreatmentExplorer } from '@/components/home/TreatmentExplorer';
import { VisitSummary } from '@/components/home/VisitSummary';
import { gallery, testimonials } from '@/content/gallery';
import { categories, formatPrice, servicesFor } from '@/content/services';

export default function HomePage() {
  const menu = categories.map((c) => {
    const priced = servicesFor(c.id).filter((s) => s.price && !s.addOn);
    const cheapest = priced.sort((a, b) => a.price!.value.amount - b.price!.value.amount)[0];
    return {
      id: c.id,
      slug: c.slug,
      number: c.number,
      name: c.name,
      summary: c.summary,
      image: c.image,
      fromPrice: cheapest?.price ? formatPrice({ ...cheapest.price, value: { amount: cheapest.price.value.amount } }) : undefined,
    };
  });

  return (
    <>
      <HeroEditorial />
      <TreatmentExplorer items={menu} />
      <CraftStory />
      <ServiceMarquee />
      <SelectedWork items={gallery} />
      <StudioIntroduction />
      <ClientExperiences items={testimonials} />
      <VisitSummary />
      <BookingFinale />
    </>
  );
}
