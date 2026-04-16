# Specs Playbook

Objetivo: padronizar specs em `specs/` antes de implementar features.

## Regra principal

- Nao iniciar implementacao de feature nova sem spec aprovado.

## Nome do arquivo

- Preferir arquivo canonico por feature: `slug-da-feature.md`.
- Quando precisar snapshot historico, usar: `YYYY-MM-DD-slug-da-feature.md`.
- Slug curto, descritivo e em kebab-case.

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

## Fluxo recomendado

1. Criar/atualizar spec em `specs/`.
2. Alinhar e aprovar o spec.
3. Implementar somente o escopo aprovado.
4. Atualizar o spec se o escopo mudar.
5. Encerrar com checklist de validacao completo.
