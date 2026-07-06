# 02. Directory Structure

---

# Package Layout

packages/

    auth/

        src/

            auth/

            current-user/

            identity/

            authorization/

            server/

            client/

            policy/

            errors/

            types/

            container.ts

---

# Directory Responsibilities

## auth/

Authentication workflows.

Contains:

- login
- logout
- OAuth
- session

Should never contain profile logic.

---

## identity/

Identity domain.

Contains:

- ProfileService
- ProfileMapper

Depends only on repositories.

---

## authorization/

Authorization domain.

Contains:

- AuthorizationRepository
- AuthorizationService

Responsible only for permissions.

---

## current-user/

Application aggregation layer.

Builds CurrentUser.

Responsible for composing:

- AuthUser
- Profile
- Authorization

---

## server/

Server entrypoints.

Allowed dependencies:

- next/headers
- server-only
- cookies

No business logic should exist here.

---

## client/

Browser APIs.

Contains:

- Browser Client
- Client utilities

Never contains authorization logic.

---

## policy/

Authorization policies.

Contains:

- Permission evaluation
- Ability (future)

Must remain infrastructure independent.

---

## errors/

Domain-specific exceptions.

Every error should represent a business failure.

---

## types/

Shared domain models.

Contains only interfaces and type definitions.

No implementation.

---

# Dependency Rules

Allowed

Server

↓

CurrentUser

↓

Identity

↓

Authorization

↓

Repository

↓

Database

Forbidden

Repository

↓

Service

Service

↓

Server

Database

↓

Application

CurrentUser

↓

Repository

---

# Dependency Injection

Repositories are injected into services.

Services are injected into CurrentUser.

CurrentUser is injected into server entrypoints.

Dependencies should never be instantiated inside business logic.

---

# Public API

Only stable APIs should be exported through package entrypoints.

Internal modules should remain private whenever possible.

---

# Naming Convention

Repositories

Suffix:

Repository

Services

Suffix:

Service

Errors

Suffix:

Error

Factories

Prefix:

create

Interfaces

PascalCase

Types

PascalCase

Functions

camelCase

Files

kebab-case

---

# Future Directories

The following directories are reserved for future evolution.

ability/

policies/

audit/

claims/

tenant/

cache/

events/

These directories should remain independent modules following the same architectural principles.