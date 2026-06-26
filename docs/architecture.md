# Repository Structure (Monorepo)


repo/
├── apps/
│   ├── shop/                  # Customer-facing storefront
│   ├── console/               # Staff/Admin operations system
│   ├── api/                  # Backend API (core business logic)
│   ├── worker/               # Background jobs (batch, payment events)
│   └── docs/                # Internal documentation site (optional)
│
├── packages/
│   ├── domain/               # Core business logic (NO framework dependency)
│   ├── db/                   # Prisma/ORM schema + migrations
│   ├── auth/                 # RBAC + session + identity context
│   ├── policy-engine/        # Rule system (MVP-lite, future full engine)
│   ├── inventory/            # Stock logic (product/campaign/wave ready)
│   ├── order/                # Order lifecycle engine
│   ├── cart/                 # Cart + (C fallback segmentation ready)
│   ├── campaign/             # Campaign lifecycle system
│   ├── batch/                # Batch allocation engine (manual + automation)
│   ├── payment/              # Payment state machine + events
│   ├── notification/         # In-app notification system
│   ├── form/                 # Static MVP + schema-ready future system
│   ├── shared/              # Utils, constants, types
│   ├── ui/                   # Shared UI components (design system)
│   └── config/              # eslint, tsconfig, env, feature flags
│
├── infra/
│   ├── docker/               # Local dev infra (db, redis if needed)
│   ├── vercel/               # Deployment configs (if used)
│   └── env/                  # Example env configs
│
├── scripts/
│   ├── seed/                 # DB seed scripts
│   ├── migrations/           # Custom migration utilities
│   └── dev-tools/            # CLI helpers (batch simulation etc.)
│
├── .github/
│   ├── workflows/            # CI/CD pipelines
│
├── turbo.json                # Monorepo task pipeline (if using Turborepo)
├── package.json
├── tsconfig.base.json
└── README.md


---

# Architectural Principles (VERY IMPORTANT)

## 1. apps = orchestration layer only


apps/shop     → UI only (no business logic)
apps/console  → UI + admin orchestration
apps/api      → HTTP layer only
apps/worker   → async execution layer


NO business rules inside apps

---

## 2. packages/domain = single source of truth


All business logic lives here:
- Order rules
- Campaign rules
- Inventory rules
- Batch rules


This is your “brain”

---

## 3. packages/* are bounded contexts

| Package       | Responsibility            |
| ------------- | ------------------------- |
| order         | lifecycle + state machine |
| campaign      | campaign lifecycle        |
| batch         | fulfillment logic         |
| inventory     | stock rules               |
| payment       | payment state transitions |
| policy-engine | rule evaluation           |
| form          | metadata system           |
| cart          | pre-order aggregation     |

---

## 4. apps/api = thin API layer


Request → validate → call domain → return result


No logic duplication.

---

## 5. worker = event execution layer

Handles:

* batch assignment
* payment updates
* notification triggers
* inventory reconciliation

---

#  Future Expansion Compatibility (Your D-model decisions)

This structure already supports:

### Order C fallback (multi-campaign)

* handled in `packages/cart + order`

### Policy Engine evolution

* `packages/policy-engine`

### Batch automation engine

* `packages/batch`

### Event-driven system

* `apps/worker`

### Form engine upgrade

* `packages/form`

---

#  MVP Simplification (what you actually use first)

In MVP:


ACTIVE PACKAGES:
- domain (core logic subset)
- order
- campaign
- inventory
- batch (manual mode)
- payment (manual cash)
- cart (simple D mode only)


Everything else is:


future-ready but dormant


---

#  Suggested Tooling Layer (optional but recommended)

You will likely run:

* Turborepo (task orchestration)
* PNPM (workspace management)
* Prisma (DB layer)
* Next.js (shop + console)
* Node.js (api + worker)

---

#  Key Design Insight (TPM-level)

This repo structure enforces:

> **Separation of UI / orchestration / domain / automation layers**

Which prevents your system from collapsing into:

* “logic inside controllers”
* “frontend-driven business rules”
* “unmaintainable campaign hacks”
