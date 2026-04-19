# DevRoast - Project Guidelines

## Stack

- Framework: Next.js 16 (App Router, React Compiler, Turbopack)
- API layer: tRPC v11 + TanStack React Query v5 (see `src/trpc/AGENTS.md`)
- Database: Drizzle ORM + PostgreSQL 16 (Docker Compose)
- Validation: Zod
- Styling: Tailwind CSS v4 with `@theme` variables, `tailwind-variants` for component variants
- Linting: Biome 2.4 (formatter + linter, `tailwindDirectives: true`)
- Package manager: `pnpm`
- Language: TypeScript (`strict`)

## Conventions

- Language: Portuguese for communication, English for code
- Exports: always named exports. Never `export default` (except Next.js pages)
- Components: extend native HTML props via `ComponentProps<"element">`. Use `tv()` for variants. Use composition pattern (sub-components) for complex components with 2+ content areas
- Class merging: use `tv({ className })` for components with variants. Use `twMerge()` for components without variants. Never string interpolation
- Colors: define in `@theme` block (`--color-*`) and consume as canonical Tailwind classes (`bg-accent-green`, not `bg-(--color-accent-green)`). Exception: SVG attributes use `var(--color-*)`
- Fonts: `font-sans` (system) and `font-mono` (JetBrains Mono) only. No custom font classes
- Buttons: use `enabled:hover:` and `enabled:active:` prefixes to prevent hover styles when disabled

## Project Structure

```text
specs/                # Feature specs written before implementation (see specs/AGENTS.md)
src/
  app/                # Next.js App Router pages and layouts
    api/trpc/         # tRPC HTTP handler (catch-all route)
  components/         # Feature-level components (navbar, code-editor, etc.)
    ui/               # Reusable UI primitives (see src/components/ui/AGENTS.md)
  db/                 # Drizzle ORM schema, client, and seed
  trpc/               # tRPC infrastructure (see src/trpc/AGENTS.md)
    routers/          # tRPC routers (one file per domain)
  hooks/              # Custom React hooks
  lib/                # Shared utilities and constants
```

## Data Fetching

- Server Components: use `prefetch()` + `<HydrateClient>` to prefetch tRPC queries on the server and hydrate to client components. Import from `@/trpc/server`
- Client Components: use `useQuery()` / `useSuspenseQuery()` with `trpc.router.procedure.queryOptions()`. Import `useTRPC` from `@/trpc/client` (or local wrapper in `@/hooks/use-trpc`)
- Server-only data: use `caller` from `@/trpc/server` for data consumed exclusively in RSC (e.g. dynamic metadata)
- Animated numbers: use `@number-flow/react` (`<NumberFlow>`) for numeric values that transition from `0` to loaded value. Prefer `useQuery` + `0` initial state over Suspense/skeleton for these cases
- Loading states: prefer `useQuery` + NumberFlow (`0 -> value` animation) for numeric stats. Use Suspense + skeleton components for content-heavy sections (lists, cards, etc.)

## Key Decisions

- `CodeBlock` is an async React Server Component using `shiki` with `vesper` theme
- `Toggle` uses `@base-ui/react` `Switch` primitive for accessibility
- `ScoreRing` has a single fixed size (`180px`)
- Biome config includes `noUnknownAtRules` ignore list for Tailwind directives (`@theme`, `@apply`, `@utility`)
- tRPC context exposes `db` (Drizzle client); no `superjson` required for current payloads
- Feature specs must be written in `specs/` before implementing new features
