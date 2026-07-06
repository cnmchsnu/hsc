# 03. Authentication

---

# Purpose

Authentication is responsible for establishing and maintaining the identity of an application user.

The Authentication layer answers one question:

> "Who is the user?"

It intentionally does NOT answer:

- What can the user do?
- What roles does the user have?
- What permissions does the user own?
- What profile information should be displayed?

Those responsibilities belong to later layers.

---

# Responsibilities

Authentication is responsible for:

- OAuth login
- Session creation
- Session refresh
- Session validation
- Logout
- Cookie management
- Token exchange

Authentication is NOT responsible for:

- User profiles
- Roles
- Permissions
- Business authorization

---

# Architecture

Browser

↓

Google OAuth

↓

Supabase Auth

↓

auth.users

↓

Authenticated Session

↓

Application

---

# Authentication Flow

1.

User clicks

Sign In with Google

↓

2.

Browser redirects to Google OAuth.

↓

3.

Google authenticates the user.

↓

4.

Google redirects to Supabase.

↓

5.

Supabase validates the OAuth response.

↓

6.

Supabase creates or updates

auth.users.

↓

7.

Application callback exchanges the authorization code.

↓

8.

Supabase issues session cookies.

↓

9.

Browser becomes authenticated.

---

# Login Flow

Browser

↓

createBrowserClient()

↓

signInWithOAuth()

↓

Google

↓

Supabase

↓

/auth/callback

↓

exchangeCodeForSession()

↓

Cookie Created

↓

Redirect

---

# Logout Flow

Browser

↓

createBrowserClient()

↓

auth.signOut()

↓

Cookies Removed

↓

Redirect

---

# Authentication State

The authentication layer has only two states.

Anonymous

Authenticated

No authorization information should be stored here.

---

# auth.users

The canonical identity source.

Managed entirely by Supabase.

The application should never modify this table directly.

Allowed operations:

- Read authenticated user
- Admin management through Supabase APIs

Forbidden:

- Direct INSERT
- Direct UPDATE
- Direct DELETE

---

# OAuth Providers

Current

- Google

Future

- Microsoft
- GitHub
- Email Magic Link
- Password Authentication

The Authentication layer should remain provider-independent.

---

# Public APIs

Browser

createBrowserClient()

signInWithGoogle()

signOut()

Server

createServerClient()

getSession()

---

# Security Principles

Authentication must always be verified on the server.

Never trust browser state.

Never trust client-side session storage.

Always validate the session through Supabase.

---

# Design Decisions

Authentication intentionally contains no business logic.

Business logic belongs to:

Identity

Authorization

Application Services

This separation allows future replacement of Supabase without changing business logic.

---

# Future Evolution

Planned improvements:

- MFA
- Passkeys
- Email Login
- Device Trust
- Session Revocation
- Security Notifications