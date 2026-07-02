# Commerce Product Domain

> Status: Stable (MVP)
>
> Domain: Commerce
>
> Aggregate Root: Product
>
> Last Updated: 2026-07-01

---

# 1. Purpose

The Product domain is the core aggregate of the Commerce module.

Its responsibility is to provide a consistent domain model for all product-related operations while isolating business logic from database implementation details.

This document serves as the authoritative reference for both human developers and AI agents.

It defines:

- Domain boundaries
- Responsibilities
- Layer separation
- Database interaction
- Authorization model
- Extension strategy
- Development conventions

The Product domain intentionally avoids coupling to any specific UI framework or persistence technology.

Current implementation uses Supabase PostgreSQL, but the domain layer must remain independent from database-specific APIs.

---

# 2. Design Principles

The Product domain follows several architectural principles.

## 2.1 Domain-Driven Design (DDD)

The Product is an Aggregate Root.

All business operations involving products should originate from the Product aggregate.

Related entities should not be modified independently if doing so would violate Product consistency.

Example:

```
Product
    ├── Category Relation
    ├── Inventory (Future)
    ├── Images (Future)
    ├── Variants (Future)
    └── Campaigns (Future)
```

The Product aggregate owns its lifecycle.

---

## 2.2 Repository Pattern

The domain must never access Supabase directly.

Instead:

```
Service
    ↓
Repository Interface
    ↓
Supabase Repository
    ↓
Supabase Client
```

Repositories are responsible only for persistence.

Repositories must never contain business rules.

Repositories may:

- Query database
- Insert records
- Update records
- Delete records
- Map database rows

Repositories must not:

- Perform authorization
- Validate business rules
- Build UI models
- Perform pricing calculations
- Contain workflow logic

---

## 2.3 Service Layer

All business logic belongs inside Services.

Examples include:

- Product retrieval
- Visibility rules
- Inventory validation
- Campaign calculation
- Purchase eligibility

Services orchestrate multiple repositories when necessary.

A Service should never expose Supabase-specific types.

---

## 2.4 Dependency Injection

All dependencies are created through containers.

Example:

```
createCommerceContainer()

    ↓

ProductRepository

    ↓

ProductService
```

Services never instantiate repositories directly.

Repositories never instantiate database clients.

This keeps every component independently testable.

---

## 2.5 Database Isolation

Database implementation is considered an infrastructure detail.

Current implementation:

```
Supabase
    ↓
PostgreSQL
```

Future implementations may replace Supabase without affecting:

- Product Entity
- Product Service
- Repository Interface
- UI

Only repository implementations should require modification.

---

## 2.6 Authorization Isolation

Authorization is not handled by the Product domain.

Permission evaluation belongs to the Authorization module.

Example:

```
Page

↓

requirePermission()

↓

ProductService

↓

Repository
```

The Product Service assumes authorization has already been enforced unless explicitly documented.

---

## 2.7 Server-Only Access

Product Services are server-side components.

Client Components must never communicate with repositories directly.

Required flow:

```
Client

↓

Server Component

↓

Product Service

↓

Repository

↓

Database
```

Direct browser access to Product repositories is prohibited.

---

# 3. Domain Model

The current Commerce domain is centered around Product.

```
                    Commerce

                        │
                        │
                  Product (Aggregate Root)
                        │
        ┌───────────────┴────────────────┐
        │                                │
ProductCategory                    Product Images
(Current)                           (Future)
        │
        │
   Category
 (Next Phase)

        │
        ├──────── Inventory (Future)
        │
        ├──────── Campaign (Future)
        │
        ├──────── Review (Future)
        │
        ├──────── Recommendation (Future)
        │
        └──────── Order Item (Future)
```

The Product aggregate intentionally owns only product-specific concerns.

Cross-domain concerns are delegated to their respective modules.

Examples:

Inventory belongs to the Inventory domain.

Campaign belongs to the Campaign domain.

User ownership belongs to Identity.

Orders belong to Commerce Order.

---

# 4. Product Lifecycle

The Product lifecycle controls product availability.

Current MVP states:

```
Draft
    │
    ▼
Active
    │
    ▼
Inactive
```

Future versions may introduce:

```
Archived

Deleted

Scheduled

Hidden

Discontinued
```

---

## Draft

A Draft product is incomplete.

Characteristics:

- Not visible publicly
- Cannot be purchased
- Editable
- May have incomplete information

Typical use:

Product preparation before publication.

---

## Active

An Active product is publicly available.

Characteristics:

- Searchable
- Visible
- Purchasable
- Inventory managed

Only Active products should appear in customer-facing product listings.

---

