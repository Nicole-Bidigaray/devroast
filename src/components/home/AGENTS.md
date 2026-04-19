# Home Feature Patterns

Padroes para componentes em `src/components/home`.

## Escopo

- Esta pasta contem blocos especificos da home.
- Reutilizaveis genericos devem ficar em `src/components/ui`.

## Metricas da home

- Fonte de dados: `trpc.roast.getStats`.
- Logica de dados/animacao fica em hook de `src/hooks`.
- Componente visual (`home-metrics.tsx`) deve focar somente em render.
- `2,847 codes roasted` e `avg score` devem vir da API (nao hardcoded).

## Loading e animacao

- Para as metricas da home, nao usar Suspense/skeleton.
- Iniciar em `0` e animar ate o valor carregado.
- Usar `@number-flow/react` para transicao numerica.
- Animacao de `codes roasted` deve ser perceptivelmente lenta.

## Editor de codigo (home)

- Limite de snippet: `2000` caracteres.
- Mostrar contador no canto inferior direito do editor.
- Enforce do limite no input (incluindo paste).
- Botao de roast deve respeitar estado do limite.
