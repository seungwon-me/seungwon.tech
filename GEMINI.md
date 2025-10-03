# Project Overview

This is a personal blog website built with Next.js, React, and TypeScript. The content is written in Markdown and stored in the `posts` and `retrospectives` directories. The blog posts are dynamically rendered from these Markdown files.

The project uses `gray-matter` to parse the frontmatter of the Markdown files and `remark` to convert the Markdown content to HTML.

# Building and Running

To get the development server running, use the following command:

```bash
npm run dev
```

To create a production build, use:

```bash
npm run build
```

To start the production server, use:

```bash
npm run start
```

To run the linter, use:

```bash
npm run lint
```

# Development Conventions

*   **Content:** New blog posts should be created as `.md` files in the `posts` directory. Retrospectives should be created in the `retrospectives` directory.
*   **Frontmatter:** Each Markdown file should have a frontmatter section with at least a `title` and a `date`.
*   **Styling:** The project uses CSS Modules for styling. The styles are located in the `src/components` directory alongside the components.
*   **Components:** Reusable components are located in the `src/components` directory.
*   **Linting:** The project uses ESLint for linting. Please run `npm run lint` before committing changes.