## Inactive

Inactive products remain stored but are hidden.

Characteristics:

- Not purchasable
- Not publicly listed
- Historical references remain valid

Typical use:

- Temporary removal
- Out-of-season products
- Administrative suspension

---

## Future Lifecycle Extensions

Future releases may support additional transitions.

Example:

```
Draft

↓

Scheduled

↓

Active

↓

Inactive

↓

Archived
```

Inventory, Campaign, and Publication workflows may introduce additional validation rules before state transitions become valid.

Those rules belong inside the Product Service rather than the Repository.

---

# 5. Database Schema

The Product domain is persisted inside the `commerce` schema.

The current MVP consists of three primary tables.

```
commerce.products
        │
        │
        ├────────< commerce.product_categories >──────── commerce.categories
```

This design intentionally uses a many-to-many relationship between Products and Categories.

Although the current MVP may only assign a single category per product, the schema is designed to support multiple categories without future migration.

---

## 5.1 commerce.products

The Product table is the canonical source of product information.

Responsibilities:

- Product identity
- Product metadata
- Pricing
- Publication status
- Inventory counters (MVP)
- Public visibility

The Product table intentionally does **not** contain:

- Images
- Inventory transactions
- Categories
- Campaign pricing
- Reviews

Those belong to separate domains.

---

### Columns

| Column | Description |
|---------|-------------|
| id | Product identifier |
| name | Product name |
| slug | URL slug |
| description | Product description |
| price | Current selling price |
| compare_at_price | Original price before discount |
| currency | Currency code |
| stock_total | Total inventory |
| stock_sold | Sold quantity |
| status | Publication status |
| created_at | Creation timestamp |
| updated_at | Last modification timestamp |

---

### Design Notes

The Product table intentionally stores only the current product state.

Historical changes should eventually move into dedicated audit tables.

Inventory history should eventually move into the Inventory domain.

Campaign pricing should eventually move into the Campaign domain.

---

## 5.2 commerce.categories

Categories provide hierarchical organization for products.

Categories are independent domain objects.

Products reference Categories through a junction table rather than storing category identifiers directly.

This enables:

- Multiple categories per product
- Nested categories
- Breadcrumb generation
- SEO routing
- Flexible navigation

---

### Columns

| Column | Description |
|---------|-------------|
| id | Category identifier |
| name | Display name |
| slug | URL slug |
| description | Optional description |
| parent_id | Parent category |
| created_at | Creation timestamp |
| updated_at | Last modification timestamp |

---

### Hierarchical Structure

Categories form a tree.

Example:

```
Apparel

├── Jacket

├── Hoodie

└── T-Shirt
```

Future versions may support unlimited nesting.

---

## 5.3 commerce.product_categories

This table represents the many-to-many relationship between Products and Categories.

Responsibilities:

- Product categorization
- Navigation
- Search filtering

This table contains no business logic.

---

### Columns

| Column | Description |
|---------|-------------|
| product_id | Product reference |
| category_id | Category reference |
| created_at | Relation creation time |

Composite primary key:

```
(product_id, category_id)
```

---

## Why Many-to-Many?

Although MVP currently behaves like a single-category system, many-to-many relationships provide significant long-term flexibility.

Examples:

```
Product

↓

School Merchandise

↓

Graduation Collection

↓

Limited Edition
```

A single product can simultaneously belong to multiple collections.

No future schema migration will be required.

---

# 6. Domain Entity

The Product entity is the Aggregate Root of the Commerce domain.

It represents business data rather than database rows.

Repositories are responsible for translating persistence models into Product entities.

---

## Product

Example:

```ts
Product {

    id

    name

    slug

    description

    price

    compareAtPrice

    currency

    stockTotal

    stockSold

    status

    createdAt

    updatedAt

}
```

The entity should contain only business-relevant fields.

Database implementation details must not leak into the entity.

---

## Domain Invariants

A Product must always satisfy the following rules.

### Identity

Every Product has exactly one immutable identifier.

```
id
```

must never change.

---

### Name

Product names cannot be empty.

Repositories should never persist empty names.

---

### Slug

Each slug must be unique.

The slug represents the canonical public URL.

Example:

```
classic-school-hoodie
```

Changing a slug may affect SEO and routing.

Slug updates should therefore be treated carefully.

---

### Price

Price must always represent the current selling price.

```
price >= 0
```

Negative values are invalid.

---

### Compare Price

The compare price is optional.

If present:

```
compare_at_price >= price
```

A lower compare price is considered invalid.

---

### Stock

Inventory values must satisfy:

```
stock_total >= stock_sold
```

Negative inventory values are prohibited.

