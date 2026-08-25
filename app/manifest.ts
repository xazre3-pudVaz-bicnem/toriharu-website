import type { MetadataRoute } from 'next';
import { shop } from '@/data/shop';
import { defaultDescription } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${shop.name}｜${shop.tagline}`,
    short_name: shop.name,
    description: defaultDescription,
    lang: 'ja',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f0',
    theme_color: '#181411',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
