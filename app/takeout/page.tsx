import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '持ち帰り・全国発送について｜和歌山市のテイクアウト',
  description:
    'トリハル（和歌山市南大工町）は持ち帰り専門店です。焼き鳥は1本から、鰻は一尾から。ご予約の目安、あたため直しの方法、上焼き鰻・白焼きの全国発送（代金引換可）についてご案内します。',
  path: '/takeout',
  ogImage: '/photos/img-takeout.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '持ち帰り・発送', href: '/takeout' },
];

const steps = [
  {
    n: '01',
    title: '店頭へ',
    body: '南大工町の店頭、ショーケースに、その日焼き上がったものが並んでいます。串は1本から、鰻は一尾から。数が必要な日や、白焼きをご希望の場合は、先にお電話いただけると確実です。',
  },
  {
    n: '02',
    title: 'ご予約',
    body: 'ももやきとり以外の串は、日に0〜数本しか焼いていません。当日の朝9時頃までにお電話いただければ、5本以上からご用意できる場合があります（う肝を除く）。鰻の本数も、あらかじめご相談ください。',
  },
  {
    n: '03',
    title: 'お支払い',
    body: '現金のほか、クレジットカード（VISA・Mastercard）をご利用いただけます。',
  },
  {
    n: '04',
    title: '包んでお渡し',
    body: '蒲焼は竹皮に載せて包みます。串は本数にあわせて。お渡ししたら、なるべく早くお召し上がりください。',
  },
];

const reheat = [
  {
    title: '鰻の蒲焼',
    body: 'あたためすぎないことが要点です。ふんわりラップをかけて短時間だけあたためるか、フライパンに少量の酒をふって蓋をし、弱火で蒸すようにすると、身がかたくなりにくくなります。',
  },
  {
    title: '焼き鳥',
    body: '串のままトースターやグリルで、表面が温まる程度に。皮や手羽先は、少し焼き直すと香ばしさが戻ります。焼きすぎると身が締まるので、短めに。',
  },
  {
    title: '骨せんべい',
    body: 'そのままでも召し上がれますが、しけってしまったときは軽く焼き直すと、また音が戻ります。',
  },
];

export default function TakeoutPage() {
  return (
    <>
      <PageHero
        en="TAKEOUT"
        title="焼きたてを、持ち帰る"
        lead="トリハルに客席はありません。焼いたものを包んでお渡しする、持ち帰りのための店です。ご家庭の食卓へ、晩酌の肴に、人が集まる日のごちそうに。上焼き鰻・白焼きは全国発送も承っています。"
        photo={photos.imgTakeout}
        crumbs={crumbs}
        position="center 60%"
      />

      {/* 買い方 */}
      <section className="bg-kinari px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="HOW TO BUY" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              買い方は、かんたんです。
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-x-16 border-t border-sumi/15 md:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 80}
                className="grid grid-cols-[3rem_1fr] gap-5 border-b border-sumi/12 py-8 sm:grid-cols-[4rem_1fr]"
              >
                <span className="eyebrow pt-1 text-tan tabular-nums">{s.n}</span>
                <div>
                  <h3 className="display text-lg tracking-[0.06em]">{s.title}</h3>
                  <p className="mt-3 text-[0.89rem] leading-[2] opacity-80">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 発送 */}
      <section className="bg-sumi text-kinari">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[52svh] lg:min-h-[80svh]" slow>
            <Photo photo={photos.kabayakiWrapped02} fill sizes="(max-width: 1023px) 100vw, 50vw" position="center 45%" />
          </Reveal>

          <div className="flex items-center px-5 py-20 md:px-10 md:py-28 lg:px-20">
            <Reveal className="max-w-[34rem]">
              <SectionLabel en="SHIPPING" className="text-honoo" />
              <h2 className="display mt-8 text-[clamp(1.7rem,6vw,2.7rem)] leading-[1.45] tracking-[0.08em]">
                遠くのご家族へ。
              </h2>
              <div className="mt-9 space-y-6 text-[0.93rem] leading-[2.1] text-kinari/85">
                <p>
                  上焼き鰻・鰻の白焼きは、全国発送を承っています。ご進物用にも、ご自宅用にも。宅急便コレクト（代金引換）もご利用いただけます。
                </p>
                <p>
                  本数、お届け先、ご希望のお届け日をお伺いしてからのご手配になりますので、まずはお電話でご相談ください。土用の丑の日やお盆、年末年始など、鰻のご入り用が重なる時期は、お早めにご連絡いただけると確実です。
                </p>
              </div>

              <a
                href={shop.telHref}
                className="display mt-10 inline-flex text-[clamp(1.8rem,7vw,2.6rem)] tracking-[0.06em] text-honoo tabular-nums"
                aria-label={`電話をかける ${shop.tel}`}
              >
                {shop.tel}
              </a>
              <p className="mt-3 text-[0.82rem] text-kinari/70">
                受付 {shop.hours.label}／定休日 {shop.hours.closedDays.join('・')}
                <br />
                {shop.hours.closedNote}
              </p>

              <figure className="mt-12">
                <Photo photo={photos.imgUnaju} sizes="(max-width: 1023px) 92vw, 32vw" className="h-auto w-full" />
                <figcaption className="mt-3 flex items-center gap-3 text-[0.72rem] text-kinari/55">
                  <span>届いたその日に、あたたかいごはんと。</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* あたため直し */}
      <section className="washi-grain bg-washi px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="AT HOME" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.7rem,6vw,2.7rem)] leading-[1.45] tracking-[0.08em]">
              家に着いてからの、ひと手間。
            </h2>
            <p className="mt-8 max-w-[36rem] text-[0.92rem] leading-[2.05] opacity-85">
              買ってすぐが、いちばんおいしい状態です。少し時間が経ったときは、次のようにしていただくと、焼きたてに近づきます。
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-16 border-t border-sumi/15 md:grid-cols-3">
            {reheat.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 90} className="border-b border-sumi/12 py-8">
                <h3 className="display text-lg tracking-[0.06em] text-tare">{r.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-[2] opacity-80">{r.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/menu" className="rule-link text-tan">
              商品一覧を見る
            </Link>
            <Link href="/faq" className="rule-link text-tan">
              よくあるご質問
            </Link>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="店舗のご案内" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