Inventory adjustments belong to the Inventory domain.

Repositories should never perform inventory calculations.

---

### Status

Status controls visibility.

Only valid ProductStatus values are allowed.

Business rules determine which statuses are publicly visible.

---

# 7. Value Objects

The Product domain currently defines several supporting value objects.

---

## ProductStatus

Represents publication state.

Current values:

```
draft

active

inactive
```

Future values may include:

```
archived

scheduled

hidden
```

Status values should never be hardcoded throughout the application.

Always reference the shared ProductStatus type.

---

## ProductSort

Represents business-level sorting semantics.

Current values:

```
newest

oldest

price-asc

price-desc

name-asc

name-desc
```

These values intentionally abstract away database column names.

For example:

```
newest
```

does **not** mean:

```
created_at DESC
```

The Repository determines the database implementation.

This abstraction allows future migration to:

- Elasticsearch
- Meilisearch
- External Search APIs

without changing the Service interface.

---

## ProductListOptions

Represents filtering options for product listings.

Current fields include:

- keyword
- status
- categoryIds
- sort
- page
- pageSize

Future additions may include:

- minPrice
- maxPrice
- tags
- campaigns
- availability
- featuredOnly

The object intentionally represents business intent rather than SQL clauses.

---

# 8. Mapping Strategy

Database rows should never leave the Infrastructure layer.

The mapping flow is always:

```
Database Row

↓

Mapper

↓

Domain Entity

↓

Service

↓

UI
```

Repositories must return Product entities rather than raw database objects.

---

## Mapper Responsibilities

A mapper is responsible for:

- Naming conversion
- Nullable handling
- Type conversion
- Entity construction

A mapper must **not**:

- Validate permissions
- Apply business rules
- Calculate discounts
- Modify inventory
- Access repositories

Its responsibility is purely structural transformation.

---

# 9. Repository Layer

The Repository layer is responsible for persistence.

It acts as the only component allowed to communicate directly with the database.

```
Service

↓

Repository Interface

↓

Repository Implementation

↓

Supabase Client

↓

PostgreSQL
```

The remainder of the application must remain unaware of:

- SQL
- Tables
- Schemas
- Row structures
- Supabase APIs

This separation allows the persistence layer to be replaced without affecting business logic.

---

## Repository Responsibilities

Repositories are responsible for:

- Reading data
- Persisting data
- Executing queries
- Mapping database rows
- Handling pagination
- Applying infrastructure-level filtering
- Throwing persistence errors

Repositories are **not** responsible for:

- Authorization
- Business validation
- Pricing rules
- Inventory calculation
- Campaign evaluation
- UI formatting

---

## Repository Contract

The Product Repository currently exposes the following contract.

```ts
interface ProductRepository {

    findById(
        id: string,
    ): Promise<Product | null>;

    findBySlug(
        slug: string,
    ): Promise<Product | null>;

    list(
        options: ProductListOptions,
    ): Promise<ProductList>;

}
```

Future versions may introduce:

```ts
create()

update()

archive()

restore()

delete()

exists()

findMany()

count()
```

The interface should evolve conservatively.

Breaking changes should be avoided.

---

## Query Construction

Repositories construct queries internally.

Consumers should never provide SQL fragments.

Example:

```
ProductListOptions

↓

Repository

↓

Supabase Query Builder

↓

Database
```

Business objects describe intent.

Repositories determine implementation.

---

## Pagination

Pagination is implemented entirely inside the Repository.

Consumers specify:

```
page

pageSize
```

The Repository converts these values into database-specific range operations.

Services should never calculate SQL offsets.

---

## Sorting

Sorting uses domain-level semantics.

Example:

```
newest

↓

Repository

↓

ORDER BY created_at DESC
```

The Service should never know which database column is used.

---

## Filtering

Filtering is infrastructure logic.

Examples:

- keyword
- status
- categoryIds

Repositories translate these filters into efficient database queries.

Future search implementations may replace SQL with full-text search or external search engines without changing Service APIs.

---

## Mapping

Repositories never expose raw database rows.

Every query follows the same pipeline.

```
Database Row

↓

Mapper

↓

Product

↓

Return
```

This guarantees consistent domain objects throughout the application.

---

# 10. Service Layer

The Service layer contains business logic.

Services coordinate repositories.

They express business intent rather than persistence operations.

```
Controller

↓

Product Service

↓

Repository
```

Services are the primary entry point into the Product domain.

---

## Service Responsibilities

Services may:

- Validate business rules
- Coordinate multiple repositories
- Apply domain workflows
- Perform authorization-aware operations
- Build aggregate responses

Services must not:

