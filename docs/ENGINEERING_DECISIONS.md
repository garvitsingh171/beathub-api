# Engineering Decisions

- Keep Express, CommonJS, Mongoose, JWT, bcryptjs, express-validator, Jest, and Supertest to preserve the existing project contract.
- Keep the route -> controller -> service -> model flow because it separates HTTP handling from domain and persistence rules without adding unnecessary repository abstractions.
- Validate referenced documents in services because MongoDB ObjectId validation only checks shape, not existence.
- Reject referenced-entity deletes with `409 Conflict` rather than silently creating dangling relationships.
- Keep cursor pagination for songs because the endpoint already exposes it and descending `_id` ordering provides stable traversal.
- Use centralized errors and structured Pino logs to make operational behavior predictable without logging credentials or authorization headers.
- Use process-local rate limiting for the current single-instance deployment. A horizontally scaled deployment would need a shared store.
