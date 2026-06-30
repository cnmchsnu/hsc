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

avatar_url              TEXT

student_id              TEXT UNIQUE NULL

auto_classification     TEXT NOT NULL
manual_override         TEXT NULL

final_classification    TEXT GENERATED ALWAYS AS (
    COALESCE(manual_override, auto_classification)
) STORED

sync_display_name       BOOLEAN NOT NULL DEFAULT TRUE
sync_avatar             BOOLEAN NOT NULL DEFAULT TRUE

created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
```

Rules

Rules

- One profile per authenticated user.
- User classification is derived from automatic detection unless manually overridden.
- Never duplicate authentication fields (email, password, provider, etc.).
- Email is always read from auth.users.
- Provider metadata (Google name, avatar, etc.) is always read from auth.users.raw_user_meta_data when synchronization is enabled.
- display_name represents the application's display name.
- avatar_url represents the application's active avatar.
- When sync_display_name is TRUE, display_name should be synchronized from the authentication provider during login.
- When sync_avatar is TRUE, avatar_url should be synchronized from the authentication provider during login.

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

# 4. COMMERCE SYSTEM

The `commerce` schema contains all commerce-related business entities.

This includes:

- Campaigns
- Products
- Shopping Carts
- Orders
- Payments

All fulfillment, inventory, notification and authorization logic belongs to other schemas.

---

## commerce.campaigns

Represents an operational campaign.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

name                TEXT NOT NULL

description         TEXT

status              TEXT NOT NULL

start_time          TIMESTAMPTZ

end_time            TIMESTAMPTZ

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Status

```
draft
active
closed
archived
```

---

## commerce.campaign_products

Many-to-many relationship between campaigns and products.

```sql
campaign_id         UUID NOT NULL REFERENCES commerce.campaigns(id) ON DELETE CASCADE

product_id          UUID NOT NULL REFERENCES commerce.products(id) ON DELETE CASCADE

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

PRIMARY KEY (campaign_id, product_id)
```

---

## commerce.campaign_images *(MVP Optional)*

Stores campaign banner images.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

campaign_id         UUID NOT NULL REFERENCES commerce.campaigns(id) ON DELETE CASCADE

storage_path        TEXT NOT NULL

display_order       INTEGER NOT NULL DEFAULT 0

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

---

## commerce.products

Product master.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

name                TEXT NOT NULL

description         TEXT

price               INTEGER NOT NULL

currency            TEXT NOT NULL DEFAULT 'TWD'

stock_total         INTEGER NOT NULL DEFAULT 0

stock_sold          INTEGER NOT NULL DEFAULT 0

status              TEXT NOT NULL

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Status

```
active

inactive
```

---

## commerce.product_images *(MVP Optional)*

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

product_id          UUID NOT NULL REFERENCES commerce.products(id) ON DELETE CASCADE

storage_path        TEXT NOT NULL

display_order       INTEGER NOT NULL DEFAULT 0

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

---

## commerce.product_snapshots

Immutable product snapshot.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

product_id          UUID REFERENCES commerce.products(id)

name                TEXT NOT NULL

price               INTEGER NOT NULL

metadata            JSONB NOT NULL DEFAULT '{}'::jsonb

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

---

## commerce.carts

Shopping cart.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

user_id             UUID NOT NULL REFERENCES auth.users(id)

mode                TEXT NOT NULL DEFAULT 'strict'

campaign_id         UUID REFERENCES commerce.campaigns(id)

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Mode

```
strict
flex
```

---

## commerce.cart_items

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

cart_id             UUID NOT NULL REFERENCES commerce.carts(id) ON DELETE CASCADE

product_id          UUID NOT NULL REFERENCES commerce.products(id)

campaign_id         UUID NOT NULL REFERENCES commerce.campaigns(id)

quantity            INTEGER NOT NULL

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

---

## commerce.orders

Order header.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

user_id             UUID NOT NULL REFERENCES auth.users(id)

campaign_id         UUID NOT NULL REFERENCES commerce.campaigns(id)

status              TEXT NOT NULL

total_amount        INTEGER NOT NULL

currency            TEXT NOT NULL DEFAULT 'TWD'

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Status

```
created

paid

fulfilled

cancelled
```

---

## commerce.order_items

Order snapshot items.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

order_id            UUID NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE

product_id          UUID NOT NULL REFERENCES commerce.products(id)

product_snapshot_id UUID NOT NULL REFERENCES commerce.product_snapshots(id)

quantity            INTEGER NOT NULL

unit_price          INTEGER NOT NULL

subtotal            INTEGER NOT NULL
```

---

## commerce.order_metadata

Stores additional order form data.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

order_id            UUID NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE

data                JSONB NOT NULL DEFAULT '{}'::jsonb
```

---

## commerce.payments

Payment record.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

order_id            UUID NOT NULL REFERENCES commerce.orders(id)

amount              INTEGER NOT NULL

method              TEXT NOT NULL

status              TEXT NOT NULL

confirmed_by        UUID REFERENCES auth.users(id)

confirmed_at        TIMESTAMPTZ

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Method

```
cash
```

Status

```
pending

paid

failed

