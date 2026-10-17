# Manjil Publication — website

React website for Manjil Publication with an Express API, MongoDB database and a built-in **admin panel** where every page's content can be edited without touching code.

```
manjil-trust-publication/
├── frontend/   React 18 + Vite + Tailwind 3 + React Router 6 (public site + /admin)
├── backend/    Express API: routes → controllers → models, auth, uploads
├── database/   docker-compose + schema notes
├── docs/       DESIGN.md, DEPLOYMENT.md (share it online), ADMIN_GUIDE.md (for the client), design screenshots
└── render.yaml one-click hosting blueprint (Render)
```

## Quick start (local)
```bash
npm install                                  # installs root + frontend + backend
cd database && docker compose up -d          # local MongoDB (or put an Atlas URI in backend/.env)
cd ../backend && cp .env.example .env        # Windows: copy .env.example .env
cd .. && npm run dev                         # site http://localhost:5173 · API :5000
```
Sign in at **http://localhost:5173/admin** with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env` (the first admin is created automatically on first start).
The public site works even without the backend (it shows the built-in content); forms and the admin need the API + MongoDB.

| Command (project root) | What it does |
|---|---|
| `npm run dev` | API + site with hot reload |
| `npm run build` / `npm start` | Build the site; run the server (set `SERVE_FRONTEND=true` to serve the site too) |
| `npm test` | Backend (13) and frontend (44) automated tests |
| `npm run lint` | ESLint (catches undefined names, hook mistakes) |
| `npm run create-admin -- you@x.com "password" "Name"` | Create an admin / reset a password |

## How the content system works
- Every editable piece of copy lives in `frontend/src/data/*.js` (the **defaults**), grouped into documents in `data/defaults.js`.
- Components read content with `useContent('home')`, `useSettings()`, `useImages()` (`src/content/ContentContext.jsx`).
- The admin panel (`src/admin/`) edits a document with a generic form (`JsonEditor.jsx`) and saves it via `PUT /api/admin/content/:key`. The site fetches saved edits from `GET /api/content` and deep-merges them over the defaults.
- **To make new text editable**: add it to the relevant `data/*.js` default and read it in the component — it appears in the admin automatically.
- The **Submit Manuscript** URL and **LinkedIn** URL live in Site Settings → Links. In any link field `@submit` means "the Submit Manuscript URL".

## Pages
`/` Home · `/journals` · `/open-access` · `/resources` · `/about` · `/contact` · `/request-waiver` · `/admin/*`.
Linked-but-not-designed pages (`/books`, `/catalog-search`, `/author-guidelines`, `/peer-review`, `/publication-ethics`, `/copyright-policy`, `/privacy-policy`, `/terms-of-service`, `/archival-preservation`) show a "coming soon" page (`PLACEHOLDER_PAGES` in `data/routes.js`).

## Backend API
| Public | |
|---|---|
| `GET /api/health` · `GET /api/content` · `GET /media/:id/:name` | status · admin-edited content · admin-uploaded files |
| `POST /api/contact` · `/api/waiver-requests` (multipart, optional PDF/DOCX/ZIP ≤ 15 MB) · `/api/sample-requests` · `/api/newsletter` | form submissions |

| Admin (`Authorization: Bearer <token>`) | |
|---|---|
| `POST /api/auth/login` | email + password → token (8 h, rate-limited) |
| `GET/PUT/DELETE /api/admin/content/:key` | read / save / reset a content area |
| `POST /api/admin/media` · `GET /api/admin/media/:id` | upload a file · download a private attachment |
| `GET /api/admin/submissions[/:type]` · `PATCH/DELETE …/:type/:id` | inquiries, waivers, samples, subscribers |
| `GET/POST/DELETE /api/admin/users` · `POST /api/admin/change-password` | admin accounts |

## Security notes
Passwords are bcrypt-hashed; login is rate-limited; production refuses to start without a strong `JWT_SECRET`; admin content is validated (no `$`/dotted keys, size/depth limits); uploads are type-checked by extension **and** file signature; links/images from admin content are scrubbed so `javascript:` URLs can't be injected; Helmet sets a strict CSP. Tokens are kept in `localStorage` (standard for SPAs; the CSP blocks inline scripts to limit XSS risk).

## Known gaps / next steps
1. **Email**: inquiries, waiver and sample requests are stored and visible in the admin but nobody is emailed (marked `TODO` in the controllers).
2. The designed pages' **legal/ethics/guideline** subpages are placeholders.
3. Remote design images (Google-hosted URLs) are used until an admin uploads replacements (Images & Logo).
4. DB-backed backend paths (content save, login against real users, uploads) are covered by stub-based unit tests; run the smoke checklist in `docs/DEPLOYMENT.md` §4 once MongoDB is connected.
5. Copy inconsistencies inherited from the design: founding year (1982 vs 1984), journal count (60+ vs 58), plagiarism threshold (10% / 12% / 15%), and the logo's "imprint of Pro Vidyarthi Educator Pvt Ltd" vs the "registered trust" wording.
