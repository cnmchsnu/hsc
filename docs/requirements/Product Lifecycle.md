#  商品生命週期需求文件（Product Lifecycle Requirement）

## 文件版本：v1.0（MVP）

## 適用系統：學生會數位化電商平台

## 範圍：商品從建立 → 上架 → 訂購 → 履約 → 結束

---

# 一、目的（Purpose）

本文件定義系統中「商品（Product）」的完整生命週期管理方式，確保：

* 商品在活動（Campaign）中可控管理
* 商品可正確被訂購與履約
* 商品狀態一致且可追蹤
* 支援未來票券與數位商品擴展

---

# 二、商品定義（Product Definition）

系統中的商品分為：

## 1. 商品類型（Type）

* Physical（實體商品）
* Ticket（預留 v+2）
* Digital（預留）

---

## 2. 商品組成

* 基本資訊（名稱、描述、圖片）
* SKU（規格/尺寸/版本）
* 價格
* 庫存（Ticket 可為 null）
* 表單（可選）
* 所屬活動（Campaign）

---

# 三、商品生命週期總覽


Draft
  ↓
Scheduled
  ↓
Active
  ↓
Paused / Hidden
  ↓
Closed
  ↓
Archived


---

# 四、狀態定義與規則

---

## 1. Draft（草稿）

### 說明

商品尚未完成設定，不對外顯示。

### 系統行為

* 不可購買
* 不顯示於前台
* 可自由編輯

### 可編輯項目

* 商品資訊
* SKU
* 價格
* 表單
* 活動關聯

---

## 2. Scheduled（排程中）

### 說明

商品已設定上架時間，但尚未開放購買。

### 系統行為

* 前台不可購買
* 可預覽（依權限）
* 等待自動上架

---

## 3. Active（上架中）

### 說明

商品開放購買。

### 系統行為

* 前台顯示
* 可加入購物車
* 可下單
* SKU 庫存扣減

---

## 4. Paused（暫停）

### 說明

商品暫時停止販售（例如補貨或活動調整）。

### 系統行為

* 不可下單
* 可查看商品頁
* 保留歷史訂單

---

## 5. Hidden（隱藏）

### 說明

商品存在，但不對特定使用者顯示（依 Policy Engine）。

### 系統行為

* 可能僅校內可見
* 或特定群組可見
* 不影響訂單歷史

---

## 6. Closed（結束販售）

### 說明

商品停止販售，但仍存在於系統中。

### 系統行為

* 不可購買
* 可查看歷史訂單
* 進入履約流程

---

## 7. Archived（歸檔）

### 說明

商品完全結束生命週期，用於歷史資料保存。

### 系統行為

* 僅查詢用途
* 不可修改
* 不顯示於前台

---

# 五、商品操作流程（Lifecycle Flow）

## 1. 建立商品


Admin 建立 Product
→ 設定 SKU
→ 設定價格
→ 選擇 Campaign
→ Draft


---

## 2. 上架流程


Draft
→ Scheduled（可選）
→ Active


---

## 3. 購買流程


Active Product
→ 加入購物車
→ 建立 Order
→ Order Item snapshot Product/SKU


---

## 4. 結束流程


Active
→ Closed
→ Archived


---

# 六、商品與其他系統關係

---

## 1. 與 Campaign


Campaign
  ↓
Product（群組管理）


* 商品一定屬於某個活動（可選 standalone）
* 活動控制商品上架時間

---

## 2. 與 SKU


Product
  ↓
SKU（實際銷售單位）


* SKU 才是交易單位
* Product 是抽象層

---

## 3. 與 Order


Product → OrderItem snapshot


* 訂單不依賴 Product 即時資料
* 使用 snapshot 避免歷史變動影響

---

## 4. 與 Policy Engine


Product visibility depends on Policy


控制：

* 校內/校外可見
* 特定身份可見
* 價格是否顯示

---

## 5. 與 Form System


Product → Optional Form Schema


用途：

* 訂購時額外填寫資料
* 如：衣服尺寸、班級、備註

---

# 七、庫存與限制規則

---

## SKU 庫存規則

### Physical Product

* stock > 0 才可購買
* 每筆 order 扣庫存

---

### Ticket Product（future）

* stock = null
* 不限制數量

---

# 八、編輯限制規則

## Draft

✔ 可改全部

---

## Active

⚠ 限制：

* SKU 不可刪除
* 價格變更需紀錄 audit log
* 不可刪 Product

---

## Closed / Archived

❌ 不可修改

---

# 九、狀態轉換權限

| 動作              | 可否     |
| --------------- | ------ |
| Draft → Active  | ✔      |
| Active → Paused | ✔      |
| Active → Closed | ✔      |
| Closed → Active | ❌      |
| Any → Archived  | ✔（管理員） |

---

# 十、未來擴展（v+2）

---

## Ticket 商品

將新增：

* QR code ticket
* check-in status
* validation system

但不影響現有 lifecycle。

---

## Digital 商品

* 無庫存
* 自動履約

---

# 十一、成功標準（MVP）

系統需能支持：

* 商品建立（10秒內）
* 商品上架與下架
* 商品關聯活動
* 正確進入訂單流程
* 不影響歷史訂單
* 支援至少 1000 筆訂單商品流轉

---

# 十二、核心設計原則（非常重要）

## 1. Product 不直接影響 Order

→ Order 使用 snapshot

---

## 2. SKU 才是交易單位

---

## 3. Lifecycle 是 state machine，不是欄位切換

---

## 4. Policy 控制可見性，不改資料

---

# 十三、總結（TPM視角）

商品系統本質是：

> **A state-driven, campaign-bound product abstraction layer with snapshot-based order integrity.**