- Execute SQL
- Build Supabase queries
- Map database rows
- Access HTTP requests
- Read cookies

---

## Current Service API

Current MVP operations include:

```ts
getById()

getBySlug()

list()
```

These operations provide the canonical interface for product retrieval.

---

## Future Service API

Future additions may include:

```ts
create()

update()

publish()

archive()

duplicate()

changePrice()

adjustInventory()

assignCategories()

attachImages()
```

Business operations should be represented explicitly.

Avoid exposing generic CRUD methods when richer domain language exists.

---

## Error Handling

Services should expose domain-oriented errors.

Examples:

```
ProductNotFoundError

ProductUnavailableError

DuplicateSlugError

InvalidProductStatusError
```

Infrastructure-specific errors should be translated whenever possible.

---

# 11. Dependency Injection

Dependencies are composed using Containers.

Services never construct repositories directly.

Repositories never construct database clients.

```
createCommerceContainer()

↓

Supabase Client

↓

Repositories

↓

Services
```

This keeps object creation centralized.

---

## Current Container Composition

```
createCommerceContainer()

│

├── client

│

├── productRepository

│

└── productService
```

Every dependency is created exactly once.

Consumers receive fully constructed services.

---

## Why Containers?

Containers provide:

- Loose coupling
- Easier testing
- Clear dependency graphs
- Infrastructure replacement
- Better maintainability

Repositories can be replaced by mocks during testing without changing Service code.

---

# 12. Server API

Server APIs expose Product functionality to the application.

UI components should never communicate directly with repositories.

Instead:

```
Server Component

↓

Server API

↓

Product Service

↓

Repository
```

---

## Current Server Functions

Current public server functions include:

```ts
getProduct()

getProductBySlug()

listProducts()
```

These functions are server-only.

They may safely access:

- cookies
- authentication
- authorization
- server-side dependencies

---

## Why Server APIs?

Server APIs provide:

- Stable entry points
- Authorization integration
- Simplified UI code
- Infrastructure isolation

Future changes to repositories should not affect UI components.

---

# 13. Dependency Flow

The complete dependency graph is intentionally one-directional.

```
UI

↓

Server API

↓

Service

↓

Repository Interface

↓

Repository Implementation

↓

Supabase Client

↓

PostgreSQL
```

Dependencies must never point upward.

For example:

Repository → Service

is prohibited.

Likewise:

Entity → Repository

is prohibited.

---

# 14. Layer Responsibilities

| Layer | Responsibility |
|---------|----------------|
| UI | Presentation |
| Server API | Entry point |
| Service | Business logic |
| Repository | Persistence |
| Mapper | Structural conversion |
| Database | Storage |

Each layer should perform exactly one primary responsibility.

Violating this separation leads to tightly coupled code and more difficult maintenance.

---

# 15. Architectural Rules


The following rules apply to every Product-related implementation.

## Rule 1

Repositories never call Services.

---

## Rule 2

Services never construct repositories.

---

## Rule 3

Entities never access databases.

---

## Rule 4

Mappers never perform business logic.

---

## Rule 5

UI never communicates with Supabase directly.

---

## Rule 6

Only Repository implementations may use Supabase APIs.

---

## Rule 7

Infrastructure types must never leak into the Domain layer.

---

## Rule 8

Every new Product feature should first determine the appropriate layer before implementation.

Avoid adding logic to whichever file is currently being modified.

Respect architectural boundaries.

---

# 16. Authorization Model

The Product domain delegates all authentication and authorization concerns to the dedicated Auth module.

The Product Service assumes that the caller has already been authenticated and authorized unless explicitly documented otherwise.

Authorization should never be implemented inside:

- Product Entity
- Product Repository
- Product Mapper

The Service layer may enforce additional business constraints, but permission evaluation belongs exclusively to the Auth domain.

---

## Authentication Flow

Every authenticated request follows the same pipeline.

```
Browser

↓

Supabase Auth

↓

Server Client

↓

auth.users

↓

identity.user_profiles

↓

CurrentUser

↓

Authorization

↓

Product Service
```

The Product domain never reads `auth.users` directly.

Instead, it consumes the `CurrentUser` abstraction provided by the Auth module.

---

## Permission Model

The Product domain currently defines two permissions.

```
product.read

product.manage
```

These permissions are resolved by the Authorization Service through role assignments.

The Product module does not determine how permissions are calculated.

It only specifies which permissions are required.

---

## Read Operations

Public product listings may not require authentication depending on business requirements.

Administrative read operations should require:

```
product.read
```

Examples include:

- Admin product list
- Product details
- Internal inventory overview

---

