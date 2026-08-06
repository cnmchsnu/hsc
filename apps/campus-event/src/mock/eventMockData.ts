export interface CampaignEvent {
  id: string;
  title: string;
  subtitle: string;
  category: '學術講座' | '社團展演' | '體育賽事' | '電競週';
  date: string;
  time: string;
  location: string;
  statusTag: '報名中' | '即將額滿' | '即將開放' | '熱賣中';
  imageUrl: string;
  description: string;
  themeStyle: 'neon_pulse' | 'campus_yellow' | 'campaign_engine_studio_v2';
  organizer: string;
  price?: number;
  capacity?: number;
  registeredCount?: number;
}

export interface MerchandiseItem {
  id: string;
  title: string;
  category: '服飾' | '配件' | '紀念品';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  badge?: string;
  inStock: boolean;
  options?: {
    sizes?: string[];
    colors?: string[];
  };
}

export const MOCK_EVENTS: CampaignEvent[] = [
  {
    id: "1",
    title: "AI 創新未來趨勢論壇",
    subtitle: "發掘精彩時刻，連結無限可能",
    category: "學術講座",
    date: "2026.11.15",
    time: "14:00 - 17:00",
    location: "國際會議廳",
    statusTag: "報名中",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop",
    description: "邀請業界頂尖專家，深入探討人工智慧在各領域的應用與挑戰，開啟你的科技新視野。",
    themeStyle: "campaign_engine_studio_v2",
    organizer: "資訊工程學會",
    price: 0,
    capacity: 200,
    registeredCount: 142,
  },
  {
    id: "2",
    title: "全國大專電競校園聯賽 - 總決賽",
    subtitle: "極速對決，霓虹崛起",
    category: "電競週",
    date: "2026.11.28",
    time: "18:00 - 22:00",
    location: "體育館一樓大廳",
    statusTag: "熱賣中",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop",
    description: "頂尖電競隊伍正面對抗！現場設有電競光影體驗區、互動抽獎與知名主播解說。",
    themeStyle: "neon_pulse",
    organizer: "電競社",
    price: 350,
    capacity: 500,
    registeredCount: 410,
  },
  {
    id: "3",
    title: "90 周年校慶音樂祭與園遊會 Pass",
    subtitle: "黃色熱情，響徹校園",
    category: "社團展演",
    date: "2026.12.05",
    time: "10:00 - 21:00",
    location: "中央大草坪",
    statusTag: "即將額滿",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop",
    description: "超過五十個社團齊聚一堂，特別邀請知名樂團現場演出，憑 Pass 享有園遊會專屬折扣與紀念徽章。",
    themeStyle: "campus_yellow",
    organizer: "學生會行政中心",
    price: 250,
    capacity: 1000,
    registeredCount: 880,
  },
  {
    id: "4",
    title: "秋季校園籃球爭霸賽",
    subtitle: "揮灑汗水，青春永不退場",
    category: "體育賽事",
    date: "2026.11.20",
    time: "09:00 - 18:00",
    location: "風雨籃球場",
    statusTag: "即將開放",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop",
    description: "各系隊強強碰撞，爭奪年度總冠軍稱號！現場發放加油道具與賽事特刊。",
    themeStyle: "campaign_engine_studio_v2",
    organizer: "體育室",
    price: 0,
    capacity: 300,
    registeredCount: 290,
  }
];

export const MOCK_MERCHANDISE: MerchandiseItem[] = [
  {
    id: "m1",
    title: "90 周年限定紀念 T-Shirt",
    category: "服飾",
    price: 1200,
    originalPrice: 1400,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop",
    description: "採用 100% 精梳重磅純棉，耐洗不變形，胸前立體電繡校慶專屬標誌。",
    badge: "熱銷一號",
    inStock: true,
    options: {
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["經典黑", "校園黃", "純潔白"]
    }
  },
  {
    id: "m2",
    title: "大會紀念金屬徽章組",
    category: "紀念品",
    price: 1550,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
    description: "全套包含四款精裝鍍金徽章，附贈精美木質展示盒與獨立編號收藏卡。",
    badge: "限量發行",
    inStock: true,
  },
  {
    id: "m3",
    title: "品牌連帽保暖賽事 Hooded Hoodie",
    category: "服飾",
    price: 1880,
    originalPrice: 2100,
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop",
    description: "內刷毛極致保暖，寬鬆剪裁適合日常穿搭，電競 neon 滾邊暗紋細節。",
    badge: "秋冬新品",
    inStock: true,
    options: {
      sizes: ["M", "L", "XL"],
      colors: ["深邃黑", "星空藍"]
    }
  }
];
