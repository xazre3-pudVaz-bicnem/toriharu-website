import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import SeasonalSection from '@/components/sections/SeasonalSection';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '季節の一品｜土用の丑の日・お盆・年末年始のご用意',
  description:
    '和歌山市南大工町のトリハルの、季節限定商品と時期ごとのご案内です。土用の丑の日やお盆、年末年始は鰻のご入り用が重なります。数に限りがありますので、お早めにご相談ください。',
  path: '/seasonal',
  ogImage: '/photos/kabayaki-wrapped-01.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '季節の一品', href: '/seasonal' },
];

/** 年ごとに日付が変わる行事は日付を書かない（毎年の更新が不要な書き方にする） */
const calendar = [
  {
    season: '春',
    body: '入学や就職のお祝い、親戚の集まり。人数が読める日は、前もってご相談いただけると確実です。',
  },
  {
    season: '夏',
    body: '土用の丑の日を挟む時期は、一年でいちばん鰻が動きます。日にちは年によって変わりますので、その年の暦をご確認のうえ、お早めにご予約ください。お盆の帰省にあわせたご用意も承ります。',
  },
  {
    season: '秋',
    body: '敬老の日など、贈りものの機会が増える時期です。ご進物用の発送も承っています。',
  },
  {
    season: '冬',
    body: '年末年始は人が集まる日が続きます。年内最終・年始の営業日は、店頭またはお電話でご確認ください。',
  },
];

export default function SeasonalPage() {
  return (
    <>
      <PageHero
        en="SEASONAL"
        title="季節の一品"
        lead="仕入れと暦にあわせて、店頭に並ぶものは少しずつ変わります。季節限定でご用意する品があるときは、このページでご案内します。数に限りがある品も多いので、日にちが決まっている場合はお早めにご相談ください。"
        photo={photos.kabayakiWrapped01}
        crumbs={crumbs}
        position="center 45%"
      />

      <SeasonalSection compact />

      <section className="bg-kinari px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <p className="eyebrow text-tan">CALENDAR</p>
            <h2 className="display mt-7 text-[clamp(1.7rem,6vw,2.7rem)] leading-[1.45] tracking-[0.08em]">
              一年の、忙しい時期。
            </h2>
          </Reveal>

          <ul className="mt-12 border-t border-sumi/15">
            {calendar.map((c, i) => (
              <Reveal
                as="li"
                key={c.season}
                delay={i * 80}
                className="grid grid-cols-[3.5rem_1fr] gap-6 border-b border-sumi/12 py-8 sm:grid-cols-[7rem_1fr] sm:gap-12"
              >
                <h3 className="display text-xl tracking-[0.14em] text-tan">{c.season}</h3>
                <p className="max-w-[38rem] text-[0.92rem] leading-[2.05]">{c.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-4">
            <a href={shop.telHref} className="display text-2xl tracking-[0.06em] text-tan tabular-nums">
              {shop.tel}
            </a>
            <p className="text-[0.82rem] opacity-70">
              受付 {shop.hours.label}／定休日 {shop.hours.closedLabel}
            </p>
            <Link href="/takeout" className="rule-link text-tan">
              持ち帰り・発送について
            </Link>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="店舗のご案内" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
