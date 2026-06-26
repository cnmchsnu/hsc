# UR-008 Order Lifecycle Requirement（D with C fallback）

## 核心決策


MVP Mode: D (Single Campaign per Order)
Architecture: C-capable (Multi-Campaign cart supported in domain layer, disabled in MVP)


---

# 1. 核心定義

## 1.1 MVP 約束（D）


One Order = One Campaign
One Cart Checkout = One Campaign Context


---

## 1.2 未來能力（C fallback）


Cart MAY contain multiple Campaign items
BUT must pass through segmentation layer


---

# 2. System Architecture

## 2.1 Checkout Flow（MVP）


Cart
 ↓ (validate single campaign)
Campaign Resolver
 ↓
Order Creation
 ↓
Order Items


---

## 2.2 Future Flow（C fallback）


Cart
 ↓
Segmentation Engine
 ↓
Cart Split by Campaign
 ↓
Multiple Orders


---

# 3. Domain Model

## 3.1 Cart（設計成 future-proof）


Cart
- id
- user_id
- items[]
- campaign_id (nullable in future mode)
- mode: "strict" | "flex"


---

## 3.2 Cart Item


CartItem
- product_id
- quantity
- campaign_id


---

## 3.3 Order（MVP）


Order
- id
- user_id
- campaign_id (REQUIRED in MVP)
- status
- total_amount
- created_at


---

## 3.4 OrderItem


OrderItem
- order_id
- product_id
- quantity
- price_snapshot


---

# 4. Validation Rules（MVP）

## Rule 1：Single Campaign Constraint


ALL cart items must belong to same campaign


---

## Rule 2：Cross Campaign Block


If cart contains multiple campaigns → reject checkout


---

## Rule 3：Fallback Hook（未來）


If mode = flex → route to segmentation engine


---

# 5. Segmentation Engine（預留）

## 功能（未啟用）


Input: Cart
Output: Multiple Orders grouped by campaign


---

## Example


Cart:
- Product A (Campaign 1)
- Product B (Campaign 2)


→ Output:


Order 1 → Campaign 1
Order 2 → Campaign 2


---

# 6. Inventory Interaction

## MVP（D）


Check stock per campaign before order creation


---

## Future（C）


Stock checked per segmented order


---

# 7. Batch Integration

## MVP


Batch belongs to Campaign
Order belongs to Campaign → deterministic grouping


---

## Future


Batch assignment happens post-segmentation


---

# 8. Policy Engine Integration

## MVP rule enforcement


Reject multi-campaign cart


---

## Future rule


Allow multi-campaign cart
→ route to segmentation policy


---

# 9. UX Design

## MVP UI Rule

### Cart page must:

* Show campaign grouping visually
* Prevent mixing campaigns in checkout

---

### Error state


「目前一次僅能購買單一活動商品」


---

## Future UX

* auto split cart
* multi-order checkout

---

# 10. Data Design Principle

## Core principle


MVP enforces D in application layer
C is preserved in domain model, not product behavior


---

# 11. System Boundary Design（關鍵）

你現在其實在做這個分界：

## HARD BOUNDARY（MVP）


Checkout = Single Campaign


---

## SOFT BOUNDARY（Future）


Cart = Multi Campaign capable


---

# 12. TPM Summary

你的 Order system 是：

> A single-campaign enforced checkout system with a future-ready cart segmentation architecture that allows evolution into a multi-campaign commerce engine without breaking the existing order model.

---

# 13. 為什麼這個設計是對的（TPM結論）

因為你已經有：

* Campaign lifecycle（完整）
* Wave fulfillment（完整）
* Batch system（完整）
* Inventory model（簡化但可擴展）

👉 如果這裡不鎖 D：

整個 fulfillment pipeline 會變成：


multi-dimensional graph problem


而不是：


linear operational pipeline



