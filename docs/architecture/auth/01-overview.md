# 01. Architecture Overview

---

# Purpose

The Auth module provides a complete identity and authorization system for the application.

Its responsibilities include:

- Authentication
- Identity
- Authorization
- Current User Aggregation
- Session Management

These responsibilities are intentionally separated into independent layers.

---

# High Level Architecture

                    Browser

                        │

                Google OAuth

                        │

                 Supabase Auth

                        │

                 auth.users

                        │

        Database Trigger / Sync

                        │

        identity.user_profiles

                        │

                 Repository

                        │

                  Services

                        │

          CurrentUser Aggregation

                        │

                Server APIs

                        │

            Application Features

---

# Responsibilities

Authentication

Responsible for:

- Login
- Logout
- Session
- OAuth

Authentication is NOT responsible for:

- Display name
- Roles
- Permissions

---

Identity

Responsible for:

- Profile
- Avatar
- Display Name
- User Settings

Identity does NOT manage authentication.

---

Authorization

Responsible for:

- Roles
- Permissions
- Access Control

Authorization never stores profile information.

---

CurrentUser

CurrentUser is an application model.

It is NOT persisted.

It aggregates data from:

- Auth
- Identity
- Authorization

---

# Layer Diagram

Authentication

↓

Identity

↓

Authorization

↓

CurrentUser

↓

Application

Dependencies only flow downward.

No lower layer may depend on an upper layer.

---

# Design Goals

The architecture aims to provide:

- High cohesion
- Low coupling
- Replaceable infrastructure
- Testability
- Clear ownership
- Future extensibility

---

# Architectural Principles

## Infrastructure Independence

Business logic should not know Supabase.

Infrastructure should be replaceable.

Repositories isolate database implementation.

---

## Framework Independence

Business logic should not import Next.js APIs.

Framework-specific code belongs only to:

- server/
- middleware/

---

## Immutable Domain Models

Domain objects should be treated as immutable.

Repositories return domain models.

Services compose domain models.

---

## Explicit Dependencies

Hidden dependencies are forbidden.

All dependencies must be injected explicitly.

---

# Request Lifecycle

Incoming Request

↓

Read Session

↓

Authenticate User

↓

Load Profile

↓

Load Authorization

↓

Build CurrentUser

↓

Application Logic

↓

Response

---

# CurrentUser

CurrentUser represents the authenticated user inside the application.

It should contain:

- identity
- profile
- authorization

It should never expose infrastructure details.

---

# Future Evolution

The architecture is intentionally designed to support future capabilities.

Examples include:

- Ability API
- ABAC
- Resource-based Authorization
- Organization Membership
- Multi Tenant
- Permission Cache
- JWT Claims
- Audit Trail