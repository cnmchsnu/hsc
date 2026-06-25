Client
 ↓
Next.js
 ↓
Supabase
 ├─ Auth
 ├─ PostgreSQL
 └─ Storage

---

## Current Architecture Principle

Monolith First

Do not introduce:
- Microservices
- Message Queue
- Separate Backend

until proven necessary