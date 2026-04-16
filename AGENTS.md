# Project Guidelines

- Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, Biome.
- Package manager: `pnpm`.
- Node: use `nvm use` (`.nvmrc` = 22).
- Exports: always named exports, never default exports.
- UI scope: keep reusable primitives in `src/components/ui`; page-specific blocks go to feature/layout folders.
- API design: prefer simple props by default; use composition when it improves clarity in complex components.
- Styling: use Tailwind classes with tokens defined in `@theme` (`text-*`, `bg-*`, `border-*`).
- Fonts: `font-mono` for monospaced text, `font-sans` for regular text.
- Behavior: use Base UI primitives for interactive components when applicable.
- Quality gate: run `pnpm lint` and `pnpm build` before finishing changes.
- Process: document feature scope in `specs/` and align spec before implementation.
- Routing convention: roast result page uses `src/app/roast/[id]/page.tsx` (`/roast/:id`).
- Design workflow: when user references selected Pencil layout, use Pencil MCP as source of truth.
