# 📄 PRD-1：MVP Product Requirements Document

## （可上線版本 / v1.0）

---

# 1. Product Overview

本系統為學生會電商系統 MVP，目標為：

> 能建立商品、收單、付款（現金）、分批出貨並完成履約。

---

# 2. Scope

## In Scope（MVP 必做）


- 商品管理
- 活動（Campaign）基礎管理
- 訂單系統（單活動購物）
- 購物車
- 現金付款紀錄
- 庫存扣減（簡化）
- Batch 出貨（手動/半自動）
- 基本後台（console）


---

## Out of Scope（MVP 不做）


- 統計分析
- dynamic form builder
- 多支付整合
- notification system
- ticket system
- 多 Campaign cart
- rule engine UI


---

# 3. Core User Roles


- Customer（shop）
- Staff（console）
- Admin（console + full access）


---

# 4. Core Systems

---

## 4.1 Campaign（活動）

### 功能

* 建立活動
* 設定時間
* 綁定商品

### 規則


一個訂單只能屬於一個 Campaign


---

## 4.2 Product（商品）

### 功能

* 建立商品
* 設定庫存
* 設定價格
* 可獨立存在或加入 Campaign

---

## 4.3 Cart（購物車）

### 規則


只能包含單一 Campaign 商品


---

## 4.4 Order（訂單）

### 狀態


created → paid → fulfilled


### 規則

* 一個 order = 一個 campaign
* 現金付款手動確認

---

## 4.5 Payment（現金）

### 功能

* 手動標記 paid
* 訂單付款狀態管理

---

## 4.6 Inventory（庫存）

### 模型


Product-level stock only


---

## 4.7 Batch（出貨）

### 功能

* 手動建立 batch
* 手動分配訂單
* 標記完成

---

# 5. User Flow（Customer）


Browse Product
→ Add to Cart
→ Checkout
→ Create Order
→ Wait for payment confirmation
→ Wait for batch assignment
→ Receive product


---

# 6. Admin Flow


Create Campaign
→ Create Products
→ Set stock
→ Receive orders
→ Confirm payment
→ Assign batch
→ Fulfill orders


---

# 7. System Architecture (MVP)


shop app (customer)
console app (staff/admin)
backend API
database


---

# 8. Key Constraints


- single campaign per order
- no multi-payment
- no automation engine
- no notification system
- no analytics


---

# 9. Success Criteria

* 可完成下單
* 可完成付款（手動）
* 可完成出貨
* 可管理訂單

