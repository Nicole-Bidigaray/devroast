# Editor com syntax highlight (estudo + especificacao)

## Contexto e objetivo

Queremos evoluir o `CodeInput` da homepage para um editor com:

1. highlight de sintaxe em tempo real,
2. deteccao automatica da linguagem ao colar/digitar,
3. opcao de selecao manual da linguagem,
4. experiencia visual proxima ao padrao do projeto (e inspirada no Ray.so).

Escopo deste documento: pesquisa tecnica, comparacao de opcoes e especificacao de implementacao (sem codar agora).

## Decisoes ja alinhadas

- Interacao do editor no v1: **so colar codigo e ver highlight** (sem recursos avancados como indent com Tab, autocomplete de brackets ou undo/redo customizado).
- Tema de syntax highlight no client: **manter `vesper`**, igual ao padrao atual de `CodeBlock`.
- Foco de linguagens para v1: **web + backend popular**.

---

## Benchmark: como o Ray.so faz hoje

Analise de codigo feita no repositorio `raycast/ray-so`.

Arquivos chave observados:

- `app/(navigation)/(code)/store/code.ts`
- `app/(navigation)/(code)/components/Editor.tsx`
- `app/(navigation)/(code)/components/HighlightedCode.tsx`
- `app/(navigation)/(code)/components/LanguageControl.tsx`
- `app/(navigation)/(code)/util/languages.ts`
- `app/(navigation)/(code)/code.tsx`

### Decisoes tecnicas do Ray.so

- Deteccao automatica: `highlight.js` com `highlightAuto(input, allowedLanguages)`.
- Renderizacao do highlight: `Shiki` (alta fidelidade visual) com `codeToHtml`.
- Controle manual de linguagem: combobox com opcao `Auto-Detect`.
- Fallback: quando nao detecta, usa `plaintext`.
- Carregamento de linguagens: lazy (`highlighter.loadLanguage`) quando necessario.
- Estrutura do editor: `textarea` real + camada de codigo destacado por baixo/tras (overlay visual).

### Por que esse desenho funciona

- `highlight.js` e bom em heuristica de deteccao.
- `Shiki` entrega tema e tokenizacao consistentes para output visual.
- Separar deteccao e render evita acoplamento e facilita fallback.

---

## Opcoes avaliadas

## 1) CodeMirror 6 (editor completo)

Pros:

- Editor robusto (selecao, atalhos, extensoes, history).
- Boa performance para textos grandes.
- Ecossistema forte para linguagem e UX.

Quando faz mais sentido: se o produto for virar um editor rico (atalhos avancados, multicursor, etc.).

## 2) Monaco Editor

Pros:

- UX tipo VS Code, recursos avancados nativos.
- Excelente para experiencia de coding pesada.

Quando faz mais sentido: se a meta e uma IDE no browser.

## 3) Textarea + Prism/Refractor

Pros:

- Simples de montar.
- Leve para casos basicos.

Quando faz mais sentido: MVP ultrarrapido sem necessidade de alta qualidade visual.

## 4) Textarea + highlight.js (deteccao) + Shiki (render)

Pros:

- Exatamente o padrao validado pelo Ray.so.
- Reaproveita dependencia ja presente (`shiki` ja esta no projeto).
- Bom equilibrio entre qualidade visual, controle e complexidade.
- Permite auto + manual de forma clara.

---

## Conclusao recomendada

Para o `devroast`, a melhor opcao para v1 e:

**Textarea overlay + `highlight.js` para detectar + `Shiki` para renderizar.**

Motivos:

- maximiza velocidade de entrega,
- minimiza risco tecnico,
- reaproveita stack existente,
- entrega UX muito proxima ao Ray.so sem importar um editor gigante.

---

## Especificacao funcional (v1)

### Requisitos

- Usuario cola codigo na homepage e visualiza o highlight.
- Sistema tenta detectar linguagem automaticamente.
- Usuario pode trocar para uma linguagem manualmente.
- Se usuario escolher manual, auto-detect pausa ate ele voltar para `Auto`.
- Mostrar linguagem ativa no UI (ex.: "TypeScript (auto)" ou "Python").
- Fallback seguro para `plaintext` quando deteccao for incerta.
- Nao implementar comportamentos avancados de edicao no v1 (editor rico fora de escopo).

### Lista de linguagens v1 (allowlist inicial)

- `javascript`
- `typescript`
- `tsx`
- `jsx`
- `json`
- `html`
- `css`
- `sql`
- `bash`
- `python`
- `java`
- `go`
- `csharp`
- `php`
- `ruby`
- `rust`

