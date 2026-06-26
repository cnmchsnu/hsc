# UR-004 Policy Engine Requirement

## 核心決策

系統採用：


Hybrid Policy System (Config-first, Code fallback, Engine-ready schema)


也就是：

* MVP：B（設定 + 少量程式規則）
* 架構：預留 C（完整 rule engine）
* 擴展：不需要重構 core model

---

# 1. Policy Engine 定位

Policy Engine 的作用是：


Control visibility + behavior across:
- Product
- Campaign
- Order
- Form
- Pricing (future)


---

# 2. Policy 類型

## 2.1 Visibility Policy

控制「看得到什麼」

例：


internal user → see product
external user → hidden product


---

## 2.2 Business Rule Policy

控制「能不能做」

例：


Campaign Active → allow order creation
Campaign Closed → deny order creation


---

## 2.3 Form Policy

控制表單顯示

例：


internal → show extra field
external → hide field


---

## 2.4 Pricing Policy（預留）

例：


internal price ≠ external price


---

# 3. Policy Evaluation Model

## 核心流程


Request Context
↓
User Context (internal/external)
↓
Campaign Context
↓
Product Context
↓
Rule Evaluation
↓
Allow / Deny / Transform


---

# 4. Policy 定義模型（MVP）

## 4.1 Config-based Rule


{
  "target": "product",
  "action": "read",
  "condition": {
    "user.type": "internal"
  },
  "effect": "allow"
}


---

## 4.2 Simple DSL（預留）


IF user.is_internal == true
THEN allow product.read


---

## 4.3 Code Fallback

ts
if (user.isInternal && product.isRestricted) {
  return allow;
}


---

# 5. Policy Scope

## 支援對象


- User
- Product
- Campaign
- Order
- Batch
- Form Field


---

# 6. Policy Storage Model

## Policy Table


id
name
type (visibility | business | form | pricing)

target_type
target_id (nullable)

condition_json
effect (allow | deny | transform)

priority
enabled


---

# 7. Policy Resolution Order


1. System Hard Rules (code)
2. Admin Policies
3. Campaign Policies
4. Product Policies
5. Default Policy


---

# 8. Conflict Resolution

## Rule


deny > allow
higher priority overrides


---

# 9. Context Binding（關鍵）

Policy evaluation 必須依賴：


- Entry Context (shop / console)
- User classification (internal / external)
- Campaign state
- Product state


---

# 10. Admin Tooling Requirement

## 必須提供：

### 10.1 Policy List

* 所有 rule 可視化

---

### 10.2 Rule Editor (MVP simple)

* target
* condition
* effect

---

### 10.3 Policy Debugger（很重要）

輸入：


user + product + campaign


輸出：


why allowed / denied


---

# 11. System Behavior Examples

---

## Example 1: Internal Product Restriction


User: external
Product: internal-only


→ deny

---

## Example 2: Campaign Active Rule


Campaign: Active
Order: create


→ allow

---

## Example 3: Campaign Closed


Campaign: Order Closed
Order: create


→ deny

---

# 12. Security Principle


Policy evaluation must be server-side only


never trust frontend visibility

---

# 13. Extensibility Design (關鍵)

## Future Rule Engine Slot


Policy Engine Core
↓
Rule Interpreter (future)
↓
External DSL (future)
↓
UI rule builder (future)


---

# 14. TPM Summary



> A hybrid policy system combining declarative configuration and imperative code fallback, designed with a future rule engine abstraction layer.