refunded
```

# 5. FULFILLMENT SYSTEM

The `fulfillment` schema manages inventory movements and order fulfillment.

Commerce is responsible for creating transactions.

Fulfillment is responsible for executing them.

---

## fulfillment.inventory_transactions

Immutable inventory transaction log.

Inventory is derived from transaction history and product stock values.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

product_id          UUID NOT NULL REFERENCES commerce.products(id)

type                TEXT NOT NULL

quantity            INTEGER NOT NULL

reference_type      TEXT NOT NULL

reference_id        UUID NOT NULL

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Type

```
reserve
release
deduct
adjust
```

Reference Type

```
order
batch
admin
```

Rules

- Never update inventory history.
- Always append new transactions.

---

## fulfillment.batches

Represents a fulfillment batch.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

campaign_id         UUID NOT NULL REFERENCES commerce.campaigns(id)

name                TEXT NOT NULL

status              TEXT NOT NULL

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Status

```
draft

packing

shipped

completed
```

---

## fulfillment.batch_items

Maps orders into batches.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

batch_id            UUID NOT NULL REFERENCES fulfillment.batches(id) ON DELETE CASCADE

order_id            UUID NOT NULL REFERENCES commerce.orders(id)

user_id             UUID NOT NULL REFERENCES auth.users(id)

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Rules

- One order belongs to one batch.
- Batch assignment can change until shipment.


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

# 6. SYSTEM

The `system` schema contains shared platform services.

These tables are not owned by any single business domain.

They provide cross-domain functionality used throughout the application.

---

## system.notifications

Stores in-app notifications.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

user_id             UUID NOT NULL REFERENCES auth.users(id)

type                TEXT NOT NULL

title               TEXT NOT NULL

message             TEXT NOT NULL

status              TEXT NOT NULL

payload             JSONB NOT NULL DEFAULT '{}'::jsonb

read_at             TIMESTAMPTZ NULL

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Status

```
unread

read
```

Rules

- Notifications are immutable after creation except status.
- Payload stores additional contextual information.

---

## system.files *(MVP Optional)*

Centralized file registry.

Every uploaded file should have exactly one record.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

bucket              TEXT NOT NULL

path                TEXT NOT NULL

filename            TEXT NOT NULL

mime_type           TEXT NOT NULL

size                BIGINT NOT NULL

uploaded_by         UUID REFERENCES auth.users(id)

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Rules

- File metadata only.
- Binary data is stored in Supabase Storage.

---

## system.settings *(MVP Optional)*

Stores platform-wide configuration.

Configuration values should be editable through the administration console.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

key                 TEXT NOT NULL UNIQUE

value               JSONB NOT NULL

description         TEXT

updated_by          UUID REFERENCES auth.users(id)

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Rules

- Keys must be globally unique.
- Values are stored as JSONB to support different data types.
- System settings should not contain user-specific information.

Examples

```
shop.name

shop.currency

shop.maintenance

order.max_quantity

batch.naming_pattern

notification.enabled
```

---

## system.policies *(MVP Optional)*

Stores configurable policy rules.

```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()

name                TEXT NOT NULL

target_type         TEXT NOT NULL

action              TEXT NOT NULL

condition           JSONB NOT NULL

effect              JSONB NOT NULL

priority            INTEGER NOT NULL DEFAULT 0

enabled             BOOLEAN NOT NULL DEFAULT true

created_at          TIMESTAMPTZ NOT NULL DEFAULT now()

updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
```

Target Types

```
product

campaign

order

form
```

Action

```
allow

deny

transform
```

Rules

- Policies are evaluated by the Policy Engine.
- Policies never directly modify business tables.

---

CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE audit.order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL
        REFERENCES commerce.orders(id)
        ON DELETE CASCADE,

    event TEXT NOT NULL,

    performed_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_events_order
ON audit.order_events(order_id);

CREATE INDEX idx_order_events_created
ON audit.order_events(created_at DESC);

CREATE TABLE audit.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payment_id UUID NOT NULL
        REFERENCES commerce.payments(id)
        ON DELETE CASCADE,

    event TEXT NOT NULL,

    performed_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_events_payment
ON audit.payment_events(payment_id);

CREATE INDEX idx_payment_events_created
ON audit.payment_events(created_at DESC);

CREATE TABLE audit.system_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    type TEXT NOT NULL,

    source TEXT NOT NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_system_events_type
ON audit.system_events(type);

CREATE INDEX idx_system_events_created
ON audit.system_events(created_at DESC);

-- MVP Optional
CREATE TABLE audit.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    resource_type TEXT NOT NULL,

    resource_id UUID,

    action TEXT NOT NULL,

    before_data JSONB,

    after_data JSONB,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_user
ON audit.audit_logs(user_id);

CREATE INDEX idx_audit_logs_resource
ON audit.audit_logs(resource_type, resource_id);

CREATE INDEX idx_audit_logs_created
ON audit.audit_logs(created_at DESC);

-- MVP Optional
CREATE TABLE audit.login_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    provider TEXT NOT NULL,

    success BOOLEAN NOT NULL,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_login_logs_user
ON audit.login_logs(user_id);

CREATE INDEX idx_login_logs_created
ON audit.login_logs(created_at DESC);

-- MVP Optional
CREATE TABLE audit.api_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    request_id UUID NOT NULL DEFAULT gen_random_uuid(),

    method TEXT NOT NULL,

    path TEXT NOT NULL,

    status_code INTEGER NOT NULL,

    duration_ms INTEGER CHECK (duration_ms >= 0),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_logs_user
ON audit.api_logs(user_id);

CREATE INDEX idx_api_logs_path
ON audit.api_logs(path);

CREATE INDEX idx_api_logs_created
ON audit.api_logs(created_at DESC);

# 7. TPM FINAL NOTE

This schema is intentionally designed as:

> A modular relational core with event-sourced extensions, supporting strict MVP transactional flows while preserving future expansion into rule-based automation, multi-campaign commerce, and fulfillment orchestration systems.

