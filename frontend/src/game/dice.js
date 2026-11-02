/**
 * Pure dice and rank logic. No React, no DOM.
 *
 * Rank dice are carved faces: a 6 is a Ship, a 5 a Captain, a 4 a Crew.
 * A die only shows its glyph once it has been assigned a mark — see
 * `assignMarks` for the rule that decides which die is offered up.
 */

export const DICE_PER_ROLL = 5

/** The face value that earns each rank. */
export const RANK_VALUES = {
  ship: 6,
  captain: 5,
  crew: 4,
}

/** Ranks in the order they must be earned. */
export const RANK_ORDER = ['ship', 'captain', 'crew']

export const RANK_LABELS = {
  ship: 'Ship',
  captain: 'Captain',
  crew: 'Crew',
}

/** An empty set of held ranks. */
export function noHeld() {
  return { ship: false, captain: false, crew: false }
}

/** `Math.random` returns [0, 1); clamp so a stray 1 cannot overflow. */
function pick(rng, length) {
  return Math.min(length - 1, Math.floor(rng() * length))
}

/** Roll a single d6. */
export function rollDie(rng = Math.random) {
  return pick(rng, 6) + 1
}

/** Roll a full hand of dice. */
export function rollDice(count = DICE_PER_ROLL, rng = Math.random) {
  return Array.from({ length: count }, () => rollDie(rng))
}

/**
 * The rank the player still needs, or `null` once all three are held.
 * The ladder is strict: no Captain before a Ship, no Crew before both.
 */
export function nextRank(held) {
  return RANK_ORDER.find((rank) => !held[rank]) ?? null
}

/**
 * Decide which dice display a glyph.
 *
 * Returns an array parallel to `dice`, holding a rank name or `null`.
 * Only the die being offered for the rank the player still needs is marked;
 * if several dice show that value, one is chosen at random so the player is
 * not shown more than one candidate.
 */
export function assignMarks(dice, held, rng = Math.random) {
  const marks = dice.map(() => null)
  const rank = nextRank(held)
  if (!rank) return marks

  const value = RANK_VALUES[rank]
  const candidates = []
  dice.forEach((die, index) => {
    if (die === value) candidates.push(index)
  })
  if (candidates.length === 0) return marks

  marks[candidates[pick(rng, candidates.length)]] = rank
  return marks
}

/** Which ranks are held, given the dice currently claimed. */
export function heldFromDice(dice) {
  return dice.reduce((held, die) => {
    if (die.claimed && die.mark) held[die.mark] = true
    return held
  }, noHeld())
}

/** A score of 0 until all three ranks are held. */
export function cargoScore(dice) {
  const held = heldFromDice(dice)
  if (nextRank(held)) return 0
  return dice
    .filter((die) => !die.claimed)
    .reduce((total, die) => total + die.value, 0)
}
