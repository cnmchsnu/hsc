# 09. Public API

---

# Purpose

This document defines the stable public APIs exposed by the Auth package.

Only APIs documented here are considered part of the package contract.

Everything else should be treated as internal implementation details.

---

# Public Surface

```
@repo/auth

├── /server
└── /types
```

Only these entrypoints should be imported by applications.

---

# Server APIs

Current exports

```
getSession()

getCurrentUser()

requireUser()

requirePermission()
```

Future exports

```
requireRole()

createAbility()

getAuthorization()
```

---

# getSession()

## Purpose

Returns the authenticated Supabase session.

This function is intended for infrastructure-level operations.

---

## Signature

```
Promise<Session | null>
```

---

## Responsibilities

Read session cookies.

Validate authentication.

Return the Supabase session.

---

## Does NOT

Load profile.

Load permissions.

Load roles.

Load CurrentUser.

---

## Typical Usage

Authentication middleware

Server infrastructure

OAuth callback

---

# getCurrentUser()

## Purpose

Returns the canonical application user.

---

## Signature

```
Promise<CurrentUser | null>
```

---

## Responsibilities

Validate session.

Load profile.

Load authorization.

Aggregate CurrentUser.

---

## Typical Usage

Server Components

Route Handlers

Server Actions

Business Services

---

## Data Flow

Session

↓

AuthUser

↓

Profile

↓

Authorization

↓

CurrentUser

---

# requireUser()

## Purpose

Guarantee an authenticated user.

---

## Signature

```
Promise<CurrentUser>
```

---

## Behavior

CurrentUser exists

↓

Return CurrentUser

Otherwise

↓

Throw

UnauthenticatedError

---

## Why

Removes repetitive null checking.

Provides a strongly typed authenticated user.

---

## Example

```
const currentUser =
    await requireUser();
```

---

# requirePermission()

## Purpose

Ensure the current user owns a permission.

---

## Signature

```
Promise<void>
```

---

## Parameters

CurrentUser

Permission

---

## Behavior

Permission exists

↓

Continue

Permission missing

↓

PermissionDeniedError

---

## Example

```
await requirePermission(
    currentUser,
    "product.manage",
);
```

---

# Error Contracts

Every public API throws domain-specific errors.

Examples

UnauthenticatedError

PermissionDeniedError

ProfileNotFoundError

AuthorizationNotFoundError

Infrastructure exceptions should not leak directly.

---

# Nullability Rules

API | Nullable
--- | ---
getSession | Yes
getCurrentUser | Yes
requireUser | No
requirePermission | No

---

# Async Rules

All public APIs are asynchronous.

Even when current implementations appear synchronous, future implementations may introduce caching, distributed authorization, or remote identity providers.

Applications should always await these APIs.

---

# Stability Guarantee

The following APIs are considered stable.

getSession()

getCurrentUser()

requireUser()

requirePermission()

Future package updates should preserve these interfaces whenever possible.

Breaking changes require a major version increment.

---

# Recommended Usage

Server Component

↓

requireUser()

↓

CurrentUser

↓

Business Service

↓

Repository

Applications should depend on CurrentUser instead of Supabase whenever possible.