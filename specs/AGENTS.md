# Specs Playbook

Objetivo: padronizar specs em `specs/` antes de implementar features.

## Regra principal

- Nao iniciar implementacao de feature nova sem spec aprovado.

## Nome do arquivo

- Preferir arquivo canonico por feature: `slug-da-feature.md`.
- Quando precisar snapshot historico, usar: `YYYY-MM-DD-slug-da-feature.md`.
- Slug curto, descritivo e em kebab-case.
- Evitar manter duas versoes ativas da mesma spec; manter 1 fonte de verdade.

## Estrutura obrigatoria

```md
# <titulo da feature>

## Contexto
<problema atual, dor, oportunidade>

## Objetivo
<resultado de produto esperado>

## Escopo
- In:
  - <itens que entram>
- Out:
  - <itens que nao entram agora>

## Requisitos funcionais
- [ ] <RF-01: comportamento verificavel>
- [ ] <RF-02: comportamento verificavel>

## Requisitos nao funcionais
- [ ] <RNF-01: performance, a11y, seguranca, SEO, etc>

## Criterios de aceitacao
- <cenario verificavel 1>
- <cenario verificavel 2>

## Plano de implementacao
- <passo 1>
- <passo 2>

## Testes e validacao
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] <testes especificos da feature>
```

## Secoes recomendadas

- `## Decisoes de design`
- `## Contratos e dados`
- `## Riscos e mitigacoes`
- `## Rollout`
- `## Perguntas em aberto`

## Padrao de escrita

- Texto curto, objetivo e verificavel.
- Requisito sempre testavel e sem ambiguidade.
- Evitar termos vagos sem metrica.
- Declarar claramente o que fica fora desta entrega.
- Registrar trade-offs e justificativa.

## Regras desta codebase

- Em implementacao incremental, o spec deve explicitar o recorte da fase atual.
- Para integracoes externas (ex.: tRPC, Next RSC), incluir links oficiais em `## Referencias`.
- Quando houver tela baseada em design (ex.: Pencil), descrever no spec o alvo visual e limites de implementacao (dados estaticos, SSR, etc.).
- Quando houver rota dinamica, declarar formato de parametro (ex.: UUID) e comportamento de erro.
- Se houver carregamento animado no frontend, especificar estrategia de loading (ex.: sem suspense/skeleton, iniciar em 0 e animar).

## Fluxo recomendado

1. Criar/atualizar spec em `specs/`.
2. Alinhar e aprovar o spec.
3. Implementar somente o escopo aprovado.
4. Atualizar o spec se o escopo mudar.
5. Encerrar com checklist de validacao completo.

## Estado atual relevante

- Spec canonica de tRPC: `specs/trpc.md`.
- Specs antigas datadas podem ser removidas quando a versao canonica estiver atualizada.
