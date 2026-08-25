import Photo, { ImageNote } from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

export default function SauceSection() {
  return (
    <section className="washi-grain relative bg-washi px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="04" en="SECRET SAUCE" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              受け継がれて
              <br />
              きた、味。
            </h2>

            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] md:text-base">
              <p>
                タレの中身は、書きません。書けるようなものでもありません。ただ、創業のころからの鍋を、継ぎ足しながら使い続けてきた、ということだけは確かです。
              </p>
              <p>
                鰻をくぐらせるたび、鰻の脂がタレに落ちる。そのタレをまた次の鰻がまとう。毎日それを繰り返してきたぶんだけ、味が積み重なっています。今日つくって明日出せるものではない、というのはそういう意味です。
              </p>
              <p>
                受け継いできたのは、タレだけではありません。火の見方も、包み方も、店の開け方も。全部ひとまとまりで、今日の一尾になります。
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Reveal className="col-span-12 sm:col-span-7" slow>
              <Photo photo={photos.tareDip} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 52vw, 30vw" className="h-auto w-full" />
              <p className="mt-4 text-[0.72rem] leading-relaxed opacity-60">
                焼いては、くぐらせる。何度も。
              </p>
            </Reveal>
            <Reveal className="col-span-7 col-start-6 -mt-14 sm:col-span-5 sm:col-start-8 sm:mt-24" delay={140} slow>
              <Photo photo={photos.tareBottles} sizes="(max-width: 640px) 58vw, (max-width: 1024px) 38vw, 20vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-12 mt-4" delay={220} slow>
              <figure>
                <Photo photo={photos.imgTareBrush} sizes="(max-width: 1024px) 92vw, 48vw" className="h-auto w-full" />
                <figcaption className="mt-3 flex items-center gap-3 text-[0.72rem] opacity-60">
                  <span>刷毛でタレを重ねながら、火に戻す。</span>
                  <ImageNote photo={photos.imgTareBrush} />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
