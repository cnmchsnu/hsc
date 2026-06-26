# 📄 PRD-2：FULL SYSTEM PRODUCT REQUIREMENTS DOCUMENT

## （完整營運平台 / v2+）

---

# 1. Product Vision

建立學生會營運級電商與活動管理平台：

> 支援活動營運、訂單管理、履約分流、規則引擎與多通路通知的完整系統。

---

# 2. System Scope

---

## Core Domains


Campaign Engine
Product System
Order System
Inventory System
Batch Fulfillment Engine
Policy Engine
Notification System
Payment System
Form System
User System
RBAC System
Analytics System


---

# 3. Key Architecture Concepts

---

## 3.1 Campaign = Operational Container


Products + Orders + Waves + Batch + Stats


---

## 3.2 Multi-layer Inventory


Product + Campaign + Wave


---

## 3.3 Order Engine


Cart → segmentation → order(s)


（支援 C fallback）

---

## 3.4 Policy Engine


rule-based system for:
- visibility
- pricing
- form
- access control


---

## 3.5 Batch Automation Engine


rule-driven assignment system


---

## 3.6 Payment Event System


event-driven payment state system


---

## 3.7 Notification System


event → in-app → future external channels


---

## 3.8 Form System


schema-driven dynamic forms


---

# 4. User Model


Customer
Staff
Admin


* context-based identity (shop / console)

---

# 5. Order Model (Full)


multi-campaign capable (C)
with segmentation engine


---

# 6. Fulfillment Model


Campaign → Wave → Batch → Order


---

# 7. Automation Systems

## Includes:

* Policy Engine
* Batch Engine
* Inventory Engine
* Notification Engine

---

# 8. Cross-system Event Architecture


Order Created
Payment Updated
Campaign State Changed
Batch Assigned
Inventory Updated


---

# 9. Analytics Layer


Campaign stats
Order stats
Revenue
Conversion
Fulfillment rate
Batch efficiency


---

# 10. Platform Architecture


shop.app (customer)
console.app (staff/admin)
admin.panel (super admin)
backend services (modular monolith or microservices ready)


---

# 11. Key Differences (MVP vs FULL)

| Feature      | MVP             | FULL              |
| ------------ | --------------- | ----------------- |
| Campaign     | basic           | full lifecycle    |
| Order        | single campaign | multi-campaign    |
| Batch        | manual          | automation engine |
| Payment      | cash manual     | event-driven      |
| Inventory    | product-only    | multi-layer       |
| Notification | none            | event-driven      |
| Form         | static          | schema-based      |
| Analytics    | none            | full dashboard    |
| Policy       | minimal         | rule engine       |

---

# 12. Final TPM Summary

## MVP

> A constrained transactional system optimized for operational simplicity and manual fulfillment.

## FULL

> A modular event-driven commerce and operations platform capable of supporting complex campaign-based fulfillment, automation rules, and scalable operational workflows.

