import Image from 'next/image';
import type { Photo as PhotoData } from '@/data/photos';

type Props = {
  photo: PhotoData;
  /** 親要素いっぱいに敷く（親に position と高さが必要） */
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** object-position。人物や主題が寄っている写真で使う */
  position?: string;
  quality?: number;
};

/**
 * next/image の薄いラッパー。
 * fill を使うときは、親側に relative と高さを必ず指定すること
 * （ここでは絶対配置のクラスを渡さない）。
 */
export default function Photo({
  photo,
  fill = false,
  sizes,
  priority = false,
  className = '',
  position,
  quality,
}: Props) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${className}`}
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/** イメージ写真であることを控えめに明記するキャプション */
export function ImageNote({ photo, className = '' }: { photo: PhotoData; className?: string }) {
  if (photo.kind !== 'image') return null;
  return (
    <span className={`text-[0.62rem] tracking-[0.2em] opacity-60 ${className}`}>※イメージ</span>
  );
}
