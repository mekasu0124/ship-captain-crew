# AGENTS.md

Guidance for AI agents working in this repository.

## What this is

A real-time, multiplayer implementation of the dice game **Ship, Captain &
Crew**. Rules live in [`README.md`](./README.md) — treat them as the spec.

## Layout

```
frontend/   Vite + React client
backend/    FastAPI game server
```

Both halves are first-class. Do not move game rules into one and leave the
other behind — `frontend/src/game/dice.js` and `backend/app/game/dice.py`
mirror each other and must stay in agreement.

## Frontend

- **Vite** — build tool and dev server
- **React 19** — function components and hooks only, no class components
- **styled-components** — all styling. No CSS files, no Tailwind
- **pnpm** — the only package manager used here. Never run `npm`/`yarn`

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:5173
pnpm build
pnpm lint       # oxlint
```

**Components** — one component per file, PascalCase filenames matching the
export. Colocate a component's styled primitives in the same file unless shared.

**Styling** — define styled components at module scope, never inside render.
Use the CSS custom properties declared in `GlobalStyle` (`--navy`, `--deep`,
`--sea`, `--foam`, `--brass`, `--bone`, `--ink`) rather than hardcoded hex.

**Game logic** — pure and separate from components under `src/game/`.
Never call `Math.random()` in a component; pass in an rng.

## Backend

- **FastAPI** + **uvicorn**
- **uv** for environments and dependencies
- **pytest** for tests

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload   # http://127.0.0.1:8000
uv run pytest
```

**Rules live in `app/game/`** and stay pure — no FastAPI, no I/O, no global
state. Routes and transport live in `app/api/`.

## Authority

The server is the source of truth for anything a player could cheat:

| Data | Owner |
| --- | --- |
| Dice rolls | **Server** — this is a luck game; a client that rolls can re-roll |
| Match state, scores | **Server** |
| Wins and stats | **Server** |
| Account identity | **Server-issued** |
| Name, avatar | Local-first, server reconciles |

The local IndexedDB account is a **cache**, not an authority. Never describe it
in UI copy as anything more than "this browser".

## Storage

All client persistence goes through `frontend/src/storage/db.js`. IndexedDB
only: no network there, no `localStorage` fallback.

## Branching

`main` deploys to production via Vercel — which serves the **frontend only**.
The Vercel project root must be set to `frontend`.

All work happens on `dev`.

```
dev  →  pull request  →  main
```

Never commit directly to `main`.

## Changelog

Record user-facing changes in [`CHANGELOG.md`](./CHANGELOG.md) under
`## [Unreleased]`. Keep a Changelog format, SemVer-ish grouping:
`Added`, `Changed`, `Fixed`, `Removed`.
