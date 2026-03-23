# CLAUDE.md — mfe-job-search

## What this is

A React micro-frontend for personal job search tracking. It lives inside a larger
MFE architecture: a shell app handles auth, provides the header/sidebar, and mounts
MFEs via Webpack Module Federation. This MFE exposes `./App` and runs on port 3002.

It's a personal tool (one user), but is built to professional standards on purpose.
Treat it accordingly.

## Architecture

- **Shell + MFEs**: The shell must have all MFEs running before it starts. There is
  no automated startup. Current MFEs: this one (`mfe-job-search`, port 3002) and a
  dashboard stub.
- **Module Federation**: `webpack.config.ts` defines the federation config. Shared
  deps (react, react-router-dom, react-query, zustand, mfe-utils) are declared there
  and must stay in sync with the shell.
- **Backend**: A separate Go server running locally at `http://localhost:8080`.
  No shared API contract — the source of truth is the Go repo.

## Tech stack

| Concern | Tool |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Routing | React Router 7 |
| Server state | TanStack React Query 5 |
| Client state | Zustand 5 (not yet wired up) |
| Styling | Tailwind CSS 4 + per-component CSS files |
| HTTP | Axios (custom wrapper in `utils/axios.ts`) |
| Bundler | Webpack 5 |
| Package manager | pnpm |
| Shared UI/auth | `@bka-stuff/mfe-utils` (imported by branch, actively developed) |

## Key structure

```
src/
  api/          # BaseApi class + per-resource subclasses (jobApi, recruiterApi)
  components/   # Feature folders (jobs/, recruiters/, shared/) each with .tsx + styles.css
  hooks/        # React Query hooks — one file per resource
  pages/        # Route-level components (Home.tsx)
  utils/        # Axios instance with auth setup
  types/        # Shared TypeScript types
  store/        # Zustand stores (jobs/, recruiters/) — not yet implemented
```

## Shared library: @bka-stuff/mfe-utils

Imported by branch name (not semver) because it's actively developed. It provides:
- `RequireAuth` / `RequireGuest` — route guards
- `useUserStore` — user/auth state
- `ActionButton`, `Modal`, `Button`, `Label`, `Input`, `Select` — UI primitives

**Important**: Nothing currently in use will be removed or renamed without updating
this repo in the same pass. Treat its API as stable for anything already being used.

## Global types

`Obj` is a project-wide TypeScript alias for `Record<string, any>`, defined in `src/types/`. Use it freely — don't replace it with inline `Record<string, any>`.

## Patterns to follow

- **API layer**: Extend `BaseApi` for new resources. Don't reach into axios directly
  from components or hooks.
- **Data fetching**: All server state goes through React Query hooks in `src/hooks/`.
  Mutations should invalidate the relevant query cache.
- **Component folders**: Each feature gets its own folder under `components/` with a
  `.tsx` file and a co-located `styles.css`. Shared concerns go in `components/shared/`.
- **Styling**: Tailwind for layout/spacing, local `styles.css` for anything more
  specific. The `tw:` prefix is in use — keep it consistent.
- **Auth**: Use `RequireAuth` / `useUserStore` from mfe-utils. Don't roll custom auth.

If you notice an existing pattern, replicate it. If a pattern seems wrong, raise it
rather than silently diverging.

## Running the app

```bash
pnpm start    # Webpack dev server on port 3002
```

The Go backend must be running at `http://localhost:8080` for API calls to work.
There is no `.env` — the base URL is hardcoded in `utils/axios.ts`.

## Testing

No test setup exists yet. Don't add a testing framework without discussing it first.

## What to avoid

- Don't make broad unsupervised changes. Discuss the approach before implementing
  anything non-trivial.
- Don't install new dependencies without raising it first.
- Don't introduce a CSS strategy that conflicts with the existing Tailwind + local
  CSS approach.
- Don't implement the Zustand stores until there's a clear need — the empty `store/`
  directories are placeholders.
- Don't add error handling, fallbacks, or abstractions for scenarios that don't
  exist yet. Keep it simple and direct.
