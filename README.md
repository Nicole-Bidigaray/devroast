# devroast

O **devroast** e um app web para colar trechos de codigo e receber uma analise em tom de roast.

Este projeto esta sendo construido durante o **NLW (Next Level Week) da Rocketseat**, acompanhando as aulas do evento e evoluindo tela por tela.

## Funcionalidades atuais

- homepage com area para colar codigo
- toggle de roast mode
- preview de leaderboard
- biblioteca de componentes em `/components`

## Stack do frontend

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Biome (lint/format)

## Pre-requisitos

- Node.js 22
- pnpm
- nvm (recomendado)

## Instalacao

1. Clone o repositorio:

```bash
git clone <url-do-repo>
cd devroast
```

2. Use a versao correta do Node:

```bash
nvm use
```

3. Instale as dependencias:

```bash
pnpm install
```

## Configuracao

No estado atual, o frontend nao exige variaveis de ambiente para rodar localmente.

Quando houver integracao com API, as variaveis necessarias serao documentadas aqui.

## Rodando o frontend

### Desenvolvimento

```bash
pnpm dev
```

App disponivel em `http://localhost:3000`.

### Desenvolvimento estavel (WSL/pastas em /mnt/c)

Se o hot reload nao atualizar corretamente, use:

```bash
pnpm run dev:stable
```

### Build de producao

```bash
pnpm build
pnpm start
```

## Qualidade de codigo

```bash
pnpm lint
pnpm format
```

## Rotas principais

- `/` homepage
- `/components` showcase da component library
