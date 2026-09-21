# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**KISA Work Solutions** — a React frontend for a consulting business offering Individual Counseling, Social Consulting, and Student Visa services. The app has a public-facing site and a protected admin panel.

The codebase has not been scaffolded yet. The implementation plan lives in `KISA_Frontend_Plan.md`.

## Stack

- **React 18 + Vite + TypeScript** — `npm create vite@latest kisa-frontend -- --template react-ts`
- **Tailwind CSS** — brand palette: Primary `#2563EB`, Background `#F9FAFB`, Text `#374151`
- **React Router v6** — public routes + `/admin/*` protected routes
- **Zustand** — global state, including `useAuthStore` for JWT
- **Axios** — API calls against `VITE_API_BASE_URL`
- **react-hot-toast** — toast notifications
- **TipTap** — rich text editor in admin content management
- **lucide-react** — icons

## Commands (once scaffolded)

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server
npm run build        # production build
npm run lint         # ESLint check
npm run preview      # preview production build locally
```

Environment variable required: `VITE_API_BASE_URL` (base URL for the backend API).

## Architecture

### Route structure

| Path | Component | Access |
|------|-----------|--------|
| `/` | Home | Public |
| `/about` | About | Public |
| `/services` | Services overview | Public |
| `/services/counseling` | Counseling detail | Public |
| `/services/social-consulting` | Social Consulting detail | Public |
| `/services/student-visa` | Student Visa detail | Public |
| `/how-it-works` | How It Works | Public |
| `/book` | Booking form | Public |
| `/contact` | Contact form | Public |
| `/admin` | Login | Public |
| `/admin/dashboard` | Dashboard | Protected |
| `/admin/bookings` | Bookings management | Protected |
| `/admin/inquiries` | Inquiries management | Protected |
| `/admin/content` | CMS editor | Protected |
| `/admin/settings` | Site + email settings | Protected |

### Layouts

- `<Layout>` — wraps all public routes with `<Navbar>` and `<Footer>`
- `<AdminLayout>` — wraps all `/admin/*` routes (except login) with a sidebar
- `<ProtectedRoute>` — checks JWT in `useAuthStore`; redirects to `/admin` if missing. Auto-logout after 60 min of inactivity.

### State management

Zustand is used for global state. The primary store is `useAuthStore`, which holds the admin JWT (persisted in `localStorage`) and exposes login/logout actions.

### API layer

All HTTP calls go through Axios with `VITE_API_BASE_URL` as the base. Key endpoints:

- `POST /api/v1/auth/login` — admin login
- `GET /api/v1/content/:page` — fetch CMS content for a public page
- `PUT /api/v1/content/:page` — save CMS content
- `POST /api/v1/bookings` — submit booking (public)
- `PATCH /api/v1/bookings/:id` — update booking status (admin)
- `DELETE /api/v1/bookings/:id` — delete booking (admin)
- `POST /api/v1/inquiries` — submit inquiry (public)
- `PATCH /api/v1/inquiries/:id` — mark inquiry read / add note (admin)
- `DELETE /api/v1/inquiries/:id` — delete inquiry (admin)

### Path aliases

Configure in `vite.config.ts` and `tsconfig.json`:
- `@/components` — shared components
- `@/pages` — page-level components
- `@/lib` — utilities, API client, helpers
- `@/stores` — Zustand stores

## Key constraints

- The Student Visa service page **must include** a disclaimer banner: *"KISA Work Solutions provides consulting and informational support only and does not offer legal representation."*
- There must be **no reference** to Job Placement or Cleaning Services anywhere in the UI.
- JWT is stored in `localStorage` and managed through `useAuthStore`. Do not store it elsewhere.
