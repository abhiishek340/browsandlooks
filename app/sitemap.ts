import type { MetadataRoute } from 'next';
import { categories, hasDetailPage } from '@/content/services';
import { siteUrl } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/our-work', '/the-studio', '/visit', '/privacy'];
  const treatments = categories.filter(hasDetailPage).map((c) => `/services/${c.slug}`);
  return [...routes, ...treatments].map((path) => ({ url: `${siteUrl}${path}` }));
}