## Management Operations

Administrative modifications require:

```
product.manage
```

Examples include:

- Create product
- Update product
- Archive product
- Delete product
- Change pricing
- Manage categories

Future inventory operations will introduce dedicated inventory permissions.

---

## Permission Evaluation

Authorization should occur before entering business logic.

Example:

```
Server API

↓

requirePermission()

↓

Product Service

↓

Repository
```

Services should receive authorized requests whenever possible.

---

# 17. Row Level Security (RLS)

Supabase Row Level Security provides infrastructure-level protection.

RLS should enforce data access at the database level.

Application authorization complements—not replaces—database security.

Both layers are required.

```
Application Authorization

+

Database RLS

=

Complete Security
```

---

## Responsibilities

Application authorization is responsible for:

- Business permissions
- Administrative access
- Workflow restrictions

RLS is responsible for:

- Database isolation
- Direct SQL protection
- API protection
- Infrastructure security

Neither layer should assume the other exists.

---

## Policy Design

Policies should remain simple.

Avoid embedding business workflows inside SQL policies.

Prefer:

```
Can user read?

Can user update?
```

Avoid:

```
Is campaign active?

Has inventory been reserved?

Is checkout allowed?
```

Those belong inside Services.

---

## Future Policy Expansion

Future Product policies may differentiate:

- Public visibility
- Internal inventory
- Supplier access
- Administrator access

without requiring Service changes.

---

# 18. Request Lifecycle

Every Product request follows the same lifecycle.

```
Browser

↓

React Component

↓

Server Component

↓

Server API

↓

Authorization

↓

Product Service

↓

Repository

↓

Supabase Client

↓

PostgreSQL

↓

Repository

↓

Mapper

↓

Product Entity

↓

Service

↓

Server Component

↓

Browser
```

Every layer has exactly one responsibility.

No layer should bypass another.

---

## Example: Product Details

```
Product Page

↓

getProduct()

↓

ProductService.getById()

↓

ProductRepository.findById()

↓

Supabase

↓

Database Row

↓

Mapper

↓

Product

↓

React Server Component
```

---

## Example: Product Listing

```
Products Page

↓

listProducts()

↓

ProductService.list()

↓

Repository.list()

↓

Database

↓

Rows

↓

Mapper

↓

ProductList

↓

UI
```

---

# 19. UI Consumption

UI components should consume Product data through Server APIs.

Client Components should never instantiate repositories or Supabase clients.

Preferred architecture:

```
React Server Component

↓

Server API

↓

Product Service

↓

Repository
```

---

## Server Components

Server Components may:

- Retrieve products
- Retrieve product lists
- Check permissions
- Compose multiple services

Server Components should remain lightweight.

Business logic belongs in Services.

---

## Client Components

Client Components receive fully prepared domain objects.

Client Components should never:

- Execute SQL
- Call Supabase directly
- Perform authorization
- Build Product entities

They are responsible only for presentation and interaction.

---

## Data Shape

UI should consume domain models rather than database rows.

Preferred:

```
Product
```

Avoid:

```
commerce.products Row
```

This keeps UI independent of schema changes.

---

# 20. End-to-End Flow

The Product architecture intentionally follows a single execution path.

```
React UI

↓

Server API

↓

Authorization

↓

Product Service

↓

Repository Interface

↓

Supabase Repository

↓

Supabase Client

↓

PostgreSQL

↓

Mapper

↓

Domain Entity

↓

UI
```

Every Product feature should follow this pipeline.

Shortcuts are prohibited.

---

# 21. Error Propagation

Errors should become progressively more domain-oriented as they move upward.

```
PostgreSQL Error

↓

Supabase Error

↓

Repository Error

↓

Domain Error

↓

UI
```

Users should never receive raw database errors.

Examples of domain errors include:

- ProductNotFoundError
- ProductUnavailableError
- DuplicateSlugError
- InvalidProductStatusError
- ProductPermissionDeniedError

Infrastructure errors should remain internal whenever possible.

---

# 22. Observability

Repositories should expose infrastructure failures.

Services should expose business failures.

Logging should occur at the application boundary rather than inside entities.

Future observability integrations may include:

- Audit logs
- Structured logging
- OpenTelemetry tracing
- Metrics collection
- Performance monitoring

The Product domain should remain compatible with these systems without requiring architectural changes.

---

# 23. Repository Implementation Guidelines

The Product Repository is the only infrastructure component responsible for translating domain queries into database operations.

Repository implementations should remain deterministic, predictable, and side-effect free.

---

## Responsibilities

Repositories should only perform:

