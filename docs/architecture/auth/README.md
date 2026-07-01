# Authentication Module Architecture

> Version: MVP v1
>
> Status: Stable
>
> Module: `packages/auth`

---

# Overview

The Authentication module is responsible for providing a complete authentication and authorization foundation for the entire application.

This module intentionally separates:

- Authentication
- Identity
- Authorization
- Current User Aggregation
- Session Management

Each responsibility is implemented as an independent layer to minimize coupling and maximize future extensibility.

The module is designed for long-term maintenance and is intended to support future features including:

- Multi-role authorization
- Attribute-based authorization (ABAC)
- Multi-tenant organizations
- Audit logging
- Impersonation
- Permission caching
- JWT Claims optimization

---

# Documentation Index

| Document | Description |
|-----------|-------------|
| 01-overview.md | High-level architecture and design philosophy |
| 02-directory-structure.md | Complete package structure and dependency rules |
| 03-authentication.md | Authentication flow |
| 04-session-lifecycle.md | Session lifecycle |
| 05-identity.md | Identity domain |
| 06-current-user.md | CurrentUser aggregation |
| 07-authorization.md | RBAC implementation |
| 08-policy-and-guards.md | Authorization policies |
| 09-public-api.md | Public APIs |
| 10-package-reference.md | Package references |
| 11-future-roadmap.md | Future evolution |
| 12-development-guide.md | Development guide |

---

# Document path

docs/
└── architecture/
    └── auth/
        ├── README.md => you're here
        ├── 01-overview.md
        ├── 02-directory-structure.md
        ├── 03-authentication.md 
        ├── 04-session-lifecycle.md
        ├── 05-identity.md
        ├── 06-current-user.md
        ├── 07-authorization.md
        ├── 08-policy-and-guards.md
        ├── 09-public-api.md
        ├── 10-package-reference.md
        ├── 11-futre-roadmap.md
        └── 12-development-guidelines.md

# Core Principles

The Auth module follows several architectural principles.

## Separation of Concerns

Authentication never knows user profile.

Identity never knows permissions.

Authorization never knows OAuth providers.

Every layer owns exactly one responsibility.

---

## Domain Driven

Business concepts are modeled as domains.

CurrentUser is not a database table.

It is a composed domain model.

---

## Repository Pattern

Database access must only exist inside repositories.

Application code must never directly query Supabase.

---

## Service Pattern

Business logic belongs to services.

Repositories should never contain business rules.

---

## Dependency Injection

Services depend on interfaces.

Never instantiate repositories inside business logic.

---

## Framework Isolation

The majority of the Auth module should not depend on Next.js.

Only server entrypoints should import framework-specific APIs.

---

## Server First

Authentication is validated on the server.

Client-side authorization is only used for UI rendering.

Never trust browser state for authorization decisions.

---

# Package Responsibilities

Authentication

- OAuth
- Session
- Cookie
- Login
- Logout

Identity

- User Profile
- Display Name
- Avatar
- Preferences

Authorization

- Roles
- Permissions
- Guards

Aggregation

- CurrentUser

---

# Module Status

| Component | Status |
|----------|--------|
| OAuth | Complete |
| Session | Complete |
| Identity | Complete |
| CurrentUser | Complete |
| RBAC | Complete |
| Permission Guard | Complete |
| Ability API | Planned |
| ABAC | Planned |
| Audit | Planned |
| Multi Tenant | Planned |

---

# Intended Audience

This documentation is intended for:

- Application developers
- Infrastructure engineers
- AI Agents
- Future maintainers

No implementation should violate the dependency rules described in this documentation.