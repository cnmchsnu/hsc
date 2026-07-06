# 07. Authorization

---

# Purpose

Authorization determines what an authenticated user is allowed to do.

Authentication answers:

> Who is the user?

Authorization answers:

> What is the user allowed to do?

Authorization is intentionally isolated from Authentication and Identity.

---

# Responsibilities

Authorization owns:

- Roles
- Permissions
- Role Assignment
- Permission Resolution

Authorization does NOT own:

- Sessions
- OAuth
- User Profiles
- Authentication

---

# Domain Model

The Authorization domain consists of four concepts.

Permission

↓

Role

↓

UserRole

↓

Authorization

Authorization is an aggregated domain model representing the complete access rights of a user.

---

# Database Ownership

Authorization owns the following tables.

identity.roles

identity.permissions

identity.role_permissions

identity.user_roles

The Authorization domain should never read directly from auth.users.

Identity links users to authorization through user_id.

---

# Permission Model

Permissions follow a resource.action convention.

Examples

product.read

product.manage

order.read

order.manage

campaign.manage

inventory.adjust

user.manage

Permission names should remain stable over time.

---

# Naming Convention

Permissions should use:

<resource>.<action>

Examples

product.create

product.update

product.delete

product.read

order.refund

campaign.publish

inventory.adjust

Avoid:

admin

manager

staff

These are roles, not permissions.

---

# Roles

Roles are collections of permissions.

Examples

Admin

Manager

Staff

Student

Guest

Roles should not be checked directly by application code.

Application code should evaluate permissions.

---

# Why Permissions Instead of Roles

Roles evolve.

Permissions remain relatively stable.

Example

Instead of

if role == "Admin"

Use

requirePermission("product.manage")

This minimizes coupling between business logic and organizational structure.

---

# Authorization Model

Current implementation

Authorization

contains

roles

permissions

Permissions are stored as a Set to provide constant-time lookup.

---

# Repository

AuthorizationRepository

Responsibilities

Load all authorization information for one user.

Current implementation

RPC

↓

AuthorizationRepository

↓

Authorization

The repository hides database implementation details.

---

# Why RPC

Permission resolution requires joining multiple tables.

roles

↓

user_roles

↓

role_permissions

↓

permissions

Performing these joins inside application code would increase latency and duplicate business rules.

Instead, the database resolves the authorization graph.

The application receives an already aggregated result.

---

# RPC Contract

Input

user_id

Output

roles

permissions

Example

{
    "roles": [
        "admin"
    ],
    "permissions": [
        "product.manage",
        "product.read",
        "order.manage"
    ]
}

The returned shape should remain stable.

---

# AuthorizationService

Purpose

Provide authorization information as a domain model.

Responsibilities

Validate repository results

Normalize permission collections

Construct immutable Authorization objects

It should not perform permission evaluation.

---

# Authorization Aggregation

CurrentUserService

↓

AuthorizationService

↓

AuthorizationRepository

↓

RPC

↓

Database

CurrentUser never communicates with the database directly.

---

# Error Handling

AuthorizationNotFoundError

PermissionResolutionError

RoleResolutionError

UnexpectedInfrastructureError

Infrastructure errors should never leak into application code unchanged.

---

# Performance Considerations

Authorization is loaded once per request.

Permission lookup is O(1).

Repeated permission queries should never hit the database.

---

# Security Considerations

Permissions must never originate from client input.

Permissions must always originate from the server.

JWT claims should not be trusted without verification.

Application code should never bypass AuthorizationService.

---

# Future Evolution

The current RBAC implementation intentionally supports future evolution.

Planned additions

Permission Cache

JWT Claims

Distributed Authorization

Organization Membership

Tenant Roles

Ability API

ABAC

Resource Ownership

Policy Engine

These features should integrate without changing business APIs.