- Query construction
- Persistence
- Pagination
- Sorting
- Filtering
- Mapping
- Transaction coordination (when required)

Repositories should never perform:

- Permission validation
- Business rule evaluation
- Inventory calculations
- Discount calculations
- HTTP handling
- Cookie access
- Session management

---

## Query Construction

All database queries should be constructed internally.

Consumers express business intent.

Example:

```
ProductListOptions

↓

Repository

↓

Supabase Query

↓

Database
```

Consumers should never provide:

- SQL fragments
- Database column names
- JOIN definitions
- Supabase query builders

The Repository owns all persistence details.

---

## Query Builder Pattern

Each Repository operation should construct its own query pipeline.

Preferred structure:

```
list()

↓

create query

↓

apply filters

↓

apply sorting

↓

apply pagination

↓

execute

↓

map

↓

return
```

Avoid exposing partially constructed query builders.

---

## Type Inference

Repository implementations should rely on TypeScript inference whenever possible.

Avoid manually defining complex `PostgrestFilterBuilder` generic types.

Instead, allow the Supabase client to infer query types naturally.

Preferred:

```
const query =
    client
        .schema(...)
        .from(...)
        .select(...)
```

Avoid creating reusable generic aliases for Supabase query builders.

The SDK may evolve over time, while inference remains stable.

---

## Mapping

Every Repository should map persistence models before returning.

Never expose:

```
Database Row
```

Always expose:

```
Domain Entity
```

Example:

```
Database Row

↓

Product Mapper

↓

Product Entity
```

Mapping should be purely structural.

---

## Error Handling

Infrastructure errors should remain inside the Repository.

Unexpected Supabase errors may be rethrown.

Known infrastructure errors may be translated into domain-specific exceptions where appropriate.

Repositories should never suppress errors silently.

---

# 24. Supabase Implementation Guidelines

Supabase is an infrastructure dependency.

The Product domain should remain portable.

---

## Allowed Usage

Supabase APIs should only appear inside:

- Repository implementations
- Database infrastructure
- Database client creation

No other layer should import Supabase packages.

---

## Generated Types

Database types should always originate from generated schema definitions.

Example:

```
generated/

database.types.ts
```

Never manually maintain database row interfaces.

Whenever the schema changes:

```
Migration

↓

Generate Types

↓

Update Repository

↓

Update Mapper
```

Generated files should never be edited manually.

---

## Schemas

The Product domain currently depends on:

```
commerce
```

Future integrations may additionally reference:

```
inventory

campaign

media
```

Repositories should explicitly specify schemas rather than relying on defaults.

---

## Row Level Security

Repositories assume RLS is enabled.

Application code should never rely solely on application-level authorization.

Security exists in two layers:

```
Authorization

+

RLS
```

Both must remain functional independently.

---

# 25. Development Workflow

Every Product feature should follow a consistent development process.

Skipping layers leads to architectural drift.

---

## New Database Column

When introducing a new Product property:

```
Migration

↓

Generate Types

↓

Repository

↓

Mapper

↓

Domain Entity

↓

Service

↓

Server API

↓

UI
```

Never update UI before the Domain model exists.

---

## New Business Feature

Example:

```
Product Tags
```

Recommended order:

```
Database

↓

Domain Model

↓

Repository

↓

Service

↓

Server API

↓

UI
```

Business capabilities should always originate from the Domain.

---

## Breaking Changes

Avoid modifying public interfaces whenever possible.

Prefer introducing new APIs rather than changing existing contracts.

This minimizes downstream refactoring.

---

# 26. Testing Strategy

Testing should follow architectural boundaries.

---

## Repository Tests

Repository tests verify:

- Query correctness
- Pagination
- Sorting
- Filtering
- Mapping

Repository tests should not verify business rules.

---

## Service Tests

Service tests verify:

- Business workflows
- Validation
- Coordination
- Domain errors

Service tests should mock repositories.

---

## Integration Tests

Integration tests verify:

```
Server API

↓

Service

↓

Repository

↓

Database
```

These tests ensure all layers cooperate correctly.

---

## UI Tests

UI tests should consume Server APIs rather than mocking database rows directly.

This better reflects production behavior.

---

# 27. Performance Guidelines

Repositories should prioritize efficient database access.

---

## Prefer Filtering in SQL

Preferred:

```
Database

↓

Filtered Result
```

Avoid:

```
Database

↓

Entire Table

↓

JavaScript Filter
```

---

## Pagination

Always paginate large collections.

Never return unlimited Product lists.

Every listing endpoint should define a page size.

---

## Mapping Cost

Mapping should remain lightweight.

Complex business calculations belong inside Services.

---

## Future Optimization

