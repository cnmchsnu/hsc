// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import React from 'react';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ⭕ 1. 從網址參數動態獲取資料（例如從 Page 傳過來的商品名稱或圖片）
    const title = searchParams.get('title') ?? '';
    const description = searchParams.get('description') ?? '';
    const image = searchParams.get('image');

    return new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            fontSize: 60,
            color: 'white',
            background: 'linear-gradient(to right, #0f172a, #1e293b)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          },
        },
        image
          ? React.createElement('img', {
              src: image,
              alt: 'Product',
              style: { width: 200, height: 200, borderRadius: '50%', marginBottom: 20 },
            })
          : null,
        React.createElement('p', { style: { margin: 0, fontWeight: 'bold' } }, title)
      ),
      {
        width: 1200, // 官方推薦 OG 圖片寬度
        height: 630, // 官方推薦 OG 圖片高度
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}