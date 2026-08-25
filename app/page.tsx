import type { Metadata } from 'next';

import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import UnagiSection from '@/components/sections/UnagiSection';
import FireSection from '@/components/sections/FireSection';
import SauceSection from '@/components/sections/SauceSection';
import YakitoriSection from '@/components/sections/YakitoriSection';
import ProductVisual from '@/components/sections/ProductVisual';
import BoneCracker from '@/components/sections/BoneCracker';
import SeasonalSection from '@/components/sections/SeasonalSection';
import HistorySection from '@/components/sections/HistorySection';
import TakeoutSection from '@/components/sections/TakeoutSection';
import BlogTeaser from '@/components/sections/BlogTeaser';
import InstagramSection from '@/components/sections/InstagramSection';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { defaultDescription } from '@/lib/site';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'トリハル｜和歌山市の老舗 焼き鳥・国産鰻の持ち帰り専門店',
    description: defaultDescription,
    path: '/',
  }),
  // トップだけは template を使わず、そのままのタイトルにする
  title: {
    absolute: 'トリハル｜和歌山市の老舗 焼き鳥・国産鰻の持ち帰り専門店',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <UnagiSection />
      <FireSection />
      <SauceSection />
      <YakitoriSection />
      <ProductVisual />
      <BoneCracker />
      <SeasonalSection />
      <HistorySection />
      <TakeoutSection />
      <BlogTeaser />
      <InstagramSection />
      <ShopInfo index="13" heading="店舗のご案内" />
    </>
  );
}
