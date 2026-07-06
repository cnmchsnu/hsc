# 04. Session Lifecycle

---

# Purpose

This document describes how authenticated sessions are created, refreshed, validated, and destroyed.

---

# Session Lifecycle

Anonymous

↓

OAuth Login

↓

Authenticated Session

↓

Automatic Refresh

↓

Expired Session

↓

Re-authentication

---

# Session Components

Supabase Session

contains

- access_token
- refresh_token
- expires_at

The application should treat the session as opaque.

Never inspect JWT payload unless explicitly required.

---

# Browser Client

The browser client is responsible for:

- initiating OAuth
- logout
- client-side session updates

It should never perform authorization decisions.

---

# Server Client

The server client is responsible for:

- validating cookies
- reading authenticated users
- server-side rendering
- secure session verification

Server Components should always use the server client.

---

# Cookie Flow

Request

↓

Cookies

↓

Server Client

↓

Supabase

↓

Validated Session

↓

Response

Cookies are the single source of truth.

---

# Middleware

Purpose

Keep sessions synchronized.

Responsibilities

- Refresh expired access tokens
- Write updated cookies
- Forward refreshed cookies

Middleware should not perform authorization.

---

# Callback Route

Responsibilities

Exchange OAuth authorization code.

Create authenticated session.

Persist cookies.

Redirect user.

The callback route should never load application data.

---

# getSession()

Purpose

Read the authenticated session.

Returns

Session | null

Should not load profile information.

Should not load permissions.

---

# getCurrentUser()

Purpose

Return the application user.

Process

Session

↓

AuthUser

↓

Profile

↓

Authorization

↓

CurrentUser

Unlike getSession(), this API aggregates multiple domains.

---

# Session Validation

Every request follows:

Read Cookies

↓

Create Server Client

↓

Validate Session

↓

Load Application User

↓

Application Logic

---

# Refresh Strategy

Supabase automatically refreshes sessions.

Middleware ensures updated cookies are written back to the browser.

Application code should not manually refresh tokens.

---

# Session Ownership

Authentication owns:

Session

Identity owns:

Profile

Authorization owns:

Permissions

CurrentUser owns:

Aggregated Application User

---

# Error States

Anonymous User

↓

No Session

↓

Session Expired

↓

Invalid Refresh Token

↓

OAuth Failure

↓

Network Failure

Every error should remain isolated within the Authentication layer.

---

# Security Considerations

Never expose refresh tokens.

Never serialize sessions into application state.

Never cache authenticated users globally.

Always create a new CurrentUser per request.

---

# Future Improvements

Sliding Sessions

Session Revocation

Device Sessions

Concurrent Session Management

Trusted Devices

Session Audit Log