Potential future improvements include:

- Materialized views
- Full-text search
- Search indexes
- Read replicas
- Query caching

Repository interfaces should remain stable regardless of implementation.

---

# 28. AI Agent Rules

These rules apply to all AI-assisted development.

---

## General Rules

AI agents must preserve architecture.

Do not simplify by bypassing layers.

Maintain the established dependency graph.

---

## Database Rules

Do not:

- Query Supabase from UI
- Access SQL from Services
- Edit generated types manually

Always regenerate types after schema changes.

---

## Repository Rules

Repositories may only contain persistence logic.

Do not introduce:

- Authorization
- Validation
- Business workflows
- UI formatting

---

## Service Rules

Services own business behavior.

Whenever new business rules are introduced, evaluate whether they belong in the Product Service before placing them elsewhere.

---

## UI Rules

UI should consume Server APIs only.

Never import:

- Supabase Client
- Repository
- Database Types

inside presentation components.

---

## Extension Rules

Before adding a new Product feature, determine whether it belongs to:

- Product
- Category
- Inventory
- Campaign
- Media

Avoid expanding the Product aggregate unnecessarily.

---

# 29. Maintenance Checklist

Before merging Product-related changes, verify the following.

- Database migration created (if required)
- Generated types regenerated
- Repository updated
- Mapper updated
- Domain entity updated
- Service updated
- Server API updated
- Authorization reviewed
- RLS reviewed
- Tests updated
- Documentation updated

Every Product feature should satisfy this checklist.

---

# 30. Common Anti-Patterns

The following patterns are explicitly discouraged.

❌ Business logic inside repositories.

❌ SQL executed from UI components.

❌ Supabase client imported into React components.

❌ Raw database rows returned to the UI.

❌ Services directly constructing repositories.

❌ Hardcoded SQL column names outside repositories.

❌ Editing generated database types.

❌ Authorization implemented inside entities.

❌ Inventory logic placed inside Product repositories.

❌ Cross-domain coupling between Product and unrelated modules.

Avoiding these anti-patterns keeps the Product domain maintainable as the Commerce module grows.

---

# 31. Future Architecture

The current MVP intentionally implements only the minimum Product capabilities required for a functional commerce platform.

The Product aggregate has been designed with future expansion in mind while maintaining backward compatibility.

Future functionality should extend the existing architecture rather than replacing it.

---

# 32. Extension Points

The following domains are intentionally excluded from the MVP implementation.

Each should evolve as an independent subdomain.

---

## 32.1 Category Domain

**Status**

Next Development Phase

Responsibilities:

- Category hierarchy
- Navigation tree
- Breadcrumb generation
- Product categorization
- SEO routing

Future architecture:

```
Category

↓

Category Tree

↓

ProductCategory

↓

Product Repository Filter
```

The Product aggregate should never manage category hierarchy directly.

---

## 32.2 Inventory Domain

**Status**

Planned

Inventory will eventually become its own aggregate.

Current MVP stores inventory counters directly on Product.

Future architecture:

```
Product

↓

Inventory

↓

InventoryTransaction

↓

Reservation

↓

Stock Adjustment
```

Responsibilities include:

- Available stock
- Reserved stock
- Warehouse allocation
- Purchase deduction
- Restocking
- Inventory history

Future services:

```
InventoryService

reserve()

release()

deduct()

restock()

adjust()
```

Product should consume Inventory rather than implementing inventory logic itself.

---

## 32.3 Product Media

**Status**

Planned

Media should become an independent module.

Future schema:

```
Product

↓

ProductImage

↓

Media Asset
```

Potential metadata:

- URL
- Alt text
- Sort order
- Thumbnail
- Original file
- Responsive variants

Media storage should remain independent of Product persistence.

---

## 32.4 Product Variants

**Status**

Future

Current MVP assumes one SKU per Product.

Future versions should support multiple purchasable variants.

Example:

```
Product

↓

Variant

↓

SKU

↓

Inventory
```

Variant attributes may include:

- Size
- Color
- Material
- Edition
- Configuration

Inventory should move from Product to Variant.

---

## 32.5 Pricing Domain

**Status**

Future

Current pricing model:

```
price

compare_at_price
```

Future pricing architecture:

```
Product

↓

Base Price

↓

Campaign Price

↓

Member Discount

↓

Coupon

↓

Final Price
```

Pricing calculations belong in a dedicated Pricing Service.

Repositories should continue storing only persisted values.

---

## 32.6 Campaign Domain

**Status**

Future

Campaigns should not modify Product entities.

Instead:

```
Campaign

↓

Campaign Product

↓

Pricing Service

↓

Computed Price
```

