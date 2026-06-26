# Development Log (DevLog) Standard

## Purpose

Development logs exist to preserve project history, implementation rationale, operational traceability, and architectural context.

A DevLog must answer:

* What changed?
* Why was it changed?
* What is affected?
* How can it be reverted?

The goal is not activity tracking.

The goal is knowledge preservation.

---

# When a DevLog Is Required

A DevLog entry MUST be created whenever an agent:

* Creates a feature
* Modifies existing behavior
* Fixes a bug
* Refactors code
* Changes configuration
* Installs, upgrades, or removes dependencies
* Changes infrastructure
* Creates or executes migrations
* Modifies APIs
* Performs automated code transformations
* Executes large-scale file modifications

Pure formatting changes are exempt unless they affect behavior.

---

# Log Location

Default structure:

```text
devlogs/
└── YYYY/
    └── MM/
        └── YYYY-MM-DD.md
```

Example:

```text
devlogs/
└── 2026/
    └── 06/
        └── 2026-06-25.md
```

---

# Entry Format

Every entry MUST follow this structure.

```md
## [TYPE] Short Title

Date: YYYY-MM-DD HH:mm UTC
Actor: agent:<name>

### Context

Why this task was initiated.

### Changes

Exact modifications performed.

### Reasoning

Why this solution was chosen.

### Impact

Affected systems, APIs, data, workflows, or users.

### Risks

Known limitations, tradeoffs, or future concerns.

### Verification

How the change was validated.

### Rollback

Steps required to revert.

### References

- Issue:
- PR:
- Commit:
- ADR:
```

---

# Allowed Types

Only the following values are allowed:

* FEATURE
* FIX
* REFACTOR
* CHORE
* CONFIG
* DEPENDENCY
* INFRA
* SECURITY
* ROLLBACK
* AGENT_ACTION

---

# Quality Requirements

The following are NOT acceptable:

```text
updated code
fixed issue
improved system
optimized logic
```

The following ARE acceptable:

```text
Added refresh-token support to API client interceptor.

Migrated product search from client filtering to
server-side pagination.

Replaced local state management with shared store.
```

---

# Mandatory Reasoning

Every entry MUST explain:

"What problem would remain unsolved if this change were not made?"

---

# Mandatory Impact Assessment

Every entry MUST explicitly identify whether the change affects:

* Production behavior
* API contracts
* Database schema
* User experience
* Infrastructure

If not applicable, state:

"None"

---

# Agent Identity

Agents MUST identify themselves.

Example:

Actor: agent:i18n-validator

Actor: agent:refactor-engine

Actor: agent:migration-bot

Never use:

Actor: AI
Actor: Assistant
Actor: Unknown

---

# Relationship to MADR

If a change introduces or modifies an architectural decision:

* Create or update a MADR.
* Reference the MADR from the DevLog.
* Reference the DevLog from the MADR.

Both documents must remain linked.
