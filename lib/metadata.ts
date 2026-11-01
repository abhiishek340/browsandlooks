import type { Metadata } from 'next';
import { business } from '@/content/business';

/** The confirmed domain once verified; until then the Vercel production URL, so canonical
 *  links and social previews always point at a site that exists. */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl =
  business.siteUrl?.status === 'verified'
    ? business.siteUrl.value
    : vercelUrl
      ? `https://${vercelUrl}`
      : 'http://localhost:3000';

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