Possible campaign types:

- Flash sale
- Limited-time offer
- Bundle
- Member pricing
- Clearance
- Seasonal promotion

---

## 32.7 Search Domain

**Status**

Future

The Repository interface should remain stable while the search implementation evolves.

Current:

```
PostgreSQL

↓

ILIKE
```

Future:

```
Meilisearch

Elasticsearch

Typesense

OpenSearch
```

Services should not know which search engine is used.

---

## 32.8 Recommendation Domain

**Status**

Future

Recommendations should remain external to Product.

Examples:

```
Related Products

Frequently Bought Together

Recommended For You

Trending

Recently Viewed
```

Recommendation algorithms should never modify Product entities.

---

## 32.9 Review Domain

**Status**

Future

Reviews should become their own aggregate.

```
Product

↓

Review

↓

Rating

↓

Review Statistics
```

Review calculations should be generated rather than stored directly on Product.

---

# 33. Naming Conventions

Consistency is critical for long-term maintainability.

---

## Files

Use kebab-case.

Examples:

```
product-service.ts

product-repository.ts

product-mapper.ts

product.entity.ts
```

Avoid:

```
ProductService.ts

Product_Service.ts
```

---

## Types

Use PascalCase.

Examples:

```
Product

ProductStatus

ProductRepository

ProductListOptions
```

---

## Variables

Use camelCase.

Examples:

```
product

productList

currentProduct

repository
```

---

## Constants

Use UPPER_SNAKE_CASE only for true constants.

Example:

```
DEFAULT_PAGE_SIZE
```

Avoid unnecessary constant extraction.

---

## Database

Use snake_case.

Example:

```
stock_total

compare_at_price

created_at
```

Do not mirror database naming inside the domain layer.

Use camelCase in TypeScript.

---

# 34. Directory Structure

Recommended package structure:

```
product/

├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── repositories/
│   └── services/
│
├── infrastructure/
│   ├── repositories/
│   ├── mappers/
│   └── database/
│
├── server/
│
├── types/
│
└── index.ts
```

This separation clearly distinguishes:

- Domain
- Infrastructure
- Server
- Public API

---

# 35. Versioning Strategy

The Product domain should evolve incrementally.

Avoid breaking interfaces.

Preferred approach:

```
Existing API

+

New API

↓

Deprecation

↓

Removal
```

Avoid replacing public contracts abruptly.

---

# 36. Migration Strategy

Every schema modification should follow the same sequence.

```
Migration

↓

Apply Database Changes

↓

Generate Types

↓

Repository

↓

Mapper

↓

Domain

↓

Service

↓

Server API

↓

UI

↓

Documentation
```

Skipping steps increases technical debt.

---

# 37. Commerce Roadmap

The Commerce module will expand incrementally.

Current roadmap:

```
P1
Commerce Infrastructure
Completed

✓

P2
Product Domain
Completed

✓

P3
Category Domain

P4
Inventory Domain

P5
Campaign Domain

P6
Media Domain

P7
Search

P8
Public Store API

P9
Administrative Product Management

P10
Pricing Engine

P11
Recommendation System

P12
Analytics
```

Each phase should remain independently deployable.

---

# 38. Long-Term Design Goals

The Product architecture aims to remain stable for years rather than months.

Primary objectives:

- Strong domain boundaries
- Minimal coupling
- High testability
- Infrastructure independence
- Predictable dependency flow
- Clear ownership
- AI-assisted maintainability
- Incremental extensibility

Future functionality should be added by extending the architecture rather than restructuring it.

---

# 39. Summary

The Product domain serves as the aggregate root of the Commerce module.

Its purpose is to provide a stable, technology-independent business model while delegating persistence, authorization, infrastructure, and presentation to dedicated layers.

Key architectural principles include:

- Domain-Driven Design
- Repository Pattern
- Service Layer
- Dependency Injection
- Server-only data access
- Infrastructure isolation
- Strict layer separation
- Single responsibility
- Explicit extension points

Every Product feature should follow the established architecture:

```
UI

↓

Server API

↓

Authorization

↓

Service

↓

Repository

↓

Database

↓

Mapper

↓

Domain Entity

↓

UI
```

This architecture intentionally favors long-term maintainability over short-term convenience.

By preserving clear boundaries between Domain, Infrastructure, and Presentation, the Product module can evolve to support Categories, Inventory, Media, Pricing, Campaigns, Search, Recommendations, and future Commerce capabilities without requiring disruptive refactoring.

This document is the canonical architecture reference for the Commerce Product domain and should be updated whenever its public contracts, responsibilities, or extension points change.