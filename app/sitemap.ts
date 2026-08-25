import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { siteUrl } from '@/lib/site';

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/unagi', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/yakitori', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/menu', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/takeout', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/seasonal', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/access', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 本番URLが未設定のときは何も出力しない（プレビューURLの誤インデックス防止）
  if (!siteUrl) return [];
  const base = siteUrl;

  const posts = getAllPosts();
  const latest = posts[0]?.updatedAt;

  return [
    ...staticRoutes.map((r) => ({
      url: new URL(r.path, base).toString(),
      lastModified: r.path === '/blog' && latest ? new Date(latest) : new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      url: new URL(`/blog/${p.slug}`, base).toString(),
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
