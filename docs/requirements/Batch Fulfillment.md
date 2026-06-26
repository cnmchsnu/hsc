# UR-009 Batch Fulfillment Requirement（Automation Engine Ready）

## 核心決策


MVP: Assisted Batch Allocation (B)
Architecture: Rule-driven Automation Engine (D)


---

# 1. Batch 定位

Batch 是：


Campaign 下的履約分組單位（Fulfillment Unit）


用途：

* 分班級發貨
* 分宿舍發貨
* 分系所發貨
* 分時間波次發貨

---

# 2. Batch Lifecycle


Draft
↓
Auto-generated / Manual-created
↓
Assigned
↓
Packing
↓
Shipped
↓
Completed
↓
Archived


---

# 3. Batch Core Model

## 3.1 Batch


Batch
- id
- campaign_id
- name
- rule_id (optional)
- status
- created_at


---

## 3.2 Batch Item


BatchItem
- batch_id
- order_id
- user_id


---

# 4. Allocation Engine（核心）

## 4.1 Engine 定義


Batch Allocation Engine =
Rule-based system that assigns orders into batches


---

## 4.2 Engine Inputs


- Order
- User metadata
- Form data
- Campaign
- Inventory state


---

## 4.3 Engine Output


Batch assignment result


---

# 5. MVP 模式（B）

## 5.1 Assisted Mode


System suggests batch grouping
Human confirms


---

## 5.2 Example


系所 = CS
→ 建議 Batch A

系所 = EE
→ 建議 Batch B


---

## 5.3 Admin Actions

* assign batch
* reassign batch
* bulk move
* auto-generate batch suggestions

---

# 6. Automation Engine（D）

## 6.1 Rule System


IF condition THEN assign to batch


---

## 6.2 Rule Example


IF user.department == "CS"
THEN batch = "CS Batch"


---


IF form.pickup_location == "Dorm A"
THEN batch = "Dorm A Batch"


---


IF order.created_at in Wave 2
THEN batch = "Wave 2 Batch"


---

# 7. Rule Engine Structure

## 7.1 Rule Definition


Rule
- id
- name
- priority
- condition_json
- action_json
- enabled


---

## 7.2 Condition Types


- user attribute
- form field
- order metadata
- campaign wave
- inventory status


---

## 7.3 Action Types


- assign batch
- create batch
- split batch
- merge batch


---

# 8. Execution Model

## 8.1 Trigger Types


- order created
- campaign moved to fulfillment
- manual re-run


---

## 8.2 Execution Flow


Event → Engine → Rule Evaluation → Batch Assignment


---

# 9. Conflict Resolution

## Rule priority


1. Manual override (highest)
2. Specific rule
3. General rule
4. fallback rule


---

## Default fallback


Unassigned → "Manual Review Batch"


---

# 10. UI Requirement

## 10.1 Batch Dashboard

* batch list
* assigned orders
* unassigned orders
* rule applied

---

## 10.2 Rule Editor

MVP：

* simple IF / THEN builder

Future：

* visual rule builder (like Zapier)

---

## 10.3 Simulation Tool（很重要）


Input: order
Output: predicted batch


---

# 11. System Integration

---

## 11.1 Order System


Order → Batch assignment (post-order creation)


---

## 11.2 Campaign System


Campaign defines available batch rules


---

## 11.3 Form System


Form fields influence batch rules


---

## 11.4 Policy Engine


Can block batch assignment if invalid


---

# 12. MVP vs Future Split

## MVP


- Manual batch creation
- Suggested grouping
- Manual assignment


---

## Future


- full automation engine
- rule chaining
- batch optimization
- AI-assisted grouping


---

# 13. System Principle


Batching is a post-order orchestration layer, not part of checkout logic


---

# 14. TPM Summary

你的 Batch 系統是：

> A rule-driven fulfillment orchestration engine that supports manual-assisted MVP operations with a fully extensible automation layer for future intelligent grouping based on user, form, campaign wave, and operational constraints.
