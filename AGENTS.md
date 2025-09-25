# Repository Guidelines

## Project Structure & Module Organization
- `Development/Client`: React entry (`react_entry.js`), views, utilities, LESS styles.
- `Development/Server`: HTTP routes in `Requests/` and Socket.IO in `Websockets/`.
- `Built_Client` and `Built_Server`: Webpack outputs (`built_client.js`, `built_server.js`).
- `app.js`: Express HTTPS server; serves client from `/static` and wires routes/websockets.
- `uploads/`: Local upload temp dir. Do not commit large artifacts.
- `webpack.config.js`: Dual config for Node (server) and Web (client).

## Build, Test, and Development Commands
- `npm run build`: Bundles client and server to `Built_*` via Webpack.
- `npm run start`: Runs Webpack dev server for the client. Server is not started.
- `npm run serve`: Runs `Built_Server/built_server.js` with nodemon. Build first or use `watch`.
- `npm run watch`: Rebuilds on change. Useful during local development.

Example (two terminals):
1) `npm run watch`  2) `npm run serve`  → open https://localhost:8080/

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep lines ≤ 100 chars.
- Language: modern JS (ES2015+) and React; LESS for styles. Prefer functional components.
- Files: snake_case for filenames (e.g., `app_entrance.js`); PascalCase for React components.
- Imports: use relative paths within `Development/Client` and `Development/Server`.
- Lint/format: No ESLint/Prettier config yet—match surrounding style and keep diffs minimal.

## Testing Guidelines
- Current status: no automated tests (`npm test` is a placeholder).
- Recommendation: Jest + React Testing Library for client; Jest + Supertest for server routes.
- Conventions: place tests next to source as `*.test.js`; aim for critical-path coverage.
- Run: `npm test` (after adding a test setup).

## Commit & Pull Request Guidelines
- History shows short, generic messages (e.g., “update”). Prefer Conventional Commits:
  - Examples: `feat(server): add photo upload API`, `fix(client): prevent drag crash`.
- PRs: include scope/intent, linked issues, test plan, screenshots/GIFs for UI, and notes on routes or breaking changes.

## Security & Configuration Tips
- TLS: `my-key.pem`/`my-cert.pem` are dev-only. Never commit real keys or secrets.
- Env: store credentials (DB, S3) in environment variables; do not hardcode.
- Uploads: validate file types and sizes; avoid committing files in `uploads/`.

