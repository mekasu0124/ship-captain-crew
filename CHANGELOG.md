# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Local-only captain accounts persisted to IndexedDB (`src/storage/db.js`).
  No server, no sync, nothing leaves the device.
- Welcome screen gates on the saved captain: first run asks for a name, later
  runs greet the returning captain.
- "Sign out and clear this captain" action to wipe the local record.
- `NOTES.md` — parked work and open questions.
- Pure game logic in `src/game/dice.js`: dice rolling, the strict rank ladder
  (`nextRank`), glyph assignment (`assignMarks`), and cargo scoring.
- Ship, Captain and Crew glyphs carved into the 6, 5 and 4 faces.
- Temporary roll demo on the landing page with roll and claim controls.
- Welcome page with game title, the three-ranks ladder (Ship 6, Captain 5,
  Crew 4), key facts, and a collapsible "How to play" panel.
- `Die` component rendering pip faces from 1 to 6.
- Shared design tokens and global styles in `src/styles/GlobalStyle.js`.
- `README.md` — project overview, game rules, and development instructions.
- `AGENTS.md` — contribution and coding conventions for AI agents.
- `CHANGELOG.md` — this file.
- Vite + React project scaffold with styled-components.

### Fixed

- Pips 1, 2 and 3 rendered at zero width; `place-items: center` on the die face
  collapsed the grid cells to content width.
