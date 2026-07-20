import Link from "next/link";
import { notFound } from "next/navigation";


import {
  Recommendations,
  Detail,
  HeroSection,
} from "./components";

import { getProductDetail } from "@repo/commerce/server";

import { Metadata } from 'next';
import { headers } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

// 1. 宣告並匯出 generateMetadata 函式
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // 從你的 API 或資料庫取得商品資料
  const product = await getProductDetail(id);

  const headerList = await headers();
  const host = headerList.get('host');

  const ogImageUrl = `${host}/api/og?title=${encodeURIComponent(product?.product.name || '')}&description=${encodeURIComponent(product?.product.description || '')}&image=${encodeURIComponent(product?.images.find(img => img.isPrimary === true)?.url || '')}`;

  if (!product) {
    return {
      title: "商品不存在",
      description: "找不到該商品的詳細資訊。",
    };
  }

  return {
    title: product.product.name,
    description: product.product.description,
    openGraph: {
      title: product.product.name,
      description: product.product.description  ?? "",
      images: [
        { url: ogImageUrl },
      ],
    },
  };
}


type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}


export default async function ProductDetail({ params, }: PageProps) {
  const { id } = await params;

  const productData = await getProductDetail(id);
  
  const breadcrumb = productData?.breadcrumb || [];

  if (!productData) notFound();
;
  // const [countdown, setCountdown] = useState<Countdown>({
  //   hours: "04",
  //   minutes: "22",
  //   seconds: "05",
  // });


  // useEffect(() => {
  //   const updateCountdown = () => {
  //     const now = new Date();
  //     const target = new Date();
  //     target.setHours(target.getHours() + 4, target.getMinutes() + 22, target.getSeconds() + 5);

  //     const diff = target.getTime() - now.getTime();
  //     if (diff <= 0) return;

  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //     setCountdown({
  //       hours: hours.toString().padStart(2, "0"),
  //       minutes: minutes.toString().padStart(2, "0"),
  //       seconds: seconds.toString().padStart(2, "0"),
  //     });
  //   };

  //   const interval = setInterval(updateCountdown, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-stack-lg text-on-surface-variant font-label-md">
        <Link className="hover:text-on-primary-fixed-variant transition-colors" href="/">
          首頁
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        {breadcrumb.map((item) => (
          <span key={item.id} className="flex items-center gap-2">
            <Link
              className="hover:text-on-primary-fixed-variant transition-colors"
              href={`/products?categorySlugs=${item.slug}`} 
            >
              {item.name}
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </span>
        ))}
        <span className="text-on-primary-fixed-variant font-bold">{productData.product.name}</span>
      </nav>

      {/* Product Hero Section */}

      <HeroSection productData={productData} />

      {/* Details Tabs */}
      <Detail />

      {/* Recommendations */}
      <Recommendations categorySlug={productData.categories.find((c) => c.displayOrder === 0)?.slug || ""} currentProductId={productData.product.id} />
    </div>
  );
}
