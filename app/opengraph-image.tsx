import { ImageResponse } from 'next/og';
import { shop } from '@/data/shop';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${shop.name}｜${shop.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#181411',
          color: '#faf7f0',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 56, height: 2, background: '#a52a20' }} />
          <div style={{ fontSize: 22, letterSpacing: '0.34em', color: '#d4741f' }}>
            SINCE THE MEIJI ERA · WAKAYAMA
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 116, fontWeight: 600, letterSpacing: '0.16em', lineHeight: 1.1 }}>
            トリハル
          </div>
          <div style={{ fontSize: 42, letterSpacing: '0.1em', marginTop: 26, color: '#f4efe4' }}>
            受け継ぐ火、受け継ぐ味。
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 26, letterSpacing: '0.08em', color: 'rgba(250,247,240,0.78)' }}>
            和歌山市の老舗　焼き鳥・国産鰻の持ち帰り専門店
          </div>
          <div style={{ fontSize: 22, letterSpacing: '0.08em', color: 'rgba(250,247,240,0.6)' }}>
            和歌山市南大工町20
          </div>
        </div>
      </div>
    ),
    size,
  );
}