### Fluxo de estado

- `code`: conteudo atual do editor.
- `languageMode`: `"auto" | "manual"`.
- `detectedLanguage`: linguagem sugerida pela heuristica.
- `manualLanguage`: linguagem escolhida no seletor.
- `activeLanguage`:
  - `manualLanguage` quando `languageMode = manual`.
  - `detectedLanguage` quando `languageMode = auto`.

### Regras de deteccao

- Rodar deteccao com debounce (150-300ms) para reduzir custo por tecla.
- Re-detectar imediatamente em evento de paste.
- Definir limiar minimo para detectar (ex.: >= 20 caracteres ou >= 2 linhas).
- Se resultado estiver fora da allowlist, usar `plaintext`.
- Se confianca for baixa (heuristica), manter linguagem anterior ate novo sinal forte.

### Regras do seletor manual

- Primeira opcao do dropdown: `Auto detect`.
- Lista de linguagens em ordem alfabetica + busca.
- Ao selecionar linguagem especifica:
  - `languageMode = manual`.
  - congelar deteccao para nao sobrescrever escolha.
- Ao voltar para `Auto detect`:
  - `languageMode = auto`.
  - dispara deteccao com codigo atual.

### UX e acessibilidade

- Editor com `spellCheck={false}` e `font-mono`.
- Sincronizar scroll entre gutter e area de codigo (ja existe base em `CodeInput`).
- Dropdown de linguagem navegavel por teclado.
- Labels claras para leitor de tela (textarea + seletor).

### Performance

- Carregar apenas linguagens necessarias no boot + lazy load para demais.
- Memoizar highlight por `(code, activeLanguage, theme)`.
- Evitar re-highlight em mudancas irrelevantes de UI.
- Priorizar preload de `typescript`, `javascript`, `tsx`, `python` e `sql` por frequencia esperada.

---

## Mapa tecnico para implementar no projeto

Pontos atuais no repo:

- Entrada atual: `src/components/home/code-input.tsx` (textarea sem highlight).
- Preview server-side: `src/components/ui/code-block.tsx` (Shiki no server).
- Dependencia disponivel: `shiki` (ja instalada em `package.json`).

Direcao recomendada para arquitetura:

- Criar um componente client dedicado (ex.: `src/components/home/syntax-editor.tsx`).
- Internamente usar:
  - camada 1: textarea editavel,
  - camada 2: HTML highlighted sincronizado.
- Criar modulo de linguagens compartilhado (allowlist + labels).
- Manter API de props simples no inicio (sem over-composition).

---

## Riscos e mitigacoes

- Deteccao errada em snippet curto:
  - mitigacao: threshold minimo + fallback + seletor manual facil.
- Custo de highlight em codigo grande:
  - mitigacao: debounce + memo + limite de tamanho para realtime.
- Divergencia visual entre tema do app e highlight:
  - mitigacao: padronizar tema Shiki e tokens de cor usados no app.

---

## Plano de entrega sugerido

1. Estruturar estado (`auto/manual`, linguagem ativa, allowlist).
2. Implementar deteccao automatica com debounce.
3. Integrar highlight em overlay com Shiki.
4. Adicionar seletor manual de linguagem.
5. Ajustar UX (scroll sync, line numbers, loading state leve).
6. Validar desempenho e fallback em codigos reais.

---

## To-dos de implementacao

- [ ] Criar arquivo de linguagens v1 com allowlist (web + backend popular):
  - `javascript`, `typescript`, `tsx`, `jsx`, `json`, `html`, `css`, `sql`, `bash`, `python`, `java`, `go`, `csharp`, `php`, `ruby`, `rust`.
- [ ] Instalar dependencia de deteccao (`highlight.js`) e criar util de auto-detect com:
  - debounce de 150-300ms,
  - deteccao imediata no paste,
  - fallback para `plaintext`.
- [ ] Criar estado do editor com `code`, `languageMode`, `detectedLanguage`, `manualLanguage` e `activeLanguage`.
- [ ] Implementar `SyntaxEditor` client-side com arquitetura overlay:
  - camada de `textarea` para entrada,
  - camada de HTML highlighted com Shiki,
  - sincronizacao de scroll com gutter/line numbers.
- [ ] Fixar tema `vesper` no highlight do editor para manter consistencia com `CodeBlock`.
- [ ] Criar seletor de linguagem na homepage com:
  - opcao `Auto detect` como primeira opcao,
  - busca por linguagem,
  - modo manual que nao e sobrescrito pela deteccao.
