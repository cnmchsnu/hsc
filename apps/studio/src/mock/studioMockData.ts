export interface EventMock {
  id: string;
  title: string;
  status: "進行中" | "草稿" | "已結束";
  itemCount: number;
  lastUpdated: string;
  startDate: string;
  endDate: string;
  location: string;
  registrations: number;
  maxCapacity: number;
  revenue: number;
}

export interface OrderMock {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  total: number;
  status: "已完成" | "待處理" | "已退款" | "對帳中";
  itemCount: number;
  paymentMethod: string;
}

export interface TicketScanMock {
  ticketId: string;
  eventName: string;
  holderName: string;
  seat: string;
  status: "VALID" | "USED" | "INVALID";
  timestamp: string;
}

export const mockEvents: EventMock[] = [
  {
    id: "CMP-2024-SPRING",
    title: "2024 春季特賣會",
    status: "進行中",
    itemCount: 5,
    lastUpdated: "2小時前",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    location: "學生會大樓 101 會議廳",
    registrations: 450,
    maxCapacity: 500,
    revenue: 128000,
  },
  {
    id: "CMP-2024-VIP",
    title: "VIP 專屬感恩回饋",
    status: "草稿",
    itemCount: 12,
    lastUpdated: "昨天",
    startDate: "2024-04-01",
    endDate: "2024-04-07",
    location: "線上活動室",
    registrations: 120,
    maxCapacity: 200,
    revenue: 45000,
  },
  {
    id: "CMP-2024-EARLY",
    title: "雙11 前哨戰：早鳥優惠",
    status: "草稿",
    itemCount: 0,
    lastUpdated: "3天前",
    startDate: "2024-11-01",
    endDate: "2024-11-11",
    location: "中央廣場",
    registrations: 0,
    maxCapacity: 1000,
    revenue: 0,
  },
];

export const mockOrders: OrderMock[] = [
  {
    id: "ORD-2026-0801",
    customerName: "張小明",
    email: "xiaoming@example.com",
    phone: "0912-345-678",
    date: "2026-08-05 10:30",
    total: 1280,
    status: "已完成",
    itemCount: 3,
    paymentMethod: "LINE Pay",
  },
  {
    id: "ORD-2026-0802",
    customerName: "陳美麗",
    email: "meili@example.com",
    phone: "0923-456-789",
    date: "2026-08-05 09:15",
    total: 650,
    status: "對帳中",
    itemCount: 1,
    paymentMethod: "信用卡",
  },
  {
    id: "ORD-2026-0803",
    customerName: "王大衛",
    email: "david@example.com",
    phone: "0934-567-890",
    date: "2026-08-04 16:45",
    total: 2100,
    status: "已完成",
    itemCount: 5,
    paymentMethod: "現場付款",
  },
];

export const mockScanResult: TicketScanMock = {
  ticketId: "TCK-88921-2026",
  eventName: "2024 春季特賣會 - 早鳥入場券",
  holderName: "張小明",
  seat: "A區 12排 05號",
  status: "VALID",
  timestamp: "2026-08-05 10:45:12",
};
