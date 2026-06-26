# UR-006 Form System Requirement（表單系統）

## 核心決策


Architecture: Schema-ready Form System (future extensible)
MVP: No dynamic form engine (static fields only)


---

# 1. Form 系統定位

Form 在系統中屬於：


Product附加資料層（Extended Metadata Layer）


用途：

* 訂購補充資訊
* 客製化需求
* 活動特殊資料收集
* 未來票券資料

---

# 2. MVP 策略（不做 Form Engine）

## 2.1 MVP 行為


Static fields only


例如：

* size
* color
* name
* student_id

---

## 2.2 不支援

* dynamic form builder
* field schema editor
* conditional logic
* form validation engine UI

---

# 3. Future Design（預留結構）

你雖然 MVP 不做，但資料層要先準備：

---

## 3.1 Form Schema（預留）


FormSchema
- id
- name
- fields[]
- version


---

## 3.2 Field Definition


Field
- type (text / select / checkbox)
- required
- options
- validation


---

## 3.3 Form Response


FormResponse
- order_id
- product_id
- data_json


---

# 4. Data Storage Strategy

## MVP


order.metadata_json


---

## Future Migration Path


metadata_json → FormResponse table


---

# 5. Integration Points

Form 未來會影響：

---

## 5.1 Order Lifecycle


Order cannot be confirmed unless required fields exist


---

## 5.2 Product System


Product defines required metadata schema


---

## 5.3 Ticket System (v2)


Form fields become ticket attributes


---

## 5.4 Policy Engine


Show/hide fields based on user/campaign


---

# 6. MVP Simplified Rules

## Rule 1


Form = hardcoded UI fields


---

## Rule 2


No schema editing


---

## Rule 3


Backend stores only JSON snapshot


---

# 7. Risk Control（TPM觀點）

你這樣做是在避免：

* early over-engineering (Typeform-level system)
* schema migration chaos
* UI builder complexity explosion

---

但同時保留：


Future upgrade path without refactor


---

# 8. System Principle


Form is metadata, not a core system primitive in MVP


---

# 9. TPM Summary


> A deferred schema-driven form system where MVP relies on static fields and JSON snapshots, while preserving a full form engine abstraction layer for future extensibility into ticketing, checkout enrichment, and policy-driven dynamic forms.
