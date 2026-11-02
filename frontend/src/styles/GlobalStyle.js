import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    /* palette */
    --navy: #0d1b2a;
    --deep: #16233a;
    --hull: #1e3350;
    --sea: #5c7fa3;
    --foam: #e8e6df;
    --bone: #f4f1e8;
    --brass: #c9a227;
    --brass-lit: #e3bd45;
    --ink: #16233a;

    /* elevation */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.45);
    --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.55);

    /* geometry */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;

    color-scheme: dark;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    background:
      radial-gradient(circle at 50% -10%, var(--hull), transparent 60%),
      radial-gradient(circle at 50% 0%, var(--deep), var(--navy) 70%);
    background-attachment: fixed;
    color: var(--foam);
    font-family: 'Trebuchet MS', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  :focus-visible {
    outline: 2px solid var(--brass-lit);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`