- [ ] Integrar novo editor no lugar de `src/components/home/code-input.tsx`.
- [ ] Garantir requisitos de UX e acessibilidade:
  - `spellCheck={false}`,
  - navegacao por teclado no seletor,
  - labels claras para leitor de tela.
- [ ] Adicionar testes de comportamento:
  - auto-detect,
  - troca para manual,
  - retorno para auto,
  - fallback para `plaintext`.
- [ ] Validar qualidade final rodando `pnpm lint` e `pnpm build`.

---

## Ordem de execucao por PR

## PR1 - Fundacao do editor (estado + deteccao + linguagens)

- [ ] Criar modulo de linguagens v1 com allowlist e labels para UI.
- [ ] Instalar `highlight.js` e implementar util de auto-detect com fallback `plaintext`.
- [ ] Implementar estado do editor (`code`, `languageMode`, `detectedLanguage`, `manualLanguage`, `activeLanguage`).
- [ ] Cobrir regras de transicao de estado (manual nao sobrescrito por auto).

## PR2 - UI do editor com highlight (Shiki)

- [ ] Criar `SyntaxEditor` client-side com `textarea` + camada highlighted.
- [ ] Integrar Shiki no client e fixar tema `vesper`.
- [ ] Sincronizar scroll entre textarea, line numbers e camada highlighted.
- [ ] Garantir comportamento de paste e render em tempo real.

## PR3 - Seletor de linguagem + integracao homepage

- [ ] Criar seletor com `Auto detect` como primeira opcao e busca.
- [ ] Integrar seletor ao estado (`auto`/`manual`) e exibir linguagem ativa.
- [ ] Substituir `CodeInput` atual pelo novo editor na homepage.
- [ ] Validar responsividade desktop/mobile no layout existente.

## PR4 - Qualidade e validacao

- [ ] Implementar testes de comportamento (auto/manual/fallback).
- [ ] Validar acessibilidade (teclado, labels, leitura de estado).
- [ ] Revisar performance (debounce, memoizacao, custo de highlight).
- [ ] Rodar `pnpm lint` e `pnpm build` e corrigir pendencias.

---

## Definition of Done por PR

## PR1 DoD

- [ ] Modulo de linguagens v1 criado com allowlist definida nesta spec.
- [ ] Util de auto-detect implementado com `highlight.js` + fallback `plaintext`.
- [ ] Estado do editor implementado com `code`, `languageMode`, `detectedLanguage`, `manualLanguage`, `activeLanguage`.
- [ ] Regras de prioridade funcionando: modo manual nao e sobrescrito por auto.
- [ ] Escopo restrito a dominio/estado (sem acoplamento forte de UI nesta etapa).
- [ ] Sem regressao no escopo alterado.

## PR2 DoD

- [ ] `SyntaxEditor` client-side criado com arquitetura overlay (`textarea` + camada highlighted).
- [ ] Highlight funcionando com Shiki no tema `vesper`.
- [ ] Scroll sincronizado entre textarea, line numbers e camada highlighted.
- [ ] Paste e digitacao renderizam highlight em tempo real com debounce.
- [ ] Fallback visual para `plaintext` funcionando em cenarios de baixa confianca.
- [ ] Performance aceitavel em snippets comuns (sem travamento perceptivel).

## PR3 DoD

- [ ] Seletor de linguagem implementado com `Auto detect` como primeira opcao.
- [ ] Busca no seletor funcionando.
- [ ] Selecao manual trava auto-detect ate retorno para `Auto detect`.
- [ ] Linguagem ativa exibida corretamente (incluindo sufixo `(auto)` quando aplicavel).
- [ ] Homepage integrada com o novo editor no lugar do `CodeInput`.
- [ ] Layout validado em desktop e mobile sem quebra visual.

## PR4 DoD

- [ ] Testes cobrindo: auto-detect, override manual, retorno para auto e fallback `plaintext`.
- [ ] Acessibilidade minima validada: teclado, labels e semantica.
- [ ] Revisao de performance aplicada (memoizacao e controle de re-render).
- [ ] Documentacao da feature atualizada quando necessario.
- [ ] `pnpm lint` e `pnpm build` executados com sucesso.

---

## Perguntas em aberto (para alinhamento)

1. A escolha manual de linguagem deve persistir entre sessoes (localStorage) ou so na sessao atual?
2. Queremos expor essa escolha manual tambem em outras telas alem da homepage no v1?
