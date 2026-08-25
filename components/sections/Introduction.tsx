import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

export default function Introduction() {
  return (
    <section className="washi-grain relative bg-kinari px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <Reveal>
          <SectionLabel index="01" en="INTRODUCTION" className="text-tan" />

          <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
            和歌山で、
            <br />
            百二十年以上。
          </h2>

          <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] md:text-base">
            <p>
              明治のころ、和歌山市の南大工町に店を構えました。以来、変わらず焼き鳥と鰻を売っています。
            </p>
            <p>
              店内に客席はありません。買って、持って帰っていただくための店です。夕方の食卓に、晩酌の一本に、人が集まる日のごちそうに。和歌山の人の暮らしのなかで、ずっとそういう場所でした。
            </p>
            <p>
              いまも毎朝、国産の活鰻をこの店で捌きます。紀州備長炭に火を入れ、受け継いできたタレで一尾ずつ焼く。やっていることは、百年前とそう変わりません。
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/about" className="rule-link text-tan">
              トリハルについて
            </Link>
            <Link href="/menu" className="rule-link text-tan">
              商品一覧を見る
            </Link>
          </div>
        </Reveal>

        {/* 左右非対称の写真配置 */}
        <div className="grid grid-cols-12 items-start gap-4 md:gap-6">
          <Reveal className="col-span-8 col-start-1 lg:col-span-7" slow>
            <Photo
              photo={photos.storefront}
              sizes="(max-width: 1023px) 62vw, 34vw"
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal className="col-span-6 col-start-7 mt-20 lg:col-span-6 lg:col-start-8" delay={140} slow>
            <Photo
              photo={photos.scale}
              sizes="(max-width: 1023px) 48vw, 28vw"
              className="h-auto w-full"
            />
            <p className="mt-4 text-[0.72rem] leading-relaxed opacity-72">
              いまも現役の、分銅式の秤。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
