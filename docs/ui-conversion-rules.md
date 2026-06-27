````md
# UI Conversion Rules

## Purpose

This document defines the workflow for converting UI/UX design deliverables into implementation-ready Next.js pages.

The goals are:

- Convert provided HTML designs into production-ready Next.js pages
- Preserve the approved visual design
- Enable immediate development preview
- Allow stakeholder review before backend integration
- Produce reusable, maintainable UI
- Separate UI implementation from business logic

---

# Scope

UI conversion is responsible for:

- Layout
- Visual hierarchy
- Responsive behavior
- Interaction states
- Component composition
- Mock data
- Navigation
- Route creation

UI conversion must NOT implement:

- Database access
- Authentication
- Authorization
- APIs
- Business logic
- Permission systems
- External services

Use mock data only.

Backend integration is a separate phase unless explicitly requested.

---

# Input Format

UI designs are typically provided as:

```text
project-name/
├─ page-name/
│  ├─ design.html
│  └─ screenshot.png
````

or

```text
project-name/
├─ page-name/
│  ├─ variant-a.html
│  ├─ variant-b.html
│  └─ screenshot.png
```

The screenshot is the visual source of truth.

The HTML is a layout reference.

If the HTML differs from the screenshot:

Always follow the screenshot.

---

# Screenshot Priority Rule

Priority:

1. Screenshot
2. HTML
3. Existing implementation

Do not modify the approved design to simplify implementation.

Visual fidelity takes precedence over implementation preference.

---

# CSS Asset Analysis

Before implementation, inspect all design assets.

This includes:

* Inline styles
* External CSS
* Embedded `<style>` blocks
* CSS Variables
* Fonts
* Icons
* Images
* SVG assets
* Animations

Determine:

* Required styles
* Shared styles
* Page-specific styles
* Global styles

Never ignore external assets.

---

# CSS Rendering Recovery

Many exported HTML files contain generated CSS.

Do not copy generated CSS directly.

Preferred styling order:

1. Existing design system
2. Existing project styles
3. Tailwind utilities
4. Small CSS modules
5. Global CSS

Reconstruct:

* Layout
* Typography
* Grid
* Flex
* Borders
* Shadows
* Colors
* Spacing

The rendered result must match the screenshot rather than the original implementation.

---

# Global Asset Migration

Move shared assets into the project structure.

Examples:

Fonts

→ app/fonts.ts

→ next/font

Global variables

→ globals.css

Shared animations

→ styles/

Icons

→ lucide-react

Images

→ public/

Never leave broken asset references.

---

# Mockup Conversion Workflow

Step 1

Inspect all provided design files.

↓

Step 2

Analyze screenshots.

↓

Step 3

Analyze HTML structure.

↓

Step 4

Analyze CSS assets.

↓

Step 5

Generate route mapping.

↓

Step 6

Identify shared layouts.

↓

Step 7

Identify reusable components.

↓

Step 8

Convert pages.

↓

Step 9

Connect navigation.

↓

Step 10

Validate rendering.

↓

Step 11

Validate responsive behavior.

↓

Step 12

Complete delivery checklist.

---

# Page Creation Rules

Each page must become a dedicated App Router route.

Example:

Design

```
member-list.html
```

Implementation

```
app/members/page.tsx
```

---

# Route Naming Rules

Do not use exported HTML filenames.

Use business meaning.

Preferred:

```
dashboard

members

member-profile

events

event-detail

orders

checkout

settings

organizations
```

Avoid:

* version numbers
* dates
* draft
* final
* layout
* design

---

# Multiple Page Conversion

When multiple pages are provided:

Create multiple routes.

Example:

```
dashboard.html

members.html

events.html
```

↓

```
app/dashboard/page.tsx

app/members/page.tsx

app/events/page.tsx
```

Do not merge unrelated pages.

---

# Layout Recreation Rules

When recreating an existing page:

Keep:

* Route URL
* Route hierarchy
* Existing architecture

Replace:

* Layout
* Components
* Visual implementation

Do not create duplicate routes.

---

# Route Discovery

Before implementation determine:

* Page purpose
* URL
* Parent routes
* Child routes
* Navigation relationships

Treat all designs as a connected application.

---

# Route Mapping

Create an internal route map before implementation.

Example:

```
Dashboard

/dashboard

Members

/members

Member Detail

/members/[id]

Events

/events

Orders

/orders

Settings

