import { shop } from '@/data/shop';
import { faqItems, type FaqItem } from '@/data/faq';
import { absoluteUrl, defaultDescription } from '@/lib/site';

const dayMap: Record<string, string> = {
  月曜日: 'Monday',
  火曜日: 'Tuesday',
  水曜日: 'Wednesday',
  木曜日: 'Thursday',
  金曜日: 'Friday',
  土曜日: 'Saturday',
  日曜日: 'Sunday',
};

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/*
 * OpeningHoursSpecification は曜日単位でしか書けないため、
 * 毎週の定休日（火曜）だけを反映する。
 * 「第3水曜日」は構造化データでは正確に表せないので入れない
 * （水曜を全休にすると、第3週以外の水曜まで休みだと誤って伝わるため）。
 * 画面上には shop.hours.closedLabel / closedNote で明記している。
 */
const openDays = ALL_DAYS.filter(
  (d) => !shop.hours.closedDays.map((c) => dayMap[c]).includes(d),
);

/** 実態は「焼き鳥・鰻の持ち帰り専門店」なので Store を主体に FoodEstablishment を併記 */
export function localBusinessJsonLd() {
  const url = absoluteUrl('/');
  const image = absoluteUrl('/photos/storefront.jpg');

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'FoodEstablishment'],
    '@id': url ? `${url}#store` : undefined,
    name: shop.name,
    legalName: shop.legalName,
    alternateName: shop.nameEn,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      postalCode: shop.address.postalCode,
      addressRegion: shop.address.prefecture,
      addressLocality: shop.address.city,
      streetAddress: shop.address.line,
      addressCountry: shop.address.country,
    },
    telephone: shop.tel,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openDays,
        opens: shop.hours.open,
        closes: shop.hours.close,
      },
    ],
    servesCuisine: ['鰻', '焼き鳥'],
    // 店内飲食はしていない
    takeoutAvailable: true,
    acceptsReservations: false,
    paymentAccepted: '現金, VISA, Mastercard',
    currenciesAccepted: 'JPY',
    sameAs: [shop.instagram],
  };

  if (url) data.url = url;
  if (image) data.image = [image];
  if (shop.geo) {
    data.geo = { '@type': 'GeoCoordinates', latitude: shop.geo.lat, longitude: shop.geo.lng };
  }

  return prune(data);
}

export function websiteJsonLd() {
  const url = absoluteUrl('/');
  if (!url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: shop.name,
    inLanguage: 'ja',
    publisher: { '@id': `${url}#store` },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const items = crumbs
    .map((c, i) => {
      const item = absoluteUrl(c.href);
      return item
        ? { '@type': 'ListItem', position: i + 1, name: c.name, item }
        : { '@type': 'ListItem', position: i + 1, name: c.name };
    })
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/** 画面に出しているFAQと同じ内容だけを渡すこと */
export function faqJsonLd(items: FaqItem[] = faqItems) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function blogPostingJsonLd(args: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  const url = absoluteUrl(`/blog/${args.slug}`);
  if (!url) return null;
  const home = absoluteUrl('/');
  const image = absoluteUrl(args.image ?? '/opengraph-image');

  return prune({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: args.publishedAt,
    dateModified: args.updatedAt ?? args.publishedAt,
    image: image ? [image] : undefined,
    inLanguage: 'ja',
    author: { '@type': 'Organization', name: shop.legalName, url: home ?? undefined },
    publisher: home ? { '@id': `${home}#store` } : { '@type': 'Organization', name: shop.legalName },
  });
}

/** undefined のキーを落とす */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}
