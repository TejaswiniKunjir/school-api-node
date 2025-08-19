# School APIs (Node.js + Express + MySQL)

APIs to add schools and list schools sorted by proximity.

## Endpoints

### POST `/addSchool`
Body (JSON):
```json
{
  "name": "Green Valley High",
  "address": "123 Main St, Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

Success:
```json
{ "status": true, "message": "School added successfully", "data": { "id": 1, "name": "...", "address": "...", "latitude": 19.076, "longitude": 72.8777 } }
```

### GET `/listSchools?lat=19.07&lng=72.88&limit=50`
Returns schools ordered by distance (km) from the given coordinates.

Success:
```json
{ "status": true, "count": 2, "data": [ { "id": 1, "name": "...", "distance_km": 2.34, "latitude": 19.07, "longitude": 72.88, "address": "..." } ] }
```

## Setup

1. Copy `.env.example` to `.env` and set DB credentials.
2. Create DB & table: `mysql -u root -p < schema.sql`
3. Install & run:
```bash
npm install
npm run dev
# or
npm start
```

## Deploy (Render quick-start)
1. Push this repo to GitHub.
2. On Render:
   - New → Web Service → Connect repo.
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from `.env` (DB_*, PORT).
3. Use a managed MySQL (Render, Railway, Planetscale) and point DB_* to it.

## Notes
- Uses MySQL prepared statements and Haversine in SQL for stable distance sorting.
- Validation via `express-validator`.
