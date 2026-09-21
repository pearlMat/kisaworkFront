# KISA Work Solutions — Frontend Implementation Plan

**Stack:** React 18 + Vite + TypeScript · Tailwind CSS · React Router v6 · Axios · Zustand

---

## Phase 1 — Project Foundation (Week 1)

### 1.1 Scaffold & Config
- `npm create vite@latest kisa-frontend -- --template react-ts`
- Install dependencies: `react-router-dom`, `tailwindcss`, `axios`, `zustand`, `lucide-react`, `react-hot-toast`
- Configure Tailwind with the brand palette:
  - Primary: `#2563EB`, Background: `#F9FAFB`, Text: `#374151`
- Set up path aliases (`@/components`, `@/pages`, `@/lib`, etc.)
- Configure environment variables: `VITE_API_BASE_URL`
- Set up ESLint + Prettier

### 1.2 Global Layout & Routing
- Create `<Layout>` component with `<Navbar>` and `<Footer>`
- Define all public routes in `App.tsx` using React Router v6
- Create `<AdminLayout>` with sidebar for admin routes
- Create `<ProtectedRoute>` guard that checks JWT and redirects to `/admin` if unauthenticated
- Implement auto-logout after 60 min of inactivity (activity listener + timer)

### 1.3 Shared Components
- `<Navbar>` — logo, nav links, mobile hamburger menu
- `<Footer>` — nav links, contact details, legal disclaimer
- `<Button>` — primary, secondary, ghost variants
- `<Toast>` — success/error notifications via `react-hot-toast`
- `<PageSEO>` — sets `<title>`, meta description, Open Graph tags per page
- `<LoadingSpinner>` and `<ErrorBoundary>`

---

## Phase 2 — Public Pages (Week 2–3)

### 2.1 Home Page (`/`)
- `<HeroSection>` — headline, tagline, "Book a Consultation" CTA → `/book`
- `<ServiceCards>` — 3 cards: Individual Counseling, Social Consulting, Student Visa; each links to its sub-page
- `<HowItWorksSection>` — 3 numbered steps
- `<TestimonialsSection>` — placeholder content in v1
- Footer

### 2.2 About Page (`/about`)
- Mission statement, values section
- Team grid — photo, name, role, bio (data-driven from CMS content API)

### 2.3 Services Pages
- `/services` — overview with intro text + cards linking to sub-pages
- `/services/counseling` — detail page
- `/services/social-consulting` — detail page
- `/services/student-visa` — detail page + **disclaimer banner**: *"KISA Work Solutions provides consulting and informational support only and does not offer legal representation."*
- All service content fetched from `GET /api/v1/content/:page`

### 2.4 How It Works Page (`/how-it-works`)
- Visual 3-step process — icons, step titles, descriptions

### 2.5 Booking Page (`/book`)
- Service selector: `Individual Counseling | Social Consulting | Student Visa` (maps to enum)
- Preferred date/time picker (`<input type="datetime-local">` — no live calendar in v1)
- Fields: full name, email, phone (optional), message/notes
- Client-side validation with inline error messages (required fields, email format)
- On submit: `POST /api/v1/bookings` → success toast + clear form
- Loading state on submit button

### 2.6 Contact Page (`/contact`)
- Fields: name, email, subject, message
- On submit: `POST /api/v1/inquiries` → success toast
- Display: email, phone, office hours
- Embedded Google Map (iframe)

---

## Phase 3 — Admin Panel (Week 4)

### 3.1 Auth
- `/admin` — login form (email + password), calls `POST /api/v1/auth/login`
- Store JWT in `localStorage`; expose via Zustand `useAuthStore`
- Auto-redirect to `/admin/dashboard` if already logged in
- Logout clears store + token, redirects to `/admin`

### 3.2 Dashboard (`/admin/dashboard`)
- 4 stat cards: Total Bookings, Pending Bookings, Unread Inquiries, This Week
- Recent bookings table (last 10)
- Quick-action links to Pending Bookings and Unread Inquiries

### 3.3 Bookings Management (`/admin/bookings`)
- Paginated table: name, service, preferred date, status badge, submitted date
- Filters: service, status, date range; search by name or email
- Row click → `<BookingDrawer>` — full details, status selector (`PENDING | CONFIRMED | CANCELLED`), admin note field; calls `PATCH /api/v1/bookings/:id`
- Bulk select → bulk status update
- Export to CSV (client-side from fetched data)
- Delete row → `DELETE /api/v1/bookings/:id` with confirmation dialog

### 3.4 Inquiries Management (`/admin/inquiries`)
- List view: name, subject, date, read/unread badge
- Click → detail view: full message, admin note, mark-as-read toggle (`PATCH /api/v1/inquiries/:id`)
- Reply button → `mailto:` link
- Delete → `DELETE /api/v1/inquiries/:id` with confirmation

### 3.5 Content Management (`/admin/content`)
- Editable sections: Home hero, About copy + team members, service descriptions, How It Works steps, footer contact details
- Rich text editor: TipTap (preferred — TypeScript-native, modular)
- Preview pane alongside editor
- Save → `PUT /api/v1/content/:page`
- Team member editor: add/remove entries with name, role, bio, photo upload

### 3.6 Settings (`/admin/settings`)
- Site settings: site name, contact email, phone, office hours
- Email settings: sender name/address, admin notification address
- Email template editor (3 templates: booking confirmation, status update, inquiry alert)
- Admin user management: list users, invite via email link, deactivate

---

## Phase 4 — Polish & QA (Week 5–6)

- Add `<PageSEO>` with meta + Open Graph to all public pages
- Lighthouse audit — target ≥ 85 all categories
- Responsive QA at 375 px, 768 px, 1280 px
- Accessibility pass: semantic HTML, ARIA labels, keyboard nav, focus rings
- Test on Chrome, Firefox, Safari, Edge (latest 2 versions)
- Verify no reference to Job Placement or Cleaning Services anywhere in the UI

---

## Milestone Summary

| Week | Scope |
|------|-------|
| 1 | Scaffold, routing, layout, shared components |
| 2–3 | All public pages, booking + contact forms |
| 4 | Admin dashboard, bookings + inquiries management |
| 5–6 | CMS editor, settings panel, SEO, QA |
| 7 | Staging deploy + UAT |

---

*KISA Work Solutions — Frontend Plan · v1.0 · September 2026*
