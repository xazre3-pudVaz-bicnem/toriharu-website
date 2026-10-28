import type { Metadata, Viewport } from 'next';
import { Noto_Serif_JP } from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { defaultDescription, isPublic, siteName, siteUrl } from '@/lib/site';
import { shop } from '@/data/shop';

/*
 * Webフォントは見出しの明朝だけ。本文は端末の標準ゴシック（app/globals.css）。
 * 日本語のWebフォントは1書体でもページあたり1MB以上になるため、本文まで読み込まない。
 */
const serif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
  preload: false,
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${shop.name}｜${shop.tagline}`,
    template: `%s｜${shop.name}`,
  },
  description: defaultDescription,
  applicationName: shop.name,
  keywords: [
    '和歌山市 焼き鳥',
    '和歌山市 鰻',
    '和歌山市 うなぎ',
    '和歌山市 テイクアウト',
    '和歌山市 持ち帰り専門店',
    '紀州備長炭 焼き鳥',
    '国産鰻 和歌山',
    'トリハル',
  ],
  authors: [{ name: shop.legalName }],
  creator: shop.legalName,
  publisher: shop.legalName,
  formatDetection: { telephone: true, address: false, email: false },
  robots: isPublic
    ? { index: true, follow: true, 'max-image-preview': 'large' }
    : { index: false, follow: false },
  ...(isPublic
    ? {
        openGraph: {
          type: 'website',
          siteName,
          locale: 'ja_JP',
          url: siteUrl!,
          title: `${shop.name}｜${shop.tagline}`,
          description: defaultDescription,
        },
        twitter: { card: 'summary_large_image' },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#181411',
  colorScheme: 'light',
};

/**
 * 期間限定の案内（data/vouchers.ts）を期間どおりに出し入れするため、
 * ページを1時間ごとに作り直す。外すと、期間が過ぎても次のデプロイまで表示が残る。
 */
export const revalidate = 3600;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={serif.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-sumi focus:px-4 focus:py-2 focus:text-kinari"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
