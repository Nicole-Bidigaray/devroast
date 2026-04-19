# App Router Patterns

Padroes para rotas e paginas em `src/app`.

## Rotas

- Resultado de roast: `roast/[id]/page.tsx` com parametro UUID.
- Leaderboard: `leaderboard/page.tsx`.

## SSR e indexacao

- Usar SSR em paginas que precisam indexacao/SEO.
- Validar parametros dinamicos e usar `notFound()` quando invalido.

## Integracao de dados

- Preferir prefetch em Server Component quando fizer sentido.
- Hidratar no client apenas onde houver interacao necessaria.

## Convencoes atuais

- Home prefetch: `trpc.roast.getStats.queryOptions()`.
- Metricas animadas da home sao renderizadas no client sem suspense/skeleton.
