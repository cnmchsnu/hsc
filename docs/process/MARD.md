# MADR (Markdown Architecture Decision Record) Standard

## Purpose

A MADR records significant architectural decisions.

A MADR explains:

* The problem
* The available options
* The chosen option
* The reasoning behind the choice
* The consequences of the decision

A MADR is not a changelog.

A MADR records decisions, not implementation details.

---

# When a MADR Is Required

Create a MADR whenever an agent changes:

* System architecture
* Monorepo structure
* Application boundaries
* Package ownership
* Data ownership
* Authentication strategy
* Authorization model
* Deployment model
* Infrastructure topology
* Database strategy
* External service selection
* Major framework adoption
* Major framework replacement

Rule:

If the decision would matter six months later,
it probably requires a MADR.

---

# Location

```text
docs/adr/
```

Example:

```text
docs/adr/
├── 0001-monorepo-architecture.md
├── 0002-i18n-strategy.md
└── 0003-authentication-model.md
```

---

# Naming

Format:

```text
NNNN-short-kebab-case-title.md
```

Examples:

```text
0001-monorepo-architecture.md

0002-shared-i18n-package.md

0003-dual-database-strategy.md
```

Numbers must be sequential.

Never reuse numbers.

---

# MADR Template

```md
# NNNN Title

Date: YYYY-MM-DD
Status: Proposed | Accepted | Superseded | Deprecated

## Context

Describe the problem.

## Decision Drivers

Factors influencing the decision.

## Considered Options

- Option A
- Option B
- Option C

## Decision Outcome

Chosen option and rationale.

## Positive Consequences

Expected benefits.

## Negative Consequences

Known tradeoffs and limitations.

## Follow-up Actions

Required future work.

## References

- Related DevLog
- Issue
- PR
- Documentation
```

---

# Status Lifecycle

Allowed statuses:

* Proposed
* Accepted
* Superseded
* Deprecated

Definitions:

Proposed:
Decision under discussion.

Accepted:
Official project decision.

Superseded:
Replaced by another ADR.

Deprecated:
No longer recommended.

---

# Agent Responsibilities

Before creating a new MADR:

1. Search existing ADRs.
2. Check whether the decision already exists.
3. Update existing records if appropriate.
4. Avoid duplicate architectural decisions.

---

# Decision Quality Requirements

A MADR MUST include:

* Alternatives considered
* Reasons alternatives were rejected
* Long-term consequences
* Operational implications

A MADR MUST NOT contain:

* Commit-level implementation details
* Generated code
* Large code snippets
* Temporary experiments

Implementation details belong in DevLogs.
