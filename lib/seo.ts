import type { Metadata } from 'next';
import { absoluteUrl, defaultDescription, isPublic, siteName } from '@/lib/site';
import { shop } from '@/data/shop';

type BuildMetaArgs = {
  /** ページ固有のタイトル（サイト名は自動で付きます） */
  title: string;
  description: string;
  /** '/unagi' のようなパス */
  path: string;
  /** OG画像に使う絶対パス（省略時はサイト共通のOG画像） */
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: BuildMetaArgs): Metadata {
  const canonical = absoluteUrl(path);
  const image = ogImage ? absoluteUrl(ogImage) : absoluteUrl('/opengraph-image');

  const meta: Metadata = {
    title,
    description,
    robots:
      noindex || !isPublic
        ? { index: false, follow: false }
        : { index: true, follow: true, 'max-image-preview': 'large' },
  };

  if (canonical) {
    meta.alternates = { canonical };
    meta.openGraph = {
      type: ogType,
      title: `${title}｜${shop.name}`,
      description,
      url: canonical,
      siteName,
      locale: 'ja_JP',
      images: image ? [{ url: image, width: 1200, height: 630, alt: shop.name }] : undefined,
      ...(ogType === 'article' ? { publishedTime, modifiedTime } : {}),
    };
    meta.twitter = {
      card: 'summary_large_image',
      title: `${title}｜${shop.name}`,
      description,
      images: image ? [image] : undefined,
    };
  }

  return meta;
}

export { defaultDescription };
