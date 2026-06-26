Below is a **production-aligned database schema** designed to match your decisions:

* Campaign-centric commerce model
* D-model MVP (single campaign per order)
* C fallback (multi-campaign cart reserved)
* Event-ready architecture
* Manual-first operations (cash payment, batch fulfillment)
* Future-ready policy + automation layers

I’ll express this in **relational schema (PostgreSQL style)** with clear boundaries.

---

# 1. Core Design Principles


- Order is immutable after creation (snapshot model)
- Campaign is the primary organizational unit
- Inventory is product-level in MVP
- Batch is campaign-scoped fulfillment unit
- Payment is event-driven state machine
- Policy engine is separate evaluation layer (not inline logic)


---

# 2. USER SYSTEM

## users

sql id="users"
id                UUID PRIMARY KEY
email             TEXT UNIQUE NOT NULL
name              TEXT
role              TEXT NOT NULL -- customer | staff | admin
created_at        TIMESTAMP
updated_at        TIMESTAMP


---

## user_profiles (internal/external classification)

sql id="user_profiles"
user_id           UUID PRIMARY KEY REFERENCES users(id)

auto_classification   TEXT  -- internal | external
manual_override       TEXT NULL -- internal | external

final_classification   TEXT GENERATED


---

## user_sessions (optional MVP-light)

sql id="sessions"
id               UUID PRIMARY KEY
user_id          UUID REFERENCES users(id)
provider         TEXT
created_at       TIMESTAMP
expires_at       TIMESTAMP


---

# 3. CAMPAIGN SYSTEM

## campaigns

sql id="campaigns"
id              UUID PRIMARY KEY
name            TEXT
status          TEXT -- draft | active | closed | archived

start_time      TIMESTAMP
end_time        TIMESTAMP

created_at      TIMESTAMP
updated_at      TIMESTAMP


---

## campaign_products

sql id="campaign_products"
campaign_id     UUID REFERENCES campaigns(id)
product_id      UUID REFERENCES products(id)

PRIMARY KEY (campaign_id, product_id)


---

# 4. PRODUCT SYSTEM

## products

sql id="products"
id              UUID PRIMARY KEY
name            TEXT
description     TEXT

price           INTEGER
currency        TEXT DEFAULT 'TWD'

stock_total     INTEGER
stock_sold      INTEGER DEFAULT 0

status          TEXT -- active | inactive

created_at      TIMESTAMP
updated_at      TIMESTAMP


---

## product_snapshots (important for order immutability)

sql id="product_snapshots"
id              UUID PRIMARY KEY
product_id      UUID
name            TEXT
price           INTEGER
metadata        JSONB
created_at      TIMESTAMP


---

# 5. CART SYSTEM (D model + C fallback ready)

## carts

sql id="carts"
id              UUID PRIMARY KEY
user_id         UUID REFERENCES users(id)

mode            TEXT -- strict (MVP D) | flex (future C)

campaign_id     UUID NULL -- enforced in MVP

created_at      TIMESTAMP
updated_at      TIMESTAMP


---

## cart_items

sql id="cart_items"
id              UUID PRIMARY KEY
cart_id         UUID REFERENCES carts(id)

product_id      UUID
campaign_id     UUID

quantity        INTEGER
created_at      TIMESTAMP


---

# 6. ORDER SYSTEM

## orders

sql id="orders"
id              UUID PRIMARY KEY
user_id         UUID REFERENCES users(id)

campaign_id     UUID NOT NULL

status          TEXT -- created | paid | fulfilled | cancelled

total_amount    INTEGER
currency        TEXT

created_at      TIMESTAMP
updated_at      TIMESTAMP


---

## order_items

sql id="order_items"
id              UUID PRIMARY KEY
order_id        UUID REFERENCES orders(id)

product_id      UUID
product_snapshot_id UUID

quantity        INTEGER
unit_price      INTEGER
subtotal        INTEGER


---

## order_events (event sourcing backbone)

sql id="order_events"
id              UUID PRIMARY KEY
order_id        UUID REFERENCES orders(id)

type            TEXT -- created | paid | updated | cancelled

payload         JSONB

created_at      TIMESTAMP


---

# 7. PAYMENT SYSTEM (event-driven)

## payments

