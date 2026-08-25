import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#181411',
          color: '#f4efe4',
          fontSize: 300,
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        鰻
      </div>
    ),
    size,
  );
}
