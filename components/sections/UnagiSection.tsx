import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

export default function UnagiSection() {
  return (
    <section className="relative bg-sumi text-kinari">
      {/* 全幅の一枚 */}
      <Reveal slow>
        <figure className="relative h-[62svh] w-full md:h-[80svh]">
          <Photo
            photo={photos.liveEels}
            fill
            sizes="100vw"
            position="center 45%"
          />
          <div aria-hidden className="absolute inset-0 bg-sumi/25" />
          <figcaption className="absolute bottom-6 left-5 text-[0.72rem] tracking-[0.14em] text-kinari/75 md:bottom-10 md:left-10">
            桶のなかの活鰻。ここから一日が始まります。
          </figcaption>
        </figure>
      </Reveal>

      <div className="mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="02" en="UNAGI" className="text-honoo" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              朝、捌くところ
              <br />
              から始まる。
            </h2>

            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
              <p>
                トリハルが使うのは、国産の活鰻です。生きたまま仕入れた鰻を、毎朝、この店の作業台で一尾ずつ捌きます。よそで開かれたものを焼くのではなく、朝いちばんの仕事がそこから始まる。
              </p>
              <p>
                捌いた鰻は、まず素焼きにします。皮目から、身から、火の当たり方を見ながら返していく。ここで余分な脂を落とし、身をふっくらと立たせておく。この段階のものが、白焼きです。
              </p>
              <p>
                そこへ、代々つぎ足してきた秘伝のタレをくぐらせて、また焼く。くぐらせては焼き、くぐらせては焼き。何度も重ねて、あの照りになります。
              </p>
            </div>

            <Link href="/unagi" className="rule-link mt-12 inline-flex text-honoo">
              鰻について、詳しく
            </Link>
          </Reveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Reveal className="col-span-12" slow>
              <Photo photo={photos.kabayakiShowcase} sizes="(max-width: 1023px) 92vw, 46vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-9 col-start-4 mt-2" delay={200} slow>
              <Photo photo={photos.kabayakiTray} sizes="(max-width: 1023px) 70vw, 34vw" className="h-auto w-full" />
              <p className="mt-4 text-[0.72rem] leading-relaxed text-kinari/55">
                焼き上がった蒲焼。表面の焦げと照りは、タレを重ねた回数のぶんだけ。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
