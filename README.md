# Chandresh Kumar Portfolio

A personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS. It presents work experience, selected projects, education, technologies, and contact links.

## Prerequisites

- Node.js 26.13.1 or newer in the 26 LTS line
- pnpm 11.9.0, the version required by `AGENTS.md`

## Local setup

```bash
nvm install
nvm use
# With pnpm already installed:
pnpm self-update 11.9.0
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

`NEXT_PUBLIC_RESUME_URL` is the only required environment variable. Set it to the public URL opened by the **View Resume** button. Never commit `.env.local`.

## Commands

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Start the Webpack development server            |
| `pnpm build`        | Create a production build                       |
| `pnpm start`        | Serve the production build                      |
| `pnpm test`         | Run Vitest once                                 |
| `pnpm test:watch`   | Run Vitest in watch mode                        |
| `pnpm lint`         | Run ESLint                                      |
| `pnpm typecheck`    | Check TypeScript without emitting files         |
| `pnpm knip`         | Find unused files, dependencies, and exports    |
| `pnpm format`       | Format supported source and documentation files |
| `pnpm format:check` | Verify formatting without writing               |
| `pnpm check`        | Run the complete handoff gate                   |

## Dependency updates

Use `pnpm outdated` to check releases and `pnpm update --latest` to upgrade, then run `pnpm check`. Review major-version migration guides and keep peer dependencies compatible. TypeScript stays on `~6.0.3` because typescript-eslint 8.74.0 requires TypeScript below 6.1; revisit this constraint when the linter supports TypeScript 7. pnpm stays at 11.9.0 to match `AGENTS.md`.

## Editing portfolio content

Structured content lives in `content/`. Update `personal.json` for canonical contact and social identities, `projects.json` for project cards, and the education/experience files for timeline entries. Project image paths must point to files under `public/`, project titles must remain unique, and stack labels must use the existing canonical spelling. Contract tests enforce these rules and ensure every visible filter has a matching project.

UI-wide navigation and social definitions live in `constants/`. Keep component-specific interaction state local to its client island.

## Testing and handoff

Run `pnpm test` while developing and `pnpm check` before handing off a change. CI performs a frozen install and the same full gate for pushes and pull requests targeting `main`.

## Deployment

The repository is configured for Vercel. Add `NEXT_PUBLIC_RESUME_URL` to the Vercel project environment, connect the repository, and deploy the Next.js project with the checked-in defaults. Production should use the canonical host configured in `content/seo.json`.
