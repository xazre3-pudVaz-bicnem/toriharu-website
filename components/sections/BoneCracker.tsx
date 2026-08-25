import Photo, { ImageNote } from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

export default function BoneCracker() {
  return (
    <section className="relative bg-tare text-kinari">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[58svh] lg:min-h-[86svh]" slow>
          <Photo photo={photos.honesenbei} fill sizes="(max-width: 1024px) 100vw, 50vw" position="center 45%" />
        </Reveal>

        <div className="flex items-center px-5 py-20 md:px-10 md:py-28 lg:px-20">
          <Reveal className="max-w-[34rem]">
            <SectionLabel index="07" en="BONE CRACKER" className="text-honoo" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.1rem)] leading-[1.45] tracking-[0.08em]">
              鰻の骨せんべい。
            </h2>

            <div className="mt-10 space-y-6 text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
              <p>
                毎朝、店で鰻を捌く。だから中骨が出ます。それを捨てずに、からりと揚げたのが骨せんべいです。
              </p>
              <p>
                噛むと、しゃりっと軽い音がして、あとから鰻の香ばしさがくる。塩気だけで十分うまい。子どものおやつにも、晩酌の一皿にもなります。
              </p>
              <p>
                鰻を捌く店にしかつくれないもので、その日の骨の分しかありません。店頭に並んでいたら、それがその日の分です。
              </p>
            </div>

            <figure className="mt-12">
              <Photo photo={photos.imgHonesenbei} sizes="(max-width: 1024px) 92vw, 34vw" className="h-auto w-full" />
              <figcaption className="mt-3 flex items-center gap-3 text-[0.72rem] text-kinari/55">
                <span>器に盛れば、そのまま一品に。</span>
                <ImageNote photo={photos.imgHonesenbei} />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
