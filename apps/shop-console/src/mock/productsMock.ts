export interface DraftProduct {
  id: string;
  title: string;
  updatedAt: string;
  imageUrl: string;
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  status: "published" | "scheduled" | "archived";
  lastUpdated: string;
  imageUrl: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  status: "active" | "disabled";
  price: number;
  comparePrice?: number;
  stock: number;
  barcode?: string;
}

export interface ProductDetailData {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "published" | "draft" | "archived";
  categoryPath: string;
  isPreorder: boolean;
  lastUpdated: string;
  images: {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  sizes: string[];
  colors: {
    name: string;
    displayName: string;
    hex: string;
  }[];
  variants: ProductVariant[];
}

export const mockDraftProducts: DraftProduct[] = [
  {
    id: "draft-1",
    title: "2024 精神連帽衫",
    updatedAt: "2 小時前",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "draft-2",
    title: "學務日誌 v2",
    updatedAt: "昨天",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "draft-3",
    title: "週年紀念徽章",
    updatedAt: "3 天前",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "draft-4",
    title: "文具套裝",
    updatedAt: "4 天前",
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&auto=format&fit=crop&q=80",
  },
];

export const mockCatalogProducts: ProductCatalogItem[] = [
  {
    id: "1",
    name: "高級校隊夾克",
    sku: "HSNU-VJ-01",
    category: "服飾",
    price: 120.0,
    stock: 42,
    stockStatus: "in_stock",
    status: "published",
    lastUpdated: "2023年10月12日",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "學生會水壺",
    sku: "HSNU-WB-24",
    category: "配件",
    price: 15.0,
    stock: 5,
    stockStatus: "low_stock",
    status: "published",
    lastUpdated: "2023年10月11日",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "附中紀念運動帽",
    sku: "HSNU-CP-88",
    category: "配件",
    price: 25.0,
    stock: 0,
    stockStatus: "out_of_stock",
    status: "published",
    lastUpdated: "2023年10月09日",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "經典帆布便當袋",
    sku: "HSNU-TB-02",
    category: "配件",
    price: 18.0,
    stock: 85,
    stockStatus: "in_stock",
    status: "published",
    lastUpdated: "2023年10月05日",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80",
  },
];

export const mockProductDetail: ProductDetailData = {
  id: "1",
  name: "HSNU 2024 年度紀念棒球外套",
  slug: "varsity-jacket-24",
  description:
    "2024 年版本的 HSNU 棒球外套採用高品質羊毛混紡面料及頂級人造皮革袖子。繡有學生會專屬校徽，是校園榮譽與學術卓越的象徵。",
  status: "published",
  categoryPath: "服飾配件 > 外套類",
  isPreorder: true,
  lastUpdated: "幾秒前",
  images: [
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
      alt: "HSNU 棒球外套 正面圖",
      isPrimary: true,
    },
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: [
    {
      name: "RED",
      displayName: "HSNU 紅",
      hex: "#ba1a1a",
    },
  ],
  variants: [
    {
      id: "var-1",
      sku: "VARS-24-RED-S",
      status: "active",
      price: 85.0,
      comparePrice: 99.0,
      stock: 50,
      barcode: "887",
    },
    {
      id: "var-2",
      sku: "VARS-24-RED-M",
      status: "active",
      price: 85.0,
      comparePrice: 99.0,
      stock: 120,
      barcode: "8801234568",
    },
  ],
};
