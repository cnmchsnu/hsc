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

# 2. AUTH SYSTEM

The `auth` schema is managed entirely by Supabase.

Application tables must reference `auth.users(id)` as the canonical user identity.

Application code must never modify tables inside the `auth` schema directly unless using Supabase Admin APIs.

---

## auth.users (Supabase Managed)

> System table (Managed by Supabase)

Primary identity table.

Referenced by:

- identity.user_profiles
- commerce.carts
- commerce.orders
- commerce.payments.confirmed_by
- fulfillment.batch_items
- system.notifications
- identity.user_roles

Primary Key

```text
id UUID
```

Common fields (managed by Supabase)

```text
email
email_confirmed_at
phone
last_sign_in_at
raw_user_meta_data
raw_app_meta_data
created_at
updated_at
```

Authentication providers

- Google OAuth
- Email
- Magic Link
- Password
- Others supported by Supabase

Do not:

- Add application columns
- Store business data
- Store roles
- Store profile information

Those belong in the `identity` schema.

---

# 3. IDENTITY SYSTEM

The `identity` schema stores application-specific user information and authorization data.

Authentication is handled by `auth.users`.

Every application user should have exactly one profile linked to `auth.users(id)`.

---

## identity.user_profiles

Application user profile.

Stores business-related user information.

```sql
user_id                 UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE

display_name            TEXT
student_id              TEXT UNIQUE NULL

auto_classification     TEXT NOT NULL
manual_override         TEXT NULL

final_classification    TEXT GENERATED ALWAYS AS (
    COALESCE(manual_override, auto_classification)
) STORED

created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
```

Rules

- One profile per authenticated user.
- User classification is derived from automatic detection unless manually overridden.
- Never duplicate authentication fields (email, password, provider, etc.).

---

## identity.roles

Defines system roles.

```sql
id                      UUID PRIMARY KEY DEFAULT gen_random_uuid()

name                    TEXT NOT NULL UNIQUE

type                    TEXT NOT NULL

description             TEXT

created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
```

Example

```
customer
staff
admin
```

---

## identity.permissions

Defines every available permission.

```sql
id                      UUID PRIMARY KEY DEFAULT gen_random_uuid()

key                     TEXT NOT NULL UNIQUE

description             TEXT

created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
```

Example

```
order.read

order.update

campaign.manage

inventory.adjust
```

---

## identity.role_permissions

Many-to-many mapping between roles and permissions.

```sql
role_id                 UUID NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE

permission_id           UUID NOT NULL REFERENCES identity.permissions(id) ON DELETE CASCADE

PRIMARY KEY (role_id, permission_id)
```

---

## identity.user_roles

Assigns roles to users.

```sql
user_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE

role_id                 UUID NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE

assigned_by             UUID NULL REFERENCES auth.users(id)

assigned_at             TIMESTAMPTZ NOT NULL DEFAULT now()

PRIMARY KEY (user_id, role_id)
```

Rules

- A user may have multiple roles.
- Authorization should always be permission-based.
- Never store role names directly inside user profiles.

---

## identity.user_preferences *(MVP Optional)*

Stores user-specific preferences.

```sql
user_id                 UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE

language                TEXT DEFAULT 'zh-TW'

theme                   TEXT DEFAULT 'system'

timezone                TEXT DEFAULT 'Asia/Taipei'

created_at              TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
```

Future usage

- Theme
- Locale
- Timezone
- Notification preferences

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

