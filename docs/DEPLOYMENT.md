# Sharing the site with your client (and letting others work on it)

There are two ways. **Option B is the one to use for the client** — it needs no laptop to stay on.

|  | A. Quick tunnel from your laptop | B. Hosted (Render + MongoDB Atlas) |
|---|---|---|
| Time | 5 minutes | ~30 minutes, once |
| Cost | Free | Free tier (see limits below) |
| Works when your laptop is off | **No** | **Yes** |
| Stable link | No (changes each time) | Yes |
| Admin panel & forms save data | Only if your local MongoDB runs | Yes |
| Best for | A live demo call | Client review, updates, real use |

---

## Option A — temporary link to your laptop

1. Start the site: `npm run dev` (from the project root). It runs on http://localhost:5173.
2. In a second terminal, open a free tunnel (no account needed):
   ```powershell
   npx cloudflared tunnel --url http://localhost:5173
   ```
   (or `npx localtunnel --port 5173`, or ngrok). It prints a public `https://….trycloudflare.com` link.
3. Send that link to the client. It stops working when you close the terminal or shut the laptop.

> Anyone with the link can open the site **and** `/admin/login`. Use a strong admin password and stop the tunnel when you're done.

---

## Option B — host it online (recommended)

You will use three free services: **GitHub** (stores the code, lets others collaborate), **MongoDB Atlas** (database) and **Render** (runs the website). One Render service hosts the public site, the API and the admin panel.

### 1. Put the code on GitHub
1. Install Git, create a (private) repository on github.com.
2. In the project folder:
   ```powershell
   git init
   git add .
   git commit -m "Initial version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/manjil-publication.git
   git push -u origin main
   ```
   `.env` files are git-ignored, so no secrets are uploaded.

### 2. Create the database (MongoDB Atlas, free)
1. Sign up at mongodb.com/atlas → create a free **M0** cluster.
2. **Database Access** → add a database user (username + strong password).
3. **Network Access** → add IP `0.0.0.0/0` (Render's IPs change; the password protects the database).
4. **Connect → Drivers** → copy the connection string and put the database name before the `?`:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/manjil_publication?retryWrites=true&w=majority`

### 3. Deploy on Render
1. Sign up at render.com with your GitHub account.
2. **New → Blueprint** → choose the repository. Render reads `render.yaml`.
3. Fill in the three values it asks for:
   - `MONGODB_URI` — the string from step 2
   - `ADMIN_EMAIL` — the first admin's email
   - `ADMIN_PASSWORD` — a strong password (10+ characters)
   (`JWT_SECRET` is generated automatically.)
4. Click **Apply**. The first build takes a few minutes. You get a link like `https://manjil-publication.onrender.com`.

### 4. Check it works
- `https://YOUR-LINK/api/health` → should show `"database":"connected"`.
- `https://YOUR-LINK/admin/login` → sign in with the admin email/password.
- Open **Site Settings**, set the Submit Manuscript URL, Save, then reload the public site.
- Send a test message through the Contact form, then see it under **Contact inquiries** in the admin.

### 5. Hand it to the client
- Send them the site link, plus the admin link and login **separately** (e.g. different messages).
- Ask them to sign in and use **Admins & Password** to change the password and add their own team's accounts.
- After the first login you may delete `ADMIN_EMAIL` / `ADMIN_PASSWORD` from Render's environment settings.

### 6. Let other developers work on it
- GitHub → repository → **Settings → Collaborators** → invite them.
- They run: `git clone …` → `npm install` → copy `backend/.env.example` to `backend/.env` → `npm run dev`.
- Work on a branch, open a Pull Request, merge to `main` → Render redeploys automatically (`autoDeploy`).
- Content changes are made in the admin panel — no code or deploy needed.

---

## Things to know about the free tiers
- **Render free** sleeps after ~15 minutes without traffic; the next visit takes ~30–60 s to wake up. Upgrade the plan for always-on hosting.
- **Atlas M0** has 512 MB of storage and no automatic backups. Uploaded images/files are stored in the database, so keep images reasonably small (resize photos to ≤ 1600 px). Take occasional backups with `mongodump`, or upgrade the cluster.
- **Custom domain**: Render → your service → **Settings → Custom Domains** (HTTPS is automatic).
- **Admin edits vs code updates**: the admin panel stores *edits*; anything an admin has changed overrides the built-in text in code. To make a developer's new default text appear for an area, use that area's **Reset to defaults** button (this discards the admin's edits for that area).

## Environment variables (backend)
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Database connection string |
| `JWT_SECRET` | Signs admin login tokens — random, 32+ chars (required in production) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Creates the first admin if none exists |
| `SERVE_FRONTEND` | `true` → the server also serves the built website |
| `TRUST_PROXY` | `1` behind Render/Nginx so rate limiting sees real client IPs |
| `CORS_ORIGIN` | Only needed if the website is hosted on a different domain than the API |
| `PORT` | Provided by the host |

## Other hosts
The app is a standard Node server: `npm install && npm run build` then `npm start`. It also runs on Railway, Fly.io, a VPS (behind Nginx/Caddy), or any host with Node 18+. If you host the frontend separately (Netlify/Vercel), set `VITE_API_BASE_URL` at build time and `CORS_ORIGIN` on the API.
