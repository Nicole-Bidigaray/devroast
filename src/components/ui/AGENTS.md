# UI Component Patterns

Este arquivo define os padroes para novos componentes em `src/components/ui`.

## 1) Exportacao

- Use **named exports** sempre.
- Nunca use `export default`.
- Exporte no barrel `src/components/ui/index.ts`.

## 2) TypeScript

- Tipar props explicitamente.
- Para componentes HTML nativos, estender as props nativas.
- Exemplo para botao:

```ts
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;
```

## 3) Tailwind Variants

- Quando usar `tailwind-variants`, **nao usar `twMerge` junto**.
- Passar `className` direto no factory de variants:

```ts
className={buttonVariants({ variant, size, className })}
```

- Use `tailwind-merge` apenas em componentes sem `tv()` quando realmente precisar compor classes condicionais.

## 4) Tokens e classes canonicas

- Defina cores no `@theme` usando `--color-*`.
- Use utilitarios do Tailwind diretamente:
  - `text-token`
  - `bg-token`
  - `border-token`
  - `divide-token`
- Evite `text-(--token)` e `text-[var(--token)]`.
- Quando o token representar uma cor nativa do Tailwind, prefira a classe nativa.
  - Exemplo: prefira `text-white`.

## 5) Tipografia

- Use as familias padrao do Tailwind:
  - `font-mono` para texto monospaced
  - `font-sans` para texto tradicional
- Nao criar utilitarios customizados como `font-primary` e `font-secondary`.

## 6) Estrutura de componente

- Componente pequeno, focado e reutilizavel.
- Sem regra de negocio de pagina dentro de UI generica.
- Componentes especificos de pagina (ex.: navbar de uma unica tela) nao devem ficar em `components/ui`.
- Use pattern de composicao apenas quando agregar clareza real de uso. Neste projeto, aplicamos composicao em `AnalysisCard` e `LeaderboardRow`.
- Variantes devem cobrir estados visuais principais (tamanho, estilo, estado).

## 7) Componentes com comportamento

- Para comportamento interativo, usar primitivos do Base UI (`@base-ui/react`).
- Exemplo: toggles/switches devem usar `Switch.Root` e `Switch.Thumb`.
- Quando componente usar eventos/estado do browser, marcar arquivo com `"use client"`.
- Em `Toggle`, manter `id` estavel para evitar hydration mismatch.
- Se `nativeButton` estiver `true` no `Switch.Root`, garantir `render={<button type="button" />}` (ou equivalente) para preservar semantica nativa.

## 8) Code Block

- `CodeBlock` deve ser Server Component.
- Use `shiki` com tema `vesper`.
- Adicionar `import "server-only"` no componente.
- Receber `code` e `language` como props, evitando JSX linha-a-linha.
- `CodeBlock` deve ser reaproveitavel: nao incluir header visual fixo (bolinhas/macOS/nome de arquivo) dentro do componente.
- Quando precisar header de arquivo, montar esse chrome no local de uso.

## 9) Checklist antes de finalizar

1. Rodar `pnpm lint`
2. Conferir se nao tem `default export`
3. Conferir se o componente esta exportado no `index.ts`
4. Conferir se usa tokens/classes canonicas
5. Conferir se usa `font-mono` ou `font-sans`

## 10) Exemplos de uso

### AnalysisCard (composicao)

```tsx
import {
  AnalysisCardContent,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
  StatusBadge,
} from "@/components/ui";

<AnalysisCardRoot>
  <AnalysisCardContent>
    <StatusBadge label="critical" size="sm" tone="critical" />
    <AnalysisCardTitle>using var instead of const/let</AnalysisCardTitle>
    <AnalysisCardDescription>
      the var keyword is function-scoped rather than block-scoped.
    </AnalysisCardDescription>
  </AnalysisCardContent>
</AnalysisCardRoot>;
```

### LeaderboardRow (composicao)

```tsx
import {
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowRoot,
  LeaderboardRowScore,
} from "@/components/ui";

<LeaderboardRowRoot>
  <LeaderboardRowRank>#1</LeaderboardRowRank>
  <LeaderboardRowScore>2.1</LeaderboardRowScore>
  <LeaderboardRowCode>
    function calculateTotal(items) {`{`} var total = 0; ...
  </LeaderboardRowCode>
  <LeaderboardRowLang>javascript</LeaderboardRowLang>
</LeaderboardRowRoot>;
```

### Anti-exemplo

- Evite transformar todo componente em composicao sem necessidade.
- Neste projeto, manter composicao somente em `AnalysisCard` e `LeaderboardRow`.
