# Repository Guide

## Layout

- `app/`: Next.js routes and page sections
- `components/`: shared UI and client interaction islands
- `constants/`: typed shared navigation, social, project, and technology definitions
- `content/`: editable portfolio data and SEO content
- `tests/`: Vitest contract and interaction tests
- `public/`: static images, icons, and animation data

## Development conventions

- Use pnpm only; the pinned package manager is pnpm 11.9.0.
- Prefer React Server Components. Add `"use client"` only to the smallest component that needs browser state, effects, event handlers, or a client-only library.
- Keep high-frequency pointer and animation values outside React state. Dynamically import heavy browser-only libraries only when their feature becomes active.
- Use the semantic Tailwind tokens in `styles/globals.css`; preserve existing responsive layout, focus states, and reduced-motion behavior.
- Treat JSON in `content/` as the source of truth. Canonical email and social identities belong in `content/personal.json`, not component-local arrays.
- Keep project stack spelling consistent and ensure local image paths exist under `public/`.
- Add or update contract and interaction tests for every behavior change. Verify effect cleanup for timers, listeners, and global DOM state.

## Required handoff gate

Run `pnpm check` and `git diff --check` before handing work to another contributor or agent. Do not hand off with a failing formatter, lint, typecheck, Knip, test, peer, audit, or build gate.
