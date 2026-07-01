# 12. Development Guidelines

---

# Purpose

This document defines the mandatory development rules for extending the Auth package.

These rules apply to both human developers and AI agents.

Every new feature must preserve architectural consistency.

---

# Architectural Principles

Always preserve the following dependency direction.

Application

↓

Server APIs

↓

Services

↓

Repositories

↓

Infrastructure

Dependencies must never flow upward.

---

# Layer Responsibilities

Authentication

Identity

Authorization

CurrentUser

Ability

Policy

Business

Each layer owns one responsibility.

Do not merge responsibilities.

---

# Repository Rules

Repositories

May

Read data

Write data

Translate persistence models

Repositories

Must Not

Evaluate permissions

Read cookies

Read sessions

Perform authorization

Contain business logic

Repositories should remain infrastructure adapters.

---

# Service Rules

Services

May

Validate

Aggregate

Coordinate repositories

Construct domain models

Services

Must Not

Read framework APIs

Manage cookies

Perform rendering

Return database rows

---

# CurrentUser Rules

CurrentUser is immutable.

Never modify CurrentUser after creation.

Always create a new CurrentUser for every request.

Never cache CurrentUser globally.

Never serialize CurrentUser into browser storage.

---

# Authorization Rules

Never compare role names.

Incorrect

```
if (role == "Admin")
```

Correct

```
requirePermission(
    currentUser,
    "product.manage",
);
```

Permissions are the only supported authorization contract.

---

# Policy Rules

Business rules belong inside policies.

Incorrect

```
if (
    currentUser.permissions.has(...)
)
```

Preferred

```
ProductPolicy.canUpdate(
    currentUser,
    product,
)
```

As the project evolves, direct permission checks should gradually disappear.

---

# Dependency Injection

Always inject dependencies.

Correct

CurrentUserService

↓

AuthorizationService

↓

AuthorizationRepository

Avoid constructing dependencies inside business services.

---

# Error Rules

Always throw domain-specific errors.

Never expose raw infrastructure exceptions directly.

Every public API should define its error contract.

---

# Public APIs

Only expose stable APIs.

Everything else remains internal.

Avoid exporting implementation details.

Avoid deep imports.

Correct

```
@repo/auth/server
```

Avoid

```
@repo/auth/src/...
```

---

# Naming Conventions

Repositories

*Repository

Services

*Service

Policies

*Policy

Abilities

*Ability

Errors

*Error

Mappers

toDomain()

toCurrentUser()

toAuthorization()

Maintain naming consistency across the project.

---

# Domain Models

Domain models should be

Immutable

Serializable

Framework-independent

Infrastructure-independent

Avoid exposing SDK objects.

---

# Database Rules

Application code must never depend on database schemas.

Repositories own schema knowledge.

Changing database structure should not require application changes.

---

# Security Rules

Never trust browser state.

Never trust client-side permissions.

Never trust role names supplied by requests.

Always validate authentication on the server.

Always evaluate authorization on the server.

---

# Testing Rules

Repositories

Integration Tests

Services

Unit Tests

Policies

Unit Tests

Server APIs

Integration Tests

Business Services

Unit Tests

Every layer should be testable independently.

---

# Extension Checklist

Before adding a new feature, verify:

✓ Does it belong to the correct layer?

✓ Does it introduce framework coupling?

✓ Can it be tested independently?

✓ Does it require a new domain?

✓ Does it preserve dependency direction?

✓ Does it expose only stable APIs?

✓ Does it avoid leaking infrastructure?

If any answer is "No", reconsider the design.

---

# Common Anti-Patterns

Do not import repositories directly into pages.

Do not access Supabase from business services.

Do not compare role names.

Do not duplicate permission strings.

Do not mutate CurrentUser.

Do not expose SDK objects.

Do not bypass policies.

Do not bypass server authorization.

---

# AI Agent Guidelines

When implementing new features, AI agents should follow this workflow.

1.

Determine the correct architectural layer.

↓

2.

Reuse existing domain models whenever possible.

↓

3.

Create interfaces before implementations.

↓

4.

Inject dependencies through the container.

↓

5.

Expose only documented public APIs.

↓

6.

Write tests at the appropriate layer.

↓

7.

Avoid breaking existing contracts.

Agents should optimize for long-term maintainability over short-term convenience.

---

# Architecture Decision Rule

When multiple implementations are possible, always prefer the one that:

• Preserves layer boundaries.

• Reduces coupling.

• Increases replaceability.

• Keeps public APIs stable.

• Minimizes business knowledge in infrastructure.

These principles take precedence over implementation convenience.

---

# Final Philosophy

The Auth package is the foundation of application identity and security.

Its primary objective is not to simplify authentication, but to provide a stable, extensible, and framework-independent platform for identity, authorization, and future security capabilities.

Every future feature should strengthen this architecture rather than compromise it.