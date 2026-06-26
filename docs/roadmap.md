# Product & Engineering Roadmap

## Phase 0 — System Foundation (Week 0–2)

### Objective

Establish core architecture, repository structure, and minimal deployable skeleton.

### Deliverables

**1. Monorepo Initialization**

* apps/shop
* apps/console
* apps/api
* apps/worker
* packages/domain
* packages/order / campaign / inventory / cart (minimal stubs)

**2. Infrastructure Setup**

* Database (PostgreSQL)
* ORM (Prisma or equivalent)
* CI pipeline (lint / typecheck / build)
* Local dev environment (docker-compose)

**3. Core Architectural Rules**

* Domain layer is framework-agnostic
* API layer is thin orchestration only
* Worker layer reserved for async execution
* No business logic in frontend apps

**Exit Criteria**

* System boots locally
* Basic API health check
* DB migrations running

---

## Phase 1 — MVP Core Commerce Flow (Week 2–6)

### Objective

Enable end-to-end purchasing flow (browse → cart → order → payment → fulfillment).

---

### 1. Campaign System (MVP D-model)

* Create campaign
* Campaign start/end time
* Attach products
* Enforce single-campaign constraint

---

### 2. Product System

* CRUD products
* Stock field (product-level only)
* Campaign association

---

### 3. Cart System

* Add/remove items
* Enforce single campaign per cart
* Basic validation before checkout

---

### 4. Order System (Core)

* Order creation from cart
* Order lifecycle:

  * created → paid → fulfilled
* Snapshot pricing at order creation

---

### 5. Payment System (Cash Only)

* Manual payment confirmation
* Payment state tracking
* Event emitted on status change

---

### 6. Inventory System (MVP B-model)

* product-level stock
* deduct on order confirmation
* prevent oversell

---

### 7. Batch System (Manual-first)

* Create batch under campaign
* Assign orders manually
* Mark batch as completed

---

### Exit Criteria

* User can place order end-to-end
* Admin can confirm payment
* Admin can assign batch and mark fulfillment complete

---

## Phase 2 — Operational Console (Week 6–9)

### Objective

Enable full operational control via console system.

---

### 1. Console Dashboard

* Orders overview
* Payment management
* Batch management
* Campaign management

---

### 2. Order Management Tools

* View order details
* Update payment status
* Reassign batch manually

---

### 3. Batch Management

* Create batches
* Assign orders
* Bulk operations

---

### 4. Basic RBAC Enforcement

* Admin / Staff / Customer separation
* Context-based routing (shop vs console)

---

### Exit Criteria

* Staff can fully operate system without database access
* No backend intervention needed for daily operations

---

## Phase 3 — System Hardening & Event Layer (Week 9–12)

### Objective

Stabilize system architecture and introduce event-driven foundation.

---

### 1. Event Model Introduction

* payment.updated
* order.created
* order.paid
* batch.assigned

---

### 2. Worker System Activation

* batch assignment automation (initial)
* notification generation (in-app only)
* inventory reconciliation jobs

---

### 3. Notification System (In-app only)

* user notification list
* event-based creation
* read/unread state

---

### 4. Policy Engine (MVP Lite)

* internal/external visibility rules
* campaign-based restrictions

---

### Exit Criteria

* System state changes fully traceable via events
* Background processes moved out of API layer

---

## Phase 4 — Automation Enablement (Week 12–16)

### Objective

Introduce controlled automation without changing core models.

---

### 1. Batch Allocation Engine (Rule-based)

* simple IF/THEN rules
* manual override always available
* simulation mode for admin

---

### 2. Payment Event Expansion

* refund handling (manual)
* extended payment states prepared

---

### 3. Inventory Extension (Preparation for D model)

* campaign-level hooks (inactive)
* wave-level abstraction (inactive)

---

### 4. Segmentation Layer (C fallback activation-ready)

* cart segmentation logic introduced but disabled

---

### Exit Criteria

* system can support semi-automated operations
* manual override remains dominant control layer

---

## Phase 5 — Expansion Layer (Post-MVP / v2+)

### Objective

Transform system into full operational platform.

---

### 1. Multi-Campaign Cart (C Mode)

* cart segmentation engine enabled
* order splitting supported

---

### 2. Full Policy Engine

* rule builder UI
* DSL support
* condition chaining

---

### 3. Dynamic Form System

* schema-based forms
* product-specific metadata rules
* conditional fields

---

### 4. Multi-layer Inventory

* product + campaign + wave
* allocation priority system

---

### 5. External Integrations

* payment gateways
* email / LINE / Discord notifications
* webhook system

---

### 6. Analytics Layer

* campaign performance
* order funnel tracking
* fulfillment efficiency
* batch performance metrics

---

## Phase 6 — Platform Maturity (Long-term)

### Objective

Evolve into a generalized commerce + operations platform.

---

### 1. Rule Engine Full Conversion

* visual rule builder
* plugin-based condition system

---

### 2. Multi-tenant Support

* multiple organizations
* isolated campaigns and policies

---

### 3. Automation Marketplace (optional)

* reusable batch rules
* shared templates

---

### 4. Advanced Fulfillment Optimization

* AI-assisted batch grouping
* predictive stock allocation

---

# Key Architectural Principle Across All Phases

```
MVP enforces constraints in application layer
Future flexibility is preserved in domain model design
Automation is added as an overlay, not a rewrite
```

---

# Critical Milestones Summary

* Week 2: system skeleton ready
* Week 6: full order-to-fulfillment MVP
* Week 9: operational console complete
* Week 12: event-driven architecture active
* Week 16: automation engine enabled
* v2+: platform expansion


