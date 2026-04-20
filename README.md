# BeatHub API

Production-ready CRUD API for BeatHub built with Node.js, Express, and MongoDB.

## Live Deployment URL
- API Base URL: ADD_YOUR_LIVE_URL_HERE
- Swagger Docs URL: ADD_YOUR_LIVE_URL_HERE/api-docs

## Required Environment Variables
- `PORT`
- `MONGODB_URI` (preferred)
- `MONGO_URI` (fallback supported)
- `SWAGGER_SERVER_URL` (optional; set this to your live base URL so Swagger shows production server)

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

## Status Codes Used
- `201` Created for successful POST requests
- `200` Success for GET/PATCH/DELETE requests
- `400` Validation error / bad request
- `404` Resource not found
- `500` Internal server error

## Postman Collection
The exported-style Postman collection is available at:
- `postman/api-tests.json`

## Security Note
- `.env` is gitignored.
- Never commit secrets or database credentials.
