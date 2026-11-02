import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Die from './Die.jsx'
import CaptainSetup from './CaptainSetup.jsx'
import { createCaptain, deleteCaptain, isSupported, loadCaptain } from '../storage/db.js'

const RANKS = [
  { value: 6, name: 'Ship', mark: 'ship' },
  { value: 5, name: 'Captain', mark: 'captain' },
  { value: 4, name: 'Crew', mark: 'crew' },
]

const FACTS = ['3 rolls per turn', '5 rounds', 'Highest total wins']

const RULES = [
  {
    id: 'turns',
    title: 'Roll up to three times',
    body: 'Each turn gives you three rolls to build your crew. Unused rolls go to your cargo.',
  },
  {
    id: 'order',
    title: 'Earn the ranks in order',
    body: 'Find your Ship (6) first. Only then can a Captain (5) be kept, and only then a Crew (4).',
  },
  {
    id: 'cargo',
    title: 'Your leftovers are the score',
    body: 'Once you hold all three, the two remaining dice become cargo. Their total is your points.',
  },
  {
    id: 'stakes',
    title: 'No crew, no score',
    body: 'Miss all three ranks and the turn is worth nothing. Five rounds decide the winner.',
  },
]

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  min-height: 100%;
  max-width: 54rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  text-align: center;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--brass);
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 7vw, 4rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--bone);
  text-shadow: 0 2px 24px rgba(201, 162, 39, 0.25);
`

const Tagline = styled.p`
  max-width: 34ch;
  margin: 0;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  line-height: 1.6;
  color: var(--sea);
`

const Divider = styled.hr`
  width: 5rem;
  height: 1px;
  margin: 0;
  border: 0;
  background: linear-gradient(90deg, transparent, var(--brass), transparent);
`

const CrewRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Rank = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
`

const RankLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brass);
`

const RankRole = styled.span`
  font-size: 1rem;
  color: var(--foam);
`

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Fact = styled.li`
  padding: 0.4rem 0.85rem;
  border: 1px solid rgba(92, 127, 163, 0.35);
  border-radius: 999px;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--sea);
  background: rgba(30, 51, 80, 0.35);
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`

const Button = styled.button`
  padding: 0.85rem 2rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;

  &:active {
    transform: translateY(1px);
  }
`

const PrimaryButton = styled(Button)`
  color: var(--navy);
  background: linear-gradient(180deg, var(--brass-lit), var(--brass));
  box-shadow: var(--shadow-md);

  &:hover {
    box-shadow:
      var(--shadow-md),
      0 0 0 4px rgba(201, 162, 39, 0.18);
  }
`

const GhostButton = styled(Button)`
  color: var(--foam);
  background: transparent;
  border-color: rgba(92, 127, 163, 0.5);

  &:hover {
    border-color: var(--sea);
    background: rgba(30, 51, 80, 0.5);
  }
`

const RulesBox = styled.section`
  width: 100%;
  max-width: 40rem;
  padding: 1.5rem;
  border: 1px solid rgba(92, 127, 163, 0.28);
  border-radius: var(--radius-lg);
  background: rgba(13, 27, 42, 0.55);
  box-shadow: var(--shadow-lg);
  text-align: left;
`

const RulesList = styled.ol`
  display: grid;
  gap: 1.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
`

const Rule = styled.li`
  display: grid;
  grid-template-columns: 1.75rem 1fr;
  gap: 0.85rem;
  counter-increment: step;

  &::before {
    content: counter(step);
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    border: 1px solid rgba(201, 162, 39, 0.5);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--brass);
  }
`

const RuleTitle = styled.h3`
  margin: 0 0 0.2rem;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--bone);
`

const RuleBody = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--sea);
`

const Greeting = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--foam);
`

const SignOut = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sea);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover {
    color: var(--foam);
  }
`

const Loading = styled.p`
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sea);
`

/** Storage availability does not change at runtime, so read it once. */
const STORAGE_SUPPORTED = isSupported()

export function WelcomePage({ onStart }) {
  const [showRules, setShowRules] = useState(false)
  const [captain, setCaptain] = useState(null)
  const [loading, setLoading] = useState(STORAGE_SUPPORTED)
  const [storageBlocked, setStorageBlocked] = useState(!STORAGE_SUPPORTED)

  useEffect(() => {
    if (!STORAGE_SUPPORTED) return undefined

    let cancelled = false

    loadCaptain()
      .then((saved) => {
        if (!cancelled) setCaptain(saved)
      })
      .catch(() => {
        if (!cancelled) setStorageBlocked(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleCreate(name) {
    const saved = await createCaptain(name)
    setCaptain(saved)
  }

  async function handleSignOut() {
    await deleteCaptain()
    setCaptain(null)
    setShowRules(false)
  }

  return (
    <Page>
      <Header>
        <Eyebrow>{captain ? 'Welcome back' : 'Welcome aboard'}</Eyebrow>
        <Title>Ship, Captain &amp; Crew</Title>
        <Tagline>
          {captain
            ? `The ${captain.name} is ready to sail.`
            : 'Three rolls, three ranks, and two dice of cargo to carry your score.'}
        </Tagline>
        <Divider />
      </Header>

      <CrewRow aria-label="The three ranks you need, in order">
        {RANKS.map(({ value, name, mark }) => (
          <Rank key={value}>
            <Die value={value} mark={mark} label={`${name} — a ${value}`} />
            <RankLabel>{value}</RankLabel>
            <RankRole>{name}</RankRole>
          </Rank>
        ))}
      </CrewRow>

      <Facts>
        {FACTS.map((fact) => (
          <Fact key={fact}>{fact}</Fact>
        ))}
      </Facts>

      {loading && <Loading>Checking the logbook…</Loading>}

      {!loading && storageBlocked && (
        <Greeting role="alert">
          Local storage is unavailable, so a captain cannot be saved. The game
          is still playable.
        </Greeting>
      )}

      {!loading && !storageBlocked && !captain && (
        <CaptainSetup onCreate={handleCreate} />
      )}

      {!loading && captain && (
        <>
          <Actions>
            <PrimaryButton type="button" onClick={onStart}>
              Set sail
            </PrimaryButton>
            <GhostButton
              type="button"
              aria-expanded={showRules}
              aria-controls="how-to-play"
              onClick={() => setShowRules((open) => !open)}
            >
              {showRules ? 'Hide rules' : 'How to play'}
            </GhostButton>
          </Actions>
          <SignOut type="button" onClick={handleSignOut}>
            Sign out and clear this captain
          </SignOut>
        </>
      )}

      {showRules && (
        <RulesBox id="how-to-play">
          <RulesList>
            {RULES.map(({ id, title, body }) => (
              <Rule key={id}>
                <div>
                  <RuleTitle>{title}</RuleTitle>
                  <RuleBody>{body}</RuleBody>
                </div>
              </Rule>
            ))}
          </RulesList>
        </RulesBox>
      )}
    </Page>
  )
}

export default WelcomePage