/settings
```

Navigation must follow this structure.

---

# File Structure

Recommended output:

src/
├─ app/
├─ components/
├─ features/
├─ mock/

Examples:

src/app/members/page.tsx

src/features/members/components/member-table.tsx

src/mock/memberMock.ts

---

# Delivery Checklist

Before marking conversion complete:

✓ Route created

✓ Layout matches screenshot

✓ Responsive behavior works

✓ Mock data added

✓ No backend dependency

✓ No API dependency

✓ No database dependency

✓ Components extracted where appropriate

✓ Route names follow naming rules

✓ Development preview is functional

---

# Future Integration Rule

UI conversion is Phase 1.

Backend integration is Phase 2.

Do not implement:

* Supabase queries
* API calls
* Authentication checks
* Permission checks

unless explicitly requested.

UI should be integration-ready but backend-independent.

---

# CSS Asset Analysis

Before implementing any page, agents MUST inspect all styling assets associated with the design.

This includes:

* Inline styles
* External CSS files
* Embedded `<style>` blocks
* CSS Variables
* Fonts
* Icon libraries
* Images
* SVG assets
* Animations

Agents must identify:

* Which styles are required
* Which styles are reusable
* Which styles belong to a specific page
* Which styles belong to global layout

Do not ignore external CSS.

---

# CSS Rendering Recovery

Many exported HTML files rely on generated CSS that cannot be copied directly.

Agents must reconstruct the visual result rather than copying raw CSS.

Preferred order:

1. Existing design system
2. Existing project styles
3. Tailwind utilities
4. Small custom CSS modules
5. Global CSS (only when necessary)

Avoid copying thousands of lines of generated CSS.

Instead:

* Recreate spacing
* Typography
* Grid
* Flex layout
* Borders
* Shadows
* Colors

using project styling conventions.

The rendered result should visually match the screenshot, not necessarily the original CSS implementation.

---

# Global Asset Migration

When HTML references shared assets, agents must migrate them appropriately.

Examples:

Fonts
→ app/fonts.ts
→ next/font

Global variables
→ globals.css

Shared animations
→ styles/

Icons
→ lucide-react (preferred)

Images
→ public/

Never leave broken asset references.

---

# Layout Extraction Rules

Before creating pages, determine whether multiple pages share:

* Header
* Sidebar
* Navigation
* Footer
* Toolbar
* Breadcrumb
* Search bar

Shared structures must be extracted into reusable layouts.

Preferred locations:

app/(group)/layout.tsx

or

src/components/layout/

Avoid duplicating identical navigation across pages.

---

# Shared UI Component Rule

Reusable UI components belong in:

```
packages/ui
```

This package is the single source of truth.

Applications must consume shared components.

Never recreate common UI inside applications.

Examples:

* Button
* Card
* Dialog
* Input
* Badge
* Avatar
* Table
* Tabs
* Sheet
* Drawer
* Select
* Checkbox
* Tooltip
* Toast
* Pagination
* Spinner

---

# Shared Component Acquisition Priority

Always follow:

```
Existing packages/ui

↓

Official shadcn/ui

↓

Custom shared component
```

Never skip a higher priority option.

---

# Component Discovery Rule

Before creating a component:

Search:

1. packages/ui
2. Existing feature components
3. shadcn/ui
4. Create new shared component

Never create duplicates.

---

# shadcn/ui Installation Rule

If the component exists in shadcn/ui:

Install it.

Preferred command:

```bash
pnpm dlx shadcn@latest add <component>
```

Examples:

```bash
pnpm dlx shadcn@latest add dialog

pnpm dlx shadcn@latest add sheet

pnpm dlx shadcn@latest add command

pnpm dlx shadcn@latest add table

pnpm dlx shadcn@latest add calendar
```

---

# Installation Target Rule

Install reusable components into:

```
packages/ui
```

Do not install identical components separately inside applications.

---

# Generated Code Review Rule

Code generated by:

```bash
pnpm dlx shadcn@latest add
```

must not be considered production-ready.

Review:

* Imports
* Exports
* Dependencies
* Styling
* Accessibility
* Design tokens
* Package structure

Integrate generated code into the shared UI package.

---

# Component Modification Rule

When modifying a shared component:

1. Update packages/ui.
2. Preserve compatibility.
3. Reuse the updated component.

Never duplicate components inside applications.

---

# Component Promotion Rule

If a component will be reused across applications:

Move it into:

```
packages/ui
```

Feature-specific components should remain inside feature modules.

---

# Import Rule

Always import shared components through package exports.

Preferred:

```tsx
import { Button } from "@repo/ui/button";
import { Dialog } from "@repo/ui/dialog";
import { Card } from "@repo/ui/card";
```

Never import shared components through relative paths.

---

# Styling Ownership

Visual styling belongs to:

```
packages/ui
```

Applications should only define:

* Layout
* Positioning
* Composition
* Responsive behavior

Applications must not redefine shared component appearance.

---

# Variant Extension Rule

When new styles are required:

Extend existing components.

Example:

```tsx
<Button variant="hero" />
```

Avoid inline styling.

---

# shadcn Extension Rule

Prefer extending official components.

Allowed:

* New variants
* Additional props
* Additional slots
* Project styling
* Accessibility improvements

Avoid rewriting components completely.

---

# Component Boundary

packages/ui contains presentation logic only.

Never include:

* APIs
* Authentication
* Database access
* Business logic
* Feature workflows

---

# Styling Rules

Preferred styling order:

1. Existing design system
2. Existing shared components
3. Existing project styles
4. Tailwind utilities
5. Small custom styles

Do not introduce unnecessary UI libraries.

---

# Design Token Rule

Always use project design tokens.

Prefer:

* CSS Variables
* Tailwind theme tokens
* Shared constants

Avoid hardcoded values.

---

# Existing Code Reuse Rule

Before implementing new UI:

Inspect existing:

* Layouts
* Components
* Hooks
* Utilities
* Providers

Reuse existing implementations whenever possible.

---

# Development Preview Requirement

Every converted page must be immediately usable.

Never leave:

* Empty tables
* Empty cards
* Empty dashboards
* Empty charts

Use realistic mock data.

---

# Mock Data Rules

Use local mock data only.

Preferred locations:

```
src/mock/

src/features/*/mock/
```

Never connect:

* APIs
* Supabase
* External services

---

# Responsive Requirement

Support:

* Desktop
* Tablet
* Mobile

Mobile-first implementation is preferred.

---

# Final Validation Checklist

## Routing

* Route created
* Route mapping completed
* Navigation functional

## Layout

* Screenshot matches
* Responsive layout verified
* Shared layout extracted

## Components

* Shared components reused
* packages/ui updated when necessary
* Imports use @repo/ui/*
* No duplicate components

## Styling

* No CSS errors
* No missing fonts
* No missing icons
* No missing assets
* Design tokens respected

## Preview

* Mock data added
* No API dependency
* No authentication
* No database dependency
* Development preview functional

## Architecture

* No relative imports into packages/ui
* No duplicate implementations
* Shared UI remains the single source of truth

```
```
