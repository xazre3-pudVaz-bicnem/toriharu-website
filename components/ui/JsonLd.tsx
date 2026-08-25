export default function JsonLd({ data }: { data: unknown | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify した値のみを埋め込む
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
