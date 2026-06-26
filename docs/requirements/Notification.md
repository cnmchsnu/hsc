# UR-007 Notification Requirement（站內通知系統）

## 核心決策


MVP: In-App Notification List Only
No event system, no external integrations


---

# 1. 系統定位

Notification 在本系統中是：


Passive information layer (non-critical UX support)


用途：

* 提醒狀態變更
* 提醒履約進度
* 提醒訂單異動
* 提醒管理操作結果

---

# 2. MVP 功能範圍

## 2.1 支援內容

* 訂單狀態更新
* Campaign 狀態變更
* Batch 建立 / 完成
* 系統提示（如缺貨）

---

## 2.2 不支援

* push notification
* email
* LINE / Discord bot
* webhook
* event bus

---

# 3. Notification Model

## 3.1 基本結構


Notification
- id
- user_id
- type
- title
- message
- status (unread / read)
- created_at


---

## 3.2 Type 定義


order.created
order.updated
campaign.status_changed
batch.created
batch.completed
system.alert


---

# 4. Notification Flow

## 4.1 Trigger Source


Internal system events only


---

## 4.2 Flow


System Action
↓
Create Notification
↓
Store DB
↓
User sees in UI list


---

## 5. User Experience

## 5.1 Notification Center


- list view
- unread indicator
- mark as read


---

## 5.2 Header Badge


Unread count


---

## 6. Read State Management

## 6.1 Rules

* default = unread
* user can mark as read
* bulk mark as read allowed

---

# 7. Scope Rules

## 7.1 User Bound

Notification is always:


user-scoped


---

## 7.2 No Broadcast System (MVP)

不支援：


global announcement push
mass messaging


---

# 8. Integration Points

Notification 會接：

---

## 8.1 Order Lifecycle


order.created
order.paid (future)
order.updated
order.cancelled


---

## 8.2 Campaign Lifecycle


campaign.active
campaign.order_closed
campaign.completed


---

## 8.3 Batch Lifecycle


batch.created
batch.assigned
batch.completed


---

# 9. Storage Strategy

## MVP


Single table Notification


No partitioning required.

---

# 10. Performance Consideration

## Assumption


Low volume (student organization scale)


So:

* no queue
* no async pipeline
* no event broker

---

# 11. Future Extension (預留但不做)

你現在其實已經預留：


Event-driven Notification System


未來可以升級：

* webhook
* email service
* LINE bot
* Discord integration
* notification rules engine

---

# 12. System Principle


Notification is a byproduct of state change, not a primary system workflow


---

# 13. TPM Summary

你的 Notification 系統是：

> A lightweight, database-driven in-app notification system triggered by internal state transitions, with no external delivery mechanisms in MVP, but designed to be extendable into an event-driven notification architecture in future iterations.

