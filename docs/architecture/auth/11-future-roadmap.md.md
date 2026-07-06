# 11. Future Roadmap

---

# Purpose

This document describes the long-term evolution of the Authentication and Authorization platform.

The current implementation intentionally solves today's requirements while providing a stable foundation for future capabilities.

Future features should extend the architecture rather than replace it.

---

# Evolution Principles

The architecture follows several long-term principles.

• Authentication should remain provider-agnostic.

• Authorization should remain implementation-agnostic.

• Infrastructure should remain replaceable.

• Business services should not depend on framework APIs.

• Public APIs should remain stable.

---

# Planned Evolution

Phase 1

Authentication

Identity

CurrentUser

RBAC

(Server-first)

Status

Completed

---

Phase 2

Policy Layer

Ability API

Permission Groups

Route Protection

Status

Planned

---

Phase 3

ABAC

Resource Ownership

Conditional Permissions

Policy Composition

Status

Planned

---

Phase 4

Organizations

Teams

Departments

Tenant Context

Status

Future

---

Phase 5

Distributed Authorization

Permission Cache

JWT Claims

External Identity Provider

Status

Future

---

# Ability Layer

Current

Business code directly checks permissions.

Example

requirePermission(
    currentUser,
    "product.manage"
);

Future

Business code interacts with abilities.

Example

ability.can(
    "update",
    product,
);

The Ability layer converts business operations into permission evaluation.

Business code should never need to know permission names.

---

# Policy Layer

Policies encapsulate authorization rules.

Example

ProductPolicy

CampaignPolicy

InventoryPolicy

OrderPolicy

Each policy exposes business-oriented methods.

Example

canRead()

canCreate()

canUpdate()

canDelete()

canPublish()

canRefund()

Application code should depend on policies instead of permission strings.

---

# Attribute-Based Access Control

Current authorization uses RBAC.

Future authorization may combine:

RBAC

+

ABAC

Example

Permission

↓

Ownership

↓

Department

↓

Organization

↓

Decision

The permission itself is only one part of the final authorization decision.

---

# Resource Ownership

Many business rules depend on ownership.

Example

CurrentUser

↓

Order.ownerId

↓

Allow

Ownership evaluation belongs inside Policies.

It should never appear inside pages, route handlers, or repositories.

---

# Organizations

Future applications may support organizations.

Example

Organization

↓

Department

↓

Team

↓

User

CurrentUser may eventually contain organization context.

Example

organizationId

departmentId

teamId

Role evaluation should automatically become organization-aware.

---

# Multi-Tenant Support

The architecture intentionally avoids hardcoding a single tenant.

Future CurrentUser

CurrentUser

↓

Tenant Context

↓

Authorization

↓

Application

Repositories should eventually become tenant-aware without changing application APIs.

---

# Feature Flags

Feature flags should eventually become part of CurrentUser.

Example

CurrentUser

↓

FeatureContext

↓

Business

↓

UI

The authorization layer should remain independent from feature management.

---

# Claims

CurrentUser may eventually expose application claims.

Example

verifiedStudent

verifiedTeacher

graduated

staff

Claims should be immutable during a request.

---

# Audit Context

Future requests may include audit metadata.

Example

CurrentUser

↓

AuditContext

↓

AuditService

↓

Audit Log

Business services should not manually construct audit entries.

---

# Permission Cache

Permission resolution currently queries the database once per request.

Future

Distributed Cache

↓

Authorization

↓

CurrentUser

↓

Application

Caching should remain transparent to business code.

---

# JWT Claims

Permissions may eventually be embedded into JWTs.

Current

Database

↓

RPC

↓

Authorization

Future

JWT

↓

Validation

↓

Authorization

Applications should never depend on where authorization information originates.

---

# External Identity Providers

Future providers

Azure AD

GitHub

SAML

OIDC

LDAP

The Authentication layer should isolate provider-specific implementation.

No business code should change when adding providers.

---

# Security Evolution

Planned features

Multi-Factor Authentication

Passkeys

Trusted Devices

Device Management

Session Revocation

Suspicious Login Detection

Risk-based Authentication

These features belong exclusively to Authentication.

---

# Migration Strategy

Every future capability should satisfy one requirement.

Business APIs remain unchanged.

Only infrastructure and service implementations evolve.

This minimizes migration cost across application modules.

---

# Long-Term Vision

Target Architecture

Request

↓

Authentication

↓

Identity

↓

Authorization

↓

Ability

↓

Policy

↓

Business Services

↓

Repositories

↓

Database

Business logic should remain isolated from infrastructure throughout the lifetime of the project.