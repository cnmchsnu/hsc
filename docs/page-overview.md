# Page Overview Integration

The file:

docs/page-overview.md

is the source of truth for all routes.

Before converting any design:

1. Read page-overview.md
2. Search for matching business functionality
3. Determine whether:

* Existing page redesign
* Existing page enhancement
* New page creation

4. Update page-overview.md after conversion

---

# Route Resolution Workflow

Given:

HTML
Screenshot

Determine:

Business Purpose
↓
Existing Route?
↓
Yes → Update Existing Page
No → Create New Page
↓
Update page-overview.md

---

# Existing Page Detection

Examples

Design:
member-dashboard-v3.html

Business Meaning:
Member List

Existing Route:
members

Action:
Update existing route

Do NOT create:

members-v2
members-new
member-dashboard

---

Design:
event-registration-admin.html

Business Meaning:
Event Registration Management

Existing Route:
events/[id]/registrations

Action:
Update existing route

---

# New Page Creation

Only create a new route when:

1. No matching business page exists
2. Functionality is genuinely new
3. page-overview.md does not already contain equivalent functionality

After creation:

Update page-overview.md

Required fields:

* Page Name
* Route
* Status
* Description

---

# Design Mapping Registry

Whenever a design is converted:

Append entry to page-overview.md

Example

Design Source:
member-management-v2.html

Screenshot:
member-management.png

Mapped Route:
/members

Action:
Redesign Existing Page

Date:
YYYY-MM-DD

---

Design Source:
new-ticket-checkin.html

Screenshot:
ticket-checkin.png

Mapped Route:
/tickets/checkin

Action:
Create New Page

Date:
YYYY-MM-DD

---

# Completion Tracking

After successful conversion:

Update status in page-overview.md

[ ] Not Started

[~] In Progress

[x] Completed

[-] Deferred

Never leave converted pages untracked.

---

# Multi-Page Import Workflow

If multiple pages are supplied:

Example

dashboard.html
members.html
events.html

Process:

1. Match each page against page-overview.md
2. Create missing routes
3. Update existing routes where applicable
4. Update status for every affected page

Do not skip documentation updates.

---

# Synchronization Requirement

After every UI conversion task:

The following must remain synchronized:

* Design Files
* Route Structure
* page-overview.md

If synchronization cannot be maintained:

Stop and request clarification.

Never create undocumented routes.

---

# Public Site

## Home

Route:
/

Status:
[x]

Description:
Public landing page.

---

## Login

Route:
/login

Status:
[x]

Description:
User authentication.

---

## Register

Route:
/register

Status:
[ ]

Description:
User registration.

---

## Forgot Password

Route:
/forgot-password

Status:
[ ]

Description:
Password reset flow.

---

# User Portal

## Dashboard

Route:
/dashboard

Status:
[ ]

Description:
User overview dashboard.

---

## Profile

Route:
/profile

Status:
[x]

Description:
Personal profile.

---

## Notifications

Route:
/notifications

Status:
[ ]

Description:
System notifications.

---

# Organization Management

## Organization List

Route:
/organizations

Status:
[ ]

Description:
View organizations.

---

## Organization Detail

Route:
/organizations/[id]

Status:
[ ]

Description:
Organization information.

---

## Department Management

Route:
/departments

Status:
[ ]

Description:
Department list.

---

## Position Management

Route:
/positions

Status:
[ ]

Description:
Role and position definitions.

---

# Member Management

## Member List

Route:
/members

Status:
[ ]

Description:
Member directory.

---

## Member Detail

Route:
/members/[id]

Status:
[ ]

Description:
Member profile.

---

## Membership Applications

Route:
/members/applications

Status:
[ ]

Description:
Application review.

---

# Event Management

## Event List

Route:
/events

Status:
[ ]

Description:
Browse events.

---

## Event Detail

Route:
/events/[id]

Status:
[ ]

Description:
Event information.

---

## Event Creation

Route:
/events/create

Status:
[ ]

Description:
Create event.

---

## Event Registration Management

Route:
/events/[id]/registrations

Status:
[ ]

Description:
Registration review.

---

## Event Attendance

Route:
/events/[id]/attendance

Status:
[ ]

Description:
Attendance management.

---

# Ticket System

## Ticket Dashboard

Route:
/tickets

Status:
[ ]

Description:
Ticket management dashboard.

---

## Ticket Templates

Route:
/tickets/templates

Status:
[ ]

Description:
Ticket definitions.

---

## Ticket Orders

Route:
/tickets/orders

Status:
[ ]

Description:
Order management.

---

## Ticket Order Detail

Route:
/tickets/orders/[id]

