# UR-001 Multi-Entry Identity Model（多入口身分模型）

## 核心決策

系統採用：


同一個人（User）
在不同入口 = 不同身份上下文（Identity Context）


而不是：

* 單一 RBAC 覆蓋全系統
* Customer / Staff / Admin 混合帳號

---

# 1. 系統入口定義（Entry Points）

## 1.1 Shop Context


shop.example.com


### Identity Scope


Customer only


### 可見功能

* 商品瀏覽
* 購物車
* 訂單查詢（Customer scope）
* 結帳

### 不可見

* 後台
* Campaign 管理
* Batch
* Report

---

## 1.2 Console Context


console.example.com


### Identity Scope


Staff / Admin only


### 可見功能

* Campaign 管理
* Order 管理
* Batch Fulfillment
* Statistics
* Product 管理

### 不可見

* Customer checkout flow
* Shop UI

---

# 2. Identity Model（關鍵設計）

## 2.1 User（唯一實體）


User


代表「人」。

---

## 2.2 Identity Context（關鍵）


User + Entry Point = Active Identity Context


例如：


User: Kevin
Entry: shop → Customer Context



User: Kevin
Entry: console → Staff Context


---

## 2.3 重要結論

👉 **不存在 global role**

只有：


Context-based role resolution


---

# 3. Login Mechanism

## 3.1 Auth Source

使用 Google Login

---

## 3.2 Session 設計

Cookie 只負責：


User Authentication


不負責：

* role
* permissions
* identity type

---

## 3.3 Entry Determination

身份由：


domain / subdomain


決定。

---

### Example


shop.xxx.com → Customer Context
console.xxx.com → Staff Context


---

# 4. Role Resolution Rule

## 4.1 Shop Context

固定 role：


Customer


---

## 4.2 Console Context

依 user mapping：


Staff / Admin


---

## 4.3 Key Rule


Same user ≠ same permissions across contexts


---

# 5. Cross-Context Isolation（重要）

### ❌ 不允許

* shop redirect console
* console redirect shop with identity carryover UI
* shared navigation state

---

### ✔ 允許

* shared cookie authentication
* shared user profile

---

## 本質


UI isolation, not identity isolation


---

# 6. Data Model（MVP）

## User


id
google_id
email
name
created_at


---

## Staff Mapping


user_id
role: staff | admin


---

## Context Resolution

不存 DB role context（由 domain 決定）

---

# 7. Security Model

## Principle


Authorization is context-derived, not user-assigned


---

## Prevent

* 直接用 cookie 切 admin
* 用 URL 偽裝 role
* cross-domain session reuse

---

# 8. System Implications（很重要）

這個設計會直接影響：

---

## 8.1 RBAC Requirement

會變成：


Context RBAC, not User RBAC


---

## 8.2 Middleware

必須有：

* domain resolver
* context injector

---

## 8.3 Frontend

兩個 app 完全獨立：


shop app
console app


---

# 9. Edge Cases（未來一定會踩）

---

## Case 1：同 email 進 console 但沒 staff role

→ redirect / forbidden

---

## Case 2：staff 想買東西

→ 必須用 shop domain

---

## Case 3：session reuse

→ OK，但 context reset

---

# 10. TPM 結論

這個專案的 User Model 本質是：

> A single user identity with domain-scoped behavioral contexts.

不是：

* SaaS RBAC model
* enterprise IAM
* shared role system
