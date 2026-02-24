# AGENTS.md
Repository guide for coding agents working in `seungwon.tech`.

## Project Snapshot

- Framework: Next.js 15 (App Router) + React 19 + TypeScript.
- Content model: Markdown files in `posts/` and `retrospectives/`.
- Rendering pipeline: `gray-matter` + `remark` + `remark-html`.
- Main source roots: `src/app`, `src/components`, `src/lib`.
- There is a duplicate legacy-looking folder: `src/lib 2/`.
  - Prefer `src/lib/` unless the user explicitly asks otherwise.

## Canonical Commands

Use npm commands unless the user asks for another package manager.

### Dev / Build / Start / Lint

- `npm run dev`
  - Starts local dev server (`next dev`).
  - Defined in `package.json` -> `scripts.dev`.
- `npm run build`
  - Production build (`next build`).
  - Defined in `package.json` -> `scripts.build`.
- `npm run start`
  - Runs built app (`next start`).
  - Defined in `package.json` -> `scripts.start`.
- `npm run lint`
  - Runs ESLint (`eslint`).
  - Defined in `package.json` -> `scripts.lint`.

### Test / Single-Test Execution

- No test framework is currently configured.
- No `test` script exists in `package.json`.
- No `*.test.*`, `*.spec.*`, or `__tests__/` files exist.
- Result: there is currently no canonical single-test command.

### Typecheck

- No dedicated `typecheck` script exists.
- TypeScript config exists in `tsconfig.json` (`strict: true`, `noEmit: true`).
- In practice, type errors are surfaced during editor/LSP checks and `next build`.

## Configuration Sources

- ESLint: `eslint.config.mjs`
  - Extends `next/core-web-vitals` and `next/typescript`.
  - Ignores `.next/**`, `build/**`, `out/**`, `node_modules/**`.
- TypeScript: `tsconfig.json`
  - `strict: true`, `isolatedModules: true`, `moduleResolution: bundler`.
  - Path alias: `@/*` -> `./src/*`.
- Next.js: `next.config.ts`.

## Cursor / Copilot Rule Files

- No `.cursorrules` file found.
- No `.cursor/rules/` directory found.
- No `.github/copilot-instructions.md` file found.
- Do not assume hidden policy files; follow this document and repo configs.

## Code Style Conventions (Observed)

Follow existing style in nearby files before introducing new patterns.

### Imports

- Use `@/` alias for internal imports from `src/`.
- Keep framework imports (`next/*`, `react`) near the top.
- Use `import type` for type-only imports when appropriate.

### Quoting / Semicolons / General Formatting

- Codebase currently mixes single and double quotes.
  - Prefer matching the file you are editing.
- Semicolons are commonly used; preserve existing file rhythm.
- Use 2-space indentation in TS/TSX/CSS files.
- Keep JSX readable; break long props/objects across lines.

### React / Next Patterns

- Add `'use client';` for client components using hooks/events/browser APIs.
- App Router pages/layouts are default server components unless client behavior is required.
- Route files follow App Router conventions in `src/app/**`.
- Dynamic routes use `[slug]` folders.

### Types and Type Safety

- Keep strict typing; avoid `any` and unsafe assertions.
- Use local `type`/`interface` aliases for component props and data shapes.
- Use explicit unions for constrained values.
- Type React events and style objects where needed.

### Naming

- Components: PascalCase (`GlobalSearch`, `ArticleList`).
- Helpers/functions: camelCase (`getSortedPostsData`, `generateSiteMap`).
- Boolean state/predicates: `is*` prefix (`isOpen`, `isPostPage`).
- Event handlers: `handle*` prefix (`handleKeyDown`, `handleModeChange`).

### Styling

- Global styles in `src/app/globals.css`.
- Component-scoped styles often use CSS Modules (`*.module.css`).
- Some UI uses inline style objects (`React.CSSProperties`).
- Reuse existing CSS variables from `:root` before adding new tokens.

### Data / Content Access

- Markdown content is read from filesystem (`posts/`, `retrospectives/`).
- Shared content utilities are in `src/lib/posts.ts`.
- `cache()` from React is used for memoized data helpers.

### Error Handling

- Dynamic page loaders commonly wrap fetch/read logic in `try/catch`.
- On missing post data, call `notFound()` from `next/navigation`.
- For metadata generation failures, return safe fallback metadata.
- Avoid empty `catch` blocks.

## Agent Working Agreement

- Make focused changes; avoid unrelated refactors.
- Prefer existing utilities/patterns over introducing abstractions.
- Before finishing implementation work, run:
  - `npm run lint`
  - `npm run build` (for route/type/integration confidence)
- If a command is missing (tests/typecheck), state that explicitly.
- When adding new scripts or workflows, update this file in the same change.

## Workflow Orchestration

- Enter plan mode for any non-trivial task (3+ steps, cross-module impact, or architecture choices).
- If implementation gets stuck or behavior diverges, stop and re-plan before more edits.
- Use subagents for exploration and parallel analysis; assign one focused task per subagent.
- For non-trivial changes, prefer root-cause fixes over temporary patches.
- Before marking done, provide verification evidence (commands, outputs, and behavior checks).
- For bug reports, diagnose and fix autonomously instead of pushing context-switch work to the user.
- If the user corrects your approach, add the learned rule to `tasks/lessons.md`.

## Task Management Files

- Use `tasks/todo.md` for non-trivial implementation work:
  - Create checklist plan first.
  - Add an explicit plan validation checkpoint before implementation.
  - Mark progress during execution and add a review summary at the end.
- Use `tasks/lessons.md` to track repeatable lessons and prevention rules.
- Keep both files concise, concrete, and evidence-based.

## Known Repository Oddities

- `src/lib 2/posts.ts` appears to be an alternate/older implementation.
- Active imports point to `@/lib/posts` (the `src/lib/` version).

## Quick File Map

- App shell: `src/app/layout.tsx`, `src/app/globals.css`
- Dynamic post pages: `src/app/posts/[slug]/page.tsx`, `src/app/retrospectives/[slug]/page.tsx`
- Shared content loader: `src/lib/posts.ts`

## Hierarchy

- Root guidance: `AGENTS.md`
- Route and page-specific guidance: `src/app/AGENTS.md`
- Markdown content guidance: `posts/AGENTS.md`
- Workflow tracking files: `tasks/todo.md`, `tasks/lessons.md`

## Maintenance Rule

If you discover new authoritative conventions (CI checks, test runner, formatter, Cursor/Copilot policy files), update `AGENTS.md` immediately so future agents inherit correct behavior.
