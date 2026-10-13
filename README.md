# Caleb Kipkorir Tallam: Portfolio (React + Express + MongoDB Atlas)

```text
Visitor → React frontend (Vercel) → Express API (Render) → MongoDB Atlas
```

## Structure
```text
portfolio/
├── client/                  React + Vite frontend (design unchanged)
│   ├── src/api/client.js            only place that reads VITE_API_URL
│   ├── src/context/PortfolioContext.jsx   loads content from API, falls back to portfolioData.js
│   ├── src/components/ContactForm.jsx     new working contact form
│   └── .env.example
├── server/                  Express + Mongoose API
│   ├── config/ (env.js, db.js)   controllers/   middleware/   models/   routes/   validators/
│   ├── scripts/ (createAdmin.js, seed.js)
│   ├── app.js  server.js  .env.example
├── package.json             convenience scripts
└── README.md
```

## 1. Install
Requires Node.js 18.11+.
```bash
npm run install:all
```

## 2. MongoDB Atlas setup (free)
1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (Google or email). Verify your email.
2. Create a project if asked, then click **Create** (Build a Database) and choose **M0 Free**. Pick a provider/region close to you (and to your Render region), name it e.g. `portfolio-cluster`, and create it.
3. **Database user:** left menu → *Database Access* → *Add New Database User* → Password authentication. Choose a username, click *Autogenerate Secure Password* and **copy it**. Role: *Read and write to any database*. Save.
4. **Network access:** left menu → *Network Access* → *Add IP Address* → *Allow Access From Anywhere* (`0.0.0.0/0`) → Confirm. (Needed because Render's IP addresses change. Your database user and password are what protect it.)
5. **Connection string:** *Database* → *Connect* on your cluster → *Drivers* → Node.js → copy the string. It looks like
   `mongodb+srv://USER:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your password (if it has special characters like `@ : /`, URL-encode them), and add the database name before the `?`:
   `mongodb+srv://USER:PASSWORD@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority`
7. Create your env files:
```bash
cp server/.env.example server/.env      # then edit server/.env
cp client/.env.example client/.env
```
   In `server/.env` set `MONGODB_URI` (above) and `JWT_SECRET` (generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`).
8. **Test the connection:** `npm run dev:server`. You should see `MongoDB connected (database: portfolio)`. Then open http://localhost:5000/api/health, which should show `"database":"connected"`. If it fails, re-check the password, the `0.0.0.0/0` rule, and that the string has no `<` `>` characters. Collections appear in Atlas (*Browse Collections*) after the first write.

## 3. Run locally (two terminals)
```bash
npm run dev:server     # API on http://localhost:5000
npm run dev:client     # site on http://localhost:5173
```

## 4. Put your content in the database (optional but recommended)
```bash
npm run create-admin   # prompts for email + password (12+ chars); stored as a bcrypt hash
npm run seed           # copies content from client/src/data/portfolioData.js into empty collections
```
After that, the site shows what is in the database. Collections that are empty in the database fall back to `portfolioData.js`.

## 5. Test the API
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/skills
curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Hi","message":"Hello, this is a test message."}'

# Admin login (returns a token)
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"YOUR_ADMIN_EMAIL","password":"YOUR_PASSWORD"}'

# Use the token
TOKEN=paste_token_here
curl http://localhost:5000/api/messages -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:5000/api/projects -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"My first project","description":"What it does.","technologies":["React"],"github":"https://github.com/you/repo","category":"Web Development"}'
```

### Endpoints
| Resource | Public | Admin (Bearer token) |
|---|---|---|
| `/api/projects`, `/api/experience`, `/api/skills`, `/api/education`, `/api/certifications` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| `/api/contact` | `POST` (5 per hour per IP) | |
| `/api/messages` | | `GET`, `PATCH /:id` (`{"read":true}`), `DELETE /:id` |
| `/api/auth/login` | `POST` (10 per 15 min per IP) | `GET /api/auth/me` |
| `/api/health` | `GET` | |

Experience/skills/etc. use `order` (smaller = first) for sorting. There is no public sign-up: admins are created only with `npm run create-admin`.

## 6. Deploy

**Backend → Render** (https://render.com)
1. Push the project to GitHub (`.env` is git-ignored).
2. New → **Web Service** → connect the repo. Root Directory: `server`. Build Command: `npm install`. Start Command: `npm start`. Health Check Path: `/api/health`.
3. Environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL, e.g. `https://caleb-portfolio.vercel.app`; separate several with commas, no trailing slash), `NODE_ENV=production`. Do not set `PORT`; Render sets it.
4. Deploy and note the URL (e.g. `https://my-portfolio-api.onrender.com`). Free instances sleep when idle, so the first request can take ~30–60 s. The site shows its built-in content immediately and swaps in database content when the API answers.

**Frontend → Vercel** (https://vercel.com)
1. New Project → import the repo. Root Directory: `client`. Framework: Vite (build `npm run build`, output `dist`).
2. Environment variable: `VITE_API_URL` = your Render URL (no trailing slash). Vite bakes this in at build time, so redeploy after changing it.
3. Deploy, then put the final Vercel URL (and any custom domain) into `CLIENT_URL` on Render.

**Creating the admin / seeding production:** run `npm run create-admin` and `npm run seed` on your computer with `server/.env` pointing at the same Atlas database. Atlas is the shared database, so it applies to production immediately.

## 7. Security notes
Secrets only in environment variables. Passwords hashed with bcrypt (cost 12). JWT (HS256) for admin routes, verified against the database on each request. All input validated with Zod. Helmet headers, strict CORS allow-list, 20 KB body limit, rate limits on the API, contact and login. Contact form has a honeypot field. Errors never leak stack traces in production. Public endpoints only return portfolio content, never messages or admin data.

## 8. Adding an admin dashboard later
The API already supports everything a dashboard needs: log in via `/api/auth/login`, keep the token, and call the POST/PUT/DELETE routes and `/api/messages`. A dashboard can be added as new routes in `client/` without changing the server.
