# tRPC Patterns

Padroes para arquivos em `src/trpc`.

## Estrutura

- `init.ts`: inicializacao do tRPC e contexto.
- `routers/_app.ts`: composicao dos subrouters.
- `routers/*`: routers por dominio.
- `client.tsx` e `server.tsx`: separacao explicita client/server.

## Contexto e dados

- Contexto tRPC deve expor `db` para procedures server-side.
- Procedures devem priorizar leitura real via Drizzle quando o escopo pedir dados reais.

## Convencoes desta codebase

- Home metrics usa `trpc.roast.getStats`.
- Endpoint deve continuar em `/api/trpc/[trpc]`.
- Nao adicionar endpoints extras fora do escopo aprovado no spec.

## Integracao com Next App Router

- Prefetch em Server Component e hidratacao no client quando necessario.
- Hooks de consumo ficam em `src/hooks` (nao dentro de `src/trpc`).
