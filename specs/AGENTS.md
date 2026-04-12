# Specs Playbook

Objetivo: padronizar como escrevemos specs em `specs/` antes de implementar features.

## Regra principal

- Toda feature nova com impacto funcional deve ter spec aprovado antes de codar.

## Nome do arquivo

- Formato: `YYYY-MM-DD-slug-da-feature.md`.
- Slug curto, descritivo e em kebab-case.
- Ex.: `2026-04-12-roast-result-page.md`.

## Estrutura obrigatoria

Use sempre este esqueleto:

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
  - <itens fora desta entrega>

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

## Secoes recomendadas (quando fizer sentido)

- `## Decisoes de design`
- `## Contratos e dados` (tipos, payloads, estados)
- `## Riscos e mitigacoes`
- `## Rollout` (feature flag, fallback, migracao)
- `## Perguntas em aberto`

## Padrao de qualidade da escrita

- Escreva para decisao e execucao, nao para narrativa longa.
- Cada requisito deve ser testavel e sem ambiguidade.
- Evite termos vagos: "rapido", "intuitivo", "melhor" sem metrica.
- Declare explicitamente o que nao sera feito agora.
- Se houver trade-off, documente a decisao e o por que.

## Checklist de aprovacao do spec

- [ ] Escopo `In/Out` esta claro
- [ ] Requisitos funcionais estao testaveis
- [ ] Criterios de aceitacao cobrem casos principais
- [ ] Riscos relevantes foram mapeados
- [ ] Plano de implementacao esta quebrado em passos
- [ ] Dependencias e impactos colaterais foram listados

## Fluxo recomendado

1. Criar o arquivo em `specs/`.
2. Alinhar e aprovar o spec.
3. Implementar seguindo o spec.
4. Atualizar o spec se o escopo mudar durante a execucao.
5. Encerrar com checklist de validacao completo.
