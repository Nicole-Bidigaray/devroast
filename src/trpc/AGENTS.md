# tRPC - Patterns and Conventions

## Architecture

tRPC v11 + TanStack React Query v5 with full RSC integration. No superjson - Drizzle returns plain serializable objects.

```text
Server Component --prefetchQuery()--> appRouter (direct call, no HTTP)--> Drizzle -> PG
Client Component --useQuery()--> httpBatchLink -> /api/trpc/[trpc] --> appRouter--> Drizzle -> PG
```

## File Structure

```text
src/trpc/
  init.ts             # initTRPC, createTRPCContext, baseProcedure
  query-client.ts     # makeQueryClient factory (shared server/client)
  client.tsx          # "use client" - TRPCReactProvider, useTRPC
  server.tsx          # "server-only" - trpc proxy, getQueryClient, HydrateClient, caller
  routers/
    _app.ts           # Root appRouter (merges all sub-routers)
    metrics.ts        # Roast stats procedures (exports roastRouter)
```

## Adding a New Router

1. Create `src/trpc/routers/<domain>.ts`
2. Define procedures using `baseProcedure` from `../init`
3. Register in `_app.ts` via `createTRPCRouter({ ..., domain: domainRouter })`

```typescript
import { baseProcedure, createTRPCRouter } from "../init";

export const exampleRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(someTable);
  }),
});
```

## Adding a New Procedure

- Use `baseProcedure` for all procedures (no auth layer yet)
- Validate input with Zod: `.input(z.object({ ... }))`
- Access database via `ctx.db` (Drizzle client)
- Keep procedures thin - query logic lives in the procedure

## Server Components (Prefetch + Hydration)

Current pattern in this codebase uses `getQueryClient().prefetchQuery(...)` plus `<HydrateClient>`.

```typescript
// page.tsx (Server Component)
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.roast.getStats.queryOptions());

  return (
    <HydrateClient>
      <ClientComponent />
    </HydrateClient>
  );
}
```

```typescript
// client-component.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

function ClientComponent() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());
  return <div>{data?.totalRoasts ?? 0}</div>;
}
```

## Server-Only Data (No Hydration)

Use `caller` when data is consumed exclusively in the RSC and does not need to be available in client components (e.g. metadata).

```typescript
import { caller } from "@/trpc/server";

export async function generateMetadata() {
  const stats = await caller.roast.getStats();
  return { title: `${stats.totalRoasts} codes roasted` };
}
```

## Client Components (Direct Query)

When there is no server prefetch above, use `useQuery` directly. The query fires on mount and fetches via HTTP.

```typescript
"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

function Component() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.example.list.queryOptions());
}
```

## Conventions

- One router per domain - `roast.ts`, `leaderboard.ts`, etc.
- Current stats router file is `metrics.ts`, exporting `roastRouter`
- Flat procedures - no deep nesting (`trpc.roast.getStats`, not `trpc.roast.stats.get`)
- Parallel queries - when independent queries are needed, use `Promise.all()`
- Return parsed numbers - `avg()` returns string in SQL; use `Number.parseFloat()` before returning
- No superjson - Drizzle returns plain objects
- `staleTime: 30s` - default in `query-client.ts`

### Parallel queries example

```typescript
// GOOD - queries run concurrently
const [entries, [{ total }]] = await Promise.all([
  ctx.db.select().from(roasts).orderBy(asc(roasts.score)).limit(3),
  ctx.db.select({ total: count() }).from(roasts),
]);

// BAD - second query waits for first to finish
const entries = await ctx.db.select().from(roasts).limit(3);
const [{ total }] = await ctx.db.select({ total: count() }).from(roasts);
```
