# UR-005 Inventory Requirement（庫存系統）

## 核心決策


Architecture: Hybrid Inventory System (Product + Campaign + Wave ready)

MVP Implementation: Simple Product-level Inventory (B)


---

# 1. Inventory 模型分層

## 1.1 Product Inventory（MVP）


Product Inventory


最簡單模式：

* 每個 Product 一個庫存數字
* 全站共享

---

## 1.2 Campaign Inventory（預留）


Campaign Inventory


限制活動內總量

---

## 1.3 Wave Inventory（預留）


Wave Inventory


每一波履約獨立庫存

---

## 1.4 Hybrid Model（未來）


Inventory = Product ∩ Campaign ∩ Wave


---

# 2. MVP Inventory Model（B）

## 2.1 基本規則


Inventory is stored at Product level only


---

## 2.2 結構


Product
- total_stock
- sold_count
- available_stock


---

## 2.3 計算方式


available_stock = total_stock - sold_count


---

# 3. Order 與 Inventory 關係

## 3.1 Order Creation


Check stock → Reserve → Create Order


---

## 3.2 Order Cancel


Cancel Order → Release stock


---

## 3.3 Order Confirmed


Stock becomes committed


---

# 4. Stock Consistency Model

## MVP 採用


Optimistic Concurrency Control (OCC)


---

避免：

* 超賣
* race condition

---

## 實作方式


UPDATE product
SET sold_count = sold_count + x
WHERE available_stock >= x


---

# 5. Edge Cases

---

## Case 1：多人同時下單

→ DB constraint 防止 oversell

---

## Case 2：取消訂單

→ rollback stock

---

## Case 3：Batch 生成

→ 不影響 inventory（僅 grouping）

---

# 6. Inventory Scope Rules

## Inventory only applies to:


Active Campaign + Product relation


---

## Not affected by:


Batch
Fulfillment
User role


---

# 7. Future Model (D-ready)

---

## 7.1 Campaign-level cap


Campaign.max_quantity


---

## 7.2 Wave-level cap


Wave.max_quantity


---

## 7.3 Priority order


Wave > Campaign > Product


---

# 8. Admin Requirements

## 必須提供：

### 8.1 Inventory Dashboard

* total stock
* sold
* remaining

---

### 8.2 Manual Adjust


+10
-5
reset


---

### 8.3 Stock Warning

* low stock alert
* sold out state

---

# 9. System Behavior

---

## Product Sold Out


block checkout


---

## Campaign End


no more stock consumption


---

# 10. Integration Points

Inventory 會直接影響：


- Checkout flow
- Policy Engine
- Campaign status
- Order lifecycle


---

# 11. Consistency Principle

Inventory is the source of truth for availability


---

# 12. TPM Summary


> A layered inventory architecture with product-level MVP enforcement and future support for campaign and wave-based allocation, designed with optimistic concurrency control to prevent overselling in a high-concurrency student commerce environment.
