# UR-010 Payment Model Requirement（Event-ready Payment System）

## 核心決策


MVP: Simple Cash Tracking (B)
Architecture: Event-driven Payment System (D)


---

# 1. Payment 定位

Payment 在系統中是：


Order lifecycle state controller (financial truth layer)


不是 UI 功能，而是：

> 決定 Order 能不能進入履約流程的核心狀態來源

---

# 2. Payment State Model

## 2.1 MVP States


pending
paid
failed
refunded


---

## 2.2 Extended States（預留）


partial_paid
overpaid
cancelled
voided


---

# 3. Order × Payment Relationship

## 核心規則


Order fulfillment eligibility depends on payment status


---

## Rule Matrix

| Payment State | Can Fulfill | Can Batch |
| ------------- | ----------- | --------- |
| pending       | ❌           | ❌         |
| paid          | ✅           | ✅         |
| failed        | ❌           | ❌         |
| refunded      | ❌           | ❌         |

---

# 4. MVP Implementation (Cash System)

## 4.1 Simple Model


Payment = manual confirmation record


---

## 4.2 Data Model


Payment
- id
- order_id
- amount
- status
- method = "cash"
- confirmed_by
- confirmed_at


---

## 4.3 Admin Action

* mark as paid
* revert to unpaid
* refund record (manual)

---

# 5. Event-driven Architecture（核心）

## 5.1 Payment Events


payment.created
payment.confirmed
payment.failed
payment.refunded
payment.updated


---

## 5.2 Event Flow


Payment Action
↓
Emit Event
↓
Order State Update
↓
Batch Eligibility Update
↓
Notification Trigger


---

# 6. Integration Points

Payment 會影響：

---

## 6.1 Order Lifecycle


paid → unlock fulfillment


---

## 6.2 Batch System


only paid orders enter batching


---

## 6.3 Inventory


stock committed only after payment confirmed


---

## 6.4 Notification


payment status changes trigger notifications


---

# 7. Future Payment Expansion (已預留)

---

## 7.1 Multi-payment Methods


- cash
- bank transfer
- credit card
- line pay
- ticket redemption


---

## 7.2 Payment Gateway Layer


Payment Gateway Abstraction Layer


---

## 7.3 Reconciliation System


match payments ↔ orders ↔ batches


---

# 8. Payment Event Bus Design

## 8.1 Internal Event Bus (MVP-light)


in-memory or DB-trigger based events


---

## 8.2 Future Upgrade


Kafka / Redis Stream / Queue-based system


---

# 9. System Principle


Payment is an event source, not a UI state


---

# 10. Edge Cases

---

## Case 1: Order cancelled after payment

→ trigger refund event

---

## Case 2: Batch already assigned

→ block or require reversal flow

---

## Case 3: Partial payment (future)

→ allow but block fulfillment

---

# 11. Admin Requirements

## 11.1 Payment Dashboard

* unpaid orders
* paid orders
* reconciliation view

---

## 11.2 Manual Override

* mark paid
* refund
* correction log

---

## 11.3 Audit Log (critical)


who changed payment status + when + why


---

# 12. Security Principle


Payment status is server-authoritative only


Frontend cannot determine fulfillment eligibility.

---

# 13. TPM Summary

你的 Payment 系統是：

> A lightweight manual payment tracking system designed for MVP, with a fully event-driven architecture layer that decouples payment state changes from order, inventory, batch, and notification systems, enabling future integration with external payment gateways and automated reconciliation pipelines.
