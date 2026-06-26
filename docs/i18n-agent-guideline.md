# I18N Agent Guideline

## Purpose

This document defines the mandatory workflow for all AI agents and developers when creating, modifying, or maintaining user-facing text.

The goal is to ensure that the entire system remains fully internationalized (i18n-ready) and prevent hardcoded text from entering production code.

---

# Core Principle

## Rule 1: No Hardcoded User-Facing Text

Any text visible to end users must come from the translation system.

### Forbidden

```tsx
<Button>Submit</Button>

<div>Login</div>

<Label>Email Address</Label>
```

### Required

```tsx
<Button>{t("common.submit")}</Button>

<div>{t("auth.login.title")}</div>

<Label>{t("auth.login.email")}</Label>
```

---

# Development Stages

Different rules apply depending on the development stage.

---

# Stage 1: Mockup → TSX Preview

Purpose:

* Rapid UI prototyping
* Design validation
* Layout verification

At this stage, incomplete translations are allowed.

## Allowed

Temporary hardcoded text may exist.

```tsx
<Card>
  Student Profile
</Card>
```

```tsx
<Button>
  Save
</Button>
```

## Recommended

Agents should still generate translation keys whenever practical.

```tsx
<Card>
  {t("member.profile.title")}
</Card>
```

Even if translation files are not yet created.

---

## Required Before Leaving Preview Stage

Before business logic implementation begins:

* All user-visible text must be extracted.
* Translation keys must exist.
* Hardcoded UI text must be removed.

---

# Stage 2: Business Logic Integration

Purpose:

* Connect APIs
* Connect database
* Add interactions
* Prepare for production

At this stage:

## Hardcoded Text Is Forbidden

### Forbidden

```tsx
toast.success("Saved successfully")

alert("Permission denied")

<Button>Delete</Button>
```

### Required

```tsx
toast.success(t("common.saved"))

alert(t("common.permissionDenied"))

<Button>{t("common.delete")}</Button>
```

---

# Stage 3: Ongoing Feature Development

Whenever a new feature introduces user-visible text:

The agent must:

1. Create translation key
2. Add translation entries
3. Use translation key immediately

Never defer translation extraction.

---

# Translation Key Structure

Keys must follow:

```txt
domain.feature.element
```

Examples:

```txt
auth.login.title
auth.login.submit

member.profile.title
member.profile.edit

ticket.purchase.confirm
ticket.purchase.cancel

finance.invoice.status
```

---

# Namespace Structure

Translations should be organized by domain.

```txt
locales/
├── zh-TW/
│   ├── common.json
│   ├── auth.json
│   ├── member.json
│   ├── ticket.json
│   ├── finance.json
│   └── event.json

├── en/
└── ja/
```

---

# Common Namespace

Reusable UI text belongs in common.

Examples:

```txt
common.submit
common.cancel
common.save
common.delete
common.confirm
common.back
common.next
common.search
```

Avoid duplication across domains.

---

# Dynamic Data Rules

## Database Values

Never store localized display text when a stable code can be stored.

### Preferred

Database:

```sql
status_code
-----------
PENDING
PAID
CANCELLED
```

Translation:

```json
{
  "PENDING": "Pending",
  "PAID": "Paid",
  "CANCELLED": "Cancelled"
}
```

Usage:

```tsx
t(`payment.status.${status}`)
```

---

## CMS Content

User-generated content is not translated through i18n files.

Examples:

* Event title
* Event description
* News article
* Announcement content

These should be stored as multilingual content fields.

Example:

```sql
title_zh
title_en

content_zh
content_en
```

or a dedicated translations table.

---

# UI Package Rules

Shared UI components must not depend on translation libraries.

## Forbidden

```tsx
export function SubmitButton() {
  return <Button>{t("common.submit")}</Button>;
}
```

## Required

```tsx
export function SubmitButton({
  children,
}: Props) {
  return <Button>{children}</Button>;
}
```

Translation belongs to application layers.

```tsx
<SubmitButton>
  {t("common.submit")}
</SubmitButton>
```

---

# Error Messages

All user-facing errors must be translated.

## Forbidden

```ts
throw new Error("Permission denied")
```

```ts
toast.error("Network error")
```

## Required

Use error codes.

```ts
throw new Error("PERMISSION_DENIED")
```

Frontend:

```tsx
toast.error(
  t(`errors.${error.code}`)
)
```

---

# Validation Messages

Validation text must be translated.

## Forbidden

```ts
.min(3, "Name is too short")
```

## Required

```ts
.min(3, {
  message: "validation.nameTooShort"
})
```

Display layer:

```tsx
t(error.message)
```

---

# Stage 4: CI Enforcement

Purpose:

Ensure i18n compliance is automatically enforced across all production code.

At this stage, ESLint becomes the source of truth.

Agents must not bypass, disable, or suppress i18n-related rules.

---

# Enforcement Authority

The following ESLint configuration is considered authoritative:

```txt
@repo/eslint-config/i18n
```

If a file violates i18n rules, the implementation is considered incomplete regardless of functional correctness.

---

# CI Requirements

The following command must pass:

```bash
pnpm lint
```

or

```bash
turbo lint
```

depending on repository configuration.

Any i18n violation must fail CI.

---

# Agent Responsibilities

Before completing any task involving UI changes, agents must verify:

* No new ESLint i18n errors
* No suppressed i18n rules
* No inline rule disabling
* No hardcoded user-facing text

---

# Forbidden Workarounds

Agents must never introduce:

```ts
// eslint-disable
```

```ts
// eslint-disable-next-line
```

```ts
/* eslint-disable */
```

for the purpose of bypassing i18n enforcement.

---

# Rule Mapping

The following ESLint rules correspond to repository policy.

## i18next/no-literal-string

Purpose:

Prevent JSX content from containing user-visible text.

### Forbidden

```tsx
<Button>Submit</Button>
```

```tsx
<h1>Student Profile</h1>
```

### Required

```tsx
<Button>
  {t("common.submit")}
</Button>
```

```tsx
<h1>
  {t("member.profile.title")}
</h1>
```

---

## i18n/no-user-visible-string

Purpose:

Prevent hardcoded Chinese text inside source code.

### Forbidden

```ts
const title = "登入";
```

```ts
const message = "儲存成功";
```

### Required

```ts
const title =
  t("auth.login.title");
```

```ts
const message =
  t("common.saved");
```

---

## i18n/no-hardcoded-toast

Purpose:

Prevent untranslated toast notifications.

### Forbidden

```ts
toast.success("Saved");
```

```ts
toast.error("Network error");
```

### Required

```ts
toast.success(
  t("common.saved")
);
```

```ts
toast.error(
  t("errors.network")
);
```

---

## i18n/no-hardcoded-dialog

Purpose:

Prevent untranslated dialogs.

### Forbidden

```ts
alert("Permission denied");
```

```ts
confirm("Delete item?");
```

### Required

```ts
alert(
  t("errors.permissionDenied")
);
```

```ts
confirm(
  t("common.confirmDelete")
);
```

---

## i18n/no-hardcoded-jsx-props

Purpose:

Prevent untranslated labels and placeholders.

### Forbidden

```tsx
<Input
  placeholder="Search"
/>
```

```tsx
<TextField
  label="Email"
/>
```

### Required

```tsx
<Input
  placeholder={
    t("common.search")
  }
/>
```

```tsx
<TextField
  label={
    t("auth.login.email")
  }
/>
```

---

## i18n/enforce-key-format

Purpose:

Ensure translation keys remain predictable.

Required format:

```txt
domain.feature.element
```

### Valid

```ts
t("auth.login.title")
```

```ts
t("member.profile.edit")
```

```ts
t("finance.invoice.status")
```

### Invalid

```ts
t("login")
```

```ts
t("submit")
```

```ts
t("auth_login")
```

```ts
t("member-profile")
```

---

# Mockup Exception

During Stage 1 (Mockup → TSX Preview), temporary hardcoded text is allowed.

However, files in this state must remain outside production lint enforcement.

Recommended options:

```txt
src/mockups/**
```

```txt
src/prototypes/**
```

```txt
src/playground/**
```

These directories may be excluded from i18n linting.

---

# Production Readiness Gate

A feature is considered production-ready only when:

* All user-facing text is translated
* Translation keys exist
* ESLint passes
* CI passes
* No i18n suppression exists

If any condition fails:

Status = NOT READY

```

---

# Agent Decision Tree

When introducing new text:

1. Is the text user-visible?

   - No → proceed normally.
   - Yes → continue.

2. Is this a mockup-only file?

   - Yes → temporary hardcoded text allowed.
   - No → continue.

3. Does a translation key already exist?

   - Yes → use existing key.
   - No → create new key.

4. Does ESLint pass?

   - Yes → implementation complete.
   - No → implementation incomplete.
```

---

# Agent Checklist

Before creating a Pull Request, verify:

* [ ] No hardcoded user-facing text
* [ ] New labels use translation keys
* [ ] New buttons use translation keys
* [ ] New dialogs use translation keys
* [ ] New toast messages use translation keys
* [ ] New validation messages use translation keys
* [ ] Translation files updated
* [ ] Namespace follows domain structure
* [ ] Shared UI package contains no translation logic

If any item fails, the task is incomplete.
