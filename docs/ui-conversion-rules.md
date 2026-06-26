# UI Conversion Rules

## Purpose

This document defines the workflow for converting UI/UX design deliverables into implementation-ready Next.js pages.

The goal is:

* Convert provided HTML designs into project pages
* Preserve layout and visual appearance
* Enable immediate development preview
* Allow stakeholder review before backend integration
* Separate UI implementation from business logic

Backend functionality is NOT required during this phase.

---

# Input Format

UI designs will typically be provided as:

project-name/
├─ page-name/
│ ├─ design.html
│ └─ screenshot.png

or

project-name/
├─ page-name/
│ ├─ variant-a.html
│ ├─ variant-b.html
│ └─ screenshot.png

The screenshot is the visual source of truth.

The HTML is considered a layout reference.

If HTML and screenshot differ:

Follow screenshot.

---

# Primary Objective

Convert design assets into:

* Next.js pages
* Reusable UI components
* Mock data driven interfaces

without implementing:

* Database access
* Authentication
* APIs
* Business logic
* Permission systems

Focus only on:

* Layout
* Visual hierarchy
* User interaction states
* Responsive behavior

---

# Development Preview Requirement

Every converted page must be immediately viewable.

Never leave:

* Empty tables
* Empty cards
* Empty dashboards
* Empty charts

Create realistic mock data.

Examples:

Good

* 12 members
* 3 events
* 5 ticket orders

Bad

* []
* null
* "Coming Soon"

Client must be able to understand the design through preview data.

---

# Mock Data Rules

Use local mock data only.

Preferred locations:

src/mock/
src/features/*/mock/

Examples:

memberMock.ts
eventMock.ts
ticketMock.ts

Never connect to:

* Supabase
* APIs
* External services

during UI conversion stage.

---

# Page Creation Rules

Each page must be converted into a dedicated route.

Example:

Design:

member-list.html

Implementation:

src/app/members/page.tsx

---

# Route Naming Rules

Do not blindly use HTML filenames.

Many design files contain excessively long names.

Examples:

Bad

student-union-member-management-dashboard-v2-final-final.html

Good

members/page.tsx

---

# Route Naming Principles

Use business meaning.

Preferred examples:

members
member-profile

events
event-detail

tickets
ticket-orders

store
products

checkout

dashboard

settings

organizations

Avoid:

* version numbers
* dates
* final
* draft
* design
* layout

inside route names.

---

# Multiple Page Conversion

When multiple pages are provided:

Create multiple routes.

Example:

Design Input

dashboard.html
members.html
events.html

Output

src/app/dashboard/page.tsx
src/app/members/page.tsx
src/app/events/page.tsx

Do not merge unrelated pages.

---

# Layout Recreation Tasks

Sometimes the task is not creating a new page.

The task may be:

"Recreate layout using new design"

In that case:

* Keep existing route
* Replace page structure
* Preserve route URL
* Preserve existing architecture

Do not create duplicate routes.

---

# Shared Component Extraction

When repeated UI patterns appear:

Extract reusable components.

Examples:

Tables

Data Cards

Statistics Cards

Navigation

Dialogs

Forms

Place inside:

src/components/

or

src/features/*/components/

Avoid duplicate implementations.

---

# Screenshot Priority Rule

Priority:

1. Screenshot
2. HTML
3. Existing implementation

Screenshot represents approved design.

If visual mismatch exists:

Follow screenshot.

---

# Responsive Requirement

All converted pages must support:

Desktop
Tablet
Mobile

Mobile-first implementation preferred.

---

# Styling Rules

Preferred order:

1. Existing design system
2. Existing project components
3. shadcn/ui
4. Custom implementation

Do not introduce additional UI libraries unless required.

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

# Route Discovery

Before implementation, agents must analyze every provided design page and determine:

* Page purpose
* URL
* Parent route
* Child routes
* Navigation relationships

Do not implement pages independently.

Treat all provided designs as a connected application.

---

# Route Mapping

Before writing code, produce an internal route map.

Example:

Dashboard

/dashboard

Members

/members

Member Detail

/members/[id]

Events

/events

Event Detail

/events/[id]

Orders

/orders

Settings

/settings

Navigation components should use this route map.

Never leave placeholder HTML links.

---

# Navigation Conversion

Replace every HTML navigation reference.

Examples:

dashboard.html

↓

/dashboard

member.html?id=1

↓

/members/1

events.html

↓

/events

Never keep:

* html links
* local file paths
* relative HTML references

Use Next.js routing only.

---

# Next.js Routing Rules

Follow App Router conventions.

Prefer:

app/

Route groups when appropriate:

app/(dashboard)/

Nested layouts:

layout.tsx

Dynamic routes:

[id]

Loading UI:

loading.tsx

Error UI:

error.tsx

Not Found:

not-found.tsx

Avoid recreating routing manually.

---

# Route Preservation Rule

When updating an existing page:

Never change its URL unless explicitly instructed.

Allowed:

Replace UI

Replace layout

Replace components

Not allowed:

Move page to another route

Rename URLs

Break existing navigation

---

# Page Relationship Awareness

Agents must understand relationships between pages.

Example:

Member List

↓

Member Detail

↓

Edit Member

↓

Delete Dialog

rather than treating each page as isolated.

Cross-page navigation should function immediately after conversion.

---

# Interactive Mock Navigation

During UI conversion, navigation should remain functional even without backend logic.

Buttons such as:

View

Back

Next

Previous

Open Detail

Edit

Cancel

Dashboard

must navigate between available mock pages whenever possible.

Avoid dead buttons unless explicitly marked as disabled in the design.

---

# Rendering Validation

Before completing UI conversion, verify:

✓ Page renders without CSS errors

✓ No missing fonts

✓ No missing icons

✓ No broken images

✓ Responsive layout matches screenshot

✓ Shared layout extracted

✓ Navigation works

✓ Routes resolve correctly

✓ No HTML links remain

✓ No missing assets

---

## Mockup Conversion Workflow


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
Identify shared layouts.

↓

Step 6
Generate route mapping.

↓

Step 7
Extract reusable components.

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

