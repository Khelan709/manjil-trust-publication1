# Database

MongoDB (via Mongoose). Locally you can run it with Docker, or use a free MongoDB Atlas cluster (see `docs/DEPLOYMENT.md`).

```
database/
├── docker-compose.yml   # local MongoDB 7 on :27017
├── migrations/          # (empty) dated data-migration scripts go here
└── schemas/README.md    # human-readable overview of collections
```

## Local setup

```bash
cd database && docker compose up -d
cd ../backend && cp .env.example .env     # defaults already point at the local database
npm run dev                                # first start creates the admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env
```

There is nothing to seed: the website ships with built-in default content (`frontend/src/data/`), and the database only
stores what admins **change** (collection `contents`), merged over those defaults at runtime.

## Backups
Atlas free clusters have no automatic backups. Take one with
`mongodump --uri "<your MONGODB_URI>" --out backup/` and restore with `mongorestore`.
