# BeatHub API

BeatHub is a Node.js REST API for managing users, artists, albums, songs, and playlists. It demonstrates structured backend architecture, JWT authentication and RBAC, MongoDB data modelling, validation, cursor pagination, and production-oriented API engineering.

There is no hosted deployment configured. Local Swagger documentation is available at `http://localhost:3000/api-docs`.

## Stack

Node.js, Express, MongoDB, Mongoose, CommonJS, JWT, bcryptjs, express-validator, Jest, Supertest, Helmet, Pino, and Swagger/OpenAPI.

## Architecture

`Express routes -> validation/auth middleware -> controllers -> services -> Mongoose models -> MongoDB`

Controllers handle HTTP concerns. Services enforce relationships and deletion integrity. Models provide schema constraints and indexes. Centralized middleware handles errors, rate limiting, logging, security headers, and request parsing.

## Authentication and Data Integrity

- `POST /api/auth/login` returns a Bearer JWT.
- User and admin roles are preserved; admin CRUD routes require both authentication and the `admin` role.
- JWT configuration is centralized and has no hardcoded fallback secret.
- Password hashes are excluded from queries and explicitly removed from login responses.
- Create/update payloads are field-whitelisted in controllers and services.
- Song, album, playlist, and deletion relationships are checked in services.
- Errors use a predictable `{ success, error: { code, message } }` shape. Production errors do not expose stacks or database internals.

## Endpoints

- `GET /` health check
- `POST /api/auth/login`
- `POST /api/users/register`
- `GET /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/songs/register`
- `GET /api/songs?limit=10&cursor=...`
- `PATCH /api/songs/:id`
- `DELETE /api/songs/:id`
- `POST /api/artist/register`, `GET /api/artist`, `PATCH /api/artist/:id`, `DELETE /api/artist/:id`
- `POST /api/album/register`, `GET /api/album`, `PATCH /api/album/:id`, `DELETE /api/album/:id`
- `POST /api/playlist/register`, `GET /api/playlist`, `PATCH /api/playlist/:id`, `DELETE /api/playlist/:id`
- `GET /api/analytics/top-users`

Swagger documents these resources at `/api-docs`. The Postman collection is in `postman/api-tests.json`; set its local seed variables and run the login request first so the saved token is inherited by protected requests.

## Configuration

Copy `.env.example` to `.env` and set a random `JWT_SECRET` with at least 32 characters. Required values are `NODE_ENV`, `PORT`, `MONGODB_URI` (or `MONGO_URI`), `JWT_SECRET`, and `JWT_EXPIRES_IN`. `SWAGGER_SERVER_URL`, JSON body size, and rate-limit values are configurable.

Never commit `.env` or real credentials. The documented seed accounts (`admin@beathub.com` / `Admin@123` and `user@beathub.com` / `User@123`) are local seed data only.

## Local Development

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run lint
npm run format:check
npm test
npm run test:coverage
```

Integration tests use `TEST_MONGO_URI` and clean only that database. For example:

```bash
NODE_ENV=test TEST_MONGO_URI=mongodb://127.0.0.1:27017/beathub_test JWT_SECRET=replace-with-at-least-32-characters npm test -- --runInBand
```

## Seeding

The seed script creates 500 artists, albums, songs, regular users, playlists, and two local demo users. It is destructive and refuses to run in production or without `SEED_RESET=true`:

```bash
NODE_ENV=development SEED_RESET=true node scripts/seed500.js
```

## Docker

Docker Compose runs the API and MongoDB without committing secrets. Set `JWT_SECRET` in the shell or a local `.env` before starting:

```bash
export JWT_SECRET='a-random-local-secret-at-least-32-characters'
docker compose up --build -d
docker exec beathub_api node scripts/seed500.js
```

The image runs as a non-root user, installs production dependencies, and includes the seed script. The in-memory rate-limit store is appropriate for a single instance; horizontally scaled deployments need a shared store, which is deliberately outside this project’s scope.

## CI and Project Structure

GitHub Actions runs install, lint, formatting, and tests against a MongoDB service. Source code follows the route/controller/service/model structure described above. `db/` owns database connection setup, `src/config/` owns validated runtime configuration and Swagger, `src/middlewares/` owns cross-cutting HTTP concerns, `models/` owns Mongoose schemas, and `tests/` owns integration coverage.

## Engineering Tradeoffs

MongoDB and Mongoose fit the existing document relationships and keep the project approachable. Cursor pagination is retained for stable descending song `_id` traversal. Reference validation lives in the application layer because MongoDB does not enforce foreign keys. JWT and simple RBAC preserve the existing authentication model. Rate limiting remains process-local and is explicitly documented as a single-instance limitation.
