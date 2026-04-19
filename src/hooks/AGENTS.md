# Hooks Patterns

Padroes para hooks em `src/hooks`.

## Escopo

- Colocar aqui hooks compartilhados de consumo de dados e logica de estado.
- Nao colocar componentes JSX nesta pasta.

## Convencoes

- Nome: `use-*.ts` para arquivo, `useXxx` para export.
- Preferir retorno tipado explicito para hooks publicos.
- Evitar side effects desnecessarios; usar `useEffect` apenas para sincronizacao real.

## Integracao atual

- `useTRPC`: wrapper de acesso ao contexto tRPC client.
- `useHomeMetrics`: busca `trpc.roast.getStats` e controla animacao dos numeros da home.

## Fronteiras

- Hooks que dependem de browser devem usar `"use client"` no arquivo.
- Hooks server-only nao devem ficar nesta pasta.
