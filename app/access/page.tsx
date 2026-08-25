import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '店舗・アクセス｜和歌山市南大工町20（フォルテワジマ西隣）',
  description:
    'トリハルの所在地・営業時間・アクセスのご案内です。〒640-8032 和歌山県和歌山市南大工町20、フォルテワジマの西隣。営業時間8:30〜17:00、定休日は火曜日。TEL 073-422-4088。',
  path: '/access',
  ogImage: '/photos/storefront.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '店舗・アクセス', href: '/access' },
];

const routes = [
  {
    title: '電車でお越しの方',
    body: '南海本線・和歌山市駅から東へ、徒歩圏内です。和歌山城の西側、市堀川沿いの一帯にあたります。',
  },
  {
    title: '目印',
    body: 'フォルテワジマの西隣です。赤い庇と「トリハル」の看板、そして店頭のショーケースが目印になります。',
  },
  {
    title: 'お車でお越しの方',
    body: '専用駐車場の有無については、お手数ですが事前にお電話でご確認ください。周辺には市街地の駐車場が点在しています。',
  },
  {
    title: 'ご注意',
    body: '店舗は南大工町の1店舗のみです。同名の別店舗はございません。店内に客席はなく、お持ち帰り専門となります。',
  },
];

export default function AccessPage() {
  return (
    <>
      <PageHero
        en="ACCESS"
        title="店舗・アクセス"
        lead="和歌山県和歌山市南大工町20、フォルテワジマの西隣。南海和歌山市駅から東へ歩いてお越しいただける場所にあります。営業時間は8:30〜17:00、定休日は火曜日です。"
        photo={photos.storefront}
        crumbs={crumbs}
        position="center 40%"
      />

      <ShopInfo heading="店舗情報" mapClassName="h-[62svh] md:h-[78svh]" />

      <section className="bg-kinari px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="DIRECTIONS" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.7rem,6vw,2.7rem)] leading-[1.45] tracking-[0.08em]">
              お越しになるとき。
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-x-16 border-t border-sumi/15 md:grid-cols-2">
            {routes.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80} className="border-b border-sumi/12 py-8">
                <h3 className="display text-lg tracking-[0.06em]">{r.title}</h3>
                <p className="mt-3 max-w-[32rem] text-[0.89rem] leading-[2] opacity-80">{r.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 border-t border-sumi/15 pt-10">
            <h2 className="display text-xl tracking-[0.06em]">お電話でのお問い合わせ</h2>
            <a
              href={shop.telHref}
              className="display mt-6 inline-flex text-[clamp(2rem,8vw,3rem)] tracking-[0.06em] text-tan tabular-nums"
              aria-label={`電話をかける ${shop.tel}`}
            >
              {shop.tel}
            </a>
            <p className="mt-4 max-w-[34rem] text-[0.86rem] leading-[2] opacity-75">
              受付時間 {shop.hours.label}／定休日 {shop.hours.closedDays.join('・')}
              <br />
              {shop.hours.closedNote}
              <br />
              鰻の本数、白焼きのご希望、串のご予約、発送のご相談などは、お電話でお願いいたします。
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <a
                href={shop.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link text-tan"
              >
                Googleマップで開く
              </a>
              <a
                href={shop.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link text-tan"
              >
                Instagram {shop.instagramHandle}
              </a>
              <Link href="/faq" className="rule-link text-tan">
                よくあるご質問
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