sql id="payments"
id              UUID PRIMARY KEY
order_id        UUID REFERENCES orders(id)

amount          INTEGER
method          TEXT -- cash (MVP)

status          TEXT -- pending | paid | failed | refunded

confirmed_by    UUID NULL
confirmed_at    TIMESTAMP

created_at      TIMESTAMP


---

## payment_events

sql id="payment_events"
id              UUID PRIMARY KEY
payment_id      UUID REFERENCES payments(id)

type            TEXT
payload         JSONB

created_at      TIMESTAMP


---

# 8. INVENTORY SYSTEM (MVP B-model)

## inventory_transactions

sql id="inventory_transactions"
id              UUID PRIMARY KEY
product_id      UUID REFERENCES products(id)

type            TEXT -- reserve | release | deduct | adjust

quantity        INTEGER

reference_type  TEXT -- order | admin | batch
reference_id    UUID

created_at      TIMESTAMP


---

## (Derived state, NOT stored)


available = stock_total - stock_sold


---

# 9. BATCH SYSTEM (Fulfillment)

## batches

sql id="batches"
id              UUID PRIMARY KEY
campaign_id     UUID REFERENCES campaigns(id)

name            TEXT
status          TEXT -- draft | packing | shipped | completed

rule_id         UUID NULL

created_at      TIMESTAMP
updated_at      TIMESTAMP


---

## batch_items

sql id="batch_items"
id              UUID PRIMARY KEY
batch_id        UUID REFERENCES batches(id)

order_id        UUID REFERENCES orders(id)
user_id         UUID REFERENCES users(id)


---

# 10. POLICY ENGINE (future-ready)

## policies

sql id="policies"
id              UUID PRIMARY KEY
name            TEXT

target_type     TEXT -- product | order | campaign | form
action          TEXT -- allow | deny | transform

condition       JSONB
effect          JSONB

priority        INTEGER
enabled         BOOLEAN

created_at      TIMESTAMP


---

# 11. NOTIFICATION SYSTEM (in-app only MVP)

## notifications

sql id="notifications"
id              UUID PRIMARY KEY
user_id         UUID REFERENCES users(id)

type            TEXT
title           TEXT
message         TEXT

status          TEXT -- unread | read

payload         JSONB

created_at      TIMESTAMP


---

# 12. FORM SYSTEM (MVP minimal + future-ready)

## order_metadata

sql id="order_metadata"
id              UUID PRIMARY KEY
order_id        UUID REFERENCES orders(id)

data            JSONB


---

# 13. RBAC SYSTEM

## roles

sql id="roles"
id              UUID PRIMARY KEY
name            TEXT
type            TEXT -- profile | functional | system


---

## permissions

sql id="permissions"
id              UUID PRIMARY KEY
key             TEXT UNIQUE
description     TEXT


---

## role_permissions

sql id="role_permissions"
role_id         UUID REFERENCES roles(id)
permission_id   UUID REFERENCES permissions(id)

PRIMARY KEY (role_id, permission_id)


---

## user_roles

sql id="user_roles"
user_id         UUID REFERENCES users(id)
role_id         UUID REFERENCES roles(id)

PRIMARY KEY (user_id, role_id)


---

# 14. EVENT SYSTEM (foundation)

## system_events

sql id="events"
id              UUID PRIMARY KEY

type            TEXT
entity_type     TEXT
entity_id       UUID

payload         JSONB

created_at      TIMESTAMP


---

# 15. KEY RELATIONSHIP MAP


User
  → Cart
  → Order
      → Payment
      → Order Items
      → Inventory Transactions
      → Batch Items
      → Notifications

Campaign
  → Products
  → Orders
  → Batches

Policy Engine
  → evaluates all layers

Events
  → glue between systems


---

# 16. MVP SIMPLIFICATION (IMPORTANT)

In MVP you ONLY actively use:

* users
* campaigns
* products
* carts
* orders
* order_items
* payments
* batches
* inventory_transactions
* notifications (basic)

Everything else is:


schema exists but not operational


---

# 17. TPM FINAL NOTE

This schema is intentionally designed as:

> A modular relational core with event-sourced extensions, supporting strict MVP transactional flows while preserving future expansion into rule-based automation, multi-campaign commerce, and fulfillment orchestration systems.

