import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // 本番URLが決まらない = 手元かプレビュー、とみなして全面 Disallow（lib/site.ts）
  if (!siteUrl) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    host: siteUrl,
  };
}
