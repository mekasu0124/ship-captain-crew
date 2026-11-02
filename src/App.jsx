import { GlobalStyle } from './styles/GlobalStyle.js'
import WelcomePage from './components/WelcomePage.jsx'

function App() {
  // The board mounts here once the turn structure exists.
  const handleStart = () => {}

  return (
    <>
      <GlobalStyle />
      <WelcomePage onStart={handleStart} />
    </>
  )
}

export default App
