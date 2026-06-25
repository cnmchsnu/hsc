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

    
