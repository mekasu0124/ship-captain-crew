# AGENTS.md

Guidance for AI agents working in this repository.

## What this is

A browser implementation of the dice game **Ship, Captain & Crew**.
Rules live in [`README.md`](./README.md) — treat them as the spec.

## Stack

- **Vite** — build tool and dev server
- **React 19** — function components + hooks only, no class components
- **styled-components** — all styling. No CSS files, no Tailwind
- **pnpm** — the only package manager used here. Never run `npm`/`yarn`

## Commands

```bash
pnpm install      # install deps
pnpm dev          # dev server
pnpm build        # production build
pnpm lint         # oxlint
```

Run `pnpm build` and `pnpm lint` before claiming work is done.

## Conventions

**Components** — one component per file, PascalCase filenames matching the export.
Colocate a component's styled primitives in the same file unless they're shared.

**Styling** — define styled components at module scope, never inside render.
Use the CSS custom properties declared in `GlobalStyle` (`--navy`, `--deep`,
`--sea`, `--foam`, `--parchment`) rather than hardcoded hex values.

**Game logic** — keep it pure and separate from components under `src/game/`.
Dice, turns, and scoring are plain functions so they can be tested without a DOM.
Never call `Math.random()` directly in a component; pass in a dice roller.

## Branching

`main` deploys to production via Vercel. All work happens on `dev`.

```
dev  →  pull request  →  main
```

Never commit directly to `main`.

## Changelog

Record user-facing changes in [`CHANGELOG.md`](./CHANGELOG.md) under
`## [Unreleased]`. Keep a Changelog format, SemVer-ish grouping:
`Added`, `Changed`, `Fixed`, `Removed`.
