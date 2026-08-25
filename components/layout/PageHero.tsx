import Photo, { ImageNote } from '@/components/ui/Photo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { Crumb } from '@/lib/jsonld';
import type { Photo as PhotoData } from '@/data/photos';

type Props = {
  en: string;
  title: string;
  lead: string;
  photo: PhotoData;
  crumbs: Crumb[];
  position?: string;
};

/** 下層ページ共通の見出し。写真は全幅で大きく。 */
export default function PageHero({ en, title, lead, photo, crumbs, position }: Props) {
  return (
    <header className="relative bg-sumi text-kinari">
      <div className="relative h-[52svh] min-h-[20rem] w-full md:h-[66svh]">
        <Photo photo={photo} fill priority sizes="100vw" position={position} quality={80} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/35 to-sumi/60" />
        {/* ヘッダーの文字を読ませるための上端のスクリム */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sumi/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 md:pb-14">
          <div className="mx-auto max-w-[92rem]">
            <p className="eyebrow text-honoo">{en}</p>
            <h1 className="display mt-5 text-[clamp(2rem,8vw,4rem)] leading-[1.25] tracking-[0.1em]">
              {title}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-3 right-4 md:bottom-4 md:right-6">
          <ImageNote photo={photo} className="text-kinari" />
        </div>
      </div>

      <div className="mx-auto max-w-[92rem] px-5 py-10 md:px-10 md:py-14">
        <Breadcrumbs crumbs={crumbs} tone="dark" />
        <p className="mt-8 max-w-[42rem] text-[0.95rem] leading-[2.15] text-kinari/85 md:text-base">
          {lead}
        </p>
      </div>
    </header>
  );
}
