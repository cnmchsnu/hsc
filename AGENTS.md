# AGENTS.md

# Project Constitution

This document is the primary entry point for all AI agents and contributors.

Before making any changes, read this file and follow the workflows described below.

---

# Project Overview

This project is a Student Union Digitalization Platform.

The objective is to centralize and digitize:

* Organization management
* Member management
* Event management
* Ticketing
* Merchandise sales
* Administrative workflows
* Internal communication tools

The project is currently in MVP stage.

Priority:

1. Security
2. Data Integrity
3. Reliability
4. Maintainability
5. Performance

---

# Current Development Phase

Current phase is defined in:

* docs/roadmap.md

Agents must review roadmap.md before implementing major features.

Do not implement functionality outside the current roadmap phase unless explicitly instructed.

---

# Documentation Index

The following documents define project behavior.

## Technical Architecture

docs/architecture.md

Defines:

* System architecture
* Infrastructure decisions
* Deployment topology
* Service boundaries
* Technology stack

## Roadmap

docs/roadmap.md

Defines:

* Current project phase
* Feature priorities
* MVP boundaries
* Future milestones

---

UI/UX Conversion
→ docs/ui-conversion-rules.md

Page Inventory
→ docs/page-overview.md

All UI conversion tasks must:

1. Read ui-conversion-rules.md
2. Read page-overview.md
3. Read DESIGN.md
4. Determine route mapping
5. Convert design
6. Update page-overview.md

Before implementing UI:

- Verify route mapping
- Verify existing design system
- Reuse existing patterns
- Follow DESIGN.md

---

## Design System

DESIGN.md

Defines:

- UI design language
- Layout patterns
- Component usage
- Typography
- Color system
- Spacing system
- UX guidelines

---

## Requirements (Future)

requirements/

Defines business requirements.

Examples:

requirements/member-system.md
requirements/event-system.md
requirements/ticket-system.md

When available, requirements documents become the source of truth for business behavior.

---

## Database Documentation (Future)

docs/database.md

Defines:

* ERD
* Schema design
* Naming conventions
* RLS policies
* Relationships

## Architecture Decision Records (Future)

docs/decisions/

Defines major technical decisions.

Examples:

docs/decisions/adr-001-auth.md
docs/decisions/adr-002-permissions.md

---

# Documentation Priority

When documentation conflicts:

1. requirements/*
2. docs/database.md
3. docs/decisions/*
4. DESIGN.md
5. docs/architecture.md
6. docs/roadmap.md
7. Existing code comments

Always follow higher-priority documents.

---

# Required Reading Workflow

Before starting any task:

Step 1:
Read AGENTS.md

Step 2:
Identify affected domain.

Step 3:
Read all relevant documents.

Examples:

Authentication
→ architecture.md
→ database.md (if exists)
→ requirements/member-system.md (if exists)

Events
→ architecture.md
→ requirements/event-system.md

Ticketing
→ architecture.md
→ requirements/ticket-system.md

Organization Management
→ architecture.md
→ requirements/member-system.md

Database Changes
→ database.md

Infrastructure Changes
→ architecture.md
→ decisions/*

Step 4:
Summarize understanding.

Step 5:
Create implementation plan.

Step 6:
Implement changes.

Do not immediately write code without understanding project documentation.

---

# Architecture Principles

Follow architecture.md.

General principles:

* Monolith first
* Keep MVP simple
* Avoid unnecessary abstractions
* Avoid premature optimization
* Avoid introducing microservices
* Avoid introducing additional infrastructure unless justified

Preferred order:

Existing solution
→ Shared component
→ New component

---

# Coding Standards

General:

* TypeScript strict mode
* Avoid any
* Prefer explicit typing
* Prefer async/await
* Handle errors gracefully

Code should be:

* Readable
* Maintainable
* Predictable

Avoid clever code.

Prefer boring code that is easy to maintain.

---

# Naming Conventions

Components:
PascalCase

Functions:
camelCase

Variables:
camelCase

Database:
snake_case

API routes:
kebab-case

Files:
kebab-case

---

# Security Rules

Security takes priority over convenience.

Never:

* Disable authentication
* Disable authorization
* Disable RLS
* Store secrets in source code
* Commit credentials
* Expose service keys to clients

When uncertain, choose the safer implementation.

---

# Database Rules

When database documentation exists:

Follow docs/database.md.

General requirements:

* UUID primary keys preferred
* created_at
* updated_at
* Soft delete preferred when appropriate
* Index frequently queried fields
* Use migrations

Never modify production schema without migration files.

---

# API Rules

All APIs should:

* Validate inputs
* Validate permissions
* Return predictable responses
* Handle failures safely
* Avoid leaking internal information

---

# UI Principles

Priorities:

1. Functionality
2. Accessibility
3. Consistency
4. Appearance

Prefer:

* Existing design system
* Existing shared components

Avoid:

* Duplicate UI implementations
* Multiple patterns for identical actions

---

# Dependency Policy

Before adding dependencies:

Evaluate:

1. Existing project solution
2. Native framework solution
3. New dependency

Do not introduce new packages without justification.

Provide reason when adding major dependencies.

---

# Git Workflow

Branch Naming

feature/*
fix/*
refactor/*
hotfix/*
docs/*

Examples:

feature/event-management
feature/ticket-system

Commit Types

feat:
fix:
refactor:
docs:
chore:

Examples:

feat: add event registration flow
fix: resolve auth redirect issue

---

# Documentation Maintenance

Documentation is part of the product.

Whenever making changes:

Update related documentation.

Examples:

Architecture changes
→ update architecture.md

Database changes
→ update database.md

Business rule changes
→ update corresponding requirement document

Roadmap changes
→ update roadmap.md

Code and documentation must remain synchronized.

---

# Future Documentation Discovery

Agents should automatically check for:

docs/
requirements/
decisions/

If new documents are added, determine whether they are relevant to the current task.

Read them before implementation.

Do not assume AGENTS.md contains all project knowledge.

AGENTS.md is an entry point, not the complete specification.

---

# Decision Making

When requirements are unclear:

1. Search project documentation.
2. Search existing implementations.
3. Reuse established patterns.
4. Ask for clarification if ambiguity remains.

Do not invent business rules.

---

# MVP Philosophy

Current objective:

Deliver a stable MVP as quickly as possible.

Prefer:

* Simplicity
* Consistency
* Maintainability

Avoid:

* Over-engineering
* Premature scaling
* Unnecessary complexity

Build for today's requirements while keeping reasonable room for future growth.