Status:
[ ]

Description:
Order information.

---

## Ticket Check-In

Route:
/tickets/checkin

Status:
[ ]

Description:
QR code validation.

---

# Store

## Product List

Route:
/products

Status:
[x]

Description:
Store products.

---

## Product Detail

Route:
/products/[id]

Status:
[x]

Description:
Product page.

---

## Cart

Route:
/cart

Status:
[x]

Description:
Shopping cart.

---

## Checkout

Route:
/checkout

Status:
[x]

Description:
Order checkout.

---

## Order History

Route:
/orders

Status:
[ ]

Description:
Purchase history.

---

# Administrative Console

## Admin Dashboard

Route:
/admin

Status:
[ ]

Description:
Administrative overview.

---

## User Management

Route:
/admin/users

Status:
[ ]

Description:
System user management.

---

## Permission Management

Route:
/admin/permissions

Status:
[ ]

Description:
Role permissions.

---

## System Settings

Route:
/admin/settings

Status:
[ ]

Description:
System configuration.

---

## Audit Logs

Route:
/admin/logs

Status:
[ ]

Description:
System activity logs.

---

# Shared Components

## Global Navigation

Status:
[ ]

---

## Sidebar

Status:
[ ]

---

## Breadcrumb

Status:
[ ]

---

## Data Table

Status:
[ ]

---

## Statistics Cards

Status:
[ ]

---

## Form Builder Components

Status:
[ ]

---

## Modal Components

Status:
[ ]

---

# UI Conversion Tracking

When converting design files:

Record mapping here.

Example:

Design:
member-management-v2.html

Converted To:
Route: /members

Status:
[x]

Date:
2026-06-23

---

Design:
dashboard-redesign.html

Converted To:
Route: /dashboard

Status:
[x]

Date:
2026-06-25

---

Design:
shop_basic/Home
Converted To:
Route: /
Status:
[x]
Date:
2026-06-26

---

Design:
shop_basic/productList
Converted To:
Route: /products
Status:
[x]
Date:
2026-06-26

---

Design:
shop_basic/productDetail
Converted To:
Route: /products/[id]
Status:
[x]
Date:
2026-06-26

---

Design:
shop_basic/cart
Converted To:
Route: /cart
Status:
[x]
Date:
2026-06-26

---

Design:
shop_basic/checkout
Converted To:
Route: /checkout
Status:
[x]
Date:
2026-06-26

---

Design:
shop_basic/profile
Converted To:
Route: /profile
Status:
[x]
Date:
2026-06-26

---

Design:
@mockups/shop_login
Converted To:
Route: /login
Status:
[x]
Date:
2026-06-27

---

Design:
@mockups/shop_productNotFound
Converted To:
Route: /products/[id]/not-found.tsx
Status:
[x]
Date:
2026-07-03

---

Design:
@mockups/shop_console_product_overview
Converted To:
Route: apps/shop-console /products
Status:
[x]
Date:
2026-07-21

---

Design:
@mockups/shop_console_product_detail
Converted To:
Route: apps/shop-console /products/[id]
Status:
[x]
Date:
2026-07-21

---

Design:
@mockups/studio/行動裝置-首頁
Converted To:
Route: apps/studio /
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/活動總覽(computer & 活動總覽(mobile
Converted To:
Route: apps/studio /events
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/活動細節(mobile
Converted To:
Route: apps/studio /events/[id]
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/活動設定(computer & 活動設定(mobile
Converted To:
Route: apps/studio /events/[id]/settings
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/活動外觀設定(computer & 活動外觀設定(mobile
Converted To:
Route: apps/studio /events/[id]/appearance
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/訂單-總覽(computer only
Converted To:
Route: apps/studio /orders
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/訂單-對帳(computer
Converted To:
Route: apps/studio /orders/reconciliation
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/訂單-列印(computer only
Converted To:
Route: apps/studio /orders/[id]/print
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/QRcode掃描器(mobile only
Converted To:
Route: apps/studio /scanner
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/掃描結果-票券-成功(mobile only
Converted To:
Route: apps/studio /scanner/result/ticket
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/掃描結果-商品-領貨(mobile only
Converted To:
Route: apps/studio /scanner/result/pickup
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/掃描結果-商品-收款(mobile only
Converted To:
Route: apps/studio /scanner/result/payment
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/campaign_engine_studio & campaign_engine_studio_v2
Converted To:
Route: apps/studio /campaigns
Status:
[x]
Date:
2026-08-05

---

Design:
@mockups/studio/landingpage設定(computer
Converted To:
Route: apps/studio /settings/landing-page
Status:
[x]
Date:
2026-08-05




