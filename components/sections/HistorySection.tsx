import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

/**
 * 年表はつくらない。確認できていない創業年・出来事を並べないため、
 * 「いまも続いていること」を軸に構成する。
 */
const kept = [
  {
    title: '朝、鰻を捌く',
    body: '生きた鰻を仕入れ、この店で開く。開いてから焼くまでを一日のうちに終える、という順番を変えていません。',
  },
  {
    title: '炭で焼く',
    body: '紀州備長炭の火で焼く。手間も費用もかかりますが、身の入り方が違うので、ここは譲れないところです。',
  },
  {
    title: 'タレを継ぐ',
    body: '創業のころからのタレを、毎日つぎ足しながら使っています。鰻の脂が落ちて、また次の鰻がまとう。',
  },
  {
    title: '南大工町で',
    body: '支店は出さず、南大工町の一軒だけで商いを続けています。この店に来ていただく、その形のままで。',
  },
];

export default function HistorySection() {
  return (
    <section className="relative bg-kinari px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="09" en="HISTORY" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              続けてきた、
              <br />
              ということ。
            </h2>
            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] md:text-base">
              <p>
                明治に創業して、百二十年以上。長く続いた店には、たいてい派手な話はありません。同じ場所で、同じ仕事を、毎日繰り返してきただけです。
              </p>
              <p>
                和歌山の人にとってのトリハルは、記念日の店というより、いつもの店だったと思います。夕方に寄って、串を何本か包んでもらう。用があれば鰻を頼む。そういう日常のなかに、ずっとありました。
              </p>
            </div>
            <Link href="/about" className="rule-link mt-10 inline-flex text-tan">
              店のことを、もう少し
            </Link>
          </Reveal>

          <div>
            <Reveal slow>
              <Photo
                photo={photos.sabaki02}
                sizes="(max-width: 1023px) 92vw, 46vw"
                className="h-auto w-full"
              />
            </Reveal>

            <ol className="mt-12 border-t border-sumi/15">
              {kept.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 90} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-sumi/12 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                  <span className="eyebrow pt-1 text-tan tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display text-lg tracking-[0.06em]">{item.title}</h3>
                    <p className="mt-2 text-[0.88rem] leading-[2] opacity-80">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
