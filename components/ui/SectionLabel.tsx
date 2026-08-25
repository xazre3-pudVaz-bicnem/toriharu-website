type Props = {
  /** 01, 02 … */
  index?: string;
  en: string;
  className?: string;
};

/** 章番号 + 英字ラベル。カードにしないための、細い罫線だけの見出し補助 */
export default function SectionLabel({ index, en, className = '' }: Props) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      {index && <span className="tabular-nums">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{en}</span>
    </p>
  );
}
