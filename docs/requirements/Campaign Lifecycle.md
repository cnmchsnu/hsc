# Campaign Lifecycle Requirement

## 學生會數位化電商平台

### 文件版本：v1.0（MVP）

---

# 1. Purpose

本文件定義 Campaign（活動）的完整生命週期與業務規則。

Campaign 在本系統中不是分類（Category），而是作為一個獨立的營運容器（Operational Container），用於管理特定期間的商品販售、訂單收集、履約執行與活動統計。

---

# 2. Scope

Campaign 管理：


Products
Orders
Fulfillment Waves
Batches
Statistics


Campaign 不管理：


Users
Roles
Permissions
Announcements


上述功能由系統其他模組負責。

---

# 3. Campaign Definition

Campaign 為一個具有開始與結束時間的營運單位。

範例：


迎新活動
校慶紀念品
畢業季商品預購
系服訂購
學生會週邊販售活動


---

# 4. Business Objectives

Campaign 需支援：

* 特定期間商品販售
* 訂單集中管理
* 多波履約（Fulfillment Waves）
* 批次發貨（Batch Fulfillment）
* 活動成效統計
* 未來票券系統整合

---

# 5. Campaign Lifecycle

## State Machine


Draft
 ↓
Scheduled
 ↓
Active
 ↓
Order Closed
 ↓
Fulfillment
 ↓
Completed
 ↓
Archived


---

# 6. State Definitions

---

## 6.1 Draft

### Description

活動建立中。

尚未對外公開。

### Allowed Actions

* 編輯活動資訊
* 新增商品
* 移除商品
* 指派負責人
* 設定時間

### Restrictions

* 不可購買
* 不可產生訂單

---

## 6.2 Scheduled

### Description

活動已完成設定。

等待開始時間到達。

### Allowed Actions

* 編輯活動資訊
* 新增商品
* 移除商品

### Restrictions

* 不可購買

### Automatic Transition


Current Time >= StartAt


轉為：


Active


---

## 6.3 Active

### Description

活動進行中。

允許建立訂單。

### Allowed Actions

* 商品販售
* 建立訂單
* 建立履約波次

### Restrictions

* 不可修改活動期間

### Automatic Transition


Current Time > EndAt


轉為：


Order Closed


---

## 6.4 Order Closed

### Description

停止收單。

進入訂單整理階段。

### Allowed Actions

* 查看訂單
* 匯出資料
* 整理履約資料

### Restrictions

* 不可新增訂單

### Typical Activities


訂單確認
資料修正
補件
統計


---

## 6.5 Fulfillment

### Description

履約階段。

開始進行商品發放。

### Allowed Actions

* 建立 Batch
* 執行履約
* 完成訂單

### Typical Activities


備貨
包裝
班級分組
發放


---

## 6.6 Completed

### Description

活動完成。

所有履約已結束。

### Allowed Actions

* 查看資料
* 匯出報表

### Restrictions

* 不可新增履約

---

## 6.7 Archived

### Description

歷史封存。

### Restrictions

* 唯讀
* 不可修改

---

# 7. Campaign Ownership

---

## Owner

活動主責人。

例如：


迎新總召
畢業季專案負責人
校慶活動負責人


---

## Members

活動協作者。

例如：


活動組
行政組
公關組
美宣組


---

## MVP Rules

### 記錄用途

* Dashboard 顯示
* 通知用途
* 報表用途

### 不影響權限

Campaign Ownership 不參與 RBAC 判斷。

---

# 8. Product Association

---

## Product Independence

Product 可獨立存在。

---

允許：


Product


無活動。

---

也允許：


Campaign
 └── Product


---

## Product Reuse

同一商品可被多個 Campaign 引用。

例如：


學生會帽T


同時存在於：


迎新活動
校慶活動


---

# 9. Sale Window Calculation

---

## Campaign Window


StartAt
EndAt


---

## Product Window


SaleStartAt
SaleEndAt


---

## Effective Sale Window

計算規則：


Campaign Window
∩
Product Window


---

### Example

Campaign


6/1 ~ 6/15


Product


1/1 ~ 12/31


實際可販售：


6/1 ~ 6/15


---

## Existing Product Exception

若商品先存在後加入 Campaign：

* 不修改 Product Lifecycle
* 僅影響 Campaign Context 內可販售期間

---

# 10. Fulfillment Wave Requirement

---

## Purpose

支援：

* 分批出貨
* 分批領取
* 長期販售商品

---

## Concept


Campaign
 ↓
Fulfillment Wave
 ↓
Batch
 ↓
Order


---

## Example


Wave 1
9/1~9/5 訂單

Wave 2
9/6~9/10 訂單

Wave 3
9/11~9/15 訂單


---

## MVP

### Required

資料模型需預留：


Fulfillment Wave


---

### Optional

後台 UI 可延後實作。

---

# 11. Announcement Policy

---

## MVP Strategy

系統僅提供：


Global Announcement


---

## Not Supported


Campaign Announcement


---

## Optional Tagging

公告可標記：


Campaign Tag


僅作分類用途。

不建立強關聯。

---

# 12. Statistics Requirement

---

## MVP Metrics

Campaign 必須提供：

### Order Count

訂單數量

---

### Product Count

商品數量

---

### Internal Order Count

校內訂單數

---

### External Order Count

校外訂單數

---

### Revenue

營收統計

---

### Batch Count

批次數量

---

# 13. Future Statistics

預留：


Fulfillment Rate
Completion Rate
Wave Statistics
Conversion Rate
Average Order Value


---

# 14. Required Data Model

## Campaign


id
code
name
description

status

start_at
end_at

owner_id

created_by

created_at
updated_at


---

## Campaign Member


campaign_id
user_id
role


---

## Campaign Product


campaign_id
product_id


---

## Campaign Wave (Future)


campaign_wave_id
campaign_id

name
description

start_at
end_at

status


---

# 15. Success Criteria (MVP)

系統需支援：

* 建立活動
* 活動排程
* 商品關聯
* 訂單關聯
* Batch 關聯
* 活動統計
* 活動封存

並可支援：

* 長期商品
* 多波履約
* 未來票券系統

而不需修改既有 Campaign Lifecycle 設計。

---

# TPM Summary

Campaign 在本系統中的正式定義為：

> An operational container that coordinates product availability, order collection, fulfillment execution, and performance tracking across a defined business period.

其本質是活動營運中心，而非商品分類工具。這個定位將作為後續 User Lifecycle、Policy Engine、Inventory、Ticket System 等模組的上游業務模型。
