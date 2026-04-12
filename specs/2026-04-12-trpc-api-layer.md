# tRPC como camada de API no Next.js App Router

## Contexto

Hoje o projeto nao tem uma camada de API tipada entre UI e back-end.
As paginas usam dados estaticos e ainda nao existe um contrato unico para query/mutation.
Queremos adotar tRPC com TanStack Query, mantendo compatibilidade com SSR/RSC no Next.js.

## Objetivo

Implementar uma base de tRPC para o DevRoast, integrada ao App Router, com suporte a:

- Client Components via TanStack React Query
- Server Components com prefetch + hydration
- Caller server-side para uso direto em RSC quando necessario

## Escopo

- In:
  - Setup de tRPC server/client no projeto Next.js
  - Endpoint HTTP em `/api/trpc/[trpc]`
  - `appRouter` inicial e procedures de exemplo para leituras
  - Integracao com SSR/RSC seguindo docs oficiais
  - Estrutura para evoluir para dados reais via Drizzle
- Out:
  - Autenticacao/autorizacao
  - Rate limit/caching distribuido
  - Refactor completo de todas as paginas para tRPC nesta primeira entrega
  - Implementacao final de regras de negocio da IA

## Decisoes de design

- Usar stack oficial recomendada:
  - `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`, `@tanstack/react-query`
- Manter `appRouter` no servidor e exportar apenas `type AppRouter` para o client.
- Criar `QueryClient` por request no servidor e singleton no browser.
- RSC strategy:
  - `prefetch` em Server Component + `HydrationBoundary` para Client Components
  - `caller` para leitura direta em Server Component quando nao houver necessidade de hidratar cache
- Preparar contexto tRPC com acesso ao `db` (Drizzle) e metadados de request.

## Estrutura proposta

```text
src/
  trpc/
    init.ts
    query-client.ts
    client.tsx
    server.tsx
    routers/
      _app.ts
      roast.ts
      leaderboard.ts
  app/
    api/
      trpc/
        [trpc]/route.ts
```

## Requisitos funcionais

- [ ] RF-01: criar inicializacao tRPC em `src/trpc/init.ts` com helpers (`createTRPCRouter`, `baseProcedure`, `createCallerFactory`, `createTRPCContext`).
- [ ] RF-02: criar `appRouter` em `src/trpc/routers/_app.ts` com composition de sub-routers (`roast`, `leaderboard`).
- [ ] RF-03: expor handler HTTP em `src/app/api/trpc/[trpc]/route.ts` com `fetchRequestHandler` para GET/POST.
- [ ] RF-04: criar provider client em `src/trpc/client.tsx` usando `createTRPCContext`, `QueryClientProvider` e `TRPCProvider`.
- [ ] RF-05: montar provider no layout raiz para habilitar hooks/client query options.
- [ ] RF-06: criar suporte SSR/RSC em `src/trpc/server.tsx` com:
  - `getQueryClient` (cache por request)
  - `trpc` options proxy para queryOptions
  - helper `prefetch(...)`
  - helper `HydrateClient`
  - `caller` para uso server-side direto
- [ ] RF-07: criar procedures de leitura iniciais (podem retornar estatico nesta fase):
  - `roast.byId`
  - `leaderboard.top`
  - `health.check`
- [ ] RF-08: integrar ao menos 1 fluxo real de tela com prefetch RSC + consumo em Client Component.

## Requisitos nao funcionais

- [ ] RNF-01: nao importar codigo server-only em Client Components.
- [ ] RNF-02: evitar vazamento de cache entre requests (novo QueryClient por request no server).
- [ ] RNF-03: definir `staleTime` padrao > 0 para evitar refetch imediato apos hydrate.
- [ ] RNF-04: tipagem fim-a-fim sem `any` nos contratos publicos do router.
- [ ] RNF-05: manter padrao do projeto (named exports, TypeScript estrito, estilo de pastas atual).

## Criterios de aceitacao

- Rota `/api/trpc/[trpc]` responde chamadas de procedures com tipagem correta.
- Uma pagina App Router usa prefetch server-side + hydration e renderiza sem erro de hidratacao.
- Uma chamada via `caller` funciona em Server Component sem depender do cache cliente.
- `pnpm lint` e `pnpm build` passam sem erros.
- Nao ha import trace de `server-only` em bundles client.

## Plano de implementacao

- Passo 1: adicionar dependencias tRPC/TanStack e criar estrutura `src/trpc/*`.
- Passo 2: implementar `init.ts`, routers base e endpoint `/api/trpc/[trpc]`.
- Passo 3: implementar `query-client.ts` com defaults para SSR/hydration.
- Passo 4: implementar provider client e montar no `src/app/layout.tsx`.
- Passo 5: implementar `server.tsx` com `trpc`, `prefetch`, `HydrateClient` e `caller`.
- Passo 6: integrar uma tela piloto (ex.: leaderboard ou roast/[id]).
- Passo 7: validar comportamento e ajustar logs/erros.

## Contratos e dados (v1)

- `health.check`: retorna `{ ok: true, now: string }`.
- `leaderboard.top`: retorna lista de itens (estatico no v1).
- `roast.byId`: recebe `{ id: string }` (UUID) e retorna payload do roast (estatico no v1).

## Riscos e mitigacoes

- Risco: duplicar fetch no server e client por configuracao incorreta.
  - Mitigacao: usar `prefetch + HydrationBoundary` e `staleTime` > 0.
- Risco: cache compartilhado entre usuarios no server.
  - Mitigacao: `getQueryClient = cache(makeQueryClient)` por request.
- Risco: acoplamento indevido de componentes server/client.
  - Mitigacao: separar `trpc/server.tsx` (server-only) e `trpc/client.tsx` (use client).

## Referencias

- https://trpc.io/docs/client/tanstack-react-query/setup
- https://trpc.io/docs/client/tanstack-react-query/server-components

## Testes e validacao

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] Teste manual de endpoint `health.check`
- [ ] Teste manual de prefetch RSC + hydration em pagina piloto
- [ ] Teste manual de `caller` em Server Component
