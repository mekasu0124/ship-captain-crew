# Notes

Scratchpad for work parked mid-stream. Not user-facing.

## Dice engine — parked

The dice logic is complete and tested; the UI on top of it is a demo, not the
real game. Pick this up when building the actual board.

**What exists**

| File | State |
| --- | --- |
| `src/game/dice.js` | Done. Pure, no React, injectable rng. |
| `src/components/glyphs.jsx` | Done. Ship, Captain, Crew silhouettes. |
| `src/components/Die.jsx` | Done. `mark` prop drives glyph vs pips. |

**The mark rule**

Pips are the default. A glyph appears only on a die showing the rank still
needed, and only on one of them, chosen at random:

```
assignMarks(dice, held)
  rank = first unheld of ship → captain → crew
  no rank needed, or no die matches → no glyphs
  else → one matching die, picked at random, gets the glyph
```

Consequence worth keeping: with no Ship held, a rolled 5 shows plain pips.
The dice teach the ladder without a legend.

**Settled decisions**

- Marks are assigned once per roll and stored in state. Never computed during
  render — `Math.random()` in render reshuffles on every state change.
- `Die` takes `mark` explicitly; it does not infer glyphs from `value`. That
  keeps "carved = earned" honest.
- Scoring lives in `cargoScore`; returns 0 until all three ranks are held.

**Verified** — 16 assertions covering ladder order, single-glyph invariant,
duplicate picking, rng edge at 1.0, and the scoring gate.

**Still open**

- Roll animation, and whether the glyph should animate in on claim.
- Round structure: three rolls per turn, five rounds, turn end on no-crew.
- Whether 1/2/3 should stay pips or become symbolic (waves, barrel, lantern).
- The demo in `src/App.jsx` is disposable and should be replaced by the board.
