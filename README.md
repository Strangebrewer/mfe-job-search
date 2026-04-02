# mfe-job-search

A React micro-frontend for personal job search tracking. Runs as part of a larger MFE ecosystem coordinated by a shell application that handles auth, the header, and the sidebar.

## Prerequisites

- All MFEs must be running before starting the shell
- Go backend running at `http://localhost:8080`

## Getting started

```bash
pnpm install
pnpm start   # dev server on port 3002
```

## stack

- React 18, TypeScript, React Router v7
- @tanstack/react-query, Axios
- Tailwind v4, date-fns
- Webpack (config via @bka-stuff/mfe-utils)

## Notes

- Shared UI and auth come from `@bka-stuff/mfe-utils` (imported by branch)
