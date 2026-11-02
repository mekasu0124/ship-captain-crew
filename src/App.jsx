import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --navy: #0d1b2a;
    --deep: #1b263b;
    --sea: #415a77;
    --foam: #e0e1dd;
    --parchment: #c9a227;

    color-scheme: dark;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    background: radial-gradient(circle at 50% 0%, var(--deep), var(--navy) 70%);
    color: var(--foam);
    font-family: 'Trebuchet MS', system-ui, sans-serif;
  }
`

const Main = styled.main`
  display: grid;
  place-content: center;
  gap: 0.75rem;
  min-height: 100%;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 6vw, 3.5rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--parchment);
`

const Tagline = styled.p`
  margin: 0;
  color: var(--sea);
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Title>Ship, Captain &amp; Crew</Title>
        <Tagline>A dice game of nerve and luck.</Tagline>
      </Main>
    </>
  )
}

export default App
