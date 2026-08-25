import { shop } from '@/data/shop';

/**
 * 本番URL。未設定のときは null を返し、canonical / OG / sitemap を出さず
 * robots を Disallow にすることで、プレビューURLの誤インデックスを防ぐ。
 */
export const siteUrl: string | null = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return u.origin;
  } catch {
    return null;
  }
})();

export const isPublic = siteUrl !== null;

export function absoluteUrl(path = '/'): string | null {
  if (!siteUrl) return null;
  return new URL(path, siteUrl).toString();
}

export const siteName = `${shop.name}｜${shop.tagline}`;
export const defaultDescription =
  '和歌山市南大工町の老舗「トリハル」。国産の活鰻を毎朝店舗で捌き、紀州備長炭と受け継がれてきた秘伝のタレで丁寧に焼き上げています。鰻の蒲焼・白焼き、焼き鳥、鰻の骨せんべいなどを販売する持ち帰り専門店です。';
