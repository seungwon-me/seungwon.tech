# AGENTS.md

Content guidance for markdown files in `posts/`.

## Scope

- Applies only to `posts/*.md`.
- Root `AGENTS.md` still governs global repository workflow.

## Frontmatter Contract

- Required keys:
  - `title`
  - `date`
- Keep frontmatter at top of file wrapped by `---` fences.
- `date` format should stay `YYYY-MM-DD` as a quoted string.

## Filename Convention

- Use date-prefixed slugs: `YYYY-MM-DD-topic-name.md`.
- Keep slug lowercase with hyphens.
- Avoid renaming existing published files unless explicitly requested.

## Content Expectations

- Files are rendered through `src/lib/posts.ts` + remark pipeline.
- Standard markdown syntax is supported, including fenced code blocks.
- Keep heading structure readable (`h1` via title context, then `h2/h3` in body).

## Do Not

- Do not add custom frontmatter fields unless requested.
- Do not move files to `retrospectives/` without explicit instruction.
- Do not edit `src/lib 2/` to support content behavior.

## Workflow Tracking

- For non-trivial content work, plan and track progress in `tasks/todo.md`.
- If feedback uncovers a repeatable mistake, add a prevention rule to `tasks/lessons.md`.
- Keep content-specific details in this file; keep global process rules in root `AGENTS.md`.

## Validation

- After content updates, run:
  - `npm run lint`
  - `npm run build`
- If build fails due to markdown formatting/frontmatter issues, fix content file first.
