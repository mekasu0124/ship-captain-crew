"""Pure dice and rank logic.

Mirror of ``frontend/src/game/dice.js``. The server owns rolling because this
game is pure luck — a client that rolls its own dice can simply re-roll.

No I/O in this module, so it can be tested without a running server.
"""

from __future__ import annotations

import random
from typing import Callable, Protocol

DICE_PER_ROLL = 5

RANK_VALUES: dict[str, int] = {"ship": 6, "captain": 5, "crew": 4}
RANK_ORDER: tuple[str, ...] = ("ship", "captain", "crew")
RANK_LABELS: dict[str, str] = {"ship": "Ship", "captain": "Captain", "crew": "Crew"}

Rng = Callable[[], float]


class SupportsMark(Protocol):
    value: int
    claimed: bool
    mark: str | None


def no_held() -> dict[str, bool]:
    """An empty set of held ranks."""
    return {"ship": False, "captain": False, "crew": False}


def roll_die(rng: Rng = random.random) -> int:
    """Roll a single d6."""
    return min(5, int(rng() * 6)) + 1


def roll_dice(count: int = DICE_PER_ROLL, rng: Rng = random.random) -> list[int]:
    """Roll a full hand of dice."""
    return [roll_die(rng) for _ in range(count)]


def next_rank(held: dict[str, bool]) -> str | None:
    """The rank still needed, or ``None`` once all three are held.

    The ladder is strict: no Captain before a Ship, no Crew before both.
    """
    for rank in RANK_ORDER:
        if not held.get(rank, False):
            return rank
    return None


def assign_marks(
    dice: list[int],
    held: dict[str, bool],
    rng: Rng = random.random,
) -> list[str | None]:
    """Decide which dice display a glyph.

    Only the die being offered for the rank still needed is marked. If several
    dice show that value, one is chosen at random so a player is never shown
    more than one candidate.
    """
    marks: list[str | None] = [None] * len(dice)
    rank = next_rank(held)
    if rank is None:
        return marks

    value = RANK_VALUES[rank]
    candidates = [index for index, die in enumerate(dice) if die == value]
    if not candidates:
        return marks

    marks[candidates[min(len(candidates) - 1, int(rng() * len(candidates)))]] = rank
    return marks


def held_from_dice(dice: list[SupportsMark]) -> dict[str, bool]:
    """Which ranks are held, given the dice currently claimed."""
    held = no_held()
    for die in dice:
        if die.claimed and die.mark:
            held[die.mark] = True
    return held


def cargo_score(dice: list[SupportsMark]) -> int:
    """A score of 0 until all three ranks are held."""
    if next_rank(held_from_dice(dice)) is not None:
        return 0
    return sum(die.value for die in dice if not die.claimed)
