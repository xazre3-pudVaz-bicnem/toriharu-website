import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { faqItems } from '@/data/faq';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: 'よくあるご質問｜営業時間・予約・鰻の価格・全国発送',
  description:
    'トリハル（和歌山市南大工町）へよくいただくご質問をまとめました。営業時間と定休日、鰻の価格、焼き鳥のご予約、白焼き、全国発送、お支払い方法などについてお答えしています。',
  path: '/faq',
  ogImage: '/photos/showcase-menu.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'よくあるご質問', href: '/faq' },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        en="FAQ"
        title="よくあるご質問"
        lead="お店やお買い物についてよくいただくご質問をまとめました。ここにないことは、お電話でお気軽にお尋ねください。"
        photo={photos.showcaseMenu}
        crumbs={crumbs}
        position="center 42%"
      />

      <section className="bg-kinari px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[62rem]">
          <dl className="border-t border-sumi/20">
            {faqItems.map((item, i) => (
              <Reveal as="div" key={item.q} delay={(i % 5) * 60} className="border-b border-sumi/12 py-9">
                <dt className="display flex gap-4 text-[1.05rem] leading-[1.8] tracking-[0.04em] md:text-[1.15rem]">
                  <span aria-hidden className="shrink-0 text-tan">
                    Q.
                  </span>
                  <span>{item.q}</span>
                </dt>
                <dd className="mt-4 flex gap-4 text-[0.92rem] leading-[2.05] opacity-85">
                  <span aria-hidden className="shrink-0 opacity-70">
                    A.
                  </span>
                  <span className="max-w-[42rem]">{item.a}</span>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-14">
            <p className="text-[0.9rem] leading-[2.05]">
              そのほかのご質問は、お電話でお気軽にどうぞ。
            </p>
            <a
              href={shop.telHref}
              className="display mt-5 inline-flex text-[clamp(1.8rem,7vw,2.6rem)] tracking-[0.06em] text-tan tabular-nums"
              aria-label={`電話をかける ${shop.tel}`}
            >
              {shop.tel}
            </a>
            <p className="mt-3 text-[0.82rem] opacity-70">
              受付 {shop.hours.label}／定休日 {shop.hours.closedLabel}
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/menu" className="rule-link text-tan">
                商品一覧
              </Link>
              <Link href="/takeout" className="rule-link text-tan">
                持ち帰り・発送
              </Link>
              <Link href="/access" className="rule-link text-tan">
                店舗・アクセス
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="店舗のご案内" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqItems)} />
    </>
  );
}
