import Link from "next/link";
import { notFound, redirect} from "next/navigation";

import {
  Recommendations,
  Detail,
  HeroSection,
} from "./components";

import { getProductDetail } from "@repo/commerce/server";

import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

// 1. 宣告並匯出 generateMetadata 函式
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // 從你的 API 或資料庫取得商品資料
  const product = await getProductDetail(id);

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
      // ⭕ 在這裡動態帶入資料庫撈出來的圖片網址
      images: [
        {
          url: product.images.find(img => img.isPrimary === true)?.url || "/default-image.jpg", 
          width: 500,
          height: 500,
          alt: product.product.name,
        },
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

  // const [activeThumb, setActiveThumb] = useState(0);
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
      <Recommendations />
    </div>
  );
}
