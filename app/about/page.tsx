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
  title: '店と仕事のこと｜明治創業、和歌山市南大工町の老舗',
  description:
    '和歌山市南大工町の「トリハル」は、明治創業の焼き鳥・鰻の持ち帰り専門店です。120年以上、同じ場所で、毎朝鰻を捌き、紀州備長炭で焼き続けてきました。店の成り立ちと仕事への考え方をご紹介します。',
  path: '/about',
  ogImage: '/photos/storefront.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'トリハルについて', href: '/about' },
];

const values = [
  {
    en: 'EXPERIENCE',
    title: '毎朝、この店で捌く',
    body: '生きた鰻を仕入れ、その日の朝に開く。よそで開かれたものを仕入れて焼くのではありません。捌く手が店にあるということが、鰻屋の中身だと思っています。',
  },
  {
    en: 'EXPERTISE',
    title: '火は、毎日ちがう',
    body: '炭の状態も、鰻の脂も、その日の気温も違います。決まった時間で焼けるものではないので、目と耳と鼻で決めます。技術というより、続けてきた時間のぶんの慣れです。',
  },
  {
    en: 'AUTHORITY',
    title: '同じ場所で、百二十年以上',
    body: '明治に南大工町で始めて、いまも同じ町にいます。支店は出していません。うまくやる方法があったとしても、一軒でやるほうが、目が届きます。',
  },
  {
    en: 'TRUST',
    title: '売っているものを、隠さない',
    body: '国産の活鰻、国産の鶏、紀州備長炭、自家製のタレ。産地の細かいところまで書き立てはしませんが、書いていることは全部ほんとうのことです。',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        en="ABOUT"
        title="トリハルについて"
        lead="和歌山市南大工町、フォルテワジマの西隣。明治に創業して、120年以上ここで焼き鳥と鰻を売ってきました。特別な日のための店というより、和歌山の人の日常のなかにあった店です。"
        photo={photos.storefront}
        crumbs={crumbs}
        position="center 42%"
      />

      {/* 店の話 */}
      <section className="washi-grain bg-washi px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionLabel en="OUR STORY" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              変わらないことが、
              <br />
              仕事でした。
            </h2>
            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] md:text-base">
              <p>
                トリハルは、明治のころに和歌山市の南大工町で始まりました。以来、扱っているものはほとんど変わっていません。鰻と、焼き鳥。それを焼いて、包んで、お渡しする。
              </p>
              <p>
                派手な出来事があった店ではありません。長く続いた理由も、たぶん特別なものではないと思います。毎朝きちんと鰻を捌いて、炭に火を入れて、焼いたぶんだけ売る。その繰り返しを、途切れさせなかった、というだけのことです。
              </p>
              <p>
                「老舗」と言われるようになりましたが、身構えて入るような店ではありません。ショーケースをのぞいて、串を二本頼む。それでいい店です。実際、そうやって寄っていただくお客さんに支えられてきました。
              </p>
              <p>
                いまも、朝の桶には鰻が泳いでいます。開店前から焼き場には火が入っています。夕方には、その日のぶんが売り切れていることもあります。百二十年前と、たぶんそう変わらない一日です。
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Reveal className="col-span-7" slow>
              <Photo photo={photos.sabaki02} sizes="(max-width: 1024px) 55vw, 26vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-5 mt-20" delay={120} slow>
              <Photo photo={photos.sansho} sizes="(max-width: 1024px) 40vw, 19vw" className="h-auto w-full" />
              <p className="mt-3 text-[0.72rem] leading-relaxed opacity-60">紀州の山椒を、鰻に添えて。</p>
            </Reveal>
            <Reveal className="col-span-12" delay={200} slow>
              <Photo photo={photos.scale} sizes="(max-width: 1024px) 92vw, 44vw" className="h-auto w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 仕事への考え方 */}
      <section className="bg-sumi px-5 py-24 text-kinari md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="WHAT WE KEEP" className="text-honoo" />
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              守っている、四つのこと。
            </h2>
          </Reveal>

          <ol className="mt-14 border-t border-kinari/15">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.en}
                delay={i * 90}
                className="grid gap-4 border-b border-kinari/12 py-9 md:grid-cols-[9rem_1fr] md:gap-12"
              >
                <p className="eyebrow pt-1 text-honoo">{v.en}</p>
                <div>
                  <h3 className="display text-[1.25rem] tracking-[0.06em] md:text-[1.45rem]">{v.title}</h3>
                  <p className="mt-3 max-w-[38rem] text-[0.92rem] leading-[2.05] text-kinari/85">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16 border-t border-kinari/15 pt-10">
            <h2 className="display text-xl tracking-[0.06em]">会社概要</h2>
            <dl className="mt-8 max-w-2xl text-[0.92rem]">
              {[
                ['商号', shop.legalName],
                ['屋号', shop.name],
                ['所在地', shop.address.full],
                ['電話番号', shop.tel],
                ['営業時間', shop.hours.label],
                ['定休日', shop.hours.closedDays.join('・')],
                ['事業内容', '鰻・焼き鳥の製造および販売（持ち帰り専門）、鶏肉・生肉の販売'],
                ['店舗数', '1店舗（和歌山市南大工町）'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-kinari/12 py-4 sm:grid-cols-[9rem_1fr] sm:gap-8"
                >
                  <dt className="text-[0.74rem] tracking-[0.14em] opacity-55">{k}</dt>
                  <dd className="leading-[1.9] text-kinari/90">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/unagi" className="rule-link text-honoo">
                鰻の仕事について
              </Link>
              <Link href="/access" className="rule-link text-honoo">
                店舗・アクセス
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="店舗のご案内" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
