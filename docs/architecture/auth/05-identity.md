# 05. Identity Domain

---

# Purpose

The Identity domain is responsible for maintaining application-specific user information.

Authentication only proves that a user exists.

Identity describes who that user is inside the application.

Identity answers questions such as:

- What is the user's display name?
- What avatar should be shown?
- What language does the user prefer?
- What school information belongs to this user?
- What application-specific profile data exists?

Identity intentionally does NOT manage:

- Authentication
- Sessions
- OAuth
- Roles
- Permissions

---

# Domain Ownership

Authentication

Owns

- auth.users

Identity

Owns

- identity.user_profiles

Authorization

Owns

- identity.roles
- identity.permissions
- identity.user_roles

Each domain owns its own data.

Cross-domain modification is forbidden.

---

# Identity Model

Current implementation:

Profile

Contains:

- userId
- displayName
- avatarUrl

Future fields may include:

- locale
- timezone
- graduationYear
- studentNumber
- department
- preferences

The domain model should evolve independently from Authentication.

---

# Database

Canonical table

identity.user_profiles

Relationship

auth.users (1)

↓

identity.user_profiles (1)

The profile table extends the authentication record.

Authentication creates identities.

Identity stores application information.

---

# Synchronization

Profile creation is automatically synchronized from auth.users.

The synchronization mechanism is implemented inside the database using triggers.

Application code should never create profile records during login.

Flow

OAuth

↓

auth.users

↓

Database Trigger

↓

identity.user_profiles

This guarantees consistency regardless of authentication provider.

---

# Repository Pattern

Identity data is accessed exclusively through repositories.

Current implementation:

ProfileRepository

Responsibilities

- findByUserId()
- create()
- update()

Repositories must not contain:

- permission logic
- authentication logic
- business rules

Repositories only translate between:

Database

↓

Domain Model

---

# Repository Interface

The application depends only on the interface.

Implementations remain replaceable.

Current implementation:

SupabaseProfileRepository

Possible future implementations:

PostgreSQLRepository

RESTRepository

CachedRepository

MockRepository

MemoryRepository

Business logic should never know which implementation is used.

---

# Service Layer

ProfileService provides business-oriented operations.

Responsibilities include:

- profile lookup
- validation
- profile creation rules
- profile update rules

Services compose business behavior.

Repositories only persist data.

---

# Mapper

The repository returns domain models instead of raw database records.

Example

Database Row

↓

Profile Mapper

↓

Profile

This ensures infrastructure details never leak into the application layer.

---

# Error Handling

Expected domain errors include:

ProfileNotFoundError

DuplicateProfileError

InvalidProfileError

Infrastructure errors should not be represented as domain models.

---

# Dependency Rules

Allowed

ProfileService

↓

ProfileRepository

↓

Database

Forbidden

ProfileRepository

↓

CurrentUser

ProfileRepository

↓

Authorization

ProfileRepository

↓

Authentication

---

# Future Evolution

Identity is intentionally isolated to support future extensions.

Planned additions:

Profile Preferences

Student Verification

Profile Images

Localization

Notification Preferences

Privacy Settings

Metadata

Identity Federation

No architectural changes should be required when introducing these capabilities.