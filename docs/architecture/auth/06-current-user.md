# 06. CurrentUser Aggregation

---

# Purpose

CurrentUser is the canonical application user model.

It represents the authenticated user during a single request.

CurrentUser is NOT a database table.

CurrentUser is NOT persisted.

It is an aggregated domain model.

---

# Why CurrentUser Exists

The application frequently requires information from multiple domains.

Example

Authentication

↓

email

Identity

↓

displayName

Authorization

↓

permissions

Instead of repeatedly querying every service independently, CurrentUser aggregates all required information into one immutable object.

---

# Data Sources

CurrentUser is built from three independent domains.

Authentication

↓

AuthUser

Identity

↓

Profile

Authorization

↓

Authorization

↓

CurrentUser

Each source remains independent.

---

# Responsibilities

CurrentUser provides application-ready information.

Examples

Authenticated identity

Display information

Authorization state

Role membership

Permission set

It should never expose:

Database rows

Supabase SDK objects

Infrastructure details

---

# Lifecycle

Incoming Request

↓

Read Session

↓

AuthUser

↓

Load Profile

↓

Load Authorization

↓

Mapper

↓

CurrentUser

↓

Application

A new CurrentUser is created for every request.

CurrentUser should never be cached globally.

---

# CurrentUserService

Purpose

Compose all required information into a single model.

Current implementation

CurrentUserService

↓

ProfileService

↓

AuthorizationService

↓

Mapper

↓

CurrentUser

The service coordinates multiple domains.

It does not own business data.

---

# CurrentUser Mapper

The mapper is responsible for constructing the immutable CurrentUser object.

Responsibilities

Combine

- AuthUser
- Profile
- Authorization

Return

CurrentUser

No business logic should exist inside the mapper.

---

# CurrentUser Structure

Current implementation

CurrentUser

- userId
- email
- displayName
- avatarUrl
- roles
- permissions

Future versions may include

ability

claims

organization

tenant

preferences

featureFlags

The model should evolve without breaking existing APIs.

---

# Why CurrentUser Is Immutable

Application code should treat CurrentUser as read-only.

Reasons

Thread safety

Predictability

Simple caching

Deterministic authorization

Mutation should only occur through dedicated services.

---

# CurrentUserService Responsibilities

Allowed

Aggregate domains

Validate existence

Throw domain errors

Build immutable models

Forbidden

Database queries

OAuth

Cookie management

Permission evaluation

Business workflows

---

# Error Handling

Possible errors

UnauthenticatedError

ProfileNotFoundError

AuthorizationNotFoundError

PermissionDeniedError

Errors should be explicit and domain-specific.

---

# Dependency Rules

Allowed

CurrentUserService

↓

ProfileService

AuthorizationService

↓

Mapper

Forbidden

CurrentUser

↓

Repository

CurrentUser

↓

Supabase

CurrentUser

↓

Next.js APIs

---

# Performance Considerations

The CurrentUser model is intended to minimize repeated lookups.

Instead of

Page

↓

Profile

↓

Authorization

↓

Profile

↓

Authorization

The application performs

Request

↓

CurrentUser

↓

Application

Exactly one aggregation per request.

---

# Design Philosophy

CurrentUser represents the authenticated application user.

It should be the primary object passed into business services.

Business services should not request repositories directly if CurrentUser already contains the required information.

---

# Future Evolution

CurrentUser has been intentionally designed to support future capabilities.

Planned additions

Ability API

Policy Engine

Claims

Organizations

Tenant Context

Feature Flags

Audit Context

Localization Context

CurrentUser should remain the single entry point for user-related application state throughout the lifetime of a request.