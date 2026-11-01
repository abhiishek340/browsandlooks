import type { MetadataRoute } from 'next';
import { isLaunchBuild } from '@/content/business';
import { siteUrl } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  // Preview builds contain placeholder facts, so they are kept out of search indexes.
  if (!isLaunchBuild) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
