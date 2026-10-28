import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { currentVoucher } from '@/data/vouchers';

/**
 * 期間限定のお知らせ（使える商品券）。トップのヒーローのすぐ下に置く。
 * 利用期間の外では何も出さない（data/vouchers.ts）。
 */
export default function VoucherNotice() {
  const voucher = currentVoucher();
  if (!voucher) return null;

  return (
    <section aria-labelledby="voucher-notice" className="washi-grain relative bg-kinari px-5 pt-14 md:px-10 md:pt-20">
      <div className="mx-auto grid max-w-[92rem] gap-10 border-y border-sumi/15 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
        <Reveal>
          <SectionLabel en="NOTICE" className="text-tan" />
          {/* 「プレミアム付商品券」の途中で折り返さないよう、改行は発行元の後ろだけに許す */}
          <h2
            id="voucher-notice"
            className="display mt-7 break-keep text-[clamp(1.5rem,5.6vw,2.5rem)] leading-[1.55] tracking-[0.08em]"
          >
            {voucher.issuer}
            <wbr />
            {voucher.name}、
            <br />
            使えます。
          </h2>

          <dl className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-tan">
            <dt className="text-[0.74rem] tracking-[0.16em]">ご利用期間</dt>
            <dd className="display break-keep text-[clamp(1.05rem,4.4vw,1.3rem)] tracking-[0.06em] tabular-nums">
              <time dateTime={voucher.startsOn}>{voucher.start}</time>〜<wbr />
              <time dateTime={voucher.endsOn}>{voucher.end}</time>
            </dd>
          </dl>

          <p className="mt-6 max-w-[36rem] text-[0.94rem] leading-[2.1] md:text-base">
            トリハルは「{voucher.edition} {voucher.fullName}」の取扱店舗です。
            <br className="hidden lg:inline" />
            店頭で、鰻の蒲焼にも焼き鳥にもお使いいただけます。
          </p>
          <p className="mt-3 max-w-[36rem] text-[0.84rem] leading-[2] opacity-75">{voucher.note}</p>

          <Link href="/access" className="rule-link mt-8 inline-flex text-tan">
            店舗・アクセス
          </Link>
        </Reveal>

        {voucher.image && (
          <Reveal delay={120} slow className="w-[72%] max-w-[20rem] justify-self-end lg:w-[19rem]">
            <Image
              src={voucher.image.src}
              alt={voucher.image.alt}
              width={voucher.image.width}
              height={voucher.image.height}
              sizes="(max-width: 1023px) 72vw, 19rem"
              className="h-auto w-full"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
