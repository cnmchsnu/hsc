# Repository Mapping Refactor Guide

## Goal

Refactor every repository to completely separate:

* Domain Entity
* Persistence Model
* Command Input
* Repository Mapping

The repository should only be responsible for communicating with the database.

It must no longer manually convert object properties into database fields.

---

# Current Problem

Current repositories perform both responsibilities:

```
Repository
    ├── Database Access
    └── Entity -> Database Mapping
```

Example:

```ts
profiles.map(profile => ({
    user_id: profile.id,
    display_name: profile.displayName,
    ...
}))
```

This causes:

* duplicated mapping logic
* inconsistent field conversion
* difficult maintenance
* repeated code across repositories
* difficult batch support
* RPC input tightly coupled with repository implementation

---

# Target Architecture

```
Application
        │
        ▼
Domain Entity
        │
        ▼
Repository Mapper
        │
        ├── Persistence Row
        ├── Create Command
        ├── Update Command
        │
        ▼
Repository
        │
        ▼
Supabase
```

Repositories should never manually construct SQL payloads.

---

# Step 1

Keep Domain Entity unchanged.

Example:

```
packages/auth/domain/profile/profile.ts
```

```
Profile
```

The entity represents business state only.

It must not contain:

* snake_case fields
* database column names
* RPC-specific fields

---

# Step 2

Create separate Create / Update command models.

Suggested location:

```
packages/auth/application/profile/commands/
```

(or project-specific location)

Example:

```
CreateProfile

UpdateProfile
```

Rules:

Create Command

* only fields required when creating
* no version
* no created_at
* no updated_at

Update Command

* identifier
* mutable fields only
* optional properties where appropriate
* no version
* no timestamps

---

# Step 3

Keep Persistence Row separate.

Suggested location:

```
packages/database/entities/
```

Example:

```
UserProfileRow
```

Persistence Row represents exactly one database row.

Rules:

* snake_case
* includes created_at
* includes updated_at
* includes version
* includes every persisted column

Persistence Rows should never be exposed outside Infrastructure.

---

# Step 4

Create RepositoryMapper interface.

Suggested location:

```
<fill_path>/shared/mapping/
```

```
RepositoryMapper<
    Entity,
    Row,
    CreateCommand,
    UpdateCommand
>
```

Required responsibilities:

* fromRow()

* fromRows()

* toCreateRow()

* toCreateRows()

* toUpdateRow()

* toUpdateRows()

The mapper performs every conversion between domain and persistence.

---

# Step 5

Each aggregate owns one mapper.

Suggested location:

```
<fill_path>/profile/mapper/
```

Example:

```
ProfileRepositoryMapper
```

Responsibilities:

Profile

↓

UserProfileRow

↓

CreateProfile

↓

UpdateProfile

The mapper must contain every property conversion.

Repositories must never map fields manually.

---

# Step 6

Repository refactor

Before

```
Repository

↓

profiles.map(...)

↓

RPC
```

After

```
Repository

↓

ProfileRepositoryMapper.toUpdateRows()

↓

RPC
```

Repository responsibilities become:

* call Supabase
* call RPC
* error handling
* transaction handling
* mapper invocation

Repository must NOT know:

* snake_case field names
* database column names
* property conversion

---

# Step 7

Read Flow

```
Supabase

↓

UserProfileRow

↓

ProfileRepositoryMapper.fromRow()

↓

Profile
```

Repository should immediately convert every returned row.

No UserProfileRow should escape Infrastructure.

---

# Step 8

Create Flow

```
CreateProfile

↓

ProfileRepositoryMapper.toCreateRow()

↓

UserProfileRow (partial)

↓

Insert

↓

Returned Row

↓

fromRow()

↓

Profile
```

---

# Step 9

Update Flow

```
UpdateProfile

↓

ProfileRepositoryMapper.toUpdateRow()

↓

RPC Input

↓

update_profiles()

↓

Returned Row

↓

fromRow()

↓

Profile
```

---

# Step 10

Batch Flow

Every batch operation must reuse the mapper.

Example

```
entities

↓

mapper.toUpdateRows()

↓

RPC
```

instead of

```
entities.map(...)
```

---

# Step 11

Timestamp Strategy

Do NOT populate:

* created_at
* updated_at

inside TypeScript.

Database triggers are responsible for timestamps.

---

# Step 12

Version Strategy

Do NOT increment version inside TypeScript.

Database is the single source of truth.

Version should be updated by trigger or RPC implementation.

Repositories should only read version.

---

# Step 13

RPC Payload

If RPC input differs from table schema, create dedicated RPC input models.

Example:

```
UpdateProfileInput
CreateProfileInput
```

instead of reusing Row.

RPC contracts are transport models.

Persistence Rows are storage models.

Do not mix them.

---

# Step 14

Final Responsibilities

Domain

* business state

Application

* create/update commands
* orchestration

RepositoryMapper

* every object conversion

Repository

* database communication only

Persistence Row

* table representation

RPC Input

* procedure contract

Database

* timestamps
* version increment
* optimistic locking
* constraints
* triggers

---

# Expected End State

Every repository should follow this structure:

```
Application Command

↓

RepositoryMapper

↓

Persistence Model / RPC Input

↓

Repository

↓

Supabase

↓

Persistence Row

↓

RepositoryMapper

↓

Domain Entity
```

No repository should manually create database payloads using object literals.

All mapping logic must exist in exactly one RepositoryMapper.
