import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  max-width: 22rem;
  padding: 1.75rem;
  border: 1px solid rgba(92, 127, 163, 0.28);
  border-radius: var(--radius-lg);
  background: rgba(13, 27, 42, 0.6);
  box-shadow: var(--shadow-lg);
`

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brass);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(92, 127, 163, 0.45);
  background: rgba(8, 18, 30, 0.8);
  color: var(--foam);
  font-family: inherit;
  font-size: 1rem;
  text-align: center;

  &::placeholder {
    color: rgba(92, 127, 163, 0.7);
  }

  &:focus {
    border-color: var(--brass);
  }
`

const Submit = styled.button`
  width: 100%;
  padding: 0.8rem 2rem;
  border-radius: 999px;
  border: 0;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--navy);
  background: linear-gradient(180deg, var(--brass-lit), var(--brass));
  box-shadow: var(--shadow-md);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    box-shadow: none;
  }
`

const ErrorText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #e08a7a;
`

const Note = styled.p`
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.5;
  text-align: center;
  color: var(--sea);
`

export function CaptainSetup({ onCreate }) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const trimmed = name.trim()
  const valid = trimmed.length >= 2 && trimmed.length <= 20

  async function handleSubmit(event) {
    event.preventDefault()
    if (!valid || busy) return

    setBusy(true)
    setError(null)

    try {
      await onCreate(trimmed)
    } catch {
      setError('Could not save to this device. Storage may be blocked.')
      setBusy(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="captain-name">Name your captain</Label>
      <Input
        id="captain-name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="e.g. Anne Bonny"
        maxLength={20}
        autoComplete="off"
        autoFocus
      />
      <Submit type="submit" disabled={!valid || busy}>
        {busy ? 'Signing on…' : 'Sign on'}
      </Submit>
      {error && <ErrorText role="alert">{error}</ErrorText>}
      <Note>
        This account lives only in this browser. Nothing is uploaded.
      </Note>
    </Form>
  )
}

export default CaptainSetup
