import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

const scenes = [
  { title: '家族の食卓へ', body: '仕事の帰りに寄って、串を何本か。今日のもう一品として。' },
  { title: '晩酌の一本に', body: 'もも、皮、肝。塩気と炭の香りが、そのまま酒の肴になります。' },
  { title: 'お祝いの日に', body: '人が集まる日は、鰻を。数がいる日は、前もってご相談ください。' },
  { title: '土用の丑の日', body: '一年でいちばん忙しい日です。お早めのご予約が確実です。' },
  { title: '手土産として', body: '竹皮に包んだ蒲焼は、持っていく形としても収まりがいい。' },
  { title: '遠くのご家族へ', body: '上焼き鰻・白焼きは全国発送を承ります。代金引換もご利用いただけます。' },
];

export default function TakeoutSection() {
  return (
    <section className="relative bg-sumi text-kinari">
      <Reveal slow>
        <figure className="relative h-[50svh] w-full md:h-[70svh]">
          <Photo photo={photos.imgTakeout} fill sizes="100vw" position="center 60%" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sumi via-transparent to-sumi/50" />
        </figure>
      </Reveal>

      <div className="mx-auto max-w-[92rem] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="10" en="TAKEOUT" className="text-honoo" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              その日に焼いたものを、
              <br />
              持ち帰る。
            </h2>
            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
              <p>
                トリハルに客席はありません。その日に焼いたものを包んで、お渡しする。それだけの店です。だからこそ、家に着いてからがいちばんおいしい、という焼き方をしています。
              </p>
              <p>
                串は1本から。鰻は一尾から。「今日は二本だけ」でも、どうぞ気兼ねなく。
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/takeout" className="rule-link text-honoo">
                持ち帰り・発送について
              </Link>
              <Link href="/access" className="rule-link text-honoo">
                店舗・アクセス
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-x-10 border-t border-kinari/15 sm:grid-cols-2">
              {scenes.map((s) => (
                <li key={s.title} className="border-b border-kinari/12 py-6">
                  <h3 className="display text-[1.05rem] tracking-[0.06em] text-honoo">{s.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-[2] text-kinari/80">{s.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
