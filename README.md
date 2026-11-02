# Ship, Captain & Crew

A browser-based implementation of the classic dice game **Ship, Captain & Crew**.

Built with React and Vite, styled with styled-components. Free and open source.

## Rules

Each player takes **three rolls per turn**.

The dice map to a nautical crew:

| Roll | Represents |
| ---- | ---------- |
| 6    | Ship       |
| 5    | Captain    |
| 4    | Crew       |

They must be earned **in order**: Ship first, then Captain, then Crew.

- You cannot keep a Captain until you have a Ship.
- You cannot keep a Crew until you have both a Ship and a Captain.
- Until you hold all three, you must reroll all dice — no dice may be set aside.
- Once you have Ship, Captain and Crew, the remaining two dice become your **Cargo**.
- Score is the sum of your two Cargo dice.
- You may spend remaining rolls trying for a higher Cargo value.
- Fail to collect all three within three rolls and your turn scores zero.

Play runs for **five rounds**. Highest total score wins.

## Development

```bash
pnpm install
pnpm dev
```

## License

Open source. See the repository for license details.
