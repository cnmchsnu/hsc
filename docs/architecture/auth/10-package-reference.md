# 10. Package Reference

---

# Package Structure

```
packages/auth

src/

current-user/

authorization/

profile/

server/

types/

container.ts

index.ts
```

Each directory represents a domain rather than a technical layer.

---

# Current Directory Layout

```
current-user/

authorization/

profile/

server/

types/
```

Additional domains should follow the same convention.

Example

```
ability/

policy/

audit/
```

---

# Dependency Graph

```
Application

↓

Server APIs

↓

CurrentUserService

↓

ProfileService

AuthorizationService

↓

Repositories

↓

Database
```

Dependencies always flow downward.

---

# Forbidden Dependencies

Repositories

→

Next.js

Repositories

→

CurrentUser

Repositories

→

Authorization Guards

CurrentUser

→

Supabase

Pages

→

Repositories

Infrastructure should never leak upward.

---

# Container

The container is responsible for dependency composition.

Responsibilities

Construct repositories.

Construct services.

Wire dependencies.

Expose application services.

The container should not contain business logic.

---

# Repository Layer

Current repositories

```
ProfileRepository

AuthorizationRepository
```

Responsibilities

Load domain models.

Persist domain models.

Translate infrastructure.

Repositories do not enforce business rules.

---

# Service Layer

Current services

```
ProfileService

AuthorizationService

CurrentUserService
```

Responsibilities

Coordinate repositories.

Apply business validation.

Aggregate domain models.

Construct immutable objects.

---

# Domain Models

Current

Profile

Authorization

CurrentUser

Future

Ability

PolicyContext

OrganizationContext

AuditContext

FeatureContext

Domain models should remain immutable.

---

# Infrastructure

Current infrastructure

Supabase

Next.js

SSR

OAuth

Cookies

Infrastructure should remain replaceable.

Business services must never depend directly on infrastructure APIs.

---

# Package Exports

Public

```
@repo/auth

@repo/auth/server

@repo/auth/types
```

Internal

Everything else.

Applications should avoid importing internal files directly.

---

# Extension Guidelines

New capabilities should follow the existing layering.

Example

Ability

```
AbilityRepository

↓

AbilityService

↓

CurrentUser

↓

Server API
```

Policy

```
PolicyService

↓

CurrentUser

↓

Business
```

Maintain consistent dependency direction.

---

# Testing Strategy

Repositories

Integration Tests

Services

Unit Tests

Server APIs

Integration Tests

Policies

Unit Tests

CurrentUser

Aggregation Tests

Infrastructure should remain testable in isolation.

---

# Versioning Strategy

Stable

Public APIs

May Change

Internal implementation

Private folders

Repository implementations

Dependency injection

Applications should rely only on documented contracts.

---

# Design Principles

The Auth package follows these principles.

Single Responsibility

Dependency Inversion

Repository Pattern

Service Layer

Immutable Domain Models

Composition Root

Server-first Security

Framework Isolation

These principles should remain true as the package evolves.