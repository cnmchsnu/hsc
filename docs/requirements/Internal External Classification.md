# UR-002 Internal / External Classification Requirement

## 核心決策

系統採用：


System Auto Classification + Admin Override


即：

* A：自動判定（email domain）
* C：人工覆蓋（admin correction）

---

# 1. 身份分類定義

## 1.1 Internal User（校內）

條件：


email domain ∈ allowed domains


例如：

* @school.edu
* @department.school.edu

---

## 1.2 External User（校外）

條件：


email domain ∉ allowed domains


---

## 1.3 Final Classification Rule


Final Status =
Auto Classification
→ optionally overridden by Admin


---

# 2. 系統行為

## 2.1 註冊時


User signs up
↓
System detects email domain
↓
Assign internal/external


---

## 2.2 Admin Override

Admin 可以：

* 修改 internal ↔ external

---

## 2.3 Override 優先級


Admin Override > System Detection


---

# 3. Data Model

## User Classification


user_id
auto_classification: internal | external
manual_override: internal | external | null
final_classification: computed


---

## 計算規則


if manual_override exists:
    use manual_override
else:
    use auto_classification


---

# 4. Business Impact

這個分類會影響：

---

## 4.1 Product Visibility


internal_only products
external visible products


---

## 4.2 Pricing Rule (未來)


internal price ≠ external price


---

## 4.3 Campaign Targeting


Campaign can restrict audience


---

## 4.4 Batch Segmentation


internal batch / external batch split


---

# 5. Admin Tooling Requirement

## 必須提供：

### 5.1 User List View

顯示：

* auto classification
* final classification

---

### 5.2 Override Action


Set Internal
Set External
Reset to Auto


---

### 5.3 Audit Log

必須記錄：

* 誰改的
* 什麼時候改
* 改前/改後

---

# 6. Edge Cases

---

## Case 1：domain 是 internal，但 admin 改 external

→ 以 admin 為準

---

## Case 2：user email change

→ re-run auto classification，但不覆蓋 manual override

---

## Case 3：delete override

→ revert to auto

---

# 7. Security Implication

這個模型的核心是：


Classification is not trusted from client-side


必須：

* backend recompute
* never trust frontend flag

---

# 8. TPM Summary


> A dual-layer classification system with deterministic auto rules and human override governance.






