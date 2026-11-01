import type { Metadata } from 'next';
import { business } from '@/content/business';

export const siteUrl = business.siteUrl?.value ?? 'http://localhost:3000';

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} · ${business.name}` : business.name,
      description,
      url: path,
      siteName: business.name,
      locale: 'en_US',
      type: 'website',
    },
  };
}
