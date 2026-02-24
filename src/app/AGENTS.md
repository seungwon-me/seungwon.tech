# AGENTS.md

Route-level guidance for files under `src/app/`.

## Scope

- This file applies to App Router pages, layouts, and route handlers under `src/app/**`.
- Follow root `AGENTS.md` for global commands and code style.

## Route Structure

- Root layout: `src/app/layout.tsx`
- Home route: `src/app/page.tsx`
- Index routes: `src/app/articles/page.tsx`, `src/app/retrospectives/page.tsx`
- Dynamic routes: `src/app/posts/[slug]/page.tsx`, `src/app/retrospectives/[slug]/page.tsx`
- Non-page route: `src/app/sitemap.xml/route.ts`

## Data Access Rules

- Use only `@/lib/posts` for content access.
- Do not add imports from `src/lib 2/`.
- For lists, use `getSortedPostsData('posts' | 'retrospectives')`.
- For dynamic pages, use `getAllPostIds(type)` + `getPostData(type, slug)`.

## Dynamic Route Conventions

- Keep `generateStaticParams` in each `[slug]` route.
- Keep `generateMetadata` resilient; return fallback metadata on failure.
- On missing content in page rendering, call `notFound()`.
- Preserve current JSON-LD injection pattern and sanitize description text before metadata usage.

## Rendering Boundaries

- App route files are server components by default.
- Add `'use client';` only when hooks/events/browser APIs are required.
- Keep interactive UI logic in `src/components/` and keep route files orchestration-focused.

## Sitemap Route Notes

- `src/app/sitemap.xml/route.ts` is manually generated XML.
- Keep `content-type: application/xml` and cache headers aligned with current behavior.
- If routes/content types change, update both static entries and generated loops.

## Workflow Tracking

- For non-trivial route work, create/update checklist items in `tasks/todo.md`.
- If user correction or review feedback reveals a repeated mistake, log it in `tasks/lessons.md`.
- Use this file for route-specific checks and root `AGENTS.md` for global orchestration policy.

## Change Checklist (App Routes)

- Confirm imports still point to `@/lib/posts`.
- For new dynamic routes, add static params + metadata handling.
- Run `npm run lint` and `npm run build` after route changes.
