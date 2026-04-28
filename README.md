# BeatHub API

Production-ready CRUD API for BeatHub built with Node.js, Express, and MongoDB.

## Live Deployment URL
- API Base URL: ADD_YOUR_LIVE_URL_HERE
- Swagger Docs URL: ADD_YOUR_LIVE_URL_HERE/api-docs

## Test Credentials
- Admin: `admin@beathub.com` / `Admin@123`
- User: `user@beathub.com` / `User@123`

## Production Checks
- JWT login is available at `POST /api/auth/login`
- Protected routes return `401` when the `Authorization` header is missing
- Admin-only routes return `403` for non-admin users
- API requests are rate-limited and return `429` after repeated bursts
- Song pagination is available through `GET /api/songs?limit=10&cursor=...`
- Responses never include password hashes
- Database connection uses `MONGODB_URI` or `MONGO_URI`

## Required Environment Variables
- `PORT`
- `MONGODB_URI` (preferred)
- `MONGO_URI` (fallback supported)
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `SWAGGER_SERVER_URL` (optional; set this to your live base URL so Swagger shows production server)

## Docker & Local Deployment

### Local Development with Docker Compose
```bash
# Start both API and MongoDB
docker-compose up -d

# View logs
docker-compose logs -f api

# Seed the database (optional)
docker exec beathub_api node scripts/seed500.js

# Stop services
docker-compose down
```

### Build and Run Individual Container
```bash
# Build the image
docker build -t beathub-api .

# Run with local .env file
docker run -p 3000:3000 --env-file .env beathub-api

# Or run with inline environment variables
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/beatHub" \
  -e JWT_SECRET="your-secret-key" \
  -e JWT_EXPIRES_IN="7d" \
  beathub-api
```

## Local Setup
```bash
npm install
npm start
```

## Development Mode
```bash
npm run dev
```

## API Documentation
Swagger UI is available at:
- `http://localhost:3000/api-docs`

## Main Endpoints
- `POST /api/auth/login`
- `POST /api/users/register`
- `GET /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/songs/register`
- `GET /api/songs`
- `PATCH /api/songs/:id`
- `DELETE /api/songs/:id`
- `POST /api/playlist/register`
- `GET /api/playlist`
- `PATCH /api/playlist/:id`
- `DELETE /api/playlist/:id`
- `POST /api/artist/register`
- `GET /api/artist`
- `PATCH /api/artist/:id`
- `DELETE /api/artist/:id`
- `POST /api/album/register`
- `GET /api/album`
- `PATCH /api/album/:id`
- `DELETE /api/album/:id`

## Deployment Notes
- Use Render or another cloud host with a public HTTPS URL.
- Set all environment variables in the cloud dashboard instead of committing a local `.env` file.
- Point `SWAGGER_SERVER_URL` to the deployed base URL so the docs show the live server.

## Status Codes Used
- `201` Created for successful POST requests
- `200` Success for GET/PATCH/DELETE requests
- `400` Validation error / bad request
- `401` Missing or invalid token
- `403` Role not allowed
- `429` Too many requests
- `404` Resource not found
- `500` Internal server error

## Postman Collection
The exported-style Postman collection is available at:
- `postman/api-tests.json`

## Security Note
- `.env` is gitignored.
- Never commit secrets or database credentials.
