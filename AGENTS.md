<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Required Skills

For all React and Next.js work:

- Always load and follow the skill:
  vercel-react-best-practices

Before generating code:

1. Review the relevant skill.
2. Apply all mandatory rules.
3. Explain any rule violations.

<!-- END:nextjs-agent-rules -->

# Project Architecture Rules

## Architecture Philosophy

This project follows a Server-First architecture.

The default assumption is:

- Server Components first.
- SSR first.
- Client Components only when browser interactivity is required.
- Minimize client-side JavaScript.
- Prefer data fetching on the server.

---

## Route Components

### page.tsx

All `page.tsx` files must be Server Components.

Never add:

```tsx
"use client"
```

to any page.tsx file.

Page components may:

- Access cookies()
- Access headers()
- Call services
- Query the database through services
- Perform authentication checks
- Perform authorization checks
- Fetch data
- Render Client Components

Page components must not:

- Use useState
- Use useEffect
- Use useReducer
- Use browser APIs

---

### layout.tsx

All `layout.tsx` files must be Server Components.

Never add:

```tsx
"use client"
```

to any layout.tsx file.

Layouts are responsible for:

- SSR authentication
- Session loading
- Tenant loading
- Provider composition
- Server-side data loading

Layouts may render Client Components.

---

## Client Components

Client Components should only exist when browser interactivity is required.

Examples:

- Forms
- Dropdowns
- Modals
- Tabs
- Theme switching
- Auth context
- Interactive dashboards

Client Components must explicitly declare:

```tsx
"use client"
```

---

## Authentication

Authentication is server-first.

Preferred flow:

```text
layout.tsx
    ↓
getCurrentUser()
    ↓
cookies()
    ↓
validate access token
    ↓
fallback to refresh token
    ↓
hydrate user
    ↓
<AuthProvider initialUser={user}>
```

Do not load the authenticated user through useEffect if it can be resolved during SSR.

Prefer passing authenticated user data from Server Components into Client Components.

---

## Data Fetching

Preferred:

```tsx
const users = await getUsers()
```

inside Server Components.

Avoid:

```tsx
useEffect(() => {
  fetch(...)
}, [])
```

unless:

- Polling is required
- Live updates are required
- Browser APIs are required
- User-triggered refreshes are required

Server-side fetching is the default.

---

## Service Layer

Business logic belongs in:

```text
src/services
```

Examples:

```text
auth.service.ts
user.service.ts
```

Pages and layouts should orchestrate services, not contain business logic.

---

## Infrastructure Layer

Framework-specific utilities belong in:

```text
src/lib
```

Examples:

```text
auth-server.ts
cookies.ts
tokens.ts
prisma.ts
```

---

## Database Access

Prisma access should occur through the service layer.

Avoid database queries directly inside pages, layouts, or Client Components.

Preferred:

```text
page.tsx
    ↓
user.service.ts
    ↓
prisma
```

Not:

```text
page.tsx
    ↓
prisma
```

---

## Context Providers

React Context is for client state only.

Context providers belong in:

```text
src/context
```

Examples:

```text
auth.context.tsx
```

Authentication should be resolved on the server before hydrating context.

---

## AI Code Generation Rules

When generating code:

1. Assume page.tsx is a Server Component.
2. Assume layout.tsx is a Server Component.
3. Never add "use client" to page.tsx.
4. Never add "use client" to layout.tsx.
5. Extract interactivity into dedicated Client Components.
6. Prefer SSR over client-side fetching.
7. Prefer server-side authentication.
8. Prefer passing data as props from Server Components.
9. Minimize client-side JavaScript.
10. Follow the existing project structure exactly.
11. Reuse existing services before creating new abstractions.
12. Do not duplicate authentication, cookie, or token logic.
