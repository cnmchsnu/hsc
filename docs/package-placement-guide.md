# Package Placement Guide

## Purpose

This document defines where new dependencies must be installed within the monorepo.

Before installing any package, determine:

1. What responsibility the package belongs to.
2. Whether it is application-specific or shared.
3. Whether it belongs to an existing domain package.
4. Whether a new package should be created.

Never install a package into an arbitrary workspace.

---

# Monorepo Structure

```text
apps/
├── web
├── shop
└── console

packages/
├── ui
├── auth
├── database
├── shared
├── i18n
├── eslint-config
└── typescript-config
```

---

# Decision Tree

Follow these steps in order.

# Global Rule

Never install new packages automatically.

Before installation:

1. Determine package responsibility.
2. Determine target workspace.
3. Explain reasoning.
4. Ask for approval if a new package namespace is required.

Example:

Package: i18next
Reason: Shared internationalization capability
Target: packages/i18n
Install command:
pnpm add i18next react-i18next --filter @repo/i18n

## Step 1: Is it UI-related?

Examples:

* Radix UI
* shadcn/ui
* lucide-react
* sonner
* class-variance-authority
* react-hook-form

Install into:

```text
packages/ui
```

Example:

```bash
pnpm add lucide-react --filter @repo/ui
```

```bash
pnpm add sonner --filter @repo/ui
```

---

## Step 2: Is it Authentication-related?

Examples:

* Supabase Auth
* OAuth Providers
* Session Management

Install into:

```text
packages/auth
```

Example:

```bash
pnpm add @supabase/supabase-js --filter @repo/auth
```

Do not install authentication packages directly into applications.

---

## Step 3: Is it Database-related?

Examples:

* Database clients
* ORM
* Query builders
* Repository implementations

Install into:

```text
packages/database
```

Examples:

```bash
pnpm add @supabase/supabase-js --filter @repo/database
```

```bash
pnpm add drizzle-orm --filter @repo/database
```

---

## Step 4: Is it a Pure Utility?

Pure utilities contain:

* validation
* date handling
* formatting
* constants
* helper functions

Install into:

```text
packages/shared
```

Examples:

```bash
pnpm add zod --filter @repo/shared
```

```bash
pnpm add dayjs --filter @repo/shared
```

```bash
pnpm add lodash-es --filter @repo/shared
```

Requirements:

* No React
* No UI
* No database access
* No browser-only APIs

---

## Step 5: Is it used by only one application?

If yes, install directly into that application.

Examples:

### Shop Only

```text
apps/shop
```

Examples:

```bash
pnpm add stripe --filter shop
```

```bash
pnpm add @ecpay/sdk --filter shop
```

```bash
pnpm add fuse.js --filter shop
```

---

### Console Only

```text
apps/console
```

Examples:

```bash
pnpm add recharts --filter console
```

```bash
pnpm add @tanstack/react-table --filter console
```

```bash
pnpm add @dnd-kit/core --filter console
```

---

### Web Only

```text
apps/web
```

Examples:

```bash
pnpm add next-sitemap --filter web
```

```bash
pnpm add fumadocs-core --filter web
```

---

## Step 6: Is it a shared domain capability?

If multiple applications use it and it represents a specific business or technical domain, create or use a dedicated package.

Examples:

### Internationalization

Install into:

```text
packages/i18n
```

Examples:

```bash
pnpm add i18next --filter @repo/i18n
```

```bash
pnpm add react-i18next --filter @repo/i18n
```

---

### Notifications

Install into:

```text
packages/notification
```

Examples:

```bash
pnpm add resend --filter @repo/notification
```

```bash
pnpm add react-email --filter @repo/notification
```

---

### Analytics

Install into:

```text
packages/analytics
```

Examples:

```bash
pnpm add posthog-js --filter @repo/analytics
```

```bash
pnpm add @vercel/analytics --filter @repo/analytics
```

---

### Payments

Install into:

```text
packages/payment
```

ONLY when payment logic is shared between multiple applications.

Examples:

```bash
pnpm add stripe --filter @repo/payment
```

---

# Common Examples

| Package                          | Location              |
| -------------------------------- | --------------------- |
| lucide-react                     | packages/ui           |
| sonner                           | packages/ui           |
| react-hook-form                  | packages/ui           |
| class-variance-authority         | packages/ui           |
| zod                              | packages/shared       |
| dayjs                            | packages/shared       |
| lodash-es                        | packages/shared       |
| @supabase/supabase-js (auth)     | packages/auth         |
| @supabase/supabase-js (database) | packages/database     |
| i18next                          | packages/i18n         |
| react-i18next                    | packages/i18n         |
| resend                           | packages/notification |
| react-email                      | packages/notification |
| posthog-js                       | packages/analytics    |
| stripe (shop only)               | apps/shop             |
| ecpay sdk                        | apps/shop             |
| recharts                         | apps/console          |
| tanstack table                   | apps/console          |
| next-sitemap                     | apps/web              |

---

# Prohibited Practices

Do NOT:

* Install all packages into root.
* Install business-specific packages into ui.
* Install database clients into ui.
* Install payment SDKs into ui.
* Install analytics directly into every application when a shared analytics package exists.
* Place React-based packages inside shared.

---

# Default Rule

When unsure:

1. Check whether the package belongs to an existing package domain.
2. Check whether only one application uses it.
3. Check whether it represents a reusable capability.
4. Prefer creating a dedicated package over polluting ui or shared.

Architecture clarity is more important than minimizing package count.
