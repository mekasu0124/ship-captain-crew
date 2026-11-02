/**
 * Engraved face marks for the rank dice.
 *
 * Each glyph is a bold silhouette designed to stay legible when the die
 * is small. They inherit `currentColor` so the die controls their tone.
 */

const base = {
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  focusable: 'false',
  'aria-hidden': 'true',
}

/** A hull under sail. */
export function ShipGlyph(props) {
  return (
    <svg {...base} {...props}>
      {/* mast */}
      <rect x="11.2" y="2.6" width="1.6" height="11.4" />
      {/* sails */}
      <path d="M11.2 4.1 5 13.4h6.2z" />
      <path d="M12.8 4.1 19 13.4h-6.2z" />
      {/* hull */}
      <path d="M2.4 15.2h19.2l-2.7 5.1H5.1z" />
    </svg>
  )
}

/** A tricorn hat. */
export function CaptainGlyph(props) {
  return (
    <svg {...base} {...props}>
      {/* crown */}
      <path d="M12 4.6c2.9 1.2 4.2 2.7 4.9 4.8-1.7-1.1-3.1-1.8-4.9-1.8s-3.2.7-4.9 1.8c.7-2.1 2-3.6 4.9-4.8z" />
      {/* brim */}
      <path d="M2.4 15.9c2.9-5.2 6.1-7.2 9.6-7.2s6.7 2 9.6 7.2c-3.4-2-6.4-2.9-9.6-2.9s-6.2.9-9.6 2.9z" />
    </svg>
  )
}

/** A standing sailor. */
export function CrewGlyph(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="6.4" r="2.9" />
      <path d="M6.6 20.4c0-4.8 2.2-7.3 5.4-7.3s5.4 2.5 5.4 7.3z" />
    </svg>
  )
}
