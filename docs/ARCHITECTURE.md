# Architecture

BeatHub uses a deliberately small layered backend:

`Client -> Express routes -> validation/auth middleware -> controllers -> services -> Mongoose -> MongoDB`

Routes define the existing HTTP surface and attach validation and role middleware. Controllers receive validated input and shape HTTP responses. Services own queries, relationship checks, and referential deletion conflicts. Mongoose models enforce schema-level constraints and indexes.

Cross-cutting middleware provides Helmet headers, JSON size limits, rate limiting, request logging, authentication, validation errors, 404 handling, and centralized error responses. Runtime configuration is loaded and validated before the application is imported.

Songs retain descending `_id` cursor pagination. Reads use `lean()` where documents are not needed. The rate limiter uses an in-memory store suitable for one instance; a shared store would be required for multiple API replicas.
