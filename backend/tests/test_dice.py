"""Dice and rank rules. Mirrors the frontend module so both agree."""

import pytest

from app.game.dice import (
    assign_marks,
    cargo_score,
    held_from_dice,
    next_rank,
    no_held,
    roll_dice,
)


def test_ladder_order():
    assert next_rank(no_held()) == "ship"
    assert next_rank({"ship": True, "captain": False, "crew": False}) == "captain"
    assert next_rank({"ship": True, "captain": True, "crew": False}) == "crew"
    assert next_rank({"ship": True, "captain": True, "crew": True}) is None


def test_only_needed_rank_is_marked():
    assert assign_marks([6, 3, 1, 2, 6], no_held(), lambda: 0.0)[0] == "ship"


def test_lower_ranks_show_plain_pips_until_earned():
    # No Ship held, so the rolled 5 and 4 stay as plain pips.
    assert assign_marks([5, 5, 4, 1, 3], no_held(), lambda: 0.0) == [None] * 5


def test_captain_marked_once_ship_held():
    marks = assign_marks([5, 5, 2, 1, 3], {"ship": True, "captain": False, "crew": False}, lambda: 0.0)
    assert marks[0] == "captain"
    assert marks.count("captain") == 1


def test_all_held_marks_nothing():
    held = {"ship": True, "captain": True, "crew": True}
    assert assign_marks([6, 5, 4, 1, 2], held, lambda: 0.0) == [None] * 5


def test_duplicate_pick_is_random_but_single():
    dice = [6, 6, 6, 1, 2]
    for rng in (lambda: 0.0, lambda: 0.5, lambda: 0.99):
        marks = assign_marks(dice, no_held(), rng)
        assert marks.count("ship") == 1


def test_never_more_than_one_glyph():
    for _ in range(500):
        marks = assign_marks(roll_dice(), no_held())
        assert sum(1 for m in marks if m) <= 1


def test_rng_boundary_does_not_overflow():
    assert assign_marks([6, 6, 1, 2, 3], no_held(), lambda: 1.0).count("ship") == 1


class FakeDie:
    def __init__(self, value, claimed=False, mark=None):
        self.value = value
        self.claimed = claimed
        self.mark = mark


def test_cargo_scores_once_crew_held():
    dice = [
        FakeDie(6, True, "ship"),
        FakeDie(5, True, "captain"),
        FakeDie(4, True, "crew"),
        FakeDie(3),
        FakeDie(2),
    ]
    assert cargo_score(dice) == 5


def test_cargo_gated_without_all_three():
    dice = [
        FakeDie(6, True, "ship"),
        FakeDie(5, True, "captain"),
        FakeDie(3),
        FakeDie(2),
    ]
    assert cargo_score(dice) == 0


def test_unclaimed_marks_do_not_count():
    assert held_from_dice([FakeDie(6, claimed=False, mark="ship")]) == no_held()
