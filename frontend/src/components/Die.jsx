import styled from 'styled-components'
import { CaptainGlyph, CrewGlyph, ShipGlyph } from './glyphs.jsx'

/**
 * Pip positions on a 3x3 grid, keyed by die face value.
 *
 *   0 1 2
 *   3 4 5
 *   6 7 8
 */
const PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

/**
 * The three rank faces are carved as glyphs instead of pips. A die only
 * carries a mark once `assignMarks` has offered it up for the rank the
 * player still needs.
 */
const MARKS = {
  ship: ShipGlyph,
  captain: CaptainGlyph,
  crew: CrewGlyph,
}

const MARK_NAMES = {
  ship: 'Ship',
  captain: 'Captain',
  crew: 'Crew',
}

/* A brass-rimmed bone die, like a piece from an old ship's set. */

const Frame = styled.div`
  --rim: ${({ $size }) => Math.max(2, Math.round($size * 0.035))}px;

  padding: var(--rim);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $size }) => Math.round($size * 0.2)}px;
  background: linear-gradient(
    145deg,
    #f2dc8e 0%,
    var(--brass) 26%,
    #8a6d12 52%,
    var(--brass-lit) 74%,
    #a8871c 100%
  );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.18) inset,
    0 ${({ $size }) => Math.round($size * 0.03)}px
      ${({ $size }) => Math.round($size * 0.06)}px rgba(0, 0, 0, 0.5),
    0 0 ${({ $size }) => Math.round($size * 0.22)}px rgba(201, 162, 39, 0.16);
`

const Face = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8%;
  width: 100%;
  height: 100%;
  padding: ${({ $size }) => Math.round($size * 0.13)}px;
  border-radius: ${({ $size }) => Math.round($size * 0.165)}px;
  background:
    radial-gradient(
      circle at 28% 22%,
      rgba(255, 255, 255, 0.9),
      transparent 55%
    ),
    linear-gradient(150deg, #fffdf6 0%, var(--bone) 48%, #e6dfcc 100%);
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.35),
    inset 0 ${({ $size }) => Math.max(1, Math.round($size * 0.012))}px
      ${({ $size }) => Math.round($size * 0.03)}px rgba(255, 255, 255, 1),
    inset 0 ${({ $size }) => Math.round($size * -0.015)}px
      ${({ $size }) => Math.round($size * 0.04)}px rgba(120, 100, 60, 0.22);
`

const Cell = styled.span`
  display: grid;
  place-items: center;
`

const Pip = styled.span`
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at 38% 30%,
    #3d5170 0%,
    var(--ink) 55%,
    #0b1522 100%
  );
  box-shadow:
    inset 0 ${({ $size }) => Math.max(1, Math.round($size * 0.012))}px
      ${({ $size }) => Math.round($size * 0.02)}px rgba(0, 0, 0, 0.75),
    0 1px 0 rgba(255, 255, 255, 0.9);
`

/**
 * The carved mark. The white lip below the silhouette does the same work as
 * the pip's `0 1px` highlight — it makes the shape read as cut into the bone.
 */
const Carving = styled.span`
  grid-area: 1 / 1 / -1 / -1;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--ink);
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.9));

  svg {
    display: block;
    width: 74%;
    height: 74%;
  }
`

export function Die({ value, mark = null, size = 72, label }) {
  const Glyph = MARKS[mark]
  const pips = PIPS[value] ?? []

  return (
    <Frame
      $size={size}
      role="img"
      aria-label={
        label ?? (Glyph ? `${MARK_NAMES[mark]} — a ${value}` : `Die showing ${value}`)
      }
    >
      <Face $size={size}>
        {Glyph ? (
          <Carving>
            <Glyph />
          </Carving>
        ) : (
          Array.from({ length: 9 }, (_, i) => (
            <Cell key={i}>{pips.includes(i) ? <Pip $size={size} /> : null}</Cell>
          ))
        )}
      </Face>
    </Frame>
  )
}

export default Die
