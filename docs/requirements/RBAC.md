# UR-003 RBAC Requirement（Role-Based Access Control）

## 核心決策

系統採用：


Role Profile + Composable User Roles


而不是單一 role 或扁平權限。

---

# 1. 核心概念

## 1.1 Role Profile（角色模板）

Role Profile 是「權限集合模板」。

例如：


Admin Profile
= ALL permissions



Staff Profile
= subset of operational permissions



Customer Profile
= storefront permissions only


---

## 1.2 User Roles（使用者實例權限組合）

User 的權限由：


Role Profile + Additional Roles


組成。

---

# 2. 權限模型

## 2.1 Permission 是最小單位

例如：


campaign.read
campaign.write
order.read
order.write
batch.manage
product.manage
user.manage
report.view


---

## 2.2 Role Profile = Permission Set


Staff Profile =
- campaign.read
- campaign.write
- order.read
- order.manage
- batch.manage


---

# 3. User Permission 組合方式

## 3.1 Admin


Admin =
ALL permissions
+ explicit overrides (optional restrictions or extensions)


---

## 3.2 Staff


Staff =
Staff Profile
+ additional roles


例如：


Staff
+ Fulfillment Role
+ Product Role


---

## 3.3 Customer


Customer =
Storefront Profile only


---

# 4. Role Composition Rule

## 核心邏輯


User Permissions =
Union(Role Profiles + Extra Roles)


---

## Example


User A:
- Staff Profile
- Batch Manager Role


結果：


campaign.read
order.read
batch.manage


---

# 5. Role Types

## 5.1 Profile Role（基礎模板）

* Admin Profile
* Staff Profile
* Customer Profile

---

## 5.2 Functional Role（功能型角色）

* Campaign Manager
* Order Manager
* Batch Manager
* Product Manager
* Report Viewer

---

## 5.3 System Role（系統角色）

* Super Admin
* Audit Viewer

---

# 6. Permission Evaluation Rule

## 6.1 Check Flow


Request
 ↓
Context (shop / console)
 ↓
User Roles
 ↓
Role Profiles
 ↓
Permission Union
 ↓
Allow / Deny


---

## 6.2 Deny Strategy


Default = DENY


---

# 7. Context Interaction

因為：


shop ≠ console


所以 RBAC 還要加一層：

## Context Filter


shop context → only customer permissions
console context → only staff/admin permissions


---

# 8. Data Model

## User


id
email
name


---

## Role Profile


id
name
type (profile | functional | system)
permissions[]


---

## User Role Mapping


user_id
role_profile_id


---

## Optional Direct Role Assign


user_id
role_id


---

# 9. Admin Design Requirement

## 必須提供：

### 9.1 Role Management UI

* 建立 Role Profile
* 編輯 permissions
* clone role

---

### 9.2 User Role Assignment

* assign profile
* add extra role
* remove role

---

### 9.3 Permission Inspector

查看：


User → final permissions


---

# 10. Security Principle


Permissions are computed, never stored as final truth


---

# 11. Edge Cases

---

## Case 1：Admin + Staff Profile

→ Admin overrides all

---

## Case 2：Staff without profile but functional roles

→ valid but limited

---

## Case 3：conflicting roles

→ union (no conflict resolution needed)

---

# 12. TPM Summary


> A composable RBAC system using role profiles as base templates with functional role augmentation, evaluated under a context-scoped authorization layer.


