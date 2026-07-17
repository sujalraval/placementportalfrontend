# Gujarat University — Placement Portal & ERP

React + TypeScript + Tailwind rebuild of the original static HTML prototype
(`MY_PLACEMENT_ERP_FINAL.html`). Fully converted: public site plus five
portals (Student, Recruiter, Department Coordinator, Faculty Mentor,
University Admin/TPO) — 52 pages in total. A PERN backend is planned next;
the frontend is structured so the mock data layer can be swapped for real
API calls with minimal rework.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (theme tokens in `src/index.css`, matching the original
  navy/gold design system)
- React Router v6 (`/` = public site, `/:persona/:page` = portal pages)
- `html2pdf.js` for client-side PDF export (CVs, offer letters, MOUs, reports)
- `xlsx` (SheetJS) for client-side Excel export (department/admin reports)

## Structure

- `src/data/mock/` — typed mock data per domain (jobs, companies, drives,
  internships, candidates, recruiter profile, admin content, etc.) — the
  future integration point: each file's shape is what a real API response
  should match.
- `src/data/nav.ts` — sidebar nav config per persona.
- `src/context/` — the data layer, one context per ownership boundary:
  - `PortalDataContext` — student-owned + genuinely cross-persona data
    (profile, applications, notifications, drives, companies, internships,
    tickets, surveys) and their mutators.
  - `RecruiterDataContext` — a recruiter's company profile, postings,
    candidates, interviews, offers, drives.
  - `AdminDataContext` — website content (news/events/broadcasts),
    departments/programs, users, sectors, job openings, employment outcomes.
  - `ToastContext`, `ModalContext`, `DocViewerContext` — shared UI chrome.
  - **Provider order matters**: `Modal`/`DocViewer` render their overlay
    content as a sibling of `{children}`, not nested inside it, so every
    data provider a modal might call `use...Data()` from must sit *above*
    them in `main.tsx` — otherwise the hook throws outside its provider.
- `src/components/ui/` — shared primitives (Button, Pill, Chip, Card, Stat,
  Field, Donut, AreaChart).
- `src/components/modals/` — one component per original modal (form
  modals mostly built on `SimpleFormModal`, a config-driven form renderer).
- `src/components/shared/` — cross-page building blocks (SectionCard, Tabs,
  Stepper, InfoGrid, ListRow, Banner, ChatWidget, CV/report/MOU/offer
  document renderers used by the PDF viewer).
- `src/layouts/` — `PublicLayout` (landing site) and `PortalLayout`
  (sidebar + persona shell + mobile drawer).
- `src/pages/<persona>/<page>.tsx` — one file per sidebar page, auto-wired
  into routing via `src/pages/registry.ts` (`import.meta.glob`) — add a
  file, it's routed, no manual registration.
- `src/lib/` — pure helpers: candidate/job matching score, readiness-index
  calculation, referential-integrity checks, Excel export.

## Known scope notes

- The AI CV Studio, candidate matching, and readiness-index "scores" are
  the same deterministic mock formulas as the original prototype — not
  real ML.
- `xlsx` currently has a known unpatched advisory (prototype pollution /
  ReDoS) with no fix available upstream; acceptable here since it only
  ever processes trusted, in-app-generated data, never untrusted uploads.

## Development

```
npm install
npm run dev
```
