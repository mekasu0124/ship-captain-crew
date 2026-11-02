# Ship, Captain & Crew

A real-time, multiplayer implementation of the dice game **Ship, Captain & Crew**.

Free and open source.

## Layout

```
frontend/   Vite + React client (styled-components)
backend/    FastAPI game server
```

## Rules

Each player takes **three rolls per turn**.

| Roll | Represents |
| ---- | ---------- |
| 6    | Ship       |
| 5    | Captain    |
| 4    | Crew       |

They must be earned **in order**: Ship, then Captain, then Crew.

- You cannot keep a Captain until you have a Ship.
- You cannot keep a Crew until you have both a Ship and a Captain.
- Until you hold all three, you must reroll all dice — no dice may be set aside.
- Once you have Ship, Captain and Crew, the remaining two dice become **Cargo**.
- Score is the sum of your two Cargo dice.
- You may spend remaining rolls trying for a higher Cargo value.
- Fail to collect all three within three rolls and your turn scores zero.

Play runs for **five rounds**. Highest total score wins.

## Development

The client and server run side by side. The Vite dev server proxies `/api` to
the backend, so the frontend needs no host configuration.

```bash
# terminal 1 — backend
cd backend
uv sync
uv run uvicorn app.main:app --reload

# terminal 2 — frontend
cd frontend
pnpm install
pnpm dev
```

- Frontend: http://localhost:5173
- API docs: http://127.0.0.1:8000/docs

## Tests

```bash
cd backend && uv run pytest
cd frontend && pnpm lint
```

## License

Open source. See the repository for license details.
