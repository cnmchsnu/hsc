# 08. Policies and Guards

---

# Purpose

Policies and Guards enforce authorization rules inside the application.

Repositories determine what permissions exist.

Policies determine how those permissions are used.

---

# Current Guard APIs

Current implementation exposes the following server guards.

requireUser()

requirePermission()

These guards are intended to protect server-side business logic.

---

# requireUser()

Purpose

Ensure the request is authenticated.

Returns

CurrentUser

Throws

UnauthenticatedError

Example

const user = await requireUser()

---

# requirePermission()

Purpose

Ensure the current user owns a permission.

Input

CurrentUser

Permission

Behavior

Permission exists

↓

Continue

Permission missing

↓

PermissionDeniedError

---

# Example

await requirePermission(
    currentUser,
    "product.manage"
)

The function should never return boolean.

Permission failures should always throw.

---

# Why Throw Instead of Returning Boolean

Returning boolean encourages application code to ignore authorization failures.

Example

if (hasPermission()) {
    ...
}

This frequently results in inconsistent handling.

Instead

requirePermission()

↓

Success

or

↓

Exception

Authorization failures become explicit.

---

# Server-first Authorization

Authorization decisions must occur on the server.

Client-side permission checks exist only for presentation.

Examples

Hide navigation

Hide buttons

Hide menu items

These checks are not security boundaries.

---

# Policy Layer

The current implementation performs direct permission checks.

Future versions introduce Policies.

Example

ProductPolicy

↓

canRead()

canCreate()

canUpdate()

canDelete()

Application code depends on policies rather than raw permission strings.

---

# Ability Layer

Future versions introduce an Ability API.

Example

ability.can(
    "update",
    product
)

The Ability layer translates business operations into permission evaluation.

This isolates permission names from business code.

---

# Attribute-based Authorization

Current implementation

RBAC

Future

RBAC

+

ABAC

Example

User owns Order

↓

Allow update

Manager

↓

Allow update

Administrator

↓

Allow update

Permission evaluation may eventually depend on resource attributes.

---

# Resource Authorization

Future implementations may authorize specific resources.

Example

Product

Order

Campaign

Warehouse

Organization

Authorization becomes

Permission

+

Resource Context

---

# Ownership

Future authorization may evaluate ownership.

Example

Order.user_id == CurrentUser.userId

↓

Allow

This logic belongs inside policies.

Never inside controllers or pages.

---

# Permission Evaluation Flow

Incoming Request

↓

CurrentUser

↓

Policy

↓

Permission

↓

Decision

↓

Application

Business logic should never evaluate permissions directly.

---

# Testing Strategy

Policies should be unit tested independently.

Repositories should be integration tested.

CurrentUser aggregation should be tested separately.

Authorization tests should not require Next.js.

---

# Extension Rules

When adding new permissions

1.

Create permission record

↓

2.

Assign permission to roles

↓

3.

Expose through RPC

↓

4.

No application code changes

Policies should absorb business changes whenever possible.

---

# Anti-patterns

Do not compare role names.

Do not hardcode role IDs.

Do not evaluate permissions in UI components.

Do not bypass CurrentUser.

Do not access AuthorizationRepository directly from pages.

Do not duplicate permission strings across the application.

---

# Long-term Vision

The current implementation represents the foundation of a policy-driven authorization architecture.

Target architecture

Request

↓

CurrentUser

↓

Policy

↓

Ability

↓

Permission

↓

Decision

↓

Application

The transition from RBAC to Policy-based Authorization should require minimal changes to application code.